/*Нужно реверсировать строку*/

f = function (str) {
    var str1 = [];
    for(i=str.length-1; i>=0; i--) {
        str1.push(str[i]);
    }
    return str1.join('');
}

console.log(f('abcdefg'));