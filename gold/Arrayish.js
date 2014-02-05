/*jslint es5:true, white:false */
/*globals window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function Arrayish() {
    var tmp = this,
        args = Array.prototype.slice.call(arguments); // NORMALIZE ARGS
    //
    if (args.length === 1 && typeof args[0] === 'object') {
        args = args[0]; // (use a single arg as arguments array)
    }
    // CONSTRUCTOR CHECK
    if (!(tmp instanceof Arrayish)) {
        return new Arrayish(args);
    }
    // INSTANCE TWEAKS
    tmp.dump = [];
    if (args.length) {
        tmp.reset.apply(tmp, args);
    }
}

Arrayish.prototype = [];

Arrayish.prototype.array = function () {
    return Array.prototype.slice.apply(this);
};

Arrayish.prototype.reset = function () {
    var args = Array.prototype.slice.call(arguments); // NORMALIZE ARGS
    //
    args.unshift(0, this.length); //        prepare to purge [0 to ...]
    args = [].splice.apply(this, args); //  in with the new ... and out
    this.dump.push(args); //                with the old
    //
    return this;
};

Arrayish.reassign = function (meth) {
    var fn = Array.prototype[meth]; //  store meth
    //
    Arrayish.prototype[meth] = function () {
        var tmp = this.array(); //      store pure values
        //
        tmp = fn.apply(tmp, arguments);
        return new Arrayish(tmp);
    };
};
Arrayish.reassign('concat');
Arrayish.reassign('slice');
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
