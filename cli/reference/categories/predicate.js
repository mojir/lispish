module.exports = {
  'boolean?': {
    name: `boolean?`,
    category: `Predicate`,
    linkName: `boolean_question`,
    returns: {
      type: `boolean`,
    },
    arguments: [
      {
        name: `value`,
        type: `any`,
      },
    ],
    shortDescription: `Returns \`true\` if \`value\` is a \`boolean\`, otherwise \`false\`.`,
    longDescription: `Returns \`true\` if \`value\` is a \`boolean\`, otherwise \`false\`.`,
    examples: [`(boolean? true)`, `(boolean? false)`, `(boolean? [1 2 3])`, `(boolean? 0)`, `(boolean? "A string")`],
    specialExpression: false,
    sideEffects: [],
  },
  'null?': {
    name: `null?`,
    category: `Predicate`,
    linkName: `null_question`,
    returns: {
      type: `boolean`,
    },
    arguments: [
      {
        name: `value`,
        type: `any`,
      },
    ],
    shortDescription: `Returns \`true\` if \`value\` is \`null\`, otherwise \`false\`.`,
    longDescription: `Returns \`true\` if \`value\` is \`null\`, otherwise \`false\`.`,
    examples: [`(null? null)`, `(null? false)`, `(null? [1 2 3])`, `(null? 0)`, `(null? "A string")`],
    specialExpression: false,
    sideEffects: [],
  },
  'undefined?': {
    name: `undefined?`,
    category: `Predicate`,
    linkName: `undefined_question`,
    returns: {
      type: `boolean`,
    },
    arguments: [
      {
        name: `value`,
        type: `any`,
      },
    ],
    shortDescription: `Returns \`true\` if \`value\` is \`undefined\`, otherwise \`false\`.`,
    longDescription: `Returns \`true\` if \`value\` is \`undefined\`, otherwise \`false\`.`,
    examples: [
      `(undefined? undefined)`,
      `(undefined? false)`,
      `(undefined? null)`,
      `(undefined? [1 2 3])`,
      `(undefined? 0)`,
      `(undefined? "A string")`,
    ],
    specialExpression: false,
    sideEffects: [],
  },
  'number?': {
    name: `number?`,
    category: `Predicate`,
    linkName: `number_question`,
    returns: {
      type: `boolean`,
    },
    arguments: [
      {
        name: `value`,
        type: `any`,
      },
    ],
    shortDescription: `Returns \`true\` if \`value\` is a number, otherwise \`false\`.`,
    longDescription: `Returns \`true\` if \`value\` is a number, otherwise \`false\`.`,
    examples: [
      `(number? 0)`,
      `(number? 2)`,
      `(number? -0.12)`,
      `(number? false)`,
      `(number? [1 2 3])`,
      `(number? "A string")`,
    ],
    specialExpression: false,
    sideEffects: [],
  },
  'string?': {
    name: `string?`,
    category: `Predicate`,
    linkName: `string_question`,
    returns: {
      type: `boolean`,
    },
    arguments: [
      {
        name: `value`,
        type: `any`,
      },
    ],
    shortDescription: `Returns \`true\` if \`value\` is a string, otherwise \`false\`.`,
    longDescription: `Returns \`true\` if \`value\` is a string, otherwise \`false\`.`,
    examples: [
      `(string? "")`,
      `(string? "A string")`,
      `(string? (if true "A string" false))`,
      `(string? false)`,
      `(string? [1 2 3])`,
      `(string? 100)`,
    ],
    specialExpression: false,
    sideEffects: [],
  },
  'function?': {
    name: `function?`,
    category: `Predicate`,
    linkName: `function_question`,
    returns: {
      type: `boolean`,
    },
    arguments: [
      {
        name: `value`,
        type: `any`,
      },
    ],
    shortDescription: `Returns \`true\` if \`value\` is a function, otherwise \`false\`.`,
    longDescription: `Returns \`true\` if \`value\` is a function, otherwise \`false\`.`,
    examples: [
      `(function? +)`,
      `(function? /)`,
      `(function? (fn [x y] (+ x y)))`,
      `(function? false)`,
      `(function? "false")`,
      `(function? [1 2 3])`,
    ],
    specialExpression: false,
    sideEffects: [],
  },
  'integer?': {
    name: `integer?`,
    category: `Predicate`,
    linkName: `integer_question`,
    returns: {
      type: `boolean`,
    },
    arguments: [
      {
        name: `value`,
        type: `any`,
      },
    ],
    shortDescription: `Returns \`true\` if \`value\` is an integer, otherwise \`false\`.`,
    longDescription: `Returns \`true\` if \`value\` is an integer, otherwise \`false\`.`,
    examples: [
      `(integer? 0)`,
      `(integer? -12)`,
      `(integer? 42)`,
      `(integer? 10.1)`,
      `(integer? (fn [x y] (+ x y)))`,
      `(integer? false)`,
      `(integer? "false")`,
      `(integer? [1 2 3])`,
    ],
    specialExpression: false,
    sideEffects: [],
  },
  'array?': {
    name: `array?`,
    category: `Predicate`,
    linkName: `array_question`,
    returns: {
      type: `boolean`,
    },
    arguments: [
      {
        name: `value`,
        type: `any`,
      },
    ],
    shortDescription: `Returns \`true\` if \`value\` is an array, otherwise \`false\`.`,
    longDescription: `Returns \`true\` if \`value\` is an array, otherwise \`false\`.`,
    examples: [
      `(array? [])`,
      `(array? [1 2 3])`,
      `(array? (object "a" 10))`,
      `(array? 42)`,
      `(array? 10.1)`,
      `(array? (fn [x y] (+ x y)))`,
    ],
    specialExpression: false,
    sideEffects: [],
  },
  'object?': {
    name: `object?`,
    category: `Predicate`,
    linkName: `object_question`,
    returns: {
      type: `boolean`,
    },
    arguments: [
      {
        name: `value`,
        type: `any`,
      },
    ],
    shortDescription: `Returns \`true\` if \`value\` is an object, otherwise \`false\`.`,
    longDescription: `Returns \`true\` if \`value\` is an object, otherwise \`false\`.`,
    examples: [
      `(object? (object "a" 10))`,
      `(object? (object))`,
      `(object? 42)`,
      `(object? 10.1)`,
      `(object? (fn [x y] (+ x y)))`,
      `(object? (regexp "^start"))`,
      `(object? "false")`,
      `(object? [1 2 3])`,
    ],
    specialExpression: false,
    sideEffects: [],
  },
  'regexp?': {
    name: `regexp?`,
    category: `Predicate`,
    linkName: `regexp_question`,
    returns: {
      type: `boolean`,
    },
    arguments: [
      {
        name: `value`,
        type: `any`,
      },
    ],
    shortDescription: `Returns \`true\` if \`value\` is a regexp, otherwise \`false\`.`,
    longDescription: `Returns \`true\` if \`value\` is a regexp, otherwise \`false\`.`,
    examples: [
      `(regexp? (regexp "^start"))`,
      `(regexp? -12)`,
      `(regexp? (object))`,
      `(regexp? 10.1)`,
      `(regexp? (fn [x y] (+ x y)))`,
      `(regexp? false)`,
      `(regexp? "false")`,
      `(regexp? [1 2 3])`,
    ],
    specialExpression: false,
    sideEffects: [],
  },
  'zero?': {
    name: `zero?`,
    category: `Predicate`,
    linkName: `zero_question`,
    returns: {
      type: `boolean`,
    },
    arguments: [
      {
        name: `number`,
        type: `number`,
      },
    ],
    shortDescription: `Returns \`true\` if \`number\` is \`0\`, otherwise \`false\`.`,
    longDescription: `Returns \`true\` if \`number\` is \`0\`, otherwise \`false\`.`,
    examples: [`(zero? 0)`, `(zero? -0.0)`, `(zero? 1)`, `(zero? 0.1)`],
    specialExpression: false,
    sideEffects: [],
  },
  'even?': {
    name: `even?`,
    category: `Predicate`,
    linkName: `even_question`,
    returns: {
      type: `boolean`,
    },
    arguments: [
      {
        name: `number`,
        type: `number`,
      },
    ],
    shortDescription: `Returns \`true\` if \`number\` is even, otherwise \`false\`.`,
    longDescription: `Returns \`true\` if \`number\` is even, otherwise \`false\`.`,
    examples: [`(even? 0)`, `(even? -0.0)`, `(even? -1)`, `(even? 2.1)`],
    specialExpression: false,
    sideEffects: [],
  },
  'odd?': {
    name: `odd?`,
    category: `Predicate`,
    linkName: `odd_question`,
    returns: {
      type: `boolean`,
    },
    arguments: [
      {
        name: `number`,
        type: `number`,
      },
    ],
    shortDescription: `Returns \`true\` if \`number\` is odd, otherwise \`false\`.`,
    longDescription: `Returns \`true\` if \`number\` is odd, otherwise \`false\`.`,
    examples: [`(odd? 1.0)`, `(odd? 1.001)`, `(odd? -1)`, `(odd? 2.1)`],
    specialExpression: false,
    sideEffects: [],
  },
  'empty?': {
    name: `empty?`,
    category: `Predicate`,
    linkName: `empty_question`,
    returns: {
      type: `boolean`,
    },
    arguments: [
      {
        name: `array`,
        type: `array`,
      },
    ],
    shortDescription: `Returns \`true\` if \`array\` is empty, otherwise \`false\`.`,
    longDescription: `Returns \`true\` if \`array\` is empty, otherwise \`false\`.`,
    examples: [`(empty? [])`, `(empty? [1 2 3])`],
    specialExpression: false,
    sideEffects: [],
  },
}
