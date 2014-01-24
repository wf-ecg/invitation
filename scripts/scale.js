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

    function idxsOnScale(num) {
        /// get length, find p
        var arr = [],
            len = num - 1,
            grad, i;

        if (len < 1 || len > SCALE) {
            throw new Error('bad sample');
        }
        grad = SCALE / len;

        for (i = 0; i <= len; i++) {
            arr[i] = Math.round(i * grad); /// collect
        }

        debug(2) && C.debug(name, 'idxsOnScale', num, 'nodes of', grad, arr);

        return arr;
    }

    function calcInc(n1, n2, steps) {
        steps = steps || 1;
        var inc = (n2 - n1) / steps;
        return inc;
    }

    function genSteps(n1, n2, steps) {
        steps = steps || 1;

        var arr = [n1],
            inc = calcInc(n1, n2, steps),
            i;

        for (i = 0; i < steps - 1; i++) {
            arr.push(arr[i] + inc);
        }
        return arr;
    }

    function spreadNums(arr, idxs) { // main array, positions array
        // copy array and cache length
        var neo = arr.concat(),
            len = arr.length - 1,
            steps, i;

        for (i = 0; i < len; i++) {
            steps = idxs[i + 1] - idxs[i];
            neo[i] = genSteps(arr[i], arr[i + 1], steps);
        }
        return Util.flatten(neo);
    }

    function makeScaleFrom(arr) {
        var tmp = spreadNums(arr, idxsOnScale(arr.length));

        tmp.transform = function (pct, val) {
            pct = Math.abs(pct || 10);
            pct = (pct > 100) ? 100 : pct;
            val = val || 100;

            var idx = Math.round(pct / 10),
                adj = tmp[idx] / 100;

            return val * adj;
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

        C.debug(name, 'test', tmp.concat(), 'from', arr);
        //        C.debug(name, 'mapt', tmp.mapt(100));
        return tmp;
    }


    function _test() {
        test([0, 99]);
        test([0, 0, 1]);
        test([0, 1, 1, 1, 1, 1, 1, 1]);
        test([0, 1111, 1]);
        test([0, 2, 4, 6, 8, 10]);
        return test([1000, 100]);
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
