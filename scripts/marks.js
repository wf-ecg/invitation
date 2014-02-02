/*jslint es5:true, white:false */
/*globals jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Marks = (function (W, $) {
    var C, self, name;
    //
    name = 'Marks';
    C = W.console;
    //
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
        for (i = 250; i < pix; i += 250) {
            dup = mrk.clone().appendTo(div).css('top', i).find('i').text(i);
            _debug(2) && C.debug(i, dup);
        }
    }

    function _init() {
        W.setTimeout(_makeMarks, 999);
    }

    self = {
        init: _init,
    };

    _debug() && C.log([name]);

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
