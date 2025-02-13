import { joinAnalyzeResults } from '../../analyze/utils'
import { AstNodeType } from '../../constants/constants'
import { LitsError } from '../../errors'
import type { Context } from '../../evaluator/interface'
import type { Any } from '../../interface'
import type { BindingNode, CommonSpecialExpressionNode, NormalExpressionNode } from '../../parser/interface'
import { asNonUndefined, assertNumberOfParams } from '../../typeGuards'
import { asAstNode, asNormalExpressionNode } from '../../typeGuards/astNode'
import { asToken } from '../../typeGuards/token'
import { valueToString } from '../../utils/debug/debugTools'
import type { BuiltinSpecialExpression } from '../interface'

export interface IfLetNode extends CommonSpecialExpressionNode<'if-let'> {
  b: BindingNode
  debugData: CommonSpecialExpressionNode<'let'>['debugData'] & ({
    bindingArray: NormalExpressionNode
  } | undefined)
}

export const ifLetSpecialExpression: BuiltinSpecialExpression<Any, IfLetNode> = {
  parse: (tokenStream, parseState, firstToken, { parseBindings, parseTokensUntilClosingBracket, parseToken }) => {
    const bindingArray = firstToken.debugData?.sourceCodeInfo ? asNormalExpressionNode(parseToken(tokenStream, { ...parseState })) : undefined

    const bindings = parseBindings(tokenStream, parseState)

    if (bindings.length !== 1) {
      throw new LitsError(
        `Expected exactly one binding, got ${valueToString(bindings.length)}`,
        firstToken.debugData?.sourceCodeInfo,
      )
    }

    const params = parseTokensUntilClosingBracket(tokenStream, parseState)
    const lastToken = asToken(tokenStream.tokens[parseState.position++], tokenStream.filePath, { type: 'Bracket', value: ')' })

    const node: IfLetNode = {
      t: AstNodeType.SpecialExpression,
      n: 'if-let',
      b: asNonUndefined(bindings[0], firstToken.debugData?.sourceCodeInfo),
      p: params,
      debugData: firstToken.debugData?.sourceCodeInfo && bindingArray && {
        token: firstToken,
        lastToken,
        bindingArray,
      },
    }

    assertNumberOfParams({ min: 1, max: 2 }, node)

    return node
  },
  evaluate: (node, contextStack, { evaluateAstNode }) => {
    const sourceCodeInfo = node.debugData?.token.debugData?.sourceCodeInfo
    const locals: Context = {}
    const bindingValue = evaluateAstNode(node.b.v, contextStack)
    if (bindingValue) {
      locals[node.b.n] = { value: bindingValue }
      const newContextStack = contextStack.create(locals)
      const thenForm = asAstNode(node.p[0], sourceCodeInfo)
      return evaluateAstNode(thenForm, newContextStack)
    }
    if (node.p.length === 2) {
      const elseForm = asAstNode(node.p[1], sourceCodeInfo)
      return evaluateAstNode(elseForm, contextStack)
    }
    return null
  },
  findUnresolvedIdentifiers: (node, contextStack, { findUnresolvedIdentifiers, builtin }) => {
    const newContext: Context = { [node.b.n]: { value: true } }
    const bindingResult = findUnresolvedIdentifiers([node.b.v], contextStack, builtin)
    const paramsResult = findUnresolvedIdentifiers(node.p, contextStack.create(newContext), builtin)
    return joinAnalyzeResults(bindingResult, paramsResult)
  },
}
