function foo(str){
    eval(str)       // var b = 2 让原本不属于这里的代码变得天生就定义了在这里一样
    console.log(b);
}

let a = 1

foo('var b = 2')