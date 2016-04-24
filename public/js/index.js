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
			duration: config.currentMinInterval * 16
		});
	}

	function onGlSetupEvent(event) {
		config.currentBpm = event.detail.bpm;
		config.currentMinInterval = config.currentBpm * 1000 / (60 * 16);
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

	// function start() {
	// 	config.currentScore = 0;
	// 	config.currentStartDate = Date.now();
	// 	setTimeout(function(){
	// 		nextBeat(true);
	// 	}, config.currentBeginningOffset);
	// 	config.currentAudio.play();
	// }

	// function nextBeat(isFirst) {

	// 	// If we're in the beginning of song
	// 	if (isFirst === true) {
	// 		addMovementOnCanvas(config.currentMovements[0]);
	// 		animateMovement(config.currentMovements[0]);
	// 		return;
	// 	}

	// 	// Insert new movement
	// 	var appearingMovementIndex = Math.floor((Date.now() - config.currentStartDate) / config.currentMinInterval);

	// 	var appearingMovement = config.currentMovements[appearingMovementIndex];

	// 	addMovementOnCanvas(appearingMovement);
	// 	animateMovement(appearingMovement);

	// }

	// ********
	// * Init *
	// ********

	config.currentMovements = [];
	config.currentScore = 0;
	config.currentStartDate = 0;

	// To remove!
	// config.currentBpm = 128;
	// config.currentMinInterval = (config.currentBpm*1000) / (60*16)

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
	var shadowCircle = new fabric.Circle({
		// fill: config.colors.neutral,
		fill: 'rgba(200,200,200,0.2)',
		stroke: 'rgba(200,200,200,1)',
		strokeWidth: config.canvOpts.movements.strokeWidth * 2,
		radius: config.canvOpts.movements.radius + config.canvOpts.movements.strokeWidth,
		top: Math.round(config.oneHPercent * 45),
		left: config.oneWPercent * 20
	});
	canvas.add(shadowCircle);

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

		var audioFileURL = 'http://' + window.location.hostname + '/songs/' + event.detail.song;
		// let audioFileURL = '../audio/' + event.detail.song;

		// console.log(audioFileURL);

		config.currentAudio = new Howl({
			urls: [audioFileURL],
			autoplay: false,
			volume: 0.8
		});

		// config.currentMovements = event.detail.commands.map((currentValue, index, array) => {
		//     return {
		// 	index: index,
		// 	name: currentValue,
		// 	color: config.colors.neutral,
		//     }
		// });
		config.currentMovements = event.detail.commands;

		// BPM, minInterval, beginning offset
		// config.currentBpm = event.detail.bpm;
		config.currentBpm = 128;
		config.currentMinInterval = config.currentBpm * 1000 / (60 * 16);
		config.currentBeginningOffset = event.detail.offset;

		// Test
		// addMovementOnCanvas(config.currentMovements[1]);
		start();
	}

	function start() {
		config.currentScore = 0;
		config.currentStartDate = Date.now();
		setTimeout(function () {
			nextBeat(true);
		}, config.currentBeginningOffset);
		config.currentAudio.start();
	}

	function nextBeat(isFirst) {

		// If we're in the beginning of song
		if (isFirst === true) {
			//addMovementOnCanvas(config.currentMovements[0]);
			//animateMovement(config.currentMovements[0]);
			config.currentIndex = 0;
			var newEvent = new CustomEvent('glAddMovement', { detail: config.currentMovements[config.currentIndex] });
			document.dispatchEvent(newEvent);
			setTimeout(nextBeat, config.currentMinInterval);
			return;
		}

		// Insert new movement
		//var appearingMovementIndex = Math.floor((Date.now() - config.currentStartDate) / config.currentMinInterval);
		console.log('apearing movement index: ' + appearingMovementIndex);
		var appearingMovement = config.currentMovements[config.currentIndex];

		var newEvent = new CustomEvent('glAddMovement', { detail: appearingMovement });
		document.dispatchEvent(newEvent);
		setTimeout(nextBeat, config.currentMinInterval);
		console.log(appearingMovementIndex);
	}

	// function onAgSetupEvent(event) {
	// 	config.movements = event.detail.commands;
	// }

	function onAgCommandEvent(event) {
		var time = Date.now();
		if (Math.abs(time - event.detail.time) < EPSILON) {
			var newEvent = new CustomEvent('glStatus', { detail: "success" });
			document.addEventListener(newEvent);
		} else {
			var newEvent = new CustomEvent('glStatus', { detail: "fail" });
			document.addEventListener(newEvent);
		}
	}

	// document.addEventListener('agSetupEvent', onAgSetupEvent);
	document.addEventListener('agSetupEvent', function (event) {
		console.log('agSetupEvent: ' + JSON.stringify(event.detail));
	});
	// document.addEventListener('agCommandEvent', onAgCommandEvent);
	document.addEventListener('agCommandEvent', function (event) {
		console.log('agCommandEvent: ' + JSON.stringify(event.detail));
	});
})();
/**
 * connection.js
 *
 * ``agSetupEvent``s set the song name and the command sequence.
 * ``agCommandEvent``s say which command user sent.
 */

