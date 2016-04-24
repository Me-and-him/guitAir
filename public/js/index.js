'use strict';

/*!
 *  howler.js v1.1.29
 *  howlerjs.com
 *
 *  (c) 2013-2016, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

!function () {
	var e = {},
	    o = null,
	    n = !0,
	    r = !1;try {
		"undefined" != typeof AudioContext ? o = new AudioContext() : "undefined" != typeof webkitAudioContext ? o = new webkitAudioContext() : n = !1;
	} catch (t) {
		n = !1;
	}if (!n) if ("undefined" != typeof Audio) try {
		new Audio();
	} catch (t) {
		r = !0;
	} else r = !0;if (n) {
		var a = "undefined" == typeof o.createGain ? o.createGainNode() : o.createGain();a.gain.value = 1, a.connect(o.destination);
	}var i = function i(e) {
		this._volume = 1, this._muted = !1, this.usingWebAudio = n, this.ctx = o, this.noAudio = r, this._howls = [], this._codecs = e, this.iOSAutoEnable = !0;
	};i.prototype = { volume: function volume(e) {
			var o = this;if (e = parseFloat(e), e >= 0 && 1 >= e) {
				o._volume = e, n && (a.gain.value = e);for (var r in o._howls) {
					if (o._howls.hasOwnProperty(r) && o._howls[r]._webAudio === !1) for (var t = 0; t < o._howls[r]._audioNode.length; t++) {
						o._howls[r]._audioNode[t].volume = o._howls[r]._volume * o._volume;
					}
				}return o;
			}return n ? a.gain.value : o._volume;
		}, mute: function mute() {
			return this._setMuted(!0), this;
		}, unmute: function unmute() {
			return this._setMuted(!1), this;
		}, _setMuted: function _setMuted(e) {
			var o = this;o._muted = e, n && (a.gain.value = e ? 0 : o._volume);for (var r in o._howls) {
				if (o._howls.hasOwnProperty(r) && o._howls[r]._webAudio === !1) for (var t = 0; t < o._howls[r]._audioNode.length; t++) {
					o._howls[r]._audioNode[t].muted = e;
				}
			}
		}, codecs: function codecs(e) {
			return this._codecs[e];
		}, _enableiOSAudio: function _enableiOSAudio() {
			var e = this;if (!o || !e._iOSEnabled && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
				e._iOSEnabled = !1;var n = function n() {
					var r = o.createBuffer(1, 1, 22050),
					    t = o.createBufferSource();t.buffer = r, t.connect(o.destination), "undefined" == typeof t.start ? t.noteOn(0) : t.start(0), setTimeout(function () {
						(t.playbackState === t.PLAYING_STATE || t.playbackState === t.FINISHED_STATE) && (e._iOSEnabled = !0, e.iOSAutoEnable = !1, window.removeEventListener("touchend", n, !1));
					}, 0);
				};return window.addEventListener("touchend", n, !1), e;
			}
		} };var u = null,
	    d = {};r || (u = new Audio(), d = { mp3: !!u.canPlayType("audio/mpeg;").replace(/^no$/, ""), opus: !!u.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""), ogg: !!u.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), wav: !!u.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), aac: !!u.canPlayType("audio/aac;").replace(/^no$/, ""), m4a: !!(u.canPlayType("audio/x-m4a;") || u.canPlayType("audio/m4a;") || u.canPlayType("audio/aac;")).replace(/^no$/, ""), mp4: !!(u.canPlayType("audio/x-mp4;") || u.canPlayType("audio/mp4;") || u.canPlayType("audio/aac;")).replace(/^no$/, ""), weba: !!u.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "") });var l = new i(d),
	    f = function f(e) {
		var r = this;r._autoplay = e.autoplay || !1, r._buffer = e.buffer || !1, r._duration = e.duration || 0, r._format = e.format || null, r._loop = e.loop || !1, r._loaded = !1, r._sprite = e.sprite || {}, r._src = e.src || "", r._pos3d = e.pos3d || [0, 0, -.5], r._volume = void 0 !== e.volume ? e.volume : 1, r._urls = e.urls || [], r._rate = e.rate || 1, r._model = e.model || null, r._onload = [e.onload || function () {}], r._onloaderror = [e.onloaderror || function () {}], r._onend = [e.onend || function () {}], r._onpause = [e.onpause || function () {}], r._onplay = [e.onplay || function () {}], r._onendTimer = [], r._webAudio = n && !r._buffer, r._audioNode = [], r._webAudio && r._setupAudioNode(), "undefined" != typeof o && o && l.iOSAutoEnable && l._enableiOSAudio(), l._howls.push(r), r.load();
	};if (f.prototype = { load: function load() {
			var e = this,
			    o = null;if (r) return void e.on("loaderror", new Error("No audio support."));for (var n = 0; n < e._urls.length; n++) {
				var t, a;if (e._format) t = e._format;else {
					if (a = e._urls[n], t = /^data:audio\/([^;,]+);/i.exec(a), t || (t = /\.([^.]+)$/.exec(a.split("?", 1)[0])), !t) return void e.on("loaderror", new Error("Could not extract format from passed URLs, please add format parameter."));t = t[1].toLowerCase();
				}if (d[t]) {
					o = e._urls[n];break;
				}
			}if (!o) return void e.on("loaderror", new Error("No codec support for selected audio sources."));if (e._src = o, e._webAudio) s(e, o);else {
				var u = new Audio();u.addEventListener("error", function () {
					u.error && 4 === u.error.code && (i.noAudio = !0), e.on("loaderror", { type: u.error ? u.error.code : 0 });
				}, !1), e._audioNode.push(u), u.src = o, u._pos = 0, u.preload = "auto", u.volume = l._muted ? 0 : e._volume * l.volume();var f = function f() {
					e._duration = Math.ceil(10 * u.duration) / 10, 0 === Object.getOwnPropertyNames(e._sprite).length && (e._sprite = { _default: [0, 1e3 * e._duration] }), e._loaded || (e._loaded = !0, e.on("load")), e._autoplay && e.play(), u.removeEventListener("canplaythrough", f, !1);
				};u.addEventListener("canplaythrough", f, !1), u.load();
			}return e;
		}, urls: function urls(e) {
			var o = this;return e ? (o.stop(), o._urls = "string" == typeof e ? [e] : e, o._loaded = !1, o.load(), o) : o._urls;
		}, play: function play(e, n) {
			var r = this;return "function" == typeof e && (n = e), e && "function" != typeof e || (e = "_default"), r._loaded ? r._sprite[e] ? (r._inactiveNode(function (t) {
				t._sprite = e;var a = t._pos > 0 ? t._pos : r._sprite[e][0] / 1e3,
				    i = 0;r._webAudio ? (i = r._sprite[e][1] / 1e3 - t._pos, t._pos > 0 && (a = r._sprite[e][0] / 1e3 + a)) : i = r._sprite[e][1] / 1e3 - (a - r._sprite[e][0] / 1e3);var u,
				    d = !(!r._loop && !r._sprite[e][2]),
				    f = "string" == typeof n ? n : Math.round(Date.now() * Math.random()) + "";if (function () {
					var o = { id: f, sprite: e, loop: d };u = setTimeout(function () {
						!r._webAudio && d && r.stop(o.id).play(e, o.id), r._webAudio && !d && (r._nodeById(o.id).paused = !0, r._nodeById(o.id)._pos = 0, r._clearEndTimer(o.id)), r._webAudio || d || r.stop(o.id), r.on("end", f);
					}, i / r._rate * 1e3), r._onendTimer.push({ timer: u, id: o.id });
				}(), r._webAudio) {
					var s = r._sprite[e][0] / 1e3,
					    _ = r._sprite[e][1] / 1e3;t.id = f, t.paused = !1, p(r, [d, s, _], f), r._playStart = o.currentTime, t.gain.value = r._volume, "undefined" == typeof t.bufferSource.start ? d ? t.bufferSource.noteGrainOn(0, a, 86400) : t.bufferSource.noteGrainOn(0, a, i) : d ? t.bufferSource.start(0, a, 86400) : t.bufferSource.start(0, a, i);
				} else {
					if (4 !== t.readyState && (t.readyState || !navigator.isCocoonJS)) return r._clearEndTimer(f), function () {
						var o = r,
						    a = e,
						    i = n,
						    u = t,
						    d = function d() {
							o.play(a, i), u.removeEventListener("canplaythrough", d, !1);
						};u.addEventListener("canplaythrough", d, !1);
					}(), r;t.readyState = 4, t.id = f, t.currentTime = a, t.muted = l._muted || t.muted, t.volume = r._volume * l.volume(), setTimeout(function () {
						t.play();
					}, 0);
				}return r.on("play"), "function" == typeof n && n(f), r;
			}), r) : ("function" == typeof n && n(), r) : (r.on("load", function () {
				r.play(e, n);
			}), r);
		}, pause: function pause(e) {
			var o = this;if (!o._loaded) return o.on("play", function () {
				o.pause(e);
			}), o;o._clearEndTimer(e);var n = e ? o._nodeById(e) : o._activeNode();if (n) if (n._pos = o.pos(null, e), o._webAudio) {
				if (!n.bufferSource || n.paused) return o;n.paused = !0, "undefined" == typeof n.bufferSource.stop ? n.bufferSource.noteOff(0) : n.bufferSource.stop(0);
			} else n.pause();return o.on("pause"), o;
		}, stop: function stop(e) {
			var o = this;if (!o._loaded) return o.on("play", function () {
				o.stop(e);
			}), o;o._clearEndTimer(e);var n = e ? o._nodeById(e) : o._activeNode();if (n) if (n._pos = 0, o._webAudio) {
				if (!n.bufferSource || n.paused) return o;n.paused = !0, "undefined" == typeof n.bufferSource.stop ? n.bufferSource.noteOff(0) : n.bufferSource.stop(0);
			} else isNaN(n.duration) || (n.pause(), n.currentTime = 0);return o;
		}, mute: function mute(e) {
			var o = this;if (!o._loaded) return o.on("play", function () {
				o.mute(e);
			}), o;var n = e ? o._nodeById(e) : o._activeNode();return n && (o._webAudio ? n.gain.value = 0 : n.muted = !0), o;
		}, unmute: function unmute(e) {
			var o = this;if (!o._loaded) return o.on("play", function () {
				o.unmute(e);
			}), o;var n = e ? o._nodeById(e) : o._activeNode();return n && (o._webAudio ? n.gain.value = o._volume : n.muted = !1), o;
		}, volume: function volume(e, o) {
			var n = this;if (e = parseFloat(e), e >= 0 && 1 >= e) {
				if (n._volume = e, !n._loaded) return n.on("play", function () {
					n.volume(e, o);
				}), n;var r = o ? n._nodeById(o) : n._activeNode();return r && (n._webAudio ? r.gain.value = e : r.volume = e * l.volume()), n;
			}return n._volume;
		}, loop: function loop(e) {
			var o = this;return "boolean" == typeof e ? (o._loop = e, o) : o._loop;
		}, sprite: function sprite(e) {
			var o = this;return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? (o._sprite = e, o) : o._sprite;
		}, pos: function pos(e, n) {
			var r = this;if (!r._loaded) return r.on("load", function () {
				r.pos(e);
			}), "number" == typeof e ? r : r._pos || 0;e = parseFloat(e);var t = n ? r._nodeById(n) : r._activeNode();if (t) return e >= 0 ? (r.pause(n), t._pos = e, r.play(t._sprite, n), r) : r._webAudio ? t._pos + (o.currentTime - r._playStart) : t.currentTime;if (e >= 0) return r;for (var a = 0; a < r._audioNode.length; a++) {
				if (r._audioNode[a].paused && 4 === r._audioNode[a].readyState) return r._webAudio ? r._audioNode[a]._pos : r._audioNode[a].currentTime;
			}
		}, pos3d: function pos3d(e, o, n, r) {
			var t = this;if (o = "undefined" != typeof o && o ? o : 0, n = "undefined" != typeof n && n ? n : -.5, !t._loaded) return t.on("play", function () {
				t.pos3d(e, o, n, r);
			}), t;if (!(e >= 0 || 0 > e)) return t._pos3d;if (t._webAudio) {
				var a = r ? t._nodeById(r) : t._activeNode();a && (t._pos3d = [e, o, n], a.panner.setPosition(e, o, n), a.panner.panningModel = t._model || "HRTF");
			}return t;
		}, fade: function fade(e, o, n, r, t) {
			var a = this,
			    i = Math.abs(e - o),
			    u = e > o ? "down" : "up",
			    d = i / .01,
			    l = n / d;if (!a._loaded) return a.on("load", function () {
				a.fade(e, o, n, r, t);
			}), a;a.volume(e, t);for (var f = 1; d >= f; f++) {
				!function () {
					var e = a._volume + ("up" === u ? .01 : -.01) * f,
					    n = Math.round(1e3 * e) / 1e3,
					    i = o;setTimeout(function () {
						a.volume(n, t), n === i && r && r();
					}, l * f);
				}();
			}
		}, fadeIn: function fadeIn(e, o, n) {
			return this.volume(0).play().fade(0, e, o, n);
		}, fadeOut: function fadeOut(e, o, n, r) {
			var t = this;return t.fade(t._volume, e, o, function () {
				n && n(), t.pause(r), t.on("end");
			}, r);
		}, _nodeById: function _nodeById(e) {
			for (var o = this, n = o._audioNode[0], r = 0; r < o._audioNode.length; r++) {
				if (o._audioNode[r].id === e) {
					n = o._audioNode[r];break;
				}
			}return n;
		}, _activeNode: function _activeNode() {
			for (var e = this, o = null, n = 0; n < e._audioNode.length; n++) {
				if (!e._audioNode[n].paused) {
					o = e._audioNode[n];break;
				}
			}return e._drainPool(), o;
		}, _inactiveNode: function _inactiveNode(e) {
			for (var o = this, n = null, r = 0; r < o._audioNode.length; r++) {
				if (o._audioNode[r].paused && 4 === o._audioNode[r].readyState) {
					e(o._audioNode[r]), n = !0;break;
				}
			}if (o._drainPool(), !n) {
				var t;if (o._webAudio) t = o._setupAudioNode(), e(t);else {
					o.load(), t = o._audioNode[o._audioNode.length - 1];var a = navigator.isCocoonJS ? "canplaythrough" : "loadedmetadata",
					    i = function i() {
						t.removeEventListener(a, i, !1), e(t);
					};t.addEventListener(a, i, !1);
				}
			}
		}, _drainPool: function _drainPool() {
			var e,
			    o = this,
			    n = 0;for (e = 0; e < o._audioNode.length; e++) {
				o._audioNode[e].paused && n++;
			}for (e = o._audioNode.length - 1; e >= 0 && !(5 >= n); e--) {
				o._audioNode[e].paused && (o._webAudio && o._audioNode[e].disconnect(0), n--, o._audioNode.splice(e, 1));
			}
		}, _clearEndTimer: function _clearEndTimer(e) {
			for (var o = this, n = -1, r = 0; r < o._onendTimer.length; r++) {
				if (o._onendTimer[r].id === e) {
					n = r;break;
				}
			}var t = o._onendTimer[n];t && (clearTimeout(t.timer), o._onendTimer.splice(n, 1));
		}, _setupAudioNode: function _setupAudioNode() {
			var e = this,
			    n = e._audioNode,
			    r = e._audioNode.length;return n[r] = "undefined" == typeof o.createGain ? o.createGainNode() : o.createGain(), n[r].gain.value = e._volume, n[r].paused = !0, n[r]._pos = 0, n[r].readyState = 4, n[r].connect(a), n[r].panner = o.createPanner(), n[r].panner.panningModel = e._model || "equalpower", n[r].panner.setPosition(e._pos3d[0], e._pos3d[1], e._pos3d[2]), n[r].panner.connect(n[r]), n[r];
		}, on: function on(e, o) {
			var n = this,
			    r = n["_on" + e];if ("function" == typeof o) r.push(o);else for (var t = 0; t < r.length; t++) {
				o ? r[t].call(n, o) : r[t].call(n);
			}return n;
		}, off: function off(e, o) {
			var n = this,
			    r = n["_on" + e];if (o) {
				for (var t = 0; t < r.length; t++) {
					if (o === r[t]) {
						r.splice(t, 1);break;
					}
				}
			} else n["_on" + e] = [];return n;
		}, unload: function unload() {
			for (var o = this, n = o._audioNode, r = 0; r < o._audioNode.length; r++) {
				n[r].paused || (o.stop(n[r].id), o.on("end", n[r].id)), o._webAudio ? n[r].disconnect(0) : n[r].src = "";
			}for (r = 0; r < o._onendTimer.length; r++) {
				clearTimeout(o._onendTimer[r].timer);
			}var t = l._howls.indexOf(o);null !== t && t >= 0 && l._howls.splice(t, 1), delete e[o._src], o = null;
		} }, n) var s = function s(o, n) {
		if (n in e) return o._duration = e[n].duration, void c(o);if (/^data:[^;]+;base64,/.test(n)) {
			for (var r = atob(n.split(",")[1]), t = new Uint8Array(r.length), a = 0; a < r.length; ++a) {
				t[a] = r.charCodeAt(a);
			}_(t.buffer, o, n);
		} else {
			var i = new XMLHttpRequest();i.open("GET", n, !0), i.responseType = "arraybuffer", i.onload = function () {
				_(i.response, o, n);
			}, i.onerror = function () {
				o._webAudio && (o._buffer = !0, o._webAudio = !1, o._audioNode = [], delete o._gainNode, delete e[n], o.load());
			};try {
				i.send();
			} catch (u) {
				i.onerror();
			}
		}
	},
	    _ = function _(n, r, t) {
		o.decodeAudioData(n, function (o) {
			o && (e[t] = o, c(r, o));
		}, function (e) {
			r.on("loaderror", e);
		});
	},
	    c = function c(e, o) {
		e._duration = o ? o.duration : e._duration, 0 === Object.getOwnPropertyNames(e._sprite).length && (e._sprite = { _default: [0, 1e3 * e._duration] }), e._loaded || (e._loaded = !0, e.on("load")), e._autoplay && e.play();
	},
	    p = function p(n, r, t) {
		var a = n._nodeById(t);a.bufferSource = o.createBufferSource(), a.bufferSource.buffer = e[n._src], a.bufferSource.connect(a.panner), a.bufferSource.loop = r[0], r[0] && (a.bufferSource.loopStart = r[1], a.bufferSource.loopEnd = r[1] + r[2]), a.bufferSource.playbackRate.value = n._rate;
	};"function" == typeof define && define.amd && define(function () {
		return { Howler: l, Howl: f };
	}), "undefined" != typeof exports && (exports.Howler = l, exports.Howl = f), "undefined" != typeof window && (window.Howler = l, window.Howl = f);
}();

;
//
//	Utils
//
// * animate(cb, duraton) -- wrapper of requestAnimationFrame
//
// DOM manipulations
//
// * closePopup(event) -- close popup with users unique code
// * onVolumeBtnClick(event) -- handler for volume buttons clicks (mute/unmute trigger)
// * onVolumeSliderInput(event) -- change audio volume whenvolume slider is being moved
// * updateScore(number) -- update current score
//
//	Canvas
//
// * refreshComputedSizes(object) -- change <canvas> sizes to actual
// * addMovementOnCanvas(movementInfo) -- add new movement canvas-object
// * animateMovement(object) -- make recieved already added movement run (animate)
// * onAgSetupEvent(event) -- handler for event, fired when game settings are recieved
//
// To remove
//
// * start() -- start game
// * nextBeat(isFirst) -- process (and add) next movement
//
// Initialization
//

(function () {

	function animate(draw, duration) {
		var start = performance.now();

		requestAnimationFrame(function animate(time) {
			// определить, сколько прошло времени с начала анимации
			var timePassed = time - start;

			// возможно небольшое превышение времени, в этом случае зафиксировать конец
			if (timePassed > duration) timePassed = duration;

			// нарисовать состояние анимации в момент timePassed
			draw(timePassed);

			// если время анимации не закончилось - запланировать ещё кадр
			if (timePassed < duration) {
				requestAnimationFrame(animate);
			}
		});
	}

	var config = {
		colors: {
			neutral: '#FFA700', // #8D99AE #107E7D
			success: '#C2E812',
			fail: '#B80C09'
		},
		movements: {
			radiusPercent: 4,
			strokeWidthPercent: 0.5
		}
	};

	function closePopup(event) {
		document.querySelectorAll('.popup')[0].classList.add('closed');
		document.querySelectorAll('.logo')[0].classList.remove('with-popup');
	}

	// Mutes / unmutes audio
	function onVolumeBtnClick(event) {

		if (!config.currentAudio.muted) {

			// Change view
			this.childNodes[1].classList.remove('fa-volume-up');
			this.childNodes[1].classList.add('fa-volume-off');

			// Mute
			config.currentAudio.mute();
			config.currentAudio.muted = true;
		} else {

			// Change view
			this.childNodes[1].classList.remove('fa-volume-off');
			this.childNodes[1].classList.add('fa-volume-up');

			// Unmute
			config.currentAudio.unmute();
			config.currentAudio.muted = false;
		}
	}

	// Change volume level of current audio
	function onVolumeSliderInput(event) {
		config.currentAudio.volume(this.value / 100);
	}

	function updateScore(newScore) {

		var score = document.querySelectorAll('.score')[0];
		var scoreNumber = document.querySelectorAll('.score-number')[0];

		score.classList.add('update');
		setTimeout(function () {
			score.classList.remove('update');
		}, 400);

		config.currentScore = parseInt(newScore);
		scoreNumber.innerHTML = config.currentScore;

		return config.currentScore;
	}

	// **********
	// * CANVAS *
	// **********

	// Changes canvas background size when fired
	function refreshComputedSizes(object) {

		config.canvOpts.computedStyle = {
			width: +object.width.slice(0, -2),
			height: +object.height.slice(0, -2)
		};

		canvas.setDimensions({
			width: config.canvOpts.computedStyle.width,
			height: config.canvOpts.computedStyle.height
		});
	}

	function addMovementOnCanvas(movementInfo) {

		if (movementInfo.name == 'pass') return;

		var radius = config.canvOpts.movements.radius;
		var strokeWidth = config.canvOpts.movements.strokeWidth;
		// var x = Math.round(config.canvOpts.computedStyle.width - (config.canvOpts.computedStyle.width/100)*3) - radius*2;
		var x = Math.round(config.canvOpts.computedStyle.width);
		var y = Math.round(config.oneHPercent * 45) + config.canvOpts.movements.strokeWidth * 1.6;

		var circle = new fabric.Circle({
			fill: config.colors.neutral,
			stroke: '#FFFFFF',
			strokeWidth: strokeWidth,
			radius: radius,
			originY: 'center',
			originX: 'center'
		});

		// console.log(-circle.getRadiusX()*0.8);
		var arrow;

		switch (movementInfo.name) {
			case 'up':
				arrow = new fabric.Path("\n\t\t\t\tM " + -circle.getRadiusX() * 0.65 + " " + circle.getRadiusY() * 0.11 + "\n\t\t\t\tL 0 " + -circle.getRadiusY() * 0.55 + "\n\t\t\t\tL " + circle.getRadiusX() * 0.65 + " " + circle.getRadiusY() * 0.11 + "\n\t\t\t\tL " + circle.getRadiusX() * 0.5 + " " + circle.getRadiusY() * 0.25 + "\n\t\t\t\tL 0 " + -circle.getRadiusY() * 0.25 + "\n\t\t\t\tL " + -circle.getRadiusX() * 0.5 + " " + circle.getRadiusY() * 0.25 + "\n\t\t\t\tz", {
					// fill: '#fff',
					originY: 'center',
					originX: 'center'
				});
				break;

			case 'down':
				arrow = new fabric.Path("\n\t\t\t\tM " + circle.getRadiusX() * 0.65 + " " + -circle.getRadiusY() * 0.11 + "\n\t\t\t\tL 0 " + circle.getRadiusY() * 0.55 + "\n\t\t\t\tL " + -circle.getRadiusX() * 0.65 + " " + -circle.getRadiusY() * 0.11 + "\n\t\t\t\tL " + -circle.getRadiusX() * 0.5 + " " + -circle.getRadiusY() * 0.25 + "\n\t\t\t\tL 0 " + circle.getRadiusY() * 0.25 + "\n\t\t\t\tL " + circle.getRadiusX() * 0.5 + " " + -circle.getRadiusY() * 0.25 + "\n\t\t\t\tz", {
					// fill: '#fff',
					originY: 'center',
					originX: 'center'
				});
				break;
		}

		var movement = new fabric.Group([circle, arrow], {
			top: y,
			left: x
		});

		movementInfo.canvasObject = movement;

		canvas.add(movement);
		canvas.renderAll();
		// movementInfo.state = 'added';
	}

	function animateMovement(movementInfo) {

		// if (movementInfo.name == 'pass') return;

		movementInfo.canvasObject.animate('left', '' + (config.oneWPercent * 20 + config.canvOpts.movements.strokeWidth * 1.5), {
			onChange: canvas.renderAll.bind(canvas),
			duration: config.currentMinInterval * 4
		});
	}

	function onGlSetupEvent(event) {
		config.currentBpm = event.detail.bpm;
		config.currentMinInterval = 60000 / config.currentBpm;
		config.currentSongName = event.detail.song;
		config.currentAudio = event.detail.music;
		closePopup();
		console.log(event.detail.bpm);

		// Test
		config.currentAudio.play();
	}

	// Actions performed when current game settings recieved
	function onGlAddMovement(event) {

		config.currentMovements.push({ name: event.detail });
		var thisMovement = config.currentMovements[config.currentMovements.length - 1];

		if (thisMovement.name == 'pass') return;

		addMovementOnCanvas(thisMovement);
		animateMovement(thisMovement);
	}

	function onGlStatus(event) {

		var status = event.detail.status;
		var movementIndex = event.detail.index;
		var newScore = event.detail.newScore;

		if (config.currentMovements[movementIndex].name == 'pass') return;

		var canvObj = config.currentMovements[movementIndex].canvasObject;

		// Run canvas animation
		canvObj.set({
			fill: config.colors[status]
		});

		// centeredScaling: true
		switch (status) {
			case 'success':
				canvObj.animate({
					'scaleX': 6,
					'scaleY': 6,
					'opacity': 0,
					'left': '-=' + config.canvOpts.movements.radius * 5.2,
					'top': '-=' + config.canvOpts.movements.radius * 5.2
				}, {
					onChange: canvas.renderAll.bind(canvas),
					duration: 700,
					easing: fabric.util.ease.easeOutQuart
				});
				break;

			case 'fail':
				canvObj.animate({
					'scaleX': 0.8,
					'scaleY': 0.8,
					'opacity': 0,
					'left': '' + -config.canvOpts.movements.radius
				}, // 'top': '-='+config.canvOpts.movements.radius
				{
					onChange: canvas.renderAll.bind(canvas),
					duration: 1000
				});
				// easing: fabric.util.ease.easeOutQuart
				break;
		}

		// Update score
		updateScore(newScore);
	}

	// ********
	// * Init *
	// ********

	config.currentMovements = [];
	config.currentScore = 0;
	config.currentStartDate = 0;

	// Get computed styles of whole page wrapper
	var canvasComputedStyleObj = getComputedStyle(document.querySelectorAll('.wr')[0]);

	// Set canvas options
	config.oneWPercent = parseInt(canvasComputedStyleObj.width.slice(0, -2)) / 100;
	config.oneHPercent = parseInt(canvasComputedStyleObj.height.slice(0, -2)) / 100;

	config.canvOpts = {
		bgURL: '../img/bg-crowd-1.jpg',
		computedStyle: {
			width: config.oneWPercent * 100,
			height: config.oneHPercent * 100
		},
		movements: {
			radius: config.oneWPercent * config.movements.radiusPercent,
			strokeWidth: config.oneWPercent * config.movements.strokeWidthPercent
		}
	};

	// Initialize 'fabric' canvas obj
	var canvas = new fabric.StaticCanvas('game', {
		width: config.canvOpts.computedStyle.width,
		height: config.canvOpts.computedStyle.height
	});

	// Draw "perfect success" place shadow circle
	config.shadowCircle = new fabric.Circle({
		fill: 'rgba(200,200,200,0.2)',
		stroke: 'rgba(200,200,200,1)',
		strokeWidth: config.canvOpts.movements.strokeWidth * 2,
		radius: config.canvOpts.movements.radius + config.canvOpts.movements.strokeWidth,
		top: Math.round(config.oneHPercent * 45),
		left: config.oneWPercent * 20
	});
	canvas.add(config.shadowCircle);

	// Set handler for adding of next movement in queue
	document.addEventListener('glAddMovement', onGlAddMovement);

	// Set handler for movement result event
	document.addEventListener('glStatus', onGlStatus);

	// Set handler for game setup event
	document.addEventListener('glSetupEvent', onGlSetupEvent);

	// Show current game code
	var codeContainer = document.getElementById('code-container');
	codeContainer.innerHTML = code;

	// *********
	// * Audio *
	// *********

	// Add muted state saving feature to Howl (audio lib)
	Howl.prototype.muted = false;
	Howl.muted = false;

	// Get volume button element
	var volumeBtn = document.querySelectorAll('.volume-btn')[0];
	// and set onClick event handler
	volumeBtn.addEventListener('click', onVolumeBtnClick);

	// Get volume level slider
	var volumeSlider = document.querySelectorAll('.volume-input')[0];
	// and set onInput event handler
	volumeSlider.addEventListener('input', onVolumeSliderInput);

	// Change canvas background size on window resize
	window.onresize = function () {
		refreshComputedSizes(canvasComputedStyleObj);
		canvas.renderAll.bind(canvas);
	};

	// TEST
	// document.addEventListener('click', closePopup);
})();
/**
 * gamelogic.js
 */

