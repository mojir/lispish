import { LitsError } from '../errors'
import { DebugInfo } from '../tokenizer/interface'
import { getDebugInfo, valueToString } from './helpers'

type Options =
  | {
      nonEmpty?: true
      char?: never
    }
  | {
      nonEmpty?: never
      char?: true
    }

function is(value: unknown, options: Options = {}): value is string {
  if (typeof value !== `string`) {
    return false
  }

  if (options.nonEmpty && value.length === 0) {
    return false
  }

  if (options.char && value.length !== 1) {
    return false
  }

  return true
}

function assert(value: unknown, debugInfo: DebugInfo | undefined, options: Options = {}): asserts value is string {
  if (!is(value, options)) {
    throw new LitsError(
      `Expected ${options.nonEmpty ? `non empty string` : options.char ? `character` : `string`}, got ${valueToString(
        value,
      )}.`,
      getDebugInfo(value, debugInfo),
    )
  }
}

function as(value: unknown, debugInfo: DebugInfo | undefined, options: Options = {}): string {
  assert(value, debugInfo, options)
  return value
}

export const string: {
  is: (value: unknown, options?: Options) => value is string
  as: (value: unknown, debugInfo: DebugInfo | undefined, options?: Options) => string
  assert(value: unknown, debugInfo: DebugInfo | undefined, options?: Options): asserts value is string
} = {
  is,
  as,
  assert,
}
