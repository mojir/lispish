import { Arr, Coll, Obj } from '../../../interface'
import {
  asChar,
  assertArr,
  assertChar,
  assertColl,
  assertInteger,
  assertLength,
  assertLispishFunction,
  assertMax,
  assertNumber,
  assertNumberGte,
  assertNumberLte,
  assertObj,
  assertString,
  assertStringOrNumber,
  isArr,
  isObj,
  isSeq,
  isString,
  toNonNegativeInteger,
} from '../../../utils'
import { BuiltinNormalExpressions } from '../../interface'
export const collectionNormalExpression: BuiltinNormalExpressions = {
  get: {
    evaluate: (params): unknown => {
      const [coll, key, defaultValue] = params
      const hasDefault = params.length === 3

      assertColl(coll)

      if (isArr(coll)) {
        assertInteger(key)
        if (key < coll.length) {
          return coll[key]
        }
      } else if (isObj(coll)) {
        assertString(key)
        if (Object.getOwnPropertyDescriptor(coll, key)) {
          return coll[key]
        }
      } else {
        assertInteger(key)
        return coll[key]
      }
      if (hasDefault) {
        return defaultValue
      }
      return undefined
    },
    validate: node => assertLength({ min: 2, max: 3 }, node),
  },
  count: {
    evaluate: ([coll]): number => {
      if (typeof coll === `string`) {
        return coll.length
      }
      assertColl(coll)
      if (Array.isArray(coll)) {
        return coll.length
      }
      return Object.keys(coll).length
    },
    validate: node => assertLength(1, node),
  },
  'contains?': {
    evaluate: ([coll, key]): boolean => {
      assertColl(coll)
      assertStringOrNumber(key)
      if (isSeq(coll)) {
        if (!Number.isInteger(key)) {
          return false
        }
        assertInteger(key)
        return key >= 0 && key < coll.length
      }
      return !!Object.getOwnPropertyDescriptor(coll, key)
    },
    validate: node => assertLength(2, node),
  },
  'has?': {
    evaluate: ([coll, value]): boolean => {
      assertColl(coll)
      if (isArr(coll)) {
        return coll.includes(value)
      }
      if (isString(coll)) {
        return isString(value) ? coll.split(``).includes(value) : false
      }
      return Object.values(coll).includes(value)
    },
    validate: node => assertLength(2, node),
  },
  assoc: {
    evaluate: ([coll, key, value]): Coll => {
      assertColl(coll)
      assertStringOrNumber(key)
      if (Array.isArray(coll) || typeof coll === `string`) {
        assertInteger(key)
        assertNumberGte(key, 0)
        assertNumberLte(key, coll.length)
        if (typeof coll === `string`) {
          assertChar(value)
          return `${coll.slice(0, key)}${value}${coll.slice(key + 1)}`
        }
        const copy = [...coll]
        copy[key] = value
        return copy
      }
      assertString(key)
      const copy = { ...coll }
      copy[key] = value
      return copy
    },
    validate: node => assertLength(3, node),
  },
  concat: {
    evaluate: (params): unknown => {
      assertColl(params[0])
      if (isArr(params[0])) {
        return params.reduce((result: Arr, arr) => {
          assertArr(arr)
          return result.concat(arr)
        }, [])
      } else if (isString(params[0])) {
        return params.reduce((result: string, s) => {
          assertString(s)
          return `${result}${s}`
        }, ``)
      } else {
        return params.reduce((result: Obj, obj) => {
          assertObj(obj)
          return Object.assign(result, obj)
        }, {})
      }
    },
    validate: node => assertLength({ min: 1 }, node),
  },
  'empty?': {
    evaluate: ([first]): boolean => {
      assertColl(first)
      if (isString(first)) {
        return first.length === 0
      }
      if (Array.isArray(first)) {
        return first.length === 0
      }
      return Object.keys(first).length === 0
    },
    validate: node => assertLength(1, node),
  },
  'every?': {
    evaluate: ([fn, coll], contextStack, { executeFunction }): boolean => {
      assertLispishFunction(fn)
      assertColl(coll)

      if (Array.isArray(coll)) {
        return coll.every(elem => executeFunction(fn, [elem], contextStack))
      }
      if (isString(coll)) {
        return coll.split(``).every(elem => executeFunction(fn, [elem], contextStack))
      }
      return Object.entries(coll).every(elem => executeFunction(fn, [elem], contextStack))
    },
    validate: node => assertLength(2, node),
  },
  'any?': {
    evaluate: ([fn, coll], contextStack, { executeFunction }): boolean => {
      assertLispishFunction(fn)
      assertColl(coll)

      if (Array.isArray(coll)) {
        return coll.some(elem => executeFunction(fn, [elem], contextStack))
      }
      if (isString(coll)) {
        return coll.split(``).some(elem => executeFunction(fn, [elem], contextStack))
      }
      return Object.entries(coll).some(elem => executeFunction(fn, [elem], contextStack))
    },
    validate: node => assertLength(2, node),
  },
  'not-any?': {
    evaluate: ([fn, coll], contextStack, { executeFunction }): boolean => {
      assertLispishFunction(fn)
      assertColl(coll)

      if (Array.isArray(coll)) {
        return !coll.some(elem => executeFunction(fn, [elem], contextStack))
      }
      if (isString(coll)) {
        return !coll.split(``).some(elem => executeFunction(fn, [elem], contextStack))
      }
      return !Object.entries(coll).some(elem => executeFunction(fn, [elem], contextStack))
    },
    validate: node => assertLength(2, node),
  },
  'not-every?': {
    evaluate: ([fn, coll], contextStack, { executeFunction }): boolean => {
      assertLispishFunction(fn)
      assertColl(coll)

      if (Array.isArray(coll)) {
        return !coll.every(elem => executeFunction(fn, [elem], contextStack))
      }
      if (isString(coll)) {
        return !coll.split(``).every(elem => executeFunction(fn, [elem], contextStack))
      }
      return !Object.entries(coll).every(elem => executeFunction(fn, [elem], contextStack))
    },
    validate: node => assertLength(2, node),
  },
  update: {
    evaluate: ([coll, key, fn, ...params], contextStack, { executeFunction }): Coll => {
      assertColl(coll)
      assertStringOrNumber(key)
      assertLispishFunction(fn)
      if (isObj(coll)) {
        assertString(key)
        const result = { ...coll }
        result[key] = executeFunction(fn, [result[key], ...params], contextStack)
        return result
      } else {
        assertNumber(key)
        const intKey = toNonNegativeInteger(key)
        assertMax(intKey, coll.length)
        if (Array.isArray(coll)) {
          const result = coll.map((elem, index) => {
            if (intKey === index) {
              return executeFunction(fn, [elem, ...params], contextStack)
            }
            return elem
          })
          if (intKey === coll.length) {
            result[intKey] = executeFunction(fn, [undefined, ...params], contextStack)
          }
          return result
        } else {
          const result = coll.split(``).map((elem, index) => {
            if (intKey === index) {
              return asChar(executeFunction(fn, [elem, ...params], contextStack))
            }
            return elem
          })
          if (intKey === coll.length) {
            result[intKey] = asChar(executeFunction(fn, [undefined, ...params], contextStack))
          }
          return result
        }
      }
    },
    validate: node => assertLength({ min: 3 }, node),
  },
}
