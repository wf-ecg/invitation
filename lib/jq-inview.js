/*jslint es5:true, white:false */
/*globals jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/**
 * author Christopher Blum
 *    - based on the idea of Remy Sharp, http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 *    - forked from http://github.com/zuk/jquery.inview/
 */
(function (W, $) {
    var C = W.console,
        D = W.document,
        DE = D.documentElement,
        time = 222,
        name = 'inview',
        inviewObjects = {},
        expando = $.expando,
        viewportSize, viewportOffset, X;

    $.event.special.inview = {
        add: function (data) {
            inviewObjects[data.guid + "-" + this[expando]] = {
                data: data,
                $element: $(this)
            };
        },
        remove: function (data) {
            try {
                delete inviewObjects[data.guid + "-" + this[expando]];
            } catch (e) {}
        }
    };

    function getViewportSize() {
        var mode, domObject, size;

        domObject = _dom();
        size = {
            height: domObject.innerHeight,
            width: domObject.innerWidth
        };

        // if this is correct then return it.
        // iPad has compat Mode, so will go into check clientHeight/clientWidth (which has the wrong value).
        if (!size.height) {
            size = {
                height: domObject.clientHeight,
                width: domObject.clientWidth
            };
        }
        return size;
    }

    function _dom() {
        var obj = _dom.Obj;
        if (!obj) {
            obj = W; // default
            if (!obj.innerHeight) {
                _dom.Obj = DE; // default

                if (D.compatMode || !$.support.boxModel) { // IE, Gecko
                    _dom.Obj = (D.compatMode === 'CSS1Compat') //
                    ? DE // Standards
                    : D.body; // Quirks
                }
                console.error(obj === DE ? 'Standards' : 'Quirks');
            }
            _dom.Obj = obj;
        }
        return obj;
    }

    function getViewportOffset() {
        return {
            top: W.pageYOffset || DE.scrollTop || D.body.scrollTop,
            left: W.pageXOffset || DE.scrollLeft || D.body.scrollLeft
        };
    }

    (function () {
        var Dust, _dirty = true,
            _delay = 333;

        Dust = function (time) {
            if (time === - 1) {
                _dirty = false;

            } else if (time !== null) {
                time = (time || _delay);

                W.setTimeout(function () {
                    _dirty = true;

                    C.log('dust in', time);
                }, time);
            }
        };

        Dust.valueOf = function () {
            return _dirty;
        };

        W.dust = Dust;
    }());

    function checkInView() {
        if (!W.dust) {
            return;
        }
        var $elements = $(),
            elementsLength, i = 0;

        $.each(inviewObjects, function (i, inviewObject) {
            var selector = inviewObject.data.selector,
                $element = inviewObject.$element;
            $elements = $elements.add(selector ? $element.find(selector) : $element);
        });

        elementsLength = $elements.length;
        if (elementsLength) {
            viewportSize = viewportSize || getViewportSize();
            viewportOffset = viewportOffset || getViewportOffset();

            for (; i < elementsLength; i++) {
                // Ignore elements that are not in the DOM tree
                if (!$.contains(DE, $elements[i])) {
                    continue;
                }

                var $element = $($elements[i]),
                    elementSize = {
                    height: $element.height(),
                    width: $element.width()
                },
                    elementOffset = $element.offset(),
                    inView = $element.data(name),
                    visiblePartX, visiblePartY, visiblePartsMerged;
                /*
Don't ask me why because I haven't figured out yet:
viewportOffset and viewportSize are sometimes suddenly null in Firefox 5.
Even though it sounds weird:
It seems that the execution of this function is interferred by the onresize/onscroll event
where viewportOffset and viewportSize are unset
                */
                if (!viewportOffset || !viewportSize) {
                    return;
                }
                var eO = elementOffset,
                    vO = viewportOffset,
                    eS = elementSize,
                    vS = viewportSize,
                    vPX = visiblePartX,
                    vPY = visiblePartY,
                    vPM = visiblePartsMerged;

                if (eO.top + eS.height > vO.top && eO.top < vO.top + vS.height && eO.left + eS.width > vO.left && eO.left < vO.left + vS.width) {
                    vPX = (vO.left > eO.left ? 'right' : (vO.left + vS.width) < (eO.left + eS.width) ? 'left' : 'both');
                    vPY = (vO.top > eO.top ? 'bottom' : (vO.top + vS.height) < (eO.top + eS.height) ? 'top' : 'both');
                    vPM = vPX + "-" + vPY;
                    if (!inView || inView !== vPM) {
                        $element.data(name, vPM).trigger(name, [true, vPX, vPY]);
                    }
                } else if (inView) {
                    $element.data(name, false).trigger(name, [false]);
                }
            }
        }
        W.dust(-1);
    }

    $(W).bind("scroll resize", function () {
        viewportSize = viewportOffset = null;
    });

    // IE < 9 scrolls to focused elements without firing the "scroll" event
    if (!DE.addEventListener && DE.attachEvent) {
        DE.attachEvent("onfocusin", function () {
            viewportOffset = null;
        });
    }
    /*
Use setInterval in order to also make sure this captures elements within
"overflow:scroll" elements or elements that appeared in the dom tree due to
dom manipulation and reflow
old: $(window).scroll(checkInView);

By the way, iOS (iPad, iPhone, ...) seems to not execute, or at least delays
intervals while the user scrolls. Therefore the inview event might fire a bit late there
    */
    W.setInterval(checkInView, time);

    $(function () {
        C.warn('kickstart jquery.' + name);
        $(W).scroll();
    });

}(window, jQuery));
