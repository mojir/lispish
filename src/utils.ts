import { UnexpectedNodeTypeError } from './errors'
import { Arr, Coll, Obj, Seq } from './interface'
import {
  AstNode,
  ExpressionNode,
  functionSymbol,
  LispishFunction,
  NameNode,
  NormalExpressionNode,
  NormalExpressionNodeName,
  SpecialExpressionNode,
} from './parser/interface'

export function asAstNode(node: AstNode | undefined): AstNode {
  if (node === undefined) {
    throw Error(`Expected an AST node, got undefined`)
  }
  return node
}

export function asLispishFunction(value: unknown): LispishFunction {
  if (isLispishFunction(value)) {
    return value
  }
  throw Error(`Expected a Lispish function, got ${value}`)
}

export function asNameNode(node: AstNode | undefined): NameNode {
  if (node === undefined || node.type !== `Name`) {
    throw new UnexpectedNodeTypeError(`Name`, node)
  }
  return node
}

export function assertNameNode(node: AstNode | undefined): asserts node is NameNode {
  if (node === undefined || node.type !== `Name`) {
    throw new UnexpectedNodeTypeError(`Name`, node)
  }
}

export function asNotUndefined<T>(value: T | undefined, message = `Unexpected end of input`): T {
  if (value === undefined) {
    throw Error(message)
  }
  return value
}

export function assertNotUndefined<T>(value: T | undefined, message = `Unexpected end of input`): asserts value is T {
  if (value === undefined) {
    throw Error(message)
  }
}

export function assertFiniteNumber(value: unknown): asserts value is number {
  if (typeof value !== `number` || !isFinite(value)) {
    throw TypeError(`Expected number, got: ${value} type="${typeof value}"`)
  }
}

export function asFiniteNumber(value: unknown): number {
  assertFiniteNumber(value)
  return value
}

export function assertPositiveNumber(value: unknown): asserts value is number {
  assertFiniteNumber(value)
  if (value <= 0) {
    throw TypeError(`Expected positive number, got ${value}`)
  }
}

export function assertNegativeNumber(value: unknown): asserts value is number {
  assertFiniteNumber(value)
  if (value >= 0) {
    throw TypeError(`Expected negative number, got ${value}`)
  }
}

export function assertNonNegativeNumber(value: unknown): asserts value is number {
  assertFiniteNumber(value)
  if (value < 0) {
    throw TypeError(`Expected non negative number, got ${value}`)
  }
}

export function assertNonNegativeInteger(value: unknown): asserts value is number {
  assertNonNegativeNumber(value)
  assertInteger(value)
}

export function assertNonPositiveNumber(value: unknown): asserts value is number {
  assertFiniteNumber(value)
  if (value > 0) {
    throw TypeError(`Expected non positive number, got ${value}`)
  }
}

export function assertInteger(value: unknown): asserts value is number {
  assertFiniteNumber(value)
  if (!Number.isInteger(value)) {
    throw TypeError(`Expected integer, got ${value}`)
  }
}

export function assertNumberGte(value: unknown, x: number): asserts value is number {
  assertFiniteNumber(value)
  if (value < x) {
    throw TypeError(`Expected parameter (${value}) to be a number equal or grater than ${x}`)
  }
}

export function assertNumberGt(value: unknown, x: number): asserts value is number {
  assertFiniteNumber(value)
  if (value <= x) {
    throw TypeError(`Expected parameter (${value}) to be a number grater than ${x}`)
  }
}

export function assertNumberLte(value: unknown, x: number): asserts value is number {
  assertFiniteNumber(value)
  if (value > x) {
    throw TypeError(`Expected parameter (${value}) to be a number equal or less than ${x}`)
  }
}

export function assertNumberLt(value: unknown, x: number): asserts value is number {
  assertFiniteNumber(value)
  if (value >= x) {
    throw TypeError(`Expected parameter (${value}) to be a number less than ${x}`)
  }
}

export function assertString(value: unknown): asserts value is string {
  if (typeof value !== `string`) {
    throw TypeError(`Expected string, got: ${value} type="${typeof value}"`)
  }
}

export function assertChar(value: unknown): asserts value is string {
  assertString(value)
  if (value.length !== 1) {
    throw TypeError(`Expected char, got: ${value} type="${typeof value}"`)
  }
}

export function assertStringOrNumber(value: unknown): asserts value is string {
  if (!(typeof value === `string` || typeof value === `number`)) {
    throw TypeError(`Expected string or number, got: ${value} type="${typeof value}"`)
  }
}

