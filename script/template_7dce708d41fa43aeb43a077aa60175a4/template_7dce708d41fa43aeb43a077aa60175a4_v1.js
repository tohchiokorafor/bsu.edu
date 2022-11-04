
; /* Start:"a:4:{s:4:"full";s:54:"/bitrix/templates/bsu_2021/js/libs.js?1641821390242060";s:6:"source";s:37:"/bitrix/templates/bsu_2021/js/libs.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
/*! jQuery v3.6.0 | (c) OpenJS Foundation and other contributors | jquery.org/license */ ! function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, (function(e, t) {
    "use strict";
    var n = [],
        i = Object.getPrototypeOf,
        o = n.slice,
        r = n.flat ? function(e) {
            return n.flat.call(e)
        } : function(e) {
            return n.concat.apply([], e)
        },
        s = n.push,
        a = n.indexOf,
        l = {},
        c = l.toString,
        d = l.hasOwnProperty,
        u = d.toString,
        p = u.call(Object),
        f = {},
        h = function(e) {
            return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item
        },
        g = function(e) {
            return null != e && e === e.window
        },
        m = e.document,
        v = {
            type: !0,
            src: !0,
            nonce: !0,
            noModule: !0
        };

    function y(e, t, n) {
        var i, o, r = (n = n || m).createElement("script");
        if (r.text = e, t)
            for (i in v)(o = t[i] || t.getAttribute && t.getAttribute(i)) && r.setAttribute(i, o);
        n.head.appendChild(r).parentNode.removeChild(r)
    }

    function w(e) {
        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? l[c.call(e)] || "object" : typeof e
    }
    var b = "3.6.0",
        x = function(e, t) {
            return new x.fn.init(e, t)
        };

    function T(e) {
        var t = !!e && "length" in e && e.length,
            n = w(e);
        return !h(e) && !g(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
    }
    x.fn = x.prototype = {
        jquery: b,
        constructor: x,
        length: 0,
        toArray: function() {
            return o.call(this)
        },
        get: function(e) {
            return null == e ? o.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = x.merge(this.constructor(), e);
            return t.prevObject = this, t
        },
        each: function(e) {
            return x.each(this, e)
        },
        map: function(e) {
            return this.pushStack(x.map(this, (function(t, n) {
                return e.call(t, n, t)
            })))
        },
        slice: function() {
            return this.pushStack(o.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        even: function() {
            return this.pushStack(x.grep(this, (function(e, t) {
                return (t + 1) % 2
            })))
        },
        odd: function() {
            return this.pushStack(x.grep(this, (function(e, t) {
                return t % 2
            })))
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(0 <= n && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: s,
        sort: n.sort,
        splice: n.splice
    }, x.extend = x.fn.extend = function() {
        var e, t, n, i, o, r, s = arguments[0] || {},
            a = 1,
            l = arguments.length,
            c = !1;
        for ("boolean" == typeof s && (c = s, s = arguments[a] || {}, a++), "object" == typeof s || h(s) || (s = {}), a === l && (s = this, a--); a < l; a++)
            if (null != (e = arguments[a]))
                for (t in e) i = e[t], "__proto__" !== t && s !== i && (c && i && (x.isPlainObject(i) || (o = Array.isArray(i))) ? (n = s[t], r = o && !Array.isArray(n) ? [] : o || x.isPlainObject(n) ? n : {}, o = !1, s[t] = x.extend(c, r, i)) : void 0 !== i && (s[t] = i));
        return s
    }, x.extend({
        expando: "jQuery" + (b + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isPlainObject: function(e) {
            var t, n;
            return !(!e || "[object Object]" !== c.call(e) || (t = i(e)) && ("function" != typeof(n = d.call(t, "constructor") && t.constructor) || u.call(n) !== p))
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        globalEval: function(e, t, n) {
            y(e, {
                nonce: t && t.nonce
            }, n)
        },
        each: function(e, t) {
            var n, i = 0;
            if (T(e))
                for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++);
            else
                for (i in e)
                    if (!1 === t.call(e[i], i, e[i])) break;
            return e
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (T(Object(e)) ? x.merge(n, "string" == typeof e ? [e] : e) : s.call(n, e)), n
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : a.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, i = 0, o = e.length; i < n; i++) e[o++] = t[i];
            return e.length = o, e
        },
        grep: function(e, t, n) {
            for (var i = [], o = 0, r = e.length, s = !n; o < r; o++) !t(e[o], o) !== s && i.push(e[o]);
            return i
        },
        map: function(e, t, n) {
            var i, o, s = 0,
                a = [];
            if (T(e))
                for (i = e.length; s < i; s++) null != (o = t(e[s], s, n)) && a.push(o);
            else
                for (s in e) null != (o = t(e[s], s, n)) && a.push(o);
            return r(a)
        },
        guid: 1,
        support: f
    }), "function" == typeof Symbol && (x.fn[Symbol.iterator] = n[Symbol.iterator]), x.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), (function(e, t) {
        l["[object " + t + "]"] = t.toLowerCase()
    }));
    var k = function(e) {
        var t, n, i, o, r, s, a, l, c, d, u, p, f, h, g, m, v, y, w, b = "sizzle" + 1 * new Date,
            x = e.document,
            T = 0,
            k = 0,
            C = le(),
            S = le(),
            $ = le(),
            E = le(),
            A = function(e, t) {
                return e === t && (u = !0), 0
            },
            j = {}.hasOwnProperty,
            O = [],
            L = O.pop,
            P = O.push,
            H = O.push,
            D = O.slice,
            I = function(e, t) {
                for (var n = 0, i = e.length; n < i; n++)
                    if (e[n] === t) return n;
                return -1
            },
            N = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            M = "[\\x20\\t\\r\\n\\f]",
            q = "(?:\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
            z = "\\[" + M + "*(" + q + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + q + "))|)" + M + "*\\]",
            W = ":(" + q + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + z + ")*)|.*)\\)|)",
            R = new RegExp(M + "+", "g"),
            B = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
            F = new RegExp("^" + M + "*," + M + "*"),
            _ = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
            U = new RegExp(M + "|>"),
            X = new RegExp(W),
            Y = new RegExp("^" + q + "$"),
            G = {
                ID: new RegExp("^#(" + q + ")"),
                CLASS: new RegExp("^\\.(" + q + ")"),
                TAG: new RegExp("^(" + q + "|[*])"),
                ATTR: new RegExp("^" + z),
                PSEUDO: new RegExp("^" + W),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + N + ")$", "i"),
                needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
            },
            V = /HTML$/i,
            K = /^(?:input|select|textarea|button)$/i,
            Q = /^h\d$/i,
            Z = /^[^{]+\{\s*\[native \w/,
            J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ee = /[+~]/,
            te = new RegExp("\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\([^\\r\\n\\f])", "g"),
            ne = function(e, t) {
                var n = "0x" + e.slice(1) - 65536;
                return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320))
            },
            ie = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            oe = function(e, t) {
                return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
            },
            re = function() {
                p()
            },
            se = be((function(e) {
                return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
            }), {
                dir: "parentNode",
                next: "legend"
            });
        try {
            H.apply(O = D.call(x.childNodes), x.childNodes), O[x.childNodes.length].nodeType
        } catch (t) {
            H = {
                apply: O.length ? function(e, t) {
                    P.apply(e, D.call(t))
                } : function(e, t) {
                    for (var n = e.length, i = 0; e[n++] = t[i++];);
                    e.length = n - 1
                }
            }
        }

        function ae(e, t, i, o) {
            var r, a, c, d, u, h, v, y = t && t.ownerDocument,
                x = t ? t.nodeType : 9;
            if (i = i || [], "string" != typeof e || !e || 1 !== x && 9 !== x && 11 !== x) return i;
            if (!o && (p(t), t = t || f, g)) {
                if (11 !== x && (u = J.exec(e)))
                    if (r = u[1]) {
                        if (9 === x) {
                            if (!(c = t.getElementById(r))) return i;
                            if (c.id === r) return i.push(c), i
                        } else if (y && (c = y.getElementById(r)) && w(t, c) && c.id === r) return i.push(c), i
                    } else {
                        if (u[2]) return H.apply(i, t.getElementsByTagName(e)), i;
                        if ((r = u[3]) && n.getElementsByClassName && t.getElementsByClassName) return H.apply(i, t.getElementsByClassName(r)), i
                    } if (n.qsa && !E[e + " "] && (!m || !m.test(e)) && (1 !== x || "object" !== t.nodeName.toLowerCase())) {
                    if (v = e, y = t, 1 === x && (U.test(e) || _.test(e))) {
                        for ((y = ee.test(e) && ve(t.parentNode) || t) === t && n.scope || ((d = t.getAttribute("id")) ? d = d.replace(ie, oe) : t.setAttribute("id", d = b)), a = (h = s(e)).length; a--;) h[a] = (d ? "#" + d : ":scope") + " " + we(h[a]);
                        v = h.join(",")
                    }
                    try {
                        return H.apply(i, y.querySelectorAll(v)), i
                    } catch (t) {
                        E(e, !0)
                    } finally {
                        d === b && t.removeAttribute("id")
                    }
                }
            }
            return l(e.replace(B, "$1"), t, i, o)
        }

        function le() {
            var e = [];
            return function t(n, o) {
                return e.push(n + " ") > i.cacheLength && delete t[e.shift()], t[n + " "] = o
            }
        }

        function ce(e) {
            return e[b] = !0, e
        }

        function de(e) {
            var t = f.createElement("fieldset");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function ue(e, t) {
            for (var n = e.split("|"), o = n.length; o--;) i.attrHandle[n[o]] = t
        }

        function pe(e, t) {
            var n = t && e,
                i = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (i) return i;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function fe(e) {
            return function(t) {
                return "input" === t.nodeName.toLowerCase() && t.type === e
            }
        }

        function he(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function ge(e) {
            return function(t) {
                return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && se(t) === e : t.disabled === e : "label" in t && t.disabled === e
            }
        }

        function me(e) {
            return ce((function(t) {
                return t = +t, ce((function(n, i) {
                    for (var o, r = e([], n.length, t), s = r.length; s--;) n[o = r[s]] && (n[o] = !(i[o] = n[o]))
                }))
            }))
        }

        function ve(e) {
            return e && void 0 !== e.getElementsByTagName && e
        }
        for (t in n = ae.support = {}, r = ae.isXML = function(e) {
                var t = e && e.namespaceURI,
                    n = e && (e.ownerDocument || e).documentElement;
                return !V.test(t || n && n.nodeName || "HTML")
            }, p = ae.setDocument = function(e) {
                var t, o, s = e ? e.ownerDocument || e : x;
                return s != f && 9 === s.nodeType && s.documentElement && (h = (f = s).documentElement, g = !r(f), x != f && (o = f.defaultView) && o.top !== o && (o.addEventListener ? o.addEventListener("unload", re, !1) : o.attachEvent && o.attachEvent("onunload", re)), n.scope = de((function(e) {
                    return h.appendChild(e).appendChild(f.createElement("div")), void 0 !== e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length
                })), n.attributes = de((function(e) {
                    return e.className = "i", !e.getAttribute("className")
                })), n.getElementsByTagName = de((function(e) {
                    return e.appendChild(f.createComment("")), !e.getElementsByTagName("*").length
                })), n.getElementsByClassName = Z.test(f.getElementsByClassName), n.getById = de((function(e) {
                    return h.appendChild(e).id = b, !f.getElementsByName || !f.getElementsByName(b).length
                })), n.getById ? (i.filter.ID = function(e) {
                    var t = e.replace(te, ne);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }, i.find.ID = function(e, t) {
                    if (void 0 !== t.getElementById && g) {
                        var n = t.getElementById(e);
                        return n ? [n] : []
                    }
                }) : (i.filter.ID = function(e) {
                    var t = e.replace(te, ne);
                    return function(e) {
                        var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                        return n && n.value === t
                    }
                }, i.find.ID = function(e, t) {
                    if (void 0 !== t.getElementById && g) {
                        var n, i, o, r = t.getElementById(e);
                        if (r) {
                            if ((n = r.getAttributeNode("id")) && n.value === e) return [r];
                            for (o = t.getElementsByName(e), i = 0; r = o[i++];)
                                if ((n = r.getAttributeNode("id")) && n.value === e) return [r]
                        }
                        return []
                    }
                }), i.find.TAG = n.getElementsByTagName ? function(e, t) {
                    return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0
                } : function(e, t) {
                    var n, i = [],
                        o = 0,
                        r = t.getElementsByTagName(e);
                    if ("*" === e) {
                        for (; n = r[o++];) 1 === n.nodeType && i.push(n);
                        return i
                    }
                    return r
                }, i.find.CLASS = n.getElementsByClassName && function(e, t) {
                    if (void 0 !== t.getElementsByClassName && g) return t.getElementsByClassName(e)
                }, v = [], m = [], (n.qsa = Z.test(f.querySelectorAll)) && (de((function(e) {
                    var t;
                    h.appendChild(e).innerHTML = "<a id='" + b + "'></a><select id='" + b + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || m.push("\\[" + M + "*(?:value|" + N + ")"), e.querySelectorAll("[id~=" + b + "-]").length || m.push("~="), (t = f.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || m.push("\\[" + M + "*name" + M + "*=" + M + "*(?:''|\"\")"), e.querySelectorAll(":checked").length || m.push(":checked"), e.querySelectorAll("a#" + b + "+*").length || m.push(".#.+[+~]"), e.querySelectorAll("\\\f"), m.push("[\\r\\n\\f]")
                })), de((function(e) {
                    e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var t = f.createElement("input");
                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && m.push("name" + M + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && m.push(":enabled", ":disabled"), h.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && m.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), m.push(",.*:")
                }))), (n.matchesSelector = Z.test(y = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && de((function(e) {
                    n.disconnectedMatch = y.call(e, "*"), y.call(e, "[s!='']:x"), v.push("!=", W)
                })), m = m.length && new RegExp(m.join("|")), v = v.length && new RegExp(v.join("|")), t = Z.test(h.compareDocumentPosition), w = t || Z.test(h.contains) ? function(e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                        i = t && t.parentNode;
                    return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
                } : function(e, t) {
                    if (t)
                        for (; t = t.parentNode;)
                            if (t === e) return !0;
                    return !1
                }, A = t ? function(e, t) {
                    if (e === t) return u = !0, 0;
                    var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return i || (1 & (i = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === i ? e == f || e.ownerDocument == x && w(x, e) ? -1 : t == f || t.ownerDocument == x && w(x, t) ? 1 : d ? I(d, e) - I(d, t) : 0 : 4 & i ? -1 : 1)
                } : function(e, t) {
                    if (e === t) return u = !0, 0;
                    var n, i = 0,
                        o = e.parentNode,
                        r = t.parentNode,
                        s = [e],
                        a = [t];
                    if (!o || !r) return e == f ? -1 : t == f ? 1 : o ? -1 : r ? 1 : d ? I(d, e) - I(d, t) : 0;
                    if (o === r) return pe(e, t);
                    for (n = e; n = n.parentNode;) s.unshift(n);
                    for (n = t; n = n.parentNode;) a.unshift(n);
                    for (; s[i] === a[i];) i++;
                    return i ? pe(s[i], a[i]) : s[i] == x ? -1 : a[i] == x ? 1 : 0
                }), f
            }, ae.matches = function(e, t) {
                return ae(e, null, null, t)
            }, ae.matchesSelector = function(e, t) {
                if (p(e), n.matchesSelector && g && !E[t + " "] && (!v || !v.test(t)) && (!m || !m.test(t))) try {
                    var i = y.call(e, t);
                    if (i || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
                } catch (e) {
                    E(t, !0)
                }
                return 0 < ae(t, f, null, [e]).length
            }, ae.contains = function(e, t) {
                return (e.ownerDocument || e) != f && p(e), w(e, t)
            }, ae.attr = function(e, t) {
                (e.ownerDocument || e) != f && p(e);
                var o = i.attrHandle[t.toLowerCase()],
                    r = o && j.call(i.attrHandle, t.toLowerCase()) ? o(e, t, !g) : void 0;
                return void 0 !== r ? r : n.attributes || !g ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
            }, ae.escape = function(e) {
                return (e + "").replace(ie, oe)
            }, ae.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, ae.uniqueSort = function(e) {
                var t, i = [],
                    o = 0,
                    r = 0;
                if (u = !n.detectDuplicates, d = !n.sortStable && e.slice(0), e.sort(A), u) {
                    for (; t = e[r++];) t === e[r] && (o = i.push(r));
                    for (; o--;) e.splice(i[o], 1)
                }
                return d = null, e
            }, o = ae.getText = function(e) {
                var t, n = "",
                    i = 0,
                    r = e.nodeType;
                if (r) {
                    if (1 === r || 9 === r || 11 === r) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += o(e)
                    } else if (3 === r || 4 === r) return e.nodeValue
                } else
                    for (; t = e[i++];) n += o(t);
                return n
            }, (i = ae.selectors = {
                cacheLength: 50,
                createPseudo: ce,
                match: G,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || ae.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ae.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, n = !e[6] && e[2];
                        return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = s(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(te, ne).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = C[e + " "];
                        return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && C(e, (function(e) {
                            return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                        }))
                    },
                    ATTR: function(e, t, n) {
                        return function(i) {
                            var o = ae.attr(i, e);
                            return null == o ? "!=" === t : !t || (o += "", "=" === t ? o === n : "!=" === t ? o !== n : "^=" === t ? n && 0 === o.indexOf(n) : "*=" === t ? n && -1 < o.indexOf(n) : "$=" === t ? n && o.slice(-n.length) === n : "~=" === t ? -1 < (" " + o.replace(R, " ") + " ").indexOf(n) : "|=" === t && (o === n || o.slice(0, n.length + 1) === n + "-"))
                        }
                    },
                    CHILD: function(e, t, n, i, o) {
                        var r = "nth" !== e.slice(0, 3),
                            s = "last" !== e.slice(-4),
                            a = "of-type" === t;
                        return 1 === i && 0 === o ? function(e) {
                            return !!e.parentNode
                        } : function(t, n, l) {
                            var c, d, u, p, f, h, g = r !== s ? "nextSibling" : "previousSibling",
                                m = t.parentNode,
                                v = a && t.nodeName.toLowerCase(),
                                y = !l && !a,
                                w = !1;
                            if (m) {
                                if (r) {
                                    for (; g;) {
                                        for (p = t; p = p[g];)
                                            if (a ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) return !1;
                                        h = g = "only" === e && !h && "nextSibling"
                                    }
                                    return !0
                                }
                                if (h = [s ? m.firstChild : m.lastChild], s && y) {
                                    for (w = (f = (c = (d = (u = (p = m)[b] || (p[b] = {}))[p.uniqueID] || (u[p.uniqueID] = {}))[e] || [])[0] === T && c[1]) && c[2], p = f && m.childNodes[f]; p = ++f && p && p[g] || (w = f = 0) || h.pop();)
                                        if (1 === p.nodeType && ++w && p === t) {
                                            d[e] = [T, f, w];
                                            break
                                        }
                                } else if (y && (w = f = (c = (d = (u = (p = t)[b] || (p[b] = {}))[p.uniqueID] || (u[p.uniqueID] = {}))[e] || [])[0] === T && c[1]), !1 === w)
                                    for (;
                                        (p = ++f && p && p[g] || (w = f = 0) || h.pop()) && ((a ? p.nodeName.toLowerCase() !== v : 1 !== p.nodeType) || !++w || (y && ((d = (u = p[b] || (p[b] = {}))[p.uniqueID] || (u[p.uniqueID] = {}))[e] = [T, w]), p !== t)););
                                return (w -= o) === i || w % i == 0 && 0 <= w / i
                            }
                        }
                    },
                    PSEUDO: function(e, t) {
                        var n, o = i.pseudos[e] || i.setFilters[e.toLowerCase()] || ae.error("unsupported pseudo: " + e);
                        return o[b] ? o(t) : 1 < o.length ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? ce((function(e, n) {
                            for (var i, r = o(e, t), s = r.length; s--;) e[i = I(e, r[s])] = !(n[i] = r[s])
                        })) : function(e) {
                            return o(e, 0, n)
                        }) : o
                    }
                },
                pseudos: {
                    not: ce((function(e) {
                        var t = [],
                            n = [],
                            i = a(e.replace(B, "$1"));
                        return i[b] ? ce((function(e, t, n, o) {
                            for (var r, s = i(e, null, o, []), a = e.length; a--;)(r = s[a]) && (e[a] = !(t[a] = r))
                        })) : function(e, o, r) {
                            return t[0] = e, i(t, null, r, n), t[0] = null, !n.pop()
                        }
                    })),
                    has: ce((function(e) {
                        return function(t) {
                            return 0 < ae(e, t).length
                        }
                    })),
                    contains: ce((function(e) {
                        return e = e.replace(te, ne),
                            function(t) {
                                return -1 < (t.textContent || o(t)).indexOf(e)
                            }
                    })),
                    lang: ce((function(e) {
                        return Y.test(e || "") || ae.error("unsupported lang: " + e), e = e.replace(te, ne).toLowerCase(),
                            function(t) {
                                var n;
                                do {
                                    if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                                } while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                    })),
                    target: function(t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
                    },
                    root: function(e) {
                        return e === h
                    },
                    focus: function(e) {
                        return e === f.activeElement && (!f.hasFocus || f.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: ge(!1),
                    disabled: ge(!0),
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !i.pseudos.empty(e)
                    },
                    header: function(e) {
                        return Q.test(e.nodeName)
                    },
                    input: function(e) {
                        return K.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function(e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                    },
                    first: me((function() {
                        return [0]
                    })),
                    last: me((function(e, t) {
                        return [t - 1]
                    })),
                    eq: me((function(e, t, n) {
                        return [n < 0 ? n + t : n]
                    })),
                    even: me((function(e, t) {
                        for (var n = 0; n < t; n += 2) e.push(n);
                        return e
                    })),
                    odd: me((function(e, t) {
                        for (var n = 1; n < t; n += 2) e.push(n);
                        return e
                    })),
                    lt: me((function(e, t, n) {
                        for (var i = n < 0 ? n + t : t < n ? t : n; 0 <= --i;) e.push(i);
                        return e
                    })),
                    gt: me((function(e, t, n) {
                        for (var i = n < 0 ? n + t : n; ++i < t;) e.push(i);
                        return e
                    }))
                }
            }).pseudos.nth = i.pseudos.eq, {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) i.pseudos[t] = fe(t);
        for (t in {
                submit: !0,
                reset: !0
            }) i.pseudos[t] = he(t);

        function ye() {}

        function we(e) {
            for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
            return i
        }

        function be(e, t, n) {
            var i = t.dir,
                o = t.next,
                r = o || i,
                s = n && "parentNode" === r,
                a = k++;
            return t.first ? function(t, n, o) {
                for (; t = t[i];)
                    if (1 === t.nodeType || s) return e(t, n, o);
                return !1
            } : function(t, n, l) {
                var c, d, u, p = [T, a];
                if (l) {
                    for (; t = t[i];)
                        if ((1 === t.nodeType || s) && e(t, n, l)) return !0
                } else
                    for (; t = t[i];)
                        if (1 === t.nodeType || s)
                            if (d = (u = t[b] || (t[b] = {}))[t.uniqueID] || (u[t.uniqueID] = {}), o && o === t.nodeName.toLowerCase()) t = t[i] || t;
                            else {
                                if ((c = d[r]) && c[0] === T && c[1] === a) return p[2] = c[2];
                                if ((d[r] = p)[2] = e(t, n, l)) return !0
                            } return !1
            }
        }

        function xe(e) {
            return 1 < e.length ? function(t, n, i) {
                for (var o = e.length; o--;)
                    if (!e[o](t, n, i)) return !1;
                return !0
            } : e[0]
        }

        function Te(e, t, n, i, o) {
            for (var r, s = [], a = 0, l = e.length, c = null != t; a < l; a++)(r = e[a]) && (n && !n(r, i, o) || (s.push(r), c && t.push(a)));
            return s
        }

        function ke(e, t, n, i, o, r) {
            return i && !i[b] && (i = ke(i)), o && !o[b] && (o = ke(o, r)), ce((function(r, s, a, l) {
                var c, d, u, p = [],
                    f = [],
                    h = s.length,
                    g = r || function(e, t, n) {
                        for (var i = 0, o = t.length; i < o; i++) ae(e, t[i], n);
                        return n
                    }(t || "*", a.nodeType ? [a] : a, []),
                    m = !e || !r && t ? g : Te(g, p, e, a, l),
                    v = n ? o || (r ? e : h || i) ? [] : s : m;
                if (n && n(m, v, a, l), i)
                    for (c = Te(v, f), i(c, [], a, l), d = c.length; d--;)(u = c[d]) && (v[f[d]] = !(m[f[d]] = u));
                if (r) {
                    if (o || e) {
                        if (o) {
                            for (c = [], d = v.length; d--;)(u = v[d]) && c.push(m[d] = u);
                            o(null, v = [], c, l)
                        }
                        for (d = v.length; d--;)(u = v[d]) && -1 < (c = o ? I(r, u) : p[d]) && (r[c] = !(s[c] = u))
                    }
                } else v = Te(v === s ? v.splice(h, v.length) : v), o ? o(null, s, v, l) : H.apply(s, v)
            }))
        }

        function Ce(e) {
            for (var t, n, o, r = e.length, s = i.relative[e[0].type], a = s || i.relative[" "], l = s ? 1 : 0, d = be((function(e) {
                    return e === t
                }), a, !0), u = be((function(e) {
                    return -1 < I(t, e)
                }), a, !0), p = [function(e, n, i) {
                    var o = !s && (i || n !== c) || ((t = n).nodeType ? d(e, n, i) : u(e, n, i));
                    return t = null, o
                }]; l < r; l++)
                if (n = i.relative[e[l].type]) p = [be(xe(p), n)];
                else {
                    if ((n = i.filter[e[l].type].apply(null, e[l].matches))[b]) {
                        for (o = ++l; o < r && !i.relative[e[o].type]; o++);
                        return ke(1 < l && xe(p), 1 < l && we(e.slice(0, l - 1).concat({
                            value: " " === e[l - 2].type ? "*" : ""
                        })).replace(B, "$1"), n, l < o && Ce(e.slice(l, o)), o < r && Ce(e = e.slice(o)), o < r && we(e))
                    }
                    p.push(n)
                } return xe(p)
        }
        return ye.prototype = i.filters = i.pseudos, i.setFilters = new ye, s = ae.tokenize = function(e, t) {
            var n, o, r, s, a, l, c, d = S[e + " "];
            if (d) return t ? 0 : d.slice(0);
            for (a = e, l = [], c = i.preFilter; a;) {
                for (s in n && !(o = F.exec(a)) || (o && (a = a.slice(o[0].length) || a), l.push(r = [])), n = !1, (o = _.exec(a)) && (n = o.shift(), r.push({
                        value: n,
                        type: o[0].replace(B, " ")
                    }), a = a.slice(n.length)), i.filter) !(o = G[s].exec(a)) || c[s] && !(o = c[s](o)) || (n = o.shift(), r.push({
                    value: n,
                    type: s,
                    matches: o
                }), a = a.slice(n.length));
                if (!n) break
            }
            return t ? a.length : a ? ae.error(e) : S(e, l).slice(0)
        }, a = ae.compile = function(e, t) {
            var n, o, r, a, l, d, u = [],
                h = [],
                m = $[e + " "];
            if (!m) {
                for (t || (t = s(e)), n = t.length; n--;)(m = Ce(t[n]))[b] ? u.push(m) : h.push(m);
                (m = $(e, (o = h, a = 0 < (r = u).length, l = 0 < o.length, d = function(e, t, n, s, d) {
                    var u, h, m, v = 0,
                        y = "0",
                        w = e && [],
                        b = [],
                        x = c,
                        k = e || l && i.find.TAG("*", d),
                        C = T += null == x ? 1 : Math.random() || .1,
                        S = k.length;
                    for (d && (c = t == f || t || d); y !== S && null != (u = k[y]); y++) {
                        if (l && u) {
                            for (h = 0, t || u.ownerDocument == f || (p(u), n = !g); m = o[h++];)
                                if (m(u, t || f, n)) {
                                    s.push(u);
                                    break
                                } d && (T = C)
                        }
                        a && ((u = !m && u) && v--, e && w.push(u))
                    }
                    if (v += y, a && y !== v) {
                        for (h = 0; m = r[h++];) m(w, b, t, n);
                        if (e) {
                            if (0 < v)
                                for (; y--;) w[y] || b[y] || (b[y] = L.call(s));
                            b = Te(b)
                        }
                        H.apply(s, b), d && !e && 0 < b.length && 1 < v + r.length && ae.uniqueSort(s)
                    }
                    return d && (T = C, c = x), w
                }, a ? ce(d) : d))).selector = e
            }
            return m
        }, l = ae.select = function(e, t, n, o) {
            var r, l, c, d, u, p = "function" == typeof e && e,
                f = !o && s(e = p.selector || e);
            if (n = n || [], 1 === f.length) {
                if (2 < (l = f[0] = f[0].slice(0)).length && "ID" === (c = l[0]).type && 9 === t.nodeType && g && i.relative[l[1].type]) {
                    if (!(t = (i.find.ID(c.matches[0].replace(te, ne), t) || [])[0])) return n;
                    p && (t = t.parentNode), e = e.slice(l.shift().value.length)
                }
                for (r = G.needsContext.test(e) ? 0 : l.length; r-- && (c = l[r], !i.relative[d = c.type]);)
                    if ((u = i.find[d]) && (o = u(c.matches[0].replace(te, ne), ee.test(l[0].type) && ve(t.parentNode) || t))) {
                        if (l.splice(r, 1), !(e = o.length && we(l))) return H.apply(n, o), n;
                        break
                    }
            }
            return (p || a(e, f))(o, t, !g, n, !t || ee.test(e) && ve(t.parentNode) || t), n
        }, n.sortStable = b.split("").sort(A).join("") === b, n.detectDuplicates = !!u, p(), n.sortDetached = de((function(e) {
            return 1 & e.compareDocumentPosition(f.createElement("fieldset"))
        })), de((function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        })) || ue("type|href|height|width", (function(e, t, n) {
            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        })), n.attributes && de((function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        })) || ue("value", (function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
        })), de((function(e) {
            return null == e.getAttribute("disabled")
        })) || ue(N, (function(e, t, n) {
            var i;
            if (!n) return !0 === e[t] ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        })), ae
    }(e);
    x.find = k, x.expr = k.selectors, x.expr[":"] = x.expr.pseudos, x.uniqueSort = x.unique = k.uniqueSort, x.text = k.getText, x.isXMLDoc = k.isXML, x.contains = k.contains, x.escapeSelector = k.escape;
    var C = function(e, t, n) {
            for (var i = [], o = void 0 !== n;
                (e = e[t]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) {
                    if (o && x(e).is(n)) break;
                    i.push(e)
                } return i
        },
        S = function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        },
        $ = x.expr.match.needsContext;

    function E(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }
    var A = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

    function j(e, t, n) {
        return h(t) ? x.grep(e, (function(e, i) {
            return !!t.call(e, i, e) !== n
        })) : t.nodeType ? x.grep(e, (function(e) {
            return e === t !== n
        })) : "string" != typeof t ? x.grep(e, (function(e) {
            return -1 < a.call(t, e) !== n
        })) : x.filter(t, e, n)
    }
    x.filter = function(e, t, n) {
        var i = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? x.find.matchesSelector(i, e) ? [i] : [] : x.find.matches(e, x.grep(t, (function(e) {
            return 1 === e.nodeType
        })))
    }, x.fn.extend({
        find: function(e) {
            var t, n, i = this.length,
                o = this;
            if ("string" != typeof e) return this.pushStack(x(e).filter((function() {
                for (t = 0; t < i; t++)
                    if (x.contains(o[t], this)) return !0
            })));
            for (n = this.pushStack([]), t = 0; t < i; t++) x.find(e, o[t], n);
            return 1 < i ? x.uniqueSort(n) : n
        },
        filter: function(e) {
            return this.pushStack(j(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(j(this, e || [], !0))
        },
        is: function(e) {
            return !!j(this, "string" == typeof e && $.test(e) ? x(e) : e || [], !1).length
        }
    });
    var O, L = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (x.fn.init = function(e, t, n) {
        var i, o;
        if (!e) return this;
        if (n = n || O, "string" == typeof e) {
            if (!(i = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : L.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (i[1]) {
                if (t = t instanceof x ? t[0] : t, x.merge(this, x.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : m, !0)), A.test(i[1]) && x.isPlainObject(t))
                    for (i in t) h(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                return this
            }
            return (o = m.getElementById(i[2])) && (this[0] = o, this.length = 1), this
        }
        return e.nodeType ? (this[0] = e, this.length = 1, this) : h(e) ? void 0 !== n.ready ? n.ready(e) : e(x) : x.makeArray(e, this)
    }).prototype = x.fn, O = x(m);
    var P = /^(?:parents|prev(?:Until|All))/,
        H = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };

    function D(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }
    x.fn.extend({
        has: function(e) {
            var t = x(e, this),
                n = t.length;
            return this.filter((function() {
                for (var e = 0; e < n; e++)
                    if (x.contains(this, t[e])) return !0
            }))
        },
        closest: function(e, t) {
            var n, i = 0,
                o = this.length,
                r = [],
                s = "string" != typeof e && x(e);
            if (!$.test(e))
                for (; i < o; i++)
                    for (n = this[i]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (s ? -1 < s.index(n) : 1 === n.nodeType && x.find.matchesSelector(n, e))) {
                            r.push(n);
                            break
                        } return this.pushStack(1 < r.length ? x.uniqueSort(r) : r)
        },
        index: function(e) {
            return e ? "string" == typeof e ? a.call(x(e), this[0]) : a.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(x.uniqueSort(x.merge(this.get(), x(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), x.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return C(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return C(e, "parentNode", n)
        },
        next: function(e) {
            return D(e, "nextSibling")
        },
        prev: function(e) {
            return D(e, "previousSibling")
        },
        nextAll: function(e) {
            return C(e, "nextSibling")
        },
        prevAll: function(e) {
            return C(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return C(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return C(e, "previousSibling", n)
        },
        siblings: function(e) {
            return S((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return S(e.firstChild)
        },
        contents: function(e) {
            return null != e.contentDocument && i(e.contentDocument) ? e.contentDocument : (E(e, "template") && (e = e.content || e), x.merge([], e.childNodes))
        }
    }, (function(e, t) {
        x.fn[e] = function(n, i) {
            var o = x.map(this, t, n);
            return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (o = x.filter(i, o)), 1 < this.length && (H[e] || x.uniqueSort(o), P.test(e) && o.reverse()), this.pushStack(o)
        }
    }));
    var I = /[^\x20\t\r\n\f]+/g;

    function N(e) {
        return e
    }

    function M(e) {
        throw e
    }

    function q(e, t, n, i) {
        var o;
        try {
            e && h(o = e.promise) ? o.call(e).done(t).fail(n) : e && h(o = e.then) ? o.call(e, t, n) : t.apply(void 0, [e].slice(i))
        } catch (e) {
            n.apply(void 0, [e])
        }
    }
    x.Callbacks = function(e) {
        var t, n;
        e = "string" == typeof e ? (t = e, n = {}, x.each(t.match(I) || [], (function(e, t) {
            n[t] = !0
        })), n) : x.extend({}, e);
        var i, o, r, s, a = [],
            l = [],
            c = -1,
            d = function() {
                for (s = s || e.once, r = i = !0; l.length; c = -1)
                    for (o = l.shift(); ++c < a.length;) !1 === a[c].apply(o[0], o[1]) && e.stopOnFalse && (c = a.length, o = !1);
                e.memory || (o = !1), i = !1, s && (a = o ? [] : "")
            },
            u = {
                add: function() {
                    return a && (o && !i && (c = a.length - 1, l.push(o)), function t(n) {
                        x.each(n, (function(n, i) {
                            h(i) ? e.unique && u.has(i) || a.push(i) : i && i.length && "string" !== w(i) && t(i)
                        }))
                    }(arguments), o && !i && d()), this
                },
                remove: function() {
                    return x.each(arguments, (function(e, t) {
                        for (var n; - 1 < (n = x.inArray(t, a, n));) a.splice(n, 1), n <= c && c--
                    })), this
                },
                has: function(e) {
                    return e ? -1 < x.inArray(e, a) : 0 < a.length
                },
                empty: function() {
                    return a && (a = []), this
                },
                disable: function() {
                    return s = l = [], a = o = "", this
                },
                disabled: function() {
                    return !a
                },
                lock: function() {
                    return s = l = [], o || i || (a = o = ""), this
                },
                locked: function() {
                    return !!s
                },
                fireWith: function(e, t) {
                    return s || (t = [e, (t = t || []).slice ? t.slice() : t], l.push(t), i || d()), this
                },
                fire: function() {
                    return u.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!r
                }
            };
        return u
    }, x.extend({
        Deferred: function(t) {
            var n = [
                    ["notify", "progress", x.Callbacks("memory"), x.Callbacks("memory"), 2],
                    ["resolve", "done", x.Callbacks("once memory"), x.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", x.Callbacks("once memory"), x.Callbacks("once memory"), 1, "rejected"]
                ],
                i = "pending",
                o = {
                    state: function() {
                        return i
                    },
                    always: function() {
                        return r.done(arguments).fail(arguments), this
                    },
                    catch: function(e) {
                        return o.then(null, e)
                    },
                    pipe: function() {
                        var e = arguments;
                        return x.Deferred((function(t) {
                            x.each(n, (function(n, i) {
                                var o = h(e[i[4]]) && e[i[4]];
                                r[i[1]]((function() {
                                    var e = o && o.apply(this, arguments);
                                    e && h(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[i[0] + "With"](this, o ? [e] : arguments)
                                }))
                            })), e = null
                        })).promise()
                    },
                    then: function(t, i, o) {
                        var r = 0;

                        function s(t, n, i, o) {
                            return function() {
                                var a = this,
                                    l = arguments,
                                    c = function() {
                                        var e, c;
                                        if (!(t < r)) {
                                            if ((e = i.apply(a, l)) === n.promise()) throw new TypeError("Thenable self-resolution");
                                            c = e && ("object" == typeof e || "function" == typeof e) && e.then, h(c) ? o ? c.call(e, s(r, n, N, o), s(r, n, M, o)) : (r++, c.call(e, s(r, n, N, o), s(r, n, M, o), s(r, n, N, n.notifyWith))) : (i !== N && (a = void 0, l = [e]), (o || n.resolveWith)(a, l))
                                        }
                                    },
                                    d = o ? c : function() {
                                        try {
                                            c()
                                        } catch (e) {
                                            x.Deferred.exceptionHook && x.Deferred.exceptionHook(e, d.stackTrace), r <= t + 1 && (i !== M && (a = void 0, l = [e]), n.rejectWith(a, l))
                                        }
                                    };
                                t ? d() : (x.Deferred.getStackHook && (d.stackTrace = x.Deferred.getStackHook()), e.setTimeout(d))
                            }
                        }
                        return x.Deferred((function(e) {
                            n[0][3].add(s(0, e, h(o) ? o : N, e.notifyWith)), n[1][3].add(s(0, e, h(t) ? t : N)), n[2][3].add(s(0, e, h(i) ? i : M))
                        })).promise()
                    },
                    promise: function(e) {
                        return null != e ? x.extend(e, o) : o
                    }
                },
                r = {};
            return x.each(n, (function(e, t) {
                var s = t[2],
                    a = t[5];
                o[t[1]] = s.add, a && s.add((function() {
                    i = a
                }), n[3 - e][2].disable, n[3 - e][3].disable, n[0][2].lock, n[0][3].lock), s.add(t[3].fire), r[t[0]] = function() {
                    return r[t[0] + "With"](this === r ? void 0 : this, arguments), this
                }, r[t[0] + "With"] = s.fireWith
            })), o.promise(r), t && t.call(r, r), r
        },
        when: function(e) {
            var t = arguments.length,
                n = t,
                i = Array(n),
                r = o.call(arguments),
                s = x.Deferred(),
                a = function(e) {
                    return function(n) {
                        i[e] = this, r[e] = 1 < arguments.length ? o.call(arguments) : n, --t || s.resolveWith(i, r)
                    }
                };
            if (t <= 1 && (q(e, s.done(a(n)).resolve, s.reject, !t), "pending" === s.state() || h(r[n] && r[n].then))) return s.then();
            for (; n--;) q(r[n], a(n), s.reject);
            return s.promise()
        }
    });
    var z = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    x.Deferred.exceptionHook = function(t, n) {
        e.console && e.console.warn && t && z.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n)
    }, x.readyException = function(t) {
        e.setTimeout((function() {
            throw t
        }))
    };
    var W = x.Deferred();

    function R() {
        m.removeEventListener("DOMContentLoaded", R), e.removeEventListener("load", R), x.ready()
    }
    x.fn.ready = function(e) {
        return W.then(e).catch((function(e) {
            x.readyException(e)
        })), this
    }, x.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {
            (!0 === e ? --x.readyWait : x.isReady) || (x.isReady = !0) !== e && 0 < --x.readyWait || W.resolveWith(m, [x])
        }
    }), x.ready.then = W.then, "complete" === m.readyState || "loading" !== m.readyState && !m.documentElement.doScroll ? e.setTimeout(x.ready) : (m.addEventListener("DOMContentLoaded", R), e.addEventListener("load", R));
    var B = function(e, t, n, i, o, r, s) {
            var a = 0,
                l = e.length,
                c = null == n;
            if ("object" === w(n))
                for (a in o = !0, n) B(e, t, a, n[a], !0, r, s);
            else if (void 0 !== i && (o = !0, h(i) || (s = !0), c && (s ? (t.call(e, i), t = null) : (c = t, t = function(e, t, n) {
                    return c.call(x(e), n)
                })), t))
                for (; a < l; a++) t(e[a], n, s ? i : i.call(e[a], a, t(e[a], n)));
            return o ? e : c ? t.call(e) : l ? t(e[0], n) : r
        },
        F = /^-ms-/,
        _ = /-([a-z])/g;

    function U(e, t) {
        return t.toUpperCase()
    }

    function X(e) {
        return e.replace(F, "ms-").replace(_, U)
    }
    var Y = function(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    };

    function G() {
        this.expando = x.expando + G.uid++
    }
    G.uid = 1, G.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {}, Y(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        },
        set: function(e, t, n) {
            var i, o = this.cache(e);
            if ("string" == typeof t) o[X(t)] = n;
            else
                for (i in t) o[X(i)] = t[i];
            return o
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][X(t)]
        },
        access: function(e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, i = e[this.expando];
            if (void 0 !== i) {
                if (void 0 !== t) {
                    n = (t = Array.isArray(t) ? t.map(X) : (t = X(t)) in i ? [t] : t.match(I) || []).length;
                    for (; n--;) delete i[t[n]]
                }(void 0 === t || x.isEmptyObject(i)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !x.isEmptyObject(t)
        }
    };
    var V = new G,
        K = new G,
        Q = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Z = /[A-Z]/g;

    function J(e, t, n) {
        var i, o;
        if (void 0 === n && 1 === e.nodeType)
            if (i = "data-" + t.replace(Z, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(i))) {
                try {
                    n = "true" === (o = n) || "false" !== o && ("null" === o ? null : o === +o + "" ? +o : Q.test(o) ? JSON.parse(o) : o)
                } catch (e) {}
                K.set(e, t, n)
            } else n = void 0;
        return n
    }
    x.extend({
        hasData: function(e) {
            return K.hasData(e) || V.hasData(e)
        },
        data: function(e, t, n) {
            return K.access(e, t, n)
        },
        removeData: function(e, t) {
            K.remove(e, t)
        },
        _data: function(e, t, n) {
            return V.access(e, t, n)
        },
        _removeData: function(e, t) {
            V.remove(e, t)
        }
    }), x.fn.extend({
        data: function(e, t) {
            var n, i, o, r = this[0],
                s = r && r.attributes;
            if (void 0 === e) {
                if (this.length && (o = K.get(r), 1 === r.nodeType && !V.get(r, "hasDataAttrs"))) {
                    for (n = s.length; n--;) s[n] && 0 === (i = s[n].name).indexOf("data-") && (i = X(i.slice(5)), J(r, i, o[i]));
                    V.set(r, "hasDataAttrs", !0)
                }
                return o
            }
            return "object" == typeof e ? this.each((function() {
                K.set(this, e)
            })) : B(this, (function(t) {
                var n;
                if (r && void 0 === t) return void 0 !== (n = K.get(r, e)) || void 0 !== (n = J(r, e)) ? n : void 0;
                this.each((function() {
                    K.set(this, e, t)
                }))
            }), null, t, 1 < arguments.length, null, !0)
        },
        removeData: function(e) {
            return this.each((function() {
                K.remove(this, e)
            }))
        }
    }), x.extend({
        queue: function(e, t, n) {
            var i;
            if (e) return t = (t || "fx") + "queue", i = V.get(e, t), n && (!i || Array.isArray(n) ? i = V.access(e, t, x.makeArray(n)) : i.push(n)), i || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = x.queue(e, t),
                i = n.length,
                o = n.shift(),
                r = x._queueHooks(e, t);
            "inprogress" === o && (o = n.shift(), i--), o && ("fx" === t && n.unshift("inprogress"), delete r.stop, o.call(e, (function() {
                x.dequeue(e, t)
            }), r)), !i && r && r.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return V.get(e, n) || V.access(e, n, {
                empty: x.Callbacks("once memory").add((function() {
                    V.remove(e, [t + "queue", n])
                }))
            })
        }
    }), x.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? x.queue(this[0], e) : void 0 === t ? this : this.each((function() {
                var n = x.queue(this, e, t);
                x._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && x.dequeue(this, e)
            }))
        },
        dequeue: function(e) {
            return this.each((function() {
                x.dequeue(this, e)
            }))
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, i = 1,
                o = x.Deferred(),
                r = this,
                s = this.length,
                a = function() {
                    --i || o.resolveWith(r, [r])
                };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--;)(n = V.get(r[s], e + "queueHooks")) && n.empty && (i++, n.empty.add(a));
            return a(), o.promise(t)
        }
    });
    var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"),
        ne = ["Top", "Right", "Bottom", "Left"],
        ie = m.documentElement,
        oe = function(e) {
            return x.contains(e.ownerDocument, e)
        },
        re = {
            composed: !0
        };
    ie.getRootNode && (oe = function(e) {
        return x.contains(e.ownerDocument, e) || e.getRootNode(re) === e.ownerDocument
    });
    var se = function(e, t) {
        return "none" === (e = t || e).style.display || "" === e.style.display && oe(e) && "none" === x.css(e, "display")
    };

    function ae(e, t, n, i) {
        var o, r, s = 20,
            a = i ? function() {
                return i.cur()
            } : function() {
                return x.css(e, t, "")
            },
            l = a(),
            c = n && n[3] || (x.cssNumber[t] ? "" : "px"),
            d = e.nodeType && (x.cssNumber[t] || "px" !== c && +l) && te.exec(x.css(e, t));
        if (d && d[3] !== c) {
            for (l /= 2, c = c || d[3], d = +l || 1; s--;) x.style(e, t, d + c), (1 - r) * (1 - (r = a() / l || .5)) <= 0 && (s = 0), d /= r;
            d *= 2, x.style(e, t, d + c), n = n || []
        }
        return n && (d = +d || +l || 0, o = n[1] ? d + (n[1] + 1) * n[2] : +n[2], i && (i.unit = c, i.start = d, i.end = o)), o
    }
    var le = {};

    function ce(e, t) {
        for (var n, i, o, r, s, a, l, c = [], d = 0, u = e.length; d < u; d++)(i = e[d]).style && (n = i.style.display, t ? ("none" === n && (c[d] = V.get(i, "display") || null, c[d] || (i.style.display = "")), "" === i.style.display && se(i) && (c[d] = (l = s = r = void 0, s = (o = i).ownerDocument, a = o.nodeName, (l = le[a]) || (r = s.body.appendChild(s.createElement(a)), l = x.css(r, "display"), r.parentNode.removeChild(r), "none" === l && (l = "block"), le[a] = l)))) : "none" !== n && (c[d] = "none", V.set(i, "display", n)));
        for (d = 0; d < u; d++) null != c[d] && (e[d].style.display = c[d]);
        return e
    }
    x.fn.extend({
        show: function() {
            return ce(this, !0)
        },
        hide: function() {
            return ce(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each((function() {
                se(this) ? x(this).show() : x(this).hide()
            }))
        }
    });
    var de, ue, pe = /^(?:checkbox|radio)$/i,
        fe = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
        he = /^$|^module$|\/(?:java|ecma)script/i;
    de = m.createDocumentFragment().appendChild(m.createElement("div")), (ue = m.createElement("input")).setAttribute("type", "radio"), ue.setAttribute("checked", "checked"), ue.setAttribute("name", "t"), de.appendChild(ue), f.checkClone = de.cloneNode(!0).cloneNode(!0).lastChild.checked, de.innerHTML = "<textarea>x</textarea>", f.noCloneChecked = !!de.cloneNode(!0).lastChild.defaultValue, de.innerHTML = "<option></option>", f.option = !!de.lastChild;
    var ge = {
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };

    function me(e, t) {
        var n;
        return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && E(e, t) ? x.merge([e], n) : n
    }

    function ve(e, t) {
        for (var n = 0, i = e.length; n < i; n++) V.set(e[n], "globalEval", !t || V.get(t[n], "globalEval"))
    }
    ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead, ge.th = ge.td, f.option || (ge.optgroup = ge.option = [1, "<select multiple='multiple'>", "</select>"]);
    var ye = /<|&#?\w+;/;

    function we(e, t, n, i, o) {
        for (var r, s, a, l, c, d, u = t.createDocumentFragment(), p = [], f = 0, h = e.length; f < h; f++)
            if ((r = e[f]) || 0 === r)
                if ("object" === w(r)) x.merge(p, r.nodeType ? [r] : r);
                else if (ye.test(r)) {
            for (s = s || u.appendChild(t.createElement("div")), a = (fe.exec(r) || ["", ""])[1].toLowerCase(), l = ge[a] || ge._default, s.innerHTML = l[1] + x.htmlPrefilter(r) + l[2], d = l[0]; d--;) s = s.lastChild;
            x.merge(p, s.childNodes), (s = u.firstChild).textContent = ""
        } else p.push(t.createTextNode(r));
        for (u.textContent = "", f = 0; r = p[f++];)
            if (i && -1 < x.inArray(r, i)) o && o.push(r);
            else if (c = oe(r), s = me(u.appendChild(r), "script"), c && ve(s), n)
            for (d = 0; r = s[d++];) he.test(r.type || "") && n.push(r);
        return u
    }
    var be = /^([^.]*)(?:\.(.+)|)/;

    function xe() {
        return !0
    }

    function Te() {
        return !1
    }

    function ke(e, t) {
        return e === function() {
            try {
                return m.activeElement
            } catch (e) {}
        }() == ("focus" === t)
    }

    function Ce(e, t, n, i, o, r) {
        var s, a;
        if ("object" == typeof t) {
            for (a in "string" != typeof n && (i = i || n, n = void 0), t) Ce(e, a, n, i, t[a], r);
            return e
        }
        if (null == i && null == o ? (o = n, i = n = void 0) : null == o && ("string" == typeof n ? (o = i, i = void 0) : (o = i, i = n, n = void 0)), !1 === o) o = Te;
        else if (!o) return e;
        return 1 === r && (s = o, (o = function(e) {
            return x().off(e), s.apply(this, arguments)
        }).guid = s.guid || (s.guid = x.guid++)), e.each((function() {
            x.event.add(this, t, o, i, n)
        }))
    }

    function Se(e, t, n) {
        n ? (V.set(e, t, !1), x.event.add(e, t, {
            namespace: !1,
            handler: function(e) {
                var i, r, s = V.get(this, t);
                if (1 & e.isTrigger && this[t]) {
                    if (s.length)(x.event.special[t] || {}).delegateType && e.stopPropagation();
                    else if (s = o.call(arguments), V.set(this, t, s), i = n(this, t), this[t](), s !== (r = V.get(this, t)) || i ? V.set(this, t, !1) : r = {}, s !== r) return e.stopImmediatePropagation(), e.preventDefault(), r && r.value
                } else s.length && (V.set(this, t, {
                    value: x.event.trigger(x.extend(s[0], x.Event.prototype), s.slice(1), this)
                }), e.stopImmediatePropagation())
            }
        })) : void 0 === V.get(e, t) && x.event.add(e, t, xe)
    }
    x.event = {
        global: {},
        add: function(e, t, n, i, o) {
            var r, s, a, l, c, d, u, p, f, h, g, m = V.get(e);
            if (Y(e))
                for (n.handler && (n = (r = n).handler, o = r.selector), o && x.find.matchesSelector(ie, o), n.guid || (n.guid = x.guid++), (l = m.events) || (l = m.events = Object.create(null)), (s = m.handle) || (s = m.handle = function(t) {
                        return void 0 !== x && x.event.triggered !== t.type ? x.event.dispatch.apply(e, arguments) : void 0
                    }), c = (t = (t || "").match(I) || [""]).length; c--;) f = g = (a = be.exec(t[c]) || [])[1], h = (a[2] || "").split(".").sort(), f && (u = x.event.special[f] || {}, f = (o ? u.delegateType : u.bindType) || f, u = x.event.special[f] || {}, d = x.extend({
                    type: f,
                    origType: g,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: o,
                    needsContext: o && x.expr.match.needsContext.test(o),
                    namespace: h.join(".")
                }, r), (p = l[f]) || ((p = l[f] = []).delegateCount = 0, u.setup && !1 !== u.setup.call(e, i, h, s) || e.addEventListener && e.addEventListener(f, s)), u.add && (u.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), o ? p.splice(p.delegateCount++, 0, d) : p.push(d), x.event.global[f] = !0)
        },
        remove: function(e, t, n, i, o) {
            var r, s, a, l, c, d, u, p, f, h, g, m = V.hasData(e) && V.get(e);
            if (m && (l = m.events)) {
                for (c = (t = (t || "").match(I) || [""]).length; c--;)
                    if (f = g = (a = be.exec(t[c]) || [])[1], h = (a[2] || "").split(".").sort(), f) {
                        for (u = x.event.special[f] || {}, p = l[f = (i ? u.delegateType : u.bindType) || f] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = r = p.length; r--;) d = p[r], !o && g !== d.origType || n && n.guid !== d.guid || a && !a.test(d.namespace) || i && i !== d.selector && ("**" !== i || !d.selector) || (p.splice(r, 1), d.selector && p.delegateCount--, u.remove && u.remove.call(e, d));
                        s && !p.length && (u.teardown && !1 !== u.teardown.call(e, h, m.handle) || x.removeEvent(e, f, m.handle), delete l[f])
                    } else
                        for (f in l) x.event.remove(e, f + t[c], n, i, !0);
                x.isEmptyObject(l) && V.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t, n, i, o, r, s, a = new Array(arguments.length),
                l = x.event.fix(e),
                c = (V.get(this, "events") || Object.create(null))[l.type] || [],
                d = x.event.special[l.type] || {};
            for (a[0] = l, t = 1; t < arguments.length; t++) a[t] = arguments[t];
            if (l.delegateTarget = this, !d.preDispatch || !1 !== d.preDispatch.call(this, l)) {
                for (s = x.event.handlers.call(this, l, c), t = 0;
                    (o = s[t++]) && !l.isPropagationStopped();)
                    for (l.currentTarget = o.elem, n = 0;
                        (r = o.handlers[n++]) && !l.isImmediatePropagationStopped();) l.rnamespace && !1 !== r.namespace && !l.rnamespace.test(r.namespace) || (l.handleObj = r, l.data = r.data, void 0 !== (i = ((x.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, a)) && !1 === (l.result = i) && (l.preventDefault(), l.stopPropagation()));
                return d.postDispatch && d.postDispatch.call(this, l), l.result
            }
        },
        handlers: function(e, t) {
            var n, i, o, r, s, a = [],
                l = t.delegateCount,
                c = e.target;
            if (l && c.nodeType && !("click" === e.type && 1 <= e.button))
                for (; c !== this; c = c.parentNode || this)
                    if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
                        for (r = [], s = {}, n = 0; n < l; n++) void 0 === s[o = (i = t[n]).selector + " "] && (s[o] = i.needsContext ? -1 < x(o, this).index(c) : x.find(o, this, null, [c]).length), s[o] && r.push(i);
                        r.length && a.push({
                            elem: c,
                            handlers: r
                        })
                    } return c = this, l < t.length && a.push({
                elem: c,
                handlers: t.slice(l)
            }), a
        },
        addProp: function(e, t) {
            Object.defineProperty(x.Event.prototype, e, {
                enumerable: !0,
                configurable: !0,
                get: h(t) ? function() {
                    if (this.originalEvent) return t(this.originalEvent)
                } : function() {
                    if (this.originalEvent) return this.originalEvent[e]
                },
                set: function(t) {
                    Object.defineProperty(this, e, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: t
                    })
                }
            })
        },
        fix: function(e) {
            return e[x.expando] ? e : new x.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            click: {
                setup: function(e) {
                    var t = this || e;
                    return pe.test(t.type) && t.click && E(t, "input") && Se(t, "click", xe), !1
                },
                trigger: function(e) {
                    var t = this || e;
                    return pe.test(t.type) && t.click && E(t, "input") && Se(t, "click"), !0
                },
                _default: function(e) {
                    var t = e.target;
                    return pe.test(t.type) && t.click && E(t, "input") && V.get(t, "click") || E(t, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, x.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, x.Event = function(e, t) {
        if (!(this instanceof x.Event)) return new x.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? xe : Te, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && x.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[x.expando] = !0
    }, x.Event.prototype = {
        constructor: x.Event,
        isDefaultPrevented: Te,
        isPropagationStopped: Te,
        isImmediatePropagationStopped: Te,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = xe, e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = xe, e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = xe, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, x.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: !0
    }, x.event.addProp), x.each({
        focus: "focusin",
        blur: "focusout"
    }, (function(e, t) {
        x.event.special[e] = {
            setup: function() {
                return Se(this, e, ke), !1
            },
            trigger: function() {
                return Se(this, e), !0
            },
            _default: function() {
                return !0
            },
            delegateType: t
        }
    })), x.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, (function(e, t) {
        x.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, i = e.relatedTarget,
                    o = e.handleObj;
                return i && (i === this || x.contains(this, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
            }
        }
    })), x.fn.extend({
        on: function(e, t, n, i) {
            return Ce(this, e, t, n, i)
        },
        one: function(e, t, n, i) {
            return Ce(this, e, t, n, i, 1)
        },
        off: function(e, t, n) {
            var i, o;
            if (e && e.preventDefault && e.handleObj) return i = e.handleObj, x(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            if ("object" == typeof e) {
                for (o in e) this.off(o, t, e[o]);
                return this
            }
            return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = Te), this.each((function() {
                x.event.remove(this, e, n, t)
            }))
        }
    });
    var $e = /<script|<style|<link/i,
        Ee = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Ae = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function je(e, t) {
        return E(e, "table") && E(11 !== t.nodeType ? t : t.firstChild, "tr") && x(e).children("tbody")[0] || e
    }

    function Oe(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function Le(e) {
        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
    }

    function Pe(e, t) {
        var n, i, o, r, s, a;
        if (1 === t.nodeType) {
            if (V.hasData(e) && (a = V.get(e).events))
                for (o in V.remove(t, "handle events"), a)
                    for (n = 0, i = a[o].length; n < i; n++) x.event.add(t, o, a[o][n]);
            K.hasData(e) && (r = K.access(e), s = x.extend({}, r), K.set(t, s))
        }
    }

    function He(e, t, n, i) {
        t = r(t);
        var o, s, a, l, c, d, u = 0,
            p = e.length,
            g = p - 1,
            m = t[0],
            v = h(m);
        if (v || 1 < p && "string" == typeof m && !f.checkClone && Ee.test(m)) return e.each((function(o) {
            var r = e.eq(o);
            v && (t[0] = m.call(this, o, r.html())), He(r, t, n, i)
        }));
        if (p && (s = (o = we(t, e[0].ownerDocument, !1, e, i)).firstChild, 1 === o.childNodes.length && (o = s), s || i)) {
            for (l = (a = x.map(me(o, "script"), Oe)).length; u < p; u++) c = o, u !== g && (c = x.clone(c, !0, !0), l && x.merge(a, me(c, "script"))), n.call(e[u], c, u);
            if (l)
                for (d = a[a.length - 1].ownerDocument, x.map(a, Le), u = 0; u < l; u++) c = a[u], he.test(c.type || "") && !V.access(c, "globalEval") && x.contains(d, c) && (c.src && "module" !== (c.type || "").toLowerCase() ? x._evalUrl && !c.noModule && x._evalUrl(c.src, {
                    nonce: c.nonce || c.getAttribute("nonce")
                }, d) : y(c.textContent.replace(Ae, ""), c, d))
        }
        return e
    }

    function De(e, t, n) {
        for (var i, o = t ? x.filter(t, e) : e, r = 0; null != (i = o[r]); r++) n || 1 !== i.nodeType || x.cleanData(me(i)), i.parentNode && (n && oe(i) && ve(me(i, "script")), i.parentNode.removeChild(i));
        return e
    }
    x.extend({
        htmlPrefilter: function(e) {
            return e
        },
        clone: function(e, t, n) {
            var i, o, r, s, a, l, c, d = e.cloneNode(!0),
                u = oe(e);
            if (!(f.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || x.isXMLDoc(e)))
                for (s = me(d), i = 0, o = (r = me(e)).length; i < o; i++) a = r[i], "input" === (c = (l = s[i]).nodeName.toLowerCase()) && pe.test(a.type) ? l.checked = a.checked : "input" !== c && "textarea" !== c || (l.defaultValue = a.defaultValue);
            if (t)
                if (n)
                    for (r = r || me(e), s = s || me(d), i = 0, o = r.length; i < o; i++) Pe(r[i], s[i]);
                else Pe(e, d);
            return 0 < (s = me(d, "script")).length && ve(s, !u && me(e, "script")), d
        },
        cleanData: function(e) {
            for (var t, n, i, o = x.event.special, r = 0; void 0 !== (n = e[r]); r++)
                if (Y(n)) {
                    if (t = n[V.expando]) {
                        if (t.events)
                            for (i in t.events) o[i] ? x.event.remove(n, i) : x.removeEvent(n, i, t.handle);
                        n[V.expando] = void 0
                    }
                    n[K.expando] && (n[K.expando] = void 0)
                }
        }
    }), x.fn.extend({
        detach: function(e) {
            return De(this, e, !0)
        },
        remove: function(e) {
            return De(this, e)
        },
        text: function(e) {
            return B(this, (function(e) {
                return void 0 === e ? x.text(this) : this.empty().each((function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                }))
            }), null, e, arguments.length)
        },
        append: function() {
            return He(this, arguments, (function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || je(this, e).appendChild(e)
            }))
        },
        prepend: function() {
            return He(this, arguments, (function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = je(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            }))
        },
        before: function() {
            return He(this, arguments, (function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            }))
        },
        after: function() {
            return He(this, arguments, (function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            }))
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (x.cleanData(me(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map((function() {
                return x.clone(this, e, t)
            }))
        },
        html: function(e) {
            return B(this, (function(e) {
                var t = this[0] || {},
                    n = 0,
                    i = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !$e.test(e) && !ge[(fe.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = x.htmlPrefilter(e);
                    try {
                        for (; n < i; n++) 1 === (t = this[n] || {}).nodeType && (x.cleanData(me(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }), null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return He(this, arguments, (function(t) {
                var n = this.parentNode;
                x.inArray(this, e) < 0 && (x.cleanData(me(this)), n && n.replaceChild(t, this))
            }), e)
        }
    }), x.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, (function(e, t) {
        x.fn[e] = function(e) {
            for (var n, i = [], o = x(e), r = o.length - 1, a = 0; a <= r; a++) n = a === r ? this : this.clone(!0), x(o[a])[t](n), s.apply(i, n.get());
            return this.pushStack(i)
        }
    }));
    var Ie = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"),
        Ne = function(t) {
            var n = t.ownerDocument.defaultView;
            return n && n.opener || (n = e), n.getComputedStyle(t)
        },
        Me = function(e, t, n) {
            var i, o, r = {};
            for (o in t) r[o] = e.style[o], e.style[o] = t[o];
            for (o in i = n.call(e), t) e.style[o] = r[o];
            return i
        },
        qe = new RegExp(ne.join("|"), "i");

    function ze(e, t, n) {
        var i, o, r, s, a = e.style;
        return (n = n || Ne(e)) && ("" !== (s = n.getPropertyValue(t) || n[t]) || oe(e) || (s = x.style(e, t)), !f.pixelBoxStyles() && Ie.test(s) && qe.test(t) && (i = a.width, o = a.minWidth, r = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, a.minWidth = o, a.maxWidth = r)), void 0 !== s ? s + "" : s
    }

    function We(e, t) {
        return {
            get: function() {
                if (!e()) return (this.get = t).apply(this, arguments);
                delete this.get
            }
        }
    }! function() {
        function t() {
            if (d) {
                c.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", d.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", ie.appendChild(c).appendChild(d);
                var t = e.getComputedStyle(d);
                i = "1%" !== t.top, l = 12 === n(t.marginLeft), d.style.right = "60%", s = 36 === n(t.right), o = 36 === n(t.width), d.style.position = "absolute", r = 12 === n(d.offsetWidth / 3), ie.removeChild(c), d = null
            }
        }

        function n(e) {
            return Math.round(parseFloat(e))
        }
        var i, o, r, s, a, l, c = m.createElement("div"),
            d = m.createElement("div");
        d.style && (d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", f.clearCloneStyle = "content-box" === d.style.backgroundClip, x.extend(f, {
            boxSizingReliable: function() {
                return t(), o
            },
            pixelBoxStyles: function() {
                return t(), s
            },
            pixelPosition: function() {
                return t(), i
            },
            reliableMarginLeft: function() {
                return t(), l
            },
            scrollboxSize: function() {
                return t(), r
            },
            reliableTrDimensions: function() {
                var t, n, i, o;
                return null == a && (t = m.createElement("table"), n = m.createElement("tr"), i = m.createElement("div"), t.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", n.style.cssText = "border:1px solid", n.style.height = "1px", i.style.height = "9px", i.style.display = "block", ie.appendChild(t).appendChild(n).appendChild(i), o = e.getComputedStyle(n), a = parseInt(o.height, 10) + parseInt(o.borderTopWidth, 10) + parseInt(o.borderBottomWidth, 10) === n.offsetHeight, ie.removeChild(t)), a
            }
        }))
    }();
    var Re = ["Webkit", "Moz", "ms"],
        Be = m.createElement("div").style,
        Fe = {};

    function _e(e) {
        return x.cssProps[e] || Fe[e] || (e in Be ? e : Fe[e] = function(e) {
            for (var t = e[0].toUpperCase() + e.slice(1), n = Re.length; n--;)
                if ((e = Re[n] + t) in Be) return e
        }(e) || e)
    }
    var Ue = /^(none|table(?!-c[ea]).+)/,
        Xe = /^--/,
        Ye = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Ge = {
            letterSpacing: "0",
            fontWeight: "400"
        };

    function Ve(e, t, n) {
        var i = te.exec(t);
        return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t
    }

    function Ke(e, t, n, i, o, r) {
        var s = "width" === t ? 1 : 0,
            a = 0,
            l = 0;
        if (n === (i ? "border" : "content")) return 0;
        for (; s < 4; s += 2) "margin" === n && (l += x.css(e, n + ne[s], !0, o)), i ? ("content" === n && (l -= x.css(e, "padding" + ne[s], !0, o)), "margin" !== n && (l -= x.css(e, "border" + ne[s] + "Width", !0, o))) : (l += x.css(e, "padding" + ne[s], !0, o), "padding" !== n ? l += x.css(e, "border" + ne[s] + "Width", !0, o) : a += x.css(e, "border" + ne[s] + "Width", !0, o));
        return !i && 0 <= r && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - r - l - a - .5)) || 0), l
    }

    function Qe(e, t, n) {
        var i = Ne(e),
            o = (!f.boxSizingReliable() || n) && "border-box" === x.css(e, "boxSizing", !1, i),
            r = o,
            s = ze(e, t, i),
            a = "offset" + t[0].toUpperCase() + t.slice(1);
        if (Ie.test(s)) {
            if (!n) return s;
            s = "auto"
        }
        return (!f.boxSizingReliable() && o || !f.reliableTrDimensions() && E(e, "tr") || "auto" === s || !parseFloat(s) && "inline" === x.css(e, "display", !1, i)) && e.getClientRects().length && (o = "border-box" === x.css(e, "boxSizing", !1, i), (r = a in e) && (s = e[a])), (s = parseFloat(s) || 0) + Ke(e, t, n || (o ? "border" : "content"), r, i, s) + "px"
    }

    function Ze(e, t, n, i, o) {
        return new Ze.prototype.init(e, t, n, i, o)
    }
    x.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = ze(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {},
        style: function(e, t, n, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, r, s, a = X(t),
                    l = Xe.test(t),
                    c = e.style;
                if (l || (t = _e(a)), s = x.cssHooks[t] || x.cssHooks[a], void 0 === n) return s && "get" in s && void 0 !== (o = s.get(e, !1, i)) ? o : c[t];
                "string" == (r = typeof n) && (o = te.exec(n)) && o[1] && (n = ae(e, t, o), r = "number"), null != n && n == n && ("number" !== r || l || (n += o && o[3] || (x.cssNumber[a] ? "" : "px")), f.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"), s && "set" in s && void 0 === (n = s.set(e, n, i)) || (l ? c.setProperty(t, n) : c[t] = n))
            }
        },
        css: function(e, t, n, i) {
            var o, r, s, a = X(t);
            return Xe.test(t) || (t = _e(a)), (s = x.cssHooks[t] || x.cssHooks[a]) && "get" in s && (o = s.get(e, !0, n)), void 0 === o && (o = ze(e, t, i)), "normal" === o && t in Ge && (o = Ge[t]), "" === n || n ? (r = parseFloat(o), !0 === n || isFinite(r) ? r || 0 : o) : o
        }
    }), x.each(["height", "width"], (function(e, t) {
        x.cssHooks[t] = {
            get: function(e, n, i) {
                if (n) return !Ue.test(x.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? Qe(e, t, i) : Me(e, Ye, (function() {
                    return Qe(e, t, i)
                }))
            },
            set: function(e, n, i) {
                var o, r = Ne(e),
                    s = !f.scrollboxSize() && "absolute" === r.position,
                    a = (s || i) && "border-box" === x.css(e, "boxSizing", !1, r),
                    l = i ? Ke(e, t, i, a, r) : 0;
                return a && s && (l -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(r[t]) - Ke(e, t, "border", !1, r) - .5)), l && (o = te.exec(n)) && "px" !== (o[3] || "px") && (e.style[t] = n, n = x.css(e, t)), Ve(0, n, l)
            }
        }
    })), x.cssHooks.marginLeft = We(f.reliableMarginLeft, (function(e, t) {
        if (t) return (parseFloat(ze(e, "marginLeft")) || e.getBoundingClientRect().left - Me(e, {
            marginLeft: 0
        }, (function() {
            return e.getBoundingClientRect().left
        }))) + "px"
    })), x.each({
        margin: "",
        padding: "",
        border: "Width"
    }, (function(e, t) {
        x.cssHooks[e + t] = {
            expand: function(n) {
                for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) o[e + ne[i] + t] = r[i] || r[i - 2] || r[0];
                return o
            }
        }, "margin" !== e && (x.cssHooks[e + t].set = Ve)
    })), x.fn.extend({
        css: function(e, t) {
            return B(this, (function(e, t, n) {
                var i, o, r = {},
                    s = 0;
                if (Array.isArray(t)) {
                    for (i = Ne(e), o = t.length; s < o; s++) r[t[s]] = x.css(e, t[s], !1, i);
                    return r
                }
                return void 0 !== n ? x.style(e, t, n) : x.css(e, t)
            }), e, t, 1 < arguments.length)
        }
    }), ((x.Tween = Ze).prototype = {
        constructor: Ze,
        init: function(e, t, n, i, o, r) {
            this.elem = e, this.prop = n, this.easing = o || x.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = r || (x.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = Ze.propHooks[this.prop];
            return e && e.get ? e.get(this) : Ze.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = Ze.propHooks[this.prop];
            return this.options.duration ? this.pos = t = x.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Ze.propHooks._default.set(this), this
        }
    }).init.prototype = Ze.prototype, (Ze.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = x.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
            },
            set: function(e) {
                x.fx.step[e.prop] ? x.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !x.cssHooks[e.prop] && null == e.elem.style[_e(e.prop)] ? e.elem[e.prop] = e.now : x.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }).scrollTop = Ze.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, x.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, x.fx = Ze.prototype.init, x.fx.step = {};
    var Je, et, tt, nt, it = /^(?:toggle|show|hide)$/,
        ot = /queueHooks$/;

    function rt() {
        et && (!1 === m.hidden && e.requestAnimationFrame ? e.requestAnimationFrame(rt) : e.setTimeout(rt, x.fx.interval), x.fx.tick())
    }

    function st() {
        return e.setTimeout((function() {
            Je = void 0
        })), Je = Date.now()
    }

    function at(e, t) {
        var n, i = 0,
            o = {
                height: e
            };
        for (t = t ? 1 : 0; i < 4; i += 2 - t) o["margin" + (n = ne[i])] = o["padding" + n] = e;
        return t && (o.opacity = o.width = e), o
    }

    function lt(e, t, n) {
        for (var i, o = (ct.tweeners[t] || []).concat(ct.tweeners["*"]), r = 0, s = o.length; r < s; r++)
            if (i = o[r].call(n, t, e)) return i
    }

    function ct(e, t, n) {
        var i, o, r = 0,
            s = ct.prefilters.length,
            a = x.Deferred().always((function() {
                delete l.elem
            })),
            l = function() {
                if (o) return !1;
                for (var t = Je || st(), n = Math.max(0, c.startTime + c.duration - t), i = 1 - (n / c.duration || 0), r = 0, s = c.tweens.length; r < s; r++) c.tweens[r].run(i);
                return a.notifyWith(e, [c, i, n]), i < 1 && s ? n : (s || a.notifyWith(e, [c, 1, 0]), a.resolveWith(e, [c]), !1)
            },
            c = a.promise({
                elem: e,
                props: x.extend({}, t),
                opts: x.extend(!0, {
                    specialEasing: {},
                    easing: x.easing._default
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: Je || st(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var i = x.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                    return c.tweens.push(i), i
                },
                stop: function(t) {
                    var n = 0,
                        i = t ? c.tweens.length : 0;
                    if (o) return this;
                    for (o = !0; n < i; n++) c.tweens[n].run(1);
                    return t ? (a.notifyWith(e, [c, 1, 0]), a.resolveWith(e, [c, t])) : a.rejectWith(e, [c, t]), this
                }
            }),
            d = c.props;
        for (function(e, t) {
                var n, i, o, r, s;
                for (n in e)
                    if (o = t[i = X(n)], r = e[n], Array.isArray(r) && (o = r[1], r = e[n] = r[0]), n !== i && (e[i] = r, delete e[n]), (s = x.cssHooks[i]) && "expand" in s)
                        for (n in r = s.expand(r), delete e[i], r) n in e || (e[n] = r[n], t[n] = o);
                    else t[i] = o
            }(d, c.opts.specialEasing); r < s; r++)
            if (i = ct.prefilters[r].call(c, e, d, c.opts)) return h(i.stop) && (x._queueHooks(c.elem, c.opts.queue).stop = i.stop.bind(i)), i;
        return x.map(d, lt, c), h(c.opts.start) && c.opts.start.call(e, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), x.fx.timer(x.extend(l, {
            elem: e,
            anim: c,
            queue: c.opts.queue
        })), c
    }
    x.Animation = x.extend(ct, {
        tweeners: {
            "*": [function(e, t) {
                var n = this.createTween(e, t);
                return ae(n.elem, e, te.exec(t), n), n
            }]
        },
        tweener: function(e, t) {
            h(e) ? (t = e, e = ["*"]) : e = e.match(I);
            for (var n, i = 0, o = e.length; i < o; i++) n = e[i], ct.tweeners[n] = ct.tweeners[n] || [], ct.tweeners[n].unshift(t)
        },
        prefilters: [function(e, t, n) {
            var i, o, r, s, a, l, c, d, u = "width" in t || "height" in t,
                p = this,
                f = {},
                h = e.style,
                g = e.nodeType && se(e),
                m = V.get(e, "fxshow");
            for (i in n.queue || (null == (s = x._queueHooks(e, "fx")).unqueued && (s.unqueued = 0, a = s.empty.fire, s.empty.fire = function() {
                    s.unqueued || a()
                }), s.unqueued++, p.always((function() {
                    p.always((function() {
                        s.unqueued--, x.queue(e, "fx").length || s.empty.fire()
                    }))
                }))), t)
                if (o = t[i], it.test(o)) {
                    if (delete t[i], r = r || "toggle" === o, o === (g ? "hide" : "show")) {
                        if ("show" !== o || !m || void 0 === m[i]) continue;
                        g = !0
                    }
                    f[i] = m && m[i] || x.style(e, i)
                } if ((l = !x.isEmptyObject(t)) || !x.isEmptyObject(f))
                for (i in u && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (c = m && m.display) && (c = V.get(e, "display")), "none" === (d = x.css(e, "display")) && (c ? d = c : (ce([e], !0), c = e.style.display || c, d = x.css(e, "display"), ce([e]))), ("inline" === d || "inline-block" === d && null != c) && "none" === x.css(e, "float") && (l || (p.done((function() {
                        h.display = c
                    })), null == c && (d = h.display, c = "none" === d ? "" : d)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always((function() {
                        h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
                    }))), l = !1, f) l || (m ? "hidden" in m && (g = m.hidden) : m = V.access(e, "fxshow", {
                    display: c
                }), r && (m.hidden = !g), g && ce([e], !0), p.done((function() {
                    for (i in g || ce([e]), V.remove(e, "fxshow"), f) x.style(e, i, f[i])
                }))), l = lt(g ? m[i] : 0, i, p), i in m || (m[i] = l.start, g && (l.end = l.start, l.start = 0))
        }],
        prefilter: function(e, t) {
            t ? ct.prefilters.unshift(e) : ct.prefilters.push(e)
        }
    }), x.speed = function(e, t, n) {
        var i = e && "object" == typeof e ? x.extend({}, e) : {
            complete: n || !n && t || h(e) && e,
            duration: e,
            easing: n && t || t && !h(t) && t
        };
        return x.fx.off ? i.duration = 0 : "number" != typeof i.duration && (i.duration in x.fx.speeds ? i.duration = x.fx.speeds[i.duration] : i.duration = x.fx.speeds._default), null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
            h(i.old) && i.old.call(this), i.queue && x.dequeue(this, i.queue)
        }, i
    }, x.fn.extend({
        fadeTo: function(e, t, n, i) {
            return this.filter(se).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, i)
        },
        animate: function(e, t, n, i) {
            var o = x.isEmptyObject(e),
                r = x.speed(t, n, i),
                s = function() {
                    var t = ct(this, x.extend({}, e), r);
                    (o || V.get(this, "finish")) && t.stop(!0)
                };
            return s.finish = s, o || !1 === r.queue ? this.each(s) : this.queue(r.queue, s)
        },
        stop: function(e, t, n) {
            var i = function(e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = void 0), t && this.queue(e || "fx", []), this.each((function() {
                var t = !0,
                    o = null != e && e + "queueHooks",
                    r = x.timers,
                    s = V.get(this);
                if (o) s[o] && s[o].stop && i(s[o]);
                else
                    for (o in s) s[o] && s[o].stop && ot.test(o) && i(s[o]);
                for (o = r.length; o--;) r[o].elem !== this || null != e && r[o].queue !== e || (r[o].anim.stop(n), t = !1, r.splice(o, 1));
                !t && n || x.dequeue(this, e)
            }))
        },
        finish: function(e) {
            return !1 !== e && (e = e || "fx"), this.each((function() {
                var t, n = V.get(this),
                    i = n[e + "queue"],
                    o = n[e + "queueHooks"],
                    r = x.timers,
                    s = i ? i.length : 0;
                for (n.finish = !0, x.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = r.length; t--;) r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
                for (t = 0; t < s; t++) i[t] && i[t].finish && i[t].finish.call(this);
                delete n.finish
            }))
        }
    }), x.each(["toggle", "show", "hide"], (function(e, t) {
        var n = x.fn[t];
        x.fn[t] = function(e, i, o) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(at(t, !0), e, i, o)
        }
    })), x.each({
        slideDown: at("show"),
        slideUp: at("hide"),
        slideToggle: at("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, (function(e, t) {
        x.fn[e] = function(e, n, i) {
            return this.animate(t, e, n, i)
        }
    })), x.timers = [], x.fx.tick = function() {
        var e, t = 0,
            n = x.timers;
        for (Je = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || x.fx.stop(), Je = void 0
    }, x.fx.timer = function(e) {
        x.timers.push(e), x.fx.start()
    }, x.fx.interval = 13, x.fx.start = function() {
        et || (et = !0, rt())
    }, x.fx.stop = function() {
        et = null
    }, x.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, x.fn.delay = function(t, n) {
        return t = x.fx && x.fx.speeds[t] || t, n = n || "fx", this.queue(n, (function(n, i) {
            var o = e.setTimeout(n, t);
            i.stop = function() {
                e.clearTimeout(o)
            }
        }))
    }, tt = m.createElement("input"), nt = m.createElement("select").appendChild(m.createElement("option")), tt.type = "checkbox", f.checkOn = "" !== tt.value, f.optSelected = nt.selected, (tt = m.createElement("input")).value = "t", tt.type = "radio", f.radioValue = "t" === tt.value;
    var dt, ut = x.expr.attrHandle;
    x.fn.extend({
        attr: function(e, t) {
            return B(this, x.attr, e, t, 1 < arguments.length)
        },
        removeAttr: function(e) {
            return this.each((function() {
                x.removeAttr(this, e)
            }))
        }
    }), x.extend({
        attr: function(e, t, n) {
            var i, o, r = e.nodeType;
            if (3 !== r && 8 !== r && 2 !== r) return void 0 === e.getAttribute ? x.prop(e, t, n) : (1 === r && x.isXMLDoc(e) || (o = x.attrHooks[t.toLowerCase()] || (x.expr.match.bool.test(t) ? dt : void 0)), void 0 !== n ? null === n ? void x.removeAttr(e, t) : o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : o && "get" in o && null !== (i = o.get(e, t)) ? i : null == (i = x.find.attr(e, t)) ? void 0 : i)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!f.radioValue && "radio" === t && E(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, i = 0,
                o = t && t.match(I);
            if (o && 1 === e.nodeType)
                for (; n = o[i++];) e.removeAttribute(n)
        }
    }), dt = {
        set: function(e, t, n) {
            return !1 === t ? x.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, x.each(x.expr.match.bool.source.match(/\w+/g), (function(e, t) {
        var n = ut[t] || x.find.attr;
        ut[t] = function(e, t, i) {
            var o, r, s = t.toLowerCase();
            return i || (r = ut[s], ut[s] = o, o = null != n(e, t, i) ? s : null, ut[s] = r), o
        }
    }));
    var pt = /^(?:input|select|textarea|button)$/i,
        ft = /^(?:a|area)$/i;

    function ht(e) {
        return (e.match(I) || []).join(" ")
    }

    function gt(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function mt(e) {
        return Array.isArray(e) ? e : "string" == typeof e && e.match(I) || []
    }
    x.fn.extend({
        prop: function(e, t) {
            return B(this, x.prop, e, t, 1 < arguments.length)
        },
        removeProp: function(e) {
            return this.each((function() {
                delete this[x.propFix[e] || e]
            }))
        }
    }), x.extend({
        prop: function(e, t, n) {
            var i, o, r = e.nodeType;
            if (3 !== r && 8 !== r && 2 !== r) return 1 === r && x.isXMLDoc(e) || (t = x.propFix[t] || t, o = x.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : e[t] = n : o && "get" in o && null !== (i = o.get(e, t)) ? i : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = x.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : pt.test(e.nodeName) || ft.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }), f.optSelected || (x.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
    }), x.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], (function() {
        x.propFix[this.toLowerCase()] = this
    })), x.fn.extend({
        addClass: function(e) {
            var t, n, i, o, r, s, a, l = 0;
            if (h(e)) return this.each((function(t) {
                x(this).addClass(e.call(this, t, gt(this)))
            }));
            if ((t = mt(e)).length)
                for (; n = this[l++];)
                    if (o = gt(n), i = 1 === n.nodeType && " " + ht(o) + " ") {
                        for (s = 0; r = t[s++];) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                        o !== (a = ht(i)) && n.setAttribute("class", a)
                    } return this
        },
        removeClass: function(e) {
            var t, n, i, o, r, s, a, l = 0;
            if (h(e)) return this.each((function(t) {
                x(this).removeClass(e.call(this, t, gt(this)))
            }));
            if (!arguments.length) return this.attr("class", "");
            if ((t = mt(e)).length)
                for (; n = this[l++];)
                    if (o = gt(n), i = 1 === n.nodeType && " " + ht(o) + " ") {
                        for (s = 0; r = t[s++];)
                            for (; - 1 < i.indexOf(" " + r + " ");) i = i.replace(" " + r + " ", " ");
                        o !== (a = ht(i)) && n.setAttribute("class", a)
                    } return this
        },
        toggleClass: function(e, t) {
            var n = typeof e,
                i = "string" === n || Array.isArray(e);
            return "boolean" == typeof t && i ? t ? this.addClass(e) : this.removeClass(e) : h(e) ? this.each((function(n) {
                x(this).toggleClass(e.call(this, n, gt(this), t), t)
            })) : this.each((function() {
                var t, o, r, s;
                if (i)
                    for (o = 0, r = x(this), s = mt(e); t = s[o++];) r.hasClass(t) ? r.removeClass(t) : r.addClass(t);
                else void 0 !== e && "boolean" !== n || ((t = gt(this)) && V.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : V.get(this, "__className__") || ""))
            }))
        },
        hasClass: function(e) {
            var t, n, i = 0;
            for (t = " " + e + " "; n = this[i++];)
                if (1 === n.nodeType && -1 < (" " + ht(gt(n)) + " ").indexOf(t)) return !0;
            return !1
        }
    });
    var vt = /\r/g;
    x.fn.extend({
        val: function(e) {
            var t, n, i, o = this[0];
            return arguments.length ? (i = h(e), this.each((function(n) {
                var o;
                1 === this.nodeType && (null == (o = i ? e.call(this, n, x(this).val()) : e) ? o = "" : "number" == typeof o ? o += "" : Array.isArray(o) && (o = x.map(o, (function(e) {
                    return null == e ? "" : e + ""
                }))), (t = x.valHooks[this.type] || x.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, o, "value") || (this.value = o))
            }))) : o ? (t = x.valHooks[o.type] || x.valHooks[o.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(o, "value")) ? n : "string" == typeof(n = o.value) ? n.replace(vt, "") : null == n ? "" : n : void 0
        }
    }), x.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = x.find.attr(e, "value");
                    return null != t ? t : ht(x.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t, n, i, o = e.options,
                        r = e.selectedIndex,
                        s = "select-one" === e.type,
                        a = s ? null : [],
                        l = s ? r + 1 : o.length;
                    for (i = r < 0 ? l : s ? r : 0; i < l; i++)
                        if (((n = o[i]).selected || i === r) && !n.disabled && (!n.parentNode.disabled || !E(n.parentNode, "optgroup"))) {
                            if (t = x(n).val(), s) return t;
                            a.push(t)
                        } return a
                },
                set: function(e, t) {
                    for (var n, i, o = e.options, r = x.makeArray(t), s = o.length; s--;)((i = o[s]).selected = -1 < x.inArray(x.valHooks.option.get(i), r)) && (n = !0);
                    return n || (e.selectedIndex = -1), r
                }
            }
        }
    }), x.each(["radio", "checkbox"], (function() {
        x.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t)) return e.checked = -1 < x.inArray(x(e).val(), t)
            }
        }, f.checkOn || (x.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    })), f.focusin = "onfocusin" in e;
    var yt = /^(?:focusinfocus|focusoutblur)$/,
        wt = function(e) {
            e.stopPropagation()
        };
    x.extend(x.event, {
        trigger: function(t, n, i, o) {
            var r, s, a, l, c, u, p, f, v = [i || m],
                y = d.call(t, "type") ? t.type : t,
                w = d.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = f = a = i = i || m, 3 !== i.nodeType && 8 !== i.nodeType && !yt.test(y + x.event.triggered) && (-1 < y.indexOf(".") && (y = (w = y.split(".")).shift(), w.sort()), c = y.indexOf(":") < 0 && "on" + y, (t = t[x.expando] ? t : new x.Event(y, "object" == typeof t && t)).isTrigger = o ? 2 : 3, t.namespace = w.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + w.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : x.makeArray(n, [t]), p = x.event.special[y] || {}, o || !p.trigger || !1 !== p.trigger.apply(i, n))) {
                if (!o && !p.noBubble && !g(i)) {
                    for (l = p.delegateType || y, yt.test(l + y) || (s = s.parentNode); s; s = s.parentNode) v.push(s), a = s;
                    a === (i.ownerDocument || m) && v.push(a.defaultView || a.parentWindow || e)
                }
                for (r = 0;
                    (s = v[r++]) && !t.isPropagationStopped();) f = s, t.type = 1 < r ? l : p.bindType || y, (u = (V.get(s, "events") || Object.create(null))[t.type] && V.get(s, "handle")) && u.apply(s, n), (u = c && s[c]) && u.apply && Y(s) && (t.result = u.apply(s, n), !1 === t.result && t.preventDefault());
                return t.type = y, o || t.isDefaultPrevented() || p._default && !1 !== p._default.apply(v.pop(), n) || !Y(i) || c && h(i[y]) && !g(i) && ((a = i[c]) && (i[c] = null), x.event.triggered = y, t.isPropagationStopped() && f.addEventListener(y, wt), i[y](), t.isPropagationStopped() && f.removeEventListener(y, wt), x.event.triggered = void 0, a && (i[c] = a)), t.result
            }
        },
        simulate: function(e, t, n) {
            var i = x.extend(new x.Event, n, {
                type: e,
                isSimulated: !0
            });
            x.event.trigger(i, null, t)
        }
    }), x.fn.extend({
        trigger: function(e, t) {
            return this.each((function() {
                x.event.trigger(e, t, this)
            }))
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n) return x.event.trigger(e, t, n, !0)
        }
    }), f.focusin || x.each({
        focus: "focusin",
        blur: "focusout"
    }, (function(e, t) {
        var n = function(e) {
            x.event.simulate(t, e.target, x.event.fix(e))
        };
        x.event.special[t] = {
            setup: function() {
                var i = this.ownerDocument || this.document || this,
                    o = V.access(i, t);
                o || i.addEventListener(e, n, !0), V.access(i, t, (o || 0) + 1)
            },
            teardown: function() {
                var i = this.ownerDocument || this.document || this,
                    o = V.access(i, t) - 1;
                o ? V.access(i, t, o) : (i.removeEventListener(e, n, !0), V.remove(i, t))
            }
        }
    }));
    var bt = e.location,
        xt = {
            guid: Date.now()
        },
        Tt = /\?/;
    x.parseXML = function(t) {
        var n, i;
        if (!t || "string" != typeof t) return null;
        try {
            n = (new e.DOMParser).parseFromString(t, "text/xml")
        } catch (t) {}
        return i = n && n.getElementsByTagName("parsererror")[0], n && !i || x.error("Invalid XML: " + (i ? x.map(i.childNodes, (function(e) {
            return e.textContent
        })).join("\n") : t)), n
    };
    var kt = /\[\]$/,
        Ct = /\r?\n/g,
        St = /^(?:submit|button|image|reset|file)$/i,
        $t = /^(?:input|select|textarea|keygen)/i;

    function Et(e, t, n, i) {
        var o;
        if (Array.isArray(t)) x.each(t, (function(t, o) {
            n || kt.test(e) ? i(e, o) : Et(e + "[" + ("object" == typeof o && null != o ? t : "") + "]", o, n, i)
        }));
        else if (n || "object" !== w(t)) i(e, t);
        else
            for (o in t) Et(e + "[" + o + "]", t[o], n, i)
    }
    x.param = function(e, t) {
        var n, i = [],
            o = function(e, t) {
                var n = h(t) ? t() : t;
                i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
            };
        if (null == e) return "";
        if (Array.isArray(e) || e.jquery && !x.isPlainObject(e)) x.each(e, (function() {
            o(this.name, this.value)
        }));
        else
            for (n in e) Et(n, e[n], t, o);
        return i.join("&")
    }, x.fn.extend({
        serialize: function() {
            return x.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map((function() {
                var e = x.prop(this, "elements");
                return e ? x.makeArray(e) : this
            })).filter((function() {
                var e = this.type;
                return this.name && !x(this).is(":disabled") && $t.test(this.nodeName) && !St.test(e) && (this.checked || !pe.test(e))
            })).map((function(e, t) {
                var n = x(this).val();
                return null == n ? null : Array.isArray(n) ? x.map(n, (function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Ct, "\r\n")
                    }
                })) : {
                    name: t.name,
                    value: n.replace(Ct, "\r\n")
                }
            })).get()
        }
    });
    var At = /%20/g,
        jt = /#.*$/,
        Ot = /([?&])_=[^&]*/,
        Lt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Pt = /^(?:GET|HEAD)$/,
        Ht = /^\/\//,
        Dt = {},
        It = {},
        Nt = "*/".concat("*"),
        Mt = m.createElement("a");

    function qt(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var i, o = 0,
                r = t.toLowerCase().match(I) || [];
            if (h(n))
                for (; i = r[o++];) "+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
        }
    }

    function zt(e, t, n, i) {
        var o = {},
            r = e === It;

        function s(a) {
            var l;
            return o[a] = !0, x.each(e[a] || [], (function(e, a) {
                var c = a(t, n, i);
                return "string" != typeof c || r || o[c] ? r ? !(l = c) : void 0 : (t.dataTypes.unshift(c), s(c), !1)
            })), l
        }
        return s(t.dataTypes[0]) || !o["*"] && s("*")
    }

    function Wt(e, t) {
        var n, i, o = x.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((o[n] ? e : i || (i = {}))[n] = t[n]);
        return i && x.extend(!0, e, i), e
    }
    Mt.href = bt.href, x.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: bt.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(bt.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Nt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": x.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? Wt(Wt(e, x.ajaxSettings), t) : Wt(x.ajaxSettings, e)
        },
        ajaxPrefilter: qt(Dt),
        ajaxTransport: qt(It),
        ajax: function(t, n) {
            "object" == typeof t && (n = t, t = void 0), n = n || {};
            var i, o, r, s, a, l, c, d, u, p, f = x.ajaxSetup({}, n),
                h = f.context || f,
                g = f.context && (h.nodeType || h.jquery) ? x(h) : x.event,
                v = x.Deferred(),
                y = x.Callbacks("once memory"),
                w = f.statusCode || {},
                b = {},
                T = {},
                k = "canceled",
                C = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (c) {
                            if (!s)
                                for (s = {}; t = Lt.exec(r);) s[t[1].toLowerCase() + " "] = (s[t[1].toLowerCase() + " "] || []).concat(t[2]);
                            t = s[e.toLowerCase() + " "]
                        }
                        return null == t ? null : t.join(", ")
                    },
                    getAllResponseHeaders: function() {
                        return c ? r : null
                    },
                    setRequestHeader: function(e, t) {
                        return null == c && (e = T[e.toLowerCase()] = T[e.toLowerCase()] || e, b[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return null == c && (f.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (c) C.always(e[C.status]);
                            else
                                for (t in e) w[t] = [w[t], e[t]];
                        return this
                    },
                    abort: function(e) {
                        var t = e || k;
                        return i && i.abort(t), S(0, t), this
                    }
                };
            if (v.promise(C), f.url = ((t || f.url || bt.href) + "").replace(Ht, bt.protocol + "//"), f.type = n.method || n.type || f.method || f.type, f.dataTypes = (f.dataType || "*").toLowerCase().match(I) || [""], null == f.crossDomain) {
                l = m.createElement("a");
                try {
                    l.href = f.url, l.href = l.href, f.crossDomain = Mt.protocol + "//" + Mt.host != l.protocol + "//" + l.host
                } catch (t) {
                    f.crossDomain = !0
                }
            }
            if (f.data && f.processData && "string" != typeof f.data && (f.data = x.param(f.data, f.traditional)), zt(Dt, f, n, C), c) return C;
            for (u in (d = x.event && f.global) && 0 == x.active++ && x.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !Pt.test(f.type), o = f.url.replace(jt, ""), f.hasContent ? f.data && f.processData && 0 === (f.contentType || "").indexOf("application/x-www-form-urlencoded") && (f.data = f.data.replace(At, "+")) : (p = f.url.slice(o.length), f.data && (f.processData || "string" == typeof f.data) && (o += (Tt.test(o) ? "&" : "?") + f.data, delete f.data), !1 === f.cache && (o = o.replace(Ot, "$1"), p = (Tt.test(o) ? "&" : "?") + "_=" + xt.guid++ + p), f.url = o + p), f.ifModified && (x.lastModified[o] && C.setRequestHeader("If-Modified-Since", x.lastModified[o]), x.etag[o] && C.setRequestHeader("If-None-Match", x.etag[o])), (f.data && f.hasContent && !1 !== f.contentType || n.contentType) && C.setRequestHeader("Content-Type", f.contentType), C.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + Nt + "; q=0.01" : "") : f.accepts["*"]), f.headers) C.setRequestHeader(u, f.headers[u]);
            if (f.beforeSend && (!1 === f.beforeSend.call(h, C, f) || c)) return C.abort();
            if (k = "abort", y.add(f.complete), C.done(f.success), C.fail(f.error), i = zt(It, f, n, C)) {
                if (C.readyState = 1, d && g.trigger("ajaxSend", [C, f]), c) return C;
                f.async && 0 < f.timeout && (a = e.setTimeout((function() {
                    C.abort("timeout")
                }), f.timeout));
                try {
                    c = !1, i.send(b, S)
                } catch (t) {
                    if (c) throw t;
                    S(-1, t)
                }
            } else S(-1, "No Transport");

            function S(t, n, s, l) {
                var u, p, m, b, T, k = n;
                c || (c = !0, a && e.clearTimeout(a), i = void 0, r = l || "", C.readyState = 0 < t ? 4 : 0, u = 200 <= t && t < 300 || 304 === t, s && (b = function(e, t, n) {
                    for (var i, o, r, s, a = e.contents, l = e.dataTypes;
                        "*" === l[0];) l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (i)
                        for (o in a)
                            if (a[o] && a[o].test(i)) {
                                l.unshift(o);
                                break
                            } if (l[0] in n) r = l[0];
                    else {
                        for (o in n) {
                            if (!l[0] || e.converters[o + " " + l[0]]) {
                                r = o;
                                break
                            }
                            s || (s = o)
                        }
                        r = r || s
                    }
                    if (r) return r !== l[0] && l.unshift(r), n[r]
                }(f, C, s)), !u && -1 < x.inArray("script", f.dataTypes) && x.inArray("json", f.dataTypes) < 0 && (f.converters["text script"] = function() {}), b = function(e, t, n, i) {
                    var o, r, s, a, l, c = {},
                        d = e.dataTypes.slice();
                    if (d[1])
                        for (s in e.converters) c[s.toLowerCase()] = e.converters[s];
                    for (r = d.shift(); r;)
                        if (e.responseFields[r] && (n[e.responseFields[r]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = d.shift())
                            if ("*" === r) r = l;
                            else if ("*" !== l && l !== r) {
                        if (!(s = c[l + " " + r] || c["* " + r]))
                            for (o in c)
                                if ((a = o.split(" "))[1] === r && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
                                    !0 === s ? s = c[o] : !0 !== c[o] && (r = a[0], d.unshift(a[1]));
                                    break
                                } if (!0 !== s)
                            if (s && e.throws) t = s(t);
                            else try {
                                t = s(t)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: s ? e : "No conversion from " + l + " to " + r
                                }
                            }
                    }
                    return {
                        state: "success",
                        data: t
                    }
                }(f, b, C, u), u ? (f.ifModified && ((T = C.getResponseHeader("Last-Modified")) && (x.lastModified[o] = T), (T = C.getResponseHeader("etag")) && (x.etag[o] = T)), 204 === t || "HEAD" === f.type ? k = "nocontent" : 304 === t ? k = "notmodified" : (k = b.state, p = b.data, u = !(m = b.error))) : (m = k, !t && k || (k = "error", t < 0 && (t = 0))), C.status = t, C.statusText = (n || k) + "", u ? v.resolveWith(h, [p, k, C]) : v.rejectWith(h, [C, k, m]), C.statusCode(w), w = void 0, d && g.trigger(u ? "ajaxSuccess" : "ajaxError", [C, f, u ? p : m]), y.fireWith(h, [C, k]), d && (g.trigger("ajaxComplete", [C, f]), --x.active || x.event.trigger("ajaxStop")))
            }
            return C
        },
        getJSON: function(e, t, n) {
            return x.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return x.get(e, void 0, t, "script")
        }
    }), x.each(["get", "post"], (function(e, t) {
        x[t] = function(e, n, i, o) {
            return h(n) && (o = o || i, i = n, n = void 0), x.ajax(x.extend({
                url: e,
                type: t,
                dataType: o,
                data: n,
                success: i
            }, x.isPlainObject(e) && e))
        }
    })), x.ajaxPrefilter((function(e) {
        var t;
        for (t in e.headers) "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "")
    })), x._evalUrl = function(e, t, n) {
        return x.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            converters: {
                "text script": function() {}
            },
            dataFilter: function(e) {
                x.globalEval(e, t, n)
            }
        })
    }, x.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (h(e) && (e = e.call(this[0])), t = x(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map((function() {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            })).append(this)), this
        },
        wrapInner: function(e) {
            return h(e) ? this.each((function(t) {
                x(this).wrapInner(e.call(this, t))
            })) : this.each((function() {
                var t = x(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            }))
        },
        wrap: function(e) {
            var t = h(e);
            return this.each((function(n) {
                x(this).wrapAll(t ? e.call(this, n) : e)
            }))
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each((function() {
                x(this).replaceWith(this.childNodes)
            })), this
        }
    }), x.expr.pseudos.hidden = function(e) {
        return !x.expr.pseudos.visible(e)
    }, x.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }, x.ajaxSettings.xhr = function() {
        try {
            return new e.XMLHttpRequest
        } catch (e) {}
    };
    var Rt = {
            0: 200,
            1223: 204
        },
        Bt = x.ajaxSettings.xhr();
    f.cors = !!Bt && "withCredentials" in Bt, f.ajax = Bt = !!Bt, x.ajaxTransport((function(t) {
        var n, i;
        if (f.cors || Bt && !t.crossDomain) return {
            send: function(o, r) {
                var s, a = t.xhr();
                if (a.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                    for (s in t.xhrFields) a[s] = t.xhrFields[s];
                for (s in t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType), t.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest"), o) a.setRequestHeader(s, o[s]);
                n = function(e) {
                    return function() {
                        n && (n = i = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null, "abort" === e ? a.abort() : "error" === e ? "number" != typeof a.status ? r(0, "error") : r(a.status, a.statusText) : r(Rt[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
                            binary: a.response
                        } : {
                            text: a.responseText
                        }, a.getAllResponseHeaders()))
                    }
                }, a.onload = n(), i = a.onerror = a.ontimeout = n("error"), void 0 !== a.onabort ? a.onabort = i : a.onreadystatechange = function() {
                    4 === a.readyState && e.setTimeout((function() {
                        n && i()
                    }))
                }, n = n("abort");
                try {
                    a.send(t.hasContent && t.data || null)
                } catch (o) {
                    if (n) throw o
                }
            },
            abort: function() {
                n && n()
            }
        }
    })), x.ajaxPrefilter((function(e) {
        e.crossDomain && (e.contents.script = !1)
    })), x.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return x.globalEval(e), e
            }
        }
    }), x.ajaxPrefilter("script", (function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    })), x.ajaxTransport("script", (function(e) {
        var t, n;
        if (e.crossDomain || e.scriptAttrs) return {
            send: function(i, o) {
                t = x("<script>").attr(e.scriptAttrs || {}).prop({
                    charset: e.scriptCharset,
                    src: e.url
                }).on("load error", n = function(e) {
                    t.remove(), n = null, e && o("error" === e.type ? 404 : 200, e.type)
                }), m.head.appendChild(t[0])
            },
            abort: function() {
                n && n()
            }
        }
    }));
    var Ft, _t = [],
        Ut = /(=)\?(?=&|$)|\?\?/;
    x.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = _t.pop() || x.expando + "_" + xt.guid++;
            return this[e] = !0, e
        }
    }), x.ajaxPrefilter("json jsonp", (function(t, n, i) {
        var o, r, s, a = !1 !== t.jsonp && (Ut.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Ut.test(t.data) && "data");
        if (a || "jsonp" === t.dataTypes[0]) return o = t.jsonpCallback = h(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(Ut, "$1" + o) : !1 !== t.jsonp && (t.url += (Tt.test(t.url) ? "&" : "?") + t.jsonp + "=" + o), t.converters["script json"] = function() {
            return s || x.error(o + " was not called"), s[0]
        }, t.dataTypes[0] = "json", r = e[o], e[o] = function() {
            s = arguments
        }, i.always((function() {
            void 0 === r ? x(e).removeProp(o) : e[o] = r, t[o] && (t.jsonpCallback = n.jsonpCallback, _t.push(o)), s && h(r) && r(s[0]), s = r = void 0
        })), "script"
    })), f.createHTMLDocument = ((Ft = m.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Ft.childNodes.length), x.parseHTML = function(e, t, n) {
        return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (f.createHTMLDocument ? ((i = (t = m.implementation.createHTMLDocument("")).createElement("base")).href = m.location.href, t.head.appendChild(i)) : t = m), r = !n && [], (o = A.exec(e)) ? [t.createElement(o[1])] : (o = we([e], t, r), r && r.length && x(r).remove(), x.merge([], o.childNodes)));
        var i, o, r
    }, x.fn.load = function(e, t, n) {
        var i, o, r, s = this,
            a = e.indexOf(" ");
        return -1 < a && (i = ht(e.slice(a)), e = e.slice(0, a)), h(t) ? (n = t, t = void 0) : t && "object" == typeof t && (o = "POST"), 0 < s.length && x.ajax({
            url: e,
            type: o || "GET",
            dataType: "html",
            data: t
        }).done((function(e) {
            r = arguments, s.html(i ? x("<div>").append(x.parseHTML(e)).find(i) : e)
        })).always(n && function(e, t) {
            s.each((function() {
                n.apply(this, r || [e.responseText, t, e])
            }))
        }), this
    }, x.expr.pseudos.animated = function(e) {
        return x.grep(x.timers, (function(t) {
            return e === t.elem
        })).length
    }, x.offset = {
        setOffset: function(e, t, n) {
            var i, o, r, s, a, l, c = x.css(e, "position"),
                d = x(e),
                u = {};
            "static" === c && (e.style.position = "relative"), a = d.offset(), r = x.css(e, "top"), l = x.css(e, "left"), ("absolute" === c || "fixed" === c) && -1 < (r + l).indexOf("auto") ? (s = (i = d.position()).top, o = i.left) : (s = parseFloat(r) || 0, o = parseFloat(l) || 0), h(t) && (t = t.call(e, n, x.extend({}, a))), null != t.top && (u.top = t.top - a.top + s), null != t.left && (u.left = t.left - a.left + o), "using" in t ? t.using.call(e, u) : d.css(u)
        }
    }, x.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each((function(t) {
                x.offset.setOffset(this, e, t)
            }));
            var t, n, i = this[0];
            return i ? i.getClientRects().length ? (t = i.getBoundingClientRect(), n = i.ownerDocument.defaultView, {
                top: t.top + n.pageYOffset,
                left: t.left + n.pageXOffset
            }) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, n, i = this[0],
                    o = {
                        top: 0,
                        left: 0
                    };
                if ("fixed" === x.css(i, "position")) t = i.getBoundingClientRect();
                else {
                    for (t = this.offset(), n = i.ownerDocument, e = i.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === x.css(e, "position");) e = e.parentNode;
                    e && e !== i && 1 === e.nodeType && ((o = x(e).offset()).top += x.css(e, "borderTopWidth", !0), o.left += x.css(e, "borderLeftWidth", !0))
                }
                return {
                    top: t.top - o.top - x.css(i, "marginTop", !0),
                    left: t.left - o.left - x.css(i, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map((function() {
                for (var e = this.offsetParent; e && "static" === x.css(e, "position");) e = e.offsetParent;
                return e || ie
            }))
        }
    }), x.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, (function(e, t) {
        var n = "pageYOffset" === t;
        x.fn[e] = function(i) {
            return B(this, (function(e, i, o) {
                var r;
                if (g(e) ? r = e : 9 === e.nodeType && (r = e.defaultView), void 0 === o) return r ? r[t] : e[i];
                r ? r.scrollTo(n ? r.pageXOffset : o, n ? o : r.pageYOffset) : e[i] = o
            }), e, i, arguments.length)
        }
    })), x.each(["top", "left"], (function(e, t) {
        x.cssHooks[t] = We(f.pixelPosition, (function(e, n) {
            if (n) return n = ze(e, t), Ie.test(n) ? x(e).position()[t] + "px" : n
        }))
    })), x.each({
        Height: "height",
        Width: "width"
    }, (function(e, t) {
        x.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, (function(n, i) {
            x.fn[i] = function(o, r) {
                var s = arguments.length && (n || "boolean" != typeof o),
                    a = n || (!0 === o || !0 === r ? "margin" : "border");
                return B(this, (function(t, n, o) {
                    var r;
                    return g(t) ? 0 === i.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (r = t.documentElement, Math.max(t.body["scroll" + e], r["scroll" + e], t.body["offset" + e], r["offset" + e], r["client" + e])) : void 0 === o ? x.css(t, n, a) : x.style(t, n, o, a)
                }), t, s ? o : void 0, s)
            }
        }))
    })), x.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], (function(e, t) {
        x.fn[t] = function(e) {
            return this.on(t, e)
        }
    })), x.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, i) {
            return this.on(t, e, n, i)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        },
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), x.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), (function(e, t) {
        x.fn[t] = function(e, n) {
            return 0 < arguments.length ? this.on(t, null, e, n) : this.trigger(t)
        }
    }));
    var Xt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    x.proxy = function(e, t) {
        var n, i, r;
        if ("string" == typeof t && (n = e[t], t = e, e = n), h(e)) return i = o.call(arguments, 2), (r = function() {
            return e.apply(t || this, i.concat(o.call(arguments)))
        }).guid = e.guid = e.guid || x.guid++, r
    }, x.holdReady = function(e) {
        e ? x.readyWait++ : x.ready(!0)
    }, x.isArray = Array.isArray, x.parseJSON = JSON.parse, x.nodeName = E, x.isFunction = h, x.isWindow = g, x.camelCase = X, x.type = w, x.now = Date.now, x.isNumeric = function(e) {
        var t = x.type(e);
        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
    }, x.trim = function(e) {
        return null == e ? "" : (e + "").replace(Xt, "")
    }, "function" == typeof define && define.amd && define("jquery", [], (function() {
        return x
    }));
    var Yt = e.jQuery,
        Gt = e.$;
    return x.noConflict = function(t) {
        return e.$ === x && (e.$ = Gt), t && e.jQuery === x && (e.jQuery = Yt), x
    }, void 0 === t && (e.jQuery = e.$ = x), x
})),
function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}((function(e) {
    "use strict";
    var t = window.Slick || {};
    (t = function() {
        var t = 0;
        return function(n, i) {
            var o, r = this;
            r.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: e(n),
                appendDots: e(n),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(t, n) {
                    return e('<button type="button" />').text(n + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, r.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, e.extend(r, r.initials), r.activeBreakpoint = null, r.animType = null, r.animProp = null, r.breakpoints = [], r.breakpointSettings = [], r.cssTransitions = !1, r.focussed = !1, r.interrupted = !1, r.hidden = "hidden", r.paused = !0, r.positionProp = null, r.respondTo = null, r.rowCount = 1, r.shouldClick = !0, r.$slider = e(n), r.$slidesCache = null, r.transformType = null, r.transitionType = null, r.visibilityChange = "visibilitychange", r.windowWidth = 0, r.windowTimer = null, o = e(n).data("slick") || {}, r.options = e.extend({}, r.defaults, i, o), r.currentSlide = r.options.initialSlide, r.originalSettings = r.options, void 0 !== document.mozHidden ? (r.hidden = "mozHidden", r.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (r.hidden = "webkitHidden", r.visibilityChange = "webkitvisibilitychange"), r.autoPlay = e.proxy(r.autoPlay, r), r.autoPlayClear = e.proxy(r.autoPlayClear, r), r.autoPlayIterator = e.proxy(r.autoPlayIterator, r), r.changeSlide = e.proxy(r.changeSlide, r), r.clickHandler = e.proxy(r.clickHandler, r), r.selectHandler = e.proxy(r.selectHandler, r), r.setPosition = e.proxy(r.setPosition, r), r.swipeHandler = e.proxy(r.swipeHandler, r), r.dragHandler = e.proxy(r.dragHandler, r), r.keyHandler = e.proxy(r.keyHandler, r), r.instanceUid = t++, r.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, r.registerBreakpoints(), r.init(!0)
        }
    }()).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, t.prototype.addSlide = t.prototype.slickAdd = function(t, n, i) {
        var o = this;
        if ("boolean" == typeof n) i = n, n = null;
        else if (n < 0 || n >= o.slideCount) return !1;
        o.unload(), "number" == typeof n ? 0 === n && 0 === o.$slides.length ? e(t).appendTo(o.$slideTrack) : i ? e(t).insertBefore(o.$slides.eq(n)) : e(t).insertAfter(o.$slides.eq(n)) : !0 === i ? e(t).prependTo(o.$slideTrack) : e(t).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each((function(t, n) {
            e(n).attr("data-slick-index", t)
        })), o.$slidesCache = o.$slides, o.reinit()
    }, t.prototype.animateHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.animate({
                height: t
            }, e.options.speed)
        }
    }, t.prototype.animateSlide = function(t, n) {
        var i = {},
            o = this;
        o.animateHeight(), !0 === o.options.rtl && !1 === o.options.vertical && (t = -t), !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({
            left: t
        }, o.options.speed, o.options.easing, n) : o.$slideTrack.animate({
            top: t
        }, o.options.speed, o.options.easing, n) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft), e({
            animStart: o.currentLeft
        }).animate({
            animStart: t
        }, {
            duration: o.options.speed,
            easing: o.options.easing,
            step: function(e) {
                e = Math.ceil(e), !1 === o.options.vertical ? (i[o.animType] = "translate(" + e + "px, 0px)", o.$slideTrack.css(i)) : (i[o.animType] = "translate(0px," + e + "px)", o.$slideTrack.css(i))
            },
            complete: function() {
                n && n.call()
            }
        })) : (o.applyTransition(), t = Math.ceil(t), !1 === o.options.vertical ? i[o.animType] = "translate3d(" + t + "px, 0px, 0px)" : i[o.animType] = "translate3d(0px," + t + "px, 0px)", o.$slideTrack.css(i), n && setTimeout((function() {
            o.disableTransition(), n.call()
        }), o.options.speed))
    }, t.prototype.getNavTarget = function() {
        var t = this.options.asNavFor;
        return t && null !== t && (t = e(t).not(this.$slider)), t
    }, t.prototype.asNavFor = function(t) {
        var n = this.getNavTarget();
        null !== n && "object" == typeof n && n.each((function() {
            var n = e(this).slick("getSlick");
            n.unslicked || n.slideHandler(t, !0)
        }))
    }, t.prototype.applyTransition = function(e) {
        var t = this,
            n = {};
        !1 === t.options.fade ? n[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : n[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, !1 === t.options.fade ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
    }, t.prototype.autoPlay = function() {
        var e = this;
        e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
    }, t.prototype.autoPlayClear = function() {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer)
    }, t.prototype.autoPlayIterator = function() {
        var e = this,
            t = e.currentSlide + e.options.slidesToScroll;
        e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 == 0 && (e.direction = 1))), e.slideHandler(t))
    }, t.prototype.buildArrows = function() {
        var t = this;
        !0 === t.options.arrows && (t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, t.prototype.buildDots = function() {
        var t, n, i = this;
        if (!0 === i.options.dots) {
            for (i.$slider.addClass("slick-dotted"), n = e("<ul />").addClass(i.options.dotsClass), t = 0; t <= i.getDotCount(); t += 1) n.append(e("<li />").append(i.options.customPaging.call(this, i, t)));
            i.$dots = n.appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active")
        }
    }, t.prototype.buildOut = function() {
        var t = this;
        t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each((function(t, n) {
            e(n).attr("data-slick-index", t).data("originalStyling", e(n).attr("style") || "")
        })), t.$slider.addClass("slick-slider"), t.$slideTrack = 0 === t.slideCount ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), !0 !== t.options.centerMode && !0 !== t.options.swipeToSlide || (t.options.slidesToScroll = 1), e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), !0 === t.options.draggable && t.$list.addClass("draggable")
    }, t.prototype.buildRows = function() {
        var e, t, n, i, o, r, s, a = this;
        if (i = document.createDocumentFragment(), r = a.$slider.children(), a.options.rows > 1) {
            for (s = a.options.slidesPerRow * a.options.rows, o = Math.ceil(r.length / s), e = 0; e < o; e++) {
                var l = document.createElement("div");
                for (t = 0; t < a.options.rows; t++) {
                    var c = document.createElement("div");
                    for (n = 0; n < a.options.slidesPerRow; n++) {
                        var d = e * s + (t * a.options.slidesPerRow + n);
                        r.get(d) && c.appendChild(r.get(d))
                    }
                    l.appendChild(c)
                }
                i.appendChild(l)
            }
            a.$slider.empty().append(i), a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, t.prototype.checkResponsive = function(t, n) {
        var i, o, r, s = this,
            a = !1,
            l = s.$slider.width(),
            c = window.innerWidth || e(window).width();
        if ("window" === s.respondTo ? r = c : "slider" === s.respondTo ? r = l : "min" === s.respondTo && (r = Math.min(c, l)), s.options.responsive && s.options.responsive.length && null !== s.options.responsive) {
            for (i in o = null, s.breakpoints) s.breakpoints.hasOwnProperty(i) && (!1 === s.originalSettings.mobileFirst ? r < s.breakpoints[i] && (o = s.breakpoints[i]) : r > s.breakpoints[i] && (o = s.breakpoints[i]));
            null !== o ? null !== s.activeBreakpoint ? (o !== s.activeBreakpoint || n) && (s.activeBreakpoint = o, "unslick" === s.breakpointSettings[o] ? s.unslick(o) : (s.options = e.extend({}, s.originalSettings, s.breakpointSettings[o]), !0 === t && (s.currentSlide = s.options.initialSlide), s.refresh(t)), a = o) : (s.activeBreakpoint = o, "unslick" === s.breakpointSettings[o] ? s.unslick(o) : (s.options = e.extend({}, s.originalSettings, s.breakpointSettings[o]), !0 === t && (s.currentSlide = s.options.initialSlide), s.refresh(t)), a = o) : null !== s.activeBreakpoint && (s.activeBreakpoint = null, s.options = s.originalSettings, !0 === t && (s.currentSlide = s.options.initialSlide), s.refresh(t), a = o), t || !1 === a || s.$slider.trigger("breakpoint", [s, a])
        }
    }, t.prototype.changeSlide = function(t, n) {
        var i, o, r = this,
            s = e(t.currentTarget);
        switch (s.is("a") && t.preventDefault(), s.is("li") || (s = s.closest("li")), i = r.slideCount % r.options.slidesToScroll != 0 ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, t.data.message) {
            case "previous":
                o = 0 === i ? r.options.slidesToScroll : r.options.slidesToShow - i, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - o, !1, n);
                break;
            case "next":
                o = 0 === i ? r.options.slidesToScroll : i, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + o, !1, n);
                break;
            case "index":
                var a = 0 === t.data.index ? 0 : t.data.index || s.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(a), !1, n), s.children().trigger("focus");
                break;
            default:
                return
        }
    }, t.prototype.checkNavigable = function(e) {
        var t, n;
        if (n = 0, e > (t = this.getNavigableIndexes())[t.length - 1]) e = t[t.length - 1];
        else
            for (var i in t) {
                if (e < t[i]) {
                    e = n;
                    break
                }
                n = t[i]
            }
        return e
    }, t.prototype.cleanUpEvents = function() {
        var t = this;
        t.options.dots && null !== t.$dots && (e("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", e.proxy(t.interrupt, t, !0)).off("mouseleave.slick", e.proxy(t.interrupt, t, !1)), !0 === t.options.accessibility && t.$dots.off("keydown.slick", t.keyHandler)), t.$slider.off("focus.slick blur.slick"), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide), !0 === t.options.accessibility && (t.$prevArrow && t.$prevArrow.off("keydown.slick", t.keyHandler), t.$nextArrow && t.$nextArrow.off("keydown.slick", t.keyHandler))), t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler), t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler), t.$list.off("touchend.slick mouseup.slick", t.swipeHandler), t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler), t.$list.off("click.slick", t.clickHandler), e(document).off(t.visibilityChange, t.visibility), t.cleanUpSlideEvents(), !0 === t.options.accessibility && t.$list.off("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().off("click.slick", t.selectHandler), e(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange), e(window).off("resize.slick.slick-" + t.instanceUid, t.resize), e("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault), e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition)
    }, t.prototype.cleanUpSlideEvents = function() {
        var t = this;
        t.$list.off("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.off("mouseleave.slick", e.proxy(t.interrupt, t, !1))
    }, t.prototype.cleanUpRows = function() {
        var e, t = this;
        t.options.rows > 1 && ((e = t.$slides.children().children()).removeAttr("style"), t.$slider.empty().append(e))
    }, t.prototype.clickHandler = function(e) {
        !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
    }, t.prototype.destroy = function(t) {
        var n = this;
        n.autoPlayClear(), n.touchObject = {}, n.cleanUpEvents(), e(".slick-cloned", n.$slider).detach(), n.$dots && n.$dots.remove(), n.$prevArrow && n.$prevArrow.length && (n.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), n.htmlExpr.test(n.options.prevArrow) && n.$prevArrow.remove()), n.$nextArrow && n.$nextArrow.length && (n.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), n.htmlExpr.test(n.options.nextArrow) && n.$nextArrow.remove()), n.$slides && (n.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each((function() {
            e(this).attr("style", e(this).data("originalStyling"))
        })), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.detach(), n.$list.detach(), n.$slider.append(n.$slides)), n.cleanUpRows(), n.$slider.removeClass("slick-slider"), n.$slider.removeClass("slick-initialized"), n.$slider.removeClass("slick-dotted"), n.unslicked = !0, t || n.$slider.trigger("destroy", [n])
    }, t.prototype.disableTransition = function(e) {
        var t = this,
            n = {};
        n[t.transitionType] = "", !1 === t.options.fade ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
    }, t.prototype.fadeSlide = function(e, t) {
        var n = this;
        !1 === n.cssTransitions ? (n.$slides.eq(e).css({
            zIndex: n.options.zIndex
        }), n.$slides.eq(e).animate({
            opacity: 1
        }, n.options.speed, n.options.easing, t)) : (n.applyTransition(e), n.$slides.eq(e).css({
            opacity: 1,
            zIndex: n.options.zIndex
        }), t && setTimeout((function() {
            n.disableTransition(e), t.call()
        }), n.options.speed))
    }, t.prototype.fadeSlideOut = function(e) {
        var t = this;
        !1 === t.cssTransitions ? t.$slides.eq(e).animate({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }))
    }, t.prototype.filterSlides = t.prototype.slickFilter = function(e) {
        var t = this;
        null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
    }, t.prototype.focusHandler = function() {
        var t = this;
        t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", (function(n) {
            n.stopImmediatePropagation();
            var i = e(this);
            setTimeout((function() {
                t.options.pauseOnFocus && (t.focussed = i.is(":focus"), t.autoPlay())
            }), 0)
        }))
    }, t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }, t.prototype.getDotCount = function() {
        var e = this,
            t = 0,
            n = 0,
            i = 0;
        if (!0 === e.options.infinite)
            if (e.slideCount <= e.options.slidesToShow) ++i;
            else
                for (; t < e.slideCount;) ++i, t = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else if (!0 === e.options.centerMode) i = e.slideCount;
        else if (e.options.asNavFor)
            for (; t < e.slideCount;) ++i, t = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else i = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
        return i - 1
    }, t.prototype.getLeft = function(e) {
        var t, n, i, o, r = this,
            s = 0;
        return r.slideOffset = 0, n = r.$slides.first().outerHeight(!0), !0 === r.options.infinite ? (r.slideCount > r.options.slidesToShow && (r.slideOffset = r.slideWidth * r.options.slidesToShow * -1, o = -1, !0 === r.options.vertical && !0 === r.options.centerMode && (2 === r.options.slidesToShow ? o = -1.5 : 1 === r.options.slidesToShow && (o = -2)), s = n * r.options.slidesToShow * o), r.slideCount % r.options.slidesToScroll != 0 && e + r.options.slidesToScroll > r.slideCount && r.slideCount > r.options.slidesToShow && (e > r.slideCount ? (r.slideOffset = (r.options.slidesToShow - (e - r.slideCount)) * r.slideWidth * -1, s = (r.options.slidesToShow - (e - r.slideCount)) * n * -1) : (r.slideOffset = r.slideCount % r.options.slidesToScroll * r.slideWidth * -1, s = r.slideCount % r.options.slidesToScroll * n * -1))) : e + r.options.slidesToShow > r.slideCount && (r.slideOffset = (e + r.options.slidesToShow - r.slideCount) * r.slideWidth, s = (e + r.options.slidesToShow - r.slideCount) * n), r.slideCount <= r.options.slidesToShow && (r.slideOffset = 0, s = 0), !0 === r.options.centerMode && r.slideCount <= r.options.slidesToShow ? r.slideOffset = r.slideWidth * Math.floor(r.options.slidesToShow) / 2 - r.slideWidth * r.slideCount / 2 : !0 === r.options.centerMode && !0 === r.options.infinite ? r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2) - r.slideWidth : !0 === r.options.centerMode && (r.slideOffset = 0, r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2)), t = !1 === r.options.vertical ? e * r.slideWidth * -1 + r.slideOffset : e * n * -1 + s, !0 === r.options.variableWidth && (i = r.slideCount <= r.options.slidesToShow || !1 === r.options.infinite ? r.$slideTrack.children(".slick-slide").eq(e) : r.$slideTrack.children(".slick-slide").eq(e + r.options.slidesToShow), t = !0 === r.options.rtl ? i[0] ? -1 * (r.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, !0 === r.options.centerMode && (i = r.slideCount <= r.options.slidesToShow || !1 === r.options.infinite ? r.$slideTrack.children(".slick-slide").eq(e) : r.$slideTrack.children(".slick-slide").eq(e + r.options.slidesToShow + 1), t = !0 === r.options.rtl ? i[0] ? -1 * (r.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, t += (r.$list.width() - i.outerWidth()) / 2)), t
    }, t.prototype.getOption = t.prototype.slickGetOption = function(e) {
        return this.options[e]
    }, t.prototype.getNavigableIndexes = function() {
        var e, t = this,
            n = 0,
            i = 0,
            o = [];
        for (!1 === t.options.infinite ? e = t.slideCount : (n = -1 * t.options.slidesToScroll, i = -1 * t.options.slidesToScroll, e = 2 * t.slideCount); n < e;) o.push(n), n = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        return o
    }, t.prototype.getSlick = function() {
        return this
    }, t.prototype.getSlideCount = function() {
        var t, n, i = this;
        return n = !0 === i.options.centerMode ? i.slideWidth * Math.floor(i.options.slidesToShow / 2) : 0, !0 === i.options.swipeToSlide ? (i.$slideTrack.find(".slick-slide").each((function(o, r) {
            if (r.offsetLeft - n + e(r).outerWidth() / 2 > -1 * i.swipeLeft) return t = r, !1
        })), Math.abs(e(t).attr("data-slick-index") - i.currentSlide) || 1) : i.options.slidesToScroll
    }, t.prototype.goTo = t.prototype.slickGoTo = function(e, t) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(e)
            }
        }, t)
    }, t.prototype.init = function(t) {
        var n = this;
        e(n.$slider).hasClass("slick-initialized") || (e(n.$slider).addClass("slick-initialized"), n.buildRows(), n.buildOut(), n.setProps(), n.startLoad(), n.loadSlider(), n.initializeEvents(), n.updateArrows(), n.updateDots(), n.checkResponsive(!0), n.focusHandler()), t && n.$slider.trigger("init", [n]), !0 === n.options.accessibility && n.initADA(), n.options.autoplay && (n.paused = !1, n.autoPlay())
    }, t.prototype.initADA = function() {
        var t = this,
            n = Math.ceil(t.slideCount / t.options.slidesToShow),
            i = t.getNavigableIndexes().filter((function(e) {
                return e >= 0 && e < t.slideCount
            }));
        t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== t.$dots && (t.$slides.not(t.$slideTrack.find(".slick-cloned")).each((function(n) {
            var o = i.indexOf(n);
            e(this).attr({
                role: "tabpanel",
                id: "slick-slide" + t.instanceUid + n,
                tabindex: -1
            }), -1 !== o && e(this).attr({
                "aria-describedby": "slick-slide-control" + t.instanceUid + o
            })
        })), t.$dots.attr("role", "tablist").find("li").each((function(o) {
            var r = i[o];
            e(this).attr({
                role: "presentation"
            }), e(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + t.instanceUid + o,
                "aria-controls": "slick-slide" + t.instanceUid + r,
                "aria-label": o + 1 + " of " + n,
                "aria-selected": null,
                tabindex: "-1"
            })
        })).eq(t.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var o = t.currentSlide, r = o + t.options.slidesToShow; o < r; o++) t.$slides.eq(o).attr("tabindex", 0);
        t.activateADA()
    }, t.prototype.initArrowEvents = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow.on("keydown.slick", e.keyHandler), e.$nextArrow.on("keydown.slick", e.keyHandler)))
    }, t.prototype.initDotEvents = function() {
        var t = this;
        !0 === t.options.dots && (e("li", t.$dots).on("click.slick", {
            message: "index"
        }, t.changeSlide), !0 === t.options.accessibility && t.$dots.on("keydown.slick", t.keyHandler)), !0 === t.options.dots && !0 === t.options.pauseOnDotsHover && e("li", t.$dots).on("mouseenter.slick", e.proxy(t.interrupt, t, !0)).on("mouseleave.slick", e.proxy(t.interrupt, t, !1))
    }, t.prototype.initSlideEvents = function() {
        var t = this;
        t.options.pauseOnHover && (t.$list.on("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", e.proxy(t.interrupt, t, !1)))
    }, t.prototype.initializeEvents = function() {
        var t = this;
        t.initArrowEvents(), t.initDotEvents(), t.initSlideEvents(), t.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, t.swipeHandler), t.$list.on("click.slick", t.clickHandler), e(document).on(t.visibilityChange, e.proxy(t.visibility, t)), !0 === t.options.accessibility && t.$list.on("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), e(window).on("orientationchange.slick.slick-" + t.instanceUid, e.proxy(t.orientationChange, t)), e(window).on("resize.slick.slick-" + t.instanceUid, e.proxy(t.resize, t)), e("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault), e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), e(t.setPosition)
    }, t.prototype.initUI = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show()
    }, t.prototype.keyHandler = function(e) {
        var t = this;
        e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "next" : "previous"
            }
        }) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "previous" : "next"
            }
        }))
    }, t.prototype.lazyLoad = function() {
        function t(t) {
            e("img[data-lazy]", t).each((function() {
                var t = e(this),
                    n = e(this).attr("data-lazy"),
                    i = e(this).attr("data-srcset"),
                    o = e(this).attr("data-sizes") || r.$slider.attr("data-sizes"),
                    s = document.createElement("img");
                s.onload = function() {
                    t.animate({
                        opacity: 0
                    }, 100, (function() {
                        i && (t.attr("srcset", i), o && t.attr("sizes", o)), t.attr("src", n).animate({
                            opacity: 1
                        }, 200, (function() {
                            t.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        })), r.$slider.trigger("lazyLoaded", [r, t, n])
                    }))
                }, s.onerror = function() {
                    t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, t, n])
                }, s.src = n
            }))
        }
        var n, i, o, r = this;
        if (!0 === r.options.centerMode ? !0 === r.options.infinite ? o = (i = r.currentSlide + (r.options.slidesToShow / 2 + 1)) + r.options.slidesToShow + 2 : (i = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), o = r.options.slidesToShow / 2 + 1 + 2 + r.currentSlide) : (i = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, o = Math.ceil(i + r.options.slidesToShow), !0 === r.options.fade && (i > 0 && i--, o <= r.slideCount && o++)), n = r.$slider.find(".slick-slide").slice(i, o), "anticipated" === r.options.lazyLoad)
            for (var s = i - 1, a = o, l = r.$slider.find(".slick-slide"), c = 0; c < r.options.slidesToScroll; c++) s < 0 && (s = r.slideCount - 1), n = (n = n.add(l.eq(s))).add(l.eq(a)), s--, a++;
        t(n), r.slideCount <= r.options.slidesToShow ? t(r.$slider.find(".slick-slide")) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? t(r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow)) : 0 === r.currentSlide && t(r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow))
    }, t.prototype.loadSlider = function() {
        var e = this;
        e.setPosition(), e.$slideTrack.css({
            opacity: 1
        }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
    }, t.prototype.next = t.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }, t.prototype.orientationChange = function() {
        this.checkResponsive(), this.setPosition()
    }, t.prototype.pause = t.prototype.slickPause = function() {
        this.autoPlayClear(), this.paused = !0
    }, t.prototype.play = t.prototype.slickPlay = function() {
        var e = this;
        e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
    }, t.prototype.postSlide = function(t) {
        var n = this;
        n.unslicked || (n.$slider.trigger("afterChange", [n, t]), n.animating = !1, n.slideCount > n.options.slidesToShow && n.setPosition(), n.swipeLeft = null, n.options.autoplay && n.autoPlay(), !0 === n.options.accessibility && (n.initADA(), n.options.focusOnChange && e(n.$slides.get(n.currentSlide)).attr("tabindex", 0).focus()))
    }, t.prototype.prev = t.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, t.prototype.preventDefault = function(e) {
        e.preventDefault()
    }, t.prototype.progressiveLazyLoad = function(t) {
        t = t || 1;
        var n, i, o, r, s, a = this,
            l = e("img[data-lazy]", a.$slider);
        l.length ? (n = l.first(), i = n.attr("data-lazy"), o = n.attr("data-srcset"), r = n.attr("data-sizes") || a.$slider.attr("data-sizes"), (s = document.createElement("img")).onload = function() {
            o && (n.attr("srcset", o), r && n.attr("sizes", r)), n.attr("src", i).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === a.options.adaptiveHeight && a.setPosition(), a.$slider.trigger("lazyLoaded", [a, n, i]), a.progressiveLazyLoad()
        }, s.onerror = function() {
            t < 3 ? setTimeout((function() {
                a.progressiveLazyLoad(t + 1)
            }), 500) : (n.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), a.$slider.trigger("lazyLoadError", [a, n, i]), a.progressiveLazyLoad())
        }, s.src = i) : a.$slider.trigger("allImagesLoaded", [a])
    }, t.prototype.refresh = function(t) {
        var n, i, o = this;
        i = o.slideCount - o.options.slidesToShow, !o.options.infinite && o.currentSlide > i && (o.currentSlide = i), o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0), n = o.currentSlide, o.destroy(!0), e.extend(o, o.initials, {
            currentSlide: n
        }), o.init(), t || o.changeSlide({
            data: {
                message: "index",
                index: n
            }
        }, !1)
    }, t.prototype.registerBreakpoints = function() {
        var t, n, i, o = this,
            r = o.options.responsive || null;
        if ("array" === e.type(r) && r.length) {
            for (t in o.respondTo = o.options.respondTo || "window", r)
                if (i = o.breakpoints.length - 1, r.hasOwnProperty(t)) {
                    for (n = r[t].breakpoint; i >= 0;) o.breakpoints[i] && o.breakpoints[i] === n && o.breakpoints.splice(i, 1), i--;
                    o.breakpoints.push(n), o.breakpointSettings[n] = r[t].settings
                } o.breakpoints.sort((function(e, t) {
                return o.options.mobileFirst ? e - t : t - e
            }))
        }
    }, t.prototype.reinit = function() {
        var t = this;
        t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.cleanUpSlideEvents(), t.initSlideEvents(), t.checkResponsive(!1, !0), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), t.setPosition(), t.focusHandler(), t.paused = !t.options.autoplay, t.autoPlay(), t.$slider.trigger("reInit", [t])
    }, t.prototype.resize = function() {
        var t = this;
        e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout((function() {
            t.windowWidth = e(window).width(), t.checkResponsive(), t.unslicked || t.setPosition()
        }), 50))
    }, t.prototype.removeSlide = t.prototype.slickRemove = function(e, t, n) {
        var i = this;
        if (e = "boolean" == typeof e ? !0 === (t = e) ? 0 : i.slideCount - 1 : !0 === t ? --e : e, i.slideCount < 1 || e < 0 || e > i.slideCount - 1) return !1;
        i.unload(), !0 === n ? i.$slideTrack.children().remove() : i.$slideTrack.children(this.options.slide).eq(e).remove(), i.$slides = i.$slideTrack.children(this.options.slide), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.append(i.$slides), i.$slidesCache = i.$slides, i.reinit()
    }, t.prototype.setCSS = function(e) {
        var t, n, i = this,
            o = {};
        !0 === i.options.rtl && (e = -e), t = "left" == i.positionProp ? Math.ceil(e) + "px" : "0px", n = "top" == i.positionProp ? Math.ceil(e) + "px" : "0px", o[i.positionProp] = e, !1 === i.transformsEnabled ? i.$slideTrack.css(o) : (o = {}, !1 === i.cssTransitions ? (o[i.animType] = "translate(" + t + ", " + n + ")", i.$slideTrack.css(o)) : (o[i.animType] = "translate3d(" + t + ", " + n + ", 0px)", i.$slideTrack.css(o)))
    }, t.prototype.setDimensions = function() {
        var e = this;
        !1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({
            padding: "0px " + e.options.centerPadding
        }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({
            padding: e.options.centerPadding + " 0px"
        })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
        var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
        !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
    }, t.prototype.setFade = function() {
        var t, n = this;
        n.$slides.each((function(i, o) {
            t = n.slideWidth * i * -1, !0 === n.options.rtl ? e(o).css({
                position: "relative",
                right: t,
                top: 0,
                zIndex: n.options.zIndex - 2,
                opacity: 0
            }) : e(o).css({
                position: "relative",
                left: t,
                top: 0,
                zIndex: n.options.zIndex - 2,
                opacity: 0
            })
        })), n.$slides.eq(n.currentSlide).css({
            zIndex: n.options.zIndex - 1,
            opacity: 1
        })
    }, t.prototype.setHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.css("height", t)
        }
    }, t.prototype.setOption = t.prototype.slickSetOption = function() {
        var t, n, i, o, r, s = this,
            a = !1;
        if ("object" === e.type(arguments[0]) ? (i = arguments[0], a = arguments[1], r = "multiple") : "string" === e.type(arguments[0]) && (i = arguments[0], o = arguments[1], a = arguments[2], "responsive" === arguments[0] && "array" === e.type(arguments[1]) ? r = "responsive" : void 0 !== arguments[1] && (r = "single")), "single" === r) s.options[i] = o;
        else if ("multiple" === r) e.each(i, (function(e, t) {
            s.options[e] = t
        }));
        else if ("responsive" === r)
            for (n in o)
                if ("array" !== e.type(s.options.responsive)) s.options.responsive = [o[n]];
                else {
                    for (t = s.options.responsive.length - 1; t >= 0;) s.options.responsive[t].breakpoint === o[n].breakpoint && s.options.responsive.splice(t, 1), t--;
                    s.options.responsive.push(o[n])
                } a && (s.unload(), s.reinit())
    }, t.prototype.setPosition = function() {
        var e = this;
        e.setDimensions(), e.setHeight(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
    }, t.prototype.setProps = function() {
        var e = this,
            t = document.body.style;
        e.positionProp = !0 === e.options.vertical ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || !0 === e.options.useCSS && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
    }, t.prototype.setSlideClasses = function(e) {
        var t, n, i, o, r = this;
        if (n = r.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), r.$slides.eq(e).addClass("slick-current"), !0 === r.options.centerMode) {
            var s = r.options.slidesToShow % 2 == 0 ? 1 : 0;
            t = Math.floor(r.options.slidesToShow / 2), !0 === r.options.infinite && (e >= t && e <= r.slideCount - 1 - t ? r.$slides.slice(e - t + s, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (i = r.options.slidesToShow + e, n.slice(i - t + 1 + s, i + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? n.eq(n.length - 1 - r.options.slidesToShow).addClass("slick-center") : e === r.slideCount - 1 && n.eq(r.options.slidesToShow).addClass("slick-center")), r.$slides.eq(e).addClass("slick-center")
        } else e >= 0 && e <= r.slideCount - r.options.slidesToShow ? r.$slides.slice(e, e + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : n.length <= r.options.slidesToShow ? n.addClass("slick-active").attr("aria-hidden", "false") : (o = r.slideCount % r.options.slidesToShow, i = !0 === r.options.infinite ? r.options.slidesToShow + e : e, r.options.slidesToShow == r.options.slidesToScroll && r.slideCount - e < r.options.slidesToShow ? n.slice(i - (r.options.slidesToShow - o), i + o).addClass("slick-active").attr("aria-hidden", "false") : n.slice(i, i + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== r.options.lazyLoad && "anticipated" !== r.options.lazyLoad || r.lazyLoad()
    }, t.prototype.setupInfinite = function() {
        var t, n, i, o = this;
        if (!0 === o.options.fade && (o.options.centerMode = !1), !0 === o.options.infinite && !1 === o.options.fade && (n = null, o.slideCount > o.options.slidesToShow)) {
            for (i = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow, t = o.slideCount; t > o.slideCount - i; t -= 1) n = t - 1, e(o.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
            for (t = 0; t < i + o.slideCount; t += 1) n = t, e(o.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
            o.$slideTrack.find(".slick-cloned").find("[id]").each((function() {
                e(this).attr("id", "")
            }))
        }
    }, t.prototype.interrupt = function(e) {
        e || this.autoPlay(), this.interrupted = e
    }, t.prototype.selectHandler = function(t) {
        var n = this,
            i = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target).parents(".slick-slide"),
            o = parseInt(i.attr("data-slick-index"));
        o || (o = 0), n.slideCount <= n.options.slidesToShow ? n.slideHandler(o, !1, !0) : n.slideHandler(o)
    }, t.prototype.slideHandler = function(e, t, n) {
        var i, o, r, s, a, l = null,
            c = this;
        if (t = t || !1, !(!0 === c.animating && !0 === c.options.waitForAnimate || !0 === c.options.fade && c.currentSlide === e))
            if (!1 === t && c.asNavFor(e), i = e, l = c.getLeft(i), s = c.getLeft(c.currentSlide), c.currentLeft = null === c.swipeLeft ? s : c.swipeLeft, !1 === c.options.infinite && !1 === c.options.centerMode && (e < 0 || e > c.getDotCount() * c.options.slidesToScroll)) !1 === c.options.fade && (i = c.currentSlide, !0 !== n ? c.animateSlide(s, (function() {
                c.postSlide(i)
            })) : c.postSlide(i));
            else if (!1 === c.options.infinite && !0 === c.options.centerMode && (e < 0 || e > c.slideCount - c.options.slidesToScroll)) !1 === c.options.fade && (i = c.currentSlide, !0 !== n ? c.animateSlide(s, (function() {
            c.postSlide(i)
        })) : c.postSlide(i));
        else {
            if (c.options.autoplay && clearInterval(c.autoPlayTimer), o = i < 0 ? c.slideCount % c.options.slidesToScroll != 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll : c.slideCount + i : i >= c.slideCount ? c.slideCount % c.options.slidesToScroll != 0 ? 0 : i - c.slideCount : i, c.animating = !0, c.$slider.trigger("beforeChange", [c, c.currentSlide, o]), r = c.currentSlide, c.currentSlide = o, c.setSlideClasses(c.currentSlide), c.options.asNavFor && (a = (a = c.getNavTarget()).slick("getSlick")).slideCount <= a.options.slidesToShow && a.setSlideClasses(c.currentSlide), c.updateDots(), c.updateArrows(), !0 === c.options.fade) return !0 !== n ? (c.fadeSlideOut(r), c.fadeSlide(o, (function() {
                c.postSlide(o)
            }))) : c.postSlide(o), void c.animateHeight();
            !0 !== n ? c.animateSlide(l, (function() {
                c.postSlide(o)
            })) : c.postSlide(o)
        }
    }, t.prototype.startLoad = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
    }, t.prototype.swipeDirection = function() {
        var e, t, n, i, o = this;
        return e = o.touchObject.startX - o.touchObject.curX, t = o.touchObject.startY - o.touchObject.curY, n = Math.atan2(t, e), (i = Math.round(180 * n / Math.PI)) < 0 && (i = 360 - Math.abs(i)), i <= 45 && i >= 0 || i <= 360 && i >= 315 ? !1 === o.options.rtl ? "left" : "right" : i >= 135 && i <= 225 ? !1 === o.options.rtl ? "right" : "left" : !0 === o.options.verticalSwiping ? i >= 35 && i <= 135 ? "down" : "up" : "vertical"
    }, t.prototype.swipeEnd = function(e) {
        var t, n, i = this;
        if (i.dragging = !1, i.swiping = !1, i.scrolling) return i.scrolling = !1, !1;
        if (i.interrupted = !1, i.shouldClick = !(i.touchObject.swipeLength > 10), void 0 === i.touchObject.curX) return !1;
        if (!0 === i.touchObject.edgeHit && i.$slider.trigger("edge", [i, i.swipeDirection()]), i.touchObject.swipeLength >= i.touchObject.minSwipe) {
            switch (n = i.swipeDirection()) {
                case "left":
                case "down":
                    t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide + i.getSlideCount()) : i.currentSlide + i.getSlideCount(), i.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide - i.getSlideCount()) : i.currentSlide - i.getSlideCount(), i.currentDirection = 1
            }
            "vertical" != n && (i.slideHandler(t), i.touchObject = {}, i.$slider.trigger("swipe", [i, n]))
        } else i.touchObject.startX !== i.touchObject.curX && (i.slideHandler(i.currentSlide), i.touchObject = {})
    }, t.prototype.swipeHandler = function(e) {
        var t = this;
        if (!(!1 === t.options.swipe || "ontouchend" in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
            case "start":
                t.swipeStart(e);
                break;
            case "move":
                t.swipeMove(e);
                break;
            case "end":
                t.swipeEnd(e)
        }
    }, t.prototype.swipeMove = function(e) {
        var t, n, i, o, r, s, a = this;
        return r = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!a.dragging || a.scrolling || r && 1 !== r.length) && (t = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== r ? r[0].pageX : e.clientX, a.touchObject.curY = void 0 !== r ? r[0].pageY : e.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), s = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))), !a.options.verticalSwiping && !a.swiping && s > 4 ? (a.scrolling = !0, !1) : (!0 === a.options.verticalSwiping && (a.touchObject.swipeLength = s), n = a.swipeDirection(), void 0 !== e.originalEvent && a.touchObject.swipeLength > 4 && (a.swiping = !0, e.preventDefault()), o = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), !0 === a.options.verticalSwiping && (o = a.touchObject.curY > a.touchObject.startY ? 1 : -1), i = a.touchObject.swipeLength, a.touchObject.edgeHit = !1, !1 === a.options.infinite && (0 === a.currentSlide && "right" === n || a.currentSlide >= a.getDotCount() && "left" === n) && (i = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = t + i * o : a.swipeLeft = t + i * (a.$list.height() / a.listWidth) * o, !0 === a.options.verticalSwiping && (a.swipeLeft = t + i * o), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))))
    }, t.prototype.swipeStart = function(e) {
        var t, n = this;
        if (n.interrupted = !0, 1 !== n.touchObject.fingerCount || n.slideCount <= n.options.slidesToShow) return n.touchObject = {}, !1;
        void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), n.touchObject.startX = n.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, n.touchObject.startY = n.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, n.dragging = !0
    }, t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
        var e = this;
        null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
    }, t.prototype.unload = function() {
        var t = this;
        e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(), t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, t.prototype.unslick = function(e) {
        var t = this;
        t.$slider.trigger("unslick", [t, e]), t.destroy()
    }, t.prototype.updateArrows = function() {
        var e = this;
        Math.floor(e.options.slidesToShow / 2), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : (e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode || e.currentSlide >= e.slideCount - 1 && !0 === e.options.centerMode) && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, t.prototype.updateDots = function() {
        var e = this;
        null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").end(), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active"))
    }, t.prototype.visibility = function() {
        var e = this;
        e.options.autoplay && (document[e.hidden] ? e.interrupted = !0 : e.interrupted = !1)
    }, e.fn.slick = function() {
        var e, n, i = this,
            o = arguments[0],
            r = Array.prototype.slice.call(arguments, 1),
            s = i.length;
        for (e = 0; e < s; e++)
            if ("object" == typeof o || void 0 === o ? i[e].slick = new t(i[e], o) : n = i[e].slick[o].apply(i[e].slick, r), void 0 !== n) return n;
        return i
    }
})),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? e(require("jquery")) : e(window.jQuery || window.Zepto)
}((function(e) {
    var t, n, i, o, r, s, a = "Close",
        l = "BeforeClose",
        c = "MarkupParse",
        d = "Open",
        u = "Change",
        p = "mfp",
        f = ".mfp",
        h = "mfp-ready",
        g = "mfp-removing",
        m = "mfp-prevent-close",
        v = function() {},
        y = !!window.jQuery,
        w = e(window),
        b = function(e, n) {
            t.ev.on(p + e + f, n)
        },
        x = function(t, n, i, o) {
            var r = document.createElement("div");
            return r.className = "mfp-" + t, i && (r.innerHTML = i), o ? n && n.appendChild(r) : (r = e(r), n && r.appendTo(n)), r
        },
        T = function(n, i) {
            t.ev.triggerHandler(p + n, i), t.st.callbacks && (n = n.charAt(0).toLowerCase() + n.slice(1), t.st.callbacks[n] && t.st.callbacks[n].apply(t, e.isArray(i) ? i : [i]))
        },
        k = function(n) {
            return n === s && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), s = n), t.currTemplate.closeBtn
        },
        C = function() {
            e.magnificPopup.instance || ((t = new v).init(), e.magnificPopup.instance = t)
        };
    v.prototype = {
        constructor: v,
        init: function() {
            var n = navigator.appVersion;
            t.isLowIE = t.isIE8 = document.all && !document.addEventListener, t.isAndroid = /android/gi.test(n), t.isIOS = /iphone|ipad|ipod/gi.test(n), t.supportsTransition = function() {
                var e = document.createElement("p").style,
                    t = ["ms", "O", "Moz", "Webkit"];
                if (void 0 !== e.transition) return !0;
                for (; t.length;)
                    if (t.pop() + "Transition" in e) return !0;
                return !1
            }(), t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), i = e(document), t.popupsCache = {}
        },
        open: function(n) {
            var o;
            if (!1 === n.isObj) {
                t.items = n.items.toArray(), t.index = 0;
                var s, a = n.items;
                for (o = 0; o < a.length; o++)
                    if ((s = a[o]).parsed && (s = s.el[0]), s === n.el[0]) {
                        t.index = o;
                        break
                    }
            } else t.items = e.isArray(n.items) ? n.items : [n.items], t.index = n.index || 0;
            if (!t.isOpen) {
                t.types = [], r = "", n.mainEl && n.mainEl.length ? t.ev = n.mainEl.eq(0) : t.ev = i, n.key ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}), t.currTemplate = t.popupsCache[n.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, n), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = x("bg").on("click.mfp", (function() {
                    t.close()
                })), t.wrap = x("wrap").attr("tabindex", -1).on("click.mfp", (function(e) {
                    t._checkIfClose(e.target) && t.close()
                })), t.container = x("container", t.wrap)), t.contentContainer = x("content"), t.st.preloader && (t.preloader = x("preloader", t.container, t.st.tLoading));
                var l = e.magnificPopup.modules;
                for (o = 0; o < l.length; o++) {
                    var u = l[o];
                    u = u.charAt(0).toUpperCase() + u.slice(1), t["init" + u].call(t)
                }
                T("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (b(c, (function(e, t, n, i) {
                    n.close_replaceWith = k(i.type)
                })), r += " mfp-close-btn-in") : t.wrap.append(k())), t.st.alignTop && (r += " mfp-align-top"), t.fixedContentPos ? t.wrap.css({
                    overflow: t.st.overflowY,
                    overflowX: "hidden",
                    overflowY: t.st.overflowY
                }) : t.wrap.css({
                    top: w.scrollTop(),
                    position: "absolute"
                }), (!1 === t.st.fixedBgPos || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
                    height: i.height(),
                    position: "absolute"
                }), t.st.enableEscapeKey && i.on("keyup.mfp", (function(e) {
                    27 === e.keyCode && t.close()
                })), w.on("resize.mfp", (function() {
                    t.updateSize()
                })), t.st.closeOnContentClick || (r += " mfp-auto-cursor"), r && t.wrap.addClass(r);
                var p = t.wH = w.height(),
                    f = {};
                if (t.fixedContentPos && t._hasScrollBar(p)) {
                    var g = t._getScrollbarSize();
                    g && (f.marginRight = g)
                }
                t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : f.overflow = "hidden");
                var m = t.st.mainClass;
                return t.isIE7 && (m += " mfp-ie7"), m && t._addClassToMFP(m), t.updateItemHTML(), T("BuildControls"), e("html").css(f), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)), t._lastFocusedEl = document.activeElement, setTimeout((function() {
                    t.content ? (t._addClassToMFP(h), t._setFocus()) : t.bgOverlay.addClass(h), i.on("focusin.mfp", t._onFocusIn)
                }), 16), t.isOpen = !0, t.updateSize(p), T(d), n
            }
            t.updateItemHTML()
        },
        close: function() {
            t.isOpen && (T(l), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(g), setTimeout((function() {
                t._close()
            }), t.st.removalDelay)) : t._close())
        },
        _close: function() {
            T(a);
            var n = "mfp-removing mfp-ready ";
            if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (n += t.st.mainClass + " "), t._removeClassFromMFP(n), t.fixedContentPos) {
                var o = {
                    marginRight: ""
                };
                t.isIE7 ? e("body, html").css("overflow", "") : o.overflow = "", e("html").css(o)
            }
            i.off("keyup.mfp focusin.mfp"), t.ev.off(f), t.wrap.attr("class", "mfp-wrap").removeAttr("style"), t.bgOverlay.attr("class", "mfp-bg"), t.container.attr("class", "mfp-container"), !t.st.showCloseBtn || t.st.closeBtnInside && !0 !== t.currTemplate[t.currItem.type] || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t.st.autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl).focus(), t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, T("AfterClose")
        },
        updateSize: function(e) {
            if (t.isIOS) {
                var n = document.documentElement.clientWidth / window.innerWidth,
                    i = window.innerHeight * n;
                t.wrap.css("height", i), t.wH = i
            } else t.wH = e || w.height();
            t.fixedContentPos || t.wrap.css("height", t.wH), T("Resize")
        },
        updateItemHTML: function() {
            var n = t.items[t.index];
            t.contentContainer.detach(), t.content && t.content.detach(), n.parsed || (n = t.parseEl(t.index));
            var i = n.type;
            if (T("BeforeChange", [t.currItem ? t.currItem.type : "", i]), t.currItem = n, !t.currTemplate[i]) {
                var r = !!t.st[i] && t.st[i].markup;
                T("FirstMarkupParse", r), t.currTemplate[i] = !r || e(r)
            }
            o && o !== n.type && t.container.removeClass("mfp-" + o + "-holder");
            var s = t["get" + i.charAt(0).toUpperCase() + i.slice(1)](n, t.currTemplate[i]);
            t.appendContent(s, i), n.preloaded = !0, T(u, n), o = n.type, t.container.prepend(t.contentContainer), T("AfterChange")
        },
        appendContent: function(e, n) {
            t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && !0 === t.currTemplate[n] ? t.content.find(".mfp-close").length || t.content.append(k()) : t.content = e : t.content = "", T("BeforeAppend"), t.container.addClass("mfp-" + n + "-holder"), t.contentContainer.append(t.content)
        },
        parseEl: function(n) {
            var i, o = t.items[n];
            if (o.tagName ? o = {
                    el: e(o)
                } : (i = o.type, o = {
                    data: o,
                    src: o.src
                }), o.el) {
                for (var r = t.types, s = 0; s < r.length; s++)
                    if (o.el.hasClass("mfp-" + r[s])) {
                        i = r[s];
                        break
                    } o.src = o.el.attr("data-mfp-src"), o.src || (o.src = o.el.attr("href"))
            }
            return o.type = i || t.st.type || "inline", o.index = n, o.parsed = !0, t.items[n] = o, T("ElementParse", o), t.items[n]
        },
        addGroup: function(e, n) {
            var i = function(i) {
                i.mfpEl = this, t._openClick(i, e, n)
            };
            n || (n = {});
            var o = "click.magnificPopup";
            n.mainEl = e, n.items ? (n.isObj = !0, e.off(o).on(o, i)) : (n.isObj = !1, n.delegate ? e.off(o).on(o, n.delegate, i) : (n.items = e, e.off(o).on(o, i)))
        },
        _openClick: function(n, i, o) {
            if ((void 0 !== o.midClick ? o.midClick : e.magnificPopup.defaults.midClick) || !(2 === n.which || n.ctrlKey || n.metaKey || n.altKey || n.shiftKey)) {
                var r = void 0 !== o.disableOn ? o.disableOn : e.magnificPopup.defaults.disableOn;
                if (r)
                    if (e.isFunction(r)) {
                        if (!r.call(t)) return !0
                    } else if (w.width() < r) return !0;
                n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()), o.el = e(n.mfpEl), o.delegate && (o.items = i.find(o.delegate)), t.open(o)
            }
        },
        updateStatus: function(e, i) {
            if (t.preloader) {
                n !== e && t.container.removeClass("mfp-s-" + n), i || "loading" !== e || (i = t.st.tLoading);
                var o = {
                    status: e,
                    text: i
                };
                T("UpdateStatus", o), e = o.status, i = o.text, t.preloader.html(i), t.preloader.find("a").on("click", (function(e) {
                    e.stopImmediatePropagation()
                })), t.container.addClass("mfp-s-" + e), n = e
            }
        },
        _checkIfClose: function(n) {
            if (!e(n).hasClass(m)) {
                var i = t.st.closeOnContentClick,
                    o = t.st.closeOnBgClick;
                if (i && o) return !0;
                if (!t.content || e(n).hasClass("mfp-close") || t.preloader && n === t.preloader[0]) return !0;
                if (n === t.content[0] || e.contains(t.content[0], n)) {
                    if (i) return !0
                } else if (o && e.contains(document, n)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(e) {
            t.bgOverlay.addClass(e), t.wrap.addClass(e)
        },
        _removeClassFromMFP: function(e) {
            this.bgOverlay.removeClass(e), t.wrap.removeClass(e)
        },
        _hasScrollBar: function(e) {
            return (t.isIE7 ? i.height() : document.body.scrollHeight) > (e || w.height())
        },
        _setFocus: function() {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
        },
        _onFocusIn: function(n) {
            if (n.target !== t.wrap[0] && !e.contains(t.wrap[0], n.target)) return t._setFocus(), !1
        },
        _parseMarkup: function(t, n, i) {
            var o;
            i.data && (n = e.extend(i.data, n)), T(c, [t, n, i]), e.each(n, (function(n, i) {
                if (void 0 === i || !1 === i) return !0;
                if ((o = n.split("_")).length > 1) {
                    var r = t.find(".mfp-" + o[0]);
                    if (r.length > 0) {
                        var s = o[1];
                        "replaceWith" === s ? r[0] !== i[0] && r.replaceWith(i) : "img" === s ? r.is("img") ? r.attr("src", i) : r.replaceWith(e("<img>").attr("src", i).attr("class", r.attr("class"))) : r.attr(o[1], i)
                    }
                } else t.find(".mfp-" + n).html(i)
            }))
        },
        _getScrollbarSize: function() {
            if (void 0 === t.scrollbarSize) {
                var e = document.createElement("div");
                e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), t.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
            }
            return t.scrollbarSize
        }
    }, e.magnificPopup = {
        instance: null,
        proto: v.prototype,
        modules: [],
        open: function(t, n) {
            return C(), (t = t ? e.extend(!0, {}, t) : {}).isObj = !0, t.index = n || 0, this.instance.open(t)
        },
        close: function() {
            return e.magnificPopup.instance && e.magnificPopup.instance.close()
        },
        registerModule: function(t, n) {
            n.options && (e.magnificPopup.defaults[t] = n.options), e.extend(this.proto, n.proto), this.modules.push(t)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, e.fn.magnificPopup = function(n) {
        C();
        var i = e(this);
        if ("string" == typeof n)
            if ("open" === n) {
                var o, r = y ? i.data("magnificPopup") : i[0].magnificPopup,
                    s = parseInt(arguments[1], 10) || 0;
                r.items ? o = r.items[s] : (o = i, r.delegate && (o = o.find(r.delegate)), o = o.eq(s)), t._openClick({
                    mfpEl: o
                }, i, r)
            } else t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1));
        else n = e.extend(!0, {}, n), y ? i.data("magnificPopup", n) : i[0].magnificPopup = n, t.addGroup(i, n);
        return i
    };
    var S, $, E, A = "inline",
        j = function() {
            E && ($.after(E.addClass(S)).detach(), E = null)
        };
    e.magnificPopup.registerModule(A, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                t.types.push(A), b("Close.inline", (function() {
                    j()
                }))
            },
            getInline: function(n, i) {
                if (j(), n.src) {
                    var o = t.st.inline,
                        r = e(n.src);
                    if (r.length) {
                        var s = r[0].parentNode;
                        s && s.tagName && ($ || (S = o.hiddenClass, $ = x(S), S = "mfp-" + S), E = r.after($).detach().removeClass(S)), t.updateStatus("ready")
                    } else t.updateStatus("error", o.tNotFound), r = e("<div>");
                    return n.inlineElement = r, r
                }
                return t.updateStatus("ready"), t._parseMarkup(i, {}, n), i
            }
        }
    });
    var O, L = "ajax",
        P = function() {
            O && e(document.body).removeClass(O)
        },
        H = function() {
            P(), t.req && t.req.abort()
        };
    e.magnificPopup.registerModule(L, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                t.types.push(L), O = t.st.ajax.cursor, b("Close.ajax", H), b("BeforeChange.ajax", H)
            },
            getAjax: function(n) {
                O && e(document.body).addClass(O), t.updateStatus("loading");
                var i = e.extend({
                    url: n.src,
                    success: function(i, o, r) {
                        var s = {
                            data: i,
                            xhr: r
                        };
                        T("ParseAjax", s), t.appendContent(e(s.data), L), n.finished = !0, P(), t._setFocus(), setTimeout((function() {
                            t.wrap.addClass(h)
                        }), 16), t.updateStatus("ready"), T("AjaxContentAdded")
                    },
                    error: function() {
                        P(), n.finished = n.loadError = !0, t.updateStatus("error", t.st.ajax.tError.replace("%url%", n.src))
                    }
                }, t.st.ajax.settings);
                return t.req = e.ajax(i), ""
            }
        }
    });
    var D, I = function(n) {
        if (n.data && void 0 !== n.data.title) return n.data.title;
        var i = t.st.image.titleSrc;
        if (i) {
            if (e.isFunction(i)) return i.call(t, n);
            if (n.el) return n.el.attr(i) || ""
        }
        return ""
    };
    e.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var n = t.st.image,
                    i = ".image";
                t.types.push("image"), b("Open.image", (function() {
                    "image" === t.currItem.type && n.cursor && e(document.body).addClass(n.cursor)
                })), b("Close.image", (function() {
                    n.cursor && e(document.body).removeClass(n.cursor), w.off("resize.mfp")
                })), b("Resize" + i, t.resizeImage), t.isLowIE && b("AfterChange", t.resizeImage)
            },
            resizeImage: function() {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    var n = 0;
                    t.isLowIE && (n = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - n)
                }
            },
            _onImageHasSize: function(e) {
                e.img && (e.hasSize = !0, D && clearInterval(D), e.isCheckingImgSize = !1, T("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), e.imgHidden = !1))
            },
            findImageSize: function(e) {
                var n = 0,
                    i = e.img[0],
                    o = function(r) {
                        D && clearInterval(D), D = setInterval((function() {
                            i.naturalWidth > 0 ? t._onImageHasSize(e) : (n > 200 && clearInterval(D), 3 === ++n ? o(10) : 40 === n ? o(50) : 100 === n && o(500))
                        }), r)
                    };
                o(1)
            },
            getImage: function(n, i) {
                var o = 0,
                    r = function() {
                        n && (n.img[0].complete ? (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("ready")), n.hasSize = !0, n.loaded = !0, T("ImageLoadComplete")) : ++o < 200 ? setTimeout(r, 100) : s())
                    },
                    s = function() {
                        n && (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("error", a.tError.replace("%url%", n.src))), n.hasSize = !0, n.loaded = !0, n.loadError = !0)
                    },
                    a = t.st.image,
                    l = i.find(".mfp-img");
                if (l.length) {
                    var c = document.createElement("img");
                    c.className = "mfp-img", n.el && n.el.find("img").length && (c.alt = n.el.find("img").attr("alt")), n.img = e(c).on("load.mfploader", r).on("error.mfploader", s), c.src = n.src, l.is("img") && (n.img = n.img.clone()), (c = n.img[0]).naturalWidth > 0 ? n.hasSize = !0 : c.width || (n.hasSize = !1)
                }
                return t._parseMarkup(i, {
                    title: I(n),
                    img_replaceWith: n.img
                }, n), t.resizeImage(), n.hasSize ? (D && clearInterval(D), n.loadError ? (i.addClass("mfp-loading"), t.updateStatus("error", a.tError.replace("%url%", n.src))) : (i.removeClass("mfp-loading"), t.updateStatus("ready")), i) : (t.updateStatus("loading"), n.loading = !0, n.hasSize || (n.imgHidden = !0, i.addClass("mfp-loading"), t.findImageSize(n)), i)
            }
        }
    });
    var N;
    e.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(e) {
                return e.is("img") ? e : e.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var e, n = t.st.zoom,
                    i = ".zoom";
                if (n.enabled && t.supportsTransition) {
                    var o, r, s = n.duration,
                        a = function(e) {
                            var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                i = "all " + n.duration / 1e3 + "s " + n.easing,
                                o = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                r = "transition";
                            return o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[r] = i, t.css(o), t
                        },
                        l = function() {
                            t.content.css("visibility", "visible")
                        };
                    b("BuildControls" + i, (function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(o), t.content.css("visibility", "hidden"), !(e = t._getItemToZoom())) return void l();
                            (r = a(e)).css(t._getOffset()), t.wrap.append(r), o = setTimeout((function() {
                                r.css(t._getOffset(!0)), o = setTimeout((function() {
                                    l(), setTimeout((function() {
                                        r.remove(), e = r = null, T("ZoomAnimationEnded")
                                    }), 16)
                                }), s)
                            }), 16)
                        }
                    })), b("BeforeClose.zoom", (function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(o), t.st.removalDelay = s, !e) {
                                if (!(e = t._getItemToZoom())) return;
                                r = a(e)
                            }
                            r.css(t._getOffset(!0)), t.wrap.append(r), t.content.css("visibility", "hidden"), setTimeout((function() {
                                r.css(t._getOffset())
                            }), 16)
                        }
                    })), b("Close.zoom", (function() {
                        t._allowZoom() && (l(), r && r.remove(), e = null)
                    }))
                }
            },
            _allowZoom: function() {
                return "image" === t.currItem.type
            },
            _getItemToZoom: function() {
                return !!t.currItem.hasSize && t.currItem.img
            },
            _getOffset: function(n) {
                var i, o = (i = n ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem)).offset(),
                    r = parseInt(i.css("padding-top"), 10),
                    s = parseInt(i.css("padding-bottom"), 10);
                o.top -= e(window).scrollTop() - r;
                var a = {
                    width: i.width(),
                    height: (y ? i.innerHeight() : i[0].offsetHeight) - s - r
                };
                return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N ? a["-moz-transform"] = a.transform = "translate(" + o.left + "px," + o.top + "px)" : (a.left = o.left, a.top = o.top), a
            }
        }
    });
    var M = "iframe",
        q = function(e) {
            if (t.currTemplate.iframe) {
                var n = t.currTemplate.iframe.find("iframe");
                n.length && (e || (n[0].src = "//about:blank"), t.isIE8 && n.css("display", e ? "block" : "none"))
            }
        };
    e.magnificPopup.registerModule(M, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                t.types.push(M), b("BeforeChange", (function(e, t, n) {
                    t !== n && (t === M ? q() : n === M && q(!0))
                })), b("Close.iframe", (function() {
                    q()
                }))
            },
            getIframe: function(n, i) {
                var o = n.src,
                    r = t.st.iframe;
                e.each(r.patterns, (function() {
                    if (o.indexOf(this.index) > -1) return this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1
                }));
                var s = {};
                return r.srcAction && (s[r.srcAction] = o), t._parseMarkup(i, s, n), t.updateStatus("ready"), i
            }
        }
    });
    var z = function(e) {
            var n = t.items.length;
            return e > n - 1 ? e - n : e < 0 ? n + e : e
        },
        W = function(e, t, n) {
            return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n)
        };
    e.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var n = t.st.gallery,
                    o = ".mfp-gallery";
                if (t.direction = !0, !n || !n.enabled) return !1;
                r += " mfp-gallery", b(d + o, (function() {
                    n.navigateByImgClick && t.wrap.on("click" + o, ".mfp-img", (function() {
                        if (t.items.length > 1) return t.next(), !1
                    })), i.on("keydown" + o, (function(e) {
                        37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
                    }))
                })), b("UpdateStatus" + o, (function(e, n) {
                    n.text && (n.text = W(n.text, t.currItem.index, t.items.length))
                })), b(c + o, (function(e, i, o, r) {
                    var s = t.items.length;
                    o.counter = s > 1 ? W(n.tCounter, r.index, s) : ""
                })), b("BuildControls" + o, (function() {
                    if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
                        var i = n.arrowMarkup,
                            o = t.arrowLeft = e(i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(m),
                            r = t.arrowRight = e(i.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(m);
                        o.click((function() {
                            t.prev()
                        })), r.click((function() {
                            t.next()
                        })), t.container.append(o.add(r))
                    }
                })), b(u + o, (function() {
                    t._preloadTimeout && clearTimeout(t._preloadTimeout), t._preloadTimeout = setTimeout((function() {
                        t.preloadNearbyImages(), t._preloadTimeout = null
                    }), 16)
                })), b(a + o, (function() {
                    i.off(o), t.wrap.off("click" + o), t.arrowRight = t.arrowLeft = null
                }))
            },
            next: function() {
                t.direction = !0, t.index = z(t.index + 1), t.updateItemHTML()
            },
            prev: function() {
                t.direction = !1, t.index = z(t.index - 1), t.updateItemHTML()
            },
            goTo: function(e) {
                t.direction = e >= t.index, t.index = e, t.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var e, n = t.st.gallery.preload,
                    i = Math.min(n[0], t.items.length),
                    o = Math.min(n[1], t.items.length);
                for (e = 1; e <= (t.direction ? o : i); e++) t._preloadItem(t.index + e);
                for (e = 1; e <= (t.direction ? i : o); e++) t._preloadItem(t.index - e)
            },
            _preloadItem: function(n) {
                if (n = z(n), !t.items[n].preloaded) {
                    var i = t.items[n];
                    i.parsed || (i = t.parseEl(n)), T("LazyLoad", i), "image" === i.type && (i.img = e('<img class="mfp-img" />').on("load.mfploader", (function() {
                        i.hasSize = !0
                    })).on("error.mfploader", (function() {
                        i.hasSize = !0, i.loadError = !0, T("LazyLoadError", i)
                    })).attr("src", i.src)), i.preloaded = !0
                }
            }
        }
    });
    var R = "retina";
    e.magnificPopup.registerModule(R, {
        options: {
            replaceSrc: function(e) {
                return e.src.replace(/\.\w+$/, (function(e) {
                    return "@2x" + e
                }))
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var e = t.st.retina,
                        n = e.ratio;
                    (n = isNaN(n) ? n() : n) > 1 && (b("ImageHasSize.retina", (function(e, t) {
                        t.img.css({
                            "max-width": t.img[0].naturalWidth / n,
                            width: "100%"
                        })
                    })), b("ElementParse.retina", (function(t, i) {
                        i.src = e.replaceSrc(i, n)
                    })))
                }
            }
        }
    }), C()
})),
/*!
 * @copyright Copyright (c) 2017 IcoMoon.io
 * @license   Licensed under MIT license
 *            See https://github.com/Keyamoon/svgxuse
 * @version   1.2.6
 */
