module.exports = {
  lognot: {
    name: 'lognot',
    category: 'Bitwise',
    linkName: 'lognot',
    returns: {
      type: 'integer',
    },
    arguments: [
      {
        name: 'int32',
        type: 'integer',
      },
    ],
    shortDescription: 'Returns bitwise `not` of `int32`.',
    longDescription: 'Returns bitwise `not` of `int32`.',
    examples: ['(lognot 0)', '(lognot 255)'],
    specialExpression: false,
    sideEffects: [],
  },
  logand: {
    name: 'logand',
    category: 'Bitwise',
    linkName: 'logand',
    returns: {
      type: 'integer',
    },
    arguments: [
      {
        name: 'int32',
        type: 'integer',
        description: 'zero or more',
      },
    ],
    shortDescription: 'Returns bitwise `and` of all arguments.',
    longDescription: 'Returns bitwise `and` of all arguments. Return -1 if no arguments.',
    examples: ['(logand)', '(logand 0b1111)', '(logand 0b0011 0b0110)', '(logand 0b0011 0b0110 0b1001)'],
    specialExpression: false,
    sideEffects: [],
  },
  logor: {
    name: 'logor',
    category: 'Bitwise',
    linkName: 'logor',
    returns: {
      type: 'integer',
    },
    arguments: [
      {
        name: 'int32',
        type: 'integer',
        description: 'zero or more',
      },
    ],
    shortDescription: 'Returns bitwise `or` of all arguments.',
    longDescription: 'Returns bitwise `or` of all arguments. Return 0 if no arguments.',
    examples: ['(logor)', '(logor 0b1111)', '(logor 0b0011 0b0110)', '(logor 0b1000 0b0100 0b0010)'],
    specialExpression: false,
    sideEffects: [],
  },
  logxor: {
    name: 'logxor',
    category: 'Bitwise',
    linkName: 'logxor',
    returns: {
      type: 'integer',
    },
    arguments: [
      {
        name: 'first',
        type: 'integer',
      },
      {
        name: 'second',
        type: 'integer',
      },
    ],
    shortDescription: 'Returns bitwise `xor` of `first` and `second`.',
    longDescription: 'Returns bitwise `xor` of `first` and `second`.',
    examples: ['(logxor 0b0011 0b0110)'],
    specialExpression: false,
    sideEffects: [],
  },
}
