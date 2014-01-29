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
            bottom: this._.T + this._.V,
        });
    };
    self.prototype.relog = function (nom, ms) {
        var my = this;

        W.clearTimeout(my.Df[nom]);

        my.Df[nom] = W.setTimeout(function () {
            my.log(nom);
            $.PS_pub(nom);
        }, ms);
    };
    self.prototype.init = function () {
        var self = this,
            jq = this._.J;

        jq.resize(function () {
            self._.V = jq.height() | 0;
            self.relog('resize', 333);
        });
        jq.scroll(function () {
            self._.T = jq.scrollTop() | 0;
            self.reset();
        });
        // touch
        jq.resize();
        self.log('Init');
    };

    _debug() && C.log([name]);

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
