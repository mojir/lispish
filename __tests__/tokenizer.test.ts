import { tokenize } from '../src/tokenizer'

describe('Tokenizer', () => {
  test('simple expressions', () => {
    const tokens = tokenize(`
      (let ((day (* 24 60 60 1000)))
        (* days day)
      )`)
    expect(tokens.length).toBeGreaterThan(0)
  })
  test('another simple expressions', () => {
    const tokens = tokenize(`(do-me)`)
    // console.log(JSON.stringify(tokens, null, 2))
    expect(tokens.length).toBeGreaterThan(0)
  })

  test('comments', () => {
    expect(tokenize('"Hej" ;This is a string')).toEqual([{ type: 'string', value: 'Hej', inputPosition: 0 }])
    expect(tokenize('"Hej" ;This is a string\n"då"')).toEqual([
      { type: 'string', value: 'Hej', inputPosition: 0 },
      { type: 'string', value: 'då', inputPosition: 24 },
    ])
  })

  describe('strings', () => {
    test('Unclosed string', () => {
      expect(() => tokenize('"Hej')).toThrow()
    })
    test('Escaped string', () => {
      expect(tokenize('"He\\"j"')[0]).toEqual({ type: 'string', value: 'He"j', inputPosition: 0 })
      expect(tokenize('"He\\\\j"')[0]).toEqual({ type: 'string', value: 'He\\j', inputPosition: 0 })
      expect(tokenize('"H\\ej"')[0]).toEqual({ type: 'string', value: 'H\\ej', inputPosition: 0 })
    })
  })
})
