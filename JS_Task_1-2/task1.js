var arr = [1,1,4,8,9,0,3,7,2,1];
var even = 0;
var odd = 0;

var f = function (num) {
    if (num % 2) {
        return false;
    } else {
        return true;
    }
}

for(var i=0; i<arr.length; i++) {
    if( f(arr[i]) ) {
        even++;
    } else {
        odd++;
    }
}

console.log('Четных чисел ' + even + ' Нечетных чисел ' + odd);