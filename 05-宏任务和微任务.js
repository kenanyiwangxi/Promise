// 开启一个定时器
// 定时器的作用是间隔一段时间后,将函数放入到任务队列中
// setTimeout(()=> {
//     console.log(1)
// })

/*
    Promise执行原理
        -Promise在执行时,then相当于给Promise回调函数
            当Promise的状态从pending变为fulfilled时，then的回调函数会被放入任务队列中
*/
// Promise.resolve(1).then(r => {
//     console.log(2)
// })
// console.log(3)

/*
    queueMicrotask() 用来向微任务队列中添加一个任务
*/
// queueMicrotask(() => {
//     setTimeout(() => {
//         console.log('a')
//     })
// })
// setTimeout(() => {
//     console.log('b')
// })

// Promise.resolve().then(r => {
//     console.log(0)
//     Promise.resolve().then(r => {
//         console.log(1)
//     })
// })


// Promise.resolve().then(r => {
//     console.log(1)
// })
// console.log(1)

/*
    JS是单线程的，它的运行时基于事件循环机制(event loop)
        -调用栈
            -栈
                栈是一种数据结构,后进先出
            -调用栈中,放的是要执行的代码
        -任务队列
            -队列
                队列是一种数据结构,先进先出
            -任务丢列的是将要执行的代码
            -当调用栈中的代码执行完毕后,队列中的代码才会按照顺序依次进入到栈中执行
            -在JS任务队列有两种
                -宏任务队列 (大部分代码都去宏任务队列中去排队)
                -微任务队列 (Promise的回调函数(then,catch,finally))
            -整个流程
                ① 执行调用栈中的代码
                ② 执行微任务队列中的所有任务
                ③ 执行宏任务队列中的所有任务
*/

queueMicrotask(() => {
    setTimeout(() => {
        console.log('a')
    })
})
setTimeout(() => {
    console.log('b')
})
console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => console.log(3));

Promise.resolve().then(() => setTimeout(() => console.log(4)));

Promise.resolve().then(() => console.log(5));

setTimeout(() => console.log(6));

console.log(7);

// 调用栈：1 7
// 微任务：空(a) 3 空(4) 5
// 宏任务：b 2 6 a 4
// 1 7 3 5 b 2 6 a 4