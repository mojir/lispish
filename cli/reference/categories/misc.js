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
    examples: [`(not= 3)`, `(not= 3 2)`, `(not= :3 3)`, `(not= 3 3 2)`, `(not= :3 :2 :1 :0)`, `(not= 0 -0)`],
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
    description: `Compares \`values\` according to 'equal' predicate. Result is \`true\` if every specified value is equal to each other, otherwise result is \`false\`.`,
    examples: [`(= 1 1)`, `(= 1.01 1)`, `(= :1 1)`, `(= :2 :2 :2 :2)`, `(= 2 2 1 2)`],
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
        name: `values`,
        type: `any`,
        description: `one or many`,
      },
    ],
    description: `Compares \`values\` according to 'less than' predicate. Each (overlapping) pair of the \`values\` is compared by it. The result is \`true\` if all compared pairs satisfy comparison.`,
    examples: [`(< 0 1)`, `(< 1 1.01)`, `(< 1 1)`, `(< 1 2 2 3)`, `(< :a :b)`, `(< [9] [1 2])`],
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
        name: `values`,
        type: `any`,
        description: `one or many`,
      },
    ],
    description: `Compares \`values\` according to 'greater than' predicate. Each (overlapping) pair of the \`values\` is compared by it. The result is \`true\` if all compared pairs satisfy comparison.`,
    examples: [`(> 1 0)`, `(> 1.01 1)`, `(> 1 1)`, `(> 4 3 2 1)`, `(> 3 2 2 1)`],
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
        name: `values`,
        type: `any`,
        description: `one or many`,
      },
    ],
    description: `Compares \`values\` according to 'less than or equal' predicate. Each (overlapping) pair of the \`values\` is compared by it. The result is \`true\` if all compared pairs satisfy comparison.`,
    examples: [`(<= 0 1)`, `(<= 1 1.01)`, `(<= 1 1)`, `(<= 1 2 3 4)`, `(<= 1 2 2 3)`],
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
        name: `values`,
        type: `any`,
        description: `one or many`,
      },
    ],
    description: `Compares \`values\` according to 'greater than or equal' predicate. Each (overlapping) pair of the \`values\` is compared by it. The result is \`true\` if all compared pairs satisfy comparison.`,
    examples: [`(>= 1 0)`, `(>= 1.01 1)`, `(>= 1 1)`, `(>= 4 3 2 1)`, `(>= 3 2 2 1)`],
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
    description: `Computes logical negation. Note that any other \`value\` than \`false\`, \`0\`, \`nil\` and \`''\` is considered as \`true\`.`,
    examples: [`(not 3)`, `(not true)`, `(not "A string")`, `(not 0)`, `(not false)`, `(not nil)`, `(not "")`],
  },
  'write!': {
    name: `write!`,
    category: `Misc`,
    linkName: `write_exclamation`,
    clojureDocs: null,
    returns: {
      type: `value`,
    },
    arguments: [
      {
        name: `values`,
        type: `array`,
      },
    ],
    description: `It console.log the \`values\` and then returns the last element of the \`values\` array. If called with no arguments \`nil\` is returned.`,
    examples: [
      `(write! "A string")`,
      `(write! 100 "items")`,
      `(write! (object :a 10))`,
      `(write! [:a :b :c])`,
      `(write! #"^start")`,
      `(write! nil true false)`,
    ],
  },
  'inst-ms!': {
    name: `inst-ms!`,
    category: `Misc`,
    linkName: `inst-ms_exclamation`,
    clojureDocs: `inst-ms`,
    returns: {
      type: `number`,
    },
    arguments: [],
    description: `Returns milliseconds elapsed since the UNIX epoch.`,
    examples: [`(inst-ms!)`],
  },
  'iso-date-time->inst-ms': {
    name: `iso-date-time->inst-ms`,
    category: `Misc`,
    linkName: `iso-date-time-_gtinst-ms`,
    returns: {
      type: `number`,
    },
    arguments: [
      {
        name: `date-time`,
        type: `string`,
      },
    ],
    description: `Returns milliseconds elapsed since the UNIX epoch to \`date-time\`.`,
    examples: [`(iso-date-time->inst-ms "2022-04-12T09:37:10.899Z")`, `(iso-date-time->inst-ms "1980-01-01")`],
  },
  'inst-ms->iso-date-time': {
    name: `inst-ms->iso-date-time`,
    category: `Misc`,
    linkName: `inst-ms-_gtiso-date-time`,
    returns: {
      type: `string`,
    },
    arguments: [
      {
        name: `ms`,
        type: `number`,
      },
    ],
    description: `Returns IOS date time string from \`ms\` (milliseconds elapsed since the UNIX epoch).`,
    examples: [`(inst-ms->iso-date-time 1649756230899)`, `(inst-ms->iso-date-time 0)`],
  },
  'debug!': {
    name: `debug!`,
    category: `Misc`,
    linkName: `debug_exclamation`,
    clojureDocs: null,
    returns: {
      type: `any`,
    },
    arguments: [
      {
        name: `value`,
        type: `any`,
      },
    ],
    description: `If no params, prints context stack, otherwise prints \`value\` details.`,
    examples: [`(debug!)`, `(debug! #(> %1 2))`],
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
    examples: [`(boolean 0)`, `(boolean 1)`, `(boolean nil)`, `(boolean "Albert")`],
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
      `(compare 1 :1)`,
      `(compare [1 2 3] [2 3])`,
      `(compare [1 2 3] [2 3 4])`,
      `(compare {:a 1 :b 2} {:a 1})`,
      `(compare {:a 1} [2 3])`,
      `(compare + -)`,
    ],
  },
  'lits-version!': {
    name: `lits-version!`,
    category: `Misc`,
    linkName: `lits-version_exclamation`,
    returns: {
      type: `string`,
    },
    arguments: [],
    description: `Returns the lits version.`,
    examples: [`(lits-version!)`],
  },
  'uuid!': {
    name: `uuid!`,
    category: `Misc`,
    linkName: `uuid_exclamation`,
    returns: {
      type: `string`,
    },
    arguments: [],
    description: `Returns UUID string.`,
    examples: [`(uuid!)`],
  },
  'equal?': {
    name: `equal?`,
    category: `Misc`,
    linkName: `equal_question`,
    clojureDocs: null,
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
    description: `Returns true if \`a\` and \`b\` are structually equal.`,
    examples: [
      `(equal? {:a 10 :b 20} {:b 20 :a 10})`,
      `(equal? [1 true nil] [1 true nil])`,
      `(equal? {:a 10 :b [1 2 {:b 20}]} {:b [1 2 {:b 20}] :a 10})`,
      `(equal? {:a 10 :b [1 2 {:b 20}]} {:b [1 2 {:b 21}] :a 10})`,
      `(= 0.3 (+ 0.1 0.2))`,
      `(equal? 0.3 (+ 0.1 0.2))`,
    ],
  },
}
