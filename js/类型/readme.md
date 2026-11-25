# 基本类型（原始类型）
1. String
2. Number
3. Boolean
4. Null
5. Undefined
6. Symbol
7. BigInt

# 引用类型（对象类型, 复杂类型）
1. Object
2. Array
3. Function
4. Date

# v8 是怎么存储不同类型的
1. 基本类型：直接存储栈中
2. 引用类型：值存在堆空间，但是会暴露引用地址，引用地址存储在栈空间中

# const
1. const 声明的变量，如果值是原始类型，不能重新给变量赋值
2. const 声明的变量，如果值是引用类型，只要不重新指向其他对象，就可以修改对象的属性