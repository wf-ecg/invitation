# MARKDOWN
Body text -- `mono text`

## PRE
    $ do `it`

### UL
* [spot link](http://site/) `(http://site/)`
* [named link][site] `[site]`

#### OL
0. 0
0. 0

[site]: http://site/


sticky scroll
scroll "curve"
transpose transition (overlap and fade) multibackground


life span of a view
    enter
    enerting
    entered
    scrolling (1-100?) [in range 1-1000
        fire entered (was <0 or >100
        fire exiting (was in range
    exiting
    exited


    port can translate any offset
        from pixels to percent
        from percent to pixels

Edges (we care about)
    top
    bottom

Port
    height()
    update() ... measure on resize? or alway call function?
    pixel() = current pix offset
    percent = pixel() / total pix height
    offset(boo).self .. return values relative to pixel() or Zero


Edge
    (where in Port (relative to container))
    lastPos
    delta: return current - lastPos
    current = top + offset (pixels)
    percent = any number (with 0 to 100 being relative to Port
    regCondition
        "enter bottom"
            delta() < 0 (decreasing)

    checkConditions

Shape.edges
        top:Edge
        bottom:Edge


