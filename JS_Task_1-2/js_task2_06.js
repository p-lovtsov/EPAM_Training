/* Написать функцию, которая принимает на входе любое число, но не больше 1000 и
определяет является ли оно простым и выводит простое число или нет. Если введено
больше 1000, то выводится, что неверные данные. */

var primeNumber = function (num) {
    if (num > 1000) {
        return console.log("Неверные данные");
    } else {
        for (var i = 2; i < num; i++) {
            if ( num % i === 0 ) {
                return console.log("Число " + num + " - составное число");
            } 
        }
        return console.log("Число " + num + " - простое число");
    }
}

primeNumber(7);
primeNumber(21);
primeNumber(3);
primeNumber(4);
primeNumber(1001);