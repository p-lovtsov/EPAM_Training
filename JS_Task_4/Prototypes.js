/*Написать функцию, которая принимает имя свойства и объект и ищет данное свойство только в прототипе 
переданного объекта (объект создать заранее через Object.create())*/

var obj1 = Object.create({a: 1, b: 2});
obj1.a = 100;

var f = function (prop, obj) {
    return obj.__proto__[prop];
}

console.log(f("a", obj1));