(function () {
	//

	var EPSILON = 1000;
	var config = {};

	// Actions performed when current game settings recieved
	function onAgSetupEvent(event) {
		console.log('agSetupEvent: ' + JSON.stringify(event.detail));
		//
		config.movements = event.detail.commands;
		//
		var audioFileURL = 'http://' + window.location.hostname + '/songs/' + event.detail.song;
		// let audioFileURL = '../audio/' + event.detail.song;
		console.log('audio file url: ' + audioFileURL);
		config.audio = new Howl({
			urls: [audioFileURL],
			autoplay: false,
			volume: 0.8
		});
		// Generate new event for the view.
		var newEvent = new CustomEvent('glSetupEvent', { detail: { song: event.detail.song, bpm: event.detail.bpm, commands: event.detail.commands, music: config.audio } });
		document.dispatchEvent(newEvent);
		// BPM, minInterval, beginning offset
		config.bpm = event.detail.bpm;
		config.minInterval = 60000 / config.bpm;
		config.beginningOffset = event.detail.offset;
		// Start.
		config.score = 0;
		config.startDate = Date.now();
		config.displayedIndex = 0;
		config.lastReceivedIndex = 0;
		config.lastPerformedAction = undefined;
		function sendMovement() {
			// Set deciding the status in the future.
			setTimeout(function () {
				//var index = Math.round((config.lastPerformedAction.time - config.startDate - config.beginningOffset) / config.minInterval);
				var index = config.displayedIndex - 4;
				var valid = config.lastPerformedAction.movement == config.movements[index] && Math.abs(config.lastPerformedAction.time - Date.now()) < config.minInterval / 2;
				if (valid) {
					config.score += 100;
					console.log(index);
					var newEvent = new CustomEvent('glStatus', { detail: {
							status: "success",
							index: index,
							newScore: config.score
						} });
					document.dispatchEvent(newEvent);
				} else {
					config.score -= 10;
					var newEvent = new CustomEvent('glStatus', { detail: {
							status: "fail",
							index: index,
							newScore: config.score
						} });
					document.dispatchEvent(newEvent);
				}
				config.lastPerformedAction = 'pass';
			}, config.minInterval * 4);
			//
			var newEvent = new CustomEvent('glAddMovement', { detail: config.movements[config.displayedIndex] });
			// console.log(newEvent);
			config.displayedIndex++;
			document.dispatchEvent(newEvent);
			config.timer = setTimeout(sendMovement, config.minInterval);
		}
		setTimeout(sendMovement, config.beginningOffset);
		config.audio.start();
	}

	function onAgCommandEvent(event) {
		// console.log('agCommandEvent: ' + JSON.stringify(event.detail));
		if (event.detail.movement == 'stop') clearInterval(config.timer);
		config.lastPerformedAction = event.detail;
	}

	document.addEventListener('agSetupEvent', onAgSetupEvent);
	document.addEventListener('agCommandEvent', onAgCommandEvent);
})();
/**
 * connection.js
 *
 * ``agSetupEvent``s set the song name and the command sequence.
 * ``agCommandEvent``s say which command user sent.
 */

