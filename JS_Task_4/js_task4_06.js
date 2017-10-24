/*Написать функцию, которая принимает строку и возвращает данную строку, но в camelCase нотации*/

var camelCase = function (str) {
    var arr = str.split(" ");
    arr[0] = arr[0].charAt(0).toLowerCase() + arr[0].slice(1);
    for(var i=1; i<arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join('');
}

console.log(camelCase('User Object'));