function() {
    "use strict";
    if ("undefined" != typeof window && window.addEventListener) {
        var e, t, n, i = Object.create(null),
            o = function() {
                clearTimeout(t), t = setTimeout(e, 100)
            },
            r = function() {},
            s = function(e) {
                function t(e) {
                    var t;
                    return void 0 !== e.protocol ? t = e : (t = document.createElement("a")).href = e, t.protocol.replace(/:/g, "") + t.host
                }
                var n, i, o;
                return window.XMLHttpRequest && (n = new XMLHttpRequest, i = t(location), o = t(e), n = void 0 === n.withCredentials && "" !== o && o !== i ? XDomainRequest || void 0 : XMLHttpRequest), n
            },
            a = "http://www.w3.org/1999/xlink";
        e = function() {
            var e, t, n, l, c, d, u, p, f, h, g = 0;

            function m() {
                var e;
                0 === (g -= 1) && (r(), window.addEventListener("resize", o, !1), window.addEventListener("orientationchange", o, !1), window.MutationObserver ? ((e = new MutationObserver(o)).observe(document.documentElement, {
                    childList: !0,
                    subtree: !0,
                    attributes: !0
                }), r = function() {
                    try {
                        e.disconnect(), window.removeEventListener("resize", o, !1), window.removeEventListener("orientationchange", o, !1)
                    } catch (e) {}
                }) : (document.documentElement.addEventListener("DOMSubtreeModified", o, !1), r = function() {
                    document.documentElement.removeEventListener("DOMSubtreeModified", o, !1), window.removeEventListener("resize", o, !1), window.removeEventListener("orientationchange", o, !1)
                }))
            }

            function v(e) {
                return function() {
                    !0 !== i[e.base] && (e.useEl.setAttributeNS(a, "xlink:href", "#" + e.hash), e.useEl.hasAttribute("href") && e.useEl.setAttribute("href", "#" + e.hash))
                }
            }

            function y(e) {
                return function() {
                    var t, n = document.body,
                        i = document.createElement("x");
                    e.onload = null, i.innerHTML = e.responseText, (t = i.getElementsByTagName("svg")[0]) && (t.setAttribute("aria-hidden", "true"), t.style.position = "absolute", t.style.width = 0, t.style.height = 0, t.style.overflow = "hidden", n.insertBefore(t, n.firstChild)), m()
                }
            }

            function w(e) {
                return function() {
                    e.onerror = null, e.ontimeout = null, m()
                }
            }
            for (r(), f = document.getElementsByTagName("use"), c = 0; c < f.length; c += 1) {
                try {
                    t = f[c].getBoundingClientRect()
                } catch (e) {
                    t = !1
                }
                e = (p = (l = f[c].getAttribute("href") || f[c].getAttributeNS(a, "href") || f[c].getAttribute("xlink:href")) && l.split ? l.split("#") : ["", ""])[0], n = p[1], d = t && 0 === t.left && 0 === t.right && 0 === t.top && 0 === t.bottom, t && 0 === t.width && 0 === t.height && !d ? (f[c].hasAttribute("href") && f[c].setAttributeNS(a, "xlink:href", l), e.length && (!0 !== (h = i[e]) && setTimeout(v({
                    useEl: f[c],
                    base: e,
                    hash: n
                }), 0), void 0 === h && void 0 !== (u = s(e)) && (h = new u, i[e] = h, h.onload = y(h), h.onerror = w(h), h.ontimeout = w(h), h.open("GET", e), h.send(), g += 1))) : d ? e.length && i[e] && setTimeout(v({
                    useEl: f[c],
                    base: e,
                    hash: n
                }), 0) : void 0 === i[e] ? i[e] = !0 : i[e].onload && (i[e].abort(), delete i[e].onload, i[e] = !0)
            }
            f = "", g += 1, m()
        }, n = function() {
            window.removeEventListener("load", n, !1), t = setTimeout(e, 0)
        }, "complete" !== document.readyState ? window.addEventListener("load", n, !1) : n()
    }
}();
/* End */
;
; /* Start:"a:4:{s:4:"full";s:53:"/bitrix/templates/bsu_2021/js/main.js?164517263835496";s:6:"source";s:37:"/bitrix/templates/bsu_2021/js/main.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
const d = document;


function setHeaderTopPos(e) {
	let bxPanel = document.querySelector('#bx-panel')
    if (window.innerWidth > 1024) {
        const t = d.querySelector(".details"),
            a = d.querySelector(".header");
            if(bxPanel){
	            e.style.top = `${a.offsetHeight+t.offsetHeight + bxPanel.offsetHeight}px`
            } else {
	             e.style.top = `${a.offsetHeight+t.offsetHeight}px`
            }
       
    }
}

/*
function toggleNav() {
    const e = d.querySelector(".header-menu"),
        t = d.querySelectorAll(".details-nav__item");
    if (t)
        for (let a = 0; a < t.length; a++) t[a].addEventListener("mouseover", (function() {
            removeActiveClass(t), this.classList.add("active"); 
            let position = this.getBoundingClientRect(); 
            if(a === t.length - 1 || a === t.length - 2){
	            e.style.left = position.left - e.offsetWidth + position.width + 'px'
            }else {e.style.left = position.left + 'px'} slideNav(this), closeNavOnMouseOut(t[a]), closeNavOnLinkClick(e)
        }))
}
*/

