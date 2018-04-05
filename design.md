
实现通知，动态改变 shortcut icon

<link rel="shortcut icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEs0lEQVRYR72Xa0wUVxiG3xmGhUVWFhACDRqgalNJuYQiaapiSUtS3NYqwRSa1iYGfgDhDyzR2NLaGFpZ6p8uUilqaoVQrSWtSFu0lYXaEgGhF1Z74SYUtrgKrFxkOcw0Z3U3nYXdmZRNJ5m9zJz5vue832XOYfDwEAQhAsABABoA9Ddrv+ehbx7ACIBGAO8yDEN/g6EfgiBsB9AAQO0hZ1JmJgHsYhimhXk481/+R+d2OArxBAWoBJAnhXxnfpa/Oz9L1quCFQxjE84TxzEKMARgnTtrLaZ+kn31LGvlF9msyFjrB0kvKDzhHcAtCrAolXCvXj1n/Wr0d4fTwZe0xN9bwXkAgqcAgpShI72tRGdsszlkGYaYMg5wrIfCIAuA8DxO9nWSCyM38aN5mOvZUUAi/AI8oQCWAPTdu0NaxwexNTQS61XBIidUrOevnCZUCX2SBo8oVZiw3mf9OG+i9vb9T8kpAhianiBbmqvZuUXC+npxfGtaDh/tHySCeP2H86Txr5tLZh+kUJK08A3I3ZCE2MAw2eqIAD4d/JnP77jg6IBHE9P516ITHP8/6e8hxdebuEWJtNkbnUDK4tNYHy9OspuKAEZnLfyW5mpYFuZtD2asjbF+mLxTAYZBea/BqjN+L7v8ng5ZR85uzZKEWJIDprl7fLt5mKz1C4Bxapz9bPhXfnZhge2eGJMtK4XfODgGLi6OqBW+HBjwKi8fEumvZmMDw7AtNArhSpXNnmQVVBjbyHu9rZLOU64ZscPQjfDbk3hscMxR2Z0xUTCFBOJiSgK6YqIc158MjiD7Hk2UBjjV10W01792CeA/M4fSY59je8cNqXaC6sxU1GSmisZJKpDT3kAaho3LAiT2DqC8ohaqmfsio0GHD0Ot1QIcB3NBASxVVY77v0WGo6Q4G2OhgbZrkgDbmquJcer2EgA68y8K3hc5V6amIqisDD7JyQ8cCgLMhYWw6PUiQBqWvLf2yQNIbKokQzOTSwDKdbUi2YMrKhBQVCQOAwXIzxcpYB/wUWYq6CmpwLOXT5IepwqgCaerqBM5W3P8OFbn5tpmzVssYAMCHijgAoA+vFNfJA1Q1NVEPu7vFingPHtqLFing59Gg7ulpfCJi4P64EFJgKN706UBDH8PkIzWOhHAGa0eG4dMLrN+jV6P1fn5kgCNKQnSAPQF9Ny3p0RhuLbnDbclJxeAVoRkDlBPxqlx8sylGnZREFja4c6U0FWc60MugKwypINGZqdI/EW9IwyeUqBrU5Q8BeoGfiKFnY0OgKq3TyDROLDiHKhPf0oewP7ub0jNn50OgNLK89AYulcMYK8CyUVpVlu99ZKpz/Eqpi246tCJFQFM+/nixcoi26JUclmuuXIa7eZhkcOcc9+BnssdcpJQW5wNw+aYEVkbk+UAqGNX/cDRll10wpakx1GifQUQYNuY0I2o263Zy2311sv/CoF91uHjE9Dpat02JWeFqPN38nZjepVykgcXJ2tz6pyEzkbdhcM+lsb8UN5uGDZvopcmGUbYZc58s8WxyXO3PXcuw+XiTtVI6bhhW4rZziETaJ3/ERmG0ZBANKbE89OrlKMA8yXPcEcm9uy/Re38AyQAjqzwACK1AAAAAElFTkSuQmCC" type="image/png">

JavaScript执行错误的type属性值分为caught或者uncaught两种，caught为notifyError发送的错误，而uncaught为Fundebug插件自动捕获的错误。

## 配置

https://docs.fundebug.com/notifier/javascript/customize/

- apikey: 区分项目的标识。
- appversion: 指的是应用版本
  - 若您配置了appversion，并希望区分不同版本的Souce Map，则需要在上传Source Map时也指定对应的appversion。
