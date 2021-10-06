import { RecurSignal } from '../../errors'
import { Context } from '../../evaluator/interface'
import { AstNode, BindingNode, SpecialExpressionNode } from '../../parser/interface'
import { asNotUndefined } from '../../utils'
import { SpecialExpression } from '../interface'

interface LoopSpecialExpressionNode extends SpecialExpressionNode {
  name: `loop`
  bindings: BindingNode[]
}

export const loopSpecialExpression: SpecialExpression = {
  parse: (tokens, position, { parseTokens, parseBindings }) => {
    let bindings: BindingNode[]
    ;[position, bindings] = parseBindings(tokens, position)

    let params: AstNode[]
    ;[position, params] = parseTokens(tokens, position)

    const node: LoopSpecialExpressionNode = {
      type: `SpecialExpression`,
      name: `loop`,
      params,
      bindings,
    }
    return [position + 1, node]
  },
  evaluate: (node, contextStack, evaluateAstNode) => {
    castLoopExpressionNode(node)
    const bindingContext: Context = node.bindings.reduce((result: Context, binding) => {
      result[binding.name] = { value: evaluateAstNode(binding.value, contextStack) }
      return result
    }, {})
    const newContextStack = [bindingContext, ...contextStack]

    for (;;) {
      let result: unknown
      try {
        for (const form of node.params) {
          result = evaluateAstNode(form, newContextStack)
        }
      } catch (error) {
        if (error instanceof RecurSignal) {
          const params = error.params
          if (params.length !== node.bindings.length) {
            throw Error(`recur expected ${node.bindings.length} parameters, got ${params.length}`)
          }
          node.bindings.forEach((binding, index) => {
            asNotUndefined(bindingContext[binding.name]).value = params[index]
          })
          continue
        }
      }
      return result
    }
  },
}

function castLoopExpressionNode(_node: SpecialExpressionNode): asserts _node is LoopSpecialExpressionNode {
  return
}
