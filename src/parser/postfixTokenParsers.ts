import type { SpecialExpressionName, SpecialExpressionNode } from '../builtin'
import { builtin } from '../builtin'
import type { FnNode } from '../builtin/specialExpressions/functions'
import type { FunctionArguments } from '../builtin/utils'
import { AstNodeType } from '../constants/constants'
import { LitsError } from '../errors'
import { withoutCommentNodes } from '../removeCommentNodes'
import { asLParenToken, asRParenToken, assertLBracketToken, isRBraceToken, isRBracketToken, isRParenToken } from '../tokenizer/common/commonTokens'
import type { TokenStream } from '../tokenizer/interface'
import type { PostfixTokenType } from '../tokenizer/postfix/postfixTokens'
import { asPF_CommentToken, asPF_RegexpShorthandToken, asPF_StringShorthandToken, asPF_SymbolToken, isPF_FnShorthandToken, isPF_ModifierToken, isPF_SymbolToken } from '../tokenizer/postfix/postfixTokens'
import { asToken } from '../tokenizer/tokens'
import { getTokenDebugData } from '../tokenizer/utils'
import { asNonUndefined, assertEvenNumberOfParams } from '../typeGuards'
import { assertNameNode, isExpressionNode } from '../typeGuards/astNode'
import { valueToString } from '../utils/debug/debugTools'
import { parseNumber, parseReservedSymbol, parseString, parseSymbol } from './commonTokenParsers'
import type {
  AstNode,
  BindingNode,
  CommentNode,
  NormalExpressionNode,
  NormalExpressionNodeWithName,
  ParseArgument,
  ParseExpression,
  ParseState,
  StringNode,
} from './interface'

function parseStringShorthand(tokenStream: TokenStream, parseState: ParseState): StringNode {
  const tkn = asPF_StringShorthandToken(tokenStream.tokens[parseState.position++])
  const value = tkn[1].substring(1)

  return {
    t: AstNodeType.String,
    v: value,
    p: [],
    n: undefined,
    debugData: getTokenDebugData(tkn)?.sourceCodeInfo
      ? { token: tkn, lastToken: tkn }
      : undefined,
  }
}

function parseComment(tokenStream: TokenStream, parseState: ParseState): CommentNode {
  const tkn = asPF_CommentToken(tokenStream.tokens[parseState.position++])
  return {
    t: AstNodeType.Comment,
    v: tkn[1],
    p: [],
    n: undefined,
    debugData: getTokenDebugData(tkn)?.sourceCodeInfo
      ? { token: tkn, lastToken: tkn }
      : undefined,
  }
}

function parseTokensUntilClosingBracket(tokenStream: TokenStream, parseState: ParseState): AstNode[] {
  let tkn = asToken(tokenStream.tokens[parseState.position])
  const astNodes: AstNode[] = []
  while (!isRParenToken(tkn) && !isRBracketToken(tkn)) {
    astNodes.push(parseState.parseToken(tokenStream, parseState))
    tkn = asToken(tokenStream.tokens[parseState.position])
  }
  return astNodes
}

const parseExpression: ParseExpression = (tokenStream, parseState) => {
  const tkn = asToken(tokenStream.tokens[parseState.position + 1])
  if (isPF_SymbolToken(tkn) && builtin.specialExpressions[tkn[1] as SpecialExpressionName])
    return parseSpecialExpression(tokenStream, parseState)

  return parseNormalExpression(tokenStream, parseState)
}

function parseArrayLitteral(tokenStream: TokenStream, parseState: ParseState): AstNode {
  const firstToken = asToken(tokenStream.tokens[parseState.position++])

  let tkn = asToken(tokenStream.tokens[parseState.position])
  const params: AstNode[] = []
  while (!isRBracketToken(tkn)) {
    params.push(parseState.parseToken(tokenStream, parseState))
    tkn = asToken(tokenStream.tokens[parseState.position])
  }

  parseState.position += 1

  const node: NormalExpressionNode = {
    t: AstNodeType.NormalExpression,
    n: 'array',
    p: params,
    debugData: getTokenDebugData(firstToken)?.sourceCodeInfo
      ? {
          token: firstToken,
          lastToken: tkn,
        }
      : undefined,
  }

  return node
}

function parseObjectLitteral(tokenStream: TokenStream, parseState: ParseState): NormalExpressionNodeWithName {
  const firstToken = asToken(tokenStream.tokens[parseState.position++])

  let tkn = asToken(tokenStream.tokens[parseState.position])
  const params: AstNode[] = []
  while (!isRBraceToken(tkn)) {
    params.push(parseState.parseToken(tokenStream, parseState))
    tkn = asToken(tokenStream.tokens[parseState.position])
  }

  parseState.position += 1

  const node: NormalExpressionNode = {
    t: AstNodeType.NormalExpression,
    n: 'object',
    p: params,
    debugData: getTokenDebugData(firstToken)?.sourceCodeInfo
      ? {
          token: firstToken,
          lastToken: tkn,
        }
      : undefined,
  }

  assertEvenNumberOfParams(node)

  return node
}

