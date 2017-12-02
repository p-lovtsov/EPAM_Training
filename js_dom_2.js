var Truecalc = function () {
    var state = 0;
    this.add = function (a) {
        state += a;
        var func = function (b) {
            return state += b;
        }
        return func;
    };
    this.multiply = function (a) {
        state *= a;
        var func = function (b) {
            return state *= b;
        }
        return func;
    };
    this.devide = function (a) {
        state /= a;
        var func = function (b) {
            return state /= b;
        }
        return func;
    };
    this.subtract = function (a) {
        state -= a;
        var func = function (b) {
            return state -= b;
        }
        return func;
    };
    this.getResult = function () {
        return state;
    };
    this.reset = function() {
        state = 0;
        return state;
    }
}

var calc = new Truecalc;

console.log(calc.add(5)(6));
console.log(calc.add(4));
console.log(calc.getResult());
console.log(calc.subtract(7));
console.log(calc.getResult());
console.log(calc.reset());
console.log(calc.multiply(6)(9));
console.log(calc.getResult());