- releasestage
  - releasestage指的是应用开发阶段，例如『开发』、『测试』、『生产』:
    - development
    - test
    - production
  - 除了这3个常见的取值，releasestage可以设为任意值，可以根据需要进行配置。
  - 默认情况下，Fundebug会自动识别releasestage。用户也可以通过设置releasestage以区分不同阶段的错误。
- user: user指的是网站的用户，user对象含有name和email两个属性，user只能在JavasScript中配置:
- metaData: metaData是其他定义信息，开发者可以使用metaData收集所需要的信息。metaData只能在JavasScript中配置:
- filters
  - 通过配置filters属性，用户可以过滤掉一些不需要捕获的错误，比如Script error.
- silent 如果您暂时不需要使用Fundebug，可以选择配置安静模式，将silent属性设为true。这样的话，Fundebug不会收集错误信息，因此也不会发送报警邮件。
- silentResource: 如果你不需要监控资源加载错误，则可以将silentResource属性设为true。
- silentHttp: 如果你不需要监控HTTP请求错误，则可以将silentHttp属性设为true。
- silentConsole: 如果你不需要记录控制台的打印信息，则可以将silentConsole属性设为true。
  - 避免干扰console打印，Fundebug通过重写console对象监控浏览器控制台的打印信息，并添加到用户行为中。这样会导致在控制台下打印的日志无法正确看到原代码文件中的位置：
  - 这样会造成开发过程中的困扰，有3种不同方法可以解决这个问题：可以设置silentConsole为true。或生产环境不接入Fundebug
- notifyError(error, option)
  - 使用notifyError，可以将主动捕获的错误发送到Fundebug
    - error：抛出的错误对象，参数类型为Error
    - option：可选对象，参数类型为对象，用于发送一些额外信息，比如：
      - metaData: 其他自定义信息
- notify(name, message, option)
  - 使用notify，可以将自定义的错误信息发送到Fundebug
    - name: 错误名称，参数类型为字符串
    - message: 错误信息，参数类型为字符串
    - option: 可选对象，参数类型为对象，用于发送一些额外信息，比如:
      - metaData: 其他自定义信息
  - notify主要用于测试，它发送的错误每次都会报警邮件，这样可能会给您造成困扰。为了避免重复报警，请使用notifyError记录错误，这样同一个错误将只会在错误数达到阈值(10, 100, 100...)的时候报警。

```vue
function formatComponentName(vm)
{
  if (vm.$root === vm) return 'root';

  var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');

}

Vue.config.errorHandler = function(err, vm, info)
{
  var componentName = formatComponentName(vm);
  var propsData = vm.$options && vm.$options.propsData;

  fundebug.notifyError(err,
  {
      metaData:
      {
          componentName: componentName,
          propsData: propsData,
          info: info
      }
   });
};
```

## 莲子数据

莲子数据的插件会拦截错误数据，导致Fundebug插件无法捕获错误。这时需要修改莲子数据插件的接入代码，并将其放在Fundebug插件之前。

```html
<script type="text/javascript">
    var _laq = _laq || [];
    _laq.push(['_setApp', 'Q0LGX7Mj5i8tcv3mdkJe']);/* LOTUSEED_APPEY 必填 */
   //  _laq.push(['_setChannel', 'LOTUSEED_CHANNEL']);/* 设置渠道时 可选 */
    _laq.push(['_setVersion', 'funweb:0.0.1']);/* 设置版本时 可选 */
   //  _laq.push(['_setTitle', '自定义title']); /* 页面标题，必要时可以初始化设置 可选 */
    _laq.push(['_trackClick', true]); /*设置追踪页面点击事件（如果没有此项，该功能不开启） */
    _laq.push(['_trackError', true]); /* 设置追踪页面js异常（如果没有此项，该功能不开启） */
    _laq.push(['_trackPageClose', true]); /* 追踪页面关闭（如果没有此项，该功能不开启 可选 */
</script>
<script type="text/javascript" src="https://js.lotuseed.com/lsd.js"></script>
<script src="https://js.fundebug.cn/fundebug.0.3.6.min.js" apikey="API-KEY"></script>
```


filters只能在JavasScript中配置:

fundebug.filters = [{
  message: /^Script error\.$/
}]

配置规则

filters属性有以下特点：

它是一个数组，数组中的元素为过滤规则，当错误符合数组中任意一条过滤规则时，则会被过滤
过滤规则是JavaScript对象，该对象的Key为错误的属性名，Value为正则表达式；
当错误的属性匹配对应正则表达式时，则会被过滤；
示例1：过滤name为ReferenceError的错误

## JavaScript执行错误

