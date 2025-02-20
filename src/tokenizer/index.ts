import { getNextInfixToken } from './infix'
import type { TokenStream, TokenizeParams } from './interface'
import { getNextPostfixToken } from './postfix'
import { getSugar } from './sugar'
import { isIF_PostfixToken, isPF_InfixToken } from './Token'

export function tokenize(input: string, params: TokenizeParams): TokenStream {
  const debug = !!params.debug
  let infix = !!params.infix
  let position = 0
  const tokenStream: TokenStream = {
    tokens: [],
    filePath: params.filePath,
    hasDebugData: debug,
    infix,
  }

  while (position < input.length) {
    const [count, token] = infix
      ? getNextInfixToken(input, position, params)
      : getNextPostfixToken(input, position, params)

    position += count
    if (token) {
      tokenStream.tokens.push(token)
      if (isPF_InfixToken(token)) {
        infix = true
      }
      if (isIF_PostfixToken(token)) {
        infix = false
      }
    }
  }

  applySugar(tokenStream)

  return tokenStream
}

function applySugar(tokenStream: TokenStream) {
  const sugar = getSugar()
  sugar.forEach(sugarFn => sugarFn(tokenStream))
}
