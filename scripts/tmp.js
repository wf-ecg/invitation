/*jslint es5:true, white:false */
/*globals jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var TMP = (function (W, $) {
    var self, name = 'TMP',
        C = W.console;

    function undef() {
        return (typeof arguments[0] === 'undefined');
    }

    function debug(n) {
        return W.debug >= (n || 0);
    }

    function logHeights(ele) { // Util.heights =
        var me = $(ele);
        //
        if (!me.length || me.is(document)) {
            return;
        }
        if (me.length) {
            C.log(me[0].tagName,
                'height innerH outerH',
                me.height(), me.innerHeight(), me.outerHeight());
        }
        arguments.callee(me.parent());
    }

    function _test() {
        logHeights('body');
    }

    self = {
        test: _test,
    };

    (W.debug > 0) && C.log([name]);

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
if (jQuery('html').is('.debug.tmp')) {
    var tmp = TMP.test();
}

/*


 */
