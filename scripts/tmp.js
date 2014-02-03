/*jslint es5:true, white:false */
/*globals $$, $W, Util, jQuery, window, _ */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// TODO: abort parallax at 800px wide
// TODO: smooth scroll

var TMP = (function (W, $) {
    var C, self, name;

    name = 'TMP';
    C = W.console;
    currentSection = 'Wrap';

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    function _debug(n) {
        return W.debug >= (n || 0);
    }

    function _stickTo() {
        Util.scroll(currentSection, $$.OFF);
        //
        _debug(2) && C.error('_stickTo', currentSection[0].id);
    }

    $(window).scroll(_.debounce(_stickTo, 1111));

    function _sectionStick(e, showing, h, vsides) {
        var my = $(this);
        //
        if (showing){
            _debug() && C.debug('_sectionStick', my.parent().parent()[0].id, vsides);
            //
            if (vsides === 'both' || (vsides === 'top' && my.is('.sticky'))) {
                currentSection = my.closest('section');
            }
        }
    }

    function _init() {
        _debug() && C.log([name]);

        var html, wrap;
        //
        html = $('html');
        wrap = $('#Wrap');

        html.on('click', '.touch', function () {
            $(this).toggleClass('hover');
        });
        wrap.fitText(10, {
            'minFontSize': 7
        });
        //
        C.debug(wrap.find('section').each(function () {
            $(this).children().not('.ribbon').wrapAll('<div class="filler">');
        }));
        //
        $('.filler > *').on('inview', _sectionStick);
        Util.scroll('#Wrap');

        W.setTimeout(Url.clear, 999);

        return self;
    }

    self = {
        init: _init,
    };


    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
TMP.init();
