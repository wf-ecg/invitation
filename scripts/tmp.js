/*jslint es5:true, white:false */
/*globals Url, jQuery, window */
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
        var champs = $('.champs');

        $('#X2a .ribbon').on('inview', function (e, showing, h, vsides) {
            if (showing && !$.browser.msie) {
                champs.addClass('fixed');
            } else {
                champs.removeClass('fixed');
            }
        });

    }

    var str;

    function _fake() {
        str = str || Url.datax().join('/'); // restore
        str = W.prompt('add text sep’d by slashes', str);
        str && Url.datax(str.split('/')); // stop null
    }

    function _init() {
        _debug() && C.log([name]);

        _bind();

        return self;
    }

    self = {
        init: _init,
        fake: _fake,
    };


    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
TMP.init();
