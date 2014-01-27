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
    self.prototype.init = function () {
        var self = this,
            jq = this._.J;

        jq.resize(function () {
            self._.V = jq.height() | 0;
            self.log('resize');
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
