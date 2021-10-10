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
}
