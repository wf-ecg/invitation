/*jslint es5:true, white:false */
/*globals $, console, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var TMP = (function (W) {
    var self, name = 'TMP',
        C = W.console;

    function undef() {
        return (typeof arguments[0] === 'undefined');
    }
    function debug(n) {
        return W.debug >= (n || 0);
    }


    function _test() {
    }

    self = {
        test: _test,
    };

    (W.debug > 0) && C.log([name]);

    return self;
}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
x = TMP.test();

/*


 */
