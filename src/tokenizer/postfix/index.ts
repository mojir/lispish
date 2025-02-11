import { LitsError } from '../../errors'
import type { MetaToken, SourceCodeInfo, Token, TokenDebugData, TokenDescriptor, TokenizeParams } from '../interface'
import { commentTokenizers, newLineTokenizers, tokenizers } from './tokenizers'

function getSourceCodeLine(input: string, lineNbr: number): string {
  return input.split(/\r\n|\r|\n/)[lineNbr] as string
}

function createSourceCodeInfo(input: string, position: number, filePath?: string): SourceCodeInfo {
  const lines = input.substring(0, position + 1).split(/\r\n|\r|\n/)
  const lastLine = lines[lines.length - 1] as string

  const code = getSourceCodeLine(input, lines.length - 1)
  const line = lines.length
  const column = lastLine.length
  return {
    code,
    position: {
      line,
      column,
    },
    filePath,
  }
}

export function getNextPostfixToken(input: string, position: number, params: TokenizeParams): TokenDescriptor {
  const debug = !!params.debug
  const initialPosition = position
  const [leadingNewLineTokensLength, leadingNewLineTokens] = readLeadingNewLineTokens(input, position, params)
  position += leadingNewLineTokensLength
  if (position >= input.length)
    return [position - initialPosition, undefined]

  const [leadingCommentTokensLength, leadingCommentTokens] = readLeadingCommentTokens(input, position, params)
  position += leadingCommentTokensLength
  if (position >= input.length)
    return [position - initialPosition, undefined]

  const leadingMetaTokens: MetaToken[] = [...leadingNewLineTokens, ...leadingCommentTokens]

  // Loop through all tokenizer until one matches
  const debugData: TokenDebugData | undefined = debug
    ? {
        sourceCodeInfo: createSourceCodeInfo(input, position, params.filePath),
        metaTokens: { inlineCommentToken: null, leadingMetaTokens },
      }
    : undefined

  let tryNext = true
  while (tryNext) {
    if (position >= input.length) {
      return [position - initialPosition, undefined]
    }
    tryNext = false
    for (const tokenizer of tokenizers) {
      const [nbrOfCharacters, token] = tokenizer(input, position, debugData)
      position += nbrOfCharacters
      if (nbrOfCharacters === 0) {
        continue
      }

      if (!token) {
        tryNext = true
        break
      }

      let inlineCommentToken: Token<'Comment'> | null = null
      if (!isCommentToken(token)) {
        [position, inlineCommentToken] = readInlineCommentToken(input, position, params)
      }

      if (token.debugData) {
        token.debugData.metaTokens.inlineCommentToken = inlineCommentToken
      }

      if (!isCommentToken(token) || debug) {
        return [position - initialPosition, token]
      }
      tryNext = true
      break
    }
  }
  throw new LitsError(`Unrecognized character '${input[position]}'.`, debugData?.sourceCodeInfo)
}

function readLeadingNewLineTokens(input: string, position: number, params: TokenizeParams): [number, MetaToken[]] {
  const newLineTokens: Token<'NewLine'>[] = []

  const initialPosition = position

  let tokenized = false
  while (position < input.length) {
    tokenized = false

    const debugData: TokenDebugData | undefined = params.debug
      ? {
          sourceCodeInfo: createSourceCodeInfo(input, position, params.filePath),
          metaTokens: { inlineCommentToken: null, leadingMetaTokens: [] },
        }
      : undefined

    // Loop through all tokenizer until one matches
    for (const tokenizer of newLineTokenizers) {
      const [nbrOfCharacters, token] = tokenizer(input, position, debugData)
      // tokenizer matched
      if (nbrOfCharacters > 0) {
        tokenized = true
        position += nbrOfCharacters
        if (token) {
          assertNewLineToken(token)

          if (newLineTokens.length < 2)
            newLineTokens.push(token)
        }
        break
      }
    }
    if (!tokenized)
      // All newline tokens read!
      return [position - initialPosition, newLineTokens]
  }
  // Ending up here means that no non newline token was found. I.e. this cannot be leading newline tokens
  return [position - initialPosition, []]
}

function readLeadingCommentTokens(input: string, position: number, params: TokenizeParams): [number, MetaToken[]] {
  const initialPosition = position
  const commentTokens: Token<'Comment'>[] = []

  let tokenized = false
  while (position < input.length) {
    tokenized = false

    const debugData: TokenDebugData | undefined = params.debug
      ? {
          sourceCodeInfo: createSourceCodeInfo(input, position, params.filePath),
          metaTokens: { inlineCommentToken: null, leadingMetaTokens: [] },
        }
      : undefined

    // Loop through all tokenizer until one matches
    for (const tokenizer of commentTokenizers) {
      const [nbrOfCharacters, token] = tokenizer(input, position, debugData)
      // tokenizer matched
      if (nbrOfCharacters > 0) {
        tokenized = true
        position += nbrOfCharacters
        if (token) {
          assertMetaToken(token)

          // If a newline token is found, then this is not a leading comment
          if (isNewLineToken(token))
            return [0, []]

          commentTokens.push(token)
        }
        break
      }
    }
    if (!tokenized)
      // All metatokens read!
      return [position - initialPosition, commentTokens]
  }
  // Ending up here means that no non meta token was found. I.e. this cannot be leading meta tokens
  return [0, []]
}

function readInlineCommentToken(input: string, position: number, params: TokenizeParams): [number, Token<'Comment'> | null] {
  const rollbackPosition = position
  let tokenized = false
  while (position < input.length) {
    tokenized = false
    const debugData: TokenDebugData | undefined = params.debug
      ? {
          sourceCodeInfo: createSourceCodeInfo(input, position, params.filePath),
          metaTokens: { inlineCommentToken: null, leadingMetaTokens: [] },
        }
      : undefined

    // Loop through all tokenizer until one matches
    for (const tokenizer of commentTokenizers) {
      const [nbrOfCharacters, token] = tokenizer(input, position, debugData)

      // tokenizer matched
      if (nbrOfCharacters > 0) {
        tokenized = true
        position += nbrOfCharacters
        if (token) {
          if (isNewLineToken(token))
            return [rollbackPosition, null]
          assertCommentToken(token)
          return [position, token]
        }
        break
      }
    }
    if (!tokenized)
      // All metatokens read! Return undefined if not debug mode
      return [rollbackPosition, null]
  }
  // Ending up here means that no comment token was found and end of tokens reached
  return [position, null]
}

export function isMetaToken(token?: Token): token is MetaToken {
  return !!token && (token.t === 'NewLine' || token.t === 'Comment')
}

export function assertMetaToken(token?: Token): asserts token is MetaToken {
  if (!isMetaToken(token))
    throw new LitsError(`Expected meta token, got ${token?.t}.`)
}

export function isCommentToken(token?: Token): token is Token<'Comment'> {
  return !!token && token.t === 'Comment'
}

export function assertCommentToken(token?: Token): asserts token is Token<'Comment'> {
  if (!isCommentToken(token))
    throw new LitsError(`Expected comment token, got ${token?.t}.`)
}

export function isNewLineToken(token?: Token): token is Token<'NewLine'> {
  return !!token && token.t === 'NewLine'
}

export function assertNewLineToken(token?: Token): asserts token is Token<'NewLine'> {
  if (!isNewLineToken(token))
    throw new LitsError(`Expected newline token, got ${token?.t}.`)
}
