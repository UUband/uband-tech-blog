//JS原型实例：

 function A(x){
 　　this.x = x;
 }

 A.prototype.a = "a";
 console.log(typeof A);
 console.log(A);

 function B(x,y){
 　　this.y = y;
 　　A.call(this,x);
 }

 B.prototype.b1 = function(){
 　　alert("b1");
 }

 B.prototype = new A();

 B.prototype.b2 = function(){
 　　alert("b2");
 }

 B.prototype.constructor = B;

 var obj = new B(1,3);

