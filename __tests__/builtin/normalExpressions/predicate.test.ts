import { Lispish } from '../../../src'

let lispish: Lispish

beforeEach(() => {
  lispish = new Lispish()
})

describe(`predicates`, () => {
  describe(`function?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(function? "")`)).toBe(false)
      expect(lispish.run(`(function? "x")`)).toBe(false)
      expect(lispish.run(`(function? 1)`)).toBe(false)
      expect(lispish.run(`(function? 0)`)).toBe(false)
      expect(lispish.run(`(function? [])`)).toBe(false)
      expect(lispish.run(`(function? (object))`)).toBe(false)
      expect(lispish.run(`(function? null)`)).toBe(false)
      expect(lispish.run(`(function? true)`)).toBe(false)
      expect(lispish.run(`(function? false)`)).toBe(false)
      expect(lispish.run(`(function? undefined)`)).toBe(false)
      expect(lispish.run(`(function? +)`)).toBe(true)
      expect(lispish.run(`(function? +)`)).toBe(true)
      expect(() => lispish.run(`(function?)`)).toThrow()
      expect(() => lispish.run(`(function? "k" "k")`)).toThrow()
    })
  })

  describe(`string?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(string? "")`)).toBe(true)
      expect(lispish.run(`(string? "x")`)).toBe(true)
      expect(lispish.run(`(string? 1)`)).toBe(false)
      expect(lispish.run(`(string? 0)`)).toBe(false)
      expect(lispish.run(`(string? [])`)).toBe(false)
      expect(lispish.run(`(string? (object))`)).toBe(false)
      expect(lispish.run(`(string? null)`)).toBe(false)
      expect(lispish.run(`(string? true)`)).toBe(false)
      expect(lispish.run(`(string? false)`)).toBe(false)
      expect(lispish.run(`(string? undefined)`)).toBe(false)
      expect(lispish.run(`(string? +)`)).toBe(false)
      expect(lispish.run(`(string? +)`)).toBe(false)
      expect(() => lispish.run(`(string?)`)).toThrow()
      expect(() => lispish.run(`(string? "k" "k")`)).toThrow()
    })
  })

  describe(`number?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(number? 1)`)).toBe(true)
      expect(lispish.run(`(number? 0)`)).toBe(true)
      expect(lispish.run(`(number? -1)`)).toBe(true)
      expect(lispish.run(`(number? -1.123)`)).toBe(true)
      expect(lispish.run(`(number? 0.123)`)).toBe(true)
      expect(lispish.run(`(number? "")`)).toBe(false)
      expect(lispish.run(`(number? "x")`)).toBe(false)
      expect(lispish.run(`(number? [])`)).toBe(false)
      expect(lispish.run(`(number? (object))`)).toBe(false)
      expect(lispish.run(`(number? null)`)).toBe(false)
      expect(lispish.run(`(number? false)`)).toBe(false)
      expect(lispish.run(`(number? true)`)).toBe(false)
      expect(lispish.run(`(number? undefined)`)).toBe(false)
      expect(lispish.run(`(number? +)`)).toBe(false)
      expect(lispish.run(`(number? +)`)).toBe(false)
      expect(() => lispish.run(`(number?)`)).toThrow()
      expect(() => lispish.run(`(number? 1 2)`)).toThrow()
    })
  })

  describe(`integer?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(integer? 1)`)).toBe(true)
      expect(lispish.run(`(integer? 0)`)).toBe(true)
      expect(lispish.run(`(integer? -1)`)).toBe(true)
      expect(lispish.run(`(integer? -1.123)`)).toBe(false)
      expect(lispish.run(`(integer? 0.123)`)).toBe(false)
      expect(lispish.run(`(integer? "")`)).toBe(false)
      expect(lispish.run(`(integer? "x")`)).toBe(false)
      expect(lispish.run(`(integer? [])`)).toBe(false)
      expect(lispish.run(`(integer? (object))`)).toBe(false)
      expect(lispish.run(`(integer? null)`)).toBe(false)
      expect(lispish.run(`(integer? false)`)).toBe(false)
      expect(lispish.run(`(integer? true)`)).toBe(false)
      expect(lispish.run(`(integer? undefined)`)).toBe(false)
      expect(lispish.run(`(integer? +)`)).toBe(false)
      expect(lispish.run(`(integer? +)`)).toBe(false)
      expect(() => lispish.run(`(integer?)`)).toThrow()
      expect(() => lispish.run(`(integer? 1 2)`)).toThrow()
    })
  })

  describe(`boolean?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(boolean? 1)`)).toBe(false)
      expect(lispish.run(`(boolean? 0)`)).toBe(false)
      expect(lispish.run(`(boolean? -1)`)).toBe(false)
      expect(lispish.run(`(boolean? -1.123)`)).toBe(false)
      expect(lispish.run(`(boolean? 0.123)`)).toBe(false)
      expect(lispish.run(`(boolean? "")`)).toBe(false)
      expect(lispish.run(`(boolean? "x")`)).toBe(false)
      expect(lispish.run(`(boolean? [])`)).toBe(false)
      expect(lispish.run(`(boolean? (object))`)).toBe(false)
      expect(lispish.run(`(boolean? null)`)).toBe(false)
      expect(lispish.run(`(boolean? false)`)).toBe(true)
      expect(lispish.run(`(boolean? true)`)).toBe(true)
      expect(lispish.run(`(boolean? undefined)`)).toBe(false)
      expect(lispish.run(`(boolean? +)`)).toBe(false)
      expect(lispish.run(`(boolean? +)`)).toBe(false)
      expect(() => lispish.run(`(boolean?)`)).toThrow()
      expect(() => lispish.run(`(boolean? true false)`)).toThrow()
    })
  })

  describe(`undefined?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(undefined? 1)`)).toBe(false)
      expect(lispish.run(`(undefined? 0)`)).toBe(false)
      expect(lispish.run(`(undefined? -1)`)).toBe(false)
      expect(lispish.run(`(undefined? -1.123)`)).toBe(false)
      expect(lispish.run(`(undefined? 0.123)`)).toBe(false)
      expect(lispish.run(`(undefined? "")`)).toBe(false)
      expect(lispish.run(`(undefined? "x")`)).toBe(false)
      expect(lispish.run(`(undefined? [])`)).toBe(false)
      expect(lispish.run(`(undefined? (object))`)).toBe(false)
      expect(lispish.run(`(undefined? null)`)).toBe(false)
      expect(lispish.run(`(undefined? false)`)).toBe(false)
      expect(lispish.run(`(undefined? true)`)).toBe(false)
      expect(lispish.run(`(undefined? undefined)`)).toBe(true)
      expect(lispish.run(`(undefined? +)`)).toBe(false)
      expect(lispish.run(`(undefined? +)`)).toBe(false)
      expect(() => lispish.run(`(undefined?)`)).toThrow()
      expect(() => lispish.run(`(undefined? true false)`)).toThrow()
    })
  })

  describe(`null?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(null? 1)`)).toBe(false)
      expect(lispish.run(`(null? 0)`)).toBe(false)
      expect(lispish.run(`(null? -1)`)).toBe(false)
      expect(lispish.run(`(null? -1.123)`)).toBe(false)
      expect(lispish.run(`(null? 0.123)`)).toBe(false)
      expect(lispish.run(`(null? "")`)).toBe(false)
      expect(lispish.run(`(null? "x")`)).toBe(false)
      expect(lispish.run(`(null? [])`)).toBe(false)
      expect(lispish.run(`(null? (object))`)).toBe(false)
      expect(lispish.run(`(null? null)`)).toBe(true)
      expect(lispish.run(`(null? false)`)).toBe(false)
      expect(lispish.run(`(null? true)`)).toBe(false)
      expect(lispish.run(`(null? undefined)`)).toBe(false)
      expect(lispish.run(`(null? +)`)).toBe(false)
      expect(lispish.run(`(null? +)`)).toBe(false)
      expect(() => lispish.run(`(null?)`)).toThrow()
      expect(() => lispish.run(`(null? true false)`)).toThrow()
    })
  })

  describe(`zero?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(zero? 1)`)).toBe(false)
      expect(lispish.run(`(zero? 0)`)).toBe(true)
      expect(lispish.run(`(zero? -0)`)).toBe(true)
      expect(lispish.run(`(zero? (/ 0 -1))`)).toBe(true)
      expect(lispish.run(`(zero? -1)`)).toBe(false)
      expect(() => lispish.run(`(zero?)`)).toThrow()
      expect(() => lispish.run(`(zero? "")`)).toThrow()
      expect(() => lispish.run(`(zero? true)`)).toThrow()
      expect(() => lispish.run(`(zero? false)`)).toThrow()
      expect(() => lispish.run(`(zero? null)`)).toThrow()
      expect(() => lispish.run(`(zero? undefined)`)).toThrow()
      expect(() => lispish.run(`(zero? (object))`)).toThrow()
      expect(() => lispish.run(`(zero? [])`)).toThrow()
    })
  })

  describe(`pos?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(pos? 1)`)).toBe(true)
      expect(lispish.run(`(pos? 0)`)).toBe(false)
      expect(lispish.run(`(pos? -0)`)).toBe(false)
      expect(lispish.run(`(pos? (/ 0 -1))`)).toBe(false)
      expect(lispish.run(`(pos? -1)`)).toBe(false)
      expect(() => lispish.run(`(pos?)`)).toThrow()
      expect(() => lispish.run(`(pos? "")`)).toThrow()
      expect(() => lispish.run(`(pos? true)`)).toThrow()
      expect(() => lispish.run(`(pos? false)`)).toThrow()
      expect(() => lispish.run(`(pos? null)`)).toThrow()
      expect(() => lispish.run(`(pos? undefined)`)).toThrow()
      expect(() => lispish.run(`(pos? (object))`)).toThrow()
      expect(() => lispish.run(`(pos? [])`)).toThrow()
    })
  })

  describe(`neg?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(neg? 1)`)).toBe(false)
      expect(lispish.run(`(neg? 0)`)).toBe(false)
      expect(lispish.run(`(neg? -0)`)).toBe(false)
      expect(lispish.run(`(neg? (/ 0 -1))`)).toBe(false)
      expect(lispish.run(`(neg? -1)`)).toBe(true)
      expect(() => lispish.run(`(neg?)`)).toThrow()
      expect(() => lispish.run(`(neg? "")`)).toThrow()
      expect(() => lispish.run(`(neg? true)`)).toThrow()
      expect(() => lispish.run(`(neg? false)`)).toThrow()
      expect(() => lispish.run(`(neg? null)`)).toThrow()
      expect(() => lispish.run(`(neg? undefined)`)).toThrow()
      expect(() => lispish.run(`(neg? (object))`)).toThrow()
      expect(() => lispish.run(`(neg? [])`)).toThrow()
    })
  })

  describe(`even?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(even? 1)`)).toBe(false)
      expect(lispish.run(`(even? 0)`)).toBe(true)
      expect(lispish.run(`(even? -0)`)).toBe(true)
      expect(lispish.run(`(even? (/ 0 -1))`)).toBe(true)
      expect(lispish.run(`(even? -1)`)).toBe(false)
      expect(lispish.run(`(even? -10)`)).toBe(true)
      expect(lispish.run(`(even? -2.001)`)).toBe(false)
      expect(lispish.run(`(even? 4)`)).toBe(true)
      expect(() => lispish.run(`(even?)`)).toThrow()
      expect(() => lispish.run(`(even? "")`)).toThrow()
      expect(() => lispish.run(`(even? true)`)).toThrow()
      expect(() => lispish.run(`(even? false)`)).toThrow()
      expect(() => lispish.run(`(even? null)`)).toThrow()
      expect(() => lispish.run(`(even? undefined)`)).toThrow()
      expect(() => lispish.run(`(even? (object))`)).toThrow()
      expect(() => lispish.run(`(even? [])`)).toThrow()
    })
  })

  describe(`odd?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(odd? 1)`)).toBe(true)
      expect(lispish.run(`(odd? 0)`)).toBe(false)
      expect(lispish.run(`(odd? -0)`)).toBe(false)
      expect(lispish.run(`(odd? (/ 0 -1))`)).toBe(false)
      expect(lispish.run(`(odd? -1)`)).toBe(true)
      expect(lispish.run(`(odd? -10)`)).toBe(false)
      expect(lispish.run(`(odd? -2.001)`)).toBe(false)
      expect(lispish.run(`(odd? 4)`)).toBe(false)
      expect(lispish.run(`(odd? 5)`)).toBe(true)
      expect(() => lispish.run(`(odd?)`)).toThrow()
      expect(() => lispish.run(`(odd? "")`)).toThrow()
      expect(() => lispish.run(`(odd? true)`)).toThrow()
      expect(() => lispish.run(`(odd? false)`)).toThrow()
      expect(() => lispish.run(`(odd? null)`)).toThrow()
      expect(() => lispish.run(`(odd? undefined)`)).toThrow()
      expect(() => lispish.run(`(odd? (object))`)).toThrow()
      expect(() => lispish.run(`(odd? [])`)).toThrow()
    })
  })

  describe(`array?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(array? 1)`)).toBe(false)
      expect(lispish.run(`(array? 0)`)).toBe(false)
      expect(lispish.run(`(array? -1)`)).toBe(false)
      expect(lispish.run(`(array? -1.123)`)).toBe(false)
      expect(lispish.run(`(array? 0.123)`)).toBe(false)
      expect(lispish.run(`(array? "")`)).toBe(false)
      expect(lispish.run(`(array? "x")`)).toBe(false)
      expect(lispish.run(`(array? [])`)).toBe(true)
      expect(lispish.run(`(array? [1 2 3])`)).toBe(true)
      expect(lispish.run(`(array? (object))`)).toBe(false)
      expect(lispish.run(`(array? null)`)).toBe(false)
      expect(lispish.run(`(array? false)`)).toBe(false)
      expect(lispish.run(`(array? true)`)).toBe(false)
      expect(lispish.run(`(array? undefined)`)).toBe(false)
      expect(lispish.run(`(array? +)`)).toBe(false)
      expect(lispish.run(`(array? +)`)).toBe(false)
      expect(() => lispish.run(`(array?)`)).toThrow()
      expect(() => lispish.run(`(array? true false)`)).toThrow()
    })
  })

  describe(`collection?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(collection? 1)`)).toBe(false)
      expect(lispish.run(`(collection? 0)`)).toBe(false)
      expect(lispish.run(`(collection? -1)`)).toBe(false)
      expect(lispish.run(`(collection? -1.123)`)).toBe(false)
      expect(lispish.run(`(collection? 0.123)`)).toBe(false)
      expect(lispish.run(`(collection? "")`)).toBe(false)
      expect(lispish.run(`(collection? "x")`)).toBe(false)
      expect(lispish.run(`(collection? [])`)).toBe(true)
      expect(lispish.run(`(collection? [1 2 3])`)).toBe(true)
      expect(lispish.run(`(collection? (object))`)).toBe(true)
      expect(lispish.run(`(collection? {"a" 1})`)).toBe(true)
      expect(lispish.run(`(collection? null)`)).toBe(false)
      expect(lispish.run(`(collection? false)`)).toBe(false)
      expect(lispish.run(`(collection? true)`)).toBe(false)
      expect(lispish.run(`(collection? undefined)`)).toBe(false)
      expect(lispish.run(`(collection? +)`)).toBe(false)
      expect(lispish.run(`(collection? +)`)).toBe(false)
      expect(() => lispish.run(`(collection?)`)).toThrow()
      expect(() => lispish.run(`(collection? true false)`)).toThrow()
    })
  })

  describe(`object?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(object? 1)`)).toBe(false)
      expect(lispish.run(`(object? 0)`)).toBe(false)
      expect(lispish.run(`(object? -1)`)).toBe(false)
      expect(lispish.run(`(object? -1.123)`)).toBe(false)
      expect(lispish.run(`(object? 0.123)`)).toBe(false)
      expect(lispish.run(`(object? "")`)).toBe(false)
      expect(lispish.run(`(object? "x")`)).toBe(false)
      expect(lispish.run(`(object? [])`)).toBe(false)
      expect(lispish.run(`(object? (object "x" 10))`)).toBe(true)
      expect(lispish.run(`(object? null)`)).toBe(false)
      expect(lispish.run(`(object? (regexp "abc"))`)).toBe(false)
      expect(lispish.run(`(object? false)`)).toBe(false)
      expect(lispish.run(`(object? true)`)).toBe(false)
      expect(lispish.run(`(object? undefined)`)).toBe(false)
      expect(lispish.run(`(object? +)`)).toBe(false)
      expect(lispish.run(`(object? +)`)).toBe(false)
      expect(() => lispish.run(`(object?)`)).toThrow()
      expect(() => lispish.run(`(object? true false)`)).toThrow()
    })
  })

  describe(`regexp?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(regexp? 1)`)).toBe(false)
      expect(lispish.run(`(regexp? 0)`)).toBe(false)
      expect(lispish.run(`(regexp? -1)`)).toBe(false)
      expect(lispish.run(`(regexp? -1.123)`)).toBe(false)
      expect(lispish.run(`(regexp? 0.123)`)).toBe(false)
      expect(lispish.run(`(regexp? "")`)).toBe(false)
      expect(lispish.run(`(regexp? "x")`)).toBe(false)
      expect(lispish.run(`(regexp? [])`)).toBe(false)
      expect(lispish.run(`(regexp? (object "x" 10))`)).toBe(false)
      expect(lispish.run(`(regexp? null)`)).toBe(false)
      expect(lispish.run(`(regexp? (regexp "abc"))`)).toBe(true)
      expect(lispish.run(`(regexp? false)`)).toBe(false)
      expect(lispish.run(`(regexp? true)`)).toBe(false)
      expect(lispish.run(`(regexp? undefined)`)).toBe(false)
      expect(lispish.run(`(regexp? +)`)).toBe(false)
      expect(lispish.run(`(regexp? +)`)).toBe(false)
      expect(() => lispish.run(`(regexp?)`)).toThrow()
      expect(() => lispish.run(`(regexp? true false)`)).toThrow()
    })
  })
})
