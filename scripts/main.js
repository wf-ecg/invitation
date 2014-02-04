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

        function _sectionStick(e, showing, h, vsides) {
            var my = $(this);
            //
            if (showing) {
                _debug(1) && C.debug('_sectionStick', my.parent().parent()[0].id, vsides);
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
                wrap.fitText(10, {
                    'minFontSize': 7
                });
            } else {
                $('html').removeClass('desktop');
                $('html').addClass('mobile');
                $.fitText.off();
                $('#Wrap').css('font-size', '');
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
                C.warn('_isMobile change', desktop ? 'desktop' : 'mobile');
            }
            return desktop ? 'desktop' : 'mobile';
        }
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _bubbleWrap() {
        $(this).children().not('.ribbon').wrapAll('<div class="bubble">');
    }

    function _activeSection(i) {
        var bg = new Bg(this, $$.port);
        //
        $W[_isMobile() ? 'one' : 'on']('scroll resize', function () {
            bg.redraw();
        });
    }

    function _bindAll() {
        html.on('click', '.touch', function () {
            $(this).toggleClass('hover');
        });
        _setPlatform();

        wrap.find('section') //
        .each(_activeSection) //
        .each(_bubbleWrap);

        $W.scroll(_.debounce(_stickTo, 1111));
        $W.on('resize', _.debounce(_setPlatform, 333));
    }

    function _cleanup() {
        Url.clear();
        Util.scroll('#Wrap');
        $('section .bubble > *').on('inview', _sectionStick);

        _debug() && C.log([name], $.now() / 1000 | 0);
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        _debug() && C.log([name], $.now() / 1000 | 0);

        $$.port = W.Port = new Port($W);
        $$.gallery = W.Gallery && Gallery.init();
        $$.url = W.Url && Url.init();
        $$.debug = W.Debug && Debug.init();
        $W.resize().scroll();

        _bindAll();

        W.setTimeout(_cleanup, 1333);
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
