/*jslint es5:true, white:false */
/*globals Global, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Gallery = (function (W, $) { // IIFE
    var name = 'Gallery',
    self, C, OK, Df, G = Global;
    //
    self = new G(name, '(props for the animation and grid of pics)');
    C = W.console;
    OK = !W.isIE;
    //
    Df = { // DEFAULTS
        gal: '#Gallery',
        overlay: '.ribbon.overlay',
        inits: function () {
            //
            this.gal = $(this.gal);
            this.overlay = $(this.overlay, this.gal.closest('section'));
            this.all = this.gal.find('img').exempt(OK).hide().end();
        },
    };

    function _debug(n) {
        return W.debug >= (n || 0);
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _enter() {
        Df.all.addClass('grid').add(Df.overlay).show();
    }

    function _leave() {
        Df.all.removeClass('zoom grid').exempt(OK).add(Df.overlay).hide();
    }

    function _bindGallery() {
        _leave();
        //
        Df.gal.on('inview', function (e, showing, h, vsides) {
            (showing) ? _enter() : _leave();
        });

        Df.all.on('click', function () {
            var me = $(this),
            zoomed = me.is('.zoom');

            if (!zoomed) {
                Df.all.removeClass('zoom');
            }
            me.toggleClass('zoom');
        });
    }

    function _swapah() {
        Df.all.each(function () {
            var me = $(this);
            me.attr('src', 'images/pics/_' + me.data('cache'));
        });
    }

    function _lazyGallery() {
        Df.all.each(function () {
            var me = $(this);
            me.attr('src', 'images/pics/' + me.data('cache'));
        });
    }

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
        _bindGallery();
        _debug(1) && C.debug(name, '_init');

        return self;
    }

    $.extend(true, self, {
        init: _init,
        lazy: _lazyGallery,
        swapah: _swapah,
    });

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
