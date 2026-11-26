function Promise(fn) {
    this.status = 'pending'
    this.arr = []

    const resolve = () =>{
        this.status = 'fulfilled'   // 成功
        for(let i = 0; i < this.arr.length; i++){
            this.arr[i]()
        }
    }
    const reject = () =>{
        this.status = 'rejected'    // 失败
    }

    fn(resolve, reject)
}

Promise.prototype.then = function (success, fail) {
    this.arr.push(success)
}

let p = new Promise((resolve, reject)=>{
    setTimeout(() => {
        resolve()
    }, 3000)
})

p.then(()=>{    // then 里面的代码想要执行，必须要保证 then 前面的 Promise的状态是 fulfilled
    console.log('成功')
})

