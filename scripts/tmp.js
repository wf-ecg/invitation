/*jslint es5:true, white:false */
/*globals $$, $W, Util, jQuery, window, _ */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// TODO: abort parallax at 800px wide
// TODO: smooth scroll

var TMP = (function (W, $) {
    var C, self, name, currentSection, cb;

    name = 'TMP';
    C = W.console;

    function _debug(n) {
        return W.debug >= (n || 0);
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


    function _sectionStick() {
        $('.filler > *').on('inview', _.debounce(function (evt, showing, hsides, vsides) {
            var my = $(this);
            //
            if (showing) {
                _debug(2) && C.log(name, 'hi', this);
                if (vsides === 'both') {
                    Util.scroll(my.closest('section'), $$.OFF);
                }
            } else {
                _debug(2) && C.log(name, 'bye', this);
            }
        }, 333));
    }

    function _init() {
        var html, wrap;
        //
        html = $('html');
        wrap = $('#Wrap');

        html.on('click', '.touch', function () {
            $(this).toggleClass('hover');
        });
        //
        wrap.fitText(10, {
            'minFontSize': 7
        });
        //
        C.debug(wrap.find('section').each(function () {
            $(this).children().not('.ribbon').wrapAll('<div class="filler">');
        }));
        //
        _sectionStick();
        Util.scroll('#X1a');
    }

    self = {
        init: _init,
    };

    _debug() && C.log([name]);

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
if ($('html').is('.tmp')) {
    TMP.init();
}
