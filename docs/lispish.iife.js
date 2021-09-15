var lispish=function(r,e){"use strict";function n(r){return r&&"object"==typeof r&&"default"in r?r:{default:r}}var t=n(_.get),a=function(){return(a=Object.assign||function(r){for(var e,n=1,t=arguments.length;n<t;n++)for(var a in e=arguments[n])Object.prototype.hasOwnProperty.call(e,a)&&(r[a]=e[a]);return r}).apply(this,arguments)};
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
    ***************************************************************************** */function u(r,e){for(var n=0,t=e.length,a=r.length;n<t;n++,a++)r[a]=e[n];return r}var i=Symbol("function");function o(r){if(void 0===r)throw Error("Expected an AST node, got undefined");return r}function v(r){if(void 0===r||"Name"!==r.type)throw Error("Expected a Name node, got "+(r?r.type+" node":"undefined")+".");return r}function l(r){if(void 0===r)throw Error("Expected anything but undefined, got undefined");return r}function s(r){if("number"!=typeof r||!isFinite(r))throw TypeError("Expected number, got: "+r+' type="'+typeof r+'"')}function f(r){return s(r),r}function c(r){if(s(r),r<=0)throw TypeError("Expected positive number, got "+r)}function p(r){if(s(r),r<0)throw TypeError("Expected non negative number, got "+r)}function d(r){if(s(r),!Number.isInteger(r))throw TypeError("Expected integer, got "+r)}function m(r){if("string"!=typeof r)throw TypeError("Expected string, got: "+r+' type="'+typeof r+'"')}function h(r){if(!(r instanceof RegExp))throw TypeError("Expected RegExp, got: "+r+' type="'+typeof r+'"')}function g(r){if(!Array.isArray(r))throw TypeError("Expected list, got: "+r+' type="'+typeof r+'"')}function y(r){if(null===r||"object"!=typeof r||Array.isArray(r)||r instanceof RegExp||A(r))throw TypeError("Expected object, got: "+r+' type="'+typeof r+'"')}function b(r){if(s(r),0===r)throw TypeError("Expected non zero value, got: "+r+'"')}function E(r){if(0!==r.length)throw Error("Wrong number of arguments, expected 0, got "+r.length)}function x(r){if(1!==r.length)throw Error("Wrong number of arguments, expected 1, got "+r.length)}function w(r){if(2!==r.length)throw Error("Wrong number of arguments, expected 2, got "+r.length)}function M(r){if(3!==r.length)throw Error("Wrong number of arguments, expected 3, got "+r.length)}function N(r){if(r.length<1)throw Error("Wrong number of arguments, expected 1 or more, got "+r.length)}function k(r){if(r.length<2)throw Error("Wrong number of arguments, expected 2 or more, got "+r.length)}function j(r){if(1!==r.length&&2!==r.length)throw Error("Wrong number of arguments, expected 1 or 2, got "+r.length)}function S(r){if(1!==r.length&&2!==r.length&&3!==r.length)throw Error("Wrong number of arguments, expected 1, 2 or 3, got "+r.length)}function A(r){return null!==r&&"object"==typeof r&&!!r[i]}function O(r){if(null===r||"object"!=typeof r)throw Error("Not a lispish function");if(!r[i])throw Error("Not a lispish function")}var T={parse:function(r,e,n){var t=(0,n.parseParams)(r,e);return[t[0]+1,{type:"SpecialExpression",name:"if",params:t[1]}]},evaluate:function(r,e,n){var t=r.params,a=t[0],u=t[1],i=t[2],v=n(o(a),e)?o(u):o(i);return n(v,e)},validate:function(r){M(r.params)}},R={parse:function(r,e,n){var t=n.parseBinding,a=n.parseParams,u={type:"SpecialExpression",name:"let",params:[],bindings:[]},i=l(r[e]);if("paren"!==i.type||"("!==i.value)throw SyntaxError('Invalid token "'+i.type+'" value='+i.value+", expected list of bindings");for(e+=1;"paren"!==i.type||")"!==i.value;){if("paren"!==i.type||"("!==i.value)throw SyntaxError('Invalid token "'+i.type+'" value='+i.value+", expected an expression");var o=t(r,e),v=o[0],s=o[1];e=v,u.bindings.push(s),i=l(r[e])}var f=a(r,e+=1),c=f[0],p=f[1];return u.params=p,[c+1,u]},evaluate:function(r,e,n){for(var t={variables:{},functions:{}},a=0,i=r.bindings;a<i.length;a++){var o=i[a],v=n(o.value,e);if(A(v))throw Error("Cannot bind function in let expression");t.variables[o.name]=v}for(var l,s=u([t],e),f=0,c=r.params;f<c.length;f++){l=n(c[f],s)}return l}},P={parse:function(r,e,n){var t=(0,n.parseParams)(r,e),a=t[0],u=t[1];return function(r){if(void 0===r||"Name"!==r.type)throw Error("Expected a Name node, got "+(r?r.type+" node":"undefined")+".")}(u[0]),[a+1,{type:"SpecialExpression",name:"setq",params:u}]},evaluate:function(r,e,n){for(var t=v(r.params[0]).value,a=n(o(r.params[1]),e),u=void 0,i=0;i<e.length-1;i+=1)if(Object.getOwnPropertyDescriptor(l(e[i]).variables,t)){u=e[i];break}return u||(u=l(e[e.length-2])),u.variables[t]=a,a},validate:function(r){w(r.params)}};var F={parse:function(r,e,n){var t=function(r,e,n){for(var t=[],a=l(r[e]);"paren"!==a.type||")"!==a.value;){var u=n(r,e+1),i=u[0],o=u[1],v=[];for(a=l(r[e=i]);"paren"!==a.type||")"!==a.value;){var s=n(r,e),f=s[0],c=s[1];v.push(c),a=l(r[e=f])}t.push({test:o,body:v}),a=l(r[e+=1])}return[e,t]}(r,e,n.parseToken);return[t[0]+1,{type:"SpecialExpression",name:"cond",conditions:t[1],params:[]}]},evaluate:function(r,e,n){for(var t,a=0,u=r.conditions;a<u.length;a++){var i=u[a];if(t=n(i.test,e)){for(var o=0,v=i.body;o<v.length;o++){t=n(v[o],e)}return t}}}};function L(r,e,n){for(var t=l(r[e]),a=[],u=!1,i={};"paren"!==t.type||")"!==t.value;){var o=n(r,e),v=o[0],s=o[1];if(u)throw Error("&rest must be the last argument");if("Name"!==s.type&&"Rest"!==s.type)throw Error("Expected a name node");if(i[s.value])throw Error("Duplicate argument name '"+s.value+"'");i[s.value]=!0,"Rest"===s.type&&(u=!0),a.push(s),t=l(r[e=v])}return[e+=1,a]}var W={parse:function(r,e,n){var t=n.parseToken,a=t(r,e),u=a[0],i=a[1];if("Name"!==i.type)throw Error("Expected a name node");var o=l(r[e=u]);if("paren"!==o.type||"("!==o.value)throw SyntaxError('Invalid token "'+o.type+'" value='+o.value+", expected list of arguments");var v=L(r,e+=1,t),s=v[0],f=v[1];o=l(r[e=s]);for(var c=[];"paren"!==o.type||")"!==o.value;){var p=t(r,e),d=p[0],m=p[1];c.push(m),o=l(r[e=d])}if(0===c.length)throw Error("Missing defun body");return[e+1,{type:"SpecialExpression",name:"defun",functionName:i,params:[],arguments:f,body:c}]},evaluate:function(r,e,n){var t,a,u=((t={})[i]=!0,t.name=r.functionName.value,t.arguments=r.arguments.map((function(r){return r.value})),t.varArgs="Rest"===(null===(a=r.arguments[r.arguments.length-1])||void 0===a?void 0:a.type),t.body=r.body,t);l(e[e.length-2]).functions[r.functionName.value]=u}},I={"1+":{evaluate:function(r){var e=r[0];return s(e),f(e+1)},validate:function(r){return x(r.params)}},"1-":{evaluate:function(r){var e=r[0];return s(e),f(e-1)},validate:function(r){return x(r.params)}},"+":{evaluate:function(r){return f(r.reduce((function(r,e){return s(e),r+e}),0))}},"*":{evaluate:function(r){return f(r.reduce((function(r,e){return s(e),r*e}),1))}},"/":{evaluate:function(r){if(0===r.length)return 1;var e=r[0],n=r.slice(1);return s(e),0===n.length?(b(e),1/e):f(n.reduce((function(r,e){return b(e),r/e}),e))}},"-":{evaluate:function(r){var e=r[0],n=r.slice(1);return e?(s(e),0===n.length?-e:f(n.reduce((function(r,e){return s(e),r-e}),e))):0}},"%":{evaluate:function(r){var e=r[0],n=r[1];return s(e),b(n),f(e%n)},validate:function(r){return w(r.params)}},sqrt:{evaluate:function(r){var e=r[0];return p(e),f(Math.sqrt(e))},validate:function(r){return x(r.params)}},cbrt:{evaluate:function(r){var e=r[0];return p(e),f(Math.cbrt(e))},validate:function(r){return x(r.params)}},pow:{evaluate:function(r){var e=r[0],n=r[1];return s(e),s(n),f(Math.pow(e,n))},validate:function(r){return w(r.params)}},round:{evaluate:function(r){var e=r[0],n=r[1];if(s(e),1===r.length||0===n)return f(Math.round(e));c(n),d(n);var t=Math.pow(10,n);return f(Math.round(e*t)/t)},validate:function(r){return j(r.params)}},trunc:{evaluate:function(r){var e=r[0];return s(e),f(Math.trunc(e))},validate:function(r){return x(r.params)}},floor:{evaluate:function(r){var e=r[0];return s(e),f(Math.floor(e))},validate:function(r){return x(r.params)}},ceil:{evaluate:function(r){var e=r[0];return s(e),f(Math.ceil(e))},validate:function(r){return x(r.params)}},random:{evaluate:function(r){var e=r[0];return c(e),f(Math.random()*e)},validate:function(r){return x(r.params)}},">":{evaluate:function(r){var e=r[0],n=r.slice(1);if(s(e),0===n.length)return!0;for(var t=e,a=0,u=n;a<u.length;a++){var i=u[a];if(s(i),t<=i)return!1;t=i}return!0},validate:function(r){return N(r.params)}},"<":{evaluate:function(r){var e=r[0],n=r.slice(1);if(s(e),0===n.length)return!0;for(var t=e,a=0,u=n;a<u.length;a++){var i=u[a];if(s(i),t>=i)return!1;t=i}return!0},validate:function(r){return N(r.params)}},">=":{evaluate:function(r){var e=r[0],n=r.slice(1);if(s(e),0===n.length)return!0;for(var t=e,a=0,u=n;a<u.length;a++){var i=u[a];if(s(i),t<i)return!1;t=i}return!0},validate:function(r){return N(r.params)}},"<=":{evaluate:function(r){var e=r[0],n=r.slice(1);if(s(e),0===n.length)return!0;for(var t=e,a=0,u=n;a<u.length;a++){var i=u[a];if(s(i),t>i)return!1;t=i}return!0},validate:function(r){return N(r.params)}},min:{evaluate:function(r){var e=r[0],n=r.slice(1);return s(e),0===n.length?e:n.reduce((function(r,e){return s(e),Math.min(r,e)}),e)},validate:function(r){return N(r.params)}},max:{evaluate:function(r){var e=r[0],n=r.slice(1);return s(e),0===n.length?e:n.reduce((function(r,e){return s(e),Math.max(r,e)}),e)},validate:function(r){return N(r.params)}},abs:{evaluate:function(r){var e=r[0];return s(e),Math.abs(e)},validate:function(r){return x(r.params)}},sign:{evaluate:function(r){var e=r[0];return s(e),Math.sign(e)},validate:function(r){return x(r.params)}},e:{evaluate:function(){return Math.E},validate:function(r){return E(r.params)}},pi:{evaluate:function(){return Math.PI},validate:function(r){return E(r.params)}},exp:{evaluate:function(r){var e=r[0];return s(e),f(Math.exp(e))},validate:function(r){return x(r.params)}},log:{evaluate:function(r){var e=r[0];return c(e),f(Math.log(e))},validate:function(r){return x(r.params)}},log2:{evaluate:function(r){var e=r[0];return s(e),f(Math.log2(e))},validate:function(r){return x(r.params)}},log10:{evaluate:function(r){var e=r[0];return s(e),f(Math.log10(e))},validate:function(r){return x(r.params)}},sin:{evaluate:function(r){var e=r[0];return s(e),f(Math.sin(e))},validate:function(r){return x(r.params)}},asin:{evaluate:function(r){var e=r[0];return s(e),f(Math.asin(e))},validate:function(r){return x(r.params)}},sinh:{evaluate:function(r){var e=r[0];return s(e),f(Math.sinh(e))},validate:function(r){return x(r.params)}},asinh:{evaluate:function(r){var e=r[0];return s(e),f(Math.asinh(e))},validate:function(r){return x(r.params)}},cos:{evaluate:function(r){var e=r[0];return s(e),f(Math.cos(e))},validate:function(r){return x(r.params)}},acos:{evaluate:function(r){var e=r[0];return s(e),f(Math.acos(e))},validate:function(r){return x(r.params)}},cosh:{evaluate:function(r){var e=r[0];return s(e),f(Math.cosh(e))},validate:function(r){return x(r.params)}},acosh:{evaluate:function(r){var e=r[0];return s(e),f(Math.acosh(e))},validate:function(r){return x(r.params)}},tan:{evaluate:function(r){var e=r[0];return s(e),f(Math.tan(e))},validate:function(r){return x(r.params)}},atan:{evaluate:function(r){var e=r[0];return s(e),f(Math.atan(e))},validate:function(r){return x(r.params)}},tanh:{evaluate:function(r){var e=r[0];return s(e),f(Math.tanh(e))},validate:function(r){return x(r.params)}},atanh:{evaluate:function(r){var e=r[0];return s(e),f(Math.atanh(e))},validate:function(r){return x(r.params)}}},q={write:{evaluate:function(r){if(console.log.apply(console,r),r.length>0)return r[r.length-1]}},now:{evaluate:function(){return Date.now()},validate:function(r){return E(r.params)}},"=":{evaluate:function(r){for(var e=r[0],n=0,t=r.slice(1);n<t.length;n++){if(t[n]!==e)return!1}return!0},validate:function(r){return N(r.params)}},"!=":{evaluate:function(r){for(var e=0;e<r.length-1;e+=1)for(var n=e+1;n<r.length;n+=1)if(r[e]===r[n])return!1;return!0},validate:function(r){return N(r.params)}},not:{evaluate:function(r){return!r[0]},validate:function(r){return x(r.params)}},"get-path":{evaluate:function(r){var e=r[0],n=r[1];return function(r){if((null===r||"object"!=typeof r||Array.isArray(r)||r instanceof RegExp||A(r))&&!Array.isArray(r))throw TypeError("Expected object or array, got: "+r+' type="'+typeof r+'"')}(e),m(n),t.default(e,n)},validate:function(r){return w(r.params)}},progn:{evaluate:function(r){return r[r.length-1]}},apply:{evaluate:function(r,e,n){var t=r[0],a=r[1],u=n.evaluateLispishFunction;return O(t),g(a),u(t,a,e)},validate:function(r){return w(r.params)}}},z={object:{evaluate:function(r){for(var e={},n=0;n<r.length;n+=2){var t=r[n],a=r[n+1];m(t),e[t]=a}return e},validate:function(r){return function(r){if(r.length%2!=0)throw Error("Wrong number of arguments, expected an even number, got "+r.length)}(r.params)}},keys:{evaluate:function(r){var e=r[0];return y(e),Object.keys(e)},validate:function(r){return x(r.params)}},values:{evaluate:function(r){var e=r[0];return y(e),Object.values(e)},validate:function(r){return x(r.params)}},entries:{evaluate:function(r){var e=r[0];return y(e),Object.entries(e)},validate:function(r){return x(r.params)}},"has-attr":{evaluate:function(r){var e=r[0],n=r[1];return y(e),m(n),!!Object.getOwnPropertyDescriptor(e,n)},validate:function(r){return w(r.params)}},"get-attr":{evaluate:function(r){var e=r[0],n=r[1];return y(e),m(n),e[n]},validate:function(r){return w(r.params)}},"set-attr":{evaluate:function(r){var e=r[0],n=r[1],t=r[2];return y(e),m(n),e[n]=t,t},validate:function(r){return M(r.params)}},"del-attr":{evaluate:function(r){var e=r[0],n=r[1];y(e),m(n);var t=e[n];return delete e[n],t},validate:function(r){return w(r.params)}},merge:{evaluate:function(r){var e=r[0],n=r.slice(1);return y(e),n.reduce((function(r,e){return y(e),a(a({},r),e)}),a({},e))},validate:function(r){return N(r.params)}}},C={"function?":{evaluate:function(r){return A(r[0])},validate:function(r){return x(r.params)}},"string?":{evaluate:function(r){return"string"==typeof r[0]},validate:function(r){return x(r.params)}},"number?":{evaluate:function(r){return"number"==typeof r[0]},validate:function(r){return x(r.params)}},"integer?":{evaluate:function(r){var e=r[0];return"number"==typeof e&&Number.isInteger(e)},validate:function(r){return x(r.params)}},"boolean?":{evaluate:function(r){return"boolean"==typeof r[0]},validate:function(r){return x(r.params)}},"undefined?":{evaluate:function(r){return void 0===r[0]},validate:function(r){return x(r.params)}},"null?":{evaluate:function(r){return null===r[0]},validate:function(r){return x(r.params)}},"zero?":{evaluate:function(r){var e=r[0];return s(e),0===e},validate:function(r){return x(r.params)}},"even?":{evaluate:function(r){var e=r[0];return s(e),e%2==0},validate:function(r){return x(r.params)}},"odd?":{evaluate:function(r){var e=r[0];return s(e),Number.isInteger(e)&&e%2!=0},validate:function(r){return x(r.params)}},"list?":{evaluate:function(r){var e=r[0];return Array.isArray(e)},validate:function(r){return x(r.params)}},"object?":{evaluate:function(r){var e=r[0];return!(null===e||Array.isArray(e)||"object"!=typeof e||e instanceof RegExp||A(e))},validate:function(r){return x(r.params)}},"regexp?":{evaluate:function(r){var e=r[0];return null!==e&&!Array.isArray(e)&&"object"==typeof e&&e instanceof RegExp},validate:function(r){return x(r.params)}},"empty?":{evaluate:function(r){var e=r[0];return g(e),0===e.length},validate:function(r){return x(r.params)}}},U={regexp:{evaluate:function(r){var e=r[0],n=r[1];return m(e),1===r.length?new RegExp(e):(m(n),new RegExp(e,n))},validate:function(r){return j(r.params)}},match:{evaluate:function(r){var e=r[0],n=r[1];h(e),m(n);var t=e.exec(n);if(t)return u([],t)},validate:function(r){return w(r.params)}},replace:{evaluate:function(r){var e=r[0],n=r[1],t=r[2];return m(e),h(n),m(t),e.replace(n,t)},validate:function(r){return M(r.params)}}},D={substring:{evaluate:function(r){var e=r[0],n=r[1],t=r[2];return m(e),s(n),p(n),void 0===t?e.substring(n):(function(r,e){if(s(r),r<e)throw TypeError("Expected parameter ("+r+") to be a number equal or grater than "+e)}(t,n),e.substring(n,t))},validate:function(r){return function(r){if(2!==r.length&&3!==r.length)throw Error("Wrong number of arguments, expected 2 or 3, got "+r.length)}(r.params)}},"string-length":{evaluate:function(r){var e=r[0];return m(e),e.length},validate:function(r){return x(r.params)}},"string-repeat":{evaluate:function(r){var e=r[0],n=r[1];return m(e),p(n),d(n),e.repeat(n)},validate:function(r){return w(r.params)}},concat:{evaluate:function(r){return r.reduce((function(r,e){return m(e),r+e}),"")}},aref:{evaluate:function(r){var e=r[0],n=r[1];return m(e),p(n),e[n]},validate:function(r){return w(r.params)}},"string>":{evaluate:function(r){var e=r[0],n=r[1];return m(e),m(n),e>n},validate:function(r){return w(r.params)}},"string<":{evaluate:function(r){var e=r[0],n=r[1];return m(e),m(n),e<n},validate:function(r){return w(r.params)}},"string>=":{evaluate:function(r){var e=r[0],n=r[1];return m(e),m(n),e>=n},validate:function(r){return w(r.params)}},"string<=":{evaluate:function(r){var e=r[0],n=r[1];return m(e),m(n),e<=n},validate:function(r){return w(r.params)}},"string-reverse":{evaluate:function(r){var e=r[0];return m(e),e.split("").reverse().join("")},validate:function(r){return x(r.params)}},"string-to-number":{evaluate:function(r){var e=r[0];m(e);var n=parseFloat(e);if(Number.isNaN(n))throw Error("Could not convert '"+e+"' to a number");return n},validate:function(r){return x(r.params)}},"number-to-string":{evaluate:function(r){var e=r[0];return s(e),""+e},validate:function(r){return x(r.params)}},"lower-case":{evaluate:function(r){var e=r[0];return m(e),e.toLowerCase()},validate:function(r){return x(r.params)}},"upper-case":{evaluate:function(r){var e=r[0];return m(e),e.toUpperCase()},validate:function(r){return x(r.params)}},capitalize:{evaluate:function(r){var e=r[0];m(e);var n=e[0];return n?""+n.toUpperCase()+e.substring(1):""},validate:function(r){return x(r.params)}},trim:{evaluate:function(r){var e=r[0];return m(e),e.trim()},validate:function(r){return x(r.params)}}},B=a(a(a(a(a(a(a({},{list:{evaluate:function(r){return r}},listf:{evaluate:function(r){var e=r[0],n=r[1];d(e),c(e);for(var t=[],a=0;a<e;a+=1)t.push(n);return t},validate:function(r){return w(r.params)}},range:{evaluate:function(r){var e,n,t,a=r[0],u=r[1],i=r[2];s(a),1===r.length?(e=0,t=(n=a)>=0?1:-1):2===r.length?(s(u),t=(n=u)>=(e=a)?1:-1):(s(u),s(i),t=i,(n=u)>(e=a)?c(t):n<e?function(r){if(s(r),r>=0)throw TypeError("Expected negative number, got "+r)}(t):b(t));for(var o=[],v=e;t<0?v>n:v<n;v+=t)o.push(v);return o},validate:function(r){return S(r.params)}},length:{evaluate:function(r){var e=r[0];return g(e),e.length},validate:function(r){return x(r.params)}},append:{evaluate:function(r){var e=r[0],n=r.slice(1);return g(e),n.reduce((function(r,e){return g(e),r.concat(e)}),e)},validate:function(r){return N(r.params)}},elt:{evaluate:function(r){var e=r[0],n=r[1];return g(e),p(n),e[n]},validate:function(r){return w(r.params)}},selt:{evaluate:function(r){var e=r[0],n=r[1],t=r[2];return g(e),p(n),function(r,e){if(s(r),r>=e)throw TypeError("Expected parameter ("+r+") to be a number less than "+e)}(n,e.length),e[n]=t,e},validate:function(r){return M(r.params)}},push:{evaluate:function(r){var e=r[0],n=r.slice(1);return g(e),e.push.apply(e,n),e},validate:function(r){return k(r.params)}},pop:{evaluate:function(r){var e=r[0];return g(e),e.pop()},validate:function(r){return x(r.params)}},shift:{evaluate:function(r){var e=r[0];return g(e),e.shift()},validate:function(r){return x(r.params)}},unshift:{evaluate:function(r){var e=r[0],n=r.slice(1);return g(e),e.unshift.apply(e,n),e},validate:function(r){return k(r.params)}},slice:{evaluate:function(r){var e=r[0],n=r[1],t=r[2];return g(e),1===r.length?u([],e):(d(n),2===r.length?e.slice(n):(d(t),e.slice(n,t)))},validate:function(r){return S(r.params)}},splice:{evaluate:function(r){var e=r[0],n=r[1],t=r[2],a=r.slice(3);return g(e),d(n),2===r.length?e.splice(n):(d(t),e.splice.apply(e,u([n,t],a)))},validate:function(r){return k(r.params)}},reduce:{evaluate:function(r,e,n){var t=r[0],a=r[1],u=r[2],i=n.evaluateLispishFunction;return O(t),g(a),a.reduce((function(r,n){return i(t,[r,n],e)}),u)},validate:function(r){return M(r.params)}},"reduce-right":{evaluate:function(r,e,n){var t=r[0],a=r[1],u=r[2],i=n.evaluateLispishFunction;return O(t),g(a),a.reduceRight((function(r,n){return i(t,[r,n],e)}),u)},validate:function(r){return M(r.params)}},map:{evaluate:function(r,e,n){var t=r[0],a=r[1],u=n.evaluateLispishFunction;return O(t),g(a),a.map((function(r){return u(t,[r],e)}))},validate:function(r){return w(r.params)}},filter:{evaluate:function(r,e,n){var t=r[0],a=r[1],u=n.evaluateLispishFunction;return O(t),g(a),a.filter((function(r){return u(t,[r],e)}))},validate:function(r){return w(r.params)}},reverse:{evaluate:function(r){var e=r[0];return g(e),u([],e).reverse()},validate:function(r){return x(r.params)}},first:{evaluate:function(r){var e=r[0];return g(e),e[0]},validate:function(r){return x(r.params)}},second:{evaluate:function(r){var e=r[0];return g(e),e[1]},validate:function(r){return x(r.params)}},last:{evaluate:function(r){var e=r[0];return g(e),e[e.length-1]},validate:function(r){return x(r.params)}},rest:{evaluate:function(r){var e=r[0];return g(e),e.length<=1?[]:e.slice(1)},validate:function(r){return x(r.params)}},cons:{evaluate:function(r){var e=r[0],n=r[1];return g(n),u([e],n)},validate:function(r){return w(r.params)}}}),I),q),z),C),U),D),J={let:R,if:T,setq:P,and:{parse:function(r,e,n){var t=(0,n.parseParams)(r,e);return[t[0]+1,{type:"SpecialExpression",name:"and",params:t[1]}]},evaluate:function(r,e,n){for(var t=!0,a=0,u=r.params;a<u.length;a++){if(!(t=n(u[a],e)))break}return t}},or:{parse:function(r,e,n){var t=(0,n.parseParams)(r,e);return[t[0]+1,{type:"SpecialExpression",name:"or",params:t[1]}]},evaluate:function(r,e,n){for(var t=!1,a=0,u=r.params;a<u.length;a++){if(t=n(u[a],e))break}return t}},cond:F,defun:W,function:{parse:function(r,e,n){var t=(0,n.parseToken)(r,e),a=t[0],u=t[1];if("Name"!==u.type)throw Error("Expected a name node");var i=l(r[e=a]);if("paren"!==i.type||")"!==i.value)throw SyntaxError('Invalid token "'+i.type+'" value='+i.value+", expected ')'");return[e+1,{type:"SpecialExpression",name:"function",params:[u]}]},evaluate:function(r,e){for(var n,t=v(r.params[0]),a=void 0,u=0,o=e;u<o.length;u++){if(a=o[u].functions[t.value])break}if(a)return a;if(!B[t.value])throw Error("Could not find built in function (normal expresssion) "+t.value);return(n={})[i]=!0,n.builtin=t.value,n},validate:function(r){x(r.params)}},lambda:{parse:function(r,e,n){var t=n.parseToken,a=l(r[e]);if("paren"!==a.type||"("!==a.value)throw SyntaxError('Invalid token "'+a.type+'" value='+a.value+", expected list of arguments");var u=L(r,e+=1,t),i=u[0],o=u[1];a=l(r[e=i]);for(var v=[];"paren"!==a.type||")"!==a.value;){var s=t(r,e),f=s[0],c=s[1];v.push(c),a=l(r[e=f])}if(0===v.length)throw Error("Missing lambda body");return[e+1,{type:"SpecialExpression",name:"lambda",params:[],arguments:o,body:v}]},evaluate:function(r){var e,n;return(e={})[i]=!0,e.name=void 0,e.arguments=r.arguments.map((function(r){return r.value})),e.varArgs="Rest"===(null===(n=r.arguments[r.arguments.length-1])||void 0===n?void 0:n.type),e.body=r.body,e}}};Object.keys(J).forEach((function(r){if(B[r])throw Error("Expression "+r+" is defined as both a normal expression and a special expression")}));var G={normalExpressions:B,specialExpressions:J},K=Object.keys(B),$=Object.keys(J),Z={true:{value:!0},false:{value:!1},null:{value:null},undefined:{value:void 0}},H=Object.keys(Z);function Q(r,e,n){for(var t,a=[n,{variables:e,functions:{}}],u=0,i=r.body;u<i.length;u++){var o=i[u];t=V(o,a)}return t}var V=function(r,e){switch(r.type){case"Number":case"String":return function(r){return r.value}(r);case"Name":return function(r,e){for(var n=r.value,t=0,a=e;t<a.length;t++){var u=a[t];if(Object.getOwnPropertyDescriptor(u.variables,n))return u.variables[n]}throw Error("Undefined identifier "+n)}(r,e);case"ReservedName":return function(r){return l(Z[r.value]).value}(r);case"NormalExpression":return function(r,e){for(var n=r.params.map((function(r){return V(r,e)})),t=void 0,a=0,u=e;a<u.length;a++){if(t=u[a].functions[r.name])break}return t?X(t,n,e):function(r,e,n){var t=l(G.normalExpressions[r.name]).evaluate;try{return t(e,n,{evaluateLispishFunction:X})}catch(e){throw Error(e.message+"\n"+JSON.stringify(r,null,2))}}(r,n,e)}(r,e);case"SpecialExpression":return function(r,e){return(0,l(G.specialExpressions[r.name]).evaluate)(r,e,V)}(r,e);case"ExpressionExpression":return function(r,e){var n=function(r){if(A(r))return r;throw Error("Expected a Lispish function, got "+r)}(V(r.expression,e)),t=r.params.map((function(r){return V(r,e)}));return X(n,t,e)}(r,e)}};var X=function(r,e,n){var t,a={functions:{},variables:{}};if(A(t=r)&&t.arguments){var i=r.arguments;if(r.varArgs){if(e.length<i.length-1)throw Error('Function "'+r.name+'" requires at least '+(i.length-1)+" arguments. Got "+e.length)}else if(i.length!==e.length)throw Error('Function "'+r.name+'" requires '+i.length+" arguments. Got "+e.length);for(var o=0;o<i.length-1;o+=1){var v=e[o],s=l(i[o]);A(v)?a.functions[s]=v:a.variables[s]=v}var f=i.length-1;if(f>=0)if(r.varArgs){var c=[];for(o=f;o<e.length;o+=1){if(A(v=e[o]))throw Error("A function cannot be a &rest parameter");c.push(v)}s=l(i[f]);a.variables[s]=c}else{v=e[f],s=l(i[f]);A(v)?a.functions[s]=v:a.variables[s]=v}for(var p=void 0,d=0,m=r.body;d<m.length;d++){var h=m[d];p=V(h,u([a],n))}return p}return l(B[r.builtin]).evaluate(e,n,{evaluateLispishFunction:X})};var Y=function(r,e){for(var n=l(r[e]),t=[];"paren"!==n.type||")"!==n.value;){var a=ur(r,e),u=a[0],i=a[1];e=u,t.push(i),n=l(r[e])}return[e,t]},rr=function(r,e){var n=l(r[e+=1]);if("name"===n.type){var t=n.value;return G.specialExpressions[t]?ar(r,e):tr(r,e)}if("paren"===n.type&&"("===n.value)return nr(r,e);throw Error("Could not parse expression")},er=function(r,e){var n=l(r[e+=1]);if("name"!==n.type)throw Error("Expected name node in binding, got "+n.type+" value="+n.value);var t=n.value;n=l(r[e+=1]);var a=ur(r,e),u=a[0],i=a[1];if("paren"!==(n=l(r[e=u])).type||")"!==n.value)throw Error("Expected paren ')'node in binding, got "+n.type+" value="+n.value);return[e+1,{type:"Binding",name:t,value:i}]},nr=function(r,e){var n=rr(r,e),t=n[0],a=n[1],u=Y(r,t);return[u[0]+1,{type:"ExpressionExpression",expression:a,params:u[1]}]},tr=function(r,e){var n,t=l(r[e]).value,a=Y(r,e+1);e=a[0]+1;var u={type:"NormalExpression",name:t,params:a[1]},i=G.normalExpressions[u.name];if(i)try{null===(n=i.validate)||void 0===n||n.call(i,u)}catch(r){throw Error(r.message+"\n"+JSON.stringify(u,null,2))}return[e,u]},ar=function(r,e){var n=l(r[e]).value;e+=1;var t=l(G.specialExpressions[n]),a=t.parse,u=t.validate,i=a(r,e,{parseExpression:rr,parseParams:Y,parseToken:ur,parseBinding:er}),o=i[0],v=i[1];try{null==u||u(v)}catch(r){throw Error(r.message+"\n"+JSON.stringify(v,null,2))}return[o,v]},ur=function(r,e){var n=l(r[e]),t=void 0;switch(n.type){case"number":t=function(r,e){var n=l(r[e]);return[e+1,{type:"Number",value:Number(n.value)}]}(r,e);break;case"string":t=function(r,e){return[e+1,{type:"String",value:l(r[e]).value}]}(r,e);break;case"name":t=function(r,e){return[e+1,{type:"Name",value:l(r[e]).value}]}(r,e);break;case"reservedName":t=function(r,e){return[e+1,{type:"ReservedName",value:l(r[e]).value}]}(r,e);break;case"paren":"("===n.value&&(t=rr(r,e));break;case"shorthand":t=function(r,e){var n=ur(r,e+1);return[n[0],{type:"SpecialExpression",name:"function",params:[n[1]]}]}(r,e);break;case"rest":t=function(r,e){var n=l(r[e+1]);if("name"!==n.type)throw Error("Expected a name node");return[e+2,{type:"Rest",value:n.value}]}(r,e)}if(!t)throw SyntaxError("Unrecognized token: "+n.type+" value="+n.value);return t};function ir(r){for(var e,n,t={type:"Program",body:[]},a=0;a<r.length;)a=(e=ur(r,a))[0],n=e[1],t.body.push(n);return t}var or=/[0-9a-zA-Z_^?=!$%<>.+*/\-[\]]/,vr=/^-?\d+(\.\d+)?$/;function lr(r,e,n,t){return e===n[t]?[1,{type:r,value:e}]:[0,void 0]}function sr(r,e,n,t){var a=n[t],u=0,i="";if(!a||!e.test(a))return[0,void 0];for(;a&&e.test(a);)i+=a,a=n[t+(u+=1)];return[u,{type:r,value:i}]}var fr=[function(r,e){if(";"===r[e]){for(var n=1;"\n"!==r[e+n]&&e+n<r.length;)n+=1;return"\n"===r[e+n]&&e+n<r.length&&(n+=1),[n,void 0]}return[0,void 0]},function(r,e){var n;return/\s/.test(null!==(n=r[e])&&void 0!==n?n:"")?[1,void 0]:[0,void 0]},function(r,e){return lr("paren","(",r,e)},function(r,e){return lr("paren",")",r,e)},function(r,e){if('"'!==r[e])return[0,void 0];for(var n="",t=1,a=r[e+t],u=!1;'"'!==a||u;){if(void 0===a)throw new SyntaxError("Unclosed string at position "+e);u?(u=!1,'"'===a||"\\"===a||(n+="\\"),n+=a):"\\"===a?u=!0:n+=a,a=r[e+(t+=1)]}return[t+1,{type:"string",value:n}]},function(r,e){var n=sr("number",/[0-9.-]/,r,e),t=n[0],a=n[1];if(0===t)return n;var u=r[e+t];if(u&&or.test(u))return[0,void 0];var i=l(a).value;return vr.test(i)?n:[0,void 0]},function(r,e){for(var n=0,t=Object.keys(Z);n<t.length;n++){var a=t[n],u=a.length,i=r[e+u];if((!i||!or.test(i))&&r.substr(e,u)===a)return[u,{type:"reservedName",value:a}]}return[0,void 0]},function(r,e){return sr("name",or,r,e)},function(r,e){return"#'"===r.substr(e,2)?[2,{type:"shorthand",value:"#'"}]:[0,void 0]},function(r,e){return"&rest"===r.substr(e,5)?[5,{type:"rest",value:"&rest"}]:[0,void 0]}];function cr(r){for(var e=[],n=0,t=!1;n<r.length;){t=!1;for(var a=0,u=fr;a<u.length;a++){var i=(0,u[a])(r,n),o=i[0],v=i[1];if(o>0&&(t=!0,n+=o,v)){e.push(v);break}}if(!t)throw new SyntaxError("Unrecognized character at position "+n+": '"+r[n]+"'")}return e}return r.evaluate=Q,r.isLispishFunction=A,r.lispish=function(r,e,n){return void 0===e&&(e={}),void 0===n&&(n={variables:{},functions:{}}),Q(ir(cr(r)),e,n)},r.normalExpressionKeys=K,r.parse=ir,r.reservedNames=H,r.specialExpressionKeys=$,r.tokenize=cr,Object.defineProperty(r,"__esModule",{value:!0}),r}({});
//# sourceMappingURL=lispish.iife.js.map
