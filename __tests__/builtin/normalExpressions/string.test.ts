import { lispish } from '../../../src'

describe('string functions', () => {
  describe('substring', () => {
    test('samples', () => {
      expect(() => lispish(`(substring "abcde")`)).toThrow()
      expect(lispish(`(substring "abcde" 0)`)).toBe('abcde')
      expect(lispish(`(substring "abcde" 1)`)).toBe('bcde')
      expect(lispish(`(substring "abcde" 2)`)).toBe('cde')
      expect(lispish(`(substring "abcde" 3)`)).toBe('de')
      expect(lispish(`(substring "abcde" 4)`)).toBe('e')
      expect(lispish(`(substring "abcde" 5)`)).toBe('')
      expect(lispish(`(substring "abcde" 6)`)).toBe('')
      expect(lispish(`(substring "abcde" 0 0)`)).toBe('')
      expect(() => lispish(`(substring "abcde" 1 0)`)).toThrow()
      expect(lispish(`(substring "abcde" 1 1)`)).toBe('')
      expect(lispish(`(substring "abcde" 1 2)`)).toBe('b')
      expect(lispish(`(substring "abcde" 1 3)`)).toBe('bc')
      expect(lispish(`(substring "abcde" 1 4)`)).toBe('bcd')
      expect(lispish(`(substring "abcde" 1 5)`)).toBe('bcde')
      expect(lispish(`(substring "abcde" 1 6)`)).toBe('bcde')
    })
  })

  describe('stringLenght', () => {
    test('samples', () => {
      expect(lispish(`(string-length "")`)).toBe(0)
      expect(lispish(`(string-length "1")`)).toBe(1)
      expect(lispish(`(string-length "123")`)).toBe(3)
      expect(() => lispish(`(string-length '())`)).toThrow()
      expect(() => lispish(`(string-length '(1))`)).toThrow()
      expect(() => lispish(`(string-length '(1 2 3))`)).toThrow()
      expect(() => lispish(`(string-length)`)).toThrow()
      expect(() => lispish(`(string-length "" "")`)).toThrow()
      expect(() => lispish(`(string-length 12)`)).toThrow()
      expect(() => lispish(`(string-length false)`)).toThrow()
      expect(() => lispish(`(string-length true)`)).toThrow()
      expect(() => lispish(`(string-length null)`)).toThrow()
      expect(() => lispish(`(string-length undefined)`)).toThrow()
      expect(() => lispish(`(string-length (object))`)).toThrow()
    })
  })

  describe('concat', () => {
    test('samples', () => {
      expect(lispish(`(concat)`)).toBe('')
      expect(lispish(`(concat "")`)).toBe('')
      expect(lispish(`(concat "1")`)).toBe('1')
      expect(lispish(`(concat "1" "2")`)).toBe('12')
      expect(lispish(`(concat "1" "2" "three" "4")`)).toBe('12three4')
      expect(() => lispish(`(concat 0)`)).toThrow()
      expect(() => lispish(`(concat true)`)).toThrow()
      expect(() => lispish(`(concat "1" false)`)).toThrow()
      expect(() => lispish(`(concat null "m")`)).toThrow()
      expect(() => lispish(`(concat undefined)`)).toThrow()
      expect(() => lispish(`(concat '())`)).toThrow()
      expect(() => lispish(`(concat (object))`)).toThrow()
    })
  })

  describe('string>', () => {
    test('samples', () => {
      expect(lispish(`(string> "albert" "ALBERT")`)).toBe(true)
      expect(lispish(`(string> "ALBERT" "albert")`)).toBe(false)
      expect(lispish(`(string> "albert" "alber")`)).toBe(true)
      expect(lispish(`(string> "albert" "albert")`)).toBe(false)
      expect(lispish(`(string> "alber" "albert")`)).toBe(false)
      expect(() => lispish(`(string>)`)).toThrow()
      expect(() => lispish(`(string> "a")`)).toThrow()
      expect(() => lispish(`(string> "a", "A", "Q")`)).toThrow()
      expect(() => lispish(`(string> 2 1)`)).toThrow()
      expect(() => lispish(`(string> null null)`)).toThrow()
      expect(() => lispish(`(string> undefined undefined)`)).toThrow()
      expect(() => lispish(`(string> true true)`)).toThrow()
      expect(() => lispish(`(string> false false)`)).toThrow()
      expect(() => lispish(`(string> "a" true)`)).toThrow()
      expect(() => lispish(`(string> true "a")`)).toThrow()
      expect(() => lispish(`(string> '() "a")`)).toThrow()
      expect(() => lispish(`(string> (object) "a")`)).toThrow()
    })
  })

  describe('string<', () => {
    test('samples', () => {
      expect(lispish(`(string< "albert" "ALBERT")`)).toBe(false)
      expect(lispish(`(string< "ALBERT" "albert")`)).toBe(true)
      expect(lispish(`(string< "albert" "alber")`)).toBe(false)
      expect(lispish(`(string< "albert" "albert")`)).toBe(false)
      expect(lispish(`(string< "alber" "albert")`)).toBe(true)
      expect(() => lispish(`(string<)`)).toThrow()
      expect(() => lispish(`(string< "a")`)).toThrow()
      expect(() => lispish(`(string< "a", "A", "Q")`)).toThrow()
      expect(() => lispish(`(string< 2 1)`)).toThrow()
      expect(() => lispish(`(string< null null)`)).toThrow()
      expect(() => lispish(`(string< undefined undefined)`)).toThrow()
      expect(() => lispish(`(string< true true)`)).toThrow()
      expect(() => lispish(`(string< false false)`)).toThrow()
      expect(() => lispish(`(string< "a" true)`)).toThrow()
      expect(() => lispish(`(string< true "a")`)).toThrow()
      expect(() => lispish(`(string< '() "a")`)).toThrow()
      expect(() => lispish(`(string< (object) "a")`)).toThrow()
    })
  })

  describe('string>=', () => {
    test('samples', () => {
      expect(lispish(`(string>= "albert" "ALBERT")`)).toBe(true)
      expect(lispish(`(string>= "ALBERT" "albert")`)).toBe(false)
      expect(lispish(`(string>= "albert" "alber")`)).toBe(true)
      expect(lispish(`(string>= "albert" "albert")`)).toBe(true)
      expect(lispish(`(string>= "alber" "albert")`)).toBe(false)
      expect(() => lispish(`(string>=)`)).toThrow()
      expect(() => lispish(`(string>= "a")`)).toThrow()
      expect(() => lispish(`(string>= "a", "A", "Q")`)).toThrow()
      expect(() => lispish(`(string>= 2 1)`)).toThrow()
      expect(() => lispish(`(string>= null null)`)).toThrow()
      expect(() => lispish(`(string>= undefined undefined)`)).toThrow()
      expect(() => lispish(`(string>= true true)`)).toThrow()
      expect(() => lispish(`(string>= false false)`)).toThrow()
      expect(() => lispish(`(string>= "a" true)`)).toThrow()
      expect(() => lispish(`(string>= true "a")`)).toThrow()
      expect(() => lispish(`(string>= '() "a")`)).toThrow()
      expect(() => lispish(`(string>= (object) "a")`)).toThrow()
    })
  })

  describe('string<=', () => {
    test('samples', () => {
      expect(lispish(`(string<= "albert" "ALBERT")`)).toBe(false)
      expect(lispish(`(string<= "ALBERT" "albert")`)).toBe(true)
      expect(lispish(`(string<= "albert" "alber")`)).toBe(false)
      expect(lispish(`(string<= "albert" "albert")`)).toBe(true)
      expect(lispish(`(string<= "alber" "albert")`)).toBe(true)
      expect(() => lispish(`(string<=)`)).toThrow()
      expect(() => lispish(`(string<= "a")`)).toThrow()
      expect(() => lispish(`(string<= "a", "A", "Q")`)).toThrow()
      expect(() => lispish(`(string<= 2 1)`)).toThrow()
      expect(() => lispish(`(string<= null null)`)).toThrow()
      expect(() => lispish(`(string<= undefined undefined)`)).toThrow()
      expect(() => lispish(`(string<= true true)`)).toThrow()
      expect(() => lispish(`(string<= false false)`)).toThrow()
      expect(() => lispish(`(string<= "a" true)`)).toThrow()
      expect(() => lispish(`(string<= true "a")`)).toThrow()
      expect(() => lispish(`(string<= '() "a")`)).toThrow()
      expect(() => lispish(`(string<= (object) "a")`)).toThrow()
    })
  })

  describe('string-reverse', () => {
    test('samples', () => {
      expect(lispish(`(string-reverse "albert")`)).toBe('trebla')
      expect(lispish(`(string-reverse "A 1")`)).toBe('1 A')
      expect(lispish(`(string-reverse "")`)).toBe('')
      expect(() => lispish(`(string-reverse)`)).toThrow()
      expect(() => lispish(`(string-reverse "word1" "word2")`)).toThrow()
    })
  })

  describe('string-to-number', () => {
    test('samples', () => {
      expect(lispish(`(string-to-number "123.25")`)).toBe(123.25)
      expect(lispish(`(string-to-number "0b1111")`)).toBe(15)
      expect(lispish(`(string-to-number "0Xf")`)).toBe(15)
      expect(lispish(`(string-to-number "0o17")`)).toBe(15)
      expect(lispish(`(string-to-number "-0.125")`)).toBe(-0.125)
      expect(() => lispish(`(string-to-number)`)).toThrow()
      expect(() => lispish(`(string-to-number "987" "65")`)).toThrow()
      expect(() => lispish(`(string-to-number "non parsable number")`)).toThrow()
    })
  })

  describe('number-to-string', () => {
    test('samples', () => {
      expect(lispish(`(number-to-string 10.25)`)).toBe('10.25')
      expect(lispish(`(number-to-string -11)`)).toBe('-11')
      expect(lispish(`(number-to-string 11 2)`)).toBe('1011')
      expect(lispish(`(number-to-string 11 8)`)).toBe('13')
      expect(lispish(`(number-to-string 11.11 10)`)).toBe('11.11')
      expect(() => lispish(`(number-to-string)`)).toThrow()
      expect(() => lispish(`(number-to-string -1 2)`)).toThrow()
      expect(() => lispish(`(number-to-string 1.5 2)`)).toThrow()
      expect(() => lispish(`(number-to-string 1.5 8)`)).toThrow()
      expect(() => lispish(`(number-to-string 1.5 16)`)).toThrow()
      expect(() => lispish(`(number-to-string -1 2)`)).toThrow()
      expect(() => lispish(`(number-to-string -1 8)`)).toThrow()
      expect(() => lispish(`(number-to-string -1 16)`)).toThrow()
      expect(() => lispish(`(number-to-string 10 7)`)).toThrow()
      expect(() => lispish(`(number-to-string 10 20)`)).toThrow()
    })
  })

  describe('lower-case', () => {
    test('samples', () => {
      expect(lispish(`(lower-case "Albert!")`)).toBe('albert!')
      expect(lispish(`(lower-case "")`)).toBe('')
      expect(() => lispish(`(lower-case)`)).toThrow()
      expect(() => lispish(`(lower-case "First" "Second")`)).toThrow()
    })
  })

  describe('upper-case', () => {
    test('samples', () => {
      expect(lispish(`(upper-case "Albert!")`)).toBe('ALBERT!')
      expect(lispish(`(upper-case "")`)).toBe('')
      expect(() => lispish(`(upper-case)`)).toThrow()
      expect(() => lispish(`(upper-case "First" "Second")`)).toThrow()
    })
  })

  describe('trim', () => {
    test('samples', () => {
      expect(lispish(`(trim "  Albert!  ")`)).toBe('Albert!')
      expect(lispish(`(trim " ")`)).toBe('')
      expect(lispish(`(trim "")`)).toBe('')
      expect(() => lispish(`(trim)`)).toThrow()
      expect(() => lispish(`(trim "First" "Second")`)).toThrow()
    })
  })

  describe('string-repeat', () => {
    test('samples', () => {
      expect(lispish(`(string-repeat "*" 10)`)).toBe('**********')
      expect(lispish(`(string-repeat "*" 0)`)).toBe('')
      expect(lispish(`(string-repeat "Hello, " 3)`)).toBe('Hello, Hello, Hello, ')
      expect(() => lispish(`(string-repeat)`)).toThrow()
      expect(() => lispish(`(string-repeat "Hello, ")`)).toThrow()
      expect(() => lispish(`(string-repeat "Hello, " 3 3)`)).toThrow()
      expect(() => lispish(`(string-repeat "Hello, " "3")`)).toThrow()
      expect(() => lispish(`(string-repeat true, 1)`)).toThrow()
    })
  })
})
