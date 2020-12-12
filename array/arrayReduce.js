const arrayReduceImplementation = function(callback) {
    if (typeof callback !== 'function') {
        throw new TypeError(callback + 'is not a function');
    }
    if (this == null) {
        throw new TypeError('this is null or undefined');
    }

    let res;
    if (arguments.length >= 2) {
        // get initial val
        res = arguments[1];
    }

    let O = Object(this);
    let len = 0;

    if (O.length === 'undefined' || O.length <= 0) {
        len = 0
    } else {
        len = O.length
    }

    if (len == 0 && arguments.length <= 0) {
        throw new TypeError('Reduce empty array and no initial value')
    }

    let k;

    if (arguments[1]) {
        k = 0
    } else {
        k = 1
        res = O[0]
    }

    while (k < len) {
        res = callback.call(this, res, O[k], k, O)
        k += 1
    }

    return res
}


Array.prototype.reduce = arrayReduceImplementation;

console.log([1,2,3].reduce((acc, cur) => acc+cur));
// 因為 initial value is not pass, 所以 O[0] == a == acc
console.log([].reduce.call('abcd', (acc, cur) => acc + parseInt(cur.charCodeAt(0))));