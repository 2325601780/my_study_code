let str = '{[()]}'

var isValid = function(s) {
    const obj = {
        '{': '}',
        '[': ']',
        '(': ')',
    }
    const stack = []
    for(let i = 0; i < s.length; i++){
        if(s[i] in obj){
            stack.push(s[i])
        }else {
            let top = stack.pop()
            if(obj[top] != s[i]){
                return false
            }
        }
    }
    return stack.length == 0


};


console.log(isValid(str));

