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
        all = gal.find('img');
        //
        gal.on('inview', function (evt, showing, hsides, vsides) {
            if (showing) {
                all.addClass('grid');
            } else {
                all.removeClass('grid');
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
        _bindGallery();
        return self;
    }

    self = {
        init: _init,
    };

    _debug() && C.log([name]);

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
