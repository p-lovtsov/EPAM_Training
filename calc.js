var Truecalc = function () {
    var state = 0;

    this.add = function (a) {
        state += parseInt(a);
        return function (b) {
            return state += parseInt(b);
        }
    };

    this.multiply = function (a) {
        state *= parseInt(a);
        return function (b) {
            return state *= parseInt(b);
        }
    };

    this.devide = function (a) {
        state /= parseInt(a);
        return function (b) {
            return state /= parseInt(b);
        }
    };

    this.subtract = function (a) {
        state -= parseInt(a);
        return function (b) {
            return state -= parseInt(b);
        }
    };

    this.getResult = function () {
        return state;
    };

    this.reset = function() {
        state = 0;
        return state;
    }
}

var calc1 = new Truecalc;
console.log(calc1.subtract(3)(2));