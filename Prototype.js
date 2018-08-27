"use strict";

// 1.构造函数
function Dog(name, age) {
    this.name = name;
    this.age = age;
}

let dog1 = new Dog("哈士奇", 3);
let dog2 = new Dog("泰迪", 2);

//在js中，所有对象都是Object的实例，并继承Object.prototype的属性和方法，但是有一些是隐性的
// 1.所有的引用类型（包括数组，对象，函数）都具有对象特性；可自由扩展属性。

var obj = {};
obj.attribute = "三座大山";
var arr = [];
arr.attribute = "三座大山";
function fn1() { }
fn1.attribute = "三座大山";

// 2.所有的引用类型（包括数组，对象，函数）都有隐性原型属性（__proto__）,值也是一个普通的对象。
console.log(obj.__proto__);

// 3.所有的函数，都有一个prototype属性，值也是一个普通的对象。
console.log(obj.prototype);

// 4.所有的引用类型的__proto__属性值都指向构造函数的prototype属性值。
console.log(obj.__proto__ === Object.prototype); // true

// 5.当试图获取对象属性时，如果对象本身没有这个属性，那就会去他的__proto__（prototype）中去寻找。
function Dog(name) {
    this.name = name;
}
Dog.prototype.callName = function () {
    console.log(this.name, "wang wang");
}
let dog1 = new Dog("Three Mountain");
dog1.printName = function () {
    console.log(this.name);
}
dog1.callName();  // Three Mountain wang wang
dog1.printName(); // Three Mountain


//作用域及闭包
//  执行上下文。每个函数都有自己的excution context，和variable object。这些环境用于储存上下文中的变量，函数声明，参数等。只有函数才能制造作用域。

console.log(a); // undefined
var a = 1;

//可理解为
var a;
console.log(a);  // undefined
a = 1;

// this
// 在js里this是一个指向函数执行环境的指针。this永远指向最后调用它的对象，并且在执行时才能获取值，定义是无法确认他的值。

var a = {
    name: "A",
    fn: function () {
        console.log(this.name)
    }
}
a.fn() // this === a 
// a 调用了fn() 所以此时this为a

a.fn.call({ name: "B" }) // this === {name : "B"} 
// 使用call(),将this的值指定为{name:"B"}

var fn1 = a.fn
fn1() // this === window
// 虽然指定fn1 = a.fn，但是调用是有window调用，所以this 为window

// this有多种使用场景，下面主要介绍4个使用场景：

// 1.作为构造函数执行

function Student(name, age) {
    this.name = name           // this === s
    this.age = age             // this === s
    //return  this
}
var s = new Student("py1988", 30)
// 首先new 字段会创建一个空的对象，然后调用apply()函数，将this指向这个空对象。这样的话，函数内部的this就会被空对象代替。

// 2.作为普通函数执行

function fn() {
    console.log(this)       // this === window
}
fn()
// 3.作为对象属性执行


var obj = {
    name: "A",
    printName: function () {
        console.log(this.name)  // this === obj
    }
}
obj.printName()



// 4.call(),apply(),bind()

// 三个函数可以修改this的指向，具体请往下看：


var name = "小明", age = "17"
var obj = {
    name: "安妮",
    objAge: this.age,
    fun: function () {
        console.log(this.name + "今年" + this.age)
    }
}
console.log(obj.objAge) // 17 
obj.fun() // 安妮今年undefined

var name = "小明", age = "17"
var obj = {
    name: "安妮",
    objAge: this.age,
    fun: function (like, dislike) {
        console.log(this.name + "今年" + this.age, "喜欢吃" + like + "不喜欢吃" + dislike)
    }
}
var a = { name: "Jay", age: 23 }
obj.fun.call(a, "苹果", "香蕉") // Jay今年23 喜欢吃苹果不喜欢吃香蕉 
obj.fun.apply(a, ["苹果", "香蕉"]) // Jay今年23 喜欢吃苹果不喜欢吃香蕉 array
obj.fun.bind(a, "苹果", "香蕉")() // Jay今年23 喜欢吃苹果不喜欢吃香蕉
// 首先call，apply，bind第一个参数都是this指向的对象，call和apply如果第一个参数指向null或undefined时，那么this会指向windows对象。

// call，apply，bind的执行方式如上例所示。call，apply都是改变上下文中的this，并且是立即执行的。
// bind方法可以让对应的函数想什么时候调用就什么时候调用。


// 闭包
// 能够读取函数内部变量的函数

// 用途主要有两个：

// 1）前面提到的，读取函数内部的变量。

// 2）让变量值始终保持在内存中。