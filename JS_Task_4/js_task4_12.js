/*Написать функцию, которая возвращает целое случайное число в диапазоне от min до max*/

var randMinMax = function (min, max) {
    return Math.round( Math.random() * (max - min) + min );
}

console.log(randMinMax(0,10));