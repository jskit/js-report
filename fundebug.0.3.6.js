/* eslint-disable */
// fundebug.notify("Test", "Hello, Fundebug!");

// 10 个最常见的 JavaScript 错误（以及如何避免它们）- 来自 Rollbar 1000 多个项目的统计
// http://www.css88.com/archives/9184

// js tracking
!function (window) {
  // 获取当前脚本的js
  function getScript() {
    var script = document.currentScript;
    if (!script) {
      var scripts = document.scripts;
      script = scripts[scripts.length - 1];
    }
    return script;
  }

  // 更新属性
  function polyFill(obj, name, makeReplacement) {
    var original = obj[name];
    obj[name] = makeReplacement(original);
  }

  // 如果是方法，挂载inject方法
  function wrap(fn) {
    return "function" != typeof fn ? fn : (fn.__injected__ || (fn.__injected__ = function() {
      try {
        return fn.apply(this, arguments);
      } catch (e) {
        throw normalize(e), o = true, e;
      }
    }), fn.__injected__);
  }

  // 验证key格式
  function checkApikey(value, bool) {
    var apikeyReg = /^[0-9a-z]{64}$/i;
    if (value) return !!value.match(apikeyReg);
    if (bool) {
      console.error("Fundebug: apikey格式错误");
    }
    return false
  }

  // log
  function log(error) {
    if (!error) return null;
    var opts = {};
    window.XMLHttpRequest ? opts = {
      name : error.name,
      message : error.message,
      fileName : error.fileName || error.sourceURL,
      lineNumber : error.lineNumber || error.line,
      columnNumber : error.columnNumber || error.column
    } : opts.message = error.message
    return opts;
  }

  function pruneErrorStack() {
    var e;
    try {
      throw new Error("")
    } catch (local) {
      e = local.stack
    }
    if (e) {
      e = e.replace(/(.*?)fundebug(.*?)\.js(.*)\n?/gm, "");
      e = e.replace(/^Error\n/g, "");
      e = "generated-stack:\n" + e;
      return e
    }
  }

  function on() {
    var falseySection;
    var responseGroup = [];
    var caller = arguments.callee.caller.caller;
    for (; caller && responseGroup.length < 10;) {
      var n = caller.toString().match(/function\s*([\w\_$]+)?\s*\(/i);
      falseySection = n && n[1] || "[anonymous]";
      responseGroup.push(falseySection);
      caller = caller.caller
    }
    return "generated-stack:\n" + responseGroup.join("\n")
  }

  function normalize(e) {
    if (e) {
      var trace = e.stack;
      trace = trace.replace(/(.*?)fundebug(.*?)\.js(.*)\n?/gm, "");
      var error = log(e);
      callback({
        name : error.name || "uncaught error",
        message : error.message,
        fileName : error.fileName,
        lineNumber : error.lineNumber,
        columnNumber : error.columnNumber,
        stacktrace : trace,
        severity : "error",
        type : "uncaught"
      });
    }
  }

  function handler(event) {
    if (!self.silentResource && !event.message) {
      var node;
      node = event.target ? event.target : event.srcElement;
      var outerHTML = node && node.outerHTML;
      if (outerHTML && outerHTML.length > 200) {
        outerHTML = outerHTML.slice(0, 200);
      }
      var data = {
        type : "resourceError",
        target : {
          outerHTML : outerHTML,
          src : node && node.src,
          tagName : node && node.tagName,
          id : node && node.id,
          className : node && node.className,
          name : node && node.name,
          type : node && node.type,
          XPath : walk(node),
          selector : move(node),
          timeStamp : event.timeStamp
        }
      };
      if (node.src !== window.location.href && (!node.src || !node.src.match(/.*\/(.*)$/) || node.src.match(/.*\/(.*)$/)[1]) && data.target.src && window.XMLHttpRequest) {
        /** @type {!XMLHttpRequest} */
        var xhr = new XMLHttpRequest;
        /** @type {boolean} */
        xhr.Fundebug = true;
        xhr.open("HEAD", data.target.src);
        xhr.send();
        /**
         * @param {!Event} event
         * @return {undefined}
         */
        xhr.onload = function(event) {
          if (200 !== event.target.status) {
            data.target.status = event.target.status;
            data.target.statusText = event.target.statusText;
          }
          callback(data);
        };
      }
    }
  }

  function walk(element) {
    var paths = [];
    for (; element && element.nodeType == Node.ELEMENT_NODE; element = element.parentNode) {
      var node;
      var indentFirstLine = 0;
      var beforeLineChars = false;
      for (node = element.previousSibling; node; node = node.previousSibling){
        if (node.nodeType != Node.DOCUMENT_TYPE_NODE && node.nodeName == element.nodeName) {
          ++indentFirstLine;
        }
      }
      for (node = element.nextSibling; node && !beforeLineChars; node = node.nextSibling) {
        if(node.nodeName == element.nodeName) {
          beforeLineChars = true;
        }
      }
      var tagName = (element.prefix ? element.prefix + ":" : "") + element.localName;

      var pathIndex = indentFirstLine || beforeLineChars ? "[" + (indentFirstLine + 1) + "]" : "";
      paths.splice(0, 0, tagName + pathIndex)
    }
    return paths.length ? "/" + paths.join("/") : null;
  }

  function move(element) {
    for (var paths = []; element.parentNode;) {
      if (element.id) {
        paths.unshift("#" + element.id);
        break
      }
      if (element == element.ownerDocument.documentElement) {
        paths.unshift(element.tagName)
      } else {
        for (var total = 1, node = element; node.previousElementSibling; node = node.previousElementSibling, total++);
        paths.unshift(element.tagName + ":nth-child(" + total + ")")
      }
      element = element.parentNode
    }
    return paths.join(" > ")
  }

  function fn(element) {
    breadcrumbs.push(element);
    if (breadcrumbs.length > 20) {
      breadcrumbs.shift();
    }
  }

  function handleIntent(e) {
    var node;
    node = e.target ? e.target : e.srcElement;
    var outerHTML = node && node.outerHTML;
    if (outerHTML && outerHTML.length > 200) {
      outerHTML = outerHTML.slice(0, 200);
    }
    fn({
      type : "click",
      page : {
        url : window.location.href,
        title : document.title
      },
      detail : {
        outerHTML : outerHTML,
        tagName : node && node.tagName,
        id : node && node.id,
        className : node && node.className,
        name : node && node.name
      },
      time : (new Date).getTime()
    });
  }

  function get(s, from) {
    /** @type {string} */
    data = from;
    var row = {
      type : "navigation",
      detail : {
        from : s,
        to : from
      },
      time : (new Date).getTime()
    };
    fn(row);
  }

  function createPublicMethod(name) {
    var method = console[name];
    /**
     * @return {undefined}
     */
    console[name] = function() {
      var params = {
        type : "console",
        page : {
          url : window.location.href,
          title : document.title
        },
        detail : {
          level : name,
          arguments : Array.prototype.slice.apply(arguments).join(" ")
        },
        time : (new Date).getTime()
      };
      if (self.silentConsole || fn(params), "function" == typeof method) {
        if (method.apply) {
          method.apply(console, arguments);
        } else {
          var value = Array.prototype.slice.apply(arguments).join(" ");
          method(value);
        }
      }
    };
  }

  function isFunction(o) {
    return !self.silentHttp && ((0 !== o.detail.status || !/^file:\/\/\//.test(o.detail.url)) && 2 !== parseInt(o.detail.status / 100));
  }

  function callback(data) {
    if (checkApikey(app.getAttribute("apikey") || self.apikey) && self.maxEventNumber && !self.silent) {
      self.maxEventNumber -= 1;
      var options = {
        notifierVersion : "0.3.6",
        userAgent : window.navigator.userAgent,
        locale : window.navigator.language || window.navigator.userLanguage,
        url : window.location.href,
        title : document.title,
        appVersion : app.getAttribute("appversion") || self.appversion,
        apiKey : app.getAttribute("apikey") || self.apikey,
        releaseStage : app.getAttribute("releasestage") || self.releasestage,
        metaData : data.metaData || self.metaData,
        user : data.user || self.user,
        name : data.name,
        time : (new Date).getTime(),
        message : data.message,
        fileName : data.fileName,
        lineNumber : data.lineNumber,
        columnNumber : data.columnNumber,
        stacktrace : data.stacktrace,
        type : data.type,
        severity : data.severity,
        target : data.target,
        req : data.req,
        res : data.res,
        breadcrumbs : breadcrumbs
      };
      if (!(options.userAgent && options.userAgent.match(/Googlebot/) || start(options))) {
        init(options);
      }
    }
  }

  function start(name) {
    var options = self.filters;
    if (!options || !options.length) return false
    for (var i = 0; i < options.length; i++) {
      if (set(name, options[i])) {
        return true;
      }
    }
    return false;
  }

  function set(keys, args) {
    if (!keys) return false;
    if (Object.keys && !Object.keys(args).length) return false;
    for (var i in args) {
      if (args.hasOwnProperty(i)) {
        if (args[i].constructor === RegExp) {
          if (!args[i].test(keys[i])) return false;
        } else {
          if (args[i].constructor !== Object) return false;
          if (!set(keys[i], args[i])) return false;
        }
      }
    }
    return true;
  }

  function h(arr) {
    if ("undefined" != typeof JSON) return JSON.stringify(arr);
    if (arr instanceof Array) {
      for (var buttons = [], i = 0; i < arr.length; i++) {
        buttons.push(h(arr[i]));
      }
      return "[" + buttons.join(",") + "]"
    }
    var my_chain = [];
    for (var index in arr) {
      if (arr.hasOwnProperty(index)) {
        var s = '"' + index + '":';
        var val = arr[index];
        if(val) {
          if ("object" == typeof val) {
            s = s+ h(val);
          } else {
            if ("number" == typeof val) {
              s += val
            } else {
              s = s + '"' + val.replace(/\n/g, "\\n") + '"';
            }
          }
          my_chain.push(s);
        }
      }
    }
    return "{" + my_chain.join(",") + "}"
  }

  function value(start) {
    var placeholder;
    try {
      placeholder = h(start);
    } catch (r) {
      delete start.metaData;
      try {
        placeholder = h(start);
      } catch (e) {
        return;
      }
    }
    return placeholder;
  }

  function init(t) {
    var r = value(t);
    if (r) {
      var n = text;
      if (window.XMLHttpRequest && window.atob) {
        var xhr = new XMLHttpRequest;
        xhr.Fundebug = true;
        xhr.open("POST", n);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(r);
      } else {
        (new Image).src = n + "?event=" + encodeURIComponent(p);
      }
    }
  }

  var text = "https://fundebug.com/javascript/";
  var self = {};
  window.fundebug = self;
  var D = false;
  var app = getScript();
  self.silent = app.getAttribute("silent") || false
  self.maxEventNumber = app.getAttribute("maxEventNumber") || 10
  self.silentResource = app.getAttribute("silentResource") || false
  self.silentHttp = app.getAttribute("silentHttp") || false
  self.silentConsole = self.silentConsole || app.getAttribute("silentConsole") || false

  polyFill(window, "onerror", function () {
    return function (notMessage, file, oldLineNumber, charNo, o) {
      if (D) return void(D = false);
      if (void 0 === charNo && window.event) {
        charNo = window.event.errorCharacter
      }
      var fileName = file && file !== window.location.href ? file : null;
      var error = log(o);
      callback({
        message: notMessage,
        lineNumber: oldLineNumber,
        columnNumber: charNo,
        fileName: fileName || error && error.fileName,
        name: error && error.name || "uncaught error",
        stacktrace: o && o.stack || u(),
        severity: "error",
        type: "uncaught"
      })
      return false;
    }
  });

  var H = true;
  if (window.atob) {
    if (window.ErrorEvent) {
      try {
        if (window.ErrorEvent.prototype.hasOwnProperty("error")) {
          H = false
        }
      } catch (e) {}
    }
  } else {
    H = false;
  }

  "EventTarget Window Node ApplicationCache AudioTrackList ChannelMergerNode CryptoOperation EventSource FileReader HTMLUnknownElement IDBDatabase IDBRequest IDBTransaction KeyOperation MediaController MessagePort ModalWindow Notification SVGElementInstance Screen TextTrack TextTrackCue TextTrackList WebSocket WebSocketWorker Worker XMLHttpRequest XMLHttpRequestEventTarget XMLHttpRequestUpload".replace(/\w+/g, function (t) {
    if (H) {
      var prototype = window[global] && window[global].prototype;
      if (prototype && prototype.hasOwnProperty && prototype.hasOwnProperty("addEventListener")) {
        polyFill(prototype, "addEventListener", function (_on) {
          return function(event, listener, context, wantsUntrusted) {
            return listener && listener.handleEvent && (listener.handleEvent = wrap(listener.handleEvent)), _on.call(this, event, wrap(listener), context, wantsUntrusted);
          };
        });
        polyFill(prototype, "removeEventListener", function(self) {
          return function($item, name, parent) {
            return self.call(this, $item, name, parent), self.call(this, $item, wrap(name), parent);
          };
        });
      }
    }
  });
  self.notify = function(tag, err, response) {
    if (tag) {
      var state = {
        name : tag || response && response.name,
        message : err || response && response.message,
        severity : response && response.message || "warning",
        stacktrace : pruneErrorStack(),
        type : "notification",
        user : response && response.user,
        metaData : response && response.metaData
      };
      var value = app.getAttribute("apikey") || self.apikey;
      return checkApikey(value, true) ? (callback(state), "fundebug.com" === location.host ? "\u4eb2\uff0c\u4e0d\u8981\u5728Fundebug\u7f51\u7ad9\u6d4b\u8bd5\u54e6\uff1b\u8bf7\u5c06Fundebug\u63d2\u4ef6\u96c6\u6210\u5230\u60a8\u7684\u7f51\u7ad9\uff0c\u7136\u540e\u8fdb\u884c\u6d4b\u8bd5!" : "\u8bf7\u67e5\u770b\u90ae\u7bb1\u4ee5\u53caFundebug\u63a7\u5236\u53f0!") : value ? "apikey\u683c\u5f0f\u9519\u8bef" : "\u8bf7\u914d\u7f6eapikey";
    }
  };
  self.notifyError = function(e, options) {
    if (e) {
      if (window.console) {
        console.error(e);
      }
      var error = log(e);
      callback({
        name : error.name || options && options.name || "caught error",
        message : error.message || options && options.message,
        stacktrace : e.stack,
        fileName : error.fileName,
        lineNumber : error.lineNumber,
        columnNumber : error.columnNumber,
        severity : options && options.severity || "error",
        type : "caught",
        user : options && options.user,
        metaData : options && options.metaData
      });
    }
  };
  self.notifyHttpError = function(form, response, result) {
    callback({
      type : "httpError",
      req : form,
      res : response,
      user : result && result.user,
      metaData : result && result.metaData
    });
  };
  if (window.addEventListener) {
    window.addEventListener("unhandledrejection", function(recip) {
      self.notifyError(recip.reason);
    });
  }
  if (window.addEventListener) {
    window.addEventListener("error", handler, true);
  }
  var breadcrumbs = [];
  if (window.addEventListener) {
    window.addEventListener("click", handleIntent, true);
  } else {
    document.attachEvent("onclick", handleIntent);
  }
  var data = {
    url : window.location.href
  };
  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", function() {
      data = {
        url : window.location.href,
        title : document.title
      };
    });
  } else {
    document.attachEvent("onreadystatechange", function() {
      data = {
        url : window.location.href,
        title : document.title
      };
    });
  }
  var cached = window.onpopstate;
  window.onpopstate = function () {
    var item = {
      url : window.location.href
    };
    if (data.title || (data.title = document.title), data.url !== item.url && get(data, item), cached) {
      return cached.apply(this, arguments);
    }
  };
  var pushState = window.history.pushState;
  if (pushState) {
    /**
     * @return {?}
     */
    window.history.pushState = function() {
      data = {
        url : window.location.href,
        title : document.title
      };
      var current = {};
      if (3 === arguments.length && (current.url = arguments[2]), data.url !== current.url && get(data, current), pushState) {
        return pushState.apply(this, arguments);
      }
    };
  }
  var previousHandler = window.onhashchange;
  window.onhashchange;
  /**
   * @return {?}
   */
  window.onhashchange = function() {
    var item = {
      url : window.location.href,
      title : document.title
    };
    if (data.url !== item.url && get(data, item), previousHandler) {
      return previousHandler.apply(this, arguments);
    }
  };
  var methods = ["log", "warn", "error", "debug", "info"];
  var clog = {};
  /** @type {number} */
  var i = 0;
  for (; i < methods.length; i++) {
    if (window.console) {
      clog[methods[i]] = console[methods[i]];
      if (!self.silentConsole) {
        createPublicMethod(methods[i]);
      }
    }
  }
  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", function(canCreateDiscussions) {
      /** @type {number} */
      var i = 0;
      for (; i < methods.length; i++) {
        if (window.console && self.silentConsole && clog[methods[i]]) {
          console[methods[i]] = clog[methods[i]];
        }
      }
    });
  }
  var C = false;
  if (window.XMLHttpRequest) {
    var proto = XMLHttpRequest.prototype;
    if (!proto) {
      return;
    }
    var _name;
    var url;
    var startTime;
    /** @type {function(this:XMLHttpRequest, string, string, (boolean|null)=, (null|string)=, (null|string)=): undefined} */
    var open = proto.open;
    /**
     * @param {string} name
     * @param {string} method
     * @return {undefined}
     */
    proto.open = function(name, method) {
      /** @type {string} */
      _name = name;
      /** @type {string} */
      url = method;
      /** @type {number} */
      startTime = (new Date).getTime();
      try {
        open.apply(this, arguments);
      } catch (e) {
        /** @type {boolean} */
        C = true;
        self.notifyError(e, {
          metaData : {
            description : "XMLHttpRequest\u8bf7\u6c42\u5931\u8d25(\u5982\u679c\u662f\u62d2\u7edd\u8bbf\u95ee\uff0c\u5219\u662f\u7531\u4e8e\u6d4f\u89c8\u5668\u8de8\u57df\u9650\u5236)",
            method : _name,
            httpUrl : url
          }
        });
      }
    };
    /** @type {function(this:XMLHttpRequest, (ArrayBuffer|ArrayBufferView|Blob|Document|FormData|null|string)=): undefined} */
    var oldSend = proto.send;
    /**
     * @return {?}
     */
    proto.send = function() {
      if (C) {
        return void(C = false);
      }
      var xhr = this;
      /** @type {function(): undefined} */
      var originalCallback = xhr.onreadystatechange;
      /**
       * @return {undefined}
       */
      xhr.onreadystatechange = function() {
        if (4 === xhr.readyState && !xhr.Fundebug && url != text) {
          /** @type {number} */
          var elapsed = (new Date).getTime() - startTime;
          var params = {
            type : "XMLHttpRequest",
            page : {
              url : window.location.href
            },
            detail : {
              method : _name,
              url : xhr.responseURL || url,
              status : xhr.status,
              statusText : xhr.statusText
            },
            elapsedTime : elapsed,
            time : startTime
          };
          if (isFunction(params)) {
            var arg = {
              method : params.detail.method,
              url : params.detail.url
            };
            var data = {
              status : xhr.status,
              statusText : xhr.statusText,
              response : xhr.response,
              elapsedTime : elapsed
            };
            self.notifyHttpError(arg, data);
          }
          fn(params);
        }
        if (originalCallback) {
          originalCallback.apply(this, arguments);
        }
      };
      oldSend.apply(this, arguments);
    };
  }
  if (window.fetch) {
    var oldFetch = window.fetch;
    /**
     * @param {(Request|string)} uids
     * @param {!RequestInit=} options
     * @return {!Promise<Response>}
     */
    window.fetch = function(uids, options) {
      /** @type {number} */
      var startTime = (new Date).getTime();
      return oldFetch.apply(this, arguments).then(function(res) {
        /** @type {number} */
        var elapsed = (new Date).getTime() - startTime;
        var params = {
          type : "fetch",
          page : {
            url : window.location.href,
            title : document.title
          },
          detail : {
            method : options && options.method || "GET",
            url : res.url,
            status : res.status,
            statusText : res.statusText
          },
          elapsedTime : elapsed,
          time : startTime
        };
        if (isFunction(params)) {
          var arg = {
            method : params.detail.method,
            url : params.detail.url
          };
          var data = {
            status : res.status,
            statusText : res.statusText,
            elapsedTime : elapsed
          };
          self.notifyHttpError(arg, data);
        }
        return fn(params), res;
      });
    };
  }

  if (typeof define == 'function') {
    define(self);
  } else if (typeof module != 'undefined' && module.exports) {
    module.exports = self;
  }
}(window);
