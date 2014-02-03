/*jslint es5:true, white:false */
/*globals Bg, Debug, Gallery, Port, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var $W, $$;

var Main = (function (W, $) {
    var C, self, name, desktop;

    C = W.console;
    name = 'Main';
    desktop = false;

    // Cache the Window object
    $W = $(W);
    $$ = {
        OFF: 24,
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _debug(n) {
        return W.debug >= (n || 0);
    }

    function _updatePlatform() {
        if (desktop) {
            $('html').addClass('desktop');
            $('html').removeClass('mobile');
        } else {
            $('html').removeClass('desktop');
            $('html').addClass('mobile');
        }
    }
    function _isMobile() {
        desktop = ($$.port.all.wide > 960);
        return !desktop;
    }
    function _setPlatform() {
        // desktop changed by _isMobile (=== order is important)
        if (desktop === _isMobile()) {
            _updatePlatform();
            C.warn('_isMobile change');
        }
        return desktop ? 'desktop' : 'mobile';
    }

    function _init() {
        _debug() && C.log([name]);

        $$.port = new Port($W);

        $('#Wrap section').each(function (i) {
            var el, bg;
            //
            el = this;
            bg = new Bg(el, $$.port);
            // cache em
            $W.on('scroll resize', function () {
                bg.redraw();

                _setPlatform();

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
        platform: _setPlatform,
    };

    return self.init();
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
