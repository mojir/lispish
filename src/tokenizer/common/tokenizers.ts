import { LitsError } from '../../errors'
import type { TokenDescriptor, Tokenizer } from '../interface'
import type { SimpleToken } from '../tokens'
import type { LBraceToken, LBracketToken, LParenToken, NumberToken, RBraceToken, RBracketToken, RParenToken, StringToken } from './commonTokens'

export const NO_MATCH: TokenDescriptor<never> = [0]

export function isNoMatch(tokenDescriptor: TokenDescriptor<any>): tokenDescriptor is TokenDescriptor<never> {
  return tokenDescriptor[0] === 0
}

export const tokenizeLeftParen: Tokenizer<LParenToken> = (input, position) =>
  tokenizeSimpleToken('LParen', '(', input, position)
export const tokenizeRightParen: Tokenizer<RParenToken> = (input, position) =>
  tokenizeSimpleToken('RParen', ')', input, position)
export const tokenizeLeftBracket: Tokenizer<LBracketToken> = (input, position) =>
  tokenizeSimpleToken('LBracket', '[', input, position)
export const tokenizeRightBracket: Tokenizer<RBracketToken> = (input, position) =>
  tokenizeSimpleToken('RBracket', ']', input, position)
export const tokenizeLeftCurly: Tokenizer<LBraceToken> = (input, position) =>
  tokenizeSimpleToken('LBrace', '{', input, position)
export const tokenizeRightCurly: Tokenizer<RBraceToken> = (input, position) =>
  tokenizeSimpleToken('RBrace', '}', input, position)

export const tokenizeString: Tokenizer<StringToken> = (input, position) => {
  if (input[position] !== '"')
    return NO_MATCH

  let value = '"'
  let length = 1
  let char = input[position + length]
  let escaping = false
  while (char !== '"' || escaping) {
    if (char === undefined)
      throw new LitsError(`Unclosed string at position ${position}.`)

    length += 1
    if (escaping) {
      escaping = false
      value += char
    }
    else {
      if (char === '\\') {
        escaping = true
      }
      value += char
    }
    char = input[position + length]
  }
  value += '"' // closing quote
  return [length + 1, ['String', value]]
}

const decimalNumberRegExp = /\d/
const octalNumberRegExp = /[0-7]/
const hexNumberRegExp = /[0-9a-f]/i
const binaryNumberRegExp = /[01]/
const firstCharRegExp = /[0-9.-]/
export const tokenizeNumber: Tokenizer<NumberToken> = (input, position) => {
  let type: 'decimal' | 'octal' | 'hex' | 'binary' = 'decimal'
  const firstChar = input[position] as string
  const secondChar = input[position + 1] as string
  if (!firstCharRegExp.test(firstChar))
    return NO_MATCH

  let hasDecimals = firstChar === '.'

  let i: number
  for (i = position + 1; i < input.length; i += 1) {
    const char = input[i] as string

    if ((i === position + 1 && firstChar === '0') || (i === position + 2 && firstChar === '-' && secondChar === '0')) {
      if (char === 'b' || char === 'B') {
        type = 'binary'
        continue
      }
      if (char === 'o' || char === 'O') {
        type = 'octal'
        continue
      }
      if (char === 'x' || char === 'X') {
        type = 'hex'
        continue
      }
    }

    if (type === 'decimal') {
      if (hasDecimals) {
        if (!decimalNumberRegExp.test(char)) {
          break
        }
      }
      else if (char !== '.' && !decimalNumberRegExp.test(char)) {
        break
      }
    }
    if (type === 'binary' && !binaryNumberRegExp.test(char)) {
      break
    }
    if (type === 'octal' && !octalNumberRegExp.test(char)) {
      break
    }
    if (type === 'hex' && !hexNumberRegExp.test(char)) {
      break
    }

    if (char === '.') {
      const nextChar = input[i + 1]
      if (typeof nextChar === 'string' && !decimalNumberRegExp.test(nextChar))
        break
    }
    if (type === 'decimal' && hasDecimals) {
      if (!decimalNumberRegExp.test(char))
        return NO_MATCH
    }
    else if (type === 'binary') {
      if (!binaryNumberRegExp.test(char))
        return NO_MATCH
    }
    else if (type === 'octal') {
      if (!octalNumberRegExp.test(char))
        return NO_MATCH
    }
    else if (type === 'hex') {
      if (!hexNumberRegExp.test(char))
        return NO_MATCH
    }
    else {
      if (char === '.') {
        hasDecimals = true
        continue
      }
      if (!decimalNumberRegExp.test(char))
        return NO_MATCH
    }
  }

  const length = i - position
  const value = input.substring(position, i)
  if ((type !== 'decimal' && length <= 2) || value === '.' || value === '-')
    return NO_MATCH

  return [length, ['Number', value]]
}

export function tokenizeSimpleToken<T extends SimpleToken>(
  type: T[0],
  value: string,
  input: string,
  position: number,
): TokenDescriptor<T> {
  if (value === input[position])
    return [1, [type] as T]
  else
    return NO_MATCH
}
