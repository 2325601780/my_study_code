5 段代码搞懂 JS 预编译！每次我都猜不对…

你写 JS 时有没有遇过这种反常识的情况？

```js
console.log(a)  // undefined，不是报错！
var a = 1
```

`var a = 1` 写在后面，前面的 `console.log` 居然不报 `a is not defined`，而是打印 `undefined` —— 这就是 **预编译** 在起作用。

JS 在执行你的代码之前，会先偷偷扫一遍，把变量声明和函数声明"安排好位置"。你以为代码是从上到下跑的？其实跑之前 V8 已经帮你做了一轮"预处理"。

今天就通过 **5 段代码**，把预编译的规则彻底搞明白。每段代码先自己猜猜输出是什么，再看解析 —— 保证你看完再也不会懵。

***

## 预编译在 V8 里的位置

先搞清楚宏观问题：你写的 JS 代码，浏览器到底是怎么跑起来的？V8 引擎大致分三步：

```
源代码  →  ① 分词  →  ② 语法分析  →  ③ 代码生成  →  机器码
            拆 token     生成 AST 树       AST → 机器码
```

而 **预编译**，就发生在 ② 和 ③ 之间。它 **不执行代码**，只是提前把 `var` 声明和函数声明的位置"占好坑"。

类比一下：你去公司报到，先在前台登记（预编译，占位置），然后各部门才正式上班（执行）。预编译就是那个"登记环节"。

***

## 预编译规则速记

预编译分两种：**全局预编译** 和 **函数体内预编译**：

- **GO**（Global Object）：全局的"登记本"
- **AO**（Activation Object）：每个函数自己的"小本子"

### 全局预编译（GO）

| 顺序 | 做什么 | 同名冲突 |
|------|--------|----------|
| 1 | 扫所有 `var` 声明 → GO 上挂属性，值先填 `undefined` | — |
| 2 | 扫所有函数声明 → GO 上挂属性，值为函数体 | **函数覆盖 var** |

### 函数预编译（AO）

| 顺序 | 做什么 | 同名冲突 |
|------|--------|----------|
| 1 | 创建 AO 对象 | — |
| 2 | 扫 **形参 + var** → AO 上挂属性，值填 `undefined` | 形参与 var 同名合并 |
| 3 | 形实参绑定 → 给形参赋实参值 | — |
| 4 | 扫函数声明 → AO 上挂属性，值为函数体 | **函数覆盖前面所有** |

⚠️ 一句话总结顺序：**形参/var → 实参绑定 → 函数声明**，后扫到的覆盖前面的。

***

## 第 1 段代码：var 提升 + 函数覆盖

```js
var a = 1
function fn() {
    console.log(a)     // ①
    var a = 2
    function a() {}
}
fn()
```

> 🤔 **先猜猜输出是什么？** 想好了再往下看

---

### 解析

**第 1 步：函数 fn 被调用，触发预编译，创建 AO**

| 步骤 | 动作 | AO 状态 |
|------|------|---------|
| 扫形参 + var | 发现 `var a`，挂上去 | `{ a: undefined }` |
| 形实参绑定 | 无参数，跳过 | 不变 |
| 扫函数声明 | 发现 `function a() {}`，**覆盖** | `{ a: function a() {} }` |

**第 2 步：执行代码**

```js
console.log(a)   // ① → AO.a 是函数！
var a = 2        // 赋值，AO.a = 2
function a() {}  // 执行阶段忽略函数声明
```

### 答案

```
[Function: a]
```

你猜对了吗？`var a = 2` 在后面，所以 ① 处读到的不是 2。那 `undefined` 呢？也不是 —— 因为预编译阶段 `function a()` **覆盖**了 `var a`，所以 AO.a 一开始就是那个函数。

***

## 第 2 段代码：形参 + 同名函数 + 赋值

