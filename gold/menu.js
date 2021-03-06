/*jslint es5:true, white:false */
/*globals $$, Util, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Menu = (function (W, $) {
    var C, self, name;
    //
    name = 'Menu';
    C = W.console;
    //

    function _debug(n) {
        return W.debug >= (n || 0);
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _mapScroll() {
        var map, els;
        //
        map = $('#Menu');
        els = map.find('a');

        // each link
        // capture default action
        // replace it with Util.scroll
        els.on('click', function (evt) {
            var anc = $(this).attr('href');
            C.error(anc);

            evt.preventDefault();
            Util.scroll(anc, $$.OFF);
        });
    }

    function _init() {
        _debug() && C.log([name]);

        _mapScroll();

        return self;
    }

    self = {
        init: _init,
    };

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
