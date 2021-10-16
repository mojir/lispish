module.exports = {
  'not=': {
    name: `not=`,
    category: `Misc`,
    linkName: `not_equal`,
    returns: {
      type: `boolean`,
    },
    arguments: [
      {
        name: `values`,
        type: `array`,
      },
    ],
    description: `Result is \`true\` if no two \`values\` are equal to each other, otherwise result is \`false\`. Note that only two argument version result is negation of \`=\` function, that is \`(not= a b)\` is same as \`(not (= a b))\`.`,
    examples: [`(not= 3)`, `(not= 3 2)`, `(not= "3" 3)`, `(not= 3 3 2)`, `(not= "3" "2" "1" "0")`, `(not= 0 -0)`],
    specialExpression: false,
  },
  '=': {
    name: `=`,
    category: `Misc`,
    linkName: `_equal`,
    returns: {
      type: `boolean`,
    },
    arguments: [
      {
        name: `values`,
        type: `array`,
      },
    ],
    description: `Compares \`values\` according to "equal" predicate. Result is \`true\` if every specified value is equal to each other, otherwise result is \`false\`.`,
    examples: [`(= 1 1)`, `(= 1.01 1)`, `(= "1" 1)`, `(= "2" "2" "2" "2")`, `(= 2 2 1 2)`],
    specialExpression: false,
  },
  '<': {
    name: `<`,
    category: `Misc`,
    linkName: `_lt`,
    returns: {
      type: `boolean`,
    },
    arguments: [
      {
        name: `a`,
        type: `any`,
      },
      {
        name: `b`,
        type: `any`,
      },
    ],
    description: `Compares \`numbers\` according to "less than" predicate. Each (overlapping) pair of the \`numbers\` is compared by it. The result is \`true\` if all compared pairs satisfy comparison.`,
    examples: [`(< 0 1)`, `(< 1 1.01)`, `(< 1 1)`, `(< 1 2 3 4)`, `(< 1 2 2 3)`],
    specialExpression: false,
  },
  '>': {
    name: `>`,
    category: `Misc`,
    linkName: `_gt`,
    returns: {
      type: `boolean`,
    },
    arguments: [
      {
        name: `number`,
        type: `number`,
      },
    ],
    description: `Compares \`numbers\` according to "greater than" predicate. Each (overlapping) pair of the \`numbers\` is compared by it. The result is \`true\` if all compared pairs satisfy comparison.`,
    examples: [`(> 1 0)`, `(> 1.01 1)`, `(> 1 1)`, `(> 4 3 2 1)`, `(> 3 2 2 1)`],
    specialExpression: false,
  },
  '<=': {
    name: `<=`,
    category: `Misc`,
    linkName: `_lte`,
    returns: {
      type: `boolean`,
    },
    arguments: [
      {
        name: `number`,
        type: `number`,
      },
    ],
    description: `Compares \`numbers\` according to "less than or equal" predicate. Each (overlapping) pair of the \`numbers\` is compared by it. The result is \`true\` if all compared pairs satisfy comparison.`,
    examples: [`(<= 0 1)`, `(<= 1 1.01)`, `(<= 1 1)`, `(<= 1 2 3 4)`, `(<= 1 2 2 3)`],
    specialExpression: false,
  },
  '>=': {
    name: `>=`,
    category: `Misc`,
    linkName: `_gte`,
    returns: {
      type: `boolean`,
    },
    arguments: [
      {
        name: `number`,
        type: `number`,
      },
    ],
    description: `Compares \`numbers\` according to "greater than or equal" predicate. Each (overlapping) pair of the \`numbers\` is compared by it. The result is \`true\` if all compared pairs satisfy comparison.`,
    examples: [`(>= 1 0)`, `(>= 1.01 1)`, `(>= 1 1)`, `(>= 4 3 2 1)`, `(>= 3 2 2 1)`],
    specialExpression: false,
  },
  not: {
    name: `not`,
    category: `Misc`,
    linkName: `not`,
    returns: {
      type: `boolean`,
    },
    arguments: [
      {
        name: `value`,
        type: `any`,
      },
    ],
    description: `Computes logical negation. Note that any other \`value\` than \`false\`, \`0\`, \`null\`, \`undefined\` and \`""\` is considered as \`true\`.`,
    examples: [
      `(not 3)`,
      `(not true)`,
      `(not "A string")`,
      `(not 0)`,
      `(not false)`,
      `(not null)`,
      `(not undefined)`,
      `(not "")`,
    ],
    specialExpression: false,
  },
  apply: {
    name: `apply`,
    category: `Misc`,
    linkName: `apply`,
    returns: {
      type: `boolean`,
    },
    arguments: [
      {
        name: `fn`,
        type: `function`,
      },
      {
        name: `args`,
        type: `array`,
      },
    ],
    description: `Call supplied function with specified arguments.`,
    examples: [`(apply + [1 2 3])`, `(apply (fn [x y] (sqrt (+ (* x x) (* y y)))) [3 4])`],
    specialExpression: false,
  },
  'write!': {
    name: `write!`,
    category: `Misc`,
    linkName: `write_exclamation`,
    returns: {
      type: `value`,
    },
    arguments: [
      {
        name: `values`,
        type: `array`,
      },
    ],
    description: `It console.log the \`values\` and then returns the last element of the \`values\` array.. If called with no arguments \`undefined\` is returned.`,
    examples: [
      `(write! "A string")`,
      `(write! 100 "items")`,
      `(write! (object "a" 10))`,
      `(write! ["a" "b" "c"])`,
      `(write! (regexp "^start"))`,
      `(write! null undefined true false)`,
    ],
    specialExpression: false,
  },
  'inst-ms': {
    name: `inst-ms`,
    category: `Misc`,
    linkName: `inst-ms`,
    returns: {
      type: `number`,
    },
    arguments: [],
    description: `Returns milliseconds elapsed since the UNIX epoch.`,
    examples: [`(inst-ms)`],
    specialExpression: false,
  },
  'get-path': {
    name: `get-path`,
    category: `Misc`,
    linkName: `get-path`,
    returns: {
      type: `number`,
    },
    arguments: [
      {
        name: `object`,
        type: `object | array`,
      },
      {
        name: `path`,
        type: `string`,
      },
    ],
    description: `Is used to get the value at \`path\` of object or array.`,
    examples: [
      `(get-path (write! (object "a" (object "x" [1 2 3]))) "a.x[2]")`,
      `(get-path (write! (object "a" (object "x" [1 2 3]))) "b.z[10]")`,
      `(get-path (write! [(object "x" [1 2 3])]) "[1].x[2]")`,
    ],
    specialExpression: false,
  },
  'debug!': {
    name: `debug!`,
    category: `Misc`,
    linkName: `debug_exclamation`,
    returns: {
      type: `undefined`,
    },
    arguments: [
      {
        name: `label`,
        type: `form`,
      },
    ],
    description: `Console.error context stack.`,
    examples: [`(debug!)`],
    specialExpression: false,
  },
  boolean: {
    name: `boolean`,
    category: `Misc`,
    linkName: `boolean`,
    returns: {
      type: `true | false`,
    },
    arguments: [
      {
        name: `value`,
        type: `any`,
      },
    ],
    description: `Coerces \`value\` to boolean.`,
    examples: [`(boolean 0)`, `(boolean 1)`, `(boolean null)`, `(boolean "Albert")`],
    specialExpression: false,
  },
  compare: {
    name: `compare`,
    category: `Misc`,
    linkName: `compare`,
    returns: {
      type: `1 | -1 | 0`,
    },
    arguments: [
      {
        name: `a`,
        type: `any`,
      },
      {
        name: `b`,
        type: `any`,
      },
    ],
    description: `Compares two values. Returns -1 if a < b, 1 if a > b and 0 if a and b have the same sort order.`,
    examples: [
      `(compare 0 1)`,
      `(compare "Albert" "Mojir")`,
      `(compare 1 "1")`,
      `(compare [1 2 3] [2 3])`,
      `(compare [1 2 3] [2 3 4])`,
      `(compare {"a" 1 "b" 2} {"a" 1})`,
      `(compare {"a" 1} [2 3])`,
      `(compare + -)`,
    ],
    specialExpression: false,
  },
  assert: {
    name: `assert`,
    category: `Misc`,
    linkName: `assert`,
    returns: {
      type: `any`,
    },
    arguments: [
      {
        name: `value`,
        type: `any`,
      },
      {
        name: `message`,
        type: `string`,
        description: `optional`,
      },
    ],
    description: `If \`value\` is falsy it throws AssertionError with \`message\`. If no \`message\` is provided, message is set to \`value\`.`,
    examples: [`(assert 0 "Expected a positive value")`, `(assert false)`, `(assert 1)`],
    specialExpression: false,
  },
  identity: {
    name: `identity`,
    category: `Misc`,
    linkName: `identity`,
    returns: {
      type: `any`,
    },
    arguments: [
      {
        name: `value`,
        type: `any`,
      },
    ],
    description: `Returns \`value\`.`,
    examples: [`(identity 1)`, `(identity "Albert")`, `(identity {"a" 1})`, `(identity null)`],
    specialExpression: false,
  },
  partial: {
    name: `partial`,
    category: `Misc`,
    linkName: `partial`,
    returns: {
      type: `function`,
    },
    arguments: [
      {
        name: `fn`,
        type: `function`,
      },
      {
        name: `args`,
        type: `any`,
        description: `zero or more`,
      },
    ],
    description: `Takes a function \`fn\` and fewer (or equal) than the normal arguments to \`fn\`, and returns a function that takes a variable number of additional args. When called, the returned function calls f with \`args\` + additional args.`,
    examples: [`(partial + 100)`, `(def addHundred (partial + 100)) (addHundred 10)`],
    specialExpression: false,
  },
  comp: {
    name: `comp`,
    category: `Misc`,
    linkName: `comp`,
    returns: {
      type: `function`,
    },
    arguments: [
      {
        name: `fn`,
        type: `function`,
        description: `zero or more`,
      },
      {
        name: `fns`,
        type: `function[]`,
        description: `optional`,
      },
    ],
    description: `Takes a set of functions and returns a fn that is the composition of those. The returned functions takes a variable number of arguments, applies the rightmost function to the args, the next function (right-to-left) to the result, etc.`,
    examples: [
      `(def negative-quotient (comp - /)) (negative-quotient 9 3)`,
      `(#((apply comp first (repeat %2 rest)) %1) [1 2 3 4 5 6 7] 3)`,
      `(def x {"bar" {"foo" 42}}) ((comp "foo" "bar") x)`,
    ],
    specialExpression: false,
  },
  constantly: {
    name: `constantly`,
    category: `Misc`,
    linkName: `constantly`,
    returns: {
      type: `function`,
    },
    arguments: [
      {
        name: `value`,
        type: `any`,
      },
    ],
    description: `Returns a function that takes any number of arguments and returns \`value\`.`,
    examples: [
      `(def negative-quotient (constantly - /)) (negative-quotient 9 3)`,
      `(#((apply constantly first (repeat %2 rest)) %1) [1 2 3 4 5 6 7] 3)`,
      `(def x {"bar" {"foo" 42}}) ((constantly "foo" "bar") x)`,
    ],
    specialExpression: false,
  },
}