```js
function fn(a) {
    console.log(a)      // ①
    var a = 123
    console.log(a)      // ②
    function a() {}
    var b = function() {}
    console.log(b)      // ③
    function c() {}
    var c = a
    console.log(c)      // ④
}
fn(1)
```

> 🤔 **先猜猜输出是什么？** 想好了再往下看

---

### 解析

**预编译阶段**

| 步骤 | 动作 | AO 变化 |
|------|------|---------|
| 扫形参 + var | `a`（形参）、`b`（var）、`c`（var） | `{ a: undefined, b: undefined, c: undefined }` |
| 形实参绑定 | `a = 1` | `{ a: 1, b: undefined, c: undefined }` |
| 扫函数声明 | `function a()` 覆盖 a；`function c()` 覆盖 c | `{ a: function a() {}, b: undefined, c: function c() {} }` |

**执行阶段**

| 代码 | 动作 | AO 变化 | 打印 |
|------|------|---------|------|
| ① `console.log(a)` | 读 AO.a | — | `[Function: a]` |
| `var a = 123` | 赋值 | a → 123 | — |
| ② `console.log(a)` | 读 AO.a | — | `123` |
| `var b = function() {}` | 赋值 | b → 那个函数 | — |
| ③ `console.log(b)` | 读 AO.b | — | `[Function]` |
| `var c = a` | 赋值 | c → 123（此时 a 已是 123） | — |
| ④ `console.log(c)` | 读 AO.c | — | `123` |

### 答案

```
[Function: a]
123
[Function: b]
123
```

关键点：**函数声明最后扫，所以它能覆盖一切**。

***

## 第 3 段代码：形参没传实参 + 函数声明覆盖

```js
function foo(a, b) {
    console.log(b);      // ①
    c = 0
    var c
    a = 3
    b = 2
    console.log(b);      // ②
    function b() {}
    console.log(b);      // ③
}
foo(1)   // 只传了一个实参！
```

> 🤔 **先猜猜输出是什么？** 想好了再往下看

---

### 解析

注意：`foo(1)` 只传了 1 个实参，形参 `b` 对应的实参缺失。

**预编译阶段**

| 步骤 | 动作 | AO 变化 |
|------|------|---------|
| 扫形参 + var | `a`、`b`、`c` | `{ a: undefined, b: undefined, c: undefined }` |
| 形实参统一 | `a = 1`（有实参）；`b` 没实参，保持 `undefined` | `{ a: 1, b: undefined, c: undefined }` |
| 扫函数声明 | `function b()` 覆盖 b | `{ a: 1, b: function b() {}, c: undefined }` |

**执行阶段**

| 代码 | 动作 | AO 变化 | 打印 |
|------|------|---------|------|
| ① `console.log(b)` | 读 AO.b | — | `[Function: b]` |
| `b = 2` | 赋值覆盖 | b → 2 | — |
| ② `console.log(b)` | 读 AO.b | — | `2` |
| `function b() {}` | 执行阶段忽略 | — | — |
| ③ `console.log(b)` | 读 AO.b | — | `2` |

### 答案

```
[Function: b]
2
2
```

关键点：**执行阶段的函数声明会被忽略**，所以 `function b() {}` 写在 `b = 2` 后面也没用，b 已经是 2 了。

***

## 第 4 段代码：全局 var 与函数同名

```js
var a          // 只有 var 声明，没有赋值
var b = 2
function a () {
    console.log(a);      // ①
    var c = 3
    var a = b
    function c () {}
    console.log(c);      // ②
}
a()
console.log(a);          // ③
```

> 🤔 **先猜猜输出是什么？** 想好了再往下看

---

### 解析

同时有 **全局 GO** 和 **函数 AO**，两层作用域都要看。

**全局预编译 GO**

| 步骤 | 动作 | GO 变化 |
|------|------|---------|
| 扫 var | `var a`、`var b` | `{ a: undefined, b: undefined }` |
| 扫函数声明 | `function a()` 覆盖 a | `{ a: function a() {}, b: undefined }` |

