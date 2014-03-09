/*jslint es5:true, white:false */
/*globals $, Global, Main, Modernizr, ROOT, _, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
'use strict';
W.debug = 0;
var Data, Glob;

(function (W, $) {

    if ($.browser.msie) {
        W.isIE = true;
        $(function () {
            $('html').addClass('msie');
        });
    }
    if (($.now() > new Date('2014/3/19')) || W.isIE || //
        W.location.hostname == 'www.wellsfargomedia.com') {
        W.debug--;
    }
    if ($('html').is('.debug')) {
        W.debug++;
    }
    if (W.location.hostname === 'localhost') {
        W.debug++;
    }

    var G = { /// all stubs terminated
        dir: ROOT.dir + '/',
        lib: ROOT.lib + '/',
        loc: ROOT.dir + '/lib/',
        src: ROOT.dir + '/scripts/',
    };

    Modernizr.load([{
        test: W.isIE,
        yep: [
        G.lib + 'ie/split.js',
        '//cloud.typography.com/6819872/620964/css/fonts.css', /* Normal */
        /* '//cloud.typography.com/6819872/633184/css/fonts.css', ScrnSmrt */
        ],
        both: [
        G.lib + 'underscore/js-1.4.4/lodash.underscore.js',
        /* */
        G.loc + 'jq-fittext.js',
        G.loc + 'jq-inview.js',
        G.loc + 'jq-pubsub.js',
        G.loc + 'js-view.js',
        ],
        nope: [
        G.loc + 'archer.css',
        G.loc + 'archer.itl.css',
        ],
        complete: function () {
            G = $.extend(true, Global, G);
            Data = new Global('Data', '(catchall data fixture)');
        },
    }, {
        both: [
        G.src + 'Bg.js',
        G.src + 'Port.js',
        G.src + '_util.js',
        G.src + 'debug.js',
        G.src + 'gallery.js',
        G.src + 'marks.js',
        G.src + 'url.js',
        G.src + 'main.js',
        G.src + 'tmp.js',
        ],
        complete: function () {
            Main.init();
        },
    }, {
        test: (W.debug < 1),
        yep: ['http://www.wellsfargomedia.com/lib/js/ecg-ga.js'],
    }]);

    Glob = G;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
