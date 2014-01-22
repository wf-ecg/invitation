/*jslint es5:true, white:false */
/*globals $, console, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
window.debug = 0;

var Scale = (function (W) {
    var self, name = 'Scale',
        C = W.console,
        MAX = 11;

    function debug(n) {
        return W.debug >= (n || 0);
    }

    function calcPositions(arr, tot) {
        tot = tot || MAX - 1;

        function getGap(len) {
            return tot / len;
        }

        function getPos(idx, gap) {
            return Math.round(idx * gap);
        }

        var tmp = [],
            len = arr.length - 1,
            gap = getGap(len);

        $.map(arr, function (e, i) {
            tmp.push(getPos(i, gap));
        });

        debug(2) && C.debug(name, 'calcPositions', tmp, 'from', arr);

        return tmp;
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

    function fillGaps(ar1, ar2) {
        var arr = ar1.concat(),
            len = ar1.length - 1,
            steps, i;

        for (i = 0; i < len; i++) {
            steps = ar2[i + 1] - ar2[i];
            arr[i] = genSteps(ar1[i], ar1[i + 1], steps);
        }
        return Util.flatten(arr);
    }

    function _doAll(arr) {
        var tmp = fillGaps(arr, calcPositions(arr));

        debug(2) && C.debug(name, 'length', tmp.length);
        debug() && C.debug(name, 'doAll', tmp, 'from', arr);

        return tmp;
    }

    function _test() {
        self.run([0, 0, 1]);
        self.run([0, 1,1,1,1,1,1, 1]);
        self.run([0, 1111, 1]);
        self.run([[0, 2, 4, 6, 8, 10]]);
        self.run([1000, 100]);
    }

    self = {
        run: _doAll,
        test: _test,
    };

    return self;
}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*

Scale.test()

 */
