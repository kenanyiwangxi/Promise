/*
    静态方法
        Promise.resolve() 创建一个立即完成的Promise
        Promise.reject() 创建一个立即拒绝的Promise
        Promise.all([...]) 同时返回多个Promise执行结果,其中一个报错,就返回错误 成功返回结果为数组：[ 579, 9, 13 ]
        Promise.allSettled([...]) 同时返回多个Promise执行结果(无论成功或失败) 返回结果为对象
             { status: 'fulfilled', value: 579 }
             { status: 'rejected', reason: '报错喽' }
        Promise.race() 返回执行最快的Promise(无论对错)
        Promise.any() 返回执行最快的Promise(完成的),如果都是错误的才返回错误结果
*/

Promise.resolve(10).then(r => console.log(r))
Promise.reject('错误').catch(r => console.log(r))
// 相当于
// new Promise((resolve, reject) => {
//     resolve(10)
//     reject('错误')
// // })

function sum(a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 1000)
    })
}


// Promise.all([
//     sum(123, 456),
//     sum(4, 5),
//     Promise.reject('报错喽'),
//     sum(6, 7)
// ]).then(r => console.log(r))

// Promise.allSettled([
//     sum(123, 456),
//     sum(4, 5),
//     Promise.reject('报错喽'),
//     sum(6, 7)
// ]).then(r => console.log(r))

// Promise.race([
//     Promise.reject(11),
//     sum(123, 456),
//     sum(4, 5),
//     sum(6, 7)])
//     .then(r => console.log(r))
//     .catch(r => console.log('错误'))

Promise.any([
    Promise.reject(11),
    sum(123, 456),
    sum(4, 5),
    sum(6, 7)])
    .then(r => console.log(r))
    .catch(r => console.log('错误'))

Promise.any([
    Promise.reject(11),
    Promise.reject(13),
    Promise.reject(13)])
    .then(r => console.log(r))
    .catch(r => console.log('错误'))
