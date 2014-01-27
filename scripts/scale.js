/*jslint es5:true, white:false */
/*globals Arrayish, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Scale = (function (W, $) {
    var self, name = 'Scale',
        C = W.console,
        SCALE = 10;

    function _debug(n) {
        return W.debug >= (n || 0);
    }

    function def() {
        return (typeof arguments[0] !== 'undefined');
    }

    function flatten(arr) {
        return arr.concat.apply([], arr);
    }

    function cleanPct(pct) {
        pct = Math.abs(parseFloat(pct) || 42); // no negatives
        pct = (pct > 100) ? 100 : pct; // clip overage
        return pct;
    }

    function pctToIdx(pct) {
        return Math.round(cleanPct(pct) / SCALE);
    }

    function makeAnchors(num) {
        /// get length, find p
        var arr = [],
            len = num - 1,
            grad, i;
        //
        if (len < 1 || len > SCALE) { // need at least 1
            throw new Error('bad sample:' + num);
        }
        grad = SCALE / len;

        for (i = 0; i <= len; i++) {
            arr[i] = Math.round(i * grad); /// collect
        }
        _debug(1) && C.debug(name, 'makeAnchors', num, 'nodes of', grad, arr);
        //
        return arr;
    }

    function genSteps(n1, n2, steps) {
        steps = (steps || 1);
        //
        var arr = [n1],
            inc = ((n2 - n1) / steps--) | 0,
            i;
        //
        for (i = 0; i < steps; i++) {
            arr.push(arr[i] + inc);
        }
        //
        return arr;
    }

    function spreadNums(arr, idxs) { // main array, positions array
        // copy array and cache length
        var neo = arr.concat(),
            len = arr.length - 1,
            steps, i, ii;
        //
        for (i = 0; i < len; i++) {
            ii = i + 1;
            steps = idxs[ii] - idxs[i];
            neo[i] = genSteps(arr[i], arr[ii], steps);
        }
        //
        return new Arrayish(flatten(neo));
    }

    function makeScaleFrom(arr) {
        arr = arr || [0, 100];
        var tmp = spreadNums(arr, makeAnchors(arr.length));
        tmp.idx = 1;

        // take a number and transform it by
        // percent along scale or with last index speced
        tmp.transform = function (val, pct) {
            var factor;
            //
            tmp.idx = def(pct) ? pctToIdx(pct) : tmp.idx;
            factor = tmp[tmp.idx] / 100;
            //
            return (val * factor);
        };
        // make array with val transformed by each node
        tmp.mapt = function (val) {
            return $.map(tmp.array(), function (e, i) {
                tmp.idx = i;
                return tmp.transform(val);
            });
        };
        return tmp;
    }

    function _doTest(arr) {
        var tmp = makeScaleFrom(arr);
        //
        _debug(1) && C.debug(name, 'test', tmp.toString(), 'from', arr);
        _debug(2) && C.debug(name, 'mapt', tmp.mapt(300).toString());
        //
        return tmp;
    }


    function _test() {
        _doTest([0, 3.3]);
        _doTest([1, 1, 1, 99]);
        return _doTest();
    }

    self = {
        run: makeScaleFrom,
        test: _test,
    };

    _debug() && C.log([name]);

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
if (jQuery('html').is('.debug.scale')) {
    var scale = Scale.test();
}

/*


 */
