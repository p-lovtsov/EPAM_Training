/*Написать функцию, которая принимает два аргумента, строку и число. Если длина строки больше, 
чем переданное число, то строка урезается и в конец добавляется «…», так чтобы длина отрезанной 
строки вместе с «…» (три точки) равнялась переданному числу*/

var f = function (str, num) {
    var len = str.length;
    if (num < 3) {
        return "ERR";
    }
    if (len > num) {
        return str.slice(0, num-3) + '...';
    }
    return str;
}

console.log(f('abcdefg',5));
console.log(f('abcdefg',3));
console.log(f('abcdefg',1));
console.log(f('abcdefg',7));