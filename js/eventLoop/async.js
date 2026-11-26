// function A() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('a');
//             resolve()
//         }, 1000)
//     })
// }

// function B() {
//     console.log('b');
// }


// A().then(()=>{
//     B()
// })


function A(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('a');
            resolve()
        }, 1000)
    })
}


function B(){
    console.log('b');
}


async function foo() {      // async 会让函数返回一个 Promise对象
    await A()   // await 只能约束 Promise对象
    B()
}
// await 让右侧代码变成了同步代码执行，await会让后续代码进入微任务队列
console.log(foo());

