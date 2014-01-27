/*jslint es5:true, white:false */
/*globals jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Map = (function (W, $) {
    var C = W.console,
        self, name = 'Map';

    /*

    self = function Bg(ele) {
        this.inited = true;
        this.$ = $(ele);
        this.$.data(name, this);

        _debug() && C.debug(name, this);
    };

    self.prototype = {
        getRatio: function () {
            return this.$.data('ratio');
        },
        getTopof: function () {
            return this.$.position().top | 0;
        },
    };
 */
    _debug() && C.log([name]);

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
