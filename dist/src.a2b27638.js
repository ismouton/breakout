// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/Audio.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const timedDo = (fn, millis) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let returnValue;

      try {
        returnValue = fn();
      } catch (e) {
        reject(e);
      }

      resolve(returnValue);
    }, millis);
  });
};

class Audio {
  constructor() {
    let audioCtx = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new audioCtx();
  }

  async playNoise({
    millis = 1000,
    bandHz = 600,
    gainValue = 0.002
  } = {}) {
    const bufferSize = this.audioCtx.sampleRate * millis; // set the time of the note

    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate); // create an empty buffer

    const data = buffer.getChannelData(0); // get data

    const gain = this.audioCtx.createGain();
    gain.gain.value = gainValue;

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buffer;
    const bandpass = this.audioCtx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = bandHz; // connect our graph

    noise.connect(bandpass).connect(gain);
    gain.connect(this.audioCtx.destination);
    noise.start();
  }

  async playSilence(millis) {
    return new Promise(resolve => {
      setTimeout(() => resolve(), millis);
    });
  }

  async playSlide({
    startFrequency = 440,
    numberOfSteps,
    stepSizeInCents = 1
  } = {}) {
    return new Promise(resolve => {
      const oscillator = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      oscillator.type = "square";
      oscillator.frequency.value = startFrequency;
      gain.gain.value = 0.03;
      oscillator.connect(gain);
      gain.connect(this.audioCtx.destination);
      oscillator.start();

      for (let i = 0; i < numberOfSteps; i++) {
        oscillator.detune.setValueAtTime(i * stepSizeInCents, this.audioCtx.currentTime + i * 1 * 0.001);
      }

      setTimeout(() => {
        resolve();
        oscillator.stop();
      }, numberOfSteps);
    });
  }

  async playRing({
    frequencies = [440, 480],
    millis = 2000,
    gain: gainValue = 0.03
  } = {}) {
    return new Promise(resolve => {
      const gain = this.audioCtx.createGain();
      gain.gain.value = gainValue;
      const oscillators = [];

      for (let i = 0; i < frequencies.length; i++) {
        const frequency = frequencies[i];
        const oscillator = this.audioCtx.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        oscillator.connect(gain);
        oscillators.push(oscillator);
      }

      gain.connect(this.audioCtx.destination);
      oscillators.forEach(o => o.start());
      setTimeout(() => {
        resolve();
        oscillators.forEach(o => o.stop());
      }, millis);
    });
  }

  async playScript(script) {
    const oscillator = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    oscillator.type = "square";
    oscillator.frequency.value = 100;
    gain.gain.value = 0.03;
    oscillator.connect(gain);
    gain.connect(this.audioCtx.destination);
    oscillator.start();
    let totalTime = 0;

    for (let i = 0; i < script.length; i++) {
      const [frequency, millis] = script[i];
      oscillator.frequency.setValueAtTime(frequency, this.audioCtx.currentTime + totalTime * 0.001);
      totalTime += millis;
    }

    setTimeout(() => oscillator.stop(), totalTime);
  }

  async playPause() {
    const oscillator = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    oscillator.type = "square";
    oscillator.frequency.value = 100;
    gain.gain.value = 0.03;
    oscillator.connect(gain);
    gain.connect(this.audioCtx.destination);
    oscillator.start();

    for (let i = 0; i < 4; i++) {
      oscillator.detune.setValueAtTime(i % 2 === 0 ? 300 : -200, this.audioCtx.currentTime + i * 125 * 0.001);
    }

    setTimeout(() => oscillator.stop(), 500);
  }

  playBuzz(hz, millis, {
    oscillationMillis = 10,
    buzzOffsetCents = 500
  } = {}) {
    return new Promise(resolve => {
      const oscillator = this.auFioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      oscillator.type = "square";
      oscillator.frequency.value = hz;
      gain.gain.value = 0.03;
      oscillator.connect(gain);
      gain.connect(this.audioCtx.destination);
      oscillator.start();
      const cycles = Math.ceil(millis / oscillationMillis);

      for (let i = 0; i < cycles; i++) {
        oscillator.detune.setValueAtTime(i % 2 === 0 ? buzzOffsetCents : -buzzOffsetCents, this.audioCtx.currentTime + i * oscillationMillis * 0.001);
      }

      setTimeout(() => {
        resolve();
        oscillator.stop();
      }, millis);
    });
  }

  async playTrill(millis = 50) {
    this.playScript([[250, millis], [500, millis], [1000, millis], [2000, millis], [4000, millis], [8000, millis]]);
  }

}

