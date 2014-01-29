/*jslint es5:true, white:false */
/*globals $, Port, Bg, document, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var $W;

$(function () {
    var W = window,
        C = W.console;

    // Cache the Window object
    $W = $(W);
    $W.viewport = new Port($W);

    function _debug(n) {
        return W.debug >= (n || 0);
    }

    $('#Wrap section').each(function (i) {
        var el = this,
            bg = new Bg(el, $W.viewport);
        // cache em
        $W.on('scroll resize', function () {
            bg.redraw();
            if (!bg.isShowing()) {
                _debug(2) && C.log('offscreen', i, bg._css.backgroundPosition);
            } else {
                _debug(2) && C.log('offscreen', i, bg._css.backgroundPosition);
            }
        });
    });
    // touch
    $W.scroll();
    W.pager = Pager.init();

});
