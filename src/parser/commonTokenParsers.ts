import { LitsError } from '../errors'
import { AstNodeType } from '../constants/constants'
import { asStringToken } from '../tokenizer/common/commonTokens'
import { isA_NumberToken, isA_ReservedSymbolToken, isA_SymbolToken } from '../tokenizer/algebraic/algebraicTokens'
import type { TokenStream } from '../tokenizer/interface'
import { isP_NumberToken, isP_ReservedSymbolToken, isP_SymbolToken } from '../tokenizer/polish/polishTokens'
import { asToken } from '../tokenizer/tokens'
import { getTokenDebugData } from '../tokenizer/utils'
import type {
  NumberNode,
  ParseState,
  ReservedSymbolNode,
  StringNode,
  SymbolNode,
} from './interface'

export function parseSymbol(tokenStream: TokenStream, parseState: ParseState): SymbolNode {
  const tkn = asToken(tokenStream.tokens[parseState.position++])
  if (!isA_SymbolToken(tkn) && !isP_SymbolToken(tkn)) {
    throw new LitsError(`Expected symbol token, got ${tkn[0]}`, getTokenDebugData(tkn)?.sourceCodeInfo)
  }
  return {
    t: AstNodeType.Symbol,
    v: tkn[1],
    p: [],
    n: undefined,
    token: getTokenDebugData(tkn) && tkn,
  }
}

export function parseReservedSymbol(tokenStream: TokenStream, parseState: ParseState): ReservedSymbolNode {
  const tkn = asToken(tokenStream.tokens[parseState.position++])

  if (!isA_ReservedSymbolToken(tkn) && !isP_ReservedSymbolToken(tkn)) {
    throw new LitsError(`Expected symbol token, got ${tkn[0]}`, getTokenDebugData(tkn)?.sourceCodeInfo)
  }
  return {
    t: AstNodeType.ReservedSymbol,
    v: tkn[1],
    p: [],
    n: undefined,
    token: getTokenDebugData(tkn) && tkn,
  }
}

export function parseNumber(tokenStream: TokenStream, parseState: ParseState): NumberNode {
  const tkn = tokenStream.tokens[parseState.position++]
  if (!isP_NumberToken(tkn) && !isA_NumberToken(tkn)) {
    throw new LitsError(`Expected number token, got ${tkn}`, getTokenDebugData(tkn)?.sourceCodeInfo)
  }
  const value = tkn[1]
  const negative = value[0] === '-'
  const numberString = negative ? value.substring(1) : value
  return {
    t: AstNodeType.Number,
    v: negative ? -Number(numberString) : Number(numberString),
    p: [],
    n: undefined,
    token: getTokenDebugData(tkn) && tkn,
  }
}

export function parseString(tokenStream: TokenStream, parseState: ParseState): StringNode {
  const tkn = asStringToken(tokenStream.tokens[parseState.position++])
  const value = tkn[1].substring(1, tkn[1].length - 1)
    .replace(
      /(\\{2})|(\\")|(\\n)|(\\t)|(\\r)|(\\b)|(\\f)|\\(.)/g,
      (
        _,
        backslash: string,
        doubleQuote: string,
        newline: string,
        tab: string,
        carriageReturn: string,
        backspace: string,
        formFeed: string,
        normalChar: string,
      ) => {
        // If it's a double escape (\\x), return \x
        if (backslash) {
          return '\\'
        }
        // If it's a special character (\n, \t, \r, \b, \f), return the special character
        else if (newline) {
          return '\n'
        }
        else if (tab) {
          return '\t'
        }
        else if (carriageReturn) {
          return '\r'
        }
        else if (backspace) {
          return '\b'
        }
        else if (formFeed) {
          return '\f'
        }
        else if (doubleQuote) {
          return '"'
        }
        return normalChar
      },
    )

  return {
    t: AstNodeType.String,
    v: value,
    p: [],
    n: undefined,
    token: getTokenDebugData(tkn) && tkn,
  }
}
