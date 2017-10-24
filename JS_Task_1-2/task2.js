var arr = [{name: "Pavel", age: 18}, {name: "Ivan", age: 3}, {name: "Vasiliy", age: 5}, {name: "Petr", age: 34}];

var arrayAdult = [];
var arrayNotAdult = [];

var f = function (obj) {
    if (obj.age > 18) {
        return true;
    } else {
        return false;
    }
}

for (var i=0; i<arr.length; i++) {
    if( f(arr[i]) ) {
        arrayAdult.push( arr[i] );
    } else {
        arrayNotAdult.push( arr[i] );
    }
}

var sortedArray = [arrayAdult, arrayNotAdult];

console.log(sortedArray);