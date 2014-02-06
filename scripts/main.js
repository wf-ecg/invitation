/*jslint es5:true, white:false */
/*globals Bg, Debug, Gallery, Port, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var $W, $$, Main =
(function (W, $) { // IIFE
    var name = 'Main',
    self, C, Df, G = Global;

    self = new G(name, '(kicker and binder)');
    C = W.console;

    // Cache the Window object
    $W = $(W);
    $$ = {
        OFF: 24,
    };

    Df = { // DEFAULTS
        html: null,
        wrap: '#Wrap',
        inits: function () {
            this.html = $('html');
            this.wrap = $(this.wrap);
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _debug(n) {
        return W.debug >= (n || 0);
    }

    if ('STICKY') {
        var currentSection = 'Wrap';

        function _stickTo() {
            Util.scroll(currentSection, $$.OFF);
            //
            _debug(2) && C.error(name, '_stickTo', currentSection[0].id);
        }

        function _sectionStick(e, showing, h, vsides) {
            var my = $(this);
            //
            if (showing) {
                _debug(1) && C.debug(name, '_sectionStick', my.parent().parent()[0].id, vsides);
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
        var fontsize = $.browser.chrome ? 10 : 11;

        function _updatePlatform() {
            if (desktop) {
                Df.html.addClass('desktop').removeClass('mobile');
                Df.wrap.fitText(fontsize, {
                    'minFontSize': 7
                });
            } else {
                $.fitText.off();
                Df.html.removeClass('desktop').addClass('mobile');
                Df.wrap.css('font-size', '');
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
                _debug(1) && C.warn('_setPlatform change', desktop ? 'desktop' : 'mobile');
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
        Df.html.on('click', '.touch', function () {
            $(this).toggleClass('hover');
        });
        _setPlatform();

        Df.wrap.find('section') //
        .each(_activeSection) //
        .each(_bubbleWrap);

        $W.scroll(_.debounce(_stickTo, 1111));
        $W.on('resize', _.debounce(_setPlatform, 333));
    }

    function _cleanup() {
        Url.clear();
        Util.scroll('#Wrap');
        $('section .bubble > div').on('inview', _sectionStick);

        Gallery.lazy();

        C.warn('inited @ ' + Date() + ' debug:', W.debug);
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        C.error('init @ ' + Date() + ' debug:', W.debug);
        if (self.inited(true)) {
            return null;
        }
        Df.inits();

        $$.port = W.Port = new Port($W);
        $$.gallery = W.Gallery && Gallery.init();
        $$.url = W.Url && Url.init();
        $$.debug = W.Debug && Debug.init();
        $W.resize().scroll();

        _bindAll();

        W.setTimeout(_cleanup, 1333);
        return self;
    }

    $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        platform: _setPlatform,
    });

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
