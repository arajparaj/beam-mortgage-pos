window.Site = {};
Y.use("node", "beam-gallery-ng", function(a) {
    a.Array.invoke = function(b, c) {
        var d = a.Array(arguments, 2, !0),
            g = a.Lang.isFunction,
            f = [];
        a.Array.each(a.Array(b), function(a, b) { a && g(a[c]) && (f[b] = a[c].apply(a, d)) });
        return f };
    a.augment(a.Node, Class.create({ index: function() {
            for (var a = 0, c = this; c = c.previous(c.get("tagName"));) a++;
            return a } }));
    Site.Common = Singleton.create({
        ready: function() {
            navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i) && a.one("html").addClass("ipad ios7");
            this.isMobile = !a.Lang.isUndefined(window.orientation);
            a.on("domready",
                this.initialize, this);
            this.checkMobileView();
            a.one(window).on(["resize", "orientationchange"], this.checkMobileView)
        },
        initialize: function() { a.one("body").addClass("loaded");
            a.one("body.collection-type-index") ? Site.Index.initialize() : a.one("body.collection-type-gallery") && Site.Gallery.initialize();
            this.bindUI();
            a.UA.ie && a.one("html").addClass("ie" + a.UA.ie) },
        bindUI: function() {
            this.setupMainNav();
            this.setupMobile();
            this.dropdownFix();
            a.one(window).on("orientationchange", function() { window.scrollTo(0, 0) },
                this)
        },
        _editControls: a.one(".beam-editable .sqsp-chrome-edit-mode .pill-controls"),
        sqsEditEvents: function() { this._editControls ? this._editoControls.delegate("click", function() {}) : a.later(200, this, this.sqsEditEvents) },
        setupMainNav: function() {
            var b = a.one("#sqs-social"),
                c = a.one(".main-nav .nav-wrapper");
            c && b && b.appendTo(c) },
        setupMobile: function() { a.one(".ctrl-button.menu").on("click", function(b) { b.halt();
                a.one("body").toggleClass("sqs-mobile-nav-open");
                this.updateAutoPlay() }, this) },
        dropdownFix: function() {
            a.one(".no-mobile-styles") &&
                a.all(".folder-child a").each(function(a) {
                    var c;
                    a.on("touchmove", function() { c = !0 });
                    a.on("touchend", function(d) { c || (d.halt(), window.location = a.getAttribute("href")) }) });
            a.all(".main-nav .folder").each(function(b) {
                var c = b.one(".folder-child-wrapper");
                b.on("mouseover", function() {
                    var b = c.getY() + c.get("clientHeight");
                    b > a.config.win.innerHeight && c.setStyles({ maxHeight: b - (b - a.config.win.innerHeight + 125), overflowY: "auto" }) }, this);
                b.on("mouseout", function() { c.setStyles({ maxHeight: "", overflowY: "" }) }) }, this)
        },
        checkMobileView: function() {!a.Lang.isUndefined(window.orientation) || 768 >= window.innerWidth ? a.one("html").addClass("mobile-view") : a.one("html").removeClass("mobile-view") },
        updateAutoPlay: function() {
            if (Site.Index.galleryIndex) {
                var b = !a.one("body.sqs-mobile-nav-open, body.show-overlay") && "true" === a.Beam.Template.getTweakValue("auto-play");
                Site.Index.galleryIndex.set("autoplay", b) } },
        updateColorDetect: function() {
            a.one("#canvas").removeClass("color-weight-dark").removeClass("color-weight-light");
            var b = a.one(".slideshow .sqs-active-slide img");
            (b = b && b.getAttribute("data-color-topleft")) && a.one("#canvas").addClass("color-weight-" + this._getLightness(b))
        },
        _getLightness: function(a) {
            return a && 0 < a.length && 7 >= a.length ? (a = a.replace("#", ""), 8388607.5 < parseInt(a, 16) ? "light" : "dark") : "" },
        setupNavigation: function() {
            if (!(1 >= a.one(".slideshow").all(".slide").size()) && (a.one(".arrow-wrapper.right").addClass("guide"), !Site.Common.isMobile)) {
                var b = a.later(2E3, this, function() { a.all(".arrow-wrapper").removeClass("guide") });
                a.one("body").on("mousemove", function(c) { c.clientX <= a.one("body").get("winWidth") / 2 && a.one("#fullscreenBrowser .sqs-active-slide").previous() ? a.one(".arrow-wrapper.left").addClass("guide").siblings().removeClass("guide") : c.clientX > a.one("body").get("winWidth") / 2 && a.one("#fullscreenBrowser .sqs-active-slide").next() && a.one(".arrow-wrapper.right").addClass("guide").siblings().removeClass("guide");
                    b && b.cancel() });
                a.one("#topNav").on("mousemove", function(a) { a.halt();
                    b.cancel() });
                a.one("body").on("mouseleave",
                    function() { a.all(".arrow-wrapper").removeClass("guide") })
            }
        }
    });
    Site.Index = Singleton.create({
        initialize: function() { this.galleryEl = a.one(".slideshow");
            this.setupGallery();
            this.bindUI();
            Site.Common.setupNavigation();
            this.setupTweakHandler() },
        setupGallery: function() {
            var b = 0;
            window.location.hash.match(/itemId/) && (b = (b = a.one('.slide[data-slide-id\x3d"' + (new a.HistoryHash).get("itemId") + '"]')) ? b.index() : 0);
            var c = Site.Common.isMobile ? "swipe" : "scroll";
            this.galleryIndex = new a.Beam.Gallery2({
                currentIndex: b,
                container: this.galleryEl,
                lazyLoad: !0,
                design: "stacked",
                refreshOnResize: !0,
                refreshOnOrientationChange: !0,
                autoplay: "true" === a.Beam.Template.getTweakValue("auto-play"),
                loop: "true" === a.Beam.Template.getTweakValue("auto-play"),
                autoplayOptions: { randomize: !1, timeout: 1E3 * parseInt(a.Beam.Template.getTweakValue("galleryAutoPlayDelay")) },
                designOptions: {
                    easing: a.Easing.easeOutStrong,
                    speed: 0.5,
                    autoHeight: !1,
                    clickBehavior: !1,
                    transition: "Fade" === a.Beam.Template.getTweakValue("index-transition") ?
                        "fade" : c
                },
                elements: { next: ".arrow-wrapper.right", previous: ".arrow-wrapper.left" },
                loaderOptions: { mode: "fill" }
            });
            this.galleryIndex.after("currentIndexChange", function() {
                var b = a.one(".sqs-active-slide");
                b.previous() ? b.next() || a.one(".arrow-wrapper.right").removeClass("guide") : a.one(".arrow-wrapper.left").removeClass("guide");
                Site.Common.updateColorDetect() }, this);
            Site.Common.updateColorDetect()
        },
        bindUI: function() {
            if (!Site.Common.isMobile) {
                a.one(".slideshow").on("click", function(b) {
                    b.target.ancestor('.sqs-video-wrapper, .collection-detail-wrapper, [data-type\x3d"video"]') ||
                        1 >= a.all(".slideshow .slide").size() || ("true" === a.Beam.Template.getTweakValue("slides-click-through") ? (b = "/" + b.target.ancestor(".slide").getAttribute("data-slide-url"), window.location = b) : b.clientX > a.one("body").get("winWidth") / 2 ? this.galleryIndex.nextSlide() : this.galleryIndex.previousSlide())
                }, this);
                var b;
                a.one("#headerWrapper").on("hover", function() { a.all(".index-overlay").setStyle("visibility", "visible");
                    a.one("body").addClass("show-overlay");
                    Site.Common.updateAutoPlay();
                    b && b.cancel() }, function() {
                    a.one("body").removeClass("show-overlay");
                    Site.Common.updateAutoPlay();
                    b && b.cancel();
                    b = a.later(500, this, function() { a.all(".index-overlay").setStyle("visibility", "hidden") })
                })
            }
        },
        setupTweakHandler: function() {
            var b = !1;
            a.Global && (a.Global.on("tweak:change", a.bind(function(a) {
                var d = a.getName(); "auto-play" === d ? (this.galleryIndex.set("autoplay", a.getValue()), this.galleryIndex.set("loop", a.getValue())) : "galleryAutoPlayDelay" === d ? this.galleryIndex.set("autoplayOptions.timeout", 1E3 * parseInt(a.getValue(), 10)) : d.match(/transition/) && (b = !0) }, this)), a.Global.on("tweak:close",
                a.bind(function() { b && window.location.reload(!0) })))
        }
    });
    Site.Gallery = Singleton.create({
        initialize: function() { this.galleryStripEl = a.one(".slideshow.strip");
            this.galleryStackedEl = a.one(".slideshow.stacked");
            this.setupGalleries();
            Site.Common.setupNavigation();
            this.bindUI();
            this.setupTweakHandler() },
        setupGalleries: function() {
            var b = function() {
                    var b = a.one("#fullscreenBrowser").get("winHeight"),
                        c = Math.max(a.one("#headerWrapper").height(), (b - 500) / 2);
                    a.one(".slideshow.strip") && a.one(".slideshow.strip").setStyles({
                        height: b -
                            2 * c,
                        marginTop: c
                    });
                    a.all(".strip .image-detail-wrapper").setStyles({ bottom: "-" + c + "px", height: c })
                },
                c = a.bind(function() {
                    this.galleryStrip.getSlides("image").each(function(a) {
                            var b = a.get("offsetWidth"),
                                c = a.setStyle("width", null).one("img");
                            ImageLoader.load(c);
                            c.setStyles({ top: 0, left: 0, height: "auto" });
                            c.get("offsetWidth");
                            c.setStyle("height", null);
                            c.get("offsetWidth");
                            b < a.one("img").get("offsetWidth") && (a.setStyle("width", this.galleryStrip.get("container").width()), c.loader.set("mode", "fit").fire("refresh")) },
                        this);
                    this.galleryStrip["gallery-design"].syncUI();
                    a.later(600, this, function() { this.galleryStripEl.addClass("rendered") })
                }, this);
            b();
            this.galleryStrip = new a.Beam.Gallery2({ container: this.galleryStripEl, design: "strip", lazyLoad: !0, loop: !0, historyHash: !0, elements: { next: ".arrow-wrapper.right", previous: ".arrow-wrapper.left" }, refreshOnResize: !0, refreshOnOrientationChange: !0, designOptions: { alignment: "start", activeSlideClickBehavior: !1, speed: 0.4, easing: a.Easing.easeOutStrong } });
            this.galleryStrip["gallery-design"] &&
                (this.galleryStrip["gallery-design"]._syncUIRefreshWrapperWidth = this._syncUIRefreshWrapperWidth, this.galleryStrip["gallery-design"]._flushEvents(), this.galleryStrip["gallery-design"].bindUI(), this.galleryStrip["gallery-design"].get("host").on("image-loaded", this.galleryStrip["gallery-design"]._syncUIRefreshWrapperWidth, this.galleryStrip["gallery-design"]), c());
            a.later(100, this, function() { this.setupLightbox(this.galleryStripEl.all(".slide").indexOf(a.one(".sqs-active-slide"))) });
            this.galleryStrip.after("currentIndexChange",
                function() {
                    var b = this.galleryStripEl.one(".sqs-active-slide");
                    Modernizr.touch && a.all(".arrow-wrapper").removeClass("guide");
                    a.all(".arrow-wrapper.last").removeClass("last");
                    b.previous() ? b.next() || a.one(".arrow-wrapper.right").addClass("last") : a.one(".arrow-wrapper.left").removeClass("guide") }, this);
            a.one(window).on(["resize", "orientationchange"], function() { b();
                c() })
        },
        setupLightbox: function(b) {
            this.galleryStacked = new a.Beam.Gallery2({
                currentIndex: b || 0,
                container: this.galleryStackedEl,
                slides: ".slide",
                design: "stacked",
                lazyLoad: !0,
                loop: !0,
                historyHash: !0,
                refreshOnResize: !0,
                refreshOnOrientationChange: !0,
                designOptions: { easing: a.Easing.easeOutStrong, speed: 0.5, autoHeight: !1, clickBehavior: !1, transition: "Fade" === a.Beam.Template.getTweakValue("lightbox-transition") ? "fade" : "scroll" },
                loaderOptions: { mode: "fit" }
            });
            this.galleryStrip.addChild(this.galleryStacked);
            this.galleryStacked.after("currentIndexChange", function() { Site.Common.updateColorDetect() }, this)
        },
        bindUI: function() {
            Site.Common.isMobile || (this.galleryStackedEl.on("click",
                function(b) {
                    if (a.one("body").hasClass("show-expanded") && !(b.target.ancestor(".sqs-video-wrapper, .collection-detail-wrapper") || 1 >= a.all(".slideshow .slide").size())) b.clientX > a.one("body").get("winWidth") / 2 ? this.galleryStacked.nextSlide() : this.galleryStacked.previousSlide() }, this), a.one(".ctrl-button.close").on("click", this.close, this), this.galleryStripEl.all(".slide").each(function(b) {
                var c = b.one("img");
                if (c) c.on("click", function(b) {
                    a.one("body.nav-disabled") && !b.currentTarget.getAttribute("data-click-through-url") &&
                        b.halt()
                });
                b.one(".ctrl-button.resize").on("click", function(c) { c.halt();
                    c = this.galleryStrip.get("currentIndex");
                    var d = b.index();
                    c !== d && (this.galleryStrip.set("currentIndex", d), this.galleryStacked.set("currentIndex", d));
                    Site.Common.updateColorDetect();
                    a.one("body").addClass("show-expanded");
                    a.one(".ctrl-button.close").setStyle("visibility", "visible");
                    this.ignoreBodyClicks = !0;
                    a.Beam.EscManager.addTarget(this) }, this);
                var d = b.one(".image-detail-wrapper"),
                    g, f;
                if (d) d.on("hover", function() {
                    g = d.height();
                    f = d.get("scrollHeight");
                    g < f && d.anim({}, { from: { height: g }, to: { height: f + 30 } }, { duration: 1, easing: a.Easing.easeOutStrong }).run()
                }, function() { d.anim({}, { to: { height: g } }, { duration: 1, easing: a.Easing.easeOutStrong }).run().on("end", function() { d.set("scrollTop", 0) }) })
            }, this))
        },
        close: function() { a.one("body").removeClass("show-expanded");
            a.later(500, this, function() { a.one(".ctrl-button.close").setStyle("visibility", null) });
            a.Beam.EscManager.removeTarget(this) },
        getWidthForHeight: function(a, c, d) {
            return a / c *
                d
        },
        getDimensionsFromNode: function(b) {
            if (b = b.getAttribute("data-image-dimensions")) {
                if (a.Lang.isString(b)) return b = b.split("x"), { width: parseInt(b[0], 10), height: parseInt(b[1], 10) } } else return { width: null, height: null } },
        _syncUIRefreshWrapperWidth: function() {
            if (this.get("host").get("container").hasClass("sqs.gallery-thumbnails")) {
                var b = this.get("host").get("container"),
                    c = b.get("offsetHeight");
                b.all(".sqs-video-thumbnail").each(function(a) {
                    a.hasClass("no-image") && a.one(".sqs-video-thumbnail-inner").setStyles({
                        width: Math.floor(c *
                            (16 / 9)) + "px"
                    });
                    var b = a.one("img");
                    b && (a.removeClass("loading"), a.setAttribute("style", "width: " + b.get("offsetWidth") + "px !important"))
                })
            }
            b = this.get("host")._wrapperEl;
            b.setStyles({ width: null });
            var d = this.get("host").get("container").get("offsetWidth"),
                g = this.get("host").get("container").get("offsetHeight"),
                f = this.get("host")._currentSlide(),
                h = 0,
                e = 0,
                i = a.all(".slideshow .slide").size();
            this.get("host").get("slides").each(function(a, b) {
                var c = a.one("img, .sqs-video-wrapper"),
                    c = c.videoloader ? {
                        width: c.videoloader.getWidth(),
                        height: c.videoloader.getHeight()
                    } : Site.Gallery.getDimensionsFromNode(c),
                    c = 15 + Site.Gallery.getWidthForHeight(c.width, c.height, g);
                this.get("host").get("currentIndex") > b && (e += c);
                h += c
            }, this);
            switch (this.get("alignment")) {
                case "middle":
                    e -= (d - f.get("offsetWidth")) / 2;
                    0 > e && (e = 0);
                    break;
                case "end":
                    e -= d - f.get("offsetWidth"), 0 > e && (e = 0) }
            h < d ? (e = (d - 35 - h) / -2, a.one("body").addClass("nav-disabled")) : a.one("body").removeClass("nav-disabled");
            b.setStyles({ width: 2 * h });
            var j = this,
                d = parseInt(b.getComputedStyle("left"),
                    10);
            a.Lang.isNumber(d);
            i = 25 < i && !a.one(".gallery-initiated") && 0 === e ? !1 : !0;
            !1 === i && b.setStyle("left", "0px");
            JSTween.tween(b.getDOMNode(), { left: { start: d, stop: -1 * e, time: 0, duration: 0.4, effect: "expoOut", onStart: function() { j.get("host").set("inMotion", !0) }, onStop: function() { j.get("host").set("inMotion", !1) } } });
            !0 === i && (JSTween.play(), !a.one(".gallery-initiated") && b.addClass("gallery-initiated"))
        },
        setupTweakHandler: function() {
            var b = !1;
            a.Global && (a.Global.on("tweak:change", a.bind(function(a) {
                a.getName().match(/transition/) &&
                    (b = !0)
            }, this)), a.Global.on("tweak:close", a.bind(function() { b && window.location.reload(!0) })))
        }
    })
});
