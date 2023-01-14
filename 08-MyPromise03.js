/*
    定义类的思路
        1.先把功能都分析清楚了,再动手
        2.写一点想一点,走一步看一步
*/
// 创建一个对象来记录Promise的状态
// pending:0 fulfilled:1 rejected:2
const PROMISE_STATE = {
    PENDING: 0,
    FULFILLED: 1,
    REJECTED: 2
}

class MyPromise {

    // 创建一个变量用来存储数Promise的结果
    #result
    // 创建一个变量来记录Promise的状态
    // pending:0 fulfilled:1 rejected:2
    #state = PROMISE_STATE.PENDING

    // 创建一个变量来存储回调函数
    // 由于回调函数可以能有多个,所以使用数组来存储
    #callbacks = []

    constructor(executor) {
        // 接收一个 执行器 作为参数
        executor(this.#resolve.bind(this), this.#reject.bind(this)) // 调用回调函数
    }

    // 私有的resolve() 用来存储成功的数据
    #resolve(value) {
        if (this.#state !== PROMISE_STATE.PENDING) {
            return
        }
        this.#result = value
        this.#state = PROMISE_STATE.FULFILLED // 数据填充成功

        // 当resolve执行时，说明数据已经进来了,需要调用then的第一个回调函数
        // this.#callbacks.length &&
        queueMicrotask(() => {
            this.#callbacks.forEach(cb => {
                cb()
            })
        })
    }

    // #resolve = (value) => {
    // }

    // 私有的reject() 用来存储拒绝的数据
    #reject(reason) {

    }

    // 添加一个用来读取数据的then方法
    then(onFulfilled, onRejected) {
        if (this.#state === PROMISE_STATE.PENDING) {
            // 进入判断说明数据还没有进入Promise,将回调函数设置为callback值
            // this.#callback = onFulfilled
            this.#callbacks.push(() => {
                onFulfilled(this.#result)
            })
        } else if (this.#state === PROMISE_STATE.FULFILLED) {
            /*
                目前来讲,then只能读取已经存储进Promise的数据,而不能读取异步存储的数据
            */

            // then的回调函数，一个放入到微任务队列中执行，而不是直接调用
            queueMicrotask(() => onFulfilled(this.#result))
        }
    }

}

const mp = new MyPromise((resolve, reject) => {
    setTimeout(() => {
    resolve('孙悟空')
    }, 1000)
})
console.log(mp)
mp.then(result => {
    console.log('读取数据第一次 ' + result)
})
mp.then(result => {
    console.log('读取数据第二次 ' + result)
})
