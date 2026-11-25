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


console.log(obj instanceof Object);
console.log(arr instanceof Array);    // arr.__proto__ === Array.prototype 
                                      // Array.prototype.__proto__ === Object.prototype
console.log(fn instanceof Function);
console.log(date instanceof Date);

console.log(s instanceof String);
console.log(n instanceof Number);
console.log(b instanceof Boolean);
// console.log(u instanceof Undefined);
// console.log(nul instanceof Null);
console.log(sym instanceof Symbol);
console.log(bg instanceof BigInt);

console.log(arr instanceof Object);