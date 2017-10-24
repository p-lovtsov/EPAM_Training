/*Написать функцию, которая находит максимально значение в массиве*/

var maximum = function (arr) {
    var max = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if ( arr[ i ] > max ) {
            max = arr[ i ];
        }
    }
    return console.log("Максимальное значение: " + max);
}

maximum([1, 3, 1, 32, 0]);
maximum([0, 1, 4]);