export function asNonEmptyString(value: unknown): string {
  if (typeof value !== `string` || value.length === 0) {
    throw TypeError(`Expected non empty string, got: ${value} type="${typeof value}"`)
  }
  return value
}

export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp
}

export function assertRegExp(value: unknown): asserts value is RegExp {
  if (!(value instanceof RegExp)) {
    throw TypeError(`Expected RegExp, got: ${value} type="${typeof value}"`)
  }
}

export function assertStringOrRegExp(value: unknown): asserts value is RegExp | string {
  if (!(value instanceof RegExp || typeof value === `string`)) {
    throw TypeError(`Expected RegExp or string, got: ${value} type="${typeof value}"`)
  }
}

export function assertObjectOrArray(value: unknown): asserts value is Obj | Arr {
  if (
    (value === null ||
      typeof value !== `object` ||
      Array.isArray(value) ||
      value instanceof RegExp ||
      isLispishFunction(value)) &&
    !Array.isArray(value)
  ) {
    throw TypeError(`Expected object or array, got: ${value} type="${typeof value}"`)
  }
}

export function assertNumberNotZero(value: unknown): asserts value is number {
  assertFiniteNumber(value)
  if (value === 0) {
    throw TypeError(`Expected non zero value`)
  }
}

export function assertLength(
  count: number | { min?: number; max?: number },
  node: NormalExpressionNode | SpecialExpressionNode,
): void {
  const length = node.params.length
  if (typeof count === `number`) {
    if (length !== count) {
      throw Error(`Wrong number of arguments to "${node.name}", expected ${count}, got ${length}`)
    }
  } else {
    const { min, max } = count
    if (min === undefined && max === undefined) {
      throw Error(`Min or max must be specified`)
    }

    if (typeof min === `number` && length < min) {
      throw Error(`Wrong number of arguments to "${node.name}", expected at least ${min}, got ${length}`)
    }

    if (typeof max === `number` && length > max) {
      throw Error(`Wrong number of arguments to "${node.name}", expected at most ${max}, got ${length}`)
    }
  }
}

export function assertLengthEven(node: NormalExpressionNode): void {
  const length = node.params.length
  if (length % 2 !== 0) {
    throw Error(`Wrong number of arguments, expected an even number, got ${length}`)
  }
}

export function isLispishFunction(func: unknown): func is LispishFunction {
  if (func === null || typeof func !== `object`) {
    return false
  }
  return !!(func as LispishFunction)[functionSymbol]
}

export function assertLispishFunction(func: unknown): asserts func is LispishFunction {
  if (!isLispishFunction(func)) {
    throw Error(`Expected lispish function, got ${JSON.stringify(func)}`)
  }
}

// export function isUserDefinedLispishFunction(func: unknown): func is UserDefinedLispishFunction {
//   if (isLispishFunction(func)) {
//     return !!(func as UserDefinedLispishFunction).arguments
//   }
//   return false
// }

// export function isPartialLispishFunction(func: unknown): func is PartialLispishFunction {
//   if (isLispishFunction(func)) {
//     return !!Object.getOwnPropertyDescriptor(func, `fn`)
//   }
//   return false
// }

// export function isCompLispishFunction(func: unknown): func is CompLispishFunction {
//   if (isLispishFunction(func)) {
//     return !!Object.getOwnPropertyDescriptor(func, `fns`)
//   }
//   return false
// }

// export function isBuiltinLispishFunction(func: unknown): func is UserDefinedLispishFunction {
//   return isLispishFunction(func) && !isUserDefinedLispishFunction(func)
// }

export function assertStringArray(value: unknown): asserts value is string[] {
  if (!Array.isArray(value) || value.some(v => typeof v !== `string`)) {
    throw Error(`Expected an array of strings, got ${value}`)
  }
}

export function assertCharArray(arr: unknown): asserts arr is string[] {
  if (!Array.isArray(arr) || arr.some(v => typeof v !== `string` || v.length !== 1)) {
    throw Error(`Expected an array of chars, got ${arr}`)
  }
}

export function isExpressionNode(node: AstNode): node is ExpressionNode {
  return (
    node.type === `NormalExpression` ||
    node.type === `SpecialExpression` ||
    node.type === `Number` ||
    node.type === `String`
  )
}

export function assertNumber(value: unknown): asserts value is number {
  if (!isNumber(value)) {
    throw TypeError(`Expected a number, got: ${value} type="${typeof value}"`)
  }
}

