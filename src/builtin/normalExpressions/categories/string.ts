import { Any, Arr } from '../../../interface'
import { NormalExpressionNode } from '../../../parser/interface'
import {
  assertLength,
  assertNonNegativeInteger,
  assertFiniteNumber,
  assertNumberGte,
  assertString,
  assertInteger,
  assertArr,
  assertStringOrRegExp,
  assertStringArray,
  isObj,
  assertNonEmptyString,
  asNotUndefined,
} from '../../../utils'
import { BuiltinNormalExpressions } from '../../interface'

export const stringNormalExpression: BuiltinNormalExpressions = {
  subs: {
    evaluate: ([first, second, third]: Arr): Any => {
      assertString(first)
      assertNonNegativeInteger(second)

      if (third === undefined) {
        return (first as string).substring(second)
      }

      assertNumberGte(third, second)
      return (first as string).substring(second, third)
    },
    validate: (node: NormalExpressionNode): void => assertLength({ min: 2, max: 3 }, node),
  },

  'string-repeat': {
    evaluate: ([string, count]: Arr): string => {
      assertString(string)
      assertNonNegativeInteger(count)

      return string.repeat(count)
    },
    validate: node => assertLength(2, node),
  },

  str: {
    evaluate: (params: Arr) => {
      return params.reduce((result: string, param) => {
        const paramStr =
          param === undefined || param === null
            ? ``
            : isObj(param)
            ? JSON.stringify(param)
            : Array.isArray(param)
            ? JSON.stringify(param)
            : `${param}`
        return result + paramStr
      }, ``)
    },
  },

  'string-to-number': {
    evaluate: ([str]: Arr): number => {
      assertString(str)
      const number = Number(str)
      if (Number.isNaN(number)) {
        throw Error(`Could not convert '${str}' to a number`)
      }
      return number
    },
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  'number-to-string': {
    evaluate: (params: Arr): string => {
      const [number, base] = params
      assertFiniteNumber(number)
      if (params.length === 1) {
        return `${number}`
      } else {
        assertFiniteNumber(base)
        if (base !== 2 && base !== 8 && base !== 10 && base !== 16) {
          throw Error(`Expected "number-to-string" base argument to be 2, 8, 10 or 16, got: ${base}`)
        }
        if (base === 10) {
          return `${number}`
        }
        assertNonNegativeInteger(number)
        return Number(number).toString(base)
      }
    },
    validate: (node: NormalExpressionNode): void => assertLength({ min: 1, max: 2 }, node),
  },

  'from-char-code': {
    evaluate: ([number]: Arr): string => {
      assertFiniteNumber(number)
      const int = Math.max(0, Math.ceil(number))

      return String.fromCodePoint(int)
    },
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  'to-char-code': {
    evaluate: ([str]: Arr): number => {
      assertNonEmptyString(str)
      return asNotUndefined(str.codePointAt(0))
    },
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  'lower-case': {
    evaluate: ([str]: Arr): string => {
      assertString(str)
      return str.toLowerCase()
    },
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  'upper-case': {
    evaluate: ([str]: Arr): string => {
      assertString(str)
      return str.toUpperCase()
    },
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  trim: {
    evaluate: ([str]: Arr): string => {
      assertString(str)
      return str.trim()
    },
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  'trim-left': {
    evaluate: ([str]: Arr): string => {
      assertString(str)
      return str.replace(/^\s+/, ``)
    },
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  'trim-right': {
    evaluate: ([str]: Arr): string => {
      assertString(str)
      return str.replace(/\s+$/, ``)
    },
    validate: (node: NormalExpressionNode): void => assertLength(1, node),
  },

  join: {
    evaluate: ([stringList, delimiter]: Arr): string => {
      assertArr(stringList)
      stringList.forEach(str => assertString(str))
      assertString(delimiter)
      return stringList.join(delimiter)
    },
    validate: (node: NormalExpressionNode): void => assertLength(2, node),
  },

  split: {
    evaluate: ([str, delimiter, limit]: Arr): string[] => {
      assertString(str)
      assertStringOrRegExp(delimiter)
      if (limit !== undefined) {
        assertNonNegativeInteger(limit)
      }
      return str.split(delimiter, limit)
    },
    validate: (node: NormalExpressionNode): void => assertLength({ min: 2, max: 3 }, node),
  },

  'pad-left': {
    evaluate: ([str, length, padString]: Arr): string => {
      assertString(str)
      assertInteger(length)

      if (padString !== undefined) {
        assertString(padString)
      }

      return str.padStart(length, padString)
    },
    validate: (node: NormalExpressionNode): void => assertLength({ min: 2, max: 3 }, node),
  },

  'pad-right': {
    evaluate: ([str, length, padString]: Arr): string => {
      assertString(str)
      assertInteger(length)

      if (padString !== undefined) {
        assertString(padString)
      }

      return str.padEnd(length, padString)
    },
    validate: (node: NormalExpressionNode): void => assertLength({ min: 2, max: 3 }, node),
  },

  template: {
    evaluate: ([templateString, ...placeholders]: Arr): string => {
      assertString(templateString)
      const templateStrings = templateString.split(`||||`)
      if (templateStrings.length === 1) {
        assertStringArray(placeholders)
        return applyPlaceholders(templateStrings[0] as string, placeholders)
      } else if (templateStrings.length === 2) {
        const firstPlaceholder = placeholders[0]
        assertNonNegativeInteger(firstPlaceholder)
        const stringPlaceholders = [`${firstPlaceholder}`, ...placeholders.slice(1)] as string[]
        if (firstPlaceholder === 1) {
          return applyPlaceholders(templateStrings[0] as string, stringPlaceholders)
        } else {
          return applyPlaceholders(templateStrings[1] as string, stringPlaceholders)
        }
      } else {
        throw Error(`Invalid template string, only one "||||" separator allowed`)
      }
    },
    validate: (node: NormalExpressionNode): void => assertLength({ min: 1, max: 10 }, node),
  },
}

const doubleDollarRegexp = /\$\$/g
function applyPlaceholders(templateString: string, placeholders: string[]): string {
  for (let i = 0; i < 9; i += 1) {
    const re = new RegExp(`(?<=^|[^$]|\\$\\$)\\$${i + 1}`, `g`)
    if (re.test(templateString)) {
      const placeholder = placeholders[i]
      assertString(placeholder)
      templateString = templateString.replace(re, placeholder)
    }
  }
  return templateString.replace(doubleDollarRegexp, `$`)
}
