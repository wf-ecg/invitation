/*jslint es5:true, white:false */
/*globals $$, $W, Util, jQuery, window, _ */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var TMP = (function (W, $) {
    var C, self, name;

    name = 'TMP';
    C = W.console;

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _debug(n) {
        return W.debug >= (n || 0);
    }

    function _bind() {
        var champs = $('.champs')

        $('#X2a .ribbon').on('inview', function (e, showing, h, vsides) {
            if (showing){
                champs.addClass('fixed');
            } else {
                champs.removeClass('fixed');
            }
        });

    }

    function _init() {
        _debug() && C.log([name]);

        _bind();

        return self;
    }

    self = {
        init: _init,
    };


    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
TMP.init();