exports.default = Audio;
},{}],"src/Video.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Video {
  constructor(el) {
    const {
      tagName
    } = el;
    const height = +el.getAttribute("height");
    const width = +el.getAttribute("width");

    if (tagName !== "CANVAS") {
      throw Error("Video constructor must be passed canvas element as argument 1!");
    }

    this.width = width;
    this.height = height;
    this.canvasElement = el;
    this.context = el.getContext("2d");
    this.imageData = this.context.getImageData(0, 0, width, height);
  }

  _getIndex = (x, y) => y * (this.width * 4) + x * 4;

  drawBlock({
    x,
    y,
    width,
    height,
    color = 0xff00ff,
    borderColor = 0xffffff
  } = {}) {
    for (let localX = 0; localX < width; localX++) {
      for (let localY = 0; localY < height; localY++) {
        const pixelColor = !localY || !localX || localY === height - 1 || localX === width - 1 ? borderColor : color;
        this.setPixel(localX + x, localY + y, pixelColor);
      }
    }

    return this;
  }

  clear(color) {
    const width = this.width;
    const height = this.height;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        this.setPixel(x, y, color);
      }
    }

    return this;
  }

  renderStatic() {
    const width = this.width;
    const height = this.height;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const number = Math.floor(Math.random() * 255 + 1);
        const color = number << 16 | number << 8 | number;
        this.setPixel(x, y, color);
      }
    }

    return this;
  }

  setPixel(x, y, color) {
    const idx = this._getIndex(x, y);

    const red = color >> 16 & 0xff;
    const green = color >> 8 & 0xff;
    const blue = color & 0xff;
    const alpha = 0xff;
    this.imageData.data[idx] = red;
    this.imageData.data[idx + 1] = green;
    this.imageData.data[idx + 2] = blue;
    this.imageData.data[idx + 3] = alpha;
    return this;
  }

  sync() {
    this.context.putImageData(this.imageData, 0, 0);
    return this;
  }

}

var _default = Video;
exports.default = _default;
},{}],"src/Character.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Character {
  constructor({
    /**
     * Instance of `Video`.
     */
    video,

    /**
     * Instance of `Audio`.
     */
    audio,

    /**
     * Starting X coordinate.
     */
    y,

    /**
     * Starting Y coordinate.
     */
    x
  }) {
    const isVideoInstanceOfVideo = video.constructor.name === "Video";
    const isAudioInstanceOfAudio = audio.constructor.name === "Audio";

    if (!isVideoInstanceOfVideo) {
      throw Error("Paddle constructor must be passed instance of `Video` as argument 1!");
    }

    if (!isAudioInstanceOfAudio) {
      throw Error("Paddle constructor must be passed instance of `Audoio` as argument 2!");
    }

    this._x = x;
    this._y = y;
    this.audio = audio;
    this.video = video;
  }

  set x(value) {
    this._x = value;
  }

  set y(value) {
    this._y = value;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

}

