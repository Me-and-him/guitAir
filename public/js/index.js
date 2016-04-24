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
		console.log(this);
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
		var y = Math.round(config.oneHPercent * 45);

		// console.log(x + ' - ' + y);

		var movement = new fabric.Circle({
			fill: movementInfo.color,
			stroke: '#FFFFFF',
			strokeWidth: strokeWidth,
			radius: radius,
			// radius: 100,
			top: y,
			left: x
			// left: 262
		});

		movementInfo.canvasObject = movement;

		console.log(movement);
		canvas.add(movement);
		canvas.renderAll();
		// movementInfo.state = 'added';
	}

	function animateMovement(movementInfo) {
		// movementInfo.canvasObject.animate('left', ''+(config.oneWPercent * 20), {
		// 	// onChange: canvas.renderAll.bind(canvas),
		// 	onChange: requestAnimationFrame(canvas.renderAll.bind(canvas), 100),
		// 	// duration: config.currentMinInterval*16
		// });

		animate(function (time) {
			movementInfo.canvasObject.setLeft(time / config.currentMinInterval * 16 + config.oneWPercent * 20);
			canvas.renderAll.bind(canvas);
		}, config.currentMinInterval * 16);
	}

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

		config.currentMovements = event.detail.commands.map(function (currentValue, index, array) {
			return {
				index: index,
				name: currentValue,
				color: config.colors.neutral
			};
		});

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
		config.currentAudio.play();
	}

	function nextBeat(isFirst) {

		// If we're in the beginning of song
		if (isFirst === true) {
			addMovementOnCanvas(config.currentMovements[0]);
			animateMovement(config.currentMovements[0]);
			// setTimeout(nextBeat, config.currentMinInterval);
			return;
		}

		// Insert new movement
		var appearingMovementIndex = Math.floor((Date.now() - config.currentStartDate) / config.currentMinInterval);

		console.log(appearingMovementIndex);

		var appearingMovement = config.currentMovements[appearingMovementIndex];

		addMovementOnCanvas(appearingMovement);
		animateMovement(appearingMovement);
		// setTimeout(nextBeat, config.currentMinInterval);
		console.log(appearingMovementIndex);
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
	var shadowCircle = new fabric.Circle({
		// fill: config.colors.neutral,
		fill: 'rgba(200,200,200,0.2)',
		stroke: 'rgba(200,200,200,1)',
		strokeWidth: config.canvOpts.movements.strokeWidth,
		radius: config.canvOpts.movements.radius,
		top: Math.round(config.oneHPercent * 45),
		left: config.oneWPercent * 20
	});
	canvas.add(shadowCircle);

	// Set handler for game setup event
	document.addEventListener('agSetupEvent', onAgSetupEvent);

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
	var ws = io();

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

	io.on('message', onGotMessageOnStart);
	// ws.onopen = onOpen;
	// ws.onclose = onClose;
	// ws.onmessage = onGotMessageOnStart;
})();
/**
 * gamelogic.js
 */

(function () {
	//

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

		config.currentMovements = event.detail.commands.map(function (currentValue, index, array) {
			return {
				index: index,
				name: currentValue,
				color: config.colors.neutral
			};
		});

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
			addMovementOnCanvas(config.currentMovements[0]);
			animateMovement(config.currentMovements[0]);
			setTimeout(nextBeat, config.currentMinInterval);
			return;
		}

		// Insert new movement
		var appearingMovementIndex = Math.floor((Date.now() - config.currentStartDate) / config.currentMinInterval);
		console.log(appearingMovementIndex);
		var appearingMovement = config.currentMovements[appearingMovementIndex];

		addMovementOnCanvas(appearingMovement);
		animateMovement(appearingMovement);
		setTimeout(nextBeat, config.currentMinInterval);
		console.log(appearingMovementIndex);
	}

	function onAgCommandEvent(event) {}

	// document.addEventListener('agSetupEvent', onAgSetupEvent);
	document.addEventListener('agSetupEvent', function (event) {
		console.log('agSetupEvent: ' + JSON.stringify(event.detail));
	});
	document.addEventListener('agCmmandEvent', function (event) {
		console.log('agCommandEvent' + JSON.stringify(event.detail));
	});
})();

// *** List of UI elements ***
//
// Settings		+
// Score
// Logo				+
// Volume
// Pause

