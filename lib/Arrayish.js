/*jslint es5:true, white:false */
/*globals window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function Arrayish() {
    var tmp = this,
        args = arguments;

    args = Array.prototype.slice.call(args); // normalize args
    if (args.length === 1 && typeof args[0] === 'object') {
        args = args[0]; // use a single arg as arguments array
    }
    console.log('args', args);

    if (!(tmp instanceof Arrayish)) {
        return new Arrayish(args);
    }
    if (args.length) {
        tmp.reset.apply(tmp, args);
    }
}

Arrayish.prototype = [];

Arrayish.prototype.reset = function () {
    var args = Array.prototype.slice.call(arguments); // normalize args;
    //
    // console.log(args, args.length);
    //
    args.unshift(0, this.length); // 0 to ...
    this.dump =
    this.splice.apply(this, args); // out with the old and in with the new

    return this;
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var arr = [3, 6, 9, 44]

function decompose(fn, arg){
    if (typeof arg === 'object' && arg.callee) {
        arg = Array.prototype.slice.call(arg);
    }
    if (arg.length === 1) {
        if (arg[0].slice) {
            arg = arg[0];
        } else {
            arg = [arg[0]];
        }
    }

}

