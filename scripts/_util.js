/*jslint es5:true, white:false, evil:true  */
/*globals View, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// CHAMP invitation
'use strict';
var Util = (function (W, $) { /// IIFE
    var name = 'Util',
        self = new Global(name, '(CHAMP invitation utils)'),
        C, D, DE, U;
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// CONSTANTS
    C = W.console;
    D = W.document;
    DE = D.documentElement;

    U = {
        args: function () {
            return arguments;
        },
        debug: function (n) {
            return W.debug >= (n || 0);
        },
        defined: function (x) {
            return !this.undef(x);
        },
        echo: function () {
            C.log([name], arguments);
        },
        flatcat: function (arr) {
            return arr.concat.apply([], arr);
        },
        reflect: function () {
            return arguments[0];
        },
        undef: function () {
            return (typeof arguments[0] === 'undefined');
        },
    };

    if (U.undef(W.debug)) {
        W.debug = 1;
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _dom() {
        var obj = _dom.Obj;
        //
        if (!obj) {
            obj = D.body; // default
            if (!$.browser.webkit) {
                obj = DE;
            }
            _dom.Obj = obj = $(obj);
        }
        return obj;
    }

    // reflect function takes number arg (def 1) (0 = *)
    // returns function that slices and returns args array
    // on num means gimme that arg number
    // two nums mean apply slice (the way splice numbers it)

    function _arg(n1, n2) {
        // n2 = _undef(n2) ? 99 : n2;
        if (U.undef(n2)) {
            n2 = n1;
            n1 = 0;
        }
        return function () {
            var arr = Array.prototype.slice.apply(arguments);
            return arr.slice(n1, n2);
        };
    }

    function _scroll(ele, add) {
        var nom, off, top;

        add = add || 0;
        if (typeof ele === 'number') {
            add = ele;
            ele = 'body';
        }
        ele = $(ele || 'body').first();
        nom = ((ele[0] && ele[0].id) || ele);

        if (ele.length) {
            top = ele.offset().top;
            off = Math.abs(_dom().scrollTop() - top);

            if (off - add > 25) {
                U.debug(1) && C.debug(name, '_scroll start', nom, off + 'px', add);
                ele.addClass(':target');
                // W.location.hash = nom;
                off = (off > 1111 ? off / 5 : off / 2) + 250;

                _dom().stop().animate({
                    scrollTop: top + add,
                }, {
                    duration: off,
                    complete: function () { // 'easeInBack', 555
                        ele.removeClass(':target');
                        U.debug(2) && C.debug(name, '_scroll done', nom, off + 'ms');
                    },
                    //step: function (now, fx) { var x = Math.abs(now - fx.end) | 0; C.warn(x, [fx]); }
                });
            }
        }
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// JQUERY
    $.fn.exempt = function (bool) {
        var ret = $();
        if (!bool) {
            ret = $(this);
        }
        ret.prevObject = this;
        return ret;
    };
    $.extend($.easing, {
        easeInBack: function (x, t, b, c, d, s) {
            s = s || 0.5;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
    });

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    $.extend(true, self, {
        arg: _arg,
        dom: _dom,
        scroll: _scroll,
        flatten: U.flatcat,
        isDef: U.defined,
        I: U.reflect,
        mobile: View.mobile,
        mode: eval(self.tstrict),
        viewport: View.port,
        testrict: "eval('var x=0'),(typeof(x)!=='number'?'':'non-')+'strict'",
    }, U);

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
