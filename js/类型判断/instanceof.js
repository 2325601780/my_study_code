function myInstanceof(l, r) {
    if(typeof l !== 'object' || l == null || typeof l !== 'function'){
        return false
    }
    while(l !== null){
        if(l.__proto__ === r.prototype){
            return true
        }
        l = l.__proto__
    }
    return false
}


console.log(myInstanceof([],Array));
console.log(myInstanceof([],Object));
