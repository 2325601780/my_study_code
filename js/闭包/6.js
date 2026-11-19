function add() {
    let i = 0
    return function() {
        i++
        return i
    }
}

var baz = add()
console.log(baz());
console.log(baz());
console.log(baz());
console.log(baz());
