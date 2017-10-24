/*Написать функцию, которая ищет одну строку в другой строке и возвращает true, если такая строка найдена.*/

var f = function (str1, str2) {
    if (str1.includes(str2)) {
        return true;
    } else {
        return false;
    }
}

console.log(f('I love cats', 'cats'));
console.log(f('I love cats', 'dogs'));
console.log(f('I love cats', 'evol'));