执行阶段赋值：`b = 2`，GO 变成 `{ a: function a() {}, b: 2 }`。

**函数 a 的 AO（被调用时）**

| 步骤 | 动作 | AO 变化 |
|------|------|---------|
| 扫形参 + var | `c`（var）、`a`（函数内部的 var，**跟函数名同名但互不干扰**） | `{ c: undefined, a: undefined }` |
| 形实参绑定 | 无参数 | 不变 |
| 扫函数声明 | `function c()` 覆盖 c | `{ c: function c() {}, a: undefined }` |

**函数内部执行**

| 代码 | 动作 | AO 变化 | 打印 |
|------|------|---------|------|
| ① `console.log(a)` | 读 AO.a（函数内部的 var a） | — | `undefined` |
| `var c = 3` | AO.c 先是 function c() {}（预编译），赋值后变 3 | c → 3 | — |
| `var a = b` | AO.a = GO.b = 2（去外层找 b） | a → 2 | — |
| `function c() {}` | 执行阶段忽略 | — | — |
| ② `console.log(c)` | 读 AO.c | — | `3` |

**全局继续执行**

函数返回后，全局的 `a` 还是那个函数（GO 没被修改过）：

| 代码 | 打印 |
|------|------|
| ③ `console.log(a)` | `[Function: a]` |

### 答案

```
undefined
3
[Function: a]
```

这段代码的坑点：函数内部的 `var a` 会 **遮蔽** 全局的 `a`，所以 ① 读的是 AO.a（undefined）而不是全局的函数。但如果函数内部没写 `var a`，那 `a` 才会向上找到全局那个函数。

***

## 第 5 段代码：变量遮蔽 + 没声明的全局变量

```js
global = 100
function fn() {
    console.log(global);   // ①
    global = 200
    console.log(global);   // ②
    var global = 300
}
fn()
var global
```

> 🤔 **先猜猜输出是什么？** 想好了再往下看

---

### 解析

先看全局预编译：只有一个 `var global`，所以 GO 里有 `global: undefined`。

执行 `global = 100` 时，因为 GO.global 已存在，所以直接赋值，GO.global = 100。

**函数 fn 的 AO**

| 步骤 | 动作 | AO 变化 |
|------|------|---------|
| 扫形参 + var | `var global` | `{ global: undefined }` |
| 形实参绑定 | 无参数 | 不变 |
| 扫函数声明 | 无 | 不变 |

⚠️ 重点：函数内部有 `var global`，所以 AO 里 **一定有 global**。这意味着函数里所有对 `global` 的读写都只在 AO 上进行，**跟外面的 global 完全没关系**。

**执行阶段**

| 代码 | 动作 | AO.global | 打印 |
|------|------|-----------|------|
| ① `console.log(global)` | 读 AO.global | undefined | `undefined` |
| `global = 200` | 写 AO.global | 200 | — |
| ② `console.log(global)` | 读 AO.global | 200 | `200` |
| `var global = 300` | 写 AO.global | 300 | — |

### 答案

```
undefined
200
```

你可能以为 ① 会打印外面的 `100`？并不会。因为函数里有 `var global`，预编译就把 `global` 挂到 AO 上了。


## 总结

### 全局 GO

| 顺序 | 动作 | 同名冲突 |
|------|------|----------|
| 1 | `var` 声明 → GO 属性，值 `undefined` | — |
| 2 | 函数声明 → GO 属性，值为函数体 | **函数覆盖 var** |

### 函数 AO

| 顺序 | 动作 | 同名冲突 |
|------|------|----------|
| 1 | 创建 AO 对象 | — |
| 2 | 形参 + var → AO 属性，值 `undefined` | 形参与 var 合并 |
| 3 | 形实参绑定 | — |
| 4 | 函数声明 → AO 属性，值为函数体 | **函数覆盖前面所有** |
