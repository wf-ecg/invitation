/*jslint es5:true, white:false */
/*globals jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Port = (function (W, $) {
    var C = W.console,
        self, name = 'Port';

    function _debug(n) {
        return W.debug >= (n || 0);
    }

    self = function Port(jq) {
        this._ = {};
        this._.J = jq;
        this._.T = 0;
        this._.V = 0;
        this.all = null;
        this.Df = {};
        this.init();
    };

    self.prototype.log = function (str) {
        this.reset();
        _debug() && C.debug(name, (str || 'access'), this.all);
    };
    self.prototype.reset = function () {
        return (this.all = {
            top: this._.T,
            high: this._.V,
            wide: this._.H,
            bottom: this._.T + this._.V,
        });
    };
    self.prototype.init = function () {
        var my = this,
            jq = this._.J;

        jq.resize(_.throttle(function () {
            my.log('resize2');
            my._.V = my._.J.height() | 0;
            my._.H = my._.J.width() | 0;
            $.PS_pub('resize');
        }, 500));

        jq.scroll(function () {
            my._.T = jq.scrollTop() | 0;
            my.reset();
        });
        // touch
        jq.resize();
        jq.resize();
        my.log('Init');
    };

    _debug() && C.log([name]);

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
