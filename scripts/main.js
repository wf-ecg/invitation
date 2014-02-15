/*jslint es5:true, white:false */
/*globals Bg, Debug, Gallery, Global, Port, Url, Util, _, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var $W, $$, Main = (function (W, $) { // IIFE
    var name = 'Main',
        self, C, Df, U, G = Global;

    self = new G(name, '(kicker and binder)');
    C = W.console;
    U = Util;

    // Cache the Window object
    $W = $(W);
    $$ = {
        OFF: 24,
    };

    Df = { // DEFAULTS
        currentSection: 'Wrap',
        desktop: false,
        fontsize: $.browser.chrome ? 10 : 11,
        html: null,
        large: false,
        mobile: false,
        wrap: '#Wrap',
        inits: function () {
            this.html = $('html');
            this.wrap = $(this.wrap).show().slideUp(1);
        },
    };
    /// INTERNAL
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    //  STICKY

    function _stickTo() {
        if (!Df.desktop) {
            return;
        }
        U.scroll(Df.currentSection, $$.OFF);
        //
        U.debug(2) && C.error(name, '_stickTo', Df.currentSection[0].id);
    }

    function _sectionStick(e, showing, h, vsides) {
        var my = $(this);
        //
        if (showing) {
            U.debug(1) && C.debug(name, '_sectionStick', my.parent().parent()[0].id, vsides);
            //
            if (vsides === 'both' || (vsides === 'top' && my.is('.sticky'))) {
                Df.currentSection = my.closest('section');
            }
        }
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    //  PLATFORM

    function _updatePlatform() {
        if (Df.desktop) {
            Df.html.addClass('desktop').removeClass('mobile');
            Df.wrap.fitText(Df.fontsize, {
                'minFontSize': 7,
            });
        } else {
            $.fitText.off();
            Df.html.removeClass('desktop').addClass('mobile');
            Df.wrap.css('font-size', '');
        }
    }

    function _isMobile() {
        Df.large = U.viewport.visualWidth() > 600;
        Df.mobile = U.mobile.agent();
        Df.desktop = Df.large && !Df.mobile;
        return !Df.desktop;
    }

    function _setPlatform() {
        // desktop changed by _isMobile (=== order is important)
        if (Df.desktop === _isMobile()) {
            _updatePlatform();
            U.debug(1) && C.warn('_setPlatform change', Df.desktop ? 'desktop' : 'mobile');
        }
        return Df.desktop ? 'desktop' : 'mobile';
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _bubbleWrap() {
        $(this).children().not('.ribbon').wrapAll('<div class="bubble">');
    }

    function _activeSection(i) {
        var bg, mo;
        //
        bg = new Bg(this, $$.port);
        mo = _isMobile();

        $W[mo ? 'one' : 'on']('scroll resize', function () {
            bg.redraw(mo);
        });
    }

    function _bindAll() {
        Df.html.on('click', '.touch', function () {
            $(this).toggleClass('hover');
        });

        Df.wrap.find('section') //
        .each(_activeSection) //
        .each(_bubbleWrap);

        Df.wrap.slideDown(1111);

        $W.scroll(_.debounce(_stickTo, 2222));
        $W.on('resize orientationchange', _.debounce(_setPlatform, 999));
        $W.resize().scroll();
    }

    function _cleanup() {
        Url.clear();
        U.scroll('#Wrap');
        $('section .bubble > div').on('inview', _sectionStick);

        Gallery.lazy();

        U.debug() && C.warn('finited @ ' + Date());
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        C.info('init @ ' + Date() + ' debug:', W.debug);
        if (self.inited(true)) {
            return null;
        }
        Df.inits();

        $$.port = W.Port = new Port($W);
        $$.gallery = W.Gallery && Gallery.init();
        $$.url = W.Url && Url.init();
        $$.debug = W.Debug && Debug.init();

        _setPlatform();
        _bindAll();

        W.setTimeout(_cleanup, 3333);
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
