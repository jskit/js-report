# js-tracking

实时监控前端JavaSript应用的错误，助您提升用户体验

实现错误类型分组并排名，便于规模性处理


JS 错误实时监控，通过重写onError方法来监控错误，帮助开发者及时发现并且解决应用错误。

```js
window.onerror = function(msg, file, line, col, error) {
  // callback is called with an Array[StackFrame]
  StackTrace.fromError(error).then(callback).catch(errback);
};
```

提供完整的堆栈跟踪，以及环境信息，HTTP请求，原始数据，浏览器，操作系统，受影响的用户等等。

- https://github.com/lillesand/js-onerror/blob/master/public/onerror.js
- https://github.com/jincod/logstash-js-onerror/blob/master/src/index.js
- https://github.com/getsentry/raven-js/blob/master/src/raven.js
- https://github.com/MindscapeHQ/raygun4js
- !!https://js.fundebug.cn/fundebug.0.3.6.min.js
- !!!http://www.css88.com/archives/5014
- !!!http://www.css88.com/archives/9184
- !!!http://broofa.com/tests/ErrorProperties.htm
- https://opbeat.com/
- https://github.com/rollbar/rollbar.js
- https://rollbar.com/error-tracking/javascript/
- https://github.com/rollbar/rollbar.js/blob/master/src/browser/errorParser.js

- https://github.com/baryon/tracer
- https://github.com/stacktracejs/stacktrace.js
- https://github.com/ebobby/tracing.js
