/*jslint es5:true, white:false */
/*globals Bg, Debug, Gallery, Port, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var $W, $$;

var Main = (function (W, $) {
    var C, self, name, html, wrap;

    C = W.console;
    name = 'Main';
    html = $('html');
    wrap = $('#Wrap');

    // Cache the Window object
    $W = $(W);
    $$ = {
        OFF: 24,
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _debug(n) {
        return W.debug >= (n || 0);
    }

    if ('STICKY') {
        var currentSection = 'Wrap';

        function _stickTo() {
            Util.scroll(currentSection, $$.OFF);
            //
            _debug(2) && C.error('_stickTo', currentSection[0].id);
        }

        $(W).scroll(_.debounce(_stickTo, 1111));

        function _sectionStick(e, showing, h, vsides) {
            var my = $(this);
            //
            if (showing) {
                _debug() && C.debug('_sectionStick', my.parent().parent()[0].id, vsides);
                //
                if (vsides === 'both' || (vsides === 'top' && my.is('.sticky'))) {
                    currentSection = my.closest('section');
                }
            }
        }
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    if ('PLATFORM') {
        var desktop = false;

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
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _bubbleWrap() {
        $(this).children().not('.ribbon').wrapAll('<div class="filler">');
    }

    function _activeSection(i) {
        var bg = new Bg(this, $$.port);
        //
        $W.on('scroll resize', function () {
            bg.redraw();

            if (!bg.isShowing()) {
                _debug(2) && C.log('offscreen', i, bg._css.backgroundPosition);
            } else {
                _debug(2) && C.log('offscreen', i, bg._css.backgroundPosition);
            }
        });
    }

    function _bindAll() {
        html.on('click', '.touch', function () {
            $(this).toggleClass('hover');
        });

        wrap.find('section') //
        .each(_activeSection) //
        .each(_bubbleWrap) //
        .find('.filler > *').on('inview', _sectionStick);

        $W.on('resize', _setPlatform).scroll();
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        _debug() && C.log([name]);

        $$.port = new Port($W);
        $$.gallery = W.Gallery && Gallery.init();
        $$.url = W.Url && Url.init();
        $$.debug = W.Debug && Debug.init();

        _bindAll();
        Util.scroll('#Wrap');
        W.setTimeout(Url.clear, 999);

        wrap.fitText(10, {
            'minFontSize': 7
        });
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
