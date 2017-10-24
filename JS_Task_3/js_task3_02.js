/*Написать, функцию, которая принимает в качестве аргумента объект и выводит в консоль все ключи и значения свойств.
 Данная функция не должна возвращать значение.*/

var obj = {
    a: 1,
    b: 2,
    c: 43
}

var f = function (object) {
    for (var key in object) {
        console.log(key, object[key]);
    }
}

f(obj);

//       ----- Писали на практике ----- 
/*
var obj = {
    a: 1,
    b: 2
}

/* var f = function (str) {
    if ( str in obj === true ) {
        return "Данное свойство в объекте есть";
    } else {
        return "В объекте нет данного свойства";
    }
}


var f = function (str) {
    if ( str in obj ) {
        return "Данное свойство в объекте есть";
    } else {
        return obj[str] = 'new';
    }
}

 console.log( f( 'a' ) );
 console.log( f( 'c' ), f( 'e' ), f( 'b' ), f( '1' ) );
 console.log(obj);
*/