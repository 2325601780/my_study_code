let s = 'hello'
let n = 123
let b = true
let u = undefined
let nul = null
let sym = Symbol('s')
let bg = BigInt(123)


let obj ={}
let arr = []
let fn = function() {}
let date = new Date()


console.log(Object.prototype.toString.call(arr).slice(8, -1));
// Object.prototype.toString 它会读取对象值的内部属性 [[class]]，而这个属性就是这个值的类型名
console.log();

