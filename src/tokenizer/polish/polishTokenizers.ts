import { LitsError } from '../../errors'
import { polishIdentifierCharacterClass } from '../../identifier'
import {
  NO_MATCH,
  commonTokenizers,
  isNoMatch,
  tokenizeString,
} from '../common/commonTokenizers'
import type { Tokenizer } from '../interface'
import { polishReservedNamesRecord } from './polishReservedNames'
import type {
  ModifierName,
  P_CollectionAccessorToken,
  P_CommentToken,
  P_FnShorthandToken,
  P_ModifierToken,
  P_NumberToken,
  P_RegexpShorthandToken,
  P_ReservedSymbolToken,
  P_StringShorthandToken,
  P_SymbolToken,
  P_WhitespaceToken,
  PolishToken,
} from './polishTokens'
import { asP_SymbolToken, modifierNames } from './polishTokens'

const whitespaceRegExp = /\s|,/

export const tokenizeP_Comment: Tokenizer<P_CommentToken> = (input, position) => {
  if (input[position] === ';') {
    let length = 0
    let value = ''
    while (input[position + length] !== '\n' && position + length < input.length) {
      value += input[position + length]
      length += 1
    }

    return [length, ['P_Comment', value]]
  }
  return NO_MATCH
}

export const tokenizeP_Whitespace: Tokenizer<P_WhitespaceToken> = (input, position) => {
  let char = input[position]
  if (!char || !whitespaceRegExp.test(char)) {
    return NO_MATCH
  }
  let value = char
  position += 1
  char = input[position]
  while (char && whitespaceRegExp.test(char)) {
    value += char
    position += 1
    char = input[position]
  }
  return [value.length, ['P_Whitespace', value]]
}

const endOfNumberRegExp = /[\s)\]},;#`]/
const decimalNumberRegExp = /\d/
const octalNumberRegExp = /[0-7]/
const hexNumberRegExp = /[0-9a-f]/i
const binaryNumberRegExp = /[01]/
const firstCharRegExp = /[0-9.-]/
export const tokenizeP_Number: Tokenizer<P_NumberToken> = (input, position) => {
  let type: 'decimal' | 'octal' | 'hex' | 'binary' = 'decimal'
  const firstChar = input[position] as string
  if (!firstCharRegExp.test(firstChar))
    return NO_MATCH

  let hasDecimals = firstChar === '.'

  let i: number
  for (i = position + 1; i < input.length; i += 1) {
    const char = input[i] as string
    if (endOfNumberRegExp.test(char))
      break

    if (char === '.') {
      const nextChar = input[i + 1]
      if (typeof nextChar === 'string' && !decimalNumberRegExp.test(nextChar))
        break
    }
    if (i === position + 1 && firstChar === '0') {
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

  return [length, ['P_Number', value]]
}

export const P_symbolRegExp = new RegExp(polishIdentifierCharacterClass)
export const tokenizeP_Symbol: Tokenizer<P_SymbolToken> = (input, position) => {
  let char = input[position]
  let length = 0
  let value = ''

  if (!char || !P_symbolRegExp.test(char))
    return NO_MATCH

  while (char && P_symbolRegExp.test(char)) {
    value += char
    length += 1
    char = input[position + length]
  }

  return [length, ['P_Symbol', value]]
}

export const tokenizeP_FnShorthand: Tokenizer<P_FnShorthandToken> = (input, position) => {
  if (input.slice(position, position + 2) !== '#(')
    return NO_MATCH

  return [1, ['P_FnShorthand']]
}

export const tokenizeP_ReservedSymbol: Tokenizer<P_ReservedSymbolToken> = (input, position) => {
  for (const [reservedName, { forbidden }] of Object.entries(polishReservedNamesRecord)) {
    const length = reservedName.length
    const nextChar = input[position + length]
    if (nextChar && P_symbolRegExp.test(nextChar)) {
      continue
    }

    const symbol = input.substring(position, position + length)
    if (symbol === reservedName) {
      if (forbidden)
        throw new LitsError(`${symbol} is forbidden!`, undefined)

      return [length, ['P_ReservedSymbol', reservedName]]
    }
  }
  return NO_MATCH
}

const tokenizeP_StringShorthand: Tokenizer<P_StringShorthandToken> = (input, position) => {
  if (input[position] !== ':')
    return NO_MATCH

  const symbolDescription = tokenizeP_Symbol(input, position + 1)
  if (isNoMatch(symbolDescription)) {
    return symbolDescription
  }

  const symbolToken = asP_SymbolToken(symbolDescription[1])

  return [symbolDescription[0] + 1, ['P_StringShorthand', `:${symbolToken[1]}`]]
}

export const tokenizeP_Modifier: Tokenizer<P_ModifierToken> = (input, position) => {
  for (const modifierName of modifierNames) {
    const length = modifierName.length
    const charAfterModifier = input[position + length]
    if (input.substring(position, position + length) === modifierName && (!charAfterModifier || !P_symbolRegExp.test(charAfterModifier))) {
      const value: ModifierName = modifierName
      return [length, ['P_Modifier', value]]
    }
  }
  return NO_MATCH
}

export const tokenizeP_CollectionAccessor: Tokenizer<P_CollectionAccessorToken> = (input, position) => {
  const char = input[position]
  if (char !== '.' && char !== '#')
    return NO_MATCH

  return [1, ['P_CollectionAccessor', char]]
}

export const tokenizeP_RegexpShorthand: Tokenizer<P_RegexpShorthandToken> = (input, position) => {
  if (input[position] !== '#')
    return NO_MATCH

  const [stringLength, token] = tokenizeString(input, position + 1)
  if (!token)
    return NO_MATCH

  position += stringLength + 1
  let length = stringLength + 1

  let options = ''
  while (input[position] === 'g' || input[position] === 'i') {
    if (options.includes(input[position]!)) {
      throw new LitsError(`Duplicated regexp option "${input[position]}" at position ${position}.`, undefined)
    }
    options += input[position]!
    length += 1
    position += 1
  }

  return [length, ['P_RegexpShorthand', `#${token[1]}${options}`]]
}

// All tokenizers, order matters!
export const polishTokenizers = [
  tokenizeP_Whitespace,
  tokenizeP_Comment,
  ...commonTokenizers,
  tokenizeP_StringShorthand,
  tokenizeP_Number,
  tokenizeP_ReservedSymbol,
  tokenizeP_Symbol,
  tokenizeP_Modifier,
  tokenizeP_RegexpShorthand,
  tokenizeP_FnShorthand,
  tokenizeP_CollectionAccessor,
] as const satisfies Tokenizer<PolishToken>[]
