var arr = [{name: "Pavel", age: 18}, {name: "Ivan", age: 3}, {name: "Vasiliy", age: 5}, {name: "Petr", age: 34}];

var arrayAdult = [];
var arrayNotAdult = [];

var f = function (obj) {
    if (obj.age > 18) {
        return arrayAdult.push(obj);
    } else {
        return arrayNotAdult.push(obj);
    }
}

for (var i=0; i<arr.length; i++) {
    f(arr[i]);
}

var sortedArray = [arrayAdult, arrayNotAdult];

console.log(sortedArray);