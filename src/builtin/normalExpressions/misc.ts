import { assertLengthOne, assertLengthOneOrMore, assertLengthZero } from '../../utils'
import { BuiltinNormalExpressions } from './interface'

export const misc: BuiltinNormalExpressions = {
  write: {
    evaluate: ([first]: unknown[]): unknown => {
      // eslint-disable-next-line no-console
      console.log(first)
      return first
    },
    validate: ({ params }) => assertLengthOne(params),
  },

  now: {
    evaluate: (): number => {
      return Date.now()
    },
    validate: ({ params }) => assertLengthZero(params),
  },

  '=': {
    evaluate: ([first, ...rest]: unknown[]): boolean => {
      for (const param of rest) {
        if (param !== first) {
          return false
        }
      }
      return true
    },
    validate: ({ params }) => assertLengthOneOrMore(params),
  },

  '!=': {
    evaluate: (params: unknown[]): boolean => {
      for (let i = 0; i < params.length - 1; i += 1) {
        for (let j = i + 1; j < params.length; j += 1) {
          if (params[i] === params[j]) {
            return false
          }
        }
      }
      return true
    },
    validate: ({ params }) => assertLengthOneOrMore(params),
  },

  not: {
    evaluate: ([first]: unknown[]): boolean => !first,
    validate: ({ params }) => assertLengthOne(params),
  },
}
