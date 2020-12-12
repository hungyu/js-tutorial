const filter = function(callback) {
    if (typeof callback !== 'function') {
        throw new TypeError(callback + 'is not a function');
    }

    // null or undefined
    if (this == null) {
        throw new TypeError('this is null or undefined');
    }

    let res = [];
    let O = Object(this);
    
    let len = 0;

    if (!O.length || O.length <=0) {
        len = 0
    } else {
        len = O.length
    }
    
    let _this;

    if (arguments.length > 1) {
        _this = arguments[1];
    }

    let tmp;
    let isRemaining;
    for (let i = 0; i < len; i++) {
        val = O[i]; // record value to prevent value be changed in callback function
        isRemaining = callback.call(_this, val, i, O);

        if (isRemaining) {
            res.push(val)
        }
    }


    return res;
}

Array.prototype.filter = filter;

console.log([1,2,3].filter(function(val, idx, ary) { return val != 1 }))