/*jslint es5:true, white:false, evil:true */
/*globals $, $W, History, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Url = (function (W, $) {
    var C, self, name;
    //
    name = 'Url';
    C = W.console;
    //

    function _debug(n) {
        return W.debug >= (n || 0);
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _clear() {
        History.pushState({}, 'WFC Invitation', '.');
    }

    function _read() {
        var str = W.location.search;

        str = str.slice(1, - 1);
        // brackets
        str = str.replace(/\^/g, '["');
        str = str.replace(/\$/g, '"]');
        // spaces
        str = str.replace(/\_/g, ' ');
        str = str.replace(/\+/g, '. ');
        str = str.replace(/\//g, ', ');
        str = str.replace(/\-\-/g, ' – ');
        // boundary
        str = str.replace(/&/g, '","');
        return str;
    }

    function _write(str) {
        // brackets
        str = str.replace(/\"\]/g, '$');
        str = str.replace(/\[\"/g, '^');
        // spaces
        str = str.replace(/\ \–\ /g, '--');
        str = str.replace(/\,\ /g, '/');
        str = str.replace(/\.\ /g, '+');
        str = str.replace(/\ /g, '_');
        // boundary
        str = str.replace(/\"\,\"/g, '&');

        str = '?' + str + '/';
        W.location.search = str;
    }

    function _datax(dat) {
        if (dat) {
            _write(JSON.stringify(dat));
        } else {
            return eval(_read());
        }
    }

    function _swaps() {
        var arr, dat;
        //
        arr = ['_bname', '_cname', '_dates'];
        dat = _datax();
        //
        $.each(arr, function (i, e) {
            $('.' + e).text(dat[i]); //.removeClass(e);
        });
    }

    function _init() {
        _debug() && C.log([name]);

        if (W.location.search.length > 9) {
            _swaps();
        } else {
            _datax([
                'Jon Banker',
                'Jan D. Client',
                'Monday, April 28 – Sunday, May 4, 2014'
                ]);
        }

        return self;
    }

    self = {
        init: _init,
        read: _read,
        write: _write,
        datax: _datax,
        swaps: _swaps,
        clear: _clear,
    };

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