export function assertArr(value: unknown): asserts value is Arr {
  if (!isArr(value)) {
    throw TypeError(`Expected Arr, got: ${value} type="${typeof value}"`)
  }
}

export function assertColl(value: unknown): asserts value is Coll {
  if (!isColl(value)) {
    throw TypeError(`Expected collection, got: ${value} type="${typeof value}"`)
  }
}

export function assertSeq(value: unknown): asserts value is Array<unknown> | string {
  if (!isSeq(value)) {
    throw TypeError(`Expected string or array, got: ${value} type="${typeof value}"`)
  }
}

export function assertObj(value: unknown): asserts value is Obj {
  if (!isObj(value)) {
    throw TypeError(`Expected object, got: ${value} type="${typeof value}"`)
  }
}

export function isObj(value: unknown): value is Obj {
  return !(
    value === null ||
    typeof value !== `object` ||
    Array.isArray(value) ||
    value instanceof RegExp ||
    isLispishFunction(value)
  )
}

export function isArr(value: unknown): value is Arr {
  return Array.isArray(value)
}

export function isSeq(value: unknown): value is Seq {
  return Array.isArray(value) || isString(value)
}

export function isColl(value: unknown): value is Coll {
  return isSeq(value) || isObj(value)
}

export function isString(value: unknown): value is string {
  return typeof value === `string`
}

export function isNumber(value: unknown): value is number {
  return typeof value === `number`
}

export function isInteger(value: unknown): value is number {
  return Number.isInteger(value)
}

export function hasKey(coll: unknown, key: string | number): coll is Coll {
  if (!isColl(coll)) {
    return false
  }
  if (isString(coll) || isArr(coll)) {
    if (!isInteger(key)) {
      return false
    }
    return key >= 0 && key < coll.length
  }
  return !!Object.getOwnPropertyDescriptor(coll, key)
}

// TODO make it into enum or record with sort number as value
type Type = `undefined` | `null` | `boolean` | `number` | `string` | `object` | `array` | `regexp` | `unknown`

const sortOrderByType: Record<Type, number> = {
  boolean: 0,
  number: 1,
  string: 2,
  array: 3,
  object: 4,
  regexp: 5,
  unknown: 6,
  null: 7,
  undefined: 8, // Must be last, sinse javascript sort always adds these last
}

function getType(value: unknown): Type {
  if (value === undefined) {
    return `undefined`
  } else if (value === null) {
    return `null`
  } else if (typeof value === `boolean`) {
    return `boolean`
  } else if (typeof value === `number`) {
    return `number`
  } else if (typeof value === `string`) {
    return `string`
  } else if (isArr(value)) {
    return `array`
  } else if (isObj(value)) {
    return `object`
  } else if (isRegExp(value)) {
    return `regexp`
  } else {
    return `unknown`
  }
}

export function compare(a: unknown, b: unknown): number {
  const aType = getType(a)
  const bType = getType(b)
  if (aType !== bType) {
    return Math.sign(sortOrderByType[aType] - sortOrderByType[bType])
  }

  switch (aType) {
    case `undefined`:
      return 0
    case `null`:
      return 0
    case `boolean`:
      if (a === b) {
        return 0
      }
      return a === false ? -1 : 1
    case `number`:
      return Math.sign((a as number) - (b as number))
    case `string`: {
      const aString = a as string
      const bString = b as string
      return aString < bString ? -1 : aString > bString ? 1 : 0
    }
    case `array`: {
      const aArray = a as Arr
      const bArray = b as Arr
      if (aArray.length < bArray.length) {
        return -1
      } else if (aArray.length > bArray.length) {
        return 1
      }
      for (let i = 0; i < aArray.length; i += 1) {
        const innerComp = compare(aArray[i], bArray[i])
        if (innerComp !== 0) {
          return innerComp
        }
      }
      return 0
    }
    case `object`: {
      const aObj = a as Obj
      const bObj = b as Obj
      return Math.sign(Object.keys(aObj).length - Object.keys(bObj).length)
    }
    case `regexp`: {
      const aString = (a as RegExp).source
      const bString = (b as RegExp).source
      return aString < bString ? -1 : aString > bString ? 1 : 0
    }
    case `unknown`:
      return 0
  }
}

export function isNormalExpressionNodeName(node: NormalExpressionNode): node is NormalExpressionNodeName {
  return typeof node.name === `string`
}
