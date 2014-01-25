/*jslint es5:true, white:false */
/*globals $, console, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Range = (function (W) {
    var self, name = 'Range',
        C = W.console;

    function undef() {
        return (typeof arguments[0] === 'undefined');
    }

    function debug(n) {
        return W.debug >= (n || 0);
    }

    function makeAxsr(obj, nom, def) {
        var _ = obj._ = (obj._ || {});
        _[nom] = def;

        if (typeof def === 'function') {
            obj[nom] = def;
        }
        else {
            obj[nom] = function (x) {
                if (x) {
                    _[nom] = x;
                    return obj;
                } else {
                    return _[nom];
                }
            };
        }

        obj[nom].toString = obj[nom];
    }

    function calcRatio(sm, bg) {
        return (sm / (bg || 100)) || sm;
    }

    function makePct(sm, bg) {
        return calcRatio(sm, bg) * 100;
    }

    function makeRange(max, num) {
        var _ = {},
            O = {
            _: _,
            makeBinding: function (nom, fn) {
                if (fn) {
                    O[nom] = function () {
                        return _[nom] = fn();
                    };
                }
                return this;
            }
        };
        makeAxsr(O, 'maximum', max || 1e3);
        makeAxsr(O, 'position', undef(num) ? 1 : num);
        makeAxsr(O, 'toPct', function (px) {
            return makePct(undef(px) ? O.position() : px, _.maximum);
        });
        makeAxsr(O, 'toPx', function (pct) {
            return undef(pct) ? O.position() : _.maximum * (pct / 100);
        });
        return O;
    }

    function _test() {
        var port = makeRange(),
            B = $('body');
        C.debug(name, 'port.maximum(44)', 'port.position(22)', port.maximum(44) && port.position(22));
        C.debug(name, 'port.toPx()', port.toPx());
        C.debug(name, 'port.toPx(25)', port.toPx(25));
        C.debug(name, 'port.toPct()', port.toPct());
        C.debug(name, 'port.toPct(33)', port.toPct(33));

        B.find('h1').on('click', function () {
            $(this).hide()
        });
        port.makeBinding('position', function () {
            return B.scrollTop();
        });
        port.makeBinding('maximum', function () {
            return B.outerHeight() - B.parent().outerHeight();
        });
        return port;
    }

    self = {
        test: _test,
    };

    (W.debug > 0) && C.log([name]);

    return self;
}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var range = Range.test();

/*


 */

