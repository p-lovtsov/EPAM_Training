/*Написать функцию, которая будет пробегать по массиву и выводит в консоль каждый
элемент массива и общее число элементов. Подобрать подходящее имя для функции.*/

var DisplayEveryElementAndTotal = function (arr) {
    for (var i = 0; i < arr.length; i++) {
        console.log( arr[ i ] );
    }
    console.log(arr.length);
}

DisplayEveryElementAndTotal([ 1, 2, 3, 5, 7 ]);
DisplayEveryElementAndTotal([ "Hello", "World", "!"]);