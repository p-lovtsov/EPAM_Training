/*Написать функцию, которая возвращает случайное число в диапазоне от 0 до 100*/

var rand = function () {
    return Math.round(Math.random()*101);
}

console.log(rand());