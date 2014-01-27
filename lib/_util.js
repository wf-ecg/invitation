/*jslint es5:true, white:false */
/*globals jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Util = (function (W, $) {
    var self,
        name = 'Util',
        C = W.console;

    function _undef() {
        return (typeof arguments[0] === 'undefined');
    }
    function _reflect() {
        return arguments[0];
    }
    function _flatten(arr) {
        return arr.concat.apply([], arr);
    }

    self = {
        defined: function (x) {
            return !_undef(x);
        },
        isUndef: _undef,
        self: _reflect,
        flatten: _flatten,
    };

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
