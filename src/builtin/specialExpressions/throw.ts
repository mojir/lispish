import { UnexpectedTokenError, UserDefinedError } from '../../errors'
import { AstNode, SpecialExpressionNode } from '../../parser/interface'
import { asNonEmptyString, asNotUndefined } from '../../utils'
import { BuiltinSpecialExpression } from '../interface'

interface ThrowSpecialExpressionNode extends SpecialExpressionNode {
  name: `throw`
  messageNode: AstNode
}

export const throwSpecialExpression: BuiltinSpecialExpression<null> = {
  parse: (tokens, position, { parseToken }) => {
    const firstToken = asNotUndefined(tokens[position], `EOF`)
    const [newPosition, messageNode] = parseToken(tokens, position)
    position = newPosition

    const tkn = asNotUndefined(tokens[position], `EOF`)
    if (!(tkn.type === `paren` && tkn.value === `)`)) {
      throw new UnexpectedTokenError(`)`, tkn)
    }
    position += 1

    const node: ThrowSpecialExpressionNode = {
      type: `SpecialExpression`,
      name: `throw`,
      params: [],
      messageNode,
      token: firstToken,
    }
    return [position, node]
  },
  evaluate: (node, contextStack, { evaluateAstNode }) => {
    castThrowExpressionNode(node)
    const message = asNonEmptyString(evaluateAstNode(node.messageNode, contextStack), node.token.sourceCodeInfo)
    throw new UserDefinedError(message, node.token.sourceCodeInfo)
  },
}

function castThrowExpressionNode(_node: SpecialExpressionNode): asserts _node is ThrowSpecialExpressionNode {
  return
}
