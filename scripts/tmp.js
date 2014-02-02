/*jslint es5:true, white:false */
/*globals $, $W, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// TODO: abort parallax at 800px wide
// TODO: smooth scroll

var TMP = (function (W, $) {
    var C, self, name, OFF = 24;

    var goingwas = 0;

    function _going() {
        var current, going;

        current = $W.viewport.all.top;

        if (current > goingwas) {
            going = 'down';
        } else {
            going = 'up';
        }
        goingwas = current;

        return going;
    }
    //    $W.scroll(_going);

    name = 'TMP';
    C = W.console;

    function _debug(n) {
        return W.debug >= (n || 0);
    }

    function undef() {
        return (typeof arguments[0] === 'undefined');
    }

    function logHeights(ele) { // Util.heights =
        var me = $(ele);
        //
        if (!me.length || me.is(W.document)) {
            return;
        }
        if (me.length) {
            C.log(me[0].tagName, 'height innerH outerH', me.height(), me.innerHeight(), me.outerHeight());
            C.log(me[0].tagName, 'client offset scroll', me[0].clientHeight, me[0].offsetHeight, me[0].scrollHeight);
        }
        arguments.callee(me.parent());
    }

    function _makeMarks() {
        var bod, div, dup, mrk, pix, i;
        //
        bod = $('body');
        div = $('#Chrome');
        pix = bod.outerHeight();
        mrk = $('<span>').addClass('marker').append('<i>');
        //
        for (i = 250; i < pix; i += 250) {
            dup = mrk.clone().appendTo(div).css('top', i).find('i').text(i);
            _debug(2) && C.debug(i, dup);
        }
    }

    function _test() {
        logHeights('#Wrap');
        W.setTimeout(_makeMarks, 999);
    }

    function _sectionStick() {
        $('.filler > *').on('inview', _.debounce(function (evt, showing, hsides, vsides) {
            var my = $(this);
            //
            if (showing) {
                _debug(2) && C.log(name, 'hi', this);
                if (vsides === 'both') {
                    Util.scroll(my.closest('section'), OFF);
                }
            } else {
                _debug(2) && C.log(name, 'bye', this);
            }
        }, 333));
    }

    function _mapScroll() {
        var map, els;
        //
        map = $('#Menu');
        els = map.find('a');

        // each link
        // capture default action
        // replace it with Util.scroll

        els.on('click', function (evt) {
            var anc = $(this).attr('href');
            C.error(anc);

            evt.preventDefault();
            Util.scroll(anc, OFF);
        });
    }

    function _init() {
        var html, wrap;
        //
        html = $('html');
        wrap = $('#Wrap');

        html.on('click', '.touch', function () {
            $(this).toggleClass('hover');
        });
        //
        wrap.fitText(10, {
            'minFontSize' : 7
        });
        //
        C.debug(wrap.find('section').each(function () {
            $(this).children().not('.ribbon').wrapAll('<div class="filler">');
        }));
        //
        $('#Chrome').on('dblclick', function () {
            html.toggleClass('debug');

            if (html.is('.debug')) {
                $.fitText.off();
                wrap.css('font-size', '');
            } else {
                wrap.fitText(10);
            }
        });

        TMP.test();
        _mapScroll();
        _sectionStick();
        Util.scroll('#X1a');
    }

    self = {
        init: _init,
        test: _test,
    };

    _debug() && C.log([name]);

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
if ($('html').is('.tmp')) {
    TMP.init();
}

/*

    var sample = {
        time: window.setInterval(function () {
            var my = sample;
            my.div = $('#X2a');
            my.data = (my.data || my.div.data('Bg'));
            my.num = my.num || 1;
            console.debug(my.num++, my.data.topof);
            if (my.num > 90) my.div.trigger('measure');
            if (my.num > 99) window.clearInterval(my.time);
        }, 5)
    };

 */
