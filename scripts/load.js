/*jslint es5:true, white:false */
/*globals $, Global, Main, Modernizr, ROOT, _, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Data, G, W = (W || window);

W.debug = 0;
    lax_debug : {
        if ($.browser.msie) {
            W.isIE = true;
            $(function () {
                $('html').addClass('msie');
            });
        }
        if (($.now() > new Date('2014/3/19')) || W.isIE ||
            W.location.hostname == 'www.wellsfargomedia.com') {
            W.debug--;
        }
        if (W.location.hostname === 'localhost') {
            W.debug++;
        }
    }

G = { /// all stubs terminated
    dir: ROOT.dir + '/',
    lib: ROOT.lib + '/',
    loc: ROOT.dir + '/lib/',
    src: ROOT.dir + '/scripts/',
};

Modernizr.load([{
    test: W.isIE,
    yep: [
    G.lib + 'ie/split.js',
    '//cloud.typography.com/6819872/620964/css/fonts.css',
    ],
    both: [
    G.lib + 'underscore/js-1.4.4/underscore.js',
    G.loc + 'jq-fittext.js',
    G.loc + 'jq-inview.js',
    G.loc + 'jq-pubsub.js',
    ],
    nope: [
    G.loc + 'archer.css',
    G.loc + 'archer.itl.css',
    ],
    complete: function () {
        G = $.extend(true, Global, G);
    },
}, {
    both: [
    G.src + 'Bg.js',
    G.src + 'Port.js',
    G.src + 'Viewport.js',
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
    test: W.debug < 1,
    yep: [
    'http://www.wellsfargomedia.com/lib/js/ecg-ga.js',
    ],
}]);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
