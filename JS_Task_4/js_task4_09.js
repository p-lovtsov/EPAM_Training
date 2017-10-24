/*Написать функцию, которая посчитает сколько раз каждый символ встречается в строке
в консоле a:2, b:2, c:1 */

var f = function (str) {
    var symbols = [str.charAt(0)];
    var symbolsCount = [1];
    console.log('length = ' + str.length);
    for (var i=1; i<str.length; i++) {
        var len = symbols.length;
        console.log('i = ' + i + 'len = ' + len);
        for( var j=0; j<len; j++) {
            console.log('j= ' + j);
            console.log(str.charAt(i), symbols[j], symbols.length);
            if ( str.charAt(i) !== symbols[j] ) {
                symbols.push(str.charAt(i));
                symbolsCount.push(1);
            if (str.charAt(i) === symbols[j]) {
                symbolsCount[j] = symbolsCount[j] + 1;
            }
            } 
        }
    }
    console.log(symbols, symbolsCount);
}

console.log(f('abab'));