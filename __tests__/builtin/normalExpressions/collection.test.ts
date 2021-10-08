import { Lispish } from '../../../src'

let lispish: Lispish

beforeEach(() => {
  lispish = new Lispish()
})

describe(`collection functions`, () => {
  describe(`count`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(count [])`)).toBe(0)
      expect(lispish.run(`(count [1])`)).toBe(1)
      expect(lispish.run(`(count [1 2 3])`)).toBe(3)
      expect(lispish.run(`(count (object))`)).toBe(0)
      expect(lispish.run(`(count (object "a" 1 "b" 2))`)).toBe(2)
      expect(() => lispish.run(`(count "")`)).toThrow()
      expect(() => lispish.run(`(count "1")`)).toThrow()
      expect(() => lispish.run(`(count "123")`)).toThrow()
      expect(() => lispish.run(`(count)`)).toThrow()
      expect(() => lispish.run(`(count [] [])`)).toThrow()
      expect(() => lispish.run(`(count 12)`)).toThrow()
      expect(() => lispish.run(`(count false)`)).toThrow()
      expect(() => lispish.run(`(count true)`)).toThrow()
      expect(() => lispish.run(`(count null)`)).toThrow()
      expect(() => lispish.run(`(count undefined)`)).toThrow()
    })
  })

  describe(`contains?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(contains? [] 1)`)).toBe(false)
      expect(lispish.run(`(contains? [1] 1)`)).toBe(false)
      expect(lispish.run(`(contains? [1 2 3] 1)`)).toBe(true)
      expect(lispish.run(`(contains? (object) "a")`)).toBe(false)
      expect(lispish.run(`(contains? (object "a" 1 "b" 2) "a")`)).toBe(true)
      expect(lispish.run(`(contains? [] "1")`)).toBe(false)
      expect(lispish.run(`(contains? [1] "1")`)).toBe(false)
      expect(lispish.run(`(contains? [1 2 3] "1")`)).toBe(false)
      expect(lispish.run(`(contains? (object) 1)`)).toBe(false)
      expect(lispish.run(`(contains? (object "a" 1 "b" 2) 2)`)).toBe(false)
      expect(() => lispish.run(`(contains? "")`)).toThrow()
      expect(() => lispish.run(`(contains? [])`)).toThrow()
      expect(() => lispish.run(`(contains? "123")`)).toThrow()
      expect(() => lispish.run(`(contains?)`)).toThrow()
      expect(() => lispish.run(`(contains? [] [])`)).toThrow()
      expect(() => lispish.run(`(contains? 12)`)).toThrow()
      expect(() => lispish.run(`(contains? false)`)).toThrow()
      expect(() => lispish.run(`(contains? true)`)).toThrow()
      expect(() => lispish.run(`(contains? null)`)).toThrow()
      expect(() => lispish.run(`(contains? undefined)`)).toThrow()
    })
  })

  describe(`assoc`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(assoc [1 2 3] 0 "1")`)).toEqual([`1`, 2, 3])
      expect(lispish.run(`(assoc [1 2 3] 1 "2")`)).toEqual([1, `2`, 3])
      expect(lispish.run(`(def a [1 2 3]) (assoc a 1 "2")`)).toEqual([1, `2`, 3])
      expect(lispish.run(`(def a [1 2 3]) (assoc a 1 "2") a`)).toEqual([1, 2, 3])
      expect(lispish.run(`(assoc [1 2 3] 3 "4")`)).toEqual([1, 2, 3, `4`])

      expect(lispish.run(`(assoc {"a" 1 "b" 2} "a" "1")`)).toEqual({ a: `1`, b: 2 })
      expect(lispish.run(`(assoc {"a" 1 "b" 2} "b" "2")`)).toEqual({ a: 1, b: `2` })
      expect(lispish.run(`(def o {"a" 1 "b" 2}) (assoc o "a" "1")`)).toEqual({ a: `1`, b: 2 })
      expect(lispish.run(`(def o {"a" 1 "b" 2}) (assoc o "a" "1") o`)).toEqual({ a: 1, b: 2 })

      expect(() => lispish.run(`(assoc [1 2 3] 4 "4")`)).toThrow()
      expect(() => lispish.run(`(assoc (object) 0 "2")`)).toThrow()
      expect(() => lispish.run(`(assoc null 0 "2")`)).toThrow()
      expect(() => lispish.run(`(assoc undefined 0 "2")`)).toThrow()
      expect(() => lispish.run(`(assoc true 0 "2")`)).toThrow()
      expect(() => lispish.run(`(assoc false 0 "2")`)).toThrow()
      expect(() => lispish.run(`(assoc 1 0 "2")`)).toThrow()
      expect(() => lispish.run(`(assoc "1" 0 "2")`)).toThrow()
      expect(() => lispish.run(`(assoc [1] "0" "2")`)).toThrow()
      expect(() => lispish.run(`(assoc [1] true "2")`)).toThrow()
      expect(() => lispish.run(`(assoc [1] false "2")`)).toThrow()
      expect(() => lispish.run(`(assoc [1] [] "2")`)).toThrow()
      expect(() => lispish.run(`(assoc [1] null "2")`)).toThrow()
      expect(() => lispish.run(`(assoc [1] undefined "2")`)).toThrow()
      expect(() => lispish.run(`(assoc 0 "2")`)).toThrow()
      expect(() => lispish.run(`(assoc [1 2 3] -1 "x")`)).toThrow()
      expect(() => lispish.run(`(assoc [1 2 3] 4 "x")`)).toThrow()
      expect(() => lispish.run(`(assoc)`)).toThrow()
      expect(() => lispish.run(`(assoc [])`)).toThrow()
      expect(() => lispish.run(`(assoc [] 0)`)).toThrow()
      expect(() => lispish.run(`(assoc [] 0 "x" "y")`)).toThrow()
    })
  })
})
