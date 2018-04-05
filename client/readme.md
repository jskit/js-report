
## 如何捕获和分析 JavaScript Error

http://www.css88.com/archives/5014

```js
window.onerror =
  function(errorMessage, scriptURI, lineNumber) {
    reportError({
      message: errorMessage,
      script: scriptURI,
      line: lineNumber
    });
}
```

假设我们有一个 reportError 函数用来收集捕获到的异常，然后批量发送到服务器端存储以便查询分析，那么我们会想要收集哪些信息呢？比较有用的信息包括：

- 错误类型（name）
- 错误消息（message）
- 脚本文件地址（script）
- 行号（line)
- 列号（column）
- 堆栈跟踪（stack）

## 属性丢失

如果一个异常是通过 try-catch 捕获到的，这些信息都在 Error 对象上（主流浏览器都支持），所以 reportError 也能收集到这些信息。

但如果是通过 window.onerror 捕获到的，我们都知道这个事件函数只有 3 个参数，所以这 3 个参数以外的信息就丢失了。

## 序列化消息

如果 Error 对象是我们自己创建的话，那么 error.message 就是由我们控制的。基本上我们把什么放进 error.message 里面，window.onerror 的第一个参数（message）就会是什么。（浏览器其实会略作修改，例如加上 'Uncaught Error: ' 前缀。）因此我们可以把我们关注的属性序列化（例如 JSON.Stringify）后存放到 error.message 里面，然后在 window.onerror 读取出来反序列化就可以了。当然，这仅限于我们自己创建的 Error 对象。

## 第五个参数

浏览器厂商也知道大家在使用 window.onerror 时受到的限制，所以开始往 window.onerror 上面添加新的参数。考虑到只有行号没有列号好像不是很对称的样子，IE 首先把列号加上了，放在第四个参数。然而大家更关心的是能否拿到完整的堆栈，于是 Firefox 说不如把堆栈放在第五个参数吧。但 Chrome 说那还不如把整个 Error 对象放在第五个参数，大家想读取什么属性都可以了，包括自定义属性。结果由于 Chrome 动作比较快，在 Chrome 30 实现了新的 window.onerror 签名，导致标准草案也就跟着这样写了。

```js
window.onerror = function(
  errorMessage,
  scriptURI,
  lineNumber,
  columnNumber,
  error
) {
  if (error) {
    reportError(error);
  } else {
    reportError({
      message: errorMessage,
      script: scriptURI,
      line: lineNumber，
      column: columnNumber
    });
  }
}
```

## 属性正规化

我们之前讨论到的 Error 对象属性，其名称都是基于 Chrome 命名方式的，然而不同浏览器对 Error 对象属性的命名方式各不相同，例如脚本文件地址在 Chrome 叫做 script 但在 Firefox 叫做 filename。因此，我们还需要一个专门的函数来对Error 对象进行正规化处理，也就是把不同的属性名称都映射到统一的属性名称上。具体做法可以参考这篇文章。尽管浏览器实现会更新，但人手维护一份这样的映射表并不会太难。

类似的是堆栈跟踪（stack）的格式。这个属性以纯文本的形式保存一份异常在发生时的堆栈信息，由于各个浏览器使用的文本格式不一样，所以也需要人手维护一份正则表达，用于从纯文本中提取每一帧的函数名（identifier）、文件（script）、行号（line）和列号（column）。

## 安全限制

如果你也遇到过消息为 'Script error.' 的错误，你会明白我在说什么的，这其实是浏览器针对不同源（origin）脚本文件的限制。这个安全限制的理由是这样的：假设一家网银在用户登录后返回的 HTML 跟匿名用户看到的 HTML 不一样，一个第三方网站就能把这家网银的 URI 放到 script.src 属性里面。HTML 当然不可能被当做 JS 解析啦，所以浏览器会抛出异常，而这个第三方网站就能通过解析异常的位置来判断用户是否有登录。为此浏览器对于不同源脚本文件抛出的异常一律进行过滤，过滤得只剩下 'Script error.' 这样一条不变的消息，其它属性统统消失。

对于有一定规模的网站来说，脚本文件放在 CDN 上，不同源是很正常的。现在就算是自己做个小网站，常见框架如 jQuery 和 Backbone 都能直接引用公共 CDN 上的版本，加速用户下载。所以这个安全限制确实造成了一些麻烦，导致我们从 Chrome 和 Firefox 收集到的异常信息都是无用的 'Script error.'。

## CORS

想要绕过这个限制，只要保证脚本文件和页面本身同源即可。但把脚本文件放在不经 CDN 加速的服务器上，岂不降低用户下载速度？一个解决方案是，脚本文件继续放在 CDN 上，利用 XMLHttpRequest 通过 CORS 把内容下载回来，再创建 `<script>` 标签注入到页面当中。在页面当中内嵌的代码当然是同源的啦。
