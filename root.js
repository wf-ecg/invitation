var W = window, D = W.document, ROOT = {
    config: function () {
        this.host = W.location.host;
        this.path = W.location.pathname.replace(/^\/|\/$/g, '');

        this.ver = this.version();
        this.top = '//' + this.host;
        this.home = this.hosts[this.top] || ('/' + this.path);
    },
    version: function () {
        return this.path.split('/').slice(-1) | 0 || '';
    },
    hosts: {
        '//localhost:8000': /*            */ '.',
        'x//10.89.101.100': /*             */ '/wf-ecg/champ/invitation',
        '//www.wellsfargomedia.com': /*   */ '/championship/2014/invitation',
    },
    www: '//www.wellsfargomedia.com',
};

ROOT.config();
D.write('<script src="' + ROOT.top + '/lib/jquery/1.8.2/jquery.js"></script>');
D.write('<script src="' + ROOT.top + '/lib/modernizr/2.6.2/modernizr.js"></script>');
D.write('<script src="' + ROOT.top + '/lib/js/console.js"></script>');
D.write('<script src="' + ROOT.top + '/lib/js/global.js"></script>');
D.write('<script src="' + ROOT.home + '/scripts/load.js"></script>');
