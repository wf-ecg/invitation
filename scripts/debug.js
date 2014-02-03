/*jslint es5:true, white:false */
/*globals $$, Marks, Menu, Pager, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Debug = (function (W, $) {
    var C, self, name, html, wrap;
    //
    name = 'Debug';
    C = W.console;
    //
    html = $('html');
    wrap = $('#Wrap');

    function _debug(n) {
        return W.debug >= (n || 0);
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _bind() {
        $('#Chrome').on('dblclick', function () {
            html.toggleClass('debug');

            if (html.is('.debug')) {
                $.fitText.off();
                wrap.css('font-size', '');
            } else {
                wrap.fitText(10);
            }
        });
    }

    function _init() {
        _bind();
        $$.marks   = W.Marks   && Marks.init();
        $$.menu    = W.Menu    && Menu.init();
        // $$.pager   = W.Pager   && Pager.init();
        return self;
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