// Socials
//# sourceMappingURL=data:application/json;base64,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QUFPLGtCQUE1QjtBQUNBO0FBQ0g7OztBQUdELE1BQUkseUJBQXlCLEtBQUssS0FBTCxDQUFXLENBQUMsS0FBSyxHQUFMLEtBQWEsT0FBTyxnQkFBckIsSUFBeUMsT0FBTyxrQkFBM0QsQ0FBN0I7QUFDQSxVQUFRLEdBQVIsQ0FBWSxzQkFBWjtBQUNBLE1BQUksb0JBQW9CLE9BQU8sZ0JBQVAsQ0FBd0Isc0JBQXhCLENBQXhCOztBQUVBLHNCQUFvQixpQkFBcEI7QUFDQSxrQkFBZ0IsaUJBQWhCO0FBQ0EsYUFBVyxRQUFYLEVBQXFCLE9BQU8sa0JBQTVCO0FBQ0EsVUFBUSxHQUFSLENBQVksc0JBQVo7QUFFSTs7QUFFRCxVQUFTLGdCQUFULENBQTBCLEtBQTFCLEVBQWlDLENBQUU7OztBQUduQyxVQUFTLGdCQUFULENBQTBCLGNBQTFCLEVBQTBDLFVBQVMsS0FBVCxFQUFnQjtBQUM3RCxVQUFRLEdBQVIsQ0FBWSxtQkFBbUIsS0FBSyxTQUFMLENBQWUsTUFBTSxNQUFyQixDQUEvQjtBQUNJLEVBRkQ7QUFHQSxVQUFTLGdCQUFULENBQTBCLGVBQTFCLEVBQTJDLFVBQVMsS0FBVCxFQUFnQjtBQUM5RCxVQUFRLEdBQVIsQ0FBWSxtQkFBbUIsS0FBSyxTQUFMLENBQWUsTUFBTSxNQUFyQixDQUEvQjtBQUNJLEVBRkQ7QUFHSCxDQTdFRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyohXG4gKiAgaG93bGVyLmpzIHYxLjEuMjlcbiAqICBob3dsZXJqcy5jb21cbiAqXG4gKiAgKGMpIDIwMTMtMjAxNiwgSmFtZXMgU2ltcHNvbiBvZiBHb2xkRmlyZSBTdHVkaW9zXG4gKiAgZ29sZGZpcmVzdHVkaW9zLmNvbVxuICpcbiAqICBNSVQgTGljZW5zZVxuICovXG4hZnVuY3Rpb24oKXt2YXIgZT17fSxvPW51bGwsbj0hMCxyPSExO3RyeXtcInVuZGVmaW5lZFwiIT10eXBlb2YgQXVkaW9Db250ZXh0P289bmV3IEF1ZGlvQ29udGV4dDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2Via2l0QXVkaW9Db250ZXh0P289bmV3IHdlYmtpdEF1ZGlvQ29udGV4dDpuPSExfWNhdGNoKHQpe249ITF9aWYoIW4paWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIEF1ZGlvKXRyeXtuZXcgQXVkaW99Y2F0Y2godCl7cj0hMH1lbHNlIHI9ITA7aWYobil7dmFyIGE9XCJ1bmRlZmluZWRcIj09dHlwZW9mIG8uY3JlYXRlR2Fpbj9vLmNyZWF0ZUdhaW5Ob2RlKCk6by5jcmVhdGVHYWluKCk7YS5nYWluLnZhbHVlPTEsYS5jb25uZWN0KG8uZGVzdGluYXRpb24pfXZhciBpPWZ1bmN0aW9uKGUpe3RoaXMuX3ZvbHVtZT0xLHRoaXMuX211dGVkPSExLHRoaXMudXNpbmdXZWJBdWRpbz1uLHRoaXMuY3R4PW8sdGhpcy5ub0F1ZGlvPXIsdGhpcy5faG93bHM9W10sdGhpcy5fY29kZWNzPWUsdGhpcy5pT1NBdXRvRW5hYmxlPSEwfTtpLnByb3RvdHlwZT17dm9sdW1lOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7aWYoZT1wYXJzZUZsb2F0KGUpLGU+PTAmJjE+PWUpe28uX3ZvbHVtZT1lLG4mJihhLmdhaW4udmFsdWU9ZSk7Zm9yKHZhciByIGluIG8uX2hvd2xzKWlmKG8uX2hvd2xzLmhhc093blByb3BlcnR5KHIpJiZvLl9ob3dsc1tyXS5fd2ViQXVkaW89PT0hMSlmb3IodmFyIHQ9MDt0PG8uX2hvd2xzW3JdLl9hdWRpb05vZGUubGVuZ3RoO3QrKylvLl9ob3dsc1tyXS5fYXVkaW9Ob2RlW3RdLnZvbHVtZT1vLl9ob3dsc1tyXS5fdm9sdW1lKm8uX3ZvbHVtZTtyZXR1cm4gb31yZXR1cm4gbj9hLmdhaW4udmFsdWU6by5fdm9sdW1lfSxtdXRlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX3NldE11dGVkKCEwKSx0aGlzfSx1bm11dGU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fc2V0TXV0ZWQoITEpLHRoaXN9LF9zZXRNdXRlZDpmdW5jdGlvbihlKXt2YXIgbz10aGlzO28uX211dGVkPWUsbiYmKGEuZ2Fpbi52YWx1ZT1lPzA6by5fdm9sdW1lKTtmb3IodmFyIHIgaW4gby5faG93bHMpaWYoby5faG93bHMuaGFzT3duUHJvcGVydHkocikmJm8uX2hvd2xzW3JdLl93ZWJBdWRpbz09PSExKWZvcih2YXIgdD0wO3Q8by5faG93bHNbcl0uX2F1ZGlvTm9kZS5sZW5ndGg7dCsrKW8uX2hvd2xzW3JdLl9hdWRpb05vZGVbdF0ubXV0ZWQ9ZX0sY29kZWNzOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLl9jb2RlY3NbZV19LF9lbmFibGVpT1NBdWRpbzpmdW5jdGlvbigpe3ZhciBlPXRoaXM7aWYoIW98fCFlLl9pT1NFbmFibGVkJiYvaVBob25lfGlQYWR8aVBvZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpe2UuX2lPU0VuYWJsZWQ9ITE7dmFyIG49ZnVuY3Rpb24oKXt2YXIgcj1vLmNyZWF0ZUJ1ZmZlcigxLDEsMjIwNTApLHQ9by5jcmVhdGVCdWZmZXJTb3VyY2UoKTt0LmJ1ZmZlcj1yLHQuY29ubmVjdChvLmRlc3RpbmF0aW9uKSxcInVuZGVmaW5lZFwiPT10eXBlb2YgdC5zdGFydD90Lm5vdGVPbigwKTp0LnN0YXJ0KDApLHNldFRpbWVvdXQoZnVuY3Rpb24oKXsodC5wbGF5YmFja1N0YXRlPT09dC5QTEFZSU5HX1NUQVRFfHx0LnBsYXliYWNrU3RhdGU9PT10LkZJTklTSEVEX1NUQVRFKSYmKGUuX2lPU0VuYWJsZWQ9ITAsZS5pT1NBdXRvRW5hYmxlPSExLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIixuLCExKSl9LDApfTtyZXR1cm4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLG4sITEpLGV9fX07dmFyIHU9bnVsbCxkPXt9O3J8fCh1PW5ldyBBdWRpbyxkPXttcDM6ISF1LmNhblBsYXlUeXBlKFwiYXVkaW8vbXBlZztcIikucmVwbGFjZSgvXm5vJC8sXCJcIiksb3B1czohIXUuY2FuUGxheVR5cGUoJ2F1ZGlvL29nZzsgY29kZWNzPVwib3B1c1wiJykucmVwbGFjZSgvXm5vJC8sXCJcIiksb2dnOiEhdS5jYW5QbGF5VHlwZSgnYXVkaW8vb2dnOyBjb2RlY3M9XCJ2b3JiaXNcIicpLnJlcGxhY2UoL15ubyQvLFwiXCIpLHdhdjohIXUuY2FuUGxheVR5cGUoJ2F1ZGlvL3dhdjsgY29kZWNzPVwiMVwiJykucmVwbGFjZSgvXm5vJC8sXCJcIiksYWFjOiEhdS5jYW5QbGF5VHlwZShcImF1ZGlvL2FhYztcIikucmVwbGFjZSgvXm5vJC8sXCJcIiksbTRhOiEhKHUuY2FuUGxheVR5cGUoXCJhdWRpby94LW00YTtcIil8fHUuY2FuUGxheVR5cGUoXCJhdWRpby9tNGE7XCIpfHx1LmNhblBsYXlUeXBlKFwiYXVkaW8vYWFjO1wiKSkucmVwbGFjZSgvXm5vJC8sXCJcIiksbXA0OiEhKHUuY2FuUGxheVR5cGUoXCJhdWRpby94LW1wNDtcIil8fHUuY2FuUGxheVR5cGUoXCJhdWRpby9tcDQ7XCIpfHx1LmNhblBsYXlUeXBlKFwiYXVkaW8vYWFjO1wiKSkucmVwbGFjZSgvXm5vJC8sXCJcIiksd2ViYTohIXUuY2FuUGxheVR5cGUoJ2F1ZGlvL3dlYm07IGNvZGVjcz1cInZvcmJpc1wiJykucmVwbGFjZSgvXm5vJC8sXCJcIil9KTt2YXIgbD1uZXcgaShkKSxmPWZ1bmN0aW9uKGUpe3ZhciByPXRoaXM7ci5fYXV0b3BsYXk9ZS5hdXRvcGxheXx8ITEsci5fYnVmZmVyPWUuYnVmZmVyfHwhMSxyLl9kdXJhdGlvbj1lLmR1cmF0aW9ufHwwLHIuX2Zvcm1hdD1lLmZvcm1hdHx8bnVsbCxyLl9sb29wPWUubG9vcHx8ITEsci5fbG9hZGVkPSExLHIuX3Nwcml0ZT1lLnNwcml0ZXx8e30sci5fc3JjPWUuc3JjfHxcIlwiLHIuX3BvczNkPWUucG9zM2R8fFswLDAsLS41XSxyLl92b2x1bWU9dm9pZCAwIT09ZS52b2x1bWU/ZS52b2x1bWU6MSxyLl91cmxzPWUudXJsc3x8W10sci5fcmF0ZT1lLnJhdGV8fDEsci5fbW9kZWw9ZS5tb2RlbHx8bnVsbCxyLl9vbmxvYWQ9W2Uub25sb2FkfHxmdW5jdGlvbigpe31dLHIuX29ubG9hZGVycm9yPVtlLm9ubG9hZGVycm9yfHxmdW5jdGlvbigpe31dLHIuX29uZW5kPVtlLm9uZW5kfHxmdW5jdGlvbigpe31dLHIuX29ucGF1c2U9W2Uub25wYXVzZXx8ZnVuY3Rpb24oKXt9XSxyLl9vbnBsYXk9W2Uub25wbGF5fHxmdW5jdGlvbigpe31dLHIuX29uZW5kVGltZXI9W10sci5fd2ViQXVkaW89biYmIXIuX2J1ZmZlcixyLl9hdWRpb05vZGU9W10sci5fd2ViQXVkaW8mJnIuX3NldHVwQXVkaW9Ob2RlKCksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG8mJm8mJmwuaU9TQXV0b0VuYWJsZSYmbC5fZW5hYmxlaU9TQXVkaW8oKSxsLl9ob3dscy5wdXNoKHIpLHIubG9hZCgpfTtpZihmLnByb3RvdHlwZT17bG9hZDpmdW5jdGlvbigpe3ZhciBlPXRoaXMsbz1udWxsO2lmKHIpcmV0dXJuIHZvaWQgZS5vbihcImxvYWRlcnJvclwiLG5ldyBFcnJvcihcIk5vIGF1ZGlvIHN1cHBvcnQuXCIpKTtmb3IodmFyIG49MDtuPGUuX3VybHMubGVuZ3RoO24rKyl7dmFyIHQsYTtpZihlLl9mb3JtYXQpdD1lLl9mb3JtYXQ7ZWxzZXtpZihhPWUuX3VybHNbbl0sdD0vXmRhdGE6YXVkaW9cXC8oW147LF0rKTsvaS5leGVjKGEpLHR8fCh0PS9cXC4oW14uXSspJC8uZXhlYyhhLnNwbGl0KFwiP1wiLDEpWzBdKSksIXQpcmV0dXJuIHZvaWQgZS5vbihcImxvYWRlcnJvclwiLG5ldyBFcnJvcihcIkNvdWxkIG5vdCBleHRyYWN0IGZvcm1hdCBmcm9tIHBhc3NlZCBVUkxzLCBwbGVhc2UgYWRkIGZvcm1hdCBwYXJhbWV0ZXIuXCIpKTt0PXRbMV0udG9Mb3dlckNhc2UoKX1pZihkW3RdKXtvPWUuX3VybHNbbl07YnJlYWt9fWlmKCFvKXJldHVybiB2b2lkIGUub24oXCJsb2FkZXJyb3JcIixuZXcgRXJyb3IoXCJObyBjb2RlYyBzdXBwb3J0IGZvciBzZWxlY3RlZCBhdWRpbyBzb3VyY2VzLlwiKSk7aWYoZS5fc3JjPW8sZS5fd2ViQXVkaW8pcyhlLG8pO2Vsc2V7dmFyIHU9bmV3IEF1ZGlvO3UuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsZnVuY3Rpb24oKXt1LmVycm9yJiY0PT09dS5lcnJvci5jb2RlJiYoaS5ub0F1ZGlvPSEwKSxlLm9uKFwibG9hZGVycm9yXCIse3R5cGU6dS5lcnJvcj91LmVycm9yLmNvZGU6MH0pfSwhMSksZS5fYXVkaW9Ob2RlLnB1c2godSksdS5zcmM9byx1Ll9wb3M9MCx1LnByZWxvYWQ9XCJhdXRvXCIsdS52b2x1bWU9bC5fbXV0ZWQ/MDplLl92b2x1bWUqbC52b2x1bWUoKTt2YXIgZj1mdW5jdGlvbigpe2UuX2R1cmF0aW9uPU1hdGguY2VpbCgxMCp1LmR1cmF0aW9uKS8xMCwwPT09T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZS5fc3ByaXRlKS5sZW5ndGgmJihlLl9zcHJpdGU9e19kZWZhdWx0OlswLDFlMyplLl9kdXJhdGlvbl19KSxlLl9sb2FkZWR8fChlLl9sb2FkZWQ9ITAsZS5vbihcImxvYWRcIikpLGUuX2F1dG9wbGF5JiZlLnBsYXkoKSx1LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5dGhyb3VnaFwiLGYsITEpfTt1LmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5dGhyb3VnaFwiLGYsITEpLHUubG9hZCgpfXJldHVybiBlfSx1cmxzOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7cmV0dXJuIGU/KG8uc3RvcCgpLG8uX3VybHM9XCJzdHJpbmdcIj09dHlwZW9mIGU/W2VdOmUsby5fbG9hZGVkPSExLG8ubG9hZCgpLG8pOm8uX3VybHN9LHBsYXk6ZnVuY3Rpb24oZSxuKXt2YXIgcj10aGlzO3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJihuPWUpLGUmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIGV8fChlPVwiX2RlZmF1bHRcIiksci5fbG9hZGVkP3IuX3Nwcml0ZVtlXT8oci5faW5hY3RpdmVOb2RlKGZ1bmN0aW9uKHQpe3QuX3Nwcml0ZT1lO3ZhciBhPXQuX3Bvcz4wP3QuX3BvczpyLl9zcHJpdGVbZV1bMF0vMWUzLGk9MDtyLl93ZWJBdWRpbz8oaT1yLl9zcHJpdGVbZV1bMV0vMWUzLXQuX3Bvcyx0Ll9wb3M+MCYmKGE9ci5fc3ByaXRlW2VdWzBdLzFlMythKSk6aT1yLl9zcHJpdGVbZV1bMV0vMWUzLShhLXIuX3Nwcml0ZVtlXVswXS8xZTMpO3ZhciB1LGQ9ISghci5fbG9vcCYmIXIuX3Nwcml0ZVtlXVsyXSksZj1cInN0cmluZ1wiPT10eXBlb2Ygbj9uOk1hdGgucm91bmQoRGF0ZS5ub3coKSpNYXRoLnJhbmRvbSgpKStcIlwiO2lmKGZ1bmN0aW9uKCl7dmFyIG89e2lkOmYsc3ByaXRlOmUsbG9vcDpkfTt1PXNldFRpbWVvdXQoZnVuY3Rpb24oKXshci5fd2ViQXVkaW8mJmQmJnIuc3RvcChvLmlkKS5wbGF5KGUsby5pZCksci5fd2ViQXVkaW8mJiFkJiYoci5fbm9kZUJ5SWQoby5pZCkucGF1c2VkPSEwLHIuX25vZGVCeUlkKG8uaWQpLl9wb3M9MCxyLl9jbGVhckVuZFRpbWVyKG8uaWQpKSxyLl93ZWJBdWRpb3x8ZHx8ci5zdG9wKG8uaWQpLHIub24oXCJlbmRcIixmKX0saS9yLl9yYXRlKjFlMyksci5fb25lbmRUaW1lci5wdXNoKHt0aW1lcjp1LGlkOm8uaWR9KX0oKSxyLl93ZWJBdWRpbyl7dmFyIHM9ci5fc3ByaXRlW2VdWzBdLzFlMyxfPXIuX3Nwcml0ZVtlXVsxXS8xZTM7dC5pZD1mLHQucGF1c2VkPSExLHAocixbZCxzLF9dLGYpLHIuX3BsYXlTdGFydD1vLmN1cnJlbnRUaW1lLHQuZ2Fpbi52YWx1ZT1yLl92b2x1bWUsXCJ1bmRlZmluZWRcIj09dHlwZW9mIHQuYnVmZmVyU291cmNlLnN0YXJ0P2Q/dC5idWZmZXJTb3VyY2Uubm90ZUdyYWluT24oMCxhLDg2NDAwKTp0LmJ1ZmZlclNvdXJjZS5ub3RlR3JhaW5PbigwLGEsaSk6ZD90LmJ1ZmZlclNvdXJjZS5zdGFydCgwLGEsODY0MDApOnQuYnVmZmVyU291cmNlLnN0YXJ0KDAsYSxpKX1lbHNle2lmKDQhPT10LnJlYWR5U3RhdGUmJih0LnJlYWR5U3RhdGV8fCFuYXZpZ2F0b3IuaXNDb2Nvb25KUykpcmV0dXJuIHIuX2NsZWFyRW5kVGltZXIoZiksZnVuY3Rpb24oKXt2YXIgbz1yLGE9ZSxpPW4sdT10LGQ9ZnVuY3Rpb24oKXtvLnBsYXkoYSxpKSx1LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5dGhyb3VnaFwiLGQsITEpfTt1LmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5dGhyb3VnaFwiLGQsITEpfSgpLHI7dC5yZWFkeVN0YXRlPTQsdC5pZD1mLHQuY3VycmVudFRpbWU9YSx0Lm11dGVkPWwuX211dGVkfHx0Lm11dGVkLHQudm9sdW1lPXIuX3ZvbHVtZSpsLnZvbHVtZSgpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXt0LnBsYXkoKX0sMCl9cmV0dXJuIHIub24oXCJwbGF5XCIpLFwiZnVuY3Rpb25cIj09dHlwZW9mIG4mJm4oZikscn0pLHIpOihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuJiZuKCkscik6KHIub24oXCJsb2FkXCIsZnVuY3Rpb24oKXtyLnBsYXkoZSxuKX0pLHIpfSxwYXVzZTpmdW5jdGlvbihlKXt2YXIgbz10aGlzO2lmKCFvLl9sb2FkZWQpcmV0dXJuIG8ub24oXCJwbGF5XCIsZnVuY3Rpb24oKXtvLnBhdXNlKGUpfSksbztvLl9jbGVhckVuZFRpbWVyKGUpO3ZhciBuPWU/by5fbm9kZUJ5SWQoZSk6by5fYWN0aXZlTm9kZSgpO2lmKG4paWYobi5fcG9zPW8ucG9zKG51bGwsZSksby5fd2ViQXVkaW8pe2lmKCFuLmJ1ZmZlclNvdXJjZXx8bi5wYXVzZWQpcmV0dXJuIG87bi5wYXVzZWQ9ITAsXCJ1bmRlZmluZWRcIj09dHlwZW9mIG4uYnVmZmVyU291cmNlLnN0b3A/bi5idWZmZXJTb3VyY2Uubm90ZU9mZigwKTpuLmJ1ZmZlclNvdXJjZS5zdG9wKDApfWVsc2Ugbi5wYXVzZSgpO3JldHVybiBvLm9uKFwicGF1c2VcIiksb30sc3RvcDpmdW5jdGlvbihlKXt2YXIgbz10aGlzO2lmKCFvLl9sb2FkZWQpcmV0dXJuIG8ub24oXCJwbGF5XCIsZnVuY3Rpb24oKXtvLnN0b3AoZSl9KSxvO28uX2NsZWFyRW5kVGltZXIoZSk7dmFyIG49ZT9vLl9ub2RlQnlJZChlKTpvLl9hY3RpdmVOb2RlKCk7aWYobilpZihuLl9wb3M9MCxvLl93ZWJBdWRpbyl7aWYoIW4uYnVmZmVyU291cmNlfHxuLnBhdXNlZClyZXR1cm4gbztuLnBhdXNlZD0hMCxcInVuZGVmaW5lZFwiPT10eXBlb2Ygbi5idWZmZXJTb3VyY2Uuc3RvcD9uLmJ1ZmZlclNvdXJjZS5ub3RlT2ZmKDApOm4uYnVmZmVyU291cmNlLnN0b3AoMCl9ZWxzZSBpc05hTihuLmR1cmF0aW9uKXx8KG4ucGF1c2UoKSxuLmN1cnJlbnRUaW1lPTApO3JldHVybiBvfSxtdXRlOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7aWYoIW8uX2xvYWRlZClyZXR1cm4gby5vbihcInBsYXlcIixmdW5jdGlvbigpe28ubXV0ZShlKX0pLG87dmFyIG49ZT9vLl9ub2RlQnlJZChlKTpvLl9hY3RpdmVOb2RlKCk7cmV0dXJuIG4mJihvLl93ZWJBdWRpbz9uLmdhaW4udmFsdWU9MDpuLm11dGVkPSEwKSxvfSx1bm11dGU6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcztpZighby5fbG9hZGVkKXJldHVybiBvLm9uKFwicGxheVwiLGZ1bmN0aW9uKCl7by51bm11dGUoZSl9KSxvO3ZhciBuPWU/by5fbm9kZUJ5SWQoZSk6by5fYWN0aXZlTm9kZSgpO3JldHVybiBuJiYoby5fd2ViQXVkaW8/bi5nYWluLnZhbHVlPW8uX3ZvbHVtZTpuLm11dGVkPSExKSxvfSx2b2x1bWU6ZnVuY3Rpb24oZSxvKXt2YXIgbj10aGlzO2lmKGU9cGFyc2VGbG9hdChlKSxlPj0wJiYxPj1lKXtpZihuLl92b2x1bWU9ZSwhbi5fbG9hZGVkKXJldHVybiBuLm9uKFwicGxheVwiLGZ1bmN0aW9uKCl7bi52b2x1bWUoZSxvKX0pLG47dmFyIHI9bz9uLl9ub2RlQnlJZChvKTpuLl9hY3RpdmVOb2RlKCk7cmV0dXJuIHImJihuLl93ZWJBdWRpbz9yLmdhaW4udmFsdWU9ZTpyLnZvbHVtZT1lKmwudm9sdW1lKCkpLG59cmV0dXJuIG4uX3ZvbHVtZX0sbG9vcDpmdW5jdGlvbihlKXt2YXIgbz10aGlzO3JldHVyblwiYm9vbGVhblwiPT10eXBlb2YgZT8oby5fbG9vcD1lLG8pOm8uX2xvb3B9LHNwcml0ZTpmdW5jdGlvbihlKXt2YXIgbz10aGlzO3JldHVyblwib2JqZWN0XCI9PXR5cGVvZiBlPyhvLl9zcHJpdGU9ZSxvKTpvLl9zcHJpdGV9LHBvczpmdW5jdGlvbihlLG4pe3ZhciByPXRoaXM7aWYoIXIuX2xvYWRlZClyZXR1cm4gci5vbihcImxvYWRcIixmdW5jdGlvbigpe3IucG9zKGUpfSksXCJudW1iZXJcIj09dHlwZW9mIGU/cjpyLl9wb3N8fDA7ZT1wYXJzZUZsb2F0KGUpO3ZhciB0PW4/ci5fbm9kZUJ5SWQobik6ci5fYWN0aXZlTm9kZSgpO2lmKHQpcmV0dXJuIGU+PTA/KHIucGF1c2UobiksdC5fcG9zPWUsci5wbGF5KHQuX3Nwcml0ZSxuKSxyKTpyLl93ZWJBdWRpbz90Ll9wb3MrKG8uY3VycmVudFRpbWUtci5fcGxheVN0YXJ0KTp0LmN1cnJlbnRUaW1lO2lmKGU+PTApcmV0dXJuIHI7Zm9yKHZhciBhPTA7YTxyLl9hdWRpb05vZGUubGVuZ3RoO2ErKylpZihyLl9hdWRpb05vZGVbYV0ucGF1c2VkJiY0PT09ci5fYXVkaW9Ob2RlW2FdLnJlYWR5U3RhdGUpcmV0dXJuIHIuX3dlYkF1ZGlvP3IuX2F1ZGlvTm9kZVthXS5fcG9zOnIuX2F1ZGlvTm9kZVthXS5jdXJyZW50VGltZX0scG9zM2Q6ZnVuY3Rpb24oZSxvLG4scil7dmFyIHQ9dGhpcztpZihvPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBvJiZvP286MCxuPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBuJiZuP246LS41LCF0Ll9sb2FkZWQpcmV0dXJuIHQub24oXCJwbGF5XCIsZnVuY3Rpb24oKXt0LnBvczNkKGUsbyxuLHIpfSksdDtpZighKGU+PTB8fDA+ZSkpcmV0dXJuIHQuX3BvczNkO2lmKHQuX3dlYkF1ZGlvKXt2YXIgYT1yP3QuX25vZGVCeUlkKHIpOnQuX2FjdGl2ZU5vZGUoKTthJiYodC5fcG9zM2Q9W2UsbyxuXSxhLnBhbm5lci5zZXRQb3NpdGlvbihlLG8sbiksYS5wYW5uZXIucGFubmluZ01vZGVsPXQuX21vZGVsfHxcIkhSVEZcIil9cmV0dXJuIHR9LGZhZGU6ZnVuY3Rpb24oZSxvLG4scix0KXt2YXIgYT10aGlzLGk9TWF0aC5hYnMoZS1vKSx1PWU+bz9cImRvd25cIjpcInVwXCIsZD1pLy4wMSxsPW4vZDtpZighYS5fbG9hZGVkKXJldHVybiBhLm9uKFwibG9hZFwiLGZ1bmN0aW9uKCl7YS5mYWRlKGUsbyxuLHIsdCl9KSxhO2Eudm9sdW1lKGUsdCk7Zm9yKHZhciBmPTE7ZD49ZjtmKyspIWZ1bmN0aW9uKCl7dmFyIGU9YS5fdm9sdW1lKyhcInVwXCI9PT11Py4wMTotLjAxKSpmLG49TWF0aC5yb3VuZCgxZTMqZSkvMWUzLGk9bztzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YS52b2x1bWUobix0KSxuPT09aSYmciYmcigpfSxsKmYpfSgpfSxmYWRlSW46ZnVuY3Rpb24oZSxvLG4pe3JldHVybiB0aGlzLnZvbHVtZSgwKS5wbGF5KCkuZmFkZSgwLGUsbyxuKX0sZmFkZU91dDpmdW5jdGlvbihlLG8sbixyKXt2YXIgdD10aGlzO3JldHVybiB0LmZhZGUodC5fdm9sdW1lLGUsbyxmdW5jdGlvbigpe24mJm4oKSx0LnBhdXNlKHIpLHQub24oXCJlbmRcIil9LHIpfSxfbm9kZUJ5SWQ6ZnVuY3Rpb24oZSl7Zm9yKHZhciBvPXRoaXMsbj1vLl9hdWRpb05vZGVbMF0scj0wO3I8by5fYXVkaW9Ob2RlLmxlbmd0aDtyKyspaWYoby5fYXVkaW9Ob2RlW3JdLmlkPT09ZSl7bj1vLl9hdWRpb05vZGVbcl07YnJlYWt9cmV0dXJuIG59LF9hY3RpdmVOb2RlOmZ1bmN0aW9uKCl7Zm9yKHZhciBlPXRoaXMsbz1udWxsLG49MDtuPGUuX2F1ZGlvTm9kZS5sZW5ndGg7bisrKWlmKCFlLl9hdWRpb05vZGVbbl0ucGF1c2VkKXtvPWUuX2F1ZGlvTm9kZVtuXTticmVha31yZXR1cm4gZS5fZHJhaW5Qb29sKCksb30sX2luYWN0aXZlTm9kZTpmdW5jdGlvbihlKXtmb3IodmFyIG89dGhpcyxuPW51bGwscj0wO3I8by5fYXVkaW9Ob2RlLmxlbmd0aDtyKyspaWYoby5fYXVkaW9Ob2RlW3JdLnBhdXNlZCYmND09PW8uX2F1ZGlvTm9kZVtyXS5yZWFkeVN0YXRlKXtlKG8uX2F1ZGlvTm9kZVtyXSksbj0hMDticmVha31pZihvLl9kcmFpblBvb2woKSwhbil7dmFyIHQ7aWYoby5fd2ViQXVkaW8pdD1vLl9zZXR1cEF1ZGlvTm9kZSgpLGUodCk7ZWxzZXtvLmxvYWQoKSx0PW8uX2F1ZGlvTm9kZVtvLl9hdWRpb05vZGUubGVuZ3RoLTFdO3ZhciBhPW5hdmlnYXRvci5pc0NvY29vbkpTP1wiY2FucGxheXRocm91Z2hcIjpcImxvYWRlZG1ldGFkYXRhXCIsaT1mdW5jdGlvbigpe3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihhLGksITEpLGUodCl9O3QuYWRkRXZlbnRMaXN0ZW5lcihhLGksITEpfX19LF9kcmFpblBvb2w6ZnVuY3Rpb24oKXt2YXIgZSxvPXRoaXMsbj0wO2ZvcihlPTA7ZTxvLl9hdWRpb05vZGUubGVuZ3RoO2UrKylvLl9hdWRpb05vZGVbZV0ucGF1c2VkJiZuKys7Zm9yKGU9by5fYXVkaW9Ob2RlLmxlbmd0aC0xO2U+PTAmJiEoNT49bik7ZS0tKW8uX2F1ZGlvTm9kZVtlXS5wYXVzZWQmJihvLl93ZWJBdWRpbyYmby5fYXVkaW9Ob2RlW2VdLmRpc2Nvbm5lY3QoMCksbi0tLG8uX2F1ZGlvTm9kZS5zcGxpY2UoZSwxKSl9LF9jbGVhckVuZFRpbWVyOmZ1bmN0aW9uKGUpe2Zvcih2YXIgbz10aGlzLG49LTEscj0wO3I8by5fb25lbmRUaW1lci5sZW5ndGg7cisrKWlmKG8uX29uZW5kVGltZXJbcl0uaWQ9PT1lKXtuPXI7YnJlYWt9dmFyIHQ9by5fb25lbmRUaW1lcltuXTt0JiYoY2xlYXJUaW1lb3V0KHQudGltZXIpLG8uX29uZW5kVGltZXIuc3BsaWNlKG4sMSkpfSxfc2V0dXBBdWRpb05vZGU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLG49ZS5fYXVkaW9Ob2RlLHI9ZS5fYXVkaW9Ob2RlLmxlbmd0aDtyZXR1cm4gbltyXT1cInVuZGVmaW5lZFwiPT10eXBlb2Ygby5jcmVhdGVHYWluP28uY3JlYXRlR2Fpbk5vZGUoKTpvLmNyZWF0ZUdhaW4oKSxuW3JdLmdhaW4udmFsdWU9ZS5fdm9sdW1lLG5bcl0ucGF1c2VkPSEwLG5bcl0uX3Bvcz0wLG5bcl0ucmVhZHlTdGF0ZT00LG5bcl0uY29ubmVjdChhKSxuW3JdLnBhbm5lcj1vLmNyZWF0ZVBhbm5lcigpLG5bcl0ucGFubmVyLnBhbm5pbmdNb2RlbD1lLl9tb2RlbHx8XCJlcXVhbHBvd2VyXCIsbltyXS5wYW5uZXIuc2V0UG9zaXRpb24oZS5fcG9zM2RbMF0sZS5fcG9zM2RbMV0sZS5fcG9zM2RbMl0pLG5bcl0ucGFubmVyLmNvbm5lY3QobltyXSksbltyXX0sb246ZnVuY3Rpb24oZSxvKXt2YXIgbj10aGlzLHI9bltcIl9vblwiK2VdO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG8pci5wdXNoKG8pO2Vsc2UgZm9yKHZhciB0PTA7dDxyLmxlbmd0aDt0Kyspbz9yW3RdLmNhbGwobixvKTpyW3RdLmNhbGwobik7cmV0dXJuIG59LG9mZjpmdW5jdGlvbihlLG8pe3ZhciBuPXRoaXMscj1uW1wiX29uXCIrZV07aWYobyl7Zm9yKHZhciB0PTA7dDxyLmxlbmd0aDt0KyspaWYobz09PXJbdF0pe3Iuc3BsaWNlKHQsMSk7YnJlYWt9fWVsc2UgbltcIl9vblwiK2VdPVtdO3JldHVybiBufSx1bmxvYWQ6ZnVuY3Rpb24oKXtmb3IodmFyIG89dGhpcyxuPW8uX2F1ZGlvTm9kZSxyPTA7cjxvLl9hdWRpb05vZGUubGVuZ3RoO3IrKyluW3JdLnBhdXNlZHx8KG8uc3RvcChuW3JdLmlkKSxvLm9uKFwiZW5kXCIsbltyXS5pZCkpLG8uX3dlYkF1ZGlvP25bcl0uZGlzY29ubmVjdCgwKTpuW3JdLnNyYz1cIlwiO2ZvcihyPTA7cjxvLl9vbmVuZFRpbWVyLmxlbmd0aDtyKyspY2xlYXJUaW1lb3V0KG8uX29uZW5kVGltZXJbcl0udGltZXIpO3ZhciB0PWwuX2hvd2xzLmluZGV4T2Yobyk7bnVsbCE9PXQmJnQ+PTAmJmwuX2hvd2xzLnNwbGljZSh0LDEpLGRlbGV0ZSBlW28uX3NyY10sbz1udWxsfX0sbil2YXIgcz1mdW5jdGlvbihvLG4pe2lmKG4gaW4gZSlyZXR1cm4gby5fZHVyYXRpb249ZVtuXS5kdXJhdGlvbix2b2lkIGMobyk7aWYoL15kYXRhOlteO10rO2Jhc2U2NCwvLnRlc3Qobikpe2Zvcih2YXIgcj1hdG9iKG4uc3BsaXQoXCIsXCIpWzFdKSx0PW5ldyBVaW50OEFycmF5KHIubGVuZ3RoKSxhPTA7YTxyLmxlbmd0aDsrK2EpdFthXT1yLmNoYXJDb2RlQXQoYSk7Xyh0LmJ1ZmZlcixvLG4pfWVsc2V7dmFyIGk9bmV3IFhNTEh0dHBSZXF1ZXN0O2kub3BlbihcIkdFVFwiLG4sITApLGkucmVzcG9uc2VUeXBlPVwiYXJyYXlidWZmZXJcIixpLm9ubG9hZD1mdW5jdGlvbigpe18oaS5yZXNwb25zZSxvLG4pfSxpLm9uZXJyb3I9ZnVuY3Rpb24oKXtvLl93ZWJBdWRpbyYmKG8uX2J1ZmZlcj0hMCxvLl93ZWJBdWRpbz0hMSxvLl9hdWRpb05vZGU9W10sZGVsZXRlIG8uX2dhaW5Ob2RlLGRlbGV0ZSBlW25dLG8ubG9hZCgpKX07dHJ5e2kuc2VuZCgpfWNhdGNoKHUpe2kub25lcnJvcigpfX19LF89ZnVuY3Rpb24obixyLHQpe28uZGVjb2RlQXVkaW9EYXRhKG4sZnVuY3Rpb24obyl7byYmKGVbdF09byxjKHIsbykpfSxmdW5jdGlvbihlKXtyLm9uKFwibG9hZGVycm9yXCIsZSl9KX0sYz1mdW5jdGlvbihlLG8pe2UuX2R1cmF0aW9uPW8/by5kdXJhdGlvbjplLl9kdXJhdGlvbiwwPT09T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZS5fc3ByaXRlKS5sZW5ndGgmJihlLl9zcHJpdGU9e19kZWZhdWx0OlswLDFlMyplLl9kdXJhdGlvbl19KSxlLl9sb2FkZWR8fChlLl9sb2FkZWQ9ITAsZS5vbihcImxvYWRcIikpLGUuX2F1dG9wbGF5JiZlLnBsYXkoKX0scD1mdW5jdGlvbihuLHIsdCl7dmFyIGE9bi5fbm9kZUJ5SWQodCk7YS5idWZmZXJTb3VyY2U9by5jcmVhdGVCdWZmZXJTb3VyY2UoKSxhLmJ1ZmZlclNvdXJjZS5idWZmZXI9ZVtuLl9zcmNdLGEuYnVmZmVyU291cmNlLmNvbm5lY3QoYS5wYW5uZXIpLGEuYnVmZmVyU291cmNlLmxvb3A9clswXSxyWzBdJiYoYS5idWZmZXJTb3VyY2UubG9vcFN0YXJ0PXJbMV0sYS5idWZmZXJTb3VyY2UubG9vcEVuZD1yWzFdK3JbMl0pLGEuYnVmZmVyU291cmNlLnBsYXliYWNrUmF0ZS52YWx1ZT1uLl9yYXRlfTtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQmJmRlZmluZShmdW5jdGlvbigpe3JldHVybntIb3dsZXI6bCxIb3dsOmZ9fSksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGV4cG9ydHMmJihleHBvcnRzLkhvd2xlcj1sLGV4cG9ydHMuSG93bD1mKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiYod2luZG93Lkhvd2xlcj1sLHdpbmRvdy5Ib3dsPWYpfSgpO1xuXG47XG4vL1xuLy9cdFV0aWxzXG4vL1xuLy8gKiBhbmltYXRlKGNiLCBkdXJhdG9uKSAtLSB3cmFwcGVyIG9mIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuLy9cbi8vIERPTSBtYW5pcHVsYXRpb25zXG4vL1xuLy8gKiBjbG9zZVBvcHVwKGV2ZW50KSAtLSBjbG9zZSBwb3B1cCB3aXRoIHVzZXJzIHVuaXF1ZSBjb2RlXG4vLyAqIG9uVm9sdW1lQnRuQ2xpY2soZXZlbnQpIC0tIGhhbmRsZXIgZm9yIHZvbHVtZSBidXR0b25zIGNsaWNrcyAobXV0ZS91bm11dGUgdHJpZ2dlcilcbi8vICogb25Wb2x1bWVTbGlkZXJJbnB1dChldmVudCkgLS0gY2hhbmdlIGF1ZGlvIHZvbHVtZSB3aGVudm9sdW1lIHNsaWRlciBpcyBiZWluZyBtb3ZlZFxuLy8gKiB1cGRhdGVTY29yZShudW1iZXIpIC0tIHVwZGF0ZSBjdXJyZW50IHNjb3JlXG4vL1xuLy9cdENhbnZhc1xuLy9cbi8vICogcmVmcmVzaENvbXB1dGVkU2l6ZXMob2JqZWN0KSAtLSBjaGFuZ2UgPGNhbnZhcz4gc2l6ZXMgdG8gYWN0dWFsXG4vLyAqIGFkZE1vdmVtZW50T25DYW52YXMobW92ZW1lbnRJbmZvKSAtLSBhZGQgbmV3IG1vdmVtZW50IGNhbnZhcy1vYmplY3Rcbi8vICogYW5pbWF0ZU1vdmVtZW50KG9iamVjdCkgLS0gbWFrZSByZWNpZXZlZCBhbHJlYWR5IGFkZGVkIG1vdmVtZW50IHJ1biAoYW5pbWF0ZSlcbi8vICogb25BZ1NldHVwRXZlbnQoZXZlbnQpIC0tIGhhbmRsZXIgZm9yIGV2ZW50LCBmaXJlZCB3aGVuIGdhbWUgc2V0dGluZ3MgYXJlIHJlY2lldmVkXG4vL1xuLy8gVG8gcmVtb3ZlXG4vL1xuLy8gKiBzdGFydCgpIC0tIHN0YXJ0IGdhbWVcbi8vICogbmV4dEJlYXQoaXNGaXJzdCkgLS0gcHJvY2VzcyAoYW5kIGFkZCkgbmV4dCBtb3ZlbWVudFxuLy9cbi8vIEluaXRpYWxpemF0aW9uXG4vL1xuXG5cbihmdW5jdGlvbigpe1xuXG5mdW5jdGlvbiBhbmltYXRlKGRyYXcsIGR1cmF0aW9uKSB7XG4gIHZhciBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiBhbmltYXRlKHRpbWUpIHtcbiAgICAvLyDQvtC/0YDQtdC00LXQu9C40YLRjCwg0YHQutC+0LvRjNC60L4g0L/RgNC+0YjQu9C+INCy0YDQtdC80LXQvdC4INGBINC90LDRh9Cw0LvQsCDQsNC90LjQvNCw0YbQuNC4XG4gICAgdmFyIHRpbWVQYXNzZWQgPSB0aW1lIC0gc3RhcnQ7XG5cbiAgICAvLyDQstC+0LfQvNC+0LbQvdC+INC90LXQsdC+0LvRjNGI0L7QtSDQv9GA0LXQstGL0YjQtdC90LjQtSDQstGA0LXQvNC10L3QuCwg0LIg0Y3RgtC+0Lwg0YHQu9GD0YfQsNC1INC30LDRhNC40LrRgdC40YDQvtCy0LDRgtGMINC60L7QvdC10YZcbiAgICBpZiAodGltZVBhc3NlZCA+IGR1cmF0aW9uKSB0aW1lUGFzc2VkID0gZHVyYXRpb247XG5cbiAgICAvLyDQvdCw0YDQuNGB0L7QstCw0YLRjCDRgdC+0YHRgtC+0Y/QvdC40LUg0LDQvdC40LzQsNGG0LjQuCDQsiDQvNC+0LzQtdC90YIgdGltZVBhc3NlZFxuICAgIGRyYXcodGltZVBhc3NlZCk7XG5cbiAgICAvLyDQtdGB0LvQuCDQstGA0LXQvNGPINCw0L3QuNC80LDRhtC40Lgg0L3QtSDQt9Cw0LrQvtC90YfQuNC70L7RgdGMIC0g0LfQsNC/0LvQsNC90LjRgNC+0LLQsNGC0Ywg0LXRidGRINC60LDQtNGAXG4gICAgaWYgKHRpbWVQYXNzZWQgPCBkdXJhdGlvbikge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICAgIH1cblxuICB9KTtcbn1cblxuXG52YXIgY29uZmlnID0ge1xuXHRjb2xvcnM6IHtcblx0XHRuZXV0cmFsOiAnI0ZGQTcwMCcsIC8vICM4RDk5QUUgIzEwN0U3RFxuXHRcdHN1Y2Nlc3M6ICcjQzJFODEyJyxcblx0XHRmYWlsOiAnI0I4MEMwOSdcblx0fSxcblx0bW92ZW1lbnRzOiB7XG5cdFx0cmFkaXVzUGVyY2VudDogNCxcblx0XHRzdHJva2VXaWR0aFBlcmNlbnQ6IDAuNVxuXHR9XG59XG5cbmZ1bmN0aW9uIGNsb3NlUG9wdXAoZXZlbnQpIHtcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvcHVwJylbMF0uY2xhc3NMaXN0LmFkZCgnY2xvc2VkJylcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxvZ28nKVswXS5jbGFzc0xpc3QucmVtb3ZlKCd3aXRoLXBvcHVwJylcbn1cblxuLy8gTXV0ZXMgLyB1bm11dGVzIGF1ZGlvXG5mdW5jdGlvbiBvblZvbHVtZUJ0bkNsaWNrKGV2ZW50KSB7XG5cblx0aWYgKCFjb25maWcuY3VycmVudEF1ZGlvLm11dGVkKSB7XG5cblx0XHQvLyBDaGFuZ2Ugdmlld1xuXHRcdHRoaXMuY2hpbGROb2Rlc1sxXS5jbGFzc0xpc3QucmVtb3ZlKCdmYS12b2x1bWUtdXAnKTtcblx0XHR0aGlzLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LmFkZCgnZmEtdm9sdW1lLW9mZicpO1xuXG5cdFx0Ly8gTXV0ZVxuXHRcdGNvbmZpZy5jdXJyZW50QXVkaW8ubXV0ZSgpO1xuXHRcdGNvbmZpZy5jdXJyZW50QXVkaW8ubXV0ZWQgPSB0cnVlO1xuXHR9IGVsc2Uge1xuXG5cdFx0Ly8gQ2hhbmdlIHZpZXdcblx0XHR0aGlzLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LnJlbW92ZSgnZmEtdm9sdW1lLW9mZicpO1xuXHRcdHRoaXMuY2hpbGROb2Rlc1sxXS5jbGFzc0xpc3QuYWRkKCdmYS12b2x1bWUtdXAnKTtcblxuXHRcdC8vIFVubXV0ZVxuXHRcdGNvbmZpZy5jdXJyZW50QXVkaW8udW5tdXRlKCk7XG5cdFx0Y29uZmlnLmN1cnJlbnRBdWRpby5tdXRlZCA9IGZhbHNlO1xuXHR9XG5cdGNvbnNvbGUubG9nKHRoaXMpO1xuXG59XG5cbi8vIENoYW5nZSB2b2x1bWUgbGV2ZWwgb2YgY3VycmVudCBhdWRpb1xuZnVuY3Rpb24gb25Wb2x1bWVTbGlkZXJJbnB1dChldmVudCkge1xuXHRjb25maWcuY3VycmVudEF1ZGlvLnZvbHVtZSh0aGlzLnZhbHVlLzEwMCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNjb3JlKGFkZCkge1xuXG5cdHZhciBzY29yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zY29yZScpWzBdO1xuXHR2YXIgc2NvcmVOdW1iZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2NvcmUtbnVtYmVyJylbMF07XG5cblx0c2NvcmUuY2xhc3NMaXN0LmFkZCgndXBkYXRlJyk7XG5cdHNldFRpbWVvdXQoKCk9Pnsgc2NvcmUuY2xhc3NMaXN0LnJlbW92ZSgndXBkYXRlJyk7IH0sIDQwMCk7XG5cblx0Y29uZmlnLmN1cnJlbnRTY29yZSArPSBwYXJzZUludChhZGQpO1xuXHRzY29yZU51bWJlci5pbm5lckhUTUwgPSBjb25maWcuY3VycmVudFNjb3JlO1xuXG5cdHJldHVybiBjb25maWcuY3VycmVudFNjb3JlO1xuXG59XG5cbi8vICoqKioqKioqKipcbi8vICogQ0FOVkFTICpcbi8vICoqKioqKioqKipcblxuLy8gQ2hhbmdlcyBjYW52YXMgYmFja2dyb3VuZCBzaXplIHdoZW4gZmlyZWRcbmZ1bmN0aW9uIHJlZnJlc2hDb21wdXRlZFNpemVzKG9iamVjdCkge1xuXHRcblx0Y29uZmlnLmNhbnZPcHRzLmNvbXB1dGVkU3R5bGUgPSB7XG5cdFx0d2lkdGg6ICtvYmplY3Qud2lkdGguc2xpY2UoMCwtMiksXG5cdFx0aGVpZ2h0OiArb2JqZWN0LmhlaWdodC5zbGljZSgwLC0yKVxuXHR9O1xuXG5cdGNhbnZhcy5zZXREaW1lbnNpb25zKHtcblx0XHR3aWR0aDogY29uZmlnLmNhbnZPcHRzLmNvbXB1dGVkU3R5bGUud2lkdGgsXG5cdFx0aGVpZ2h0OiBjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZS5oZWlnaHRcblx0fSk7XG5cbn1cblxuXG5mdW5jdGlvbiBhZGRNb3ZlbWVudE9uQ2FudmFzKG1vdmVtZW50SW5mbykge1xuXG5cdHZhciByYWRpdXMgPSBjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnJhZGl1cztcblx0dmFyIHN0cm9rZVdpZHRoID0gY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5zdHJva2VXaWR0aDtcblx0Ly8gdmFyIHggPSBNYXRoLnJvdW5kKGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLndpZHRoIC0gKGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLndpZHRoLzEwMCkqMykgLSByYWRpdXMqMjtcblx0dmFyIHggPSBNYXRoLnJvdW5kKGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLndpZHRoKTtcblx0dmFyIHkgPSBNYXRoLnJvdW5kKGNvbmZpZy5vbmVIUGVyY2VudCAqIDQ1KTtcblxuXHQvLyBjb25zb2xlLmxvZyh4ICsgJyAtICcgKyB5KTtcblxuXHR2YXIgbW92ZW1lbnQgPSBuZXcgZmFicmljLkNpcmNsZSh7XG5cdFx0ZmlsbDogbW92ZW1lbnRJbmZvLmNvbG9yLFxuXHRcdHN0cm9rZTogJyNGRkZGRkYnLFxuXHRcdHN0cm9rZVdpZHRoOiBzdHJva2VXaWR0aCxcblx0XHRyYWRpdXM6IHJhZGl1cyxcblx0XHQvLyByYWRpdXM6IDEwMCxcblx0XHR0b3A6IHksXG5cdFx0bGVmdDogeFxuXHRcdC8vIGxlZnQ6IDI2MlxuXHR9KTtcblxuXHRtb3ZlbWVudEluZm8uY2FudmFzT2JqZWN0ID0gbW92ZW1lbnRcblxuXHRjb25zb2xlLmxvZyhtb3ZlbWVudCk7XG5cdGNhbnZhcy5hZGQobW92ZW1lbnQpO1xuXHRjYW52YXMucmVuZGVyQWxsKCk7XG5cdC8vIG1vdmVtZW50SW5mby5zdGF0ZSA9ICdhZGRlZCc7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGVNb3ZlbWVudChtb3ZlbWVudEluZm8pIHtcblx0Ly8gbW92ZW1lbnRJbmZvLmNhbnZhc09iamVjdC5hbmltYXRlKCdsZWZ0JywgJycrKGNvbmZpZy5vbmVXUGVyY2VudCAqIDIwKSwge1xuXHQvLyBcdC8vIG9uQ2hhbmdlOiBjYW52YXMucmVuZGVyQWxsLmJpbmQoY2FudmFzKSxcblx0Ly8gXHRvbkNoYW5nZTogcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbnZhcy5yZW5kZXJBbGwuYmluZChjYW52YXMpLCAxMDApLFxuXHQvLyBcdC8vIGR1cmF0aW9uOiBjb25maWcuY3VycmVudE1pbkludGVydmFsKjE2XG5cdC8vIH0pO1xuXG5cdGFuaW1hdGUoZnVuY3Rpb24odGltZSl7XG5cdFx0bW92ZW1lbnRJbmZvLmNhbnZhc09iamVjdC5zZXRMZWZ0KCAodGltZS9jb25maWcuY3VycmVudE1pbkludGVydmFsKjE2KSArIGNvbmZpZy5vbmVXUGVyY2VudCoyMCApO1xuXHRcdGNhbnZhcy5yZW5kZXJBbGwuYmluZChjYW52YXMpO1xuXHR9LCBjb25maWcuY3VycmVudE1pbkludGVydmFsKjE2KTtcbn1cblxuXG4vLyBBY3Rpb25zIHBlcmZvcm1lZCB3aGVuIGN1cnJlbnQgZ2FtZSBzZXR0aW5ncyByZWNpZXZlZFxuZnVuY3Rpb24gb25BZ1NldHVwRXZlbnQoZXZlbnQpIHtcblxuXHRsZXQgYXVkaW9GaWxlVVJMID0gJ2h0dHA6Ly8nICsgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lICsgJy9zb25ncy8nICsgZXZlbnQuZGV0YWlsLnNvbmc7XG5cdC8vIGxldCBhdWRpb0ZpbGVVUkwgPSAnLi4vYXVkaW8vJyArIGV2ZW50LmRldGFpbC5zb25nO1xuXG5cdC8vIGNvbnNvbGUubG9nKGF1ZGlvRmlsZVVSTCk7XG5cblx0Y29uZmlnLmN1cnJlbnRBdWRpbyA9IG5ldyBIb3dsKHtcblx0XHR1cmxzOiBbYXVkaW9GaWxlVVJMXSxcblx0XHRhdXRvcGxheTogZmFsc2UsXG5cdFx0dm9sdW1lOiAwLjgsXG5cdH0pO1xuXG5cdGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzID0gZXZlbnQuZGV0YWlsLmNvbW1hbmRzLm1hcCgoY3VycmVudFZhbHVlLCBpbmRleCwgYXJyYXkpID0+IHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGluZGV4OiBpbmRleCxcblx0XHRcdFx0bmFtZTogY3VycmVudFZhbHVlLFxuXHRcdFx0XHRjb2xvcjogY29uZmlnLmNvbG9ycy5uZXV0cmFsLFxuXHRcdFx0fVxuXHR9KTtcblxuXHQvLyBCUE0sIG1pbkludGVydmFsLCBiZWdpbm5pbmcgb2Zmc2V0XG5cdC8vIGNvbmZpZy5jdXJyZW50QnBtID0gZXZlbnQuZGV0YWlsLmJwbTtcblx0Y29uZmlnLmN1cnJlbnRCcG0gPSAxMjg7XG5cdGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwgPSAoY29uZmlnLmN1cnJlbnRCcG0gKiAxMDAwKSAvICg2MCAqIDE2KTtcblx0Y29uZmlnLmN1cnJlbnRCZWdpbm5pbmdPZmZzZXQgPSBldmVudC5kZXRhaWwub2Zmc2V0O1xuXG5cdC8vIFRlc3Rcblx0Ly8gYWRkTW92ZW1lbnRPbkNhbnZhcyhjb25maWcuY3VycmVudE1vdmVtZW50c1sxXSk7XG5cdHN0YXJ0KCk7XG5cbn1cblxuZnVuY3Rpb24gc3RhcnQoKSB7XG5cdGNvbmZpZy5jdXJyZW50U2NvcmUgPSAwO1xuXHRjb25maWcuY3VycmVudFN0YXJ0RGF0ZSA9IERhdGUubm93KCk7XG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRuZXh0QmVhdCh0cnVlKTtcblx0fSwgY29uZmlnLmN1cnJlbnRCZWdpbm5pbmdPZmZzZXQpO1xuXHRjb25maWcuY3VycmVudEF1ZGlvLnBsYXkoKTtcbn1cblxuZnVuY3Rpb24gbmV4dEJlYXQoaXNGaXJzdCkge1xuXG5cdC8vIElmIHdlJ3JlIGluIHRoZSBiZWdpbm5pbmcgb2Ygc29uZ1xuXHRpZiAoaXNGaXJzdCA9PT0gdHJ1ZSkge1xuXHRcdGFkZE1vdmVtZW50T25DYW52YXMoY29uZmlnLmN1cnJlbnRNb3ZlbWVudHNbMF0pO1xuXHRcdGFuaW1hdGVNb3ZlbWVudChjb25maWcuY3VycmVudE1vdmVtZW50c1swXSk7XG5cdFx0Ly8gc2V0VGltZW91dChuZXh0QmVhdCwgY29uZmlnLmN1cnJlbnRNaW5JbnRlcnZhbCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gSW5zZXJ0IG5ldyBtb3ZlbWVudFxuXHR2YXIgYXBwZWFyaW5nTW92ZW1lbnRJbmRleCA9IE1hdGguZmxvb3IoKERhdGUubm93KCkgLSBjb25maWcuY3VycmVudFN0YXJ0RGF0ZSkgLyBjb25maWcuY3VycmVudE1pbkludGVydmFsKTtcblxuXHRjb25zb2xlLmxvZyhhcHBlYXJpbmdNb3ZlbWVudEluZGV4KTtcblx0XG5cdHZhciBhcHBlYXJpbmdNb3ZlbWVudCA9IGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzW2FwcGVhcmluZ01vdmVtZW50SW5kZXhdO1xuXG5cdGFkZE1vdmVtZW50T25DYW52YXMoYXBwZWFyaW5nTW92ZW1lbnQpO1xuXHRhbmltYXRlTW92ZW1lbnQoYXBwZWFyaW5nTW92ZW1lbnQpO1xuXHQvLyBzZXRUaW1lb3V0KG5leHRCZWF0LCBjb25maWcuY3VycmVudE1pbkludGVydmFsKTtcblx0Y29uc29sZS5sb2coYXBwZWFyaW5nTW92ZW1lbnRJbmRleCk7XG5cbn1cblxuXG5cblxuXG5cblxuXG5cbi8vICoqKioqKioqXG4vLyAqIEluaXQgKlxuLy8gKioqKioqKipcblxuY29uZmlnLmN1cnJlbnRNb3ZlbWVudHMgPSBbXTtcbmNvbmZpZy5jdXJyZW50U2NvcmUgPSAwO1xuY29uZmlnLmN1cnJlbnRTdGFydERhdGUgPSAwO1xuXG4vLyBHZXQgY29tcHV0ZWQgc3R5bGVzIG9mIHdob2xlIHBhZ2Ugd3JhcHBlclxudmFyIGNhbnZhc0NvbXB1dGVkU3R5bGVPYmogPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53cicpWzBdKTtcblxuXG4vLyBTZXQgY2FudmFzIG9wdGlvbnNcbmNvbmZpZy5vbmVXUGVyY2VudCA9IHBhcnNlSW50KGNhbnZhc0NvbXB1dGVkU3R5bGVPYmoud2lkdGguc2xpY2UoMCwtMikpLzEwMDtcbmNvbmZpZy5vbmVIUGVyY2VudCA9IHBhcnNlSW50KGNhbnZhc0NvbXB1dGVkU3R5bGVPYmouaGVpZ2h0LnNsaWNlKDAsLTIpKS8xMDA7XG5cbmNvbmZpZy5jYW52T3B0cyA9IHtcblx0YmdVUkw6ICcuLi9pbWcvYmctY3Jvd2QtMS5qcGcnLFxuXHRjb21wdXRlZFN0eWxlOiB7XG5cdFx0d2lkdGg6IGNvbmZpZy5vbmVXUGVyY2VudCoxMDAsXG5cdFx0aGVpZ2h0OiBjb25maWcub25lSFBlcmNlbnQqMTAwXG5cdH0sXG5cdG1vdmVtZW50czoge1xuXHRcdHJhZGl1czogY29uZmlnLm9uZVdQZXJjZW50ICogY29uZmlnLm1vdmVtZW50cy5yYWRpdXNQZXJjZW50LFxuXHRcdHN0cm9rZVdpZHRoOiBjb25maWcub25lV1BlcmNlbnQgKiBjb25maWcubW92ZW1lbnRzLnN0cm9rZVdpZHRoUGVyY2VudFxuXHR9XG59XG5cblxuLy8gSW5pdGlhbGl6ZSAnZmFicmljJyBjYW52YXMgb2JqXG52YXIgY2FudmFzID0gbmV3IGZhYnJpYy5TdGF0aWNDYW52YXMoJ2dhbWUnLCB7XG5cdHdpZHRoOiBjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZS53aWR0aCxcblx0aGVpZ2h0OiBjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZS5oZWlnaHQsXG59KTtcblxuLy8gRHJhdyBcInBlcmZlY3Qgc3VjY2Vzc1wiIHBsYWNlIHNoYWRvdyBjaXJjbGVcbnZhciBzaGFkb3dDaXJjbGUgPSBuZXcgZmFicmljLkNpcmNsZSh7XG5cdC8vIGZpbGw6IGNvbmZpZy5jb2xvcnMubmV1dHJhbCxcblx0ZmlsbDogJ3JnYmEoMjAwLDIwMCwyMDAsMC4yKScsXG5cdHN0cm9rZTogJ3JnYmEoMjAwLDIwMCwyMDAsMSknLFxuXHRzdHJva2VXaWR0aDogY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5zdHJva2VXaWR0aCxcblx0cmFkaXVzOiBjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnJhZGl1cyxcblx0dG9wOiBNYXRoLnJvdW5kKGNvbmZpZy5vbmVIUGVyY2VudCo0NSksXG5cdGxlZnQ6IGNvbmZpZy5vbmVXUGVyY2VudCAqIDIwXG59KVxuY2FudmFzLmFkZChzaGFkb3dDaXJjbGUpO1xuXG4vLyBTZXQgaGFuZGxlciBmb3IgZ2FtZSBzZXR1cCBldmVudFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYWdTZXR1cEV2ZW50Jywgb25BZ1NldHVwRXZlbnQpO1xuXG4vLyBTaG93IGN1cnJlbnQgZ2FtZSBjb2RlXG52YXIgY29kZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2RlLWNvbnRhaW5lcicpO1xuY29kZUNvbnRhaW5lci5pbm5lckhUTUwgPSBjb2RlO1xuXG5cbi8vICoqKioqKioqKlxuLy8gKiBBdWRpbyAqXG4vLyAqKioqKioqKipcblxuLy8gQWRkIG11dGVkIHN0YXRlIHNhdmluZyBmZWF0dXJlIHRvIEhvd2wgKGF1ZGlvIGxpYilcbkhvd2wucHJvdG90eXBlLm11dGVkID0gZmFsc2U7XG5Ib3dsLm11dGVkID0gZmFsc2U7XG5cbi8vIEdldCB2b2x1bWUgYnV0dG9uIGVsZW1lbnRcbnZhciB2b2x1bWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudm9sdW1lLWJ0bicpWzBdO1xuLy8gYW5kIHNldCBvbkNsaWNrIGV2ZW50IGhhbmRsZXJcbnZvbHVtZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uVm9sdW1lQnRuQ2xpY2spO1xuXG4vLyBHZXQgdm9sdW1lIGxldmVsIHNsaWRlclxudmFyIHZvbHVtZVNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy52b2x1bWUtaW5wdXQnKVswXTtcbi8vIGFuZCBzZXQgb25JbnB1dCBldmVudCBoYW5kbGVyXG52b2x1bWVTbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvblZvbHVtZVNsaWRlcklucHV0KVxuXG5cbi8vIENoYW5nZSBjYW52YXMgYmFja2dyb3VuZCBzaXplIG9uIHdpbmRvdyByZXNpemVcbndpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uKCl7XG5cdHJlZnJlc2hDb21wdXRlZFNpemVzKGNhbnZhc0NvbXB1dGVkU3R5bGVPYmopO1xuXHRjYW52YXMucmVuZGVyQWxsLmJpbmQoY2FudmFzKTtcbn1cblxuXG5cblxuXG5cblxuXG5cbi8vIFRFU1RcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XG5cbn0pKCk7XG4vKipcbiAqIGNvbm5lY3Rpb24uanNcbiAqXG4gKiBTZXRzIGNvbm5lY3Rpb24gdG8gdGhlIHNlcnZlci5cbiAqXG4gKiBFbWl0cyAnYWdTZXR1cEV2ZW50JyBhbmQgJ2FnQ29tbWFuZEV2ZW50JyBldmVudHMgdGhhdCBzaG91bGQgYmUgaGFuZGxlZCBpblxuICogdGhlIHZpZXcuXG4gKiBgYGFnU2V0dXBFdmVudGBgcyBzZXQgdGhlIHNvbmcgbmFtZSBhbmQgdGhlIGNvbW1hbmQgc2VxdWVuY2UuXG4gKiBgYGFnQ29tbWFuZEV2ZW50YGBzIHNheSB3aGljaCBjb21tYW5kIHVzZXIgc2VudC5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgLy8gU2V0IHRoZSBjb25uZWN0aW9uIHRvIHRoZSBtb2JpbGUgYXBwLlxuICAgIHZhciBob3N0ID0gXCJ3czovL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lICsgXCIvXCI7XG4gICAgLy92YXIgd3MgPSBuZXcgV2ViU29ja2V0KGhvc3QpO1xuICAgIHZhciBzb25nV2FzU3RhcnRlZCA9IGZhbHNlO1xuICAgIHZhciB3cyA9IGlvKCk7XG5cbiAgICBmdW5jdGlvbiBvbk9wZW4oKSB7XG5cdC8vIEFmdGVyIHdlIGNvbm5lY3QsIHRoZSBzZXJ2ZXIgc2VuZHMgdXMgZGF0YSB3aGljaCB3aWxsIGJlIGhhbmRsZWQgaW5cblx0Ly8gYGBvbm1lc3NhZ2VgYCBzbyB3ZSBkbyBub3RoaW5nIGhlcmUuXG4gICAgfVxuXG4gICAgLy8gZnVuY3Rpb24gb25DbG9zZShldmVudCkge1xuICAgIC8vIFx0aWYgKCFlLndhc0NsZWFuKSB7XG4gICAgLy8gXHQgICAgLy8gUmV0cnkgaWYgY29ubmVjdGlvbiBmYWlsZWQuXG4gICAgLy8gXHQgICAgd3MgPSBuZXcgV2ViU29ja2V0KGhvc3QpO1xuICAgIC8vIFx0ICAgIHdzLm9ub3BlbiA9IG9uT3BlbjtcbiAgICAvLyBcdCAgICB3cy5vbmNsb3NlID0gb25DbG9zZTtcbiAgICAvLyBcdCAgICBpZiAoIXNvbmdXYXNTdGFydGVkKSB7XG4gICAgLy8gXHRcdHdzLm9ubWVzc2FnZSA9IG9uR290TWVzc2FnZU9uU3RhcnQ7XG4gICAgLy8gXHQgICAgfSBlbHNlIHtcbiAgICAvLyBcdFx0d3Mub25tZXNzYWdlID0gb25Hb3RNZXNzYWdlT25Db25uZWN0aW9uRXN0YWJsaXNoZWQ7XG4gICAgLy8gXHQgICAgfVxuICAgIC8vIFx0fVxuICAgIC8vIFx0c29uZ1dhc1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICAvLyB9XG5cbiAgICBmdW5jdGlvbiBvbkdvdE1lc3NhZ2VPblN0YXJ0KGV2ZW50KSB7XG5cdC8vIFJlY2VpdmUgc29uZyBuYW1lIGFuZCBjb21tYW5kIHNlcXVlbmNlLlxuXHQvLyBUT0RPISBHZW5lcmF0ZSBhIG1vdmVtZW50IHN0cmluZyBsaXN0IGZyb20gdGhlIHN1cHBsaWVkIGNvZGUuXG5cdHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudChcblx0ICAgICdhZ1NldHVwRXZlbnQnLFxuXHQgICAge2RldGFpbDoge3Nvbmc6IGV2ZW50LnNvbmcsIGJwbTogZXZlbnQuYnBtLCBjb21tYW5kczogZXZlbnQuY29tbWFuZHN9fVxuXHQpO1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcblx0Ly93cy5vbm1lc3NhZ2UgPSBvbkdvdE1lc3NhZ2VPbkNvbm5lY3Rpb25Fc3RhYmxpc2hlZDtcblx0d3Mub24oJ21lc3NhZ2UnLCBvbkdvdE1lc3NhZ2VPbkNvbm5lY3Rpb25Fc3RhYmxpc2hlZCk7XG5cdHNvbmdXYXNTdGFydGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkdvdE1lc3NhZ2VPbkNvbm5lY3Rpb25Fc3RhYmxpc2hlZChldmVudCkge1xuXHQvLyBSZWNlaXZlIHVzZXIgY29tbWFuZC5cblx0Ly8gVE9ETyEgR2VuZXJhdGUgYSBtb3ZlbWVudCBzdHJpbmcgZnJvbSB0aGUgc3VwcGxpZWQgY29kZS5cblx0dmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHQgICAgJ2FnQ29tYW5kRXZlbnQnLFxuXHQgICAge2RldGFpbDoge21vdmVtZW50OiBldmVudC5tb3ZlbWVudCwgdGltZTogZXZlbnQudGltZX19XG5cdCk7XG5cdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1xuICAgIH1cblxuICAgIGlvLm9uKCdtZXNzYWdlJywgb25Hb3RNZXNzYWdlT25TdGFydCk7XG4gICAgLy8gd3Mub25vcGVuID0gb25PcGVuO1xuICAgIC8vIHdzLm9uY2xvc2UgPSBvbkNsb3NlO1xuICAgIC8vIHdzLm9ubWVzc2FnZSA9IG9uR290TWVzc2FnZU9uU3RhcnQ7XG59KSgpO1xuLyoqXG4gKiBnYW1lbG9naWMuanNcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgLy9cblxuICAgIC8vIEFjdGlvbnMgcGVyZm9ybWVkIHdoZW4gY3VycmVudCBnYW1lIHNldHRpbmdzIHJlY2lldmVkXG4gICAgZnVuY3Rpb24gb25BZ1NldHVwRXZlbnQoZXZlbnQpIHtcblxuXHRsZXQgYXVkaW9GaWxlVVJMID0gJ2h0dHA6Ly8nICsgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lICsgJy9zb25ncy8nICsgZXZlbnQuZGV0YWlsLnNvbmc7XG5cdC8vIGxldCBhdWRpb0ZpbGVVUkwgPSAnLi4vYXVkaW8vJyArIGV2ZW50LmRldGFpbC5zb25nO1xuXG5cdC8vIGNvbnNvbGUubG9nKGF1ZGlvRmlsZVVSTCk7XG5cblx0Y29uZmlnLmN1cnJlbnRBdWRpbyA9IG5ldyBIb3dsKHtcblx0ICAgIHVybHM6IFthdWRpb0ZpbGVVUkxdLFxuXHQgICAgYXV0b3BsYXk6IGZhbHNlLFxuXHQgICAgdm9sdW1lOiAwLjgsXG5cdH0pO1xuXG5cdGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzID0gZXZlbnQuZGV0YWlsLmNvbW1hbmRzLm1hcCgoY3VycmVudFZhbHVlLCBpbmRleCwgYXJyYXkpID0+IHtcblx0ICAgIHJldHVybiB7XG5cdFx0aW5kZXg6IGluZGV4LFxuXHRcdG5hbWU6IGN1cnJlbnRWYWx1ZSxcblx0XHRjb2xvcjogY29uZmlnLmNvbG9ycy5uZXV0cmFsLFxuXHQgICAgfVxuXHR9KTtcblxuXHQvLyBCUE0sIG1pbkludGVydmFsLCBiZWdpbm5pbmcgb2Zmc2V0XG5cdC8vIGNvbmZpZy5jdXJyZW50QnBtID0gZXZlbnQuZGV0YWlsLmJwbTtcblx0Y29uZmlnLmN1cnJlbnRCcG0gPSAxMjg7XG5cdGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwgPSAoY29uZmlnLmN1cnJlbnRCcG0gKiAxMDAwKSAvICg2MCAqIDE2KTtcblx0Y29uZmlnLmN1cnJlbnRCZWdpbm5pbmdPZmZzZXQgPSBldmVudC5kZXRhaWwub2Zmc2V0O1xuXG5cdC8vIFRlc3Rcblx0Ly8gYWRkTW92ZW1lbnRPbkNhbnZhcyhjb25maWcuY3VycmVudE1vdmVtZW50c1sxXSk7XG5cdHN0YXJ0KCk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdGFydCgpIHtcblx0Y29uZmlnLmN1cnJlbnRTY29yZSA9IDA7XG5cdGNvbmZpZy5jdXJyZW50U3RhcnREYXRlID0gRGF0ZS5ub3coKTtcblx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHQgICAgbmV4dEJlYXQodHJ1ZSk7XG5cdH0sIGNvbmZpZy5jdXJyZW50QmVnaW5uaW5nT2Zmc2V0KTtcblx0Y29uZmlnLmN1cnJlbnRBdWRpby5zdGFydCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5leHRCZWF0KGlzRmlyc3QpIHtcblxuXHQvLyBJZiB3ZSdyZSBpbiB0aGUgYmVnaW5uaW5nIG9mIHNvbmdcblx0aWYgKGlzRmlyc3QgPT09IHRydWUpIHtcblx0ICAgIGFkZE1vdmVtZW50T25DYW52YXMoY29uZmlnLmN1cnJlbnRNb3ZlbWVudHNbMF0pO1xuXHQgICAgYW5pbWF0ZU1vdmVtZW50KGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzWzBdKTtcblx0ICAgIHNldFRpbWVvdXQobmV4dEJlYXQsIGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwpO1xuXHQgICAgcmV0dXJuO1xuXHR9XG5cblx0Ly8gSW5zZXJ0IG5ldyBtb3ZlbWVudFxuXHR2YXIgYXBwZWFyaW5nTW92ZW1lbnRJbmRleCA9IE1hdGguZmxvb3IoKERhdGUubm93KCkgLSBjb25maWcuY3VycmVudFN0YXJ0RGF0ZSkgLyBjb25maWcuY3VycmVudE1pbkludGVydmFsKTtcblx0Y29uc29sZS5sb2coYXBwZWFyaW5nTW92ZW1lbnRJbmRleCk7XG5cdHZhciBhcHBlYXJpbmdNb3ZlbWVudCA9IGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzW2FwcGVhcmluZ01vdmVtZW50SW5kZXhdO1xuXG5cdGFkZE1vdmVtZW50T25DYW52YXMoYXBwZWFyaW5nTW92ZW1lbnQpO1xuXHRhbmltYXRlTW92ZW1lbnQoYXBwZWFyaW5nTW92ZW1lbnQpO1xuXHRzZXRUaW1lb3V0KG5leHRCZWF0LCBjb25maWcuY3VycmVudE1pbkludGVydmFsKTtcblx0Y29uc29sZS5sb2coYXBwZWFyaW5nTW92ZW1lbnRJbmRleCk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkFnQ29tbWFuZEV2ZW50KGV2ZW50KSB7fVxuICAgIFxuICAgIC8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FnU2V0dXBFdmVudCcsIG9uQWdTZXR1cEV2ZW50KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdhZ1NldHVwRXZlbnQnLCBmdW5jdGlvbihldmVudCkge1xuXHRjb25zb2xlLmxvZygnYWdTZXR1cEV2ZW50OiAnICsgSlNPTi5zdHJpbmdpZnkoZXZlbnQuZGV0YWlsKSk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYWdDbW1hbmRFdmVudCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdGNvbnNvbGUubG9nKCdhZ0NvbW1hbmRFdmVudCcgKyBKU09OLnN0cmluZ2lmeShldmVudC5kZXRhaWwpKTtcbiAgICB9KTtcbn0pKCk7XG5cblxuLy8gKioqIExpc3Qgb2YgVUkgZWxlbWVudHMgKioqXG4vLyBcbi8vIFNldHRpbmdzXHRcdCtcbi8vIFNjb3JlXG4vLyBMb2dvXHRcdFx0XHQrXG4vLyBWb2x1bWVcbi8vIFBhdXNlXG5cbi8vIFNvY2lhbHMiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
