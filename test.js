var _rollbarConfig = {
  accessToken: "sign up get access token",
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: "production"
  }
};

// Rollbar Snippet
! function (r) {
  function o(e) {
    if (n[e]) return n[e].exports;
    var t = n[e] = {
      exports: {},
      id: e,
      loaded: !1
    };
    return r[e].call(t.exports, t, t.exports, o), t.loaded = !0, t.exports
  }
  var n = {};
  return o.m = r, o.c = n, o.p = "", o(0)
}([function (r, o, n) {
  "use strict";
  var e = n(1),
    t = n(4);
  _rollbarConfig = _rollbarConfig || {}, _rollbarConfig.rollbarJsUrl = _rollbarConfig.rollbarJsUrl || "https://cdnjs.cloudflare.com/ajax/libs/rollbar.js/2.1.3/rollbar.min.js", _rollbarConfig.async = void 0 === _rollbarConfig.async || _rollbarConfig.async;
  var l = e.setupShim(window, _rollbarConfig),
    a = t(_rollbarConfig);
  window.rollbar = e.Rollbar, l.loadFull(window, document, !_rollbarConfig.async, _rollbarConfig, a)
}, function (r, o, n) {
  "use strict";

  function e(r) {
    return function () {
      try {
        return r.apply(this, arguments)
      } catch (r) {
        try {
          console.error("[Rollbar]: Internal error", r)
        } catch (r) { }
      }
    }
  }

  function t(r, o) {
    this.options = r, this._rollbarOldOnError = null;
    var n = s++;
    this.shimId = function () {
      return n
    }, window && window._rollbarShims && (window._rollbarShims[n] = {
      handler: o,
      messages: []
    })
  }

  function l(r, o) {
    var n = o.globalAlias || "Rollbar";
    if ("object" == typeof r[n]) return r[n];
    r._rollbarShims = {}, r._rollbarWrappedError = null;
    var t = new d(o);
    return e(function () {
      return o.captureUncaught && (t._rollbarOldOnError = r.onerror, i.captureUncaughtExceptions(r, t, !0), i.wrapGlobals(r, t, !0)), o.captureUnhandledRejections && i.captureUnhandledRejections(r, t, !0), r[n] = t, t
    })()
  }

  function a(r) {
    return e(function () {
      var o = this,
        n = Array.prototype.slice.call(arguments, 0),
        e = {
          shim: o,
          method: r,
          args: n,
          ts: new Date
        };
      window._rollbarShims[this.shimId()].messages.push(e)
    })
  }
  var i = n(2),
    s = 0,
    c = n(3),
    p = function (r, o) {
      return new t(r, o)
    },
    d = c.bind(null, p);
  t.prototype.loadFull = function (r, o, n, t, l) {
    var a = function () {
      var o;
      if (void 0 === r._rollbarDidLoad) {
        o = new Error("rollbar.js did not load");
        for (var n, e, t, a, i = 0; n = r._rollbarShims[i++];)
          for (n = n.messages || []; e = n.shift();)
            for (t = e.args || [], i = 0; i < t.length; ++i)
              if (a = t[i], "function" == typeof a) {
                a(o);
                break
              }
      }
      "function" == typeof l && l
    }])
})
}
})
}
}])
}
// End Rollbar Snippet
