/*Написать функцию, которая принимает строку в другую строку, после переданного номера слова*/

var f = function (str1, str2, num) {
    var arr = str1.split(" ");
    var arrStart = arr.slice(0, num);
    var arrEnd = arr.slice(num, arr.length);
    arrStart.push(str2);
    var result = arrStart.concat(arrEnd);

    return result.join(' ');
}

console.log(f('I am cool', 'very', 2));