function toggleNav() {
    const e = d.querySelector(".header-menu"),
        t = d.querySelectorAll(".details-nav__item");
    if (t)
        for (let a = 0; a < t.length; a++) t[a].addEventListener("mouseover", (function() {
            removeActiveClass(t), this.classList.add("active"); 
            let position = this.getBoundingClientRect(); 
            if(a === t.length - 1 || a === t.length - 2){
                e.style.left = 'unset'
              e.style.right = document.documentElement.clientWidth - position.right  + 'px'
            }else {e.style.left = position.left + 'px'} slideNav(this), closeNavOnMouseOut(t[a]), closeNavOnLinkClick(e)
        }))
}


function setTitleAttr(e, t) {
    if (e)
        for (let a = 0; a < e.length; a++) e[a].textContent.length > t && e[a].setAttribute("title", e[a].textContent)
}

function languageSelect() {
    const e = d.querySelector(".burger-menu__languages .lang-btn.current");
    e && e.addEventListener("click", (function() {
        this.classList.toggle("active"), this.nextElementSibling.classList.toggle("active")
    }))
}

function addActiveClass(e) {
    e.classList.add("active")
}

function toggleMobileNav() {
    const e = d.querySelectorAll(".details-nav__item"),
        t = d.querySelectorAll(".burger-menu__extra-nav");
    if (e)
        if (window.innerWidth >= 1025) removeID(t);
        else {
            removeID(e);
            for (let e = 0; e < t.length; e++) t[e].addEventListener("click", (function() {
                slideNav(this)
            }));
            // setExtraMenuHeight(),
            closeExtraMenu()
        }
}

