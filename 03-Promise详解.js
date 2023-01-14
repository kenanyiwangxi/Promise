// Promise就是一个用来存储数据对象
// 但是由于Promise存取方式的特殊，所以可以直接将异步调用的结果存储到Promise中
// 对Promise进行链式调用时
// 后边的方法(then和catch)读取的上一步的执行结果
//      如果上一步的执行结果不是当前想要的结果,则跳过当前的方法

/*
    当Promise出现异常时,而整个调用链中没有出现catch，则异常会向外抛出
*/
const promise = new Promise((resolve, reject) => {
    reject('你好啊,Promise')
})

promise
    .then(result => '哈哈哈')
    .catch(result => {
        console.log('异常' + result)
        throw new Error('错误')
        return '嘻嘻嘻'
    })
    .then(result => console.log(result))
    .catch(reason => '哈哈哈')
    .then(result => console.log(result))

/*
    Promise中的
        then (return new Promise())
        catch
        finally
        -这三个方法都会返回一个新的Promise，Promise中会存储回调函数的返回值
        finally
            -finally的返回值，不会存储到新的Promise中
*/

// promise.then(result => {
//     return result
// }).then(result => {
//     console.log('第二个', result)
//     return '我是第二个'
// }).then(result => {
//     console.log('第三个', result)
// })

// function sum(a, b, cb) {
//     setTimeout(() => {
//         cb(a + b)
//     })
// }
//
// sum(123, 456, result => {
//     console.log(result)
// })

// function sum(a, b) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(a + b)
//         }, 1000)
//     })
// }
//
// sum(123, 456)
//     .then(result => result + 7)
//     .then(result => result + 8)
//     .then(result => result + 9)
//     .then(result => console.log(result))
