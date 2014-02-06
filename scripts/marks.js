/*jslint es5:true, white:false */
/*globals jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Marks =
(function (W, $) { // IIFE
    var name = 'Marks',
    self, C, Df, G = Global;
    //
    self = new G(name, '(draw gauge of vertical pixels)');
    C = W.console;
    //
    Df = { // DEFAULTS
        step: 500,
        inits: function () {
        }
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _debug(n) {
        return W.debug >= (n || 0);
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _makeMarks() {
        var bod, div, dup, mrk, pix, i;
        //
        bod = $('body');
        div = $('#Chrome');
        pix = bod.outerHeight();
        mrk = $('<span>').addClass('marker').append('<i>');
        //
        for (i = Df.step; i < pix; i += Df.step) {
            dup = mrk.clone().appendTo(div).css('top', i).find('i').text(i);
            _debug(2) && C.debug(i, dup);
        }
    }

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();

        W.setTimeout(_makeMarks, 999);

        return self;
    }

    $.extend(true, self, {
        init: _init,
    });

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
