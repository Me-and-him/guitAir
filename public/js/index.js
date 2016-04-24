'use strict';

// ../libs/fabric.js/dist/fabric.min.js
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

	function updateScore(add) {

		var score = document.querySelectorAll('.score')[0];
		var scoreNumber = document.querySelectorAll('.score-number')[0];

		score.classList.add('update');
		setTimeout(function () {
			score.classList.remove('update');
		}, 400);

		config.currentScore += parseInt(add);
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

		var radius = config.canvOpts.movements.radius;
		var strokeWidth = config.canvOpts.movements.strokeWidth;
		// var x = Math.round(config.canvOpts.computedStyle.width - (config.canvOpts.computedStyle.width/100)*3) - radius*2;
		var x = Math.round(config.canvOpts.computedStyle.width);
		var y = Math.round(config.oneHPercent * 45) + config.canvOpts.movements.strokeWidth * 1.6;

		var circle = new fabric.Circle({
			fill: movementInfo.color,
			stroke: '#FFFFFF',
			strokeWidth: strokeWidth,
			radius: radius,
			originY: 'center',
			originX: 'center'
		});

		var arrow = new fabric.Path({
			originY: 'center',
			originX: 'center'
		});

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
		movementInfo.canvasObject.animate('left', '' + (config.oneWPercent * 20 + config.canvOpts.movements.strokeWidth * 1.5), {
			// onChange: canvas.renderAll.bind(canvas),
			onChange: canvas.renderAll.bind(canvas),
			duration: config.currentMinInterval * 16
		});
	}

	function showMovementResult(event) {
		var status = event.detail.glStatus;
		var movementIndex = event.detail.index;
		var canvObj = config.currentMovements[movementIndex].canvasObject;

		// TEST

		canvObj.setFill(config.colors[status]);
		canvObj.animate('opacity', 0, {
			onChange: canvas.renderAll.bind(canvas),
			duration: 1000
		});
	}

	// Actions performed when current game settings recieved
	function onGlAddMovement(event) {

		config.currentMovements.push({ name: event.detail });
		var thisMovement = config.currentMovements[length - 1];

		addMovementOnCanvas(thisMovement);
		animateMovement(thisMovement);
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

	// Set handler for game setup event
	document.addEventListener('GlAddMovement', onGlAddMovement);

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
	document.addEventListener('click', closePopup);
})();
/**
 * connection.js
 *
 * Sets connection to the server.
 *
 * Emits 'agSetupEvent' and 'agCommandEvent' events that should be handled in
 * the view.
 * ``agSetupEvent``s set the song name and the command sequence.
 * ``agCommandEvent``s say which command user sent.
 */

