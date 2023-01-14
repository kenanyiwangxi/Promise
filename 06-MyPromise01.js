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
    }

    // #resolve = (value) => {
    // }

    // 私有的reject() 用来存储拒绝的数据
    #reject(reason) {

    }

    // 添加一个用来读取数据的then方法
    then(onFulfilled, onRejected) {
        if (this.#state !== PROMISE_STATE.FULFILLED) return
        onFulfilled(this.#result)
    }
}

const mp = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('孙悟空')
    }, 1000)
})
console.log(mp)
mp.then(result => {
    console.log(result)
}, reason => {

})