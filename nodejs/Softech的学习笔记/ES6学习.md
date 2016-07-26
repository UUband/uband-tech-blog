# 404-Blog
## ES6 学习
ECMAScript 6（简称ES6）是JavaScript语言的下一代标准，已经在2015年6月正式发布了。它的目标，是使得JavaScript语言可以用来编写复杂的大型应用程序，成为企业级开发语言。
ECMAScript和JavaScript的关系是，前者是后者的规格，后者是前者的一种实现（另外的ECMAScript方言还有Jscript和ActionScript）。在日常场合，这两个词是可以互换的。
*主要为摘抄[《ECMAScript 6入门》](http://es6.ruanyifeng.com/)*
***
#### 作用域

##### 块级作用域 (ES6)
###### 以一对 { } 括起来的代码块为一个作用域
* ES6允许块级作用域的任意嵌套。
* 明确允许在块级作用域之中声明函数，该函数在块级作用域之外不可引用。
* 块级作用域内变量、函数不影响外界。

**考虑到** *浏览器环境* **导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。**
```
// 函数声明语句
{
  let a = 'secret';
  function f() {
    return a;
  }
}

// 函数表达式
{
  let a = 'secret';
  let f = function () {
    return a;
  };
}
```

##### 全局作用域 & 函数作用域 (ES5)
###### 变量提升导致难以发现的Bug
ES5中，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。
可使用立即*执行匿名函数 (IIFE)*
```
(function () {
  //do sth
}());
```
达到类似块级作用域的效果。

*ES6规定了* **暂时性死区** *， 不存在* **变量提升** *。*

#### let
let：在作用域内有效 <> var：全局有效


let不允许重复声明变量。用var也不行。

#### const
const声明一个只读的常量。一旦声明，常量的值就不能改变。

对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变。
如果真的想将对象冻结，应该使用**Object.freeze**方法。
```
const foo = Object.freeze({});
// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```

#### 暂时性死区
**如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。**

暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

*QUESTION: 也就是说，作用域内不能引用全局变量?*

#### 全局变量
###### aka. 全局对象的属性 (in ES5)
全局对象是最顶层的对象，在浏览器环境指的是window对象，在Node.js指的是global对象。ES5之中，全局对象的属性与全局变量是等价的。
ES6一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是全局对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于全局对象的属性。也就是说，从ES6开始，全局变量将逐步与全局对象的属性脱钩。
***
#### 变量的解构赋值
##### 数组的解构赋值
###### 模式匹配
只要等号两边的模式相同，左边的变量就会被赋予对应的值。适用于var, let, const。
*QUESTION: 在NodeJS中，可以对未声明的变量解构赋值，这是容错吗？*

// 类似Python中tuple赋值的形式。
```
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
```
另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。
```
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
```
如果解构不成功，变量的值就等于undefined。这里不会报错。
```
var [foo] = [];
var [bar, foo] = [1];
```
如果等号的右边不是可遍历的结构（具备Iterator接口），那么将会报错。
```
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```
##### 对象的解构赋值
数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
解构赋值允许，等号左边的模式之中，不放置任何变量名。
```
var { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

var { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined

({} = 'abc'); // legal
({} = []); // legal
```
如果变量名与属性名不一致，必须写成下面这样。
```
var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```
对象的解构也可以指定默认值。
```
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x:y = 3} = {};
y // 3

var {x:y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"
```
默认值生效的条件是，对象的属性值严格等于undefined。
##### 原理
对象的解构赋值是下面形式的简写。也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
```
var { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
var { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
```
上面代码中，真正被赋值的是变量baz，而不是模式foo。
```
var {foo: {bar}} = {baz: 'baz'}; // 报错
// 该代码等价于
var _tmp = {baz: 'baz'};
_tmp.foo.bar // 报错
```
**如果要将一个已经声明的变量用于解构赋值，必须非常小心。**
let命令下面一行的圆括号是必须的，否则会报错。因为解析器会将起首的大括号，理解成一个代码块，而不是赋值语句。
```
var x;
let baz;

// 错误的写法
{x} = {x: 1};
var {foo: {bar}} = {baz: 'baz'};

// 正确的写法
({x} = {x: 1});
({bar: baz} = {bar: 1}); 
```

圆括号不能乱用。

##### 特殊对象的解构赋值
* 现有对象
* 数组
* 字符串
* 数值和布尔值
```
let { log, sin, cos } = Math;
```
```
var arr = [1, 2, 3];
var {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```
```
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"

let {length : len} = 'hello';
len // 5
```
```
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```
**解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象。**

由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
```
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

##### 函数参数的解构赋值
###### 传参数进函数，然后参数进行解构赋值
```
function add([x, y]){
  return x + y;
}
add([1, 2]); // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]
```

*看到这里大概已经晕掉了。只要记住一点：* 
**说了这么多，就是个花式批量赋值！**

##### 变量的解构赋值用途
###### 重点！重点！
* 交换变量的值
* 从函数返回多个值
* 函数参数的定义
* 提取JSON数据
* 函数参数的默认值
* 遍历Map结构
* 输入模块的指定方法

***
#### 字符串的扩展
##### 字符的Unicode表示
JavaScript共有6种方法可以表示一个字符。
```
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
```
对于4个字节的字符，JavaScript不能正确处理，字符串长度会误判为2，而且charAt方法无法读取整个字符，charCodeAt方法只能分别返回前两个字节和后两个字节的值。

ES6提供了codePointAt方法，能够正确处理4个字节储存的字符，返回一个字符的码点。
codePointAt方法返回的是码点的十进制值，如果想要十六进制的值，可以使用toString方法转换一下。
```
var s = "𠮷a";

s.length // 3
s.charAt(0) // ''
s.charAt(1) // ''
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271
s.codePointAt(0) // 134071
s.codePointAt(1) // 57271

s.charCodeAt(2) // 97
s.codePointAt(2) //97

s.codePointAt(0).toString(16) // "20bb7"
s.charCodeAt(2).toString(16) // "61"
```
codePointAt方法的参数，仍然是不正确的。比如，上面代码中，字符a在字符串s的正确位置序号应该是1，但是必须向charCodeAt方法传入2。解决这个问题的一个办法是使用for...of循环，因为它会正确识别32位的UTF-16字符。

codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。
```
function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}

