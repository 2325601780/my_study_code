let obj = {
    name: 'cao12',
    age: 123,
    like: {
        sport: '篮球',
        music: '流行',
        movie: '动作',
    }
}

console.log(obj.like.sport);


let arr = ['zs', 18 ,true,{name:'zs'}]   // new Array()
console.log(arr[0]);
arr.push('ls')   // 向数组末尾添加一个或多个元素，并返回新的长度。
arr.unshift('ws')   // 向数组开头添加一个或多个元素，并返回新的长度。
console.log(arr);
const last = arr.pop()   // 删除数组最后一个元素，并返回该元素。
console.log(last);
const first = arr.shift()   // 删除数组第一个元素，并返回该元素。
console.log(first);