Fundebug插件捕获的错误数据如下：

```js
{
  "notifierVersion": "0.2.0",
  "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:54.0) Gecko/20100101 Firefox/54.0",
  "locale": "zh",
  "url": "http://localhost:4000",
  "title": "Test",
  "apiKey": "API-KEY",
  "name": "ReferenceError",
  "time": 1502863944724,
  "message": "Uncaught ReferenceError: aler is not defined",
  "fileName": "http://localhost:4000/test.js",
  "lineNumber": 1,
  "columnNumber": 1,
  "stacktrace": "@http://localhost:4000/test.js:1:1\n",
  "type": "uncaught",
  "severity": "error"
}
```

## 资源加载错误

```js
{
  "notifierVersion": "0.2.0",
  "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:54.0) Gecko/20100101 Firefox/54.0",
  "locale": "zh",
  "url": "https://www.fundebug.com",
  "title": "Test",
  "apiKey": "API-KEY",
  "time": 1502864167717,
  "type": "resourceError",
  "target": {
    "outerHTML": "<img src=\"test.jpg\">",
    "src": "https://www.fundebug.com/test.jpg",
    "tagName": "IMG",
    "id": "",
    "className": "",
    "name": "jpg",
    "XPath": "/html/body/img[1]",
    "selector": "HTML > BODY:nth-child(2) > IMG:nth-child(2)",
    "status": 404,
    "statusText": "Not Found"
  }
}
```

资源加载错误的type属性值为resourceError。

silentResource 如果你不需要监控资源加载错误，则可以将silentResource属性设为true。

## HTTP请求错误

通常，后端会通过日志记录所有HTTP请求，但是查询起来非常不便，也不及时。Fundebug可以捕获所有HTTP请求错误，同时记录用户行为，并实时提醒开发者，且不需要修改后端，也不需要搭建复杂的日志系统。

下面的示例中，登陆账户时密码错误，因此会报403错误。

```js
var xhr = new XMLHttpRequest();
xhr.open("POST", "https://api.fundebug.com/login");
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({
  email: "help@fundebug.com",
  password: "akhakfnak"
}));
```

开发者可以在Fundebug控制台错误详情:

Fundebug插件捕获的错误数据如下：

```js
{
  "notifierVersion": "0.2.0",
  "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:54.0) Gecko/20100101 Firefox/54.0",
  "locale": "zh",
  "url": "http://localhost:4000",
  "title": "Test",
  "apiKey": "API-KEY",
  "time": 1502864518516,
  "type": "httpError",
  "req": {
    "method": "POST",
    "url": "https://www.fundebug.com/login"
  },
  "res": {
    "status": 403,
    "statusText": "Forbidden",
    "response": "{\"error\":\"wrong password\"}"
  }
}
```

HTTP请求错误的type属性值为httpError。

silentHttp 如果你不需要监控HTTP请求错误，则可以将silentHttp属性设为true。

## Script error.

`添加 crossorigin="anonymous" 到script标签` 来解决

关于Script error.的原理的解法，请参考我们的博客:

- Script error.全面解析 https://blog.fundebug.com/2017/04/05/understand-script-error/
- Script error.深度测试 https://blog.fundebug.com/2017/04/06/test-script-error/
- Script error.解决方法 https://blog.fundebug.com/2017/04/07/solve-script-error/
- Chrome浏览器默认不允许访问本地文件(其他可以)
  - http://stackoverflow.com/questions/20748630/load-local-javascript-file-in-chrome-for-testing
  - https://blog.csdn.net/u010874036/article/details/51728622

## 还有css跨域问题 http://www.cnblogs.com/wei-lai/p/6269639.html

Nginx 解决办法：

```bash
add_header Access-Control-Allow-Origin *;
add_header Access-Control-Allow-Headers X-Requested-With;
add_header Access-Control-Allow-Methods GET,POST,OPTIONS;
```

常见错误类型

1 Uncaught TypeError: Cannot read property 'xxx' of undefined
2 TypeError: ‘undefined’ is not an object (evaluating 'testArray.length')
3 TypeError: null is not an object (evaluating 'testArray.length')
4 (unknown): Script error
5 TypeError: Object doesn’t support property or method 'xxx'(5,6错误常见于IE)
6 TypeError: ‘undefined’ is not a function，报错同5
7 Uncaught RangeError: Maximum call stack size exceeded
8 Uncaught TypeError: Cannot read property ‘length’ of undefined
9 Uncaught TypeError: Cannot set property 'value' of undefined
10 Uncaught ReferenceError: xxx is not defined

