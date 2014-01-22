/*jslint es5:true, white:false */
/*globals $, Data, jQuery, window */
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
    function _$flatten(arr) {
        return $.map(arr, _reflect);
    }

    if (_undef(W.debug)) {
        W.debug = 1;
    }

    self = {
        defined: function (x) {
            return !_undef(x);
        },
        isUndef: _undef,
        self: _reflect,
        flatten: _$flatten,
    };

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
