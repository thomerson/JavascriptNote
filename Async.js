// javascript异步的发展历程。
// ES6 以前：
// 　　回调函数（callback）；nodejs express 中常用，ajax中常用。
// ES6：
// 　　promise对象； nodejs最早有bluebird promise的雏形，axios中常用。
// 　　generator函数；nodejs koa框架使用率很高。
// ES7:
// 　　async/await语法； 当前最常用的异步语法，nodejs koa2 完全使用该语法。

// 回调函数callback
// 回调函数实际就是一个参数；将一个函数当做参数传到另一个函数里，当那个函数执行完后，再执行传进去的这个函数；这个过程就叫做回调

// promise对象
// promise 对象用于一个异步操作的最终完成（或最终失败）及其结果的表示。
// promise的中文含义：断言，一个成功，一个失败。
// promise构造函数的参数是一个函数，我们把它称为处理器函数，处理器函数接收两个函数reslove和reject作为其参数，当异步操作顺利执行则执行reslove函数, 当异步操作中发生异常时，则执行reject函数。通过resolve传入得的值，可以在then方法中获取到，通过reject传入的值可以在chatch方法中获取到。
// ​因为then和catch都返回一个相同的promise对象，所以可以进行链式调用。
function readFileByPromise(path) {
    //显示返回一个promise对象
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
}
//Or
readFileByPromise("a.txt").then(data => {
    //打印文件中的内容
    console.log(data);
}).catch(error => {
    //抛出异常，
    console.log(error);
})

// generator函数
// ES6的新特性generator函数，中文译为生成器
// 以前一个函数中的代码要么被调用，要么不被调用，还不存在能暂停的情况，generator让代码暂停成待执行，定义一个生成器很简单，在函数名前加个*号,使用上也与普通函数有区别。

function* Calculate(a, b) {
    let sum = a + b;
    console.log(sum);
    let sub = a - b;
    console.log(sub);
}

// //   generator函数不能直接调用，直接调用generator函数会返回一个对象,只有调用该对象的next()方法才能执行函数里的代码。

// yield能将生Generator函数的代码逻辑分割成多个部分
function* Calculate(a, b) {
    let sum = a + b;
    yield console.log(sum);
    let sub = a - b;
    yield console.log(sub);
}
let gen = Calculate(2, 7);
gen.next();

function readFile(path) {
    fs.readFile(path, "utf8", function (err, data) {
        it.next(data);
    })
}

function* main() {
    var result1 = yield readFile("a.txt");
    console.log(result1);

    var result2 = yield readFile("b.txt");
    console.log(result2);

    var result3 = yield readFile("c.txt");
    console.log(result3);
}

var it = main();
it.next(); 

// generator函数的强大在于允许你通过一些实现细节来将异步过程隐藏起来，依然使代码保持一个单线程、同步语法的代码风格

async-await

// async函数返回一个promise对象，如果在async函数中返回一个直接量，async会通过Promise.resolve封装成Promise对象。
// 我们可以通过调用promise对象的then方法，获取这个直接量。
function A() {
    return "Hello ";
}

async function B(){
    return "World";
}

async function C(){
    //等待一个字符串
    var s1=await A();
    //等待一个promise对象，await的返回值是promise对象resolve的值，也就是"World"
    var s2=await B();
    console.log(s1+s2);
}

C();
//打印"Hello World"


async function testAsync() {
    return "hello async";
}

const result = testAsync();
console.log(result); //输出的是一个 Promise 对象

testAsync().then(v => {
    console.log(v);    // 输出 hello async
});


// 不用 async/await 会怎么写

function takeLongTime() {
    return new Promise(resolve => {
        setTimeout(() => resolve("long_time_value"), 1000);
    });
}

takeLongTime().then(v => {
    console.log("got", v);
});
// 如果改用 async/await 呢，会是这样

function takeLongTime() {
    return new Promise(resolve => {
        setTimeout(() => resolve("long_time_value"), 1000);
    });
}

async function test() {
    const v = await takeLongTime();
    console.log(v);
}

test();