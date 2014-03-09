var W = window, D = W.document, ROOT = {
    _hosts: {
        'localhost:8000':  {
            top: '/',
            dir: '/wf-ecg/champ/invitation',
        },
        '10.89.101.100':  {
            dir: '/wf-ecg/champ/invitation',
        },
        'www.wellsfargomedia.com': {
            dir:  '/championship/2014/invitation',
        },
    },
    _config: function () { /// only top is not a stub
        var R = this;
        R.host = W.location.host;
        R.conf = R._hosts[R.host];
        R.path = W.location.pathname.toString().replace(R.conf.dir, '');
        R.vers = R.path.match(/^(\/\d\w*)(.*)$/) || '';
        if (R.vers) {
            R.path = R.vers[2];
            R.vers = R.vers[1];
        }
        R.top = R.conf.top || ('//' + R.host);
        R.lib = (R.conf.lib || '') + '/lib';
        R.dir = (R.conf.dir + R.vers) || R.path;
        // W.console.info('ROOT', R);
    },
};

ROOT._config();
D.write('<script src="' + ROOT.lib + '/jquery/1.8.2/jquery.js"></script>');
D.write('<script src="' + ROOT.lib + '/modernizr/2.6.2/modernizr.js"></script>');
D.write('<script src="' + ROOT.lib + '/js/console.js"></script>');
D.write('<script src="' + ROOT.lib + '/js/global.js"></script>');
D.write('<script src="' + ROOT.dir + '/load.js"></script>');
