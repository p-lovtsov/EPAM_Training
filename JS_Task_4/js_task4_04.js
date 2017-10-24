/*Написать функцию, которая принимает строку и возвращает эту же строку, но с заглавным первым символом каждого слова*/

var capitalize = function (str) {
    var re = /\b\w+\b/g;
    var wordUp = function (str1) {
        return str1.substring(0,1).toUpperCase() + str1.substring(1);
    }
    return str.replace( re, wordUp );
    
}

console.log(capitalize('I am cool'));