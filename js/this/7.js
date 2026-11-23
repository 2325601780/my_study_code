
//Child.prototype.__proto__ === Object.prototype     // new Object() 
//Object.prototype.__proto__ === null
function Child(){
    this.lastName = '张'
}
let c = new Child()
//c.__proto__ === Child.prototype


