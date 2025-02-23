import { LitsError } from '../errors'
import type { UnknownRecord } from '../interface'
import type { GenericNode } from '../parser/interface'
import { withoutCommentNodes } from '../removeCommentNodes'
import type { SourceCodeInfo } from '../tokenizer/interface'
import { getTokenDebugData } from '../tokenizer/utils'
import { valueToString } from '../utils/debug/debugTools'
import { getSourceCodeInfo } from '../utils/debug/getSourceCodeInfo'

type Count = number | { min?: number, max?: number }

export function assertEvenNumberOfParams(node: GenericNode): void {
  const length = withoutCommentNodes(node.p).length
  if (length % 2 !== 0) {
    throw new LitsError(
      `Wrong number of arguments, expected an even number, got ${valueToString(length)}.`,
      getTokenDebugData(node.token)?.sourceCodeInfo,
    )
  }
}

export function assertNumberOfParams(count: Count, node: GenericNode): void {
  assertCount({
    count,
    length: withoutCommentNodes(node.p).length,
    name: node.n ?? 'expression',
    sourceCodeInfo: getTokenDebugData(node.token)?.sourceCodeInfo,
  })
}

export function isNonUndefined<T>(value: T | undefined): value is T {
  return value !== undefined
}

export function asNonUndefined<T>(value: T | undefined, sourceCodeInfo?: SourceCodeInfo): T {
  assertNonUndefined(value, sourceCodeInfo)
  return value
}

export function assertNonUndefined<T>(value: T | undefined, sourceCodeInfo?: SourceCodeInfo): asserts value is T {
  if (!isNonUndefined(value))
    throw new LitsError('Unexpected undefined', getSourceCodeInfo(value, sourceCodeInfo))
}

export function isUnknownRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export function assertUnknownRecord(value: unknown, sourceCodeInfo?: SourceCodeInfo): asserts value is UnknownRecord {
  if (!isUnknownRecord(value)) {
    throw new LitsError(
      `Expected ${'UnknownRecord'}, got ${valueToString(value)}.`,
      getSourceCodeInfo(value, sourceCodeInfo),
    )
  }
}

export function asUnknownRecord(value: unknown, sourceCodeInfo?: SourceCodeInfo): UnknownRecord {
  assertUnknownRecord(value, sourceCodeInfo)
  return value
}

function assertCount({ count, length, name, sourceCodeInfo }: { name: string | undefined, count: Count, length: number, sourceCodeInfo?: SourceCodeInfo }): void {
  if (typeof count === 'number') {
    if (length !== count) {
      throw new LitsError(
        `Wrong number of arguments to "${name}", expected ${count}, got ${valueToString(length)}.`,
        sourceCodeInfo,
      )
    }
  }
  else {
    const { min, max } = count
    if (min === undefined && max === undefined)
      throw new LitsError('Min or max must be specified.', sourceCodeInfo)

    if (typeof min === 'number' && length < min) {
      throw new LitsError(
        `Wrong number of arguments to "${name}", expected at least ${min}, got ${valueToString(length)}.`,
        sourceCodeInfo,
      )
    }

    if (typeof max === 'number' && length > max) {
      throw new LitsError(
        `Wrong number of arguments to "${name}", expected at most ${max}, got ${valueToString(length)}.`,
        sourceCodeInfo,
      )
    }
  }
}
