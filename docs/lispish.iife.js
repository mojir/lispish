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
    ***************************************************************************** */ var n = function (e, r) {
    return (
      (n =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (e, n) {
            e.__proto__ = n
          }) ||
        function (e, n) {
          for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }),
      n(e, r)
    )
  }
  function r(e, r) {
    if ('function' != typeof r && null !== r)
      throw new TypeError('Class extends value ' + String(r) + ' is not a constructor or null')
    function t() {
      this.constructor = e
    }
    n(e, r), (e.prototype = null === r ? Object.create(r) : ((t.prototype = r.prototype), new t()))
  }
  var t = function () {
    return (
      (t =
        Object.assign ||
        function (e) {
          for (var n, r = 1, t = arguments.length; r < t; r++)
            for (var a in (n = arguments[r])) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
          return e
        }),
      t.apply(this, arguments)
    )
  }
  function a(e, n) {
    for (var r = 0, t = n.length, a = e.length; r < t; r++, a++) e[a] = n[r]
    return e
  }
  var u = (function (e) {
      function n(r) {
        var t = e.call(this, 'recur, params: ' + r) || this
        return Object.setPrototypeOf(t, n.prototype), (t.name = 'RecurSignal'), (t.params = r), t
      }
      return r(n, e), n
    })(Error),
    i = (function (e) {
      function n(r) {
        var t = e.call(this, r) || this
        return Object.setPrototypeOf(t, n.prototype), (t.name = 'UserDefinedError'), t
      }
      return r(n, e), n
    })(Error),
    o = (function (e) {
      function n(r) {
        var t = e.call(this, r) || this
        return Object.setPrototypeOf(t, n.prototype), (t.name = 'AssertionError'), t
      }
      return r(n, e), n
    })(Error),
    l = (function (e) {
      function n(r, t) {
        var a = e.call(this, 'Expected a "' + r + '" token, got Token[' + t.type + ':"' + t.value + '"]') || this
        return Object.setPrototypeOf(a, n.prototype), (a.name = 'UnexpectedTokenError'), a
      }
      return r(n, e), n
    })(Error),
    f = (function (e) {
      function n(r, t) {
        var a = e.call(this, 'Expected a ' + r + ' node, got ' + (t ? 'a ' + t.type + ' node' : 'undefined')) || this
        return Object.setPrototypeOf(a, n.prototype), (a.name = 'UnexpectedNodeTypeError'), a
      }
      return r(n, e), n
    })(Error),
    c = Symbol('function')
  function v(e) {
    if (void 0 === e) throw Error('Expected an AST node, got undefined')
    return e
  }
  function s(e) {
    if (void 0 === e || 'Name' !== e.type) throw new f('Name', e)
  }
  function p(e, n) {
    if ((void 0 === n && (n = 'Unexpected end of input'), void 0 === e)) throw Error(n)
    return e
  }
  function d(e) {
    if (void 0 === e) throw Error('Expected non undefined value, got ' + e)
    return e
  }
  function m(e) {
    if (void 0 === e) throw Error('Expected non undefined value, got ' + e)
  }
  function h(e) {
    if ('number' != typeof e || !isFinite(e)) throw TypeError('Expected number, got: ' + e + ' type="' + typeof e + '"')
  }
  function g(e) {
    !(function (e) {
      if ((h(e), e < 0)) throw TypeError('Expected non negative number, got ' + e)
    })(e),
      y(e)
  }
  function y(e) {
    if ((h(e), !Number.isInteger(e))) throw TypeError('Expected integer, got ' + e)
  }
  function b(e, n) {
    if ((h(e), e < n)) throw TypeError('Expected parameter (' + e + ') to be a number equal or grater than ' + n)
  }
  function x(e) {
    return 'string' == typeof e
  }
  function E(e) {
    if (!x(e)) throw TypeError('Expected string, got: ' + e + ' type="' + typeof e + '"')
  }
  function w(e) {
    if (!x(e)) throw TypeError('Expected string, got: ' + e + ' type="' + typeof e + '"')
    return e
  }
  function A(e) {
    if ((E(e), 1 !== e.length)) throw TypeError('Expected char, got: ' + e + ' type="' + typeof e + '"')
  }
  function N(e) {
    if ('string' != typeof e && 'number' != typeof e)
      throw TypeError('Expected string or number, got: ' + e + ' type="' + typeof e + '"')
  }
  function M(e) {
    if (!(e instanceof RegExp)) throw TypeError('Expected RegExp, got: ' + e + ' type="' + typeof e + '"')
  }
  function j(e, n) {
    var r = n.params.length
    if ('number' == typeof e) {
      if (r !== e) throw Error('Wrong number of arguments to "' + n.name + '", expected ' + e + ', got ' + r)
    } else {
      var t = e.min,
        a = e.max
      if (void 0 === t && void 0 === a) throw Error('Min or max must be specified')
      if ('number' == typeof t && r < t)
        throw Error('Wrong number of arguments to "' + n.name + '", expected at least ' + t + ', got ' + r)
      if ('number' == typeof a && r > a)
        throw Error('Wrong number of arguments to "' + n.name + '", expected at most ' + a + ', got ' + r)
    }
  }
  function k(e) {
    var n = e.params.length
    if (n % 2 != 0) throw Error('Wrong number of arguments, expected an even number, got ' + n)
  }
  function O(e) {
    return null !== e && 'object' == typeof e && !!e[c]
  }
  function S(e) {
    if (!O(e)) throw Error('Expected lispish function, got ' + JSON.stringify(e))
  }
  function T(e) {
    if (
      !Array.isArray(e) ||
      e.some(function (e) {
        return 'string' != typeof e
      })
    )
      throw Error('Expected an array of strings, got ' + e)
  }
  function I(e) {
    if (
      !Array.isArray(e) ||
      e.some(function (e) {
        return 'string' != typeof e || 1 !== e.length
      })
    )
      throw Error('Expected an array of chars, got ' + e)
  }
  function F(e) {
    if (!L(e)) throw TypeError('Expected a number, got: ' + e + ' type="' + typeof e + '"')
  }
  function P(e) {
    if (!U(e)) throw TypeError('Expected Arr, got: ' + e + ' type="' + typeof e + '"')
  }
  function R(e) {
    if (!D(e)) throw TypeError('Expected collection, got: ' + e + ' type="' + typeof e + '"')
  }
  function _(e) {
    if (
      !(function (e) {
        return void 0 !== e
      })(e)
    )
      throw TypeError('Expected Any, got: ' + e + ' type="' + typeof e + '"')
  }
  function C(e) {
    if (!B(e)) throw TypeError('Expected string or array, got: ' + e + ' type="' + typeof e + '"')
  }
  function V(e) {
    if (!q(e)) throw TypeError('Expected object, got: ' + e + ' type="' + typeof e + '"')
  }
  function q(e) {
    return !(null === e || 'object' != typeof e || Array.isArray(e) || e instanceof RegExp || O(e))
  }
  function U(e) {
    return Array.isArray(e)
  }
  function B(e) {
    return Array.isArray(e) || x(e)
  }
  function D(e) {
    return B(e) || q(e)
  }
  function L(e) {
    return 'number' == typeof e
  }
  function $(e) {
    return Number.isInteger(e)
  }
  function z(e, n) {
    return !!D(e) && (x(e) || U(e) ? !!$(n) && n >= 0 && n < e.length : !!Object.getOwnPropertyDescriptor(e, n))
  }
  var G = { boolean: 0, number: 1, string: 2, array: 3, object: 4, regexp: 5, unknown: 6, null: 7 }
  function Y(e) {
    return null === e
      ? 'null'
      : 'boolean' == typeof e
      ? 'boolean'
      : 'number' == typeof e
      ? 'number'
      : 'string' == typeof e
      ? 'string'
      : U(e)
      ? 'array'
      : q(e)
      ? 'object'
      : (function (e) {
          return e instanceof RegExp
        })(e)
      ? 'regexp'
      : 'unknown'
  }
  function J(e, n) {
    var r = Y(e),
      t = Y(n)
    if (r !== t) return Math.sign(G[r] - G[t])
    switch (r) {
      case 'null':
      case 'unknown':
        return 0
      case 'boolean':
        return e === n ? 0 : !1 === e ? -1 : 1
      case 'number':
        return Math.sign(e - n)
      case 'string':
        return (c = e) < (v = n) ? -1 : c > v ? 1 : 0
      case 'array':
        var a = e,
          u = n
        if (a.length < u.length) return -1
        if (a.length > u.length) return 1
        for (var i = 0; i < a.length; i += 1) {
          var o = J(a[i], u[i])
          if (0 !== o) return o
        }
        return 0
      case 'object':
        var l = e,
          f = n
        return Math.sign(Object.keys(l).length - Object.keys(f).length)
      case 'regexp':
        var c, v
        return (c = e.source) < (v = n.source) ? -1 : c > v ? 1 : 0
    }
  }
  function W(e, n) {
    if (e === n) return !0
    if ('number' == typeof e && 'number' == typeof n) return Math.abs(e - n) < Number.EPSILON
    if (U(e) && U(n)) {
      if (e.length !== n.length) return !1
      for (var r = 0; r < e.length; r += 1) if (!W(p(e[r]), p(n[r]))) return !1
      return !0
    }
    if (e instanceof RegExp && n instanceof RegExp) return e.toString() === n.toString()
    if ('object' == typeof e && null !== e && 'object' == typeof n && null !== n) {
      var t = e,
        a = n,
        u = Object.keys(t),
        i = Object.keys(a)
      if (u.length !== i.length) return !1
      for (r = 0; r < u.length; r += 1) {
        var o = w(u[r])
        if (!W(X(t[o]), X(a[o]))) return !1
      }
      return !0
    }
    return !1
  }
  function X(e) {
    return null != e ? e : null
  }
  var H = {
      parse: function (e, n, r) {
        var t
        return (
          (t = (function (e, n, r) {
            for (var t, a, u = [], i = d(e[n]); 'paren' !== i.type || ')' !== i.value; ) {
              var o, l
              ;(n = (t = r(e, n))[0]),
                (o = t[1]),
                (n = (a = r(e, n))[0]),
                (l = a[1]),
                u.push({ test: o, form: l }),
                (i = d(e[n]))
            }
            return [n, u]
          })(e, n, r.parseToken)),
          [(n = t[0]) + 1, { type: 'SpecialExpression', name: 'cond', conditions: t[1], params: [] }]
        )
      },
      evaluate: function (e, n, r) {
        for (var t = r.evaluateAstNode, a = 0, u = e.conditions; a < u.length; a++) {
          var i = u[a]
          if (t(i.test, n)) return t(i.form, n)
        }
        return null
      },
    },
    K = { true: { value: !0 }, false: { value: !1 }, nil: { value: null } },
    Z = Object.keys(K)
  function Q(e, n, r) {
    if ('string' == typeof e) {
      if (r.specialExpressions[e]) throw Error('Cannot define variable ' + e + ", it's a special expression")
      if (r.normalExpressions[e]) throw Error('Cannot define variable ' + e + ", it's a builtin function")
      if (K[e]) throw Error('Cannot define variable ' + e + ", it's a reserved name")
      if (d(n[n.length - 2])[e]) throw Error('Name already defined "' + e + '"')
    }
  }
  function ee(e) {
    return function (n, r, t) {
      var a,
        u = t.parseToken,
        i = t.parseArgument,
        o = t.parseBindings,
        c = void 0
      if (('defn' === e || 'defns' === e) && ((r = (a = u(n, r))[0]), (c = a[1]), 'defn' === e && 'Name' !== c.type))
        throw new f('Name', c)
      for (
        var v = (function (e, n, r, t) {
            var a,
              u = [],
              i = void 0,
              o = [],
              f = [],
              c = {},
              v = 'mandatory',
              s = d(e[n])
            if ('paren' !== s.type || '[' !== s.value) throw new l('[', s)
            for (s = d(e[(n += 1)]); 'paren' !== s.type || ']' !== s.value; ) {
              if ('bind' === v) {
                ;(n = (a = t(e, n))[0]), (u = a[1])
                break
              }
              var p = r(e, n),
                m = p[0],
                h = p[1]
              if (((s = d(e[(n = m)])), 'Modifier' === h.type))
                switch (h.value) {
                  case '&opt':
                    if ('rest' === v) throw Error('&opt cannot appear after &rest')
                    if ('optional' === v) throw Error('&opt can only appear once')
                    v = 'optional'
                    break
                  case '&rest':
                    if ('rest' === v) throw Error('&rest can only appear once')
                    if ('optional' === v && 0 === f.length) throw Error('No optional arguments where spcified')
                    v = 'rest'
                    break
                  case '&bind':
                    if ('optional' === v && 0 === f.length) throw Error('No optional arguments where spcified')
                    if ('rest' === v && !i) throw Error('No rest argument was spcified')
                    v = 'bind'
                }
              else {
                if (c[h.name]) throw Error('Duplicate argument "' + h.name + '"')
                if (((c[h.name] = !0), Object.getOwnPropertyDescriptor(h, 'defaultValue'))) {
                  if ('optional' !== v) throw Error('Cannot specify default value if not an optional argument')
                  f.push({ name: h.name, defaultValue: h.defaultValue })
                } else
                  switch (v) {
                    case 'mandatory':
                      o.push(h.name)
                      break
                    case 'optional':
                      f.push({ name: h.name, defaultValue: void 0 })
                      break
                    case 'rest':
                      if (void 0 !== i) throw Error('Can only specify one rest argument')
                      i = h.name
                  }
              }
            }
            if ('rest' === v && void 0 === i) throw Error('Missing rest argument name')
            if ('optional' === v && 0 === f.length) throw Error('No optional arguments where spcified')
            return [(n += 1), { mandatoryArguments: o, optionalArguments: f, restArgument: i, bindings: u }]
          })(n, r, i, o),
          s = v[0],
          p = v[1],
          m = d(n[(r = s)]),
          h = [];
        'paren' !== m.type || ')' !== m.value;

      ) {
        var g = u(n, r),
          y = g[0],
          b = g[1]
        h.push(b), (m = d(n[(r = y)]))
      }
      if (0 === h.length) throw Error('Missing body in special expression "defn"')
      return (
        (r += 1),
        'defn' === e || 'defns' === e
          ? [r, { type: 'SpecialExpression', name: e, functionName: c, params: [], arguments: p, body: h }]
          : [r, { type: 'SpecialExpression', name: e, params: [], arguments: p, body: h }]
      )
    }
  }
  function ne(e) {
    return function (n, r, t) {
      var a,
        u = t.evaluateAstNode,
        i = t.builtin,
        o = (function (e, n, r, t) {
          if ('defn' === e) {
            var a = n.functionName.value
            return E(a), a
          }
          if ('defns' === e) {
            var u = t(n.functionName, r)
            return E(u), u
          }
        })(e, n, r, u)
      Q(o, r, i)
      for (var l = {}, f = 0, v = n.arguments.bindings; f < v.length; f++) {
        var s = v[f],
          p = s.value,
          m = u(p, r)
        l[s.name] = { value: m }
      }
      var h = n.arguments.optionalArguments.map(function (e) {
          var n = e.name,
            t = e.defaultValue
          return t ? { name: n, defaultValue: u(t, r) } : { name: n }
        }),
        g =
          (((a = {})[c] = !0),
          (a.type = 'user-defined'),
          (a.name = o),
          (a.arguments = {
            mandatoryArguments: n.arguments.mandatoryArguments,
            restArgument: n.arguments.restArgument,
            optionalArguments: h,
          }),
          (a.body = n.body),
          (a.functionContext = l),
          a)
      return 'fn' === e ? g : ((d(r[r.length - 2])[o] = { value: g }), null)
    }
  }
  var re = { parse: ee('defn'), evaluate: ne('defn') },
    te = { parse: ee('defns'), evaluate: ne('defns') },
    ae = { parse: ee('fn'), evaluate: ne('fn') },
    ue = {
      parse: function (e, n, r) {
        var t = (0, r.parseTokens)(e, n)
        return [t[0] + 1, { type: 'SpecialExpression', name: 'if', params: t[1] }]
      },
      evaluate: function (e, n, r) {
        var t = r.evaluateAstNode,
          a = e.params,
          u = a[0],
          i = a[1],
          o = a[2]
        return t(v(u), n) ? t(v(i), n) : 3 === e.params.length ? t(v(o), n) : null
      },
      validate: function (e) {
        return j({ min: 2, max: 3 }, e)
      },
    },
    ie = {
      parse: function (e, n, r) {
        var t = (0, r.parseTokens)(e, n)
        return [t[0] + 1, { type: 'SpecialExpression', name: 'if-not', params: t[1] }]
      },
      evaluate: function (e, n, r) {
        var t = r.evaluateAstNode,
          a = e.params,
          u = a[0],
          i = a[1],
          o = a[2]
        return t(v(u), n) ? (3 === e.params.length ? t(v(o), n) : null) : t(v(i), n)
      },
      validate: function (e) {
        return j({ min: 2, max: 3 }, e)
      },
    },
    oe = {
      parse: function (e, n, r) {
        var t,
          a,
          u,
          i,
          o = r.parseBindings,
          l = r.parseTokens
        if (((n = (t = o(e, n))[0]), 1 !== (u = t[1]).length))
          throw Error('Expected exactly one binding, got ' + u.length)
        return (
          (n = (a = l(e, n))[0]),
          (i = a[1]),
          [n + 1, { type: 'SpecialExpression', name: 'if-let', binding: d(u[0]), params: i }]
        )
      },
      evaluate: function (e, n, r) {
        var t = r.evaluateAstNode,
          u = {},
          i = t(e.binding.value, n)
        if (i) {
          u[e.binding.name] = { value: i }
          var o = a([u], n)
          return t(d(e.params[0]), o)
        }
        return 2 === e.params.length ? t(d(e.params[1]), n) : null
      },
      validate: function (e) {
        return j({ min: 1, max: 2 }, e)
      },
    },
    le = {
      parse: function (e, n, r) {
        var t,
          a,
          u,
          i,
          o = r.parseBindings,
          l = r.parseTokens
        if (((n = (t = o(e, n))[0]), 1 !== (u = t[1]).length))
          throw Error('Expected exactly one binding, got ' + u.length)
        return (
          (n = (a = l(e, n))[0]),
          (i = a[1]),
          [n + 1, { type: 'SpecialExpression', name: 'when-let', binding: d(u[0]), params: i }]
        )
      },
      evaluate: function (e, n, r) {
        var t = r.evaluateAstNode,
          u = {},
          i = t(e.binding.value, n)
        if (!i) return null
        u[e.binding.name] = { value: i }
        for (var o = a([u], n), l = null, f = 0, c = e.params; f < c.length; f++) {
          l = t(c[f], o)
        }
        return l
      },
      validate: function (e) {
        return j({ min: 0 }, e)
      },
    },
    fe = {
      parse: function (e, n, r) {
        var t = (0, r.parseTokens)(e, n)
        return [t[0] + 1, { type: 'SpecialExpression', name: 'when-not', params: t[1] }]
      },
      evaluate: function (e, n, r) {
        var t = r.evaluateAstNode,
          a = e.params,
          u = a[0],
          i = a.slice(1)
        if ((m(u), t(u, n))) return null
        for (var o = null, l = 0, f = i; l < f.length; l++) {
          o = t(f[l], n)
        }
        return o
      },
      validate: function (e) {
        return j({ min: 1 }, e)
      },
    },
    ce = {
      parse: function (e, n, r) {
        var t,
          a,
          u,
          i,
          o = r.parseBindings,
          l = r.parseTokens
        if (((n = (t = o(e, n))[0]), 1 !== (u = t[1]).length))
          throw Error('Expected exactly one binding, got ' + u.length)
        return (
          (n = (a = l(e, n))[0]),
          (i = a[1]),
          [n + 1, { type: 'SpecialExpression', name: 'when-first', binding: d(u[0]), params: i }]
        )
      },
      evaluate: function (e, n, r) {
        var t = r.evaluateAstNode,
          u = {},
          i = t(e.binding.value, n)
        if (!B(i)) throw Error('Expected undefined or a sequence, got ' + i)
        if (0 === i.length) return null
        var o = X(i[0])
        u[e.binding.name] = { value: o }
        for (var l = a([u], n), f = null, c = 0, v = e.params; c < v.length; c++) {
          f = t(v[c], l)
        }
        return f
      },
      validate: function (e) {
        return j({ min: 0 }, e)
      },
    },
    ve = {
      parse: function (e, n, r) {
        var t,
          a,
          u,
          i = r.parseBindings,
          o = r.parseTokens
        return (
          (n = (t = i(e, n))[0]),
          (u = t[1]),
          [(n = (a = o(e, n))[0]) + 1, { type: 'SpecialExpression', name: 'let', params: a[1], bindings: u }]
        )
      },
      evaluate: function (e, n, r) {
        for (var t = r.evaluateAstNode, u = {}, i = 0, o = e.bindings; i < o.length; i++) {
          var l = o[i],
            f = t(l.value, n)
          u[l.name] = { value: f }
        }
        for (var c = a([u], n), v = null, s = 0, p = e.params; s < p.length; s++) {
          v = t(p[s], c)
        }
        return v
      },
    },
    se = {
      parse: function (e, n, r) {
        for (
          var t = r.parseToken, a = { type: 'SpecialExpression', name: 'do', params: [] }, u = d(e[n]);
          'paren' !== u.type || ')' !== u.value;

        ) {
          var i = t(e, n),
            o = i[0],
            l = i[1]
          a.params.push(l), (u = d(e[(n = o)]))
        }
        return [n + 1, a]
      },
      evaluate: function (e, n, r) {
        for (var t = r.evaluateAstNode, u = a([{}], n), i = null, o = 0, l = e.params; o < l.length; o++) {
          i = t(l[o], u)
        }
        return i
      },
    },
    pe = {
      parse: function (e, n, r) {
        var t = (0, r.parseTokens)(e, n),
          a = t[0],
          u = t[1]
        return s(u[0]), [a + 1, { type: 'SpecialExpression', name: 'def', params: u }]
      },
      evaluate: function (e, n, r) {
        var t = r.evaluateAstNode,
          a = r.builtin,
          u = (function (e) {
            if (void 0 === e || 'Name' !== e.type) throw new f('Name', e)
            return e
          })(e.params[0]).value
        Q(u, n, a)
        var i = t(v(e.params[1]), n)
        return (d(n[n.length - 2])[u] = { value: i }), i
      },
      validate: function (e) {
        return j(2, e)
      },
    },
    de = {
      parse: function (e, n, r) {
        var t = (0, r.parseTokens)(e, n)
        return [t[0] + 1, { type: 'SpecialExpression', name: 'defs', params: t[1] }]
      },
      evaluate: function (e, n, r) {
        var t = r.evaluateAstNode,
          a = r.builtin,
          u = t(v(e.params[0]), n)
        E(u), Q(u, n, a)
        var i = t(v(e.params[1]), n)
        return (d(n[n.length - 2])[u] = { value: i }), i
      },
      validate: function (e) {
        return j(2, e)
      },
    },
    me = {
      parse: function (e, n, r) {
        var t = (0, r.parseToken)(e, n),
          a = t[0],
          u = t[1],
          i = d(e[(n = a)])
        if ('paren' !== i.type || ')' !== i.value) throw new l(')', i)
        return [(n += 1), { type: 'SpecialExpression', name: 'throw', params: [], messageNode: u }]
      },
      evaluate: function (e, n, r) {
        var t = (function (e) {
          if ('string' != typeof e || 0 === e.length)
            throw TypeError('Expected non empty string, got: ' + e + ' type="' + typeof e + '"')
          return e
        })((0, r.evaluateAstNode)(e.messageNode, n))
        throw new i(t)
      },
    },
    he = {
      parse: function (e, n, r) {
        var t,
          a,
          u,
          i,
          o = r.parseToken
        ;(n = (t = o(e, n))[0]), (i = t[1])
        var c,
          v,
          s = d(e[n])
        if ('paren' !== s.type || '(' !== s.value) throw new l('(', s)
        if ('paren' !== (s = d(e[(n += 1)])).type || '(' !== s.value) throw new l('(', s)
        if (((n = (a = o(e, (n += 1)))[0]), 'Name' !== (c = a[1]).type)) throw new f('Name', c)
        if ('paren' !== (s = d(e[n])).type || ')' !== s.value) throw new l(')', s)
        if (((n = (u = o(e, (n += 1)))[0]), (v = u[1]), 'paren' !== (s = d(e[n])).type || ')' !== s.value))
          throw new l(')', s)
        if ('paren' !== (s = d(e[(n += 1)])).type || ')' !== s.value) throw new l(')', s)
        return [
          (n += 1),
          { type: 'SpecialExpression', name: 'try', params: [], tryExpression: i, catchExpression: v, error: c },
        ]
      },
      evaluate: function (e, n, r) {
        var t,
          u = r.evaluateAstNode
        try {
          return u(e.tryExpression, n)
        } catch (r) {
          var i = (((t = {})[e.error.value] = { value: d(r) }), t)
          return u(e.catchExpression, a([i], n))
        }
      },
    },
    ge = {
      parse: function (e, n, r) {
        var t = (0, r.parseTokens)(e, n)
        return [t[0] + 1, { type: 'SpecialExpression', name: 'when', params: t[1] }]
      },
      evaluate: function (e, n, r) {
        var t = r.evaluateAstNode,
          a = e.params,
          u = a[0],
          i = a.slice(1)
        if ((m(u), !t(u, n))) return null
        for (var o = null, l = 0, f = i; l < f.length; l++) {
          o = t(f[l], n)
        }
        return o
      },
      validate: function (e) {
        return j({ min: 1 }, e)
      },
    },
    ye = {
      parse: function (e, n, r) {
        var t
        return [(n = (t = (0, r.parseTokens)(e, n))[0]) + 1, { type: 'SpecialExpression', name: 'recur', params: t[1] }]
      },
      evaluate: function (e, n, r) {
        var t = r.evaluateAstNode,
          a = e.params.map(function (e) {
            return t(e, n)
          })
        throw new u(a)
      },
    },
    be = {
      parse: function (e, n, r) {
        var t,
          a,
          u,
          i = r.parseTokens
        return (
          (n = (t = (0, r.parseBindings)(e, n))[0]),
          (u = t[1]),
          [(n = (a = i(e, n))[0]) + 1, { type: 'SpecialExpression', name: 'loop', params: a[1], bindings: u }]
        )
      },
      evaluate: function (e, n, r) {
        for (
          var t = r.evaluateAstNode,
            i = e.bindings.reduce(function (e, r) {
              return (e[r.name] = { value: t(r.value, n) }), e
            }, {}),
            o = a([i], n),
            l = function () {
              var n = null
              try {
                for (var r = 0, a = e.params; r < a.length; r++) {
                  var l = a[r]
                  n = t(l, o)
                }
              } catch (n) {
                if (n instanceof u) {
                  var f = n.params
                  if (f.length !== e.bindings.length)
                    throw Error('recur expected ' + e.bindings.length + ' parameters, got ' + f.length)
                  return (
                    e.bindings.forEach(function (e, n) {
                      d(i[e.name]).value = p(f[n])
                    }),
                    'continue'
                  )
                }
                throw n
              }
              return { value: n }
            };
          ;

        ) {
          var f = l()
          if ('object' == typeof f) return f.value
        }
      },
    },
    xe = {
      parse: function (e, n, r) {
        var t = (0, r.parseToken)(e, n)
        return [t[0] + 1, { type: 'SpecialExpression', name: 'time!', params: [t[1]] }]
      },
      evaluate: function (e, n, r) {
        var t = r.evaluateAstNode,
          a = e.params[0]
        m(a)
        var u = Date.now(),
          i = t(a, n),
          o = Date.now() - u
        return console.log('Elapsed time: ' + o + ' ms'), i
      },
      validate: function (e) {
        return j(1, e)
      },
    },
    Ee = {
      get: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1],
            t = e[2],
            a = 3 === e.length
          if ((R(n), U(n))) {
            if ((y(r), r < n.length)) return X(n[r])
          } else {
            if (!q(n)) return y(r), X(n[r])
            if ((E(r), Object.getOwnPropertyDescriptor(n, r))) return X(n[r])
          }
          return a ? (_(t), t) : null
        },
        validate: function (e) {
          return j({ min: 2, max: 3 }, e)
        },
      },
      count: {
        evaluate: function (e) {
          var n = e[0]
          return 'string' == typeof n ? n.length : (R(n), Array.isArray(n) ? n.length : Object.keys(n).length)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'contains?': {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          return (
            R(n),
            N(r),
            B(n) ? !!Number.isInteger(r) && (y(r), r >= 0 && r < n.length) : !!Object.getOwnPropertyDescriptor(n, r)
          )
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      'has?': {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          return R(n), U(n) ? n.includes(r) : x(n) ? !!x(r) && n.split('').includes(r) : Object.values(n).includes(r)
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      assoc: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1],
            u = e[2]
          if ((R(n), N(r), Array.isArray(n) || 'string' == typeof n)) {
            if (
              (y(r),
              b(r, 0),
              (function (e, n) {
                if ((h(e), e > n))
                  throw TypeError('Expected parameter (' + e + ') to be a number equal or less than ' + n)
              })(r, n.length),
              'string' == typeof n)
            )
              return A(u), '' + n.slice(0, r) + u + n.slice(r + 1)
            var i = a([], n)
            return (i[r] = u), i
          }
          E(r)
          var o = t({}, n)
          return (o[r] = u), o
        },
        validate: function (e) {
          return j(3, e)
        },
      },
      concat: {
        evaluate: function (e) {
          return (
            R(e[0]),
            U(e[0])
              ? e.reduce(function (e, n) {
                  return P(n), e.concat(n)
                }, [])
              : x(e[0])
              ? e.reduce(function (e, n) {
                  return E(n), '' + e + n
                }, '')
              : e.reduce(function (e, n) {
                  return V(n), Object.assign(e, n)
                }, {})
          )
        },
        validate: function (e) {
          return j({ min: 1 }, e)
        },
      },
      'empty?': {
        evaluate: function (e) {
          var n = e[0]
          return R(n), x(n) || Array.isArray(n) ? 0 === n.length : 0 === Object.keys(n).length
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'every?': {
        evaluate: function (e, n, r) {
          var t = e[0],
            a = e[1],
            u = r.executeFunction
          return (
            S(t),
            R(a),
            Array.isArray(a)
              ? a.every(function (e) {
                  return u(t, [e], n)
                })
              : x(a)
              ? a.split('').every(function (e) {
                  return u(t, [e], n)
                })
              : Object.entries(a).every(function (e) {
                  return u(t, [e], n)
                })
          )
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      'any?': {
        evaluate: function (e, n, r) {
          var t = e[0],
            a = e[1],
            u = r.executeFunction
          return (
            S(t),
            R(a),
            Array.isArray(a)
              ? a.some(function (e) {
                  return u(t, [e], n)
                })
              : x(a)
              ? a.split('').some(function (e) {
                  return u(t, [e], n)
                })
              : Object.entries(a).some(function (e) {
                  return u(t, [e], n)
                })
          )
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      'not-any?': {
        evaluate: function (e, n, r) {
          var t = e[0],
            a = e[1],
            u = r.executeFunction
          return (
            S(t),
            R(a),
            Array.isArray(a)
              ? !a.some(function (e) {
                  return u(t, [e], n)
                })
              : x(a)
              ? !a.split('').some(function (e) {
                  return u(t, [e], n)
                })
              : !Object.entries(a).some(function (e) {
                  return u(t, [e], n)
                })
          )
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      'not-every?': {
        evaluate: function (e, n, r) {
          var t = e[0],
            a = e[1],
            u = r.executeFunction
          return (
            S(t),
            R(a),
            Array.isArray(a)
              ? !a.every(function (e) {
                  return u(t, [e], n)
                })
              : x(a)
              ? !a.split('').every(function (e) {
                  return u(t, [e], n)
                })
              : !Object.entries(a).every(function (e) {
                  return u(t, [e], n)
                })
          )
        },
        validate: function (e) {
          return j(2, e)
        },
      },
    },
    we = function (e, n, r) {
      var t = r.executeFunction,
        a = e[0],
        u = e[1]
      S(a), C(u)
      var i = x(u),
        o = u.length
      if (2 === e.length)
        return U(u)
          ? u.map(function (e) {
              return t(a, [e], n)
            })
          : u
              .split('')
              .map(function (e) {
                var r = t(a, [e], n)
                return A(r), r
              })
              .join('')
      if (
        (e.slice(2).forEach(function (e) {
          if ((i ? E(e) : P(e), o !== e.length)) throw Error('All arguments to "map" must have the same length')
        }),
        i)
      ) {
        for (
          var l = '',
            f = function (r) {
              var u = e.slice(1).map(function (e) {
                  return e[r]
                }),
                i = t(a, u, n)
              A(i), (l += i)
            },
            c = 0;
          c < o;
          c += 1
        )
          f(c)
        return l
      }
      l = []
      var v = function (r) {
        var u = e.slice(1).map(function (e) {
          return X(e[r])
        })
        l.push(t(a, u, n))
      }
      for (c = 0; c < o; c += 1) v(c)
      return l
    },
    Ae = {
      cons: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          return _(n), C(r), Array.isArray(r) ? a([n], r) : (A(n), '' + n + r)
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      nth: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          return C(n), y(r), X(n[r])
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      filter: {
        evaluate: function (e, n, r) {
          var t = e[0],
            a = e[1],
            u = r.executeFunction
          return (
            S(t),
            C(a),
            Array.isArray(a)
              ? a.filter(function (e) {
                  return u(t, [e], n)
                })
              : a
                  .split('')
                  .filter(function (e) {
                    return u(t, [e], n)
                  })
                  .join('')
          )
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      first: {
        evaluate: function (e) {
          var n = e[0]
          return C(n), X(n[0])
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      last: {
        evaluate: function (e) {
          var n = e[0]
          return C(n), X(n[n.length - 1])
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      map: {
        evaluate: we,
        validate: function (e) {
          return j({ min: 2 }, e)
        },
      },
      pop: {
        evaluate: function (e) {
          var n = e[0]
          if ((C(n), x(n))) return n.substr(0, n.length - 1)
          var r = a([], n)
          return r.pop(), r
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      position: {
        evaluate: function (e, n, r) {
          var t,
            a = e[0],
            u = e[1],
            i = r.executeFunction
          return (
            S(a),
            C(u),
            x(u)
              ? -1 !==
                (t = u.split('').findIndex(function (e) {
                  return i(a, [e], n)
                }))
                ? t
                : null
              : -1 !==
                (t = u.findIndex(function (e) {
                  return i(a, [e], n)
                }))
              ? t
              : null
          )
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      'index-of': {
        evaluate: function (e) {
          var n,
            r = e[0],
            t = e[1]
          return _(t), C(r), x(r) ? (E(t), -1 !== (n = r.indexOf(t)) ? n : null) : -1 !== (n = r.indexOf(t)) ? n : null
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      push: {
        evaluate: function (e) {
          var n = e[0],
            r = e.slice(1)
          return C(n), x(n) ? (I(r), a([n], r).join('')) : a(a([], n), r)
        },
        validate: function (e) {
          return j({ min: 2 }, e)
        },
      },
      reduce: {
        evaluate: function (e, n, r) {
          var t = r.executeFunction,
            a = e[0]
          if ((S(a), 2 === e.length)) {
            var u = e[1]
            if ((C(u), 0 === u.length)) return t(a, [], n)
            if (1 === u.length) return X(u[0])
            if (x(u)) {
              var i = u.split('')
              return i.slice(1).reduce(function (e, r) {
                return t(a, [e, r], n)
              }, p(i[0]))
            }
            return u.slice(1).reduce(function (e, r) {
              return t(a, [e, r], n)
            }, X(u[0]))
          }
          var o = e[1],
            l = e[2]
          return (
            _(o),
            C(l),
            x(l)
              ? (E(o),
                0 === l.length
                  ? o
                  : l.split('').reduce(function (e, r) {
                      return t(a, [e, r], n)
                    }, o))
              : 0 === l.length
              ? o
              : l.reduce(function (e, r) {
                  return t(a, [e, r], n)
                }, o)
          )
        },
        validate: function (e) {
          return j({ min: 2, max: 3 }, e)
        },
      },
      'reduce-right': {
        evaluate: function (e, n, r) {
          var t = r.executeFunction,
            a = e[0]
          if ((S(a), 2 === e.length)) {
            if ((C((o = e[1])), 0 === o.length)) return t(a, [], n)
            if (1 === o.length) return X(o[0])
            if (x(o)) {
              var u = o.split('')
              return u.slice(0, u.length - 1).reduceRight(function (e, r) {
                var u = t(a, [e, r], n)
                return E(u), u
              }, u[u.length - 1])
            }
            return o.slice(0, o.length - 1).reduceRight(function (e, r) {
              return t(a, [e, r], n)
            }, p(o[o.length - 1]))
          }
          var i = e[1],
            o = e[2]
          return (
            _(i),
            C(o),
            x(o)
              ? 0 === o.length
                ? i
                : o.split('').reduceRight(function (e, r) {
                    return t(a, [e, r], n)
                  }, i)
              : 0 === o.length
              ? i
              : o.reduceRight(function (e, r) {
                  return t(a, [e, r], n)
                }, i)
          )
        },
        validate: function (e) {
          return j({ min: 2, max: 3 }, e)
        },
      },
      rest: {
        evaluate: function (e) {
          var n = e[0]
          return C(n), Array.isArray(n) ? (n.length <= 1 ? [] : n.slice(1)) : n.substr(1)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      nthrest: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          C(n), h(r)
          var t = Math.max(Math.ceil(r), 0)
          return Array.isArray(n) ? n.slice(t) : n.substr(t)
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      next: {
        evaluate: function (e) {
          var n = e[0]
          return C(n), Array.isArray(n) ? (n.length <= 1 ? null : n.slice(1)) : n.length <= 1 ? null : n.substr(1)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      nthnext: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          C(n), h(r)
          var t = Math.max(Math.ceil(r), 0)
          return n.length <= r ? null : Array.isArray(n) ? n.slice(t) : n.substr(t)
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      reverse: {
        evaluate: function (e) {
          var n = e[0]
          return C(n), Array.isArray(n) ? a([], n).reverse() : n.split('').reverse().join('')
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      second: {
        evaluate: function (e) {
          var n = e[0]
          return C(n), X(n[1])
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      shift: {
        evaluate: function (e) {
          var n = e[0]
          if ((C(n), x(n))) return n.substr(1)
          var r = a([], n)
          return r.shift(), r
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      slice: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1],
            t = e[2]
          return C(n), 1 === e.length ? n : (y(r), 2 === e.length ? n.slice(r) : (y(t), n.slice(r, t)))
        },
        validate: function (e) {
          return j({ min: 1, max: 3 }, e)
        },
      },
      some: {
        evaluate: function (e, n, r) {
          var t,
            a = e[0],
            u = e[1],
            i = r.executeFunction
          return (
            S(a),
            C(u),
            0 === u.length
              ? null
              : x(u)
              ? null !==
                  (t = u.split('').find(function (e) {
                    return i(a, [e], n)
                  })) && void 0 !== t
                ? t
                : null
              : X(
                  u.find(function (e) {
                    return i(a, [e], n)
                  }),
                )
          )
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      sort: {
        evaluate: function (e, n, r) {
          var t = r.executeFunction,
            u = 1 === e.length,
            i = u ? e[0] : e[1],
            o = u ? null : e[0]
          if ((C(i), x(i))) {
            var l = i.split('')
            return (
              u
                ? l.sort(J)
                : (S(o),
                  l.sort(function (e, r) {
                    var a = t(o, [e, r], n)
                    return h(a), a
                  })),
              l.join('')
            )
          }
          var f = a([], i)
          return (
            u
              ? f.sort(J)
              : f.sort(function (e, r) {
                  S(o)
                  var a = t(o, [e, r], n)
                  return h(a), a
                }),
            f
          )
        },
        validate: function (e) {
          return j({ min: 1, max: 2 }, e)
        },
      },
      take: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          F(n), C(r)
          var t = Math.max(Math.ceil(n), 0)
          return r.slice(0, t)
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      'take-last': {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          C(r), F(n)
          var t = Math.max(Math.ceil(n), 0),
            a = r.length - t
          return r.slice(a)
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      'take-while': {
        evaluate: function (e, n, r) {
          var t = e[0],
            a = e[1],
            u = r.executeFunction
          C(a), S(t)
          for (var i = [], o = 0, l = a; o < l.length; o++) {
            var f = l[o]
            if (!u(t, [f], n)) break
            i.push(f)
          }
          return x(a) ? i.join('') : i
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      drop: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          F(n)
          var t = Math.max(Math.ceil(n), 0)
          return C(r), r.slice(t)
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      'drop-last': {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          C(r), F(n)
          var t = Math.max(Math.ceil(n), 0),
            a = r.length - t
          return r.slice(0, a)
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      'drop-while': {
        evaluate: function (e, n, r) {
          var t = e[0],
            a = e[1],
            u = r.executeFunction
          if ((C(a), S(t), Array.isArray(a))) {
            var i = a.findIndex(function (e) {
              return !u(t, [e], n)
            })
            return a.slice(i)
          }
          var o = a.split(''),
            l = o.findIndex(function (e) {
              return !u(t, [e], n)
            })
          return o.slice(l).join('')
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      unshift: {
        evaluate: function (e) {
          var n = e[0],
            r = e.slice(1)
          if ((C(n), x(n))) return I(r), a(a([], r), [n]).join('')
          var t = a([], n)
          return t.unshift.apply(t, r), t
        },
        validate: function (e) {
          return j({ min: 2 }, e)
        },
      },
      'random-sample!': {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          return (
            h(n),
            C(r),
            x(r)
              ? r
                  .split('')
                  .filter(function () {
                    return Math.random() < n
                  })
                  .join('')
              : r.filter(function () {
                  return Math.random() < n
                })
          )
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      'rand-nth!': {
        evaluate: function (e) {
          var n = e[0]
          if ((C(n), 0 === n.length)) return null
          var r = Math.floor(Math.random() * n.length)
          return x(n) ? X(n.split('')[r]) : X(n[r])
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      shuffle: {
        evaluate: function (e) {
          var n = e[0]
          C(n)
          for (var r, t, u = x(n) ? a([], n.split('')) : a([], n), i = u.length; i; )
            (i -= 1), (t = Math.floor(Math.random() * i)), (r = X(u[i])), (u[i] = X(u[t])), (u[t] = r)
          return x(n) ? u.join('') : u
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      distinct: {
        evaluate: function (e) {
          var n = e[0]
          return C(n), Array.isArray(n) ? Array.from(new Set(n)) : Array.from(new Set(n.split(''))).join('')
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      remove: {
        evaluate: function (e, n, r) {
          var t = e[0],
            a = e[1],
            u = r.executeFunction
          return (
            S(t),
            C(a),
            Array.isArray(a)
              ? a.filter(function (e) {
                  return !u(t, [e], n)
                })
              : a
                  .split('')
                  .filter(function (e) {
                    return !u(t, [e], n)
                  })
                  .join('')
          )
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      'split-at': {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          h(n)
          var t = Math.max(0, Math.ceil(n))
          return C(r), [r.slice(0, t), r.slice(t)]
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      'split-with': {
        evaluate: function (e, n, r) {
          var t = e[0],
            a = e[1],
            u = r.executeFunction
          S(t), C(a)
          var i = Array.isArray(a),
            o = (i ? a : a.split('')).findIndex(function (e) {
              return !u(t, [e], n)
            })
          return -1 === o ? [a, i ? [] : ''] : [a.slice(0, o), a.slice(o)]
        },
        validate: function (e) {
          return j(2, e)
        },
      },
    },
    Ne = {
      array: {
        evaluate: function (e) {
          return e
        },
      },
      range: {
        evaluate: function (e) {
          var n,
            r,
            t,
            a = e[0],
            u = e[1],
            i = e[2]
          h(a),
            1 === e.length
              ? ((n = 0), (t = (r = a) >= 0 ? 1 : -1))
              : 2 === e.length
              ? (h(u), (t = (r = u) >= (n = a) ? 1 : -1))
              : (h(u),
                h(i),
                (t = i),
                (r = u) > (n = a)
                  ? (function (e) {
                      if ((h(e), e <= 0)) throw TypeError('Expected positive number, got ' + e)
                    })(t)
                  : r < n
                  ? (function (e) {
                      if ((h(e), e >= 0)) throw TypeError('Expected negative number, got ' + e)
                    })(t)
                  : (function (e) {
                      if ((h(e), 0 === e)) throw TypeError('Expected non zero value')
                    })(t))
          for (var o = [], l = n; t < 0 ? l > r : l < r; l += t) o.push(l)
          return o
        },
        validate: function (e) {
          return j({ min: 1, max: 3 }, e)
        },
      },
      repeat: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          g(n)
          for (var t = [], a = 0; a < n; a += 1) t.push(r)
          return t
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      flatten: {
        evaluate: function (e) {
          var n = e[0]
          return U(n) ? n.flat(Number.POSITIVE_INFINITY) : []
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      mapcat: {
        evaluate: function (e, n, r) {
          e.slice(1).forEach(function (e) {
            P(e)
          })
          var t = we(e, n, r)
          return P(t), t.flat(1)
        },
        validate: function (e) {
          return j({ min: 2 }, e)
        },
      },
    },
    Me = {
      inc: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), n + 1
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      dec: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), n - 1
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      '+': {
        evaluate: function (e) {
          return e.reduce(function (e, n) {
            return F(n), e + n
          }, 0)
        },
      },
      '*': {
        evaluate: function (e) {
          return e.reduce(function (e, n) {
            return F(n), e * n
          }, 1)
        },
      },
      '/': {
        evaluate: function (e) {
          if (0 === e.length) return 1
          var n = e[0],
            r = e.slice(1)
          return (
            F(n),
            0 === r.length
              ? (F(n), 1 / n)
              : r.reduce(function (e, n) {
                  return F(n), e / n
                }, n)
          )
        },
      },
      '-': {
        evaluate: function (e) {
          var n = e[0],
            r = e.slice(1)
          return n
            ? (F(n),
              0 === r.length
                ? -n
                : r.reduce(function (e, n) {
                    return F(n), e - n
                  }, n))
            : 0
        },
      },
      quot: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          return F(n), F(r), Math.trunc(n / r)
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      mod: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          return F(n), F(r), n - r * Math.floor(n / r)
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      rem: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          return F(n), F(r), n - r * Math.trunc(n / r)
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      sqrt: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.sqrt(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      cbrt: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.cbrt(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      pow: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          return F(n), F(r), Math.pow(n, r)
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      round: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          if ((F(n), 1 === e.length || 0 === r)) return Math.round(n)
          g(r)
          var t = Math.pow(10, r)
          return Math.round(n * t) / t
        },
        validate: function (e) {
          return j({ min: 1, max: 2 }, e)
        },
      },
      trunc: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.trunc(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      floor: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.floor(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      ceil: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.ceil(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      rand: {
        evaluate: function (e) {
          var n = 1 === e.length ? e[0] : 1
          return F(n), Math.random() * n
        },
        validate: function (e) {
          return j({ min: 0, max: 1 }, e)
        },
      },
      'rand-int!': {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.floor(Math.random() * Math.abs(n)) * Math.sign(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      min: {
        evaluate: function (e) {
          var n = e[0],
            r = e.slice(1)
          return (
            F(n),
            0 === r.length
              ? n
              : r.reduce(function (e, n) {
                  return F(n), Math.min(e, n)
                }, n)
          )
        },
        validate: function (e) {
          return j({ min: 1 }, e)
        },
      },
      max: {
        evaluate: function (e) {
          var n = e[0],
            r = e.slice(1)
          return (
            F(n),
            0 === r.length
              ? n
              : r.reduce(function (e, n) {
                  return F(n), Math.max(e, n)
                }, n)
          )
        },
        validate: function (e) {
          return j({ min: 1 }, e)
        },
      },
      abs: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.abs(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      sign: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.sign(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'max-safe-integer': {
        evaluate: function () {
          return Number.MAX_SAFE_INTEGER
        },
        validate: function (e) {
          return j(0, e)
        },
      },
      'min-safe-integer': {
        evaluate: function () {
          return Number.MIN_SAFE_INTEGER
        },
        validate: function (e) {
          return j(0, e)
        },
      },
      'max-value': {
        evaluate: function () {
          return Number.MAX_VALUE
        },
        validate: function (e) {
          return j(0, e)
        },
      },
      'min-value': {
        evaluate: function () {
          return Number.MIN_VALUE
        },
        validate: function (e) {
          return j(0, e)
        },
      },
      epsilon: {
        evaluate: function () {
          return Number.EPSILON
        },
        validate: function (e) {
          return j(0, e)
        },
      },
      infinity: {
        evaluate: function () {
          return Number.POSITIVE_INFINITY
        },
        validate: function (e) {
          return j(0, e)
        },
      },
      '-infinity': {
        evaluate: function () {
          return Number.NEGATIVE_INFINITY
        },
        validate: function (e) {
          return j(0, e)
        },
      },
      nan: {
        evaluate: function () {
          return Number.NaN
        },
        validate: function (e) {
          return j(0, e)
        },
      },
      e: {
        evaluate: function () {
          return Math.E
        },
        validate: function (e) {
          return j(0, e)
        },
      },
      pi: {
        evaluate: function () {
          return Math.PI
        },
        validate: function (e) {
          return j(0, e)
        },
      },
      exp: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.exp(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      log: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.log(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      log2: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.log2(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      log10: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.log10(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      sin: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.sin(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      asin: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.asin(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      sinh: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.sinh(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      asinh: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.asinh(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      cos: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.cos(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      acos: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.acos(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      cosh: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.cosh(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      acosh: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.acosh(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      tan: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.tan(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      atan: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.atan(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      tanh: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.tanh(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      atanh: {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Math.atanh(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
    },
    je = /[[.]/
  function ke(e, n) {
    for (var r = 0, t = Oe(n); r < t.length; r++) {
      var a = t[r]
      try {
        e = X(e[a])
      } catch (e) {
        return null
      }
    }
    return e
  }
  function Oe(e) {
    if (!e) return []
    var n = je.exec(e)
    if (!n) return [e]
    if (n.index > 0) return a([e.substring(0, n.index)], Oe(e.substring(n.index)))
    if ('.' === e[0]) {
      if (e.length < 2) throw Error('Ill formed path: ' + e)
      return Oe(e.substring(1))
    }
    var r = (function (e) {
        var n = Se.exec(e) || Te.exec(e)
        if (n) {
          return [n[0].length, n[1]]
        }
        var r = Ie.exec(e)
        if (r) {
          return [r[0].length, Number(r[1])]
        }
        throw Error('Ill formed path: ' + e)
      })(e),
      t = r[0],
      u = r[1]
    if (e.length > t && '.' !== e[t] && '[' !== e[t]) throw Error('Ill formed path: ' + e)
    return a([u], Oe(e.substring(t)))
  }
  var Se = /^\[\s*'(.*)'\s*\]/,
    Te = /^\[\s*"(.*)"\s*\]/,
    Ie = /^\[\s*(\d+)\s*\]/
  var Fe = {
    'not=': {
      evaluate: function (e) {
        for (var n = 0; n < e.length - 1; n += 1) for (var r = n + 1; r < e.length; r += 1) if (e[n] === e[r]) return !1
        return !0
      },
      validate: function (e) {
        return j({ min: 1 }, e)
      },
    },
    '=': {
      evaluate: function (e) {
        for (var n = e[0], r = 0, t = e.slice(1); r < t.length; r++) {
          if (t[r] !== n) return !1
        }
        return !0
      },
      validate: function (e) {
        return j({ min: 1 }, e)
      },
    },
    'equal?': {
      evaluate: function (e) {
        var n = e[0],
          r = e[1]
        return W(p(n), p(r))
      },
      validate: function (e) {
        return j({ min: 1 }, e)
      },
    },
    '>': {
      evaluate: function (e) {
        for (var n = e[0], r = 0, t = e.slice(1); r < t.length; r++) {
          var a = t[r]
          if (J(n, a) <= 0) return !1
          n = a
        }
        return !0
      },
      validate: function (e) {
        return j({ min: 1 }, e)
      },
    },
    '<': {
      evaluate: function (e) {
        for (var n = e[0], r = 0, t = e.slice(1); r < t.length; r++) {
          var a = t[r]
          if (J(n, a) >= 0) return !1
          n = a
        }
        return !0
      },
      validate: function (e) {
        return j({ min: 1 }, e)
      },
    },
    '>=': {
      evaluate: function (e) {
        for (var n = e[0], r = 0, t = e.slice(1); r < t.length; r++) {
          var a = t[r]
          if (J(n, a) < 0) return !1
          n = a
        }
        return !0
      },
      validate: function (e) {
        return j({ min: 1 }, e)
      },
    },
    '<=': {
      evaluate: function (e) {
        for (var n = e[0], r = 0, t = e.slice(1); r < t.length; r++) {
          var a = t[r]
          if (J(n, a) > 0) return !1
          n = a
        }
        return !0
      },
      validate: function (e) {
        return j({ min: 1 }, e)
      },
    },
    'get-path': {
      evaluate: function (e) {
        var n = e[0],
          r = e[1]
        return (
          (function (e) {
            if (
              (null === e || 'object' != typeof e || Array.isArray(e) || e instanceof RegExp || O(e)) &&
              !Array.isArray(e)
            )
              throw TypeError('Expected object or array, got: ' + e + ' type="' + typeof e + '"')
          })(n),
          E(r),
          ke(n, r)
        )
      },
      validate: function (e) {
        return j(2, e)
      },
    },
    not: {
      evaluate: function (e) {
        return !e[0]
      },
      validate: function (e) {
        return j(1, e)
      },
    },
    'inst-ms': {
      evaluate: function () {
        return Date.now()
      },
      validate: function (e) {
        return j(0, e)
      },
    },
    'write!': {
      evaluate: function (e) {
        return console.log.apply(console, e), e.length > 0 ? p(e[e.length - 1]) : null
      },
    },
    'debug!': {
      evaluate: function (e, n) {
        return 0 === e.length
          ? (console.warn(
              '*** LISPISH DEBUG ***\n' +
                (function (e) {
                  return a([], e)
                    .reverse()
                    .reduce(function (e, n, r) {
                      return (
                        e +
                        'Context ' +
                        r +
                        (0 === r ? ' - Import context' : 1 === r ? ' - Global context' : '') +
                        '\n' +
                        (function (e) {
                          if (0 === Object.keys(e).length) return '  <empty>\n'
                          var n = Math.max.apply(
                            Math,
                            Object.keys(e).map(function (e) {
                              return e.length
                            }),
                          )
                          return Object.entries(e).reduce(function (e, r) {
                            return (
                              e +
                              '  ' +
                              ('' + r[0]).padEnd(n + 2, ' ') +
                              (function (e) {
                                var n = e.value,
                                  r = n.name
                                if (O(n))
                                  return r ? '<' + n.type + ' function ' + r + '>' : '<' + n.type + ' function λ>'
                                return JSON.stringify(e.value)
                              })(r[1]) +
                              '\n'
                            )
                          }, '')
                        })(n) +
                        '\n'
                      )
                    }, '')
                })(n) +
                '\n',
            ),
            null)
          : (console.warn('*** LISPISH DEBUG ***\n' + JSON.stringify(e[0], null, 2) + '\n'), p(e[0]))
      },
      validate: function (e) {
        return j({ max: 1 }, e)
      },
    },
    boolean: {
      evaluate: function (e) {
        return !!e[0]
      },
      validate: function (e) {
        return j(1, e)
      },
    },
    compare: {
      evaluate: function (e) {
        return J(e[0], e[1])
      },
      validate: function (e) {
        return j(2, e)
      },
    },
    assert: {
      evaluate: function (e) {
        var n = e[0],
          r = 2 === e.length ? e[1] : '' + n
        if ((E(r), !n)) throw new o(r)
        return p(n)
      },
      validate: function (e) {
        return j({ min: 1, max: 2 }, e)
      },
    },
    'lispish-version': {
      evaluate: function () {
        return '0.1.50'
      },
      validate: function (e) {
        return j(0, e)
      },
    },
  }
  var Pe = {
      object: {
        evaluate: function (e) {
          for (var n = {}, r = 0; r < e.length; r += 2) {
            var t = e[r],
              a = e[r + 1]
            E(t), (n[t] = a)
          }
          return n
        },
        validate: function (e) {
          return k(e)
        },
      },
      keys: {
        evaluate: function (e) {
          var n = e[0]
          return V(n), Object.keys(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      vals: {
        evaluate: function (e) {
          var n = e[0]
          return V(n), Object.values(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      entries: {
        evaluate: function (e) {
          var n = e[0]
          return V(n), Object.entries(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      find: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          return V(n), E(r), z(n, r) ? [r, n[r]] : null
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      dissoc: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          V(n), E(r)
          var t = X(n[r])
          return delete n[r], t
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      merge: {
        evaluate: function (e) {
          var n = e[0],
            r = e.slice(1)
          return (
            V(n),
            r.reduce(function (e, n) {
              return V(n), t(t({}, e), n)
            }, t({}, n))
          )
        },
        validate: function (e) {
          return j({ min: 1 }, e)
        },
      },
      zipmap: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          T(n), P(r)
          for (var t = Math.min(n.length, r.length), a = {}, u = 0; u < t; u += 1) {
            a[d(n[u])] = X(r[u])
          }
          return a
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      'select-keys': {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          return (
            T(r),
            V(n),
            r.reduce(function (e, r) {
              return z(n, r) && (e[r] = X(n[r])), e
            }, {})
          )
        },
        validate: function (e) {
          return j(2, e)
        },
      },
    },
    Re = {
      'function?': {
        evaluate: function (e) {
          return O(e[0])
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'string?': {
        evaluate: function (e) {
          return 'string' == typeof e[0]
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'number?': {
        evaluate: function (e) {
          return 'number' == typeof e[0]
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'integer?': {
        evaluate: function (e) {
          var n = e[0]
          return 'number' == typeof n && Number.isInteger(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'boolean?': {
        evaluate: function (e) {
          return 'boolean' == typeof e[0]
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'nil?': {
        evaluate: function (e) {
          var n = e[0]
          return null == n
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'zero?': {
        evaluate: function (e) {
          var n = e[0]
          return h(n), 0 === n
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'pos?': {
        evaluate: function (e) {
          var n = e[0]
          return h(n), n > 0
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'neg?': {
        evaluate: function (e) {
          var n = e[0]
          return h(n), n < 0
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'even?': {
        evaluate: function (e) {
          var n = e[0]
          return h(n), n % 2 == 0
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'odd?': {
        evaluate: function (e) {
          var n = e[0]
          return h(n), Number.isInteger(n) && n % 2 != 0
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'array?': {
        evaluate: function (e) {
          return U(e[0])
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'coll?': {
        evaluate: function (e) {
          return D(e[0])
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'seq?': {
        evaluate: function (e) {
          return B(e[0])
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'object?': {
        evaluate: function (e) {
          return q(e[0])
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'regexp?': {
        evaluate: function (e) {
          var n = e[0]
          return null !== n && !Array.isArray(n) && 'object' == typeof n && n instanceof RegExp
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'finite?': {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Number.isFinite(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'nan?': {
        evaluate: function (e) {
          var n = e[0]
          return F(n), Number.isNaN(n)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'positive-infinity?': {
        evaluate: function (e) {
          var n = e[0]
          return F(n), n === Number.POSITIVE_INFINITY
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'negative-infinity?': {
        evaluate: function (e) {
          var n = e[0]
          return F(n), n === Number.NEGATIVE_INFINITY
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'true?': {
        evaluate: function (e) {
          return !0 === e[0]
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'false?': {
        evaluate: function (e) {
          return !1 === e[0]
        },
        validate: function (e) {
          return j(1, e)
        },
      },
    },
    _e = {
      regexp: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          return E(n), 1 === e.length ? new RegExp(n) : (E(r), new RegExp(n, r))
        },
        validate: function (e) {
          return j({ min: 1, max: 2 }, e)
        },
      },
      match: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          M(n), E(r)
          var t = n.exec(r)
          return t ? a([], t) : null
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      replace: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1],
            t = e[2]
          return E(n), M(r), E(t), n.replace(r, t)
        },
        validate: function (e) {
          return j(3, e)
        },
      },
    },
    Ce = {
      subs: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1],
            t = e[2]
          return E(n), g(r), void 0 === t ? n.substring(r) : (b(t, r), n.substring(r, t))
        },
        validate: function (e) {
          return j({ min: 2, max: 3 }, e)
        },
      },
      'string-repeat': {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          return E(n), g(r), n.repeat(r)
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      str: {
        evaluate: function (e) {
          return e.reduce(function (e, n) {
            return e + (null == n ? '' : q(n) || Array.isArray(n) ? JSON.stringify(n) : '' + n)
          }, '')
        },
      },
      'string-to-number': {
        evaluate: function (e) {
          var n = e[0]
          E(n)
          var r = Number(n)
          if (Number.isNaN(r)) throw Error("Could not convert '" + n + "' to a number")
          return r
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'number-to-string': {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          if ((h(n), 1 === e.length)) return '' + n
          if ((h(r), 2 !== r && 8 !== r && 10 !== r && 16 !== r))
            throw Error('Expected "number-to-string" base argument to be 2, 8, 10 or 16, got: ' + r)
          return 10 === r ? '' + n : (g(n), Number(n).toString(r))
        },
        validate: function (e) {
          return j({ min: 1, max: 2 }, e)
        },
      },
      'from-char-code': {
        evaluate: function (e) {
          var n = e[0]
          h(n)
          var r = Math.max(0, Math.ceil(n))
          return String.fromCodePoint(r)
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'to-char-code': {
        evaluate: function (e) {
          var n = e[0]
          return (
            (function (e) {
              if ((E(e), 0 === e.length))
                throw TypeError('Expected non empty string, got: ' + e + ' type="' + typeof e + '"')
            })(n),
            d(n.codePointAt(0))
          )
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'lower-case': {
        evaluate: function (e) {
          var n = e[0]
          return E(n), n.toLowerCase()
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'upper-case': {
        evaluate: function (e) {
          var n = e[0]
          return E(n), n.toUpperCase()
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      trim: {
        evaluate: function (e) {
          var n = e[0]
          return E(n), n.trim()
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'trim-left': {
        evaluate: function (e) {
          var n = e[0]
          return E(n), n.replace(/^\s+/, '')
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'trim-right': {
        evaluate: function (e) {
          var n = e[0]
          return E(n), n.replace(/\s+$/, '')
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      join: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1]
          return (
            P(n),
            n.forEach(function (e) {
              return E(e)
            }),
            E(r),
            n.join(r)
          )
        },
        validate: function (e) {
          return j(2, e)
        },
      },
      split: {
        evaluate: function (e) {
          var n = e[0],
            r = e[1],
            t = e[2]
          return (
            E(n),
            (function (e) {
              if (!(e instanceof RegExp || 'string' == typeof e))
                throw TypeError('Expected RegExp or string, got: ' + e + ' type="' + typeof e + '"')
            })(r),
            void 0 !== t && g(t),
            n.split(r, t)
          )
        },
        validate: function (e) {
          return j({ min: 2, max: 3 }, e)
        },
      },
      'pad-left': {
        evaluate: function (e) {
          var n = e[0],
            r = e[1],
            t = e[2]
          return E(n), y(r), void 0 !== t && E(t), n.padStart(r, t)
        },
        validate: function (e) {
          return j({ min: 2, max: 3 }, e)
        },
      },
      'pad-right': {
        evaluate: function (e) {
          var n = e[0],
            r = e[1],
            t = e[2]
          return E(n), y(r), void 0 !== t && E(t), n.padEnd(r, t)
        },
        validate: function (e) {
          return j({ min: 2, max: 3 }, e)
        },
      },
      template: {
        evaluate: function (e) {
          var n = e[0],
            r = e.slice(1)
          E(n)
          var t = n.split('||||')
          if (1 === t.length) return T(r), qe(t[0], r)
          if (2 === t.length) {
            var u = r[0]
            g(u)
            var i = a(['' + u], r.slice(1))
            return qe(1 === u ? t[0] : t[1], i)
          }
          throw Error('Invalid template string, only one "||||" separator allowed')
        },
        validate: function (e) {
          return j({ min: 1, max: 10 }, e)
        },
      },
    },
    Ve = /\$\$/g
  function qe(e, n) {
    for (var r = 0; r < 9; r += 1) {
      var t = new RegExp('(?<=^|[^$]|\\$\\$)\\$' + (r + 1), 'g')
      if (t.test(e)) {
        var a = n[r]
        E(a), (e = e.replace(t, a))
      }
    }
    return e.replace(Ve, '$')
  }
  var Ue = {
      apply: {
        evaluate: function (e, n, r) {
          var t = e[0],
            u = e.slice(1),
            i = r.executeFunction
          S(t)
          var o = u[u.length - 1]
          return P(o), i(t, a(a([], u.slice(0, -1)), o), n)
        },
        validate: function (e) {
          return j({ min: 2 }, e)
        },
      },
      identity: {
        evaluate: function (e) {
          return X(e[0])
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      partial: {
        evaluate: function (e) {
          var n,
            r = e[0],
            t = e.slice(1)
          return ((n = {})[c] = !0), (n.type = 'partial'), (n.fn = X(r)), (n.params = t), n
        },
        validate: function (e) {
          return j({ min: 1 }, e)
        },
      },
      comp: {
        evaluate: function (e) {
          var n
          if (e.length > 1) {
            var r = e[e.length - 1]
            U(r) && (e = a(a([], e.slice(0, -1)), r))
          }
          return ((n = {})[c] = !0), (n.type = 'comp'), (n.fns = e), n
        },
      },
      constantly: {
        evaluate: function (e) {
          var n,
            r = e[0]
          return ((n = {})[c] = !0), (n.type = 'constantly'), (n.value = X(r)), n
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      juxt: {
        evaluate: function (e) {
          var n
          return ((n = {})[c] = !0), (n.type = 'juxt'), (n.fns = e), n
        },
        validate: function (e) {
          return j({ min: 1 }, e)
        },
      },
      complement: {
        evaluate: function (e) {
          var n,
            r = e[0]
          return ((n = {})[c] = !0), (n.type = 'complement'), (n.fn = X(r)), n
        },
        validate: function (e) {
          return j(1, e)
        },
      },
      'every-pred': {
        evaluate: function (e) {
          var n
          return ((n = {})[c] = !0), (n.type = 'every-pred'), (n.fns = e), n
        },
        validate: function (e) {
          return j({ min: 1 }, e)
        },
      },
      'some-pred': {
        evaluate: function (e) {
          var n
          return ((n = {})[c] = !0), (n.type = 'some-pred'), (n.fns = e), n
        },
        validate: function (e) {
          return j({ min: 1 }, e)
        },
      },
    },
    Be = t(
      t(
        t(
          t(
            t(
              t(
                t(
                  t(
                    t(
                      t(
                        t(
                          {},
                          {
                            'bit-shift-left': {
                              evaluate: function (e) {
                                var n = e[0],
                                  r = e[1]
                                return y(n), g(r), n << r
                              },
                              validate: function (e) {
                                return j(2, e)
                              },
                            },
                            'bit-shift-right': {
                              evaluate: function (e) {
                                var n = e[0],
                                  r = e[1]
                                return y(n), g(r), n >> r
                              },
                              validate: function (e) {
                                return j(2, e)
                              },
                            },
                            'bit-not': {
                              evaluate: function (e) {
                                var n = e[0]
                                return y(n), ~n
                              },
                              validate: function (e) {
                                return j(1, e)
                              },
                            },
                            'bit-and': {
                              evaluate: function (e) {
                                var n = e[0],
                                  r = e.slice(1)
                                return (
                                  y(n),
                                  r.reduce(function (e, n) {
                                    return y(n), e & n
                                  }, n)
                                )
                              },
                              validate: function (e) {
                                return j({ min: 2 }, e)
                              },
                            },
                            'bit-and-not': {
                              evaluate: function (e) {
                                var n = e[0],
                                  r = e.slice(1)
                                return (
                                  y(n),
                                  r.reduce(function (e, n) {
                                    return y(n), e & ~n
                                  }, n)
                                )
                              },
                              validate: function (e) {
                                return j({ min: 2 }, e)
                              },
                            },
                            'bit-or': {
                              evaluate: function (e) {
                                var n = e[0],
                                  r = e.slice(1)
                                return (
                                  y(n),
                                  r.reduce(function (e, n) {
                                    return y(n), e | n
                                  }, n)
                                )
                              },
                              validate: function (e) {
                                return j({ min: 2 }, e)
                              },
                            },
                            'bit-xor': {
                              evaluate: function (e) {
                                var n = e[0],
                                  r = e.slice(1)
                                return (
                                  y(n),
                                  r.reduce(function (e, n) {
                                    return y(n), e ^ n
                                  }, n)
                                )
                              },
                              validate: function (e) {
                                return j({ min: 2 }, e)
                              },
                            },
                            'bit-flip': {
                              evaluate: function (e) {
                                var n = e[0],
                                  r = e[1]
                                return y(n), g(r), n ^ (1 << r)
                              },
                              validate: function (e) {
                                return j(2, e)
                              },
                            },
                            'bit-set': {
                              evaluate: function (e) {
                                var n = e[0],
                                  r = e[1]
                                return y(n), g(r), n | (1 << r)
                              },
                              validate: function (e) {
                                return j(2, e)
                              },
                            },
                            'bit-clear': {
                              evaluate: function (e) {
                                var n = e[0],
                                  r = e[1]
                                return y(n), g(r), n & ~(1 << r)
                              },
                              validate: function (e) {
                                return j(2, e)
                              },
                            },
                            'bit-test': {
                              evaluate: function (e) {
                                var n = e[0],
                                  r = e[1]
                                return y(n), g(r), !!(n & (1 << r))
                              },
                              validate: function (e) {
                                return j(2, e)
                              },
                            },
                          },
                        ),
                        Ee,
                      ),
                      Ne,
                    ),
                    Ae,
                  ),
                  Me,
                ),
                Fe,
              ),
              Pe,
            ),
            Re,
          ),
          _e,
        ),
        Ce,
      ),
      Ue,
    ),
    De = {
      def: pe,
      defs: de,
      and: {
        parse: function (e, n, r) {
          var t = (0, r.parseTokens)(e, n)
          return [t[0] + 1, { type: 'SpecialExpression', name: 'and', params: t[1] }]
        },
        evaluate: function (e, n, r) {
          for (var t = r.evaluateAstNode, a = !0, u = 0, i = e.params; u < i.length; u++) {
            if (!(a = t(i[u], n))) break
          }
          return a
        },
      },
      cond: H,
      defn: re,
      defns: te,
      if: ue,
      'if-not': ie,
      'if-let': oe,
      'when-let': le,
      'when-not': fe,
      'when-first': ce,
      fn: ae,
      let: ve,
      or: {
        parse: function (e, n, r) {
          var t = (0, r.parseTokens)(e, n)
          return [t[0] + 1, { type: 'SpecialExpression', name: 'or', params: t[1] }]
        },
        evaluate: function (e, n, r) {
          for (var t = r.evaluateAstNode, a = !1, u = 0, i = e.params; u < i.length; u++) {
            if ((a = t(i[u], n))) break
          }
          return a
        },
      },
      do: se,
      throw: me,
      try: he,
      when: ge,
      recur: ye,
      loop: be,
      'time!': xe,
    }
  Object.keys(De).forEach(function (e) {
    if (Be[e]) throw Error('Expression ' + e + ' is defined as both a normal expression and a special expression')
  })
  var Le = { normalExpressions: Be, specialExpressions: De },
    $e = Object.keys(Be),
    ze = Object.keys(De)
  function Ge(e, n, r) {
    for (var t, a = [n, r], u = 0, i = e.body; u < i.length; u++) {
      var o = i[u]
      t = Ye(o, a)
    }
    return t
  }
  var Ye = function (e, n) {
    switch (e.type) {
      case 'Number':
      case 'String':
        return (function (e) {
          return e.value
        })(e)
      case 'Name':
        return (function (e, n) {
          for (var r, t = e.value, a = 0, u = n; a < u.length; a++) {
            var i = u[a][t]
            if (i) return i.value
          }
          if (Le.normalExpressions[t]) {
            return ((r = {})[c] = !0), (r.type = 'builtin'), (r.builtin = t), r
          }
          throw Error('Undefined identifier ' + t)
        })(e, n)
      case 'ReservedName':
        return (function (e) {
          return d(K[e.value]).value
        })(e)
      case 'NormalExpression':
        return (function (e, n) {
          var r,
            t = e.params.map(function (e) {
              return Ye(e, n)
            })
          if (
            (function (e) {
              return 'string' == typeof e.name
            })(e)
          ) {
            for (var a = 0, u = n; a < u.length; a++) {
              if (void 0 !== (i = null === (r = u[a][e.name]) || void 0 === r ? void 0 : r.value))
                try {
                  return Je(i, t, n)
                } catch (e) {
                  continue
                }
            }
            return (function (e, n, r) {
              return (0, d(Le.normalExpressions[e.name]).evaluate)(n, r, { executeFunction: Je })
            })(e, t, n)
          }
          var i = Ye(e.expression, n)
          return Je(i, t, n)
        })(e, n)
      case 'SpecialExpression':
        return (function (e, n) {
          return (0, d(Le.specialExpressions[e.name]).evaluate)(e, n, { evaluateAstNode: Ye, builtin: Le })
        })(e, n)
      default:
        throw Error(e.type + '-node cannot be evaluated')
    }
  }
  var Je = function (e, n, r) {
      if (O(e)) return We(e, n, r)
      if (Array.isArray(e))
        return (function (e, n) {
          if (1 !== n.length) throw Error('Array as function requires one non negative integer parameter')
          var r = n[0]
          return g(r), X(e[r])
        })(e, n)
      if (q(e))
        return (function (e, n) {
          if (1 !== n.length) throw Error('Object as function requires one string parameter')
          var r = n[0]
          return E(r), X(e[r])
        })(e, n)
      if (x(e))
        return (function (e, n) {
          if (1 !== n.length) throw Error('String as function requires one Obj parameter')
          var r = X(n[0])
          if (q(r)) return X(r[e])
          if ($(r)) return X(e[r])
          throw Error('string as function expects Obj or integer parameter, got ' + r)
        })(e, n)
      if (L(e))
        return (function (e, n) {
          if ((y(e), 1 !== n.length)) throw Error('String as function requires one Arr parameter')
          var r = n[0]
          return C(r), X(r[e])
        })(e, n)
      throw Error('Expected function, got ' + e)
    },
    We = function (e, n, r) {
      var i, o, l
      switch (e.type) {
        case 'user-defined':
          for (
            var f = e.arguments,
              c = f.mandatoryArguments.length,
              v = f.optionalArguments.length,
              s = f.restArgument ? null : c + v;
            ;

          ) {
            var m = t({}, e.functionContext)
            if (n.length < f.mandatoryArguments.length)
              throw Error(
                'Function ' +
                  (null !== (i = e.name) && void 0 !== i ? i : '(fn)') +
                  ' requires at least ' +
                  f.mandatoryArguments.length +
                  ' arguments. Got ' +
                  n.length,
              )
            if (null !== s && n.length > s)
              throw Error(
                'Function "' +
                  (null !== (o = e.name) && void 0 !== o ? o : 'λ') +
                  '" requires at most ' +
                  s +
                  ' arguments. Got ' +
                  n.length,
              )
            for (
              var h = Math.max(n.length, f.mandatoryArguments.length + f.optionalArguments.length), g = [], y = 0;
              y < h;
              y += 1
            )
              if (y < c) {
                var b = p(n[y])
                m[w(f.mandatoryArguments[y])] = { value: b }
              } else if (y < c + v) {
                var x = d(f.optionalArguments[y - c])
                b = y < n.length ? p(n[y]) : null !== (l = x.defaultValue) && void 0 !== l ? l : null
                m[x.name] = { value: b }
              } else g.push(p(n[y]))
            f.restArgument && (m[f.restArgument] = { value: g })
            try {
              for (var E = null, A = 0, N = e.body; A < N.length; A++) {
                var M = N[A]
                E = Ye(M, a([m], r))
              }
              return E
            } catch (e) {
              if (e instanceof u) {
                n = e.params
                continue
              }
              throw e
            }
          }
        case 'partial':
          return Je(e.fn, a(a([], e.params), n), r)
        case 'comp':
          var j = e.fns
          if (0 === j.length) {
            if (1 !== n.length) throw Error('(comp) expects one argument, got ' + n.length)
            return p(n[0])
          }
          return p(
            j.reduceRight(function (e, n) {
              return [Je(X(n), e, r)]
            }, n)[0],
          )
        case 'constantly':
          return e.value
        case 'juxt':
          return e.fns.map(function (e) {
            return Je(X(e), n, r)
          })
        case 'complement':
          return !Je(e.fn, n, r)
        case 'every-pred':
          for (var k = 0, O = e.fns; k < O.length; k++)
            for (var S = O[k], T = 0, I = n; T < I.length; T++) {
              b = I[T]
              if (!(E = Je(X(S), [b], r))) return !1
            }
          return !0
        case 'some-pred':
          for (var F = 0, P = e.fns; F < P.length; F++) {
            S = P[F]
            for (var R = 0, _ = n; R < _.length; R++) {
              b = _[R]
              if ((E = Je(X(S), [b], r))) return !0
            }
          }
          return !1
        default:
          return d(Be[e.builtin]).evaluate(n, r, { executeFunction: Je })
      }
    }
  var Xe = function (e, n) {
      for (var r, t, a = d(e[n]), u = []; 'paren' !== a.type || (')' !== a.value && ']' !== a.value); )
        (n = (r = tn(e, n))[0]), (t = r[1]), u.push(t), (a = d(e[n]))
      return [n, u]
    },
    He = function (e, n) {
      var r = d(e[(n += 1)])
      return 'name' === r.type && Le.specialExpressions[r.value] ? rn(e, n) : nn(e, n)
    },
    Ke = /^%([1-9][0-9]?$)/,
    Ze = function (e, n) {
      var r = d(e[n])
      if ('name' === r.type) return [n + 1, { type: 'Argument', name: r.value }]
      if ('paren' === r.type && '(' === r.value) {
        if ('name' !== (r = d(e[(n += 1)])).type) throw new l('name', r)
        var t = r.value,
          a = tn(e, (n += 1)),
          u = a[0],
          i = a[1]
        if ('paren' !== (r = d(e[u])).type || ')' !== r.value) throw new l(')', r)
        return [u + 1, { type: 'Argument', name: t, defaultValue: i }]
      }
      if ('modifier' === r.type) return [n + 1, { type: 'Modifier', value: r.value }]
      throw new l('"(", name or modifier', r)
    },
    Qe = function (e, n) {
      var r,
        t = d(e[n])
      if ('paren' !== t.type || '[' !== t.value) throw new l('[', t)
      t = d(e[(n += 1)])
      for (var a, u = []; 'paren' !== t.type || ']' !== t.value; )
        (n = (r = en(e, n))[0]), (a = r[1]), u.push(a), (t = d(e[n]))
      return [(n += 1), u]
    }
  function en(e, n) {
    var r,
      t = d(e[n])
    if ('name' !== t.type) throw Error('Expected name node in binding, got ' + t.type + ' value=' + t.value)
    var a = t.value
    return (t = d(e[(n += 1)])), [(n = (r = tn(e, n))[0]), { type: 'Binding', name: a, value: r[1] }]
  }
  var nn = function (e, n) {
      var r,
        t,
        a,
        u = tn(e, n),
        i = u[0],
        o = u[1]
      if (
        ((n = (r = Xe(e, i))[0]),
        (a = r[1]),
        (n += 1),
        (function (e) {
          return (
            'NormalExpression' === e.type ||
            'SpecialExpression' === e.type ||
            'Number' === e.type ||
            'String' === e.type
          )
        })(o))
      )
        return [n, { type: 'NormalExpression', expression: o, params: a }]
      s(o)
      var l = { type: 'NormalExpression', name: o.value, params: a },
        f = Le.normalExpressions[l.name]
      return f && (null === (t = f.validate) || void 0 === t || t.call(f, l)), [n, l]
    },
    rn = function (e, n) {
      var r = d(e[n]).value
      n += 1
      var t = d(Le.specialExpressions[r]),
        a = t.parse,
        u = t.validate,
        i = a(e, n, { parseExpression: He, parseTokens: Xe, parseToken: tn, parseBindings: Qe, parseArgument: Ze }),
        o = i[0],
        l = i[1]
      return null == u || u(l), [o, l]
    },
    tn = function (e, n) {
      var r = d(e[n]),
        t = void 0
      switch (r.type) {
        case 'number':
          t = (function (e, n) {
            var r = d(e[n])
            return [n + 1, { type: 'Number', value: Number(r.value) }]
          })(e, n)
          break
        case 'string':
          t = (function (e, n) {
            return [n + 1, { type: 'String', value: d(e[n]).value }]
          })(e, n)
          break
        case 'name':
          t = (function (e, n) {
            return [n + 1, { type: 'Name', value: d(e[n]).value }]
          })(e, n)
          break
        case 'reservedName':
          t = (function (e, n) {
            return [n + 1, { type: 'ReservedName', value: d(e[n]).value }]
          })(e, n)
          break
        case 'paren':
          '(' === r.value
            ? (t = He(e, n))
            : '[' === r.value
            ? (t = (function (e, n) {
                for (var r, t, a = d(e[(n += 1)]), u = []; 'paren' !== a.type || ']' !== a.value; )
                  (n = (r = tn(e, n))[0]), (t = r[1]), u.push(t), (a = d(e[n]))
                return [(n += 1), { type: 'NormalExpression', name: 'array', params: u }]
              })(e, n))
            : '{' === r.value &&
              (t = (function (e, n) {
                for (var r, t, a = d(e[(n += 1)]), u = []; 'paren' !== a.type || '}' !== a.value; )
                  (n = (r = tn(e, n))[0]), (t = r[1]), u.push(t), (a = d(e[n]))
                n += 1
                var i = { type: 'NormalExpression', name: 'object', params: u }
                return k(i), [n, i]
              })(e, n))
          break
        case 'regexpShorthand':
          t = (function (e, n) {
            return [
              n + 1,
              { type: 'NormalExpression', name: 'regexp', params: [{ type: 'String', value: d(e[n]).value }] },
            ]
          })(e, n)
          break
        case 'fnShorthand':
          t = (function (e, n) {
            for (var r = nn(e, (n += 2)), t = r[0], a = r[1], u = 0, i = n + 1; i < t - 1; i += 1) {
              var o = d(e[i])
              if ('name' === o.type) {
                var l = Ke.exec(o.value)
                if (l && (u = Math.max(u, Number(l[1]))) > 20) throw Error("Can't specify more than 20 arguments")
              }
              if ('fnShorthand' === o.type) throw Error('Nested shortcut functions are not allowed')
            }
            for (var f = [], c = 1; c <= u; c += 1) f.push('%' + c)
            return [
              t,
              {
                type: 'SpecialExpression',
                name: 'fn',
                params: [],
                arguments: { bindings: [], mandatoryArguments: f, optionalArguments: [] },
                body: [a],
              },
            ]
          })(e, n)
      }
      if (!t) throw SyntaxError('Unrecognized token: ' + r.type + ' value=' + r.value)
      return t
    }
  var an = /[%0-9a-zA-Z_^?=!$%<>.+*/-]/,
    un = /\s|,/,
    on = function (e, n) {
      if ('"' !== e[n]) return [0, void 0]
      for (var r = '', t = 1, a = e[n + t], u = !1; '"' !== a || u; ) {
        if (void 0 === a) throw new SyntaxError('Unclosed string at position ' + n)
        u ? ((u = !1), '"' === a || '\\' === a || (r += '\\'), (r += a)) : '\\' === a ? (u = !0) : (r += a),
          (a = e[n + (t += 1)])
      }
      return [t + 1, { type: 'string', value: r }]
    },
    ln = /\s|[)\]},]/,
    fn = /[0-9]/,
    cn = /[0-7]/,
    vn = /[0-9a-fA-F]/,
    sn = /[0-1]/,
    pn = /[0-9.-]/
  function dn(e, n, r, t) {
    return n === r[t] ? [1, { type: e, value: n }] : [0, void 0]
  }
  var mn = [
    function (e, n) {
      if (';' === e[n]) {
        for (var r = 1; '\n' !== e[n + r] && n + r < e.length; ) r += 1
        return '\n' === e[n + r] && n + r < e.length && (r += 1), [r, void 0]
      }
      return [0, void 0]
    },
    function (e, n) {
      var r
      return un.test(null !== (r = e[n]) && void 0 !== r ? r : '') ? [1, void 0] : [0, void 0]
    },
    function (e, n) {
      return dn('paren', '(', e, n)
    },
    function (e, n) {
      return dn('paren', ')', e, n)
    },
    function (e, n) {
      return dn('paren', '[', e, n)
    },
    function (e, n) {
      return dn('paren', ']', e, n)
    },
    function (e, n) {
      return dn('paren', '{', e, n)
    },
    function (e, n) {
      return dn('paren', '}', e, n)
    },
    on,
    function (e, n) {
      var r = 'decimal',
        t = e[n]
      if (void 0 === t) return [0, void 0]
      var a,
        u = '.' === t
      if (!pn.test(t)) return [0, void 0]
      for (a = n + 1; a < e.length; a += 1) {
        var i = d(e[a])
        if (ln.test(i)) break
        if (a === n + 1 && '0' === t) {
          if ('b' === i || 'B' === i) {
            r = 'binary'
            continue
          }
          if ('o' === i || 'O' === i) {
            r = 'octal'
            continue
          }
          if ('x' === i || 'X' === i) {
            r = 'hex'
            continue
          }
        }
        if ('decimal' === r && u) {
          if (!fn.test(i)) return [0, void 0]
        } else if ('binary' === r) {
          if (!sn.test(i)) return [0, void 0]
        } else if ('octal' === r) {
          if (!cn.test(i)) return [0, void 0]
        } else if ('hex' === r) {
          if (!vn.test(i)) return [0, void 0]
        } else {
          if ('.' === i) {
            u = !0
            continue
          }
          if (!fn.test(i)) return [0, void 0]
        }
      }
      var o = a - n,
        l = e.substring(n, a)
      return ('decimal' !== r && o <= 2) || '.' === l || '-' === l ? [0, void 0] : [o, { type: 'number', value: l }]
    },
    function (e, n) {
      for (var r = 0, t = Object.keys(K); r < t.length; r++) {
        var a = t[r],
          u = a.length,
          i = e[n + u]
        if ((!i || !an.test(i)) && e.substr(n, u) === a) return [u, { type: 'reservedName', value: a }]
      }
      return [0, void 0]
    },
    function (e, n) {
      return (function (e, n, r, t) {
        var a = r[t],
          u = 0,
          i = ''
        if (!a || !n.test(a)) return [0, void 0]
        for (; a && n.test(a); ) (i += a), (a = r[t + (u += 1)])
        return [u, { type: e, value: i }]
      })('name', an, e, n)
    },
    function (e, n) {
      return '&rest' === e.substr(n, 5)
        ? [5, { type: 'modifier', value: '&rest' }]
        : '&opt' === e.substr(n, 4)
        ? [4, { type: 'modifier', value: '&opt' }]
        : '&bind' === e.substr(n, 5)
        ? [5, { type: 'modifier', value: '&bind' }]
        : [0, void 0]
    },
    function (e, n) {
      if ('#' !== e[n]) return [0, void 0]
      var r = on(e, n + 1),
        t = r[0],
        a = r[1]
      return a ? [t + 1, { type: 'regexpShorthand', value: a.value }] : [0, void 0]
    },
    function (e, n) {
      return '#(' !== e.slice(n, n + 2) ? [0, void 0] : [1, { type: 'fnShorthand', value: '#' }]
    },
  ]
  var hn = (function () {
    function e() {
      this.importScope = {}
    }
    return (
      (e.prototype.tokenize = function (e) {
        return (function (e) {
          for (var n = [], r = 0, t = !1; r < e.length; ) {
            t = !1
            for (var a = 0, u = mn; a < u.length; a++) {
              var i = (0, u[a])(e, r),
                o = i[0],
                l = i[1]
              if (o > 0 && ((t = !0), (r += o), l)) {
                n.push(l)
                break
              }
            }
            if (!t) throw new SyntaxError('Unrecognized character at position ' + r + ": '" + e[r] + "'")
          }
          return n
        })(e)
      }),
      (e.prototype.parse = function (e) {
        return (function (e) {
          for (var n, r, t = { type: 'Program', body: [] }, a = 0; a < e.length; )
            (a = (n = tn(e, a))[0]), (r = n[1]), t.body.push(r)
          return t
        })(e)
      }),
      (e.prototype.evaluate = function (e, n) {
        void 0 === n && (n = {})
        var r = n.globalContext || {}
        return (
          n.vars &&
            Object.entries(n.vars).forEach(function (e) {
              var n = e[0],
                t = e[1]
              r[n] = { value: X(t) }
            }),
          Ge(e, r, this.importScope)
        )
      }),
      (e.prototype.run = function (e, n) {
        var r = this.tokenize(e),
          t = this.parse(r)
        return this.evaluate(t, n)
      }),
      (e.prototype.import = function (e) {
        var n = this.tokenize(e),
          r = {}
        Ge(this.parse(n), r, {})
        for (var t = Object.keys(this.importScope), a = 0, u = Object.keys(r); a < u.length; a++) {
          var i = u[a]
          if (t.includes(i)) throw Error('Import faild, imported function/variable already exists: "' + i + '"')
          Q(i, [{}, {}], Le)
        }
        Object.assign(this.importScope, r)
      }),
      e
    )
  })()
  return (
    (e.Lispish = hn),
    (e.isLispishFunction = O),
    (e.normalExpressionKeys = $e),
    (e.reservedNames = Z),
    (e.specialExpressionKeys = ze),
    Object.defineProperty(e, '__esModule', { value: !0 }),
    e
  )
})({})
//# sourceMappingURL=lispish.iife.js.map
