//const arr = []
// const arr = new Array(10).fill(0)
// console.log(arr)


const arr = new Array(5).fill(new Array(5).fill(0))
console.log(arr)

arr[3][3] = 1
console.log(arr)
