let name = '张三'
let age = 18

function info(){
    console.log(name, age);
    function like(){
        let mylike = '篮球'
        console.log(mylike);
    }
    like()
}
info()
