(function(e, r, t) {
    "use strict";
    function n(e, t, n) {
        return {
            restrict: "ECA",
            terminal: !0,
            priority: 400,
            transclude: "element",
            link: function(a, o, i, c, l) {
                function u() {
                    f && (f.remove(), f = null);
                    p && (p.$destroy(), p = null);
                    h && (n.leave(h, function() {
                        f = null;
                    }), f = h, h = null);
                }
                function s() {
                    var i = e.current && e.current.locals;
                    if (r.isDefined(i && i.$template)) {
                        var i = a.$new(), c = e.current;
                        h = l(i, function(e) {
                            n.enter(e, null, h || o, function() {
                                !r.isDefined(d) || d && !a.$eval(d) || t();
                            });
                            u();
                        });
                        p = c.scope = i;
                        p.$emit("$viewContentLoaded");
                        p.$eval(m);
                    } else u();
                }
                var p, h, f, d = i.autoscroll, m = i.onload || "";
                a.$on("$routeChangeSuccess", s);
                s();
            }
        };
    }
    function a(e, r, t) {
        return {
            restrict: "ECA",
            priority: -400,
            link: function(n, a) {
                var o = t.current, i = o.locals;
                a.html(i.$template);
                var c = e(a.contents());
                o.controller && (i.$scope = n, i = r(o.controller, i), o.controllerAs && (n[o.controllerAs] = i), 
                a.data("$ngControllerController", i), a.children().data("$ngControllerController", i));
                c(n);
            }
        };
    }
    e = r.module("ngRoute", [ "ng" ]).provider("$route", function() {
        function e(e, t) {
            return r.extend(new (r.extend(function() {}, {
                prototype: e
            }))(), t);
        }
        function t(e, r) {
            var t = r.caseInsensitiveMatch, n = {
                originalPath: e,
                regexp: e
            }, a = n.keys = [];
            e = e.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?\*])?/g, function(e, r, t, n) {
                e = "?" === n ? n : null;
                n = "*" === n ? n : null;
                a.push({
                    name: t,
                    optional: !!e
                });
                r = r || "";
                return "" + (e ? "" : r) + "(?:" + (e ? r : "") + (n && "(.+?)" || "([^/]+)") + (e || "") + ")" + (e || "");
            }).replace(/([\/$\*])/g, "\\$1");
            n.regexp = RegExp("^" + e + "$", t ? "i" : "");
            return n;
        }
        var n = {};
        this.when = function(e, a) {
            n[e] = r.extend({
                reloadOnSearch: !0
            }, a, e && t(e, a));
            if (e) {
                var o = "/" == e[e.length - 1] ? e.substr(0, e.length - 1) : e + "/";
                n[o] = r.extend({
                    redirectTo: e
                }, t(o, a));
            }
            return this;
        };
        this.otherwise = function(e) {
            this.when(null, e);
            return this;
        };
        this.$get = [ "$rootScope", "$location", "$routeParams", "$q", "$injector", "$http", "$templateCache", "$sce", function(t, a, o, i, c, l, u, s) {
            function p() {
                var e = h(), n = m.current;
                if (e && n && e.$$route === n.$$route && r.equals(e.pathParams, n.pathParams) && !e.reloadOnSearch && !d) n.params = e.params, 
                r.copy(n.params, o), t.$broadcast("$routeUpdate", n); else if (e || n) d = !1, t.$broadcast("$routeChangeStart", e, n), 
                (m.current = e) && e.redirectTo && (r.isString(e.redirectTo) ? a.path(f(e.redirectTo, e.params)).search(e.params).replace() : a.url(e.redirectTo(e.pathParams, a.path(), a.search())).replace()), 
                i.when(e).then(function() {
                    if (e) {
                        var t = r.extend({}, e.resolve), n, a;
                        r.forEach(t, function(e, n) {
                            t[n] = r.isString(e) ? c.get(e) : c.invoke(e);
                        });
                        r.isDefined(n = e.template) ? r.isFunction(n) && (n = n(e.params)) : r.isDefined(a = e.templateUrl) && (r.isFunction(a) && (a = a(e.params)), 
                        a = s.getTrustedResourceUrl(a), r.isDefined(a) && (e.loadedTemplateUrl = a, n = l.get(a, {
                            cache: u
                        }).then(function(e) {
                            return e.data;
                        })));
                        r.isDefined(n) && (t.$template = n);
                        return i.all(t);
                    }
                }).then(function(a) {
                    e == m.current && (e && (e.locals = a, r.copy(e.params, o)), t.$broadcast("$routeChangeSuccess", e, n));
                }, function(r) {
                    e == m.current && t.$broadcast("$routeChangeError", e, n, r);
                });
            }
            function h() {
                var t, o;
                r.forEach(n, function(n, i) {
                    var c;
                    if (c = !o) {
                        var l = a.path();
                        c = n.keys;
                        var u = {};
                        if (n.regexp) if (l = n.regexp.exec(l)) {
                            for (var s = 1, p = l.length; s < p; ++s) {
                                var h = c[s - 1], f = l[s];
                                h && f && (u[h.name] = f);
                            }
                            c = u;
                        } else c = null; else c = null;
                        c = t = c;
                    }
                    c && (o = e(n, {
                        params: r.extend({}, a.search(), t),
                        pathParams: t
                    }), o.$$route = n);
                });
                return o || n[null] && e(n[null], {
                    params: {},
                    pathParams: {}
                });
            }
            function f(e, t) {
                var n = [];
                r.forEach((e || "").split(":"), function(e, r) {
                    if (0 === r) n.push(e); else {
                        var a = e.match(/(\w+)(.*)/), o = a[1];
                        n.push(t[o]);
                        n.push(a[2] || "");
                        delete t[o];
                    }
                });
                return n.join("");
            }
            var d = !1, m = {
                routes: n,
                reload: function() {
                    d = !0;
                    t.$evalAsync(p);
                }
            };
            t.$on("$locationChangeSuccess", p);
            return m;
        } ];
    });
    e.provider("$routeParams", function() {
        this.$get = function() {
            return {};
        };
    });
    e.directive("ngView", n);
    e.directive("ngView", a);
    n.$inject = [ "$route", "$anchorScroll", "$animate" ];
    a.$inject = [ "$compile", "$controller", "$route" ];
})(window, window.angular);