function closeExtraMenu() {
    const e = d.querySelector(".header-menu");
    if (e) {
        e.addEventListener("click", (function(t) {
            !1 === t.target.classList.contains("header-menu__inner") && e.classList.remove("active")
        }));
        const t = d.querySelectorAll(".header-menu__inner"),
            a = d.querySelector(".header-menu__close");
        for (let n = 0; n < t; n++) {
            t[n].querySelector(".back-btn").addEventListener("click", (function() {
                e.classList.remove("active")
            })), a.addEventListener("click", (function() {
                e.classList.remove("active")
            }))
        }
    }
}

// function setExtraMenuHeight() {
//     const e = d.querySelector(".burger-menu__nav-list"),
//         t = d.querySelectorAll(".header-menu__inner");
//     if (e)
//         for (let a = 0; a < t.length; a++) t[a].style.height = `${e.offsetHeight}px`
// }

function sideMenu() {
    const e = d.querySelector(".burger-menu"),
        t = d.querySelector(".burger-btn");
    t && t.addEventListener("click", (function(t) {
        e.classList.toggle("opened"), document.body.classList.toggle("no-scroll"), this.classList.toggle("active")
    }))
}

function removeID(e) {
    for (let t = 0; t < e.length; t++) e[t].removeAttribute("id")
}

