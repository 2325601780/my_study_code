# 类型
1. 原始类型：string, number, boolean, null, undefined, symbol, bigint
2. 引用类型：object, array, function, date


# typeof 
1. typeof 可以准确的判断除了null之外的所有原始类型，它的判断原理是将变量值转换为二进制，根据二进制的前三位是否为0，来判断变量是不是原始类型，如果是原始类型，就返回类型名，如果不是原始类型，就返回object。但是null被 转为二进制后是一整串0，所以typeof(null)返回object。

2. typeof 判断引用类型时，返回object，但是function能准确判断。


# instanceof
1. a instanceof b 用于判断a是否隶属于b这种类型（a是否是b的实例对象）。
2. 判断原理：
    1. 如果a是原始类型，直接返回false
    2. 如果a是引用类型，判断a的隐式原型是否等于b的显示原型，如果等于，就返回true，如果不等于，就继续判断a的隐式原型的隐式原型是否等于b的显示原型（顺着隐式原型链一直往上找），直到a的隐式原型为null，返回false


# Object.prototype.toString.call(x).slice(8, -1)


# Array.isArray()
 专门用于判断一个值是否是数组类型