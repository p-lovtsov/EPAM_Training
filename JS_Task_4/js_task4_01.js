/*Написать функцию, которая удаляет первый или/и последний пробел с строке и возарщает строку 
без начального и завершающего пробела.*/
/*
var f = function (str) {
    var str1 = "";
    var len  = str.length;
    if (str[0] === " " ) {
        for (var i = 1; i < str.length; i++) {
            str1 += str[i];
        }
    } else if (str[len-1] === " ") {
        for (var i = 0; i < str.length-1; i++) {
            str1 += str[i];
        }
    } else {
        return str;
    }
    return str1;
}
*/

var f = function (str) {
    var len = str.length;
    if (str[0] = ' ') {
        return str.trimLeft();
    } else if (str[len-1]) {
        return str.trimRight();
    }
    return str;
}

console.log(f(' abc'));
console.log(f('abcde'));
console.log(f('abc '));