(function () {
	// Emits fake events.

	var newEvent = new CustomEvent('agSetupEvent', { detail: { song: '12 Home.mp3', bpm: 128, offset: 1000, commands: ['up', 'down', 'pass', 'pass', 'up', 'down', 'pass', 'pass', 'stop'] } });
	document.dispatchEvent(newEvent);
	function sendMovement() {
		var newEvent = new CustomEvent('agCommandEvent', { detail: { time: Date.now(), movement: 'up' } });
		document.dispatchEvent(newEvent);
		setTimeout(sendMovement, 1000);
	}
	sendMovement();
})();
//# sourceMappingURL=data:application/json;base64,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S0FBMUIsRUFBaUM7O0FBRXBDLE1BQUksTUFBTSxNQUFOLENBQWEsUUFBYixJQUF5QixNQUE3QixFQUFxQyxjQUFjLE9BQU8sS0FBckI7QUFDckMsU0FBTyxtQkFBUCxHQUE2QixNQUFNLE1BQW5DO0FBQ0k7O0FBRUQsVUFBUyxnQkFBVCxDQUEwQixjQUExQixFQUEwQyxjQUExQztBQUNBLFVBQVMsZ0JBQVQsQ0FBMEIsZ0JBQTFCLEVBQTRDLGdCQUE1QztBQUNILENBM0ZEOzs7Ozs7OztBQW1HQSxDQUFDLFlBQVc7OztBQUdSLEtBQUksV0FBVyxJQUFJLFdBQUosQ0FDbEIsY0FEa0IsRUFFbEIsRUFBQyxRQUFRLEVBQUMsTUFBTSxhQUFQLEVBQXNCLEtBQUssR0FBM0IsRUFBZ0MsUUFBUSxJQUF4QyxFQUE4QyxVQUFVLENBQUMsSUFBRCxFQUFPLE1BQVAsRUFBZSxNQUFmLEVBQXVCLE1BQXZCLEVBQStCLElBQS9CLEVBQXFDLE1BQXJDLEVBQTZDLE1BQTdDLEVBQXFELE1BQXJELEVBQTZELE1BQTdELENBQXhELEVBQVQsRUFGa0IsQ0FBZjtBQUlBLFVBQVMsYUFBVCxDQUF1QixRQUF2QjtBQUNBLFVBQVMsWUFBVCxHQUF3QjtBQUMzQixNQUFJLFdBQVcsSUFBSSxXQUFKLENBQ1gsZ0JBRFcsRUFFWCxFQUFDLFFBQVEsRUFBQyxNQUFNLEtBQUssR0FBTCxFQUFQLEVBQW1CLFVBQVUsSUFBN0IsRUFBVCxFQUZXLENBQWY7QUFJQSxXQUFTLGFBQVQsQ0FBdUIsUUFBdkI7QUFDQSxhQUFXLFlBQVgsRUFBeUIsSUFBekI7QUFDSTtBQUNEO0FBQ0gsQ0FqQkQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qIVxuICogIGhvd2xlci5qcyB2MS4xLjI5XG4gKiAgaG93bGVyanMuY29tXG4gKlxuICogIChjKSAyMDEzLTIwMTYsIEphbWVzIFNpbXBzb24gb2YgR29sZEZpcmUgU3R1ZGlvc1xuICogIGdvbGRmaXJlc3R1ZGlvcy5jb21cbiAqXG4gKiAgTUlUIExpY2Vuc2VcbiAqL1xuIWZ1bmN0aW9uKCl7dmFyIGU9e30sbz1udWxsLG49ITAscj0hMTt0cnl7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEF1ZGlvQ29udGV4dD9vPW5ldyBBdWRpb0NvbnRleHQ6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdlYmtpdEF1ZGlvQ29udGV4dD9vPW5ldyB3ZWJraXRBdWRpb0NvbnRleHQ6bj0hMX1jYXRjaCh0KXtuPSExfWlmKCFuKWlmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBBdWRpbyl0cnl7bmV3IEF1ZGlvfWNhdGNoKHQpe3I9ITB9ZWxzZSByPSEwO2lmKG4pe3ZhciBhPVwidW5kZWZpbmVkXCI9PXR5cGVvZiBvLmNyZWF0ZUdhaW4/by5jcmVhdGVHYWluTm9kZSgpOm8uY3JlYXRlR2FpbigpO2EuZ2Fpbi52YWx1ZT0xLGEuY29ubmVjdChvLmRlc3RpbmF0aW9uKX12YXIgaT1mdW5jdGlvbihlKXt0aGlzLl92b2x1bWU9MSx0aGlzLl9tdXRlZD0hMSx0aGlzLnVzaW5nV2ViQXVkaW89bix0aGlzLmN0eD1vLHRoaXMubm9BdWRpbz1yLHRoaXMuX2hvd2xzPVtdLHRoaXMuX2NvZGVjcz1lLHRoaXMuaU9TQXV0b0VuYWJsZT0hMH07aS5wcm90b3R5cGU9e3ZvbHVtZTpmdW5jdGlvbihlKXt2YXIgbz10aGlzO2lmKGU9cGFyc2VGbG9hdChlKSxlPj0wJiYxPj1lKXtvLl92b2x1bWU9ZSxuJiYoYS5nYWluLnZhbHVlPWUpO2Zvcih2YXIgciBpbiBvLl9ob3dscylpZihvLl9ob3dscy5oYXNPd25Qcm9wZXJ0eShyKSYmby5faG93bHNbcl0uX3dlYkF1ZGlvPT09ITEpZm9yKHZhciB0PTA7dDxvLl9ob3dsc1tyXS5fYXVkaW9Ob2RlLmxlbmd0aDt0Kyspby5faG93bHNbcl0uX2F1ZGlvTm9kZVt0XS52b2x1bWU9by5faG93bHNbcl0uX3ZvbHVtZSpvLl92b2x1bWU7cmV0dXJuIG99cmV0dXJuIG4/YS5nYWluLnZhbHVlOm8uX3ZvbHVtZX0sbXV0ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9zZXRNdXRlZCghMCksdGhpc30sdW5tdXRlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX3NldE11dGVkKCExKSx0aGlzfSxfc2V0TXV0ZWQ6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcztvLl9tdXRlZD1lLG4mJihhLmdhaW4udmFsdWU9ZT8wOm8uX3ZvbHVtZSk7Zm9yKHZhciByIGluIG8uX2hvd2xzKWlmKG8uX2hvd2xzLmhhc093blByb3BlcnR5KHIpJiZvLl9ob3dsc1tyXS5fd2ViQXVkaW89PT0hMSlmb3IodmFyIHQ9MDt0PG8uX2hvd2xzW3JdLl9hdWRpb05vZGUubGVuZ3RoO3QrKylvLl9ob3dsc1tyXS5fYXVkaW9Ob2RlW3RdLm11dGVkPWV9LGNvZGVjczpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5fY29kZWNzW2VdfSxfZW5hYmxlaU9TQXVkaW86ZnVuY3Rpb24oKXt2YXIgZT10aGlzO2lmKCFvfHwhZS5faU9TRW5hYmxlZCYmL2lQaG9uZXxpUGFkfGlQb2QvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKXtlLl9pT1NFbmFibGVkPSExO3ZhciBuPWZ1bmN0aW9uKCl7dmFyIHI9by5jcmVhdGVCdWZmZXIoMSwxLDIyMDUwKSx0PW8uY3JlYXRlQnVmZmVyU291cmNlKCk7dC5idWZmZXI9cix0LmNvbm5lY3Qoby5kZXN0aW5hdGlvbiksXCJ1bmRlZmluZWRcIj09dHlwZW9mIHQuc3RhcnQ/dC5ub3RlT24oMCk6dC5zdGFydCgwKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7KHQucGxheWJhY2tTdGF0ZT09PXQuUExBWUlOR19TVEFURXx8dC5wbGF5YmFja1N0YXRlPT09dC5GSU5JU0hFRF9TVEFURSkmJihlLl9pT1NFbmFibGVkPSEwLGUuaU9TQXV0b0VuYWJsZT0hMSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsbiwhMSkpfSwwKX07cmV0dXJuIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIixuLCExKSxlfX19O3ZhciB1PW51bGwsZD17fTtyfHwodT1uZXcgQXVkaW8sZD17bXAzOiEhdS5jYW5QbGF5VHlwZShcImF1ZGlvL21wZWc7XCIpLnJlcGxhY2UoL15ubyQvLFwiXCIpLG9wdXM6ISF1LmNhblBsYXlUeXBlKCdhdWRpby9vZ2c7IGNvZGVjcz1cIm9wdXNcIicpLnJlcGxhY2UoL15ubyQvLFwiXCIpLG9nZzohIXUuY2FuUGxheVR5cGUoJ2F1ZGlvL29nZzsgY29kZWNzPVwidm9yYmlzXCInKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSx3YXY6ISF1LmNhblBsYXlUeXBlKCdhdWRpby93YXY7IGNvZGVjcz1cIjFcIicpLnJlcGxhY2UoL15ubyQvLFwiXCIpLGFhYzohIXUuY2FuUGxheVR5cGUoXCJhdWRpby9hYWM7XCIpLnJlcGxhY2UoL15ubyQvLFwiXCIpLG00YTohISh1LmNhblBsYXlUeXBlKFwiYXVkaW8veC1tNGE7XCIpfHx1LmNhblBsYXlUeXBlKFwiYXVkaW8vbTRhO1wiKXx8dS5jYW5QbGF5VHlwZShcImF1ZGlvL2FhYztcIikpLnJlcGxhY2UoL15ubyQvLFwiXCIpLG1wNDohISh1LmNhblBsYXlUeXBlKFwiYXVkaW8veC1tcDQ7XCIpfHx1LmNhblBsYXlUeXBlKFwiYXVkaW8vbXA0O1wiKXx8dS5jYW5QbGF5VHlwZShcImF1ZGlvL2FhYztcIikpLnJlcGxhY2UoL15ubyQvLFwiXCIpLHdlYmE6ISF1LmNhblBsYXlUeXBlKCdhdWRpby93ZWJtOyBjb2RlY3M9XCJ2b3JiaXNcIicpLnJlcGxhY2UoL15ubyQvLFwiXCIpfSk7dmFyIGw9bmV3IGkoZCksZj1mdW5jdGlvbihlKXt2YXIgcj10aGlzO3IuX2F1dG9wbGF5PWUuYXV0b3BsYXl8fCExLHIuX2J1ZmZlcj1lLmJ1ZmZlcnx8ITEsci5fZHVyYXRpb249ZS5kdXJhdGlvbnx8MCxyLl9mb3JtYXQ9ZS5mb3JtYXR8fG51bGwsci5fbG9vcD1lLmxvb3B8fCExLHIuX2xvYWRlZD0hMSxyLl9zcHJpdGU9ZS5zcHJpdGV8fHt9LHIuX3NyYz1lLnNyY3x8XCJcIixyLl9wb3MzZD1lLnBvczNkfHxbMCwwLC0uNV0sci5fdm9sdW1lPXZvaWQgMCE9PWUudm9sdW1lP2Uudm9sdW1lOjEsci5fdXJscz1lLnVybHN8fFtdLHIuX3JhdGU9ZS5yYXRlfHwxLHIuX21vZGVsPWUubW9kZWx8fG51bGwsci5fb25sb2FkPVtlLm9ubG9hZHx8ZnVuY3Rpb24oKXt9XSxyLl9vbmxvYWRlcnJvcj1bZS5vbmxvYWRlcnJvcnx8ZnVuY3Rpb24oKXt9XSxyLl9vbmVuZD1bZS5vbmVuZHx8ZnVuY3Rpb24oKXt9XSxyLl9vbnBhdXNlPVtlLm9ucGF1c2V8fGZ1bmN0aW9uKCl7fV0sci5fb25wbGF5PVtlLm9ucGxheXx8ZnVuY3Rpb24oKXt9XSxyLl9vbmVuZFRpbWVyPVtdLHIuX3dlYkF1ZGlvPW4mJiFyLl9idWZmZXIsci5fYXVkaW9Ob2RlPVtdLHIuX3dlYkF1ZGlvJiZyLl9zZXR1cEF1ZGlvTm9kZSgpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBvJiZvJiZsLmlPU0F1dG9FbmFibGUmJmwuX2VuYWJsZWlPU0F1ZGlvKCksbC5faG93bHMucHVzaChyKSxyLmxvYWQoKX07aWYoZi5wcm90b3R5cGU9e2xvYWQ6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLG89bnVsbDtpZihyKXJldHVybiB2b2lkIGUub24oXCJsb2FkZXJyb3JcIixuZXcgRXJyb3IoXCJObyBhdWRpbyBzdXBwb3J0LlwiKSk7Zm9yKHZhciBuPTA7bjxlLl91cmxzLmxlbmd0aDtuKyspe3ZhciB0LGE7aWYoZS5fZm9ybWF0KXQ9ZS5fZm9ybWF0O2Vsc2V7aWYoYT1lLl91cmxzW25dLHQ9L15kYXRhOmF1ZGlvXFwvKFteOyxdKyk7L2kuZXhlYyhhKSx0fHwodD0vXFwuKFteLl0rKSQvLmV4ZWMoYS5zcGxpdChcIj9cIiwxKVswXSkpLCF0KXJldHVybiB2b2lkIGUub24oXCJsb2FkZXJyb3JcIixuZXcgRXJyb3IoXCJDb3VsZCBub3QgZXh0cmFjdCBmb3JtYXQgZnJvbSBwYXNzZWQgVVJMcywgcGxlYXNlIGFkZCBmb3JtYXQgcGFyYW1ldGVyLlwiKSk7dD10WzFdLnRvTG93ZXJDYXNlKCl9aWYoZFt0XSl7bz1lLl91cmxzW25dO2JyZWFrfX1pZighbylyZXR1cm4gdm9pZCBlLm9uKFwibG9hZGVycm9yXCIsbmV3IEVycm9yKFwiTm8gY29kZWMgc3VwcG9ydCBmb3Igc2VsZWN0ZWQgYXVkaW8gc291cmNlcy5cIikpO2lmKGUuX3NyYz1vLGUuX3dlYkF1ZGlvKXMoZSxvKTtlbHNle3ZhciB1PW5ldyBBdWRpbzt1LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLGZ1bmN0aW9uKCl7dS5lcnJvciYmND09PXUuZXJyb3IuY29kZSYmKGkubm9BdWRpbz0hMCksZS5vbihcImxvYWRlcnJvclwiLHt0eXBlOnUuZXJyb3I/dS5lcnJvci5jb2RlOjB9KX0sITEpLGUuX2F1ZGlvTm9kZS5wdXNoKHUpLHUuc3JjPW8sdS5fcG9zPTAsdS5wcmVsb2FkPVwiYXV0b1wiLHUudm9sdW1lPWwuX211dGVkPzA6ZS5fdm9sdW1lKmwudm9sdW1lKCk7dmFyIGY9ZnVuY3Rpb24oKXtlLl9kdXJhdGlvbj1NYXRoLmNlaWwoMTAqdS5kdXJhdGlvbikvMTAsMD09PU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGUuX3Nwcml0ZSkubGVuZ3RoJiYoZS5fc3ByaXRlPXtfZGVmYXVsdDpbMCwxZTMqZS5fZHVyYXRpb25dfSksZS5fbG9hZGVkfHwoZS5fbG9hZGVkPSEwLGUub24oXCJsb2FkXCIpKSxlLl9hdXRvcGxheSYmZS5wbGF5KCksdS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2FucGxheXRocm91Z2hcIixmLCExKX07dS5hZGRFdmVudExpc3RlbmVyKFwiY2FucGxheXRocm91Z2hcIixmLCExKSx1LmxvYWQoKX1yZXR1cm4gZX0sdXJsczpmdW5jdGlvbihlKXt2YXIgbz10aGlzO3JldHVybiBlPyhvLnN0b3AoKSxvLl91cmxzPVwic3RyaW5nXCI9PXR5cGVvZiBlP1tlXTplLG8uX2xvYWRlZD0hMSxvLmxvYWQoKSxvKTpvLl91cmxzfSxwbGF5OmZ1bmN0aW9uKGUsbil7dmFyIHI9dGhpcztyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBlJiYobj1lKSxlJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBlfHwoZT1cIl9kZWZhdWx0XCIpLHIuX2xvYWRlZD9yLl9zcHJpdGVbZV0/KHIuX2luYWN0aXZlTm9kZShmdW5jdGlvbih0KXt0Ll9zcHJpdGU9ZTt2YXIgYT10Ll9wb3M+MD90Ll9wb3M6ci5fc3ByaXRlW2VdWzBdLzFlMyxpPTA7ci5fd2ViQXVkaW8/KGk9ci5fc3ByaXRlW2VdWzFdLzFlMy10Ll9wb3MsdC5fcG9zPjAmJihhPXIuX3Nwcml0ZVtlXVswXS8xZTMrYSkpOmk9ci5fc3ByaXRlW2VdWzFdLzFlMy0oYS1yLl9zcHJpdGVbZV1bMF0vMWUzKTt2YXIgdSxkPSEoIXIuX2xvb3AmJiFyLl9zcHJpdGVbZV1bMl0pLGY9XCJzdHJpbmdcIj09dHlwZW9mIG4/bjpNYXRoLnJvdW5kKERhdGUubm93KCkqTWF0aC5yYW5kb20oKSkrXCJcIjtpZihmdW5jdGlvbigpe3ZhciBvPXtpZDpmLHNwcml0ZTplLGxvb3A6ZH07dT1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IXIuX3dlYkF1ZGlvJiZkJiZyLnN0b3Aoby5pZCkucGxheShlLG8uaWQpLHIuX3dlYkF1ZGlvJiYhZCYmKHIuX25vZGVCeUlkKG8uaWQpLnBhdXNlZD0hMCxyLl9ub2RlQnlJZChvLmlkKS5fcG9zPTAsci5fY2xlYXJFbmRUaW1lcihvLmlkKSksci5fd2ViQXVkaW98fGR8fHIuc3RvcChvLmlkKSxyLm9uKFwiZW5kXCIsZil9LGkvci5fcmF0ZSoxZTMpLHIuX29uZW5kVGltZXIucHVzaCh7dGltZXI6dSxpZDpvLmlkfSl9KCksci5fd2ViQXVkaW8pe3ZhciBzPXIuX3Nwcml0ZVtlXVswXS8xZTMsXz1yLl9zcHJpdGVbZV1bMV0vMWUzO3QuaWQ9Zix0LnBhdXNlZD0hMSxwKHIsW2QscyxfXSxmKSxyLl9wbGF5U3RhcnQ9by5jdXJyZW50VGltZSx0LmdhaW4udmFsdWU9ci5fdm9sdW1lLFwidW5kZWZpbmVkXCI9PXR5cGVvZiB0LmJ1ZmZlclNvdXJjZS5zdGFydD9kP3QuYnVmZmVyU291cmNlLm5vdGVHcmFpbk9uKDAsYSw4NjQwMCk6dC5idWZmZXJTb3VyY2Uubm90ZUdyYWluT24oMCxhLGkpOmQ/dC5idWZmZXJTb3VyY2Uuc3RhcnQoMCxhLDg2NDAwKTp0LmJ1ZmZlclNvdXJjZS5zdGFydCgwLGEsaSl9ZWxzZXtpZig0IT09dC5yZWFkeVN0YXRlJiYodC5yZWFkeVN0YXRlfHwhbmF2aWdhdG9yLmlzQ29jb29uSlMpKXJldHVybiByLl9jbGVhckVuZFRpbWVyKGYpLGZ1bmN0aW9uKCl7dmFyIG89cixhPWUsaT1uLHU9dCxkPWZ1bmN0aW9uKCl7by5wbGF5KGEsaSksdS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2FucGxheXRocm91Z2hcIixkLCExKX07dS5hZGRFdmVudExpc3RlbmVyKFwiY2FucGxheXRocm91Z2hcIixkLCExKX0oKSxyO3QucmVhZHlTdGF0ZT00LHQuaWQ9Zix0LmN1cnJlbnRUaW1lPWEsdC5tdXRlZD1sLl9tdXRlZHx8dC5tdXRlZCx0LnZvbHVtZT1yLl92b2x1bWUqbC52b2x1bWUoKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dC5wbGF5KCl9LDApfXJldHVybiByLm9uKFwicGxheVwiKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBuJiZuKGYpLHJ9KSxyKTooXCJmdW5jdGlvblwiPT10eXBlb2YgbiYmbigpLHIpOihyLm9uKFwibG9hZFwiLGZ1bmN0aW9uKCl7ci5wbGF5KGUsbil9KSxyKX0scGF1c2U6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcztpZighby5fbG9hZGVkKXJldHVybiBvLm9uKFwicGxheVwiLGZ1bmN0aW9uKCl7by5wYXVzZShlKX0pLG87by5fY2xlYXJFbmRUaW1lcihlKTt2YXIgbj1lP28uX25vZGVCeUlkKGUpOm8uX2FjdGl2ZU5vZGUoKTtpZihuKWlmKG4uX3Bvcz1vLnBvcyhudWxsLGUpLG8uX3dlYkF1ZGlvKXtpZighbi5idWZmZXJTb3VyY2V8fG4ucGF1c2VkKXJldHVybiBvO24ucGF1c2VkPSEwLFwidW5kZWZpbmVkXCI9PXR5cGVvZiBuLmJ1ZmZlclNvdXJjZS5zdG9wP24uYnVmZmVyU291cmNlLm5vdGVPZmYoMCk6bi5idWZmZXJTb3VyY2Uuc3RvcCgwKX1lbHNlIG4ucGF1c2UoKTtyZXR1cm4gby5vbihcInBhdXNlXCIpLG99LHN0b3A6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcztpZighby5fbG9hZGVkKXJldHVybiBvLm9uKFwicGxheVwiLGZ1bmN0aW9uKCl7by5zdG9wKGUpfSksbztvLl9jbGVhckVuZFRpbWVyKGUpO3ZhciBuPWU/by5fbm9kZUJ5SWQoZSk6by5fYWN0aXZlTm9kZSgpO2lmKG4paWYobi5fcG9zPTAsby5fd2ViQXVkaW8pe2lmKCFuLmJ1ZmZlclNvdXJjZXx8bi5wYXVzZWQpcmV0dXJuIG87bi5wYXVzZWQ9ITAsXCJ1bmRlZmluZWRcIj09dHlwZW9mIG4uYnVmZmVyU291cmNlLnN0b3A/bi5idWZmZXJTb3VyY2Uubm90ZU9mZigwKTpuLmJ1ZmZlclNvdXJjZS5zdG9wKDApfWVsc2UgaXNOYU4obi5kdXJhdGlvbil8fChuLnBhdXNlKCksbi5jdXJyZW50VGltZT0wKTtyZXR1cm4gb30sbXV0ZTpmdW5jdGlvbihlKXt2YXIgbz10aGlzO2lmKCFvLl9sb2FkZWQpcmV0dXJuIG8ub24oXCJwbGF5XCIsZnVuY3Rpb24oKXtvLm11dGUoZSl9KSxvO3ZhciBuPWU/by5fbm9kZUJ5SWQoZSk6by5fYWN0aXZlTm9kZSgpO3JldHVybiBuJiYoby5fd2ViQXVkaW8/bi5nYWluLnZhbHVlPTA6bi5tdXRlZD0hMCksb30sdW5tdXRlOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7aWYoIW8uX2xvYWRlZClyZXR1cm4gby5vbihcInBsYXlcIixmdW5jdGlvbigpe28udW5tdXRlKGUpfSksbzt2YXIgbj1lP28uX25vZGVCeUlkKGUpOm8uX2FjdGl2ZU5vZGUoKTtyZXR1cm4gbiYmKG8uX3dlYkF1ZGlvP24uZ2Fpbi52YWx1ZT1vLl92b2x1bWU6bi5tdXRlZD0hMSksb30sdm9sdW1lOmZ1bmN0aW9uKGUsbyl7dmFyIG49dGhpcztpZihlPXBhcnNlRmxvYXQoZSksZT49MCYmMT49ZSl7aWYobi5fdm9sdW1lPWUsIW4uX2xvYWRlZClyZXR1cm4gbi5vbihcInBsYXlcIixmdW5jdGlvbigpe24udm9sdW1lKGUsbyl9KSxuO3ZhciByPW8/bi5fbm9kZUJ5SWQobyk6bi5fYWN0aXZlTm9kZSgpO3JldHVybiByJiYobi5fd2ViQXVkaW8/ci5nYWluLnZhbHVlPWU6ci52b2x1bWU9ZSpsLnZvbHVtZSgpKSxufXJldHVybiBuLl92b2x1bWV9LGxvb3A6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcztyZXR1cm5cImJvb2xlYW5cIj09dHlwZW9mIGU/KG8uX2xvb3A9ZSxvKTpvLl9sb29wfSxzcHJpdGU6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcztyZXR1cm5cIm9iamVjdFwiPT10eXBlb2YgZT8oby5fc3ByaXRlPWUsbyk6by5fc3ByaXRlfSxwb3M6ZnVuY3Rpb24oZSxuKXt2YXIgcj10aGlzO2lmKCFyLl9sb2FkZWQpcmV0dXJuIHIub24oXCJsb2FkXCIsZnVuY3Rpb24oKXtyLnBvcyhlKX0pLFwibnVtYmVyXCI9PXR5cGVvZiBlP3I6ci5fcG9zfHwwO2U9cGFyc2VGbG9hdChlKTt2YXIgdD1uP3IuX25vZGVCeUlkKG4pOnIuX2FjdGl2ZU5vZGUoKTtpZih0KXJldHVybiBlPj0wPyhyLnBhdXNlKG4pLHQuX3Bvcz1lLHIucGxheSh0Ll9zcHJpdGUsbikscik6ci5fd2ViQXVkaW8/dC5fcG9zKyhvLmN1cnJlbnRUaW1lLXIuX3BsYXlTdGFydCk6dC5jdXJyZW50VGltZTtpZihlPj0wKXJldHVybiByO2Zvcih2YXIgYT0wO2E8ci5fYXVkaW9Ob2RlLmxlbmd0aDthKyspaWYoci5fYXVkaW9Ob2RlW2FdLnBhdXNlZCYmND09PXIuX2F1ZGlvTm9kZVthXS5yZWFkeVN0YXRlKXJldHVybiByLl93ZWJBdWRpbz9yLl9hdWRpb05vZGVbYV0uX3BvczpyLl9hdWRpb05vZGVbYV0uY3VycmVudFRpbWV9LHBvczNkOmZ1bmN0aW9uKGUsbyxuLHIpe3ZhciB0PXRoaXM7aWYobz1cInVuZGVmaW5lZFwiIT10eXBlb2YgbyYmbz9vOjAsbj1cInVuZGVmaW5lZFwiIT10eXBlb2YgbiYmbj9uOi0uNSwhdC5fbG9hZGVkKXJldHVybiB0Lm9uKFwicGxheVwiLGZ1bmN0aW9uKCl7dC5wb3MzZChlLG8sbixyKX0pLHQ7aWYoIShlPj0wfHwwPmUpKXJldHVybiB0Ll9wb3MzZDtpZih0Ll93ZWJBdWRpbyl7dmFyIGE9cj90Ll9ub2RlQnlJZChyKTp0Ll9hY3RpdmVOb2RlKCk7YSYmKHQuX3BvczNkPVtlLG8sbl0sYS5wYW5uZXIuc2V0UG9zaXRpb24oZSxvLG4pLGEucGFubmVyLnBhbm5pbmdNb2RlbD10Ll9tb2RlbHx8XCJIUlRGXCIpfXJldHVybiB0fSxmYWRlOmZ1bmN0aW9uKGUsbyxuLHIsdCl7dmFyIGE9dGhpcyxpPU1hdGguYWJzKGUtbyksdT1lPm8/XCJkb3duXCI6XCJ1cFwiLGQ9aS8uMDEsbD1uL2Q7aWYoIWEuX2xvYWRlZClyZXR1cm4gYS5vbihcImxvYWRcIixmdW5jdGlvbigpe2EuZmFkZShlLG8sbixyLHQpfSksYTthLnZvbHVtZShlLHQpO2Zvcih2YXIgZj0xO2Q+PWY7ZisrKSFmdW5jdGlvbigpe3ZhciBlPWEuX3ZvbHVtZSsoXCJ1cFwiPT09dT8uMDE6LS4wMSkqZixuPU1hdGgucm91bmQoMWUzKmUpLzFlMyxpPW87c2V0VGltZW91dChmdW5jdGlvbigpe2Eudm9sdW1lKG4sdCksbj09PWkmJnImJnIoKX0sbCpmKX0oKX0sZmFkZUluOmZ1bmN0aW9uKGUsbyxuKXtyZXR1cm4gdGhpcy52b2x1bWUoMCkucGxheSgpLmZhZGUoMCxlLG8sbil9LGZhZGVPdXQ6ZnVuY3Rpb24oZSxvLG4scil7dmFyIHQ9dGhpcztyZXR1cm4gdC5mYWRlKHQuX3ZvbHVtZSxlLG8sZnVuY3Rpb24oKXtuJiZuKCksdC5wYXVzZShyKSx0Lm9uKFwiZW5kXCIpfSxyKX0sX25vZGVCeUlkOmZ1bmN0aW9uKGUpe2Zvcih2YXIgbz10aGlzLG49by5fYXVkaW9Ob2RlWzBdLHI9MDtyPG8uX2F1ZGlvTm9kZS5sZW5ndGg7cisrKWlmKG8uX2F1ZGlvTm9kZVtyXS5pZD09PWUpe249by5fYXVkaW9Ob2RlW3JdO2JyZWFrfXJldHVybiBufSxfYWN0aXZlTm9kZTpmdW5jdGlvbigpe2Zvcih2YXIgZT10aGlzLG89bnVsbCxuPTA7bjxlLl9hdWRpb05vZGUubGVuZ3RoO24rKylpZighZS5fYXVkaW9Ob2RlW25dLnBhdXNlZCl7bz1lLl9hdWRpb05vZGVbbl07YnJlYWt9cmV0dXJuIGUuX2RyYWluUG9vbCgpLG99LF9pbmFjdGl2ZU5vZGU6ZnVuY3Rpb24oZSl7Zm9yKHZhciBvPXRoaXMsbj1udWxsLHI9MDtyPG8uX2F1ZGlvTm9kZS5sZW5ndGg7cisrKWlmKG8uX2F1ZGlvTm9kZVtyXS5wYXVzZWQmJjQ9PT1vLl9hdWRpb05vZGVbcl0ucmVhZHlTdGF0ZSl7ZShvLl9hdWRpb05vZGVbcl0pLG49ITA7YnJlYWt9aWYoby5fZHJhaW5Qb29sKCksIW4pe3ZhciB0O2lmKG8uX3dlYkF1ZGlvKXQ9by5fc2V0dXBBdWRpb05vZGUoKSxlKHQpO2Vsc2V7by5sb2FkKCksdD1vLl9hdWRpb05vZGVbby5fYXVkaW9Ob2RlLmxlbmd0aC0xXTt2YXIgYT1uYXZpZ2F0b3IuaXNDb2Nvb25KUz9cImNhbnBsYXl0aHJvdWdoXCI6XCJsb2FkZWRtZXRhZGF0YVwiLGk9ZnVuY3Rpb24oKXt0LnJlbW92ZUV2ZW50TGlzdGVuZXIoYSxpLCExKSxlKHQpfTt0LmFkZEV2ZW50TGlzdGVuZXIoYSxpLCExKX19fSxfZHJhaW5Qb29sOmZ1bmN0aW9uKCl7dmFyIGUsbz10aGlzLG49MDtmb3IoZT0wO2U8by5fYXVkaW9Ob2RlLmxlbmd0aDtlKyspby5fYXVkaW9Ob2RlW2VdLnBhdXNlZCYmbisrO2ZvcihlPW8uX2F1ZGlvTm9kZS5sZW5ndGgtMTtlPj0wJiYhKDU+PW4pO2UtLSlvLl9hdWRpb05vZGVbZV0ucGF1c2VkJiYoby5fd2ViQXVkaW8mJm8uX2F1ZGlvTm9kZVtlXS5kaXNjb25uZWN0KDApLG4tLSxvLl9hdWRpb05vZGUuc3BsaWNlKGUsMSkpfSxfY2xlYXJFbmRUaW1lcjpmdW5jdGlvbihlKXtmb3IodmFyIG89dGhpcyxuPS0xLHI9MDtyPG8uX29uZW5kVGltZXIubGVuZ3RoO3IrKylpZihvLl9vbmVuZFRpbWVyW3JdLmlkPT09ZSl7bj1yO2JyZWFrfXZhciB0PW8uX29uZW5kVGltZXJbbl07dCYmKGNsZWFyVGltZW91dCh0LnRpbWVyKSxvLl9vbmVuZFRpbWVyLnNwbGljZShuLDEpKX0sX3NldHVwQXVkaW9Ob2RlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyxuPWUuX2F1ZGlvTm9kZSxyPWUuX2F1ZGlvTm9kZS5sZW5ndGg7cmV0dXJuIG5bcl09XCJ1bmRlZmluZWRcIj09dHlwZW9mIG8uY3JlYXRlR2Fpbj9vLmNyZWF0ZUdhaW5Ob2RlKCk6by5jcmVhdGVHYWluKCksbltyXS5nYWluLnZhbHVlPWUuX3ZvbHVtZSxuW3JdLnBhdXNlZD0hMCxuW3JdLl9wb3M9MCxuW3JdLnJlYWR5U3RhdGU9NCxuW3JdLmNvbm5lY3QoYSksbltyXS5wYW5uZXI9by5jcmVhdGVQYW5uZXIoKSxuW3JdLnBhbm5lci5wYW5uaW5nTW9kZWw9ZS5fbW9kZWx8fFwiZXF1YWxwb3dlclwiLG5bcl0ucGFubmVyLnNldFBvc2l0aW9uKGUuX3BvczNkWzBdLGUuX3BvczNkWzFdLGUuX3BvczNkWzJdKSxuW3JdLnBhbm5lci5jb25uZWN0KG5bcl0pLG5bcl19LG9uOmZ1bmN0aW9uKGUsbyl7dmFyIG49dGhpcyxyPW5bXCJfb25cIitlXTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBvKXIucHVzaChvKTtlbHNlIGZvcih2YXIgdD0wO3Q8ci5sZW5ndGg7dCsrKW8/clt0XS5jYWxsKG4sbyk6clt0XS5jYWxsKG4pO3JldHVybiBufSxvZmY6ZnVuY3Rpb24oZSxvKXt2YXIgbj10aGlzLHI9bltcIl9vblwiK2VdO2lmKG8pe2Zvcih2YXIgdD0wO3Q8ci5sZW5ndGg7dCsrKWlmKG89PT1yW3RdKXtyLnNwbGljZSh0LDEpO2JyZWFrfX1lbHNlIG5bXCJfb25cIitlXT1bXTtyZXR1cm4gbn0sdW5sb2FkOmZ1bmN0aW9uKCl7Zm9yKHZhciBvPXRoaXMsbj1vLl9hdWRpb05vZGUscj0wO3I8by5fYXVkaW9Ob2RlLmxlbmd0aDtyKyspbltyXS5wYXVzZWR8fChvLnN0b3AobltyXS5pZCksby5vbihcImVuZFwiLG5bcl0uaWQpKSxvLl93ZWJBdWRpbz9uW3JdLmRpc2Nvbm5lY3QoMCk6bltyXS5zcmM9XCJcIjtmb3Iocj0wO3I8by5fb25lbmRUaW1lci5sZW5ndGg7cisrKWNsZWFyVGltZW91dChvLl9vbmVuZFRpbWVyW3JdLnRpbWVyKTt2YXIgdD1sLl9ob3dscy5pbmRleE9mKG8pO251bGwhPT10JiZ0Pj0wJiZsLl9ob3dscy5zcGxpY2UodCwxKSxkZWxldGUgZVtvLl9zcmNdLG89bnVsbH19LG4pdmFyIHM9ZnVuY3Rpb24obyxuKXtpZihuIGluIGUpcmV0dXJuIG8uX2R1cmF0aW9uPWVbbl0uZHVyYXRpb24sdm9pZCBjKG8pO2lmKC9eZGF0YTpbXjtdKztiYXNlNjQsLy50ZXN0KG4pKXtmb3IodmFyIHI9YXRvYihuLnNwbGl0KFwiLFwiKVsxXSksdD1uZXcgVWludDhBcnJheShyLmxlbmd0aCksYT0wO2E8ci5sZW5ndGg7KythKXRbYV09ci5jaGFyQ29kZUF0KGEpO18odC5idWZmZXIsbyxuKX1lbHNle3ZhciBpPW5ldyBYTUxIdHRwUmVxdWVzdDtpLm9wZW4oXCJHRVRcIixuLCEwKSxpLnJlc3BvbnNlVHlwZT1cImFycmF5YnVmZmVyXCIsaS5vbmxvYWQ9ZnVuY3Rpb24oKXtfKGkucmVzcG9uc2UsbyxuKX0saS5vbmVycm9yPWZ1bmN0aW9uKCl7by5fd2ViQXVkaW8mJihvLl9idWZmZXI9ITAsby5fd2ViQXVkaW89ITEsby5fYXVkaW9Ob2RlPVtdLGRlbGV0ZSBvLl9nYWluTm9kZSxkZWxldGUgZVtuXSxvLmxvYWQoKSl9O3RyeXtpLnNlbmQoKX1jYXRjaCh1KXtpLm9uZXJyb3IoKX19fSxfPWZ1bmN0aW9uKG4scix0KXtvLmRlY29kZUF1ZGlvRGF0YShuLGZ1bmN0aW9uKG8pe28mJihlW3RdPW8sYyhyLG8pKX0sZnVuY3Rpb24oZSl7ci5vbihcImxvYWRlcnJvclwiLGUpfSl9LGM9ZnVuY3Rpb24oZSxvKXtlLl9kdXJhdGlvbj1vP28uZHVyYXRpb246ZS5fZHVyYXRpb24sMD09PU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGUuX3Nwcml0ZSkubGVuZ3RoJiYoZS5fc3ByaXRlPXtfZGVmYXVsdDpbMCwxZTMqZS5fZHVyYXRpb25dfSksZS5fbG9hZGVkfHwoZS5fbG9hZGVkPSEwLGUub24oXCJsb2FkXCIpKSxlLl9hdXRvcGxheSYmZS5wbGF5KCl9LHA9ZnVuY3Rpb24obixyLHQpe3ZhciBhPW4uX25vZGVCeUlkKHQpO2EuYnVmZmVyU291cmNlPW8uY3JlYXRlQnVmZmVyU291cmNlKCksYS5idWZmZXJTb3VyY2UuYnVmZmVyPWVbbi5fc3JjXSxhLmJ1ZmZlclNvdXJjZS5jb25uZWN0KGEucGFubmVyKSxhLmJ1ZmZlclNvdXJjZS5sb29wPXJbMF0sclswXSYmKGEuYnVmZmVyU291cmNlLmxvb3BTdGFydD1yWzFdLGEuYnVmZmVyU291cmNlLmxvb3BFbmQ9clsxXStyWzJdKSxhLmJ1ZmZlclNvdXJjZS5wbGF5YmFja1JhdGUudmFsdWU9bi5fcmF0ZX07XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kJiZkZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm57SG93bGVyOmwsSG93bDpmfX0pLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBleHBvcnRzJiYoZXhwb3J0cy5Ib3dsZXI9bCxleHBvcnRzLkhvd2w9ZiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmKHdpbmRvdy5Ib3dsZXI9bCx3aW5kb3cuSG93bD1mKX0oKTtcblxuXG47XG4vL1xuLy9cdFV0aWxzXG4vL1xuLy8gKiBhbmltYXRlKGNiLCBkdXJhdG9uKSAtLSB3cmFwcGVyIG9mIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuLy9cbi8vIERPTSBtYW5pcHVsYXRpb25zXG4vL1xuLy8gKiBjbG9zZVBvcHVwKGV2ZW50KSAtLSBjbG9zZSBwb3B1cCB3aXRoIHVzZXJzIHVuaXF1ZSBjb2RlXG4vLyAqIG9uVm9sdW1lQnRuQ2xpY2soZXZlbnQpIC0tIGhhbmRsZXIgZm9yIHZvbHVtZSBidXR0b25zIGNsaWNrcyAobXV0ZS91bm11dGUgdHJpZ2dlcilcbi8vICogb25Wb2x1bWVTbGlkZXJJbnB1dChldmVudCkgLS0gY2hhbmdlIGF1ZGlvIHZvbHVtZSB3aGVudm9sdW1lIHNsaWRlciBpcyBiZWluZyBtb3ZlZFxuLy8gKiB1cGRhdGVTY29yZShudW1iZXIpIC0tIHVwZGF0ZSBjdXJyZW50IHNjb3JlXG4vL1xuLy9cdENhbnZhc1xuLy9cbi8vICogcmVmcmVzaENvbXB1dGVkU2l6ZXMob2JqZWN0KSAtLSBjaGFuZ2UgPGNhbnZhcz4gc2l6ZXMgdG8gYWN0dWFsXG4vLyAqIGFkZE1vdmVtZW50T25DYW52YXMobW92ZW1lbnRJbmZvKSAtLSBhZGQgbmV3IG1vdmVtZW50IGNhbnZhcy1vYmplY3Rcbi8vICogYW5pbWF0ZU1vdmVtZW50KG9iamVjdCkgLS0gbWFrZSByZWNpZXZlZCBhbHJlYWR5IGFkZGVkIG1vdmVtZW50IHJ1biAoYW5pbWF0ZSlcbi8vICogb25BZ1NldHVwRXZlbnQoZXZlbnQpIC0tIGhhbmRsZXIgZm9yIGV2ZW50LCBmaXJlZCB3aGVuIGdhbWUgc2V0dGluZ3MgYXJlIHJlY2lldmVkXG4vL1xuLy8gVG8gcmVtb3ZlXG4vL1xuLy8gKiBzdGFydCgpIC0tIHN0YXJ0IGdhbWVcbi8vICogbmV4dEJlYXQoaXNGaXJzdCkgLS0gcHJvY2VzcyAoYW5kIGFkZCkgbmV4dCBtb3ZlbWVudFxuLy9cbi8vIEluaXRpYWxpemF0aW9uXG4vL1xuXG5cbihmdW5jdGlvbigpe1xuXG5mdW5jdGlvbiBhbmltYXRlKGRyYXcsIGR1cmF0aW9uKSB7XG4gIHZhciBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiBhbmltYXRlKHRpbWUpIHtcbiAgICAvLyDQvtC/0YDQtdC00LXQu9C40YLRjCwg0YHQutC+0LvRjNC60L4g0L/RgNC+0YjQu9C+INCy0YDQtdC80LXQvdC4INGBINC90LDRh9Cw0LvQsCDQsNC90LjQvNCw0YbQuNC4XG4gICAgdmFyIHRpbWVQYXNzZWQgPSB0aW1lIC0gc3RhcnQ7XG5cbiAgICAvLyDQstC+0LfQvNC+0LbQvdC+INC90LXQsdC+0LvRjNGI0L7QtSDQv9GA0LXQstGL0YjQtdC90LjQtSDQstGA0LXQvNC10L3QuCwg0LIg0Y3RgtC+0Lwg0YHQu9GD0YfQsNC1INC30LDRhNC40LrRgdC40YDQvtCy0LDRgtGMINC60L7QvdC10YZcbiAgICBpZiAodGltZVBhc3NlZCA+IGR1cmF0aW9uKSB0aW1lUGFzc2VkID0gZHVyYXRpb247XG5cbiAgICAvLyDQvdCw0YDQuNGB0L7QstCw0YLRjCDRgdC+0YHRgtC+0Y/QvdC40LUg0LDQvdC40LzQsNGG0LjQuCDQsiDQvNC+0LzQtdC90YIgdGltZVBhc3NlZFxuICAgIGRyYXcodGltZVBhc3NlZCk7XG5cbiAgICAvLyDQtdGB0LvQuCDQstGA0LXQvNGPINCw0L3QuNC80LDRhtC40Lgg0L3QtSDQt9Cw0LrQvtC90YfQuNC70L7RgdGMIC0g0LfQsNC/0LvQsNC90LjRgNC+0LLQsNGC0Ywg0LXRidGRINC60LDQtNGAXG4gICAgaWYgKHRpbWVQYXNzZWQgPCBkdXJhdGlvbikge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICAgIH1cblxuICB9KTtcbn1cblxuXG52YXIgY29uZmlnID0ge1xuXHRjb2xvcnM6IHtcblx0XHRuZXV0cmFsOiAnI0ZGQTcwMCcsIC8vICM4RDk5QUUgIzEwN0U3RFxuXHRcdHN1Y2Nlc3M6ICcjQzJFODEyJyxcblx0XHRmYWlsOiAnI0I4MEMwOSdcblx0fSxcblx0bW92ZW1lbnRzOiB7XG5cdFx0cmFkaXVzUGVyY2VudDogNCxcblx0XHRzdHJva2VXaWR0aFBlcmNlbnQ6IDAuNVxuXHR9XG59XG5cbmZ1bmN0aW9uIGNsb3NlUG9wdXAoZXZlbnQpIHtcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvcHVwJylbMF0uY2xhc3NMaXN0LmFkZCgnY2xvc2VkJyk7XG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5sb2dvJylbMF0uY2xhc3NMaXN0LnJlbW92ZSgnd2l0aC1wb3B1cCcpO1xufVxuXG4vLyBNdXRlcyAvIHVubXV0ZXMgYXVkaW9cbmZ1bmN0aW9uIG9uVm9sdW1lQnRuQ2xpY2soZXZlbnQpIHtcblxuXHRpZiAoIWNvbmZpZy5jdXJyZW50QXVkaW8ubXV0ZWQpIHtcblxuXHRcdC8vIENoYW5nZSB2aWV3XG5cdFx0dGhpcy5jaGlsZE5vZGVzWzFdLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhLXZvbHVtZS11cCcpO1xuXHRcdHRoaXMuY2hpbGROb2Rlc1sxXS5jbGFzc0xpc3QuYWRkKCdmYS12b2x1bWUtb2ZmJyk7XG5cblx0XHQvLyBNdXRlXG5cdFx0Y29uZmlnLmN1cnJlbnRBdWRpby5tdXRlKCk7XG5cdFx0Y29uZmlnLmN1cnJlbnRBdWRpby5tdXRlZCA9IHRydWU7XG5cdH0gZWxzZSB7XG5cblx0XHQvLyBDaGFuZ2Ugdmlld1xuXHRcdHRoaXMuY2hpbGROb2Rlc1sxXS5jbGFzc0xpc3QucmVtb3ZlKCdmYS12b2x1bWUtb2ZmJyk7XG5cdFx0dGhpcy5jaGlsZE5vZGVzWzFdLmNsYXNzTGlzdC5hZGQoJ2ZhLXZvbHVtZS11cCcpO1xuXG5cdFx0Ly8gVW5tdXRlXG5cdFx0Y29uZmlnLmN1cnJlbnRBdWRpby51bm11dGUoKTtcblx0XHRjb25maWcuY3VycmVudEF1ZGlvLm11dGVkID0gZmFsc2U7XG5cdH1cblxufVxuXG4vLyBDaGFuZ2Ugdm9sdW1lIGxldmVsIG9mIGN1cnJlbnQgYXVkaW9cbmZ1bmN0aW9uIG9uVm9sdW1lU2xpZGVySW5wdXQoZXZlbnQpIHtcblx0Y29uZmlnLmN1cnJlbnRBdWRpby52b2x1bWUodGhpcy52YWx1ZS8xMDApO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVTY29yZShuZXdTY29yZSkge1xuXG5cdHZhciBzY29yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zY29yZScpWzBdO1xuXHR2YXIgc2NvcmVOdW1iZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2NvcmUtbnVtYmVyJylbMF07XG5cblx0c2NvcmUuY2xhc3NMaXN0LmFkZCgndXBkYXRlJyk7XG5cdHNldFRpbWVvdXQoKCk9Pnsgc2NvcmUuY2xhc3NMaXN0LnJlbW92ZSgndXBkYXRlJyk7IH0sIDQwMCk7XG5cblx0Y29uZmlnLmN1cnJlbnRTY29yZSA9IHBhcnNlSW50KG5ld1Njb3JlKTtcblx0c2NvcmVOdW1iZXIuaW5uZXJIVE1MID0gY29uZmlnLmN1cnJlbnRTY29yZTtcblxuXHRyZXR1cm4gY29uZmlnLmN1cnJlbnRTY29yZTtcblxufVxuXG4vLyAqKioqKioqKioqXG4vLyAqIENBTlZBUyAqXG4vLyAqKioqKioqKioqXG5cbi8vIENoYW5nZXMgY2FudmFzIGJhY2tncm91bmQgc2l6ZSB3aGVuIGZpcmVkXG5mdW5jdGlvbiByZWZyZXNoQ29tcHV0ZWRTaXplcyhvYmplY3QpIHtcblx0XG5cdGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlID0ge1xuXHRcdHdpZHRoOiArb2JqZWN0LndpZHRoLnNsaWNlKDAsLTIpLFxuXHRcdGhlaWdodDogK29iamVjdC5oZWlnaHQuc2xpY2UoMCwtMilcblx0fTtcblxuXHRjYW52YXMuc2V0RGltZW5zaW9ucyh7XG5cdFx0d2lkdGg6IGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLndpZHRoLFxuXHRcdGhlaWdodDogY29uZmlnLmNhbnZPcHRzLmNvbXB1dGVkU3R5bGUuaGVpZ2h0XG5cdH0pO1xuXG59XG5cblxuZnVuY3Rpb24gYWRkTW92ZW1lbnRPbkNhbnZhcyhtb3ZlbWVudEluZm8pIHtcblxuXHRpZiAobW92ZW1lbnRJbmZvLm5hbWUgPT0gJ3Bhc3MnKSByZXR1cm47XG5cblx0dmFyIHJhZGl1cyA9IGNvbmZpZy5jYW52T3B0cy5tb3ZlbWVudHMucmFkaXVzO1xuXHR2YXIgc3Ryb2tlV2lkdGggPSBjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnN0cm9rZVdpZHRoO1xuXHQvLyB2YXIgeCA9IE1hdGgucm91bmQoY29uZmlnLmNhbnZPcHRzLmNvbXB1dGVkU3R5bGUud2lkdGggLSAoY29uZmlnLmNhbnZPcHRzLmNvbXB1dGVkU3R5bGUud2lkdGgvMTAwKSozKSAtIHJhZGl1cyoyO1xuXHR2YXIgeCA9IE1hdGgucm91bmQoY29uZmlnLmNhbnZPcHRzLmNvbXB1dGVkU3R5bGUud2lkdGgpO1xuXHR2YXIgeSA9IE1hdGgucm91bmQoY29uZmlnLm9uZUhQZXJjZW50ICogNDUpICsgY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5zdHJva2VXaWR0aCoxLjY7XG5cblx0dmFyIGNpcmNsZSA9IG5ldyBmYWJyaWMuQ2lyY2xlKHtcblx0XHRmaWxsOiBjb25maWcuY29sb3JzLm5ldXRyYWwsXG5cdFx0c3Ryb2tlOiAnI0ZGRkZGRicsXG5cdFx0c3Ryb2tlV2lkdGg6IHN0cm9rZVdpZHRoLFxuXHRcdHJhZGl1czogcmFkaXVzLFxuXHRcdG9yaWdpblk6ICdjZW50ZXInLFxuXHRcdG9yaWdpblg6ICdjZW50ZXInXG5cdH0pO1xuXG5cdC8vIGNvbnNvbGUubG9nKC1jaXJjbGUuZ2V0UmFkaXVzWCgpKjAuOCk7XG5cdHZhciBhcnJvdztcblxuXHRzd2l0Y2ggKG1vdmVtZW50SW5mby5uYW1lKSB7XG5cdFx0Y2FzZSAndXAnOlxuXHRcdFx0YXJyb3cgPSBuZXcgZmFicmljLlBhdGgoYFxuXHRcdFx0XHRNICR7LWNpcmNsZS5nZXRSYWRpdXNYKCkqMC42NX0gJHtjaXJjbGUuZ2V0UmFkaXVzWSgpKjAuMTF9XG5cdFx0XHRcdEwgMCAkey1jaXJjbGUuZ2V0UmFkaXVzWSgpKjAuNTV9XG5cdFx0XHRcdEwgJHtjaXJjbGUuZ2V0UmFkaXVzWCgpKjAuNjV9ICR7Y2lyY2xlLmdldFJhZGl1c1koKSowLjExfVxuXHRcdFx0XHRMICR7Y2lyY2xlLmdldFJhZGl1c1goKSowLjV9ICR7Y2lyY2xlLmdldFJhZGl1c1koKSowLjI1fVxuXHRcdFx0XHRMIDAgJHstY2lyY2xlLmdldFJhZGl1c1koKSowLjI1fVxuXHRcdFx0XHRMICR7LWNpcmNsZS5nZXRSYWRpdXNYKCkqMC41fSAke2NpcmNsZS5nZXRSYWRpdXNZKCkqMC4yNX1cblx0XHRcdFx0emAsIHtcblx0XHRcdFx0Ly8gZmlsbDogJyNmZmYnLFxuXHRcdFx0XHRvcmlnaW5ZOiAnY2VudGVyJyxcblx0XHRcdFx0b3JpZ2luWDogJ2NlbnRlcidcblx0XHRcdH0pO1xuXHRcdGJyZWFrO1xuXG5cdFx0Y2FzZSAnZG93bic6XG5cdFx0XHRhcnJvdyA9IG5ldyBmYWJyaWMuUGF0aChgXG5cdFx0XHRcdE0gJHtjaXJjbGUuZ2V0UmFkaXVzWCgpKjAuNjV9ICR7LWNpcmNsZS5nZXRSYWRpdXNZKCkqMC4xMX1cblx0XHRcdFx0TCAwICR7Y2lyY2xlLmdldFJhZGl1c1koKSowLjU1fVxuXHRcdFx0XHRMICR7LWNpcmNsZS5nZXRSYWRpdXNYKCkqMC42NX0gJHstY2lyY2xlLmdldFJhZGl1c1koKSowLjExfVxuXHRcdFx0XHRMICR7LWNpcmNsZS5nZXRSYWRpdXNYKCkqMC41fSAkey1jaXJjbGUuZ2V0UmFkaXVzWSgpKjAuMjV9XG5cdFx0XHRcdEwgMCAke2NpcmNsZS5nZXRSYWRpdXNZKCkqMC4yNX1cblx0XHRcdFx0TCAke2NpcmNsZS5nZXRSYWRpdXNYKCkqMC41fSAkey1jaXJjbGUuZ2V0UmFkaXVzWSgpKjAuMjV9XG5cdFx0XHRcdHpgLCB7XG5cdFx0XHRcdC8vIGZpbGw6ICcjZmZmJyxcblx0XHRcdFx0b3JpZ2luWTogJ2NlbnRlcicsXG5cdFx0XHRcdG9yaWdpblg6ICdjZW50ZXInXG5cdFx0XHR9KTtcblx0XHRicmVha1xuXHR9XG5cdFxuXG5cdHZhciBtb3ZlbWVudCA9IG5ldyBmYWJyaWMuR3JvdXAoW2NpcmNsZSwgYXJyb3ddLCB7XG5cdFx0dG9wOiB5LFxuXHRcdGxlZnQ6IHhcblx0fSk7XG5cblx0bW92ZW1lbnRJbmZvLmNhbnZhc09iamVjdCA9IG1vdmVtZW50O1xuXG5cdGNhbnZhcy5hZGQobW92ZW1lbnQpO1xuXHRjYW52YXMucmVuZGVyQWxsKCk7XG5cdC8vIG1vdmVtZW50SW5mby5zdGF0ZSA9ICdhZGRlZCc7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGVNb3ZlbWVudChtb3ZlbWVudEluZm8pIHtcblxuXHQvLyBpZiAobW92ZW1lbnRJbmZvLm5hbWUgPT0gJ3Bhc3MnKSByZXR1cm47XG5cblx0bW92ZW1lbnRJbmZvLmNhbnZhc09iamVjdC5hbmltYXRlKCdsZWZ0JywgJycrKChjb25maWcub25lV1BlcmNlbnQgKiAyMCkgKyBjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnN0cm9rZVdpZHRoKjEuNSksIHtcblx0XHRvbkNoYW5nZTogY2FudmFzLnJlbmRlckFsbC5iaW5kKGNhbnZhcyksXG5cdFx0ZHVyYXRpb246IGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwqNFxuXHR9KTtcbn1cblxuZnVuY3Rpb24gb25HbFNldHVwRXZlbnQoZXZlbnQpIHtcblx0Y29uZmlnLmN1cnJlbnRCcG0gPSBldmVudC5kZXRhaWwuYnBtO1xuXHRjb25maWcuY3VycmVudE1pbkludGVydmFsID0gNjAwMDAgLyBjb25maWcuY3VycmVudEJwbTtcblx0Y29uZmlnLmN1cnJlbnRTb25nTmFtZSA9IGV2ZW50LmRldGFpbC5zb25nO1xuXHRjb25maWcuY3VycmVudEF1ZGlvID0gZXZlbnQuZGV0YWlsLm11c2ljO1xuXHRjbG9zZVBvcHVwKCk7XG5cdGNvbnNvbGUubG9nKGV2ZW50LmRldGFpbC5icG0pO1xuXG5cdC8vIFRlc3Rcblx0Y29uZmlnLmN1cnJlbnRBdWRpby5wbGF5KCk7XG59XG5cbi8vIEFjdGlvbnMgcGVyZm9ybWVkIHdoZW4gY3VycmVudCBnYW1lIHNldHRpbmdzIHJlY2lldmVkXG5mdW5jdGlvbiBvbkdsQWRkTW92ZW1lbnQoZXZlbnQpIHtcblxuXHRjb25maWcuY3VycmVudE1vdmVtZW50cy5wdXNoKHtuYW1lOiBldmVudC5kZXRhaWx9KTtcblx0dmFyIHRoaXNNb3ZlbWVudCA9IGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzW2NvbmZpZy5jdXJyZW50TW92ZW1lbnRzLmxlbmd0aC0xXTtcblxuXHRpZiAodGhpc01vdmVtZW50Lm5hbWUgPT0gJ3Bhc3MnKSByZXR1cm47XG5cblx0YWRkTW92ZW1lbnRPbkNhbnZhcyh0aGlzTW92ZW1lbnQpO1xuXHRhbmltYXRlTW92ZW1lbnQodGhpc01vdmVtZW50KTtcblxufVxuXG5mdW5jdGlvbiBvbkdsU3RhdHVzKGV2ZW50KSB7XG5cblx0dmFyIHN0YXR1cyA9IGV2ZW50LmRldGFpbC5zdGF0dXM7XG5cdHZhciBtb3ZlbWVudEluZGV4ID0gZXZlbnQuZGV0YWlsLmluZGV4O1xuXHR2YXIgbmV3U2NvcmUgPSBldmVudC5kZXRhaWwubmV3U2NvcmU7XG5cblx0aWYgKGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzW21vdmVtZW50SW5kZXhdLm5hbWUgPT0gJ3Bhc3MnKSByZXR1cm47XG5cblx0dmFyIGNhbnZPYmogPSBjb25maWcuY3VycmVudE1vdmVtZW50c1ttb3ZlbWVudEluZGV4XS5jYW52YXNPYmplY3Q7XG5cblx0Ly8gUnVuIGNhbnZhcyBhbmltYXRpb25cblx0Y2Fudk9iai5zZXQoe1xuXHRcdGZpbGw6IGNvbmZpZy5jb2xvcnNbc3RhdHVzXSxcblx0XHQvLyBjZW50ZXJlZFNjYWxpbmc6IHRydWVcblx0fSk7XG5cblx0c3dpdGNoIChzdGF0dXMpIHtcblx0XHRjYXNlICdzdWNjZXNzJzpcblx0XHRcdGNhbnZPYmouYW5pbWF0ZSh7XG5cdFx0XHRcdCdzY2FsZVgnOiA2LFxuXHRcdFx0XHQnc2NhbGVZJzogNixcblx0XHRcdFx0J29wYWNpdHknOiAwLFxuXHRcdFx0XHQnbGVmdCc6ICctPScrY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5yYWRpdXMqNS4yLFxuXHRcdFx0XHQndG9wJzogJy09Jytjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnJhZGl1cyo1LjJcblx0XHRcdH0sIHtcblx0XHRcdFx0b25DaGFuZ2U6IGNhbnZhcy5yZW5kZXJBbGwuYmluZChjYW52YXMpLFxuXHRcdFx0XHRkdXJhdGlvbjogNzAwLFxuXHRcdFx0XHRlYXNpbmc6IGZhYnJpYy51dGlsLmVhc2UuZWFzZU91dFF1YXJ0XG5cdFx0XHR9KTtcblx0XHRicmVhaztcblxuXHRcdGNhc2UgJ2ZhaWwnOlxuXHRcdFx0Y2Fudk9iai5hbmltYXRlKHtcblx0XHRcdFx0J3NjYWxlWCc6IDAuOCxcblx0XHRcdFx0J3NjYWxlWSc6IDAuOCxcblx0XHRcdFx0J29wYWNpdHknOiAwLFxuXHRcdFx0XHQnbGVmdCc6ICcnKygtY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5yYWRpdXMpLFxuXHRcdFx0XHQvLyAndG9wJzogJy09Jytjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnJhZGl1c1xuXHRcdFx0fSwge1xuXHRcdFx0XHRvbkNoYW5nZTogY2FudmFzLnJlbmRlckFsbC5iaW5kKGNhbnZhcyksXG5cdFx0XHRcdGR1cmF0aW9uOiAxMDAwLFxuXHRcdFx0XHQvLyBlYXNpbmc6IGZhYnJpYy51dGlsLmVhc2UuZWFzZU91dFF1YXJ0XG5cdFx0XHR9KTtcblx0XHRicmVhaztcblx0fVxuXG5cdC8vIFVwZGF0ZSBzY29yZVxuXHR1cGRhdGVTY29yZShuZXdTY29yZSk7XHRcblxufVxuXG5cblxuXG5cblxuXG5cbi8vICoqKioqKioqXG4vLyAqIEluaXQgKlxuLy8gKioqKioqKipcblxuY29uZmlnLmN1cnJlbnRNb3ZlbWVudHMgPSBbXTtcbmNvbmZpZy5jdXJyZW50U2NvcmUgPSAwO1xuY29uZmlnLmN1cnJlbnRTdGFydERhdGUgPSAwO1xuXG5cbi8vIEdldCBjb21wdXRlZCBzdHlsZXMgb2Ygd2hvbGUgcGFnZSB3cmFwcGVyXG52YXIgY2FudmFzQ29tcHV0ZWRTdHlsZU9iaiA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndyJylbMF0pO1xuXG4vLyBTZXQgY2FudmFzIG9wdGlvbnNcbmNvbmZpZy5vbmVXUGVyY2VudCA9IHBhcnNlSW50KGNhbnZhc0NvbXB1dGVkU3R5bGVPYmoud2lkdGguc2xpY2UoMCwtMikpLzEwMDtcbmNvbmZpZy5vbmVIUGVyY2VudCA9IHBhcnNlSW50KGNhbnZhc0NvbXB1dGVkU3R5bGVPYmouaGVpZ2h0LnNsaWNlKDAsLTIpKS8xMDA7XG5cbmNvbmZpZy5jYW52T3B0cyA9IHtcblx0YmdVUkw6ICcuLi9pbWcvYmctY3Jvd2QtMS5qcGcnLFxuXHRjb21wdXRlZFN0eWxlOiB7XG5cdFx0d2lkdGg6IGNvbmZpZy5vbmVXUGVyY2VudCoxMDAsXG5cdFx0aGVpZ2h0OiBjb25maWcub25lSFBlcmNlbnQqMTAwXG5cdH0sXG5cdG1vdmVtZW50czoge1xuXHRcdHJhZGl1czogY29uZmlnLm9uZVdQZXJjZW50ICogY29uZmlnLm1vdmVtZW50cy5yYWRpdXNQZXJjZW50LFxuXHRcdHN0cm9rZVdpZHRoOiBjb25maWcub25lV1BlcmNlbnQgKiBjb25maWcubW92ZW1lbnRzLnN0cm9rZVdpZHRoUGVyY2VudFxuXHR9XG59XG5cblxuLy8gSW5pdGlhbGl6ZSAnZmFicmljJyBjYW52YXMgb2JqXG52YXIgY2FudmFzID0gbmV3IGZhYnJpYy5TdGF0aWNDYW52YXMoJ2dhbWUnLCB7XG5cdHdpZHRoOiBjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZS53aWR0aCxcblx0aGVpZ2h0OiBjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZS5oZWlnaHQsXG59KTtcblxuLy8gRHJhdyBcInBlcmZlY3Qgc3VjY2Vzc1wiIHBsYWNlIHNoYWRvdyBjaXJjbGVcbmNvbmZpZy5zaGFkb3dDaXJjbGUgPSBuZXcgZmFicmljLkNpcmNsZSh7XG5cdGZpbGw6ICdyZ2JhKDIwMCwyMDAsMjAwLDAuMiknLFxuXHRzdHJva2U6ICdyZ2JhKDIwMCwyMDAsMjAwLDEpJyxcblx0c3Ryb2tlV2lkdGg6IGNvbmZpZy5jYW52T3B0cy5tb3ZlbWVudHMuc3Ryb2tlV2lkdGgqMixcblx0cmFkaXVzOiBjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnJhZGl1cyArIGNvbmZpZy5jYW52T3B0cy5tb3ZlbWVudHMuc3Ryb2tlV2lkdGgsXG5cdHRvcDogTWF0aC5yb3VuZChjb25maWcub25lSFBlcmNlbnQqNDUpLFxuXHRsZWZ0OiBjb25maWcub25lV1BlcmNlbnQgKiAyMFxufSlcbmNhbnZhcy5hZGQoY29uZmlnLnNoYWRvd0NpcmNsZSk7XG5cbi8vIFNldCBoYW5kbGVyIGZvciBhZGRpbmcgb2YgbmV4dCBtb3ZlbWVudCBpbiBxdWV1ZVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZ2xBZGRNb3ZlbWVudCcsIG9uR2xBZGRNb3ZlbWVudCk7XG5cbi8vIFNldCBoYW5kbGVyIGZvciBtb3ZlbWVudCByZXN1bHQgZXZlbnRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2dsU3RhdHVzJywgb25HbFN0YXR1cyk7XG5cbi8vIFNldCBoYW5kbGVyIGZvciBnYW1lIHNldHVwIGV2ZW50XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdnbFNldHVwRXZlbnQnLCBvbkdsU2V0dXBFdmVudCk7XG5cbi8vIFNob3cgY3VycmVudCBnYW1lIGNvZGVcbnZhciBjb2RlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvZGUtY29udGFpbmVyJyk7XG5jb2RlQ29udGFpbmVyLmlubmVySFRNTCA9IGNvZGU7XG5cblxuLy8gKioqKioqKioqXG4vLyAqIEF1ZGlvICpcbi8vICoqKioqKioqKlxuXG4vLyBBZGQgbXV0ZWQgc3RhdGUgc2F2aW5nIGZlYXR1cmUgdG8gSG93bCAoYXVkaW8gbGliKVxuSG93bC5wcm90b3R5cGUubXV0ZWQgPSBmYWxzZTtcbkhvd2wubXV0ZWQgPSBmYWxzZTtcblxuLy8gR2V0IHZvbHVtZSBidXR0b24gZWxlbWVudFxudmFyIHZvbHVtZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy52b2x1bWUtYnRuJylbMF07XG4vLyBhbmQgc2V0IG9uQ2xpY2sgZXZlbnQgaGFuZGxlclxudm9sdW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25Wb2x1bWVCdG5DbGljayk7XG5cbi8vIEdldCB2b2x1bWUgbGV2ZWwgc2xpZGVyXG52YXIgdm9sdW1lU2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnZvbHVtZS1pbnB1dCcpWzBdO1xuLy8gYW5kIHNldCBvbklucHV0IGV2ZW50IGhhbmRsZXJcbnZvbHVtZVNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uVm9sdW1lU2xpZGVySW5wdXQpXG5cblxuLy8gQ2hhbmdlIGNhbnZhcyBiYWNrZ3JvdW5kIHNpemUgb24gd2luZG93IHJlc2l6ZVxud2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24oKXtcblx0cmVmcmVzaENvbXB1dGVkU2l6ZXMoY2FudmFzQ29tcHV0ZWRTdHlsZU9iaik7XG5cdGNhbnZhcy5yZW5kZXJBbGwuYmluZChjYW52YXMpO1xufVxuXG5cblxuXG5cblxuXG5cblxuLy8gVEVTVFxuLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcblxufSkoKTtcbi8qKlxuICogZ2FtZWxvZ2ljLmpzXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAgIC8vXG5cbiAgICB2YXIgRVBTSUxPTiA9IDEwMDA7XG4gICAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gICAgLy8gQWN0aW9ucyBwZXJmb3JtZWQgd2hlbiBjdXJyZW50IGdhbWUgc2V0dGluZ3MgcmVjaWV2ZWRcbiAgICBmdW5jdGlvbiBvbkFnU2V0dXBFdmVudChldmVudCkge1xuXHRjb25zb2xlLmxvZygnYWdTZXR1cEV2ZW50OiAnICsgSlNPTi5zdHJpbmdpZnkoZXZlbnQuZGV0YWlsKSk7XG5cdC8vXG4gICAgXHRjb25maWcubW92ZW1lbnRzID0gZXZlbnQuZGV0YWlsLmNvbW1hbmRzO1xuXHQvL1xuXHRsZXQgYXVkaW9GaWxlVVJMID0gJ2h0dHA6Ly8nICsgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lICsgJy9zb25ncy8nICsgZXZlbnQuZGV0YWlsLnNvbmc7XG5cdC8vIGxldCBhdWRpb0ZpbGVVUkwgPSAnLi4vYXVkaW8vJyArIGV2ZW50LmRldGFpbC5zb25nO1xuXHRjb25zb2xlLmxvZygnYXVkaW8gZmlsZSB1cmw6ICcgKyBhdWRpb0ZpbGVVUkwpO1xuXHRjb25maWcuYXVkaW8gPSBuZXcgSG93bCh7XG5cdCAgICB1cmxzOiBbYXVkaW9GaWxlVVJMXSxcblx0ICAgIGF1dG9wbGF5OiBmYWxzZSxcblx0ICAgIHZvbHVtZTogMC44LFxuXHR9KTtcblx0Ly8gR2VuZXJhdGUgbmV3IGV2ZW50IGZvciB0aGUgdmlldy5cblx0dmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHQgICAgJ2dsU2V0dXBFdmVudCcsXG5cdCAgICB7ZGV0YWlsOiB7c29uZzogZXZlbnQuZGV0YWlsLnNvbmcsIGJwbTogZXZlbnQuZGV0YWlsLmJwbSwgY29tbWFuZHM6IGV2ZW50LmRldGFpbC5jb21tYW5kcywgbXVzaWM6IGNvbmZpZy5hdWRpb319XG5cdCk7XG5cdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1xuXHQvLyBCUE0sIG1pbkludGVydmFsLCBiZWdpbm5pbmcgb2Zmc2V0XG5cdGNvbmZpZy5icG0gPSBldmVudC5kZXRhaWwuYnBtO1xuXHRjb25maWcubWluSW50ZXJ2YWwgPSA2MDAwMCAvIGNvbmZpZy5icG07XG5cdGNvbmZpZy5iZWdpbm5pbmdPZmZzZXQgPSBldmVudC5kZXRhaWwub2Zmc2V0O1xuXHQvLyBTdGFydC5cblx0Y29uZmlnLnNjb3JlID0gMDtcblx0Y29uZmlnLnN0YXJ0RGF0ZSA9IERhdGUubm93KCk7XG5cdGNvbmZpZy5kaXNwbGF5ZWRJbmRleCA9IDA7XG5cdGNvbmZpZy5sYXN0UmVjZWl2ZWRJbmRleCA9IDA7XG5cdGNvbmZpZy5sYXN0UGVyZm9ybWVkQWN0aW9uID0gdW5kZWZpbmVkO1xuXHRmdW5jdGlvbiBzZW5kTW92ZW1lbnQoKSB7XG5cdCAgICAvLyBTZXQgZGVjaWRpbmcgdGhlIHN0YXR1cyBpbiB0aGUgZnV0dXJlLlxuXHQgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHQvL3ZhciBpbmRleCA9IE1hdGgucm91bmQoKGNvbmZpZy5sYXN0UGVyZm9ybWVkQWN0aW9uLnRpbWUgLSBjb25maWcuc3RhcnREYXRlIC0gY29uZmlnLmJlZ2lubmluZ09mZnNldCkgLyBjb25maWcubWluSW50ZXJ2YWwpO1xuXHRcdHZhciBpbmRleCA9IGNvbmZpZy5kaXNwbGF5ZWRJbmRleCAtIDQ7XG5cdFx0dmFyIHZhbGlkID0gY29uZmlnLmxhc3RQZXJmb3JtZWRBY3Rpb24ubW92ZW1lbnQgPT0gY29uZmlnLm1vdmVtZW50c1tpbmRleF0gJiZcblx0XHQgICAgTWF0aC5hYnMoY29uZmlnLmxhc3RQZXJmb3JtZWRBY3Rpb24udGltZSAtIERhdGUubm93KCkpIDwgY29uZmlnLm1pbkludGVydmFsIC8gMjtcblx0XHRpZiAodmFsaWQpIHtcblx0XHQgICAgY29uZmlnLnNjb3JlICs9IDEwMDtcblx0XHQgICAgY29uc29sZS5sb2coaW5kZXgpO1xuXHRcdCAgICB2YXIgbmV3RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXG5cdFx0XHQnZ2xTdGF0dXMnLFxuXHRcdFx0e2RldGFpbDoge1xuXHRcdFx0ICAgIHN0YXR1czogXCJzdWNjZXNzXCIsXG5cdFx0XHQgICAgaW5kZXg6IGluZGV4LFxuXHRcdFx0ICAgIG5ld1Njb3JlOiBjb25maWcuc2NvcmVcblx0XHRcdH19XG5cdFx0ICAgICk7XG5cdFx0ICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0ICAgIGNvbmZpZy5zY29yZSAtPSAxMDtcblx0XHQgICAgdmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHRcdFx0J2dsU3RhdHVzJyxcblx0XHRcdHtkZXRhaWw6IHtcblx0XHRcdCAgICBzdGF0dXM6IFwiZmFpbFwiLFxuXHRcdFx0ICAgIGluZGV4OiBpbmRleCxcblx0XHRcdCAgICBuZXdTY29yZTogY29uZmlnLnNjb3JlXG5cdFx0XHR9fVxuXHRcdCAgICApO1xuXHRcdCAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcblx0XHR9XG5cdFx0Y29uZmlnLmxhc3RQZXJmb3JtZWRBY3Rpb24gPSAncGFzcyc7XG5cdCAgICB9LCBjb25maWcubWluSW50ZXJ2YWwqNCk7XG5cdCAgICAvL1xuXHQgICAgdmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHRcdCdnbEFkZE1vdmVtZW50Jyxcblx0XHR7ZGV0YWlsOiBjb25maWcubW92ZW1lbnRzW2NvbmZpZy5kaXNwbGF5ZWRJbmRleF19XG5cdCAgICApO1xuXHQgICAgLy8gY29uc29sZS5sb2cobmV3RXZlbnQpO1xuXHQgICAgY29uZmlnLmRpc3BsYXllZEluZGV4Kys7XG5cdCAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcblx0ICAgIGNvbmZpZy50aW1lciA9IHNldFRpbWVvdXQoc2VuZE1vdmVtZW50LCBjb25maWcubWluSW50ZXJ2YWwpO1xuXHR9XG5cdHNldFRpbWVvdXQoc2VuZE1vdmVtZW50LCBjb25maWcuYmVnaW5uaW5nT2Zmc2V0KTtcblx0Y29uZmlnLmF1ZGlvLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25BZ0NvbW1hbmRFdmVudChldmVudCkge1xuXHQvLyBjb25zb2xlLmxvZygnYWdDb21tYW5kRXZlbnQ6ICcgKyBKU09OLnN0cmluZ2lmeShldmVudC5kZXRhaWwpKTtcblx0aWYgKGV2ZW50LmRldGFpbC5tb3ZlbWVudCA9PSAnc3RvcCcpIGNsZWFySW50ZXJ2YWwoY29uZmlnLnRpbWVyKTtcblx0Y29uZmlnLmxhc3RQZXJmb3JtZWRBY3Rpb24gPSBldmVudC5kZXRhaWw7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYWdTZXR1cEV2ZW50Jywgb25BZ1NldHVwRXZlbnQpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FnQ29tbWFuZEV2ZW50Jywgb25BZ0NvbW1hbmRFdmVudCk7XG59KSgpO1xuLyoqXG4gKiBjb25uZWN0aW9uLmpzXG4gKlxuICogYGBhZ1NldHVwRXZlbnRgYHMgc2V0IHRoZSBzb25nIG5hbWUgYW5kIHRoZSBjb21tYW5kIHNlcXVlbmNlLlxuICogYGBhZ0NvbW1hbmRFdmVudGBgcyBzYXkgd2hpY2ggY29tbWFuZCB1c2VyIHNlbnQuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAgIC8vIEVtaXRzIGZha2UgZXZlbnRzLlxuXG4gICAgdmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHQnYWdTZXR1cEV2ZW50Jyxcblx0e2RldGFpbDoge3Nvbmc6ICcxMiBIb21lLm1wMycsIGJwbTogMTI4LCBvZmZzZXQ6IDEwMDAsIGNvbW1hbmRzOiBbJ3VwJywgJ2Rvd24nLCAncGFzcycsICdwYXNzJywgJ3VwJywgJ2Rvd24nLCAncGFzcycsICdwYXNzJywgJ3N0b3AnXX19XG4gICAgKTtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcbiAgICBmdW5jdGlvbiBzZW5kTW92ZW1lbnQoKSB7XG5cdHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudChcblx0ICAgICdhZ0NvbW1hbmRFdmVudCcsXG5cdCAgICB7ZGV0YWlsOiB7dGltZTogRGF0ZS5ub3coKSwgbW92ZW1lbnQ6ICd1cCd9fVxuXHQpO1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcblx0c2V0VGltZW91dChzZW5kTW92ZW1lbnQsIDEwMDApO1xuICAgIH1cbiAgICBzZW5kTW92ZW1lbnQoKTtcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
