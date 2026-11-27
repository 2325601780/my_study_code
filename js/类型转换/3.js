// 对象转换为字符串

let a = {}

console.log(a);
console.log(a.toString());
console.log(a.valueOf());   // 把包装对象转换为基本类型

console.log(String(a));
// 对象转字符串
//a.toString();  ==>  ToObject(a)    ==>  a  ==>  Object  ==>  '[object Object]'
//1.toString()  ==>  ToObject(1)  ==>  1  ==>  Number  ==>  '[object Number]'

// 对象转数字
console.log(Number(a)); // ==> ToNumber(a)  ==>
// let primitive = ToPrimitive(a, 'number');   
// 1. 调用 valueOf() 方法
// 2. 调用 toString() 方法  ==>   primitive == '[object Object]'
// ToNumber(primitive)

