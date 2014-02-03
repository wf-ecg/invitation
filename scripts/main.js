/*jslint es5:true, white:false */
/*globals Bg, Debug, Gallery, Port, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var $W, DRT;

var Main = (function (W, $) {
    var C, self, name;

    C = W.console;
    name = 'Main';

    // Cache the Window object
    $W = $(W);
    DRT = {
        OFF: 24,
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _debug(n) {
        return W.debug >= (n || 0);
    }

    function _init() {
        DRT.port = new Port($W);

        $('#Wrap section').each(function (i) {
            var el = this,
                bg = new Bg(el, DRT.port);

            // cache em
            $W.on('scroll resize', function () {
                bg.redraw();
                if (!bg.isShowing()) {
                    _debug(2) && C.log('offscreen', i, bg._css.backgroundPosition);
                } else {
                    _debug(2) && C.log('offscreen', i, bg._css.backgroundPosition);
                }
            });
        });

        // touch
        $W.scroll();

        DRT.debug   = W.Debug   && Debug.init();
        DRT.gallery = W.Gallery && Gallery.init();

        return self;
    }

    self = {
        init: _init,
    };

    _debug() && C.log([name]);

    return self.init();
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
