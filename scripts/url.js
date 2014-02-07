/*jslint es5:true, white:false, evil:true */
/*globals $W, History, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Url =
(function (W, $) { // IIFE
    var name = 'Url',
    self, C, L, Df, G = Global;
    //
    self = new G(name, '(manage url to data and back)');
    C = W.console;
    L = W.location;
    //
    Df = { // DEFAULTS
        data: null,
        state: null,
        inits: function () {
            this.dirty = L.href.slice(-1) === '#';
            this.loaded = L.hash.length > 9;
            if (L.href.slice(-1) === '#') {
                this.state = 'dirty';
            } else if (L.hash.length > 9) {
                this.state = 'loaded';
            }
        }
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL
    function _debug(n) {
        return W.debug >= (n || 0);
    }

    function _clear() {
        if (!W.isIE) W.location.hash = '' ;
    // History.pushState(_datax(), 'WFC Invitation', './index.html');
    }

    function _read() {
        var str = W.location.hash;
        //
        str = str.slice(1, - 1);
        // brackets
        str = str.replace(/\^|%5E/g, '["');
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

        str = '' + str + '/';
        W.location.hash = str;
    }

    function _datax(dat) {
        Df.url = Df.url || '?';
        if (dat) {
            Df.url = dat;
            _write(JSON.stringify(dat));
        } else {
            Df.url = eval(_read()) || Df.url;
            return Df.url;
        }
    }

    function _tokenSwap() {
        var arr, dat;
        //
        arr = ['_bname', '_cname', '_dates', '_dates1', '_dates2'];
        dat = _datax();
        //
        dat && $.each(arr, function (i, e) {
            $('.' + e).text(dat[i] || ''); //.removeClass(e);
        });
    }

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();

        _debug(1) && Df.state && C.warn(Df.state);

        if (Df.state === 'loaded') {
            _tokenSwap();
            _clear();
        } else {
            $(W).on('hashchange', function () {
                _debug(2) && C.warn(name, 'hashchange');
                _tokenSwap();
            });
            _datax([
                'Jon Banker',
                'Jan D. Client',
                'Monday, April 28 – Sunday, May 4, 2014'
                ]);
        }

        return self;
    }

    $.extend(true, self, {
        init: _init,
        read: _read,
        write: _write,
        datax: _datax,
        swaps: _tokenSwap,
        clear: _clear,
    });

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
