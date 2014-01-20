/*jslint es5:true, white:false */
/*globals $, Port, Bg, document, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/**
 * Parallax Scrolling Tutorial For NetTuts+
 * Author: Mohiuddin Parekh http://www.mohi.me mohiuddinparekh
 */
window.debug = 1;
var $W;

$(function () {
    var W = window,
        C = W.console;

    // Cache the Window object
    $W = $(W);
    $W.viewport = new Port($W);

    $('section.background').each(function (i) {
        var bg = new Bg(this);
        // cache em

        $W.scroll(function () {

            bg.compareTo($W.viewport.all);
            bg.redraw();

            if (!bg.isShowing()) {
                (W.debug > 0) && C.log('offscreen', i, bg._css.backgroundPosition);
            } else {
                (W.debug > 0) && C.debug('parallax', i, bg._css);
            }

        });
    });
    // touch
    $W.scroll();
});