function parseRegexpShorthand(tokenStream: TokenStream, parseState: ParseState): NormalExpressionNodeWithName {
  const tkn = asPF_RegexpShorthandToken(tokenStream.tokens[parseState.position++])

  const endStringPosition = tkn[1].lastIndexOf('"')
  const regexpString = tkn[1].substring(2, endStringPosition)
  const optionsString = tkn[1].substring(endStringPosition + 1)
  const stringNode: StringNode = {
    t: AstNodeType.String,
    v: regexpString,
    p: [],
    n: undefined,
    debugData: getTokenDebugData(tkn)?.sourceCodeInfo
      ? {
          token: tkn,
          lastToken: tkn,
        }
      : undefined,
  }

  const optionsNode: StringNode = {
    t: AstNodeType.String,
    v: optionsString,
    p: [],
    n: undefined,
    debugData: getTokenDebugData(tkn)?.sourceCodeInfo
      ? {
          token: tkn,
          lastToken: tkn,
        }
      : undefined,
  }

  const node: NormalExpressionNode = {
    t: AstNodeType.NormalExpression,
    n: 'regexp',
    p: [stringNode, optionsNode],
    debugData: getTokenDebugData(tkn)?.sourceCodeInfo
      ? {
          token: tkn,
          lastToken: tkn,
        }
      : undefined,
  }

  return node
}

const placeholderRegexp = /^%([1-9]\d?)?$/
function parseFnShorthand(tokenStream: TokenStream, parseState: ParseState): FnNode {
  const firstToken = asToken(tokenStream.tokens[parseState.position++])
  const startPos = parseState.position + 1
  const exprNode = parseExpression(tokenStream, parseState)

  let arity = 0
  let percent1: 'NOT_SET' | 'WITH_1' | 'NAKED' = 'NOT_SET' // referring to argument bindings. % = NAKED, %1, %2, %3, etc = WITH_1
  for (let pos = startPos; pos < parseState.position - 1; pos += 1) {
    const tkn = asToken(tokenStream.tokens[pos])
    if (isPF_SymbolToken(tkn)) {
      const match = placeholderRegexp.exec(tkn[1])
      if (match) {
        const number = match[1] ?? '1'
        if (number === '1') {
          const mixedPercent1 = (!match[1] && percent1 === 'WITH_1') || (match[1] && percent1 === 'NAKED')
          if (mixedPercent1)
            throw new LitsError('Please make up your mind, either use % or %1', getTokenDebugData(firstToken)?.sourceCodeInfo)

          percent1 = match[1] ? 'WITH_1' : 'NAKED'
        }

        arity = Math.max(arity, Number(number))
        if (arity > 20)
          throw new LitsError('Can\'t specify more than 20 arguments', getTokenDebugData(firstToken)?.sourceCodeInfo)
      }
    }
    if (isPF_FnShorthandToken(tkn))
      throw new LitsError('Nested shortcut functions are not allowed', getTokenDebugData(firstToken)?.sourceCodeInfo)
  }

  const mandatoryArguments: string[] = []

  for (let i = 1; i <= arity; i += 1) {
    if (i === 1 && percent1 === 'NAKED')
      mandatoryArguments.push('%')
    else
      mandatoryArguments.push(`%${i}`)
  }

  const args: FunctionArguments = {
    b: [],
    m: mandatoryArguments,
  }

  const node: FnNode = {
    t: AstNodeType.SpecialExpression,
    n: 'fn',
    p: [],
    o: [
      {
        as: args,
        b: [exprNode],
        a: args.m.length,
      },
    ],
    debugData: getTokenDebugData(firstToken)?.sourceCodeInfo
      ? {
          token: firstToken,
          lastToken: exprNode.debugData!.lastToken,
        }
      : undefined,
  }

  return node
}

const parseArgument: ParseArgument = (tokenStream, parseState) => {
  const tkn = asToken(tokenStream.tokens[parseState.position++])

  if (isPF_SymbolToken(tkn)) {
    return {
      t: AstNodeType.Argument,
      n: tkn[1],
      p: [],
      debugData: getTokenDebugData(tkn)?.sourceCodeInfo
        ? {
            token: tkn,
            lastToken: tkn,
          }
        : undefined,
    }
  }
  else if (isPF_ModifierToken(tkn)) {
    return {
      t: AstNodeType.Modifier,
      v: tkn[1],
      p: [],
      n: undefined,
      debugData: getTokenDebugData(tkn)?.sourceCodeInfo
        ? {
            token: tkn,
            lastToken: tkn,
          }
        : undefined,
    }
  }
  else {
    throw new LitsError(`Expected name or modifier token, got ${valueToString(tkn)}.`, getTokenDebugData(tkn)?.sourceCodeInfo)
  }
}