(function () {
	// Set the connection to the mobile app.
	var host = "ws://" + window.location.hostname + "/";
	//var ws = new WebSocket(host);
	var songWasStarted = false;
	// var ws = io();

	function onOpen() {}
	// After we connect, the server sends us data which will be handled in
	// ``onmessage`` so we do nothing here.


	// function onClose(event) {
	// 	if (!e.wasClean) {
	// 	    // Retry if connection failed.
	// 	    ws = new WebSocket(host);
	// 	    ws.onopen = onOpen;
	// 	    ws.onclose = onClose;
	// 	    if (!songWasStarted) {
	// 		ws.onmessage = onGotMessageOnStart;
	// 	    } else {
	// 		ws.onmessage = onGotMessageOnConnectionEstablished;
	// 	    }
	// 	}
	// 	songWasStarted = false;
	// }

	function onGotMessageOnStart(event) {
		// Receive song name and command sequence.
		// TODO! Generate a movement string list from the supplied code.
		var newEvent = new CustomEvent('agSetupEvent', { detail: { song: event.song, bpm: event.bpm, commands: event.commands } });
		document.dispatchEvent(newEvent);
		//ws.onmessage = onGotMessageOnConnectionEstablished;
		ws.on('message', onGotMessageOnConnectionEstablished);
		songWasStarted = true;
	}

	function onGotMessageOnConnectionEstablished(event) {
		// Receive user command.
		// TODO! Generate a movement string from the supplied code.
		var newEvent = new CustomEvent('agComandEvent', { detail: { movement: event.movement, time: event.time } });
		document.dispatchEvent(newEvent);
	}

	// io.on('message', onGotMessageOnStart);
	// ws.onopen = onOpen;
	// ws.onclose = onClose;
	// ws.onmessage = onGotMessageOnStart;
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

	document.addEventListener('agSetupEvent', onAgSetupEvent);
	// document.addEventListener('agSetupEvent', function(event) {
	// 	console.log('agSetupEvent: ' + JSON.stringify(event.detail));
	// });
	Document.addEventListener('agCommandEvent', onAgCommandEvent);
	// document.addEventListener('agCmmandEvent', function(event) {
	// 	console.log('agCommandEvent: ' + JSON.stringify(event.detail));
	// });
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFZQSxDQUFDLFlBQVU7QUFBQyxLQUFJLElBQUUsRUFBTjtLQUFTLElBQUUsSUFBWDtLQUFnQixJQUFFLENBQUMsQ0FBbkI7S0FBcUIsSUFBRSxDQUFDLENBQXhCLENBQTBCLElBQUc7QUFBQyxpQkFBYSxPQUFPLFlBQXBCLEdBQWlDLElBQUUsSUFBSSxZQUFKLEVBQW5DLEdBQW9ELGVBQWEsT0FBTyxrQkFBcEIsR0FBdUMsSUFBRSxJQUFJLGtCQUFKLEVBQXpDLEdBQWdFLElBQUUsQ0FBQyxDQUF2SDtBQUF5SCxFQUE3SCxDQUE2SCxPQUFNLENBQU4sRUFBUTtBQUFDLE1BQUUsQ0FBQyxDQUFIO0FBQUssTUFBRyxDQUFDLENBQUosRUFBTSxJQUFHLGVBQWEsT0FBTyxLQUF2QixFQUE2QixJQUFHO0FBQUMsTUFBSSxLQUFKO0FBQVUsRUFBZCxDQUFjLE9BQU0sQ0FBTixFQUFRO0FBQUMsTUFBRSxDQUFDLENBQUg7QUFBSyxFQUF6RCxNQUE4RCxJQUFFLENBQUMsQ0FBSCxDQUFLLElBQUcsQ0FBSCxFQUFLO0FBQUMsTUFBSSxJQUFFLGVBQWEsT0FBTyxFQUFFLFVBQXRCLEdBQWlDLEVBQUUsY0FBRixFQUFqQyxHQUFvRCxFQUFFLFVBQUYsRUFBMUQsQ0FBeUUsRUFBRSxJQUFGLENBQU8sS0FBUCxHQUFhLENBQWIsRUFBZSxFQUFFLE9BQUYsQ0FBVSxFQUFFLFdBQVosQ0FBZjtBQUF3QyxNQUFJLElBQUUsU0FBRixDQUFFLENBQVMsQ0FBVCxFQUFXO0FBQUMsT0FBSyxPQUFMLEdBQWEsQ0FBYixFQUFlLEtBQUssTUFBTCxHQUFZLENBQUMsQ0FBNUIsRUFBOEIsS0FBSyxhQUFMLEdBQW1CLENBQWpELEVBQW1ELEtBQUssR0FBTCxHQUFTLENBQTVELEVBQThELEtBQUssT0FBTCxHQUFhLENBQTNFLEVBQTZFLEtBQUssTUFBTCxHQUFZLEVBQXpGLEVBQTRGLEtBQUssT0FBTCxHQUFhLENBQXpHLEVBQTJHLEtBQUssYUFBTCxHQUFtQixDQUFDLENBQS9IO0FBQWlJLEVBQW5KLENBQW9KLEVBQUUsU0FBRixHQUFZLEVBQUMsUUFBTyxnQkFBUyxDQUFULEVBQVc7QUFBQyxPQUFJLElBQUUsSUFBTixDQUFXLElBQUcsSUFBRSxXQUFXLENBQVgsQ0FBRixFQUFnQixLQUFHLENBQUgsSUFBTSxLQUFHLENBQTVCLEVBQThCO0FBQUMsTUFBRSxPQUFGLEdBQVUsQ0FBVixFQUFZLE1BQUksRUFBRSxJQUFGLENBQU8sS0FBUCxHQUFhLENBQWpCLENBQVosQ0FBZ0MsS0FBSSxJQUFJLENBQVIsSUFBYSxFQUFFLE1BQWY7QUFBc0IsU0FBRyxFQUFFLE1BQUYsQ0FBUyxjQUFULENBQXdCLENBQXhCLEtBQTRCLEVBQUUsTUFBRixDQUFTLENBQVQsRUFBWSxTQUFaLEtBQXdCLENBQUMsQ0FBeEQsRUFBMEQsS0FBSSxJQUFJLElBQUUsQ0FBVixFQUFZLElBQUUsRUFBRSxNQUFGLENBQVMsQ0FBVCxFQUFZLFVBQVosQ0FBdUIsTUFBckMsRUFBNEMsR0FBNUM7QUFBZ0QsUUFBRSxNQUFGLENBQVMsQ0FBVCxFQUFZLFVBQVosQ0FBdUIsQ0FBdkIsRUFBMEIsTUFBMUIsR0FBaUMsRUFBRSxNQUFGLENBQVMsQ0FBVCxFQUFZLE9BQVosR0FBb0IsRUFBRSxPQUF2RDtBQUFoRDtBQUFoRixLQUErTCxPQUFPLENBQVA7QUFBUyxXQUFPLElBQUUsRUFBRSxJQUFGLENBQU8sS0FBVCxHQUFlLEVBQUUsT0FBeEI7QUFBZ0MsR0FBdFUsRUFBdVUsTUFBSyxnQkFBVTtBQUFDLFVBQU8sS0FBSyxTQUFMLENBQWUsQ0FBQyxDQUFoQixHQUFtQixJQUExQjtBQUErQixHQUF0WCxFQUF1WCxRQUFPLGtCQUFVO0FBQUMsVUFBTyxLQUFLLFNBQUwsQ0FBZSxDQUFDLENBQWhCLEdBQW1CLElBQTFCO0FBQStCLEdBQXhhLEVBQXlhLFdBQVUsbUJBQVMsQ0FBVCxFQUFXO0FBQUMsT0FBSSxJQUFFLElBQU4sQ0FBVyxFQUFFLE1BQUYsR0FBUyxDQUFULEVBQVcsTUFBSSxFQUFFLElBQUYsQ0FBTyxLQUFQLEdBQWEsSUFBRSxDQUFGLEdBQUksRUFBRSxPQUF2QixDQUFYLENBQTJDLEtBQUksSUFBSSxDQUFSLElBQWEsRUFBRSxNQUFmO0FBQXNCLFFBQUcsRUFBRSxNQUFGLENBQVMsY0FBVCxDQUF3QixDQUF4QixLQUE0QixFQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVksU0FBWixLQUF3QixDQUFDLENBQXhELEVBQTBELEtBQUksSUFBSSxJQUFFLENBQVYsRUFBWSxJQUFFLEVBQUUsTUFBRixDQUFTLENBQVQsRUFBWSxVQUFaLENBQXVCLE1BQXJDLEVBQTRDLEdBQTVDO0FBQWdELE9BQUUsTUFBRixDQUFTLENBQVQsRUFBWSxVQUFaLENBQXVCLENBQXZCLEVBQTBCLEtBQTFCLEdBQWdDLENBQWhDO0FBQWhEO0FBQWhGO0FBQWtLLEdBQXZwQixFQUF3cEIsUUFBTyxnQkFBUyxDQUFULEVBQVc7QUFBQyxVQUFPLEtBQUssT0FBTCxDQUFhLENBQWIsQ0FBUDtBQUF1QixHQUFsc0IsRUFBbXNCLGlCQUFnQiwyQkFBVTtBQUFDLE9BQUksSUFBRSxJQUFOLENBQVcsSUFBRyxDQUFDLENBQUQsSUFBSSxDQUFDLEVBQUUsV0FBSCxJQUFnQixvQkFBb0IsSUFBcEIsQ0FBeUIsVUFBVSxTQUFuQyxDQUF2QixFQUFxRTtBQUFDLE1BQUUsV0FBRixHQUFjLENBQUMsQ0FBZixDQUFpQixJQUFJLElBQUUsU0FBRixDQUFFLEdBQVU7QUFBQyxTQUFJLElBQUUsRUFBRSxZQUFGLENBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixLQUFuQixDQUFOO1NBQWdDLElBQUUsRUFBRSxrQkFBRixFQUFsQyxDQUF5RCxFQUFFLE1BQUYsR0FBUyxDQUFULEVBQVcsRUFBRSxPQUFGLENBQVUsRUFBRSxXQUFaLENBQVgsRUFBb0MsZUFBYSxPQUFPLEVBQUUsS0FBdEIsR0FBNEIsRUFBRSxNQUFGLENBQVMsQ0FBVCxDQUE1QixHQUF3QyxFQUFFLEtBQUYsQ0FBUSxDQUFSLENBQTVFLEVBQXVGLFdBQVcsWUFBVTtBQUFDLE9BQUMsRUFBRSxhQUFGLEtBQWtCLEVBQUUsYUFBcEIsSUFBbUMsRUFBRSxhQUFGLEtBQWtCLEVBQUUsY0FBeEQsTUFBMEUsRUFBRSxXQUFGLEdBQWMsQ0FBQyxDQUFmLEVBQWlCLEVBQUUsYUFBRixHQUFnQixDQUFDLENBQWxDLEVBQW9DLE9BQU8sbUJBQVAsQ0FBMkIsVUFBM0IsRUFBc0MsQ0FBdEMsRUFBd0MsQ0FBQyxDQUF6QyxDQUE5RztBQUEySixNQUFqTCxFQUFrTCxDQUFsTCxDQUF2RjtBQUE0USxLQUF0VixDQUF1VixPQUFPLE9BQU8sZ0JBQVAsQ0FBd0IsVUFBeEIsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBQyxDQUF0QyxHQUF5QyxDQUFoRDtBQUFrRDtBQUFDLEdBQTFzQyxFQUFaLENBQXd0QyxJQUFJLElBQUUsSUFBTjtLQUFXLElBQUUsRUFBYixDQUFnQixNQUFJLElBQUUsSUFBSSxLQUFKLEVBQUYsRUFBWSxJQUFFLEVBQUMsS0FBSSxDQUFDLENBQUMsRUFBRSxXQUFGLENBQWMsYUFBZCxFQUE2QixPQUE3QixDQUFxQyxNQUFyQyxFQUE0QyxFQUE1QyxDQUFQLEVBQXVELE1BQUssQ0FBQyxDQUFDLEVBQUUsV0FBRixDQUFjLDBCQUFkLEVBQTBDLE9BQTFDLENBQWtELE1BQWxELEVBQXlELEVBQXpELENBQTlELEVBQTJILEtBQUksQ0FBQyxDQUFDLEVBQUUsV0FBRixDQUFjLDRCQUFkLEVBQTRDLE9BQTVDLENBQW9ELE1BQXBELEVBQTJELEVBQTNELENBQWpJLEVBQWdNLEtBQUksQ0FBQyxDQUFDLEVBQUUsV0FBRixDQUFjLHVCQUFkLEVBQXVDLE9BQXZDLENBQStDLE1BQS9DLEVBQXNELEVBQXRELENBQXRNLEVBQWdRLEtBQUksQ0FBQyxDQUFDLEVBQUUsV0FBRixDQUFjLFlBQWQsRUFBNEIsT0FBNUIsQ0FBb0MsTUFBcEMsRUFBMkMsRUFBM0MsQ0FBdFEsRUFBcVQsS0FBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQUYsQ0FBYyxjQUFkLEtBQStCLEVBQUUsV0FBRixDQUFjLFlBQWQsQ0FBL0IsSUFBNEQsRUFBRSxXQUFGLENBQWMsWUFBZCxDQUE3RCxFQUEwRixPQUExRixDQUFrRyxNQUFsRyxFQUF5RyxFQUF6RyxDQUEzVCxFQUF3YSxLQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBRixDQUFjLGNBQWQsS0FBK0IsRUFBRSxXQUFGLENBQWMsWUFBZCxDQUEvQixJQUE0RCxFQUFFLFdBQUYsQ0FBYyxZQUFkLENBQTdELEVBQTBGLE9BQTFGLENBQWtHLE1BQWxHLEVBQXlHLEVBQXpHLENBQTlhLEVBQTJoQixNQUFLLENBQUMsQ0FBQyxFQUFFLFdBQUYsQ0FBYyw2QkFBZCxFQUE2QyxPQUE3QyxDQUFxRCxNQUFyRCxFQUE0RCxFQUE1RCxDQUFsaUIsRUFBbEIsRUFBc25CLElBQUksSUFBRSxJQUFJLENBQUosQ0FBTSxDQUFOLENBQU47S0FBZSxJQUFFLFNBQUYsQ0FBRSxDQUFTLENBQVQsRUFBVztBQUFDLE1BQUksSUFBRSxJQUFOLENBQVcsRUFBRSxTQUFGLEdBQVksRUFBRSxRQUFGLElBQVksQ0FBQyxDQUF6QixFQUEyQixFQUFFLE9BQUYsR0FBVSxFQUFFLE1BQUYsSUFBVSxDQUFDLENBQWhELEVBQWtELEVBQUUsU0FBRixHQUFZLEVBQUUsUUFBRixJQUFZLENBQTFFLEVBQTRFLEVBQUUsT0FBRixHQUFVLEVBQUUsTUFBRixJQUFVLElBQWhHLEVBQXFHLEVBQUUsS0FBRixHQUFRLEVBQUUsSUFBRixJQUFRLENBQUMsQ0FBdEgsRUFBd0gsRUFBRSxPQUFGLEdBQVUsQ0FBQyxDQUFuSSxFQUFxSSxFQUFFLE9BQUYsR0FBVSxFQUFFLE1BQUYsSUFBVSxFQUF6SixFQUE0SixFQUFFLElBQUYsR0FBTyxFQUFFLEdBQUYsSUFBTyxFQUExSyxFQUE2SyxFQUFFLE1BQUYsR0FBUyxFQUFFLEtBQUYsSUFBUyxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBQyxFQUFOLENBQS9MLEVBQXlNLEVBQUUsT0FBRixHQUFVLEtBQUssQ0FBTCxLQUFTLEVBQUUsTUFBWCxHQUFrQixFQUFFLE1BQXBCLEdBQTJCLENBQTlPLEVBQWdQLEVBQUUsS0FBRixHQUFRLEVBQUUsSUFBRixJQUFRLEVBQWhRLEVBQW1RLEVBQUUsS0FBRixHQUFRLEVBQUUsSUFBRixJQUFRLENBQW5SLEVBQXFSLEVBQUUsTUFBRixHQUFTLEVBQUUsS0FBRixJQUFTLElBQXZTLEVBQTRTLEVBQUUsT0FBRixHQUFVLENBQUMsRUFBRSxNQUFGLElBQVUsWUFBVSxDQUFFLENBQXZCLENBQXRULEVBQStVLEVBQUUsWUFBRixHQUFlLENBQUMsRUFBRSxXQUFGLElBQWUsWUFBVSxDQUFFLENBQTVCLENBQTlWLEVBQTRYLEVBQUUsTUFBRixHQUFTLENBQUMsRUFBRSxLQUFGLElBQVMsWUFBVSxDQUFFLENBQXRCLENBQXJZLEVBQTZaLEVBQUUsUUFBRixHQUFXLENBQUMsRUFBRSxPQUFGLElBQVcsWUFBVSxDQUFFLENBQXhCLENBQXhhLEVBQWtjLEVBQUUsT0FBRixHQUFVLENBQUMsRUFBRSxNQUFGLElBQVUsWUFBVSxDQUFFLENBQXZCLENBQTVjLEVBQXFlLEVBQUUsV0FBRixHQUFjLEVBQW5mLEVBQXNmLEVBQUUsU0FBRixHQUFZLEtBQUcsQ0FBQyxFQUFFLE9BQXhnQixFQUFnaEIsRUFBRSxVQUFGLEdBQWEsRUFBN2hCLEVBQWdpQixFQUFFLFNBQUYsSUFBYSxFQUFFLGVBQUYsRUFBN2lCLEVBQWlrQixlQUFhLE9BQU8sQ0FBcEIsSUFBdUIsQ0FBdkIsSUFBMEIsRUFBRSxhQUE1QixJQUEyQyxFQUFFLGVBQUYsRUFBNW1CLEVBQWdvQixFQUFFLE1BQUYsQ0FBUyxJQUFULENBQWMsQ0FBZCxDQUFob0IsRUFBaXBCLEVBQUUsSUFBRixFQUFqcEI7QUFBMHBCLEVBQWxzQixDQUFtc0IsSUFBRyxFQUFFLFNBQUYsR0FBWSxFQUFDLE1BQUssZ0JBQVU7QUFBQyxPQUFJLElBQUUsSUFBTjtPQUFXLElBQUUsSUFBYixDQUFrQixJQUFHLENBQUgsRUFBSyxPQUFPLEtBQUssRUFBRSxFQUFGLENBQUssV0FBTCxFQUFpQixJQUFJLEtBQUosQ0FBVSxtQkFBVixDQUFqQixDQUFaLENBQTZELEtBQUksSUFBSSxJQUFFLENBQVYsRUFBWSxJQUFFLEVBQUUsS0FBRixDQUFRLE1BQXRCLEVBQTZCLEdBQTdCLEVBQWlDO0FBQUMsUUFBSSxDQUFKLEVBQU0sQ0FBTixDQUFRLElBQUcsRUFBRSxPQUFMLEVBQWEsSUFBRSxFQUFFLE9BQUosQ0FBYixLQUE2QjtBQUFDLFNBQUcsSUFBRSxFQUFFLEtBQUYsQ0FBUSxDQUFSLENBQUYsRUFBYSxJQUFFLDBCQUEwQixJQUExQixDQUErQixDQUEvQixDQUFmLEVBQWlELE1BQUksSUFBRSxhQUFhLElBQWIsQ0FBa0IsRUFBRSxLQUFGLENBQVEsR0FBUixFQUFZLENBQVosRUFBZSxDQUFmLENBQWxCLENBQU4sQ0FBakQsRUFBNkYsQ0FBQyxDQUFqRyxFQUFtRyxPQUFPLEtBQUssRUFBRSxFQUFGLENBQUssV0FBTCxFQUFpQixJQUFJLEtBQUosQ0FBVSx5RUFBVixDQUFqQixDQUFaLENBQW1ILElBQUUsRUFBRSxDQUFGLEVBQUssV0FBTCxFQUFGO0FBQXFCLFNBQUcsRUFBRSxDQUFGLENBQUgsRUFBUTtBQUFDLFNBQUUsRUFBRSxLQUFGLENBQVEsQ0FBUixDQUFGLENBQWE7QUFBTTtBQUFDLFFBQUcsQ0FBQyxDQUFKLEVBQU0sT0FBTyxLQUFLLEVBQUUsRUFBRixDQUFLLFdBQUwsRUFBaUIsSUFBSSxLQUFKLENBQVUsOENBQVYsQ0FBakIsQ0FBWixDQUF3RixJQUFHLEVBQUUsSUFBRixHQUFPLENBQVAsRUFBUyxFQUFFLFNBQWQsRUFBd0IsRUFBRSxDQUFGLEVBQUksQ0FBSixFQUF4QixLQUFtQztBQUFDLFFBQUksSUFBRSxJQUFJLEtBQUosRUFBTixDQUFnQixFQUFFLGdCQUFGLENBQW1CLE9BQW5CLEVBQTJCLFlBQVU7QUFBQyxPQUFFLEtBQUYsSUFBUyxNQUFJLEVBQUUsS0FBRixDQUFRLElBQXJCLEtBQTRCLEVBQUUsT0FBRixHQUFVLENBQUMsQ0FBdkMsR0FBMEMsRUFBRSxFQUFGLENBQUssV0FBTCxFQUFpQixFQUFDLE1BQUssRUFBRSxLQUFGLEdBQVEsRUFBRSxLQUFGLENBQVEsSUFBaEIsR0FBcUIsQ0FBM0IsRUFBakIsQ0FBMUM7QUFBMEYsS0FBaEksRUFBaUksQ0FBQyxDQUFsSSxHQUFxSSxFQUFFLFVBQUYsQ0FBYSxJQUFiLENBQWtCLENBQWxCLENBQXJJLEVBQTBKLEVBQUUsR0FBRixHQUFNLENBQWhLLEVBQWtLLEVBQUUsSUFBRixHQUFPLENBQXpLLEVBQTJLLEVBQUUsT0FBRixHQUFVLE1BQXJMLEVBQTRMLEVBQUUsTUFBRixHQUFTLEVBQUUsTUFBRixHQUFTLENBQVQsR0FBVyxFQUFFLE9BQUYsR0FBVSxFQUFFLE1BQUYsRUFBMU4sQ0FBcU8sSUFBSSxJQUFFLFNBQUYsQ0FBRSxHQUFVO0FBQUMsT0FBRSxTQUFGLEdBQVksS0FBSyxJQUFMLENBQVUsS0FBRyxFQUFFLFFBQWYsSUFBeUIsRUFBckMsRUFBd0MsTUFBSSxPQUFPLG1CQUFQLENBQTJCLEVBQUUsT0FBN0IsRUFBc0MsTUFBMUMsS0FBbUQsRUFBRSxPQUFGLEdBQVUsRUFBQyxVQUFTLENBQUMsQ0FBRCxFQUFHLE1BQUksRUFBRSxTQUFULENBQVYsRUFBN0QsQ0FBeEMsRUFBcUksRUFBRSxPQUFGLEtBQVksRUFBRSxPQUFGLEdBQVUsQ0FBQyxDQUFYLEVBQWEsRUFBRSxFQUFGLENBQUssTUFBTCxDQUF6QixDQUFySSxFQUE0SyxFQUFFLFNBQUYsSUFBYSxFQUFFLElBQUYsRUFBekwsRUFBa00sRUFBRSxtQkFBRixDQUFzQixnQkFBdEIsRUFBdUMsQ0FBdkMsRUFBeUMsQ0FBQyxDQUExQyxDQUFsTTtBQUErTyxLQUFoUSxDQUFpUSxFQUFFLGdCQUFGLENBQW1CLGdCQUFuQixFQUFvQyxDQUFwQyxFQUFzQyxDQUFDLENBQXZDLEdBQTBDLEVBQUUsSUFBRixFQUExQztBQUFtRCxXQUFPLENBQVA7QUFBUyxHQUF6bUMsRUFBMG1DLE1BQUssY0FBUyxDQUFULEVBQVc7QUFBQyxPQUFJLElBQUUsSUFBTixDQUFXLE9BQU8sS0FBRyxFQUFFLElBQUYsSUFBUyxFQUFFLEtBQUYsR0FBUSxZQUFVLE9BQU8sQ0FBakIsR0FBbUIsQ0FBQyxDQUFELENBQW5CLEdBQXVCLENBQXhDLEVBQTBDLEVBQUUsT0FBRixHQUFVLENBQUMsQ0FBckQsRUFBdUQsRUFBRSxJQUFGLEVBQXZELEVBQWdFLENBQW5FLElBQXNFLEVBQUUsS0FBL0U7QUFBcUYsR0FBM3RDLEVBQTR0QyxNQUFLLGNBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLE9BQUksSUFBRSxJQUFOLENBQVcsT0FBTSxjQUFZLE9BQU8sQ0FBbkIsS0FBdUIsSUFBRSxDQUF6QixHQUE0QixLQUFHLGNBQVksT0FBTyxDQUF0QixLQUEwQixJQUFFLFVBQTVCLENBQTVCLEVBQW9FLEVBQUUsT0FBRixHQUFVLEVBQUUsT0FBRixDQUFVLENBQVYsS0FBYyxFQUFFLGFBQUYsQ0FBZ0IsVUFBUyxDQUFULEVBQVc7QUFBQyxNQUFFLE9BQUYsR0FBVSxDQUFWLENBQVksSUFBSSxJQUFFLEVBQUUsSUFBRixHQUFPLENBQVAsR0FBUyxFQUFFLElBQVgsR0FBZ0IsRUFBRSxPQUFGLENBQVUsQ0FBVixFQUFhLENBQWIsSUFBZ0IsR0FBdEM7UUFBMEMsSUFBRSxDQUE1QyxDQUE4QyxFQUFFLFNBQUYsSUFBYSxJQUFFLEVBQUUsT0FBRixDQUFVLENBQVYsRUFBYSxDQUFiLElBQWdCLEdBQWhCLEdBQW9CLEVBQUUsSUFBeEIsRUFBNkIsRUFBRSxJQUFGLEdBQU8sQ0FBUCxLQUFXLElBQUUsRUFBRSxPQUFGLENBQVUsQ0FBVixFQUFhLENBQWIsSUFBZ0IsR0FBaEIsR0FBb0IsQ0FBakMsQ0FBMUMsSUFBK0UsSUFBRSxFQUFFLE9BQUYsQ0FBVSxDQUFWLEVBQWEsQ0FBYixJQUFnQixHQUFoQixJQUFxQixJQUFFLEVBQUUsT0FBRixDQUFVLENBQVYsRUFBYSxDQUFiLElBQWdCLEdBQXZDLENBQWpGLENBQTZILElBQUksQ0FBSjtRQUFNLElBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSCxJQUFVLENBQUMsRUFBRSxPQUFGLENBQVUsQ0FBVixFQUFhLENBQWIsQ0FBYixDQUFSO1FBQXNDLElBQUUsWUFBVSxPQUFPLENBQWpCLEdBQW1CLENBQW5CLEdBQXFCLEtBQUssS0FBTCxDQUFXLEtBQUssR0FBTCxLQUFXLEtBQUssTUFBTCxFQUF0QixJQUFxQyxFQUFsRyxDQUFxRyxJQUFHLFlBQVU7QUFBQyxTQUFJLElBQUUsRUFBQyxJQUFHLENBQUosRUFBTSxRQUFPLENBQWIsRUFBZSxNQUFLLENBQXBCLEVBQU4sQ0FBNkIsSUFBRSxXQUFXLFlBQVU7QUFBQyxPQUFDLEVBQUUsU0FBSCxJQUFjLENBQWQsSUFBaUIsRUFBRSxJQUFGLENBQU8sRUFBRSxFQUFULEVBQWEsSUFBYixDQUFrQixDQUFsQixFQUFvQixFQUFFLEVBQXRCLENBQWpCLEVBQTJDLEVBQUUsU0FBRixJQUFhLENBQUMsQ0FBZCxLQUFrQixFQUFFLFNBQUYsQ0FBWSxFQUFFLEVBQWQsRUFBa0IsTUFBbEIsR0FBeUIsQ0FBQyxDQUExQixFQUE0QixFQUFFLFNBQUYsQ0FBWSxFQUFFLEVBQWQsRUFBa0IsSUFBbEIsR0FBdUIsQ0FBbkQsRUFBcUQsRUFBRSxjQUFGLENBQWlCLEVBQUUsRUFBbkIsQ0FBdkUsQ0FBM0MsRUFBMEksRUFBRSxTQUFGLElBQWEsQ0FBYixJQUFnQixFQUFFLElBQUYsQ0FBTyxFQUFFLEVBQVQsQ0FBMUosRUFBdUssRUFBRSxFQUFGLENBQUssS0FBTCxFQUFXLENBQVgsQ0FBdks7QUFBcUwsTUFBM00sRUFBNE0sSUFBRSxFQUFFLEtBQUosR0FBVSxHQUF0TixDQUFGLEVBQTZOLEVBQUUsV0FBRixDQUFjLElBQWQsQ0FBbUIsRUFBQyxPQUFNLENBQVAsRUFBUyxJQUFHLEVBQUUsRUFBZCxFQUFuQixDQUE3TjtBQUFtUSxLQUEzUyxJQUE4UyxFQUFFLFNBQW5ULEVBQTZUO0FBQUMsU0FBSSxJQUFFLEVBQUUsT0FBRixDQUFVLENBQVYsRUFBYSxDQUFiLElBQWdCLEdBQXRCO1NBQTBCLElBQUUsRUFBRSxPQUFGLENBQVUsQ0FBVixFQUFhLENBQWIsSUFBZ0IsR0FBNUMsQ0FBZ0QsRUFBRSxFQUFGLEdBQUssQ0FBTCxFQUFPLEVBQUUsTUFBRixHQUFTLENBQUMsQ0FBakIsRUFBbUIsRUFBRSxDQUFGLEVBQUksQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsQ0FBSixFQUFZLENBQVosQ0FBbkIsRUFBa0MsRUFBRSxVQUFGLEdBQWEsRUFBRSxXQUFqRCxFQUE2RCxFQUFFLElBQUYsQ0FBTyxLQUFQLEdBQWEsRUFBRSxPQUE1RSxFQUFvRixlQUFhLE9BQU8sRUFBRSxZQUFGLENBQWUsS0FBbkMsR0FBeUMsSUFBRSxFQUFFLFlBQUYsQ0FBZSxXQUFmLENBQTJCLENBQTNCLEVBQTZCLENBQTdCLEVBQStCLEtBQS9CLENBQUYsR0FBd0MsRUFBRSxZQUFGLENBQWUsV0FBZixDQUEyQixDQUEzQixFQUE2QixDQUE3QixFQUErQixDQUEvQixDQUFqRixHQUFtSCxJQUFFLEVBQUUsWUFBRixDQUFlLEtBQWYsQ0FBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsS0FBekIsQ0FBRixHQUFrQyxFQUFFLFlBQUYsQ0FBZSxLQUFmLENBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLENBQXpPO0FBQXFRLEtBQW5uQixNQUF1bkI7QUFBQyxTQUFHLE1BQUksRUFBRSxVQUFOLEtBQW1CLEVBQUUsVUFBRixJQUFjLENBQUMsVUFBVSxVQUE1QyxDQUFILEVBQTJELE9BQU8sRUFBRSxjQUFGLENBQWlCLENBQWpCLEdBQW9CLFlBQVU7QUFBQyxVQUFJLElBQUUsQ0FBTjtVQUFRLElBQUUsQ0FBVjtVQUFZLElBQUUsQ0FBZDtVQUFnQixJQUFFLENBQWxCO1VBQW9CLElBQUUsU0FBRixDQUFFLEdBQVU7QUFBQyxTQUFFLElBQUYsQ0FBTyxDQUFQLEVBQVMsQ0FBVCxHQUFZLEVBQUUsbUJBQUYsQ0FBc0IsZ0JBQXRCLEVBQXVDLENBQXZDLEVBQXlDLENBQUMsQ0FBMUMsQ0FBWjtBQUF5RCxPQUExRixDQUEyRixFQUFFLGdCQUFGLENBQW1CLGdCQUFuQixFQUFvQyxDQUFwQyxFQUFzQyxDQUFDLENBQXZDO0FBQTBDLE1BQWhKLEVBQXBCLEVBQXVLLENBQTlLLENBQWdMLEVBQUUsVUFBRixHQUFhLENBQWIsRUFBZSxFQUFFLEVBQUYsR0FBSyxDQUFwQixFQUFzQixFQUFFLFdBQUYsR0FBYyxDQUFwQyxFQUFzQyxFQUFFLEtBQUYsR0FBUSxFQUFFLE1BQUYsSUFBVSxFQUFFLEtBQTFELEVBQWdFLEVBQUUsTUFBRixHQUFTLEVBQUUsT0FBRixHQUFVLEVBQUUsTUFBRixFQUFuRixFQUE4RixXQUFXLFlBQVU7QUFBQyxRQUFFLElBQUY7QUFBUyxNQUEvQixFQUFnQyxDQUFoQyxDQUE5RjtBQUFpSSxZQUFPLEVBQUUsRUFBRixDQUFLLE1BQUwsR0FBYSxjQUFZLE9BQU8sQ0FBbkIsSUFBc0IsRUFBRSxDQUFGLENBQW5DLEVBQXdDLENBQS9DO0FBQWlELElBQTcwQyxHQUErMEMsQ0FBNzFDLEtBQWkyQyxjQUFZLE9BQU8sQ0FBbkIsSUFBc0IsR0FBdEIsRUFBMEIsQ0FBMzNDLENBQVYsSUFBeTRDLEVBQUUsRUFBRixDQUFLLE1BQUwsRUFBWSxZQUFVO0FBQUMsTUFBRSxJQUFGLENBQU8sQ0FBUCxFQUFTLENBQVQ7QUFBWSxJQUFuQyxHQUFxQyxDQUE5NkMsQ0FBMUU7QUFBMi9DLEdBQXJ2RixFQUFzdkYsT0FBTSxlQUFTLENBQVQsRUFBVztBQUFDLE9BQUksSUFBRSxJQUFOLENBQVcsSUFBRyxDQUFDLEVBQUUsT0FBTixFQUFjLE9BQU8sRUFBRSxFQUFGLENBQUssTUFBTCxFQUFZLFlBQVU7QUFBQyxNQUFFLEtBQUYsQ0FBUSxDQUFSO0FBQVcsSUFBbEMsR0FBb0MsQ0FBM0MsQ0FBNkMsRUFBRSxjQUFGLENBQWlCLENBQWpCLEVBQW9CLElBQUksSUFBRSxJQUFFLEVBQUUsU0FBRixDQUFZLENBQVosQ0FBRixHQUFpQixFQUFFLFdBQUYsRUFBdkIsQ0FBdUMsSUFBRyxDQUFILEVBQUssSUFBRyxFQUFFLElBQUYsR0FBTyxFQUFFLEdBQUYsQ0FBTSxJQUFOLEVBQVcsQ0FBWCxDQUFQLEVBQXFCLEVBQUUsU0FBMUIsRUFBb0M7QUFBQyxRQUFHLENBQUMsRUFBRSxZQUFILElBQWlCLEVBQUUsTUFBdEIsRUFBNkIsT0FBTyxDQUFQLENBQVMsRUFBRSxNQUFGLEdBQVMsQ0FBQyxDQUFWLEVBQVksZUFBYSxPQUFPLEVBQUUsWUFBRixDQUFlLElBQW5DLEdBQXdDLEVBQUUsWUFBRixDQUFlLE9BQWYsQ0FBdUIsQ0FBdkIsQ0FBeEMsR0FBa0UsRUFBRSxZQUFGLENBQWUsSUFBZixDQUFvQixDQUFwQixDQUE5RTtBQUFxRyxJQUFoTCxNQUFxTCxFQUFFLEtBQUYsR0FBVSxPQUFPLEVBQUUsRUFBRixDQUFLLE9BQUwsR0FBYyxDQUFyQjtBQUF1QixHQUFwbUcsRUFBcW1HLE1BQUssY0FBUyxDQUFULEVBQVc7QUFBQyxPQUFJLElBQUUsSUFBTixDQUFXLElBQUcsQ0FBQyxFQUFFLE9BQU4sRUFBYyxPQUFPLEVBQUUsRUFBRixDQUFLLE1BQUwsRUFBWSxZQUFVO0FBQUMsTUFBRSxJQUFGLENBQU8sQ0FBUDtBQUFVLElBQWpDLEdBQW1DLENBQTFDLENBQTRDLEVBQUUsY0FBRixDQUFpQixDQUFqQixFQUFvQixJQUFJLElBQUUsSUFBRSxFQUFFLFNBQUYsQ0FBWSxDQUFaLENBQUYsR0FBaUIsRUFBRSxXQUFGLEVBQXZCLENBQXVDLElBQUcsQ0FBSCxFQUFLLElBQUcsRUFBRSxJQUFGLEdBQU8sQ0FBUCxFQUFTLEVBQUUsU0FBZCxFQUF3QjtBQUFDLFFBQUcsQ0FBQyxFQUFFLFlBQUgsSUFBaUIsRUFBRSxNQUF0QixFQUE2QixPQUFPLENBQVAsQ0FBUyxFQUFFLE1BQUYsR0FBUyxDQUFDLENBQVYsRUFBWSxlQUFhLE9BQU8sRUFBRSxZQUFGLENBQWUsSUFBbkMsR0FBd0MsRUFBRSxZQUFGLENBQWUsT0FBZixDQUF1QixDQUF2QixDQUF4QyxHQUFrRSxFQUFFLFlBQUYsQ0FBZSxJQUFmLENBQW9CLENBQXBCLENBQTlFO0FBQXFHLElBQXBLLE1BQXlLLE1BQU0sRUFBRSxRQUFSLE1BQW9CLEVBQUUsS0FBRixJQUFVLEVBQUUsV0FBRixHQUFjLENBQTVDLEVBQStDLE9BQU8sQ0FBUDtBQUFTLEdBQTU5RyxFQUE2OUcsTUFBSyxjQUFTLENBQVQsRUFBVztBQUFDLE9BQUksSUFBRSxJQUFOLENBQVcsSUFBRyxDQUFDLEVBQUUsT0FBTixFQUFjLE9BQU8sRUFBRSxFQUFGLENBQUssTUFBTCxFQUFZLFlBQVU7QUFBQyxNQUFFLElBQUYsQ0FBTyxDQUFQO0FBQVUsSUFBakMsR0FBbUMsQ0FBMUMsQ0FBNEMsSUFBSSxJQUFFLElBQUUsRUFBRSxTQUFGLENBQVksQ0FBWixDQUFGLEdBQWlCLEVBQUUsV0FBRixFQUF2QixDQUF1QyxPQUFPLE1BQUksRUFBRSxTQUFGLEdBQVksRUFBRSxJQUFGLENBQU8sS0FBUCxHQUFhLENBQXpCLEdBQTJCLEVBQUUsS0FBRixHQUFRLENBQUMsQ0FBeEMsR0FBMkMsQ0FBbEQ7QUFBb0QsR0FBOW9ILEVBQStvSCxRQUFPLGdCQUFTLENBQVQsRUFBVztBQUFDLE9BQUksSUFBRSxJQUFOLENBQVcsSUFBRyxDQUFDLEVBQUUsT0FBTixFQUFjLE9BQU8sRUFBRSxFQUFGLENBQUssTUFBTCxFQUFZLFlBQVU7QUFBQyxNQUFFLE1BQUYsQ0FBUyxDQUFUO0FBQVksSUFBbkMsR0FBcUMsQ0FBNUMsQ0FBOEMsSUFBSSxJQUFFLElBQUUsRUFBRSxTQUFGLENBQVksQ0FBWixDQUFGLEdBQWlCLEVBQUUsV0FBRixFQUF2QixDQUF1QyxPQUFPLE1BQUksRUFBRSxTQUFGLEdBQVksRUFBRSxJQUFGLENBQU8sS0FBUCxHQUFhLEVBQUUsT0FBM0IsR0FBbUMsRUFBRSxLQUFGLEdBQVEsQ0FBQyxDQUFoRCxHQUFtRCxDQUExRDtBQUE0RCxHQUE1MEgsRUFBNjBILFFBQU8sZ0JBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLE9BQUksSUFBRSxJQUFOLENBQVcsSUFBRyxJQUFFLFdBQVcsQ0FBWCxDQUFGLEVBQWdCLEtBQUcsQ0FBSCxJQUFNLEtBQUcsQ0FBNUIsRUFBOEI7QUFBQyxRQUFHLEVBQUUsT0FBRixHQUFVLENBQVYsRUFBWSxDQUFDLEVBQUUsT0FBbEIsRUFBMEIsT0FBTyxFQUFFLEVBQUYsQ0FBSyxNQUFMLEVBQVksWUFBVTtBQUFDLE9BQUUsTUFBRixDQUFTLENBQVQsRUFBVyxDQUFYO0FBQWMsS0FBckMsR0FBdUMsQ0FBOUMsQ0FBZ0QsSUFBSSxJQUFFLElBQUUsRUFBRSxTQUFGLENBQVksQ0FBWixDQUFGLEdBQWlCLEVBQUUsV0FBRixFQUF2QixDQUF1QyxPQUFPLE1BQUksRUFBRSxTQUFGLEdBQVksRUFBRSxJQUFGLENBQU8sS0FBUCxHQUFhLENBQXpCLEdBQTJCLEVBQUUsTUFBRixHQUFTLElBQUUsRUFBRSxNQUFGLEVBQTFDLEdBQXNELENBQTdEO0FBQStELFdBQU8sRUFBRSxPQUFUO0FBQWlCLEdBQTdrSSxFQUE4a0ksTUFBSyxjQUFTLENBQVQsRUFBVztBQUFDLE9BQUksSUFBRSxJQUFOLENBQVcsT0FBTSxhQUFXLE9BQU8sQ0FBbEIsSUFBcUIsRUFBRSxLQUFGLEdBQVEsQ0FBUixFQUFVLENBQS9CLElBQWtDLEVBQUUsS0FBMUM7QUFBZ0QsR0FBMXBJLEVBQTJwSSxRQUFPLGdCQUFTLENBQVQsRUFBVztBQUFDLE9BQUksSUFBRSxJQUFOLENBQVcsT0FBTSxvQkFBaUIsQ0FBakIseUNBQWlCLENBQWpCLE1BQW9CLEVBQUUsT0FBRixHQUFVLENBQVYsRUFBWSxDQUFoQyxJQUFtQyxFQUFFLE9BQTNDO0FBQW1ELEdBQTV1SSxFQUE2dUksS0FBSSxhQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxPQUFJLElBQUUsSUFBTixDQUFXLElBQUcsQ0FBQyxFQUFFLE9BQU4sRUFBYyxPQUFPLEVBQUUsRUFBRixDQUFLLE1BQUwsRUFBWSxZQUFVO0FBQUMsTUFBRSxHQUFGLENBQU0sQ0FBTjtBQUFTLElBQWhDLEdBQWtDLFlBQVUsT0FBTyxDQUFqQixHQUFtQixDQUFuQixHQUFxQixFQUFFLElBQUYsSUFBUSxDQUF0RSxDQUF3RSxJQUFFLFdBQVcsQ0FBWCxDQUFGLENBQWdCLElBQUksSUFBRSxJQUFFLEVBQUUsU0FBRixDQUFZLENBQVosQ0FBRixHQUFpQixFQUFFLFdBQUYsRUFBdkIsQ0FBdUMsSUFBRyxDQUFILEVBQUssT0FBTyxLQUFHLENBQUgsSUFBTSxFQUFFLEtBQUYsQ0FBUSxDQUFSLEdBQVcsRUFBRSxJQUFGLEdBQU8sQ0FBbEIsRUFBb0IsRUFBRSxJQUFGLENBQU8sRUFBRSxPQUFULEVBQWlCLENBQWpCLENBQXBCLEVBQXdDLENBQTlDLElBQWlELEVBQUUsU0FBRixHQUFZLEVBQUUsSUFBRixJQUFRLEVBQUUsV0FBRixHQUFjLEVBQUUsVUFBeEIsQ0FBWixHQUFnRCxFQUFFLFdBQTFHLENBQXNILElBQUcsS0FBRyxDQUFOLEVBQVEsT0FBTyxDQUFQLENBQVMsS0FBSSxJQUFJLElBQUUsQ0FBVixFQUFZLElBQUUsRUFBRSxVQUFGLENBQWEsTUFBM0IsRUFBa0MsR0FBbEM7QUFBc0MsUUFBRyxFQUFFLFVBQUYsQ0FBYSxDQUFiLEVBQWdCLE1BQWhCLElBQXdCLE1BQUksRUFBRSxVQUFGLENBQWEsQ0FBYixFQUFnQixVQUEvQyxFQUEwRCxPQUFPLEVBQUUsU0FBRixHQUFZLEVBQUUsVUFBRixDQUFhLENBQWIsRUFBZ0IsSUFBNUIsR0FBaUMsRUFBRSxVQUFGLENBQWEsQ0FBYixFQUFnQixXQUF4RDtBQUFoRztBQUFvSyxHQUF2c0osRUFBd3NKLE9BQU0sZUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCO0FBQUMsT0FBSSxJQUFFLElBQU4sQ0FBVyxJQUFHLElBQUUsZUFBYSxPQUFPLENBQXBCLElBQXVCLENBQXZCLEdBQXlCLENBQXpCLEdBQTJCLENBQTdCLEVBQStCLElBQUUsZUFBYSxPQUFPLENBQXBCLElBQXVCLENBQXZCLEdBQXlCLENBQXpCLEdBQTJCLENBQUMsRUFBN0QsRUFBZ0UsQ0FBQyxFQUFFLE9BQXRFLEVBQThFLE9BQU8sRUFBRSxFQUFGLENBQUssTUFBTCxFQUFZLFlBQVU7QUFBQyxNQUFFLEtBQUYsQ0FBUSxDQUFSLEVBQVUsQ0FBVixFQUFZLENBQVosRUFBYyxDQUFkO0FBQWlCLElBQXhDLEdBQTBDLENBQWpELENBQW1ELElBQUcsRUFBRSxLQUFHLENBQUgsSUFBTSxJQUFFLENBQVYsQ0FBSCxFQUFnQixPQUFPLEVBQUUsTUFBVCxDQUFnQixJQUFHLEVBQUUsU0FBTCxFQUFlO0FBQUMsUUFBSSxJQUFFLElBQUUsRUFBRSxTQUFGLENBQVksQ0FBWixDQUFGLEdBQWlCLEVBQUUsV0FBRixFQUF2QixDQUF1QyxNQUFJLEVBQUUsTUFBRixHQUFTLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLENBQVQsRUFBaUIsRUFBRSxNQUFGLENBQVMsV0FBVCxDQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixDQUFqQixFQUE2QyxFQUFFLE1BQUYsQ0FBUyxZQUFULEdBQXNCLEVBQUUsTUFBRixJQUFVLE1BQWpGO0FBQXlGLFdBQU8sQ0FBUDtBQUFTLEdBQXJpSyxFQUFzaUssTUFBSyxjQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUI7QUFBQyxPQUFJLElBQUUsSUFBTjtPQUFXLElBQUUsS0FBSyxHQUFMLENBQVMsSUFBRSxDQUFYLENBQWI7T0FBMkIsSUFBRSxJQUFFLENBQUYsR0FBSSxNQUFKLEdBQVcsSUFBeEM7T0FBNkMsSUFBRSxJQUFFLEdBQWpEO09BQXFELElBQUUsSUFBRSxDQUF6RCxDQUEyRCxJQUFHLENBQUMsRUFBRSxPQUFOLEVBQWMsT0FBTyxFQUFFLEVBQUYsQ0FBSyxNQUFMLEVBQVksWUFBVTtBQUFDLE1BQUUsSUFBRixDQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmO0FBQWtCLElBQXpDLEdBQTJDLENBQWxELENBQW9ELEVBQUUsTUFBRixDQUFTLENBQVQsRUFBVyxDQUFYLEVBQWMsS0FBSSxJQUFJLElBQUUsQ0FBVixFQUFZLEtBQUcsQ0FBZixFQUFpQixHQUFqQjtBQUFxQixLQUFDLFlBQVU7QUFBQyxTQUFJLElBQUUsRUFBRSxPQUFGLEdBQVUsQ0FBQyxTQUFPLENBQVAsR0FBUyxHQUFULEdBQWEsQ0FBQyxHQUFmLElBQW9CLENBQXBDO1NBQXNDLElBQUUsS0FBSyxLQUFMLENBQVcsTUFBSSxDQUFmLElBQWtCLEdBQTFEO1NBQThELElBQUUsQ0FBaEUsQ0FBa0UsV0FBVyxZQUFVO0FBQUMsUUFBRSxNQUFGLENBQVMsQ0FBVCxFQUFXLENBQVgsR0FBYyxNQUFJLENBQUosSUFBTyxDQUFQLElBQVUsR0FBeEI7QUFBNEIsTUFBbEQsRUFBbUQsSUFBRSxDQUFyRDtBQUF3RCxLQUFySSxFQUFEO0FBQXJCO0FBQThKLEdBQXgySyxFQUF5MkssUUFBTyxnQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLFVBQU8sS0FBSyxNQUFMLENBQVksQ0FBWixFQUFlLElBQWYsR0FBc0IsSUFBdEIsQ0FBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsRUFBK0IsQ0FBL0IsRUFBaUMsQ0FBakMsQ0FBUDtBQUEyQyxHQUEzNkssRUFBNDZLLFNBQVEsaUJBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQjtBQUFDLE9BQUksSUFBRSxJQUFOLENBQVcsT0FBTyxFQUFFLElBQUYsQ0FBTyxFQUFFLE9BQVQsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsWUFBVTtBQUFDLFNBQUcsR0FBSCxFQUFPLEVBQUUsS0FBRixDQUFRLENBQVIsQ0FBUCxFQUFrQixFQUFFLEVBQUYsQ0FBSyxLQUFMLENBQWxCO0FBQThCLElBQTlELEVBQStELENBQS9ELENBQVA7QUFBeUUsR0FBMWhMLEVBQTJoTCxXQUFVLG1CQUFTLENBQVQsRUFBVztBQUFDLFFBQUksSUFBSSxJQUFFLElBQU4sRUFBVyxJQUFFLEVBQUUsVUFBRixDQUFhLENBQWIsQ0FBYixFQUE2QixJQUFFLENBQW5DLEVBQXFDLElBQUUsRUFBRSxVQUFGLENBQWEsTUFBcEQsRUFBMkQsR0FBM0Q7QUFBK0QsUUFBRyxFQUFFLFVBQUYsQ0FBYSxDQUFiLEVBQWdCLEVBQWhCLEtBQXFCLENBQXhCLEVBQTBCO0FBQUMsU0FBRSxFQUFFLFVBQUYsQ0FBYSxDQUFiLENBQUYsQ0FBa0I7QUFBTTtBQUFsSCxJQUFrSCxPQUFPLENBQVA7QUFBUyxHQUE1cUwsRUFBNnFMLGFBQVksdUJBQVU7QUFBQyxRQUFJLElBQUksSUFBRSxJQUFOLEVBQVcsSUFBRSxJQUFiLEVBQWtCLElBQUUsQ0FBeEIsRUFBMEIsSUFBRSxFQUFFLFVBQUYsQ0FBYSxNQUF6QyxFQUFnRCxHQUFoRDtBQUFvRCxRQUFHLENBQUMsRUFBRSxVQUFGLENBQWEsQ0FBYixFQUFnQixNQUFwQixFQUEyQjtBQUFDLFNBQUUsRUFBRSxVQUFGLENBQWEsQ0FBYixDQUFGLENBQWtCO0FBQU07QUFBeEcsSUFBd0csT0FBTyxFQUFFLFVBQUYsSUFBZSxDQUF0QjtBQUF3QixHQUFwMEwsRUFBcTBMLGVBQWMsdUJBQVMsQ0FBVCxFQUFXO0FBQUMsUUFBSSxJQUFJLElBQUUsSUFBTixFQUFXLElBQUUsSUFBYixFQUFrQixJQUFFLENBQXhCLEVBQTBCLElBQUUsRUFBRSxVQUFGLENBQWEsTUFBekMsRUFBZ0QsR0FBaEQ7QUFBb0QsUUFBRyxFQUFFLFVBQUYsQ0FBYSxDQUFiLEVBQWdCLE1BQWhCLElBQXdCLE1BQUksRUFBRSxVQUFGLENBQWEsQ0FBYixFQUFnQixVQUEvQyxFQUEwRDtBQUFDLE9BQUUsRUFBRSxVQUFGLENBQWEsQ0FBYixDQUFGLEdBQW1CLElBQUUsQ0FBQyxDQUF0QixDQUF3QjtBQUFNO0FBQTdJLElBQTZJLElBQUcsRUFBRSxVQUFGLElBQWUsQ0FBQyxDQUFuQixFQUFxQjtBQUFDLFFBQUksQ0FBSixDQUFNLElBQUcsRUFBRSxTQUFMLEVBQWUsSUFBRSxFQUFFLGVBQUYsRUFBRixFQUFzQixFQUFFLENBQUYsQ0FBdEIsQ0FBZixLQUE4QztBQUFDLE9BQUUsSUFBRixJQUFTLElBQUUsRUFBRSxVQUFGLENBQWEsRUFBRSxVQUFGLENBQWEsTUFBYixHQUFvQixDQUFqQyxDQUFYLENBQStDLElBQUksSUFBRSxVQUFVLFVBQVYsR0FBcUIsZ0JBQXJCLEdBQXNDLGdCQUE1QztTQUE2RCxJQUFFLFNBQUYsQ0FBRSxHQUFVO0FBQUMsUUFBRSxtQkFBRixDQUFzQixDQUF0QixFQUF3QixDQUF4QixFQUEwQixDQUFDLENBQTNCLEdBQThCLEVBQUUsQ0FBRixDQUE5QjtBQUFtQyxNQUE3RyxDQUE4RyxFQUFFLGdCQUFGLENBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQUMsQ0FBeEI7QUFBMkI7QUFBQztBQUFDLEdBQWp2TSxFQUFrdk0sWUFBVyxzQkFBVTtBQUFDLE9BQUksQ0FBSjtPQUFNLElBQUUsSUFBUjtPQUFhLElBQUUsQ0FBZixDQUFpQixLQUFJLElBQUUsQ0FBTixFQUFRLElBQUUsRUFBRSxVQUFGLENBQWEsTUFBdkIsRUFBOEIsR0FBOUI7QUFBa0MsTUFBRSxVQUFGLENBQWEsQ0FBYixFQUFnQixNQUFoQixJQUF3QixHQUF4QjtBQUFsQyxJQUE4RCxLQUFJLElBQUUsRUFBRSxVQUFGLENBQWEsTUFBYixHQUFvQixDQUExQixFQUE0QixLQUFHLENBQUgsSUFBTSxFQUFFLEtBQUcsQ0FBTCxDQUFsQyxFQUEwQyxHQUExQztBQUE4QyxNQUFFLFVBQUYsQ0FBYSxDQUFiLEVBQWdCLE1BQWhCLEtBQXlCLEVBQUUsU0FBRixJQUFhLEVBQUUsVUFBRixDQUFhLENBQWIsRUFBZ0IsVUFBaEIsQ0FBMkIsQ0FBM0IsQ0FBYixFQUEyQyxHQUEzQyxFQUErQyxFQUFFLFVBQUYsQ0FBYSxNQUFiLENBQW9CLENBQXBCLEVBQXNCLENBQXRCLENBQXhFO0FBQTlDO0FBQWdKLEdBQXYrTSxFQUF3K00sZ0JBQWUsd0JBQVMsQ0FBVCxFQUFXO0FBQUMsUUFBSSxJQUFJLElBQUUsSUFBTixFQUFXLElBQUUsQ0FBQyxDQUFkLEVBQWdCLElBQUUsQ0FBdEIsRUFBd0IsSUFBRSxFQUFFLFdBQUYsQ0FBYyxNQUF4QyxFQUErQyxHQUEvQztBQUFtRCxRQUFHLEVBQUUsV0FBRixDQUFjLENBQWQsRUFBaUIsRUFBakIsS0FBc0IsQ0FBekIsRUFBMkI7QUFBQyxTQUFFLENBQUYsQ0FBSTtBQUFNO0FBQXpGLElBQXlGLElBQUksSUFBRSxFQUFFLFdBQUYsQ0FBYyxDQUFkLENBQU4sQ0FBdUIsTUFBSSxhQUFhLEVBQUUsS0FBZixHQUFzQixFQUFFLFdBQUYsQ0FBYyxNQUFkLENBQXFCLENBQXJCLEVBQXVCLENBQXZCLENBQTFCO0FBQXFELEdBQXhxTixFQUF5cU4saUJBQWdCLDJCQUFVO0FBQUMsT0FBSSxJQUFFLElBQU47T0FBVyxJQUFFLEVBQUUsVUFBZjtPQUEwQixJQUFFLEVBQUUsVUFBRixDQUFhLE1BQXpDLENBQWdELE9BQU8sRUFBRSxDQUFGLElBQUssZUFBYSxPQUFPLEVBQUUsVUFBdEIsR0FBaUMsRUFBRSxjQUFGLEVBQWpDLEdBQW9ELEVBQUUsVUFBRixFQUF6RCxFQUF3RSxFQUFFLENBQUYsRUFBSyxJQUFMLENBQVUsS0FBVixHQUFnQixFQUFFLE9BQTFGLEVBQWtHLEVBQUUsQ0FBRixFQUFLLE1BQUwsR0FBWSxDQUFDLENBQS9HLEVBQWlILEVBQUUsQ0FBRixFQUFLLElBQUwsR0FBVSxDQUEzSCxFQUE2SCxFQUFFLENBQUYsRUFBSyxVQUFMLEdBQWdCLENBQTdJLEVBQStJLEVBQUUsQ0FBRixFQUFLLE9BQUwsQ0FBYSxDQUFiLENBQS9JLEVBQStKLEVBQUUsQ0FBRixFQUFLLE1BQUwsR0FBWSxFQUFFLFlBQUYsRUFBM0ssRUFBNEwsRUFBRSxDQUFGLEVBQUssTUFBTCxDQUFZLFlBQVosR0FBeUIsRUFBRSxNQUFGLElBQVUsWUFBL04sRUFBNE8sRUFBRSxDQUFGLEVBQUssTUFBTCxDQUFZLFdBQVosQ0FBd0IsRUFBRSxNQUFGLENBQVMsQ0FBVCxDQUF4QixFQUFvQyxFQUFFLE1BQUYsQ0FBUyxDQUFULENBQXBDLEVBQWdELEVBQUUsTUFBRixDQUFTLENBQVQsQ0FBaEQsQ0FBNU8sRUFBeVMsRUFBRSxDQUFGLEVBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsRUFBRSxDQUFGLENBQXBCLENBQXpTLEVBQW1VLEVBQUUsQ0FBRixDQUExVTtBQUErVSxHQUFua08sRUFBb2tPLElBQUcsWUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsT0FBSSxJQUFFLElBQU47T0FBVyxJQUFFLEVBQUUsUUFBTSxDQUFSLENBQWIsQ0FBd0IsSUFBRyxjQUFZLE9BQU8sQ0FBdEIsRUFBd0IsRUFBRSxJQUFGLENBQU8sQ0FBUCxFQUF4QixLQUF1QyxLQUFJLElBQUksSUFBRSxDQUFWLEVBQVksSUFBRSxFQUFFLE1BQWhCLEVBQXVCLEdBQXZCO0FBQTJCLFFBQUUsRUFBRSxDQUFGLEVBQUssSUFBTCxDQUFVLENBQVYsRUFBWSxDQUFaLENBQUYsR0FBaUIsRUFBRSxDQUFGLEVBQUssSUFBTCxDQUFVLENBQVYsQ0FBakI7QUFBM0IsSUFBeUQsT0FBTyxDQUFQO0FBQVMsR0FBdHRPLEVBQXV0TyxLQUFJLGFBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLE9BQUksSUFBRSxJQUFOO09BQVcsSUFBRSxFQUFFLFFBQU0sQ0FBUixDQUFiLENBQXdCLElBQUcsQ0FBSCxFQUFLO0FBQUMsU0FBSSxJQUFJLElBQUUsQ0FBVixFQUFZLElBQUUsRUFBRSxNQUFoQixFQUF1QixHQUF2QjtBQUEyQixTQUFHLE1BQUksRUFBRSxDQUFGLENBQVAsRUFBWTtBQUFDLFFBQUUsTUFBRixDQUFTLENBQVQsRUFBVyxDQUFYLEVBQWM7QUFBTTtBQUE1RDtBQUE2RCxJQUFuRSxNQUF3RSxFQUFFLFFBQU0sQ0FBUixJQUFXLEVBQVgsQ0FBYyxPQUFPLENBQVA7QUFBUyxHQUFoMk8sRUFBaTJPLFFBQU8sa0JBQVU7QUFBQyxRQUFJLElBQUksSUFBRSxJQUFOLEVBQVcsSUFBRSxFQUFFLFVBQWYsRUFBMEIsSUFBRSxDQUFoQyxFQUFrQyxJQUFFLEVBQUUsVUFBRixDQUFhLE1BQWpELEVBQXdELEdBQXhEO0FBQTRELE1BQUUsQ0FBRixFQUFLLE1BQUwsS0FBYyxFQUFFLElBQUYsQ0FBTyxFQUFFLENBQUYsRUFBSyxFQUFaLEdBQWdCLEVBQUUsRUFBRixDQUFLLEtBQUwsRUFBVyxFQUFFLENBQUYsRUFBSyxFQUFoQixDQUE5QixHQUFtRCxFQUFFLFNBQUYsR0FBWSxFQUFFLENBQUYsRUFBSyxVQUFMLENBQWdCLENBQWhCLENBQVosR0FBK0IsRUFBRSxDQUFGLEVBQUssR0FBTCxHQUFTLEVBQTNGO0FBQTVELElBQTBKLEtBQUksSUFBRSxDQUFOLEVBQVEsSUFBRSxFQUFFLFdBQUYsQ0FBYyxNQUF4QixFQUErQixHQUEvQjtBQUFtQyxpQkFBYSxFQUFFLFdBQUYsQ0FBYyxDQUFkLEVBQWlCLEtBQTlCO0FBQW5DLElBQXdFLElBQUksSUFBRSxFQUFFLE1BQUYsQ0FBUyxPQUFULENBQWlCLENBQWpCLENBQU4sQ0FBMEIsU0FBTyxDQUFQLElBQVUsS0FBRyxDQUFiLElBQWdCLEVBQUUsTUFBRixDQUFTLE1BQVQsQ0FBZ0IsQ0FBaEIsRUFBa0IsQ0FBbEIsQ0FBaEIsRUFBcUMsT0FBTyxFQUFFLEVBQUUsSUFBSixDQUE1QyxFQUFzRCxJQUFFLElBQXhEO0FBQTZELEdBQTVxUCxFQUFaLEVBQTByUCxDQUE3clAsRUFBK3JQLElBQUksSUFBRSxTQUFGLENBQUUsQ0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsTUFBRyxLQUFLLENBQVIsRUFBVSxPQUFPLEVBQUUsU0FBRixHQUFZLEVBQUUsQ0FBRixFQUFLLFFBQWpCLEVBQTBCLEtBQUssRUFBRSxDQUFGLENBQXRDLENBQTJDLElBQUcsc0JBQXNCLElBQXRCLENBQTJCLENBQTNCLENBQUgsRUFBaUM7QUFBQyxRQUFJLElBQUksSUFBRSxLQUFLLEVBQUUsS0FBRixDQUFRLEdBQVIsRUFBYSxDQUFiLENBQUwsQ0FBTixFQUE0QixJQUFFLElBQUksVUFBSixDQUFlLEVBQUUsTUFBakIsQ0FBOUIsRUFBdUQsSUFBRSxDQUE3RCxFQUErRCxJQUFFLEVBQUUsTUFBbkUsRUFBMEUsRUFBRSxDQUE1RTtBQUE4RSxNQUFFLENBQUYsSUFBSyxFQUFFLFVBQUYsQ0FBYSxDQUFiLENBQUw7QUFBOUUsSUFBbUcsRUFBRSxFQUFFLE1BQUosRUFBVyxDQUFYLEVBQWEsQ0FBYjtBQUFnQixHQUFySixNQUF5SjtBQUFDLE9BQUksSUFBRSxJQUFJLGNBQUosRUFBTixDQUF5QixFQUFFLElBQUYsQ0FBTyxLQUFQLEVBQWEsQ0FBYixFQUFlLENBQUMsQ0FBaEIsR0FBbUIsRUFBRSxZQUFGLEdBQWUsYUFBbEMsRUFBZ0QsRUFBRSxNQUFGLEdBQVMsWUFBVTtBQUFDLE1BQUUsRUFBRSxRQUFKLEVBQWEsQ0FBYixFQUFlLENBQWY7QUFBa0IsSUFBdEYsRUFBdUYsRUFBRSxPQUFGLEdBQVUsWUFBVTtBQUFDLE1BQUUsU0FBRixLQUFjLEVBQUUsT0FBRixHQUFVLENBQUMsQ0FBWCxFQUFhLEVBQUUsU0FBRixHQUFZLENBQUMsQ0FBMUIsRUFBNEIsRUFBRSxVQUFGLEdBQWEsRUFBekMsRUFBNEMsT0FBTyxFQUFFLFNBQXJELEVBQStELE9BQU8sRUFBRSxDQUFGLENBQXRFLEVBQTJFLEVBQUUsSUFBRixFQUF6RjtBQUFtRyxJQUEvTSxDQUFnTixJQUFHO0FBQUMsTUFBRSxJQUFGO0FBQVMsSUFBYixDQUFhLE9BQU0sQ0FBTixFQUFRO0FBQUMsTUFBRSxPQUFGO0FBQVk7QUFBQztBQUFDLEVBQWhmO0tBQWlmLElBQUUsU0FBRixDQUFFLENBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWU7QUFBQyxJQUFFLGVBQUYsQ0FBa0IsQ0FBbEIsRUFBb0IsVUFBUyxDQUFULEVBQVc7QUFBQyxTQUFJLEVBQUUsQ0FBRixJQUFLLENBQUwsRUFBTyxFQUFFLENBQUYsRUFBSSxDQUFKLENBQVg7QUFBbUIsR0FBbkQsRUFBb0QsVUFBUyxDQUFULEVBQVc7QUFBQyxLQUFFLEVBQUYsQ0FBSyxXQUFMLEVBQWlCLENBQWpCO0FBQW9CLEdBQXBGO0FBQXNGLEVBQXpsQjtLQUEwbEIsSUFBRSxTQUFGLENBQUUsQ0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsSUFBRSxTQUFGLEdBQVksSUFBRSxFQUFFLFFBQUosR0FBYSxFQUFFLFNBQTNCLEVBQXFDLE1BQUksT0FBTyxtQkFBUCxDQUEyQixFQUFFLE9BQTdCLEVBQXNDLE1BQTFDLEtBQW1ELEVBQUUsT0FBRixHQUFVLEVBQUMsVUFBUyxDQUFDLENBQUQsRUFBRyxNQUFJLEVBQUUsU0FBVCxDQUFWLEVBQTdELENBQXJDLEVBQWtJLEVBQUUsT0FBRixLQUFZLEVBQUUsT0FBRixHQUFVLENBQUMsQ0FBWCxFQUFhLEVBQUUsRUFBRixDQUFLLE1BQUwsQ0FBekIsQ0FBbEksRUFBeUssRUFBRSxTQUFGLElBQWEsRUFBRSxJQUFGLEVBQXRMO0FBQStMLEVBQXp5QjtLQUEweUIsSUFBRSxTQUFGLENBQUUsQ0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLE1BQUksSUFBRSxFQUFFLFNBQUYsQ0FBWSxDQUFaLENBQU4sQ0FBcUIsRUFBRSxZQUFGLEdBQWUsRUFBRSxrQkFBRixFQUFmLEVBQXNDLEVBQUUsWUFBRixDQUFlLE1BQWYsR0FBc0IsRUFBRSxFQUFFLElBQUosQ0FBNUQsRUFBc0UsRUFBRSxZQUFGLENBQWUsT0FBZixDQUF1QixFQUFFLE1BQXpCLENBQXRFLEVBQXVHLEVBQUUsWUFBRixDQUFlLElBQWYsR0FBb0IsRUFBRSxDQUFGLENBQTNILEVBQWdJLEVBQUUsQ0FBRixNQUFPLEVBQUUsWUFBRixDQUFlLFNBQWYsR0FBeUIsRUFBRSxDQUFGLENBQXpCLEVBQThCLEVBQUUsWUFBRixDQUFlLE9BQWYsR0FBdUIsRUFBRSxDQUFGLElBQUssRUFBRSxDQUFGLENBQWpFLENBQWhJLEVBQXVNLEVBQUUsWUFBRixDQUFlLFlBQWYsQ0FBNEIsS0FBNUIsR0FBa0MsRUFBRSxLQUEzTztBQUFpUCxFQUFsa0MsQ0FBbWtDLGNBQVksT0FBTyxNQUFuQixJQUEyQixPQUFPLEdBQWxDLElBQXVDLE9BQU8sWUFBVTtBQUFDLFNBQU0sRUFBQyxRQUFPLENBQVIsRUFBVSxNQUFLLENBQWYsRUFBTjtBQUF3QixFQUExQyxDQUF2QyxFQUFtRixlQUFhLE9BQU8sT0FBcEIsS0FBOEIsUUFBUSxNQUFSLEdBQWUsQ0FBZixFQUFpQixRQUFRLElBQVIsR0FBYSxDQUE1RCxDQUFuRixFQUFrSixlQUFhLE9BQU8sTUFBcEIsS0FBNkIsT0FBTyxNQUFQLEdBQWMsQ0FBZCxFQUFnQixPQUFPLElBQVAsR0FBWSxDQUF6RCxDQUFsSjtBQUE4TSxDQUFyL1gsRUFBRDs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZCQSxDQUFDLFlBQVU7O0FBRVgsVUFBUyxPQUFULENBQWlCLElBQWpCLEVBQXVCLFFBQXZCLEVBQWlDO0FBQy9CLE1BQUksUUFBUSxZQUFZLEdBQVosRUFBWjs7QUFFQSx3QkFBc0IsU0FBUyxPQUFULENBQWlCLElBQWpCLEVBQXVCOztBQUUzQyxPQUFJLGFBQWEsT0FBTyxLQUF4Qjs7O0FBR0EsT0FBSSxhQUFhLFFBQWpCLEVBQTJCLGFBQWEsUUFBYjs7O0FBRzNCLFFBQUssVUFBTDs7O0FBR0EsT0FBSSxhQUFhLFFBQWpCLEVBQTJCO0FBQ3pCLDBCQUFzQixPQUF0QjtBQUNEO0FBRUYsR0FmRDtBQWdCRDs7QUFHRCxLQUFJLFNBQVM7QUFDWixVQUFRO0FBQ1AsWUFBUyxTQURGLEU7QUFFUCxZQUFTLFNBRkY7QUFHUCxTQUFNO0FBSEMsR0FESTtBQU1aLGFBQVc7QUFDVixrQkFBZSxDQURMO0FBRVYsdUJBQW9CO0FBRlY7QUFOQyxFQUFiOztBQVlBLFVBQVMsVUFBVCxDQUFvQixLQUFwQixFQUEyQjtBQUMxQixXQUFTLGdCQUFULENBQTBCLFFBQTFCLEVBQW9DLENBQXBDLEVBQXVDLFNBQXZDLENBQWlELEdBQWpELENBQXFELFFBQXJEO0FBQ0EsV0FBUyxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxDQUFuQyxFQUFzQyxTQUF0QyxDQUFnRCxNQUFoRCxDQUF1RCxZQUF2RDtBQUNBOzs7QUFHRCxVQUFTLGdCQUFULENBQTBCLEtBQTFCLEVBQWlDOztBQUVoQyxNQUFJLENBQUMsT0FBTyxZQUFQLENBQW9CLEtBQXpCLEVBQWdDOzs7QUFHL0IsUUFBSyxVQUFMLENBQWdCLENBQWhCLEVBQW1CLFNBQW5CLENBQTZCLE1BQTdCLENBQW9DLGNBQXBDO0FBQ0EsUUFBSyxVQUFMLENBQWdCLENBQWhCLEVBQW1CLFNBQW5CLENBQTZCLEdBQTdCLENBQWlDLGVBQWpDOzs7QUFHQSxVQUFPLFlBQVAsQ0FBb0IsSUFBcEI7QUFDQSxVQUFPLFlBQVAsQ0FBb0IsS0FBcEIsR0FBNEIsSUFBNUI7QUFDQSxHQVRELE1BU087OztBQUdOLFFBQUssVUFBTCxDQUFnQixDQUFoQixFQUFtQixTQUFuQixDQUE2QixNQUE3QixDQUFvQyxlQUFwQztBQUNBLFFBQUssVUFBTCxDQUFnQixDQUFoQixFQUFtQixTQUFuQixDQUE2QixHQUE3QixDQUFpQyxjQUFqQzs7O0FBR0EsVUFBTyxZQUFQLENBQW9CLE1BQXBCO0FBQ0EsVUFBTyxZQUFQLENBQW9CLEtBQXBCLEdBQTRCLEtBQTVCO0FBQ0E7QUFFRDs7O0FBR0QsVUFBUyxtQkFBVCxDQUE2QixLQUE3QixFQUFvQztBQUNuQyxTQUFPLFlBQVAsQ0FBb0IsTUFBcEIsQ0FBMkIsS0FBSyxLQUFMLEdBQVcsR0FBdEM7QUFDQTs7QUFFRCxVQUFTLFdBQVQsQ0FBcUIsR0FBckIsRUFBMEI7O0FBRXpCLE1BQUksUUFBUSxTQUFTLGdCQUFULENBQTBCLFFBQTFCLEVBQW9DLENBQXBDLENBQVo7QUFDQSxNQUFJLGNBQWMsU0FBUyxnQkFBVCxDQUEwQixlQUExQixFQUEyQyxDQUEzQyxDQUFsQjs7QUFFQSxRQUFNLFNBQU4sQ0FBZ0IsR0FBaEIsQ0FBb0IsUUFBcEI7QUFDQSxhQUFXLFlBQUk7QUFBRSxTQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsUUFBdkI7QUFBbUMsR0FBcEQsRUFBc0QsR0FBdEQ7O0FBRUEsU0FBTyxZQUFQLElBQXVCLFNBQVMsR0FBVCxDQUF2QjtBQUNBLGNBQVksU0FBWixHQUF3QixPQUFPLFlBQS9COztBQUVBLFNBQU8sT0FBTyxZQUFkO0FBRUE7Ozs7Ozs7QUFPRCxVQUFTLG9CQUFULENBQThCLE1BQTlCLEVBQXNDOztBQUVyQyxTQUFPLFFBQVAsQ0FBZ0IsYUFBaEIsR0FBZ0M7QUFDL0IsVUFBTyxDQUFDLE9BQU8sS0FBUCxDQUFhLEtBQWIsQ0FBbUIsQ0FBbkIsRUFBcUIsQ0FBQyxDQUF0QixDQUR1QjtBQUUvQixXQUFRLENBQUMsT0FBTyxNQUFQLENBQWMsS0FBZCxDQUFvQixDQUFwQixFQUFzQixDQUFDLENBQXZCO0FBRnNCLEdBQWhDOztBQUtBLFNBQU8sYUFBUCxDQUFxQjtBQUNwQixVQUFPLE9BQU8sUUFBUCxDQUFnQixhQUFoQixDQUE4QixLQURqQjtBQUVwQixXQUFRLE9BQU8sUUFBUCxDQUFnQixhQUFoQixDQUE4QjtBQUZsQixHQUFyQjtBQUtBOztBQUdELFVBQVMsbUJBQVQsQ0FBNkIsWUFBN0IsRUFBMkM7O0FBRTFDLE1BQUksU0FBUyxPQUFPLFFBQVAsQ0FBZ0IsU0FBaEIsQ0FBMEIsTUFBdkM7QUFDQSxNQUFJLGNBQWMsT0FBTyxRQUFQLENBQWdCLFNBQWhCLENBQTBCLFdBQTVDOztBQUVBLE1BQUksSUFBSSxLQUFLLEtBQUwsQ0FBVyxPQUFPLFFBQVAsQ0FBZ0IsYUFBaEIsQ0FBOEIsS0FBekMsQ0FBUjtBQUNBLE1BQUksSUFBSSxLQUFLLEtBQUwsQ0FBVyxPQUFPLFdBQVAsR0FBcUIsRUFBaEMsSUFBc0MsT0FBTyxRQUFQLENBQWdCLFNBQWhCLENBQTBCLFdBQTFCLEdBQXNDLEdBQXBGOztBQUVBLE1BQUksU0FBUyxJQUFJLE9BQU8sTUFBWCxDQUFrQjtBQUM5QixTQUFNLGFBQWEsS0FEVztBQUU5QixXQUFRLFNBRnNCO0FBRzlCLGdCQUFhLFdBSGlCO0FBSTlCLFdBQVEsTUFKc0I7QUFLOUIsWUFBUyxRQUxxQjtBQU05QixZQUFTO0FBTnFCLEdBQWxCLENBQWI7O0FBU0EsTUFBSSxRQUFRLElBQUksT0FBTyxJQUFYLENBQWdCO0FBQzNCLFlBQVMsUUFEa0I7QUFFM0IsWUFBUztBQUZrQixHQUFoQixDQUFaOztBQUtBLE1BQUksV0FBVyxJQUFJLE9BQU8sS0FBWCxDQUFpQixDQUFDLE1BQUQsRUFBUyxLQUFULENBQWpCLEVBQWtDO0FBQ2hELFFBQUssQ0FEMkM7QUFFaEQsU0FBTTtBQUYwQyxHQUFsQyxDQUFmOztBQUtBLGVBQWEsWUFBYixHQUE0QixRQUE1Qjs7QUFFQSxTQUFPLEdBQVAsQ0FBVyxRQUFYO0FBQ0EsU0FBTyxTQUFQOztBQUVBOztBQUVELFVBQVMsZUFBVCxDQUF5QixZQUF6QixFQUF1QztBQUN0QyxlQUFhLFlBQWIsQ0FBMEIsT0FBMUIsQ0FBa0MsTUFBbEMsRUFBMEMsTUFBSyxPQUFPLFdBQVAsR0FBcUIsRUFBdEIsR0FBNEIsT0FBTyxRQUFQLENBQWdCLFNBQWhCLENBQTBCLFdBQTFCLEdBQXNDLEdBQXRFLENBQTFDLEVBQXNIOztBQUVySCxhQUFVLE9BQU8sU0FBUCxDQUFpQixJQUFqQixDQUFzQixNQUF0QixDQUYyRztBQUdySCxhQUFVLE9BQU8sa0JBQVAsR0FBMEI7QUFIaUYsR0FBdEg7QUFLQTs7QUFFRCxVQUFTLGtCQUFULENBQTRCLEtBQTVCLEVBQW1DO0FBQ2xDLE1BQUksU0FBUyxNQUFNLE1BQU4sQ0FBYSxRQUExQjtBQUNBLE1BQUksZ0JBQWdCLE1BQU0sTUFBTixDQUFhLEtBQWpDO0FBQ0EsTUFBSSxVQUFVLE9BQU8sZ0JBQVAsQ0FBd0IsYUFBeEIsRUFBdUMsWUFBckQ7Ozs7QUFLQSxVQUFRLE9BQVIsQ0FBZ0IsT0FBTyxNQUFQLENBQWMsTUFBZCxDQUFoQjtBQUNBLFVBQVEsT0FBUixDQUFnQixTQUFoQixFQUEyQixDQUEzQixFQUE4QjtBQUM3QixhQUFVLE9BQU8sU0FBUCxDQUFpQixJQUFqQixDQUFzQixNQUF0QixDQURtQjtBQUU3QixhQUFVO0FBRm1CLEdBQTlCO0FBS0E7OztBQUlELFVBQVMsZUFBVCxDQUF5QixLQUF6QixFQUFnQzs7QUFFL0IsU0FBTyxnQkFBUCxDQUF3QixJQUF4QixDQUE2QixFQUFDLE1BQU0sTUFBTSxNQUFiLEVBQTdCO0FBQ0EsTUFBSSxlQUFlLE9BQU8sZ0JBQVAsQ0FBd0IsU0FBTyxDQUEvQixDQUFuQjs7QUFFQSxzQkFBb0IsWUFBcEI7QUFDQSxrQkFBZ0IsWUFBaEI7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBDRCxRQUFPLGdCQUFQLEdBQTBCLEVBQTFCO0FBQ0EsUUFBTyxZQUFQLEdBQXNCLENBQXRCO0FBQ0EsUUFBTyxnQkFBUCxHQUEwQixDQUExQjs7O0FBR0EsS0FBSSx5QkFBeUIsaUJBQWlCLFNBQVMsZ0JBQVQsQ0FBMEIsS0FBMUIsRUFBaUMsQ0FBakMsQ0FBakIsQ0FBN0I7OztBQUlBLFFBQU8sV0FBUCxHQUFxQixTQUFTLHVCQUF1QixLQUF2QixDQUE2QixLQUE3QixDQUFtQyxDQUFuQyxFQUFxQyxDQUFDLENBQXRDLENBQVQsSUFBbUQsR0FBeEU7QUFDQSxRQUFPLFdBQVAsR0FBcUIsU0FBUyx1QkFBdUIsTUFBdkIsQ0FBOEIsS0FBOUIsQ0FBb0MsQ0FBcEMsRUFBc0MsQ0FBQyxDQUF2QyxDQUFULElBQW9ELEdBQXpFOztBQUVBLFFBQU8sUUFBUCxHQUFrQjtBQUNqQixTQUFPLHVCQURVO0FBRWpCLGlCQUFlO0FBQ2QsVUFBTyxPQUFPLFdBQVAsR0FBbUIsR0FEWjtBQUVkLFdBQVEsT0FBTyxXQUFQLEdBQW1CO0FBRmIsR0FGRTtBQU1qQixhQUFXO0FBQ1YsV0FBUSxPQUFPLFdBQVAsR0FBcUIsT0FBTyxTQUFQLENBQWlCLGFBRHBDO0FBRVYsZ0JBQWEsT0FBTyxXQUFQLEdBQXFCLE9BQU8sU0FBUCxDQUFpQjtBQUZ6QztBQU5NLEVBQWxCOzs7QUFjQSxLQUFJLFNBQVMsSUFBSSxPQUFPLFlBQVgsQ0FBd0IsTUFBeEIsRUFBZ0M7QUFDNUMsU0FBTyxPQUFPLFFBQVAsQ0FBZ0IsYUFBaEIsQ0FBOEIsS0FETztBQUU1QyxVQUFRLE9BQU8sUUFBUCxDQUFnQixhQUFoQixDQUE4QjtBQUZNLEVBQWhDLENBQWI7OztBQU1BLEtBQUksZUFBZSxJQUFJLE9BQU8sTUFBWCxDQUFrQjs7QUFFcEMsUUFBTSx1QkFGOEI7QUFHcEMsVUFBUSxxQkFINEI7QUFJcEMsZUFBYSxPQUFPLFFBQVAsQ0FBZ0IsU0FBaEIsQ0FBMEIsV0FBMUIsR0FBc0MsQ0FKZjtBQUtwQyxVQUFRLE9BQU8sUUFBUCxDQUFnQixTQUFoQixDQUEwQixNQUExQixHQUFtQyxPQUFPLFFBQVAsQ0FBZ0IsU0FBaEIsQ0FBMEIsV0FMakM7QUFNcEMsT0FBSyxLQUFLLEtBQUwsQ0FBVyxPQUFPLFdBQVAsR0FBbUIsRUFBOUIsQ0FOK0I7QUFPcEMsUUFBTSxPQUFPLFdBQVAsR0FBcUI7QUFQUyxFQUFsQixDQUFuQjtBQVNBLFFBQU8sR0FBUCxDQUFXLFlBQVg7OztBQUdBLFVBQVMsZ0JBQVQsQ0FBMEIsZUFBMUIsRUFBMkMsZUFBM0M7OztBQUdBLEtBQUksZ0JBQWdCLFNBQVMsY0FBVCxDQUF3QixnQkFBeEIsQ0FBcEI7QUFDQSxlQUFjLFNBQWQsR0FBMEIsSUFBMUI7Ozs7Ozs7QUFRQSxNQUFLLFNBQUwsQ0FBZSxLQUFmLEdBQXVCLEtBQXZCO0FBQ0EsTUFBSyxLQUFMLEdBQWEsS0FBYjs7O0FBR0EsS0FBSSxZQUFZLFNBQVMsZ0JBQVQsQ0FBMEIsYUFBMUIsRUFBeUMsQ0FBekMsQ0FBaEI7O0FBRUEsV0FBVSxnQkFBVixDQUEyQixPQUEzQixFQUFvQyxnQkFBcEM7OztBQUdBLEtBQUksZUFBZSxTQUFTLGdCQUFULENBQTBCLGVBQTFCLEVBQTJDLENBQTNDLENBQW5COztBQUVBLGNBQWEsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsbUJBQXZDOzs7QUFJQSxRQUFPLFFBQVAsR0FBa0IsWUFBVTtBQUMzQix1QkFBcUIsc0JBQXJCO0FBQ0EsU0FBTyxTQUFQLENBQWlCLElBQWpCLENBQXNCLE1BQXRCO0FBQ0EsRUFIRDs7O0FBY0EsVUFBUyxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxVQUFuQztBQUVDLENBL1NEOzs7Ozs7Ozs7Ozs7QUEyVEEsQ0FBQyxZQUFXOztBQUVSLEtBQUksT0FBTyxVQUFVLE9BQU8sUUFBUCxDQUFnQixRQUExQixHQUFxQyxHQUFoRDs7QUFFQSxLQUFJLGlCQUFpQixLQUFyQjs7O0FBR0EsVUFBUyxNQUFULEdBQWtCLENBR2pCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlCRCxVQUFTLG1CQUFULENBQTZCLEtBQTdCLEVBQW9DOzs7QUFHdkMsTUFBSSxXQUFXLElBQUksV0FBSixDQUNYLGNBRFcsRUFFWCxFQUFDLFFBQVEsRUFBQyxNQUFNLE1BQU0sSUFBYixFQUFtQixLQUFLLE1BQU0sR0FBOUIsRUFBbUMsVUFBVSxNQUFNLFFBQW5ELEVBQVQsRUFGVyxDQUFmO0FBSUEsV0FBUyxhQUFULENBQXVCLFFBQXZCOztBQUVBLEtBQUcsRUFBSCxDQUFNLFNBQU4sRUFBaUIsbUNBQWpCO0FBQ0EsbUJBQWlCLElBQWpCO0FBQ0k7O0FBRUQsVUFBUyxtQ0FBVCxDQUE2QyxLQUE3QyxFQUFvRDs7O0FBR3ZELE1BQUksV0FBVyxJQUFJLFdBQUosQ0FDWCxlQURXLEVBRVgsRUFBQyxRQUFRLEVBQUMsVUFBVSxNQUFNLFFBQWpCLEVBQTJCLE1BQU0sTUFBTSxJQUF2QyxFQUFULEVBRlcsQ0FBZjtBQUlBLFdBQVMsYUFBVCxDQUF1QixRQUF2QjtBQUNJOzs7Ozs7QUFNSixDQXRERDs7Ozs7QUEyREEsQ0FBQyxZQUFXOzs7QUFHUixLQUFJLFVBQVUsSUFBZDtBQUNBLEtBQUksU0FBUyxFQUFiOzs7QUFHQSxVQUFTLGNBQVQsQ0FBd0IsS0FBeEIsRUFBK0I7O0FBRWxDLE1BQUksZUFBZSxZQUFZLE9BQU8sUUFBUCxDQUFnQixRQUE1QixHQUF1QyxTQUF2QyxHQUFtRCxNQUFNLE1BQU4sQ0FBYSxJQUFuRjs7Ozs7QUFLQSxTQUFPLFlBQVAsR0FBc0IsSUFBSSxJQUFKLENBQVM7QUFDM0IsU0FBTSxDQUFDLFlBQUQsQ0FEcUI7QUFFM0IsYUFBVSxLQUZpQjtBQUczQixXQUFRO0FBSG1CLEdBQVQsQ0FBdEI7Ozs7Ozs7OztBQWFBLFNBQU8sZ0JBQVAsR0FBMEIsTUFBTSxNQUFOLENBQWEsUUFBdkM7Ozs7QUFJQSxTQUFPLFVBQVAsR0FBb0IsR0FBcEI7QUFDQSxTQUFPLGtCQUFQLEdBQTZCLE9BQU8sVUFBUCxHQUFvQixJQUFyQixJQUE4QixLQUFLLEVBQW5DLENBQTVCO0FBQ0EsU0FBTyxzQkFBUCxHQUFnQyxNQUFNLE1BQU4sQ0FBYSxNQUE3Qzs7OztBQUlBO0FBRUk7O0FBRUQsVUFBUyxLQUFULEdBQWlCO0FBQ3BCLFNBQU8sWUFBUCxHQUFzQixDQUF0QjtBQUNBLFNBQU8sZ0JBQVAsR0FBMEIsS0FBSyxHQUFMLEVBQTFCO0FBQ0EsYUFBVyxZQUFVO0FBQ2pCLFlBQVMsSUFBVDtBQUNILEdBRkQsRUFFRyxPQUFPLHNCQUZWO0FBR0EsU0FBTyxZQUFQLENBQW9CLEtBQXBCO0FBQ0k7O0FBRUQsVUFBUyxRQUFULENBQWtCLE9BQWxCLEVBQTJCOzs7QUFHOUIsTUFBSSxZQUFZLElBQWhCLEVBQXNCOzs7QUFHbEIsVUFBTyxZQUFQLEdBQXNCLENBQXRCO0FBQ0EsT0FBSSxXQUFXLElBQUksV0FBSixDQUFnQixlQUFoQixFQUFpQyxFQUFDLFFBQVEsT0FBTyxnQkFBUCxDQUF3QixPQUFPLFlBQS9CLENBQVQsRUFBakMsQ0FBZjtBQUNBLFlBQVMsYUFBVCxDQUF1QixRQUF2QjtBQUNBLGNBQVcsUUFBWCxFQUFxQixPQUFPLGtCQUE1QjtBQUNBO0FBQ0g7Ozs7QUFJRCxVQUFRLEdBQVIsQ0FBWSw4QkFBOEIsc0JBQTFDO0FBQ0EsTUFBSSxvQkFBb0IsT0FBTyxnQkFBUCxDQUF3QixPQUFPLFlBQS9CLENBQXhCOztBQUVBLE1BQUksV0FBVyxJQUFJLFdBQUosQ0FBZ0IsZUFBaEIsRUFBaUMsRUFBQyxRQUFRLGlCQUFULEVBQWpDLENBQWY7QUFDQSxXQUFTLGFBQVQsQ0FBdUIsUUFBdkI7QUFDQSxhQUFXLFFBQVgsRUFBcUIsT0FBTyxrQkFBNUI7QUFDQSxVQUFRLEdBQVIsQ0FBWSxzQkFBWjtBQUNJOzs7Ozs7QUFNRCxVQUFTLGdCQUFULENBQTBCLEtBQTFCLEVBQWlDO0FBQ3BDLE1BQUksT0FBTyxLQUFLLEdBQUwsRUFBWDtBQUNBLE1BQUksS0FBSyxHQUFMLENBQVMsT0FBTyxNQUFNLE1BQU4sQ0FBYSxJQUE3QixJQUFxQyxPQUF6QyxFQUFrRDtBQUM5QyxPQUFJLFdBQVcsSUFBSSxXQUFKLENBQWdCLFVBQWhCLEVBQTRCLEVBQUMsUUFBUSxTQUFULEVBQTVCLENBQWY7QUFDQSxZQUFTLGdCQUFULENBQTBCLFFBQTFCO0FBQ0gsR0FIRCxNQUdPO0FBQ0gsT0FBSSxXQUFXLElBQUksV0FBSixDQUFnQixVQUFoQixFQUE0QixFQUFDLFFBQVEsTUFBVCxFQUE1QixDQUFmO0FBQ0EsWUFBUyxnQkFBVCxDQUEwQixRQUExQjtBQUNIO0FBQ0c7O0FBRUQsVUFBUyxnQkFBVCxDQUEwQixjQUExQixFQUEwQyxjQUExQzs7OztBQUlBLFVBQVMsZ0JBQVQsQ0FBMEIsZ0JBQTFCLEVBQTRDLGdCQUE1Qzs7OztBQUlILENBakdEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLyAuLi9saWJzL2ZhYnJpYy5qcy9kaXN0L2ZhYnJpYy5taW4uanNcbi8qIVxuICogIGhvd2xlci5qcyB2MS4xLjI5XG4gKiAgaG93bGVyanMuY29tXG4gKlxuICogIChjKSAyMDEzLTIwMTYsIEphbWVzIFNpbXBzb24gb2YgR29sZEZpcmUgU3R1ZGlvc1xuICogIGdvbGRmaXJlc3R1ZGlvcy5jb21cbiAqXG4gKiAgTUlUIExpY2Vuc2VcbiAqL1xuIWZ1bmN0aW9uKCl7dmFyIGU9e30sbz1udWxsLG49ITAscj0hMTt0cnl7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEF1ZGlvQ29udGV4dD9vPW5ldyBBdWRpb0NvbnRleHQ6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdlYmtpdEF1ZGlvQ29udGV4dD9vPW5ldyB3ZWJraXRBdWRpb0NvbnRleHQ6bj0hMX1jYXRjaCh0KXtuPSExfWlmKCFuKWlmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBBdWRpbyl0cnl7bmV3IEF1ZGlvfWNhdGNoKHQpe3I9ITB9ZWxzZSByPSEwO2lmKG4pe3ZhciBhPVwidW5kZWZpbmVkXCI9PXR5cGVvZiBvLmNyZWF0ZUdhaW4/by5jcmVhdGVHYWluTm9kZSgpOm8uY3JlYXRlR2FpbigpO2EuZ2Fpbi52YWx1ZT0xLGEuY29ubmVjdChvLmRlc3RpbmF0aW9uKX12YXIgaT1mdW5jdGlvbihlKXt0aGlzLl92b2x1bWU9MSx0aGlzLl9tdXRlZD0hMSx0aGlzLnVzaW5nV2ViQXVkaW89bix0aGlzLmN0eD1vLHRoaXMubm9BdWRpbz1yLHRoaXMuX2hvd2xzPVtdLHRoaXMuX2NvZGVjcz1lLHRoaXMuaU9TQXV0b0VuYWJsZT0hMH07aS5wcm90b3R5cGU9e3ZvbHVtZTpmdW5jdGlvbihlKXt2YXIgbz10aGlzO2lmKGU9cGFyc2VGbG9hdChlKSxlPj0wJiYxPj1lKXtvLl92b2x1bWU9ZSxuJiYoYS5nYWluLnZhbHVlPWUpO2Zvcih2YXIgciBpbiBvLl9ob3dscylpZihvLl9ob3dscy5oYXNPd25Qcm9wZXJ0eShyKSYmby5faG93bHNbcl0uX3dlYkF1ZGlvPT09ITEpZm9yKHZhciB0PTA7dDxvLl9ob3dsc1tyXS5fYXVkaW9Ob2RlLmxlbmd0aDt0Kyspby5faG93bHNbcl0uX2F1ZGlvTm9kZVt0XS52b2x1bWU9by5faG93bHNbcl0uX3ZvbHVtZSpvLl92b2x1bWU7cmV0dXJuIG99cmV0dXJuIG4/YS5nYWluLnZhbHVlOm8uX3ZvbHVtZX0sbXV0ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9zZXRNdXRlZCghMCksdGhpc30sdW5tdXRlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX3NldE11dGVkKCExKSx0aGlzfSxfc2V0TXV0ZWQ6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcztvLl9tdXRlZD1lLG4mJihhLmdhaW4udmFsdWU9ZT8wOm8uX3ZvbHVtZSk7Zm9yKHZhciByIGluIG8uX2hvd2xzKWlmKG8uX2hvd2xzLmhhc093blByb3BlcnR5KHIpJiZvLl9ob3dsc1tyXS5fd2ViQXVkaW89PT0hMSlmb3IodmFyIHQ9MDt0PG8uX2hvd2xzW3JdLl9hdWRpb05vZGUubGVuZ3RoO3QrKylvLl9ob3dsc1tyXS5fYXVkaW9Ob2RlW3RdLm11dGVkPWV9LGNvZGVjczpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5fY29kZWNzW2VdfSxfZW5hYmxlaU9TQXVkaW86ZnVuY3Rpb24oKXt2YXIgZT10aGlzO2lmKCFvfHwhZS5faU9TRW5hYmxlZCYmL2lQaG9uZXxpUGFkfGlQb2QvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKXtlLl9pT1NFbmFibGVkPSExO3ZhciBuPWZ1bmN0aW9uKCl7dmFyIHI9by5jcmVhdGVCdWZmZXIoMSwxLDIyMDUwKSx0PW8uY3JlYXRlQnVmZmVyU291cmNlKCk7dC5idWZmZXI9cix0LmNvbm5lY3Qoby5kZXN0aW5hdGlvbiksXCJ1bmRlZmluZWRcIj09dHlwZW9mIHQuc3RhcnQ/dC5ub3RlT24oMCk6dC5zdGFydCgwKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7KHQucGxheWJhY2tTdGF0ZT09PXQuUExBWUlOR19TVEFURXx8dC5wbGF5YmFja1N0YXRlPT09dC5GSU5JU0hFRF9TVEFURSkmJihlLl9pT1NFbmFibGVkPSEwLGUuaU9TQXV0b0VuYWJsZT0hMSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsbiwhMSkpfSwwKX07cmV0dXJuIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIixuLCExKSxlfX19O3ZhciB1PW51bGwsZD17fTtyfHwodT1uZXcgQXVkaW8sZD17bXAzOiEhdS5jYW5QbGF5VHlwZShcImF1ZGlvL21wZWc7XCIpLnJlcGxhY2UoL15ubyQvLFwiXCIpLG9wdXM6ISF1LmNhblBsYXlUeXBlKCdhdWRpby9vZ2c7IGNvZGVjcz1cIm9wdXNcIicpLnJlcGxhY2UoL15ubyQvLFwiXCIpLG9nZzohIXUuY2FuUGxheVR5cGUoJ2F1ZGlvL29nZzsgY29kZWNzPVwidm9yYmlzXCInKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSx3YXY6ISF1LmNhblBsYXlUeXBlKCdhdWRpby93YXY7IGNvZGVjcz1cIjFcIicpLnJlcGxhY2UoL15ubyQvLFwiXCIpLGFhYzohIXUuY2FuUGxheVR5cGUoXCJhdWRpby9hYWM7XCIpLnJlcGxhY2UoL15ubyQvLFwiXCIpLG00YTohISh1LmNhblBsYXlUeXBlKFwiYXVkaW8veC1tNGE7XCIpfHx1LmNhblBsYXlUeXBlKFwiYXVkaW8vbTRhO1wiKXx8dS5jYW5QbGF5VHlwZShcImF1ZGlvL2FhYztcIikpLnJlcGxhY2UoL15ubyQvLFwiXCIpLG1wNDohISh1LmNhblBsYXlUeXBlKFwiYXVkaW8veC1tcDQ7XCIpfHx1LmNhblBsYXlUeXBlKFwiYXVkaW8vbXA0O1wiKXx8dS5jYW5QbGF5VHlwZShcImF1ZGlvL2FhYztcIikpLnJlcGxhY2UoL15ubyQvLFwiXCIpLHdlYmE6ISF1LmNhblBsYXlUeXBlKCdhdWRpby93ZWJtOyBjb2RlY3M9XCJ2b3JiaXNcIicpLnJlcGxhY2UoL15ubyQvLFwiXCIpfSk7dmFyIGw9bmV3IGkoZCksZj1mdW5jdGlvbihlKXt2YXIgcj10aGlzO3IuX2F1dG9wbGF5PWUuYXV0b3BsYXl8fCExLHIuX2J1ZmZlcj1lLmJ1ZmZlcnx8ITEsci5fZHVyYXRpb249ZS5kdXJhdGlvbnx8MCxyLl9mb3JtYXQ9ZS5mb3JtYXR8fG51bGwsci5fbG9vcD1lLmxvb3B8fCExLHIuX2xvYWRlZD0hMSxyLl9zcHJpdGU9ZS5zcHJpdGV8fHt9LHIuX3NyYz1lLnNyY3x8XCJcIixyLl9wb3MzZD1lLnBvczNkfHxbMCwwLC0uNV0sci5fdm9sdW1lPXZvaWQgMCE9PWUudm9sdW1lP2Uudm9sdW1lOjEsci5fdXJscz1lLnVybHN8fFtdLHIuX3JhdGU9ZS5yYXRlfHwxLHIuX21vZGVsPWUubW9kZWx8fG51bGwsci5fb25sb2FkPVtlLm9ubG9hZHx8ZnVuY3Rpb24oKXt9XSxyLl9vbmxvYWRlcnJvcj1bZS5vbmxvYWRlcnJvcnx8ZnVuY3Rpb24oKXt9XSxyLl9vbmVuZD1bZS5vbmVuZHx8ZnVuY3Rpb24oKXt9XSxyLl9vbnBhdXNlPVtlLm9ucGF1c2V8fGZ1bmN0aW9uKCl7fV0sci5fb25wbGF5PVtlLm9ucGxheXx8ZnVuY3Rpb24oKXt9XSxyLl9vbmVuZFRpbWVyPVtdLHIuX3dlYkF1ZGlvPW4mJiFyLl9idWZmZXIsci5fYXVkaW9Ob2RlPVtdLHIuX3dlYkF1ZGlvJiZyLl9zZXR1cEF1ZGlvTm9kZSgpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBvJiZvJiZsLmlPU0F1dG9FbmFibGUmJmwuX2VuYWJsZWlPU0F1ZGlvKCksbC5faG93bHMucHVzaChyKSxyLmxvYWQoKX07aWYoZi5wcm90b3R5cGU9e2xvYWQ6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLG89bnVsbDtpZihyKXJldHVybiB2b2lkIGUub24oXCJsb2FkZXJyb3JcIixuZXcgRXJyb3IoXCJObyBhdWRpbyBzdXBwb3J0LlwiKSk7Zm9yKHZhciBuPTA7bjxlLl91cmxzLmxlbmd0aDtuKyspe3ZhciB0LGE7aWYoZS5fZm9ybWF0KXQ9ZS5fZm9ybWF0O2Vsc2V7aWYoYT1lLl91cmxzW25dLHQ9L15kYXRhOmF1ZGlvXFwvKFteOyxdKyk7L2kuZXhlYyhhKSx0fHwodD0vXFwuKFteLl0rKSQvLmV4ZWMoYS5zcGxpdChcIj9cIiwxKVswXSkpLCF0KXJldHVybiB2b2lkIGUub24oXCJsb2FkZXJyb3JcIixuZXcgRXJyb3IoXCJDb3VsZCBub3QgZXh0cmFjdCBmb3JtYXQgZnJvbSBwYXNzZWQgVVJMcywgcGxlYXNlIGFkZCBmb3JtYXQgcGFyYW1ldGVyLlwiKSk7dD10WzFdLnRvTG93ZXJDYXNlKCl9aWYoZFt0XSl7bz1lLl91cmxzW25dO2JyZWFrfX1pZighbylyZXR1cm4gdm9pZCBlLm9uKFwibG9hZGVycm9yXCIsbmV3IEVycm9yKFwiTm8gY29kZWMgc3VwcG9ydCBmb3Igc2VsZWN0ZWQgYXVkaW8gc291cmNlcy5cIikpO2lmKGUuX3NyYz1vLGUuX3dlYkF1ZGlvKXMoZSxvKTtlbHNle3ZhciB1PW5ldyBBdWRpbzt1LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLGZ1bmN0aW9uKCl7dS5lcnJvciYmND09PXUuZXJyb3IuY29kZSYmKGkubm9BdWRpbz0hMCksZS5vbihcImxvYWRlcnJvclwiLHt0eXBlOnUuZXJyb3I/dS5lcnJvci5jb2RlOjB9KX0sITEpLGUuX2F1ZGlvTm9kZS5wdXNoKHUpLHUuc3JjPW8sdS5fcG9zPTAsdS5wcmVsb2FkPVwiYXV0b1wiLHUudm9sdW1lPWwuX211dGVkPzA6ZS5fdm9sdW1lKmwudm9sdW1lKCk7dmFyIGY9ZnVuY3Rpb24oKXtlLl9kdXJhdGlvbj1NYXRoLmNlaWwoMTAqdS5kdXJhdGlvbikvMTAsMD09PU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGUuX3Nwcml0ZSkubGVuZ3RoJiYoZS5fc3ByaXRlPXtfZGVmYXVsdDpbMCwxZTMqZS5fZHVyYXRpb25dfSksZS5fbG9hZGVkfHwoZS5fbG9hZGVkPSEwLGUub24oXCJsb2FkXCIpKSxlLl9hdXRvcGxheSYmZS5wbGF5KCksdS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2FucGxheXRocm91Z2hcIixmLCExKX07dS5hZGRFdmVudExpc3RlbmVyKFwiY2FucGxheXRocm91Z2hcIixmLCExKSx1LmxvYWQoKX1yZXR1cm4gZX0sdXJsczpmdW5jdGlvbihlKXt2YXIgbz10aGlzO3JldHVybiBlPyhvLnN0b3AoKSxvLl91cmxzPVwic3RyaW5nXCI9PXR5cGVvZiBlP1tlXTplLG8uX2xvYWRlZD0hMSxvLmxvYWQoKSxvKTpvLl91cmxzfSxwbGF5OmZ1bmN0aW9uKGUsbil7dmFyIHI9dGhpcztyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBlJiYobj1lKSxlJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBlfHwoZT1cIl9kZWZhdWx0XCIpLHIuX2xvYWRlZD9yLl9zcHJpdGVbZV0/KHIuX2luYWN0aXZlTm9kZShmdW5jdGlvbih0KXt0Ll9zcHJpdGU9ZTt2YXIgYT10Ll9wb3M+MD90Ll9wb3M6ci5fc3ByaXRlW2VdWzBdLzFlMyxpPTA7ci5fd2ViQXVkaW8/KGk9ci5fc3ByaXRlW2VdWzFdLzFlMy10Ll9wb3MsdC5fcG9zPjAmJihhPXIuX3Nwcml0ZVtlXVswXS8xZTMrYSkpOmk9ci5fc3ByaXRlW2VdWzFdLzFlMy0oYS1yLl9zcHJpdGVbZV1bMF0vMWUzKTt2YXIgdSxkPSEoIXIuX2xvb3AmJiFyLl9zcHJpdGVbZV1bMl0pLGY9XCJzdHJpbmdcIj09dHlwZW9mIG4/bjpNYXRoLnJvdW5kKERhdGUubm93KCkqTWF0aC5yYW5kb20oKSkrXCJcIjtpZihmdW5jdGlvbigpe3ZhciBvPXtpZDpmLHNwcml0ZTplLGxvb3A6ZH07dT1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IXIuX3dlYkF1ZGlvJiZkJiZyLnN0b3Aoby5pZCkucGxheShlLG8uaWQpLHIuX3dlYkF1ZGlvJiYhZCYmKHIuX25vZGVCeUlkKG8uaWQpLnBhdXNlZD0hMCxyLl9ub2RlQnlJZChvLmlkKS5fcG9zPTAsci5fY2xlYXJFbmRUaW1lcihvLmlkKSksci5fd2ViQXVkaW98fGR8fHIuc3RvcChvLmlkKSxyLm9uKFwiZW5kXCIsZil9LGkvci5fcmF0ZSoxZTMpLHIuX29uZW5kVGltZXIucHVzaCh7dGltZXI6dSxpZDpvLmlkfSl9KCksci5fd2ViQXVkaW8pe3ZhciBzPXIuX3Nwcml0ZVtlXVswXS8xZTMsXz1yLl9zcHJpdGVbZV1bMV0vMWUzO3QuaWQ9Zix0LnBhdXNlZD0hMSxwKHIsW2QscyxfXSxmKSxyLl9wbGF5U3RhcnQ9by5jdXJyZW50VGltZSx0LmdhaW4udmFsdWU9ci5fdm9sdW1lLFwidW5kZWZpbmVkXCI9PXR5cGVvZiB0LmJ1ZmZlclNvdXJjZS5zdGFydD9kP3QuYnVmZmVyU291cmNlLm5vdGVHcmFpbk9uKDAsYSw4NjQwMCk6dC5idWZmZXJTb3VyY2Uubm90ZUdyYWluT24oMCxhLGkpOmQ/dC5idWZmZXJTb3VyY2Uuc3RhcnQoMCxhLDg2NDAwKTp0LmJ1ZmZlclNvdXJjZS5zdGFydCgwLGEsaSl9ZWxzZXtpZig0IT09dC5yZWFkeVN0YXRlJiYodC5yZWFkeVN0YXRlfHwhbmF2aWdhdG9yLmlzQ29jb29uSlMpKXJldHVybiByLl9jbGVhckVuZFRpbWVyKGYpLGZ1bmN0aW9uKCl7dmFyIG89cixhPWUsaT1uLHU9dCxkPWZ1bmN0aW9uKCl7by5wbGF5KGEsaSksdS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2FucGxheXRocm91Z2hcIixkLCExKX07dS5hZGRFdmVudExpc3RlbmVyKFwiY2FucGxheXRocm91Z2hcIixkLCExKX0oKSxyO3QucmVhZHlTdGF0ZT00LHQuaWQ9Zix0LmN1cnJlbnRUaW1lPWEsdC5tdXRlZD1sLl9tdXRlZHx8dC5tdXRlZCx0LnZvbHVtZT1yLl92b2x1bWUqbC52b2x1bWUoKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dC5wbGF5KCl9LDApfXJldHVybiByLm9uKFwicGxheVwiKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBuJiZuKGYpLHJ9KSxyKTooXCJmdW5jdGlvblwiPT10eXBlb2YgbiYmbigpLHIpOihyLm9uKFwibG9hZFwiLGZ1bmN0aW9uKCl7ci5wbGF5KGUsbil9KSxyKX0scGF1c2U6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcztpZighby5fbG9hZGVkKXJldHVybiBvLm9uKFwicGxheVwiLGZ1bmN0aW9uKCl7by5wYXVzZShlKX0pLG87by5fY2xlYXJFbmRUaW1lcihlKTt2YXIgbj1lP28uX25vZGVCeUlkKGUpOm8uX2FjdGl2ZU5vZGUoKTtpZihuKWlmKG4uX3Bvcz1vLnBvcyhudWxsLGUpLG8uX3dlYkF1ZGlvKXtpZighbi5idWZmZXJTb3VyY2V8fG4ucGF1c2VkKXJldHVybiBvO24ucGF1c2VkPSEwLFwidW5kZWZpbmVkXCI9PXR5cGVvZiBuLmJ1ZmZlclNvdXJjZS5zdG9wP24uYnVmZmVyU291cmNlLm5vdGVPZmYoMCk6bi5idWZmZXJTb3VyY2Uuc3RvcCgwKX1lbHNlIG4ucGF1c2UoKTtyZXR1cm4gby5vbihcInBhdXNlXCIpLG99LHN0b3A6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcztpZighby5fbG9hZGVkKXJldHVybiBvLm9uKFwicGxheVwiLGZ1bmN0aW9uKCl7by5zdG9wKGUpfSksbztvLl9jbGVhckVuZFRpbWVyKGUpO3ZhciBuPWU/by5fbm9kZUJ5SWQoZSk6by5fYWN0aXZlTm9kZSgpO2lmKG4paWYobi5fcG9zPTAsby5fd2ViQXVkaW8pe2lmKCFuLmJ1ZmZlclNvdXJjZXx8bi5wYXVzZWQpcmV0dXJuIG87bi5wYXVzZWQ9ITAsXCJ1bmRlZmluZWRcIj09dHlwZW9mIG4uYnVmZmVyU291cmNlLnN0b3A/bi5idWZmZXJTb3VyY2Uubm90ZU9mZigwKTpuLmJ1ZmZlclNvdXJjZS5zdG9wKDApfWVsc2UgaXNOYU4obi5kdXJhdGlvbil8fChuLnBhdXNlKCksbi5jdXJyZW50VGltZT0wKTtyZXR1cm4gb30sbXV0ZTpmdW5jdGlvbihlKXt2YXIgbz10aGlzO2lmKCFvLl9sb2FkZWQpcmV0dXJuIG8ub24oXCJwbGF5XCIsZnVuY3Rpb24oKXtvLm11dGUoZSl9KSxvO3ZhciBuPWU/by5fbm9kZUJ5SWQoZSk6by5fYWN0aXZlTm9kZSgpO3JldHVybiBuJiYoby5fd2ViQXVkaW8/bi5nYWluLnZhbHVlPTA6bi5tdXRlZD0hMCksb30sdW5tdXRlOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7aWYoIW8uX2xvYWRlZClyZXR1cm4gby5vbihcInBsYXlcIixmdW5jdGlvbigpe28udW5tdXRlKGUpfSksbzt2YXIgbj1lP28uX25vZGVCeUlkKGUpOm8uX2FjdGl2ZU5vZGUoKTtyZXR1cm4gbiYmKG8uX3dlYkF1ZGlvP24uZ2Fpbi52YWx1ZT1vLl92b2x1bWU6bi5tdXRlZD0hMSksb30sdm9sdW1lOmZ1bmN0aW9uKGUsbyl7dmFyIG49dGhpcztpZihlPXBhcnNlRmxvYXQoZSksZT49MCYmMT49ZSl7aWYobi5fdm9sdW1lPWUsIW4uX2xvYWRlZClyZXR1cm4gbi5vbihcInBsYXlcIixmdW5jdGlvbigpe24udm9sdW1lKGUsbyl9KSxuO3ZhciByPW8/bi5fbm9kZUJ5SWQobyk6bi5fYWN0aXZlTm9kZSgpO3JldHVybiByJiYobi5fd2ViQXVkaW8/ci5nYWluLnZhbHVlPWU6ci52b2x1bWU9ZSpsLnZvbHVtZSgpKSxufXJldHVybiBuLl92b2x1bWV9LGxvb3A6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcztyZXR1cm5cImJvb2xlYW5cIj09dHlwZW9mIGU/KG8uX2xvb3A9ZSxvKTpvLl9sb29wfSxzcHJpdGU6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcztyZXR1cm5cIm9iamVjdFwiPT10eXBlb2YgZT8oby5fc3ByaXRlPWUsbyk6by5fc3ByaXRlfSxwb3M6ZnVuY3Rpb24oZSxuKXt2YXIgcj10aGlzO2lmKCFyLl9sb2FkZWQpcmV0dXJuIHIub24oXCJsb2FkXCIsZnVuY3Rpb24oKXtyLnBvcyhlKX0pLFwibnVtYmVyXCI9PXR5cGVvZiBlP3I6ci5fcG9zfHwwO2U9cGFyc2VGbG9hdChlKTt2YXIgdD1uP3IuX25vZGVCeUlkKG4pOnIuX2FjdGl2ZU5vZGUoKTtpZih0KXJldHVybiBlPj0wPyhyLnBhdXNlKG4pLHQuX3Bvcz1lLHIucGxheSh0Ll9zcHJpdGUsbikscik6ci5fd2ViQXVkaW8/dC5fcG9zKyhvLmN1cnJlbnRUaW1lLXIuX3BsYXlTdGFydCk6dC5jdXJyZW50VGltZTtpZihlPj0wKXJldHVybiByO2Zvcih2YXIgYT0wO2E8ci5fYXVkaW9Ob2RlLmxlbmd0aDthKyspaWYoci5fYXVkaW9Ob2RlW2FdLnBhdXNlZCYmND09PXIuX2F1ZGlvTm9kZVthXS5yZWFkeVN0YXRlKXJldHVybiByLl93ZWJBdWRpbz9yLl9hdWRpb05vZGVbYV0uX3BvczpyLl9hdWRpb05vZGVbYV0uY3VycmVudFRpbWV9LHBvczNkOmZ1bmN0aW9uKGUsbyxuLHIpe3ZhciB0PXRoaXM7aWYobz1cInVuZGVmaW5lZFwiIT10eXBlb2YgbyYmbz9vOjAsbj1cInVuZGVmaW5lZFwiIT10eXBlb2YgbiYmbj9uOi0uNSwhdC5fbG9hZGVkKXJldHVybiB0Lm9uKFwicGxheVwiLGZ1bmN0aW9uKCl7dC5wb3MzZChlLG8sbixyKX0pLHQ7aWYoIShlPj0wfHwwPmUpKXJldHVybiB0Ll9wb3MzZDtpZih0Ll93ZWJBdWRpbyl7dmFyIGE9cj90Ll9ub2RlQnlJZChyKTp0Ll9hY3RpdmVOb2RlKCk7YSYmKHQuX3BvczNkPVtlLG8sbl0sYS5wYW5uZXIuc2V0UG9zaXRpb24oZSxvLG4pLGEucGFubmVyLnBhbm5pbmdNb2RlbD10Ll9tb2RlbHx8XCJIUlRGXCIpfXJldHVybiB0fSxmYWRlOmZ1bmN0aW9uKGUsbyxuLHIsdCl7dmFyIGE9dGhpcyxpPU1hdGguYWJzKGUtbyksdT1lPm8/XCJkb3duXCI6XCJ1cFwiLGQ9aS8uMDEsbD1uL2Q7aWYoIWEuX2xvYWRlZClyZXR1cm4gYS5vbihcImxvYWRcIixmdW5jdGlvbigpe2EuZmFkZShlLG8sbixyLHQpfSksYTthLnZvbHVtZShlLHQpO2Zvcih2YXIgZj0xO2Q+PWY7ZisrKSFmdW5jdGlvbigpe3ZhciBlPWEuX3ZvbHVtZSsoXCJ1cFwiPT09dT8uMDE6LS4wMSkqZixuPU1hdGgucm91bmQoMWUzKmUpLzFlMyxpPW87c2V0VGltZW91dChmdW5jdGlvbigpe2Eudm9sdW1lKG4sdCksbj09PWkmJnImJnIoKX0sbCpmKX0oKX0sZmFkZUluOmZ1bmN0aW9uKGUsbyxuKXtyZXR1cm4gdGhpcy52b2x1bWUoMCkucGxheSgpLmZhZGUoMCxlLG8sbil9LGZhZGVPdXQ6ZnVuY3Rpb24oZSxvLG4scil7dmFyIHQ9dGhpcztyZXR1cm4gdC5mYWRlKHQuX3ZvbHVtZSxlLG8sZnVuY3Rpb24oKXtuJiZuKCksdC5wYXVzZShyKSx0Lm9uKFwiZW5kXCIpfSxyKX0sX25vZGVCeUlkOmZ1bmN0aW9uKGUpe2Zvcih2YXIgbz10aGlzLG49by5fYXVkaW9Ob2RlWzBdLHI9MDtyPG8uX2F1ZGlvTm9kZS5sZW5ndGg7cisrKWlmKG8uX2F1ZGlvTm9kZVtyXS5pZD09PWUpe249by5fYXVkaW9Ob2RlW3JdO2JyZWFrfXJldHVybiBufSxfYWN0aXZlTm9kZTpmdW5jdGlvbigpe2Zvcih2YXIgZT10aGlzLG89bnVsbCxuPTA7bjxlLl9hdWRpb05vZGUubGVuZ3RoO24rKylpZighZS5fYXVkaW9Ob2RlW25dLnBhdXNlZCl7bz1lLl9hdWRpb05vZGVbbl07YnJlYWt9cmV0dXJuIGUuX2RyYWluUG9vbCgpLG99LF9pbmFjdGl2ZU5vZGU6ZnVuY3Rpb24oZSl7Zm9yKHZhciBvPXRoaXMsbj1udWxsLHI9MDtyPG8uX2F1ZGlvTm9kZS5sZW5ndGg7cisrKWlmKG8uX2F1ZGlvTm9kZVtyXS5wYXVzZWQmJjQ9PT1vLl9hdWRpb05vZGVbcl0ucmVhZHlTdGF0ZSl7ZShvLl9hdWRpb05vZGVbcl0pLG49ITA7YnJlYWt9aWYoby5fZHJhaW5Qb29sKCksIW4pe3ZhciB0O2lmKG8uX3dlYkF1ZGlvKXQ9by5fc2V0dXBBdWRpb05vZGUoKSxlKHQpO2Vsc2V7by5sb2FkKCksdD1vLl9hdWRpb05vZGVbby5fYXVkaW9Ob2RlLmxlbmd0aC0xXTt2YXIgYT1uYXZpZ2F0b3IuaXNDb2Nvb25KUz9cImNhbnBsYXl0aHJvdWdoXCI6XCJsb2FkZWRtZXRhZGF0YVwiLGk9ZnVuY3Rpb24oKXt0LnJlbW92ZUV2ZW50TGlzdGVuZXIoYSxpLCExKSxlKHQpfTt0LmFkZEV2ZW50TGlzdGVuZXIoYSxpLCExKX19fSxfZHJhaW5Qb29sOmZ1bmN0aW9uKCl7dmFyIGUsbz10aGlzLG49MDtmb3IoZT0wO2U8by5fYXVkaW9Ob2RlLmxlbmd0aDtlKyspby5fYXVkaW9Ob2RlW2VdLnBhdXNlZCYmbisrO2ZvcihlPW8uX2F1ZGlvTm9kZS5sZW5ndGgtMTtlPj0wJiYhKDU+PW4pO2UtLSlvLl9hdWRpb05vZGVbZV0ucGF1c2VkJiYoby5fd2ViQXVkaW8mJm8uX2F1ZGlvTm9kZVtlXS5kaXNjb25uZWN0KDApLG4tLSxvLl9hdWRpb05vZGUuc3BsaWNlKGUsMSkpfSxfY2xlYXJFbmRUaW1lcjpmdW5jdGlvbihlKXtmb3IodmFyIG89dGhpcyxuPS0xLHI9MDtyPG8uX29uZW5kVGltZXIubGVuZ3RoO3IrKylpZihvLl9vbmVuZFRpbWVyW3JdLmlkPT09ZSl7bj1yO2JyZWFrfXZhciB0PW8uX29uZW5kVGltZXJbbl07dCYmKGNsZWFyVGltZW91dCh0LnRpbWVyKSxvLl9vbmVuZFRpbWVyLnNwbGljZShuLDEpKX0sX3NldHVwQXVkaW9Ob2RlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyxuPWUuX2F1ZGlvTm9kZSxyPWUuX2F1ZGlvTm9kZS5sZW5ndGg7cmV0dXJuIG5bcl09XCJ1bmRlZmluZWRcIj09dHlwZW9mIG8uY3JlYXRlR2Fpbj9vLmNyZWF0ZUdhaW5Ob2RlKCk6by5jcmVhdGVHYWluKCksbltyXS5nYWluLnZhbHVlPWUuX3ZvbHVtZSxuW3JdLnBhdXNlZD0hMCxuW3JdLl9wb3M9MCxuW3JdLnJlYWR5U3RhdGU9NCxuW3JdLmNvbm5lY3QoYSksbltyXS5wYW5uZXI9by5jcmVhdGVQYW5uZXIoKSxuW3JdLnBhbm5lci5wYW5uaW5nTW9kZWw9ZS5fbW9kZWx8fFwiZXF1YWxwb3dlclwiLG5bcl0ucGFubmVyLnNldFBvc2l0aW9uKGUuX3BvczNkWzBdLGUuX3BvczNkWzFdLGUuX3BvczNkWzJdKSxuW3JdLnBhbm5lci5jb25uZWN0KG5bcl0pLG5bcl19LG9uOmZ1bmN0aW9uKGUsbyl7dmFyIG49dGhpcyxyPW5bXCJfb25cIitlXTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBvKXIucHVzaChvKTtlbHNlIGZvcih2YXIgdD0wO3Q8ci5sZW5ndGg7dCsrKW8/clt0XS5jYWxsKG4sbyk6clt0XS5jYWxsKG4pO3JldHVybiBufSxvZmY6ZnVuY3Rpb24oZSxvKXt2YXIgbj10aGlzLHI9bltcIl9vblwiK2VdO2lmKG8pe2Zvcih2YXIgdD0wO3Q8ci5sZW5ndGg7dCsrKWlmKG89PT1yW3RdKXtyLnNwbGljZSh0LDEpO2JyZWFrfX1lbHNlIG5bXCJfb25cIitlXT1bXTtyZXR1cm4gbn0sdW5sb2FkOmZ1bmN0aW9uKCl7Zm9yKHZhciBvPXRoaXMsbj1vLl9hdWRpb05vZGUscj0wO3I8by5fYXVkaW9Ob2RlLmxlbmd0aDtyKyspbltyXS5wYXVzZWR8fChvLnN0b3AobltyXS5pZCksby5vbihcImVuZFwiLG5bcl0uaWQpKSxvLl93ZWJBdWRpbz9uW3JdLmRpc2Nvbm5lY3QoMCk6bltyXS5zcmM9XCJcIjtmb3Iocj0wO3I8by5fb25lbmRUaW1lci5sZW5ndGg7cisrKWNsZWFyVGltZW91dChvLl9vbmVuZFRpbWVyW3JdLnRpbWVyKTt2YXIgdD1sLl9ob3dscy5pbmRleE9mKG8pO251bGwhPT10JiZ0Pj0wJiZsLl9ob3dscy5zcGxpY2UodCwxKSxkZWxldGUgZVtvLl9zcmNdLG89bnVsbH19LG4pdmFyIHM9ZnVuY3Rpb24obyxuKXtpZihuIGluIGUpcmV0dXJuIG8uX2R1cmF0aW9uPWVbbl0uZHVyYXRpb24sdm9pZCBjKG8pO2lmKC9eZGF0YTpbXjtdKztiYXNlNjQsLy50ZXN0KG4pKXtmb3IodmFyIHI9YXRvYihuLnNwbGl0KFwiLFwiKVsxXSksdD1uZXcgVWludDhBcnJheShyLmxlbmd0aCksYT0wO2E8ci5sZW5ndGg7KythKXRbYV09ci5jaGFyQ29kZUF0KGEpO18odC5idWZmZXIsbyxuKX1lbHNle3ZhciBpPW5ldyBYTUxIdHRwUmVxdWVzdDtpLm9wZW4oXCJHRVRcIixuLCEwKSxpLnJlc3BvbnNlVHlwZT1cImFycmF5YnVmZmVyXCIsaS5vbmxvYWQ9ZnVuY3Rpb24oKXtfKGkucmVzcG9uc2UsbyxuKX0saS5vbmVycm9yPWZ1bmN0aW9uKCl7by5fd2ViQXVkaW8mJihvLl9idWZmZXI9ITAsby5fd2ViQXVkaW89ITEsby5fYXVkaW9Ob2RlPVtdLGRlbGV0ZSBvLl9nYWluTm9kZSxkZWxldGUgZVtuXSxvLmxvYWQoKSl9O3RyeXtpLnNlbmQoKX1jYXRjaCh1KXtpLm9uZXJyb3IoKX19fSxfPWZ1bmN0aW9uKG4scix0KXtvLmRlY29kZUF1ZGlvRGF0YShuLGZ1bmN0aW9uKG8pe28mJihlW3RdPW8sYyhyLG8pKX0sZnVuY3Rpb24oZSl7ci5vbihcImxvYWRlcnJvclwiLGUpfSl9LGM9ZnVuY3Rpb24oZSxvKXtlLl9kdXJhdGlvbj1vP28uZHVyYXRpb246ZS5fZHVyYXRpb24sMD09PU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGUuX3Nwcml0ZSkubGVuZ3RoJiYoZS5fc3ByaXRlPXtfZGVmYXVsdDpbMCwxZTMqZS5fZHVyYXRpb25dfSksZS5fbG9hZGVkfHwoZS5fbG9hZGVkPSEwLGUub24oXCJsb2FkXCIpKSxlLl9hdXRvcGxheSYmZS5wbGF5KCl9LHA9ZnVuY3Rpb24obixyLHQpe3ZhciBhPW4uX25vZGVCeUlkKHQpO2EuYnVmZmVyU291cmNlPW8uY3JlYXRlQnVmZmVyU291cmNlKCksYS5idWZmZXJTb3VyY2UuYnVmZmVyPWVbbi5fc3JjXSxhLmJ1ZmZlclNvdXJjZS5jb25uZWN0KGEucGFubmVyKSxhLmJ1ZmZlclNvdXJjZS5sb29wPXJbMF0sclswXSYmKGEuYnVmZmVyU291cmNlLmxvb3BTdGFydD1yWzFdLGEuYnVmZmVyU291cmNlLmxvb3BFbmQ9clsxXStyWzJdKSxhLmJ1ZmZlclNvdXJjZS5wbGF5YmFja1JhdGUudmFsdWU9bi5fcmF0ZX07XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kJiZkZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm57SG93bGVyOmwsSG93bDpmfX0pLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBleHBvcnRzJiYoZXhwb3J0cy5Ib3dsZXI9bCxleHBvcnRzLkhvd2w9ZiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmKHdpbmRvdy5Ib3dsZXI9bCx3aW5kb3cuSG93bD1mKX0oKTtcblxuXG47XG4vL1xuLy9cdFV0aWxzXG4vL1xuLy8gKiBhbmltYXRlKGNiLCBkdXJhdG9uKSAtLSB3cmFwcGVyIG9mIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuLy9cbi8vIERPTSBtYW5pcHVsYXRpb25zXG4vL1xuLy8gKiBjbG9zZVBvcHVwKGV2ZW50KSAtLSBjbG9zZSBwb3B1cCB3aXRoIHVzZXJzIHVuaXF1ZSBjb2RlXG4vLyAqIG9uVm9sdW1lQnRuQ2xpY2soZXZlbnQpIC0tIGhhbmRsZXIgZm9yIHZvbHVtZSBidXR0b25zIGNsaWNrcyAobXV0ZS91bm11dGUgdHJpZ2dlcilcbi8vICogb25Wb2x1bWVTbGlkZXJJbnB1dChldmVudCkgLS0gY2hhbmdlIGF1ZGlvIHZvbHVtZSB3aGVudm9sdW1lIHNsaWRlciBpcyBiZWluZyBtb3ZlZFxuLy8gKiB1cGRhdGVTY29yZShudW1iZXIpIC0tIHVwZGF0ZSBjdXJyZW50IHNjb3JlXG4vL1xuLy9cdENhbnZhc1xuLy9cbi8vICogcmVmcmVzaENvbXB1dGVkU2l6ZXMob2JqZWN0KSAtLSBjaGFuZ2UgPGNhbnZhcz4gc2l6ZXMgdG8gYWN0dWFsXG4vLyAqIGFkZE1vdmVtZW50T25DYW52YXMobW92ZW1lbnRJbmZvKSAtLSBhZGQgbmV3IG1vdmVtZW50IGNhbnZhcy1vYmplY3Rcbi8vICogYW5pbWF0ZU1vdmVtZW50KG9iamVjdCkgLS0gbWFrZSByZWNpZXZlZCBhbHJlYWR5IGFkZGVkIG1vdmVtZW50IHJ1biAoYW5pbWF0ZSlcbi8vICogb25BZ1NldHVwRXZlbnQoZXZlbnQpIC0tIGhhbmRsZXIgZm9yIGV2ZW50LCBmaXJlZCB3aGVuIGdhbWUgc2V0dGluZ3MgYXJlIHJlY2lldmVkXG4vL1xuLy8gVG8gcmVtb3ZlXG4vL1xuLy8gKiBzdGFydCgpIC0tIHN0YXJ0IGdhbWVcbi8vICogbmV4dEJlYXQoaXNGaXJzdCkgLS0gcHJvY2VzcyAoYW5kIGFkZCkgbmV4dCBtb3ZlbWVudFxuLy9cbi8vIEluaXRpYWxpemF0aW9uXG4vL1xuXG5cbihmdW5jdGlvbigpe1xuXG5mdW5jdGlvbiBhbmltYXRlKGRyYXcsIGR1cmF0aW9uKSB7XG4gIHZhciBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiBhbmltYXRlKHRpbWUpIHtcbiAgICAvLyDQvtC/0YDQtdC00LXQu9C40YLRjCwg0YHQutC+0LvRjNC60L4g0L/RgNC+0YjQu9C+INCy0YDQtdC80LXQvdC4INGBINC90LDRh9Cw0LvQsCDQsNC90LjQvNCw0YbQuNC4XG4gICAgdmFyIHRpbWVQYXNzZWQgPSB0aW1lIC0gc3RhcnQ7XG5cbiAgICAvLyDQstC+0LfQvNC+0LbQvdC+INC90LXQsdC+0LvRjNGI0L7QtSDQv9GA0LXQstGL0YjQtdC90LjQtSDQstGA0LXQvNC10L3QuCwg0LIg0Y3RgtC+0Lwg0YHQu9GD0YfQsNC1INC30LDRhNC40LrRgdC40YDQvtCy0LDRgtGMINC60L7QvdC10YZcbiAgICBpZiAodGltZVBhc3NlZCA+IGR1cmF0aW9uKSB0aW1lUGFzc2VkID0gZHVyYXRpb247XG5cbiAgICAvLyDQvdCw0YDQuNGB0L7QstCw0YLRjCDRgdC+0YHRgtC+0Y/QvdC40LUg0LDQvdC40LzQsNGG0LjQuCDQsiDQvNC+0LzQtdC90YIgdGltZVBhc3NlZFxuICAgIGRyYXcodGltZVBhc3NlZCk7XG5cbiAgICAvLyDQtdGB0LvQuCDQstGA0LXQvNGPINCw0L3QuNC80LDRhtC40Lgg0L3QtSDQt9Cw0LrQvtC90YfQuNC70L7RgdGMIC0g0LfQsNC/0LvQsNC90LjRgNC+0LLQsNGC0Ywg0LXRidGRINC60LDQtNGAXG4gICAgaWYgKHRpbWVQYXNzZWQgPCBkdXJhdGlvbikge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICAgIH1cblxuICB9KTtcbn1cblxuXG52YXIgY29uZmlnID0ge1xuXHRjb2xvcnM6IHtcblx0XHRuZXV0cmFsOiAnI0ZGQTcwMCcsIC8vICM4RDk5QUUgIzEwN0U3RFxuXHRcdHN1Y2Nlc3M6ICcjQzJFODEyJyxcblx0XHRmYWlsOiAnI0I4MEMwOSdcblx0fSxcblx0bW92ZW1lbnRzOiB7XG5cdFx0cmFkaXVzUGVyY2VudDogNCxcblx0XHRzdHJva2VXaWR0aFBlcmNlbnQ6IDAuNVxuXHR9XG59XG5cbmZ1bmN0aW9uIGNsb3NlUG9wdXAoZXZlbnQpIHtcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvcHVwJylbMF0uY2xhc3NMaXN0LmFkZCgnY2xvc2VkJylcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxvZ28nKVswXS5jbGFzc0xpc3QucmVtb3ZlKCd3aXRoLXBvcHVwJylcbn1cblxuLy8gTXV0ZXMgLyB1bm11dGVzIGF1ZGlvXG5mdW5jdGlvbiBvblZvbHVtZUJ0bkNsaWNrKGV2ZW50KSB7XG5cblx0aWYgKCFjb25maWcuY3VycmVudEF1ZGlvLm11dGVkKSB7XG5cblx0XHQvLyBDaGFuZ2Ugdmlld1xuXHRcdHRoaXMuY2hpbGROb2Rlc1sxXS5jbGFzc0xpc3QucmVtb3ZlKCdmYS12b2x1bWUtdXAnKTtcblx0XHR0aGlzLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LmFkZCgnZmEtdm9sdW1lLW9mZicpO1xuXG5cdFx0Ly8gTXV0ZVxuXHRcdGNvbmZpZy5jdXJyZW50QXVkaW8ubXV0ZSgpO1xuXHRcdGNvbmZpZy5jdXJyZW50QXVkaW8ubXV0ZWQgPSB0cnVlO1xuXHR9IGVsc2Uge1xuXG5cdFx0Ly8gQ2hhbmdlIHZpZXdcblx0XHR0aGlzLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LnJlbW92ZSgnZmEtdm9sdW1lLW9mZicpO1xuXHRcdHRoaXMuY2hpbGROb2Rlc1sxXS5jbGFzc0xpc3QuYWRkKCdmYS12b2x1bWUtdXAnKTtcblxuXHRcdC8vIFVubXV0ZVxuXHRcdGNvbmZpZy5jdXJyZW50QXVkaW8udW5tdXRlKCk7XG5cdFx0Y29uZmlnLmN1cnJlbnRBdWRpby5tdXRlZCA9IGZhbHNlO1xuXHR9XG5cbn1cblxuLy8gQ2hhbmdlIHZvbHVtZSBsZXZlbCBvZiBjdXJyZW50IGF1ZGlvXG5mdW5jdGlvbiBvblZvbHVtZVNsaWRlcklucHV0KGV2ZW50KSB7XG5cdGNvbmZpZy5jdXJyZW50QXVkaW8udm9sdW1lKHRoaXMudmFsdWUvMTAwKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU2NvcmUoYWRkKSB7XG5cblx0dmFyIHNjb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNjb3JlJylbMF07XG5cdHZhciBzY29yZU51bWJlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zY29yZS1udW1iZXInKVswXTtcblxuXHRzY29yZS5jbGFzc0xpc3QuYWRkKCd1cGRhdGUnKTtcblx0c2V0VGltZW91dCgoKT0+eyBzY29yZS5jbGFzc0xpc3QucmVtb3ZlKCd1cGRhdGUnKTsgfSwgNDAwKTtcblxuXHRjb25maWcuY3VycmVudFNjb3JlICs9IHBhcnNlSW50KGFkZCk7XG5cdHNjb3JlTnVtYmVyLmlubmVySFRNTCA9IGNvbmZpZy5jdXJyZW50U2NvcmU7XG5cblx0cmV0dXJuIGNvbmZpZy5jdXJyZW50U2NvcmU7XG5cbn1cblxuLy8gKioqKioqKioqKlxuLy8gKiBDQU5WQVMgKlxuLy8gKioqKioqKioqKlxuXG4vLyBDaGFuZ2VzIGNhbnZhcyBiYWNrZ3JvdW5kIHNpemUgd2hlbiBmaXJlZFxuZnVuY3Rpb24gcmVmcmVzaENvbXB1dGVkU2l6ZXMob2JqZWN0KSB7XG5cdFxuXHRjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZSA9IHtcblx0XHR3aWR0aDogK29iamVjdC53aWR0aC5zbGljZSgwLC0yKSxcblx0XHRoZWlnaHQ6ICtvYmplY3QuaGVpZ2h0LnNsaWNlKDAsLTIpXG5cdH07XG5cblx0Y2FudmFzLnNldERpbWVuc2lvbnMoe1xuXHRcdHdpZHRoOiBjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZS53aWR0aCxcblx0XHRoZWlnaHQ6IGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLmhlaWdodFxuXHR9KTtcblxufVxuXG5cbmZ1bmN0aW9uIGFkZE1vdmVtZW50T25DYW52YXMobW92ZW1lbnRJbmZvKSB7XG5cblx0dmFyIHJhZGl1cyA9IGNvbmZpZy5jYW52T3B0cy5tb3ZlbWVudHMucmFkaXVzO1xuXHR2YXIgc3Ryb2tlV2lkdGggPSBjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnN0cm9rZVdpZHRoO1xuXHQvLyB2YXIgeCA9IE1hdGgucm91bmQoY29uZmlnLmNhbnZPcHRzLmNvbXB1dGVkU3R5bGUud2lkdGggLSAoY29uZmlnLmNhbnZPcHRzLmNvbXB1dGVkU3R5bGUud2lkdGgvMTAwKSozKSAtIHJhZGl1cyoyO1xuXHR2YXIgeCA9IE1hdGgucm91bmQoY29uZmlnLmNhbnZPcHRzLmNvbXB1dGVkU3R5bGUud2lkdGgpO1xuXHR2YXIgeSA9IE1hdGgucm91bmQoY29uZmlnLm9uZUhQZXJjZW50ICogNDUpICsgY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5zdHJva2VXaWR0aCoxLjY7XG5cblx0dmFyIGNpcmNsZSA9IG5ldyBmYWJyaWMuQ2lyY2xlKHtcblx0XHRmaWxsOiBtb3ZlbWVudEluZm8uY29sb3IsXG5cdFx0c3Ryb2tlOiAnI0ZGRkZGRicsXG5cdFx0c3Ryb2tlV2lkdGg6IHN0cm9rZVdpZHRoLFxuXHRcdHJhZGl1czogcmFkaXVzLFxuXHRcdG9yaWdpblk6ICdjZW50ZXInLFxuXHRcdG9yaWdpblg6ICdjZW50ZXInXG5cdH0pO1xuXG5cdHZhciBhcnJvdyA9IG5ldyBmYWJyaWMuUGF0aCh7XG5cdFx0b3JpZ2luWTogJ2NlbnRlcicsXG5cdFx0b3JpZ2luWDogJ2NlbnRlcidcblx0fSlcblxuXHR2YXIgbW92ZW1lbnQgPSBuZXcgZmFicmljLkdyb3VwKFtjaXJjbGUsIGFycm93XSwge1xuXHRcdHRvcDogeSxcblx0XHRsZWZ0OiB4XG5cdH0pO1xuXG5cdG1vdmVtZW50SW5mby5jYW52YXNPYmplY3QgPSBtb3ZlbWVudDtcblxuXHRjYW52YXMuYWRkKG1vdmVtZW50KTtcblx0Y2FudmFzLnJlbmRlckFsbCgpO1xuXHQvLyBtb3ZlbWVudEluZm8uc3RhdGUgPSAnYWRkZWQnO1xufVxuXG5mdW5jdGlvbiBhbmltYXRlTW92ZW1lbnQobW92ZW1lbnRJbmZvKSB7XG5cdG1vdmVtZW50SW5mby5jYW52YXNPYmplY3QuYW5pbWF0ZSgnbGVmdCcsICcnKygoY29uZmlnLm9uZVdQZXJjZW50ICogMjApICsgY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5zdHJva2VXaWR0aCoxLjUpLCB7XG5cdFx0Ly8gb25DaGFuZ2U6IGNhbnZhcy5yZW5kZXJBbGwuYmluZChjYW52YXMpLFxuXHRcdG9uQ2hhbmdlOiBjYW52YXMucmVuZGVyQWxsLmJpbmQoY2FudmFzKSxcblx0XHRkdXJhdGlvbjogY29uZmlnLmN1cnJlbnRNaW5JbnRlcnZhbCoxNlxuXHR9KTtcbn1cblxuZnVuY3Rpb24gc2hvd01vdmVtZW50UmVzdWx0KGV2ZW50KSB7XG5cdHZhciBzdGF0dXMgPSBldmVudC5kZXRhaWwuZ2xTdGF0dXM7XG5cdHZhciBtb3ZlbWVudEluZGV4ID0gZXZlbnQuZGV0YWlsLmluZGV4O1xuXHR2YXIgY2Fudk9iaiA9IGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzW21vdmVtZW50SW5kZXhdLmNhbnZhc09iamVjdDtcblxuXG5cdC8vIFRFU1RcblxuXHRjYW52T2JqLnNldEZpbGwoY29uZmlnLmNvbG9yc1tzdGF0dXNdKTtcblx0Y2Fudk9iai5hbmltYXRlKCdvcGFjaXR5JywgMCwge1xuXHRcdG9uQ2hhbmdlOiBjYW52YXMucmVuZGVyQWxsLmJpbmQoY2FudmFzKSxcblx0XHRkdXJhdGlvbjogMTAwMFxuXHR9KTtcblxufVxuXG5cbi8vIEFjdGlvbnMgcGVyZm9ybWVkIHdoZW4gY3VycmVudCBnYW1lIHNldHRpbmdzIHJlY2lldmVkXG5mdW5jdGlvbiBvbkdsQWRkTW92ZW1lbnQoZXZlbnQpIHtcblxuXHRjb25maWcuY3VycmVudE1vdmVtZW50cy5wdXNoKHtuYW1lOiBldmVudC5kZXRhaWx9KTtcblx0dmFyIHRoaXNNb3ZlbWVudCA9IGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzW2xlbmd0aC0xXTtcblxuXHRhZGRNb3ZlbWVudE9uQ2FudmFzKHRoaXNNb3ZlbWVudCk7XG5cdGFuaW1hdGVNb3ZlbWVudCh0aGlzTW92ZW1lbnQpO1xuXG59XG5cbi8vIGZ1bmN0aW9uIHN0YXJ0KCkge1xuLy8gXHRjb25maWcuY3VycmVudFNjb3JlID0gMDtcbi8vIFx0Y29uZmlnLmN1cnJlbnRTdGFydERhdGUgPSBEYXRlLm5vdygpO1xuLy8gXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4vLyBcdFx0bmV4dEJlYXQodHJ1ZSk7XG4vLyBcdH0sIGNvbmZpZy5jdXJyZW50QmVnaW5uaW5nT2Zmc2V0KTtcbi8vIFx0Y29uZmlnLmN1cnJlbnRBdWRpby5wbGF5KCk7XG4vLyB9XG5cbi8vIGZ1bmN0aW9uIG5leHRCZWF0KGlzRmlyc3QpIHtcblxuLy8gXHQvLyBJZiB3ZSdyZSBpbiB0aGUgYmVnaW5uaW5nIG9mIHNvbmdcbi8vIFx0aWYgKGlzRmlyc3QgPT09IHRydWUpIHtcbi8vIFx0XHRhZGRNb3ZlbWVudE9uQ2FudmFzKGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzWzBdKTtcbi8vIFx0XHRhbmltYXRlTW92ZW1lbnQoY29uZmlnLmN1cnJlbnRNb3ZlbWVudHNbMF0pO1xuLy8gXHRcdHJldHVybjtcbi8vIFx0fVxuXG4vLyBcdC8vIEluc2VydCBuZXcgbW92ZW1lbnRcbi8vIFx0dmFyIGFwcGVhcmluZ01vdmVtZW50SW5kZXggPSBNYXRoLmZsb29yKChEYXRlLm5vdygpIC0gY29uZmlnLmN1cnJlbnRTdGFydERhdGUpIC8gY29uZmlnLmN1cnJlbnRNaW5JbnRlcnZhbCk7XG5cdFxuLy8gXHR2YXIgYXBwZWFyaW5nTW92ZW1lbnQgPSBjb25maWcuY3VycmVudE1vdmVtZW50c1thcHBlYXJpbmdNb3ZlbWVudEluZGV4XTtcblxuLy8gXHRhZGRNb3ZlbWVudE9uQ2FudmFzKGFwcGVhcmluZ01vdmVtZW50KTtcbi8vIFx0YW5pbWF0ZU1vdmVtZW50KGFwcGVhcmluZ01vdmVtZW50KTtcblxuLy8gfVxuXG5cblxuXG5cblxuXG5cblxuLy8gKioqKioqKipcbi8vICogSW5pdCAqXG4vLyAqKioqKioqKlxuXG5jb25maWcuY3VycmVudE1vdmVtZW50cyA9IFtdO1xuY29uZmlnLmN1cnJlbnRTY29yZSA9IDA7XG5jb25maWcuY3VycmVudFN0YXJ0RGF0ZSA9IDA7XG5cbi8vIEdldCBjb21wdXRlZCBzdHlsZXMgb2Ygd2hvbGUgcGFnZSB3cmFwcGVyXG52YXIgY2FudmFzQ29tcHV0ZWRTdHlsZU9iaiA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndyJylbMF0pO1xuXG5cbi8vIFNldCBjYW52YXMgb3B0aW9uc1xuY29uZmlnLm9uZVdQZXJjZW50ID0gcGFyc2VJbnQoY2FudmFzQ29tcHV0ZWRTdHlsZU9iai53aWR0aC5zbGljZSgwLC0yKSkvMTAwO1xuY29uZmlnLm9uZUhQZXJjZW50ID0gcGFyc2VJbnQoY2FudmFzQ29tcHV0ZWRTdHlsZU9iai5oZWlnaHQuc2xpY2UoMCwtMikpLzEwMDtcblxuY29uZmlnLmNhbnZPcHRzID0ge1xuXHRiZ1VSTDogJy4uL2ltZy9iZy1jcm93ZC0xLmpwZycsXG5cdGNvbXB1dGVkU3R5bGU6IHtcblx0XHR3aWR0aDogY29uZmlnLm9uZVdQZXJjZW50KjEwMCxcblx0XHRoZWlnaHQ6IGNvbmZpZy5vbmVIUGVyY2VudCoxMDBcblx0fSxcblx0bW92ZW1lbnRzOiB7XG5cdFx0cmFkaXVzOiBjb25maWcub25lV1BlcmNlbnQgKiBjb25maWcubW92ZW1lbnRzLnJhZGl1c1BlcmNlbnQsXG5cdFx0c3Ryb2tlV2lkdGg6IGNvbmZpZy5vbmVXUGVyY2VudCAqIGNvbmZpZy5tb3ZlbWVudHMuc3Ryb2tlV2lkdGhQZXJjZW50XG5cdH1cbn1cblxuXG4vLyBJbml0aWFsaXplICdmYWJyaWMnIGNhbnZhcyBvYmpcbnZhciBjYW52YXMgPSBuZXcgZmFicmljLlN0YXRpY0NhbnZhcygnZ2FtZScsIHtcblx0d2lkdGg6IGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLndpZHRoLFxuXHRoZWlnaHQ6IGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLmhlaWdodCxcbn0pO1xuXG4vLyBEcmF3IFwicGVyZmVjdCBzdWNjZXNzXCIgcGxhY2Ugc2hhZG93IGNpcmNsZVxudmFyIHNoYWRvd0NpcmNsZSA9IG5ldyBmYWJyaWMuQ2lyY2xlKHtcblx0Ly8gZmlsbDogY29uZmlnLmNvbG9ycy5uZXV0cmFsLFxuXHRmaWxsOiAncmdiYSgyMDAsMjAwLDIwMCwwLjIpJyxcblx0c3Ryb2tlOiAncmdiYSgyMDAsMjAwLDIwMCwxKScsXG5cdHN0cm9rZVdpZHRoOiBjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnN0cm9rZVdpZHRoKjIsXG5cdHJhZGl1czogY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5yYWRpdXMgKyBjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnN0cm9rZVdpZHRoLFxuXHR0b3A6IE1hdGgucm91bmQoY29uZmlnLm9uZUhQZXJjZW50KjQ1KSxcblx0bGVmdDogY29uZmlnLm9uZVdQZXJjZW50ICogMjBcbn0pXG5jYW52YXMuYWRkKHNoYWRvd0NpcmNsZSk7XG5cbi8vIFNldCBoYW5kbGVyIGZvciBnYW1lIHNldHVwIGV2ZW50XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdHbEFkZE1vdmVtZW50Jywgb25HbEFkZE1vdmVtZW50KTtcblxuLy8gU2hvdyBjdXJyZW50IGdhbWUgY29kZVxudmFyIGNvZGVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29kZS1jb250YWluZXInKTtcbmNvZGVDb250YWluZXIuaW5uZXJIVE1MID0gY29kZTtcblxuXG4vLyAqKioqKioqKipcbi8vICogQXVkaW8gKlxuLy8gKioqKioqKioqXG5cbi8vIEFkZCBtdXRlZCBzdGF0ZSBzYXZpbmcgZmVhdHVyZSB0byBIb3dsIChhdWRpbyBsaWIpXG5Ib3dsLnByb3RvdHlwZS5tdXRlZCA9IGZhbHNlO1xuSG93bC5tdXRlZCA9IGZhbHNlO1xuXG4vLyBHZXQgdm9sdW1lIGJ1dHRvbiBlbGVtZW50XG52YXIgdm9sdW1lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnZvbHVtZS1idG4nKVswXTtcbi8vIGFuZCBzZXQgb25DbGljayBldmVudCBoYW5kbGVyXG52b2x1bWVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvblZvbHVtZUJ0bkNsaWNrKTtcblxuLy8gR2V0IHZvbHVtZSBsZXZlbCBzbGlkZXJcbnZhciB2b2x1bWVTbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudm9sdW1lLWlucHV0JylbMF07XG4vLyBhbmQgc2V0IG9uSW5wdXQgZXZlbnQgaGFuZGxlclxudm9sdW1lU2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25Wb2x1bWVTbGlkZXJJbnB1dClcblxuXG4vLyBDaGFuZ2UgY2FudmFzIGJhY2tncm91bmQgc2l6ZSBvbiB3aW5kb3cgcmVzaXplXG53aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbigpe1xuXHRyZWZyZXNoQ29tcHV0ZWRTaXplcyhjYW52YXNDb21wdXRlZFN0eWxlT2JqKTtcblx0Y2FudmFzLnJlbmRlckFsbC5iaW5kKGNhbnZhcyk7XG59XG5cblxuXG5cblxuXG5cblxuXG4vLyBURVNUXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xuXG59KSgpO1xuLyoqXG4gKiBjb25uZWN0aW9uLmpzXG4gKlxuICogU2V0cyBjb25uZWN0aW9uIHRvIHRoZSBzZXJ2ZXIuXG4gKlxuICogRW1pdHMgJ2FnU2V0dXBFdmVudCcgYW5kICdhZ0NvbW1hbmRFdmVudCcgZXZlbnRzIHRoYXQgc2hvdWxkIGJlIGhhbmRsZWQgaW5cbiAqIHRoZSB2aWV3LlxuICogYGBhZ1NldHVwRXZlbnRgYHMgc2V0IHRoZSBzb25nIG5hbWUgYW5kIHRoZSBjb21tYW5kIHNlcXVlbmNlLlxuICogYGBhZ0NvbW1hbmRFdmVudGBgcyBzYXkgd2hpY2ggY29tbWFuZCB1c2VyIHNlbnQuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAgIC8vIFNldCB0aGUgY29ubmVjdGlvbiB0byB0aGUgbW9iaWxlIGFwcC5cbiAgICB2YXIgaG9zdCA9IFwid3M6Ly9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSArIFwiL1wiO1xuICAgIC8vdmFyIHdzID0gbmV3IFdlYlNvY2tldChob3N0KTtcbiAgICB2YXIgc29uZ1dhc1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICAvLyB2YXIgd3MgPSBpbygpO1xuXG4gICAgZnVuY3Rpb24gb25PcGVuKCkge1xuXHQvLyBBZnRlciB3ZSBjb25uZWN0LCB0aGUgc2VydmVyIHNlbmRzIHVzIGRhdGEgd2hpY2ggd2lsbCBiZSBoYW5kbGVkIGluXG5cdC8vIGBgb25tZXNzYWdlYGAgc28gd2UgZG8gbm90aGluZyBoZXJlLlxuICAgIH1cblxuICAgIC8vIGZ1bmN0aW9uIG9uQ2xvc2UoZXZlbnQpIHtcbiAgICAvLyBcdGlmICghZS53YXNDbGVhbikge1xuICAgIC8vIFx0ICAgIC8vIFJldHJ5IGlmIGNvbm5lY3Rpb24gZmFpbGVkLlxuICAgIC8vIFx0ICAgIHdzID0gbmV3IFdlYlNvY2tldChob3N0KTtcbiAgICAvLyBcdCAgICB3cy5vbm9wZW4gPSBvbk9wZW47XG4gICAgLy8gXHQgICAgd3Mub25jbG9zZSA9IG9uQ2xvc2U7XG4gICAgLy8gXHQgICAgaWYgKCFzb25nV2FzU3RhcnRlZCkge1xuICAgIC8vIFx0XHR3cy5vbm1lc3NhZ2UgPSBvbkdvdE1lc3NhZ2VPblN0YXJ0O1xuICAgIC8vIFx0ICAgIH0gZWxzZSB7XG4gICAgLy8gXHRcdHdzLm9ubWVzc2FnZSA9IG9uR290TWVzc2FnZU9uQ29ubmVjdGlvbkVzdGFibGlzaGVkO1xuICAgIC8vIFx0ICAgIH1cbiAgICAvLyBcdH1cbiAgICAvLyBcdHNvbmdXYXNTdGFydGVkID0gZmFsc2U7XG4gICAgLy8gfVxuXG4gICAgZnVuY3Rpb24gb25Hb3RNZXNzYWdlT25TdGFydChldmVudCkge1xuXHQvLyBSZWNlaXZlIHNvbmcgbmFtZSBhbmQgY29tbWFuZCBzZXF1ZW5jZS5cblx0Ly8gVE9ETyEgR2VuZXJhdGUgYSBtb3ZlbWVudCBzdHJpbmcgbGlzdCBmcm9tIHRoZSBzdXBwbGllZCBjb2RlLlxuXHR2YXIgbmV3RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXG5cdCAgICAnYWdTZXR1cEV2ZW50Jyxcblx0ICAgIHtkZXRhaWw6IHtzb25nOiBldmVudC5zb25nLCBicG06IGV2ZW50LmJwbSwgY29tbWFuZHM6IGV2ZW50LmNvbW1hbmRzfX1cblx0KTtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG5cdC8vd3Mub25tZXNzYWdlID0gb25Hb3RNZXNzYWdlT25Db25uZWN0aW9uRXN0YWJsaXNoZWQ7XG5cdHdzLm9uKCdtZXNzYWdlJywgb25Hb3RNZXNzYWdlT25Db25uZWN0aW9uRXN0YWJsaXNoZWQpO1xuXHRzb25nV2FzU3RhcnRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Hb3RNZXNzYWdlT25Db25uZWN0aW9uRXN0YWJsaXNoZWQoZXZlbnQpIHtcblx0Ly8gUmVjZWl2ZSB1c2VyIGNvbW1hbmQuXG5cdC8vIFRPRE8hIEdlbmVyYXRlIGEgbW92ZW1lbnQgc3RyaW5nIGZyb20gdGhlIHN1cHBsaWVkIGNvZGUuXG5cdHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudChcblx0ICAgICdhZ0NvbWFuZEV2ZW50Jyxcblx0ICAgIHtkZXRhaWw6IHttb3ZlbWVudDogZXZlbnQubW92ZW1lbnQsIHRpbWU6IGV2ZW50LnRpbWV9fVxuXHQpO1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcbiAgICB9XG5cbiAgICAvLyBpby5vbignbWVzc2FnZScsIG9uR290TWVzc2FnZU9uU3RhcnQpO1xuICAgIC8vIHdzLm9ub3BlbiA9IG9uT3BlbjtcbiAgICAvLyB3cy5vbmNsb3NlID0gb25DbG9zZTtcbiAgICAvLyB3cy5vbm1lc3NhZ2UgPSBvbkdvdE1lc3NhZ2VPblN0YXJ0O1xufSkoKTtcbi8qKlxuICogZ2FtZWxvZ2ljLmpzXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAgIC8vXG5cbiAgICB2YXIgRVBTSUxPTiA9IDEwMDA7XG4gICAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gICAgLy8gQWN0aW9ucyBwZXJmb3JtZWQgd2hlbiBjdXJyZW50IGdhbWUgc2V0dGluZ3MgcmVjaWV2ZWRcbiAgICBmdW5jdGlvbiBvbkFnU2V0dXBFdmVudChldmVudCkge1xuXG5cdGxldCBhdWRpb0ZpbGVVUkwgPSAnaHR0cDovLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgKyAnL3NvbmdzLycgKyBldmVudC5kZXRhaWwuc29uZztcblx0Ly8gbGV0IGF1ZGlvRmlsZVVSTCA9ICcuLi9hdWRpby8nICsgZXZlbnQuZGV0YWlsLnNvbmc7XG5cblx0Ly8gY29uc29sZS5sb2coYXVkaW9GaWxlVVJMKTtcblxuXHRjb25maWcuY3VycmVudEF1ZGlvID0gbmV3IEhvd2woe1xuXHQgICAgdXJsczogW2F1ZGlvRmlsZVVSTF0sXG5cdCAgICBhdXRvcGxheTogZmFsc2UsXG5cdCAgICB2b2x1bWU6IDAuOCxcblx0fSk7XG5cblx0Ly8gY29uZmlnLmN1cnJlbnRNb3ZlbWVudHMgPSBldmVudC5kZXRhaWwuY29tbWFuZHMubWFwKChjdXJyZW50VmFsdWUsIGluZGV4LCBhcnJheSkgPT4ge1xuXHQvLyAgICAgcmV0dXJuIHtcblx0Ly8gXHRpbmRleDogaW5kZXgsXG5cdC8vIFx0bmFtZTogY3VycmVudFZhbHVlLFxuXHQvLyBcdGNvbG9yOiBjb25maWcuY29sb3JzLm5ldXRyYWwsXG5cdC8vICAgICB9XG5cdC8vIH0pO1xuXHRjb25maWcuY3VycmVudE1vdmVtZW50cyA9IGV2ZW50LmRldGFpbC5jb21tYW5kcztcblxuXHQvLyBCUE0sIG1pbkludGVydmFsLCBiZWdpbm5pbmcgb2Zmc2V0XG5cdC8vIGNvbmZpZy5jdXJyZW50QnBtID0gZXZlbnQuZGV0YWlsLmJwbTtcblx0Y29uZmlnLmN1cnJlbnRCcG0gPSAxMjg7XG5cdGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwgPSAoY29uZmlnLmN1cnJlbnRCcG0gKiAxMDAwKSAvICg2MCAqIDE2KTtcblx0Y29uZmlnLmN1cnJlbnRCZWdpbm5pbmdPZmZzZXQgPSBldmVudC5kZXRhaWwub2Zmc2V0O1xuXG5cdC8vIFRlc3Rcblx0Ly8gYWRkTW92ZW1lbnRPbkNhbnZhcyhjb25maWcuY3VycmVudE1vdmVtZW50c1sxXSk7XG5cdHN0YXJ0KCk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdGFydCgpIHtcblx0Y29uZmlnLmN1cnJlbnRTY29yZSA9IDA7XG5cdGNvbmZpZy5jdXJyZW50U3RhcnREYXRlID0gRGF0ZS5ub3coKTtcblx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHQgICAgbmV4dEJlYXQodHJ1ZSk7XG5cdH0sIGNvbmZpZy5jdXJyZW50QmVnaW5uaW5nT2Zmc2V0KTtcblx0Y29uZmlnLmN1cnJlbnRBdWRpby5zdGFydCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5leHRCZWF0KGlzRmlyc3QpIHtcblxuXHQvLyBJZiB3ZSdyZSBpbiB0aGUgYmVnaW5uaW5nIG9mIHNvbmdcblx0aWYgKGlzRmlyc3QgPT09IHRydWUpIHtcblx0ICAgIC8vYWRkTW92ZW1lbnRPbkNhbnZhcyhjb25maWcuY3VycmVudE1vdmVtZW50c1swXSk7XG5cdCAgICAvL2FuaW1hdGVNb3ZlbWVudChjb25maWcuY3VycmVudE1vdmVtZW50c1swXSk7XG5cdCAgICBjb25maWcuY3VycmVudEluZGV4ID0gMDtcblx0ICAgIHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudCgnZ2xBZGRNb3ZlbWVudCcsIHtkZXRhaWw6IGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzW2NvbmZpZy5jdXJyZW50SW5kZXhdfSk7XG5cdCAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcblx0ICAgIHNldFRpbWVvdXQobmV4dEJlYXQsIGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwpO1xuXHQgICAgcmV0dXJuO1xuXHR9XG5cblx0Ly8gSW5zZXJ0IG5ldyBtb3ZlbWVudFxuXHQvL3ZhciBhcHBlYXJpbmdNb3ZlbWVudEluZGV4ID0gTWF0aC5mbG9vcigoRGF0ZS5ub3coKSAtIGNvbmZpZy5jdXJyZW50U3RhcnREYXRlKSAvIGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwpO1xuXHRjb25zb2xlLmxvZygnYXBlYXJpbmcgbW92ZW1lbnQgaW5kZXg6ICcgKyBhcHBlYXJpbmdNb3ZlbWVudEluZGV4KTtcblx0dmFyIGFwcGVhcmluZ01vdmVtZW50ID0gY29uZmlnLmN1cnJlbnRNb3ZlbWVudHNbY29uZmlnLmN1cnJlbnRJbmRleF07XG5cblx0dmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdnbEFkZE1vdmVtZW50Jywge2RldGFpbDogYXBwZWFyaW5nTW92ZW1lbnR9KTtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG5cdHNldFRpbWVvdXQobmV4dEJlYXQsIGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwpO1xuXHRjb25zb2xlLmxvZyhhcHBlYXJpbmdNb3ZlbWVudEluZGV4KTtcbiAgICB9XG5cbiAgICAvLyBmdW5jdGlvbiBvbkFnU2V0dXBFdmVudChldmVudCkge1xuICAgIC8vIFx0Y29uZmlnLm1vdmVtZW50cyA9IGV2ZW50LmRldGFpbC5jb21tYW5kcztcbiAgICAvLyB9XG5cbiAgICBmdW5jdGlvbiBvbkFnQ29tbWFuZEV2ZW50KGV2ZW50KSB7XG5cdHZhciB0aW1lID0gRGF0ZS5ub3coKTtcblx0aWYgKE1hdGguYWJzKHRpbWUgLSBldmVudC5kZXRhaWwudGltZSkgPCBFUFNJTE9OKSB7XG5cdCAgICB2YXIgbmV3RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2dsU3RhdHVzJywge2RldGFpbDogXCJzdWNjZXNzXCJ9KTtcblx0ICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIobmV3RXZlbnQpO1xuXHR9IGVsc2Uge1xuXHQgICAgdmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdnbFN0YXR1cycsIHtkZXRhaWw6IFwiZmFpbFwifSk7XG5cdCAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKG5ld0V2ZW50KTtcblx0fVxuICAgIH1cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FnU2V0dXBFdmVudCcsIG9uQWdTZXR1cEV2ZW50KTtcbiAgICAvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdhZ1NldHVwRXZlbnQnLCBmdW5jdGlvbihldmVudCkge1xuICAgIC8vIFx0Y29uc29sZS5sb2coJ2FnU2V0dXBFdmVudDogJyArIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRldGFpbCkpO1xuICAgIC8vIH0pO1xuICAgIERvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FnQ29tbWFuZEV2ZW50Jywgb25BZ0NvbW1hbmRFdmVudCk7XG4gICAgLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYWdDbW1hbmRFdmVudCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgLy8gXHRjb25zb2xlLmxvZygnYWdDb21tYW5kRXZlbnQ6ICcgKyBKU09OLnN0cmluZ2lmeShldmVudC5kZXRhaWwpKTtcbiAgICAvLyB9KTtcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