is32Bit("𠮷") // true
is32Bit("a") // false
```

ES5提供了String.fromCharCode方法，不能识别32位的UTF-16字符（Unicode编号大于0xFFFF）。

ES6提供了String.fromCodePoint方法，可以识别0xFFFF的字符。如果String.fromCodePoint方法有多个参数，则它们会被合并成一个字符串返回。
```
String.fromCharCode(0x20BB7)
// "ஷ"
String.fromCodePoint(0x20BB7)
// "𠮷"
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
// true
```

##### 字符串
ES6为字符串添加了遍历器接口，使得字符串可以被for...of循环遍历。
除了遍历字符串，这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。

```
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"
```

ES6提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为Unicode正规化。
```
'\u01D1'.normalize() === '\u004F\u030C'.normalize()
// true
```
**具体编码处理要按照ES6的标准……当然，浏览器的决定权也是很重要的。**

###### 几个方法 

* indexOf() : 返回布尔值，表示一个字符串是否包含在另一个字符串中。
* includes()：返回布尔值，表示是否找到了参数字符串。
* startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
* endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。

这几个方法都支持第二个参数，表示开始搜索的位置。

* repeat() : 返回一个新字符串，表示将原字符串重复n次。

参数如果非整数，会被转换为整数；如果是负数或者Infinity，会报错。


##### 模板字符串
模板字符串（template string）是增强版的字符串，用反引号（\`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
模板字符串中嵌入变量，需要将变量名写在${}之中。大括号内部可以放入任意的JavaScript表达式，可以进行运算，引用对象属性，调用函数。如果大括号中的值不是字符串，将按照一般的规则转为字符串。
```
// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`

// 字符串中进行运算
var x = 1, y = 2;
`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"
`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"

// 字符串中引用对象属性
var obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// "3"

// 字符串中调用函数
function fn() {
  return "Hello World";
}
`foo ${fn()} bar`
// foo Hello World bar
```

**模板字符串的大括号内部，就是执行JavaScript代码。**

##### 标签模板
标签模板，是指模板字符串紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。

标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。

但是，如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。

```
alert`123`
// 等同于
alert(123)

var a = 5;
var b = 10;

tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', '''], 15, 50);
```
模板字符串先被切分成无变量的部分，各部分组成一个list，然后变量计算结果跟在后面。它们作为参数，或者组成list作为参数，传入函数。

###### 几个应用
* 过滤HTML字符串，防止用户输入恶意内容。
* 多语言转换。

String.raw方法，往往用来充当模板字符串的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，对应于替换变量后的模板字符串。

#### 正则的扩展
四个方法：match()、replace()、search()和split()。
对于UTF-16编码使用u修饰符。

//TODO: 再学习一个。

#### 数值的扩展
###### Number对象

* isFinite()
* isNaN()
* Number.parseInt(), Number.parseFloat()
* Number.isInteger()
* Number.EPSILON - 极小误差
* toFixed(x) - 四舍五入为小数位数x，x范围0 ~ 20，默认0
* Number.isSafeInteger() - 准确整数范围
* Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER - 准确整数上下界

* Math.trunc()
* Math.sign() - 判断正\负\零
* Math.cbrt() - 立方根
* Math.clz32() - 返回一个数的32位无符号整数形式有多少个前导0
* Math.imul() - 返回准确的低位(32位)数值
* Math.fround() - 返回一个数的单精度浮点数形式
* Math.hypot() - 返回所有参数的平方和的平方根

* Math.expm1(x) - Math.exp(x) - 1
* Math.log1p(x) - Math.log(1 + x)
* Math.log10(x)
* Math.log2(x)

* Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
* Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
* Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
* Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
* Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
* Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）

//TODO: 再学习一个。
#### 数组的扩展

* Array.from() - 将部署了Iterator接口的数据结构转为数组
* Array.of() - 将一组值转换为数组
* copyWithin(target, start = 0, end = this.length)
* find(), findIndex()
* fill() - 填充数组
* entries(), keys(), values()
```
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

//TODO: 再学习一个。
#### 函数的扩展

//TODO: 再学习一个。
#### 对象的扩展

//TODO: 再学习一个。
#### Symbol

//TODO: 再学习一个。
#### Proxy和Reflect

//TODO: 再学习一个。
#### 二进制数组

//TODO: 再学习一个。
#### Set和Map数据结构

//TODO: 再学习一个。
#### Iterator和for...of循环

//TODO: 再学习一个。
#### Generator函数

//TODO: 再学习一个。
#### Promise对象

//TODO: 再学习一个。
#### 异步操作和Async函数

//TODO: 再学习一个。
#### Class

//TODO: 再学习一个。
#### Decorator

//TODO: 再学习一个。
#### Module

//TODO: 再学习一个。
#### 编程风格

//TODO: 再学习一个。
#### 读懂规格

//TODO: 再学习一个。
#### 参考链接

//TODO: 再学习一个。
