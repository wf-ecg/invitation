/*jslint es5:true, white:false */
/*globals $, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Bg = (function (W) {
    var C = W.console,
        self, name = 'Bg';

    self = function Bg(ele) {
        this.$ = $(ele);
        this.$.data(name, this);
        this.measure();

        (W.debug > 0) && C.debug(name, this);
    };

    self.prototype = {
        _y: 0,
        _css: 0,
        above: null,  // how much above port.scroll.bottom (height)
        beyond: null, // how much beyond port.scroll.top (0)
        height: null,
        inited: null,
        ratio: null,
        topof: null,
        showing: null,
        measure: function () {
            this.ratio = this.getRatio();
            this.topof = this.getTopof();
            this.height = this.$.height();
            this.inited = true;
        },
        getRatio: function () {
            return this.$.data('ratio');
        },
        getTopof: function () {
            return this.$.position().top | 0;
        },
        isShowing: function () { // vert only
            this.showing = !(this.above < 0 || this.beyond > this.height);
            return this.showing;
        },
        getCss: function () {
            this._y = -(this.beyond / this.ratio) | 0;
            // negative as we scroll up
            return '50% ' + this._y + 'px';
        },
        redraw: function () {
            this._css = {
                backgroundPosition: this.getCss(),
            };
            this.$.css(this._css);
        },
        compareTo: function (port) { // vert only
            this.above = port.bottom - this.topof;
            this.beyond = port.top - this.topof;
            return this;
        },
    };

    return self;
}(window));
