import { joinAnalyzeResults } from '../../analyze/utils'
import { AstNodeType, TokenType } from '../../constants/constants'
import { LitsError } from '../../errors'
import type { Context } from '../../evaluator/interface'
import type { Any } from '../../interface'
import type { AstNode, BindingNode, CommonSpecialExpressionNode } from '../../parser/interface'
import { asNonUndefined } from '../../typeGuards'
import { isSeq } from '../../typeGuards/lits'
import { asToken } from '../../typeGuards/token'
import { toAny } from '../../utils'
import { valueToString } from '../../utils/debug/debugTools'
import type { BuiltinSpecialExpression } from '../interface'

export interface WhenFirstNode extends CommonSpecialExpressionNode<'when-first'> {
  b: BindingNode
}

export const whenFirstSpecialExpression: BuiltinSpecialExpression<Any, WhenFirstNode> = {
  parse: (tokenStream, position, firstToken, { parseBindings, parseTokensUntilClosingBracket }) => {
    let bindings: BindingNode[]
    ;[position, bindings] = parseBindings(tokenStream, position)

    if (bindings.length !== 1) {
      throw new LitsError(
        `Expected exactly one binding, got ${valueToString(bindings.length)}`,
        firstToken.debugData?.sourceCodeInfo,
      )
    }

    let params: AstNode[]
    ;[position, params] = parseTokensUntilClosingBracket(tokenStream, position)
    const lastToken = asToken(tokenStream.tokens[position], tokenStream.filePath, { type: TokenType.Bracket, value: ')' })

    const node: WhenFirstNode = {
      t: AstNodeType.SpecialExpression,
      n: 'when-first',
      b: asNonUndefined(bindings[0], firstToken.debugData?.sourceCodeInfo),
      p: params,
      debugData: firstToken.debugData && {
        token: firstToken,
        lastToken,
      },
    }
    return [position + 1, node]
  },
  evaluate: (node, contextStack, { evaluateAstNode }) => {
    const locals: Context = {}
    const { b: binding } = node
    const evaluatedBindingForm = evaluateAstNode(binding.v, contextStack)
    if (!isSeq(evaluatedBindingForm)) {
      throw new LitsError(
        `Expected undefined or a sequence, got ${valueToString(evaluatedBindingForm)}`,
        node.debugData?.token.debugData?.sourceCodeInfo,
      )
    }

    if (evaluatedBindingForm.length === 0)
      return null

    const bindingValue = toAny(evaluatedBindingForm[0])
    locals[binding.n] = { value: bindingValue }
    const newContextStack = contextStack.create(locals)

    let result: Any = null
    for (const form of node.p)
      result = evaluateAstNode(form, newContextStack)

    return result
  },
  findUnresolvedIdentifiers: (node, contextStack, { findUnresolvedIdentifiers, builtin }) => {
    const { b: binding } = node
    const newContext: Context = { [binding.n]: { value: true } }
    const bindingResult = findUnresolvedIdentifiers([binding.v], contextStack, builtin)
    const paramsResult = findUnresolvedIdentifiers(node.p, contextStack.create(newContext), builtin)
    return joinAnalyzeResults(bindingResult, paramsResult)
  },
}
