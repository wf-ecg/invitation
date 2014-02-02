/*jslint es5:true, white:false */
/*globals $, Pager, Gallery, Menu, Marks, Debug, Port, Bg, document, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var $W;

$(function () {
    var W, C, DRT;

    W = window;
    C = W.console;
    DRT = {
        OFF: 24,
    };

    // Cache the Window object
    $W = $(W);
    DRT.port = new Port($W);

    function _debug(n) {
        return W.debug >= (n || 0);
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    $('#Wrap section').each(function (i) {
        var el = this,
            bg = new Bg(el, DRT.port);
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
    DRT.pager   = W.Pager   && Pager.init();
    DRT.gallery = W.Gallery && Gallery.init();
    DRT.menu    = W.Menu    && Menu.init();
    DRT.marks   = W.Marks   && Marks.init();
    DRT.debug   = W.Debug   && Debug.init();

});