function parseBindings(tokenStream: TokenStream, parseState: ParseState): BindingNode[] {
  assertLBracketToken(tokenStream.tokens[parseState.position++])
  let tkn = asToken(tokenStream.tokens[parseState.position])
  const bindings: BindingNode[] = []
  while (!isRBracketToken(tkn)) {
    bindings.push(parseBinding(tokenStream, parseState))
    tkn = asToken(tokenStream.tokens[parseState.position])
  }
  parseState.position += 1

  return bindings
}

function parseBinding(tokenStream: TokenStream, parseState: ParseState): BindingNode {
  const firstToken = asPF_SymbolToken(tokenStream.tokens[parseState.position++])
  const name = firstToken[1]

  const value = parseState.parseToken(tokenStream, parseState)

  const node: BindingNode = {
    t: AstNodeType.Binding,
    n: name,
    v: value,
    p: [],
    debugData: getTokenDebugData(firstToken)?.sourceCodeInfo
      ? {
          token: firstToken,
          lastToken: value.debugData!.lastToken,
        }
      : undefined,
  }
  return node
}

function parseNormalExpression(tokenStream: TokenStream, parseState: ParseState): NormalExpressionNode {
  const startBracketToken = tokenStream.hasDebugData ? asLParenToken(tokenStream.tokens[parseState.position]) : undefined
  parseState.position += 1
  const fnNode = parseState.parseToken(tokenStream, parseState)

  const params = parseTokensUntilClosingBracket(tokenStream, parseState)

  const lastToken = asRParenToken(tokenStream.tokens[parseState.position++])

  if (isExpressionNode(fnNode)) {
    const node: NormalExpressionNode = {
      t: AstNodeType.NormalExpression,
      p: [fnNode, ...params],
      n: undefined,
      debugData: startBracketToken
        ? {
            token: startBracketToken,
            lastToken,
          }
        : undefined,
    }

    return node
  }

  assertNameNode(fnNode, getTokenDebugData(fnNode.debugData?.token)?.sourceCodeInfo)
  const node: NormalExpressionNode = {
    t: AstNodeType.NormalExpression,
    n: fnNode.v,
    p: params,
    debugData: startBracketToken
      ? {
          token: startBracketToken,
          nameToken: fnNode.debugData?.token,
          lastToken,
        }
      : undefined,
  }

  const builtinExpression = builtin.normalExpressions[node.n]

  if (builtinExpression) {
    builtinExpression.validate?.({
      ...node,
      p: withoutCommentNodes(node.p),
    })
  }

  return node
}

function parseSpecialExpression(tokenStream: TokenStream, parseState: ParseState): SpecialExpressionNode {
  const firstToken = asLParenToken(tokenStream.tokens[parseState.position++])

  const nameToken = asPF_SymbolToken(tokenStream.tokens[parseState.position++])
  const expressionName = nameToken[1] as SpecialExpressionName

  const { parse } = asNonUndefined(builtin.specialExpressions[expressionName], getTokenDebugData(nameToken)?.sourceCodeInfo)

  const node = parse(tokenStream, parseState, firstToken, {
    parseExpression,
    parseTokensUntilClosingBracket,
    parseToken: parseState.parseToken,
    parseBinding,
    parseBindings,
    parseArgument,
  })

  if (node.debugData) {
    node.debugData.nameToken = nameToken
  }

  return node
}

export function parsePostfixToken(tokenStream: TokenStream, parseState: ParseState): AstNode {
  const tkn = asToken(tokenStream.tokens[parseState.position])

  const tokenType = tkn[0] as PostfixTokenType
  switch (tokenType) {
    case 'Number':
      return parseNumber(tokenStream, parseState)
    case 'String':
      return parseString(tokenStream, parseState)
    case 'PF_StringShorthand':
      return parseStringShorthand(tokenStream, parseState)
    case 'PF_Symbol':
      return parseSymbol(tokenStream, parseState)
    case 'PF_ReservedSymbol':
      return parseReservedSymbol(tokenStream, parseState)
    case 'LParen':
      return parseExpression(tokenStream, parseState)
    case 'LBracket':
      return parseArrayLitteral(tokenStream, parseState)
    case 'LBrace':
      return parseObjectLitteral(tokenStream, parseState)
    case 'PF_RegexpShorthand':
      return parseRegexpShorthand(tokenStream, parseState)
    case 'PF_FnShorthand':
      return parseFnShorthand(tokenStream, parseState)
    case 'PF_Comment':
      return parseComment(tokenStream, parseState)
    case 'PF_CollectionAccessor':
    case 'PF_Modifier':
    case 'PF_Infix':
    case 'RParen':
    case 'RBracket':
    case 'RBrace':
    case 'PF_Whitespace':
      break
    /* v8 ignore next 2 */
    default:
      throw new LitsError(`Unrecognized token: ${tokenType satisfies never} ${tkn[1]}`, getTokenDebugData(tkn)?.sourceCodeInfo)
  }
  throw new LitsError(`Unrecognized token: ${tokenType}${tkn[1] ? ` ${tkn[1]}` : ''}`, getTokenDebugData(tkn)?.sourceCodeInfo)
}
