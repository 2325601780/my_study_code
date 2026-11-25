Function.prototype.myCall  = function(context){
    // 谁调用我，我就把谁里面的this指向context
    // 谁调用我，我就把谁添加到context里面，再让context调用它
    context.fn = this
    let res = context.fn()
    delete context.fn
    
}


let obj = {
    a: 1
}

function foo(){
    console.log(this.a);
}
foo.myCall(obj)


