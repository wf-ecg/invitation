/*jslint es5:true, white:false */
/*globals $$, Gallery, Global, Marks, TMP, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Debug = (function (W, $) { // IIFE
    var name = 'Debug',
    self, C, Df, G = Global;
    //
    self = new G(name, '(toggles of test convenience)');
    C = W.console;
    //
    Df = { // DEFAULTS
        html: null,
        wrap: null,
        inits: function () {
            Df.html = $('html');
            Df.wrap = $('#Wrap');
        }
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _debug(n) {
        return W.debug >= (n || 0);
    }

    function _bind() {
        $('#Chrome').on('dblclick', function () {
            Df.html.toggleClass('debug');

            if (Df.html.is('.debug')) {
                $.fitText.off();
                Df.wrap.css('font-size', '');
                Gallery.swapah();
            } else {
                Df.wrap.fitText(10);
                TMP.fake();
                Gallery.lazy();
            }
        });
    }

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
        _bind();
        $$.marks = W.Marks && Marks.init();

        _debug(1) && C.debug(name, '_init');
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
