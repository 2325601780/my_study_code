let arr = []    // 1. new Array() 数组也是对象
                // 2. arr.__proto__ === Array.prototype
arr.push(1)
console.log(arr);



function Car(color) {
    this.name = 'su7'
    this.height = 1400
    this.weight = 1500
    this.lang = 4800
    this.color = color
}

Car.prototype.push = function (){
    console.log('push执行了');
}

let car1 = new Car('red')
// car1.__proto__ === Car.prototype
console.log(car1);
car1.push()
