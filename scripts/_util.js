/*jslint es5:true, white:false */
/*globals jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Util = (function (W, $) {
    var C, name, self, easing;

    C = W.console;
    self = {};
    name = 'Util';

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // CONSTANTS
    easing = {
        easeInBack: function (x, t, b, c, d, s) {
            if (s == undefined) {
                s = 0.5;
            }
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
    };
    $.extend($.easing, easing);

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _debug(n) {
        return W.debug >= (n || 0);
    }

    function _flatcat(arr) {
        return arr.concat.apply([], arr);
    }

    function _reflect() {
        return arguments[0];
    }

    function _args() {
        return arguments;
    }

    function _echo() {
        C.log([name], arguments);
    }

    function _undef() {
        return (typeof arguments[0] === 'undefined');
    }

    function _defined(x) {
        return !_undef(x);
    }

    // reflect function takes number arg (def 1) (0 = *)
    // returns function that slices and returns args array
    // on num means gimme that arg number
    // two nums mean apply slice (the way splice numbers it)


    function _arg(n1, n2) {
        // n2 = _undef(n2) ? 99 : n2;
        if (_undef(n2)) {
            n2 = n1;
            n1 = 0;
        }
        return function () {
            var arr = Array.prototype.slice.apply(arguments);
            return arr.slice(n1, n2);
        };
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _scroll(ele, add) {

        add = add || 0;
        if (typeof ele === 'number') {
            add = ele;
            ele = 'body';
        }
        ele = $(ele || 'body').first();

        var bod = $('body');

        _debug(2) && C.debug(name + '_scroll', '\n', add + 'px', [ele]);
        _debug(1) && C.debug(name + '_scroll', ele[0] && ele[0].id);

        if (ele.length) {
            ele.addClass(':target');

            bod.stop().animate({
                scrollTop: ele.offset().top + add,
            }, 333, function () { // 'easeInBack', 555
                ele.removeClass(':target');
            });
        }
    }

    self = {
        arg: _arg,
        flatten: _flatcat,
        isDef: _undef,
        I: _reflect,
        scroll: _scroll,
    };

    $.extend(W, {
        args: _args,
        echo: _echo,
        isDef: _defined,
    });

    _debug() && C.log([name]);

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
