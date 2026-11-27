# 弱类型语言
在定义变量的时候，不需要定义变量的类型，变量的类型是在执行期间由执行引擎自动确定的。


# == vs ===
 == 运算符会进行类型转换，而 === 运算符不会进行类型转换。


# 类型转换
 1. 显示类型转换
   1. Number(x) 将 x 转换为数字类型
   2. String(x) 将 x 转换为字符串类型
   3. Boolean(x) 将 x 转换为布尔类型
 2. 隐式类型转换
   当代码中出现 + - * / > < <= >= ! != 这些运算符时，符号的左右两边不是原始类型，v8会进行隐式类型转换，将引用类型转换为原始类型。


# valueOf()、 toString()
 valueOf() 方法可以将包装对象转换为基本类型。
 toString() 方法可以将对象转换为字符串。



# 引用类型转原始类型
 1. 引用类型转字符串
    - obj调用 toString() 方法
    - obj调用 valueOf() 方法
    - String(obj)  ==>  ToObject(obj)  ==> obj.toString()   ==> '[object Object]'
                                          对象原型上的 toString() 方法
 2. 引用类型转数字
    - Number(obj)  ==>  ToNumber(obj)  ==>  ToPrimitive(obj, 'number')  ==>  ToNumber(primitive)
 3. 引用类型转布尔值
    - 所有的引用类型转布尔 都为 true
## ToPrimitive()
 1. 先判断x是否为原始类型，如果是原始类型，直接返回x。
 2. 调用x的 valueOf() 方法，如果 valueOf() 方法返回值为原始类型，直接返回 valueOf() 方法的返回值。
 3. 调用x的 toString() 方法，如果 toString() 方法返回值为原始类型，直接返回 toString() 方法的返回值。
 4. 报错


判断类型(> = -)的隐式类型转换会先对对象ToPrimitive() 然后再ToNumber()
if([])  ==>  true 因为[] 是引用类型

## toString()
 1. {}.toString() 对象的 toString() 方法返回值为 '[object Object]'
 2. [1,2,3].toString() 数组的 toString() 方法返回值为 '1,2,3'
 3. 其他.toString() 返回值为 直接用引号将值括起来


#   +
 - 作为一元运算符       +x == Number(x)
 - 作为二元运算符
  * 如果 + 左右两边但凡有一个是字符串类型，那就将另一个操作数也转换为字符串类型

写文章时放上官方文档截图
http://es5.github.io/#x15.7.1.1
https://es5.github.io/#x15.2.4.2

