/*jslint es5:true, white:false */
/*globals jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Debug = (function (W, $) {
    var C, self, name;
    //
    name = 'Debug';
    C = W.console;
    //
    function _debug(n) {
        return W.debug >= (n || 0);
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    function _bind() {
        $('#Chrome').on('dblclick', function () {
            html.toggleClass('debug');

            if (html.is('.debug')) {
                $.fitText.off();
                wrap.css('font-size', '');
            } else {
                wrap.fitText(10);
            }
        });
    }

    function _init() {
        _bind();
    }

    self = {
        init: _init,
    };

    _debug() && C.log([name]);

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
