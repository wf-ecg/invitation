/*jslint es5:true, white:false */
/*globals jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Util = (function (W, $) {
    var C, name, self;

    C = W.console;
    self = {};
    name = 'Util';

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _debug(n) {
        return W.debug >= (n || 0);
    }
    function _flatcat(arr) {
        return arr.concat.apply([], arr);
    }
    function _reflect() {
        return arguments[0];
    }
    function _args() {
        return arguments;
    }
    function _echo() {
        C.log([name], arguments);
    }
    function _undef() {
        return (typeof arguments[0] === 'undefined');
    }
    function _defined(x) {
        return !_undef(x);
    }

    // reflect function takes number arg (def 1) (0 = *)
    // returns function that slices and returns args array
    // on num means gimme that arg number
    // two nums mean apply slice (the way splice numbers it)
    function _arg(n1, n2) {
        // n2 = _undef(n2) ? 99 : n2;
        if (_undef(n2)){
            n2 = n1;
            n1 = 0;
        }
        return function () {
            var arr = Array.prototype.slice.apply(arguments);
            return arr.slice(n1, n2)
        }
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    self = {
        arg: _arg,
        flatten: _flatcat,
        isDef: _undef,
        I: _reflect,
    };

    $.extend(W, {
        C_: _debug,
        echo: _echo,
        isDef: _defined,
    });

    C_() && C.log([name]);

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
