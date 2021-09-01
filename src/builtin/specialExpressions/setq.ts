import { evaluateAstNode } from '../../evaluator'
import { Context } from '../../evaluator/interface'
import { SpecialExpressionNode } from '../../parser/interface'
import { ReservedName, reservedNames } from '../../reservedNames'
import { Token } from '../../tokenizer/interface'
import { asAstNode, asNameNode, assertLengthTwo } from '../../utils'
import { SpecialExpression } from '../interface'

interface SetqSpecialExpressionNode extends SpecialExpressionNode {
  name: 'setq'
}

export const setqSpecialExpression: SpecialExpression = {
  parse: (_tokens: Token[], position: number) => {
    return [
      position,
      {
        type: 'SpecialExpression',
        name: 'setq',
        params: [],
      },
    ]
  },
  evaluate: (node: SpecialExpressionNode, contextStack: Context[]) => {
    assertSetqExpressionNode(node)
    const name = asNameNode(node.params[0]).value
    if (reservedNames[name as ReservedName]) {
      throw SyntaxError(`Cannot set symbol name to "${name}", it's a reserved name`)
    }

    const value = evaluateAstNode(asAstNode(node.params[1]), contextStack)

    // The second last stack entry is the "global" scope
    let context: Context | undefined = undefined
    for (let i = 0; i < contextStack.length - 1; i += 1) {
      if (Object.getOwnPropertyDescriptor(contextStack[i], name)) {
        context = contextStack[i]
        break
      }
    }

    // The second last stack entry is the "global" scope
    context = context || (contextStack[contextStack.length - 2] as Context)

    context[name] = value

    return value
  },
  validate: (node: SpecialExpressionNode) => {
    assertSetqExpressionNode(node)
    assertLengthTwo(node.params)
  },
}

function assertSetqExpressionNode(node: SpecialExpressionNode): asserts node is SetqSpecialExpressionNode {
  if (node.name !== 'setq') {
    throw Error('Expected setq special expression node')
  }
}
