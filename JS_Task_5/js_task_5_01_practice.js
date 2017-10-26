var truecalc = function () {
    state = 0;
    return {
        add: function (a) {
            state += a;
            var func = function (b) {
                return state += b;
            }
            return func;
        },
        multiply: function (a) {
            state *= a;
            var func = function (b) {
                return state *= b;
            }
            return func;
        },
        devide: function (a) {
            state /= a;
            var func = function (b) {
                return state /= b;
            }
            return func;
        },
        subtract: function (a) {
            state -= a;
            var func = function (b) {
                return state -= b;
            }
            return func;
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

calc.multiply(3)(2);
console.log(calc.getResult());
calc.add(4)(3);
console.log(calc.getResult());
calc.add(4);
console.log(calc.getResult());
calc.reset();
console.log(calc.getResult());
calc.multiply(3);
console.log(calc.getResult());
calc.devide(9);
calc.subtract(4);
console.log(calc.getResult());