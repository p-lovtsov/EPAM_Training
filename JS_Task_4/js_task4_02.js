/*Написать функцию, которая принимает строку и возвращает эту же строку, на с заглавным первым символом*/

f = function (str) {
    var str1 = '';
    str1 += str[0].toUpperCase();
    for (var i=1; i<str.length; i++) {
        str1 += str[i];
    }
    return str1;
}

console.log(f('abc'));