var _default = Character;
exports.default = _default;
},{}],"src/Paddle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Character = _interopRequireDefault(require("./Character"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Paddle extends _Character.default {
  constructor({
    /**
     * Instance of `Video`.
     */
    video,

    /**
     * Instance of `Audio`.
     */
    audio,

    /**
     * Starting X coordinate.
     */
    x = (640 - 64) / 2,

    /**
     * Starting Y coordinate.
     */
    y = 430,

    /**
     * How far can the paddle move right until it hits a wall.
     */
    rightBounds = 640,

    /**
     * How far can the paddle move left until it hits a wall.
     */
    leftBounds = 0,

    /**
     * How wide is the paddle.
     */
    width = 64,

    /**
     * The cap on `paddleSpeed`.
     */
    maxSpeed = 24,

    /**
     * The color of the paddle.
     */
    color = 0xffffff,

    /**
     * The color of the border of the paddle.
     */
    borderColor = 0x000000
  } = {}) {
    super({
      x,
      y,
      audio,
      video
    });
    this.speed = 0;
    this.rightBounds = rightBounds;
    this.leftBounds = leftBounds;
    this.width = width;
    this.lastDirection = null;
    this.maxSpeed = maxSpeed;
    this.color = color;
    this.borderColor = borderColor;
    /* Input state */

    this.input = {
      fireSpaceLasers: false,
      left: false,
      right: false
    };
  }

  _handleMovement = () => {
    /* Handle input */
    if (this.input.right && this.input.left) {
      this.lastDirection = null;
    } else if (this.input.right) {
      if (this.lastDirection === "right") {
        this.speed += 1;
      } else {
        this.speed = -1;
      }

      this.lastDirection = "right";
    } else if (this.input.left) {
      if (this.lastDirection === "left") {
        this.speed -= 1;
      } else {
        this.speed = 1;
      }

      this.lastDirection = "left";
    } else {
      this.speed = 0;
    }
    /* Enforce the speed limit */


    if (this.speed > 24) {
      this.speed = 24;
    } else if (this.speed < -24) {
      this.speed = -24;
    }
    /* Enforce bounds */


    let newX = Math.min(this.speed, this.maxSpeed) + this.x;

    if (newX < this.leftBounds - 1) {
      newX = this.leftBounds;
      this.audio.playTrill(5);
    } else if (newX > this.rightBounds - this.width + 1) {
      newX = this.rightBounds - this.width;
      this.audio.playTrill(5);
    }

    this.x = newX;
  };
  _draw = () => {
    this.video.drawBlock({
      x: this.x,
      y: this.y,
      width: this.width,
      height: 16,
      color: this.color,
      borderColor: this.borderColor
    });
  };
  /**
   * Fires the space lasers if available.
   */

  pressFireSpaceLasers = () => {
    this.input.fireSpaceLasers = true;
  };
  /**
   * Moves the paddle leftward.
   */

  pressLeft = () => {
    this.input.left = true;
  };
  /**
   * Moves the paddle rightward.
   */

  pressRight = () => {
    this.input.right = true;
  };
  /**
   * Stops firing the space lasers.
   */

  releaseFireSpaceLasers = () => {
    this.input.fireSpaceLasers = false;
  };
  /**
   * Stops moving the paddle left and resets speed.
   */

  releaseLeft = () => {
    this.input.left = false;
    this.paddleSpeed = 0;
  };
  /**
   * Stops moving the paddle right and resets speed.
   */

  releaseRight = () => {
    this.input.right = false;
    this.paddleSpeed = 0;
  };
  /**
   * Iterate the object.
   */

  tick = () => {
    this._handleMovement();

    this._draw();
  };
}

var _default = Paddle;
exports.default = _default;
},{"./Character":"src/Character.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");

var _Audio = _interopRequireDefault(require("./Audio"));

var _Video = _interopRequireDefault(require("./Video"));

