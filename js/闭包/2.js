function bar(){
    console.log(myname);
}

function foo () {
    var myname = 'foo'
    bar()
}

myname = 'global'
foo()
