import { Context } from '../evaluator/interface'
import { AstNode, BindingNode } from '../parser/interface'
import { reservedNamesRecord } from '../reservedNames'
import { asNotUndefined } from '../utils'
import { Builtin } from './interface'

export type FunctionArguments = {
  mandatoryArguments: string[]
  optionalArguments: Array<{
    name: string
    defaultValue?: AstNode
  }>
  restArgument?: string
  bindings: BindingNode[]
}

export function assertNameNotDefined<T>(name: T, contextStack: Context[], builtin: Builtin): asserts name is T {
  if (typeof name !== `string`) {
    return
  }
  if (builtin.specialExpressions[name]) {
    throw Error(`Cannot define variable ${name}, it's a special expression`)
  }

  if (builtin.normalExpressions[name]) {
    throw Error(`Cannot define variable ${name}, it's a builtin function`)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((reservedNamesRecord as any)[name]) {
    throw Error(`Cannot define variable ${name}, it's a reserved name`)
  }

  const globalContext = asNotUndefined(contextStack[contextStack.length - 2])

  if (globalContext[name]) {
    throw Error(`Name already defined "${name}"`)
  }
}