function removeActiveClass(e) {
    for (let t = 0; t < e.length; t++) e[t].classList.remove("active")
}

function slideNav(e) {
    const t = d.querySelector(".header-menu"),
        a = d.querySelectorAll(".header-menu__inner");
    if (t) {
        t.classList.add("active"), setHeaderTopPos(t);
        for (let t = 0; t < a.length; t++) a[t].dataset.id === e.id && (removeActiveClass(a), a[t].classList.add("active"))
    }
}

function closeNavOnMouseOut(e) {
    const t = d.querySelector(".header-menu"),
        a = d.querySelector(".header__inner"),
        n = d.querySelector(".header__info"),
        o = d.querySelector(".details__inner"),
        i = d.querySelector(".nav-container");
    t && t.classList.contains("active") && (t.addEventListener("mouseleave", (function(t) {
        t.relatedTarget && (t.relatedTarget.classList.contains("details-nav__item") || t.relatedTarget.classList.contains("details-nav") || t.relatedTarget.classList.contains("details__inner") || (this.classList.remove("active"), this.style.top = "-100%", e.classList.remove("active")))
    })), window.addEventListener("scroll", (function() {
        t.classList.remove("active"), t.style.top = "-100%", e.classList.remove("active")
    })), e.addEventListener("mouseleave", (function(e) {
        e.relatedTarget !== a && e.relatedTarget !== n && e.relatedTarget !== o && e.relatedTarget !== i || (t.classList.remove("active"), t.style.top = "-100%", this.classList.remove("active"))
    })))
}

