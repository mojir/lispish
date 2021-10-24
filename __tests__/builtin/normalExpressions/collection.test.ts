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
      expect(lispish.run(`(count "")`)).toBe(0)
      expect(lispish.run(`(count "Albert")`)).toBe(6)
      expect(() => lispish.run(`(count)`)).toThrow()
      expect(() => lispish.run(`(count [] [])`)).toThrow()
      expect(() => lispish.run(`(count 12)`)).toThrow()
      expect(() => lispish.run(`(count false)`)).toThrow()
      expect(() => lispish.run(`(count true)`)).toThrow()
      expect(() => lispish.run(`(count nil)`)).toThrow()
      expect(() => lispish.run(`(count undefined)`)).toThrow()
    })
  })

  describe(`get`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(get [] 1)`)).toBeNull()
      expect(lispish.run(`(get [1] 1)`)).toBeNull()
      expect(lispish.run(`(get [1 2 3] 1)`)).toBe(2)
      expect(lispish.run(`(get [] 1 "x")`)).toBe(`x`)
      expect(lispish.run(`(get [1] 1 "x")`)).toBe(`x`)
      expect(lispish.run(`(get [1 2 3] 1 "x")`)).toBe(2)

      expect(lispish.run(`(get "Albert" 1)`)).toBe(`l`)
      expect(lispish.run(`(get "Albert" 7)`)).toBeNull()
      expect(lispish.run(`(get "Albert" -1)`)).toBeNull()
      expect(lispish.run(`(get "" 0)`)).toBeNull()

      expect(lispish.run(`(get (object) "a")`)).toBeNull()
      expect(lispish.run(`(get (object "a" 1 "b" 2) "a")`)).toBe(1)
      expect(lispish.run(`(get (object) "a" "x")`)).toBe(`x`)
      expect(lispish.run(`(get (object "a" 1 "b" 2) "a")`)).toBe(1)

      expect(() => lispish.run(`(get)`)).toThrow()
      expect(() => lispish.run(`(get [])`)).toThrow()
      expect(() => lispish.run(`(get 12)`)).toThrow()
      expect(() => lispish.run(`(get false)`)).toThrow()
      expect(() => lispish.run(`(get true)`)).toThrow()
      expect(() => lispish.run(`(get nil)`)).toThrow()
      expect(() => lispish.run(`(get undefined)`)).toThrow()
    })
  })

  describe(`get-in`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(get-in [] [1])`)).toBeNull()
      expect(lispish.run(`(get-in [1] [1])`)).toBeNull()
      expect(lispish.run(`(get-in [1 2 3] [1])`)).toBe(2)
      expect(lispish.run(`(get-in [[1 2 3] [4 {"a" 2} 6]] [1 1 "a"])`)).toBe(2)
      expect(lispish.run(`(get-in {"a" ["Albert" "Mojir"]} ["a" 0])`)).toBe(`Albert`)
      expect(lispish.run(`(get-in {"a" ["Albert" "Mojir"]} ["a" 0 5])`)).toBe(`t`)
      expect(lispish.run(`(get-in {"a" ["Albert" "Mojir"]} ["a" 0 5 0 0 0 0 0 0])`)).toBe(`t`)
      expect(lispish.run(`(get-in {"a" ["Albert" "Mojir"]} ["a" 2] "DEFAULT")`)).toBe(`DEFAULT`)
      expect(lispish.run(`(get-in {"a" ["Albert" "Mojir"]} ["a" 2 "x"] "DEFAULT")`)).toBe(`DEFAULT`)

      expect(() => lispish.run(`(get-in)`)).toThrow()
      expect(() => lispish.run(`(get-in [])`)).toThrow()
      expect(() => lispish.run(`(get-in 12)`)).toThrow()
      expect(() => lispish.run(`(get-in false)`)).toThrow()
      expect(() => lispish.run(`(get-in true)`)).toThrow()
      expect(() => lispish.run(`(get-in nil)`)).toThrow()
      expect(() => lispish.run(`(get-in undefined)`)).toThrow()
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
      expect(lispish.run(`(contains? "Albert" 0)`)).toBe(true)
      expect(lispish.run(`(contains? "Albert" 5)`)).toBe(true)
      expect(lispish.run(`(contains? "Albert" 6)`)).toBe(false)
      expect(lispish.run(`(contains? "Albert" -1)`)).toBe(false)

      expect(() => lispish.run(`(contains? "")`)).toThrow()
      expect(() => lispish.run(`(contains? [])`)).toThrow()
      expect(() => lispish.run(`(contains? "123")`)).toThrow()
      expect(() => lispish.run(`(contains?)`)).toThrow()
      expect(() => lispish.run(`(contains? [] [])`)).toThrow()
      expect(() => lispish.run(`(contains? 12)`)).toThrow()
      expect(() => lispish.run(`(contains? false)`)).toThrow()
      expect(() => lispish.run(`(contains? true)`)).toThrow()
      expect(() => lispish.run(`(contains? nil)`)).toThrow()
      expect(() => lispish.run(`(contains? undefined)`)).toThrow()
    })
  })

  describe(`has?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(has? [] 1)`)).toBe(false)
      expect(lispish.run(`(has? [1] 1)`)).toBe(true)
      expect(lispish.run(`(has? [1 2 3] 0)`)).toBe(false)
      expect(lispish.run(`(has? (object) "a")`)).toBe(false)
      expect(lispish.run(`(has? (object "a" 1 "b" 2) 1)`)).toBe(true)
      expect(lispish.run(`(has? (object "a" 1 "b" 2) "a")`)).toBe(false)
      expect(lispish.run(`(has? [] "1")`)).toBe(false)
      expect(lispish.run(`(has? [1] "1")`)).toBe(false)
      expect(lispish.run(`(has? [1 2 3] "1")`)).toBe(false)
      expect(lispish.run(`(has? (object) 1)`)).toBe(false)
      expect(lispish.run(`(has? "Albert" "A")`)).toBe(true)
      expect(lispish.run(`(has? "Albert" "a")`)).toBe(false)
      expect(lispish.run(`(has? "Albert" 1)`)).toBe(false)

      expect(() => lispish.run(`(has? "")`)).toThrow()
      expect(() => lispish.run(`(has? [])`)).toThrow()
      expect(() => lispish.run(`(has? "123")`)).toThrow()
      expect(() => lispish.run(`(has?)`)).toThrow()
      expect(() => lispish.run(`(has? 12 [])`)).toThrow()
      expect(() => lispish.run(`(has? 12)`)).toThrow()
      expect(() => lispish.run(`(has? false)`)).toThrow()
      expect(() => lispish.run(`(has? true)`)).toThrow()
      expect(() => lispish.run(`(has? nil)`)).toThrow()
      expect(() => lispish.run(`(has? undefined)`)).toThrow()
    })
  })

  describe(`assoc`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(assoc [1 2 3] 0 "1")`)).toEqual([`1`, 2, 3])
      expect(lispish.run(`(assoc [1 2 3] 1 "2")`)).toEqual([1, `2`, 3])
      expect(lispish.run(`(def a [1 2 3]) (assoc a 1 "2")`)).toEqual([1, `2`, 3])
      expect(lispish.run(`(def a [1 2 3]) (assoc a 1 "2") a`)).toEqual([1, 2, 3])
      expect(lispish.run(`(assoc [1 2 3] 3 "4")`)).toEqual([1, 2, 3, `4`])

      expect(lispish.run(`(assoc {} "a" "1")`)).toEqual({ a: `1` })

      expect(lispish.run(`(assoc {"a" 1 "b" 2} "a" "1")`)).toEqual({ a: `1`, b: 2 })
      expect(lispish.run(`(assoc {"a" 1 "b" 2} "b" "2")`)).toEqual({ a: 1, b: `2` })
      expect(lispish.run(`(def o {"a" 1 "b" 2}) (assoc o "a" "1")`)).toEqual({ a: `1`, b: 2 })
      expect(lispish.run(`(def o {"a" 1 "b" 2}) (assoc o "a" "1") o`)).toEqual({ a: 1, b: 2 })

      expect(lispish.run(`(assoc "1" 0 "2")`)).toBe(`2`)
      expect(lispish.run(`(assoc "Albert" 6 "!")`)).toBe(`Albert!`)

      expect(() => lispish.run(`(assoc "Albert" 7 "!")`)).toThrow()
      expect(() => lispish.run(`(assoc [1 2 3] 4 "4")`)).toThrow()
      expect(() => lispish.run(`(assoc (object) 0 "2")`)).toThrow()
      expect(() => lispish.run(`(assoc nil 0 "2")`)).toThrow()
      expect(() => lispish.run(`(assoc undefined 0 "2")`)).toThrow()
      expect(() => lispish.run(`(assoc true 0 "2")`)).toThrow()
      expect(() => lispish.run(`(assoc false 0 "2")`)).toThrow()
      expect(() => lispish.run(`(assoc 1 0 "2")`)).toThrow()
      expect(() => lispish.run(`(assoc "1" 0 "22")`)).toThrow()
      expect(() => lispish.run(`(assoc [1] "0" "2")`)).toThrow()
      expect(() => lispish.run(`(assoc [1] true "2")`)).toThrow()
      expect(() => lispish.run(`(assoc [1] false "2")`)).toThrow()
      expect(() => lispish.run(`(assoc [1] [] "2")`)).toThrow()
      expect(() => lispish.run(`(assoc [1] nil "2")`)).toThrow()
      expect(() => lispish.run(`(assoc [1] undefined "2")`)).toThrow()
      expect(() => lispish.run(`(assoc 0 "2")`)).toThrow()
      expect(() => lispish.run(`(assoc [1 2 3] -1 "x")`)).toThrow()
      expect(() => lispish.run(`(assoc [1 2 3] 4 "x")`)).toThrow()
      expect(() => lispish.run(`(assoc)`)).toThrow()
      expect(() => lispish.run(`(assoc [])`)).toThrow()
      expect(() => lispish.run(`(assoc [] 0)`)).toThrow()
      expect(() => lispish.run(`(assoc [] 0 "x" "y")`)).toThrow()
      expect(() => lispish.run(`(assoc [] "a" "1")`)).toThrow()
    })
  })

  describe(`assoc-in`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(assoc-in "Albert" [0] "a")`)).toEqual(`albert`)
      expect(lispish.run(`(assoc-in "Albert" [6] "!")`)).toEqual(`Albert!`)
      expect(() => lispish.run(`(assoc-in "Albert" [7] "!")`)).toThrow()
      expect(lispish.run(`(assoc-in {} ["a" "b" "c"] "Albert")`)).toEqual({ a: { b: { c: `Albert` } } })
      expect(lispish.run(`(assoc-in [1 2 3] [0] "1")`)).toEqual([`1`, 2, 3])
      expect(lispish.run(`(assoc-in [1 2 [1 2 3]] [2 1] "2")`)).toEqual([1, 2, [1, `2`, 3]])
      expect(lispish.run(`(assoc-in [1 2 "albert"] [2 0] "A")`)).toEqual([1, 2, `Albert`])
      expect(lispish.run(`(assoc-in [1 2 {"name" "albert"}] [2 "name"] "A")`)).toEqual([1, 2, { name: `A` }])
      expect(lispish.run(`(assoc-in [1 2 {"name" "albert"}] [2 "name" 0] "A")`)).toEqual([1, 2, { name: `Albert` }])
      expect(() => lispish.run(`(assoc-in [1 2 {"name" "albert"}] ["2" "name" 0] "A")`)).toThrow()
      expect(() => lispish.run(`(assoc-in [1 2 {"name" "albert"}] [2 1 0] "A")`)).toThrow()
      expect(() => lispish.run(`(assoc-in [1 2 {"name" "albert"}] [2 "name" "a"] "A")`)).toThrow()
    })
  })

  describe(`concat`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(concat [])`)).toEqual([])
      expect(lispish.run(`(concat [1])`)).toEqual([1])
      expect(lispish.run(`(concat [1] [2] [3 4])`)).toEqual([1, 2, 3, 4])
      expect(lispish.run(`(concat [1 2 3] [])`)).toEqual([1, 2, 3])

      expect(lispish.run(`(concat {"a" 1 "b" 2} {"b" 1 "c" 2})`)).toEqual({ a: 1, b: 1, c: 2 })
      expect(lispish.run(`(concat {} {"a" 1 "b" 2})`)).toEqual({ a: 1, b: 2 })

      expect(lispish.run(`(concat "1" "23")`)).toBe(`123`)
      expect(lispish.run(`(concat "1" "")`)).toBe(`1`)
      expect(lispish.run(`(concat "1")`)).toBe(`1`)

      expect(() => lispish.run(`(concat)`)).toThrow()
      expect(() => lispish.run(`(concat [1] "2")`)).toThrow()
      expect(() => lispish.run(`(concat "1" ["2"])`)).toThrow()
      expect(() => lispish.run(`(concat 0)`)).toThrow()
      expect(() => lispish.run(`(concat true)`)).toThrow()
      expect(() => lispish.run(`(concat "1" false)`)).toThrow()
      expect(() => lispish.run(`(concat nil "m")`)).toThrow()
      expect(() => lispish.run(`(concat undefined)`)).toThrow()
    })
  })
  describe(`empty?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(empty? [])`)).toBe(true)
      expect(lispish.run(`(empty? [0])`)).toBe(false)
      expect(lispish.run(`(empty? {})`)).toBe(true)
      expect(lispish.run(`(empty? {"a" 2})`)).toBe(false)
      expect(lispish.run(`(empty? "")`)).toBe(true)
      expect(lispish.run(`(empty? "Albert")`)).toBe(false)
      expect(() => lispish.run(`(empty?)`)).toThrow()
      expect(() => lispish.run(`(empty?)`)).toThrow()
      expect(() => lispish.run(`(empty? true)`)).toThrow()
      expect(() => lispish.run(`(empty? false)`)).toThrow()
      expect(() => lispish.run(`(empty? nil)`)).toThrow()
      expect(() => lispish.run(`(empty? undefined)`)).toThrow()
      expect(() => lispish.run(`(empty? 10)`)).toThrow()
      expect(() => lispish.run(`(empty? (regexp "^start"))`)).toThrow()
    })
  })

  describe(`every?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(every? number? [1 2 3])`)).toBe(true)
      expect(lispish.run(`(every? number? ["1" "2" "3"])`)).toBe(false)
      expect(lispish.run(`(every? number? [])`)).toBe(true)
      expect(lispish.run(`(every? number? "")`)).toBe(true)
      expect(lispish.run(`(every? number? {})`)).toBe(true)
      expect(lispish.run(`(every? (fn [x] (zero? (mod x 2))) [2 4 6])`)).toBe(true)
      expect(lispish.run(`(every? (fn [x] (>= x "a")) "abc")`)).toBe(true)
      expect(lispish.run(`(every? (fn [x] (>= x "a")) "abC")`)).toBe(false)
      expect(lispish.run(`(every? #(even? (second %1)) {"a" 2 "b" 4})`)).toBe(true)
      expect(lispish.run(`(every? #(even? (second %1)) {"a" 2 "b" 3})`)).toBe(false)
      expect(lispish.run(`(every? #(even? (second %1)) {"a" 2 "b" 3})`)).toBe(false)
      expect(() => lispish.run(`(every? +)`)).toThrow()
      expect(() => lispish.run(`(every?)`)).toThrow()
      expect(() => lispish.run(`(every? number? [1] 2)`)).toThrow()
    })
  })

  describe(`not-every?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(not-every? number? [1 2 3])`)).toBe(false)
      expect(lispish.run(`(not-every? number? ["1" "2" "3"])`)).toBe(true)
      expect(lispish.run(`(not-every? number? [])`)).toBe(false)
      expect(lispish.run(`(not-every? number? "")`)).toBe(false)
      expect(lispish.run(`(not-every? number? {})`)).toBe(false)
      expect(lispish.run(`(not-every? (fn [x] (zero? (mod x 2))) [2 4 6])`)).toBe(false)
      expect(lispish.run(`(not-every? (fn [x] (>= x "a")) "abc")`)).toBe(false)
      expect(lispish.run(`(not-every? (fn [x] (>= x "a")) "abC")`)).toBe(true)
      expect(lispish.run(`(not-every? #(even? (second %1)) {"a" 2 "b" 4})`)).toBe(false)
      expect(lispish.run(`(not-every? #(even? (second %1)) {"a" 2 "b" 3})`)).toBe(true)
      expect(lispish.run(`(not-every? #(even? (second %1)) {"a" 2 "b" 3})`)).toBe(true)
      expect(() => lispish.run(`(not-every? +)`)).toThrow()
      expect(() => lispish.run(`(not-every?)`)).toThrow()
      expect(() => lispish.run(`(not-every? number? [1] 2)`)).toThrow()
    })
  })

  describe(`any?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(any? number? [1 2 3])`)).toBe(true)
      expect(lispish.run(`(any? number? [1 "2" 3])`)).toBe(true)
      expect(lispish.run(`(any? number? ["1" "2" "3"])`)).toBe(false)
      expect(lispish.run(`(any? number? [])`)).toBe(false)
      expect(lispish.run(`(any? number? "")`)).toBe(false)
      expect(lispish.run(`(any? number? {})`)).toBe(false)
      expect(lispish.run(`(any? (fn [x] (zero? (mod x 2))) [1 3 6])`)).toBe(true)
      expect(lispish.run(`(any? (fn [x] (zero? (mod x 2))) [1 3 5])`)).toBe(false)
      expect(lispish.run(`(any? (fn [x] (>= x "a")) "abc")`)).toBe(true)
      expect(lispish.run(`(any? (fn [x] (>= x "a")) "abC")`)).toBe(true)
      expect(lispish.run(`(any? (fn [x] (>= x "a")) "ABC")`)).toBe(false)
      expect(lispish.run(`(any? #(even? (second %1)) {"a" 2 "b" 4})`)).toBe(true)
      expect(lispish.run(`(any? #(even? (second %1)) {"a" 2 "b" 3})`)).toBe(true)
      expect(lispish.run(`(any? #(even? (second %1)) {"a" 1 "b" 3})`)).toBe(false)
      expect(() => lispish.run(`(any? +)`)).toThrow()
      expect(() => lispish.run(`(any?)`)).toThrow()
      expect(() => lispish.run(`(any? number? [1] 2)`)).toThrow()
    })
  })

  describe(`not-any?`, () => {
    test(`samples`, () => {
      expect(lispish.run(`(not-any? number? [1 2 3])`)).toBe(false)
      expect(lispish.run(`(not-any? number? [1 "2" 3])`)).toBe(false)
      expect(lispish.run(`(not-any? number? ["1" "2" "3"])`)).toBe(true)
      expect(lispish.run(`(not-any? number? [])`)).toBe(true)
      expect(lispish.run(`(not-any? number? "")`)).toBe(true)
      expect(lispish.run(`(not-any? number? {})`)).toBe(true)
      expect(lispish.run(`(not-any? (fn [x] (zero? (mod x 2))) [1 3 6])`)).toBe(false)
      expect(lispish.run(`(not-any? (fn [x] (zero? (mod x 2))) [1 3 5])`)).toBe(true)
      expect(lispish.run(`(not-any? (fn [x] (>= x "a")) "abc")`)).toBe(false)
      expect(lispish.run(`(not-any? (fn [x] (>= x "a")) "abC")`)).toBe(false)
      expect(lispish.run(`(not-any? (fn [x] (>= x "a")) "ABC")`)).toBe(true)
      expect(lispish.run(`(not-any? #(even? (second %1)) {"a" 2 "b" 4})`)).toBe(false)
      expect(lispish.run(`(not-any? #(even? (second %1)) {"a" 2 "b" 3})`)).toBe(false)
      expect(lispish.run(`(not-any? #(even? (second %1)) {"a" 1 "b" 3})`)).toBe(true)
      expect(() => lispish.run(`(not-any? +)`)).toThrow()
      expect(() => lispish.run(`(not-any?)`)).toThrow()
      expect(() => lispish.run(`(not-any? number? [1] 2)`)).toThrow()
    })
  })

  describe(`update`, () => {
    test(`samples`, () => {
      expect(
        lispish.run(
          `(def x "Albert") (update x 3 (fn [val] (if (nil? val) "!" (from-char-code (inc (to-char-code val))))))`,
        ),
      ).toEqual(`Albfrt`)
      expect(
        lispish.run(
          `(def x "Albert") (update x 6 (fn [val] (if (nil? val) "!" (from-char-code (inc (to-char-code val))))))`,
        ),
      ).toEqual(`Albert!`)

      expect(lispish.run(`(def x [0, 1, 2, 3]) (update x 3 inc)`)).toEqual([0, 1, 2, 4])
      expect(lispish.run(`(def x [0, 1, 2, 3]) (update x 4 identity)`)).toEqual([0, 1, 2, 3, null])

      expect(lispish.run(`(def x {"a" 1 "b" 2}) (update x "a" inc)`)).toEqual({ a: 2, b: 2 })
      expect(lispish.run(`(def x {"a" 1 "b" 2}) (update x "a" + 10)`)).toEqual({ a: 11, b: 2 })
      expect(lispish.run(`(def x {"a" 1 "b" 2}) (update x "a" (fn [val] (if (even? val) 0 (inc val))))`)).toEqual({
        a: 2,
        b: 2,
      })
      expect(lispish.run(`(def x {"a" 1 "b" 2}) ("c" x)`)).toEqual(null)
      expect(lispish.run(`(update {} "a" (fn [val] (when (nil? val) 0)))`)).toEqual({ a: 0 })
      expect(lispish.run(`(def x {"a" 1 "b" 2}) (update x "c" (fn [val] (if (nil? val) 0 (inc val))))`)).toEqual({
        a: 1,
        b: 2,
        c: 0,
      })
      expect(() => lispish.run(`(update number? [1] 2)`)).toThrow()
    })
  })

  describe(`update-in`, () => {
    test(`samples`, () => {
      expect(
        lispish.run(
          `(def x "Albert") (update-in x [3] (fn [val] (if (nil? val) "!" (from-char-code (inc (to-char-code val))))))`,
        ),
      ).toEqual(`Albfrt`)
      expect(
        lispish.run(
          `(def x "Albert") (update-in x [6] (fn [val] (if (nil? val) "!" (from-char-code (inc (to-char-code val))))))`,
        ),
      ).toEqual(`Albert!`)

      expect(lispish.run(`(def x [0, 1, 2, 3]) (update-in x [3] inc)`)).toEqual([0, 1, 2, 4])
      expect(lispish.run(`(def x [0, 1, 2, 3]) (update-in x [4] identity)`)).toEqual([0, 1, 2, 3, null])

      expect(lispish.run(`(def x {"a" 1 "b" 2}) (update-in x ["a"] inc)`)).toEqual({ a: 2, b: 2 })
      expect(lispish.run(`(def x {"a" 1 "b" 2}) (update-in x ["a"] + 10)`)).toEqual({ a: 11, b: 2 })
      expect(lispish.run(`(def x {"a" 1 "b" 2}) (update-in x ["a"] (fn [val] (if (even? val) 0 (inc val))))`)).toEqual({
        a: 2,
        b: 2,
      })
      expect(lispish.run(`(update-in {} ["a"] (fn [val] (when (nil? val) 0)))`)).toEqual({ a: 0 })
      expect(lispish.run(`(def x {"a" 1 "b" 2}) (update-in x ["c"] (fn [val] (if (nil? val) 0 (inc val))))`)).toEqual({
        a: 1,
        b: 2,
        c: 0,
      })
      expect(lispish.run(`(update-in {"a" [1 2 3]} ["a" 1] (fn [val] (when (nil? val) 0)))`)).toEqual({
        a: [1, null, 3],
      })
      expect(lispish.run(`(update-in {"a" [1 nil 3]} ["a" 1] (fn [val] (when (nil? val) 0)))`)).toEqual({
        a: [1, 0, 3],
      })
      expect(lispish.run(`(update-in {"a" [1 "Albert" 3]} ["a" 1 0] (fn [val] (if (nil? val) "?" "!")))`)).toEqual({
        a: [1, `!lbert`, 3],
      })
      expect(lispish.run(`(update-in {"a" [1 "" 3]} ["a" 1 0] (fn [val] (if (nil? val) "?" "!")))`)).toEqual({
        a: [1, `?`, 3],
      })
    })
  })
})
