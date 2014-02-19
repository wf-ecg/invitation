/*jslint es5:true, white:false */
/*globals $$, $W, Util, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Gallery =
(function (W, $) { // IIFE
    var name = 'Gallery',
    self, C, OK, Df, G = Global;
    //
    self = new G(name, '(props for the animation and grid of pics)');
    C = W.console;
    OK = !W.isIE;
    //
    Df = { // DEFAULTS
        gal: '#Gallery',
        inits: function () {
            //
            this.gal = $(this.gal);
            this.all = this.gal.find('img').exempt(OK).hide().end();
        },
    };
    function _debug(n) {
        return W.debug >= (n || 0);
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL
    function _bindGallery() {
        //
        Df.gal.on('inview', function (e, showing, h, vsides) {
            if (showing) {
                Df.all.addClass('grid').show();
            } else {
                Df.all.removeClass('zoom grid').exempt(OK).hide();
            }
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
