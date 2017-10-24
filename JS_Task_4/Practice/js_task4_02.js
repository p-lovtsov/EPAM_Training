/*Нужно реверсировать строку*/

f = function (str) {
    var str1 = [];
    for(i=str.length-1; i>=0; i--) {
        str1.push(str[i]);
    }
    var reversStr = str1.join('');
    return reversStr;
}

console.log(f('1abcde2'));