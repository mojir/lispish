import { describe, expect, it, vitest } from 'vitest'
import { FunctionType, Lits } from '../src'
import type { JsFunction } from '../src/Lits/Lits'
import { LitsError } from '../src/errors'
import type { NativeJsFunction } from '../src/parser/interface'
import { FUNCTION_SYMBOL } from '../src/utils/symbols'

const jsFunctions: Record<string, JsFunction> = {
  tripple: {
    fn: (value: number) => value * 3,
  },
  throwError: {
    fn: () => {
      throw new Error('An error')
    },
  },
  throwNumber: {
    fn: () => {
      // eslint-disable-next-line ts/no-throw-literal
      throw 1
    },
  },
  throwString: {
    fn: () => {
      // eslint-disable-next-line ts/no-throw-literal
      throw 'An error'
    },
  },
}

const stupidJsFunctions: Record<string, JsFunction> = {
  '+': {
    fn: (value: number) => value * 3,
  },
  'if': {
    fn: () => true,
  },
}

const nativeJsFunction: NativeJsFunction = {
  f: {
    fn: (value: number) => value * value,
  },
  n: 'square',
  t: FunctionType.NativeJsFunction,
  [FUNCTION_SYMBOL]: true,
}
const values = {
  obj: {
    square: nativeJsFunction,
  },
}

describe('nativeJsFunction', () => {
  const lits = new Lits()
  it('samples', () => {
    expect(lits.run('(tripple 9)', { jsFunctions })).toBe(27)
    expect(lits.run('(def a tripple) (a 9)', { jsFunctions })).toBe(27)
    expect(() => lits.run('(throwError)', { jsFunctions })).toThrowError(LitsError)
    expect(() => lits.run('(throwString)', { jsFunctions })).toThrowError(LitsError)
    expect(() => lits.run('(throwNumber)', { jsFunctions })).toThrowError(LitsError)
  })
  it('builtin names cannot be shadowed', () => {
    const warn = console.warn
    console.warn = vitest.fn()
    expect(lits.run('(+ 1 2 3)', { jsFunctions: stupidJsFunctions })).toBe(6)
    expect(console.warn).toHaveBeenCalledTimes(2)
    expect(lits.run('(if true false true)', { jsFunctions: stupidJsFunctions })).toBe(false)
    expect(console.warn).toHaveBeenCalledTimes(4)
    console.warn = warn
  })
  it('nested nativeJsFunction', () => {
    expect(lits.run('(obj.square 9)', { values })).toBe(81)
  })
})
