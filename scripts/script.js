/*jslint es5:true, white:false */
/*globals $, Port, Bg, document, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
window.debug = 1;
var $W;

$(function () {
    var W = window,
        C = W.console;

    // Cache the Window object
    $W = $(W);
    $W.viewport = new Port($W);

    function debug(n) {
        return W.debug >= (n || 0);
    }

    $('#Wrap section').each(function (i) {
        var el = this,
            bg = new Bg(el, $W.viewport);
        // cache em
        $W.on('scroll resize', function () {
            bg.redraw();
            if (!bg.isShowing()) {
                debug(2) && C.log('offscreen');
                debug(2) && C.log(i, bg._css.backgroundPosition);
            } else {
                debug(2) && C.debug('parallax', [i, bg._css, el]);
            }

        });
    });
    // touch
    $W.scroll();
    W.pager = Pager.init();

});
