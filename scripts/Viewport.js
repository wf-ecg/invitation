/*jslint es5:true, white:false */
/*globals window, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Viewport =
(function (W, $) { // IIFE
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
    };

    self.Mobile = {
        bugged: false,
        addBug: function (){
            $('<cite class="bug">M</cite>').css({
                backgroundColor: 'rgba(0,0,0,0.5)',
                bottom: '-2px',
                color: 'white',
                position: 'fixed',
                right: 0,
                zIndex: '9999',
            }).appendTo('body');

            this.bugged = true;
        },
        agent: function () {
            var viswid = self.visualWidth(),
                mobdev = (/mobi|android/i).test(W.navigator.userAgent);

            if (!this.bugged && //
                (viswid < 973 && viswid % 10 === 3) && // webdev responsive layouts add 13px
                (/chrome/i).test(W.navigator.userAgent)
                ){
                mobdev = true;
                this.addBug();
            }
            return mobdev;
        },
        zoomed: function () {
            return self.layoutWidth() / self.visualWidth();
        },
    };

    _debug() && C.log([name]);

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
