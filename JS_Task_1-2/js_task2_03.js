/*Написать функцию, которая посчитает и выведет в консоль количество четных и нечетных
элементов в массиве. Если в массиве есть нулевой элемент, то он учитывается и
выводится отдельно.*/

var evenAndOdd = function (arr) {
    var even = 0;
    var odd = 0;
    var zero = 0;
    for(var i = 0; i < arr.length; i++ ) {
        if ( arr[ i ] !== 0 ) {
            if ( arr[ i ] % 2 ) {
                odd++;
            } else {
                even++;
            }
        } else {
            zero++;
        }
    }
    console.log("Четных " + even + " Нечетных " + odd + " Нулей " + zero);
}

evenAndOdd([0, 2, 3, 0, 1, 7, 1, 3, 2, 4, 5]);