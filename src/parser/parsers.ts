import { Token } from '../tokenizer/interface'
import { asNotUndefined } from '../utils'
import {
  AstNode,
  NormalExpressionNode,
  SpecialExpressionNode,
  NameNode,
  NumberNode,
  StringNode,
  ReservedNameNode,
} from './interface'
import { builtin } from '../builtin'
import { ReservedName } from '../reservedNames'

type ParseNumber = (tokens: Token[], position: number) => [number, NumberNode]
export const parseNumber: ParseNumber = (tokens: Token[], position: number) => {
  const token = asNotUndefined(tokens[position])
  return [position + 1, { type: 'Number', value: Number(token.value), preEvaluate: true }]
}

type ParseString = (tokens: Token[], position: number) => [number, StringNode]
export const parseString: ParseString = (tokens: Token[], position: number) => {
  const token = asNotUndefined(tokens[position])
  return [position + 1, { type: 'String', value: token.value, preEvaluate: true }]
}

type ParseName = (tokens: Token[], position: number) => [number, NameNode]
export const parseName: ParseName = (tokens: Token[], position: number) => {
  const token = asNotUndefined(tokens[position])
  return [position + 1, { type: 'Name', value: token.value, preEvaluate: true }]
}

type ParseReservedName = (tokens: Token[], position: number) => [number, ReservedNameNode]
export const parseReservedName: ParseReservedName = (tokens: Token[], position: number) => {
  const token = asNotUndefined(tokens[position])
  return [position + 1, { type: 'ReservedName', value: token.value as ReservedName, preEvaluate: true }]
}

type ExpressionNode = NormalExpressionNode | SpecialExpressionNode
type ParseExpression = (tokens: Token[], position: number) => [number, ExpressionNode]
export const parseExpression: ParseExpression = (tokens, position) => {
  position += 1 // Skip parenthesis

  const expressionName = asNotUndefined(tokens[position]).value

  if (builtin.specialExpressions[expressionName]) {
    return parseSpecialExpression(tokens, position)
  }
  return parseNormalExpression(tokens, position)
}

export const parseNormalExpression: ParseExpression = (tokens, position) => {
  const expressionName = asNotUndefined(tokens[position]).value

  const [newPosition, params] = parseExpressionParams(tokens, position + 1)
  position = newPosition + 1
  const preEvaluate = params.every(param => param.preEvaluate)

  const node: NormalExpressionNode = {
    type: 'NormalExpression',
    name: expressionName,
    params,
    preEvaluate,
  }

  const builtinExpression = builtin.normalExpressions[node.name]

  if (builtinExpression) {
    node.preEvaluate = node.preEvaluate && builtinExpression.preEvaluate
    try {
      builtinExpression.validate?.(node)
    } catch (e) {
      if (e instanceof Error) {
        throw Error(e.message + '\n' + JSON.stringify(node, null, 2))
      }
      throw Error(e + '\n' + JSON.stringify(node, null, 2))
    }
  }

  return [position, node]
}

export const parseSpecialExpression: ParseExpression = (tokens, position) => {
  const expressionName = asNotUndefined(tokens[position]).value
  position += 1

  const specialExpression = asNotUndefined(builtin.specialExpressions[expressionName])

  const [positionAfterParse, node] = specialExpression.parse(tokens, position)
  position = positionAfterParse

  const [positionAfterParseParams, params] = parseExpressionParams(tokens, position)
  position = positionAfterParseParams

  node.params = params
  node.preEvaluate = node.preEvaluate && params.every(param => param.preEvaluate)

  position += 1
  try {
    specialExpression.validate(node)
  } catch (e) {
    if (e instanceof Error) {
      throw Error(e.message + '\n' + JSON.stringify(node, null, 2))
    }
    throw Error(e + '\n' + JSON.stringify(node, null, 2))
  }

  return [position, node]
}

function parseExpressionParams(tokens: Token[], position: number): [number, AstNode[]] {
  let token = asNotUndefined(tokens[position])
  const params: AstNode[] = []
  while (!(token.type === 'paren' && token.value === ')')) {
    const [newPosition, param] = parseToken(tokens, position)
    position = newPosition
    params.push(param)
    token = asNotUndefined(tokens[position])
  }
  return [position, params]
}

type ParseToken = (tokens: Token[], position: number) => [number, AstNode]
export const parseToken: ParseToken = (tokens, position) => {
  const token = asNotUndefined(tokens[position])
  let nodeDescriptor: [number, AstNode] | undefined = undefined
  switch (token.type) {
    case 'number':
      nodeDescriptor = parseNumber(tokens, position)
      break
    case 'string':
      nodeDescriptor = parseString(tokens, position)
      break
    case 'name':
      nodeDescriptor = parseName(tokens, position)
      break
    case 'reservedName':
      nodeDescriptor = parseReservedName(tokens, position)
      break
    case 'paren':
      if (token.value === '(') {
        nodeDescriptor = parseExpression(tokens, position)
      }
      break
  }
  if (!nodeDescriptor) {
    throw SyntaxError(`Unrecognized token: ${token.type} value=${token.value}`)
  }
  return nodeDescriptor
}
