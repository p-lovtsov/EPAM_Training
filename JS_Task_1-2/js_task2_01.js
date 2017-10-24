/*Написать функцию, которая принимает либо число, либо строку и в зависимости от типа
переданного аргумента выводит в консоль «это строка» или «это число»*/

var StringOrNumber = function (arg) {
    if (typeof arg === "string") {
        console.log("это строка");
    } else {
        console.log("это число");
    }
}

StringOrNumber(2);
StringOrNumber("2");