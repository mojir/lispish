import { Context, ContextEntry } from '../../../evaluator/interface'
import { Arr } from '../../../interface'
import {
  assertArr,
  assertLength,
  assertLispishFunction,
  assertObjectOrArray,
  assertString,
  isBuiltinLispishFunction,
  isUserDefinedLispishFunction,
} from '../../../utils'
import { getPath } from '../../getPath'
import { BuiltinNormalExpressions } from '../../interface'
export const miscNormalExpression: BuiltinNormalExpressions = {
  'not=': {
    evaluate: (params: Arr): boolean => {
      for (let i = 0; i < params.length - 1; i += 1) {
        for (let j = i + 1; j < params.length; j += 1) {
          if (params[i] === params[j]) {
            return false
          }
        }
      }

      return true
    },
    validate: node => assertLength({ min: 1 }, node),
  },
  '=': {
    evaluate: ([first, ...rest]: Arr): boolean => {
      for (const param of rest) {
        if (param !== first) {
          return false
        }
      }

      return true
    },
    validate: node => assertLength({ min: 1 }, node),
  },
  apply: {
    evaluate: ([func, array]: Arr, contextStack, { evaluateLispishFunction }): unknown => {
      assertLispishFunction(func)
      assertArr(array)
      return evaluateLispishFunction(func, array, contextStack)
    },
    validate: node => assertLength(2, node),
  },
  'get-path': {
    evaluate: ([first, second]: Arr): unknown => {
      assertObjectOrArray(first)
      assertString(second)
      return getPath(first, second)
    },
    validate: node => assertLength(2, node),
  },
  not: {
    evaluate: ([first]: Arr): boolean => !first,
    validate: node => assertLength(1, node),
  },
  'inst-ms': {
    evaluate: (): number => {
      return Date.now()
    },
    validate: node => assertLength(0, node),
  },
  'write!': {
    evaluate: (params: Arr): unknown => {
      // eslint-disable-next-line no-console
      console.log(...params)

      if (params.length > 0) {
        return params[params.length - 1]
      }

      return undefined
    },
  },
  'debug!': {
    evaluate: (_, contextStack): undefined => {
      // eslint-disable-next-line no-console
      console.error(`*** LISPISH DEBUG ***\n\n${contextstackToString(contextStack)}`)
      return undefined
    },
    validate: node => assertLength(0, node),
  },
  boolean: {
    evaluate: ([value]): boolean => {
      return !!value
    },
    validate: node => assertLength(1, node),
  },
}

function contextstackToString(contextStack: Context[]): string {
  return [...contextStack].reverse().reduce((result, context, index) => {
    return `${result}Context ${index}${
      index === 0 ? ` - Import context` : index === 1 ? ` - Global context` : ``
    }\n${contextToString(context)}\n`
  }, ``)
}

function contextToString(context: Context) {
  if (Object.keys(context).length === 0) {
    return `  <empty>\n`
  }
  const maxKeyLength = Math.max(...Object.keys(context).map(key => key.length))
  return Object.entries(context).reduce((result, entry) => {
    const key = `${entry[0]}`.padEnd(maxKeyLength + 2, ` `)
    return `${result}  ${key}${valueToString(entry[1])}\n`
  }, ``)
}

function valueToString(contextEntry: ContextEntry): string {
  if (isBuiltinLispishFunction(contextEntry.value)) {
    return `<builtin function ${contextEntry.value.name}>`
  } else if (isUserDefinedLispishFunction(contextEntry.value)) {
    if (contextEntry.value.name) {
      return `<function ${contextEntry.value.name}>`
    } else {
      return `<function λ>`
    }
  }
  return JSON.stringify(contextEntry.value)
}
