/*Написать функцию, которая проверяет одинаковые ли элементы в массиве и выводит в
консоль true или false.*/

var sameElement = function (arr) {
    for(var i = 1; i < arr.length; i++) {
        if ( arr[i] !== arr[0] ) {
            return console.log(false);
        }
    }
    return console.log(true);
}

sameElement([1,1,1]);
sameElement([1,0,1,0]);