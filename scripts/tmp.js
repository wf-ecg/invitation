/*jslint es5:true, white:false */
/*globals $, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var TMP = (function (W, $) {
    var C, self, name;

    name = 'TMP';
    C = W.console;

    function undef() {
        return (typeof arguments[0] === 'undefined');
    }

    function _debug(n) {
        return W.debug >= (n || 0);
    }

    function logHeights(ele) { // Util.heights =
        var me = $(ele);
        //
        if (!me.length || me.is(document)) {
            return;
        }
        if (me.length) {
            C.log(me[0].tagName, 'height innerH outerH', me.height(), me.innerHeight(), me.outerHeight());
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
        logHeights('body');
        W.setTimeout(_makeMarks, 999);
        //
        $('#Foo').on('inview', function (evt, yes, hsides, vsides) {
            if (yes) {
                C.log(vsides);
            } else {
                C.log('bye');
            }
        });
    }
    function _init() {

        var html, wrap;
        //
        html = $('html');
        wrap = $('#Wrap');
        //
        wrap.fitText(10);
        wrap.find('section .padded').wrap('<div class="baggie">')
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
