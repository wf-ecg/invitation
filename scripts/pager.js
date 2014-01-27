/*jslint es5:true, white:false */
/*globals jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Pager = (function (W, $) {
    var self, name = 'Pager',
    C = W.console,
    Df;

    Df = {
        div: 'section .pager',
        arrows: null,
        left: null,
        right: null,
        init: function () {
            this.div = $(this.div).first();
            this.arrows = this.div.find('.arrow');
            this.left = this.arrows.find('.left');
            this.right = this.arrows.find('.right');
            return this;
        },
    };
    /*

    get Pager div
    get pages

    commandeer the anchor
    position right left buttons

    make scrolling smooth

     */

    function _debug(n) {
        return W.debug >= (n || 0);
    }

    function _init() {
        $('section .pager').on('inview', function (e, i, h, v) {
            C.log('pager', i, v);
        });

        return Df.init();
    }

    self = {
        init: _init,
    };

    _debug() && C.debug([name]);

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


 */
