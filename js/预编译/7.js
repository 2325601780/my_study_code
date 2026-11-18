function foo(){
    var a = 1
    let b = 2
    {
        let b = 3
        var c = 4
        let d = 5
        console.log(a, b,);
    }
    console.log(b, c, d);
}
foo()