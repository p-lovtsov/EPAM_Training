var Truecalc = function () {
    var state = 0;
    this.add = function (a) {
        state += +a;
        // var func = function (b) {
        //     return state += b;
        // }
        return state;
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