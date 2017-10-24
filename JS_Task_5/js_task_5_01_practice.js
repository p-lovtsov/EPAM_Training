var truecalc = function () {
    state = 0;
    return {
        add: function (a, b) {
            if (arguments.length === 1) {
                b = a;
                a = state;
            }
            state = a+b;
            return state;
        },
        multiply: function (a, b) {
            if (arguments.length === 1) {
                b = a;
                a = state;
            }
            return state = a*b;
        },
        devide: function (a,b) {
            if (arguments.length === 1) {
                b = a;
                a = state;
            }
            return state = a/b;
        },
        subtract: function (a,b) {
            if (arguments.length === 1) {
                b = a;
                a = state;
            }
            return state = a-b;
        },
        getResult: function () {
            return state;
        },
        reset: function() {
            state = 0;
            return state;
        }
    }
}

var calc = truecalc();

calc.add(4,3);
console.log(calc.getResult());
console.log(calc.getResult());
calc.add(4);
console.log(calc.getResult());
calc.reset();
console.log(calc.getResult());
console.log(calc.multiply(3,2));
console.log(calc.multiply(3));
console.log(calc.getResult());
calc.devide(9);
calc.subtract(4);
console.log(calc.getResult());