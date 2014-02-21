/*jslint es5:true, white:false */
/*globals window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Viewport =
(function (W) { // IIFE
    var C = W.console,
        self, name = 'Viewport';

    function _debug(n) {
        return W.debug >= (n || 0);
    }

    self = {
        ie: ('v'==='\v'), // !!window.ActiveXObject
        _d: W.document,
        _e: W.document.documentElement,
        _s: W.screen,
        _w: W,
        aspect: function () {
            return this.visualWidth() / this.visualHeight();
        },
        layoutWidth: function () {
            return this._s.width;
        },
        layoutHeight: function () {
            return this._s.height;
        },
        visualWidth: function () {
            return this.ie ? this._e.offsetWidth : this._w.innerWidth;
        },
        visualHeight: function () {
            return this.ie ? this.e.offsetHeight : this._w.innerHeight;
        },
        orientation: function () {
            var diff = this.aspect();

            if (diff > 0.9 && diff < 1.1) {
                return 'square';
            }
            return diff > 1 ? 'landscape' : 'portrait';
        },
        scrollbarWidth: function () {
            return this._w.outerWidth - this._w.innerWidth;
        },
        _widths: function () {
            return {
                s: ['width/'   + this._s.width,
                    'availW/'  + this._s.availWidth ]+'',
                w: ['innerW/'  + this._w.innerWidth,
                    'outerW/'  + this._w.outerWidth ]+'',
                e: ['offsetW/' + this._e.offsetWidth,
                    'clientW/' + this._e.clientWidth,
                    'scrollW/' + this._e.scrollWidth ]+'',
            };
        },
    }

    _debug() && C.log([name]);

    return self;
}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
