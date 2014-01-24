/*jslint es5:true, white:false */
/*globals $, console, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
//function checkRange (min, max) {}


function logHeights(ele) { // Util.heights =
    var me = $(ele);
    if (!me.length || me.is(document)) return;
    if (me.length) C.log(me.height(), me.innerHeight(), me.outerHeight());
    arguments.callee(me.parent())
}


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
