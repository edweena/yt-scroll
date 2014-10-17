(function() {
    "use strict";
    var e;
    e = angular.module("ytControllers", []);
    e.controller("IndexCtrl", [ "$scope", "$http", "contentfulClient", function(e, t, r) {
        e.features = "";
        return r.entries({
            content_type: "tGyjv9K8h2kiGAW6qe2WI",
            include: 1
        }).then(function(t) {
            console.log(t);
            return e.features = t;
        });
    } ]);
    e.controller("DetailCtrl", [ "$scope", "$rootScope", "$routeParams", "$http", "$location", "contentfulClient", "$sce", "heightService", "initVidStyles", "initThumbStyles", "initButtonStyles", function(e, t, r, o, n, i, u, a, l, s, d) {
        var c;
        c = new Showdown.converter();
        e.dataready = false;
        e.vidMaster = l;
        e.thumbMaster = s;
        e.buttonMaster = d;
        e.youTubePrefix = "//www.youtube.com/embed/";
        e.youTubeParams = "?autoplay=0&loop=1&hd=1&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&rel=0";
        e.$watch("vidMaster", function() {
            return e.videoStyles = function() {
                return {
                    opacity: e.vidMaster.opacity
                };
            };
        });
        e.$watch("thumbMaster", function() {
            return e.thumbStyles = function() {
                return {
                    backgroundImage: e.thumbMaster.backgroundImage
                };
            };
        });
        e.$watch("buttonMaster", function() {
            return e.buttonStyles = function() {
                return {
                    display: e.buttonMaster.display
                };
            };
        });
        e.player = {};
        e.video = {};
        e.video.currentTime = 0;
        e.video.id = "";
        e.playerVars = {
            controls: 0,
            autoplay: 0,
            modestbranding: 1,
            showinfo: 0,
            hd: 1
        };
        e.$on("youtube.player.ready", function(t, r) {
            console.log("ready");
            return e.player = r;
        });
        return i.entries({
            "sys.id": r.featureId,
            include: 10
        }).then(function(t) {
            var r, o, n, i, a;
            e.feature = t[0];
            e.fields = e.feature.fields;
            console.log(e.fields);
            a = e.fields.youTubeListItems;
            for (n = 0, i = a.length; n < i; n++) {
                r = a[n];
                o = r.fields.bodyText;
                o = c.makeHtml(o);
            }
            e.trust = function(e) {
                return u.trustAsHtml(e);
            };
            e.fields.introText = c.makeHtml(e.fields.introText);
            e.items = e.fields.youTubeListItems;
            e.video.id = e.items[0].fields.youTubeVideoId;
            e.thumbMaster.backgroundImage = "url(" + e.fields.heroImage.fields.file.url + ")";
            e.thumbInit = "url(" + e.fields.heroImage.fields.file.url + ")";
            e.thumbMaster.backgroundSize = "cover";
            e.dataready = true;
            return e.playVideo = function(t) {
                e.vidMaster.opacity = 1;
                e.thumbMaster.backgroundImage = "none";
                e.buttonMaster.display = "none";
                e.player.seekTo(t);
                return e.player.playVideo();
            };
        });
    } ]);
}).call(this);