var W = window, D = W.document, ROOT = {
    config: function () {
        this.host = W.location.host;
        this.home = '/' + this[this.host];
        this.top = '//' + this.host;
        this.www = '//www.wellsfargomedia.com';
    },
    'www.wellsfargomedia.com': /*           */ 'championship/2014/invitation',
    '10.89.101.100': /*                     */ 'wf-ecg/champ/invitation/6',
    'localhost:8000': /*                    */ 'wf-ecg/champ/invitation',
};
ROOT.config();
D.write('<script src="' + ROOT.www + '/lib/js/req.js"></script>');
D.write('<script src="' + ROOT.www + '/lib/js/global.js"></script>');
D.write('<script src="' + ROOT.home + '/scripts/load.js"></script>');