- ReferenceError
  - Uncaught ReferenceError: WeixinJSBridge is not defined

## 监控 Cordova

1. 接入插件
2. 修改Content-Security-Policy配置

将https://og6593g2z.qnssl.com与https://fundebug.com添加到default-src中即可：

<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval' https://fundebug.com  https://og6593g2z.qnssl.com; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">

PS：为什么需要修改Content-Security-Policy配置？
处于安全方面的考虑，Cordova使用cordova-plugin-whitelist配置了严格的安全策略。

Cordova的默认的Content-Security-Policy配置位于www/index.html内，如下所示：

<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">

为了在在Cordova中使用Fundebug，则需要修改Content-Security-Policy。

否则，将会遇到这些的错误：

加载fundebug脚本失败：

08-02 14:10:52.132  4185  4185 I chromium: [INFO:CONSOLE(0)] "Refused to load the script 'https://js.fundebug.cn/fundebug.0.3.6.min.js' because it violates the following Content Security Policy directive: "default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval' 'unsafe-inline'". Note that 'script-src' was not explicitly set, so 'default-src' is used as a fallback.

发送错误数据到Fundebug失败：

08-02 11:10:59.848 20520 20520 I chromium: [INFO:CONSOLE(1)] "Uncaught SecurityError: Failed to execute 'open' on 'XMLHttpRequest': Refused to connect to 'https://fundebug.com/javascript/' because it violates the document's Content Security Policy.", source: https://js.fundebug.cn/fundebug.0.3.6.min.js (1)

## 插件版本

目前，Fundebug的JavaScript错误监控插件的最新版本为0.3.6，请及时更新。

<script src="https://js.fundebug.cn/fundebug.0.3.6.min.js" apikey="API-KEY"></script>
另外，从0.3.4开始，插件均使用js.fundebug.cn域名，请老用户及时更新。

下表为我们正式发布的一些插件的版本说明：

版本	更新时间	说明
0.0.5	2017-04-17	记录用户行为
0.0.6	2017-04-17	兼容CommonJS和AMD规范
0.1.0	2017-06-21	监控HTTP请求错误与资源加载错误
0.1.5	2017-07-10	忽略googlebot错误
0.1.6	2017-07-11	资源加载错误添加XPath和slector属性
0.2.0	2017-08-16	添加过滤BUG功能
0.3.0	2017-09-14	增强用户行为记录的功能：记录console输出；记录HTTP请求时间
0.3.1	2017-09-14	修复BUG：stringify循环引用出错
0.3.2	2017-10-02	apikey配置错误时打印提醒
0.3.3	2017-10-13	notifyError使用console.error打印错误信息
0.3.4	2018-01-17	支持配置silentConsole属性
0.3.5	2018-03-05	修复页面跳转监控BUG
0.3.6	2018-03-13	修复配置silentConsole失效的BUG

## 微信小程序

Fundebug的微信小程序插件能够实时监控小程序的错误。

插件特点
插件仅282字节，即0.28KB;
两行代码搞定;
自动捕获错误;
仅收集出错信息，保护隐私，收集systemInfo和userInfo需要开发者进行配置;
注意
Fundebug是通过重写onError方法来监控小程序错误的，因此如果您也重写onError的话，将会导致我们无法进行错误监控。

App(
{
    onError: function(err)
    {
        fundebug.notifyError(err);
    }

});

systemInfo
systemInfo是用户的系统信息，比如操作系统，微信版本等等:

"systemInfo":
{
    "system": "iOS 10.2",
    "model": "iPhone 7",
    "pixelRatio": 2,
    "windowHeight": 603,
    "language": "zh_CN",
    "version": "6.5.3",
    "windowWidth": 375,
    "platform": "ios"
}

为了保护用户隐私，Fundebug默认情况下不收集systemInfo。开发者如果需要收集systemInfo，需要进行配置:

wx.getSystemInfo(
{
    success: function(res)
    {
        fundebug.systemInfo = res;
    }
})

## Node.js

fundebug-nodejs

使用config函数，可以配置以下属性

fundebug.config(
{
    apikey: "API-KEY",
    slient: false,
    appVersion: "3.2.5",
    releaseStage: "development",
    user:
    {
        name: "fundebug",
        email: "help@fundebug.com"
    },
    metaDta:
    {
        name: "Fundebug",
        nation: "China"
    }
})

# 后端框架

监控Koa
app.on("error", fundebug.KoaErrorHandler);

