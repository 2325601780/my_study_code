function xq() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('3天后相亲结束')
            resolve()
        }, 3000)
    })
}

function marry() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('结婚了')
            resolve()
        }, 2000)

    })
}

function baby() {
    setTimeout(() => {
        console.log('baby出生了')
    }, 1000)
}

xq().then(() => {    // 相亲成功后，返回一个 Promise实例对象，它的状态是继承前面的 Promise的实例对象的状态
    return marry()  // 如果我们在 then 中返回的是 Promise实例对象，那么 then 就不会启用自己的返回，而是继承这个 Promise实例对象的状态
}).then(()=>{
    baby()
})