var _Paddle = _interopRequireDefault(require("./Paddle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const audio = new _Audio.default();
document.addEventListener("DOMContentLoaded", bootApp);

function bootApp() {
  document.body.innerHTML =
  /*html*/
  `
    <canvas width="640" height="480">
    </canvas>
    <button class="play-sound">
      Play Sound
    </button>

    <button class="cancel-sound">
      Cancel Sound
    </button>
  `;
  const canvas = document.body.querySelector("canvas");
  const video = new _Video.default(canvas).clear(0x333333);
  const paddle0 = new _Paddle.default({
    video,
    audio
  }); // const paddle1 = new Paddle({ video, audio, y: 32, color: 0xFF0FF });

  const inputMap = {
    ArrowLeft: [{
      keydown: paddle0.pressLeft,
      keyup: paddle0.releaseLeft
    } // {
    // 	keydown: paddle1.pressRight,
    // 	keyup: paddle1.releaseRight,
    // },
    ],
    ArrowRight: [{
      keydown: paddle0.pressRight,
      keyup: paddle0.releaseRight
    } // {
    // 	keydown: paddle1.pressLeft,
    // 	keyup: paddle1.releaseLeft,
    // },
    ],
    Space: []
  };
  audio.playNoise();
  document.addEventListener("keydown", e => {
    const {
      code: key
    } = e;
    const keyMaps = inputMap[key];

    if (keyMaps) {
      keyMaps.forEach(k => k.keydown());
    }
  });
  document.addEventListener("keyup", e => {
    const {
      code: key
    } = e;
    const keyMaps = inputMap[key];

    if (keyMaps) {
      keyMaps.forEach(k => k.keyup());
    }
  });
  const objects = [paddle0
  /* paddle1 */
  ];

  const renderLoop = () => {
    video.clear(0x333333);
    objects.forEach(o => o.tick());
    video.sync();
    requestAnimationFrame(renderLoop);
  };

  renderLoop();
  video.setPixel(0, 0, 0x00ff00);
  video.sync();
  const playButton = document.querySelector(".play-sound");
  const cancelButton = document.querySelector(".cancel-sound");
  let interval;
  playButton.addEventListener("click", async () => {
    // await audio.playSlide({ startFrequency: 20, numberOfSteps: 5000, stepSizeInCents: 1 });
    // const frequencies = [400, 450];
    // await audio.playRing({ frequencies, millis: 400});
    // audio.playTrill();
    audio.playTrill(10); // await audio.playBuzz(100, 750, { oscillationMillis: 30, buzzOffsetCents: 500});
    // await audio.playBuzz(300, 750, { oscillationMillis: 30, buzzOffsetCents: 500});
    // await audio.playBuzz(300, 750, { oscillationMillis: 30, buzzOffsetCents: 1000});
    // await audio.playBuzz(350, 750, { oscillationMillis: 30, buzzOffsetCents: 2000});
    // await audio.playBuzz(300, 750, { oscillationMillis: 20, buzzOffsetCents: 500});
    // await audio.playBuzz(300, 750, { oscillationMillis: 20, buzzOffsetCents: 1000});
    // await audio.playBuzz(300, 750, { oscillationMillis: 10, buzzOffsetCents: 500});
    // await audio.playBuzz(300, 750, { oscillationMillis: 10, buzzOffsetCents: 1000});
    // while (true) {
    //   const frequencies = [400, 450];
    //   // // const frequencies = [200, 630];
    //   await audio.playRing({ frequencies, millis: 400});
    //   await audio.playSilence(200);
    //   await audio.playRing({ frequencies, millis: 400});
    //   await audio.playSilence(2000);
    //   // await audio.playBuzz(2000, 75, { oscillationMillis: 10, buzzOffsetCents: 400});
    //   // await audio.playRing({ frequencies: [750, 1100], millis: 50 })
    //   // await audio.playSilence(50);
    // }
    // audio.playScript([
    //   [400, 1000],
    //   [800, 1000],
    //   [300, 500],
    //   [100, 666],
    //   [400, 1000],
    //   [800, 1000],
    //   [300, 500],
    //   [100, 666],
    // ]);
    // await audio.playNote(250, 75);
    // await audio.playNote(500, 75);
    // await audio.playNote(1000, 75);
    // await audio.playNote(2000, 75);
    // await audio.playNote(4000, 75);
    // await audio.playNote(8000, 75);

    /* Wall collision sound */
    // audio.playNote(1000, 17);

    /* Hit ball sound */
    // await audio.playNote(2000, 50);
    // await audio.playNote(1000, 50);
    // await audio.playNote(2000, 50);

    const notes = ["1174.659", "1108.731", "1046.502", "987.7666", "932.3275", "880.0000", "830.6094", "783.9909", "739.9888", "698.4565", "659.2551", "622.2540", "587.3295", "554.3653", "523.2511", "493.8833", "466.1638", "440.0000", "415.3047", "391.9954", "369.9944", "349.2282", "329.6276", "311.1270", "293.6648"]; // await audio.playNote("349.2282", 1000);
    // while (true) {
    //   for (let i = 0; i < notes.length; i += 2) {
    //     const note = notes[i];
    //     await audio.playNote(note, 25);
    //   }
    //   // await audio.playNote(250, 75);
    //   // await audio.playNote(500, 75);
    //   // await audio.playNote(1000, 75);
    //   // await audio.playNote(2000, 75);
    //   // await audio.playNote(4000, 75);
    //   // await audio.playNote(8000, 75);
    // }

    /* start sound */
    // await audio.playNote(250, 75);
    // await audio.playNote(500, 75);
    // await audio.playNote(1000, 75);
    // await audio.playNote(2000, 75);
    // await audio.playNote(4000, 75);
    // await audio.playNote(8000, 75);
  });
  cancelButton.addEventListener("click", () => {// clearInterval(interval);
  });
}
},{"./styles.css":"src/styles.css","./Audio":"src/Audio.js","./Video":"src/Video.js","./Paddle":"src/Paddle.js"}],"../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64337" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map