function closeNavOnLinkClick(e) {
    const t = d.querySelectorAll(".slide-menu__list-link");
    if (t)
        for (let a = 0; a < t.length; a++) t[a].addEventListener("click", (function() {
            e.classList.remove("active")
        }))
}

function clearSearchInputOnBlur() {
    const e = d.querySelectorAll('input[type="search"]');
    if (e)
        for (let t = 0; t < e.length; t++) e[t].addEventListener("blur", (function() {
            this.value = ""
        }))
}

function toggleSearchVisibilty() {
    const e = d.querySelector(".global-search.desktop"),
        t = d.querySelector(".search-btn"),
        a = d.querySelector(".mob-nav__search-btn"),
        n = d.querySelector(".global-search__close");
    d.querySelector(".details"), d.querySelector(".header");
    e && (t.addEventListener("click", (function() {
        e.classList.toggle("visible")
    })), a.addEventListener("click", (function() {
        e.classList.toggle("visible")
    })), n.addEventListener("click", (function() {
        e.classList.toggle("visible")
    })), window.addEventListener("scroll", (function() {
        e.classList.contains("visible") && e.classList.toggle("visible")
    })))
}

function changeSearchID() {
    const e = d.querySelector(".global-search.desktop form"),
        t = d.querySelector(".global-search.desktop label"),
        a = d.querySelector(".global-search.mob form"),
        n = d.querySelector(".global-search.desktop input"),
        o = d.querySelector(".global-search.mob input"),
        i = d.querySelector(".global-search.mob label");
    e && (window.innerWidth >= 601 ? (i.removeAttribute("for"), a.removeAttribute("id"), o.removeAttribute("id")) : (t.removeAttribute("for"), e.removeAttribute("id"), n.removeAttribute("id")))
}

