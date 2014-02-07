/*jslint es5:true, white:false */
/*globals $$, Marks, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Debug =
(function (W, $) { // IIFE
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
            } else {
                Df.wrap.fitText(10);
                TMP.fake();
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
