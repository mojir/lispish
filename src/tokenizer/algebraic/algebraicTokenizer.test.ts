import { describe, expect, it } from 'vitest'
import { NO_MATCH } from '../common/commonTokenizers'
import { tokenizeA_MultiLineComment, tokenizeA_Number, tokenizeA_Operator, tokenizeA_SingleLineComment, tokenizeA_Symbol } from './algebraicTokenizers'

describe('algebraicTokenizers', () => {
  describe('tokenizeA_SingleLineComment', () => {
    it('should tokenize inline comment', () => {
      expect(tokenizeA_SingleLineComment('// comment', 0)).toEqual([10, ['A_SingleLineComment', '// comment']])
      expect(tokenizeA_SingleLineComment('... // comment', 4)).toEqual([10, ['A_SingleLineComment', '// comment']])
      expect(tokenizeA_SingleLineComment('... // comment\n...', 4)).toEqual([10, ['A_SingleLineComment', '// comment']])
    })
  })
  describe('tokenizeA_MultiLineComment', () => {
    it('should tokenize block comment', () => {
      expect(tokenizeA_MultiLineComment('/* comment */', 0)).toEqual([13, ['A_MultiLineComment', '/* comment */']])
      expect(tokenizeA_MultiLineComment('... /* comment */', 4)).toEqual([13, ['A_MultiLineComment', '/* comment */']])
      expect(tokenizeA_MultiLineComment('... /* comment \n comment */ ...', 4))
        .toEqual([23, ['A_MultiLineComment', '/* comment \n comment */']])
    })
  })
  describe('tokenizeA_Symbol', () => {
    it('should tokenize symbol', () => {
      expect(tokenizeA_Symbol('symbol', 0)).toEqual([6, ['A_Symbol', 'symbol']])
      expect(tokenizeA_Symbol('A:B', 0)).toEqual([3, ['A_Symbol', 'A:B']])
      expect(tokenizeA_Symbol('... \'A-B\'', 4)).toEqual([5, ['A_Symbol', 'A-B']])
      expect(tokenizeA_Symbol('... \'A B\'', 4)).toEqual(NO_MATCH)
    })
  })
  describe('tokenizeA_Operator', () => {
    it('should tokenize operator', () => {
      expect(tokenizeA_Operator('>>>', 0)).toEqual([3, ['A_Operator', '>>>']])
      expect(tokenizeA_Operator('<=', 0)).toEqual([2, ['A_Operator', '<=']])
      expect(tokenizeA_Operator('+', 0)).toEqual([1, ['A_Operator', '+']])
      expect(tokenizeA_Operator('...', 4)).toEqual(NO_MATCH)
    })
  })
  describe('tokenizeA_Number', () => {
    it('should tokenize operator', () => {
      expect(tokenizeA_Number('1', 0)).toEqual([1, ['A_Number', '1']])
      expect(tokenizeA_Number('0xF', 0)).toEqual([3, ['A_Number', '0xF']])
      expect(tokenizeA_Number('0o7', 0)).toEqual([3, ['A_Number', '0o7']])
      expect(tokenizeA_Number('0b1100', 0)).toEqual([6, ['A_Number', '0b1100']])
      expect(tokenizeA_Number('-1', 0)).toEqual([0])
    })
  })
})