function clearInput() {
    const e = d.querySelectorAll(".search-inputs input"),
        t = d.querySelectorAll(".clear-btn");
    if (e)
        for (let a = 0; a < t.length; a++) t[a].addEventListener("click", (function(t) {
            t.preventDefault();
            for (let t = 0; t < e.length; t++) e[t].value = ""
        }))
}

function sortForm(e, t) {
    if (t) {
        t.addEventListener("click", (function() {
            e.classList.contains("active") || e.classList.add("opened")
        }));
        const a = e.querySelectorAll("li"),
            n = t.querySelector("input");
        for (let t = 0; t < a.length; t++) a[t].addEventListener("click", (function() {
            const o = a[t].textContent;
            n.value = o, e.classList.remove("opened")
        }))
    }
}

function bestGraduateSorting() {
    sortForm(d.querySelector(".sort-form__list"), d.getElementById("facultySearchLabel"))
}

function accordion() {
    const e = d.querySelectorAll(".accordion__content"),
        t = d.querySelectorAll(".mapEl"),
        a = "#941914";
    if (e)
        for (let n = 0; n < e.length; n++) e[0].style.maxHeight = e[0].scrollHeight + "px", d.getElementById("mapRu").style.fill = a, e[n].addEventListener("click", (function() {
            for (let t = 0; t < e.length; t++) e[t].classList.remove("active"), e[t].style.maxHeight && (e[t].style.maxHeight = null);
            for (let e = 0; e < t.length; e++) t[e].style.fill = "rgba(151, 140, 140, 0.3)";
            switch (this.classList.toggle("active"), this.style.maxHeight ? this.style.maxHeight = null : this.style.maxHeight = this.scrollHeight + "px", this.id) {
                case "rus":
                    d.getElementById("mapRu").style.fill = a;
                    break;
                case "est":
                    d.getElementById("mapEs").style.fill = a;
                    break;
                case "lat":
                    d.getElementById("mapLV").style.fill = a;
                    break;
                case "ger":
                    d.getElementById("mapGe").style.fill = a;
                    break;
                case "bel":
                    d.getElementById("mapBy").style.fill = a
            }
        }))
}

function togglePagination() {
    const e = d.querySelectorAll(".pagination__list li");
    if (e) {
        stopLinks();
        for (let t = 0; t < e.length; t++) e[t].addEventListener("click", (function() {
            "more" !== this.dataset.page && (removeActiveClass(e), this.classList.add("active"))
        }))
    }
}

function stopLinks() {
    const e = d.querySelectorAll(".pagination__list li a");
    if (e)
        for (let t = 0; t < e.length; t++) e[t].addEventListener("click", (function(e) {
            e.preventDefault()
        }))
}

function toggleCheckboxes() {
    const e = d.querySelectorAll(".sort__chkbx");
    if (e)
        for (let t = 0; t < e.length; t++) e[t].addEventListener("click", (function() {
            removeActiveClass(e), this.classList.add("active")
        }))
}

