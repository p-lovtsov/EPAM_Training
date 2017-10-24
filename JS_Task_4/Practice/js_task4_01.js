var f = function (a,b) {
    var v = {
        1: a.toString(),
        2: b.toString()
    }
        if ( f[ v[1] + '**' + v[2] ] ) {
            return f[ v[1] + '**' + v[2] ];
        } 
   
    for (var i=0; i<50000000; i++) {
        if(i == 0) {
            console.log('new calculation');
        }
    }
    f[ v[1] + '**' + v[2] ] = a+b;
    return f[ v[1] + '**' + v[2] ];
}

console.log(f(1,3));
console.log(f(1,3));
console.log(f(2,4));
console.log(f(1,3));
console.log(f(2,4));