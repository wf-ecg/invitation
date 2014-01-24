/*jslint es5:true, white:false */
/*globals $, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Bg = (function (W) {
    var C = W.console,
        self, name = 'Bg';

    self = function Bg(ele) {
        this.$ = $(ele);
        this.$.data(name, this);
        this.readData();
        this.measure();
        this.$.css({
            backgroundImage: 'url(images/' + this.data.image +')',
//            height: this.data.height,
        });

        (W.debug > 0) && C.debug(name, this);
    };

    self.prototype = {
        _y: 0,
        _css: 0,
        above: null,  // how much above port.scroll.bottom (height)
        beyond: null, // how much beyond port.scroll.top (0)
        height: null,
        inited: null,
        data: null,
        topof: null,
        showing: null,
        measure: function () {
            this.topof = this.getTopof();
            this.height = this.$.outerHeight();
            this.inited = true;
        },
        readData: function () {
            this.data = {
                image: this.$.data('f') || '0chrome/swatch.png',
                height: this.$.data('h') || '100',
                ratio: this.$.data('r') || 10,
                offby: this.$.data('o') || 0,
                trans: this.$.data('t') || 'move',
            };
        },
        getTopof: function () {
            return this.$.position().top | 0;
        },
        isShowing: function () { // vert only
            this.showing = !(this.above < 0 || this.beyond > this.height);
            return this.showing;
        },
        getCss: function () {
            this._y = -(this.beyond / this.data.ratio) | 0;
            this._y -= this.data.offby;
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
