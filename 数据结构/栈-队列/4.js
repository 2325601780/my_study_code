// 用栈实现队列
const MyQueue = function() {
    this.stack1 = []
    this.stack2 = []

}

MyQueue.prototype.push = function(x){
    this.stack1.push(x)
}

MyQueue.prototype.pop = function(){
    if(this.stack2.length > 0){
        return this.stack2.pop()
    }
    while(this.stack1.length > 0){
        this.stack2.push(this.stack1.pop())
    }
    return this.stack2.pop()
}

MyQueue.prototype.empty = function () {
    return this.stack1.length == 0 && this.stack2.length == 0
}

MyQueue.prototype.peek = function (){
    if(this.stack2.length > 0){
        return this.stack2[this.stack2.length - 1]
    }
    while(this.stack1.length > 0){
        this.stack2.push(this.stack1.pop())
    }
    return this.stack2[this.stack2.length - 1]
}



const queue = new MyQueue()   // 得到一个队列
queue.push(1)
queue.push(2)

console.log(queue.pop());    // 把1从队头中取走
console.log(queue.pop());





