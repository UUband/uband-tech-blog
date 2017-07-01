
function fn1(){};
var fn2 = function(){};
var fn3 = new Function();
var fn4 = Function();

var obj1 = new fn1();
var obj2 = {};
var obj3 = new Object();
var obj4 = Object();

console.log(typeof fn1);//function
console.log(typeof fn2);//function
console.log(typeof fn3);//function
console.log(typeof fn4);//function

console.log(typeof obj1);//object
console.log(typeof obj2);//object
console.log(typeof obj3);//object
console.log(typeof obj4);//object


var Moqi = function(p1){
    this.add = function (p2){
        return p1 + ' ' + p2;
    };
    return add;
};

console.log(Moqi('Hello')('World'));
