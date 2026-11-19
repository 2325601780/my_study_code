var arr = []

for (var i = 0; i < 10; i++) {
    function fn(j) {
        arr.push(function () {
            console.log(j)
        })
    }
    fn(i)

}
//画一下调用栈


for (var j = 0; j < 10; j++) {
    arr[j]()
}