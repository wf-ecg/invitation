/*jslint es5:true, white:false */
/*globals $$, $W, Util, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Gallery = (function (W, $) {
    var C, self, name, OK, Df;
    //
    name = 'Gallery';
    C = W.console;
    OK = !W.isIE;
    //
    Df = {
        gal: '#Gallery',
        init: function () {
            //
            this.gal = $(this.gal);
            this.all = this.gal.find('img').exempt(OK).hide().end();
        },
    };
    function _debug(n) {
        return W.debug >= (n || 0);
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _bindGallery() {
        //
        Df.gal.on('inview', function (e, showing, h, vsides) {
            if (showing) {
                Df.all.addClass('grid').show();
            } else {
                Df.all.removeClass('grid').exempt(OK).hide();
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

    function _lazyGallery() {
        Df.all.each(function () {
            var me = $(this);
            me.attr('src', me.data('cache'));
        });
    }

    function _init() {
        _debug() && C.log([name]);

        Df.init();
        _bindGallery();

        return self;
    }

    self = {
        init: _init,
        lazy: _lazyGallery,
    };

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
