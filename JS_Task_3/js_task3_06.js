/*Написать функцию, которая делает глубокую копию (deep clone) объекта. Глубокая копия, значит, 
что если одно из свойств содержит объект оно также должно быть скопировано, чтобы создалась новая ссылка 
на соответствующий объект. Глубина вложенности может быть бесконечной, поэтому надо использовать рекурсию.*/

/*           Не сделал            */

var user = {
    name: 'Ivan',
    surname: 'Ivanov',
    car: {
        model: 'Audi',
        year: 2010
    },
    age: 20    
}

var f = function ( obj ) {
    var obj1 = {};
    for (var key in obj ) {
        if (typeof key === "object") {
            console.log(key, obj[key]);
            f(obj[key]);
        } else {
            obj1[key] = obj[key];
        }
    }
    return obj1;
}

console.log(typeof user.car);

var copy = f(user);
console.log(user.car.model === copy.car.model);
console.log(copy.car);