(function () {
	// Emits fake events.

	var newEvent = new CustomEvent('agSetupEvent', { detail: { song: '12 Home.mp3', bpm: 100, commands: ['up', 'down', 'pass', 'up', 'down', 'pass'] } });
	document.dispatchEvent(newEvent);
	function sendMovement() {
		var newEvent = new CustomEvent('agCommandEvent', { detail: { time: Date.now(), movement: 'up' } });
		document.dispatchEvent(newEvent);
		setTimeout(sendMovement, 1000);
	}
	sendMovement();
})();
//# sourceMappingURL=data:application/json;base64,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bEIsY0FEa0IsRUFFbEIsRUFBQyxRQUFRLEVBQUMsTUFBTSxhQUFQLEVBQXNCLEtBQUssR0FBM0IsRUFBZ0MsVUFBVSxDQUFDLElBQUQsRUFBTyxNQUFQLEVBQWUsTUFBZixFQUF1QixJQUF2QixFQUE2QixNQUE3QixFQUFxQyxNQUFyQyxDQUExQyxFQUFULEVBRmtCLENBQWY7QUFJQSxVQUFTLGFBQVQsQ0FBdUIsUUFBdkI7QUFDQSxVQUFTLFlBQVQsR0FBd0I7QUFDM0IsTUFBSSxXQUFXLElBQUksV0FBSixDQUNYLGdCQURXLEVBRVgsRUFBQyxRQUFRLEVBQUMsTUFBTSxLQUFLLEdBQUwsRUFBUCxFQUFtQixVQUFVLElBQTdCLEVBQVQsRUFGVyxDQUFmO0FBSUEsV0FBUyxhQUFULENBQXVCLFFBQXZCO0FBQ0EsYUFBVyxZQUFYLEVBQXlCLElBQXpCO0FBQ0k7QUFDRDtBQUNILENBakJEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKiFcbiAqICBob3dsZXIuanMgdjEuMS4yOVxuICogIGhvd2xlcmpzLmNvbVxuICpcbiAqICAoYykgMjAxMy0yMDE2LCBKYW1lcyBTaW1wc29uIG9mIEdvbGRGaXJlIFN0dWRpb3NcbiAqICBnb2xkZmlyZXN0dWRpb3MuY29tXG4gKlxuICogIE1JVCBMaWNlbnNlXG4gKi9cbiFmdW5jdGlvbigpe3ZhciBlPXt9LG89bnVsbCxuPSEwLHI9ITE7dHJ5e1widW5kZWZpbmVkXCIhPXR5cGVvZiBBdWRpb0NvbnRleHQ/bz1uZXcgQXVkaW9Db250ZXh0OlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3ZWJraXRBdWRpb0NvbnRleHQ/bz1uZXcgd2Via2l0QXVkaW9Db250ZXh0Om49ITF9Y2F0Y2godCl7bj0hMX1pZighbilpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgQXVkaW8pdHJ5e25ldyBBdWRpb31jYXRjaCh0KXtyPSEwfWVsc2Ugcj0hMDtpZihuKXt2YXIgYT1cInVuZGVmaW5lZFwiPT10eXBlb2Ygby5jcmVhdGVHYWluP28uY3JlYXRlR2Fpbk5vZGUoKTpvLmNyZWF0ZUdhaW4oKTthLmdhaW4udmFsdWU9MSxhLmNvbm5lY3Qoby5kZXN0aW5hdGlvbil9dmFyIGk9ZnVuY3Rpb24oZSl7dGhpcy5fdm9sdW1lPTEsdGhpcy5fbXV0ZWQ9ITEsdGhpcy51c2luZ1dlYkF1ZGlvPW4sdGhpcy5jdHg9byx0aGlzLm5vQXVkaW89cix0aGlzLl9ob3dscz1bXSx0aGlzLl9jb2RlY3M9ZSx0aGlzLmlPU0F1dG9FbmFibGU9ITB9O2kucHJvdG90eXBlPXt2b2x1bWU6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcztpZihlPXBhcnNlRmxvYXQoZSksZT49MCYmMT49ZSl7by5fdm9sdW1lPWUsbiYmKGEuZ2Fpbi52YWx1ZT1lKTtmb3IodmFyIHIgaW4gby5faG93bHMpaWYoby5faG93bHMuaGFzT3duUHJvcGVydHkocikmJm8uX2hvd2xzW3JdLl93ZWJBdWRpbz09PSExKWZvcih2YXIgdD0wO3Q8by5faG93bHNbcl0uX2F1ZGlvTm9kZS5sZW5ndGg7dCsrKW8uX2hvd2xzW3JdLl9hdWRpb05vZGVbdF0udm9sdW1lPW8uX2hvd2xzW3JdLl92b2x1bWUqby5fdm9sdW1lO3JldHVybiBvfXJldHVybiBuP2EuZ2Fpbi52YWx1ZTpvLl92b2x1bWV9LG11dGU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fc2V0TXV0ZWQoITApLHRoaXN9LHVubXV0ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9zZXRNdXRlZCghMSksdGhpc30sX3NldE11dGVkOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7by5fbXV0ZWQ9ZSxuJiYoYS5nYWluLnZhbHVlPWU/MDpvLl92b2x1bWUpO2Zvcih2YXIgciBpbiBvLl9ob3dscylpZihvLl9ob3dscy5oYXNPd25Qcm9wZXJ0eShyKSYmby5faG93bHNbcl0uX3dlYkF1ZGlvPT09ITEpZm9yKHZhciB0PTA7dDxvLl9ob3dsc1tyXS5fYXVkaW9Ob2RlLmxlbmd0aDt0Kyspby5faG93bHNbcl0uX2F1ZGlvTm9kZVt0XS5tdXRlZD1lfSxjb2RlY3M6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuX2NvZGVjc1tlXX0sX2VuYWJsZWlPU0F1ZGlvOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcztpZighb3x8IWUuX2lPU0VuYWJsZWQmJi9pUGhvbmV8aVBhZHxpUG9kL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSl7ZS5faU9TRW5hYmxlZD0hMTt2YXIgbj1mdW5jdGlvbigpe3ZhciByPW8uY3JlYXRlQnVmZmVyKDEsMSwyMjA1MCksdD1vLmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO3QuYnVmZmVyPXIsdC5jb25uZWN0KG8uZGVzdGluYXRpb24pLFwidW5kZWZpbmVkXCI9PXR5cGVvZiB0LnN0YXJ0P3Qubm90ZU9uKDApOnQuc3RhcnQoMCksc2V0VGltZW91dChmdW5jdGlvbigpeyh0LnBsYXliYWNrU3RhdGU9PT10LlBMQVlJTkdfU1RBVEV8fHQucGxheWJhY2tTdGF0ZT09PXQuRklOSVNIRURfU1RBVEUpJiYoZS5faU9TRW5hYmxlZD0hMCxlLmlPU0F1dG9FbmFibGU9ITEsd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLG4sITEpKX0sMCl9O3JldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsbiwhMSksZX19fTt2YXIgdT1udWxsLGQ9e307cnx8KHU9bmV3IEF1ZGlvLGQ9e21wMzohIXUuY2FuUGxheVR5cGUoXCJhdWRpby9tcGVnO1wiKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxvcHVzOiEhdS5jYW5QbGF5VHlwZSgnYXVkaW8vb2dnOyBjb2RlY3M9XCJvcHVzXCInKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxvZ2c6ISF1LmNhblBsYXlUeXBlKCdhdWRpby9vZ2c7IGNvZGVjcz1cInZvcmJpc1wiJykucmVwbGFjZSgvXm5vJC8sXCJcIiksd2F2OiEhdS5jYW5QbGF5VHlwZSgnYXVkaW8vd2F2OyBjb2RlY3M9XCIxXCInKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxhYWM6ISF1LmNhblBsYXlUeXBlKFwiYXVkaW8vYWFjO1wiKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxtNGE6ISEodS5jYW5QbGF5VHlwZShcImF1ZGlvL3gtbTRhO1wiKXx8dS5jYW5QbGF5VHlwZShcImF1ZGlvL200YTtcIil8fHUuY2FuUGxheVR5cGUoXCJhdWRpby9hYWM7XCIpKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxtcDQ6ISEodS5jYW5QbGF5VHlwZShcImF1ZGlvL3gtbXA0O1wiKXx8dS5jYW5QbGF5VHlwZShcImF1ZGlvL21wNDtcIil8fHUuY2FuUGxheVR5cGUoXCJhdWRpby9hYWM7XCIpKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSx3ZWJhOiEhdS5jYW5QbGF5VHlwZSgnYXVkaW8vd2VibTsgY29kZWNzPVwidm9yYmlzXCInKS5yZXBsYWNlKC9ebm8kLyxcIlwiKX0pO3ZhciBsPW5ldyBpKGQpLGY9ZnVuY3Rpb24oZSl7dmFyIHI9dGhpcztyLl9hdXRvcGxheT1lLmF1dG9wbGF5fHwhMSxyLl9idWZmZXI9ZS5idWZmZXJ8fCExLHIuX2R1cmF0aW9uPWUuZHVyYXRpb258fDAsci5fZm9ybWF0PWUuZm9ybWF0fHxudWxsLHIuX2xvb3A9ZS5sb29wfHwhMSxyLl9sb2FkZWQ9ITEsci5fc3ByaXRlPWUuc3ByaXRlfHx7fSxyLl9zcmM9ZS5zcmN8fFwiXCIsci5fcG9zM2Q9ZS5wb3MzZHx8WzAsMCwtLjVdLHIuX3ZvbHVtZT12b2lkIDAhPT1lLnZvbHVtZT9lLnZvbHVtZToxLHIuX3VybHM9ZS51cmxzfHxbXSxyLl9yYXRlPWUucmF0ZXx8MSxyLl9tb2RlbD1lLm1vZGVsfHxudWxsLHIuX29ubG9hZD1bZS5vbmxvYWR8fGZ1bmN0aW9uKCl7fV0sci5fb25sb2FkZXJyb3I9W2Uub25sb2FkZXJyb3J8fGZ1bmN0aW9uKCl7fV0sci5fb25lbmQ9W2Uub25lbmR8fGZ1bmN0aW9uKCl7fV0sci5fb25wYXVzZT1bZS5vbnBhdXNlfHxmdW5jdGlvbigpe31dLHIuX29ucGxheT1bZS5vbnBsYXl8fGZ1bmN0aW9uKCl7fV0sci5fb25lbmRUaW1lcj1bXSxyLl93ZWJBdWRpbz1uJiYhci5fYnVmZmVyLHIuX2F1ZGlvTm9kZT1bXSxyLl93ZWJBdWRpbyYmci5fc2V0dXBBdWRpb05vZGUoKSxcInVuZGVmaW5lZFwiIT10eXBlb2YgbyYmbyYmbC5pT1NBdXRvRW5hYmxlJiZsLl9lbmFibGVpT1NBdWRpbygpLGwuX2hvd2xzLnB1c2gociksci5sb2FkKCl9O2lmKGYucHJvdG90eXBlPXtsb2FkOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyxvPW51bGw7aWYocilyZXR1cm4gdm9pZCBlLm9uKFwibG9hZGVycm9yXCIsbmV3IEVycm9yKFwiTm8gYXVkaW8gc3VwcG9ydC5cIikpO2Zvcih2YXIgbj0wO248ZS5fdXJscy5sZW5ndGg7bisrKXt2YXIgdCxhO2lmKGUuX2Zvcm1hdCl0PWUuX2Zvcm1hdDtlbHNle2lmKGE9ZS5fdXJsc1tuXSx0PS9eZGF0YTphdWRpb1xcLyhbXjssXSspOy9pLmV4ZWMoYSksdHx8KHQ9L1xcLihbXi5dKykkLy5leGVjKGEuc3BsaXQoXCI/XCIsMSlbMF0pKSwhdClyZXR1cm4gdm9pZCBlLm9uKFwibG9hZGVycm9yXCIsbmV3IEVycm9yKFwiQ291bGQgbm90IGV4dHJhY3QgZm9ybWF0IGZyb20gcGFzc2VkIFVSTHMsIHBsZWFzZSBhZGQgZm9ybWF0IHBhcmFtZXRlci5cIikpO3Q9dFsxXS50b0xvd2VyQ2FzZSgpfWlmKGRbdF0pe289ZS5fdXJsc1tuXTticmVha319aWYoIW8pcmV0dXJuIHZvaWQgZS5vbihcImxvYWRlcnJvclwiLG5ldyBFcnJvcihcIk5vIGNvZGVjIHN1cHBvcnQgZm9yIHNlbGVjdGVkIGF1ZGlvIHNvdXJjZXMuXCIpKTtpZihlLl9zcmM9byxlLl93ZWJBdWRpbylzKGUsbyk7ZWxzZXt2YXIgdT1uZXcgQXVkaW87dS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixmdW5jdGlvbigpe3UuZXJyb3ImJjQ9PT11LmVycm9yLmNvZGUmJihpLm5vQXVkaW89ITApLGUub24oXCJsb2FkZXJyb3JcIix7dHlwZTp1LmVycm9yP3UuZXJyb3IuY29kZTowfSl9LCExKSxlLl9hdWRpb05vZGUucHVzaCh1KSx1LnNyYz1vLHUuX3Bvcz0wLHUucHJlbG9hZD1cImF1dG9cIix1LnZvbHVtZT1sLl9tdXRlZD8wOmUuX3ZvbHVtZSpsLnZvbHVtZSgpO3ZhciBmPWZ1bmN0aW9uKCl7ZS5fZHVyYXRpb249TWF0aC5jZWlsKDEwKnUuZHVyYXRpb24pLzEwLDA9PT1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlLl9zcHJpdGUpLmxlbmd0aCYmKGUuX3Nwcml0ZT17X2RlZmF1bHQ6WzAsMWUzKmUuX2R1cmF0aW9uXX0pLGUuX2xvYWRlZHx8KGUuX2xvYWRlZD0hMCxlLm9uKFwibG9hZFwiKSksZS5fYXV0b3BsYXkmJmUucGxheSgpLHUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNhbnBsYXl0aHJvdWdoXCIsZiwhMSl9O3UuYWRkRXZlbnRMaXN0ZW5lcihcImNhbnBsYXl0aHJvdWdoXCIsZiwhMSksdS5sb2FkKCl9cmV0dXJuIGV9LHVybHM6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcztyZXR1cm4gZT8oby5zdG9wKCksby5fdXJscz1cInN0cmluZ1wiPT10eXBlb2YgZT9bZV06ZSxvLl9sb2FkZWQ9ITEsby5sb2FkKCksbyk6by5fdXJsc30scGxheTpmdW5jdGlvbihlLG4pe3ZhciByPXRoaXM7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgZSYmKG49ZSksZSYmXCJmdW5jdGlvblwiIT10eXBlb2YgZXx8KGU9XCJfZGVmYXVsdFwiKSxyLl9sb2FkZWQ/ci5fc3ByaXRlW2VdPyhyLl9pbmFjdGl2ZU5vZGUoZnVuY3Rpb24odCl7dC5fc3ByaXRlPWU7dmFyIGE9dC5fcG9zPjA/dC5fcG9zOnIuX3Nwcml0ZVtlXVswXS8xZTMsaT0wO3IuX3dlYkF1ZGlvPyhpPXIuX3Nwcml0ZVtlXVsxXS8xZTMtdC5fcG9zLHQuX3Bvcz4wJiYoYT1yLl9zcHJpdGVbZV1bMF0vMWUzK2EpKTppPXIuX3Nwcml0ZVtlXVsxXS8xZTMtKGEtci5fc3ByaXRlW2VdWzBdLzFlMyk7dmFyIHUsZD0hKCFyLl9sb29wJiYhci5fc3ByaXRlW2VdWzJdKSxmPVwic3RyaW5nXCI9PXR5cGVvZiBuP246TWF0aC5yb3VuZChEYXRlLm5vdygpKk1hdGgucmFuZG9tKCkpK1wiXCI7aWYoZnVuY3Rpb24oKXt2YXIgbz17aWQ6ZixzcHJpdGU6ZSxsb29wOmR9O3U9c2V0VGltZW91dChmdW5jdGlvbigpeyFyLl93ZWJBdWRpbyYmZCYmci5zdG9wKG8uaWQpLnBsYXkoZSxvLmlkKSxyLl93ZWJBdWRpbyYmIWQmJihyLl9ub2RlQnlJZChvLmlkKS5wYXVzZWQ9ITAsci5fbm9kZUJ5SWQoby5pZCkuX3Bvcz0wLHIuX2NsZWFyRW5kVGltZXIoby5pZCkpLHIuX3dlYkF1ZGlvfHxkfHxyLnN0b3Aoby5pZCksci5vbihcImVuZFwiLGYpfSxpL3IuX3JhdGUqMWUzKSxyLl9vbmVuZFRpbWVyLnB1c2goe3RpbWVyOnUsaWQ6by5pZH0pfSgpLHIuX3dlYkF1ZGlvKXt2YXIgcz1yLl9zcHJpdGVbZV1bMF0vMWUzLF89ci5fc3ByaXRlW2VdWzFdLzFlMzt0LmlkPWYsdC5wYXVzZWQ9ITEscChyLFtkLHMsX10sZiksci5fcGxheVN0YXJ0PW8uY3VycmVudFRpbWUsdC5nYWluLnZhbHVlPXIuX3ZvbHVtZSxcInVuZGVmaW5lZFwiPT10eXBlb2YgdC5idWZmZXJTb3VyY2Uuc3RhcnQ/ZD90LmJ1ZmZlclNvdXJjZS5ub3RlR3JhaW5PbigwLGEsODY0MDApOnQuYnVmZmVyU291cmNlLm5vdGVHcmFpbk9uKDAsYSxpKTpkP3QuYnVmZmVyU291cmNlLnN0YXJ0KDAsYSw4NjQwMCk6dC5idWZmZXJTb3VyY2Uuc3RhcnQoMCxhLGkpfWVsc2V7aWYoNCE9PXQucmVhZHlTdGF0ZSYmKHQucmVhZHlTdGF0ZXx8IW5hdmlnYXRvci5pc0NvY29vbkpTKSlyZXR1cm4gci5fY2xlYXJFbmRUaW1lcihmKSxmdW5jdGlvbigpe3ZhciBvPXIsYT1lLGk9bix1PXQsZD1mdW5jdGlvbigpe28ucGxheShhLGkpLHUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNhbnBsYXl0aHJvdWdoXCIsZCwhMSl9O3UuYWRkRXZlbnRMaXN0ZW5lcihcImNhbnBsYXl0aHJvdWdoXCIsZCwhMSl9KCkscjt0LnJlYWR5U3RhdGU9NCx0LmlkPWYsdC5jdXJyZW50VGltZT1hLHQubXV0ZWQ9bC5fbXV0ZWR8fHQubXV0ZWQsdC52b2x1bWU9ci5fdm9sdW1lKmwudm9sdW1lKCksc2V0VGltZW91dChmdW5jdGlvbigpe3QucGxheSgpfSwwKX1yZXR1cm4gci5vbihcInBsYXlcIiksXCJmdW5jdGlvblwiPT10eXBlb2YgbiYmbihmKSxyfSkscik6KFwiZnVuY3Rpb25cIj09dHlwZW9mIG4mJm4oKSxyKTooci5vbihcImxvYWRcIixmdW5jdGlvbigpe3IucGxheShlLG4pfSkscil9LHBhdXNlOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7aWYoIW8uX2xvYWRlZClyZXR1cm4gby5vbihcInBsYXlcIixmdW5jdGlvbigpe28ucGF1c2UoZSl9KSxvO28uX2NsZWFyRW5kVGltZXIoZSk7dmFyIG49ZT9vLl9ub2RlQnlJZChlKTpvLl9hY3RpdmVOb2RlKCk7aWYobilpZihuLl9wb3M9by5wb3MobnVsbCxlKSxvLl93ZWJBdWRpbyl7aWYoIW4uYnVmZmVyU291cmNlfHxuLnBhdXNlZClyZXR1cm4gbztuLnBhdXNlZD0hMCxcInVuZGVmaW5lZFwiPT10eXBlb2Ygbi5idWZmZXJTb3VyY2Uuc3RvcD9uLmJ1ZmZlclNvdXJjZS5ub3RlT2ZmKDApOm4uYnVmZmVyU291cmNlLnN0b3AoMCl9ZWxzZSBuLnBhdXNlKCk7cmV0dXJuIG8ub24oXCJwYXVzZVwiKSxvfSxzdG9wOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7aWYoIW8uX2xvYWRlZClyZXR1cm4gby5vbihcInBsYXlcIixmdW5jdGlvbigpe28uc3RvcChlKX0pLG87by5fY2xlYXJFbmRUaW1lcihlKTt2YXIgbj1lP28uX25vZGVCeUlkKGUpOm8uX2FjdGl2ZU5vZGUoKTtpZihuKWlmKG4uX3Bvcz0wLG8uX3dlYkF1ZGlvKXtpZighbi5idWZmZXJTb3VyY2V8fG4ucGF1c2VkKXJldHVybiBvO24ucGF1c2VkPSEwLFwidW5kZWZpbmVkXCI9PXR5cGVvZiBuLmJ1ZmZlclNvdXJjZS5zdG9wP24uYnVmZmVyU291cmNlLm5vdGVPZmYoMCk6bi5idWZmZXJTb3VyY2Uuc3RvcCgwKX1lbHNlIGlzTmFOKG4uZHVyYXRpb24pfHwobi5wYXVzZSgpLG4uY3VycmVudFRpbWU9MCk7cmV0dXJuIG99LG11dGU6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcztpZighby5fbG9hZGVkKXJldHVybiBvLm9uKFwicGxheVwiLGZ1bmN0aW9uKCl7by5tdXRlKGUpfSksbzt2YXIgbj1lP28uX25vZGVCeUlkKGUpOm8uX2FjdGl2ZU5vZGUoKTtyZXR1cm4gbiYmKG8uX3dlYkF1ZGlvP24uZ2Fpbi52YWx1ZT0wOm4ubXV0ZWQ9ITApLG99LHVubXV0ZTpmdW5jdGlvbihlKXt2YXIgbz10aGlzO2lmKCFvLl9sb2FkZWQpcmV0dXJuIG8ub24oXCJwbGF5XCIsZnVuY3Rpb24oKXtvLnVubXV0ZShlKX0pLG87dmFyIG49ZT9vLl9ub2RlQnlJZChlKTpvLl9hY3RpdmVOb2RlKCk7cmV0dXJuIG4mJihvLl93ZWJBdWRpbz9uLmdhaW4udmFsdWU9by5fdm9sdW1lOm4ubXV0ZWQ9ITEpLG99LHZvbHVtZTpmdW5jdGlvbihlLG8pe3ZhciBuPXRoaXM7aWYoZT1wYXJzZUZsb2F0KGUpLGU+PTAmJjE+PWUpe2lmKG4uX3ZvbHVtZT1lLCFuLl9sb2FkZWQpcmV0dXJuIG4ub24oXCJwbGF5XCIsZnVuY3Rpb24oKXtuLnZvbHVtZShlLG8pfSksbjt2YXIgcj1vP24uX25vZGVCeUlkKG8pOm4uX2FjdGl2ZU5vZGUoKTtyZXR1cm4gciYmKG4uX3dlYkF1ZGlvP3IuZ2Fpbi52YWx1ZT1lOnIudm9sdW1lPWUqbC52b2x1bWUoKSksbn1yZXR1cm4gbi5fdm9sdW1lfSxsb29wOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7cmV0dXJuXCJib29sZWFuXCI9PXR5cGVvZiBlPyhvLl9sb29wPWUsbyk6by5fbG9vcH0sc3ByaXRlOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7cmV0dXJuXCJvYmplY3RcIj09dHlwZW9mIGU/KG8uX3Nwcml0ZT1lLG8pOm8uX3Nwcml0ZX0scG9zOmZ1bmN0aW9uKGUsbil7dmFyIHI9dGhpcztpZighci5fbG9hZGVkKXJldHVybiByLm9uKFwibG9hZFwiLGZ1bmN0aW9uKCl7ci5wb3MoZSl9KSxcIm51bWJlclwiPT10eXBlb2YgZT9yOnIuX3Bvc3x8MDtlPXBhcnNlRmxvYXQoZSk7dmFyIHQ9bj9yLl9ub2RlQnlJZChuKTpyLl9hY3RpdmVOb2RlKCk7aWYodClyZXR1cm4gZT49MD8oci5wYXVzZShuKSx0Ll9wb3M9ZSxyLnBsYXkodC5fc3ByaXRlLG4pLHIpOnIuX3dlYkF1ZGlvP3QuX3Bvcysoby5jdXJyZW50VGltZS1yLl9wbGF5U3RhcnQpOnQuY3VycmVudFRpbWU7aWYoZT49MClyZXR1cm4gcjtmb3IodmFyIGE9MDthPHIuX2F1ZGlvTm9kZS5sZW5ndGg7YSsrKWlmKHIuX2F1ZGlvTm9kZVthXS5wYXVzZWQmJjQ9PT1yLl9hdWRpb05vZGVbYV0ucmVhZHlTdGF0ZSlyZXR1cm4gci5fd2ViQXVkaW8/ci5fYXVkaW9Ob2RlW2FdLl9wb3M6ci5fYXVkaW9Ob2RlW2FdLmN1cnJlbnRUaW1lfSxwb3MzZDpmdW5jdGlvbihlLG8sbixyKXt2YXIgdD10aGlzO2lmKG89XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG8mJm8/bzowLG49XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4mJm4/bjotLjUsIXQuX2xvYWRlZClyZXR1cm4gdC5vbihcInBsYXlcIixmdW5jdGlvbigpe3QucG9zM2QoZSxvLG4scil9KSx0O2lmKCEoZT49MHx8MD5lKSlyZXR1cm4gdC5fcG9zM2Q7aWYodC5fd2ViQXVkaW8pe3ZhciBhPXI/dC5fbm9kZUJ5SWQocik6dC5fYWN0aXZlTm9kZSgpO2EmJih0Ll9wb3MzZD1bZSxvLG5dLGEucGFubmVyLnNldFBvc2l0aW9uKGUsbyxuKSxhLnBhbm5lci5wYW5uaW5nTW9kZWw9dC5fbW9kZWx8fFwiSFJURlwiKX1yZXR1cm4gdH0sZmFkZTpmdW5jdGlvbihlLG8sbixyLHQpe3ZhciBhPXRoaXMsaT1NYXRoLmFicyhlLW8pLHU9ZT5vP1wiZG93blwiOlwidXBcIixkPWkvLjAxLGw9bi9kO2lmKCFhLl9sb2FkZWQpcmV0dXJuIGEub24oXCJsb2FkXCIsZnVuY3Rpb24oKXthLmZhZGUoZSxvLG4scix0KX0pLGE7YS52b2x1bWUoZSx0KTtmb3IodmFyIGY9MTtkPj1mO2YrKykhZnVuY3Rpb24oKXt2YXIgZT1hLl92b2x1bWUrKFwidXBcIj09PXU/LjAxOi0uMDEpKmYsbj1NYXRoLnJvdW5kKDFlMyplKS8xZTMsaT1vO3NldFRpbWVvdXQoZnVuY3Rpb24oKXthLnZvbHVtZShuLHQpLG49PT1pJiZyJiZyKCl9LGwqZil9KCl9LGZhZGVJbjpmdW5jdGlvbihlLG8sbil7cmV0dXJuIHRoaXMudm9sdW1lKDApLnBsYXkoKS5mYWRlKDAsZSxvLG4pfSxmYWRlT3V0OmZ1bmN0aW9uKGUsbyxuLHIpe3ZhciB0PXRoaXM7cmV0dXJuIHQuZmFkZSh0Ll92b2x1bWUsZSxvLGZ1bmN0aW9uKCl7biYmbigpLHQucGF1c2UociksdC5vbihcImVuZFwiKX0scil9LF9ub2RlQnlJZDpmdW5jdGlvbihlKXtmb3IodmFyIG89dGhpcyxuPW8uX2F1ZGlvTm9kZVswXSxyPTA7cjxvLl9hdWRpb05vZGUubGVuZ3RoO3IrKylpZihvLl9hdWRpb05vZGVbcl0uaWQ9PT1lKXtuPW8uX2F1ZGlvTm9kZVtyXTticmVha31yZXR1cm4gbn0sX2FjdGl2ZU5vZGU6ZnVuY3Rpb24oKXtmb3IodmFyIGU9dGhpcyxvPW51bGwsbj0wO248ZS5fYXVkaW9Ob2RlLmxlbmd0aDtuKyspaWYoIWUuX2F1ZGlvTm9kZVtuXS5wYXVzZWQpe289ZS5fYXVkaW9Ob2RlW25dO2JyZWFrfXJldHVybiBlLl9kcmFpblBvb2woKSxvfSxfaW5hY3RpdmVOb2RlOmZ1bmN0aW9uKGUpe2Zvcih2YXIgbz10aGlzLG49bnVsbCxyPTA7cjxvLl9hdWRpb05vZGUubGVuZ3RoO3IrKylpZihvLl9hdWRpb05vZGVbcl0ucGF1c2VkJiY0PT09by5fYXVkaW9Ob2RlW3JdLnJlYWR5U3RhdGUpe2Uoby5fYXVkaW9Ob2RlW3JdKSxuPSEwO2JyZWFrfWlmKG8uX2RyYWluUG9vbCgpLCFuKXt2YXIgdDtpZihvLl93ZWJBdWRpbyl0PW8uX3NldHVwQXVkaW9Ob2RlKCksZSh0KTtlbHNle28ubG9hZCgpLHQ9by5fYXVkaW9Ob2RlW28uX2F1ZGlvTm9kZS5sZW5ndGgtMV07dmFyIGE9bmF2aWdhdG9yLmlzQ29jb29uSlM/XCJjYW5wbGF5dGhyb3VnaFwiOlwibG9hZGVkbWV0YWRhdGFcIixpPWZ1bmN0aW9uKCl7dC5yZW1vdmVFdmVudExpc3RlbmVyKGEsaSwhMSksZSh0KX07dC5hZGRFdmVudExpc3RlbmVyKGEsaSwhMSl9fX0sX2RyYWluUG9vbDpmdW5jdGlvbigpe3ZhciBlLG89dGhpcyxuPTA7Zm9yKGU9MDtlPG8uX2F1ZGlvTm9kZS5sZW5ndGg7ZSsrKW8uX2F1ZGlvTm9kZVtlXS5wYXVzZWQmJm4rKztmb3IoZT1vLl9hdWRpb05vZGUubGVuZ3RoLTE7ZT49MCYmISg1Pj1uKTtlLS0pby5fYXVkaW9Ob2RlW2VdLnBhdXNlZCYmKG8uX3dlYkF1ZGlvJiZvLl9hdWRpb05vZGVbZV0uZGlzY29ubmVjdCgwKSxuLS0sby5fYXVkaW9Ob2RlLnNwbGljZShlLDEpKX0sX2NsZWFyRW5kVGltZXI6ZnVuY3Rpb24oZSl7Zm9yKHZhciBvPXRoaXMsbj0tMSxyPTA7cjxvLl9vbmVuZFRpbWVyLmxlbmd0aDtyKyspaWYoby5fb25lbmRUaW1lcltyXS5pZD09PWUpe249cjticmVha312YXIgdD1vLl9vbmVuZFRpbWVyW25dO3QmJihjbGVhclRpbWVvdXQodC50aW1lciksby5fb25lbmRUaW1lci5zcGxpY2UobiwxKSl9LF9zZXR1cEF1ZGlvTm9kZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMsbj1lLl9hdWRpb05vZGUscj1lLl9hdWRpb05vZGUubGVuZ3RoO3JldHVybiBuW3JdPVwidW5kZWZpbmVkXCI9PXR5cGVvZiBvLmNyZWF0ZUdhaW4/by5jcmVhdGVHYWluTm9kZSgpOm8uY3JlYXRlR2FpbigpLG5bcl0uZ2Fpbi52YWx1ZT1lLl92b2x1bWUsbltyXS5wYXVzZWQ9ITAsbltyXS5fcG9zPTAsbltyXS5yZWFkeVN0YXRlPTQsbltyXS5jb25uZWN0KGEpLG5bcl0ucGFubmVyPW8uY3JlYXRlUGFubmVyKCksbltyXS5wYW5uZXIucGFubmluZ01vZGVsPWUuX21vZGVsfHxcImVxdWFscG93ZXJcIixuW3JdLnBhbm5lci5zZXRQb3NpdGlvbihlLl9wb3MzZFswXSxlLl9wb3MzZFsxXSxlLl9wb3MzZFsyXSksbltyXS5wYW5uZXIuY29ubmVjdChuW3JdKSxuW3JdfSxvbjpmdW5jdGlvbihlLG8pe3ZhciBuPXRoaXMscj1uW1wiX29uXCIrZV07aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgbylyLnB1c2gobyk7ZWxzZSBmb3IodmFyIHQ9MDt0PHIubGVuZ3RoO3QrKylvP3JbdF0uY2FsbChuLG8pOnJbdF0uY2FsbChuKTtyZXR1cm4gbn0sb2ZmOmZ1bmN0aW9uKGUsbyl7dmFyIG49dGhpcyxyPW5bXCJfb25cIitlXTtpZihvKXtmb3IodmFyIHQ9MDt0PHIubGVuZ3RoO3QrKylpZihvPT09clt0XSl7ci5zcGxpY2UodCwxKTticmVha319ZWxzZSBuW1wiX29uXCIrZV09W107cmV0dXJuIG59LHVubG9hZDpmdW5jdGlvbigpe2Zvcih2YXIgbz10aGlzLG49by5fYXVkaW9Ob2RlLHI9MDtyPG8uX2F1ZGlvTm9kZS5sZW5ndGg7cisrKW5bcl0ucGF1c2VkfHwoby5zdG9wKG5bcl0uaWQpLG8ub24oXCJlbmRcIixuW3JdLmlkKSksby5fd2ViQXVkaW8/bltyXS5kaXNjb25uZWN0KDApOm5bcl0uc3JjPVwiXCI7Zm9yKHI9MDtyPG8uX29uZW5kVGltZXIubGVuZ3RoO3IrKyljbGVhclRpbWVvdXQoby5fb25lbmRUaW1lcltyXS50aW1lcik7dmFyIHQ9bC5faG93bHMuaW5kZXhPZihvKTtudWxsIT09dCYmdD49MCYmbC5faG93bHMuc3BsaWNlKHQsMSksZGVsZXRlIGVbby5fc3JjXSxvPW51bGx9fSxuKXZhciBzPWZ1bmN0aW9uKG8sbil7aWYobiBpbiBlKXJldHVybiBvLl9kdXJhdGlvbj1lW25dLmR1cmF0aW9uLHZvaWQgYyhvKTtpZigvXmRhdGE6W147XSs7YmFzZTY0LC8udGVzdChuKSl7Zm9yKHZhciByPWF0b2Iobi5zcGxpdChcIixcIilbMV0pLHQ9bmV3IFVpbnQ4QXJyYXkoci5sZW5ndGgpLGE9MDthPHIubGVuZ3RoOysrYSl0W2FdPXIuY2hhckNvZGVBdChhKTtfKHQuYnVmZmVyLG8sbil9ZWxzZXt2YXIgaT1uZXcgWE1MSHR0cFJlcXVlc3Q7aS5vcGVuKFwiR0VUXCIsbiwhMCksaS5yZXNwb25zZVR5cGU9XCJhcnJheWJ1ZmZlclwiLGkub25sb2FkPWZ1bmN0aW9uKCl7XyhpLnJlc3BvbnNlLG8sbil9LGkub25lcnJvcj1mdW5jdGlvbigpe28uX3dlYkF1ZGlvJiYoby5fYnVmZmVyPSEwLG8uX3dlYkF1ZGlvPSExLG8uX2F1ZGlvTm9kZT1bXSxkZWxldGUgby5fZ2Fpbk5vZGUsZGVsZXRlIGVbbl0sby5sb2FkKCkpfTt0cnl7aS5zZW5kKCl9Y2F0Y2godSl7aS5vbmVycm9yKCl9fX0sXz1mdW5jdGlvbihuLHIsdCl7by5kZWNvZGVBdWRpb0RhdGEobixmdW5jdGlvbihvKXtvJiYoZVt0XT1vLGMocixvKSl9LGZ1bmN0aW9uKGUpe3Iub24oXCJsb2FkZXJyb3JcIixlKX0pfSxjPWZ1bmN0aW9uKGUsbyl7ZS5fZHVyYXRpb249bz9vLmR1cmF0aW9uOmUuX2R1cmF0aW9uLDA9PT1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlLl9zcHJpdGUpLmxlbmd0aCYmKGUuX3Nwcml0ZT17X2RlZmF1bHQ6WzAsMWUzKmUuX2R1cmF0aW9uXX0pLGUuX2xvYWRlZHx8KGUuX2xvYWRlZD0hMCxlLm9uKFwibG9hZFwiKSksZS5fYXV0b3BsYXkmJmUucGxheSgpfSxwPWZ1bmN0aW9uKG4scix0KXt2YXIgYT1uLl9ub2RlQnlJZCh0KTthLmJ1ZmZlclNvdXJjZT1vLmNyZWF0ZUJ1ZmZlclNvdXJjZSgpLGEuYnVmZmVyU291cmNlLmJ1ZmZlcj1lW24uX3NyY10sYS5idWZmZXJTb3VyY2UuY29ubmVjdChhLnBhbm5lciksYS5idWZmZXJTb3VyY2UubG9vcD1yWzBdLHJbMF0mJihhLmJ1ZmZlclNvdXJjZS5sb29wU3RhcnQ9clsxXSxhLmJ1ZmZlclNvdXJjZS5sb29wRW5kPXJbMV0rclsyXSksYS5idWZmZXJTb3VyY2UucGxheWJhY2tSYXRlLnZhbHVlPW4uX3JhdGV9O1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZCYmZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJue0hvd2xlcjpsLEhvd2w6Zn19KSxcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cyYmKGV4cG9ydHMuSG93bGVyPWwsZXhwb3J0cy5Ib3dsPWYpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJih3aW5kb3cuSG93bGVyPWwsd2luZG93Lkhvd2w9Zil9KCk7XG5cblxuO1xuLy9cbi8vXHRVdGlsc1xuLy9cbi8vICogYW5pbWF0ZShjYiwgZHVyYXRvbikgLS0gd3JhcHBlciBvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbi8vXG4vLyBET00gbWFuaXB1bGF0aW9uc1xuLy9cbi8vICogY2xvc2VQb3B1cChldmVudCkgLS0gY2xvc2UgcG9wdXAgd2l0aCB1c2VycyB1bmlxdWUgY29kZVxuLy8gKiBvblZvbHVtZUJ0bkNsaWNrKGV2ZW50KSAtLSBoYW5kbGVyIGZvciB2b2x1bWUgYnV0dG9ucyBjbGlja3MgKG11dGUvdW5tdXRlIHRyaWdnZXIpXG4vLyAqIG9uVm9sdW1lU2xpZGVySW5wdXQoZXZlbnQpIC0tIGNoYW5nZSBhdWRpbyB2b2x1bWUgd2hlbnZvbHVtZSBzbGlkZXIgaXMgYmVpbmcgbW92ZWRcbi8vICogdXBkYXRlU2NvcmUobnVtYmVyKSAtLSB1cGRhdGUgY3VycmVudCBzY29yZVxuLy9cbi8vXHRDYW52YXNcbi8vXG4vLyAqIHJlZnJlc2hDb21wdXRlZFNpemVzKG9iamVjdCkgLS0gY2hhbmdlIDxjYW52YXM+IHNpemVzIHRvIGFjdHVhbFxuLy8gKiBhZGRNb3ZlbWVudE9uQ2FudmFzKG1vdmVtZW50SW5mbykgLS0gYWRkIG5ldyBtb3ZlbWVudCBjYW52YXMtb2JqZWN0XG4vLyAqIGFuaW1hdGVNb3ZlbWVudChvYmplY3QpIC0tIG1ha2UgcmVjaWV2ZWQgYWxyZWFkeSBhZGRlZCBtb3ZlbWVudCBydW4gKGFuaW1hdGUpXG4vLyAqIG9uQWdTZXR1cEV2ZW50KGV2ZW50KSAtLSBoYW5kbGVyIGZvciBldmVudCwgZmlyZWQgd2hlbiBnYW1lIHNldHRpbmdzIGFyZSByZWNpZXZlZFxuLy9cbi8vIFRvIHJlbW92ZVxuLy9cbi8vICogc3RhcnQoKSAtLSBzdGFydCBnYW1lXG4vLyAqIG5leHRCZWF0KGlzRmlyc3QpIC0tIHByb2Nlc3MgKGFuZCBhZGQpIG5leHQgbW92ZW1lbnRcbi8vXG4vLyBJbml0aWFsaXphdGlvblxuLy9cblxuXG4oZnVuY3Rpb24oKXtcblxuZnVuY3Rpb24gYW5pbWF0ZShkcmF3LCBkdXJhdGlvbikge1xuICB2YXIgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gYW5pbWF0ZSh0aW1lKSB7XG4gICAgLy8g0L7Qv9GA0LXQtNC10LvQuNGC0YwsINGB0LrQvtC70YzQutC+INC/0YDQvtGI0LvQviDQstGA0LXQvNC10L3QuCDRgSDQvdCw0YfQsNC70LAg0LDQvdC40LzQsNGG0LjQuFxuICAgIHZhciB0aW1lUGFzc2VkID0gdGltZSAtIHN0YXJ0O1xuXG4gICAgLy8g0LLQvtC30LzQvtC20L3QviDQvdC10LHQvtC70YzRiNC+0LUg0L/RgNC10LLRi9GI0LXQvdC40LUg0LLRgNC10LzQtdC90LgsINCyINGN0YLQvtC8INGB0LvRg9GH0LDQtSDQt9Cw0YTQuNC60YHQuNGA0L7QstCw0YLRjCDQutC+0L3QtdGGXG4gICAgaWYgKHRpbWVQYXNzZWQgPiBkdXJhdGlvbikgdGltZVBhc3NlZCA9IGR1cmF0aW9uO1xuXG4gICAgLy8g0L3QsNGA0LjRgdC+0LLQsNGC0Ywg0YHQvtGB0YLQvtGP0L3QuNC1INCw0L3QuNC80LDRhtC40Lgg0LIg0LzQvtC80LXQvdGCIHRpbWVQYXNzZWRcbiAgICBkcmF3KHRpbWVQYXNzZWQpO1xuXG4gICAgLy8g0LXRgdC70Lgg0LLRgNC10LzRjyDQsNC90LjQvNCw0YbQuNC4INC90LUg0LfQsNC60L7QvdGH0LjQu9C+0YHRjCAtINC30LDQv9C70LDQvdC40YDQvtCy0LDRgtGMINC10YnRkSDQutCw0LTRgFxuICAgIGlmICh0aW1lUGFzc2VkIDwgZHVyYXRpb24pIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgICB9XG5cbiAgfSk7XG59XG5cblxudmFyIGNvbmZpZyA9IHtcblx0Y29sb3JzOiB7XG5cdFx0bmV1dHJhbDogJyNGRkE3MDAnLCAvLyAjOEQ5OUFFICMxMDdFN0Rcblx0XHRzdWNjZXNzOiAnI0MyRTgxMicsXG5cdFx0ZmFpbDogJyNCODBDMDknXG5cdH0sXG5cdG1vdmVtZW50czoge1xuXHRcdHJhZGl1c1BlcmNlbnQ6IDQsXG5cdFx0c3Ryb2tlV2lkdGhQZXJjZW50OiAwLjVcblx0fVxufVxuXG5mdW5jdGlvbiBjbG9zZVBvcHVwKGV2ZW50KSB7XG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3B1cCcpWzBdLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlZCcpO1xuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubG9nbycpWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ3dpdGgtcG9wdXAnKTtcbn1cblxuLy8gTXV0ZXMgLyB1bm11dGVzIGF1ZGlvXG5mdW5jdGlvbiBvblZvbHVtZUJ0bkNsaWNrKGV2ZW50KSB7XG5cblx0aWYgKCFjb25maWcuY3VycmVudEF1ZGlvLm11dGVkKSB7XG5cblx0XHQvLyBDaGFuZ2Ugdmlld1xuXHRcdHRoaXMuY2hpbGROb2Rlc1sxXS5jbGFzc0xpc3QucmVtb3ZlKCdmYS12b2x1bWUtdXAnKTtcblx0XHR0aGlzLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LmFkZCgnZmEtdm9sdW1lLW9mZicpO1xuXG5cdFx0Ly8gTXV0ZVxuXHRcdGNvbmZpZy5jdXJyZW50QXVkaW8ubXV0ZSgpO1xuXHRcdGNvbmZpZy5jdXJyZW50QXVkaW8ubXV0ZWQgPSB0cnVlO1xuXHR9IGVsc2Uge1xuXG5cdFx0Ly8gQ2hhbmdlIHZpZXdcblx0XHR0aGlzLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LnJlbW92ZSgnZmEtdm9sdW1lLW9mZicpO1xuXHRcdHRoaXMuY2hpbGROb2Rlc1sxXS5jbGFzc0xpc3QuYWRkKCdmYS12b2x1bWUtdXAnKTtcblxuXHRcdC8vIFVubXV0ZVxuXHRcdGNvbmZpZy5jdXJyZW50QXVkaW8udW5tdXRlKCk7XG5cdFx0Y29uZmlnLmN1cnJlbnRBdWRpby5tdXRlZCA9IGZhbHNlO1xuXHR9XG5cbn1cblxuLy8gQ2hhbmdlIHZvbHVtZSBsZXZlbCBvZiBjdXJyZW50IGF1ZGlvXG5mdW5jdGlvbiBvblZvbHVtZVNsaWRlcklucHV0KGV2ZW50KSB7XG5cdGNvbmZpZy5jdXJyZW50QXVkaW8udm9sdW1lKHRoaXMudmFsdWUvMTAwKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU2NvcmUobmV3U2NvcmUpIHtcblxuXHR2YXIgc2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2NvcmUnKVswXTtcblx0dmFyIHNjb3JlTnVtYmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNjb3JlLW51bWJlcicpWzBdO1xuXG5cdHNjb3JlLmNsYXNzTGlzdC5hZGQoJ3VwZGF0ZScpO1xuXHRzZXRUaW1lb3V0KCgpPT57IHNjb3JlLmNsYXNzTGlzdC5yZW1vdmUoJ3VwZGF0ZScpOyB9LCA0MDApO1xuXG5cdGNvbmZpZy5jdXJyZW50U2NvcmUgPSBwYXJzZUludChuZXdTY29yZSk7XG5cdHNjb3JlTnVtYmVyLmlubmVySFRNTCA9IGNvbmZpZy5jdXJyZW50U2NvcmU7XG5cblx0cmV0dXJuIGNvbmZpZy5jdXJyZW50U2NvcmU7XG5cbn1cblxuLy8gKioqKioqKioqKlxuLy8gKiBDQU5WQVMgKlxuLy8gKioqKioqKioqKlxuXG4vLyBDaGFuZ2VzIGNhbnZhcyBiYWNrZ3JvdW5kIHNpemUgd2hlbiBmaXJlZFxuZnVuY3Rpb24gcmVmcmVzaENvbXB1dGVkU2l6ZXMob2JqZWN0KSB7XG5cdFxuXHRjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZSA9IHtcblx0XHR3aWR0aDogK29iamVjdC53aWR0aC5zbGljZSgwLC0yKSxcblx0XHRoZWlnaHQ6ICtvYmplY3QuaGVpZ2h0LnNsaWNlKDAsLTIpXG5cdH07XG5cblx0Y2FudmFzLnNldERpbWVuc2lvbnMoe1xuXHRcdHdpZHRoOiBjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZS53aWR0aCxcblx0XHRoZWlnaHQ6IGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLmhlaWdodFxuXHR9KTtcblxufVxuXG5cbmZ1bmN0aW9uIGFkZE1vdmVtZW50T25DYW52YXMobW92ZW1lbnRJbmZvKSB7XG5cblx0aWYgKG1vdmVtZW50SW5mby5uYW1lID09ICdwYXNzJykgcmV0dXJuO1xuXG5cdHZhciByYWRpdXMgPSBjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnJhZGl1cztcblx0dmFyIHN0cm9rZVdpZHRoID0gY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5zdHJva2VXaWR0aDtcblx0Ly8gdmFyIHggPSBNYXRoLnJvdW5kKGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLndpZHRoIC0gKGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLndpZHRoLzEwMCkqMykgLSByYWRpdXMqMjtcblx0dmFyIHggPSBNYXRoLnJvdW5kKGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLndpZHRoKTtcblx0dmFyIHkgPSBNYXRoLnJvdW5kKGNvbmZpZy5vbmVIUGVyY2VudCAqIDQ1KSArIGNvbmZpZy5jYW52T3B0cy5tb3ZlbWVudHMuc3Ryb2tlV2lkdGgqMS42O1xuXG5cdHZhciBjaXJjbGUgPSBuZXcgZmFicmljLkNpcmNsZSh7XG5cdFx0ZmlsbDogY29uZmlnLmNvbG9ycy5uZXV0cmFsLFxuXHRcdHN0cm9rZTogJyNGRkZGRkYnLFxuXHRcdHN0cm9rZVdpZHRoOiBzdHJva2VXaWR0aCxcblx0XHRyYWRpdXM6IHJhZGl1cyxcblx0XHRvcmlnaW5ZOiAnY2VudGVyJyxcblx0XHRvcmlnaW5YOiAnY2VudGVyJ1xuXHR9KTtcblxuXHQvLyBjb25zb2xlLmxvZygtY2lyY2xlLmdldFJhZGl1c1goKSowLjgpO1xuXHR2YXIgYXJyb3c7XG5cblx0c3dpdGNoIChtb3ZlbWVudEluZm8ubmFtZSkge1xuXHRcdGNhc2UgJ3VwJzpcblx0XHRcdGFycm93ID0gbmV3IGZhYnJpYy5QYXRoKGBcblx0XHRcdFx0TSAkey1jaXJjbGUuZ2V0UmFkaXVzWCgpKjAuNjV9ICR7Y2lyY2xlLmdldFJhZGl1c1koKSowLjExfVxuXHRcdFx0XHRMIDAgJHstY2lyY2xlLmdldFJhZGl1c1koKSowLjU1fVxuXHRcdFx0XHRMICR7Y2lyY2xlLmdldFJhZGl1c1goKSowLjY1fSAke2NpcmNsZS5nZXRSYWRpdXNZKCkqMC4xMX1cblx0XHRcdFx0TCAke2NpcmNsZS5nZXRSYWRpdXNYKCkqMC41fSAke2NpcmNsZS5nZXRSYWRpdXNZKCkqMC4yNX1cblx0XHRcdFx0TCAwICR7LWNpcmNsZS5nZXRSYWRpdXNZKCkqMC4yNX1cblx0XHRcdFx0TCAkey1jaXJjbGUuZ2V0UmFkaXVzWCgpKjAuNX0gJHtjaXJjbGUuZ2V0UmFkaXVzWSgpKjAuMjV9XG5cdFx0XHRcdHpgLCB7XG5cdFx0XHRcdC8vIGZpbGw6ICcjZmZmJyxcblx0XHRcdFx0b3JpZ2luWTogJ2NlbnRlcicsXG5cdFx0XHRcdG9yaWdpblg6ICdjZW50ZXInXG5cdFx0XHR9KTtcblx0XHRicmVhaztcblxuXHRcdGNhc2UgJ2Rvd24nOlxuXHRcdFx0YXJyb3cgPSBuZXcgZmFicmljLlBhdGgoYFxuXHRcdFx0XHRNICR7Y2lyY2xlLmdldFJhZGl1c1goKSowLjY1fSAkey1jaXJjbGUuZ2V0UmFkaXVzWSgpKjAuMTF9XG5cdFx0XHRcdEwgMCAke2NpcmNsZS5nZXRSYWRpdXNZKCkqMC41NX1cblx0XHRcdFx0TCAkey1jaXJjbGUuZ2V0UmFkaXVzWCgpKjAuNjV9ICR7LWNpcmNsZS5nZXRSYWRpdXNZKCkqMC4xMX1cblx0XHRcdFx0TCAkey1jaXJjbGUuZ2V0UmFkaXVzWCgpKjAuNX0gJHstY2lyY2xlLmdldFJhZGl1c1koKSowLjI1fVxuXHRcdFx0XHRMIDAgJHtjaXJjbGUuZ2V0UmFkaXVzWSgpKjAuMjV9XG5cdFx0XHRcdEwgJHtjaXJjbGUuZ2V0UmFkaXVzWCgpKjAuNX0gJHstY2lyY2xlLmdldFJhZGl1c1koKSowLjI1fVxuXHRcdFx0XHR6YCwge1xuXHRcdFx0XHQvLyBmaWxsOiAnI2ZmZicsXG5cdFx0XHRcdG9yaWdpblk6ICdjZW50ZXInLFxuXHRcdFx0XHRvcmlnaW5YOiAnY2VudGVyJ1xuXHRcdFx0fSk7XG5cdFx0YnJlYWtcblx0fVxuXHRcblxuXHR2YXIgbW92ZW1lbnQgPSBuZXcgZmFicmljLkdyb3VwKFtjaXJjbGUsIGFycm93XSwge1xuXHRcdHRvcDogeSxcblx0XHRsZWZ0OiB4XG5cdH0pO1xuXG5cdG1vdmVtZW50SW5mby5jYW52YXNPYmplY3QgPSBtb3ZlbWVudDtcblxuXHRjYW52YXMuYWRkKG1vdmVtZW50KTtcblx0Y2FudmFzLnJlbmRlckFsbCgpO1xuXHQvLyBtb3ZlbWVudEluZm8uc3RhdGUgPSAnYWRkZWQnO1xufVxuXG5mdW5jdGlvbiBhbmltYXRlTW92ZW1lbnQobW92ZW1lbnRJbmZvKSB7XG5cblx0Ly8gaWYgKG1vdmVtZW50SW5mby5uYW1lID09ICdwYXNzJykgcmV0dXJuO1xuXG5cdG1vdmVtZW50SW5mby5jYW52YXNPYmplY3QuYW5pbWF0ZSgnbGVmdCcsICcnKygoY29uZmlnLm9uZVdQZXJjZW50ICogMjApICsgY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5zdHJva2VXaWR0aCoxLjUpLCB7XG5cdFx0b25DaGFuZ2U6IGNhbnZhcy5yZW5kZXJBbGwuYmluZChjYW52YXMpLFxuXHRcdGR1cmF0aW9uOiBjb25maWcuY3VycmVudE1pbkludGVydmFsKjE2XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBvbkdsU2V0dXBFdmVudChldmVudCkge1xuXHRjb25maWcuY3VycmVudEJwbSA9IGV2ZW50LmRldGFpbC5icG07XG5cdGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwgPSAoY29uZmlnLmN1cnJlbnRCcG0qMTAwMCkvKDYwKjE2KTtcblx0Y29uZmlnLmN1cnJlbnRTb25nTmFtZSA9IGV2ZW50LmRldGFpbC5zb25nO1xuXHRjb25maWcuY3VycmVudEF1ZGlvID0gZXZlbnQuZGV0YWlsLm11c2ljO1xuXHRjbG9zZVBvcHVwKCk7XG5cdGNvbnNvbGUubG9nKGV2ZW50LmRldGFpbC5icG0pO1xuXG5cdC8vIFRlc3Rcblx0Y29uZmlnLmN1cnJlbnRBdWRpby5wbGF5KCk7XG59XG5cbi8vIEFjdGlvbnMgcGVyZm9ybWVkIHdoZW4gY3VycmVudCBnYW1lIHNldHRpbmdzIHJlY2lldmVkXG5mdW5jdGlvbiBvbkdsQWRkTW92ZW1lbnQoZXZlbnQpIHtcblxuXHRjb25maWcuY3VycmVudE1vdmVtZW50cy5wdXNoKHtuYW1lOiBldmVudC5kZXRhaWx9KTtcblx0dmFyIHRoaXNNb3ZlbWVudCA9IGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzW2NvbmZpZy5jdXJyZW50TW92ZW1lbnRzLmxlbmd0aC0xXTtcblxuXHRpZiAodGhpc01vdmVtZW50Lm5hbWUgPT0gJ3Bhc3MnKSByZXR1cm47XG5cblx0YWRkTW92ZW1lbnRPbkNhbnZhcyh0aGlzTW92ZW1lbnQpO1xuXHRhbmltYXRlTW92ZW1lbnQodGhpc01vdmVtZW50KTtcblxufVxuXG5mdW5jdGlvbiBvbkdsU3RhdHVzKGV2ZW50KSB7XG5cblx0dmFyIHN0YXR1cyA9IGV2ZW50LmRldGFpbC5zdGF0dXM7XG5cdHZhciBtb3ZlbWVudEluZGV4ID0gZXZlbnQuZGV0YWlsLmluZGV4O1xuXHR2YXIgbmV3U2NvcmUgPSBldmVudC5kZXRhaWwubmV3U2NvcmU7XG5cblx0aWYgKGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzW21vdmVtZW50SW5kZXhdLm5hbWUgPT0gJ3Bhc3MnKSByZXR1cm47XG5cblx0dmFyIGNhbnZPYmogPSBjb25maWcuY3VycmVudE1vdmVtZW50c1ttb3ZlbWVudEluZGV4XS5jYW52YXNPYmplY3Q7XG5cblx0Ly8gUnVuIGNhbnZhcyBhbmltYXRpb25cblx0Y2Fudk9iai5zZXQoe1xuXHRcdGZpbGw6IGNvbmZpZy5jb2xvcnNbc3RhdHVzXSxcblx0XHQvLyBjZW50ZXJlZFNjYWxpbmc6IHRydWVcblx0fSk7XG5cblx0c3dpdGNoIChzdGF0dXMpIHtcblx0XHRjYXNlICdzdWNjZXNzJzpcblx0XHRcdGNhbnZPYmouYW5pbWF0ZSh7XG5cdFx0XHRcdCdzY2FsZVgnOiA2LFxuXHRcdFx0XHQnc2NhbGVZJzogNixcblx0XHRcdFx0J29wYWNpdHknOiAwLFxuXHRcdFx0XHQnbGVmdCc6ICctPScrY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5yYWRpdXMqNS4yLFxuXHRcdFx0XHQndG9wJzogJy09Jytjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnJhZGl1cyo1LjJcblx0XHRcdH0sIHtcblx0XHRcdFx0b25DaGFuZ2U6IGNhbnZhcy5yZW5kZXJBbGwuYmluZChjYW52YXMpLFxuXHRcdFx0XHRkdXJhdGlvbjogNzAwLFxuXHRcdFx0XHRlYXNpbmc6IGZhYnJpYy51dGlsLmVhc2UuZWFzZU91dFF1YXJ0XG5cdFx0XHR9KTtcblx0XHRicmVhaztcblxuXHRcdGNhc2UgJ2ZhaWwnOlxuXHRcdFx0Y2Fudk9iai5hbmltYXRlKHtcblx0XHRcdFx0J3NjYWxlWCc6IDAuOCxcblx0XHRcdFx0J3NjYWxlWSc6IDAuOCxcblx0XHRcdFx0J29wYWNpdHknOiAwLFxuXHRcdFx0XHQnbGVmdCc6ICcnKygtY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5yYWRpdXMpLFxuXHRcdFx0XHQvLyAndG9wJzogJy09Jytjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnJhZGl1c1xuXHRcdFx0fSwge1xuXHRcdFx0XHRvbkNoYW5nZTogY2FudmFzLnJlbmRlckFsbC5iaW5kKGNhbnZhcyksXG5cdFx0XHRcdGR1cmF0aW9uOiAxMDAwLFxuXHRcdFx0XHQvLyBlYXNpbmc6IGZhYnJpYy51dGlsLmVhc2UuZWFzZU91dFF1YXJ0XG5cdFx0XHR9KTtcblx0XHRicmVhaztcblx0fVxuXG5cdC8vIFVwZGF0ZSBzY29yZVxuXHR1cGRhdGVTY29yZShuZXdTY29yZSk7XHRcblxufVxuXG4vLyBmdW5jdGlvbiBzdGFydCgpIHtcbi8vIFx0Y29uZmlnLmN1cnJlbnRTY29yZSA9IDA7XG4vLyBcdGNvbmZpZy5jdXJyZW50U3RhcnREYXRlID0gRGF0ZS5ub3coKTtcbi8vIFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuLy8gXHRcdG5leHRCZWF0KHRydWUpO1xuLy8gXHR9LCBjb25maWcuY3VycmVudEJlZ2lubmluZ09mZnNldCk7XG4vLyBcdGNvbmZpZy5jdXJyZW50QXVkaW8ucGxheSgpO1xuLy8gfVxuXG4vLyBmdW5jdGlvbiBuZXh0QmVhdChpc0ZpcnN0KSB7XG5cbi8vIFx0Ly8gSWYgd2UncmUgaW4gdGhlIGJlZ2lubmluZyBvZiBzb25nXG4vLyBcdGlmIChpc0ZpcnN0ID09PSB0cnVlKSB7XG4vLyBcdFx0YWRkTW92ZW1lbnRPbkNhbnZhcyhjb25maWcuY3VycmVudE1vdmVtZW50c1swXSk7XG4vLyBcdFx0YW5pbWF0ZU1vdmVtZW50KGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzWzBdKTtcbi8vIFx0XHRyZXR1cm47XG4vLyBcdH1cblxuLy8gXHQvLyBJbnNlcnQgbmV3IG1vdmVtZW50XG4vLyBcdHZhciBhcHBlYXJpbmdNb3ZlbWVudEluZGV4ID0gTWF0aC5mbG9vcigoRGF0ZS5ub3coKSAtIGNvbmZpZy5jdXJyZW50U3RhcnREYXRlKSAvIGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwpO1xuXHRcbi8vIFx0dmFyIGFwcGVhcmluZ01vdmVtZW50ID0gY29uZmlnLmN1cnJlbnRNb3ZlbWVudHNbYXBwZWFyaW5nTW92ZW1lbnRJbmRleF07XG5cbi8vIFx0YWRkTW92ZW1lbnRPbkNhbnZhcyhhcHBlYXJpbmdNb3ZlbWVudCk7XG4vLyBcdGFuaW1hdGVNb3ZlbWVudChhcHBlYXJpbmdNb3ZlbWVudCk7XG5cbi8vIH1cblxuXG5cblxuXG5cblxuXG5cbi8vICoqKioqKioqXG4vLyAqIEluaXQgKlxuLy8gKioqKioqKipcblxuY29uZmlnLmN1cnJlbnRNb3ZlbWVudHMgPSBbXTtcbmNvbmZpZy5jdXJyZW50U2NvcmUgPSAwO1xuY29uZmlnLmN1cnJlbnRTdGFydERhdGUgPSAwO1xuXG4vLyBUbyByZW1vdmUhXG4vLyBjb25maWcuY3VycmVudEJwbSA9IDEyODtcbi8vIGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwgPSAoY29uZmlnLmN1cnJlbnRCcG0qMTAwMCkgLyAoNjAqMTYpXG5cbi8vIEdldCBjb21wdXRlZCBzdHlsZXMgb2Ygd2hvbGUgcGFnZSB3cmFwcGVyXG52YXIgY2FudmFzQ29tcHV0ZWRTdHlsZU9iaiA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndyJylbMF0pO1xuXG5cbi8vIFNldCBjYW52YXMgb3B0aW9uc1xuY29uZmlnLm9uZVdQZXJjZW50ID0gcGFyc2VJbnQoY2FudmFzQ29tcHV0ZWRTdHlsZU9iai53aWR0aC5zbGljZSgwLC0yKSkvMTAwO1xuY29uZmlnLm9uZUhQZXJjZW50ID0gcGFyc2VJbnQoY2FudmFzQ29tcHV0ZWRTdHlsZU9iai5oZWlnaHQuc2xpY2UoMCwtMikpLzEwMDtcblxuY29uZmlnLmNhbnZPcHRzID0ge1xuXHRiZ1VSTDogJy4uL2ltZy9iZy1jcm93ZC0xLmpwZycsXG5cdGNvbXB1dGVkU3R5bGU6IHtcblx0XHR3aWR0aDogY29uZmlnLm9uZVdQZXJjZW50KjEwMCxcblx0XHRoZWlnaHQ6IGNvbmZpZy5vbmVIUGVyY2VudCoxMDBcblx0fSxcblx0bW92ZW1lbnRzOiB7XG5cdFx0cmFkaXVzOiBjb25maWcub25lV1BlcmNlbnQgKiBjb25maWcubW92ZW1lbnRzLnJhZGl1c1BlcmNlbnQsXG5cdFx0c3Ryb2tlV2lkdGg6IGNvbmZpZy5vbmVXUGVyY2VudCAqIGNvbmZpZy5tb3ZlbWVudHMuc3Ryb2tlV2lkdGhQZXJjZW50XG5cdH1cbn1cblxuXG4vLyBJbml0aWFsaXplICdmYWJyaWMnIGNhbnZhcyBvYmpcbnZhciBjYW52YXMgPSBuZXcgZmFicmljLlN0YXRpY0NhbnZhcygnZ2FtZScsIHtcblx0d2lkdGg6IGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLndpZHRoLFxuXHRoZWlnaHQ6IGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLmhlaWdodCxcbn0pO1xuXG4vLyBEcmF3IFwicGVyZmVjdCBzdWNjZXNzXCIgcGxhY2Ugc2hhZG93IGNpcmNsZVxudmFyIHNoYWRvd0NpcmNsZSA9IG5ldyBmYWJyaWMuQ2lyY2xlKHtcblx0Ly8gZmlsbDogY29uZmlnLmNvbG9ycy5uZXV0cmFsLFxuXHRmaWxsOiAncmdiYSgyMDAsMjAwLDIwMCwwLjIpJyxcblx0c3Ryb2tlOiAncmdiYSgyMDAsMjAwLDIwMCwxKScsXG5cdHN0cm9rZVdpZHRoOiBjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnN0cm9rZVdpZHRoKjIsXG5cdHJhZGl1czogY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5yYWRpdXMgKyBjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnN0cm9rZVdpZHRoLFxuXHR0b3A6IE1hdGgucm91bmQoY29uZmlnLm9uZUhQZXJjZW50KjQ1KSxcblx0bGVmdDogY29uZmlnLm9uZVdQZXJjZW50ICogMjBcbn0pXG5jYW52YXMuYWRkKHNoYWRvd0NpcmNsZSk7XG5cbi8vIFNldCBoYW5kbGVyIGZvciBhZGRpbmcgb2YgbmV4dCBtb3ZlbWVudCBpbiBxdWV1ZVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZ2xBZGRNb3ZlbWVudCcsIG9uR2xBZGRNb3ZlbWVudCk7XG5cbi8vIFNldCBoYW5kbGVyIGZvciBtb3ZlbWVudCByZXN1bHQgZXZlbnRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2dsU3RhdHVzJywgb25HbFN0YXR1cyk7XG5cbi8vIFNldCBoYW5kbGVyIGZvciBnYW1lIHNldHVwIGV2ZW50XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdnbFNldHVwRXZlbnQnLCBvbkdsU2V0dXBFdmVudCk7XG5cbi8vIFNob3cgY3VycmVudCBnYW1lIGNvZGVcbnZhciBjb2RlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvZGUtY29udGFpbmVyJyk7XG5jb2RlQ29udGFpbmVyLmlubmVySFRNTCA9IGNvZGU7XG5cblxuLy8gKioqKioqKioqXG4vLyAqIEF1ZGlvICpcbi8vICoqKioqKioqKlxuXG4vLyBBZGQgbXV0ZWQgc3RhdGUgc2F2aW5nIGZlYXR1cmUgdG8gSG93bCAoYXVkaW8gbGliKVxuSG93bC5wcm90b3R5cGUubXV0ZWQgPSBmYWxzZTtcbkhvd2wubXV0ZWQgPSBmYWxzZTtcblxuLy8gR2V0IHZvbHVtZSBidXR0b24gZWxlbWVudFxudmFyIHZvbHVtZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy52b2x1bWUtYnRuJylbMF07XG4vLyBhbmQgc2V0IG9uQ2xpY2sgZXZlbnQgaGFuZGxlclxudm9sdW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25Wb2x1bWVCdG5DbGljayk7XG5cbi8vIEdldCB2b2x1bWUgbGV2ZWwgc2xpZGVyXG52YXIgdm9sdW1lU2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnZvbHVtZS1pbnB1dCcpWzBdO1xuLy8gYW5kIHNldCBvbklucHV0IGV2ZW50IGhhbmRsZXJcbnZvbHVtZVNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uVm9sdW1lU2xpZGVySW5wdXQpXG5cblxuLy8gQ2hhbmdlIGNhbnZhcyBiYWNrZ3JvdW5kIHNpemUgb24gd2luZG93IHJlc2l6ZVxud2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24oKXtcblx0cmVmcmVzaENvbXB1dGVkU2l6ZXMoY2FudmFzQ29tcHV0ZWRTdHlsZU9iaik7XG5cdGNhbnZhcy5yZW5kZXJBbGwuYmluZChjYW52YXMpO1xufVxuXG5cblxuXG5cblxuXG5cblxuLy8gVEVTVFxuLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcblxufSkoKTtcbi8qKlxuICogZ2FtZWxvZ2ljLmpzXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAgIC8vXG5cbiAgICB2YXIgRVBTSUxPTiA9IDEwMDA7XG4gICAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gICAgLy8gQWN0aW9ucyBwZXJmb3JtZWQgd2hlbiBjdXJyZW50IGdhbWUgc2V0dGluZ3MgcmVjaWV2ZWRcbiAgICBmdW5jdGlvbiBvbkFnU2V0dXBFdmVudChldmVudCkge1xuXG5cdGxldCBhdWRpb0ZpbGVVUkwgPSAnaHR0cDovLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgKyAnL3NvbmdzLycgKyBldmVudC5kZXRhaWwuc29uZztcblx0Ly8gbGV0IGF1ZGlvRmlsZVVSTCA9ICcuLi9hdWRpby8nICsgZXZlbnQuZGV0YWlsLnNvbmc7XG5cblx0Ly8gY29uc29sZS5sb2coYXVkaW9GaWxlVVJMKTtcblxuXHRjb25maWcuY3VycmVudEF1ZGlvID0gbmV3IEhvd2woe1xuXHQgICAgdXJsczogW2F1ZGlvRmlsZVVSTF0sXG5cdCAgICBhdXRvcGxheTogZmFsc2UsXG5cdCAgICB2b2x1bWU6IDAuOCxcblx0fSk7XG5cblx0Ly8gY29uZmlnLmN1cnJlbnRNb3ZlbWVudHMgPSBldmVudC5kZXRhaWwuY29tbWFuZHMubWFwKChjdXJyZW50VmFsdWUsIGluZGV4LCBhcnJheSkgPT4ge1xuXHQvLyAgICAgcmV0dXJuIHtcblx0Ly8gXHRpbmRleDogaW5kZXgsXG5cdC8vIFx0bmFtZTogY3VycmVudFZhbHVlLFxuXHQvLyBcdGNvbG9yOiBjb25maWcuY29sb3JzLm5ldXRyYWwsXG5cdC8vICAgICB9XG5cdC8vIH0pO1xuXHRjb25maWcuY3VycmVudE1vdmVtZW50cyA9IGV2ZW50LmRldGFpbC5jb21tYW5kcztcblxuXHQvLyBCUE0sIG1pbkludGVydmFsLCBiZWdpbm5pbmcgb2Zmc2V0XG5cdC8vIGNvbmZpZy5jdXJyZW50QnBtID0gZXZlbnQuZGV0YWlsLmJwbTtcblx0Y29uZmlnLmN1cnJlbnRCcG0gPSAxMjg7XG5cdGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwgPSAoY29uZmlnLmN1cnJlbnRCcG0gKiAxMDAwKSAvICg2MCAqIDE2KTtcblx0Y29uZmlnLmN1cnJlbnRCZWdpbm5pbmdPZmZzZXQgPSBldmVudC5kZXRhaWwub2Zmc2V0O1xuXG5cdC8vIFRlc3Rcblx0Ly8gYWRkTW92ZW1lbnRPbkNhbnZhcyhjb25maWcuY3VycmVudE1vdmVtZW50c1sxXSk7XG5cdHN0YXJ0KCk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdGFydCgpIHtcblx0Y29uZmlnLmN1cnJlbnRTY29yZSA9IDA7XG5cdGNvbmZpZy5jdXJyZW50U3RhcnREYXRlID0gRGF0ZS5ub3coKTtcblx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHQgICAgbmV4dEJlYXQodHJ1ZSk7XG5cdH0sIGNvbmZpZy5jdXJyZW50QmVnaW5uaW5nT2Zmc2V0KTtcblx0Y29uZmlnLmN1cnJlbnRBdWRpby5zdGFydCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5leHRCZWF0KGlzRmlyc3QpIHtcblxuXHQvLyBJZiB3ZSdyZSBpbiB0aGUgYmVnaW5uaW5nIG9mIHNvbmdcblx0aWYgKGlzRmlyc3QgPT09IHRydWUpIHtcblx0ICAgIC8vYWRkTW92ZW1lbnRPbkNhbnZhcyhjb25maWcuY3VycmVudE1vdmVtZW50c1swXSk7XG5cdCAgICAvL2FuaW1hdGVNb3ZlbWVudChjb25maWcuY3VycmVudE1vdmVtZW50c1swXSk7XG5cdCAgICBjb25maWcuY3VycmVudEluZGV4ID0gMDtcblx0ICAgIHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudCgnZ2xBZGRNb3ZlbWVudCcsIHtkZXRhaWw6IGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzW2NvbmZpZy5jdXJyZW50SW5kZXhdfSk7XG5cdCAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcblx0ICAgIHNldFRpbWVvdXQobmV4dEJlYXQsIGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwpO1xuXHQgICAgcmV0dXJuO1xuXHR9XG5cblx0Ly8gSW5zZXJ0IG5ldyBtb3ZlbWVudFxuXHQvL3ZhciBhcHBlYXJpbmdNb3ZlbWVudEluZGV4ID0gTWF0aC5mbG9vcigoRGF0ZS5ub3coKSAtIGNvbmZpZy5jdXJyZW50U3RhcnREYXRlKSAvIGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwpO1xuXHRjb25zb2xlLmxvZygnYXBlYXJpbmcgbW92ZW1lbnQgaW5kZXg6ICcgKyBhcHBlYXJpbmdNb3ZlbWVudEluZGV4KTtcblx0dmFyIGFwcGVhcmluZ01vdmVtZW50ID0gY29uZmlnLmN1cnJlbnRNb3ZlbWVudHNbY29uZmlnLmN1cnJlbnRJbmRleF07XG5cblx0dmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdnbEFkZE1vdmVtZW50Jywge2RldGFpbDogYXBwZWFyaW5nTW92ZW1lbnR9KTtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG5cdHNldFRpbWVvdXQobmV4dEJlYXQsIGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwpO1xuXHRjb25zb2xlLmxvZyhhcHBlYXJpbmdNb3ZlbWVudEluZGV4KTtcbiAgICB9XG5cbiAgICAvLyBmdW5jdGlvbiBvbkFnU2V0dXBFdmVudChldmVudCkge1xuICAgIC8vIFx0Y29uZmlnLm1vdmVtZW50cyA9IGV2ZW50LmRldGFpbC5jb21tYW5kcztcbiAgICAvLyB9XG5cbiAgICBmdW5jdGlvbiBvbkFnQ29tbWFuZEV2ZW50KGV2ZW50KSB7XG5cdHZhciB0aW1lID0gRGF0ZS5ub3coKTtcblx0aWYgKE1hdGguYWJzKHRpbWUgLSBldmVudC5kZXRhaWwudGltZSkgPCBFUFNJTE9OKSB7XG5cdCAgICB2YXIgbmV3RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2dsU3RhdHVzJywge2RldGFpbDogXCJzdWNjZXNzXCJ9KTtcblx0ICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIobmV3RXZlbnQpO1xuXHR9IGVsc2Uge1xuXHQgICAgdmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdnbFN0YXR1cycsIHtkZXRhaWw6IFwiZmFpbFwifSk7XG5cdCAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKG5ld0V2ZW50KTtcblx0fVxuICAgIH1cblxuICAgIC8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FnU2V0dXBFdmVudCcsIG9uQWdTZXR1cEV2ZW50KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdhZ1NldHVwRXZlbnQnLCBmdW5jdGlvbihldmVudCkge1xuICAgIFx0Y29uc29sZS5sb2coJ2FnU2V0dXBFdmVudDogJyArIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRldGFpbCkpO1xuICAgIH0pO1xuICAgIC8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FnQ29tbWFuZEV2ZW50Jywgb25BZ0NvbW1hbmRFdmVudCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYWdDb21tYW5kRXZlbnQnLCBmdW5jdGlvbihldmVudCkge1xuICAgIFx0Y29uc29sZS5sb2coJ2FnQ29tbWFuZEV2ZW50OiAnICsgSlNPTi5zdHJpbmdpZnkoZXZlbnQuZGV0YWlsKSk7XG4gICAgfSk7XG59KSgpO1xuLyoqXG4gKiBjb25uZWN0aW9uLmpzXG4gKlxuICogYGBhZ1NldHVwRXZlbnRgYHMgc2V0IHRoZSBzb25nIG5hbWUgYW5kIHRoZSBjb21tYW5kIHNlcXVlbmNlLlxuICogYGBhZ0NvbW1hbmRFdmVudGBgcyBzYXkgd2hpY2ggY29tbWFuZCB1c2VyIHNlbnQuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAgIC8vIEVtaXRzIGZha2UgZXZlbnRzLlxuXG4gICAgdmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHQnYWdTZXR1cEV2ZW50Jyxcblx0e2RldGFpbDoge3Nvbmc6ICcxMiBIb21lLm1wMycsIGJwbTogMTAwLCBjb21tYW5kczogWyd1cCcsICdkb3duJywgJ3Bhc3MnLCAndXAnLCAnZG93bicsICdwYXNzJ119fVxuICAgICk7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG4gICAgZnVuY3Rpb24gc2VuZE1vdmVtZW50KCkge1xuXHR2YXIgbmV3RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXG5cdCAgICAnYWdDb21tYW5kRXZlbnQnLFxuXHQgICAge2RldGFpbDoge3RpbWU6IERhdGUubm93KCksIG1vdmVtZW50OiAndXAnfX1cblx0KTtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG5cdHNldFRpbWVvdXQoc2VuZE1vdmVtZW50LCAxMDAwKTtcbiAgICB9XG4gICAgc2VuZE1vdmVtZW50KCk7XG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
