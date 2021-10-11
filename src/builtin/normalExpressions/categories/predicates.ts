import { isLispishFunction, isObj } from '../../../utils'
import { NormalExpressionNode } from '../../../parser/interface'
import { assertLength, assertFiniteNumber } from '../../../utils'
import { BuiltinNormalExpressions } from '../../interface'
import { Arr } from '../../../interface'

export const predicatesNormalExpression: BuiltinNormalExpressions = {
  'function?': {
    evaluate: ([first]: Arr): boolean => isLispishFunction(first),
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  'string?': {
    evaluate: ([first]: Arr): boolean => typeof first === `string`,
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  'number?': {
    evaluate: ([first]: Arr): boolean => typeof first === `number`,
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  'integer?': {
    evaluate: ([first]: Arr): boolean => typeof first === `number` && Number.isInteger(first),
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  'boolean?': {
    evaluate: ([first]: Arr): boolean => typeof first === `boolean`,
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  'undefined?': {
    evaluate: ([first]: Arr): boolean => first === undefined,
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  'null?': {
    evaluate: ([first]: Arr): boolean => first === null,
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  'zero?': {
    evaluate: ([first]: Arr): boolean => {
      assertFiniteNumber(first)
      return first === 0
    },
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  'pos?': {
    evaluate: ([first]: Arr): boolean => {
      assertFiniteNumber(first)
      return first > 0
    },
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  'neg?': {
    evaluate: ([first]: Arr): boolean => {
      assertFiniteNumber(first)
      return first < 0
    },
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  'even?': {
    evaluate: ([first]: Arr): boolean => {
      assertFiniteNumber(first)
      return first % 2 === 0
    },
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  'odd?': {
    evaluate: ([first]: Arr): boolean => {
      assertFiniteNumber(first)
      return Number.isInteger(first) && first % 2 !== 0
    },
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  'array?': {
    evaluate: ([first]: Arr): boolean => {
      return Array.isArray(first)
    },
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  'collection?': {
    evaluate: ([first]: Arr): boolean => {
      return Array.isArray(first) || isObj(first)
    },
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  'object?': {
    evaluate: ([first]: Arr): boolean => isObj(first),
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  'regexp?': {
    evaluate: ([first]: Arr): boolean =>
      first !== null && !Array.isArray(first) && typeof first === `object` && first instanceof RegExp,
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },
}
