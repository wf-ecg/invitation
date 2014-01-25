/*jslint es5:true, white:false */
/*globals $, Util, console, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Scale = (function (W) {
    var self, name = 'Scale',
        C = W.console,
        SCALE = 10;

    function debug(n) {
        return W.debug >= (n || 0);
    }

    function makeAnchors(num) {
        /// get length, find p
        var arr = [],
            len = num - 1,
            grad, i;

        if (len < 1 || len > SCALE) { // need at least 1
            throw new Error('bad sample:' + num);
        }
        grad = SCALE / len;

        for (i = 0; i <= len; i++) {
            arr[i] = Math.round(i * grad); /// collect
        }

        debug(1) && C.debug(name, 'makeAnchors', num, 'nodes of', grad, arr);

        return arr;
    }

    function genSteps(n1, n2, steps) {
        steps = (steps || 1);

        var arr = [n1],
            inc = ((n2 - n1) / steps--) | 0,
            i;

        for (i = 0; i < steps; i++) {
            arr.push(arr[i] + inc);
        }
        return arr;
    }

    function spreadNums(arr, idxs) { // main array, positions array
        // copy array and cache length
        var neo = arr.concat(),
            len = arr.length - 1,
            steps, i, ii;

        for (i = 0; i < len; i++) {
            ii = i + 1;
            steps = idxs[ii] - idxs[i];
            neo[i] = genSteps(arr[i], arr[ii], steps);
        }
        return Util.flatten(neo);
    }

    function makeScaleFrom(arr) {
        var tmp = spreadNums(arr, makeAnchors(arr.length));

        tmp.transform = function (pct, val) {
            pct = Math.abs(pct || 10); // no negatives
            pct = (pct > 100) ? 100 : pct; // clip overage
            val = (val || 100);

            var idx = Math.round(pct / SCALE),
                adj = tmp[idx] / 100;

            return (val * adj);
        };
        tmp.mapt = function () {
            return $.map(tmp, function (e, i) {
                var z = tmp.transform(i * 100, e);
                return z;
            });
        };
        return tmp;
    }

    function test(arr) {
        var tmp = makeScaleFrom(arr);

        debug(1) && C.debug(name, 'test', tmp.concat(), 'from', arr);
        debug(1) && C.debug(name, 'mapt', tmp.mapt(100));
        return tmp;
    }


    function _test() {
        test([9, 99]);
        test([0, 3.9]);
        test([0, 1, 5.3, 1, 1, 1]);
        test([11, 111, 1]);
        test([0, 2, 4, 6, 8, 10]);
        return test([110, 10]);
    }

    self = {
        run: makeScaleFrom,
        test: _test,
    };

    return self;
}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var scale = Scale.test();

/*


 */
