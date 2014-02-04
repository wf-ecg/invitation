/*jslint es5:true, white:false */
/*globals $$, $W, Util, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Gallery = (function (W, $) {
    var C, self, name;
    //
    name = 'Gallery';
    C = W.console;
    //

    function _debug(n) {
        return W.debug >= (n || 0);
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _bindGallery() {
        var gal, all;
        //
        gal = $('#Gallery');
        all = gal.find('img').hide();
        //
        gal.on('inview', function (e, showing, h, vsides) {
            if (showing) {
                all.addClass('grid').show();
            } else {
                all.removeClass('grid').hide();
            }
        });
        all.on('click', function () {
            var me = $(this),
                zoomed = me.is('.zoom');
            if (!zoomed) {
                all.removeClass('zoom');
            }
            me.toggleClass('zoom');
        });
    }

    function _init() {
        _debug() && C.log([name]);

        _bindGallery();

        return self;
    }

    self = {
        init: _init,
    };

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
