import {
  AstNode,
  functionSymbol,
  LispishFunction,
  NameNode,
  ModifierNode,
  SpecialExpressionNode,
} from '../../parser/interface'
import { asNotUndefined } from '../../utils'
import { SpecialExpression } from '../interface'
import { parseFunctionArguments } from './utils'

interface DefunSpecialExpressionNode extends SpecialExpressionNode {
  name: 'defun'
  functionName: NameNode
  arguments: Array<NameNode | ModifierNode>
  optionalParamsIndex: number | undefined
  body: AstNode[]
}

export const defunSpecialExpression: SpecialExpression = {
  parse: (tokens, position, { parseToken }) => {
    const [newPosition, functionName] = parseToken(tokens, position)
    if (functionName.type !== 'Name') {
      throw Error('Expected a name node')
    }

    position = newPosition

    let token = asNotUndefined(tokens[position])
    if (!(token.type === 'paren' && token.value === '(')) {
      throw SyntaxError(`Invalid token "${token.type}" value=${token.value}, expected list of arguments`)
    }

    position += 1

    const [nextPosition, functionArguments, optionalParamsIndex] = parseFunctionArguments(tokens, position, parseToken)
    position = nextPosition

    token = asNotUndefined(tokens[position])
    const body: AstNode[] = []
    while (!(token.type === 'paren' && token.value === ')')) {
      const [newPosition, bodyNode] = parseToken(tokens, position)
      body.push(bodyNode)
      position = newPosition
      token = asNotUndefined(tokens[position])
    }
    if (body.length === 0) {
      throw Error('Missing defun body')
    }

    const node: DefunSpecialExpressionNode = {
      type: 'SpecialExpression',
      name: 'defun',
      functionName,
      params: [],
      arguments: functionArguments,
      optionalParamsIndex,
      body,
    }

    return [position + 1, node]
  },
  evaluate: (node, contextStack, _evaluateAstNode): undefined => {
    castDefunExpressionNode(node)
    const restParams =
      node.arguments[node.arguments.length - 1]?.type === 'Modifier' &&
      node.arguments[node.arguments.length - 1]?.value === '&rest'
    const lispishFunction: LispishFunction = {
      [functionSymbol]: true,
      name: node.functionName.value,
      arguments: node.arguments.map(arg => arg.value),
      restParams,
      optionalParamsIndex: node.optionalParamsIndex,
      body: node.body,
    }

    // The second last stack entry is the "global" scope
    const context = asNotUndefined(contextStack[contextStack.length - 2])

    context.functions[node.functionName.value] = lispishFunction
    return undefined
  },
}

function castDefunExpressionNode(_node: SpecialExpressionNode): asserts _node is DefunSpecialExpressionNode {
  return
}
