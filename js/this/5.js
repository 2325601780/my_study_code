Person.prototype.sports = '篮球'
function Person(){
    // let obj = {}             1
    // Person.call(obj)         2 
    this.name = '张三',        //3
    this.age = 18
    // obj.__protp__ = Person.prototype     // 4
    // return obj             //5
}

Person()

let p = new Person()

console.log(p.sports)