监控Express
app.use(fundebug.ExpressErrorHandler);
Fundebug的错误处理中间件ExpressErrorHandler必须放在其他中间件之后。

监控Hapi
server.on("request-error", fundebug.HapiErrorHandler);
server.on("response", fundebug.HapiErrorHandler);

控制台
控制台是Fundebug用户查看、管理错误（及事件）数据的界面。

控制台提供了项目设置、错误（及事件）过滤、错误总数折线图（或事件数柱状图）、错误（及事件）搜索、错误（及事件）列表、事件详情、设备详情等功能。

控制台分为错误列表页面和错误详情页面，前者为项目的所有错误列表，后者为某个错误的详细详细。

## 自定义Webhook报警

设置
单击报警设置的添加按钮，弹出配置框（输入您的机器人链接）

注：只有项目管理员才可以添加


格式说明：

Fundebug向自定义的地址发送一个POST请求，其body中的JSON对象如下所示：

JavaScript请求错误:

 {
  type: 'javascript-http', // http请求错误
  projectName: 'website', // 项目名称
  numberOfUser: '10000', // 用户数
  numberOfOccurence: '100', // 出现次数
  fundebugUrl: 'https://www.fundebug.com/dashboard/123456/error/2345678' // 详情页
  errorUrl: 'www.xxx.com/xxx', // 出错页面（可无）
  httpMethod: 'POST', // HTTP请求错误：请求方式（可无）
  httpUrl: 'https://www.fundebug.com/', // HTTP请求错误： 请求路径（可无）
  httpStatus: 500 // HTTP请求错误： 请求状态（可无）
 }
JavaScript资源加载错误:

 {
  type: 'javascript-resource', // 资源加载错误
  projectName: 'website', // 项目名称
  numberOfUser: '10000', // 用户数
  numberOfOccurence: '100', // 出现次数
  fundebugUrl: 'https://www.fundebug.com/dashboard/123456/error/2345678' // 详情页
  errorUrl: 'www.xxx.com/xxx', // 出错页面（可无）
  targetSrc: "http://192.168.59.2:3000/test.jpg",  // 加载：资源路径（可无）
  targetStatus: 404 // 资源加载：加载状态（可无）
 }
JavaScript执行错误:

 {
  type: 'javascript-error', // JavaScript执行错误
  projectName: 'website', // 项目名称
  numberOfUser: '10000', // 用户数
  numberOfOccurence: '100', // 出现次数
  fundebugUrl: 'https://www.fundebug.com/dashboard/123456/error/2345678' // 详情页
  errorUrl: 'www.xxx.com/xxx', // 出错页面（可无）
  errorName: 'catchError', // 错误名称（可无）
  errorMessage: 'TypeError: undefined is not an object ...', // JavaScript错误信息（可无）
 }
微信小程序错误:

 {
  type: 'wxjs', // 微信小程序错误
  projectName: 'wxjs', // 项目名称
  numberOfUser: '10000', // 用户数
  numberOfOccurence: '100', // 出现次数
  fundebugUrl: 'https://www.fundebug.com/dashboard/123456/error/2345678', // 详情页
  errorPage: event.page, //出错页面 （可无）
  errorName: 'TypeError', // 错误类型（可无）
  errorMessage: 'TypeError: undefined is not an object ...' // JavaScript错误信息（可无）
 }
nodejs请求错误:

 {
  type: 'nodejs-http', // http请求错误
  projectName: 'nodejs', // 项目名称
  numberOfUser: '10000', // 用户数
  numberOfOccurence: '100', // 出现次数
  fundebugUrl: 'https://www.fundebug.com/dashboard/123456/error/2345678', // 详情页
  errorName: 'TypeError', // 错误类型（可无）
  errorMessage: 'TypeError: undefined is not an object ...', // JavaScript错误信息（可无）
  httpMethod: 'POST', // HTTP请求错误：请求方式（可无）
  httpUrl: 'https://www.fundebug.com/', // HTTP请求错误： 请求路径（可无）
  httpStatus: 500 // HTTP请求错误： 请求状态（可无）
 }
nodejs执行错误:

 {
  type: 'nodejs-error', // nodejs执行错误
  projectName: 'nodejs', // 项目名称
  numberOfUser: '10000', // 用户数
  numberOfOccurence: '100', // 出现次数
  fundebugUrl: 'https://www.fundebug.com/dashboard/123456/error/2345678', // 详情页
  errorName: 'TypeError', // 错误类型（可无）
  errorMessage: 'TypeError: undefined is not an object ...' // JavaScript错误信息（可无）
 }
