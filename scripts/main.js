/*jslint es5:true, white:false */
/*globals Bg, Debug, Gallery, Port, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var $W, $$;

var Main = (function (W, $) {
    var C, self, name;

    C = W.console;
    name = 'Main';

    // Cache the Window object
    $W = $(W);
    $$ = {
        OFF: 24,
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _debug(n) {
        return W.debug >= (n || 0);
    }

    function _init() {
        _debug() && C.log([name]);

        $$.port = new Port($W);

        $('#Wrap section').each(function (i) {
            var el = this,
                bg = new Bg(el, $$.port);

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

        $$.gallery = W.Gallery && Gallery.init();
        $$.url     = W.Url     && Url.init();
        $$.debug   = W.Debug   && Debug.init();

        return self;
    }

    self = {
        init: _init,
    };

    return self.init();
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
