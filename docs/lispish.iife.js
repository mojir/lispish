var Lispish = (function (e) {
  'use strict'
  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */ var t = function (e, n) {
    return (
      (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (e, t) {
            e.__proto__ = t
          }) ||
        function (e, t) {
          for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
        }),
      t(e, n)
    )
  }
  function n(e, n) {
    if ('function' != typeof n && null !== n)
      throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null')
    function r() {
      this.constructor = e
    }
    t(e, n), (e.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()))
  }
  var r = function () {
    return (
      (r =
        Object.assign ||
        function (e) {
          for (var t, n = 1, r = arguments.length; n < r; n++)
            for (var a in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a])
          return e
        }),
      r.apply(this, arguments)
    )
  }
  function a(e, t) {
    for (var n = 0, r = t.length, a = e.length; n < r; n++, a++) e[a] = t[n]
    return e
  }
  var u = (function (e) {
      function t(n, r) {
        var a = e.call(this, 'return-from block "' + n + '" with value: ' + r) || this
        return Object.setPrototypeOf(a, t.prototype), (a.name = 'ReturnFromSignal'), (a.blockName = n), (a.value = r), a
      }
      return n(t, e), t
    })(Error),
    i = (function (e) {
      function t(n) {
        var r = e.call(this, 'return with value: ' + n) || this
        return Object.setPrototypeOf(r, t.prototype), (r.name = 'ReturnSignal'), (r.value = n), r
      }
      return n(t, e), t
    })(Error),
    o = (function (e) {
      function t(n) {
        var r = e.call(this, n) || this
        return Object.setPrototypeOf(r, t.prototype), (r.name = 'UserDefinedError'), r
      }
      return n(t, e), t
    })(Error),
    l = (function (e) {
      function t(n, r) {
        var a = e.call(this, 'Expected a "' + n + '" token, got Token[' + r.type + ':"' + r.value + '"]') || this
        return Object.setPrototypeOf(a, t.prototype), (a.name = 'UnexpectedTokenError'), a
      }
      return n(t, e), t
    })(Error),
    c = (function (e) {
      function t(n, r) {
        var a = e.call(this, 'Expected a ' + n + ' node, got ' + (r ? 'a ' + r.type + ' node' : 'undefined')) || this
        return Object.setPrototypeOf(a, t.prototype), (a.name = 'UnexpectedNodeTypeError'), a
      }
      return n(t, e), t
    })(Error),
    v = Symbol('function')
  function f(e) {
    if (void 0 === e) throw Error('Expected an AST node, got undefined')
    return e
  }
  function s(e) {
    if (void 0 === e || 'Name' !== e.type) throw new c('Name', e)
    return e
  }
  function p(e) {
    if (void 0 === e || 'Name' !== e.type) throw new c('Name', e)
  }
  function d(e, t) {
    if ((void 0 === t && (t = 'Unexpected end of input'), void 0 === e)) throw Error(t)
    return e
  }
  function m(e, t) {
    if ((void 0 === t && (t = 'Unexpected end of input'), void 0 === e)) throw Error(t)
  }
  function h(e) {
    if ('number' != typeof e || !isFinite(e)) throw TypeError('Expected number, got: ' + e + ' type="' + typeof e + '"')
  }
  function g(e) {
    return h(e), e
  }
  function y(e) {
    if ((h(e), e <= 0)) throw TypeError('Expected positive number, got ' + e)
  }
  function b(e) {
    if ((h(e), e < 0)) throw TypeError('Expected non negative number, got ' + e)
  }
  function E(e) {
    if ((h(e), !Number.isInteger(e))) throw TypeError('Expected integer, got ' + e)
  }
  function w(e) {
    if ('string' != typeof e) throw TypeError('Expected string, got: ' + e + ' type="' + typeof e + '"')
  }
  function x(e) {
    if (!(e instanceof RegExp)) throw TypeError('Expected RegExp, got: ' + e + ' type="' + typeof e + '"')
  }
  function k(e) {
    if (!Array.isArray(e)) throw TypeError('Expected list, got: ' + e + ' type="' + typeof e + '"')
  }
  function N(e) {
    if (null === e || 'object' != typeof e || Array.isArray(e) || e instanceof RegExp || j(e))
      throw TypeError('Expected object, got: ' + e + ' type="' + typeof e + '"')
  }
  function S(e) {
    if ((h(e), 0 === e)) throw TypeError('Expected non zero value')
  }
  function A(e, t) {
    var n = t.params.length
    if ('number' == typeof e) {
      if (n !== e) throw Error('Wrong number of arguments to "' + t.name + '", expected ' + e + ', got ' + n)
    } else {
      var r = e.min,
        a = e.max
      if (void 0 === r && void 0 === a) throw Error('Min or max must be specified')
      if ('number' == typeof r && n < r)
        throw Error('Wrong number of arguments to "' + t.name + '", expected at least ' + r + ', got ' + n)
      if ('number' == typeof a && n > a)
        throw Error('Wrong number of arguments to "' + t.name + '", expected at most ' + a + ', got ' + n)
    }
  }
  function j(e) {
    return null !== e && 'object' == typeof e && !!e[v]
  }
  function M(e) {
    if (null === e || 'object' != typeof e) throw Error('Expected lispish function, got ' + e)
    if (!e[v]) throw Error('Expected lispish function, got ' + JSON.stringify(e))
  }
  function O(e) {
    return !!j(e) && !!e.arguments
  }
  var T = {
    parse: function (e, t, n) {
      var r = n.parseToken,
        a = d(e[t])
      if ('name' !== a.type) throw new l('name', a)
      t += 1
      var u = { type: 'SpecialExpression', name: 'block', blockName: a.value, params: [] }
      for (a = d(e[t]); 'paren' !== a.type || ')' !== a.value; ) {
        var i = r(e, t),
          o = i[0],
          c = i[1]
        u.params.push(c), (a = d(e[(t = o)]))
      }
      return [t + 1, u]
    },
    evaluate: function (e, t, n) {
      var r,
        i = a([{}], t)
      try {
        for (var o = 0, l = e.params; o < l.length; o++) {
          r = n(l[o], i)
        }
        return r
      } catch (t) {
        if (t instanceof u && e.blockName === t.blockName) return t.value
        throw t
      }
    },
    validate: function (e) {
      return A({ min: 1 }, e)
    },
  }
  var P = {
    parse: function (e, t, n) {
      var r = (function (e, t, n) {
        for (var r = [], a = d(e[t]); 'paren' !== a.type || ')' !== a.value; ) {
          if ('paren' !== a.type || '(' !== a.value)
            throw Error('Expected a condition starting with "(", got ' + a.type + ':' + a.value)
          var u = n(e, t + 1),
            i = u[0],
            o = u[1],
            l = []
          for (a = d(e[(t = i)]); 'paren' !== a.type || ')' !== a.value; ) {
            var c = n(e, t),
              v = c[0],
              f = c[1]
            l.push(f), (a = d(e[(t = v)]))
          }
          r.push({ test: o, body: l }), (a = d(e[(t += 1)]))
        }
        return [t, r]
      })(e, t, n.parseToken)
      return [r[0] + 1, { type: 'SpecialExpression', name: 'cond', conditions: r[1], params: [] }]
    },
    evaluate: function (e, t, n) {
      for (var r, a = 0, u = e.conditions; a < u.length; a++) {
        var i = u[a]
        if ((r = n(i.test, t))) {
          for (var o = 0, l = i.body; o < l.length; o++) {
            r = n(l[o], t)
          }
          return r
        }
      }
    },
  }
  function q(e, t, n) {
    for (var r = [], a = d(e[(t += 1)]); 'paren' !== a.type || ')' !== a.value; ) {
      if ('paren' !== a.type || '(' !== a.value)
        throw SyntaxError('Invalid token "' + a.type + '" value=' + a.value + ', expected an expression')
      var u = n(e, t),
        i = u[0],
        o = u[1]
      ;(t = i), r.push(o), (a = d(e[t]))
    }
    return [(t += 1), r]
  }
  function F(e) {
    return function (t, n, r) {
      var a,
        u = r.parseToken,
        i = r.parseArgument,
        o = r.parseBinding,
        v = void 0
      if (
        ('defun' === e || 'create-function' === e) &&
        ((n = (a = u(t, n))[0]), (v = a[1]), 'defun' === e && 'Name' !== v.type)
      )
        throw new c('Name', v)
      var f = d(t[n])
      if ('paren' !== f.type || '(' !== f.value) throw new l(')', f)
      var s = (function (e, t, n, r) {
          for (
            var a, u = [], i = void 0, o = [], l = [], c = {}, v = 'mandatory', f = d(e[t]);
            'paren' !== f.type || ')' !== f.value;

          ) {
            if ('bind' === v) {
              ;(t = (a = q(e, t, r))[0]), (u = a[1])
              break
            }
            var s = n(e, t),
              p = s[0],
              m = s[1]
            if (((f = d(e[(t = p)])), 'Modifier' === m.type))
              switch (m.value) {
                case '&optional':
                  if ('rest' === v) throw Error('&optional cannot appear after &rest')
                  if ('optional' === v) throw Error('&optional can only appear once')
                  v = 'optional'
                  break
                case '&rest':
                  if ('rest' === v) throw Error('&rest can only appear once')
                  if ('optional' === v && 0 === l.length) throw Error('No optional arguments where spcified')
                  v = 'rest'
                  break
                case '&bind':
                  if ('optional' === v && 0 === l.length) throw Error('No optional arguments where spcified')
                  if ('rest' === v && !i) throw Error('No rest argument was spcified')
                  v = 'bind'
              }
            else {
              if (c[m.name]) throw Error('Duplicate argument "' + m.name + '"')
              if (((c[m.name] = !0), Object.getOwnPropertyDescriptor(m, 'defaultValue'))) {
                if ('optional' !== v) throw Error('Cannot specify default value if not an optional argument')
                l.push({ name: m.name, defaultValue: m.defaultValue })
              } else
                switch (v) {
                  case 'mandatory':
                    o.push(m.name)
                    break
                  case 'optional':
                    l.push({ name: m.name, defaultValue: void 0 })
                    break
                  case 'rest':
                    if (void 0 !== i) throw Error('Can only specify one rest argument')
                    i = m.name
                }
            }
          }
          if ('rest' === v && void 0 === i) throw Error('Missing rest argument name')
          if ('optional' === v && 0 === l.length) throw Error('No optional arguments where spcified')
          return [(t += 1), { mandatoryArguments: o, optionalArguments: l, restArgument: i, bindings: u }]
        })(t, (n += 1), i, o),
        p = s[0],
        m = s[1]
      f = d(t[(n = p)])
      for (var h = []; 'paren' !== f.type || ')' !== f.value; ) {
        var g = u(t, n),
          y = g[0],
          b = g[1]
        h.push(b), (f = d(t[(n = y)]))
      }
      if (0 === h.length) throw Error('Missing body in special expression "defun"')
      return (
        (n += 1),
        'defun' === e || 'create-function' === e
          ? [n, { type: 'SpecialExpression', name: e, functionName: v, params: [], arguments: m, body: h }]
          : [n, { type: 'SpecialExpression', name: e, params: [], arguments: m, body: h }]
      )
    }
  }
  function I(e) {
    return function (t, n, r) {
      for (
        var a,
          u = (function (e, t, n, r) {
            if ('defun' === e) {
              var a = t.functionName.value
              return w(a), a
            }
            if ('create-function' === e) {
              var u = r(t.functionName, n)
              return w(u), u
            }
          })(e, t, n, r),
          i = {},
          o = 0,
          l = t.arguments.bindings;
        o < l.length;
        o++
      ) {
        var c = l[o],
          f = c.value,
          s = r(f, n)
        i[c.name] = { value: s, constant: !1 }
      }
      var p = t.arguments.optionalArguments.map(function (e) {
          var t = e.name,
            a = e.defaultValue
          return a ? { name: t, defaultValue: r(a, n) } : { name: t }
        }),
        m =
          (((a = {})[v] = !0),
          (a.name = u),
          (a.arguments = {
            mandatoryArguments: t.arguments.mandatoryArguments,
            restArgument: t.arguments.restArgument,
            optionalArguments: p,
          }),
          (a.body = t.body),
          (a.functionContext = i),
          a)
      if ('lambda' === e) return m
      d(n[n.length - 2], 'Could not find global scope')[u] = { value: m, constant: !1 }
    }
  }
  var L = { parse: F('defun'), evaluate: I('defun') },
    C = { parse: F('create-function'), evaluate: I('create-function') },
    R = { parse: F('lambda'), evaluate: I('lambda') },
    U = {
      parse: function (e, t, n) {
        var r,
          a,
          u,
          i,
          o,
          c,
          v = n.parseToken,
          f = d(e[t])
        if ('paren' !== f.type || '(' !== f.value) throw new l('(', f)
        ;(t = (r = v(e, (t += 1)))[0]), p((o = r[1])), (t = (a = v(e, t))[0]), (c = a[1])
        var s = void 0
        ;('paren' === (f = d(e[t])).type && ')' === f.value) || ((t = (u = v(e, t))[0]), (s = u[1]))
        var m = { type: 'SpecialExpression', name: 'dolist', params: [], varName: o, result: s, list: c }
        for (f = d(e[(t += 1)]); 'paren' !== f.type || ')' !== f.value; ) {
          var h
          ;(t = (i = v(e, t))[0]), (h = i[1]), m.params.push(h), (f = d(e[t]))
        }
        return [t + 1, m]
      },
      evaluate: function (e, t, n) {
        var r,
          u = n(e.list, t)
        k(u)
        var o = e.varName.value,
          l = (((r = {})[o] = { value: void 0, constant: !1 }), r),
          c = a([l], t)
        try {
          for (; u.length > 0; ) {
            var v = u.shift()
            l[o] = { value: v, constant: !1 }
            for (var f = 0, s = e.params; f < s.length; f++) {
              n(s[f], c)
            }
          }
        } catch (e) {
          if (e instanceof i) return e.value
          throw e
        }
        if (e.result) return (l[o] = { value: void 0, constant: !1 }), n(e.result, c)
      },
    },
    _ = {
      parse: function (e, t, n) {
        var r,
          a,
          u,
          i,
          o,
          l,
          c = n.parseToken,
          v = d(e[t])
        if ('paren' !== v.type || '(' !== v.value) throw Error('Expected "(", got ' + v.type + ': ' + v.value)
        ;(t = (r = c(e, (t += 1)))[0]), p((o = r[1])), (t = (a = c(e, t))[0]), (l = a[1])
        var f = void 0
        ;('paren' === (v = d(e[t])).type && ')' === v.value) || ((t = (u = c(e, t))[0]), (f = u[1]))
        var s = { type: 'SpecialExpression', name: 'dotimes', params: [], varName: o, result: f, count: l }
        for (v = d(e[(t += 1)]); 'paren' !== v.type || ')' !== v.value; ) {
          var m
          ;(t = (i = c(e, t))[0]), (m = i[1]), s.params.push(m), (v = d(e[t]))
        }
        return [t + 1, s]
      },
      evaluate: function (e, t, n) {
        var r,
          u = n(e.count, t)
        E(u), b(u)
        var o = e.varName.value,
          l = (((r = {})[o] = { value: void 0, constant: !1 }), r),
          c = a([l], t)
        try {
          var v = void 0
          for (v = 0; v < u; v += 1) {
            l[o] = { value: v, constant: !1 }
            for (var f = 0, s = e.params; f < s.length; f++) {
              n(s[f], c)
            }
          }
          if (!e.result) return
          return (l[o] = { value: v, constant: !1 }), n(e.result, c)
        } catch (e) {
          if (e instanceof i) return e.value
          throw e
        }
      },
    },
    V = {
      append: {
        evaluate: function (e) {
          var t = e[0],
            n = e.slice(1)
          return (
            k(t),
            n.reduce(function (e, t) {
              return k(t), e.concat(t)
            }, t)
          )
        },
        validate: function (e) {
          return A({ min: 1 }, e)
        },
      },
      cons: {
        evaluate: function (e) {
          var t = e[0],
            n = e[1]
          return k(n), a([t], n)
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      at: {
        evaluate: function (e) {
          var t = e[0],
            n = e[1]
          return (
            (function (e) {
              if (!Array.isArray(e) && 'string' != typeof e)
                throw TypeError('Expected string or array, got: ' + e + ' type="' + typeof e + '"')
            })(t),
            E(n),
            t[n < 0 ? t.length + n : n]
          )
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      every: {
        evaluate: function (e, t, n) {
          var r = e[0],
            a = e[1],
            u = n.evaluateLispishFunction
          return (
            M(r),
            k(a),
            0 !== a.length &&
              a.every(function (e) {
                return u(r, [e], t)
              })
          )
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      filter: {
        evaluate: function (e, t, n) {
          var r = e[0],
            a = e[1],
            u = n.evaluateLispishFunction
          return (
            M(r),
            k(a),
            a.filter(function (e) {
              return u(r, [e], t)
            })
          )
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      find: {
        evaluate: function (e, t, n) {
          var r = e[0],
            a = e[1],
            u = n.evaluateLispishFunction
          return (
            M(r),
            k(a),
            a.find(function (e) {
              return u(r, [e], t)
            })
          )
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      first: {
        evaluate: function (e) {
          var t = e[0]
          return k(t), t[0]
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      includes: {
        evaluate: function (e) {
          var t = e[0],
            n = e[1]
          return k(n), n.includes(t)
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      last: {
        evaluate: function (e) {
          var t = e[0]
          return k(t), t[t.length - 1]
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      length: {
        evaluate: function (e) {
          var t = e[0]
          return k(t), t.length
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      list: {
        evaluate: function (e) {
          return e
        },
      },
      listf: {
        evaluate: function (e) {
          var t = e[0],
            n = e[1]
          E(t), y(t)
          for (var r = [], a = 0; a < t; a += 1) r.push(n)
          return r
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      map: {
        evaluate: function (e, t, n) {
          var r = n.evaluateLispishFunction,
            a = e[0],
            u = e[1]
          M(a), k(u)
          var i = u.length
          if (2 === e.length)
            return u.map(function (e) {
              return r(a, [e], t)
            })
          e.slice(2).forEach(function (e) {
            if ((k(e), i !== e.length)) throw Error('All list arguments to "map" must have the same length')
          })
          for (
            var o = [],
              l = function (n) {
                var u = e.slice(1).map(function (e) {
                  return e[n]
                })
                o.push(r(a, u, t))
              },
              c = 0;
            c < i;
            c += 1
          )
            l(c)
          return o
        },
        validate: function (e) {
          return A({ min: 2 }, e)
        },
      },
      pop: {
        evaluate: function (e) {
          var t = e[0]
          return k(t), t.pop()
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      position: {
        evaluate: function (e, t, n) {
          var r = e[0],
            a = e[1],
            u = n.evaluateLispishFunction
          M(r), k(a)
          var i = a.findIndex(function (e) {
            return u(r, [e], t)
          })
          return -1 !== i ? i : void 0
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      push: {
        evaluate: function (e) {
          var t = e[0],
            n = e.slice(1)
          return k(t), t.push.apply(t, n), t
        },
        validate: function (e) {
          return A({ min: 2 }, e)
        },
      },
      range: {
        evaluate: function (e) {
          var t,
            n,
            r,
            a = e[0],
            u = e[1],
            i = e[2]
          h(a),
            1 === e.length
              ? ((t = 0), (r = (n = a) >= 0 ? 1 : -1))
              : 2 === e.length
              ? (h(u), (r = (n = u) >= (t = a) ? 1 : -1))
              : (h(u),
                h(i),
                (r = i),
                (n = u) > (t = a)
                  ? y(r)
                  : n < t
                  ? (function (e) {
                      if ((h(e), e >= 0)) throw TypeError('Expected negative number, got ' + e)
                    })(r)
                  : S(r))
          for (var o = [], l = t; r < 0 ? l > n : l < n; l += r) o.push(l)
          return o
        },
        validate: function (e) {
          return A({ min: 1, max: 3 }, e)
        },
      },
      reduce: {
        evaluate: function (e, t, n) {
          var r = e[0],
            a = e[1],
            u = e[2],
            i = n.evaluateLispishFunction
          return (
            M(r),
            k(a),
            a.reduce(function (e, n) {
              return i(r, [e, n], t)
            }, u)
          )
        },
        validate: function (e) {
          return A(3, e)
        },
      },
      'reduce-right': {
        evaluate: function (e, t, n) {
          var r = e[0],
            a = e[1],
            u = e[2],
            i = n.evaluateLispishFunction
          return (
            M(r),
            k(a),
            a.reduceRight(function (e, n) {
              return i(r, [e, n], t)
            }, u)
          )
        },
        validate: function (e) {
          return A(3, e)
        },
      },
      rest: {
        evaluate: function (e) {
          var t = e[0]
          if ((k(t), !(t.length <= 1))) return t.slice(1)
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      reverse: {
        evaluate: function (e) {
          var t = e[0]
          return k(t), a([], t).reverse()
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      second: {
        evaluate: function (e) {
          var t = e[0]
          return k(t), t[1]
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      selt: {
        evaluate: function (e) {
          var t = e[0],
            n = e[1],
            r = e[2]
          return (
            k(t),
            b(n),
            (function (e, t) {
              if ((h(e), e >= t)) throw TypeError('Expected parameter (' + e + ') to be a number less than ' + t)
            })(n, t.length),
            (t[n] = r),
            t
          )
        },
        validate: function (e) {
          return A(3, e)
        },
      },
      shift: {
        evaluate: function (e) {
          var t = e[0]
          return k(t), t.shift()
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      slice: {
        evaluate: function (e) {
          var t = e[0],
            n = e[1],
            r = e[2]
          return k(t), 1 === e.length ? a([], t) : (E(n), 2 === e.length ? t.slice(n) : (E(r), t.slice(n, r)))
        },
        validate: function (e) {
          return A({ min: 1, max: 3 }, e)
        },
      },
      some: {
        evaluate: function (e, t, n) {
          var r = e[0],
            a = e[1],
            u = n.evaluateLispishFunction
          return (
            M(r),
            k(a),
            0 !== a.length &&
              a.some(function (e) {
                return u(r, [e], t)
              })
          )
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      sort: {
        evaluate: function (e, t, n) {
          var r = e[0],
            u = e[1],
            i = n.evaluateLispishFunction
          M(r), k(u)
          var o = a([], u)
          return (
            o.sort(function (e, n) {
              var a = i(r, [e, n], t)
              return h(a), a
            }),
            o
          )
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      splice: {
        evaluate: function (e) {
          var t = e[0],
            n = e[1],
            r = e[2],
            u = e.slice(3)
          return k(t), E(n), 2 === e.length ? t.splice(n) : (E(r), t.splice.apply(t, a([n, r], u)))
        },
        validate: function (e) {
          return A({ min: 2 }, e)
        },
      },
      take: {
        evaluate: function (e) {
          var t = e[0],
            n = e[1]
          return k(t), b(n), E(n), t.slice(0, n)
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      'take-while': {
        evaluate: function (e, t, n) {
          var r = e[0],
            a = e[1],
            u = n.evaluateLispishFunction
          k(a), M(r)
          for (var i = [], o = 0, l = a; o < l.length; o++) {
            var c = l[o]
            if (!u(r, [c], t)) break
            i.push(c)
          }
          return i
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      unshift: {
        evaluate: function (e) {
          var t = e[0],
            n = e.slice(1)
          return k(t), t.unshift.apply(t, n), t
        },
        validate: function (e) {
          return A({ min: 2 }, e)
        },
      },
    },
    $ = {
      '1+': {
        evaluate: function (e) {
          var t = e[0]
          return h(t), g(t + 1)
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      '1-': {
        evaluate: function (e) {
          var t = e[0]
          return h(t), g(t - 1)
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      '+': {
        evaluate: function (e) {
          return g(
            e.reduce(function (e, t) {
              return h(t), e + t
            }, 0),
          )
        },
      },
      '*': {
        evaluate: function (e) {
          return g(
            e.reduce(function (e, t) {
              return h(t), e * t
            }, 1),
          )
        },
      },
      '/': {
        evaluate: function (e) {
          if (0 === e.length) return 1
          var t = e[0],
            n = e.slice(1)
          return (
            h(t),
            0 === n.length
              ? (S(t), 1 / t)
              : g(
                  n.reduce(function (e, t) {
                    return S(t), e / t
                  }, t),
                )
          )
        },
      },
      '-': {
        evaluate: function (e) {
          var t = e[0],
            n = e.slice(1)
          return t
            ? (h(t),
              0 === n.length
                ? -t
                : g(
                    n.reduce(function (e, t) {
                      return h(t), e - t
                    }, t),
                  ))
            : 0
        },
      },
      '%': {
        evaluate: function (e) {
          var t = e[0],
            n = e[1]
          return h(t), S(n), g(t % n)
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      sqrt: {
        evaluate: function (e) {
          var t = e[0]
          return b(t), g(Math.sqrt(t))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      cbrt: {
        evaluate: function (e) {
          var t = e[0]
          return b(t), g(Math.cbrt(t))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      pow: {
        evaluate: function (e) {
          var t = e[0],
            n = e[1]
          return h(t), h(n), g(Math.pow(t, n))
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      round: {
        evaluate: function (e) {
          var t = e[0],
            n = e[1]
          if ((h(t), 1 === e.length || 0 === n)) return g(Math.round(t))
          y(n), E(n)
          var r = Math.pow(10, n)
          return g(Math.round(t * r) / r)
        },
        validate: function (e) {
          return A({ min: 1, max: 2 }, e)
        },
      },
      trunc: {
        evaluate: function (e) {
          var t = e[0]
          return h(t), g(Math.trunc(t))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      floor: {
        evaluate: function (e) {
          var t = e[0]
          return h(t), g(Math.floor(t))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      ceil: {
        evaluate: function (e) {
          var t = e[0]
          return h(t), g(Math.ceil(t))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      random: {
        evaluate: function (e) {
          var t = e[0]
          return y(t), g(Math.random() * t)
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      '>': {
        evaluate: function (e) {
          var t = e[0],
            n = e.slice(1)
          if ((h(t), 0 === n.length)) return !0
          for (var r = t, a = 0, u = n; a < u.length; a++) {
            var i = u[a]
            if ((h(i), r <= i)) return !1
            r = i
          }
          return !0
        },
        validate: function (e) {
          return A({ min: 1 }, e)
        },
      },
      '<': {
        evaluate: function (e) {
          var t = e[0],
            n = e.slice(1)
          if ((h(t), 0 === n.length)) return !0
          for (var r = t, a = 0, u = n; a < u.length; a++) {
            var i = u[a]
            if ((h(i), r >= i)) return !1
            r = i
          }
          return !0
        },
        validate: function (e) {
          return A({ min: 1 }, e)
        },
      },
      '>=': {
        evaluate: function (e) {
          var t = e[0],
            n = e.slice(1)
          if ((h(t), 0 === n.length)) return !0
          for (var r = t, a = 0, u = n; a < u.length; a++) {
            var i = u[a]
            if ((h(i), r < i)) return !1
            r = i
          }
          return !0
        },
        validate: function (e) {
          return A({ min: 1 }, e)
        },
      },
      '<=': {
        evaluate: function (e) {
          var t = e[0],
            n = e.slice(1)
          if ((h(t), 0 === n.length)) return !0
          for (var r = t, a = 0, u = n; a < u.length; a++) {
            var i = u[a]
            if ((h(i), r > i)) return !1
            r = i
          }
          return !0
        },
        validate: function (e) {
          return A({ min: 1 }, e)
        },
      },
      min: {
        evaluate: function (e) {
          var t = e[0],
            n = e.slice(1)
          return (
            h(t),
            0 === n.length
              ? t
              : n.reduce(function (e, t) {
                  return h(t), Math.min(e, t)
                }, t)
          )
        },
        validate: function (e) {
          return A({ min: 1 }, e)
        },
      },
      max: {
        evaluate: function (e) {
          var t = e[0],
            n = e.slice(1)
          return (
            h(t),
            0 === n.length
              ? t
              : n.reduce(function (e, t) {
                  return h(t), Math.max(e, t)
                }, t)
          )
        },
        validate: function (e) {
          return A({ min: 1 }, e)
        },
      },
      abs: {
        evaluate: function (e) {
          var t = e[0]
          return h(t), Math.abs(t)
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      sign: {
        evaluate: function (e) {
          var t = e[0]
          return h(t), Math.sign(t)
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      e: {
        evaluate: function () {
          return Math.E
        },
        validate: function (e) {
          return A(0, e)
        },
      },
      pi: {
        evaluate: function () {
          return Math.PI
        },
        validate: function (e) {
          return A(0, e)
        },
      },
      exp: {
        evaluate: function (e) {
          var t = e[0]
          return h(t), g(Math.exp(t))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      log: {
        evaluate: function (e) {
          var t = e[0]
          return y(t), g(Math.log(t))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      log2: {
        evaluate: function (e) {
          var t = e[0]
          return h(t), g(Math.log2(t))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      log10: {
        evaluate: function (e) {
          var t = e[0]
          return h(t), g(Math.log10(t))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      sin: {
        evaluate: function (e) {
          var t = e[0]
          return h(t), g(Math.sin(t))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      asin: {
        evaluate: function (e) {
          var t = e[0]
          return h(t), g(Math.asin(t))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      sinh: {
        evaluate: function (e) {
          var t = e[0]
          return h(t), g(Math.sinh(t))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      asinh: {
        evaluate: function (e) {
          var t = e[0]
          return h(t), g(Math.asinh(t))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      cos: {
        evaluate: function (e) {
          var t = e[0]
          return h(t), g(Math.cos(t))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      acos: {
        evaluate: function (e) {
          var t = e[0]
          return h(t), g(Math.acos(t))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      cosh: {
        evaluate: function (e) {
          var t = e[0]
          return h(t), g(Math.cosh(t))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      acosh: {
        evaluate: function (e) {
          var t = e[0]
          return h(t), g(Math.acosh(t))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      tan: {
        evaluate: function (e) {
          var t = e[0]
          return h(t), g(Math.tan(t))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      atan: {
        evaluate: function (e) {
          var t = e[0]
          return h(t), g(Math.atan(t))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      tanh: {
        evaluate: function (e) {
          var t = e[0]
          return h(t), g(Math.tanh(t))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      atanh: {
        evaluate: function (e) {
          var t = e[0]
          return h(t), g(Math.atanh(t))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
    },
    z = /[[.]/
  function B(e, t) {
    for (var n = 0, r = D(t); n < r.length; n++) {
      var a = r[n]
      try {
        e = e[a]
      } catch (e) {
        return
      }
    }
    return e
  }
  function D(e) {
    if (!e) return []
    var t = z.exec(e)
    if (!t) return [e]
    if (t.index > 0) return a([e.substring(0, t.index)], D(e.substring(t.index)))
    if ('.' === e[0]) {
      if (e.length < 2) throw Error('Ill formed path: ' + e)
      return D(e.substring(1))
    }
    var n = (function (e) {
        var t = G.exec(e) || W.exec(e)
        if (t) {
          return [t[0].length, t[1]]
        }
        var n = J.exec(e)
        if (n) {
          return [n[0].length, Number(n[1])]
        }
        throw Error('Ill formed path: ' + e)
      })(e),
      r = n[0],
      u = n[1]
    if (e.length > r && '.' !== e[r] && '[' !== e[r]) throw Error('Ill formed path: ' + e)
    return a([u], D(e.substring(r)))
  }
  var G = /^\[\s*'(.*)'\s*\]/,
    W = /^\[\s*"(.*)"\s*\]/,
    J = /^\[\s*(\d+)\s*\]/
  var K = {
    '!=': {
      evaluate: function (e) {
        for (var t = 0; t < e.length - 1; t += 1) for (var n = t + 1; n < e.length; n += 1) if (e[t] === e[n]) return !1
        return !0
      },
      validate: function (e) {
        return A({ min: 1 }, e)
      },
    },
    '=': {
      evaluate: function (e) {
        for (var t = e[0], n = 0, r = e.slice(1); n < r.length; n++) {
          if (r[n] !== t) return !1
        }
        return !0
      },
      validate: function (e) {
        return A({ min: 1 }, e)
      },
    },
    apply: {
      evaluate: function (e, t, n) {
        var r = e[0],
          a = e[1],
          u = n.evaluateLispishFunction
        return M(r), k(a), u(r, a, t)
      },
      validate: function (e) {
        return A(2, e)
      },
    },
    'get-path': {
      evaluate: function (e) {
        var t = e[0],
          n = e[1]
        return (
          (function (e) {
            if (
              (null === e || 'object' != typeof e || Array.isArray(e) || e instanceof RegExp || j(e)) &&
              !Array.isArray(e)
            )
              throw TypeError('Expected object or array, got: ' + e + ' type="' + typeof e + '"')
          })(t),
          w(n),
          B(t, n)
        )
      },
      validate: function (e) {
        return A(2, e)
      },
    },
    not: {
      evaluate: function (e) {
        return !e[0]
      },
      validate: function (e) {
        return A(1, e)
      },
    },
    now: {
      evaluate: function () {
        return Date.now()
      },
      validate: function (e) {
        return A(0, e)
      },
    },
    write: {
      evaluate: function (e) {
        if ((console.log.apply(console, e), e.length > 0)) return e[e.length - 1]
      },
    },
    debug: {
      evaluate: function (e, t) {
        console.error(
          '*** LISPISH DEBUG ***\n\n' +
            (function (e) {
              return e.reverse().reduce(function (e, t, n) {
                return (
                  e +
                  'Context ' +
                  n +
                  (0 === n ? ' - Import context' : 1 === n ? ' - Global context' : '') +
                  '\n' +
                  (function (e) {
                    if (0 === Object.keys(e).length) return '  <empty>\n'
                    var t = Math.max.apply(
                      Math,
                      Object.keys(e).map(function (e) {
                        return e.length
                      }),
                    )
                    return Object.entries(e).reduce(function (e, n) {
                      var r = ('' + n[0]).padEnd(t + 2, ' ')
                      return (
                        e +
                        (n[1].constant ? '* ' : '  ') +
                        r +
                        (function (e) {
                          if (j((t = e.value)) && !O(t)) return '<builtin function ' + e.value.name + '>'
                          if (O(e.value)) return e.value.name ? '<function ' + e.value.name + '>' : '<function λ>'
                          var t
                          return JSON.stringify(e.value)
                        })(n[1]) +
                        '\n'
                      )
                    }, '')
                  })(t) +
                  '\n'
                )
              }, '')
            })(t),
        )
      },
      validate: function (e) {
        return A(0, e)
      },
    },
  }
  var H = {
      object: {
        evaluate: function (e) {
          for (var t = {}, n = 0; n < e.length; n += 2) {
            var r = e[n],
              a = e[n + 1]
            w(r), (t[r] = a)
          }
          return t
        },
        validate: function (e) {
          return (function (e) {
            var t = e.params.length
            if (t % 2 != 0) throw Error('Wrong number of arguments, expected an even number, got ' + t)
          })(e)
        },
      },
      keys: {
        evaluate: function (e) {
          var t = e[0]
          return N(t), Object.keys(t)
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      values: {
        evaluate: function (e) {
          var t = e[0]
          return N(t), Object.values(t)
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      entries: {
        evaluate: function (e) {
          var t = e[0]
          return N(t), Object.entries(t)
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      ohas: {
        evaluate: function (e) {
          var t = e[0],
            n = e[1]
          return N(t), w(n), !!Object.getOwnPropertyDescriptor(t, n)
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      oget: {
        evaluate: function (e) {
          var t = e[0],
            n = e[1]
          return N(t), w(n), t[n]
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      oset: {
        evaluate: function (e) {
          var t = e[0],
            n = e[1],
            r = e[2]
          return N(t), w(n), (t[n] = r), r
        },
        validate: function (e) {
          return A(3, e)
        },
      },
      odel: {
        evaluate: function (e) {
          var t = e[0],
            n = e[1]
          N(t), w(n)
          var r = t[n]
          return delete t[n], r
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      merge: {
        evaluate: function (e) {
          var t = e[0],
            n = e.slice(1)
          return (
            N(t),
            n.reduce(function (e, t) {
              return N(t), r(r({}, e), t)
            }, r({}, t))
          )
        },
        validate: function (e) {
          return A({ min: 1 }, e)
        },
      },
    },
    X = {
      'function?': {
        evaluate: function (e) {
          return j(e[0])
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'string?': {
        evaluate: function (e) {
          return 'string' == typeof e[0]
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'number?': {
        evaluate: function (e) {
          return 'number' == typeof e[0]
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'integer?': {
        evaluate: function (e) {
          var t = e[0]
          return 'number' == typeof t && Number.isInteger(t)
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'boolean?': {
        evaluate: function (e) {
          return 'boolean' == typeof e[0]
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'undefined?': {
        evaluate: function (e) {
          return void 0 === e[0]
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'null?': {
        evaluate: function (e) {
          return null === e[0]
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'zero?': {
        evaluate: function (e) {
          var t = e[0]
          return h(t), 0 === t
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'even?': {
        evaluate: function (e) {
          var t = e[0]
          return h(t), t % 2 == 0
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'odd?': {
        evaluate: function (e) {
          var t = e[0]
          return h(t), Number.isInteger(t) && t % 2 != 0
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'list?': {
        evaluate: function (e) {
          var t = e[0]
          return Array.isArray(t)
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'object?': {
        evaluate: function (e) {
          var t = e[0]
          return !(null === t || Array.isArray(t) || 'object' != typeof t || t instanceof RegExp || j(t))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'regexp?': {
        evaluate: function (e) {
          var t = e[0]
          return null !== t && !Array.isArray(t) && 'object' == typeof t && t instanceof RegExp
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'empty?': {
        evaluate: function (e) {
          var t = e[0]
          return k(t), 0 === t.length
        },
        validate: function (e) {
          return A(1, e)
        },
      },
    },
    Z = {
      regexp: {
        evaluate: function (e) {
          var t = e[0],
            n = e[1]
          return w(t), 1 === e.length ? new RegExp(t) : (w(n), new RegExp(t, n))
        },
        validate: function (e) {
          return A({ min: 1, max: 2 }, e)
        },
      },
      match: {
        evaluate: function (e) {
          var t = e[0],
            n = e[1]
          x(t), w(n)
          var r = t.exec(n)
          if (r) return a([], r)
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      test: {
        evaluate: function (e) {
          var t = e[0],
            n = e[1]
          return x(t), w(n), t.test(n)
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      replace: {
        evaluate: function (e) {
          var t = e[0],
            n = e[1],
            r = e[2]
          return w(t), x(n), w(r), t.replace(n, r)
        },
        validate: function (e) {
          return A(3, e)
        },
      },
    },
    Q = {
      substring: {
        evaluate: function (e) {
          var t = e[0],
            n = e[1],
            r = e[2]
          return (
            w(t),
            h(n),
            b(n),
            void 0 === r
              ? t.substring(n)
              : ((function (e, t) {
                  if ((h(e), e < t))
                    throw TypeError('Expected parameter (' + e + ') to be a number equal or grater than ' + t)
                })(r, n),
                t.substring(n, r))
          )
        },
        validate: function (e) {
          return A({ min: 2, max: 3 }, e)
        },
      },
      'string-length': {
        evaluate: function (e) {
          var t = e[0]
          return w(t), t.length
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'string-repeat': {
        evaluate: function (e) {
          var t = e[0],
            n = e[1]
          return w(t), b(n), E(n), t.repeat(n)
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      concat: {
        evaluate: function (e) {
          return e.reduce(function (e, t) {
            return w(t), e + t
          }, '')
        },
      },
      'string>': {
        evaluate: function (e) {
          var t = e[0],
            n = e[1]
          return w(t), w(n), t > n
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      'string<': {
        evaluate: function (e) {
          var t = e[0],
            n = e[1]
          return w(t), w(n), t < n
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      'string>=': {
        evaluate: function (e) {
          var t = e[0],
            n = e[1]
          return w(t), w(n), t >= n
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      'string<=': {
        evaluate: function (e) {
          var t = e[0],
            n = e[1]
          return w(t), w(n), t <= n
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      'string-reverse': {
        evaluate: function (e) {
          var t = e[0]
          return w(t), t.split('').reverse().join('')
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'string-to-number': {
        evaluate: function (e) {
          var t = e[0]
          w(t)
          var n = Number(t)
          if (Number.isNaN(n)) throw Error("Could not convert '" + t + "' to a number")
          return n
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'number-to-string': {
        evaluate: function (e) {
          var t = e[0],
            n = e[1]
          if ((h(t), 1 === e.length)) return Number(t).toString()
          if ((h(n), 2 !== n && 8 !== n && 10 !== n && 16 !== n))
            throw Error('Expected "number-to-string" base argument to be 2, 8, 10 or 16, got: ' + n)
          return 10 === n || (b(t), E(t)), Number(t).toString(n)
        },
        validate: function (e) {
          return A({ min: 1, max: 2 }, e)
        },
      },
      'lower-case': {
        evaluate: function (e) {
          var t = e[0]
          return w(t), t.toLowerCase()
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'upper-case': {
        evaluate: function (e) {
          var t = e[0]
          return w(t), t.toUpperCase()
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      trim: {
        evaluate: function (e) {
          var t = e[0]
          return w(t), t.trim()
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'trim-left': {
        evaluate: function (e) {
          var t = e[0]
          return w(t), t.replace(/^\s+/, '')
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'trim-right': {
        evaluate: function (e) {
          var t = e[0]
          return w(t), t.replace(/\s+$/, '')
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      join: {
        evaluate: function (e) {
          var t = e[0],
            n = e[1]
          return (
            k(t),
            t.forEach(function (e) {
              return w(e)
            }),
            w(n),
            t.join(n)
          )
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      split: {
        evaluate: function (e) {
          var t = e[0],
            n = e[1],
            r = e[2]
          return (
            w(t),
            (function (e) {
              if (!(e instanceof RegExp || 'string' == typeof e))
                throw TypeError('Expected RegExp or string, got: ' + e + ' type="' + typeof e + '"')
            })(n),
            void 0 !== r && (E(r), b(r)),
            t.split(n, r)
          )
        },
        validate: function (e) {
          return A({ min: 2, max: 3 }, e)
        },
      },
      'pad-left': {
        evaluate: function (e) {
          var t = e[0],
            n = e[1],
            r = e[2]
          return w(t), E(n), void 0 !== r && w(r), t.padStart(n, r)
        },
        validate: function (e) {
          return A({ min: 2, max: 3 }, e)
        },
      },
      'pad-right': {
        evaluate: function (e) {
          var t = e[0],
            n = e[1],
            r = e[2]
          return w(t), E(n), void 0 !== r && w(r), t.padEnd(n, r)
        },
        validate: function (e) {
          return A({ min: 2, max: 3 }, e)
        },
      },
      template: {
        evaluate: function (e) {
          var t = e[0],
            n = e.slice(1)
          w(t)
          var r = t.split('||||')
          if (1 === r.length)
            return (
              (function (e) {
                if (
                  !Array.isArray(e) ||
                  e.some(function (e) {
                    return 'string' != typeof e
                  })
                )
                  throw Error('Expected an array of strings, got ' + e)
              })(n),
              ee(r[0], n)
            )
          if (2 === r.length) {
            var u = n[0]
            b(u), E(u)
            var i = a(['' + u], n.slice(1))
            return ee(1 === u ? r[0] : r[1], i)
          }
          throw Error('Invalid template string, only one "||||" separator allowed')
        },
        validate: function (e) {
          return A({ min: 1, max: 10 }, e)
        },
      },
    },
    Y = /\$\$/g
  function ee(e, t) {
    for (var n = 0; n < 9; n += 1) {
      var r = new RegExp('(?<=^|[^$]|\\$\\$)\\$' + (n + 1), 'g')
      if (r.test(e)) {
        var a = t[n]
        w(a), (e = e.replace(r, a))
      }
    }
    return e.replace(Y, '$')
  }
  var te = r(
      r(
        r(
          r(
            r(
              r(
                r(
                  r(
                    {},
                    {
                      ash: {
                        evaluate: function (e) {
                          var t = e[0],
                            n = e[1]
                          return E(t), E(n), n >= 0 ? t << n : t >> -n
                        },
                        validate: function (e) {
                          return A(2, e)
                        },
                      },
                      lognot: {
                        evaluate: function (e) {
                          var t = e[0]
                          return E(t), ~t
                        },
                        validate: function (e) {
                          return A(1, e)
                        },
                      },
                      logand: {
                        evaluate: function (e) {
                          var t = e[0],
                            n = e.slice(1)
                          return 0 === e.length
                            ? -1
                            : (E(t),
                              n.reduce(function (e, t) {
                                return E(t), e & t
                              }, t))
                        },
                      },
                      logor: {
                        evaluate: function (e) {
                          var t = e[0],
                            n = e.slice(1)
                          return 0 === e.length
                            ? 0
                            : (E(t),
                              n.reduce(function (e, t) {
                                return E(t), e | t
                              }, t))
                        },
                      },
                      logxor: {
                        evaluate: function (e) {
                          var t = e[0],
                            n = e[1]
                          return E(t), E(n), t ^ n
                        },
                        validate: function (e) {
                          return A(2, e)
                        },
                      },
                    },
                  ),
                  V,
                ),
                $,
              ),
              K,
            ),
            H,
          ),
          X,
        ),
        Z,
      ),
      Q,
    ),
    ne = {
      parse: function (e, t, n) {
        var r = (0, n.parseToken)(e, t),
          a = r[0],
          u = r[1]
        if ('Name' !== u.type) throw new c('Name', u)
        var i = d(e[(t = a)])
        if ('paren' !== i.type || ')' !== i.value)
          throw SyntaxError('Invalid token "' + i.type + '" value=' + i.value + ", expected ')'")
        return [t + 1, { type: 'SpecialExpression', name: 'function', params: [u] }]
      },
      evaluate: function (e, t) {
        for (var n, r, a = s(e.params[0]), u = void 0, i = 0, o = t; i < o.length; i++) {
          var l = null === (r = o[i][a.value]) || void 0 === r ? void 0 : r.value
          if (j(l)) {
            u = l
            break
          }
        }
        if (u) return u
        if (!te[a.value]) throw Error('Could not find built in function (normal expresssion) ' + a.value)
        return ((n = {})[v] = !0), (n.builtin = a.value), n
      },
      validate: function (e) {
        return A(1, e)
      },
    },
    re = {
      parse: function (e, t, n) {
        var r = (0, n.parseParams)(e, t)
        return [r[0] + 1, { type: 'SpecialExpression', name: 'if', params: r[1] }]
      },
      evaluate: function (e, t, n) {
        var r = e.params,
          a = r[0],
          u = r[1],
          i = r[2],
          o = n(f(a), t) ? f(u) : f(i)
        return n(o, t)
      },
      validate: function (e) {
        return A(3, e)
      },
    },
    ae = {
      parse: function (e, t, n) {
        var r = n.parseBinding,
          a = n.parseParams,
          u = { type: 'SpecialExpression', name: 'let', params: [], bindings: [] },
          i = d(e[t])
        if ('paren' !== i.type || '(' !== i.value)
          throw SyntaxError('Invalid token "' + i.type + '" value=' + i.value + ', expected list of bindings')
        for (t += 1; 'paren' !== i.type || ')' !== i.value; ) {
          if ('paren' !== i.type || '(' !== i.value)
            throw SyntaxError('Invalid token "' + i.type + '" value=' + i.value + ', expected an expression')
          var o = r(e, t),
            l = o[0],
            c = o[1]
          ;(t = l), u.bindings.push(c), (i = d(e[t]))
        }
        var v = a(e, (t += 1)),
          f = v[0],
          s = v[1]
        return (u.params = s), [f + 1, u]
      },
      evaluate: function (e, t, n) {
        for (var r = {}, u = 0, i = e.bindings; u < i.length; u++) {
          var o = i[u],
            l = n(o.value, t)
          if (j(l)) throw Error('Cannot bind function in let expression')
          r[o.name] = { value: l, constant: !1 }
        }
        for (var c, v = a([r], t), f = 0, s = e.params; f < s.length; f++) {
          c = n(s[f], v)
        }
        return c
      },
    },
    ue = {
      parse: function (e, t, n) {
        for (
          var r = n.parseToken, a = { type: 'SpecialExpression', name: 'loop', params: [] }, u = d(e[t]);
          'paren' !== u.type || ')' !== u.value;

        ) {
          var i = r(e, t),
            o = i[0],
            l = i[1]
          a.params.push(l), (u = d(e[(t = o)]))
        }
        return [t + 1, a]
      },
      evaluate: function (e, t, n) {
        try {
          for (;;)
            for (var r = 0, a = e.params; r < a.length; r++) {
              n(a[r], t)
            }
        } catch (e) {
          if (e instanceof i) return e.value
          throw e
        }
      },
      validate: function (e) {
        return A({ min: 1 }, e)
      },
    },
    ie = {
      parse: function (e, t, n) {
        for (
          var r = n.parseToken, a = { type: 'SpecialExpression', name: 'progn', params: [] }, u = d(e[t]);
          'paren' !== u.type || ')' !== u.value;

        ) {
          var i = r(e, t),
            o = i[0],
            l = i[1]
          a.params.push(l), (u = d(e[(t = o)]))
        }
        return [t + 1, a]
      },
      evaluate: function (e, t, n) {
        for (var r, u = a([{}], t), i = 0, o = e.params; i < o.length; i++) {
          r = n(o[i], u)
        }
        return r
      },
    },
    oe = {
      parse: function (e, t, n) {
        var r = n.parseToken,
          a = d(e[t])
        if ('name' !== a.type) throw new l('name', a)
        var u = { type: 'SpecialExpression', name: 'return-from', blockName: a.value, params: [] },
          i = r(e, (t += 1)),
          o = i[0],
          c = i[1]
        return u.params.push(c), [o + 1, u]
      },
      evaluate: function (e, t, n) {
        var r = n(f(e.params[0]), t)
        throw new u(e.blockName, r)
      },
      validate: function (e) {
        return A(1, e)
      },
    },
    le = {
      parse: function (e, t, n) {
        var r = { type: 'SpecialExpression', name: 'return', params: [] },
          a = (0, n.parseToken)(e, t),
          u = a[0],
          i = a[1]
        return r.params.push(i), [u + 1, r]
      },
      evaluate: function (e, t, n) {
        var r = n(f(e.params[0]), t)
        throw new i(r)
      },
      validate: function (e) {
        return A(1, e)
      },
    }
  function ce(e) {
    return function (t, n, r) {
      var a = (0, r.parseParams)(t, n),
        u = a[0],
        i = a[1]
      return p(i[0]), [u + 1, { type: 'SpecialExpression', name: e, params: i }]
    }
  }
  function ve(e) {
    return function (t, n, r) {
      var a = (0, r.parseParams)(t, n),
        u = a[0],
        i = a[1]
      return [u + 1, { type: 'SpecialExpression', name: e, params: i }]
    }
  }
  function fe(e) {
    var t = 'setq-constant' === e || 'setq-local-constant' === e,
      n = 'setq-local' === e || 'setq-local-constant' === e ? 'local' : 'default'
    return function (e, r, a) {
      var u,
        i = s(e.params[0]).value,
        o = a(f(e.params[1]), r),
        l = pe(i, r, n),
        c = l[0],
        v = l[1]
      if (null === (u = c[i]) || void 0 === u ? void 0 : u.constant)
        throw Error('Cannot change constant variable "' + i + '"')
      if (t && v) throw Error('Cannot change a non constant variable to constant: "' + i + '"')
      return (c[i] = { value: o, constant: t }), o
    }
  }
  function se(e) {
    var t = 'create-constant-variable' === e
    return function (e, n, r) {
      var a,
        u = r(f(e.params[0]), n)
      w(u)
      var i = r(f(e.params[1]), n),
        o = pe(u, n, 'global'),
        l = o[0],
        c = o[1]
      if (null === (a = l[u]) || void 0 === a ? void 0 : a.constant)
        throw Error('Cannot change constant variable "' + u + '"')
      if (t && c) throw Error('Cannot change a non constant variable to constant: "' + u + '"')
      return (l[u] = { value: i, constant: t }), i
    }
  }
  function pe(e, t, n) {
    var r = !1,
      a = void 0
    if ('local' === n) r = !!(a = d(t[0]))[e]
    else if ('global' === n) r = !!(a = d(t[t.length - 2]))[e]
    else {
      for (var u = 0; u < t.length - 1; u += 1)
        if (d(t[u])[e]) {
          ;(r = !0), (a = t[u])
          break
        }
      a || (a = d(t[t.length - 2], 'This cannot be'))
    }
    return [a, r]
  }
  var de = {
      parse: ce('setq'),
      evaluate: fe('setq'),
      validate: function (e) {
        return A(2, e)
      },
    },
    me = {
      parse: ce('setq-constant'),
      evaluate: fe('setq-constant'),
      validate: function (e) {
        return A(2, e)
      },
    },
    he = {
      parse: ce('setq-local'),
      evaluate: fe('setq-local'),
      validate: function (e) {
        return A(2, e)
      },
    },
    ge = {
      parse: function (e, t, n) {
        var r = (0, n.parseToken)(e, t),
          a = r[0],
          u = r[1],
          i = d(e[(t = a)])
        if ('paren' !== i.type || ')' !== i.value) throw new l(')', i)
        return [(t += 1), { type: 'SpecialExpression', name: 'throw', params: [], messageNode: u }]
      },
      evaluate: function (e, t, n) {
        var r = (function (e) {
          if ('string' != typeof e || 0 === e.length)
            throw TypeError('Expected non empty string, got: ' + e + ' type="' + typeof e + '"')
          return e
        })(n(e.messageNode, t))
        throw new o(r)
      },
    },
    ye = {
      parse: function (e, t, n) {
        var r,
          a,
          u,
          i,
          o = n.parseToken
        ;(t = (r = o(e, t))[0]), (i = r[1])
        var v,
          f,
          s = d(e[t])
        if ('paren' !== s.type || '(' !== s.value) throw new l('(', s)
        if ('paren' !== (s = d(e[(t += 1)])).type || '(' !== s.value) throw new l('(', s)
        if (((t = (a = o(e, (t += 1)))[0]), 'Name' !== (v = a[1]).type)) throw new c('Name', v)
        if ('paren' !== (s = d(e[t])).type || ')' !== s.value) throw new l(')', s)
        if (((t = (u = o(e, (t += 1)))[0]), (f = u[1]), 'paren' !== (s = d(e[t])).type || ')' !== s.value))
          throw new l(')', s)
        if ('paren' !== (s = d(e[(t += 1)])).type || ')' !== s.value) throw new l(')', s)
        return [
          (t += 1),
          { type: 'SpecialExpression', name: 'try', params: [], tryExpression: i, catchExpression: f, error: v },
        ]
      },
      evaluate: function (e, t, n) {
        var r
        try {
          return n(e.tryExpression, t)
        } catch (l) {
          if (l instanceof u || l instanceof i) throw l
          var o = (((r = {})[e.error.value] = { value: l, constant: !1 }), r)
          return n(e.catchExpression, a([o], t))
        }
      },
    },
    be = {
      parse: function (e, t, n) {
        var r = (0, n.parseParams)(e, t)
        return [r[0] + 1, { type: 'SpecialExpression', name: 'unless', params: r[1] }]
      },
      evaluate: function (e, t, n) {
        var r = e.params,
          a = r[0],
          u = r.slice(1)
        if ((m(a), !n(a, t))) {
          for (var i = void 0, o = 0, l = u; o < l.length; o++) {
            i = n(l[o], t)
          }
          return i
        }
      },
      validate: function (e) {
        return A({ min: 1 }, e)
      },
    },
    Ee = {
      parse: function (e, t, n) {
        var r = (0, n.parseParams)(e, t)
        return [r[0] + 1, { type: 'SpecialExpression', name: 'when', params: r[1] }]
      },
      evaluate: function (e, t, n) {
        var r = e.params,
          a = r[0],
          u = r.slice(1)
        if ((m(a), n(a, t))) {
          for (var i = void 0, o = 0, l = u; o < l.length; o++) {
            i = n(l[o], t)
          }
          return i
        }
      },
      validate: function (e) {
        return A({ min: 1 }, e)
      },
    },
    we = {
      parse: function (e, t, n) {
        var r,
          a = n.parseToken
        t = (r = a(e, t))[0]
        for (
          var u = { type: 'SpecialExpression', name: 'while', params: [], whileExpression: r[1] }, i = d(e[t]);
          'paren' !== i.type || ')' !== i.value;

        ) {
          var o = a(e, t),
            l = o[0],
            c = o[1]
          u.params.push(c), (i = d(e[(t = l)]))
        }
        return [t + 1, u]
      },
      evaluate: function (e, t, n) {
        for (; n(e.whileExpression, t); )
          for (var r = 0, a = e.params; r < a.length; r++) {
            n(a[r], t)
          }
      },
    },
    xe = {
      'return-from': oe,
      'setq-constant': me,
      'setq-local-constant': {
        parse: ce('setq-local-constant'),
        evaluate: fe('setq-local-constant'),
        validate: function (e) {
          return A(2, e)
        },
      },
      'setq-local': he,
      and: {
        parse: function (e, t, n) {
          var r = (0, n.parseParams)(e, t)
          return [r[0] + 1, { type: 'SpecialExpression', name: 'and', params: r[1] }]
        },
        evaluate: function (e, t, n) {
          for (var r = !0, a = 0, u = e.params; a < u.length; a++) {
            if (!(r = n(u[a], t))) break
          }
          return r
        },
      },
      block: T,
      cond: P,
      defun: L,
      'create-function': C,
      dolist: U,
      dotimes: _,
      function: ne,
      if: re,
      lambda: R,
      let: ae,
      loop: ue,
      or: {
        parse: function (e, t, n) {
          var r = (0, n.parseParams)(e, t)
          return [r[0] + 1, { type: 'SpecialExpression', name: 'or', params: r[1] }]
        },
        evaluate: function (e, t, n) {
          for (var r = !1, a = 0, u = e.params; a < u.length; a++) {
            if ((r = n(u[a], t))) break
          }
          return r
        },
      },
      progn: ie,
      return: le,
      setq: de,
      throw: ge,
      try: ye,
      unless: be,
      when: Ee,
      while: we,
      'create-variable': {
        parse: ve('create-variable'),
        evaluate: se('create-variable'),
        validate: function (e) {
          return A(2, e)
        },
      },
      'create-constant-variable': {
        parse: ve('create-constant-variable'),
        evaluate: se('create-constant-variable'),
        validate: function (e) {
          return A(2, e)
        },
      },
    }
  Object.keys(xe).forEach(function (e) {
    if (te[e]) throw Error('Expression ' + e + ' is defined as both a normal expression and a special expression')
  })
  var ke = { normalExpressions: te, specialExpressions: xe },
    Ne = Object.keys(te),
    Se = Object.keys(xe),
    Ae = { true: { value: !0 }, false: { value: !1 }, null: { value: null }, undefined: { value: void 0 } },
    je = Object.keys(Ae)
  function Me(e, t, n) {
    for (var r, a = [t, n], u = 0, i = e.body; u < i.length; u++) {
      var o = i[u]
      r = Oe(o, a)
    }
    return r
  }
  var Oe = function (e, t) {
    switch (e.type) {
      case 'Number':
      case 'String':
        return (function (e) {
          return e.value
        })(e)
      case 'Name':
        return (function (e, t) {
          for (var n, r = e.value, a = 0, u = t; a < u.length; a++) {
            var i = u[a][r]
            if (i) return i.value
          }
          if (ke.normalExpressions[r]) return ((n = {})[v] = !0), (n.builtin = r), n
          throw Error('Undefined identifier ' + r)
        })(e, t)
      case 'ReservedName':
        return (function (e) {
          return d(Ae[e.value], e.value + ' is not a reserved name').value
        })(e)
      case 'NormalExpression':
        return (function (e, t) {
          for (
            var n,
              r = e.params.map(function (e) {
                return Oe(e, t)
              }),
              a = void 0,
              u = 0,
              i = t;
            u < i.length;
            u++
          ) {
            var o = null === (n = i[u][e.name]) || void 0 === n ? void 0 : n.value
            if (j(o)) {
              a = o
              break
            }
          }
          return a
            ? Te(a, r, t)
            : (function (e, t, n) {
                return (0, d(ke.normalExpressions[e.name], e.name + ' is not a function').evaluate)(t, n, {
                  evaluateLispishFunction: Te,
                })
              })(e, r, t)
        })(e, t)
      case 'SpecialExpression':
        return (function (e, t) {
          return (0, d(ke.specialExpressions[e.name], e.name + ' is not a built in special expression').evaluate)(
            e,
            t,
            Oe,
          )
        })(e, t)
      case 'ExpressionExpression':
        return (function (e, t) {
          var n = (function (e) {
              if (j(e)) return e
              throw Error('Expected a Lispish function, got ' + e)
            })(Oe(e.expression, t)),
            r = e.params.map(function (e) {
              return Oe(e, t)
            })
          return Te(n, r, t)
        })(e, t)
    }
  }
  var Te = function (e, t, n) {
    if (!O(e)) return d(te[e.builtin], e.builtin + ' is not a function').evaluate(t, n, { evaluateLispishFunction: Te })
    var r = e.functionContext,
      o = e.arguments,
      l = o.mandatoryArguments.length,
      c = o.optionalArguments.length,
      v = o.restArgument ? null : l + c
    if (t.length < o.mandatoryArguments.length)
      throw Error(
        'Function "' + e.name + '" requires at least ' + o.mandatoryArguments.length + ' arguments. Got ' + t.length,
      )
    if (null !== v && t.length > v)
      throw Error('Function "' + e.name + '" requires at most ' + v + ' arguments. Got ' + t.length)
    for (
      var f = Math.max(t.length, o.mandatoryArguments.length + o.optionalArguments.length), s = [], p = 0;
      p < f;
      p += 1
    )
      if (p < l) {
        var m = t[p]
        r[d(o.mandatoryArguments[p], '')] = { value: m, constant: !1 }
      } else if (p < l + c) {
        var h = d(o.optionalArguments[p - l], '')
        m = p < t.length ? t[p] : void 0 !== h.defaultValue ? h.defaultValue : void 0
        r[h.name] = { value: m, constant: !1 }
      } else {
        if (j((m = t[p]))) throw Error('A function cannot be a &rest parameter')
        s.push(t[p])
      }
    o.restArgument && (r[o.restArgument] = { value: s, constant: !1 })
    try {
      for (var g = void 0, y = 0, b = e.body; y < b.length; y++) {
        var E = b[y]
        g = Oe(E, a([r], n))
      }
      return g
    } catch (t) {
      if (t instanceof i) return t.value
      if (t instanceof u && e.name === t.blockName) return t.value
      throw t
    }
  }
  var Pe = function (e, t) {
      for (var n = d(e[t]), r = []; 'paren' !== n.type || ')' !== n.value; ) {
        var a = Ue(e, t),
          u = a[0],
          i = a[1]
        ;(t = u), r.push(i), (n = d(e[t]))
      }
      return [t, r]
    },
    qe = function (e, t) {
      var n = d(e[(t += 1)])
      if ('name' === n.type) {
        var r = n.value
        return ke.specialExpressions[r] ? Re(e, t) : Ce(e, t)
      }
      if ('paren' === n.type && '(' === n.value) return Le(e, t)
      throw Error('Could not parse expression, expected name or "(", got ' + n.type + ':' + n.value)
    },
    Fe = function (e, t) {
      var n = d(e[t])
      if ('name' === n.type) return [t + 1, { type: 'Argument', name: n.value }]
      if ('paren' === n.type && '(' === n.value) {
        if ('name' !== (n = d(e[(t += 1)])).type) throw new l('name', n)
        var r = n.value,
          a = Ue(e, (t += 1)),
          u = a[0],
          i = a[1]
        if ('paren' !== (n = d(e[u])).type || ')' !== n.value) throw new l(')', n)
        return [u + 1, { type: 'Argument', name: r, defaultValue: i }]
      }
      if ('modifier' === n.type) return [t + 1, { type: 'Modifier', value: n.value }]
      throw new l('"(", name or modifier', n)
    },
    Ie = function (e, t) {
      var n = d(e[(t += 1)])
      if ('name' !== n.type) throw Error('Expected name node in binding, got ' + n.type + ' value=' + n.value)
      var r = n.value
      n = d(e[(t += 1)])
      var a = Ue(e, t),
        u = a[0],
        i = a[1]
      if ('paren' !== (n = d(e[(t = u)])).type || ')' !== n.value) throw new l(')', n)
      return [t + 1, { type: 'Binding', name: r, value: i }]
    },
    Le = function (e, t) {
      var n = qe(e, t),
        r = n[0],
        a = n[1],
        u = Pe(e, r)
      return [u[0] + 1, { type: 'ExpressionExpression', expression: a, params: u[1] }]
    },
    Ce = function (e, t) {
      var n,
        r = d(e[t]).value,
        a = Pe(e, t + 1)
      t = a[0] + 1
      var u = { type: 'NormalExpression', name: r, params: a[1] },
        i = ke.normalExpressions[u.name]
      return i && (null === (n = i.validate) || void 0 === n || n.call(i, u)), [t, u]
    },
    Re = function (e, t) {
      var n = d(e[t]).value
      t += 1
      var r = d(ke.specialExpressions[n], n + ' is not a built in special expression'),
        a = r.parse,
        u = r.validate,
        i = a(e, t, { parseExpression: qe, parseParams: Pe, parseToken: Ue, parseBinding: Ie, parseArgument: Fe }),
        o = i[0],
        l = i[1]
      return null == u || u(l), [o, l]
    },
    Ue = function (e, t) {
      var n = d(e[t]),
        r = void 0
      switch (n.type) {
        case 'number':
          r = (function (e, t) {
            var n = d(e[t])
            return [t + 1, { type: 'Number', value: Number(n.value) }]
          })(e, t)
          break
        case 'string':
          r = (function (e, t) {
            return [t + 1, { type: 'String', value: d(e[t]).value }]
          })(e, t)
          break
        case 'name':
          r = (function (e, t) {
            return [t + 1, { type: 'Name', value: d(e[t]).value }]
          })(e, t)
          break
        case 'reservedName':
          r = (function (e, t) {
            return [t + 1, { type: 'ReservedName', value: d(e[t]).value }]
          })(e, t)
          break
        case 'paren':
          '(' === n.value
            ? (r = qe(e, t))
            : '[' === n.value &&
              (r = (function (e, t) {
                for (var n, r, a = d(e[(t += 1)]), u = []; 'paren' !== a.type || ']' !== a.value; )
                  (t = (n = Ue(e, t))[0]), (r = n[1]), u.push(r), (a = d(e[t]))
                return [(t += 1), { type: 'NormalExpression', name: 'list', params: u }]
              })(e, t))
          break
        case 'shorthand':
          r = (function (e, t) {
            var n = Ue(e, t + 1)
            return [n[0], { type: 'SpecialExpression', name: 'function', params: [n[1]] }]
          })(e, t)
      }
      if (!r) throw SyntaxError('Unrecognized token: ' + n.type + ' value=' + n.value)
      return r
    }
  var _e = /[0-9a-zA-Z_^?=!$%<>.+*/-]/,
    Ve = /\s|[)\]}]/,
    $e = /[0-9]/,
    ze = /[0-7]/,
    Be = /[0-9a-fA-F]/,
    De = /[0-1]/,
    Ge = /[0-9.-]/
  function We(e, t, n, r) {
    return t === n[r] ? [1, { type: e, value: t }] : [0, void 0]
  }
  var Je = [
    function (e, t) {
      if (';' === e[t]) {
        for (var n = 1; '\n' !== e[t + n] && t + n < e.length; ) n += 1
        return '\n' === e[t + n] && t + n < e.length && (n += 1), [n, void 0]
      }
      return [0, void 0]
    },
    function (e, t) {
      var n
      return /\s/.test(null !== (n = e[t]) && void 0 !== n ? n : '') ? [1, void 0] : [0, void 0]
    },
    function (e, t) {
      return We('paren', '(', e, t)
    },
    function (e, t) {
      return We('paren', ')', e, t)
    },
    function (e, t) {
      return We('paren', '[', e, t)
    },
    function (e, t) {
      return We('paren', ']', e, t)
    },
    function (e, t) {
      return We('paren', '{', e, t)
    },
    function (e, t) {
      return We('paren', '}', e, t)
    },
    function (e, t) {
      if ('"' !== e[t]) return [0, void 0]
      for (var n = '', r = 1, a = e[t + r], u = !1; '"' !== a || u; ) {
        if (void 0 === a) throw new SyntaxError('Unclosed string at position ' + t)
        u ? ((u = !1), '"' === a || '\\' === a || (n += '\\'), (n += a)) : '\\' === a ? (u = !0) : (n += a),
          (a = e[t + (r += 1)])
      }
      return [r + 1, { type: 'string', value: n }]
    },
    function (e, t) {
      var n = 'decimal',
        r = e[t]
      if (void 0 === r) return [0, void 0]
      var a,
        u = '.' === r
      if (!Ge.test(r)) return [0, void 0]
      for (a = t + 1; a < e.length; a += 1) {
        var i = d(e[a])
        if (Ve.test(i)) break
        if (a === t + 1 && '0' === r) {
          if ('b' === i || 'B' === i) {
            n = 'binary'
            continue
          }
          if ('o' === i || 'O' === i) {
            n = 'octal'
            continue
          }
          if ('x' === i || 'X' === i) {
            n = 'hex'
            continue
          }
        }
        if ('decimal' === n && u) {
          if (!$e.test(i)) return [0, void 0]
        } else if ('binary' === n) {
          if (!De.test(i)) return [0, void 0]
        } else if ('octal' === n) {
          if (!ze.test(i)) return [0, void 0]
        } else if ('hex' === n) {
          if (!Be.test(i)) return [0, void 0]
        } else {
          if ('.' === i) {
            u = !0
            continue
          }
          if (!$e.test(i)) return [0, void 0]
        }
      }
      var o = a - t,
        l = e.substring(t, a)
      return ('decimal' !== n && o <= 2) || '.' === l || '-' === l ? [0, void 0] : [o, { type: 'number', value: l }]
    },
    function (e, t) {
      for (var n = 0, r = Object.keys(Ae); n < r.length; n++) {
        var a = r[n],
          u = a.length,
          i = e[t + u]
        if ((!i || !_e.test(i)) && e.substr(t, u) === a) return [u, { type: 'reservedName', value: a }]
      }
      return [0, void 0]
    },
    function (e, t) {
      return (function (e, t, n, r) {
        var a = n[r],
          u = 0,
          i = ''
        if (!a || !t.test(a)) return [0, void 0]
        for (; a && t.test(a); ) (i += a), (a = n[r + (u += 1)])
        return [u, { type: e, value: i }]
      })('name', _e, e, t)
    },
    function (e, t) {
      return '' === e.substr(t, 2) ? [2, { type: 'shorthand', value: '' }] : [0, void 0]
    },
    function (e, t) {
      return '&rest' === e.substr(t, 5)
        ? [5, { type: 'modifier', value: '&rest' }]
        : '&optional' === e.substr(t, 9)
        ? [9, { type: 'modifier', value: '&optional' }]
        : '&bind' === e.substr(t, 5)
        ? [5, { type: 'modifier', value: '&bind' }]
        : [0, void 0]
    },
  ]
  var Ke = (function () {
    function e() {
      this.importScope = {}
    }
    return (
      (e.prototype.tokenize = function (e) {
        return (function (e) {
          for (var t = [], n = 0, r = !1; n < e.length; ) {
            r = !1
            for (var a = 0, u = Je; a < u.length; a++) {
              var i = (0, u[a])(e, n),
                o = i[0],
                l = i[1]
              if (o > 0 && ((r = !0), (n += o), l)) {
                t.push(l)
                break
              }
            }
            if (!r) throw new SyntaxError('Unrecognized character at position ' + n + ": '" + e[n] + "'")
          }
          return t
        })(e)
      }),
      (e.prototype.parse = function (e) {
        return (function (e) {
          for (var t, n, r = { type: 'Program', body: [] }, a = 0; a < e.length; )
            (a = (t = Ue(e, a))[0]), (n = t[1]), r.body.push(n)
          return r
        })(e)
      }),
      (e.prototype.evaluate = function (e, t) {
        void 0 === t && (t = {})
        var n = t.globalContext || {}
        return (
          t.vars &&
            Object.entries(t.vars).forEach(function (e) {
              var t = e[0],
                r = e[1]
              n[t] = { constant: !0, value: r }
            }),
          Me(e, n, this.importScope)
        )
      }),
      (e.prototype.run = function (e, t) {
        var n = this.tokenize(e),
          r = this.parse(n)
        return this.evaluate(r, t)
      }),
      (e.prototype.import = function (e) {
        var t = this.tokenize(e),
          n = {}
        Me(this.parse(t), n, {})
        for (var r = Object.keys(this.importScope), a = 0, u = Object.keys(n); a < u.length; a++) {
          var i = u[a]
          if (r.includes(i)) throw Error('Import faild, imported function/variable already exists: "' + i + '"')
          if (Ne.includes(i)) throw Error('Import faild, cannot shadow builtin normal expression: "' + i + '"')
          if (Se.includes(i)) throw Error('Import faild, cannot shadow builtin special expression: "' + i + '"')
        }
        Object.assign(this.importScope, n)
      }),
      e
    )
  })()
  return (
    (e.Lispish = Ke),
    (e.isLispishFunction = j),
    (e.normalExpressionKeys = Ne),
    (e.reservedNames = je),
    (e.specialExpressionKeys = Se),
    Object.defineProperty(e, '__esModule', { value: !0 }),
    e
  )
})({})
//# sourceMappingURL=lispish.iife.js.map