function getParLength(e) {
    for (let t = 0; t < e.length; t++) {
        e[t].textContent.length > 68 && e[t].classList.add("long")
    }
}
languageSelect(), sideMenu(), toggleNav(), clearSearchInputOnBlur(), toggleSearchVisibilty(), changeSearchID(), clearInput(), bestGraduateSorting(), $(document).ready((function() {
        const e = $("html, body");

        function t(e, t) {
            e.on("init reInit", (function(e, a) {
                let n = a.slideCount;
                if(n === null) return;
                t.attr("max", n)
            })), e.on("afterChange", (function(e, a, n) {
                t.val(n + 1)
            })), e.slick({
                slidesToShow: 1,
                centerMode: !0,
                arrows: !0,
                infinite: !0,
                dots: !1,
                swipeToSlide: true,
                prevArrow: "<img src='bitrix/templates/bsu_2021/img/graduate-stud/slide-arrow-prev.png' class='prev' alt='Предыдущий'>",
                nextArrow: "<img src='bitrix/templates/bsu_2021/img/graduate-stud/slide-arrow-next.png' class='next' alt='Следующий'>"
            })
        }

        function a(e) {
            e.slick({
                responsive: [{
                    breakpoint: 5e3,
                    settings: "unslick"
                }, {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 1,
                        centerMode: !0,
                        arrows: !1,
                        infinite: !0,
                        dots: !0,
                        variableWidth: !0
                    }
                }]
            }), window.addEventListener("resize", (function() {
                window.innerWidth < 1025 && e.slick("refresh")
            }))
        }

        function n(e) {
            e.slick({
                responsive: [{
                    breakpoint: 5e3,
                    settings: "unslick"
                }, {
                    breakpoint: 601,
                    settings: {
                        slidesToShow: 1,
                        centerMode: !0,
                        arrows: !1,
                        infinite: !0,
                        dots: !0,
                        variableWidth: !0
                    }
                }]
            }), window.addEventListener("resize", (function() {
                window.innerWidth < 601 && e.slick("refresh")
            }))
        }

        function o(e) {
            e.slick({
                responsive: [{
                    breakpoint: 5e3,
                    settings: "unslick"
                }, {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 2,
                        centerMode: !1,
                        arrows: !1,
                        infinite: !0,
                        dots: !0,
                        variableWidth: !0
                    }
                }, {
                    breakpoint: 600,
                    settings: "unslick"
                }]
            }), window.addEventListener("resize", (function() {
                window.innerWidth < 1025 && e.slick("refresh")
            }))
        }
        var i;
        $('a[href*="#"]').click((function() {
            return e.animate({
                scrollTop: $($.attr(this, "href")).offset().top
            }, 400), !1
        })), $(".main-slider").slick({
            prevArrow: "<img src='bitrix/templates/bsu_2021/img/mainPage/main-slider/main-slider-prev-arrow.png' class='prev' alt='Предыдущий'>",
            nextArrow: "<img src='bitrix/templates/bsu_2021/img/mainPage/main-slider/main-slider-next-arrow.png' class='next' alt='Следующий'>",
            dots: !0,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    arrows: !1
                }
            }]
		        }), $(window).width() > 768 && (t($("#schoolsSlider"), $("#schoolsRangeBar")), t($("#sportsSlider"), $("#sportsRangeBar")), t($("#culturesSlider"), $("#culturesRangeBar")), t($("#creativeSlider"), $("#creativeRangeBar")), t($("#selfgovSlider"), $("#selfgovRangeBar"))), a($(".news-slider")), a($("#podcasts-slider")), a($(".news-mob-slider")), a($("#congrats-slider")), n($("#feature-slider")), n($("#sportsSlider")), n($("#culturesSlider")), n($("#creativeSlider")), n($("#selfgovSlider")), n($(".news-elem__content")), n($(".video-block__content")), n($(".grants__content")), n($(".culture__content")), n($("#coopFeatureSlider")), n($("#assocSlider")), n($(".books__content")), (i = $("#blog-slider")).slick({
            responsive: [{
                breakpoint: 5e3,
                settings: "unslick"
            }, {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 1,
                    centerMode: !1,
                    arrows: !1,
                    infinite: !0,
                    dots: !0,
                    variableWidth: !0
                }
            }]
        }), window.addEventListener("resize", (function() {
            window.innerWidth < 1025 && i.slick("refresh")
        })), window.innerWidth > 1280 && (setTitleAttr(d.querySelectorAll(".news__description"), 100), setTitleAttr(d.querySelectorAll(".news-card__desc"), 100), setTitleAttr(d.querySelectorAll(".book__descr"), 56)), toggleMobileNav(), changeSearchID(), $(window).width() < 1025 && $(".news-slider").slick("slickRemove", 6), $(window).width() < 769 && (a($("#schoolsSlider")), o($("#sportsSlider")), o($("#culturesSlider")), o($("#creativeSlider")), o($("#selfgovSlider"))), $(window).width() < 534 && a($(".gallery-block__content")), window.addEventListener("resize", (function() {
            window.innerWidth > 1280 && (setTitleAttr(d.querySelectorAll(".news__description"), 100), setTitleAttr(d.querySelectorAll(".news-card__desc"), 100), setTitleAttr(d.querySelectorAll(".book__descr"), 56)), toggleMobileNav(), changeSearchID(), window.innerWidth < 1025 && $("#congrats-slider").slick({
                slidesToShow: 1,
                centerMode: !0,
                arrows: !1,
                infinite: !0,
                dots: !0,
                variableWidth: !0
            }), $(window).width() < 1025 && $(".news-slider").slick("slickRemove", 6), $(window).width() < 769 && (a($("#schoolsSlider")), o($("#sportsSlider")), o($("#culturesSlider")), o($("#creativeSlider")), o($("#selfgovSlider"))), $(window).width() <= 601 && (a($("#feature-slider")), a($("#sportsSlider"), $("#sportsRangeBar")), a($("#creativeSlider")), a($("#culturesSlider"), $("#culturesRangeBar")), a($("#selfgovSlider")), a($(".news-elem__content")), a($(".video-block__content")), a($(".grants__content")), a($(".culture__content")), a($("#coopFeatureSlider")), a($("#assocSlider")), a($(".books__content"))), $(window).width() < 534 && a($(".gallery-block__content"))
        }))
    })), accordion(),
    function() {
        var lang = {
                en: {
                    x: "Close",
                    nex: "Next month",
                    pre: "Previous month",
                    clear: "Clear",
                    m: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
                    mo: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    w: "Mo</td><td>Tu</td><td>We</td><td>Th</td><td>Fr</td><td>Sa</td><td>Su"
                },
                ru: {
                    x: "Закрыть",
                    nex: "Следующий месяц",
                    pre: "Предыдущий месяц",
                    clear: "Очистить",
                    m: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
                    mo: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                    w: "Пн</td><td>Вт</td><td>Ср</td><td>Чт</td><td>Пт</td><td>Сб</td><td>Вс"
                }
            },
            def = {
                lang: "ru",
                id: "",
                class: "xcalend",
                delim: ".",
                order: 0,
                o: {
                    value: ""
                },
                year: -1,
                month: -1,
                dat: -1,
                day: -1,
                dop: "",
                autoOn: 1,
                autoOff: 1,
                now: 1,
                set0: 0,
                x: 1,
                hide: 1,
                to: "",
                fn: ""
            };

        function iss(e) {
            return null != e
        }

        function Nod(e) {
            return "string" == typeof e && (e = document.getElementById(e)), e
        }

        function Del(e) {
            (e = Nod(e)) && ("function" == typeof e.remove ? e.remove() : e.parentNode.removeChild(e))
        }

        function HTM(e, t, a) {
            iss(a) || (a = "beforeend"), Nod(e).insertAdjacentHTML(a, t)
        }

        function Eve(e, t, a) {
            e.addEventListener ? e.addEventListener(t, a, !1) : e.attachEvent ? e.attachEvent("on" + t, a) : e["on" + t] = a
        }

        function scrol(e) {
            var t = {
                X: "scrollLeft",
                Y: "scrollTop"
            };
            return void 0 !== e && e in t || (e = "Y"), window["page" + e + "Offset"] || document.documentElement[t[e]] || document.body[t[e]]
        }
        window.xCal = function(ob, delim, order) {
            var a = {};
            for (var key in def) a[key] = def[key];
            if ("object" == typeof delim)
                for (var key in delim) a[key] = delim[key];
            else iss(delim) && (a.delim = delim), iss(order) && (a.order = order);
            if ("" === a.id && (a.id = a.class), "object" != typeof ob) {
                if ((void 0 === ob || 0 == ob || 1 == ob) && Nod(a.id)) return 1 == a.hide && ("string" != typeof delim ? Nod(a.id).style.display = "none" : Nod(delim).style.display = "none"), !1;
                if (2 == ob || "now" === ob) {
                    var D = new Date,
                        d = D.getDate(),
                        m = D.getMonth() + 1,
                        y = D.getFullYear();
                    return d < 10 && (d = "0" + d), m < 10 && (m = "0" + m), 1 == a.order ? y + a.delim + m + a.delim + d : 2 == a.order ? m + a.delim + d + a.delim + y : d + a.delim + m + a.delim + y
                }
            }
            if (a.o = Nod(ob), a.f = function() {
                    var m = a.month + 1,
                        d = a.dat,
                        y = a.year;
                    a.sdat = a.dat, a.smonth = a.month, a.syear = a.year, 1 == a.order ? (d = y, y = a.dat) : 2 == a.order && (d = m, m = a.dat), y < 10 && (y = "0" + y), m < 10 && (m = "0" + m), d < 10 && (d = "0" + d), d += a.delim + m + a.delim + y, "" !== a.dop && (d += " " + a.dop), a.o && (a.o.value = xCal.value = d), 1 == a.hide && (Nod(a.id).style.display = "none"), "function" == typeof a.fn ? a.fn(d, a) : "string" == typeof a.fn && "" !== a.fn && eval(a.fn + "('" + d + "');")
                }, void 0 === a.o) return !1;
            a = xCal.gVal(a), a = xCal.gDat(a), Nod(a.id) ? Nod(a.id).style.display = "" : ("" == a.to ? a.to = document.body : a.to = Nod(a.to), HTM(a.to, '<table id="' + a.id + '" class="' + a.class + '"><thead></thead><tbody></tbody><tfoot></tfoot></table>'));
            var oo = a.o.getBoundingClientRect();
            return Nod(a.id).style.left = oo.left + scrol("X") + "px", Nod(a.id).style.top = oo.bottom + scrol() + "px", xCal.fM = function(e) {
                var t = e.month,
                    a = "",
                    n = 1,
                    o = lang[e.lang].m;
                a += '<td colspan=2 title="12"', 11 == t ? a += ' class="today"' : 11 == e.tmonth && (a += ' class="tday"'), a += ">" + lang[e.lang].m[11] + "</td>";
                for (var i = 0; i < o.length - 1; i++) n++, a += '<td colspan=2 title="' + (i + 1) + '"', t == i ? a += ' class="today"' : e.tmonth == i && (a += ' class="tday"'), a += ">" + o[i] + "</td>", n > 2 && (a += "</tr><tr>", n = 0);
                Del(document.querySelector("#" + e.id + " tbody")), HTM(e.id, "<tbody><tr><th rowspan=4 valign=bottom></th>" + a + "</tr></tbody>");
                var l = document.querySelectorAll("#" + e.id + " tbody td");
                for (i = 0; i < l.length; i++) l[i].onclick = function() {
                    var t = this.title;
                    "" != t && (e.month = parseInt(t) - 1, xCal.f(e))
                }
            }, xCal.fY = function(e) {
                for (var t = e.year, a = "", n = 0, o = -8; o < 7; o++) n++, a += "<td colspan=2", t == t + o ? a += ' class="today"' : e.tyear == t + o && (a += ' class="tday"'), a += ">" + (t + o) + "</td>", n > 2 && (a += "</tr><tr>", n = 0);
                Del(document.querySelector("#" + e.id + " tbody")), HTM(e.id, "<tbody><tr><th rowspan=5 valign=bottom></th>" + a + "</tr></tbody>");
                var i = document.querySelectorAll("#" + e.id + " tbody td");
                for (o = 0; o < i.length; o++) i[o].onclick = function() {
                    var t = this.innerHTML;
                    "" != t && "&nbsp;" != t && (e.year = parseInt(t), xCal.f(e))
                }
            }, xCal.f = function(a) {
                Del(document.querySelector("#" + a.id + " thead")), Del(document.querySelector("#" + a.id + " tbody")), Del(document.querySelector("#" + a.id + " tfoot"));
                var mm, y = a.year,
                    m = a.month,
                    dat = a.dat,
                    Dlast = new Date(y, m + 1, 0).getDate(),
                    DNlast = new Date(y, m, Dlast).getDay(),
                    DNfirst = new Date(y, m, 1).getDay(),
                    ca = "",
                    j = 0,
                    months = lang[a.lang].mo;
                j = 0 != DNfirst ? DNfirst - 1 : 6, HTM(a.id, '<thead><tr><td class="cal-l" title="' + lang[a.lang].pre + '"><</td><td colspan=3 class="cal-m"></td><td colspan=2 class="cal-y"></td><td class="cal-r" title="' + lang[a.lang].nex + '"> > </td></tr><tr><td>' + lang[a.lang].w + "</td></tr></thead>"), j > 0 && (mm = 0 == m ? 11 : m - 1, ca += j > 1 ? "<td colspan=" + j + ' class="cal-l" align=left title="' + lang[a.lang].pre + " " + lang[a.lang].mo[mm] + '"><b>' + lang[a.lang].m[mm] + "</b></td>" : '<td class="cal-l" title="' + lang[a.lang].pre + " " + lang[a.lang].mo[mm] + '"><b></b></td>');
                for (var i = 1; i <= Dlast; i++) j++, ca += "<td", i == dat ? m == a.smonth && y == a.syear ? ca += ' class="today"' : ca += ' class="tday"' : i == a.tdat && m == a.tmonth && y == a.tyear && (ca += ' class="tday"'), ca += ">" + i + "</td>", j > 6 && (ca += "</tr><tr>", j = 0);
                DNlast > 0 && (mm = m > 10 ? 0 : m + 1, ca += DNlast < 6 ? "<td colspan=" + (7 - DNlast) + ' class="cal-r" align=right title="' + lang[a.lang].nex + " " + lang[a.lang].mo[mm] + '"><b>' + lang[a.lang].m[mm] + "</b></td>" : '<td class="cal-r" title="' + lang[a.lang].nex + " " + lang[a.lang].mo[mm] + '"><b> </b></td>'), HTM(a.id, '<tbody><tr class="cal-first">' + ca + "</tr></tbody>"), ca = "";
                var k, kk = [3, 3, 1];
                a.now || (kk[0] = 0), a.set0 || (kk[1] = 0), a.x || (kk[2] = 0), a.now && (k = kk[0] + kk[1] + kk[2], k < 7 && (kk[0] += 7 - k), ca += "<td colspan=" + kk[0] + ' class="cal-nw"></td>'), a.set0 && (k = kk[0] + kk[1] + kk[2], k < 7 && (kk[1] += 7 - k), ca += "<td colspan=" + kk[1] + ' class="cal-s0">' + lang[a.lang].clear + "</td>"), a.x && (k = kk[0] + kk[1] + kk[2], k < 7 && (kk[2] += 7 - k), ca += "<td colspan=" + kk[2] + " onClick=\"document.getElementById('" + a.id + "').style.display='none'\" title=\"" + lang[a.lang].x + '" class="bold">' + (kk[2] > 2 ? lang[a.lang].x : "&#215;") + "</td>"), HTM(a.id, "<tfoot><tr>" + ca + "</tr></tfoot>"), document.querySelector("#" + a.id + " thead td.cal-m").innerHTML = months[m], document.querySelector("#" + a.id + " thead td.cal-y").innerHTML = y, document.querySelector("#" + a.id + " thead td.cal-l").onclick = function() {
                    xCal.mmm(a)
                }, document.querySelector("#" + a.id + " thead td.cal-r").onclick = function() {
                    xCal.mpp(a)
                }, document.querySelector("#" + a.id + " thead td.cal-m").onclick = function() {
                    xCal.fM(a)
                }, document.querySelector("#" + a.id + " thead td.cal-y").onclick = function() {
                    xCal.fY(a)
                }, k = document.querySelector("#" + a.id + " tfoot td.cal-nw"), k && (k.innerHTML = xCal(2, a), k.onclick = function() {
                    var dop = "";
                    if (a = xCal.gDop(a), "" != a.dop && (dop = " " + a.dop), a.o && (a.o.value = xCal.value = this.innerHTML + dop), 1 == a.hide) document.getElementById(a.id).style.display = "none";
                    else {
                        for (var o = document.querySelectorAll("#" + a.id + " .today"), j = 0; j < o.length; j++) o[j].className = "";
                        a = xCal.gDat(a);
                        var D = new Date;
                        a.year = D.getFullYear(), a.month = D.getMonth(), a.dat = D.getDate()
                    }
                    a.sdat = a.dat, a.smonth = a.month, a.syear = a.year, "function" == typeof a.fn ? a.fn(this.innerHTML, a) : "string" == typeof a.fn && "" !== a.fn && eval(a.fn + "('" + this.innerHTML + "');"), 1 != a.hide && xCal.f(a)
                }), k = document.querySelector("#" + a.id + " tfoot td.cal-s0"), k && (k.onclick = function() {
                    var e = "00" + a.delim + "00" + a.delim + "00";
                    1 == a.order ? e = "00" + e : e += "00", a.o && (a.o.value = xCal.value = e), a.sdat = a.dat, a.smonth = a.month, a.syear = a.year, 1 == a.hide && (document.getElementById(a.id).style.display = "none")
                }), a.autoOff && (Nod(a.id).onmouseleave = function() {
                    xCal()
                });
                for (var k = document.querySelectorAll("#" + a.id + " tbody td"), i = 0; i < k.length; i++) k[i].onclick = function() {
                    var e = this.innerHTML;
                    if ("" != e && "&nbsp;" != e) {
                        if (1 != a.hide) {
                            for (var t = document.querySelectorAll("#" + a.id + " .today"), n = 0; n < t.length; n++) t[n].className = "";
                            this.className = "today"
                        }(a = xCal.gDop(a)).dat = e, "function" == typeof a.f && a.f(a.id)
                    }
                };
                var r = document.querySelector("#" + a.id + " tbody td.cal-l");
                null != r && (r.onclick = function() {
                    xCal.mmm(a)
                }), r = document.querySelector("#" + a.id + " tbody td.cal-r"), null != r && (r.onclick = function() {
                    xCal.mpp(a)
                })
            }, xCal.f(a), !1
        }, xCal.mmm = function(e) {
            e.month -= 1, e.month < 0 && (e.month = 11, e.year--), xCal.f(e)
        }, xCal.mpp = function(e) {
            e.month += 1, e.month > 11 && (e.month = 0, e.year++), xCal.f(e)
        }, xCal.gDop = function(e) {
            if (void 0 === e.o && (e.o = {
                    value: ""
                }), void 0 === e.o.value || "" === e.o.value) return e;
            var t = e.o.value.split(" ");
            return iss(t[1]) ? e.dop = t[1] : e.dop = "", e
        }, xCal.gVal = function(e) {
            if (void 0 === e.o && (e.o = {
                    value: ""
                }), void 0 === e.o.value || "" === e.o.value) return e;
            var t = e.o.value.split(" ");
            iss(t[1]) ? e.dop = t[1] : e.dop = "", t = t[0].split(e.delim);
            for (var a = 0; a < 3; a++) iss(t[a]) || (t[a] = -1);
            return 2 == e.order ? (t[3] = t[1], t[1] = t[0], t[0] = t[3], t[1] = parseInt(t[1]) - 1) : (1 == e.order && (t[3] = t[2], t[2] = t[0], t[0] = t[3]), t[1] = parseInt(t[1]) - 1), e.syear = e.year = parseInt(t[2]), e.smonth = e.month = t[1], e.sdat = e.dat = parseInt(t[0]), e
        }, xCal.gDat = function(e) {
            var t = new Date;
            return e.tyear = t.getFullYear(), e.tmonth = t.getMonth(), e.tdat = t.getDate(), e.tday = t.getDay(), e.month > -1 && (e.year < 0 && (e.year = t.getFullYear()), e.dat > 0 ? t.setFullYear(e.year, e.month, e.dat) : t.setFullYear(e.year, e.month)), e.year = t.getFullYear(), e.month = t.getMonth(), e.dat = t.getDate(), e.day = t.getDay(), e.sdat = e.dat, e.smonth = e.month, e.syear = e.year, e
        }, xCal.set = function(e) {
            for (var t in e) def[t] = e[t]
        }, xCal.all = function(e, t, a) {
            var n;
            if (void 0 !== e && "" != e && !((n = document.getElementsByClassName ? document.getElementsByClassName(e) : document.querySelectorAll("." + e)).length < 1))
                for (var o = 0; o < n.length; o++) {
                    var i = n[o];
                    Eve(i, "input", (function() {
                        xCal()
                    })), Eve(i, "keyup", (function() {
                        xCal()
                    })), Eve(i, "click", (function() {
                        xCal(this, t, a)
                    })), "object" == typeof t ? "autoOn" in t && t.autoOn && Eve(i, "mouseenter", (function() {
                        xCal(this, t, a)
                    })) : def.autoOn && Eve(i, "mouseenter", (function() {
                        xCal(this, t, a)
                    }))
                }
        }
    }(), togglePagination(), toggleCheckboxes();
const paragraph = d.querySelectorAll(".project__title");

function toggleMenuCat(e, t) {
    for (let t = 0; t < e.length; t++) e[t].addEventListener("click", (function() {
        removeActiveClass(e), this.classList.add("active")
    }))
}

function reInitSlider(e) {
    for (let t = 0; t < e.length; t++) e[t].addEventListener("click", (function() {
        removeActiveClass(e), window.innerWidth < 1024 && ($(".news-slider").slick("refresh"), $(".news-slider").slick("slickRemove", 6)), this.classList.add("active")
    }))
}

function toggleNewsCat() {
    const e = d.querySelectorAll("#news .section-nav__item"),
        t = d.querySelectorAll("#ann .section-nav__item");
    e && (toggleMenuCat(e), reInitSlider(e)), t && toggleMenuCat(t)
}

function ifHiddenSidebar() {
    const e = d.querySelector(".sections-wrap"),
        t = d.querySelector(".side-news"),
        a = d.querySelector(".ann-content"),
        n = d.querySelector(".congrats");
    e && (window.innerWidth > 1025 ? (console.log("yes"), t || e.classList.add("only")) : e.classList.remove("only"), n || a.classList.add("only"))
}
paragraph && getParLength(paragraph), $(document).ready((function() {
    $("#mobileSort").slick({
        dots: !1,
        arrows: !1,
        responsive: [{
            breakpoint: 5e3,
            settings: "unslick"
        }, {
            breakpoint: 601,
            settings: {
                slidesToShow: 1,
                arrows: !1,
                infinite: !1,
                dots: !1,
                variableWidth: !0
            }
        }]
    })
})), $(document).ready((function() {
    $(".info-block__slider").slick({
        prevArrow: "<img src='bitrix/templates/bsu_2021/img/mainPage/main-slider/main-slider-prev-arrow.png' class='prev' alt='Предыдущий'>",
        nextArrow: "<img src='bitrix/templates/bsu_2021/img/mainPage/main-slider/main-slider-next-arrow.png' class='next' alt='Следующий'>",
        dots: !1,
        fade: !0
    }), $(".typo-page__slider").slick({
        prevArrow: "<img src='bitrix/templates/bsu_2021/img/mainPage/main-slider/main-slider-prev-arrow.png' class='prev' alt='Предыдущий'>",
        nextArrow: "<img src='bitrix/templates/bsu_2021/img/mainPage/main-slider/main-slider-next-arrow.png' class='next' alt='Следующий'>",
        dots: !0,
        fade: !0,
        responsive: [{
            breakpoint: 1025,
            settings: {
                arrows: !1
            }
        }]
    }), $(".typo-page__img a").magnificPopup({
        type: "image",
        fixedContentPos: !0,
        mainClass: "mfp-fade"
    }), $(".typo-page__video a").magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: !1,
        fixedContentPos: !0
    })
})), window.addEventListener("resize", (function() {
    $(".typo-page__slider").slick("refresh"), $(".info-block__slider").slick("refresh")
})), toggleNewsCat(), ifHiddenSidebar(), window.addEventListener("resize", ifHiddenSidebar);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:54:"/bitrix/templates/bsu_2021/js/script.js?16566867372448";s:6:"source";s:39:"/bitrix/templates/bsu_2021/js/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
$(document).on('click','.year4sel',function(){
//	console.log('year click');
	var list=$('.blog_year_list');
	var list2=$('.blog_months_list');
	list2.removeClass('active');

	if(list.hasClass('active')){
		list.removeClass('active');
	}else{
		list.addClass('active');
	}
});

$(document).on('click','.mounth4sel',function(){
//	console.log('manth click');
	var list=$('.blog_months_list');
	var list2=$('.blog_year_list');
	list2.removeClass('active');

	if(list.hasClass('active')){
		list.removeClass('active');
	}else{
		list.addClass('active');
	}
});



$(document).on('click','.section-nav__item',function(){
	$(this)
/*			.addClass('active').siblings().removeClass('active')*/
		.parents('.tabs_block').find('.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
/*		console.log($(this).parents('.tabs_block'));*/
	
});



// Start my modal script
function prepareModal(modal_id) {
	$(modal_id).prepend('<div class="top"><a class="close"/> </a></div>'); // Добавляем в блок кнопку закрытия
	$(modal_id).insertBefore('#mask'); // переносим блок в футер	
}

function openModal(modal_id) {
	var maskHeight = $(document).height();
	var maskWidth = $(window).width();

	$('#mask').css({'width':maskWidth,'height':maskHeight});
	$('#mask').fadeTo("medium",0.8); 
	$('#mask').fadeIn(1);
	centrModal(modal_id);
	$(modal_id).fadeIn(200); 
	$(modal_id).css("display", "block");
	$(modal_id).css("width", $(modal_id).width());

}
$(document).on('click','.modal_window .top .close',function(){
	$('.modal_window').fadeOut(200);
	$('#mask').fadeOut(200);
}); 

$(document).on('click','#mask',function(){
//$('#mask').click(function () {
	$(this).hide();
	$('.modal_window').hide();
});  
function centrModal(modalId){
	console.log(modalId);
	var winH = $(window).height();
	var winW = $(window).width();
	$(modalId).css('top',  winH/2-$(modalId).height()/2);
	$(modalId).css('left', winW/2-$(modalId).width()/2);				
}


$(document).ready(function(){

// Скрипт моих модальных окон
	$('.modal_window').each(function(i){
//		prepareModal($(this).getAttribute('id'));
		prepareModal('#'+$(this).attr('id'));
	});
	$('.open_modal').click(function(e) {
			e.preventDefault();
			var mw_id = '#'+$(this).data('modalid');
			openModal(mw_id);
	//		console.log('to: '+mw_id);
	});
// Конец скрипта модальных окон
});
// End my Modal Script
/* End */
;
; /* Start:"a:4:{s:4:"full";s:44:"/js/bukvus-universal/bukvus.js?1385451780366";s:6:"source";s:30:"/js/bukvus-universal/bukvus.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
if(!window.jQuery) { 
document.write(unescape("%3Cscript src='/js/bukvus-universal/jquery.js' type='text/javascript'%3E%3C/script%3E")); 
}
document.write(unescape("%3Cscript src='/js/bukvus-universal/core.js' type='text/javascript'%3E%3C/script%3E")); 
document.write(unescape("%3Clink rel='stylesheet' href='../../js/bukvus-universal/bukvus.css' type='text/css'%3E")); 
/* End */
;; /* /bitrix/templates/bsu_2021/js/libs.js?1641821390242060*/
; /* /bitrix/templates/bsu_2021/js/main.js?164517263835496*/
; /* /bitrix/templates/bsu_2021/js/script.js?16566867372448*/
; /* /js/bukvus-universal/bukvus.js?1385451780366*/
