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
        if (($.now() > new Date('2014/2/19')) || W.isIE ||
            W.location.hostname == 'www.wellsfargomedia.com') {
            W.debug--;
        }
        if (W.location.hostname === 'localhost') {
            W.debug++;
        }
    }

G = {
    lib: ROOT.top + '/lib',
    dir: ROOT.home,
    src: ROOT.home + '/scripts',
    www: ROOT.www,
};

Modernizr.load([{
    test: W.isIE,
    yep: [
    G.lib + '/ie/split.js',
    '//cloud.typography.com/6819872/620964/css/fonts.css',
    ],
    both: [
    G.lib + '/underscore/js-1.4.4/underscore.js',
    G.dir + '/lib/jq-fittext.js',
    G.dir + '/lib/jq-inview.js',
    G.dir + '/lib/jq-pubsub.js',
    ],
    nope: [
    G.dir + '/lib/archer.css',
    G.dir + '/lib/archer.itl.css',
    ],
    complete: function () {
        G = $.extend(true, Global, G);
    },
}, {
    both: [
    G.src + '/Bg.js',
    G.src + '/Port.js',
    G.src + '/_util.js',
    G.src + '/debug.js',
    G.src + '/gallery.js',
    G.src + '/marks.js',
    G.src + '/url.js',
    G.src + '/main.js',
    G.src + '/tmp.js',
    ],
    complete: function () {
        Main.init();
    },
}, {
    test: W.debug < 1,
    yep: [
    G.www + '/lib/js/ecg-ga.js',
    ],
}]);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
