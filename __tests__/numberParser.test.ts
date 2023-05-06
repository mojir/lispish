import { Lits } from '../src/'
import { tokenizeNumber } from '../src/tokenizer/tokenizers'

describe(`parse numbers`, () => {
  for (const lits of [new Lits(), new Lits({ debug: true })]) {
    describe(`valid numbers`, () => {
      const numberSamples = [
        `0`,
        `-0`,
        `.0`,
        `-.0`,
        `123`,
        `-123`,
        `.12`,
        `0.12`,
        `-.12`,
        `-0.12`,
        `123.123`,
        `-123.123`,
        `0x1234567890abc`,
        `0o12345670`,
        `0b10`,
        `0X1234567890abc`,
        `0O12345670`,
        `0B10`,
      ]

      numberSamples.forEach(sample => {
        test(`number sample: ${sample}`, () => {
          expect(tokenizeNumber(sample, 0, { line: 0, column: 0, code: `` })).toEqual([
            sample.length,
            { type: `number`, value: sample, debugInfo: { line: 0, column: 0, code: `` } },
          ])
          expect(lits.run(sample)).toEqual(Number(sample))
        })
      })
    })
    describe(`invalid numbers`, () => {
      const numberSamples = [
        `.`,
        `0x`,
        `0X`,
        `0b`,
        `0B`,
        `0o`,
        `0O`,
        `1.1.`,
        `0x1.1`,
        `0b1.1`,
        `0o1.1`,
        `-0x1234567890abcdefABCDEF`,
        `-0o12345670`,
        `-0b10`,
        `-0X1234567890abcdefABCDEF`,
        `-0O12345670`,
        `-0B10`,
      ]

      numberSamples.forEach(sample => {
        test(`number sample: ${sample}`, () => {
          expect(tokenizeNumber(sample, 0, { line: 0, column: 0, code: `` })).toEqual([0, undefined])
        })
      })
    })
  }
})
