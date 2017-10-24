/*Написать функцию, которая принимает объект и создает его копию (новую ссылку) и возвращает скопированный объект*/

var user = {
    name: 'Ivan',
    surname: 'Ivanov',
    age: 20,
    car: {
        model: 'Audi',
        year: 2010
    }
}

var f = function ( obj ) {
    var obj1 = {};
    for (var key in obj ) {
        obj1[key] = obj[key];
    }
    return obj1;
}

var copy = f(user);
console.log(user === copy);
console.log(user);
console.log(copy);