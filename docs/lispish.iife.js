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
    ***************************************************************************** */ var r = function (e, t) {
    return (
      (r =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (e, r) {
            e.__proto__ = r
          }) ||
        function (e, r) {
          for (var t in r) Object.prototype.hasOwnProperty.call(r, t) && (e[t] = r[t])
        }),
      r(e, t)
    )
  }
  function t(e, t) {
    if ('function' != typeof t && null !== t)
      throw new TypeError('Class extends value ' + String(t) + ' is not a constructor or null')
    function n() {
      this.constructor = e
    }
    r(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()))
  }
  var n = function () {
    return (
      (n =
        Object.assign ||
        function (e) {
          for (var r, t = 1, n = arguments.length; t < n; t++)
            for (var a in (r = arguments[t])) Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a])
          return e
        }),
      n.apply(this, arguments)
    )
  }
  function a(e, r) {
    for (var t = 0, n = r.length, a = e.length; t < n; t++, a++) e[a] = r[t]
    return e
  }
  var u = (function (e) {
      function r(t, n) {
        var a = e.call(this, 'return-from block "' + t + '" with value: ' + n) || this
        return Object.setPrototypeOf(a, r.prototype), (a.name = 'ReturnFromSignal'), (a.blockName = t), (a.value = n), a
      }
      return t(r, e), r
    })(Error),
    o = (function (e) {
      function r(t) {
        var n = e.call(this, 'return with value: ' + t) || this
        return Object.setPrototypeOf(n, r.prototype), (n.name = 'ReturnSignal'), (n.value = t), n
      }
      return t(r, e), r
    })(Error),
    i = (function (e) {
      function r(t) {
        var n = e.call(this, t) || this
        return Object.setPrototypeOf(n, r.prototype), (n.name = 'UserDefinedError'), n
      }
      return t(r, e), r
    })(Error),
    l = (function (e) {
      function r(t, n) {
        var a = e.call(this, 'Expected a "' + t + '" token, got Token[' + n.type + ':"' + n.value + '"]') || this
        return Object.setPrototypeOf(a, r.prototype), (a.name = 'UnexpectedTokenError'), a
      }
      return t(r, e), r
    })(Error),
    c = (function (e) {
      function r(t, n) {
        var a = e.call(this, 'Expected a ' + t + ' node, got ' + (n ? 'a ' + n.type + ' node' : 'undefined')) || this
        return Object.setPrototypeOf(a, r.prototype), (a.name = 'UnexpectedNodeTypeError'), a
      }
      return t(r, e), r
    })(Error),
    v = Symbol('function')
  function f(e) {
    if (void 0 === e) throw Error('Expected an AST node, got undefined')
    return e
  }
  function s(e) {
    if (void 0 === e || 'Name' !== e.type) throw new c('Name', e)
  }
  function p(e, r) {
    if ((void 0 === r && (r = 'Unexpected end of input'), void 0 === e)) throw Error(r)
    return e
  }
  function d(e, r) {
    if ((void 0 === r && (r = 'Unexpected end of input'), void 0 === e)) throw Error(r)
  }
  function m(e) {
    if ('number' != typeof e || !isFinite(e)) throw TypeError('Expected number, got: ' + e + ' type="' + typeof e + '"')
  }
  function h(e) {
    return m(e), e
  }
  function g(e) {
    if ((m(e), e <= 0)) throw TypeError('Expected positive number, got ' + e)
  }
  function y(e) {
    if ((m(e), e < 0)) throw TypeError('Expected non negative number, got ' + e)
  }
  function b(e) {
    if ((m(e), !Number.isInteger(e))) throw TypeError('Expected integer, got ' + e)
  }
  function E(e) {
    if ('string' != typeof e) throw TypeError('Expected string, got: ' + e + ' type="' + typeof e + '"')
  }
  function w(e) {
    if (!(e instanceof RegExp)) throw TypeError('Expected RegExp, got: ' + e + ' type="' + typeof e + '"')
  }
  function x(e) {
    if (!Array.isArray(e)) throw TypeError('Expected array, got: ' + e + ' type="' + typeof e + '"')
  }
  function k(e) {
    if (null === e || 'object' != typeof e || Array.isArray(e) || e instanceof RegExp || S(e))
      throw TypeError('Expected object, got: ' + e + ' type="' + typeof e + '"')
  }
  function N(e) {
    if ((m(e), 0 === e)) throw TypeError('Expected non zero value')
  }
  function A(e, r) {
    var t = r.params.length
    if ('number' == typeof e) {
      if (t !== e) throw Error('Wrong number of arguments to "' + r.name + '", expected ' + e + ', got ' + t)
    } else {
      var n = e.min,
        a = e.max
      if (void 0 === n && void 0 === a) throw Error('Min or max must be specified')
      if ('number' == typeof n && t < n)
        throw Error('Wrong number of arguments to "' + r.name + '", expected at least ' + n + ', got ' + t)
      if ('number' == typeof a && t > a)
        throw Error('Wrong number of arguments to "' + r.name + '", expected at most ' + a + ', got ' + t)
    }
  }
  function S(e) {
    return null !== e && 'object' == typeof e && !!e[v]
  }
  function j(e) {
    if (null === e || 'object' != typeof e) throw Error('Expected lispish function, got ' + e)
    if (!e[v]) throw Error('Expected lispish function, got ' + JSON.stringify(e))
  }
  function M(e) {
    return !!S(e) && !!e.arguments
  }
  var O = {
    parse: function (e, r, t) {
      var n = t.parseToken,
        a = p(e[r])
      if ('name' !== a.type) throw new l('name', a)
      r += 1
      var u = { type: 'SpecialExpression', name: 'block', blockName: a.value, params: [] }
      for (a = p(e[r]); 'paren' !== a.type || ')' !== a.value; ) {
        var o = n(e, r),
          i = o[0],
          c = o[1]
        u.params.push(c), (a = p(e[(r = i)]))
      }
      return [r + 1, u]
    },
    evaluate: function (e, r, t) {
      var n,
        o = a([{}], r)
      try {
        for (var i = 0, l = e.params; i < l.length; i++) {
          n = t(l[i], o)
        }
        return n
      } catch (r) {
        if (r instanceof u && e.blockName === r.blockName) return r.value
        throw r
      }
    },
    validate: function (e) {
      return A({ min: 1 }, e)
    },
  }
  var T = {
    parse: function (e, r, t) {
      var n = (function (e, r, t) {
        for (var n = [], a = p(e[r]); 'paren' !== a.type || ')' !== a.value; ) {
          if ('paren' !== a.type || '(' !== a.value)
            throw Error('Expected a condition starting with "(", got ' + a.type + ':' + a.value)
          var u = t(e, r + 1),
            o = u[0],
            i = u[1],
            l = []
          for (a = p(e[(r = o)]); 'paren' !== a.type || ')' !== a.value; ) {
            var c = t(e, r),
              v = c[0],
              f = c[1]
            l.push(f), (a = p(e[(r = v)]))
          }
          n.push({ test: i, body: l }), (a = p(e[(r += 1)]))
        }
        return [r, n]
      })(e, r, t.parseToken)
      return [n[0] + 1, { type: 'SpecialExpression', name: 'cond', conditions: n[1], params: [] }]
    },
    evaluate: function (e, r, t) {
      for (var n, a = 0, u = e.conditions; a < u.length; a++) {
        var o = u[a]
        if ((n = t(o.test, r))) {
          for (var i = 0, l = o.body; i < l.length; i++) {
            n = t(l[i], r)
          }
          return n
        }
      }
    },
  }
  function P(e, r, t) {
    for (var n = [], a = p(e[(r += 1)]); 'paren' !== a.type || ')' !== a.value; ) {
      if ('paren' !== a.type || '(' !== a.value)
        throw SyntaxError('Invalid token "' + a.type + '" value=' + a.value + ', expected an expression')
      var u = t(e, r),
        o = u[0],
        i = u[1]
      ;(r = o), n.push(i), (a = p(e[r]))
    }
    return [(r += 1), n]
  }
  function F(e) {
    return function (r, t, n) {
      var a,
        u = n.parseToken,
        o = n.parseArgument,
        i = n.parseBinding,
        v = void 0
      if (('defn' === e || 'defns' === e) && ((t = (a = u(r, t))[0]), (v = a[1]), 'defn' === e && 'Name' !== v.type))
        throw new c('Name', v)
      var f = p(r[t])
      if ('paren' !== f.type || '(' !== f.value) throw new l(')', f)
      var s = (function (e, r, t, n) {
          for (
            var a, u = [], o = void 0, i = [], l = [], c = {}, v = 'mandatory', f = p(e[r]);
            'paren' !== f.type || ')' !== f.value;

          ) {
            if ('bind' === v) {
              ;(r = (a = P(e, r, n))[0]), (u = a[1])
              break
            }
            var s = t(e, r),
              d = s[0],
              m = s[1]
            if (((f = p(e[(r = d)])), 'Modifier' === m.type))
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
                  if ('rest' === v && !o) throw Error('No rest argument was spcified')
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
                    i.push(m.name)
                    break
                  case 'optional':
                    l.push({ name: m.name, defaultValue: void 0 })
                    break
                  case 'rest':
                    if (void 0 !== o) throw Error('Can only specify one rest argument')
                    o = m.name
                }
            }
          }
          if ('rest' === v && void 0 === o) throw Error('Missing rest argument name')
          if ('optional' === v && 0 === l.length) throw Error('No optional arguments where spcified')
          return [(r += 1), { mandatoryArguments: i, optionalArguments: l, restArgument: o, bindings: u }]
        })(r, (t += 1), o, i),
        d = s[0],
        m = s[1]
      f = p(r[(t = d)])
      for (var h = []; 'paren' !== f.type || ')' !== f.value; ) {
        var g = u(r, t),
          y = g[0],
          b = g[1]
        h.push(b), (f = p(r[(t = y)]))
      }
      if (0 === h.length) throw Error('Missing body in special expression "defn"')
      return (
        (t += 1),
        'defn' === e || 'defns' === e
          ? [t, { type: 'SpecialExpression', name: e, functionName: v, params: [], arguments: m, body: h }]
          : [t, { type: 'SpecialExpression', name: e, params: [], arguments: m, body: h }]
      )
    }
  }
  function I(e) {
    return function (r, t, n) {
      for (
        var a,
          u = (function (e, r, t, n) {
            if ('defn' === e) {
              var a = r.functionName.value
              return E(a), a
            }
            if ('defns' === e) {
              var u = n(r.functionName, t)
              return E(u), u
            }
          })(e, r, t, n),
          o = {},
          i = 0,
          l = r.arguments.bindings;
        i < l.length;
        i++
      ) {
        var c = l[i],
          f = c.value,
          s = n(f, t)
        o[c.name] = { value: s, constant: !1 }
      }
      var d = r.arguments.optionalArguments.map(function (e) {
          var r = e.name,
            a = e.defaultValue
          return a ? { name: r, defaultValue: n(a, t) } : { name: r }
        }),
        m =
          (((a = {})[v] = !0),
          (a.name = u),
          (a.arguments = {
            mandatoryArguments: r.arguments.mandatoryArguments,
            restArgument: r.arguments.restArgument,
            optionalArguments: d,
          }),
          (a.body = r.body),
          (a.functionContext = o),
          a)
      if ('fn' === e) return m
      p(t[t.length - 2], 'Could not find global scope')[u] = { value: m, constant: !1 }
    }
  }
  var L = { parse: F('defn'), evaluate: I('defn') },
    C = { parse: F('defns'), evaluate: I('defns') },
    R = { parse: F('fn'), evaluate: I('fn') },
    U = {
      parse: function (e, r, t) {
        var n,
          a,
          u,
          o,
          i,
          c,
          v = t.parseToken,
          f = p(e[r])
        if ('paren' !== f.type || '(' !== f.value) throw new l('(', f)
        ;(r = (n = v(e, (r += 1)))[0]), s((i = n[1])), (r = (a = v(e, r))[0]), (c = a[1])
        var d = void 0
        ;('paren' === (f = p(e[r])).type && ')' === f.value) || ((r = (u = v(e, r))[0]), (d = u[1]))
        var m = { type: 'SpecialExpression', name: 'doarray', params: [], varName: i, result: d, array: c }
        for (f = p(e[(r += 1)]); 'paren' !== f.type || ')' !== f.value; ) {
          var h
          ;(r = (o = v(e, r))[0]), (h = o[1]), m.params.push(h), (f = p(e[r]))
        }
        return [r + 1, m]
      },
      evaluate: function (e, r, t) {
        var n,
          u = t(e.array, r)
        x(u)
        var i = e.varName.value,
          l = (((n = {})[i] = { value: void 0, constant: !1 }), n),
          c = a([l], r)
        try {
          for (; u.length > 0; ) {
            var v = u.shift()
            l[i] = { value: v, constant: !1 }
            for (var f = 0, s = e.params; f < s.length; f++) {
              t(s[f], c)
            }
          }
        } catch (e) {
          if (e instanceof o) return e.value
          throw e
        }
        if (e.result) return (l[i] = { value: void 0, constant: !1 }), t(e.result, c)
      },
    },
    _ = {
      parse: function (e, r, t) {
        var n,
          a,
          u,
          o,
          i,
          l,
          c = t.parseToken,
          v = p(e[r])
        if ('paren' !== v.type || '(' !== v.value) throw Error('Expected "(", got ' + v.type + ': ' + v.value)
        ;(r = (n = c(e, (r += 1)))[0]), s((i = n[1])), (r = (a = c(e, r))[0]), (l = a[1])
        var f = void 0
        ;('paren' === (v = p(e[r])).type && ')' === v.value) || ((r = (u = c(e, r))[0]), (f = u[1]))
        var d = { type: 'SpecialExpression', name: 'dotimes', params: [], varName: i, result: f, count: l }
        for (v = p(e[(r += 1)]); 'paren' !== v.type || ')' !== v.value; ) {
          var m
          ;(r = (o = c(e, r))[0]), (m = o[1]), d.params.push(m), (v = p(e[r]))
        }
        return [r + 1, d]
      },
      evaluate: function (e, r, t) {
        var n,
          u = t(e.count, r)
        b(u), y(u)
        var i = e.varName.value,
          l = (((n = {})[i] = { value: void 0, constant: !1 }), n),
          c = a([l], r)
        try {
          var v = void 0
          for (v = 0; v < u; v += 1) {
            l[i] = { value: v, constant: !1 }
            for (var f = 0, s = e.params; f < s.length; f++) {
              t(s[f], c)
            }
          }
          if (!e.result) return
          return (l[i] = { value: v, constant: !1 }), t(e.result, c)
        } catch (e) {
          if (e instanceof o) return e.value
          throw e
        }
      },
    },
    V = {
      parse: function (e, r, t) {
        var n = (0, t.parseParams)(e, r)
        return [n[0] + 1, { type: 'SpecialExpression', name: 'if', params: n[1] }]
      },
      evaluate: function (e, r, t) {
        var n = e.params,
          a = n[0],
          u = n[1],
          o = n[2],
          i = t(f(a), r) ? f(u) : f(o)
        return t(i, r)
      },
      validate: function (e) {
        return A(3, e)
      },
    },
    $ = {
      parse: function (e, r, t) {
        var n = t.parseBinding,
          a = t.parseParams,
          u = { type: 'SpecialExpression', name: 'let', params: [], bindings: [] },
          o = p(e[r])
        if ('paren' !== o.type || '(' !== o.value)
          throw SyntaxError('Invalid token "' + o.type + '" value=' + o.value + ', expected array of bindings')
        for (r += 1; 'paren' !== o.type || ')' !== o.value; ) {
          if ('paren' !== o.type || '(' !== o.value)
            throw SyntaxError('Invalid token "' + o.type + '" value=' + o.value + ', expected an expression')
          var i = n(e, r),
            l = i[0],
            c = i[1]
          ;(r = l), u.bindings.push(c), (o = p(e[r]))
        }
        var v = a(e, (r += 1)),
          f = v[0],
          s = v[1]
        return (u.params = s), [f + 1, u]
      },
      evaluate: function (e, r, t) {
        for (var n = {}, u = 0, o = e.bindings; u < o.length; u++) {
          var i = o[u],
            l = t(i.value, r)
          if (S(l)) throw Error('Cannot bind function in let expression')
          n[i.name] = { value: l, constant: !1 }
        }
        for (var c, v = a([n], r), f = 0, s = e.params; f < s.length; f++) {
          c = t(s[f], v)
        }
        return c
      },
    },
    z = {
      parse: function (e, r, t) {
        for (
          var n = t.parseToken, a = { type: 'SpecialExpression', name: 'loop', params: [] }, u = p(e[r]);
          'paren' !== u.type || ')' !== u.value;

        ) {
          var o = n(e, r),
            i = o[0],
            l = o[1]
          a.params.push(l), (u = p(e[(r = i)]))
        }
        return [r + 1, a]
      },
      evaluate: function (e, r, t) {
        try {
          for (;;)
            for (var n = 0, a = e.params; n < a.length; n++) {
              t(a[n], r)
            }
        } catch (e) {
          if (e instanceof o) return e.value
          throw e
        }
      },
      validate: function (e) {
        return A({ min: 1 }, e)
      },
    },
    q = {
      parse: function (e, r, t) {
        for (
          var n = t.parseToken, a = { type: 'SpecialExpression', name: 'do', params: [] }, u = p(e[r]);
          'paren' !== u.type || ')' !== u.value;

        ) {
          var o = n(e, r),
            i = o[0],
            l = o[1]
          a.params.push(l), (u = p(e[(r = i)]))
        }
        return [r + 1, a]
      },
      evaluate: function (e, r, t) {
        for (var n, u = a([{}], r), o = 0, i = e.params; o < i.length; o++) {
          n = t(i[o], u)
        }
        return n
      },
    },
    B = {
      parse: function (e, r, t) {
        var n = t.parseToken,
          a = p(e[r])
        if ('name' !== a.type) throw new l('name', a)
        var u = { type: 'SpecialExpression', name: 'return-from', blockName: a.value, params: [] },
          o = n(e, (r += 1)),
          i = o[0],
          c = o[1]
        return u.params.push(c), [i + 1, u]
      },
      evaluate: function (e, r, t) {
        var n = t(f(e.params[0]), r)
        throw new u(e.blockName, n)
      },
      validate: function (e) {
        return A(1, e)
      },
    },
    D = {
      parse: function (e, r, t) {
        var n = { type: 'SpecialExpression', name: 'return', params: [] },
          a = (0, t.parseToken)(e, r),
          u = a[0],
          o = a[1]
        return n.params.push(o), [u + 1, n]
      },
      evaluate: function (e, r, t) {
        var n = t(f(e.params[0]), r)
        throw new o(n)
      },
      validate: function (e) {
        return A(1, e)
      },
    }
  function G(e) {
    return function (r, t, n) {
      var a = (0, n.parseParams)(r, t),
        u = a[0],
        o = a[1]
      return s(o[0]), [u + 1, { type: 'SpecialExpression', name: e, params: o }]
    }
  }
  function W(e) {
    return function (r, t, n) {
      var a = (0, n.parseParams)(r, t),
        u = a[0],
        o = a[1]
      return [u + 1, { type: 'SpecialExpression', name: e, params: o }]
    }
  }
  function J(e) {
    var r = 'const' === e
    return function (e, t, n) {
      var a,
        u = (function (e) {
          if (void 0 === e || 'Name' !== e.type) throw new c('Name', e)
          return e
        })(e.params[0]).value,
        o = n(f(e.params[1]), t),
        i = H(u, t, 'default'),
        l = i[0],
        v = i[1]
      if (null === (a = l[u]) || void 0 === a ? void 0 : a.constant)
        throw Error('Cannot change constant variable "' + u + '"')
      if (r && v) throw Error('Cannot change a non constant variable to constant: "' + u + '"')
      return (l[u] = { value: o, constant: r }), o
    }
  }
  function K(e) {
    var r = 'create-constant' === e || 'create-local-constant' === e || 'create-global-constant' === e,
      t =
        'create-local-constant' === e || 'create-local-variable' === e
          ? 'local'
          : 'create-global-constant' === e || 'create-global-variable' === e
          ? 'global'
          : 'default'
    return function (e, n, a) {
      var u,
        o = a(f(e.params[0]), n)
      E(o)
      var i = a(f(e.params[1]), n),
        l = H(o, n, t),
        c = l[0],
        v = l[1]
      if (null === (u = c[o]) || void 0 === u ? void 0 : u.constant)
        throw Error('Cannot change constant variable "' + o + '"')
      if (r && v) throw Error('Cannot change a non constant variable to constant: "' + o + '"')
      return (c[o] = { value: i, constant: r }), i
    }
  }
  function H(e, r, t) {
    var n = !1,
      a = void 0
    if ('local' === t) n = !!(a = p(r[0]))[e]
    else if ('global' === t) n = !!(a = p(r[r.length - 2]))[e]
    else {
      for (var u = 0; u < r.length - 1; u += 1)
        if (p(r[u])[e]) {
          ;(n = !0), (a = r[u])
          break
        }
      a || (a = p(r[r.length - 2], 'This cannot be'))
    }
    return [a, n]
  }
  var X = {
      parse: G('def'),
      evaluate: J('def'),
      validate: function (e) {
        return A(2, e)
      },
    },
    Z = {
      parse: G('const'),
      evaluate: J('const'),
      validate: function (e) {
        return A(2, e)
      },
    },
    Q = {
      parse: W('defns'),
      evaluate: K('defns'),
      validate: function (e) {
        return A(2, e)
      },
    },
    Y = {
      parse: W('create-local-variable'),
      evaluate: K('create-local-variable'),
      validate: function (e) {
        return A(2, e)
      },
    },
    ee = {
      parse: W('create-global-variable'),
      evaluate: K('create-global-variable'),
      validate: function (e) {
        return A(2, e)
      },
    },
    re = {
      parse: W('create-constant'),
      evaluate: K('create-constant'),
      validate: function (e) {
        return A(2, e)
      },
    },
    te = {
      parse: W('create-local-constant'),
      evaluate: K('create-local-constant'),
      validate: function (e) {
        return A(2, e)
      },
    },
    ne = {
      parse: W('create-global-constant'),
      evaluate: K('create-global-constant'),
      validate: function (e) {
        return A(2, e)
      },
    },
    ae = {
      parse: function (e, r, t) {
        var n = (0, t.parseToken)(e, r),
          a = n[0],
          u = n[1],
          o = p(e[(r = a)])
        if ('paren' !== o.type || ')' !== o.value) throw new l(')', o)
        return [(r += 1), { type: 'SpecialExpression', name: 'throw', params: [], messageNode: u }]
      },
      evaluate: function (e, r, t) {
        var n = (function (e) {
          if ('string' != typeof e || 0 === e.length)
            throw TypeError('Expected non empty string, got: ' + e + ' type="' + typeof e + '"')
          return e
        })(t(e.messageNode, r))
        throw new i(n)
      },
    },
    ue = {
      parse: function (e, r, t) {
        var n,
          a,
          u,
          o,
          i = t.parseToken
        ;(r = (n = i(e, r))[0]), (o = n[1])
        var v,
          f,
          s = p(e[r])
        if ('paren' !== s.type || '(' !== s.value) throw new l('(', s)
        if ('paren' !== (s = p(e[(r += 1)])).type || '(' !== s.value) throw new l('(', s)
        if (((r = (a = i(e, (r += 1)))[0]), 'Name' !== (v = a[1]).type)) throw new c('Name', v)
        if ('paren' !== (s = p(e[r])).type || ')' !== s.value) throw new l(')', s)
        if (((r = (u = i(e, (r += 1)))[0]), (f = u[1]), 'paren' !== (s = p(e[r])).type || ')' !== s.value))
          throw new l(')', s)
        if ('paren' !== (s = p(e[(r += 1)])).type || ')' !== s.value) throw new l(')', s)
        return [
          (r += 1),
          { type: 'SpecialExpression', name: 'try', params: [], tryExpression: o, catchExpression: f, error: v },
        ]
      },
      evaluate: function (e, r, t) {
        var n
        try {
          return t(e.tryExpression, r)
        } catch (l) {
          if (l instanceof u || l instanceof o) throw l
          var i = (((n = {})[e.error.value] = { value: l, constant: !1 }), n)
          return t(e.catchExpression, a([i], r))
        }
      },
    },
    oe = {
      parse: function (e, r, t) {
        var n = (0, t.parseParams)(e, r)
        return [n[0] + 1, { type: 'SpecialExpression', name: 'unless', params: n[1] }]
      },
      evaluate: function (e, r, t) {
        var n = e.params,
          a = n[0],
          u = n.slice(1)
        if ((d(a), !t(a, r))) {
          for (var o = void 0, i = 0, l = u; i < l.length; i++) {
            o = t(l[i], r)
          }
          return o
        }
      },
      validate: function (e) {
        return A({ min: 1 }, e)
      },
    },
    ie = {
      parse: function (e, r, t) {
        var n = (0, t.parseParams)(e, r)
        return [n[0] + 1, { type: 'SpecialExpression', name: 'when', params: n[1] }]
      },
      evaluate: function (e, r, t) {
        var n = e.params,
          a = n[0],
          u = n.slice(1)
        if ((d(a), t(a, r))) {
          for (var o = void 0, i = 0, l = u; i < l.length; i++) {
            o = t(l[i], r)
          }
          return o
        }
      },
      validate: function (e) {
        return A({ min: 1 }, e)
      },
    },
    le = {
      parse: function (e, r, t) {
        var n,
          a = t.parseToken
        r = (n = a(e, r))[0]
        for (
          var u = { type: 'SpecialExpression', name: 'while', params: [], whileExpression: n[1] }, o = p(e[r]);
          'paren' !== o.type || ')' !== o.value;

        ) {
          var i = a(e, r),
            l = i[0],
            c = i[1]
          u.params.push(c), (o = p(e[(r = l)]))
        }
        return [r + 1, u]
      },
      evaluate: function (e, r, t) {
        for (; t(e.whileExpression, r); )
          for (var n = 0, a = e.params; n < a.length; n++) {
            t(a[n], r)
          }
      },
    },
    ce = {
      append: {
        evaluate: function (e) {
          var r = e[0],
            t = e.slice(1)
          return (
            x(r),
            t.reduce(function (e, r) {
              return x(r), e.concat(r)
            }, r)
          )
        },
        validate: function (e) {
          return A({ min: 1 }, e)
        },
      },
      cons: {
        evaluate: function (e) {
          var r = e[0],
            t = e[1]
          return x(t), a([r], t)
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      at: {
        evaluate: function (e) {
          var r = e[0],
            t = e[1]
          return (
            (function (e) {
              if (!Array.isArray(e) && 'string' != typeof e)
                throw TypeError('Expected string or array, got: ' + e + ' type="' + typeof e + '"')
            })(r),
            b(t),
            r[t < 0 ? r.length + t : t]
          )
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      every: {
        evaluate: function (e, r, t) {
          var n = e[0],
            a = e[1],
            u = t.evaluateLispishFunction
          return (
            j(n),
            x(a),
            0 !== a.length &&
              a.every(function (e) {
                return u(n, [e], r)
              })
          )
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      filter: {
        evaluate: function (e, r, t) {
          var n = e[0],
            a = e[1],
            u = t.evaluateLispishFunction
          return (
            j(n),
            x(a),
            a.filter(function (e) {
              return u(n, [e], r)
            })
          )
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      find: {
        evaluate: function (e, r, t) {
          var n = e[0],
            a = e[1],
            u = t.evaluateLispishFunction
          return (
            j(n),
            x(a),
            a.find(function (e) {
              return u(n, [e], r)
            })
          )
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      first: {
        evaluate: function (e) {
          var r = e[0]
          return x(r), r[0]
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      includes: {
        evaluate: function (e) {
          var r = e[0],
            t = e[1]
          return x(t), t.includes(r)
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      last: {
        evaluate: function (e) {
          var r = e[0]
          return x(r), r[r.length - 1]
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      length: {
        evaluate: function (e) {
          var r = e[0]
          return x(r), r.length
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      array: {
        evaluate: function (e) {
          return e
        },
      },
      listf: {
        evaluate: function (e) {
          var r = e[0],
            t = e[1]
          b(r), g(r)
          for (var n = [], a = 0; a < r; a += 1) n.push(t)
          return n
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      map: {
        evaluate: function (e, r, t) {
          var n = t.evaluateLispishFunction,
            a = e[0],
            u = e[1]
          j(a), x(u)
          var o = u.length
          if (2 === e.length)
            return u.map(function (e) {
              return n(a, [e], r)
            })
          e.slice(2).forEach(function (e) {
            if ((x(e), o !== e.length)) throw Error('All array arguments to "map" must have the same length')
          })
          for (
            var i = [],
              l = function (t) {
                var u = e.slice(1).map(function (e) {
                  return e[t]
                })
                i.push(n(a, u, r))
              },
              c = 0;
            c < o;
            c += 1
          )
            l(c)
          return i
        },
        validate: function (e) {
          return A({ min: 2 }, e)
        },
      },
      pop: {
        evaluate: function (e) {
          var r = e[0]
          return x(r), r.pop()
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      position: {
        evaluate: function (e, r, t) {
          var n = e[0],
            a = e[1],
            u = t.evaluateLispishFunction
          j(n), x(a)
          var o = a.findIndex(function (e) {
            return u(n, [e], r)
          })
          return -1 !== o ? o : void 0
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      push: {
        evaluate: function (e) {
          var r = e[0],
            t = e.slice(1)
          return x(r), r.push.apply(r, t), r
        },
        validate: function (e) {
          return A({ min: 2 }, e)
        },
      },
      range: {
        evaluate: function (e) {
          var r,
            t,
            n,
            a = e[0],
            u = e[1],
            o = e[2]
          m(a),
            1 === e.length
              ? ((r = 0), (n = (t = a) >= 0 ? 1 : -1))
              : 2 === e.length
              ? (m(u), (n = (t = u) >= (r = a) ? 1 : -1))
              : (m(u),
                m(o),
                (n = o),
                (t = u) > (r = a)
                  ? g(n)
                  : t < r
                  ? (function (e) {
                      if ((m(e), e >= 0)) throw TypeError('Expected negative number, got ' + e)
                    })(n)
                  : N(n))
          for (var i = [], l = r; n < 0 ? l > t : l < t; l += n) i.push(l)
          return i
        },
        validate: function (e) {
          return A({ min: 1, max: 3 }, e)
        },
      },
      reduce: {
        evaluate: function (e, r, t) {
          var n = e[0],
            a = e[1],
            u = e[2],
            o = t.evaluateLispishFunction
          return (
            j(n),
            x(a),
            a.reduce(function (e, t) {
              return o(n, [e, t], r)
            }, u)
          )
        },
        validate: function (e) {
          return A(3, e)
        },
      },
      'reduce-right': {
        evaluate: function (e, r, t) {
          var n = e[0],
            a = e[1],
            u = e[2],
            o = t.evaluateLispishFunction
          return (
            j(n),
            x(a),
            a.reduceRight(function (e, t) {
              return o(n, [e, t], r)
            }, u)
          )
        },
        validate: function (e) {
          return A(3, e)
        },
      },
      rest: {
        evaluate: function (e) {
          var r = e[0]
          if ((x(r), !(r.length <= 1))) return r.slice(1)
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      reverse: {
        evaluate: function (e) {
          var r = e[0]
          return x(r), a([], r).reverse()
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      second: {
        evaluate: function (e) {
          var r = e[0]
          return x(r), r[1]
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      selt: {
        evaluate: function (e) {
          var r = e[0],
            t = e[1],
            n = e[2]
          return (
            x(r),
            y(t),
            (function (e, r) {
              if ((m(e), e >= r)) throw TypeError('Expected parameter (' + e + ') to be a number less than ' + r)
            })(t, r.length),
            (r[t] = n),
            r
          )
        },
        validate: function (e) {
          return A(3, e)
        },
      },
      shift: {
        evaluate: function (e) {
          var r = e[0]
          return x(r), r.shift()
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      slice: {
        evaluate: function (e) {
          var r = e[0],
            t = e[1],
            n = e[2]
          return x(r), 1 === e.length ? a([], r) : (b(t), 2 === e.length ? r.slice(t) : (b(n), r.slice(t, n)))
        },
        validate: function (e) {
          return A({ min: 1, max: 3 }, e)
        },
      },
      some: {
        evaluate: function (e, r, t) {
          var n = e[0],
            a = e[1],
            u = t.evaluateLispishFunction
          return (
            j(n),
            x(a),
            0 !== a.length &&
              a.some(function (e) {
                return u(n, [e], r)
              })
          )
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      sort: {
        evaluate: function (e, r, t) {
          var n = e[0],
            u = e[1],
            o = t.evaluateLispishFunction
          j(n), x(u)
          var i = a([], u)
          return (
            i.sort(function (e, t) {
              var a = o(n, [e, t], r)
              return m(a), a
            }),
            i
          )
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      splice: {
        evaluate: function (e) {
          var r = e[0],
            t = e[1],
            n = e[2],
            u = e.slice(3)
          return x(r), b(t), 2 === e.length ? r.splice(t) : (b(n), r.splice.apply(r, a([t, n], u)))
        },
        validate: function (e) {
          return A({ min: 2 }, e)
        },
      },
      take: {
        evaluate: function (e) {
          var r = e[0],
            t = e[1]
          return x(r), y(t), b(t), r.slice(0, t)
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      'take-while': {
        evaluate: function (e, r, t) {
          var n = e[0],
            a = e[1],
            u = t.evaluateLispishFunction
          x(a), j(n)
          for (var o = [], i = 0, l = a; i < l.length; i++) {
            var c = l[i]
            if (!u(n, [c], r)) break
            o.push(c)
          }
          return o
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      unshift: {
        evaluate: function (e) {
          var r = e[0],
            t = e.slice(1)
          return x(r), r.unshift.apply(r, t), r
        },
        validate: function (e) {
          return A({ min: 2 }, e)
        },
      },
    },
    ve = {
      '1+': {
        evaluate: function (e) {
          var r = e[0]
          return m(r), h(r + 1)
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      '1-': {
        evaluate: function (e) {
          var r = e[0]
          return m(r), h(r - 1)
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      '+': {
        evaluate: function (e) {
          return h(
            e.reduce(function (e, r) {
              return m(r), e + r
            }, 0),
          )
        },
      },
      '*': {
        evaluate: function (e) {
          return h(
            e.reduce(function (e, r) {
              return m(r), e * r
            }, 1),
          )
        },
      },
      '/': {
        evaluate: function (e) {
          if (0 === e.length) return 1
          var r = e[0],
            t = e.slice(1)
          return (
            m(r),
            0 === t.length
              ? (N(r), 1 / r)
              : h(
                  t.reduce(function (e, r) {
                    return N(r), e / r
                  }, r),
                )
          )
        },
      },
      '-': {
        evaluate: function (e) {
          var r = e[0],
            t = e.slice(1)
          return r
            ? (m(r),
              0 === t.length
                ? -r
                : h(
                    t.reduce(function (e, r) {
                      return m(r), e - r
                    }, r),
                  ))
            : 0
        },
      },
      '%': {
        evaluate: function (e) {
          var r = e[0],
            t = e[1]
          return m(r), N(t), h(r % t)
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      sqrt: {
        evaluate: function (e) {
          var r = e[0]
          return y(r), h(Math.sqrt(r))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      cbrt: {
        evaluate: function (e) {
          var r = e[0]
          return y(r), h(Math.cbrt(r))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      pow: {
        evaluate: function (e) {
          var r = e[0],
            t = e[1]
          return m(r), m(t), h(Math.pow(r, t))
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      round: {
        evaluate: function (e) {
          var r = e[0],
            t = e[1]
          if ((m(r), 1 === e.length || 0 === t)) return h(Math.round(r))
          g(t), b(t)
          var n = Math.pow(10, t)
          return h(Math.round(r * n) / n)
        },
        validate: function (e) {
          return A({ min: 1, max: 2 }, e)
        },
      },
      trunc: {
        evaluate: function (e) {
          var r = e[0]
          return m(r), h(Math.trunc(r))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      floor: {
        evaluate: function (e) {
          var r = e[0]
          return m(r), h(Math.floor(r))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      ceil: {
        evaluate: function (e) {
          var r = e[0]
          return m(r), h(Math.ceil(r))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      random: {
        evaluate: function (e) {
          var r = e[0]
          return g(r), h(Math.random() * r)
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      '>': {
        evaluate: function (e) {
          var r = e[0],
            t = e.slice(1)
          if ((m(r), 0 === t.length)) return !0
          for (var n = r, a = 0, u = t; a < u.length; a++) {
            var o = u[a]
            if ((m(o), n <= o)) return !1
            n = o
          }
          return !0
        },
        validate: function (e) {
          return A({ min: 1 }, e)
        },
      },
      '<': {
        evaluate: function (e) {
          var r = e[0],
            t = e.slice(1)
          if ((m(r), 0 === t.length)) return !0
          for (var n = r, a = 0, u = t; a < u.length; a++) {
            var o = u[a]
            if ((m(o), n >= o)) return !1
            n = o
          }
          return !0
        },
        validate: function (e) {
          return A({ min: 1 }, e)
        },
      },
      '>=': {
        evaluate: function (e) {
          var r = e[0],
            t = e.slice(1)
          if ((m(r), 0 === t.length)) return !0
          for (var n = r, a = 0, u = t; a < u.length; a++) {
            var o = u[a]
            if ((m(o), n < o)) return !1
            n = o
          }
          return !0
        },
        validate: function (e) {
          return A({ min: 1 }, e)
        },
      },
      '<=': {
        evaluate: function (e) {
          var r = e[0],
            t = e.slice(1)
          if ((m(r), 0 === t.length)) return !0
          for (var n = r, a = 0, u = t; a < u.length; a++) {
            var o = u[a]
            if ((m(o), n > o)) return !1
            n = o
          }
          return !0
        },
        validate: function (e) {
          return A({ min: 1 }, e)
        },
      },
      min: {
        evaluate: function (e) {
          var r = e[0],
            t = e.slice(1)
          return (
            m(r),
            0 === t.length
              ? r
              : t.reduce(function (e, r) {
                  return m(r), Math.min(e, r)
                }, r)
          )
        },
        validate: function (e) {
          return A({ min: 1 }, e)
        },
      },
      max: {
        evaluate: function (e) {
          var r = e[0],
            t = e.slice(1)
          return (
            m(r),
            0 === t.length
              ? r
              : t.reduce(function (e, r) {
                  return m(r), Math.max(e, r)
                }, r)
          )
        },
        validate: function (e) {
          return A({ min: 1 }, e)
        },
      },
      abs: {
        evaluate: function (e) {
          var r = e[0]
          return m(r), Math.abs(r)
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      sign: {
        evaluate: function (e) {
          var r = e[0]
          return m(r), Math.sign(r)
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
          var r = e[0]
          return m(r), h(Math.exp(r))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      log: {
        evaluate: function (e) {
          var r = e[0]
          return g(r), h(Math.log(r))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      log2: {
        evaluate: function (e) {
          var r = e[0]
          return m(r), h(Math.log2(r))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      log10: {
        evaluate: function (e) {
          var r = e[0]
          return m(r), h(Math.log10(r))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      sin: {
        evaluate: function (e) {
          var r = e[0]
          return m(r), h(Math.sin(r))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      asin: {
        evaluate: function (e) {
          var r = e[0]
          return m(r), h(Math.asin(r))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      sinh: {
        evaluate: function (e) {
          var r = e[0]
          return m(r), h(Math.sinh(r))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      asinh: {
        evaluate: function (e) {
          var r = e[0]
          return m(r), h(Math.asinh(r))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      cos: {
        evaluate: function (e) {
          var r = e[0]
          return m(r), h(Math.cos(r))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      acos: {
        evaluate: function (e) {
          var r = e[0]
          return m(r), h(Math.acos(r))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      cosh: {
        evaluate: function (e) {
          var r = e[0]
          return m(r), h(Math.cosh(r))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      acosh: {
        evaluate: function (e) {
          var r = e[0]
          return m(r), h(Math.acosh(r))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      tan: {
        evaluate: function (e) {
          var r = e[0]
          return m(r), h(Math.tan(r))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      atan: {
        evaluate: function (e) {
          var r = e[0]
          return m(r), h(Math.atan(r))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      tanh: {
        evaluate: function (e) {
          var r = e[0]
          return m(r), h(Math.tanh(r))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      atanh: {
        evaluate: function (e) {
          var r = e[0]
          return m(r), h(Math.atanh(r))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
    },
    fe = /[[.]/
  function se(e, r) {
    for (var t = 0, n = pe(r); t < n.length; t++) {
      var a = n[t]
      try {
        e = e[a]
      } catch (e) {
        return
      }
    }
    return e
  }
  function pe(e) {
    if (!e) return []
    var r = fe.exec(e)
    if (!r) return [e]
    if (r.index > 0) return a([e.substring(0, r.index)], pe(e.substring(r.index)))
    if ('.' === e[0]) {
      if (e.length < 2) throw Error('Ill formed path: ' + e)
      return pe(e.substring(1))
    }
    var t = (function (e) {
        var r = de.exec(e) || me.exec(e)
        if (r) {
          return [r[0].length, r[1]]
        }
        var t = he.exec(e)
        if (t) {
          return [t[0].length, Number(t[1])]
        }
        throw Error('Ill formed path: ' + e)
      })(e),
      n = t[0],
      u = t[1]
    if (e.length > n && '.' !== e[n] && '[' !== e[n]) throw Error('Ill formed path: ' + e)
    return a([u], pe(e.substring(n)))
  }
  var de = /^\[\s*'(.*)'\s*\]/,
    me = /^\[\s*"(.*)"\s*\]/,
    he = /^\[\s*(\d+)\s*\]/
  var ge = {
    '!=': {
      evaluate: function (e) {
        for (var r = 0; r < e.length - 1; r += 1) for (var t = r + 1; t < e.length; t += 1) if (e[r] === e[t]) return !1
        return !0
      },
      validate: function (e) {
        return A({ min: 1 }, e)
      },
    },
    '=': {
      evaluate: function (e) {
        for (var r = e[0], t = 0, n = e.slice(1); t < n.length; t++) {
          if (n[t] !== r) return !1
        }
        return !0
      },
      validate: function (e) {
        return A({ min: 1 }, e)
      },
    },
    apply: {
      evaluate: function (e, r, t) {
        var n = e[0],
          a = e[1],
          u = t.evaluateLispishFunction
        return j(n), x(a), u(n, a, r)
      },
      validate: function (e) {
        return A(2, e)
      },
    },
    'get-path': {
      evaluate: function (e) {
        var r = e[0],
          t = e[1]
        return (
          (function (e) {
            if (
              (null === e || 'object' != typeof e || Array.isArray(e) || e instanceof RegExp || S(e)) &&
              !Array.isArray(e)
            )
              throw TypeError('Expected object or array, got: ' + e + ' type="' + typeof e + '"')
          })(r),
          E(t),
          se(r, t)
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
      evaluate: function (e, r) {
        console.error(
          '*** LISPISH DEBUG ***\n\n' +
            (function (e) {
              return e.reverse().reduce(function (e, r, t) {
                return (
                  e +
                  'Context ' +
                  t +
                  (0 === t ? ' - Import context' : 1 === t ? ' - Global context' : '') +
                  '\n' +
                  (function (e) {
                    if (0 === Object.keys(e).length) return '  <empty>\n'
                    var r = Math.max.apply(
                      Math,
                      Object.keys(e).map(function (e) {
                        return e.length
                      }),
                    )
                    return Object.entries(e).reduce(function (e, t) {
                      var n = ('' + t[0]).padEnd(r + 2, ' ')
                      return (
                        e +
                        (t[1].constant ? '* ' : '  ') +
                        n +
                        (function (e) {
                          if (S((r = e.value)) && !M(r)) return '<builtin function ' + e.value.name + '>'
                          if (M(e.value)) return e.value.name ? '<function ' + e.value.name + '>' : '<function λ>'
                          var r
                          return JSON.stringify(e.value)
                        })(t[1]) +
                        '\n'
                      )
                    }, '')
                  })(r) +
                  '\n'
                )
              }, '')
            })(r),
        )
      },
      validate: function (e) {
        return A(0, e)
      },
    },
  }
  var ye = {
      object: {
        evaluate: function (e) {
          for (var r = {}, t = 0; t < e.length; t += 2) {
            var n = e[t],
              a = e[t + 1]
            E(n), (r[n] = a)
          }
          return r
        },
        validate: function (e) {
          return (function (e) {
            var r = e.params.length
            if (r % 2 != 0) throw Error('Wrong number of arguments, expected an even number, got ' + r)
          })(e)
        },
      },
      keys: {
        evaluate: function (e) {
          var r = e[0]
          return k(r), Object.keys(r)
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      values: {
        evaluate: function (e) {
          var r = e[0]
          return k(r), Object.values(r)
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      entries: {
        evaluate: function (e) {
          var r = e[0]
          return k(r), Object.entries(r)
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      ohas: {
        evaluate: function (e) {
          var r = e[0],
            t = e[1]
          return k(r), E(t), !!Object.getOwnPropertyDescriptor(r, t)
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      oget: {
        evaluate: function (e) {
          var r = e[0],
            t = e[1]
          return k(r), E(t), r[t]
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      oset: {
        evaluate: function (e) {
          var r = e[0],
            t = e[1],
            n = e[2]
          return k(r), E(t), (r[t] = n), n
        },
        validate: function (e) {
          return A(3, e)
        },
      },
      odel: {
        evaluate: function (e) {
          var r = e[0],
            t = e[1]
          k(r), E(t)
          var n = r[t]
          return delete r[t], n
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      merge: {
        evaluate: function (e) {
          var r = e[0],
            t = e.slice(1)
          return (
            k(r),
            t.reduce(function (e, r) {
              return k(r), n(n({}, e), r)
            }, n({}, r))
          )
        },
        validate: function (e) {
          return A({ min: 1 }, e)
        },
      },
    },
    be = {
      'function?': {
        evaluate: function (e) {
          return S(e[0])
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
          var r = e[0]
          return 'number' == typeof r && Number.isInteger(r)
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
          var r = e[0]
          return m(r), 0 === r
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'even?': {
        evaluate: function (e) {
          var r = e[0]
          return m(r), r % 2 == 0
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'odd?': {
        evaluate: function (e) {
          var r = e[0]
          return m(r), Number.isInteger(r) && r % 2 != 0
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'array?': {
        evaluate: function (e) {
          var r = e[0]
          return Array.isArray(r)
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'object?': {
        evaluate: function (e) {
          var r = e[0]
          return !(null === r || Array.isArray(r) || 'object' != typeof r || r instanceof RegExp || S(r))
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'regexp?': {
        evaluate: function (e) {
          var r = e[0]
          return null !== r && !Array.isArray(r) && 'object' == typeof r && r instanceof RegExp
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'empty?': {
        evaluate: function (e) {
          var r = e[0]
          return x(r), 0 === r.length
        },
        validate: function (e) {
          return A(1, e)
        },
      },
    },
    Ee = {
      regexp: {
        evaluate: function (e) {
          var r = e[0],
            t = e[1]
          return E(r), 1 === e.length ? new RegExp(r) : (E(t), new RegExp(r, t))
        },
        validate: function (e) {
          return A({ min: 1, max: 2 }, e)
        },
      },
      match: {
        evaluate: function (e) {
          var r = e[0],
            t = e[1]
          w(r), E(t)
          var n = r.exec(t)
          if (n) return a([], n)
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      test: {
        evaluate: function (e) {
          var r = e[0],
            t = e[1]
          return w(r), E(t), r.test(t)
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      replace: {
        evaluate: function (e) {
          var r = e[0],
            t = e[1],
            n = e[2]
          return E(r), w(t), E(n), r.replace(t, n)
        },
        validate: function (e) {
          return A(3, e)
        },
      },
    },
    we = {
      substring: {
        evaluate: function (e) {
          var r = e[0],
            t = e[1],
            n = e[2]
          return (
            E(r),
            m(t),
            y(t),
            void 0 === n
              ? r.substring(t)
              : ((function (e, r) {
                  if ((m(e), e < r))
                    throw TypeError('Expected parameter (' + e + ') to be a number equal or grater than ' + r)
                })(n, t),
                r.substring(t, n))
          )
        },
        validate: function (e) {
          return A({ min: 2, max: 3 }, e)
        },
      },
      'string-length': {
        evaluate: function (e) {
          var r = e[0]
          return E(r), r.length
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'string-repeat': {
        evaluate: function (e) {
          var r = e[0],
            t = e[1]
          return E(r), y(t), b(t), r.repeat(t)
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      concat: {
        evaluate: function (e) {
          return e.reduce(function (e, r) {
            return E(r), e + r
          }, '')
        },
      },
      'string>': {
        evaluate: function (e) {
          var r = e[0],
            t = e[1]
          return E(r), E(t), r > t
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      'string<': {
        evaluate: function (e) {
          var r = e[0],
            t = e[1]
          return E(r), E(t), r < t
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      'string>=': {
        evaluate: function (e) {
          var r = e[0],
            t = e[1]
          return E(r), E(t), r >= t
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      'string<=': {
        evaluate: function (e) {
          var r = e[0],
            t = e[1]
          return E(r), E(t), r <= t
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      'string-reverse': {
        evaluate: function (e) {
          var r = e[0]
          return E(r), r.split('').reverse().join('')
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'string-to-number': {
        evaluate: function (e) {
          var r = e[0]
          E(r)
          var t = Number(r)
          if (Number.isNaN(t)) throw Error("Could not convert '" + r + "' to a number")
          return t
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'number-to-string': {
        evaluate: function (e) {
          var r = e[0],
            t = e[1]
          if ((m(r), 1 === e.length)) return Number(r).toString()
          if ((m(t), 2 !== t && 8 !== t && 10 !== t && 16 !== t))
            throw Error('Expected "number-to-string" base argument to be 2, 8, 10 or 16, got: ' + t)
          return 10 === t || (y(r), b(r)), Number(r).toString(t)
        },
        validate: function (e) {
          return A({ min: 1, max: 2 }, e)
        },
      },
      'lower-case': {
        evaluate: function (e) {
          var r = e[0]
          return E(r), r.toLowerCase()
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'upper-case': {
        evaluate: function (e) {
          var r = e[0]
          return E(r), r.toUpperCase()
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      trim: {
        evaluate: function (e) {
          var r = e[0]
          return E(r), r.trim()
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'trim-left': {
        evaluate: function (e) {
          var r = e[0]
          return E(r), r.replace(/^\s+/, '')
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      'trim-right': {
        evaluate: function (e) {
          var r = e[0]
          return E(r), r.replace(/\s+$/, '')
        },
        validate: function (e) {
          return A(1, e)
        },
      },
      join: {
        evaluate: function (e) {
          var r = e[0],
            t = e[1]
          return (
            x(r),
            r.forEach(function (e) {
              return E(e)
            }),
            E(t),
            r.join(t)
          )
        },
        validate: function (e) {
          return A(2, e)
        },
      },
      split: {
        evaluate: function (e) {
          var r = e[0],
            t = e[1],
            n = e[2]
          return (
            E(r),
            (function (e) {
              if (!(e instanceof RegExp || 'string' == typeof e))
                throw TypeError('Expected RegExp or string, got: ' + e + ' type="' + typeof e + '"')
            })(t),
            void 0 !== n && (b(n), y(n)),
            r.split(t, n)
          )
        },
        validate: function (e) {
          return A({ min: 2, max: 3 }, e)
        },
      },
      'pad-left': {
        evaluate: function (e) {
          var r = e[0],
            t = e[1],
            n = e[2]
          return E(r), b(t), void 0 !== n && E(n), r.padStart(t, n)
        },
        validate: function (e) {
          return A({ min: 2, max: 3 }, e)
        },
      },
      'pad-right': {
        evaluate: function (e) {
          var r = e[0],
            t = e[1],
            n = e[2]
          return E(r), b(t), void 0 !== n && E(n), r.padEnd(t, n)
        },
        validate: function (e) {
          return A({ min: 2, max: 3 }, e)
        },
      },
      template: {
        evaluate: function (e) {
          var r = e[0],
            t = e.slice(1)
          E(r)
          var n = r.split('||||')
          if (1 === n.length)
            return (
              (function (e) {
                if (
                  !Array.isArray(e) ||
                  e.some(function (e) {
                    return 'string' != typeof e
                  })
                )
                  throw Error('Expected an array of strings, got ' + e)
              })(t),
              ke(n[0], t)
            )
          if (2 === n.length) {
            var u = t[0]
            y(u), b(u)
            var o = a(['' + u], t.slice(1))
            return ke(1 === u ? n[0] : n[1], o)
          }
          throw Error('Invalid template string, only one "||||" separator allowed')
        },
        validate: function (e) {
          return A({ min: 1, max: 10 }, e)
        },
      },
    },
    xe = /\$\$/g
  function ke(e, r) {
    for (var t = 0; t < 9; t += 1) {
      var n = new RegExp('(?<=^|[^$]|\\$\\$)\\$' + (t + 1), 'g')
      if (n.test(e)) {
        var a = r[t]
        E(a), (e = e.replace(n, a))
      }
    }
    return e.replace(xe, '$')
  }
  var Ne = n(
      n(
        n(
          n(
            n(
              n(
                n(
                  n(
                    {},
                    {
                      ash: {
                        evaluate: function (e) {
                          var r = e[0],
                            t = e[1]
                          return b(r), b(t), t >= 0 ? r << t : r >> -t
                        },
                        validate: function (e) {
                          return A(2, e)
                        },
                      },
                      lognot: {
                        evaluate: function (e) {
                          var r = e[0]
                          return b(r), ~r
                        },
                        validate: function (e) {
                          return A(1, e)
                        },
                      },
                      logand: {
                        evaluate: function (e) {
                          var r = e[0],
                            t = e.slice(1)
                          return 0 === e.length
                            ? -1
                            : (b(r),
                              t.reduce(function (e, r) {
                                return b(r), e & r
                              }, r))
                        },
                      },
                      logor: {
                        evaluate: function (e) {
                          var r = e[0],
                            t = e.slice(1)
                          return 0 === e.length
                            ? 0
                            : (b(r),
                              t.reduce(function (e, r) {
                                return b(r), e | r
                              }, r))
                        },
                      },
                      logxor: {
                        evaluate: function (e) {
                          var r = e[0],
                            t = e[1]
                          return b(r), b(t), r ^ t
                        },
                        validate: function (e) {
                          return A(2, e)
                        },
                      },
                    },
                  ),
                  ce,
                ),
                ve,
              ),
              ge,
            ),
            ye,
          ),
          be,
        ),
        Ee,
      ),
      we,
    ),
    Ae = {
      'return-from': B,
      const: Z,
      def: X,
      and: {
        parse: function (e, r, t) {
          var n = (0, t.parseParams)(e, r)
          return [n[0] + 1, { type: 'SpecialExpression', name: 'and', params: n[1] }]
        },
        evaluate: function (e, r, t) {
          for (var n = !0, a = 0, u = e.params; a < u.length; a++) {
            if (!(n = t(u[a], r))) break
          }
          return n
        },
      },
      block: O,
      cond: T,
      defn: L,
      defns: C,
      doarray: U,
      dotimes: _,
      if: V,
      fn: R,
      let: $,
      loop: z,
      or: {
        parse: function (e, r, t) {
          var n = (0, t.parseParams)(e, r)
          return [n[0] + 1, { type: 'SpecialExpression', name: 'or', params: n[1] }]
        },
        evaluate: function (e, r, t) {
          for (var n = !1, a = 0, u = e.params; a < u.length; a++) {
            if ((n = t(u[a], r))) break
          }
          return n
        },
      },
      do: q,
      return: D,
      throw: ae,
      try: ue,
      unless: oe,
      when: ie,
      while: le,
      defns: Q,
      'create-local-variable': Y,
      'create-global-variable': ee,
      'create-constant': re,
      'create-local-constant': te,
      'create-global-constant': ne,
    }
  Object.keys(Ae).forEach(function (e) {
    if (Ne[e]) throw Error('Expression ' + e + ' is defined as both a normal expression and a special expression')
  })
  var Se = { normalExpressions: Ne, specialExpressions: Ae },
    je = Object.keys(Ne),
    Me = Object.keys(Ae),
    Oe = { true: { value: !0 }, false: { value: !1 }, null: { value: null }, undefined: { value: void 0 } },
    Te = Object.keys(Oe)
  function Pe(e, r, t) {
    for (var n, a = [r, t], u = 0, o = e.body; u < o.length; u++) {
      var i = o[u]
      n = Fe(i, a)
    }
    return n
  }
  var Fe = function (e, r) {
    switch (e.type) {
      case 'Number':
      case 'String':
        return (function (e) {
          return e.value
        })(e)
      case 'Name':
        return (function (e, r) {
          for (var t, n = e.value, a = 0, u = r; a < u.length; a++) {
            var o = u[a][n]
            if (o) return o.value
          }
          if (Se.normalExpressions[n]) return ((t = {})[v] = !0), (t.builtin = n), t
          throw Error('Undefined identifier ' + n)
        })(e, r)
      case 'ReservedName':
        return (function (e) {
          return p(Oe[e.value], e.value + ' is not a reserved name').value
        })(e)
      case 'NormalExpression':
        return (function (e, r) {
          for (
            var t,
              n = e.params.map(function (e) {
                return Fe(e, r)
              }),
              a = void 0,
              u = 0,
              o = r;
            u < o.length;
            u++
          ) {
            var i = null === (t = o[u][e.name]) || void 0 === t ? void 0 : t.value
            if (S(i)) {
              a = i
              break
            }
          }
          return a
            ? Ie(a, n, r)
            : (function (e, r, t) {
                return (0, p(Se.normalExpressions[e.name], e.name + ' is not a function').evaluate)(r, t, {
                  evaluateLispishFunction: Ie,
                })
              })(e, n, r)
        })(e, r)
      case 'SpecialExpression':
        return (function (e, r) {
          return (0, p(Se.specialExpressions[e.name], e.name + ' is not a built in special expression').evaluate)(
            e,
            r,
            Fe,
          )
        })(e, r)
      case 'ExpressionExpression':
        return (function (e, r) {
          var t = Fe(e.expression, r)
          if (S(t)) {
            var n = e.params.map(function (e) {
              return Fe(e, r)
            })
            return Ie(t, n, r)
          }
          if (Array.isArray(t)) {
            if (1 !== e.params.length) throw Error('Array as function requires one non negative integer parameter')
            var a = Fe(e.params[0], r)
            return y(a), b(a), t[a]
          }
          throw Error('Expected function, got ' + t)
        })(e, r)
    }
  }
  var Ie = function (e, r, t) {
    if (!M(e)) return p(Ne[e.builtin], e.builtin + ' is not a function').evaluate(r, t, { evaluateLispishFunction: Ie })
    var n = e.functionContext,
      i = e.arguments,
      l = i.mandatoryArguments.length,
      c = i.optionalArguments.length,
      v = i.restArgument ? null : l + c
    if (r.length < i.mandatoryArguments.length)
      throw Error(
        'Function "' + e.name + '" requires at least ' + i.mandatoryArguments.length + ' arguments. Got ' + r.length,
      )
    if (null !== v && r.length > v)
      throw Error('Function "' + e.name + '" requires at most ' + v + ' arguments. Got ' + r.length)
    for (
      var f = Math.max(r.length, i.mandatoryArguments.length + i.optionalArguments.length), s = [], d = 0;
      d < f;
      d += 1
    )
      if (d < l) {
        var m = r[d]
        n[p(i.mandatoryArguments[d], '')] = { value: m, constant: !1 }
      } else if (d < l + c) {
        var h = p(i.optionalArguments[d - l], '')
        m = d < r.length ? r[d] : void 0 !== h.defaultValue ? h.defaultValue : void 0
        n[h.name] = { value: m, constant: !1 }
      } else {
        if (S((m = r[d]))) throw Error('A function cannot be a &rest parameter')
        s.push(r[d])
      }
    i.restArgument && (n[i.restArgument] = { value: s, constant: !1 })
    try {
      for (var g = void 0, y = 0, b = e.body; y < b.length; y++) {
        var E = b[y]
        g = Fe(E, a([n], t))
      }
      return g
    } catch (r) {
      if (r instanceof o) return r.value
      if (r instanceof u && e.name === r.blockName) return r.value
      throw r
    }
  }
  var Le = function (e, r) {
      for (var t = p(e[r]), n = []; 'paren' !== t.type || ')' !== t.value; ) {
        var a = ze(e, r),
          u = a[0],
          o = a[1]
        ;(r = u), n.push(o), (t = p(e[r]))
      }
      return [r, n]
    },
    Ce = function (e, r) {
      var t = p(e[(r += 1)])
      if ('name' === t.type) {
        var n = t.value
        return Se.specialExpressions[n] ? $e(e, r) : Ve(e, r)
      }
      return _e(e, r)
    },
    Re = function (e, r) {
      var t = p(e[r])
      if ('name' === t.type) return [r + 1, { type: 'Argument', name: t.value }]
      if ('paren' === t.type && '(' === t.value) {
        if ('name' !== (t = p(e[(r += 1)])).type) throw new l('name', t)
        var n = t.value,
          a = ze(e, (r += 1)),
          u = a[0],
          o = a[1]
        if ('paren' !== (t = p(e[u])).type || ')' !== t.value) throw new l(')', t)
        return [u + 1, { type: 'Argument', name: n, defaultValue: o }]
      }
      if ('modifier' === t.type) return [r + 1, { type: 'Modifier', value: t.value }]
      throw new l('"(", name or modifier', t)
    },
    Ue = function (e, r) {
      var t = p(e[(r += 1)])
      if ('name' !== t.type) throw Error('Expected name node in binding, got ' + t.type + ' value=' + t.value)
      var n = t.value
      t = p(e[(r += 1)])
      var a = ze(e, r),
        u = a[0],
        o = a[1]
      if ('paren' !== (t = p(e[(r = u)])).type || ')' !== t.value) throw new l(')', t)
      return [r + 1, { type: 'Binding', name: n, value: o }]
    },
    _e = function (e, r) {
      var t = ze(e, r),
        n = t[0],
        a = t[1]
      !(function (e) {
        if ('NormalExpression' !== e.type && 'SpecialExpression' !== e.type && 'ExpressionExpression' !== e.type)
          throw new c('ExpressionNode', e)
      })(a)
      var u = Le(e, n)
      return [u[0] + 1, { type: 'ExpressionExpression', expression: a, params: u[1] }]
    },
    Ve = function (e, r) {
      var t,
        n = p(e[r]).value,
        a = Le(e, r + 1)
      r = a[0] + 1
      var u = { type: 'NormalExpression', name: n, params: a[1] },
        o = Se.normalExpressions[u.name]
      return o && (null === (t = o.validate) || void 0 === t || t.call(o, u)), [r, u]
    },
    $e = function (e, r) {
      var t = p(e[r]).value
      r += 1
      var n = p(Se.specialExpressions[t], t + ' is not a built in special expression'),
        a = n.parse,
        u = n.validate,
        o = a(e, r, { parseExpression: Ce, parseParams: Le, parseToken: ze, parseBinding: Ue, parseArgument: Re }),
        i = o[0],
        l = o[1]
      return null == u || u(l), [i, l]
    },
    ze = function (e, r) {
      var t = p(e[r]),
        n = void 0
      switch (t.type) {
        case 'number':
          n = (function (e, r) {
            var t = p(e[r])
            return [r + 1, { type: 'Number', value: Number(t.value) }]
          })(e, r)
          break
        case 'string':
          n = (function (e, r) {
            return [r + 1, { type: 'String', value: p(e[r]).value }]
          })(e, r)
          break
        case 'name':
          n = (function (e, r) {
            return [r + 1, { type: 'Name', value: p(e[r]).value }]
          })(e, r)
          break
        case 'reservedName':
          n = (function (e, r) {
            return [r + 1, { type: 'ReservedName', value: p(e[r]).value }]
          })(e, r)
          break
        case 'paren':
          '(' === t.value
            ? (n = Ce(e, r))
            : '[' === t.value &&
              (n = (function (e, r) {
                for (var t, n, a = p(e[(r += 1)]), u = []; 'paren' !== a.type || ']' !== a.value; )
                  (r = (t = ze(e, r))[0]), (n = t[1]), u.push(n), (a = p(e[r]))
                return [(r += 1), { type: 'NormalExpression', name: 'array', params: u }]
              })(e, r))
      }
      if (!n) throw SyntaxError('Unrecognized token: ' + t.type + ' value=' + t.value)
      return n
    }
  var qe = /[0-9a-zA-Z_^?=!$%<>.+*/-]/,
    Be = /\s|[)\]}]/,
    De = /[0-9]/,
    Ge = /[0-7]/,
    We = /[0-9a-fA-F]/,
    Je = /[0-1]/,
    Ke = /[0-9.-]/
  function He(e, r, t, n) {
    return r === t[n] ? [1, { type: e, value: r }] : [0, void 0]
  }
  var Xe = [
    function (e, r) {
      if (';' === e[r]) {
        for (var t = 1; '\n' !== e[r + t] && r + t < e.length; ) t += 1
        return '\n' === e[r + t] && r + t < e.length && (t += 1), [t, void 0]
      }
      return [0, void 0]
    },
    function (e, r) {
      var t
      return /\s/.test(null !== (t = e[r]) && void 0 !== t ? t : '') ? [1, void 0] : [0, void 0]
    },
    function (e, r) {
      return He('paren', '(', e, r)
    },
    function (e, r) {
      return He('paren', ')', e, r)
    },
    function (e, r) {
      return He('paren', '[', e, r)
    },
    function (e, r) {
      return He('paren', ']', e, r)
    },
    function (e, r) {
      return He('paren', '{', e, r)
    },
    function (e, r) {
      return He('paren', '}', e, r)
    },
    function (e, r) {
      if ('"' !== e[r]) return [0, void 0]
      for (var t = '', n = 1, a = e[r + n], u = !1; '"' !== a || u; ) {
        if (void 0 === a) throw new SyntaxError('Unclosed string at position ' + r)
        u ? ((u = !1), '"' === a || '\\' === a || (t += '\\'), (t += a)) : '\\' === a ? (u = !0) : (t += a),
          (a = e[r + (n += 1)])
      }
      return [n + 1, { type: 'string', value: t }]
    },
    function (e, r) {
      var t = 'decimal',
        n = e[r]
      if (void 0 === n) return [0, void 0]
      var a,
        u = '.' === n
      if (!Ke.test(n)) return [0, void 0]
      for (a = r + 1; a < e.length; a += 1) {
        var o = p(e[a])
        if (Be.test(o)) break
        if (a === r + 1 && '0' === n) {
          if ('b' === o || 'B' === o) {
            t = 'binary'
            continue
          }
          if ('o' === o || 'O' === o) {
            t = 'octal'
            continue
          }
          if ('x' === o || 'X' === o) {
            t = 'hex'
            continue
          }
        }
        if ('decimal' === t && u) {
          if (!De.test(o)) return [0, void 0]
        } else if ('binary' === t) {
          if (!Je.test(o)) return [0, void 0]
        } else if ('octal' === t) {
          if (!Ge.test(o)) return [0, void 0]
        } else if ('hex' === t) {
          if (!We.test(o)) return [0, void 0]
        } else {
          if ('.' === o) {
            u = !0
            continue
          }
          if (!De.test(o)) return [0, void 0]
        }
      }
      var i = a - r,
        l = e.substring(r, a)
      return ('decimal' !== t && i <= 2) || '.' === l || '-' === l ? [0, void 0] : [i, { type: 'number', value: l }]
    },
    function (e, r) {
      for (var t = 0, n = Object.keys(Oe); t < n.length; t++) {
        var a = n[t],
          u = a.length,
          o = e[r + u]
        if ((!o || !qe.test(o)) && e.substr(r, u) === a) return [u, { type: 'reservedName', value: a }]
      }
      return [0, void 0]
    },
    function (e, r) {
      return (function (e, r, t, n) {
        var a = t[n],
          u = 0,
          o = ''
        if (!a || !r.test(a)) return [0, void 0]
        for (; a && r.test(a); ) (o += a), (a = t[n + (u += 1)])
        return [u, { type: e, value: o }]
      })('name', qe, e, r)
    },
    function (e, r) {
      return '&rest' === e.substr(r, 5)
        ? [5, { type: 'modifier', value: '&rest' }]
        : '&optional' === e.substr(r, 9)
        ? [9, { type: 'modifier', value: '&optional' }]
        : '&bind' === e.substr(r, 5)
        ? [5, { type: 'modifier', value: '&bind' }]
        : [0, void 0]
    },
  ]
  var Ze = (function () {
    function e() {
      this.importScope = {}
    }
    return (
      (e.prototype.tokenize = function (e) {
        return (function (e) {
          for (var r = [], t = 0, n = !1; t < e.length; ) {
            n = !1
            for (var a = 0, u = Xe; a < u.length; a++) {
              var o = (0, u[a])(e, t),
                i = o[0],
                l = o[1]
              if (i > 0 && ((n = !0), (t += i), l)) {
                r.push(l)
                break
              }
            }
            if (!n) throw new SyntaxError('Unrecognized character at position ' + t + ": '" + e[t] + "'")
          }
          return r
        })(e)
      }),
      (e.prototype.parse = function (e) {
        return (function (e) {
          for (var r, t, n = { type: 'Program', body: [] }, a = 0; a < e.length; )
            (a = (r = ze(e, a))[0]), (t = r[1]), n.body.push(t)
          return n
        })(e)
      }),
      (e.prototype.evaluate = function (e, r) {
        void 0 === r && (r = {})
        var t = r.globalContext || {}
        return (
          r.vars &&
            Object.entries(r.vars).forEach(function (e) {
              var r = e[0],
                n = e[1]
              t[r] = { constant: !0, value: n }
            }),
          Pe(e, t, this.importScope)
        )
      }),
      (e.prototype.run = function (e, r) {
        var t = this.tokenize(e),
          n = this.parse(t)
        return this.evaluate(n, r)
      }),
      (e.prototype.import = function (e) {
        var r = this.tokenize(e),
          t = {}
        Pe(this.parse(r), t, {})
        for (var n = Object.keys(this.importScope), a = 0, u = Object.keys(t); a < u.length; a++) {
          var o = u[a]
          if (n.includes(o)) throw Error('Import faild, imported function/variable already exists: "' + o + '"')
          if (je.includes(o)) throw Error('Import faild, cannot shadow builtin normal expression: "' + o + '"')
          if (Me.includes(o)) throw Error('Import faild, cannot shadow builtin special expression: "' + o + '"')
        }
        Object.assign(this.importScope, t)
      }),
      e
    )
  })()
  return (
    (e.Lispish = Ze),
    (e.isLispishFunction = S),
    (e.normalExpressionKeys = je),
    (e.reservedNames = Te),
    (e.specialExpressionKeys = Me),
    Object.defineProperty(e, '__esModule', { value: !0 }),
    e
  )
})({})
//# sourceMappingURL=lispish.iife.js.map
