for(let i = 0; i < 10; i++){     // i 会泄露到全局作用域，污染全局作用域
    console.log(i);
}
console.log(i);

{
    let i = 100
    var j = 200
    const k = 300
}



