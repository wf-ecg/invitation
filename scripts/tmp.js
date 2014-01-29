/*jslint es5:true, white:false */
/*globals $, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var TMP = (function (W, $) {
    var self, name = 'TMP',
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
        var B = $('body'),
            D = $('#Chrome'),
            M = $('<span>').addClass('marker').append('<i>'),
            H = B.outerHeight(),
            i, x;
        //
        for (i = 250; i < H; i += 250) {
            x = M.clone().appendTo(D).css('top', i).find('i').text(i);
            _debug(2) && C.debug(i, x);
        }
    }

    function _test() {
        logHeights('body');

        W.setTimeout(_makeMarks, 999);

        $('#Foo').on('inview', function (e, i, h, v) {
            if (i) {
                C.log(v);
            } else {
                C.log('bye');
            }
        });

    }

    self = {
        test: _test,
    };

    _debug() && C.log([name]);

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
if ($('html').is('.tmp')) {

    var tmp = TMP.test();
    $('body').fitText(10);
    $('#Wrap section .padded').wrap('<div class="baggie">')

    $('#Chrome').on('dblclick', function () {
        $('html').toggleClass('debug');

        if ($('html').is('.debug')) {
            $(window).off('.fittext');
            $('body').css('font-size', '');
        } else {
            $('body').fitText(10);
        }

    });
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
