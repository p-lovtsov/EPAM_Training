/*Написать функцию, которая принимает строку и объект, а затем проверяет есть ли у
переданного объекта свойство с данным именем. Функция должна возвращать true или
false*/

var obj1 = {
    a: 23,
    b: 34,
    cd: 3,
    f: 25
}

var str1 = 'b';

var f = function (str, obj) {
        if (str in obj) {
            return true;
        } else {
            return false;
        }
    }

console.log(f(str1, obj1));
console.log(f("da",obj1));