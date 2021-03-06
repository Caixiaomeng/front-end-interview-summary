**文本更新于 2020年04月21日 18:11:49**
## 1999 - Directly Defined Dependencies
直接定义依赖模式是由 Erik Arvidsson（TC39 成员之一） 在 1999 年首次提出。后面 Dojo toolkit 在 2004 也实现了该模式，我们通过 dojo 来举个例子：

```javascript
// file greeting.js
dojo.provide("app.greeting");

app.greeting.helloInLang = {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    cn: '你好 世界！'
};

app.greeting.sayHello = function (lang) {
    return app.greeting.helloInLang[lang];
};

// file hello.js
dojo.provide("app.hello");

dojo.require('app.greeting');

app.hello = function(x) {
    document.write(app.greeting.sayHello('es'));
};
```
在 dojo 当中，我们使用 `dojo.provide` 方法来定义模块，而通过 `dojo.require` 来使用模块。这种方式在于没有将模块和文件相关联，也就是说，在这种模式下，我们可以在一个文件里面定义多个模块。

## 2002 - namespace pattern
在 JavaScript，为了解决 name collision，我们有什么解决方案呢？
1. 通过编程惯例来约束。我们可以将同类的 variables 和 functions 标识符前面加上共同的前缀来表示这些 objects 是一类的（比如 `app_`）。这种做法非常类似于 python 中通过下划线约定私有变量（比如`__init`）。但是这种方式引入了新的问题：这些前缀该如何定义呢？如何确保这些前缀不冲突呢？

```javascript
// file app.js
var app_helloInLang = {
    en: 'hello World!'
}

var app_writeHello = function(lang) {
    document.write(app_helloInLang[lang]);
}
```
2. 每个模块都对应着一个 global object，利用 JavaScript 中函数是一等公民的特性，将同个模块的变量和方法都作为属性添加到这个 global object 当中，来达到避免 name collision 的目的。而这种模式被称为 `namespace pattern`。

> What is namespace? namespace是用来放置 identifiers, functions, methods 的容器，这个容器允许我们通过该容器来访问里面的内容。

```javascript
// file app.js
var app = {};

// file greeting.js
app.helloInLang = {
    en: 'Hello world!',
    es: '¡Hola mundo!'
};

// file hello.js
app.writeHello = function (lang) {
    document.write(app.helloInLang[lang]);
};
```
namespace pattern 是非常出名的一种模式，最初来自于 Erik Arvidsson 在 2002 的 Bindow ，后面很多的 framework 和 library 当中都有使用，比如 Dojo(2005)/YUI(2005)。

## 2003 - module pattern
尽管 namespace pattern 在某种程度上解决了 global namespace pollution(全局命名空间污染) 问题，给代码带来了部分有序性，但是这种改进并不彻底。

对于 namespace pattern 来讲，function 和 data 是混在一起的，而对于一个真正的模块，很多时候我们需要隐藏掉内部的数据，而只暴露操作内部数据的方法。

module pattern 则是尝试解决该问题的先驱。它的要点是通过 closure 来封装 data 和 code，外界只能通过有限的方式访问数据：
```javascript
var greeting = (function () {
    var module = {}; // 存放可以被外部访问的

    var helloInLang = { // 表示不可以被外部直接访问
        en: 'Hello world!'
    };

    module.getHello = function (lang) {
        return helloInLang[lang];
    };

    module.writeHello = function (lang) {
        document.write(module.getHello(lang))
    };
    
    return module;
}());
```

这里使用了 IIFE（immediately invoked function）来返回一个 module object。这种方式带来了两个好处：
- 给代码赋予原子性，可以确保在外界无法直接访问 module 中的数据
- 利用 function scope 解决了 name collision

这种方式，首先由 Richard Cornford 在 2003 年使用，但其广为流传则是由于 Douglas Crockford 在 2008 年写的书《JavaScript: the Good Parts》 和 YUI(Eric Miraglia 在 2007 年的blog) 。尽管在 2020 年的当下，我们已经有了更加健壮的模块化方案，但是理解 module pattern 仍然尤其意义所在。如果研究 webpack 比较透彻的话，你会发现 module pattern 的影子无处不在。

> 正所谓，“虽然世上已无我的身影，但我却无处不在”

### module pattern - in depth
本小节，更加深入的探讨下 module pattern 的使用。

对于 module pattern 来讲，其中一个限制就是整个 module 必须在一个文件当中，而某些时候我们希望在不同的文件中不断增强这个 module。

为什么需要呢？ 
因为我们可能由于 code split 的原因而操作同一个 module。

此时我们可以采用如下的方式：
```javascript
var MODULE = (function (my) {
    my.anotherMethod = function () {};

    return my;
}(MODULE));

```
如此，我们就通过增强的方式给 MODULE 添加了一个新的方法，并且该增强的文件仍然可以维护自己的内部状态(internal state) 和 imports。

**上面的写法是否有问题呢？**

对于浏览器端来讲，我们为了性能，会非常希望能够异步的加载 js 文件（像 LABjs 一样），而这带来的问题是我们无法预知哪个js文件会被 最先加载。如果 initial module 的文件没有被最先加载的话，那么 MODULE 就等于 `undefined`，也就不是我们想要的结果了。
因此，我们可以采用 `loose augmentation` 的写法：
```javascript
var MODULE = (function (my) {

    return my;
}(MODULE || {}))
```

> 有时候解决了一个问题却引入了多个新的问题。

异步带来了新的问题：覆盖的无序性。有时候旧的会覆盖新的。此时我们可以采用 `tight augmentation`:
```javascript
var MODULE = (function (my) {
	var old_moduleMethod = my.moduleMethod;

	my.moduleMethod = function () {
		// method override, has access to old through old_moduleMethod...
	};

	return my;
}(MODULE));
```
## template defined Dependencies(2006)


## reference
1. [](http://blog.calyptus.eu/seb/2011/10/choosing-a-javascript-module-syntax/)
2. [](https://github.com/myshov/history-of-javascript/blob/master/4_evolution_of_js_modularity/README.md)
