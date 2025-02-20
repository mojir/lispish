import { LitsError } from '../../errors'
import { asNonUndefined } from '../../typeGuards'
import { assertNumber, isNumber } from '../../typeGuards/number'
import type { SourceCodeInfo, TokenStream } from '../interface'
import type { PF_CollectionAccessorToken, PF_StringShorthandToken } from '../Token'
import { addTokenDebugData, asPF_CollectionAccessorToken, asToken, assertNumberToken, assertPF_SymbolToken, getTokenDebugData, isPF_CollectionAccessorToken, isPF_FnShorthandToken, isPF_SymbolToken, isRBraceToken, isRBracketToken, isRParenToken } from '../Token'
import type { SugarFunction } from '.'

export const applyCollectionAccessors: SugarFunction = (tokenStream) => {
  let dotTokenIndex = tokenStream.tokens.findIndex(isPF_CollectionAccessorToken)
  while (dotTokenIndex >= 0) {
    applyCollectionAccessor(tokenStream, dotTokenIndex)
    dotTokenIndex = tokenStream.tokens.findIndex(isPF_CollectionAccessorToken)
  }
  return tokenStream
}

function applyCollectionAccessor(tokenStream: TokenStream, position: number) {
  const dotTkn = asPF_CollectionAccessorToken(tokenStream.tokens[position])
  const debugData = getTokenDebugData(dotTkn)
  const backPosition = getPositionBackwards(tokenStream, position, debugData?.sourceCodeInfo)
  checkForward(tokenStream, position, dotTkn, debugData?.sourceCodeInfo)

  tokenStream.tokens.splice(position, 1)
  tokenStream.tokens.splice(backPosition, 0, ['LParen'])
  const nextTkn = asToken(tokenStream.tokens[position + 1])
  if (dotTkn[1] === '.') {
    assertPF_SymbolToken(nextTkn)
    const token: PF_StringShorthandToken = ['PF_StringShorthand', `:${nextTkn[1]}`]
    tokenStream.tokens[position + 1] = token

    const nextTkndebugData = getTokenDebugData(nextTkn)
    if (nextTkndebugData) {
      addTokenDebugData(token, nextTkndebugData)
    }
  }
  else {
    assertNumberToken(nextTkn)
    assertNumber(Number(nextTkn[1]), debugData?.sourceCodeInfo, { integer: true, nonNegative: true })

    tokenStream.tokens[position + 1] = ['Number', nextTkn[1]]
  }
  tokenStream.tokens.splice(position + 2, 0, ['RParen'])
}

function getPositionBackwards(tokenStream: TokenStream, position: number, sourceCodeInfo: SourceCodeInfo | undefined) {
  let bracketCount: number | null = null
  if (position <= 0)
    throw new LitsError('Array accessor # must come after a sequence', sourceCodeInfo)

  const prevToken = asNonUndefined(tokenStream.tokens[position - 1])
  let openBracket: 'LParen' | 'LBracket' | 'LBrace' | null = null
  let closeBracket: 'RParen' | 'RBracket' | 'RBrace' | null = null

  if (isRParenToken(prevToken)) {
    openBracket = 'LParen'
    closeBracket = 'RParen'
  }
  else if (isRBracketToken(prevToken)) {
    openBracket = 'LBracket'
    closeBracket = 'RBracket'
  }
  else if (isRBraceToken(prevToken)) {
    openBracket = 'LBrace'
    closeBracket = 'RBrace'
  }

  while (bracketCount !== 0) {
    bracketCount = bracketCount === null ? 0 : bracketCount
    position -= 1
    const tkn = asNonUndefined(tokenStream.tokens[position], sourceCodeInfo)
    if (tkn[0] === openBracket) {
      bracketCount += 1
    }
    else if (tkn[0] === closeBracket) {
      bracketCount -= 1
    }
  }
  if (openBracket === 'LParen' && position > 0) {
    const tokenBeforeBracket = asNonUndefined(tokenStream.tokens[position - 1])
    if (isPF_FnShorthandToken(tokenBeforeBracket))
      throw new LitsError('# or . must NOT be preceeded by shorthand lambda function', sourceCodeInfo)
  }
  return position
}

function checkForward(
  tokenStream: TokenStream,
  position: number,
  dotTkn: PF_CollectionAccessorToken,
  sourceCodeInfo: SourceCodeInfo | undefined,
) {
  const tkn = tokenStream.tokens[position + 1]

  if (dotTkn[1] === '.' && !isPF_SymbolToken(tkn)) {
    throw new LitsError('# as a collection accessor must be followed by an name', sourceCodeInfo)
  }

  if (dotTkn[1] === '#' && isNumber(tkn)) {
    throw new LitsError('# as a collection accessor must be followed by an integer', sourceCodeInfo)
  }
}
