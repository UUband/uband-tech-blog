# 404-Blog
## Javascript 学习

Js可直接与HTML元素进行交互。大段代码写在script标签内部，或者外部Js文件中。建议写在<head>或者页面底部。
```
<script>code</script>
<script src="code.js"></script>
```
***

Js语法浅显易懂。

#### 声明
```
var i; // 值为undefined
var v = new String; // 或者用new声明变量类型。变量均为对象
var i = 5; // 值为5
var i = "var_i"; // 弱类型;字符串可以用单引号或双引号标记。
var i; // 重新声明值不变
```

#### 数据类型
```
var
  vi = 6,
  vj = 6.00,
  vk = 6e3;
  // 只有一种数字类型，可带小数点或科学记数法表示，所有JavaScript数字均为64位
  // 浮点运算有误差

var
  oct = 0377,
  hex = 0xFF;
  // 0开头的数字为八进制，0x开头的数字为16进制

  // 支持各种运算符: + - * / % = ++ -- += -= *= /= %=
  // 以及各种比较运算符: == === != > < >= <=
 
  // 以及位运算符 & | ~ ^ << >>

vi.toString(2); // 将vi转换为2进制，返回字符串
```
TODO: [Number对象方法](http://www.w3school.com.cn/jsref/jsref_obj_number.asp)
```
var
  s = '';
```
TODO: [String对象方法](http://www.w3school.com.cn/jsref/jsref_obj_string.asp)
```
var
  myDate = new Date(); // 并非undefined，而是当前时间
var
  tomorrow = new Date();
  tomorrow.setDate(myDate.getDate()+5);
tomorrow > myDate;
```
```
var
  b = true; // 布尔类型true和false
b = new Boolean();
// 如果逻辑对象无初始值或者其值为 0、-0、null、""、false、undefined 或者 NaN，那么对象的值为 false。否则，其值为 true（即使当自变量为字符串 "false" 时）。 

//c基本一致
```
```
var arr = new Array(); // 值为[]
var arr = new Array(1, 'new', 'array'); // 元素可为不同类型
arr = [];
// 与python基本一致
```
TODO: [Array对象方法](http://www.w3school.com.cn/jsref/jsref_obj_array.asp)

```
//TODO: null
```
```
//TODO: undefined
```

#### 函数
```
function func() { // 可无参
  var x = 5; // 此变量作用域为函数内部
  i = 1; // 这是一个全局变量
  return x; // 可有返回值
}
function func(a, b) { // 函数可有参数
  if (a > b)
    return; // 可无返回值 aka. undefined
  else
    document.write(a + b);
}
```
#### 条件
```
x ? y : z; // 三目运算符

if (x) {
  y;
}
else {
  Z;
}

switch (x) {
case 1:
  // do sth
  break;
case 2:
  // sth else
  break;
default:
  // sth
}
```
#### 循环
```
var max = 1;
for (var i = 0; i < max; ++i) {
  // do sth
}

var person={fname:"John",lname:"Doe",age:25}, txt;
for (x in person) {
  txt = txt + person[x];
} // txt值为BillGates56

while (b) {
  // do sth
}

do {
  // do sth
} while (b);
```
```
break; continue;
break labelName; continue labelName;
// 这里可以跳出或跳过一个代码块
cars=["BMW","Volvo"];
list:
{
  document.write(cars[0] + "<br>");
  document.write(cars[1] + "<br>");
  document.write(cars[2] + "<br>");
  break list;
  document.write(cars[3] + "<br>");
  document.write(cars[4] + "<br>");
  document.write(cars[5] + "<br>");
}
// 输出:
// BMW
// Volvo
// undefined
```
#### 异常
```
try {
  throw "wrong"; // 异常可以是 JavaScript 字符串、数字、逻辑值或对象。
}
catch (err) {
  // err为捕获的错误
}
```
或者
```
try {
  adddlert("Welcome guest!");
}
catch(err) {
  txt = err;  // ReferenceError: adddlert is not defined
  // err为对象, 有name和message两个属性
}
```
#### DOM
```
document.write("some_text"); // 写入当前页面，覆盖文档
document.getElementById('the_Id_you_need').innerHTML;
document.getElementById("image").src="landscape.jpg";
// getElement系列函数定位HTML元素。innerHTML可直接操作HTML内容。attribute可直接修改属性。
```
TODO: [属性](http://www.w3school.com.cn/jsref/dom_obj_style.asp)
```
var para=document.createElement("p");
var node=document.createTextNode("这是新段落。");
para.appendChild(node);
var element=document.getElementById("div1");
element.appendChild(para);
// 向元素添加子元素
var parent=document.getElementById("div1");
var child=document.getElementById("p1");
parent.removeChild(child);
// 从元素删除子元素
var child=document.getElementById("p1");
child.parentNode.removeChild(child);
// 不定位父节点的删除方法
```
```
<input type="text" id="fname" onchange="upperCase()">
// 可添加事件
```
TODO: [事件](http://www.w3school.com.cn/jsref/dom_obj_event.asp)

#### 对象
```
var person={
  firstname : "Bill",
  lastname : "Gates",
  id : 5566
};
name = person.lastname;
name = person["lastname"];
// 对象可具有属性和方法。
```
##### 构造对象
直接创建
```
person=new Object();
person.firstname="Bill";
person.lastname="Gates";
person.age=56;
person.eyecolor="blue";
```
或者
```
person={firstname:"John",lastname:"Doe",age:50,eyecolor:"blue"};
```
函数构造
```
function person(firstname,lastname,age,eyecolor)
{
this.firstname=firstname;
this.lastname=lastname;
this.age=age;
this.eyecolor=eyecolor;
}
var myFather=new person("Bill","Gates",56,"blue");
```
**JavaScript 是面向对象的语言，但 JavaScript 不使用类。
在 JavaScript 中，不会创建类，也不会通过类来创建对象（就像在其他面向对象的语言中那样）。
JavaScript 基于 prototype，而不是基于类的。**

#### 正则表达式
```
var patt1=new RegExp("e");
```
TODO: [RegExp对象手册](http://www.w3school.com.cn/jsref/jsref_obj_regexp.asp)

***
#### JS Window
Js可以从浏览器处获取信息，并与之交互。
* window 窗口大小等
* screen
* location
* history 获取历史，后退或前进
* navigator 浏览器用户信息
* popupalert 弹窗
* timing 计时事件
* cookies


