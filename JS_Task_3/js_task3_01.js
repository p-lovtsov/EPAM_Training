/*Создать пустой объект. Добавить несколько свойств со значениями разных типов.
Удалить одно из созданных свойств.*/

var obj = {
    a: 1
};

obj.b = '2';
obj[3] = null;
obj.undefined = undefined;
console.log(obj);

delete obj.undefined;
console.log(obj);