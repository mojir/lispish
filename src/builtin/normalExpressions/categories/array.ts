import { Arr } from '../../../interface'
import {
  assertLength,
  assertNegativeNumber,
  assertNonNegativeInteger,
  assertFiniteNumber,
  assertNumberNotZero,
  assertPositiveNumber,
} from '../../../utils'
import { BuiltinNormalExpressions } from '../../interface'
export const arrayNormalExpression: BuiltinNormalExpressions = {
  array: {
    evaluate: (params: Arr): Arr => params,
  },

  range: {
    evaluate: (params: Arr): Arr => {
      const [first, second, third] = params
      let from: number
      let to: number
      let step: number
      assertFiniteNumber(first)

      if (params.length === 1) {
        from = 0
        to = first
        step = to >= 0 ? 1 : -1
      } else if (params.length === 2) {
        assertFiniteNumber(second)
        from = first
        to = second
        step = to >= from ? 1 : -1
      } else {
        assertFiniteNumber(second)
        assertFiniteNumber(third)
        from = first
        to = second
        step = third
        if (to > from) {
          assertPositiveNumber(step)
        } else if (to < from) {
          assertNegativeNumber(step)
        } else {
          assertNumberNotZero(step)
        }
      }

      const result: number[] = []

      for (let i = from; step < 0 ? i > to : i < to; i += step) {
        result.push(i)
      }

      return result
    },
    validate: node => assertLength({ min: 1, max: 3 }, node),
  },

  repeat: {
    evaluate: ([count, value]: Arr): Arr => {
      assertNonNegativeInteger(count)
      const result: Arr = []
      for (let i = 0; i < count; i += 1) {
        result.push(value)
      }
      return result
    },
    validate: node => assertLength(2, node),
  },
}
