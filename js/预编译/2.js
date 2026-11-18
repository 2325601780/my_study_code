// console.log(a);
// var a = 1

// var a
// console.log(a);
// a = 1

function fn (a){
    console.log(a);
    var a = 123
    console.log(a);
    function a (){}
    var b = function (){}
    console.log(b);
    function c (){}
    var c = a
    console.log(c);
}
fn(1)