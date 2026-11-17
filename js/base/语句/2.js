// let arr = [1,2,3,4,5]

// let res = []
// for (let i = 0; i < arr.length; i++) {
//     res.push(arr[i]**2)
// }
// console.log(res);


// let arr = ['a','b','c','d'];
// let res = [];
// for (let i=0;i<arr.length;i++){
//     res.push(arr[i]+'o');
// }
// console.log(res);


let arr = [1,4,70,2,49,9,32,100,54,76,98,12]
for (let i = 0; i < arr.length; i++) {
    if(arr[i] === 100){
        console.log(arr[i]);
        break;
    }
}

let j = 0
while(j<arr.length){
    if(arr[j] === 100){
        console.log(arr[j]);
        break;
    }
    j++
}
