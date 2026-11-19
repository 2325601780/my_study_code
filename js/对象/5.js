var obj = {}
obj.a = 1

var str = 'hello'  // new String('hello')
str.a = 2    // 往字符串对象上添加一个属性 a
// str 是原始类型，不能添加属性 会delete str.a
console.log(str.a);   // 不报错 读取的是[[PrimitiveValue]]
console.log(str.length);


// 1.只要读取 str，就会发现[[PrimitiveValue]]
