/**
 * array map implementation by
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 */
const mapImplementation = function(callback/*, thisArg*/) {

    var T, A, k;
    console.log('this = ', this)
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the |this| 
    //    value as the argument.
    var O = Object(this);
    console.log('O = ', O)
    // 2. Let lenValue be the result of calling the Get internal 
    //    method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;
    console.log('len = ', len)
    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = arguments[1];
    }
    console.log('arguments.length = ', arguments.length)
    console.log('T = ', T)
    // 6. Let A be a new array created as if by the expression new Array(len) 
    //    where Array is the standard built-in constructor with that name and 
    //    len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while (k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal 
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal 
        //    method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the Call internal 
        //     method of callback with T as the this value and argument 
        //     list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // For best browser support, use the following:
        A[k] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
};

const mapImplementationByJosh = function(callback) {
    if (this == null || this == undefined) {
        /*  防止 user把 undefined/null傳入
            ex:
            [].map.call(null, function(val) { return val * 2 })
            但下面這樣是合法的:
            [].map.call('', function(val){ return val*2}, [1,2,3,4])
        */
        throw new TypeError('this is null or undefined')
    }

    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    // 轉換成obj
    // ex: Object('') => String {''}
    // Object(-5) => Number { -5 }
    let O = Object(this);
    
    let len = 0
    if (!O.length || O.length < 0) {
        len = 0
    } else {
        len = O.length
    }

    let _this;

    if (arguments.length > 1) {
        _this = arguments[1];
    }

    A = new Array(len);

    let k = 0;
    
    while (k < len) {
        A[k] = callback.call(_this, O[k], k, O);
        k += 1;
    }
    return A
}


// implementation for prototype map
Array.prototype.map = mapImplementationByJosh;

console.log([1,2,3].map(function(val, idx, ary) { return val * 2}, [1,2,3,4]))
console.log([1,2,3,4].map(function(val, idx, ary) { return this.val * 2}, {val: 5}))
console.log([].map.call('1', function(val, idx, ary) { return this.val * 2}, {val: 5}))
console.log([].map.call('2', function(val, idx, ary) { return val * 2 }))



