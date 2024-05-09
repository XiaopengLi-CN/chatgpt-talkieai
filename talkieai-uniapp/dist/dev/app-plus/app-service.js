var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  const ON_SHOW = "onShow";
  const ON_HIDE = "onHide";
  const ON_LAUNCH = "onLaunch";
  const ON_LOAD = "onLoad";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onHide = /* @__PURE__ */ createHook(ON_HIDE);
  const onLaunch = /* @__PURE__ */ createHook(ON_LAUNCH);
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const __config = {
    // basePath: "http://192.168.0.102:8098/api/v1"
    basePath: "http://localhost:8097/api/v1"
    // basePath: "https://talkie.prejade.com/api/v1"
  };
  const request = (url, method, data, showLoading) => {
    let _url = __config.basePath + url;
    return new Promise((resolve, reject) => {
      if (showLoading) {
        uni.showLoading();
      }
      uni.request({
        url: _url,
        method,
        data,
        header: {
          "Content-Type": "application/json",
          "X-Token": uni.getStorageSync("x-token") ? uni.getStorageSync("x-token") : ""
        },
        success(res) {
          if (res.statusCode == 200) {
            resolve(res.data);
          } else if (res.statusCode == 401) {
            uni.showToast({
              title: "登录过期，重新登录",
              icon: "none",
              duration: 2e3
            });
            uni.removeStorageSync("x-token");
            uni.navigateTo({
              url: "/pages/login/index"
            });
          } else {
            reject(res.data);
          }
        },
        fail(error) {
          formatAppLog("error", "at axios/api.ts:50", error);
          reject(error);
        },
        complete(res) {
          if (showLoading) {
            uni == null ? void 0 : uni.hideLoading();
          }
        }
      });
    });
  };
  const accountRequest = {
    visitorLogin: (data) => {
      return request("/account/visitor-login", "POST", data, true);
    },
    accountInfoGet: () => {
      return request("/account/info", "GET");
    },
    setSettings: (data) => {
      return request("/account/settings", "POST", data);
    },
    getSettings: () => {
      return request("/account/settings", "GET");
    },
    setRole: (data) => {
      return request("/account/role", "POST", data);
    },
    getRole: () => {
      return request("/account/role", "GET", null);
    },
    setLearningLanguage: (data) => {
      return request("/account/language", "POST", data);
    },
    getLearningLanguage: () => {
      return request("/account/language", "GET", null);
    },
    collectGet: (data) => {
      return request("/account/collect", "GET", data, false);
    },
    collect: (data) => {
      return request("/account/collect", "POST", data, false);
    },
    cancelCollect: (data) => {
      return request("/account/collect", "DELETE", data, false);
    },
    collectsGet: (data) => {
      return request("/account/collects", "GET", data, false);
    }
  };
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  var fingerprint2Exports = {};
  var fingerprint2 = {
    get exports() {
      return fingerprint2Exports;
    },
    set exports(v) {
      fingerprint2Exports = v;
    }
  };
  (function(module) {
    (function(name, context, definition) {
      if (typeof window !== "undefined" && false) {
        (void 0)(definition);
      } else if (module.exports) {
        module.exports = definition();
      } else if (context.exports) {
        context.exports = definition();
      } else {
        context[name] = definition();
      }
    })("Fingerprint2", commonjsGlobal, function() {
      if (typeof Array.isArray === "undefined") {
        Array.isArray = function(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        };
      }
      var x64Add = function(m, n) {
        m = [m[0] >>> 16, m[0] & 65535, m[1] >>> 16, m[1] & 65535];
        n = [n[0] >>> 16, n[0] & 65535, n[1] >>> 16, n[1] & 65535];
        var o = [0, 0, 0, 0];
        o[3] += m[3] + n[3];
        o[2] += o[3] >>> 16;
        o[3] &= 65535;
        o[2] += m[2] + n[2];
        o[1] += o[2] >>> 16;
        o[2] &= 65535;
        o[1] += m[1] + n[1];
        o[0] += o[1] >>> 16;
        o[1] &= 65535;
        o[0] += m[0] + n[0];
        o[0] &= 65535;
        return [o[0] << 16 | o[1], o[2] << 16 | o[3]];
      };
      var x64Multiply = function(m, n) {
        m = [m[0] >>> 16, m[0] & 65535, m[1] >>> 16, m[1] & 65535];
        n = [n[0] >>> 16, n[0] & 65535, n[1] >>> 16, n[1] & 65535];
        var o = [0, 0, 0, 0];
        o[3] += m[3] * n[3];
        o[2] += o[3] >>> 16;
        o[3] &= 65535;
        o[2] += m[2] * n[3];
        o[1] += o[2] >>> 16;
        o[2] &= 65535;
        o[2] += m[3] * n[2];
        o[1] += o[2] >>> 16;
        o[2] &= 65535;
        o[1] += m[1] * n[3];
        o[0] += o[1] >>> 16;
        o[1] &= 65535;
        o[1] += m[2] * n[2];
        o[0] += o[1] >>> 16;
        o[1] &= 65535;
        o[1] += m[3] * n[1];
        o[0] += o[1] >>> 16;
        o[1] &= 65535;
        o[0] += m[0] * n[3] + m[1] * n[2] + m[2] * n[1] + m[3] * n[0];
        o[0] &= 65535;
        return [o[0] << 16 | o[1], o[2] << 16 | o[3]];
      };
      var x64Rotl = function(m, n) {
        n %= 64;
        if (n === 32) {
          return [m[1], m[0]];
        } else if (n < 32) {
          return [m[0] << n | m[1] >>> 32 - n, m[1] << n | m[0] >>> 32 - n];
        } else {
          n -= 32;
          return [m[1] << n | m[0] >>> 32 - n, m[0] << n | m[1] >>> 32 - n];
        }
      };
      var x64LeftShift = function(m, n) {
        n %= 64;
        if (n === 0) {
          return m;
        } else if (n < 32) {
          return [m[0] << n | m[1] >>> 32 - n, m[1] << n];
        } else {
          return [m[1] << n - 32, 0];
        }
      };
      var x64Xor = function(m, n) {
        return [m[0] ^ n[0], m[1] ^ n[1]];
      };
      var x64Fmix = function(h) {
        h = x64Xor(h, [0, h[0] >>> 1]);
        h = x64Multiply(h, [4283543511, 3981806797]);
        h = x64Xor(h, [0, h[0] >>> 1]);
        h = x64Multiply(h, [3301882366, 444984403]);
        h = x64Xor(h, [0, h[0] >>> 1]);
        return h;
      };
      var x64hash128 = function(key, seed) {
        key = key || "";
        seed = seed || 0;
        var remainder = key.length % 16;
        var bytes = key.length - remainder;
        var h1 = [0, seed];
        var h2 = [0, seed];
        var k1 = [0, 0];
        var k2 = [0, 0];
        var c1 = [2277735313, 289559509];
        var c2 = [1291169091, 658871167];
        for (var i = 0; i < bytes; i = i + 16) {
          k1 = [key.charCodeAt(i + 4) & 255 | (key.charCodeAt(i + 5) & 255) << 8 | (key.charCodeAt(i + 6) & 255) << 16 | (key.charCodeAt(i + 7) & 255) << 24, key.charCodeAt(i) & 255 | (key.charCodeAt(i + 1) & 255) << 8 | (key.charCodeAt(i + 2) & 255) << 16 | (key.charCodeAt(i + 3) & 255) << 24];
          k2 = [key.charCodeAt(i + 12) & 255 | (key.charCodeAt(i + 13) & 255) << 8 | (key.charCodeAt(i + 14) & 255) << 16 | (key.charCodeAt(i + 15) & 255) << 24, key.charCodeAt(i + 8) & 255 | (key.charCodeAt(i + 9) & 255) << 8 | (key.charCodeAt(i + 10) & 255) << 16 | (key.charCodeAt(i + 11) & 255) << 24];
          k1 = x64Multiply(k1, c1);
          k1 = x64Rotl(k1, 31);
          k1 = x64Multiply(k1, c2);
          h1 = x64Xor(h1, k1);
          h1 = x64Rotl(h1, 27);
          h1 = x64Add(h1, h2);
          h1 = x64Add(x64Multiply(h1, [0, 5]), [0, 1390208809]);
          k2 = x64Multiply(k2, c2);
          k2 = x64Rotl(k2, 33);
          k2 = x64Multiply(k2, c1);
          h2 = x64Xor(h2, k2);
          h2 = x64Rotl(h2, 31);
          h2 = x64Add(h2, h1);
          h2 = x64Add(x64Multiply(h2, [0, 5]), [0, 944331445]);
        }
        k1 = [0, 0];
        k2 = [0, 0];
        switch (remainder) {
          case 15:
            k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 14)], 48));
          case 14:
            k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 13)], 40));
          case 13:
            k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 12)], 32));
          case 12:
            k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 11)], 24));
          case 11:
            k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 10)], 16));
          case 10:
            k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 9)], 8));
          case 9:
            k2 = x64Xor(k2, [0, key.charCodeAt(i + 8)]);
            k2 = x64Multiply(k2, c2);
            k2 = x64Rotl(k2, 33);
            k2 = x64Multiply(k2, c1);
            h2 = x64Xor(h2, k2);
          case 8:
            k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 7)], 56));
          case 7:
            k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 6)], 48));
          case 6:
            k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 5)], 40));
          case 5:
            k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 4)], 32));
          case 4:
            k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 3)], 24));
          case 3:
            k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 2)], 16));
          case 2:
            k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 1)], 8));
          case 1:
            k1 = x64Xor(k1, [0, key.charCodeAt(i)]);
            k1 = x64Multiply(k1, c1);
            k1 = x64Rotl(k1, 31);
            k1 = x64Multiply(k1, c2);
            h1 = x64Xor(h1, k1);
        }
        h1 = x64Xor(h1, [0, key.length]);
        h2 = x64Xor(h2, [0, key.length]);
        h1 = x64Add(h1, h2);
        h2 = x64Add(h2, h1);
        h1 = x64Fmix(h1);
        h2 = x64Fmix(h2);
        h1 = x64Add(h1, h2);
        h2 = x64Add(h2, h1);
        return ("00000000" + (h1[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h1[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[1] >>> 0).toString(16)).slice(-8);
      };
      var defaultOptions = {
        preprocessor: null,
        audio: {
          timeout: 1e3,
          // On iOS 11, audio context can only be used in response to user interaction.
          // We require users to explicitly enable audio fingerprinting on iOS 11.
          // See https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11#46534088
          excludeIOS11: true
        },
        fonts: {
          swfContainerId: "fingerprintjs2",
          swfPath: "flash/compiled/FontList.swf",
          userDefinedFonts: [],
          extendedJsFonts: false
        },
        screen: {
          // To ensure consistent fingerprints when users rotate their mobile devices
          detectScreenOrientation: true
        },
        plugins: {
          sortPluginsFor: [/palemoon/i],
          excludeIE: false
        },
        extraComponents: [],
        excludes: {
          // Unreliable on Windows, see https://github.com/fingerprintjs/fingerprintjs/issues/375
          "enumerateDevices": true,
          // devicePixelRatio depends on browser zoom, and it's impossible to detect browser zoom
          "pixelRatio": true,
          // DNT depends on incognito mode for some browsers (Chrome) and it's impossible to detect incognito mode
          "doNotTrack": true,
          // uses js fonts already
          "fontsFlash": true,
          // Extensions (including AdBlock) are disabled by default in Incognito mod of Chrome and Firefox
          // See https://github.com/fingerprintjs/fingerprintjs/issues/405
          "adBlock": true
        },
        NOT_AVAILABLE: "not available",
        ERROR: "error",
        EXCLUDED: "excluded"
      };
      var each = function(obj, iterator) {
        if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
          obj.forEach(iterator);
        } else if (obj.length === +obj.length) {
          for (var i = 0, l = obj.length; i < l; i++) {
            iterator(obj[i], i, obj);
          }
        } else {
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              iterator(obj[key], key, obj);
            }
          }
        }
      };
      var map = function(obj, iterator) {
        var results = [];
        if (obj == null) {
          return results;
        }
        if (Array.prototype.map && obj.map === Array.prototype.map) {
          return obj.map(iterator);
        }
        each(obj, function(value, index, list) {
          results.push(iterator(value, index, list));
        });
        return results;
      };
      var extendSoft = function(target, source) {
        if (source == null) {
          return target;
        }
        var value;
        var key;
        for (key in source) {
          value = source[key];
          if (value != null && !Object.prototype.hasOwnProperty.call(target, key)) {
            target[key] = value;
          }
        }
        return target;
      };
      var enumerateDevicesKey = function(done, options) {
        if (!isEnumerateDevicesSupported()) {
          return done(options.NOT_AVAILABLE);
        }
        navigator.mediaDevices.enumerateDevices().then(function(devices) {
          done(devices.map(function(device) {
            return "id=" + device.deviceId + ";gid=" + device.groupId + ";" + device.kind + ";" + device.label;
          }));
        }).catch(function(error) {
          done(error);
        });
      };
      var isEnumerateDevicesSupported = function() {
        return navigator.mediaDevices && navigator.mediaDevices.enumerateDevices;
      };
      var audioKey = function(done, options) {
        var audioOptions = options.audio;
        if (audioOptions.excludeIOS11 && navigator.userAgent.match(/OS 11.+Version\/11.+Safari/)) {
          return done(options.EXCLUDED);
        }
        var AudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
        if (AudioContext == null) {
          return done(options.NOT_AVAILABLE);
        }
        var context = new AudioContext(1, 44100, 44100);
        var oscillator = context.createOscillator();
        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(1e4, context.currentTime);
        var compressor = context.createDynamicsCompressor();
        each([
          ["threshold", -50],
          ["knee", 40],
          ["ratio", 12],
          ["reduction", -20],
          ["attack", 0],
          ["release", 0.25]
        ], function(item) {
          if (compressor[item[0]] !== void 0 && typeof compressor[item[0]].setValueAtTime === "function") {
            compressor[item[0]].setValueAtTime(item[1], context.currentTime);
          }
        });
        oscillator.connect(compressor);
        compressor.connect(context.destination);
        oscillator.start(0);
        context.startRendering();
        var audioTimeoutId = setTimeout(function() {
          console.warn('Audio fingerprint timed out. Please report bug at https://github.com/fingerprintjs/fingerprintjs with your user agent: "' + navigator.userAgent + '".');
          context.oncomplete = function() {
          };
          context = null;
          return done("audioTimeout");
        }, audioOptions.timeout);
        context.oncomplete = function(event) {
          var fingerprint;
          try {
            clearTimeout(audioTimeoutId);
            fingerprint = event.renderedBuffer.getChannelData(0).slice(4500, 5e3).reduce(function(acc, val) {
              return acc + Math.abs(val);
            }, 0).toString();
            oscillator.disconnect();
            compressor.disconnect();
          } catch (error) {
            done(error);
            return;
          }
          done(fingerprint);
        };
      };
      var UserAgent = function(done) {
        done(navigator.userAgent);
      };
      var webdriver = function(done, options) {
        done(navigator.webdriver == null ? options.NOT_AVAILABLE : navigator.webdriver);
      };
      var languageKey = function(done, options) {
        done(navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || options.NOT_AVAILABLE);
      };
      var colorDepthKey = function(done, options) {
        done(window.screen.colorDepth || options.NOT_AVAILABLE);
      };
      var deviceMemoryKey = function(done, options) {
        done(navigator.deviceMemory || options.NOT_AVAILABLE);
      };
      var pixelRatioKey = function(done, options) {
        done(window.devicePixelRatio || options.NOT_AVAILABLE);
      };
      var screenResolutionKey = function(done, options) {
        done(getScreenResolution(options));
      };
      var getScreenResolution = function(options) {
        var resolution = [window.screen.width, window.screen.height];
        if (options.screen.detectScreenOrientation) {
          resolution.sort().reverse();
        }
        return resolution;
      };
      var availableScreenResolutionKey = function(done, options) {
        done(getAvailableScreenResolution(options));
      };
      var getAvailableScreenResolution = function(options) {
        if (window.screen.availWidth && window.screen.availHeight) {
          var available = [window.screen.availHeight, window.screen.availWidth];
          if (options.screen.detectScreenOrientation) {
            available.sort().reverse();
          }
          return available;
        }
        return options.NOT_AVAILABLE;
      };
      var timezoneOffset = function(done) {
        done(new Date().getTimezoneOffset());
      };
      var timezone = function(done, options) {
        if (window.Intl && window.Intl.DateTimeFormat) {
          done(new window.Intl.DateTimeFormat().resolvedOptions().timeZone || options.NOT_AVAILABLE);
          return;
        }
        done(options.NOT_AVAILABLE);
      };
      var sessionStorageKey = function(done, options) {
        done(hasSessionStorage(options));
      };
      var localStorageKey = function(done, options) {
        done(hasLocalStorage(options));
      };
      var indexedDbKey = function(done, options) {
        done(hasIndexedDB(options));
      };
      var addBehaviorKey = function(done) {
        done(!!window.HTMLElement.prototype.addBehavior);
      };
      var openDatabaseKey = function(done) {
        done(!!window.openDatabase);
      };
      var cpuClassKey = function(done, options) {
        done(getNavigatorCpuClass(options));
      };
      var platformKey = function(done, options) {
        done(getNavigatorPlatform(options));
      };
      var doNotTrackKey = function(done, options) {
        done(getDoNotTrack(options));
      };
      var canvasKey = function(done, options) {
        if (isCanvasSupported()) {
          done(getCanvasFp(options));
          return;
        }
        done(options.NOT_AVAILABLE);
      };
      var webglKey = function(done, options) {
        if (isWebGlSupported()) {
          done(getWebglFp());
          return;
        }
        done(options.NOT_AVAILABLE);
      };
      var webglVendorAndRendererKey = function(done) {
        if (isWebGlSupported()) {
          done(getWebglVendorAndRenderer());
          return;
        }
        done();
      };
      var adBlockKey = function(done) {
        done(getAdBlock());
      };
      var hasLiedLanguagesKey = function(done) {
        done(getHasLiedLanguages());
      };
      var hasLiedResolutionKey = function(done) {
        done(getHasLiedResolution());
      };
      var hasLiedOsKey = function(done) {
        done(getHasLiedOs());
      };
      var hasLiedBrowserKey = function(done) {
        done(getHasLiedBrowser());
      };
      var flashFontsKey = function(done, options) {
        if (!hasSwfObjectLoaded()) {
          return done("swf object not loaded");
        }
        if (!hasMinFlashInstalled()) {
          return done("flash not installed");
        }
        if (!options.fonts.swfPath) {
          return done("missing options.fonts.swfPath");
        }
        loadSwfAndDetectFonts(function(fonts) {
          done(fonts);
        }, options);
      };
      var jsFontsKey = function(done, options) {
        var baseFonts = ["monospace", "sans-serif", "serif"];
        var fontList = [
          "Andale Mono",
          "Arial",
          "Arial Black",
          "Arial Hebrew",
          "Arial MT",
          "Arial Narrow",
          "Arial Rounded MT Bold",
          "Arial Unicode MS",
          "Bitstream Vera Sans Mono",
          "Book Antiqua",
          "Bookman Old Style",
          "Calibri",
          "Cambria",
          "Cambria Math",
          "Century",
          "Century Gothic",
          "Century Schoolbook",
          "Comic Sans",
          "Comic Sans MS",
          "Consolas",
          "Courier",
          "Courier New",
          "Geneva",
          "Georgia",
          "Helvetica",
          "Helvetica Neue",
          "Impact",
          "Lucida Bright",
          "Lucida Calligraphy",
          "Lucida Console",
          "Lucida Fax",
          "LUCIDA GRANDE",
          "Lucida Handwriting",
          "Lucida Sans",
          "Lucida Sans Typewriter",
          "Lucida Sans Unicode",
          "Microsoft Sans Serif",
          "Monaco",
          "Monotype Corsiva",
          "MS Gothic",
          "MS Outlook",
          "MS PGothic",
          "MS Reference Sans Serif",
          "MS Sans Serif",
          "MS Serif",
          "MYRIAD",
          "MYRIAD PRO",
          "Palatino",
          "Palatino Linotype",
          "Segoe Print",
          "Segoe Script",
          "Segoe UI",
          "Segoe UI Light",
          "Segoe UI Semibold",
          "Segoe UI Symbol",
          "Tahoma",
          "Times",
          "Times New Roman",
          "Times New Roman PS",
          "Trebuchet MS",
          "Verdana",
          "Wingdings",
          "Wingdings 2",
          "Wingdings 3"
        ];
        if (options.fonts.extendedJsFonts) {
          var extendedFontList = [
            "Abadi MT Condensed Light",
            "Academy Engraved LET",
            "ADOBE CASLON PRO",
            "Adobe Garamond",
            "ADOBE GARAMOND PRO",
            "Agency FB",
            "Aharoni",
            "Albertus Extra Bold",
            "Albertus Medium",
            "Algerian",
            "Amazone BT",
            "American Typewriter",
            "American Typewriter Condensed",
            "AmerType Md BT",
            "Andalus",
            "Angsana New",
            "AngsanaUPC",
            "Antique Olive",
            "Aparajita",
            "Apple Chancery",
            "Apple Color Emoji",
            "Apple SD Gothic Neo",
            "Arabic Typesetting",
            "ARCHER",
            "ARNO PRO",
            "Arrus BT",
            "Aurora Cn BT",
            "AvantGarde Bk BT",
            "AvantGarde Md BT",
            "AVENIR",
            "Ayuthaya",
            "Bandy",
            "Bangla Sangam MN",
            "Bank Gothic",
            "BankGothic Md BT",
            "Baskerville",
            "Baskerville Old Face",
            "Batang",
            "BatangChe",
            "Bauer Bodoni",
            "Bauhaus 93",
            "Bazooka",
            "Bell MT",
            "Bembo",
            "Benguiat Bk BT",
            "Berlin Sans FB",
            "Berlin Sans FB Demi",
            "Bernard MT Condensed",
            "BernhardFashion BT",
            "BernhardMod BT",
            "Big Caslon",
            "BinnerD",
            "Blackadder ITC",
            "BlairMdITC TT",
            "Bodoni 72",
            "Bodoni 72 Oldstyle",
            "Bodoni 72 Smallcaps",
            "Bodoni MT",
            "Bodoni MT Black",
            "Bodoni MT Condensed",
            "Bodoni MT Poster Compressed",
            "Bookshelf Symbol 7",
            "Boulder",
            "Bradley Hand",
            "Bradley Hand ITC",
            "Bremen Bd BT",
            "Britannic Bold",
            "Broadway",
            "Browallia New",
            "BrowalliaUPC",
            "Brush Script MT",
            "Californian FB",
            "Calisto MT",
            "Calligrapher",
            "Candara",
            "CaslonOpnface BT",
            "Castellar",
            "Centaur",
            "Cezanne",
            "CG Omega",
            "CG Times",
            "Chalkboard",
            "Chalkboard SE",
            "Chalkduster",
            "Charlesworth",
            "Charter Bd BT",
            "Charter BT",
            "Chaucer",
            "ChelthmITC Bk BT",
            "Chiller",
            "Clarendon",
            "Clarendon Condensed",
            "CloisterBlack BT",
            "Cochin",
            "Colonna MT",
            "Constantia",
            "Cooper Black",
            "Copperplate",
            "Copperplate Gothic",
            "Copperplate Gothic Bold",
            "Copperplate Gothic Light",
            "CopperplGoth Bd BT",
            "Corbel",
            "Cordia New",
            "CordiaUPC",
            "Cornerstone",
            "Coronet",
            "Cuckoo",
            "Curlz MT",
            "DaunPenh",
            "Dauphin",
            "David",
            "DB LCD Temp",
            "DELICIOUS",
            "Denmark",
            "DFKai-SB",
            "Didot",
            "DilleniaUPC",
            "DIN",
            "DokChampa",
            "Dotum",
            "DotumChe",
            "Ebrima",
            "Edwardian Script ITC",
            "Elephant",
            "English 111 Vivace BT",
            "Engravers MT",
            "EngraversGothic BT",
            "Eras Bold ITC",
            "Eras Demi ITC",
            "Eras Light ITC",
            "Eras Medium ITC",
            "EucrosiaUPC",
            "Euphemia",
            "Euphemia UCAS",
            "EUROSTILE",
            "Exotc350 Bd BT",
            "FangSong",
            "Felix Titling",
            "Fixedsys",
            "FONTIN",
            "Footlight MT Light",
            "Forte",
            "FrankRuehl",
            "Fransiscan",
            "Freefrm721 Blk BT",
            "FreesiaUPC",
            "Freestyle Script",
            "French Script MT",
            "FrnkGothITC Bk BT",
            "Fruitger",
            "FRUTIGER",
            "Futura",
            "Futura Bk BT",
            "Futura Lt BT",
            "Futura Md BT",
            "Futura ZBlk BT",
            "FuturaBlack BT",
            "Gabriola",
            "Galliard BT",
            "Gautami",
            "Geeza Pro",
            "Geometr231 BT",
            "Geometr231 Hv BT",
            "Geometr231 Lt BT",
            "GeoSlab 703 Lt BT",
            "GeoSlab 703 XBd BT",
            "Gigi",
            "Gill Sans",
            "Gill Sans MT",
            "Gill Sans MT Condensed",
            "Gill Sans MT Ext Condensed Bold",
            "Gill Sans Ultra Bold",
            "Gill Sans Ultra Bold Condensed",
            "Gisha",
            "Gloucester MT Extra Condensed",
            "GOTHAM",
            "GOTHAM BOLD",
            "Goudy Old Style",
            "Goudy Stout",
            "GoudyHandtooled BT",
            "GoudyOLSt BT",
            "Gujarati Sangam MN",
            "Gulim",
            "GulimChe",
            "Gungsuh",
            "GungsuhChe",
            "Gurmukhi MN",
            "Haettenschweiler",
            "Harlow Solid Italic",
            "Harrington",
            "Heather",
            "Heiti SC",
            "Heiti TC",
            "HELV",
            "Herald",
            "High Tower Text",
            "Hiragino Kaku Gothic ProN",
            "Hiragino Mincho ProN",
            "Hoefler Text",
            "Humanst 521 Cn BT",
            "Humanst521 BT",
            "Humanst521 Lt BT",
            "Imprint MT Shadow",
            "Incised901 Bd BT",
            "Incised901 BT",
            "Incised901 Lt BT",
            "INCONSOLATA",
            "Informal Roman",
            "Informal011 BT",
            "INTERSTATE",
            "IrisUPC",
            "Iskoola Pota",
            "JasmineUPC",
            "Jazz LET",
            "Jenson",
            "Jester",
            "Jokerman",
            "Juice ITC",
            "Kabel Bk BT",
            "Kabel Ult BT",
            "Kailasa",
            "KaiTi",
            "Kalinga",
            "Kannada Sangam MN",
            "Kartika",
            "Kaufmann Bd BT",
            "Kaufmann BT",
            "Khmer UI",
            "KodchiangUPC",
            "Kokila",
            "Korinna BT",
            "Kristen ITC",
            "Krungthep",
            "Kunstler Script",
            "Lao UI",
            "Latha",
            "Leelawadee",
            "Letter Gothic",
            "Levenim MT",
            "LilyUPC",
            "Lithograph",
            "Lithograph Light",
            "Long Island",
            "Lydian BT",
            "Magneto",
            "Maiandra GD",
            "Malayalam Sangam MN",
            "Malgun Gothic",
            "Mangal",
            "Marigold",
            "Marion",
            "Marker Felt",
            "Market",
            "Marlett",
            "Matisse ITC",
            "Matura MT Script Capitals",
            "Meiryo",
            "Meiryo UI",
            "Microsoft Himalaya",
            "Microsoft JhengHei",
            "Microsoft New Tai Lue",
            "Microsoft PhagsPa",
            "Microsoft Tai Le",
            "Microsoft Uighur",
            "Microsoft YaHei",
            "Microsoft Yi Baiti",
            "MingLiU",
            "MingLiU_HKSCS",
            "MingLiU_HKSCS-ExtB",
            "MingLiU-ExtB",
            "Minion",
            "Minion Pro",
            "Miriam",
            "Miriam Fixed",
            "Mistral",
            "Modern",
            "Modern No. 20",
            "Mona Lisa Solid ITC TT",
            "Mongolian Baiti",
            "MONO",
            "MoolBoran",
            "Mrs Eaves",
            "MS LineDraw",
            "MS Mincho",
            "MS PMincho",
            "MS Reference Specialty",
            "MS UI Gothic",
            "MT Extra",
            "MUSEO",
            "MV Boli",
            "Nadeem",
            "Narkisim",
            "NEVIS",
            "News Gothic",
            "News GothicMT",
            "NewsGoth BT",
            "Niagara Engraved",
            "Niagara Solid",
            "Noteworthy",
            "NSimSun",
            "Nyala",
            "OCR A Extended",
            "Old Century",
            "Old English Text MT",
            "Onyx",
            "Onyx BT",
            "OPTIMA",
            "Oriya Sangam MN",
            "OSAKA",
            "OzHandicraft BT",
            "Palace Script MT",
            "Papyrus",
            "Parchment",
            "Party LET",
            "Pegasus",
            "Perpetua",
            "Perpetua Titling MT",
            "PetitaBold",
            "Pickwick",
            "Plantagenet Cherokee",
            "Playbill",
            "PMingLiU",
            "PMingLiU-ExtB",
            "Poor Richard",
            "Poster",
            "PosterBodoni BT",
            "PRINCETOWN LET",
            "Pristina",
            "PTBarnum BT",
            "Pythagoras",
            "Raavi",
            "Rage Italic",
            "Ravie",
            "Ribbon131 Bd BT",
            "Rockwell",
            "Rockwell Condensed",
            "Rockwell Extra Bold",
            "Rod",
            "Roman",
            "Sakkal Majalla",
            "Santa Fe LET",
            "Savoye LET",
            "Sceptre",
            "Script",
            "Script MT Bold",
            "SCRIPTINA",
            "Serifa",
            "Serifa BT",
            "Serifa Th BT",
            "ShelleyVolante BT",
            "Sherwood",
            "Shonar Bangla",
            "Showcard Gothic",
            "Shruti",
            "Signboard",
            "SILKSCREEN",
            "SimHei",
            "Simplified Arabic",
            "Simplified Arabic Fixed",
            "SimSun",
            "SimSun-ExtB",
            "Sinhala Sangam MN",
            "Sketch Rockwell",
            "Skia",
            "Small Fonts",
            "Snap ITC",
            "Snell Roundhand",
            "Socket",
            "Souvenir Lt BT",
            "Staccato222 BT",
            "Steamer",
            "Stencil",
            "Storybook",
            "Styllo",
            "Subway",
            "Swis721 BlkEx BT",
            "Swiss911 XCm BT",
            "Sylfaen",
            "Synchro LET",
            "System",
            "Tamil Sangam MN",
            "Technical",
            "Teletype",
            "Telugu Sangam MN",
            "Tempus Sans ITC",
            "Terminal",
            "Thonburi",
            "Traditional Arabic",
            "Trajan",
            "TRAJAN PRO",
            "Tristan",
            "Tubular",
            "Tunga",
            "Tw Cen MT",
            "Tw Cen MT Condensed",
            "Tw Cen MT Condensed Extra Bold",
            "TypoUpright BT",
            "Unicorn",
            "Univers",
            "Univers CE 55 Medium",
            "Univers Condensed",
            "Utsaah",
            "Vagabond",
            "Vani",
            "Vijaya",
            "Viner Hand ITC",
            "VisualUI",
            "Vivaldi",
            "Vladimir Script",
            "Vrinda",
            "Westminster",
            "WHITNEY",
            "Wide Latin",
            "ZapfEllipt BT",
            "ZapfHumnst BT",
            "ZapfHumnst Dm BT",
            "Zapfino",
            "Zurich BlkEx BT",
            "Zurich Ex BT",
            "ZWAdobeF"
          ];
          fontList = fontList.concat(extendedFontList);
        }
        fontList = fontList.concat(options.fonts.userDefinedFonts);
        fontList = fontList.filter(function(font, position) {
          return fontList.indexOf(font) === position;
        });
        var testString = "mmmmmmmmmmlli";
        var testSize = "72px";
        var h = document.getElementsByTagName("body")[0];
        var baseFontsDiv = document.createElement("div");
        var fontsDiv = document.createElement("div");
        var defaultWidth = {};
        var defaultHeight = {};
        var createSpan = function() {
          var s = document.createElement("span");
          s.style.position = "absolute";
          s.style.left = "-9999px";
          s.style.fontSize = testSize;
          s.style.fontStyle = "normal";
          s.style.fontWeight = "normal";
          s.style.letterSpacing = "normal";
          s.style.lineBreak = "auto";
          s.style.lineHeight = "normal";
          s.style.textTransform = "none";
          s.style.textAlign = "left";
          s.style.textDecoration = "none";
          s.style.textShadow = "none";
          s.style.whiteSpace = "normal";
          s.style.wordBreak = "normal";
          s.style.wordSpacing = "normal";
          s.innerHTML = testString;
          return s;
        };
        var createSpanWithFonts = function(fontToDetect, baseFont) {
          var s = createSpan();
          s.style.fontFamily = "'" + fontToDetect + "'," + baseFont;
          return s;
        };
        var initializeBaseFontsSpans = function() {
          var spans = [];
          for (var index2 = 0, length2 = baseFonts.length; index2 < length2; index2++) {
            var s = createSpan();
            s.style.fontFamily = baseFonts[index2];
            baseFontsDiv.appendChild(s);
            spans.push(s);
          }
          return spans;
        };
        var initializeFontsSpans = function() {
          var spans = {};
          for (var i2 = 0, l2 = fontList.length; i2 < l2; i2++) {
            var fontSpans = [];
            for (var j = 0, numDefaultFonts = baseFonts.length; j < numDefaultFonts; j++) {
              var s = createSpanWithFonts(fontList[i2], baseFonts[j]);
              fontsDiv.appendChild(s);
              fontSpans.push(s);
            }
            spans[fontList[i2]] = fontSpans;
          }
          return spans;
        };
        var isFontAvailable = function(fontSpans) {
          var detected = false;
          for (var i2 = 0; i2 < baseFonts.length; i2++) {
            detected = fontSpans[i2].offsetWidth !== defaultWidth[baseFonts[i2]] || fontSpans[i2].offsetHeight !== defaultHeight[baseFonts[i2]];
            if (detected) {
              return detected;
            }
          }
          return detected;
        };
        var baseFontsSpans = initializeBaseFontsSpans();
        h.appendChild(baseFontsDiv);
        for (var index = 0, length = baseFonts.length; index < length; index++) {
          defaultWidth[baseFonts[index]] = baseFontsSpans[index].offsetWidth;
          defaultHeight[baseFonts[index]] = baseFontsSpans[index].offsetHeight;
        }
        var fontsSpans = initializeFontsSpans();
        h.appendChild(fontsDiv);
        var available = [];
        for (var i = 0, l = fontList.length; i < l; i++) {
          if (isFontAvailable(fontsSpans[fontList[i]])) {
            available.push(fontList[i]);
          }
        }
        h.removeChild(fontsDiv);
        h.removeChild(baseFontsDiv);
        done(available);
      };
      var pluginsComponent = function(done, options) {
        if (isIE()) {
          if (!options.plugins.excludeIE) {
            done(getIEPlugins(options));
          } else {
            done(options.EXCLUDED);
          }
        } else {
          done(getRegularPlugins(options));
        }
      };
      var getRegularPlugins = function(options) {
        if (navigator.plugins == null) {
          return options.NOT_AVAILABLE;
        }
        var plugins = [];
        for (var i = 0, l = navigator.plugins.length; i < l; i++) {
          if (navigator.plugins[i]) {
            plugins.push(navigator.plugins[i]);
          }
        }
        if (pluginsShouldBeSorted(options)) {
          plugins = plugins.sort(function(a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          });
        }
        return map(plugins, function(p) {
          var mimeTypes = map(p, function(mt) {
            return [mt.type, mt.suffixes];
          });
          return [p.name, p.description, mimeTypes];
        });
      };
      var getIEPlugins = function(options) {
        var result = [];
        if (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject") || "ActiveXObject" in window) {
          var names = [
            "AcroPDF.PDF",
            // Adobe PDF reader 7+
            "Adodb.Stream",
            "AgControl.AgControl",
            // Silverlight
            "DevalVRXCtrl.DevalVRXCtrl.1",
            "MacromediaFlashPaper.MacromediaFlashPaper",
            "Msxml2.DOMDocument",
            "Msxml2.XMLHTTP",
            "PDF.PdfCtrl",
            // Adobe PDF reader 6 and earlier, brrr
            "QuickTime.QuickTime",
            // QuickTime
            "QuickTimeCheckObject.QuickTimeCheck.1",
            "RealPlayer",
            "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)",
            "RealVideo.RealVideo(tm) ActiveX Control (32-bit)",
            "Scripting.Dictionary",
            "SWCtl.SWCtl",
            // ShockWave player
            "Shell.UIHelper",
            "ShockwaveFlash.ShockwaveFlash",
            // flash plugin
            "Skype.Detection",
            "TDCCtl.TDCCtl",
            "WMPlayer.OCX",
            // Windows media player
            "rmocx.RealPlayer G2 Control",
            "rmocx.RealPlayer G2 Control.1"
          ];
          result = map(names, function(name) {
            try {
              new window.ActiveXObject(name);
              return name;
            } catch (e) {
              return options.ERROR;
            }
          });
        } else {
          result.push(options.NOT_AVAILABLE);
        }
        if (navigator.plugins) {
          result = result.concat(getRegularPlugins(options));
        }
        return result;
      };
      var pluginsShouldBeSorted = function(options) {
        var should = false;
        for (var i = 0, l = options.plugins.sortPluginsFor.length; i < l; i++) {
          var re = options.plugins.sortPluginsFor[i];
          if (navigator.userAgent.match(re)) {
            should = true;
            break;
          }
        }
        return should;
      };
      var touchSupportKey = function(done) {
        done(getTouchSupport());
      };
      var hardwareConcurrencyKey = function(done, options) {
        done(getHardwareConcurrency(options));
      };
      var hasSessionStorage = function(options) {
        try {
          return !!window.sessionStorage;
        } catch (e) {
          return options.ERROR;
        }
      };
      var hasLocalStorage = function(options) {
        try {
          return !!window.localStorage;
        } catch (e) {
          return options.ERROR;
        }
      };
      var hasIndexedDB = function(options) {
        if (isIEOrOldEdge()) {
          return options.EXCLUDED;
        }
        try {
          return !!window.indexedDB;
        } catch (e) {
          return options.ERROR;
        }
      };
      var getHardwareConcurrency = function(options) {
        if (navigator.hardwareConcurrency) {
          return navigator.hardwareConcurrency;
        }
        return options.NOT_AVAILABLE;
      };
      var getNavigatorCpuClass = function(options) {
        return navigator.cpuClass || options.NOT_AVAILABLE;
      };
      var getNavigatorPlatform = function(options) {
        if (navigator.platform) {
          return navigator.platform;
        } else {
          return options.NOT_AVAILABLE;
        }
      };
      var getDoNotTrack = function(options) {
        if (navigator.doNotTrack) {
          return navigator.doNotTrack;
        } else if (navigator.msDoNotTrack) {
          return navigator.msDoNotTrack;
        } else if (window.doNotTrack) {
          return window.doNotTrack;
        } else {
          return options.NOT_AVAILABLE;
        }
      };
      var getTouchSupport = function() {
        var maxTouchPoints = 0;
        var touchEvent;
        if (typeof navigator.maxTouchPoints !== "undefined") {
          maxTouchPoints = navigator.maxTouchPoints;
        } else if (typeof navigator.msMaxTouchPoints !== "undefined") {
          maxTouchPoints = navigator.msMaxTouchPoints;
        }
        try {
          document.createEvent("TouchEvent");
          touchEvent = true;
        } catch (_) {
          touchEvent = false;
        }
        var touchStart = "ontouchstart" in window;
        return [maxTouchPoints, touchEvent, touchStart];
      };
      var getCanvasFp = function(options) {
        var result = [];
        var canvas = document.createElement("canvas");
        canvas.width = 2e3;
        canvas.height = 200;
        canvas.style.display = "inline";
        var ctx = canvas.getContext("2d");
        ctx.rect(0, 0, 10, 10);
        ctx.rect(2, 2, 6, 6);
        result.push("canvas winding:" + (ctx.isPointInPath(5, 5, "evenodd") === false ? "yes" : "no"));
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = "#069";
        if (options.dontUseFakeFontInCanvas) {
          ctx.font = "11pt Arial";
        } else {
          ctx.font = "11pt no-real-font-123";
        }
        ctx.fillText("Cwm fjordbank glyphs vext quiz, 😃", 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.2)";
        ctx.font = "18pt Arial";
        ctx.fillText("Cwm fjordbank glyphs vext quiz, 😃", 4, 45);
        ctx.globalCompositeOperation = "multiply";
        ctx.fillStyle = "rgb(255,0,255)";
        ctx.beginPath();
        ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "rgb(0,255,255)";
        ctx.beginPath();
        ctx.arc(100, 50, 50, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "rgb(255,255,0)";
        ctx.beginPath();
        ctx.arc(75, 100, 50, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "rgb(255,0,255)";
        ctx.arc(75, 75, 75, 0, Math.PI * 2, true);
        ctx.arc(75, 75, 25, 0, Math.PI * 2, true);
        ctx.fill("evenodd");
        if (canvas.toDataURL) {
          result.push("canvas fp:" + canvas.toDataURL());
        }
        return result;
      };
      var getWebglFp = function() {
        var gl;
        var fa2s = function(fa) {
          gl.clearColor(0, 0, 0, 1);
          gl.enable(gl.DEPTH_TEST);
          gl.depthFunc(gl.LEQUAL);
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
          return "[" + fa[0] + ", " + fa[1] + "]";
        };
        var maxAnisotropy = function(gl2) {
          var ext = gl2.getExtension("EXT_texture_filter_anisotropic") || gl2.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || gl2.getExtension("MOZ_EXT_texture_filter_anisotropic");
          if (ext) {
            var anisotropy = gl2.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
            if (anisotropy === 0) {
              anisotropy = 2;
            }
            return anisotropy;
          } else {
            return null;
          }
        };
        gl = getWebglCanvas();
        if (!gl) {
          return null;
        }
        var result = [];
        var vShaderTemplate = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}";
        var fShaderTemplate = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}";
        var vertexPosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
        var vertices = new Float32Array([-0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0]);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        vertexPosBuffer.itemSize = 3;
        vertexPosBuffer.numItems = 3;
        var program = gl.createProgram();
        var vshader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vshader, vShaderTemplate);
        gl.compileShader(vshader);
        var fshader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fshader, fShaderTemplate);
        gl.compileShader(fshader);
        gl.attachShader(program, vshader);
        gl.attachShader(program, fshader);
        gl.linkProgram(program);
        gl.useProgram(program);
        program.vertexPosAttrib = gl.getAttribLocation(program, "attrVertex");
        program.offsetUniform = gl.getUniformLocation(program, "uniformOffset");
        gl.enableVertexAttribArray(program.vertexPosArray);
        gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.uniform2f(program.offsetUniform, 1, 1);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);
        try {
          result.push(gl.canvas.toDataURL());
        } catch (e) {
        }
        result.push("extensions:" + (gl.getSupportedExtensions() || []).join(";"));
        result.push("webgl aliased line width range:" + fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)));
        result.push("webgl aliased point size range:" + fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)));
        result.push("webgl alpha bits:" + gl.getParameter(gl.ALPHA_BITS));
        result.push("webgl antialiasing:" + (gl.getContextAttributes().antialias ? "yes" : "no"));
        result.push("webgl blue bits:" + gl.getParameter(gl.BLUE_BITS));
        result.push("webgl depth bits:" + gl.getParameter(gl.DEPTH_BITS));
        result.push("webgl green bits:" + gl.getParameter(gl.GREEN_BITS));
        result.push("webgl max anisotropy:" + maxAnisotropy(gl));
        result.push("webgl max combined texture image units:" + gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
        result.push("webgl max cube map texture size:" + gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE));
        result.push("webgl max fragment uniform vectors:" + gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS));
        result.push("webgl max render buffer size:" + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));
        result.push("webgl max texture image units:" + gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
        result.push("webgl max texture size:" + gl.getParameter(gl.MAX_TEXTURE_SIZE));
        result.push("webgl max varying vectors:" + gl.getParameter(gl.MAX_VARYING_VECTORS));
        result.push("webgl max vertex attribs:" + gl.getParameter(gl.MAX_VERTEX_ATTRIBS));
        result.push("webgl max vertex texture image units:" + gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
        result.push("webgl max vertex uniform vectors:" + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS));
        result.push("webgl max viewport dims:" + fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)));
        result.push("webgl red bits:" + gl.getParameter(gl.RED_BITS));
        result.push("webgl renderer:" + gl.getParameter(gl.RENDERER));
        result.push("webgl shading language version:" + gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
        result.push("webgl stencil bits:" + gl.getParameter(gl.STENCIL_BITS));
        result.push("webgl vendor:" + gl.getParameter(gl.VENDOR));
        result.push("webgl version:" + gl.getParameter(gl.VERSION));
        try {
          var extensionDebugRendererInfo = gl.getExtension("WEBGL_debug_renderer_info");
          if (extensionDebugRendererInfo) {
            result.push("webgl unmasked vendor:" + gl.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL));
            result.push("webgl unmasked renderer:" + gl.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL));
          }
        } catch (e) {
        }
        if (!gl.getShaderPrecisionFormat) {
          loseWebglContext(gl);
          return result;
        }
        each(["FLOAT", "INT"], function(numType) {
          each(["VERTEX", "FRAGMENT"], function(shader) {
            each(["HIGH", "MEDIUM", "LOW"], function(numSize) {
              each(["precision", "rangeMin", "rangeMax"], function(key) {
                var format = gl.getShaderPrecisionFormat(gl[shader + "_SHADER"], gl[numSize + "_" + numType])[key];
                if (key !== "precision") {
                  key = "precision " + key;
                }
                var line = ["webgl ", shader.toLowerCase(), " shader ", numSize.toLowerCase(), " ", numType.toLowerCase(), " ", key, ":", format].join("");
                result.push(line);
              });
            });
          });
        });
        loseWebglContext(gl);
        return result;
      };
      var getWebglVendorAndRenderer = function() {
        try {
          var glContext = getWebglCanvas();
          var extensionDebugRendererInfo = glContext.getExtension("WEBGL_debug_renderer_info");
          var params = glContext.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL) + "~" + glContext.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL);
          loseWebglContext(glContext);
          return params;
        } catch (e) {
          return null;
        }
      };
      var getAdBlock = function() {
        var ads = document.createElement("div");
        ads.innerHTML = "&nbsp;";
        ads.className = "adsbox";
        var result = false;
        try {
          document.body.appendChild(ads);
          result = document.getElementsByClassName("adsbox")[0].offsetHeight === 0;
          document.body.removeChild(ads);
        } catch (e) {
          result = false;
        }
        return result;
      };
      var getHasLiedLanguages = function() {
        if (typeof navigator.languages !== "undefined") {
          try {
            var firstLanguages = navigator.languages[0].substr(0, 2);
            if (firstLanguages !== navigator.language.substr(0, 2)) {
              return true;
            }
          } catch (err) {
            return true;
          }
        }
        return false;
      };
      var getHasLiedResolution = function() {
        return window.screen.width < window.screen.availWidth || window.screen.height < window.screen.availHeight;
      };
      var getHasLiedOs = function() {
        var userAgent = navigator.userAgent.toLowerCase();
        var oscpu = navigator.oscpu;
        var platform = navigator.platform.toLowerCase();
        var os;
        if (userAgent.indexOf("windows phone") >= 0) {
          os = "Windows Phone";
        } else if (userAgent.indexOf("windows") >= 0 || userAgent.indexOf("win16") >= 0 || userAgent.indexOf("win32") >= 0 || userAgent.indexOf("win64") >= 0 || userAgent.indexOf("win95") >= 0 || userAgent.indexOf("win98") >= 0 || userAgent.indexOf("winnt") >= 0 || userAgent.indexOf("wow64") >= 0) {
          os = "Windows";
        } else if (userAgent.indexOf("android") >= 0) {
          os = "Android";
        } else if (userAgent.indexOf("linux") >= 0 || userAgent.indexOf("cros") >= 0 || userAgent.indexOf("x11") >= 0) {
          os = "Linux";
        } else if (userAgent.indexOf("iphone") >= 0 || userAgent.indexOf("ipad") >= 0 || userAgent.indexOf("ipod") >= 0 || userAgent.indexOf("crios") >= 0 || userAgent.indexOf("fxios") >= 0) {
          os = "iOS";
        } else if (userAgent.indexOf("macintosh") >= 0 || userAgent.indexOf("mac_powerpc)") >= 0) {
          os = "Mac";
        } else {
          os = "Other";
        }
        var mobileDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        if (mobileDevice && os !== "Windows" && os !== "Windows Phone" && os !== "Android" && os !== "iOS" && os !== "Other" && userAgent.indexOf("cros") === -1) {
          return true;
        }
        if (typeof oscpu !== "undefined") {
          oscpu = oscpu.toLowerCase();
          if (oscpu.indexOf("win") >= 0 && os !== "Windows" && os !== "Windows Phone") {
            return true;
          } else if (oscpu.indexOf("linux") >= 0 && os !== "Linux" && os !== "Android") {
            return true;
          } else if (oscpu.indexOf("mac") >= 0 && os !== "Mac" && os !== "iOS") {
            return true;
          } else if ((oscpu.indexOf("win") === -1 && oscpu.indexOf("linux") === -1 && oscpu.indexOf("mac") === -1) !== (os === "Other")) {
            return true;
          }
        }
        if (platform.indexOf("win") >= 0 && os !== "Windows" && os !== "Windows Phone") {
          return true;
        } else if ((platform.indexOf("linux") >= 0 || platform.indexOf("android") >= 0 || platform.indexOf("pike") >= 0) && os !== "Linux" && os !== "Android") {
          return true;
        } else if ((platform.indexOf("mac") >= 0 || platform.indexOf("ipad") >= 0 || platform.indexOf("ipod") >= 0 || platform.indexOf("iphone") >= 0) && os !== "Mac" && os !== "iOS") {
          return true;
        } else if (platform.indexOf("arm") >= 0 && os === "Windows Phone") {
          return false;
        } else if (platform.indexOf("pike") >= 0 && userAgent.indexOf("opera mini") >= 0) {
          return false;
        } else {
          var platformIsOther = platform.indexOf("win") < 0 && platform.indexOf("linux") < 0 && platform.indexOf("mac") < 0 && platform.indexOf("iphone") < 0 && platform.indexOf("ipad") < 0 && platform.indexOf("ipod") < 0;
          if (platformIsOther !== (os === "Other")) {
            return true;
          }
        }
        return typeof navigator.plugins === "undefined" && os !== "Windows" && os !== "Windows Phone";
      };
      var getHasLiedBrowser = function() {
        var userAgent = navigator.userAgent.toLowerCase();
        var productSub = navigator.productSub;
        var browser;
        if (userAgent.indexOf("edge/") >= 0 || userAgent.indexOf("iemobile/") >= 0) {
          return false;
        } else if (userAgent.indexOf("opera mini") >= 0) {
          return false;
        } else if (userAgent.indexOf("firefox/") >= 0) {
          browser = "Firefox";
        } else if (userAgent.indexOf("opera/") >= 0 || userAgent.indexOf(" opr/") >= 0) {
          browser = "Opera";
        } else if (userAgent.indexOf("chrome/") >= 0) {
          browser = "Chrome";
        } else if (userAgent.indexOf("safari/") >= 0) {
          if (userAgent.indexOf("android 1.") >= 0 || userAgent.indexOf("android 2.") >= 0 || userAgent.indexOf("android 3.") >= 0 || userAgent.indexOf("android 4.") >= 0) {
            browser = "AOSP";
          } else {
            browser = "Safari";
          }
        } else if (userAgent.indexOf("trident/") >= 0) {
          browser = "Internet Explorer";
        } else {
          browser = "Other";
        }
        if ((browser === "Chrome" || browser === "Safari" || browser === "Opera") && productSub !== "20030107") {
          return true;
        }
        var tempRes = eval.toString().length;
        if (tempRes === 37 && browser !== "Safari" && browser !== "Firefox" && browser !== "Other") {
          return true;
        } else if (tempRes === 39 && browser !== "Internet Explorer" && browser !== "Other") {
          return true;
        } else if (tempRes === 33 && browser !== "Chrome" && browser !== "AOSP" && browser !== "Opera" && browser !== "Other") {
          return true;
        }
        var errFirefox;
        try {
          throw "a";
        } catch (err) {
          try {
            err.toSource();
            errFirefox = true;
          } catch (errOfErr) {
            errFirefox = false;
          }
        }
        return errFirefox && browser !== "Firefox" && browser !== "Other";
      };
      var isCanvasSupported = function() {
        var elem = document.createElement("canvas");
        return !!(elem.getContext && elem.getContext("2d"));
      };
      var isWebGlSupported = function() {
        if (!isCanvasSupported()) {
          return false;
        }
        var glContext = getWebglCanvas();
        var isSupported = !!window.WebGLRenderingContext && !!glContext;
        loseWebglContext(glContext);
        return isSupported;
      };
      var isIE = function() {
        if (navigator.appName === "Microsoft Internet Explorer") {
          return true;
        } else if (navigator.appName === "Netscape" && /Trident/.test(navigator.userAgent)) {
          return true;
        }
        return false;
      };
      var isIEOrOldEdge = function() {
        return ("msWriteProfilerMark" in window) + ("msLaunchUri" in navigator) + ("msSaveBlob" in navigator) >= 2;
      };
      var hasSwfObjectLoaded = function() {
        return typeof window.swfobject !== "undefined";
      };
      var hasMinFlashInstalled = function() {
        return window.swfobject.hasFlashPlayerVersion("9.0.0");
      };
      var addFlashDivNode = function(options) {
        var node = document.createElement("div");
        node.setAttribute("id", options.fonts.swfContainerId);
        document.body.appendChild(node);
      };
      var loadSwfAndDetectFonts = function(done, options) {
        var hiddenCallback = "___fp_swf_loaded";
        window[hiddenCallback] = function(fonts) {
          done(fonts);
        };
        var id = options.fonts.swfContainerId;
        addFlashDivNode();
        var flashvars = { onReady: hiddenCallback };
        var flashparams = { allowScriptAccess: "always", menu: "false" };
        window.swfobject.embedSWF(options.fonts.swfPath, id, "1", "1", "9.0.0", false, flashvars, flashparams, {});
      };
      var getWebglCanvas = function() {
        var canvas = document.createElement("canvas");
        var gl = null;
        try {
          gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        } catch (e) {
        }
        if (!gl) {
          gl = null;
        }
        return gl;
      };
      var loseWebglContext = function(context) {
        var loseContextExtension = context.getExtension("WEBGL_lose_context");
        if (loseContextExtension != null) {
          loseContextExtension.loseContext();
        }
      };
      var components = [
        { key: "userAgent", getData: UserAgent },
        { key: "webdriver", getData: webdriver },
        { key: "language", getData: languageKey },
        { key: "colorDepth", getData: colorDepthKey },
        { key: "deviceMemory", getData: deviceMemoryKey },
        { key: "pixelRatio", getData: pixelRatioKey },
        { key: "hardwareConcurrency", getData: hardwareConcurrencyKey },
        { key: "screenResolution", getData: screenResolutionKey },
        { key: "availableScreenResolution", getData: availableScreenResolutionKey },
        { key: "timezoneOffset", getData: timezoneOffset },
        { key: "timezone", getData: timezone },
        { key: "sessionStorage", getData: sessionStorageKey },
        { key: "localStorage", getData: localStorageKey },
        { key: "indexedDb", getData: indexedDbKey },
        { key: "addBehavior", getData: addBehaviorKey },
        { key: "openDatabase", getData: openDatabaseKey },
        { key: "cpuClass", getData: cpuClassKey },
        { key: "platform", getData: platformKey },
        { key: "doNotTrack", getData: doNotTrackKey },
        { key: "plugins", getData: pluginsComponent },
        { key: "canvas", getData: canvasKey },
        { key: "webgl", getData: webglKey },
        { key: "webglVendorAndRenderer", getData: webglVendorAndRendererKey },
        { key: "adBlock", getData: adBlockKey },
        { key: "hasLiedLanguages", getData: hasLiedLanguagesKey },
        { key: "hasLiedResolution", getData: hasLiedResolutionKey },
        { key: "hasLiedOs", getData: hasLiedOsKey },
        { key: "hasLiedBrowser", getData: hasLiedBrowserKey },
        { key: "touchSupport", getData: touchSupportKey },
        { key: "fonts", getData: jsFontsKey, pauseBefore: true },
        { key: "fontsFlash", getData: flashFontsKey, pauseBefore: true },
        { key: "audio", getData: audioKey },
        { key: "enumerateDevices", getData: enumerateDevicesKey }
      ];
      var Fingerprint22 = function(options) {
        throw new Error("'new Fingerprint()' is deprecated, see https://github.com/fingerprintjs/fingerprintjs#upgrade-guide-from-182-to-200");
      };
      Fingerprint22.get = function(options, callback) {
        if (!callback) {
          callback = options;
          options = {};
        } else if (!options) {
          options = {};
        }
        extendSoft(options, defaultOptions);
        options.components = options.extraComponents.concat(components);
        var keys = {
          data: [],
          addPreprocessedComponent: function(key, value) {
            if (typeof options.preprocessor === "function") {
              value = options.preprocessor(key, value);
            }
            keys.data.push({ key, value });
          }
        };
        var i = -1;
        var chainComponents = function(alreadyWaited) {
          i += 1;
          if (i >= options.components.length) {
            callback(keys.data);
            return;
          }
          var component = options.components[i];
          if (options.excludes[component.key]) {
            chainComponents(false);
            return;
          }
          if (!alreadyWaited && component.pauseBefore) {
            i -= 1;
            setTimeout(function() {
              chainComponents(true);
            }, 1);
            return;
          }
          try {
            component.getData(function(value) {
              keys.addPreprocessedComponent(component.key, value);
              chainComponents(false);
            }, options);
          } catch (error) {
            keys.addPreprocessedComponent(component.key, String(error));
            chainComponents(false);
          }
        };
        chainComponents(false);
      };
      Fingerprint22.getPromise = function(options) {
        return new Promise(function(resolve, reject) {
          Fingerprint22.get(options, resolve);
        });
      };
      Fingerprint22.getV18 = function(options, callback) {
        if (callback == null) {
          callback = options;
          options = {};
        }
        return Fingerprint22.get(options, function(components2) {
          var newComponents = [];
          for (var i = 0; i < components2.length; i++) {
            var component = components2[i];
            if (component.value === (options.NOT_AVAILABLE || "not available")) {
              newComponents.push({ key: component.key, value: "unknown" });
            } else if (component.key === "plugins") {
              newComponents.push({
                key: "plugins",
                value: map(component.value, function(p) {
                  var mimeTypes = map(p[2], function(mt) {
                    if (mt.join) {
                      return mt.join("~");
                    }
                    return mt;
                  }).join(",");
                  return [p[0], p[1], mimeTypes].join("::");
                })
              });
            } else if (["canvas", "webgl"].indexOf(component.key) !== -1 && Array.isArray(component.value)) {
              newComponents.push({ key: component.key, value: component.value.join("~") });
            } else if (["sessionStorage", "localStorage", "indexedDb", "addBehavior", "openDatabase"].indexOf(component.key) !== -1) {
              if (component.value) {
                newComponents.push({ key: component.key, value: 1 });
              } else {
                continue;
              }
            } else {
              if (component.value) {
                newComponents.push(component.value.join ? { key: component.key, value: component.value.join(";") } : component);
              } else {
                newComponents.push({ key: component.key, value: component.value });
              }
            }
          }
          var murmur = x64hash128(map(newComponents, function(component2) {
            return component2.value;
          }).join("~~~"), 31);
          callback(murmur, newComponents);
        });
      };
      Fingerprint22.x64hash128 = x64hash128;
      Fingerprint22.VERSION = "2.1.4";
      return Fingerprint22;
    });
  })(fingerprint2);
  const Fingerprint2 = fingerprint2Exports;
  const _sfc_main$G = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const X_TOKEN = "x-token";
      const loginLoading = vue.ref(false);
      vue.onMounted(() => {
        uni.setNavigationBarTitle({
          title: "Talkie"
        });
        let storageToken = uni.getStorageSync(X_TOKEN);
        if (storageToken) {
          loginSucessByToken(storageToken);
        }
      });
      const handleVisitorLogin = () => {
        if (loginLoading.value) {
          return;
        }
        loginLoading.value = true;
        Fingerprint2.get((components) => {
          const values = components.map((component) => component.value);
          const fingerprint = Fingerprint2.x64hash128(values.join(""), 31);
          formatAppLog("log", "at pages/login/index.vue:44", "设备指纹:", fingerprint);
          accountRequest.visitorLogin({
            fingerprint
          }).then((data) => {
            loginSuccess(data);
          }).finally(() => {
            loginLoading.value = false;
          });
        });
      };
      const loginSuccess = (data) => {
        if (data.code !== "200") {
          uni.showToast({
            title: data.message,
            icon: "none"
          });
          return;
        }
        let storageToken = data.data;
        loginSucessByToken(storageToken);
      };
      const loginSucessByToken = (storageToken) => {
        uni.setStorageSync("x-token", storageToken);
        uni.switchTab({
          url: "/pages/index/index"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createElementVNode("image", {
            class: "logo",
            src: "/static/logo.png"
          }),
          vue.createElementVNode("text", { class: "title" }, " 欢迎使用Talkie AI "),
          vue.createElementVNode("text", { class: "sub-title" }, " 练习口语、写作的好帮手 "),
          vue.createElementVNode("text", {
            class: "visitor-login",
            onClick: _cache[0] || (_cache[0] = ($event) => handleVisitorLogin())
          }, "随便逛逛")
        ]);
      };
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const PagesLoginIndex = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["__scopeId", "data-v-45258083"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/login/index.vue"]]);
  const _sfc_main$F = /* @__PURE__ */ vue.defineComponent({
    __name: "CommonHeader",
    props: {
      leftIcon: { type: Boolean, required: false },
      backFn: { type: Function, required: false },
      backgroundColor: { type: String, required: false }
    },
    setup(__props) {
      var _a, _b;
      const props = __props;
      const CustomBar = (_a = vue.getCurrentInstance()) == null ? void 0 : _a.appContext.config.globalProperties.CustomBar;
      const StatusBar = (_b = vue.getCurrentInstance()) == null ? void 0 : _b.appContext.config.globalProperties.StatusBar;
      const style = vue.computed(
        () => `height:${CustomBar}px;padding-top:${StatusBar}px;`
      );
      const handleBack = () => {
        if (props.backFn) {
          props.backFn();
        } else {
          uni.navigateBack({
            delta: 1
          });
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "common-header",
            style: vue.normalizeStyle({ height: vue.unref(CustomBar) + "px", backgroundColor: __props.backgroundColor ? __props.backgroundColor : "inhert" })
          },
          [
            vue.createElementVNode(
              "view",
              {
                class: "common-header-content",
                style: vue.normalizeStyle(vue.unref(style))
              },
              [
                vue.createElementVNode("view", { class: "left" }, [
                  vue.renderSlot(_ctx.$slots, "left", {}, () => [
                    vue.createElementVNode("view", {
                      class: "left-icon-box",
                      onClick: handleBack
                    }, [
                      __props.leftIcon ? (vue.openBlock(), vue.createElementBlock("image", {
                        key: 0,
                        class: "back-icon",
                        src: "/static/icon_header_back.png"
                      })) : vue.createCommentVNode("v-if", true)
                    ])
                  ], true)
                ]),
                vue.createElementVNode("view", { class: "content" }, [
                  vue.renderSlot(_ctx.$slots, "content", {}, void 0, true)
                ]),
                vue.createElementVNode("view", { class: "right" }, [
                  vue.createCommentVNode(" 小程序会有遮挡情况，不要使用 "),
                  vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
                ])
              ],
              4
              /* STYLE */
            )
          ],
          4
          /* STYLE */
        );
      };
    }
  });
  const CommonHeader = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__scopeId", "data-v-1bc5cecc"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/components/CommonHeader.vue"]]);
  const chatRequest = {
    sessionCreate: (data) => {
      return request("/sessions", "POST", data, true);
    },
    sessionDefaultGet: (data) => {
      return request("/sessions/default", "GET", data, true);
    },
    sessionDetailsGet: (data) => {
      return request("/sessions/" + data.sessionId, "GET", data, true);
    },
    sessionInitGreeting: (sessionId) => {
      return request("/sessions/" + sessionId + "/greeting", "GET", {}, false);
    },
    sessionChatInvoke: (data) => {
      return request(`/sessions/${data.sessionId}/chat`, "POST", data, false);
    },
    transformText: (data) => {
      return request(
        `/sessions/${data.sessionId}/voice-translate`,
        "POST",
        data,
        false
      );
    },
    messagesLatestDelete: (sessionId) => {
      return request(
        `/sessions/${sessionId}/messages/latest`,
        "DELETE",
        null,
        false
      );
    },
    messagesAllDelete: (sessionId) => {
      return request(`/sessions/${sessionId}/messages`, "DELETE", null, false);
    },
    translateInvoke: (data) => {
      return request(
        `/messages/${data.message_id}/translate`,
        "POST",
        data,
        false
      );
    },
    messagePractice: (data) => {
      return request(
        `/messages/${data.message_id}/practice`,
        "POST",
        data,
        false
      );
    },
    speechContent: (data) => {
      return request("/message/speech-content", "POST", data, false);
    },
    speechDemo: (data) => {
      return request("/message/speech-demo", "POST", data, false);
    },
    grammarInvoke: (data) => {
      return request("/message/grammar", "POST", data, false);
    },
    pronunciationInvoke: (data) => {
      return request("/message/pronunciation", "POST", data, false);
    },
    translateSettingLanguage: (data) => {
      return request("/message/translate-setting-language", "POST", data, false);
    },
    translateSourceLanguage: (data) => {
      return request("/message/translate-source-language", "POST", data, false);
    },
    transferSpeech: (data) => {
      return request("/message/speech", "POST", data, false);
    },
    wordDetail: (data) => {
      return request("/message/word/detail", "POST", data, false);
    },
    wordPractice: (data) => {
      return request("/message/word/practice", "POST", data, false);
    },
    promptInvoke: (data) => {
      return request("/message/prompt", "POST", data, false);
    },
    languageExampleGet: (data) => {
      return request("/languages/example", "GET", data, false);
    },
    rolesGet: (data) => {
      return request("/roles", "GET", data, false);
    }
  };
  const _sfc_main$E = /* @__PURE__ */ vue.defineComponent({
    __name: "LoadingRound",
    props: {
      minHeight: { type: Number, required: false }
    },
    setup(__props) {
      const props = __props;
      const containerStyle = vue.computed(
        () => {
          if (props.minHeight) {
            return `min-height:${props.minHeight}rpx;`;
          }
          return "";
        }
      );
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "loading-round",
            style: vue.normalizeStyle(vue.unref(containerStyle))
          },
          [
            vue.createElementVNode("image", {
              class: "loading-round-img",
              src: "/static/loading.png"
            })
          ],
          4
          /* STYLE */
        );
      };
    }
  });
  const LoadingRound = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["__scopeId", "data-v-591bce23"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/components/LoadingRound.vue"]]);
  const topicRequest = {
    getTopicData: (params) => {
      return request("/topics", "GET", params, false);
    },
    getTopicDetail: (id) => {
      return request(`/topics/${id}`, "GET", null, false);
    },
    getTopicHistory: (id) => {
      return request(`/topics/${id}/history`, "GET", null, false);
    },
    createSession: (data) => {
      return request(`/topics/${data.topic_id}/session`, "POST", data, true);
    },
    completeTopic: (data) => {
      return request(`/topics/sessions/${data.session_id}/complete`, "POST", data, true);
    },
    getTopicCompletation: (data) => {
      return request(`/topics/${data.topic_id}/session/${data.session_id}/completion`, "GET", null, false);
    },
    getPhrase: (data) => {
      return request(`/topics/${data.topic_id}/phrases`, "GET", null, false);
    },
    deleteTopicHistory: (data) => {
      return request(`/topics/${data.topic_id}/session/${data.session_id}`, "DELETE", null, false);
    }
  };
  const _sfc_main$D = /* @__PURE__ */ vue.defineComponent({
    __name: "Topics",
    setup(__props) {
      const loading = vue.ref(false);
      const topicData = vue.ref(null);
      const activeType = vue.ref("ROLE_PLAY");
      const activeGroup = vue.ref(null);
      const topics = vue.ref([]);
      vue.onMounted(() => {
        uni.setNavigationBarTitle({
          title: "Talkie"
        });
        selectType("ROLE_PLAY");
      });
      const selectType = (type) => {
        activeType.value = type;
        loading.value = true;
        topics.value = [];
        topicRequest.getTopicData({ type }).then((res) => {
          loading.value = false;
          topicData.value = res.data;
          if (res.data && res.data.length > 0) {
            handleActiveGroup(res.data[0]);
          } else {
            handleActiveGroup(null);
          }
        });
      };
      const handleActiveGroup = (group) => {
        if (group) {
          activeGroup.value = group.id;
          topics.value = group.topics;
        } else {
          activeGroup.value = null;
          topics.value = [];
        }
      };
      const goTopic = (topic) => {
        uni.navigateTo({
          url: `/pages/topic/index?topicId=${topic.id}`
        });
      };
      const goAccountCreatePage = () => {
        uni.navigateTo({
          url: `/pages/topic/topicCreate`
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "topic-container" }, [
          vue.createElementVNode("view", { class: "home-data" }, [
            vue.createElementVNode("view", { class: "tab-box" }, [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(`tab ${activeType.value === "ROLE_PLAY" ? "tab-actice" : ""}`),
                  onClick: _cache[0] || (_cache[0] = ($event) => selectType("ROLE_PLAY"))
                },
                "角色扮演 ",
                2
                /* CLASS */
              ),
              vue.createCommentVNode(` <view :class="\`tab \${activeType === 'CHAT_TOPIC' ? 'tab-actice' : ''}\`" @click="selectType('CHAT_TOPIC')">\r
                    话题畅聊\r
                </view>\r
                <view :class="\`tab \${activeType === 'TOOLS' ? 'tab-actice' : ''}\`" @click="selectType('TOOLS')">\r
                    学习工具\r
                </view> `)
            ]),
            vue.createElementVNode("view", { class: "type-box" }, [
              loading.value ? (vue.openBlock(), vue.createBlock(LoadingRound, { key: 0 })) : vue.createCommentVNode("v-if", true),
              activeType.value == "CHAT_TOPIC" ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "free-topic-box",
                onClick: goAccountCreatePage
              }, [
                vue.createElementVNode("view", { class: "free-topic-title" }, " 自由畅聊 "),
                vue.createElementVNode("view", { class: "free-topic-description" }, " 写下你想要的场景，让你的角色扮演更加自由 ")
              ])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", { class: "group-box" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(topicData.value, (group) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: group.id,
                      class: vue.normalizeClass(`group-item ${activeGroup.value == group.id ? "active" : ""}`),
                      onClick: ($event) => handleActiveGroup(group)
                    }, [
                      vue.createElementVNode(
                        "view",
                        { class: "group-title" },
                        vue.toDisplayString(group.name),
                        1
                        /* TEXT */
                      )
                    ], 10, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("view", { class: "topic-box" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(topics.value, (topic) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: topic.id,
                      class: "topic-item",
                      onClick: ($event) => goTopic(topic)
                    }, [
                      topic.image_url ? (vue.openBlock(), vue.createElementBlock("image", {
                        key: 0,
                        class: "topic-image",
                        src: topic.image_url,
                        mode: "aspectFill"
                      }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true),
                      vue.createElementVNode(
                        "view",
                        { class: "topic-title" },
                        vue.toDisplayString(topic.name),
                        1
                        /* TEXT */
                      ),
                      vue.createCommentVNode(" 根据level属性来生成对应星星数量 "),
                      vue.createElementVNode("view", { class: "level-box" }, [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(topic.level, (index) => {
                            return vue.openBlock(), vue.createElementBlock("image", {
                              class: "level-icon",
                              key: "level_icon_" + topic.id + "_" + index,
                              src: "/static/img/icons/star.png"
                            });
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      vue.createCommentVNode(" 用户是否已经完成此次话题 "),
                      topic.completed === "1" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 1,
                        class: "completed-box"
                      }, [
                        vue.createElementVNode("view", { class: "completed-text" }, " 已学习 ")
                      ])) : vue.createCommentVNode("v-if", true)
                    ], 8, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ])
          ])
        ]);
      };
    }
  });
  const Topics = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["__scopeId", "data-v-ce3e018f"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/index/components/Topics.vue"]]);
  const _sfc_main$C = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const loading = vue.ref(false);
      const settingRole = vue.ref(null);
      onShow(() => {
        initData();
      });
      const initData = () => {
        loading.value = true;
        accountRequest.getRole().then((data) => {
          loading.value = false;
          const role_setting = data.data.role_setting;
          settingRole.value = role_setting;
        });
      };
      const goSwitchRole = () => {
        uni.navigateTo({
          url: `/pages/index/switchRole`
        });
      };
      const goChat = () => {
        chatRequest.sessionDefaultGet({}).then((data) => {
          if (data.data) {
            uni.navigateTo({
              url: `/pages/chat/index?sessionId=${data.data.id}`
            });
          } else {
            chatRequest.sessionCreate({}).then((data2) => {
              uni.navigateTo({
                url: `/pages/chat/index?sessionId=${data2.data.id}`
              });
            });
          }
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(CommonHeader, { backgroundColor: "#fff" }, {
            content: vue.withCtx(() => [
              vue.createElementVNode("text", null, "Talkie")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "content" }, [
            vue.createCommentVNode(" 自由聊天 "),
            vue.createElementVNode("view", { class: "index-page-card" }, [
              vue.createElementVNode("view", { class: "index-header-box" }, [
                settingRole.value ? (vue.openBlock(), vue.createElementBlock("image", {
                  key: 0,
                  src: settingRole.value.role_image,
                  class: "index-header-img"
                }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true)
              ]),
              vue.createElementVNode("view", { class: "intro-box" }, [
                vue.createElementVNode("view", { class: "top-box" }, [
                  vue.createElementVNode("view", { class: "index-name" }, [
                    settingRole.value ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 0,
                        class: "index-name-text"
                      },
                      vue.toDisplayString(settingRole.value.local_name),
                      1
                      /* TEXT */
                    )) : vue.createCommentVNode("v-if", true)
                  ]),
                  vue.createElementVNode("view", { class: "btn-box" }, [
                    vue.createElementVNode("image", {
                      src: "/static/change.png",
                      class: "index-change-btn-icon"
                    }),
                    vue.createElementVNode("view", {
                      onClick: goSwitchRole,
                      class: "index-change-btn"
                    }, "切换角色")
                  ])
                ]),
                vue.createElementVNode("view", { class: "intro-bottom-box" }, [
                  vue.createElementVNode("view", {
                    onClick: goChat,
                    class: "index-btn"
                  }, "进入会话")
                ])
              ])
            ]),
            vue.createVNode(Topics, { class: "topic-component" })
          ])
        ]);
      };
    }
  });
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__scopeId", "data-v-83a5a03c"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/index/index.vue"]]);
  const utils = {
    isWechat: () => {
      const ua = navigator.userAgent.toLowerCase();
      return ua.indexOf("micromessenger") !== -1;
    },
    removeDecimal: (num) => {
      return Math.floor(num);
    },
    getVoiceFileUrl: (fileName) => {
      return `${__config.basePath}/voices/${fileName}`;
    }
  };
  let AudioPlayer$1 = class AudioPlayer {
    constructor() {
      __publicField(this, "audioContext", null);
    }
    /**
     * 录音的时候使用，录音前要先关闭所有音频播放
     */
    stopAudio() {
      if (this.audioContext) {
        this.audioContext.stop();
      }
    }
    playAudio({ audioUrl, listener }) {
      let audioSrc = audioUrl;
      if (this.audioContext)
        ;
      if (this.audioContext) {
        const oldSrc = this.audioContext.src;
        this.audioContext.stop();
        if (oldSrc === audioSrc) {
          this.audioContext = null;
          return;
        }
      }
      let innerAudioContext = this.createInnerAudioContext(audioUrl, listener);
      this.audioContext = innerAudioContext;
      innerAudioContext.play();
    }
    createInnerAudioContext(src, listener) {
      let innerAudioContext = null;
      innerAudioContext = uni.createInnerAudioContext();
      innerAudioContext.src = src;
      innerAudioContext.onPlay(() => {
        if (listener.playing) {
          listener.playing();
        }
      });
      innerAudioContext.onStop(() => {
        if (listener.success) {
          listener.success();
        }
        innerAudioContext.destory && innerAudioContext.destory();
        this.audioContext = null;
      });
      innerAudioContext.onEnded(() => {
        if (listener.success) {
          listener.success();
        }
        innerAudioContext.destory && innerAudioContext.destory();
        this.audioContext = null;
      });
      innerAudioContext.onError((res) => {
        if (listener.error) {
          listener.error();
        }
      });
      return innerAudioContext;
    }
  };
  const audioPlayer = new AudioPlayer$1();
  const _sfc_main$B = /* @__PURE__ */ vue.defineComponent({
    __name: "AudioPlayer",
    props: {
      messageId: { type: [String, null], required: false },
      fileName: { type: [String, null], required: false },
      content: { type: [String, null], required: false },
      direction: { type: String, required: false },
      autoPlay: { type: null, required: false },
      speechRoleName: { type: [String, null], required: false },
      speechRoleStyle: { type: [String, null], required: false },
      sessionId: { type: [String, null], required: false }
    },
    setup(__props, { expose }) {
      const props = __props;
      const transformFileLoading = vue.ref(false);
      const speechLoading = vue.ref(false);
      vue.ref("");
      vue.onMounted(() => {
        if (props.autoPlay) {
          handleSpeech();
        }
      });
      const handleSpeech = async () => {
        let audioUrl = "";
        if (props.fileName) {
          audioUrl = utils.getVoiceFileUrl(props.fileName);
        } else {
          if (props.messageId) {
            transformFileLoading.value = true;
            audioUrl = `${__config.basePath}/message/speech?message_id=${props.messageId}`;
          } else if (props.content) {
            transformFileLoading.value = true;
            audioUrl = `${__config.basePath}/message/speech-content?content=${props.content}`;
            if (props.speechRoleName) {
              audioUrl += `&speech_role_name=${props.speechRoleName}`;
            }
            if (props.speechRoleStyle) {
              audioUrl += `&speech_role_style=${props.speechRoleStyle}`;
            }
            if (props.sessionId) {
              audioUrl += `&session_id=${props.sessionId}`;
            }
          }
          if (uni.getStorageSync("x-token")) {
            audioUrl += `&x_token_query=${uni.getStorageSync("x-token")}`;
          }
        }
        formatAppLog("log", "at components/AudioPlayer.vue:73", audioUrl);
        audioPlayer.playAudio({
          audioUrl,
          listener: {
            playing: () => {
              transformFileLoading.value = false;
              speechLoading.value = true;
            },
            success: () => {
              transformFileLoading.value = false;
              speechLoading.value = false;
            },
            error: () => {
              transformFileLoading.value = false;
              speechLoading.value = false;
            }
          }
        });
        return;
      };
      const autoPlayAudio = () => {
        vue.nextTick(() => {
          handleSpeech();
        });
      };
      expose({
        autoPlayAudio
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          onClick: handleSpeech,
          class: "speech-container",
          title: speechLoading.value
        }, [
          vue.createElementVNode("view", { class: "playing-ico" }, [
            transformFileLoading.value ? (vue.openBlock(), vue.createBlock(LoadingRound, { key: 0 })) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 1 },
              [
                speechLoading.value ? (vue.openBlock(), vue.createElementBlock(
                  "image",
                  {
                    key: 0,
                    class: vue.normalizeClass(["icon message-playing-icon play-ico", { reverse: __props.direction && __props.direction == "right" }]),
                    style: { "width": "36rpx", "height": "36rpx" },
                    src: "/static/voice_playing.gif",
                    mode: "heightFix"
                  },
                  null,
                  2
                  /* CLASS */
                )) : (vue.openBlock(), vue.createElementBlock(
                  "image",
                  {
                    key: 1,
                    class: vue.normalizeClass(["icon message-playing-icon playing-ico", { reverse: __props.direction && __props.direction == "right" }]),
                    style: { "width": "36rpx", "height": "36rpx" },
                    src: "/static/voice_play.png",
                    mode: "heightFix"
                  },
                  null,
                  2
                  /* CLASS */
                ))
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ])
        ], 8, ["title"]);
      };
    }
  });
  const AudioPlayer = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["__scopeId", "data-v-9e3d83e8"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/components/AudioPlayer.vue"]]);
  const sysRequest = {
    feedbackAdd: (data) => {
      return request("/sys/feedback", "POST", data, false);
    },
    getLanguages: () => {
      return request("/sys/languages", "GET", null);
    },
    getRoles: (data) => {
      return request("/sys/roles", "GET", data);
    },
    setLearningLanguage: (data) => {
      return request("/sys/language", "POST", data);
    },
    settingsPost: (data) => {
      return request("/sys/settings", "POST", data);
    },
    settingsGet: () => {
      return request("/sys/settings", "GET");
    }
  };
  const _sfc_main$A = /* @__PURE__ */ vue.defineComponent({
    __name: "switchRole",
    setup(__props) {
      const roles = vue.ref([]);
      const duration = vue.ref(500);
      const interval = vue.ref(2e3);
      const selectIndex = vue.ref(0);
      const audioPlayerContent = vue.ref("");
      const language = vue.ref("");
      const redirectType = vue.ref(null);
      const swiperCurrent = vue.ref(0);
      onLoad((options) => {
        uni.setNavigationBarTitle({
          title: "Talkie"
        });
        if (options.redirectType) {
          redirectType.value = options.redirectType;
        }
      });
      onShow(() => {
        accountRequest.getSettings().then((data) => {
          language.value = data.data.target_language;
          initAudioPlayerContent();
          initRoles();
        });
      });
      const initAudioPlayerContent = () => {
        chatRequest.languageExampleGet({
          language: language.value
        }).then((data) => {
          audioPlayerContent.value = data.data;
        });
      };
      const initRoles = () => {
        sysRequest.getRoles({
          locale: language.value
        }).then((data) => {
          roles.value = data.data;
          accountRequest.getSettings().then((data2) => {
            let speechRoleName = data2.data.speech_role_name;
            if (speechRoleName) {
              let index = roles.value.findIndex(
                (m) => m.short_name == speechRoleName
              );
              if (index > -1) {
                selectIndex.value = index;
              }
            }
            vue.nextTick(() => {
              swiperCurrent.value = selectIndex.value;
            });
          });
        });
      };
      const swiperChange = (info) => {
        selectIndex.value = info.detail.current;
      };
      const confirmUpdate = () => {
        let role = roles.value[selectIndex.value];
        accountRequest.setSettings({
          speech_role_name: role.short_name
        }).then((data) => {
          uni.showToast({
            title: "切换成功",
            icon: "none",
            duration: 2e3
          });
          uni.navigateBack();
        });
      };
      const handleBackPage = () => {
        uni.switchTab({
          url: "/pages/index/index"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createVNode(CommonHeader, {
            "left-icon": true,
            style: { "background-color": "none", "color": "#fff" },
            "back-fn": handleBackPage,
            title: "聊天"
          }, {
            left: vue.withCtx(() => [
              vue.createElementVNode("image", {
                onClick: handleBackPage,
                class: "back-icon",
                src: "/static/icon_home.png"
              })
            ]),
            content: vue.withCtx(() => [
              vue.createElementVNode("view", null, "选择角色")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "content" }, [
            vue.createElementVNode("swiper", {
              class: "swiper",
              circular: "",
              "indicator-dots": true,
              autoplay: false,
              interval: interval.value,
              duration: duration.value,
              onChange: swiperChange,
              current: swiperCurrent.value
            }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(roles.value, (m) => {
                  return vue.openBlock(), vue.createElementBlock("swiper-item", {
                    key: m.id,
                    class: "index-page-card-box"
                  }, [
                    vue.createElementVNode("view", { class: "index-page-card" }, [
                      vue.createElementVNode("view", { class: "index-name" }, [
                        vue.createElementVNode(
                          "text",
                          { class: "index-name-text" },
                          vue.toDisplayString(m.local_name),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", { class: "index-header-box" }, [
                        m.avatar ? (vue.openBlock(), vue.createElementBlock("image", {
                          key: 0,
                          src: m.avatar,
                          class: "index-header-img"
                        }, null, 8, ["src"])) : m.gender == "2" ? (vue.openBlock(), vue.createElementBlock("image", {
                          key: 1,
                          src: "http://qiniu.prejade.com/1597936949107363840/talkie/images/en-US_Guy.png",
                          class: "index-header-img"
                        })) : (vue.openBlock(), vue.createElementBlock("image", {
                          key: 2,
                          src: "https://qiniu.prejade.com/1597936949107363840/talkie/images/en-US_JennyNeural.png",
                          class: "index-header-img"
                        }))
                      ]),
                      vue.createElementVNode("view", { class: "style-box" }, [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(m.styles, (style) => {
                            return vue.openBlock(), vue.createElementBlock("view", { class: "style-text-box" }, [
                              vue.createElementVNode("view", {
                                class: "style-text",
                                title: style
                              }, vue.toDisplayString(style.label || "默认"), 9, ["title"]),
                              vue.createVNode(AudioPlayer, {
                                content: audioPlayerContent.value,
                                speechRoleName: m.short_name,
                                speechRoleStyle: style.value
                              }, null, 8, ["content", "speechRoleName", "speechRoleStyle"])
                            ]);
                          }),
                          256
                          /* UNKEYED_FRAGMENT */
                        ))
                      ])
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ], 40, ["interval", "duration", "current"]),
            vue.createElementVNode("button", {
              onClick: confirmUpdate,
              class: "common-button index-btn"
            }, " 确 认 ")
          ])
        ]);
      };
    }
  });
  const PagesIndexSwitchRole = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__scopeId", "data-v-304d792d"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/index/switchRole.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation({
        ...options
      });
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$z = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      },
      onceRender: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 生成样式数据
      stylesObject() {
        let styles = {
          ...this.styles,
          "transition-duration": this.duration / 1e3 + "s"
        };
        let transform = "";
        for (let i in styles) {
          let line = this.toLine(i);
          transform += line + ":" + styles[i] + ";";
        }
        return transform;
      },
      // 初始化动画条件
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config = {}) {
        if (!this.animation)
          return;
        for (let i in obj) {
          try {
            if (typeof obj[i] === "object") {
              this.animation[i](...obj[i]);
            } else {
              this.animation[i](obj[i]);
            }
          } catch (e) {
            formatAppLog("error", "at uni_modules/uni-transition/components/uni-transition/uni-transition.vue:148", `方法 ${i} 不存在`);
          }
        }
        this.animation.step(config);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      // 关闭过度动画
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type2, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type2)[mode];
          } else {
            styles.transform += this.animationType(type2)[mode] + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildStyle(type, mode);
          });
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type) {
        let buildTranfrom = (type2, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildTranfrom(type, mode);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 1 : 0,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])), [
      [vue.vShow, $data.isShow]
    ]);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$3], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/uni_modules/uni-transition/components/uni-transition/uni-transition.vue"]]);
  const _sfc_main$y = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      // 开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      type: {
        type: String,
        default: "center"
      },
      // maskClick
      isMaskClick: {
        type: Boolean,
        default: null
      },
      // TODO 2 个版本后废弃属性 ，使用 isMaskClick
      maskClick: {
        type: Boolean,
        default: null
      },
      backgroundColor: {
        type: String,
        default: "none"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.4)"
      }
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type) {
          if (!this.config[type])
            return;
          this[this.config[type]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.type]](true);
        },
        immediate: true
      },
      /**
       * 监听遮罩是否可点击
       * @param {Object} val
       */
      maskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      isMaskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        maskClass: {
          position: "fixed",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        transClass: {
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupstyle: this.isDesktop ? "fixforpc-top" : "top"
      };
    },
    computed: {
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.backgroundColor === "" || this.backgroundColor === "none") {
          return "transparent";
        }
        return this.backgroundColor;
      }
    },
    mounted() {
      const fixSize = () => {
        const {
          windowWidth,
          windowHeight,
          windowTop,
          safeArea,
          screenHeight,
          safeAreaInsets
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
        } else {
          this.safeAreaInsets = 0;
        }
      };
      fixSize();
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    created() {
      if (this.isMaskClick === null && this.maskClick === null) {
        this.mkclick = true;
      } else {
        this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
      }
      if (this.animation) {
        this.duration = 300;
      } else {
        this.duration = 0;
      }
      this.messageChild = null;
      this.clearPropagation = false;
      this.maskClass.backgroundColor = this.maskBackgroundColor;
    },
    methods: {
      setH5Visible() {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      /**
       * 公用方法，遮罩层禁止点击
       */
      disableMask() {
        this.mkclick = false;
      },
      // TODO nvue 取消冒泡
      clear(e) {
        e.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.type;
        }
        if (!this.config[direction]) {
          formatAppLog("error", "at uni_modules/uni-popup/components/uni-popup/uni-popup.vue:279", "缺少类型：", direction);
          return;
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.type
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.mkclick)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type) {
        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: this.bg
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          if (this.messageChild && this.type === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type) {
        this.popupstyle = "bottom";
        this.ani = ["slide-bottom"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: this.safeAreaInsets + "px",
          backgroundColor: this.bg
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      /**
       * 中间弹出样式处理
       */
      center(type) {
        this.popupstyle = "center";
        this.ani = ["zoom-out", "fade"];
        this.transClass = {
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      left(type) {
        this.popupstyle = "left";
        this.ani = ["slide-left"];
        this.transClass = {
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      right(type) {
        this.popupstyle = "right";
        this.ani = ["slide-right"];
        this.transClass = {
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0$1);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
              key: "1",
              name: "mask",
              "mode-class": "fade",
              styles: $data.maskClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uni_transition, {
              key: "2",
              "mode-class": $data.ani,
              name: "content",
              styles: $data.transClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
                    style: vue.normalizeStyle({ backgroundColor: $options.bg }),
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
          ],
          32
          /* HYDRATE_EVENTS */
        )
      ],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$2], ["__scopeId", "data-v-526cda1c"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"]]);
  const _sfc_main$x = /* @__PURE__ */ vue.defineComponent({
    __name: "Collect",
    props: {
      type: { type: null, required: true },
      messageId: { type: null, required: false },
      content: { type: null, required: false }
    },
    setup(__props) {
      const props = __props;
      getApp();
      const collected = vue.ref(false);
      const collectLoading = vue.ref(false);
      const requestParams = {
        type: props.type,
        message_id: props.messageId ? props.messageId : "",
        content: props.content ? props.content : ""
      };
      vue.onMounted(() => {
        if (!props.messageId && !props.content) {
          formatAppLog("warn", "at components/Collect.vue:36", `Collect组件需要传入messageId或content,当前传入的参数为${JSON.stringify(props)}`);
          return;
        }
        accountRequest.collectGet(requestParams).then((data) => {
          collected.value = data.data.is_collect;
        });
      });
      const handleCollect = () => {
        if (collectLoading.value) {
          return;
        }
        collectLoading.value = true;
        accountRequest.collect(requestParams).then(() => {
          collected.value = true;
          collectLoading.value = false;
        });
      };
      const handleCancel = () => {
        if (collectLoading.value) {
          return;
        }
        collectLoading.value = true;
        accountRequest.cancelCollect(requestParams).then(() => {
          collected.value = false;
          collectLoading.value = false;
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "collect-icon-box" }, [
          vue.withDirectives(vue.createVNode(
            LoadingRound,
            null,
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, collectLoading.value]
          ]),
          vue.withDirectives(vue.createElementVNode(
            "image",
            {
              onClick: handleCollect,
              class: "collect-icon",
              src: "/static/icon_collect.png"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, !collectLoading.value && !collected.value]
          ]),
          vue.withDirectives(vue.createElementVNode(
            "image",
            {
              onClick: handleCancel,
              class: "collect-icon",
              src: "/static/icon_collect_actived.png"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, !collectLoading.value && collected.value]
          ])
        ]);
      };
    }
  });
  const Collect = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__scopeId", "data-v-2251c80e"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/components/Collect.vue"]]);
  const _sfc_main$w = /* @__PURE__ */ vue.defineComponent({
    __name: "WordAnalysisPopup",
    setup(__props, { expose }) {
      getApp();
      const word = vue.ref("");
      const wordAnalysisPopup = vue.ref(null);
      const wordPhoneticSymbol = vue.ref(null);
      const wordExplain = vue.ref(null);
      const wordDetailLoading = vue.ref(false);
      const popupBackgoundColor = vue.ref("");
      vue.onMounted(() => {
      });
      const handleClose = () => {
        wordAnalysisPopup.value.close();
        wordPhoneticSymbol.value = null;
        wordExplain.value = null;
      };
      const open = (wordText) => {
        word.value = wordText;
        wordDetailLoading.value = true;
        chatRequest.wordDetail({ word: wordText }).then((res) => {
          wordPhoneticSymbol.value = res.data.phonetic;
          wordExplain.value = res.data.translation;
          wordDetailLoading.value = false;
        });
        wordAnalysisPopup.value.open();
      };
      expose({
        open,
        handleClose
      });
      return (_ctx, _cache) => {
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0);
        return vue.openBlock(), vue.createBlock(_component_uni_popup, {
          ref_key: "wordAnalysisPopup",
          ref: wordAnalysisPopup,
          type: "bottom",
          "background-color": popupBackgoundColor.value
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "word-analysis-container" }, [
              vue.createElementVNode("view", { class: "close-icon-box" }, [
                vue.createElementVNode("image", {
                  onClick: handleClose,
                  class: "close-icon",
                  src: "/static/icon_close.png"
                })
              ]),
              wordDetailLoading.value ? (vue.openBlock(), vue.createBlock(LoadingRound, {
                key: 0,
                "min-height": 200
              })) : wordPhoneticSymbol.value ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "content"
              }, [
                vue.createElementVNode("view", { class: "word-box row-bc" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "word-text" },
                    vue.toDisplayString(word.value),
                    1
                    /* TEXT */
                  ),
                  vue.createVNode(Collect, {
                    type: "WORD",
                    content: word.value
                  }, null, 8, ["content"])
                ]),
                vue.createElementVNode("view", { class: "pronunciation-box row-sc" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "pronunciation-text" },
                    vue.toDisplayString(wordPhoneticSymbol.value),
                    1
                    /* TEXT */
                  ),
                  vue.createVNode(AudioPlayer, {
                    class: "pronunciation-play-icon",
                    content: word.value
                  }, null, 8, ["content"])
                ]),
                vue.createElementVNode("view", { class: "translation-box row-bc" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "translatetion-text" },
                    vue.toDisplayString(wordExplain.value),
                    1
                    /* TEXT */
                  )
                ])
              ])) : vue.createCommentVNode("v-if", true)
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["background-color"]);
      };
    }
  });
  const WordAnalysisPopup = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__scopeId", "data-v-d41638ae"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/components/WordAnalysisPopup.vue"]]);
  const _sfc_main$v = /* @__PURE__ */ vue.defineComponent({
    __name: "FunctionalText",
    props: {
      text: { type: [String, null], required: false },
      textShadow: { type: null, required: false },
      sessionId: { type: [String, null], required: false },
      messageId: { type: [String, null], required: false },
      fileName: { type: [String, null], required: false },
      wordClickable: { type: null, required: false },
      translateShow: { type: null, required: false },
      autoPlay: { type: null, required: false }
    },
    setup(__props, { expose }) {
      const props = __props;
      const translateLoading = vue.ref(false);
      const translateText = vue.ref("");
      const clickAbleWord = vue.ref(false);
      const wordAnalysisPopup = vue.ref(null);
      const audioPlayRef = vue.ref(null);
      vue.onMounted(() => {
      });
      vue.watch(
        () => props.translateShow,
        (newVal, oldVal) => {
          if (newVal && !translateText.value) {
            initTranslateData();
          }
        },
        { deep: true }
      );
      const initTranslateData = () => {
        if (translateText.value) {
          return;
        }
        translateLoading.value = true;
        if (props.messageId) {
          chatRequest.translateInvoke({
            message_id: props.messageId
          }).then((data) => {
            translateText.value = data.data;
          }).catch((e) => {
            translateText.value = "翻译出错";
          }).finally(() => {
            translateLoading.value = false;
          });
        } else {
          chatRequest.translateSourceLanguage({
            text: props.text
          }).then((data) => {
            translateText.value = data.data;
          }).catch((e) => {
            translateText.value = "翻译出错";
          }).finally(() => {
            translateLoading.value = false;
          });
        }
      };
      const handleSpaceClick = () => {
        clickAbleWord.value = false;
      };
      const handleWordClick = () => {
        if (props.textShadow) {
          return;
        }
        clickAbleWord.value = true;
      };
      const handleAnalysis = (word) => {
        const reg = /[^a-zA-Z]/g;
        word = word.replace(reg, "");
        vue.nextTick(() => {
          setTimeout(() => {
            wordAnalysisPopup.value.open(word);
          }, 100);
        });
      };
      const autoPlayAudio = () => {
        vue.nextTick(() => {
          audioPlayRef.value.autoPlayAudio();
        });
      };
      expose({
        initTranslateData,
        autoPlayAudio
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "functional-text-container",
          onClick: handleSpaceClick
        }, [
          vue.createElementVNode("view", { class: "text-box" }, [
            vue.createCommentVNode(" 点击后可再次点击查看单词详情 "),
            __props.wordClickable ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              onClick: vue.withModifiers(handleWordClick, ["stop"]),
              class: vue.normalizeClass(["text-content", { "text-shadow": __props.textShadow }])
            }, [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(__props.text),
                1
                /* TEXT */
              )
            ], 10, ["onClick"])), [
              [vue.vShow, !clickAbleWord.value]
            ]) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "text-content"
            }, [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(__props.text),
                1
                /* TEXT */
              )
            ])),
            __props.wordClickable && clickAbleWord.value && __props.text ? (vue.openBlock(), vue.createElementBlock("view", { key: 2 }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(__props.text.split(" "), (word, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: index,
                    onClick: vue.withModifiers(($event) => handleAnalysis(word), ["stop"]),
                    class: "clickable-word"
                  }, [
                    vue.createElementVNode(
                      "text",
                      { class: "word-text" },
                      vue.toDisplayString(word),
                      1
                      /* TEXT */
                    )
                  ], 8, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" 语音播放 "),
            vue.createVNode(AudioPlayer, {
              class: "audio-player-container",
              ref_key: "audioPlayRef",
              ref: audioPlayRef,
              autoPlay: __props.autoPlay,
              sessionId: __props.sessionId,
              messageId: __props.messageId,
              fileName: __props.fileName,
              content: __props.text
            }, null, 8, ["autoPlay", "sessionId", "messageId", "fileName", "content"])
          ]),
          vue.createCommentVNode(" 文本翻译 "),
          __props.translateShow || translateLoading.value ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "translate-box"
          }, [
            vue.withDirectives(vue.createElementVNode(
              "view",
              { class: "translate-content" },
              [
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString(translateText.value),
                  1
                  /* TEXT */
                )
              ],
              512
              /* NEED_PATCH */
            ), [
              [vue.vShow, !translateLoading.value]
            ]),
            vue.withDirectives(vue.createElementVNode(
              "view",
              { class: "translate-loading" },
              [
                vue.createVNode(LoadingRound)
              ],
              512
              /* NEED_PATCH */
            ), [
              [vue.vShow, translateLoading.value]
            ])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 单词详情弹出框 "),
          vue.createVNode(
            WordAnalysisPopup,
            {
              ref_key: "wordAnalysisPopup",
              ref: wordAnalysisPopup
            },
            null,
            512
            /* NEED_PATCH */
          )
        ]);
      };
    }
  });
  const FunctionalText = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__scopeId", "data-v-5ba4dd5b"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/components/FunctionalText.vue"]]);
  const _sfc_main$u = /* @__PURE__ */ vue.defineComponent({
    __name: "MessageGrammar",
    props: {
      sessionId: { type: String, required: true },
      messageId: { type: String, required: true }
    },
    setup(__props, { expose }) {
      const props = __props;
      const grammarAnalysisLoading = vue.ref(false);
      const grammarAnalysisResult = vue.ref(null);
      const translateBetterContentShow = vue.ref(false);
      vue.onMounted(() => {
      });
      const initData = () => {
        formatAppLog("log", "at pages/chat/components/MessageGrammar.vue:75", props.sessionId);
        if (grammarAnalysisResult.value) {
          return;
        }
        grammarAnalysisLoading.value = true;
        chatRequest.grammarInvoke({ message_id: props.messageId }).then((data) => {
          grammarAnalysisLoading.value = false;
          grammarAnalysisResult.value = data.data;
        });
      };
      const handleTranlate = (message) => {
        translateBetterContentShow.value = !translateBetterContentShow.value;
      };
      const handleCopy = (message) => {
        uni.setClipboardData({
          data: message,
          success: () => uni.showToast({ title: "复制成功" }),
          fail: () => uni.showToast({ title: "复制失败", icon: "none" })
        });
      };
      expose({
        initData
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 语法评估 "),
            vue.createElementVNode("view", { class: "grammar-box" }, [
              grammarAnalysisLoading.value ? (vue.openBlock(), vue.createBlock(LoadingRound, { key: 0 })) : vue.createCommentVNode("v-if", true),
              !grammarAnalysisLoading.value && grammarAnalysisResult.value ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "grammar-content"
              }, [
                grammarAnalysisResult.value.is_correct ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "handclap-box"
                }, [
                  vue.createElementVNode("view", { class: "handclap-text" }, "Well done！")
                ])) : (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 1 },
                  [
                    vue.createElementVNode("view", { class: "tips-box" }, [
                      vue.createElementVNode("image", {
                        class: "grammar-icon-tips",
                        src: "/static/icon_incorrect.png"
                      }),
                      vue.createElementVNode(
                        "view",
                        { class: "grammar-result-content red" },
                        vue.toDisplayString(grammarAnalysisResult.value.original),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "line" }, [
                      vue.createCommentVNode("")
                    ]),
                    vue.createElementVNode("view", { class: "tips-box" }, [
                      vue.createElementVNode("image", {
                        class: "grammar-icon-tips",
                        src: "/static/icon_correct.png"
                      }),
                      vue.createElementVNode(
                        "view",
                        { class: "grammar-result-content green" },
                        vue.toDisplayString(grammarAnalysisResult.value.correct_content),
                        1
                        /* TEXT */
                      )
                    ])
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )),
                grammarAnalysisResult.value.error_reason ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 2,
                  class: "reason-box"
                }, [
                  vue.createElementVNode("view", { class: "error-tips sub-title" }, " 错误点 "),
                  vue.createElementVNode(
                    "view",
                    { class: "reason" },
                    vue.toDisplayString(grammarAnalysisResult.value.error_reason),
                    1
                    /* TEXT */
                  )
                ])) : vue.createCommentVNode("v-if", true),
                grammarAnalysisResult.value.better ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 3,
                  class: "reason-box"
                }, [
                  vue.createElementVNode("view", { class: "" }, [
                    vue.createElementVNode("view", { class: "sub-title" }, "你也可以说")
                  ]),
                  vue.createVNode(FunctionalText, {
                    class: "reason",
                    text: grammarAnalysisResult.value.better,
                    wordClickable: false,
                    sessionId: __props.sessionId,
                    translateShow: translateBetterContentShow.value
                  }, null, 8, ["text", "sessionId", "translateShow"]),
                  vue.createElementVNode("view", { class: "action-box" }, [
                    vue.createElementVNode("view", { class: "translate-icon-box icon-box" }, [
                      vue.createElementVNode("image", {
                        class: "translate-icon icon",
                        onClick: _cache[0] || (_cache[0] = ($event) => handleTranlate(grammarAnalysisResult.value.better)),
                        src: "/static/icon_translate.png"
                      })
                    ]),
                    vue.createElementVNode("view", { class: "collect-icon-box icon-box" }, [
                      vue.createVNode(Collect, {
                        type: "SENTENCE",
                        content: grammarAnalysisResult.value.better
                      }, null, 8, ["content"])
                    ]),
                    vue.createElementVNode("view", { class: "copy-icon-box icon-box" }, [
                      vue.createElementVNode("image", {
                        onClick: _cache[1] || (_cache[1] = ($event) => handleCopy(grammarAnalysisResult.value.better)),
                        class: "copy-icon icon",
                        src: "/static/icon_copy_text.png"
                      })
                    ])
                  ])
                ])) : vue.createCommentVNode("v-if", true)
              ])) : vue.createCommentVNode("v-if", true)
            ])
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  });
  const MessageGrammar$1 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-c321d887"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/chat/components/MessageGrammar.vue"]]);
  const MAXIMUM_RECORDING_TIME = 60;
  let Speech$2 = class Speech {
    constructor() {
      __publicField(this, "recorder", {
        start: false,
        processing: false,
        remainingTime: 0,
        rec: null,
        wxRecorderManager: null
      });
      __publicField(this, "intervalId", null);
      __publicField(this, "listener", {
        success: null,
        cancel: null,
        error: null,
        interval: null,
        processing: null
      });
    }
    handleVoiceStart({
      success,
      cancel,
      error,
      interval,
      processing
    }) {
      let self2 = this;
      self2.listener.success = success;
      self2.listener.cancel = cancel;
      self2.listener.error = error;
      self2.listener.interval = interval;
      self2.listener.processing = processing;
      self2.mpWeixinVoiceStart();
    }
    mpWeixinVoiceStart() {
      let self2 = this;
      let recorderManager = uni.getRecorderManager();
      formatAppLog("log", "at components/speechExecuter.ts:67", recorderManager);
      let format = "wav";
      if (uni.getSystemInfoSync().platform === "android") {
        format = "mp3";
      }
      self2.recorder.wxRecorderManager = recorderManager;
      recorderManager.start({
        duration: MAXIMUM_RECORDING_TIME * 1e3,
        sampleRate: 44100,
        encodeBitRate: 192e3,
        format
      });
      formatAppLog("log", "at components/speechExecuter.ts:84", "speech start..");
      self2.recorder.start = true;
      self2.recorder.remainingTime = MAXIMUM_RECORDING_TIME;
      self2.intervalId = setInterval(() => {
        if (self2.recorder.remainingTime === 0) {
          self2.handleEndVoice();
        } else {
          if (self2.listener.interval) {
            self2.listener.interval(self2.recorder.remainingTime);
          }
          self2.recorder.remainingTime--;
        }
      }, 1e3);
      recorderManager.onStop((res) => {
        formatAppLog("log", "at components/speechExecuter.ts:99", "speech on stop.." + res.tempFilePath);
        self2.handleProcessWxEndVoice({
          filePath: res.tempFilePath
        });
      });
    }
    clearInterval() {
      const self2 = this;
      if (self2.intervalId) {
        clearInterval(self2.intervalId);
      }
    }
    h5VoiceStart() {
      let self2 = this;
      self2.recorder.rec = Recorder({
        type: "wav",
        bitRate: 32,
        sampleRate: 32e3
      });
      self2.recorder.rec.open(
        () => {
          self2.recorder.start = true;
          self2.recorder.rec.start();
          self2.recorder.remainingTime = MAXIMUM_RECORDING_TIME;
          self2.intervalId = setInterval(() => {
            if (self2.listener.interval) {
              self2.listener.interval(self2.recorder.remainingTime);
            }
            if (self2.recorder.remainingTime === 0) {
              clearInterval(self2.intervalId);
              self2.handleEndVoice();
            } else {
              self2.recorder.remainingTime--;
            }
          }, 1e3);
        },
        (msg, isUserNotAllow) => {
          uni.showToast({
            title: "请开启录音权限",
            icon: "none"
          });
          if (self2.listener.error) {
            self2.listener.error(msg);
          }
        }
      );
    }
    handleCancleVoice() {
      let self2 = this;
      self2.clearInterval();
      if (self2.recorder.wxRecorderManager) {
        self2.recorder.wxRecorderManager.stop();
        self2.recorder.start = false;
        self2.recorder.processing = false;
        self2.recorder.wxRecorderManager = null;
      }
      if (self2.listener.cancel) {
        self2.listener.cancel();
      }
    }
    handleEndVoice() {
      let self2 = this;
      self2.clearInterval();
      if (self2.recorder.processing) {
        return;
      }
      formatAppLog("log", "at components/speechExecuter.ts:186", "speech trigger end..");
      self2.handleWxEndVoice();
    }
    handleWxEndVoice() {
      let self2 = this;
      formatAppLog("log", "at components/speechExecuter.ts:197", "execute stop1");
      formatAppLog("log", "at components/speechExecuter.ts:198", self2.recorder);
      self2.recorder.wxRecorderManager.stop();
      formatAppLog("log", "at components/speechExecuter.ts:200", "execute stop");
    }
    handleProcessWxEndVoice({ filePath }) {
      formatAppLog("log", "at components/speechExecuter.ts:204", "speech end...");
      let self2 = this;
      if (self2.listener.processing) {
        self2.listener.processing();
      }
      uni.uploadFile({
        url: __config.basePath + "/voices/upload",
        filePath,
        header: {
          "X-Token": uni.getStorageSync("x-token")
        },
        name: "file",
        success: (res) => {
          var resData = res;
          self2.handleUploadResult({
            resData
          });
        },
        fail(e) {
          formatAppLog("error", "at components/speechExecuter.ts:224", e, "失败原因");
          uni.showToast({
            title: "上传失败",
            icon: "none"
          });
          if (self2.listener.error) {
            self2.listener.error(e);
          }
        },
        complete: () => {
          self2.recorder.start = false;
          self2.recorder.processing = false;
          self2.recorder.rec = null;
        }
      });
    }
    handleH5EndVoice() {
      let self2 = this;
      if (self2.listener.processing) {
        self2.listener.processing();
      }
      self2.recorder.rec.stop(
        (blob, duration) => {
          self2.recorder.processing = true;
          var reader = new FileReader();
          reader.addEventListener("load", function() {
          }, false);
          reader.readAsDataURL(blob);
          window.URL.createObjectURL(blob);
          uni.uploadFile({
            file: blob,
            header: {
              "X-Token": uni.getStorageSync("x-token")
            },
            name: "file",
            formData: {
              file: blob
            },
            url: __config.basePath + "/voices/upload",
            success: (res) => {
              var resData = res;
              self2.handleUploadResult({
                resData
              });
            },
            fail(e) {
              formatAppLog("error", "at components/speechExecuter.ts:272", e, "失败原因");
              uni.showToast({
                title: "上传失败",
                icon: "none"
              });
            },
            complete: () => {
              self2.recorder.start = false;
              self2.recorder.processing = false;
              self2.recorder.rec = null;
            }
          });
        },
        function(s) {
          if (self2.listener.error) {
            self2.listener.error(s);
          }
          formatAppLog("error", "at components/speechExecuter.ts:289", "结束出错");
        },
        true
      );
    }
    handleUploadResult({ resData }) {
      const self2 = this;
      if (resData.statusCode == 200) {
        let resultJson = JSON.parse(resData.data);
        if (resultJson.code != "200") {
          uni.showToast({
            title: resultJson.message,
            icon: "none"
          });
          if (self2.listener.error) {
            self2.listener.error(resultJson);
          }
          return;
        }
        let dataJson = resultJson.data;
        if (self2.listener.success) {
          self2.listener.success({
            inputValue: dataJson.result,
            voiceFileName: dataJson.file
          });
        }
      }
    }
  };
  const speech = new Speech$2();
  const _sfc_main$t = /* @__PURE__ */ vue.defineComponent({
    __name: "Speech",
    setup(__props, { emit }) {
      var _a;
      (_a = vue.getCurrentInstance()) == null ? void 0 : _a.appContext.config.globalProperties.$bus;
      const recorder = vue.ref({
        start: false,
        processing: false,
        completed: false,
        voiceFileName: null
      });
      const voicePlaying = vue.ref(false);
      const handleSpeech = () => {
        if (recorder.value.start) {
          speech.handleEndVoice();
          return;
        }
        audioPlayer.stopAudio();
        recorder.value.start = true;
        recorder.value.completed = false;
        speech.handleVoiceStart({
          processing: () => {
            recorder.value.processing = true;
          },
          success: ({ voiceFileName }) => {
            recorder.value.voiceFileName = voiceFileName;
            recorder.value.processing = false;
            recorder.value.start = false;
            recorder.value.completed = true;
          },
          interval: (interval) => {
            recorder.value.remainingTime = interval;
          },
          cancel: () => {
            recorder.value.processing = false;
            recorder.value.start = false;
          },
          error: (err) => {
            recorder.value.processing = false;
            recorder.value.start = false;
          }
        });
      };
      const handleSpeechEnd = () => {
        speech.handleEndVoice();
      };
      const handleTrash = () => {
        recorder.value.completed = false;
      };
      const handlePlaySpeech = () => {
        if (!recorder.value.voiceFileName) {
          formatAppLog("error", "at components/Speech.vue:130", "没有语音文件");
          return;
        }
        audioPlayer.playAudio({
          audioUrl: utils.getVoiceFileUrl(recorder.value.voiceFileName),
          listener: {
            playing: () => {
              voicePlaying.value = true;
            },
            success: () => {
              voicePlaying.value = false;
              formatAppLog("log", "at components/Speech.vue:141", voicePlaying.value);
            },
            error: () => {
              voicePlaying.value = false;
            }
          }
        });
      };
      const handleSend = () => {
        if (!recorder.value.voiceFileName) {
          formatAppLog("error", "at components/Speech.vue:155", "没有语音文件");
          return;
        }
        emit("success", {
          fileName: recorder.value.voiceFileName
        });
        recorder.value.completed = false;
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "speech-container" }, [
          vue.createCommentVNode(" 未开始录音 "),
          !recorder.value.start && !recorder.value.completed ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "recorder-box"
          }, [
            vue.renderSlot(_ctx.$slots, "leftMenu", {}, () => [
              vue.createElementVNode("view")
            ], true),
            vue.createElementVNode("view", {
              onClick: handleSpeech,
              class: "recorder-btn-box"
            }, [
              vue.createElementVNode("view", { class: "voice-circle" }, [
                vue.createElementVNode("image", {
                  class: "voice-icon",
                  src: "/static/icon_voice.png"
                })
              ])
            ]),
            vue.renderSlot(_ctx.$slots, "rightMenu", {}, () => [
              vue.createElementVNode("view")
            ], true)
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 开始录音 "),
          recorder.value.start ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            onClick: handleSpeechEnd,
            class: "recordering-box"
          }, [
            vue.createElementVNode("view", { class: "outter-circle animated" }),
            vue.createElementVNode("view", { class: "recordering-circle" }, [
              vue.createElementVNode("view", { class: "recordering-square" })
            ])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 录音结束 "),
          recorder.value.completed ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "recorder-completed-box"
          }, [
            vue.createElementVNode("view", {
              onClick: handleTrash,
              class: "trash-btn-box"
            }, [
              vue.createElementVNode("image", {
                class: "trash-btn",
                src: "/static/icon_trash.png"
              })
            ]),
            vue.createElementVNode("view", {
              onClick: handlePlaySpeech,
              class: "play-btn-box"
            }, [
              !voicePlaying.value ? (vue.openBlock(), vue.createElementBlock("image", {
                key: 0,
                class: "play-btn",
                src: "/static/icon_menu_play.png"
              })) : (vue.openBlock(), vue.createElementBlock("image", {
                key: 1,
                class: "play-btn",
                style: { "width": "100%", "height": "100%" },
                src: "/static/menu_voice_playing.gif"
              }))
            ]),
            vue.createElementVNode("view", {
              onClick: handleSend,
              class: "send-btn-box"
            }, [
              recorder.value.processing ? (vue.openBlock(), vue.createBlock(LoadingRound, { key: 0 })) : vue.createCommentVNode("v-if", true),
              !recorder.value.processing ? (vue.openBlock(), vue.createElementBlock("image", {
                key: 1,
                class: "send-btn",
                src: "/static/icon_send.png"
              })) : vue.createCommentVNode("v-if", true)
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  });
  const Speech$1 = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-0e9e744f"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/components/Speech.vue"]]);
  const _sfc_main$s = {
    name: "Seekbar",
    props: {
      id: {
        default: "canvas"
      },
      width: {
        default: 220
        //宽度
      },
      processVal: {
        default: 0
        //默认进度值
      },
      max: {
        default: 100
        //最大值
      },
      step: {
        default: 1
        //步进值
      },
      startDeg: {
        default: 0
        //开始弧度0
      },
      endDeg: {
        default: 2
        //结束弧度2
      },
      innerLineWidth: {
        default: 1
        //内弧宽度
      },
      innerColor: {
        default: "#49CEB0"
        //内弧颜色
      },
      innerLineDash: {
        default: false
        // //内弧是否为虚线 Number类型,虚线的宽度
      },
      border: {
        default: 10
        //外弧线宽
      },
      process: {
        default: 8
        //进度圆弧宽度
      },
      colorSatrt: {
        default: "#C4C4C4"
        //外弧背景色，string || []
      },
      colorEnd: {
        default: () => ["#49CEB0", "#49CEB0"]
        //进度背景色 string || []
      },
      isCounterClockWise: {
        default: false
        //是否为逆时针方向
      },
      sliderSize: {
        default: 0
        //滑块大小
      },
      indoorCircleSize: {
        default: 0
        //滑块内部圆大小
      },
      sliderColor: {
        default: "#FFFFFF"
        //滑块颜色
      },
      indoorCircleColor: {
        default: "#87ae3f"
        //滑块内圆颜色
      },
      isShowSlider: {
        default: true
        //是否显示滑块
      },
      lock: {
        default: false
        //是否可以拖动,默认锁住，不可拖动
      },
      isShowText: {
        default: true
        //是否显示文字
      },
      pageBg: {
        default: ""
        //背景色
      }
    },
    data() {
      return {
        val: 0,
        center: this.width / 2,
        radius: this.width / 2 - 30,
        residueDeg: 2 - this.startDeg,
        animate: null,
        isDown: false,
        //判断手指是否在滑块上
        // 微信小程序会报navigator 为 undifined 错误
        // isMobile: /Android|webOS|iPhone|iPod|BlackBerry/i.test(
        //   navigator.userAgent
        // ), //设备类型判断
        p: {}
      };
    },
    mounted() {
      this.val = this.processVal;
      this.draw(this.val);
    },
    watch: {
      processVal(newVal) {
        this.val = newVal;
        this.draw(newVal);
      },
      max(newVal) {
        this.max = newVal;
        this.draw(this.val);
      },
      lock(newVal) {
        this.lock = newVal;
        this.draw(this.val);
      }
    },
    methods: {
      //绘图
      draw(value) {
        const ctx = uni.createCanvasContext(this.id, this);
        ctx.setLineCap("round");
        ctx.clearRect(0, 0, this.width, this.width);
        ctx.save();
        let startDeg = this.isCounterClockWise ? Math.PI * (2 - this.startDeg) : Math.PI * this.startDeg;
        let endDeg = this.isCounterClockWise ? Math.PI * (2 - this.endDeg) : Math.PI * this.endDeg;
        let innerThemeColor = typeof this.innerColor == "string" ? this.innerColor : this.setLinearGradient(this.innerColor, ctx);
        ctx.beginPath();
        this.innerLineDash && ctx.setLineDash([this.innerLineDash, this.innerLineDash], 1);
        ctx.setLineWidth(this.innerLineWidth);
        ctx.setStrokeStyle(innerThemeColor);
        ctx.arc(
          this.center,
          this.center,
          this.radius - 30,
          startDeg,
          endDeg,
          this.isCounterClockWise
        );
        ctx.beginPath();
        this.innerLineDash && ctx.setLineDash([1, 0], 1);
        ctx.setLineWidth(this.border);
        ctx.setStrokeStyle(this.colorSatrt);
        ctx.arc(
          this.center,
          this.center,
          this.radius,
          startDeg,
          endDeg,
          this.isCounterClockWise
        );
        ctx.stroke();
        let Deg = this.valToDeg(value);
        let themeColor = typeof this.colorEnd == "string" ? this.colorEnd : this.setLinearGradient(this.colorEnd, ctx);
        ctx.beginPath();
        ctx.setLineWidth(this.process);
        ctx.setStrokeStyle(themeColor);
        ctx.arc(
          this.center,
          this.center,
          this.radius,
          startDeg,
          Deg,
          this.isCounterClockWise
        );
        ctx.stroke();
        ctx.font = `${this.center / 2}px`;
        ctx.setFontSize(36);
        ctx.setFillStyle(themeColor);
        ctx.setTextAlign("center");
        ctx.setTextBaseline("middle");
        this.isShowText && ctx.fillText(this.val, this.center, this.center);
        ctx.draw();
      },
      //将值转化为弧度
      valToDeg(v) {
        let range = this.endDeg - this.startDeg;
        let val = range / this.max * v;
        if (this.isCounterClockWise && val != 0)
          val = 2 - val;
        let startDeg = this.isCounterClockWise ? 2 - this.startDeg : this.startDeg;
        return (startDeg + val) * Math.PI;
      },
      //设置渐变色
      setLinearGradient(color, ctx) {
        const grad = ctx.createLinearGradient(0, 0, 0, this.width);
        color.forEach((e, i) => {
          if (i == 0) {
            grad.addColorStop(0, e);
          } else if (i == color.length - 1) {
            grad.addColorStop(1, e);
          } else {
            grad.addColorStop(1 / color.length * (i + 1), e);
          }
        });
        return grad;
      },
      // 弧度转化为对应坐标值
      DegToXY(deg) {
        let d = 2 * Math.PI - deg;
        return this.respotchangeXY({
          x: this.radius * Math.cos(d),
          y: this.radius * Math.sin(d)
        });
      },
      //中心坐标转化为canvas坐标
      respotchangeXY(point) {
        const spotchangeX = (i) => {
          return i + this.center;
        };
        const spotchangeY = (i) => {
          return this.center - i;
        };
        return {
          x: spotchangeX(point.x),
          y: spotchangeY(point.y)
        };
      },
      //节流函数
      throttle(func) {
        let previous = 0;
        return function() {
          let now = Date.now();
          let context = this;
          let args = arguments;
          if (now - previous > 10) {
            func.apply(context, args);
            previous = now;
          }
        };
      },
      //canvas坐标转化为中心坐标
      spotchangeXY(point) {
        const spotchangeX = (i) => {
          return i - this.center;
        };
        const spotchangeY = (i) => {
          return this.center - i;
        };
        return {
          x: spotchangeX(point.x),
          y: spotchangeY(point.y)
        };
      },
      // 将坐标点转化为弧度
      XYToDeg(lx, ly) {
        let adeg = Math.atan(ly / lx);
        let deg;
        if (lx >= 0 && ly >= 0) {
          deg = adeg;
        }
        if (lx <= 0 && ly >= 0) {
          deg = adeg + Math.PI;
        }
        if (lx <= 0 && ly <= 0) {
          deg = adeg + Math.PI;
        }
        if (lx > 0 && ly < 0) {
          deg = adeg + Math.PI * 2;
        }
        return deg;
      },
      //滑动开始
      touchStart(e) {
        if (this.lock) {
          return false;
        }
        const touches = e.mp.changedTouches[0] || e.changedTouches[0];
        let range = 10;
        let X = touches.x;
        let Y = touches.y;
        let P = this.P;
        let minX = P.x - this.sliderSize - range;
        let maxX = P.x + this.sliderSize + range;
        let minY = P.y - this.sliderSize - range;
        let maxY = P.y + this.sliderSize + range;
        if (minX < X && X < maxX && minY < Y && Y < maxY) {
          this.isDown = true;
        } else {
          this.isDown = false;
        }
      },
      //滑动
      touchMove(e) {
        if (!this.isDown)
          return;
        const touches = e.mp.changedTouches[0] || e.changedTouches[0];
        let evpoint = {};
        evpoint.x = touches.x;
        evpoint.y = touches.y;
        let point = this.spotchangeXY(evpoint);
        let deg = this.XYToDeg(point.x, point.y);
        deg = this.isCounterClockWise ? deg : Math.PI * 2 - deg;
        const radian = deg / Math.PI;
        let vals = (radian - (radian > this.startDeg ? this.startDeg : -this.residueDeg)) / (this.endDeg - this.startDeg) * this.max;
        if (vals > 100 || vals < 0)
          return;
        if (vals >= this.max)
          vals = this.max;
        if (vals <= 0)
          vals = 0;
        if (Math.abs(vals - this.val) > 10)
          return;
        this.animate = requestAnimationFrame(this.draw.bind(this, vals));
        if (this.val != Math.round(vals)) {
          this.val = Math.round(vals);
          this.$emit("change", this.val);
        }
      },
      //滑动结束
      touchEnd(e) {
        const _this = this;
        this.$emit("mouseUp", this.val);
        cancelAnimationFrame(_this.animate);
        this.isDown = false;
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "progress_box",
        style: vue.normalizeStyle({ "background-color": $props.pageBg })
      },
      [
        vue.createElementVNode("canvas", {
          "canvas-id": $props.id,
          style: vue.normalizeStyle({ width: $props.width + "px", height: $props.width / 1 + "px" }),
          "disable-scroll": "true",
          onTouchstart: _cache[0] || (_cache[0] = (...args) => $options.touchStart && $options.touchStart(...args)),
          onTouchmove: _cache[1] || (_cache[1] = (...args) => $options.touchMove && $options.touchMove(...args)),
          onTouchend: _cache[2] || (_cache[2] = (...args) => $options.touchEnd && $options.touchEnd(...args))
        }, null, 44, ["canvas-id"]),
        vue.renderSlot(_ctx.$slots, "default")
      ],
      4
      /* STYLE */
    );
  }
  const SeekBar = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$1], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/components/Rare2.vue"]]);
  const _sfc_main$r = /* @__PURE__ */ vue.defineComponent({
    __name: "Rate",
    props: {
      rate: { type: Number, required: true }
    },
    setup(__props) {
      vue.onMounted(() => {
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "rate-container" }, [
          __props.rate && __props.rate > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
            vue.createVNode(SeekBar, {
              width: 140,
              processVal: __props.rate
            }, null, 8, ["processVal"])
          ])) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  });
  const Rate = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-8576ae7b"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/components/Rate.vue"]]);
  const _sfc_main$q = /* @__PURE__ */ vue.defineComponent({
    __name: "TextPronunciation",
    props: {
      content: { type: String, required: true },
      pronunciation: { type: null, required: true }
    },
    setup(__props, { emit }) {
      const handleWordDetail = (word) => {
        formatAppLog("log", "at pages/chat/components/TextPronunciation.vue:20", word);
        emit("wordClick", word);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "word-box" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(__props.pronunciation.words, (word) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: vue.normalizeClass(["word-text", { incorrect: word.accuracy_score <= 60, good: word.accuracy_score > 60 && word.accuracy_score < 75 }]),
                key: word.word,
                onClick: ($event) => handleWordDetail(word)
              }, vue.toDisplayString(word.word), 11, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]);
      };
    }
  });
  const TextPronunciation = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-f08da118"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/chat/components/TextPronunciation.vue"]]);
  const globalUserInfo = vue.ref(1);
  const globalLoading = vue.ref(false);
  function useUserInfo() {
    const localCount = vue.ref(1);
    vue.onMounted(() => {
      globalLoading.value = true;
      chatRequest.sessionDefaultGet({}).then((data) => {
        globalUserInfo.value = data.data;
      });
      globalLoading.value = false;
    });
    return {
      globalUserInfo,
      globalLoading,
      localCount
    };
  }
  const _sfc_main$p = /* @__PURE__ */ vue.defineComponent({
    __name: "MessagePronunciation",
    props: {
      messageId: { type: String, required: true },
      sessionId: { type: String, required: false },
      messageContent: { type: String, required: true },
      fileName: { type: String, required: false }
    },
    setup(__props, { expose, emit }) {
      const props = __props;
      const { globalUserInfo: globalUserInfo2, globalLoading: globalLoading2 } = useUserInfo();
      const pronunciationLoading = vue.ref(false);
      const pronunciationResult = vue.ref(null);
      const practiceFileName = vue.ref(null);
      const initData = () => {
        if (pronunciationResult.value || !props.fileName) {
          return;
        }
        pronunciationLoading.value = true;
        chatRequest.pronunciationInvoke({ message_id: props.messageId }).then((data) => {
          pronunciationResult.value = data.data;
        }).finally(() => {
          pronunciationLoading.value = false;
          formatAppLog("log", "at pages/chat/components/MessagePronunciation.vue:66", pronunciationLoading.value);
        });
      };
      const handleSuccess = (data) => {
        pronunciationLoading.value = true;
        pronunciationResult.value = null;
        chatRequest.messagePractice({ message_id: props.messageId, file_name: data.fileName }).then((resp) => {
          practiceFileName.value = data.fileName;
          pronunciationResult.value = resp.data;
        }).finally(() => {
          pronunciationLoading.value = false;
          formatAppLog("log", "at pages/chat/components/MessagePronunciation.vue:80", pronunciationLoading.value);
        });
      };
      const handleWordDetail = (word) => {
        emit("wordClick", word);
      };
      expose({
        initData
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 发音评估 "),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("view", { class: "pronunciation-content" }, [
                pronunciationLoading.value ? (vue.openBlock(), vue.createBlock(LoadingRound, { key: 0 })) : vue.createCommentVNode("v-if", true),
                pronunciationResult.value ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                  vue.createVNode(Rate, {
                    rate: vue.unref(utils).removeDecimal(pronunciationResult.value.pronunciation_score)
                  }, null, 8, ["rate"])
                ])) : vue.createCommentVNode("v-if", true),
                pronunciationResult.value ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 2,
                  class: "pronunciation-tips"
                }, " 点击查看单词评分 ")) : vue.createCommentVNode("v-if", true),
                pronunciationResult.value ? (vue.openBlock(), vue.createBlock(TextPronunciation, {
                  key: 3,
                  content: __props.messageContent,
                  pronunciation: pronunciationResult.value,
                  onWordClick: handleWordDetail
                }, null, 8, ["content", "pronunciation"])) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("view", { class: "voice-box" }, [
                  vue.createElementVNode("view", { class: "ai-voice-box" }, [
                    vue.createElementVNode("image", {
                      class: "voice-avatar",
                      src: vue.unref(globalUserInfo2).teacher_avatar || "/static/ai-robot.jpg"
                    }, null, 8, ["src"]),
                    vue.createVNode(AudioPlayer, {
                      content: __props.messageContent,
                      sessionId: __props.sessionId
                    }, null, 8, ["content", "sessionId"])
                  ]),
                  __props.fileName ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "original-voice-box"
                  }, [
                    vue.createElementVNode("view", { class: "my-voice-avatar-box" }, [
                      vue.createElementVNode("text", { class: "avatar-text" }, " 我 ")
                    ]),
                    vue.createVNode(AudioPlayer, {
                      fileName: practiceFileName.value || __props.fileName
                    }, null, 8, ["fileName"])
                  ])) : vue.createCommentVNode("v-if", true)
                ])
              ]),
              vue.createElementVNode("view", { class: "practice-box" }, "练习"),
              vue.createVNode(Speech$1, { onSuccess: handleSuccess })
            ])
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  });
  const MessagePronunciation = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-622aa746"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/chat/components/MessagePronunciation.vue"]]);
  const _sfc_main$o = /* @__PURE__ */ vue.defineComponent({
    __name: "PhonemeBox",
    props: {
      word: { type: null, required: true }
    },
    setup(__props, { emit }) {
      const handlePhonemeDetail = (phoneme) => {
        emit("phonemeClick", phoneme);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "phoneme-box" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(__props.word.phonemes, (phoneme, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: vue.normalizeClass(["phoneme-text", { incorrect: phoneme.accuracy_score <= 60, good: phoneme.accuracy_score > 60 && phoneme.accuracy_score < 75 }]),
                key: index,
                onClick: ($event) => handlePhonemeDetail(phoneme)
              }, vue.toDisplayString(phoneme.phoneme), 11, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]);
      };
    }
  });
  const PhonemeBox = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-7495a7f6"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/chat/components/PhonemeBox.vue"]]);
  const _sfc_main$n = /* @__PURE__ */ vue.defineComponent({
    __name: "WordDetail",
    setup(__props, { expose }) {
      const wordDetailLoading = vue.ref(false);
      const practiceLoading = vue.ref(false);
      const wordDetailAccuracyScore = vue.ref(null);
      const wordPronunciation = vue.ref();
      const wordDetail = vue.ref(null);
      const sessionId = vue.ref("");
      const practiceFile = vue.ref(null);
      const initData = (word, sessionIdVal) => {
        wordPronunciation.value = word;
        wordDetail.value = null;
        sessionId.value = sessionIdVal;
        wordDetailLoading.value = true;
        chatRequest.wordDetail({ word: word.word }).then((data) => {
          const wordDetailData = data.data;
          wordDetail.value = wordDetailData;
          wordDetailLoading.value = false;
        });
      };
      const handleSuccess = (data) => {
        if (!wordDetail.value) {
          return;
        }
        wordDetailAccuracyScore.value = null;
        practiceLoading.value = true;
        practiceFile.value = null;
        chatRequest.wordPractice({
          word: wordDetail.value.original,
          session_id: sessionId.value,
          file_name: data.fileName
        }).then((res) => {
          const wordDetailData = res.data;
          wordPronunciation.value = wordDetailData["words"][0];
          practiceLoading.value = false;
          practiceFile.value = data.fileName;
        });
      };
      const handlePhonemeClick = (phoneme) => {
        formatAppLog("log", "at pages/chat/components/WordDetail.vue:96", phoneme);
      };
      expose({
        initData
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "word-detail-container" }, [
          vue.createElementVNode("view", null, [
            vue.createCommentVNode(" 发单 "),
            practiceLoading.value ? (vue.openBlock(), vue.createBlock(LoadingRound, { key: 0 })) : wordPronunciation.value ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 1 },
              [
                vue.createVNode(Rate, {
                  rate: wordPronunciation.value.accuracy_score
                }, null, 8, ["rate"]),
                vue.createElementVNode("view", { class: "phoneme-box" }, [
                  vue.createVNode(PhonemeBox, {
                    word: wordPronunciation.value,
                    onPhonemeClick: handlePhonemeClick
                  }, null, 8, ["word"]),
                  practiceFile.value ? (vue.openBlock(), vue.createBlock(AudioPlayer, {
                    key: 0,
                    class: "audio-player-box",
                    "file-name": practiceFile.value
                  }, null, 8, ["file-name"])) : vue.createCommentVNode("v-if", true)
                ])
              ],
              64
              /* STABLE_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" 单词内容 "),
            wordDetailLoading.value ? (vue.openBlock(), vue.createBlock(LoadingRound, { key: 2 })) : wordDetail.value ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 3 },
              [
                vue.createElementVNode("view", { class: "original-word-box" }, [
                  vue.createElementVNode("view", { class: "left-box" }, [
                    vue.createElementVNode(
                      "view",
                      { class: "original-word-text" },
                      vue.toDisplayString(wordDetail.value.original),
                      1
                      /* TEXT */
                    ),
                    vue.createVNode(AudioPlayer, {
                      class: "audio-player-box",
                      content: wordDetail.value.original,
                      "session-id": sessionId.value
                    }, null, 8, ["content", "session-id"])
                  ]),
                  vue.createElementVNode("view", { class: "right-box" }, [
                    vue.createVNode(Collect, {
                      type: "WORD",
                      content: wordDetail.value.original
                    }, null, 8, ["content"])
                  ])
                ]),
                vue.createElementVNode("view", { class: "phonetic-box" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "phonetic-text" },
                    vue.toDisplayString(wordDetail.value.phonetic),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode(
                  "view",
                  { class: "translation-box" },
                  vue.toDisplayString(wordDetail.value.translation),
                  1
                  /* TEXT */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true)
          ]),
          vue.createCommentVNode(" 练习 "),
          vue.createElementVNode("view", { class: "speech-tip-box" }, " 练习 "),
          vue.createVNode(Speech$1, { onSuccess: handleSuccess })
        ]);
      };
    }
  });
  const WordDetail = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-d52515e0"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/chat/components/WordDetail.vue"]]);
  const _sfc_main$m = /* @__PURE__ */ vue.defineComponent({
    __name: "MessageGrammarPopup",
    setup(__props, { expose }) {
      const grammarPopup = vue.ref(null);
      const sessionId = vue.ref("");
      const messageId = vue.ref("");
      const messageContent = vue.ref("");
      const fileName = vue.ref("");
      const activeView = vue.ref("grammar");
      vue.ref(null);
      vue.ref(null);
      const wordDetailShow = vue.ref(false);
      const messageGrammarRef = vue.ref(null);
      const messagePronunciationRef = vue.ref(null);
      const wordDetailRef = vue.ref(null);
      const popupBackgoundColor = vue.ref("");
      vue.onMounted(() => {
      });
      const handleCloseWordDetail = () => {
        wordDetailShow.value = false;
        initData();
      };
      const handleWordDetail = (word) => {
        wordDetailShow.value = true;
        vue.nextTick(() => {
          setTimeout(() => {
            wordDetailRef.value.initData(word, sessionId.value);
          }, 100);
        });
      };
      const handlePopupChange = ({ show, type }) => {
      };
      const handleActive = (active) => {
        activeView.value = active;
        initData();
      };
      const initData = () => {
        setTimeout(() => {
          if (activeView.value === "pronunciation") {
            vue.nextTick(() => {
              messagePronunciationRef.value.initData();
            });
          } else {
            vue.nextTick(() => {
              messageGrammarRef.value.initData();
            });
          }
        }, 100);
      };
      const handleClose = () => {
        grammarPopup.value.close();
        activeView.value = "grammar";
        wordDetailShow.value = false;
      };
      const open = (id, content, file, sessionIdVal, type) => {
        messageId.value = id;
        sessionId.value = sessionIdVal;
        messageContent.value = content;
        fileName.value = file;
        if (type && type === "pronunciation") {
          activeView.value = "pronunciation";
        } else {
          activeView.value = "grammar";
        }
        grammarPopup.value.open();
        vue.nextTick(() => {
          setTimeout(() => {
            if (activeView.value === "pronunciation") {
              messagePronunciationRef.value.initData();
            } else {
              messageGrammarRef.value.initData();
            }
          }, 100);
        });
      };
      const handleWordClick = (word) => {
        handleWordDetail(word);
      };
      expose({
        open,
        handleClose
      });
      return (_ctx, _cache) => {
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0);
        return vue.openBlock(), vue.createBlock(_component_uni_popup, {
          onChange: handlePopupChange,
          ref_key: "grammarPopup",
          ref: grammarPopup,
          type: "bottom",
          "background-color": popupBackgoundColor.value
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "message-grammat-container" }, [
              vue.createElementVNode("view", {
                onClick: handleClose,
                class: "close-icon-box"
              }, [
                vue.createElementVNode("image", {
                  class: "close-icon",
                  src: "/static/icon_close.png"
                })
              ]),
              wordDetailShow.value ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                onClick: handleCloseWordDetail,
                class: "word-back-icon-box"
              }, [
                vue.createElementVNode("image", {
                  class: "icon",
                  src: "/static/icon_header_back.png"
                })
              ])) : vue.createCommentVNode("v-if", true),
              !wordDetailShow.value ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "tab-box"
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    onClick: _cache[0] || (_cache[0] = ($event) => handleActive("grammar")),
                    class: vue.normalizeClass(["tab-item", { "active": activeView.value === "grammar" }])
                  },
                  " 语法 ",
                  2
                  /* CLASS */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    onClick: _cache[1] || (_cache[1] = ($event) => handleActive("pronunciation")),
                    class: vue.normalizeClass(["tab-item", { "active": activeView.value === "pronunciation" }])
                  },
                  " 发音 ",
                  2
                  /* CLASS */
                )
              ])) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" 单个单词评分 "),
              wordDetailShow.value ? (vue.openBlock(), vue.createBlock(
                WordDetail,
                {
                  key: 2,
                  ref_key: "wordDetailRef",
                  ref: wordDetailRef
                },
                null,
                512
                /* NEED_PATCH */
              )) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" 语法评估 "),
              activeView.value === "grammar" && !wordDetailShow.value ? (vue.openBlock(), vue.createBlock(MessageGrammar$1, {
                key: 3,
                class: "grammar-box",
                "message-id": messageId.value,
                "session-id": sessionId.value,
                ref_key: "messageGrammarRef",
                ref: messageGrammarRef
              }, null, 8, ["message-id", "session-id"])) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" 发音评估 "),
              activeView.value === "pronunciation" && !wordDetailShow.value ? (vue.openBlock(), vue.createBlock(MessagePronunciation, {
                key: 4,
                "message-id": messageId.value,
                "session-id": sessionId.value,
                "message-content": messageContent.value,
                "file-name": fileName.value,
                onWordClick: handleWordClick,
                ref_key: "messagePronunciationRef",
                ref: messagePronunciationRef
              }, null, 8, ["message-id", "session-id", "message-content", "file-name"])) : vue.createCommentVNode("v-if", true)
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["background-color"]);
      };
    }
  });
  const MessageGrammar = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-ce932745"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/chat/components/MessageGrammarPopup.vue"]]);
  const _sfc_main$l = {};
  function _sfc_render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "loading-box" }, [
      vue.createElementVNode("view", { class: "loading-box-content" }, [
        vue.createElementVNode("view", { class: "loading-box-item loading-box-item0" }),
        vue.createElementVNode("view", { class: "loading-box-item loading-box-item1" }),
        vue.createElementVNode("view", { class: "loading-box-item loading-box-item2" })
      ])
    ]);
  }
  const Loading = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render], ["__scopeId", "data-v-7fb57159"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/components/Loading.vue"]]);
  const _sfc_main$k = /* @__PURE__ */ vue.defineComponent({
    __name: "MessageContent",
    props: {
      message: { type: null, required: true }
    },
    setup(__props, { expose }) {
      const props = __props;
      const functionalTextRef = vue.ref(null);
      const messageGrammarRef = vue.ref(null);
      const grammarLoading = vue.ref(false);
      const translateShow = vue.ref(false);
      const textShadow = vue.ref(false);
      vue.onMounted(() => {
        if (props.message.auto_hint && props.message.auto_hint === true) {
          textShadow.value = true;
        }
        if (props.message.auto_pronunciation) {
          autoPronunciation();
        }
      });
      vue.computed(() => {
        return props.message.owner;
      });
      const containerClass = vue.computed(() => {
        const messagePosition = props.message.owner ? "right" : "left";
        return `${messagePosition}-content`;
      });
      const handleTranslateText = () => {
        translateShow.value = !translateShow.value;
      };
      const handleCopyText = () => {
        uni.setClipboardData({
          data: props.message.content,
          success: () => {
            uni.showToast({
              title: "复制成功",
              icon: "none"
            });
          }
        });
      };
      const handleHint = () => {
        textShadow.value = !textShadow.value;
      };
      const handleGrammar = () => {
        let type = "grammar";
        if (props.message.file_name) {
          type = "pronunciation";
        }
        messageGrammarRef.value.open(
          props.message.id,
          props.message.content,
          props.message.file_name,
          props.message.session_id,
          type
        );
      };
      const autoPlayAudio = () => {
        vue.nextTick(() => {
          functionalTextRef.value.autoPlayAudio();
        });
      };
      const autoPronunciation = () => {
        grammarLoading.value = true;
        chatRequest.pronunciationInvoke({ message_id: props.message.id }).then((data) => {
          props.message.pronunciation = data.data;
          grammarLoading.value = false;
        });
      };
      const autoHandleHint = () => {
        handleHint();
      };
      expose({
        autoPlayAudio,
        autoHandleHint,
        autoPronunciation
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: vue.normalizeClass(["message-container", vue.unref(containerClass)])
          },
          [
            vue.createCommentVNode(" loading "),
            !__props.message.content ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "loading-box"
            }, [
              vue.createVNode(Loading)
            ])) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 1 },
              [
                vue.createCommentVNode(" 具体内容 "),
                vue.createElementVNode("view", { class: "message-box" }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["message-text-box", { "own-text-box": __props.message.owner }])
                    },
                    [
                      vue.createCommentVNode(" AI消息 "),
                      !__props.message.owner ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "assistant-text-box"
                      }, [
                        vue.createVNode(FunctionalText, {
                          ref_key: "functionalTextRef",
                          ref: functionalTextRef,
                          "auto-play": __props.message.auto_play || false,
                          messageId: __props.message.id,
                          wordClickable: true,
                          text: __props.message.content,
                          fileName: __props.message.file_name,
                          translateShow: translateShow.value,
                          textShadow: textShadow.value
                        }, null, 8, ["auto-play", "messageId", "text", "fileName", "translateShow", "textShadow"]),
                        vue.createElementVNode("view", { class: "divider" }),
                        vue.createElementVNode("view", { class: "action-container" }, [
                          vue.createElementVNode(
                            "view",
                            {
                              class: vue.normalizeClass(["btn-box", { active: translateShow.value }])
                            },
                            [
                              vue.createElementVNode("image", {
                                class: "action-icon",
                                onClick: handleTranslateText,
                                src: "/static/icon_translate.png"
                              })
                            ],
                            2
                            /* CLASS */
                          ),
                          vue.createElementVNode("view", { class: "btn-box collect-btn-box" }, [
                            vue.createVNode(Collect, {
                              type: "MESSAGE",
                              messageId: __props.message.id || ""
                            }, null, 8, ["messageId"])
                          ]),
                          vue.createElementVNode("view", { class: "btn-box" }, [
                            vue.createElementVNode("image", {
                              class: "action-icon",
                              onClick: handleCopyText,
                              src: "/static/icon_copy_text.png"
                            })
                          ]),
                          vue.createElementVNode(
                            "view",
                            {
                              class: vue.normalizeClass(["btn-box", { active: textShadow.value }])
                            },
                            [
                              vue.createElementVNode("image", {
                                class: "action-icon",
                                onClick: handleHint,
                                src: "/static/icon_hint.png"
                              })
                            ],
                            2
                            /* CLASS */
                          )
                        ])
                      ])) : (vue.openBlock(), vue.createElementBlock(
                        vue.Fragment,
                        { key: 1 },
                        [
                          vue.createCommentVNode(" 用户消息 "),
                          vue.createElementVNode("view", { class: "account-text-container" }, [
                            vue.createElementVNode("view", { class: "account-text-box" }, [
                              vue.createCommentVNode(" 展示语音分析结果 "),
                              vue.createCommentVNode(' <TextPronunciation v-if="message.pronunciation" :content="message.content" :pronunciation="message.pronunciation" @wordClick="handleWordDetail" />\r\n            \r\n            <view v-else>{{ message.content }}</view> '),
                              vue.createElementVNode(
                                "view",
                                null,
                                vue.toDisplayString(__props.message.content),
                                1
                                /* TEXT */
                              ),
                              vue.createCommentVNode(" 语音播放 "),
                              __props.message.file_name ? (vue.openBlock(), vue.createElementBlock("view", {
                                key: 0,
                                class: "speech-box"
                              }, [
                                vue.createVNode(AudioPlayer, {
                                  direction: "right",
                                  fileName: __props.message.file_name
                                }, null, 8, ["fileName"])
                              ])) : vue.createCommentVNode("v-if", true)
                            ])
                          ])
                        ],
                        2112
                        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                      ))
                    ],
                    2
                    /* CLASS */
                  ),
                  vue.createCommentVNode(" 语法 "),
                  __props.message.owner ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "grammar-outter-box"
                  }, [
                    grammarLoading.value ? (vue.openBlock(), vue.createBlock(LoadingRound, {
                      key: 0,
                      class: "grammar-box"
                    })) : __props.message.pronunciation ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 1,
                      class: "grammar-box",
                      onClick: handleGrammar
                    }, [
                      vue.createElementVNode("image", {
                        class: "grammar-icon",
                        src: "/static/icon_grammar.png"
                      }),
                      vue.createElementVNode(
                        "text",
                        { class: "grammar-score" },
                        vue.toDisplayString(vue.unref(utils).removeDecimal(__props.message.pronunciation.pronunciation_score)),
                        1
                        /* TEXT */
                      )
                    ])) : (vue.openBlock(), vue.createElementBlock("view", {
                      key: 2,
                      class: "grammar-box",
                      onClick: handleGrammar
                    }, [
                      vue.createElementVNode("image", {
                        class: "grammar-icon",
                        src: "/static/icon_grammar.png"
                      }),
                      vue.createElementVNode("text", null, "语法")
                    ]))
                  ])) : vue.createCommentVNode("v-if", true)
                ])
              ],
              2112
              /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
            )),
            vue.createVNode(
              MessageGrammar,
              {
                ref_key: "messageGrammarRef",
                ref: messageGrammarRef
              },
              null,
              512
              /* NEED_PATCH */
            )
          ],
          2
          /* CLASS */
        );
      };
    }
  });
  const MessageContent = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-30e39fae"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/chat/components/MessageContent.vue"]]);
  const _sfc_main$j = /* @__PURE__ */ vue.defineComponent({
    __name: "MessageSpeech",
    setup(__props, { emit }) {
      var _a;
      const $bus = (_a = vue.getCurrentInstance()) == null ? void 0 : _a.appContext.config.globalProperties.$bus;
      const handleSuccess = (data) => {
        const fileName = data.fileName;
        emit("success", data);
        $bus.emit("SendMessage", {
          fileName
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(
          Speech$1,
          {
            onSuccess: handleSuccess,
            ref: "speechRef"
          },
          {
            leftMenu: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "leftMenu")
            ]),
            rightMenu: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "rightMenu")
            ]),
            _: 3
            /* FORWARDED */
          },
          512
          /* NEED_PATCH */
        );
      };
    }
  });
  const Speech = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/chat/components/MessageSpeech.vue"]]);
  const _sfc_main$i = /* @__PURE__ */ vue.defineComponent({
    __name: "PromptPopup",
    setup(__props, { expose }) {
      var _a;
      const promotPopup = vue.ref(null);
      const sessionId = vue.ref(null);
      const promptLoading = vue.ref(true);
      const promoptList = vue.ref([]);
      const $bus = (_a = vue.getCurrentInstance()) == null ? void 0 : _a.appContext.config.globalProperties.$bus;
      const popupBackgoundColor = vue.ref("");
      vue.onMounted(() => {
      });
      const handleClose = () => {
        closePopup();
      };
      const open = (sessionIdValue) => {
        sessionId.value = sessionIdValue;
        promotPopup.value.open();
        promptLoading.value = true;
        chatRequest.promptInvoke({
          session_id: sessionIdValue
        }).then((data) => {
          promoptList.value = [{
            text: data.data,
            translateShow: false
          }];
        }).finally(() => {
          promptLoading.value = false;
        });
      };
      const handleTranslatePrompt = (prompt) => {
        prompt.translateShow = !prompt.translateShow;
      };
      const sendMessage = (prompt) => {
        $bus.emit("SendMessage", {
          text: prompt.text
        });
        closePopup();
      };
      const handleSpeechSuccess = () => {
        closePopup();
      };
      const closePopup = () => {
        formatAppLog("log", "at pages/chat/components/PromptPopup.vue:106", "closePopup");
        sessionId.value = "";
        promoptList.value = [];
        promotPopup.value.close();
      };
      expose({
        open
      });
      return (_ctx, _cache) => {
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0);
        return vue.openBlock(), vue.createBlock(_component_uni_popup, {
          class: "popup-container",
          ref_key: "promotPopup",
          ref: promotPopup,
          type: "bottom",
          "background-color": popupBackgoundColor.value
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "promot-popup-container" }, [
              vue.createElementVNode("view", {
                onClick: handleClose,
                class: "close-icon-box"
              }, [
                vue.createElementVNode("image", {
                  class: "close-icon",
                  src: "/static/icon_close.png"
                })
              ]),
              vue.createElementVNode("view", { class: "title-box" }, [
                vue.createElementVNode("view", { class: "title" }, " 提示 ")
              ]),
              vue.createElementVNode("view", { class: "sub-title-box" }, [
                vue.createElementVNode("view", null, "您可以尝试说")
              ]),
              vue.createCommentVNode(" loading "),
              promptLoading.value ? (vue.openBlock(), vue.createBlock(LoadingRound, {
                key: 0,
                class: "loading-box"
              })) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" 提示内容 "),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(promoptList.value, (prompt) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: prompt.text
                  }, [
                    vue.createElementVNode("view", { class: "promot-box padding-left-right" }, [
                      vue.createVNode(FunctionalText, {
                        "session-id": sessionId.value,
                        text: prompt.text,
                        "translate-show": prompt.translateShow,
                        class: "prompt-text-box"
                      }, null, 8, ["session-id", "text", "translate-show"]),
                      vue.createElementVNode("view", { class: "action-box" }, [
                        vue.createElementVNode(
                          "view",
                          {
                            class: vue.normalizeClass(["translate-icon-box left-box", { "active": prompt.translateShow }])
                          },
                          [
                            vue.createElementVNode("image", {
                              onClick: ($event) => handleTranslatePrompt(prompt),
                              class: "icon-tanslate",
                              src: "/static/icon_translate.png"
                            }, null, 8, ["onClick"])
                          ],
                          2
                          /* CLASS */
                        ),
                        vue.createElementVNode("view", {
                          onClick: ($event) => sendMessage(prompt),
                          class: "right-box"
                        }, " 发送文本 ", 8, ["onClick"])
                      ])
                    ]),
                    vue.createElementVNode("view", { class: "divide" })
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              vue.createElementVNode("view", { class: "speech-box" }, [
                vue.createVNode(Speech, {
                  sessionId: sessionId.value,
                  onSuccess: handleSpeechSuccess
                }, null, 8, ["sessionId"])
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["background-color"]);
      };
    }
  });
  const PromptPopup = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-4779b32d"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/chat/components/PromptPopup.vue"]]);
  const _sfc_main$h = /* @__PURE__ */ vue.defineComponent({
    __name: "TranslationPopup",
    setup(__props, { expose }) {
      var _a;
      const $bus = (_a = vue.getCurrentInstance()) == null ? void 0 : _a.appContext.config.globalProperties.$bus;
      const translationPopup = vue.ref(null);
      const inputText = vue.ref("");
      const translating = vue.ref(false);
      const translationText = vue.ref("");
      const sessionId = vue.ref("");
      const popupBackgoundColor = vue.ref("");
      vue.onMounted(() => {
      });
      const inputHasText = vue.computed(() => {
        return !!(inputText.value && inputText.value.trim());
      });
      const handleTranslate = () => {
        if (!inputHasText.value) {
          uni.showToast({
            title: "请输入文本",
            icon: "none"
          });
          return;
        }
        translating.value = true;
        chatRequest.translateSettingLanguage({
          text: inputText.value,
          session_id: sessionId.value
        }).then((data) => {
          translationText.value = data.data;
          translating.value = false;
        }).catch(() => {
          translating.value = false;
        });
      };
      const handleSend = () => {
        if (!translationText.value) {
          uni.showToast({
            title: "请输入文本并进行翻译",
            icon: "none"
          });
          return;
        }
        $bus.emit("SendMessage", {
          text: translationText.value
        });
        handleClose();
      };
      const handleSuccess = (data) => {
        handleClose();
      };
      const handleClose = () => {
        translationPopup.value.close();
        inputText.value = "";
        translationText.value = "";
        sessionId.value = "";
      };
      const open = (sessionIdVal) => {
        sessionId.value = sessionIdVal;
        translationPopup.value.open();
      };
      expose({
        open,
        handleClose
      });
      return (_ctx, _cache) => {
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0);
        return vue.openBlock(), vue.createBlock(_component_uni_popup, {
          ref_key: "translationPopup",
          ref: translationPopup,
          type: "bottom",
          "background-color": popupBackgoundColor.value
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "translation-container" }, [
              vue.createElementVNode("view", {
                onClick: handleClose,
                class: "close-icon-box"
              }, [
                vue.createElementVNode("image", {
                  class: "close-icon",
                  src: "/static/icon_close.png"
                })
              ]),
              vue.createElementVNode("view", { class: "content" }, [
                vue.createElementVNode("view", { class: "title-box" }, [
                  vue.createElementVNode("text", { class: "title-text" }, " 输入语句 ")
                ]),
                vue.createElementVNode("view", { class: "textarea-box" }, [
                  vue.withDirectives(vue.createElementVNode(
                    "textarea",
                    {
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => inputText.value = $event),
                      "confirm-type": "send",
                      class: "textarea",
                      placeholder: "例如：我喜欢音乐"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, inputText.value]
                  ]),
                  vue.createElementVNode("view", {
                    onClick: vue.withModifiers(handleTranslate, ["stop"]),
                    class: vue.normalizeClass(["translate-btn-box", { active: vue.unref(inputHasText) }])
                  }, [
                    vue.createElementVNode("view", { class: "translate-btn" }, " 翻译 ")
                  ], 10, ["onClick"])
                ]),
                vue.createCommentVNode(" 翻译loading "),
                translating.value ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "loading-box"
                }, [
                  vue.createVNode(LoadingRound)
                ])) : vue.createCommentVNode("v-if", true),
                vue.createCommentVNode(" 翻译后的文本 "),
                translationText.value && !translating.value ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "translation-box"
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "translation-text" },
                    vue.toDisplayString(translationText.value),
                    1
                    /* TEXT */
                  ),
                  vue.createVNode(AudioPlayer, {
                    class: "playing-box",
                    content: translationText.value,
                    "session-id": sessionId.value
                  }, null, 8, ["content", "session-id"])
                ])) : vue.createCommentVNode("v-if", true),
                vue.createCommentVNode(" 直接发送 "),
                translationText.value && !translating.value ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 2,
                  class: "send-box"
                }, [
                  vue.createElementVNode("view", { class: "send-btn-box" }, [
                    vue.createElementVNode("view", {
                      onClick: handleSend,
                      class: "send-btn"
                    }, " 发送文本 ")
                  ])
                ])) : vue.createCommentVNode("v-if", true)
              ]),
              vue.createElementVNode("view", { class: "speech-container" }, [
                vue.createVNode(Speech, {
                  sessionId: sessionId.value,
                  onSuccess: handleSuccess
                }, null, 8, ["sessionId"])
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["background-color"]);
      };
    }
  });
  const TranslationPopup = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-b772b10a"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/chat/components/TranslationPopup.vue"]]);
  const _sfc_main$g = /* @__PURE__ */ vue.defineComponent({
    __name: "Prompt",
    props: {
      sessionId: { type: String, required: false }
    },
    setup(__props) {
      const props = __props;
      vue.ref("");
      const promotPopupRef = vue.ref(null);
      const translationPopupRef = vue.ref(null);
      const handlePrompt = () => {
        promotPopupRef.value.open(props.sessionId);
      };
      const handleTranslate = () => {
        translationPopupRef.value.open(props.sessionId);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "menu-container" }, [
          vue.createElementVNode("view", {
            onClick: handlePrompt,
            class: "menu-item"
          }, [
            vue.createElementVNode("image", {
              class: "menu-icon",
              src: "/static/icon_prompt.png"
            }),
            vue.createElementVNode("view", { class: "menu-text" }, " 提示 ")
          ]),
          vue.createElementVNode("view", {
            onClick: handleTranslate,
            class: "menu-item"
          }, [
            vue.createElementVNode("image", {
              class: "menu-icon",
              src: "/static/icon_translate.png"
            }),
            vue.createElementVNode("view", { class: "menu-text" }, " 翻译 ")
          ]),
          vue.createVNode(
            PromptPopup,
            {
              ref_key: "promotPopupRef",
              ref: promotPopupRef
            },
            null,
            512
            /* NEED_PATCH */
          ),
          vue.createVNode(
            TranslationPopup,
            {
              ref_key: "translationPopupRef",
              ref: translationPopupRef
            },
            null,
            512
            /* NEED_PATCH */
          )
        ]);
      };
    }
  });
  const Prompt = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-191d459c"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/chat/components/Prompt.vue"]]);
  const _sfc_main$f = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      var _a;
      const session = vue.ref({
        id: void 0,
        type: void 0,
        messages: { total: 0, list: [] }
      });
      const messages = vue.ref([]);
      const inputTypeVoice = vue.ref(true);
      const inputText = vue.ref("");
      const menuSwitchDown = vue.ref(true);
      const inputBottom = vue.ref(0);
      const messageListRef = vue.ref([]);
      const accountSetting = vue.ref({
        auto_playing_voice: 0,
        auto_text_shadow: 0,
        auto_pronunciation: 0,
        playing_voice_speed: "1.0",
        speech_role_name_label: "",
        speech_role_name: "",
        target_language: ""
      });
      const $bus = (_a = vue.getCurrentInstance()) == null ? void 0 : _a.appContext.config.globalProperties.$bus;
      const inputFocus = (e) => {
        inputBottom.value = e.detail.height;
      };
      const inputHasText = vue.computed(() => {
        return !!(inputText.value && inputText.value.trim());
      });
      const sendMessageHandler = (info) => {
        if (!info.text) {
          sendSpeech(info.fileName);
        } else {
          sendMessage(info.text, info.fileName);
        }
      };
      onLoad((option) => {
        initData(option.sessionId);
        uni.setNavigationBarTitle({
          title: "TalkieAI"
        });
        formatAppLog("log", "at pages/chat/index.vue:114", "Onload");
        $bus.on("SendMessage", sendMessageHandler);
      });
      vue.onMounted(() => {
      });
      vue.onBeforeUnmount(() => {
        $bus.off("SendMessage", sendMessageHandler);
      });
      onShow(() => {
        accountRequest.getSettings().then((data) => {
          accountSetting.value = data.data;
        });
      });
      const handleInput = (event) => {
        formatAppLog("log", "at pages/chat/index.vue:136", event);
        if (event.keyCode === 13) {
          handleSendText();
        }
      };
      const handleSendText = () => {
        if (!inputHasText.value) {
          return;
        }
        const inputTextValue = inputText.value;
        inputText.value = "";
        sendMessage(inputTextValue);
      };
      const handleSwitchMenu = () => {
        uni.navigateTo({
          url: `/pages/chat/settings?sessionId=${session.value.id}`
        });
      };
      const sendSpeech = (fileName) => {
        const ownertTimestamp = new Date().getTime();
        const ownMessage = {
          id: ownertTimestamp,
          content: null,
          owner: true,
          file_name: fileName,
          role: "USER",
          auto_hint: false,
          auto_play: false
        };
        messages.value.push(ownMessage);
        scrollToBottom();
        chatRequest.transformText({ file_name: fileName, sessionId: session.value.id }).then((data) => {
          messages.value = messages.value.filter(
            (item) => item.id !== ownertTimestamp
          );
          let text = data.data;
          formatAppLog("log", "at pages/chat/index.vue:188", text);
          sendMessage(text, fileName);
        });
      };
      const sendMessage = (message, fileName) => {
        formatAppLog("log", "at pages/chat/index.vue:199", "send file name");
        const ownertTimestamp = new Date().getTime();
        const ownMessage = {
          id: ownertTimestamp,
          session_id: session.value.id,
          content: message,
          owner: true,
          file_name: fileName,
          role: "USER",
          auto_hint: false,
          auto_play: false,
          auto_pronunciation: false
        };
        messages.value.push(ownMessage);
        const timestamp = new Date().getTime() + 1;
        const aiMessage = {
          id: timestamp,
          session_id: session.value.id,
          content: null,
          owner: false,
          file_name: null,
          role: "ASSISTANT",
          auto_hint: false,
          auto_play: false,
          auto_pronunciation: false
        };
        messages.value.push(aiMessage);
        scrollToBottom();
        chatRequest.sessionChatInvoke({
          sessionId: session.value.id,
          message,
          file_name: fileName
        }).then((data) => {
          data = data.data;
          messages.value = messages.value.filter(
            (item) => item.id !== timestamp && item.id !== ownertTimestamp
          );
          ownMessage.id = data.send_message_id;
          ownMessage.auto_pronunciation = true;
          messages.value.push({
            ...ownMessage
          });
          messages.value.push({
            ...aiMessage,
            id: data.id,
            content: data.data,
            auto_hint: accountSetting.value.auto_text_shadow == 1,
            auto_play: accountSetting.value.auto_playing_voice == 1
          });
          vue.nextTick(() => {
            scrollToBottom();
          });
        }).catch((e) => {
          uni.showToast({
            title: "发送失败..",
            icon: "none"
          });
          formatAppLog("error", "at pages/chat/index.vue:265", e);
          messages.value.pop();
          messages.value.pop();
        });
      };
      const handleSwitchInputType = () => {
        inputTypeVoice.value = !inputTypeVoice.value;
      };
      const initData = (sessionId) => {
        chatRequest.sessionDetailsGet({ sessionId }).then((res) => {
          session.value = res.data;
          if (session.value.messages.total === 0) {
            const timestamp = new Date().getTime();
            const aiMessage = {
              id: timestamp,
              session_id: session.value.id,
              content: null,
              owner: false,
              file_name: null,
              role: "ASSISTANT",
              auto_hint: false,
              auto_play: false,
              auto_pronunciation: false
            };
            messages.value.push(aiMessage);
            chatRequest.sessionInitGreeting(sessionId).then((res2) => {
              messages.value.pop();
              session.value.messages.list.push(res2.data);
              messages.value.push({
                id: res2.data.id,
                session_id: res2.data.session_id,
                content: res2.data.content,
                role: res2.data.role,
                owner: res2.data.role === "USER",
                auto_hint: accountSetting.value.auto_text_shadow == 1,
                auto_play: accountSetting.value.auto_playing_voice == 1,
                auto_pronunciation: false,
                pronunciation: null
              });
              vue.nextTick(() => {
                scrollToBottom();
              });
            });
            return;
          }
          session.value.messages.list.forEach((item) => {
            messages.value.push({
              id: item.id,
              session_id: item.session_id,
              content: item.content,
              role: item.role,
              owner: item.role === "USER",
              file_name: item.file_name,
              auto_hint: false,
              auto_play: false,
              auto_pronunciation: false,
              pronunciation: item.pronunciation
            });
          });
          scrollToBottom();
        });
      };
      const handleBackPage = () => {
        if (session.value.type === "TOPIC") {
          uni.showModal({
            title: "是否结束话题",
            content: "是否结束并且评分话题",
            success: (res) => {
              if (res.confirm) {
                completeTopic();
              } else if (res.cancel) {
                uni.navigateBack();
              }
            }
          });
        } else {
          uni.navigateBack();
        }
      };
      const completeTopic = () => {
        topicRequest.completeTopic({ session_id: session.value.id }).then((res) => {
          uni.navigateTo({
            url: `/pages/topic/completion?sessionId=${session.value.id}&redirectType=index`
          });
        });
      };
      const scrollToBottom = () => {
        if (messages.value.length === 0) {
          return;
        }
        vue.nextTick(() => {
          uni.pageScrollTo({
            scrollTop: 1e4,
            duration: 100
          });
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "chat-box" }, [
          vue.createVNode(CommonHeader, {
            "background-color": "#fff",
            leftIcon: true,
            "back-fn": handleBackPage,
            title: "聊天"
          }, {
            content: vue.withCtx(() => [
              vue.createElementVNode(
                "view",
                null,
                vue.toDisplayString(session.value.name),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createCommentVNode(" 聊天内容 "),
          vue.createElementVNode("view", { class: "chat-container" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(messages.value, (message, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: message.id,
                  class: "message-content-item"
                }, [
                  vue.createVNode(MessageContent, {
                    "auto-hint": messages.value.auto_text_shadow,
                    "auto-play": accountSetting.value.auto_playing_voice,
                    "auto-pronunciation": accountSetting.value.auto_pronunciation,
                    message,
                    ref_for: true,
                    ref_key: "messageListRef",
                    ref: messageListRef
                  }, null, 8, ["auto-hint", "auto-play", "auto-pronunciation", "message"])
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.createCommentVNode(" 底部操作栏 "),
          vue.createElementVNode("view", { class: "chat-bottom-container" }, [
            vue.createCommentVNode(" 键盘输入 "),
            !inputTypeVoice.value ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: "input-bottom-container",
                style: vue.normalizeStyle("bottom:" + inputBottom.value + "px;")
              },
              [
                vue.createElementVNode("view", {
                  onClick: handleSwitchInputType,
                  class: "voice-icon-box"
                }, [
                  vue.createElementVNode("image", {
                    class: "voice-icon",
                    src: "/static/icon_voice_fixed.png"
                  })
                ]),
                vue.createElementVNode("view", { class: "input-box" }, [
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "textarea",
                      onFocus: inputFocus,
                      "confirm-type": "send",
                      onConfirm: handleSendText,
                      style: { "padding-left": "30rpx" },
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => inputText.value = $event),
                      onInput: handleInput,
                      placeholder: "在这里输入文字"
                    },
                    null,
                    544
                    /* HYDRATE_EVENTS, NEED_PATCH */
                  ), [
                    [vue.vModelText, inputText.value]
                  ])
                ]),
                vue.createElementVNode(
                  "view",
                  {
                    onClick: handleSendText,
                    class: vue.normalizeClass(["send-icon-box", { active: vue.unref(inputHasText) }])
                  },
                  [
                    vue.createElementVNode("image", {
                      class: "send-icon",
                      src: "/static/icon_send.png"
                    })
                  ],
                  2
                  /* CLASS */
                )
              ],
              4
              /* STYLE */
            )) : vue.createCommentVNode("v-if", true),
            inputTypeVoice.value ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
              vue.createCommentVNode(" 提示 "),
              menuSwitchDown.value ? (vue.openBlock(), vue.createBlock(Prompt, {
                key: 0,
                sessionId: session.value.id
              }, null, 8, ["sessionId"])) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" 语音输入 "),
              vue.createElementVNode("view", { class: "speech-box" }, [
                vue.createVNode(Speech, {
                  "session-id": session.value.id
                }, {
                  leftMenu: vue.withCtx(() => [
                    vue.createElementVNode("image", {
                      onClick: handleSwitchInputType,
                      class: "keybord-icon",
                      src: "/static/icon_keybord.png"
                    })
                  ]),
                  rightMenu: vue.withCtx(() => [
                    vue.createElementVNode("image", {
                      onClick: handleSwitchMenu,
                      class: "input-type-switch-btn",
                      src: "/static/icon_settings.png"
                    })
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["session-id"])
              ])
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ]);
      };
    }
  });
  const PagesChatIndex = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-da04a0a0"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/chat/index.vue"]]);
  const _sfc_main$e = /* @__PURE__ */ vue.defineComponent({
    __name: "Checkbox",
    props: {
      checked: { type: Boolean, required: false }
    },
    emits: ["input"],
    setup(__props, { emit }) {
      const props = __props;
      const title = vue.ref("Hello");
      const isCheck = vue.ref(false);
      setTimeout(() => {
        title.value = "首页";
      }, 3e3);
      const checkIt = (e) => {
        e.stopPropagation();
        isCheck.value = !isCheck.value;
        emit("input", isCheck.value);
      };
      vue.watch(
        () => props.checked,
        (newVal) => {
          formatAppLog("log", "at components/Checkbox.vue:37", "props.checked", props.checked);
          isCheck.value = !!props.checked;
        }
      );
      vue.onMounted(() => {
        formatAppLog("log", "at components/Checkbox.vue:43", "props.checked", props.checked);
        isCheck.value = !!props.checked;
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          class: "checkbox-box",
          onClick: checkIt
        }, [
          vue.createElementVNode(
            "image",
            {
              class: vue.normalizeClass(
                isCheck.value ? "checkbox-box-ico" : "checkbox-box-ico un-checkbox-box-ico"
              ),
              src: "/static/check.png"
            },
            null,
            2
            /* CLASS */
          ),
          vue.createElementVNode(
            "image",
            {
              class: vue.normalizeClass(
                !isCheck.value ? "checkbox-box-ico" : "checkbox-box-ico un-checkbox-box-ico"
              ),
              src: "/static/un_check.png"
            },
            null,
            2
            /* CLASS */
          )
        ]);
      };
    }
  });
  const Checkbox = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-75623c80"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/components/Checkbox.vue"]]);
  const _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
    __name: "settings",
    setup(__props) {
      const settingInfo = vue.ref({});
      const sessionId = vue.ref("");
      onLoad((options) => {
        uni.setNavigationBarTitle({
          title: "Talkie"
        });
        sessionId.value = options.sessionId;
      });
      onShow(() => {
        accountRequest.getSettings().then((data) => {
          if (data.code === "200") {
            settingInfo.value = data.data;
          }
        });
      });
      const goSwitchRole = () => {
        uni.navigateTo({
          url: "/pages/index/switchRole"
        });
      };
      const handleBackPage = () => {
        uni.navigateBack({
          delta: 1
        });
      };
      const selectTab = (id) => {
        settingInfo.value.playing_voice_speed = id;
        accountRequest.setSettings({
          "playing_voice_speed": id
        }).then((data) => {
          formatAppLog("log", "at pages/chat/settings.vue:101", data);
          if (data.code === "200") {
            formatAppLog("log", "at pages/chat/settings.vue:103", "设置成功");
          }
        });
      };
      const inputCheck = (type, check) => {
        accountRequest.setSettings({
          [type]: check ? 1 : 0
        }).then((data) => {
          formatAppLog("log", "at pages/chat/settings.vue:112", data);
          if (data.code === "200") {
            formatAppLog("log", "at pages/chat/settings.vue:114", "设置成功");
          }
        });
      };
      const deleteLatestMessages = () => {
        uni.showModal({
          title: "提示",
          content: "确定清空上一次聊天记录吗？",
          success: function(res) {
            if (res.confirm) {
              formatAppLog("log", "at pages/chat/settings.vue:125", "用户点击确定");
              chatRequest.messagesLatestDelete(sessionId.value).then((data) => {
                formatAppLog("log", "at pages/chat/settings.vue:127", data);
                uni.showToast({
                  title: "清空成功",
                  icon: "none"
                });
                uni.navigateTo({
                  url: `/pages/chat/index?sessionId=${sessionId.value}`
                });
              });
            } else if (res.cancel) {
              formatAppLog("log", "at pages/chat/settings.vue:137", "用户点击取消");
            }
          }
        });
      };
      const deleteAllMessages = () => {
        uni.showModal({
          title: "提示",
          content: "确定清空聊天记录吗？",
          success: function(res) {
            if (res.confirm) {
              formatAppLog("log", "at pages/chat/settings.vue:149", "用户点击确定");
              chatRequest.messagesAllDelete(sessionId.value).then((data) => {
                formatAppLog("log", "at pages/chat/settings.vue:151", data);
                uni.showToast({
                  title: "清空成功",
                  icon: "none"
                });
                uni.navigateTo({
                  url: `/pages/chat/index?sessionId=${sessionId.value}`
                });
              });
            } else if (res.cancel) {
              formatAppLog("log", "at pages/chat/settings.vue:161", "用户点击取消");
            }
          }
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(CommonHeader, {
            leftIcon: true,
            "back-fn": handleBackPage,
            title: "Talkie"
          }, {
            content: vue.withCtx(() => [
              vue.createElementVNode("text", null, "设置")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "mine-content" }, [
            vue.createElementVNode("view", { class: "setting" }, [
              vue.createElementVNode("view", { class: "setting-card" }, [
                vue.createElementVNode("text", { class: "setting-card-title" }, "AI角色"),
                vue.createElementVNode(
                  "text",
                  { onClick: goSwitchRole },
                  vue.toDisplayString(settingInfo.value.speech_role_name_label || "默认角色"),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "setting-card" }, [
                vue.createElementVNode("text", { class: "setting-card-title" }, "自动播放语音"),
                vue.createVNode(Checkbox, {
                  onInput: _cache[0] || (_cache[0] = (check) => inputCheck("auto_playing_voice", check)),
                  checked: settingInfo.value.auto_playing_voice === 1
                }, null, 8, ["checked"])
              ]),
              vue.createElementVNode("view", { class: "setting-card" }, [
                vue.createElementVNode("text", { class: "setting-card-title" }, "自动模糊文本"),
                vue.createVNode(Checkbox, {
                  onInput: _cache[1] || (_cache[1] = (check) => inputCheck("auto_text_shadow", check)),
                  checked: settingInfo.value.auto_text_shadow === 1
                }, null, 8, ["checked"])
              ]),
              vue.createElementVNode("view", { class: "setting-card" }, [
                vue.createElementVNode("text", { class: "setting-card-title" }, "自动语音评分"),
                vue.createVNode(Checkbox, {
                  onInput: _cache[2] || (_cache[2] = (check) => inputCheck("auto_pronunciation", check)),
                  checked: settingInfo.value.auto_pronunciation === 1
                }, null, 8, ["checked"])
              ])
            ]),
            vue.createElementVNode("view", { class: "setting-bot" }, [
              vue.createElementVNode("text", { class: "setting-card-title" }, "语速"),
              vue.createElementVNode("view", { class: "tab-box" }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(`tab-item ${settingInfo.value.playing_voice_speed == "0.5" ? "tab-item-select" : ""}`),
                    onClick: _cache[3] || (_cache[3] = ($event) => selectTab("0.5"))
                  },
                  [
                    vue.createElementVNode("text", null, "慢速")
                  ],
                  2
                  /* CLASS */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(`tab-item ${settingInfo.value.playing_voice_speed == "1.0" ? "tab-item-select" : ""}`),
                    onClick: _cache[4] || (_cache[4] = ($event) => selectTab("1.0"))
                  },
                  [
                    vue.createElementVNode("text", null, "正常")
                  ],
                  2
                  /* CLASS */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(`tab-item ${settingInfo.value.playing_voice_speed == "1.5" ? "tab-item-select" : ""}`),
                    onClick: _cache[5] || (_cache[5] = ($event) => selectTab("1.5"))
                  },
                  [
                    vue.createElementVNode("text", null, "较快")
                  ],
                  2
                  /* CLASS */
                )
              ]),
              vue.createElementVNode("button", {
                onClick: deleteLatestMessages,
                class: "common-button setting-clear-latest"
              }, " 清空上一次聊天记录 "),
              vue.createElementVNode("button", {
                onClick: deleteAllMessages,
                class: "common-button setting-clear"
              }, " 清空所有聊天记录 ")
            ])
          ])
        ]);
      };
    }
  });
  const PagesChatSettings = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-1fcfa29c"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/chat/settings.vue"]]);
  const _sfc_main$c = /* @__PURE__ */ vue.defineComponent({
    __name: "Single",
    props: {
      collect: { type: null, required: true }
    },
    setup(__props, { emit }) {
      const props = __props;
      const handleDelete = () => {
        uni.showModal({
          title: "提示",
          content: "是否删除该收藏",
          confirmColor: "#6236ff",
          success: (res) => {
            if (res.confirm) {
              accountRequest.cancelCollect({
                type: props.collect.type,
                message_id: props.collect.message_id,
                content: props.collect.content
              }).then(() => {
                uni.showToast({
                  title: "删除成功",
                  icon: "none"
                });
                emit("deleteCollect", props.collect);
              });
            } else if (res.cancel)
              ;
          }
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "statement-container" }, [
          vue.createElementVNode("view", { class: "chat-list-box" }, [
            vue.createElementVNode("view", { class: "chat-list-left-box" }, [
              vue.createElementVNode("view", { class: "chat-list-left-top" }, [
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString(__props.collect.content),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "chat-list-left-bot" }, [
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString(__props.collect.translation),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("view", { class: "chat-list-action-box" }, [
              vue.createVNode(AudioPlayer, {
                class: "chat-list-action_playing btn-box",
                messageId: __props.collect.message_id,
                content: __props.collect.content
              }, null, 8, ["messageId", "content"]),
              vue.createElementVNode("image", {
                onClick: handleDelete,
                class: "chat-list-action btn-box",
                src: "/static/deleted.png",
                mode: "heightFix"
              })
            ])
          ])
        ]);
      };
    }
  });
  const Single = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-6726878d"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/practice/components/Single.vue"]]);
  const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
    __name: "Statement",
    props: {
      collect: { type: null, required: true },
      cannotCancel: { type: Boolean, required: false }
    },
    setup(__props, { emit }) {
      const props = __props;
      const handleDelete = () => {
        uni.showModal({
          title: "提示",
          content: "是否删除该收藏",
          confirmColor: "#6236ff",
          success: (res) => {
            if (res.confirm) {
              accountRequest.cancelCollect({
                type: props.collect.type,
                message_id: props.collect.message_id,
                content: props.collect.content
              }).then(() => {
                uni.showToast({
                  title: "删除成功",
                  icon: "none"
                });
                emit("deleteCollect", props.collect);
              });
            } else if (res.cancel)
              ;
          }
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "statement-container" }, [
          vue.createElementVNode("view", { class: "chat-list-box" }, [
            vue.createElementVNode("view", { class: "chat-list-left-box" }, [
              vue.createElementVNode("view", { class: "chat-list-left-top" }, [
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString(__props.collect.content),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("view", { class: "chat-list-action-box" }, [
              vue.createVNode(AudioPlayer, {
                class: "chat-list-action_playing btn-box",
                messageId: __props.collect.message_id,
                content: __props.collect.content
              }, null, 8, ["messageId", "content"]),
              !__props.cannotCancel ? (vue.openBlock(), vue.createElementBlock("image", {
                key: 0,
                onClick: handleDelete,
                class: "chat-list-action btn-box",
                src: "/static/deleted.png",
                mode: "heightFix"
              })) : vue.createCommentVNode("v-if", true)
            ])
          ]),
          vue.createElementVNode("view", { class: "chat-list-left-bot" }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString(__props.collect.translation),
              1
              /* TEXT */
            )
          ])
        ]);
      };
    }
  });
  const Statement = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-2a36577e"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/practice/components/Statement.vue"]]);
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const wordList = vue.ref([]);
      const sentenceList = vue.ref([]);
      const tabNum = vue.ref("1");
      const wordPageSize = vue.ref(1);
      const senPageSize = vue.ref(1);
      const wordLoading = vue.ref(false);
      const sentenceLoading = vue.ref(false);
      vue.onMounted(() => {
        uni.setNavigationBarTitle({
          title: "TalkieAI"
        });
      });
      onShow(() => {
        vue.nextTick(() => {
          initData();
        });
      });
      const handleDeleteCollect = (id) => {
        initData();
      };
      const initData = () => {
        wordPageSize.value = 1;
        senPageSize.value = 1;
        wordList.value = [];
        sentenceList.value = [];
        getWord();
        getSen();
      };
      const getWord = () => {
        if (wordLoading.value)
          return;
        wordLoading.value = true;
        let params = {
          page: wordPageSize.value,
          page_size: 10,
          type: "WORD"
        };
        accountRequest.collectsGet(params).then((data) => {
          wordList.value = wordList.value.concat(data.data.list);
        });
        wordLoading.value = false;
      };
      const getSen = () => {
        if (sentenceLoading.value)
          return;
        sentenceLoading.value = true;
        let params = {
          page: senPageSize.value,
          type: "SENTENCE"
        };
        accountRequest.collectsGet(params).then((data) => {
          sentenceList.value = sentenceList.value.concat(data.data.list);
        });
        sentenceLoading.value = false;
      };
      const tabChange = (type) => {
        tabNum.value = type;
      };
      const onScroll = (event) => {
        if (tabNum.value === "1") {
          wordPageSize.value = wordPageSize.value + 1;
          getWord();
        } else {
          senPageSize.value = senPageSize.value + 1;
          getSen();
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(CommonHeader, { title: "Talkie" }, {
            content: vue.withCtx(() => [
              vue.createElementVNode("text", null, "练习")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "content" }, [
            vue.createElementVNode("view", { class: "chat-tab-box" }, [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(`chat-tab ${tabNum.value === "1" ? "chat-tab-actice" : ""}`),
                  onClick: _cache[0] || (_cache[0] = ($event) => tabChange("1"))
                },
                "单词",
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(`chat-tab ${tabNum.value === "2" ? "chat-tab-actice" : ""}`),
                  onClick: _cache[1] || (_cache[1] = ($event) => tabChange("2"))
                },
                "句子",
                2
                /* CLASS */
              )
            ]),
            vue.createElementVNode("view", { class: "chat-tab-content" }, [
              vue.createElementVNode(
                "scroll-view",
                {
                  "scroll-y": "true",
                  id: "chat-tab-content-one",
                  class: vue.normalizeClass(`chat-tab-content-one ${tabNum.value === "2" ? "chat-tab-content-one_hidden" : ""}`),
                  onScrolltolower: onScroll
                },
                [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(wordList.value, (word) => {
                      return vue.openBlock(), vue.createBlock(Single, {
                        onDeleteCollect: handleDeleteCollect,
                        collect: word
                      }, null, 8, ["collect"]);
                    }),
                    256
                    /* UNKEYED_FRAGMENT */
                  )),
                  wordLoading.value ? (vue.openBlock(), vue.createBlock(LoadingRound, { key: 0 })) : vue.createCommentVNode("v-if", true)
                ],
                34
                /* CLASS, HYDRATE_EVENTS */
              ),
              vue.createElementVNode(
                "scroll-view",
                {
                  "scroll-y": "true",
                  id: "chat-tab-content-two",
                  class: vue.normalizeClass(`chat-tab-content-two ${tabNum.value === "1" ? "chat-tab-content-two_hidden" : ""}`),
                  onScrolltolower: onScroll
                },
                [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(sentenceList.value, (sentence) => {
                      return vue.openBlock(), vue.createBlock(Statement, {
                        collect: sentence,
                        cannotCancel: false
                      }, null, 8, ["collect"]);
                    }),
                    256
                    /* UNKEYED_FRAGMENT */
                  )),
                  sentenceLoading.value ? (vue.openBlock(), vue.createBlock(LoadingRound, { key: 0 })) : vue.createCommentVNode("v-if", true)
                ],
                34
                /* CLASS, HYDRATE_EVENTS */
              )
            ])
          ])
        ]);
      };
    }
  });
  const PagesPracticeIndex = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/practice/index.vue"]]);
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const accountInfo = vue.ref({ account_id: "", today_chat_count: 0, total_chat_count: 0, target_language_label: "" });
      vue.onMounted(() => {
        uni.setNavigationBarTitle({
          title: "TalkieAI"
        });
      });
      onShow(() => {
        accountRequest.accountInfoGet().then((data) => {
          accountInfo.value = data.data;
        });
      });
      const goContact = () => {
        uni.navigateTo({
          url: "/pages/contact/index"
        });
      };
      const goGithub = () => {
        uni.showToast({
          title: "可通过github访问 chatgpt-talkieai",
          icon: "none"
        });
      };
      const hangleLogout = () => {
        uni.showModal({
          title: "提示",
          content: "确定退出登录吗？",
          confirmColor: "#6236ff",
          success: function(res) {
            if (res.confirm) {
              uni.removeStorageSync("x-token");
              uni.reLaunch({
                url: "/pages/login/index"
              });
            } else if (res.cancel) {
              formatAppLog("log", "at pages/my/index.vue:120", "用户点击取消");
            }
          }
        });
      };
      const hangleLogin = () => {
        uni.removeStorageSync("x-token");
        uni.reLaunch({
          url: "/pages/login/index"
        });
      };
      const goFeedback = () => {
        uni.navigateTo({
          url: "/pages/feedback/index"
        });
      };
      const goLearningLanguage = () => {
        uni.navigateTo({
          url: "/pages/my/learnLanguage"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "my-container" }, [
          vue.createVNode(CommonHeader, {
            class: "header",
            title: "Talkie"
          }, {
            content: vue.withCtx(() => [
              vue.createElementVNode("text", null, "个人中心")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "mine-content" }, [
            vue.createCommentVNode(" profile "),
            vue.createElementVNode("view", { class: "profile-box" }, [
              accountInfo.value.account_id.indexOf("visitor") === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "profile",
                onClick: hangleLogin
              }, [
                vue.createElementVNode("image", {
                  class: "profile-avatar",
                  src: "/static/default-account-avatar.png"
                }),
                vue.createElementVNode("text", { class: "profile-name" }, "请登录")
              ])) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "profile"
              }, [
                vue.createElementVNode("image", {
                  class: "profile-avatar",
                  src: "/static/default-account-avatar.png"
                }),
                vue.createElementVNode(
                  "text",
                  { class: "profile-name" },
                  vue.toDisplayString(accountInfo.value.account_id),
                  1
                  /* TEXT */
                )
              ]))
            ]),
            vue.createElementVNode("view", { class: "mine-message-box" }, [
              vue.createElementVNode("view", { class: "mine-list-box" }, [
                vue.createElementVNode("view", { class: "mine-list-item" }, [
                  vue.createElementVNode("text", { class: "mine-list-item-title" }, "今日次数"),
                  vue.createElementVNode("view", null, [
                    vue.createElementVNode(
                      "text",
                      { class: "mine-list-item-num" },
                      vue.toDisplayString(accountInfo.value.today_chat_count),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                vue.createElementVNode("view", { class: "mine-list-item" }, [
                  vue.createElementVNode("text", { class: "mine-list-item-title mine-list-item-title-total" }, "总次数"),
                  vue.createElementVNode("view", null, [
                    vue.createElementVNode(
                      "text",
                      { class: "mine-list-item-num" },
                      vue.toDisplayString(accountInfo.value.total_chat_count),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ])
            ]),
            vue.createElementVNode("view", { class: "setting" }, [
              vue.createCommentVNode(' <view class="setting-card" @tap="goSetting">\r\n					<image class="setting-card-logo" src="/static/setting.png" />\r\n					<text class="setting-card-title">设置</text>\r\n				</view> '),
              vue.createElementVNode("view", {
                class: "setting-card",
                onClick: goLearningLanguage
              }, [
                vue.createElementVNode("image", {
                  class: "setting-card-logo",
                  src: "/static/setting.png"
                }),
                vue.createElementVNode("text", { class: "setting-card-title" }, "学习语言"),
                vue.createElementVNode(
                  "text",
                  {
                    class: "setting-card-value",
                    style: { "margin-right": "50rpx" }
                  },
                  vue.toDisplayString(accountInfo.value.target_language_label),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", {
                class: "setting-card",
                onClick: goFeedback
              }, [
                vue.createElementVNode("image", {
                  class: "setting-card-logo",
                  src: "/static/feedback.png"
                }),
                vue.createElementVNode("text", { class: "setting-card-title" }, "反馈")
              ]),
              vue.createElementVNode("view", {
                class: "setting-card",
                onClick: goContact
              }, [
                vue.createElementVNode("image", {
                  class: "setting-card-logo",
                  src: "/static/concat.png"
                }),
                vue.createElementVNode("text", { class: "setting-card-title" }, "联系我们")
              ]),
              vue.createElementVNode("view", {
                class: "setting-card",
                onClick: goGithub
              }, [
                vue.createElementVNode("image", {
                  class: "setting-card-logo",
                  src: "/static/github/github-mark.png"
                }),
                vue.createElementVNode("text", { class: "setting-card-title" }, "Github")
              ]),
              vue.createCommentVNode(" 如果是小程序登录 "),
              accountInfo.value.account_id.indexOf("visitor") < 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "logout-box",
                onClick: hangleLogout
              }, [
                vue.createCommentVNode(' <image class="setting-card-logo" src="/static/default-account-avatar.png" /> '),
                vue.createElementVNode("text", { class: "setting-card-title logout-text" }, "退出登录")
              ])) : vue.createCommentVNode("v-if", true)
            ])
          ])
        ]);
      };
    }
  });
  const PagesMyIndex = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-276ac604"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/my/index.vue"]]);
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    __name: "learnLanguage",
    setup(__props) {
      const languages = vue.ref([]);
      vue.onMounted(() => {
        sysRequest.getLanguages().then((data) => {
          languages.value = data.data;
        });
      });
      const selectLanguage = (language) => {
        accountRequest.setSettings({ target_language: language.value }).then((data) => {
          uni.navigateBack();
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createVNode(CommonHeader, {
            leftIcon: _ctx.redirectType !== "init",
            "background-color": "#F5F5FE"
          }, {
            content: vue.withCtx(() => [
              vue.createElementVNode("text")
            ]),
            _: 1
            /* STABLE */
          }, 8, ["leftIcon"]),
          vue.createElementVNode("view", { class: "learning-language-box" }, [
            vue.createElementVNode("view", { class: "title" }, " 我想学... "),
            vue.createElementVNode("view", { class: "content" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(languages.value, (language) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "language-item",
                    onClick: ($event) => selectLanguage(language)
                  }, vue.toDisplayString(language.label), 9, ["onClick"]);
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ])
          ])
        ]);
      };
    }
  });
  const PagesMyLearnLanguage = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-232ea9a0"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/my/learnLanguage.vue"]]);
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      vue.onMounted(() => {
        uni.setNavigationBarTitle({
          title: "TalkieAI"
        });
      });
      const handleBackPage = () => {
        uni.switchTab({
          url: "/pages/my/index"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(CommonHeader, {
            leftIcon: true,
            "back-fn": handleBackPage,
            class: "header",
            title: "Talkie"
          }, {
            content: vue.withCtx(() => [
              vue.createElementVNode("text", null, "联系我们")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "contact" }, [
            vue.createElementVNode("view", { class: "contact-text" }, [
              vue.createElementVNode("text", null, "欢迎随时联系我们反馈产品体验")
            ]),
            vue.createElementVNode("image", {
              class: "contact-image",
              src: "/static/contact_us.jpeg"
            })
          ])
        ]);
      };
    }
  });
  const PagesContactIndex = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-234ce7e8"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/contact/index.vue"]]);
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const pushStatus = vue.ref(false);
      const content = vue.ref("");
      const contact = vue.ref("user");
      vue.onMounted(() => {
        uni.setNavigationBarTitle({
          title: "TalkieAI"
        });
      });
      const handleAddFeedback = () => {
        if (!content.value) {
          uni.showToast({
            title: "内容不能为空",
            icon: "none",
            duration: 2e3
          });
          return;
        }
        sysRequest.feedbackAdd({
          content: content.value,
          contact: contact.value
        }).then(() => {
          pushStatus.value = true;
        });
      };
      const handleBackPage = () => {
        uni.switchTab({
          url: "/pages/my/index"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(CommonHeader, {
            leftIcon: true,
            "back-fn": handleBackPage,
            class: "header",
            title: "Talkie"
          }, {
            content: vue.withCtx(() => [
              vue.createElementVNode("text", null, "反馈")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "feedback" }, [
            !pushStatus.value ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "feedback-box"
            }, [
              vue.createElementVNode("view", { class: "feedback-textarea-box" }, [
                vue.withDirectives(vue.createElementVNode(
                  "textarea",
                  {
                    class: "feedback-textarea",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => content.value = $event),
                    placeholder: "反馈意见可以是使用过程中遇到的问题，也可以是产品改进意见"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, content.value]
                ]),
                vue.createCommentVNode(' <textarea class="feedback-textarea" v-model="content" /> '),
                vue.createCommentVNode(' <view class="placeholder-style" v-if="content.length==0">反馈意见可以是使用过程中遇到的问题，也可以是产品改进意见</view> ')
              ]),
              vue.createCommentVNode(' <view class="feedback-input-box">\r\n					<input class="feedback-input" v-model="contact" placeholder="留下你的手机号或微信，方便我们沟通联系" />\r\n				</view> '),
              vue.createElementVNode("view", { class: "feedback-btn-box" }, [
                vue.createElementVNode("button", {
                  onClick: handleAddFeedback,
                  class: "common-button feedback-btn"
                }, "提交反馈")
              ])
            ])) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "feedback-box"
            }, [
              vue.createElementVNode("image", {
                class: "feedback-ico",
                src: "/static/feedback_success.png"
              }),
              vue.createElementVNode("view", { class: "feedback-success" }, [
                vue.createElementVNode("text", null, "提交成功")
              ]),
              vue.createElementVNode("view", { class: "feedback-btn-box" }, [
                vue.createElementVNode("button", {
                  onClick: handleBackPage,
                  class: "common-button feedback-btn return-btn"
                }, "返回")
              ])
            ]))
          ])
        ]);
      };
    }
  });
  const PagesFeedbackIndex = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-3aa1718d"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/feedback/index.vue"]]);
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const loading = vue.ref(false);
      const topicDetail = vue.ref(null);
      onLoad((props) => {
        uni.setNavigationBarTitle({
          title: "Talkie"
        });
        getTopicDetail(props.topicId);
      });
      const getTopicDetail = (topicId) => {
        loading.value = true;
        topicRequest.getTopicDetail(topicId).then((res) => {
          loading.value = false;
          topicDetail.value = res.data;
        });
      };
      const goTopicHistory = () => {
        uni.navigateTo({
          url: `/pages/topic/history?topicId=${topicDetail.value.id}`
        });
      };
      const goTopicPurchase = () => {
        uni.navigateTo({
          url: `/pages/topic/phrase?topicId=${topicDetail.value.id}`
        });
      };
      const goChat = () => {
        topicRequest.createSession({ topic_id: topicDetail.value.id }).then((res) => {
          formatAppLog("log", "at pages/topic/index.vue:113", res.data.id);
          uni.navigateTo({
            url: `/pages/chat/index?sessionId=${res.data.id}`
          });
        });
      };
      const handleBackPage = () => {
        uni.switchTab({
          url: "/pages/index/index"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createVNode(CommonHeader, {
            leftIcon: true,
            "back-fn": handleBackPage,
            backgroundColor: "#F5F5FE"
          }, {
            content: vue.withCtx(() => [
              vue.createElementVNode("text")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "content" }, [
            loading.value ? (vue.openBlock(), vue.createBlock(LoadingRound, { key: 0 })) : vue.createCommentVNode("v-if", true),
            topicDetail.value ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "topic-content"
            }, [
              vue.createElementVNode("view", { class: "profile-box" }, [
                vue.createElementVNode("image", {
                  class: "profile-image",
                  src: topicDetail.value.image_url,
                  mode: "aspectFill"
                }, null, 8, ["src"]),
                vue.createElementVNode("view", { class: "name-box" }, [
                  vue.createTextVNode(
                    vue.toDisplayString(topicDetail.value.name) + " ",
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("image", {
                    onClick: goTopicHistory,
                    class: "icon",
                    src: "/static/img/icons/history-records.png"
                  })
                ])
              ]),
              vue.createElementVNode("view", { class: "description-box" }, [
                vue.createElementVNode("view", { class: "description-title" }, " 场景 "),
                vue.createElementVNode(
                  "view",
                  { class: "description-content" },
                  vue.toDisplayString(topicDetail.value.description),
                  1
                  /* TEXT */
                )
              ]),
              vue.createCommentVNode(" 目标 "),
              vue.createElementVNode("view", { class: "main-target-box" }, [
                vue.createElementVNode("view", { class: "main-target-title" }, " 目标 "),
                vue.createElementVNode("view", { class: "main-target-content" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(topicDetail.value.main_targets, (main_target) => {
                      return vue.openBlock(), vue.createElementBlock(
                        "view",
                        {
                          key: main_target.id,
                          class: "main-target-item"
                        },
                        vue.toDisplayString(main_target.description),
                        1
                        /* TEXT */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ]),
              vue.createCommentVNode(" 也试试 "),
              topicDetail.value.trial_targets && topicDetail.value.trial_targets.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "main-target-box"
              }, [
                vue.createElementVNode("view", { class: "main-target-title" }, " 也试试 "),
                vue.createElementVNode("view", { class: "main-target-content" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(topicDetail.value.trial_targets, (main_target) => {
                      return vue.openBlock(), vue.createElementBlock(
                        "view",
                        {
                          key: main_target.id,
                          class: "main-target-item"
                        },
                        vue.toDisplayString(main_target.description),
                        1
                        /* TEXT */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ])) : vue.createCommentVNode("v-if", true)
            ])) : vue.createCommentVNode("v-if", true)
          ]),
          vue.createCommentVNode(" 底部操作栏 "),
          vue.createElementVNode("view", { class: "bottom-box" }, [
            vue.createElementVNode("view", {
              class: "atk-btn-box gray",
              onClick: goTopicPurchase
            }, [
              vue.createElementVNode("text", { class: "atk-btn" }, "查看短语手册")
            ]),
            vue.createElementVNode("view", {
              class: "atk-btn-box start-btn-box",
              onClick: goChat
            }, [
              vue.createElementVNode("text", { class: "atk-btn" }, "开始")
            ])
          ])
        ]);
      };
    }
  });
  const PagesTopicIndex = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-253cffcd"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/topic/index.vue"]]);
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    __name: "history",
    setup(__props) {
      const topicId = vue.ref("");
      const loading = vue.ref(false);
      const historyArray = vue.ref([]);
      onLoad((props) => {
        uni.setNavigationBarTitle({
          title: "Talkie"
        });
        topicId.value = props.topicId;
        initData(props.topicId);
      });
      const initData = (topicId2) => {
        loading.value = true;
        topicRequest.getTopicHistory(topicId2).then((data) => {
          loading.value = false;
          historyArray.value = data.data;
        });
      };
      const handleBackPage = () => {
        uni.navigateTo({
          url: `/pages/topic/index?topicId=${topicId.value}`
        });
      };
      const goDetail = (history) => {
        if (history.completed == 1) {
          uni.navigateTo({
            url: `/pages/topic/completion?topicId=${topicId.value}&sessionId=${history.session_id}`
          });
        } else {
          uni.navigateTo({
            url: `/pages/chat/index?sessionId=${history.session_id}&backPage=topic&topicId=${topicId.value}`
          });
        }
      };
      const handleDelete = (history) => {
        uni.showModal({
          title: "提示",
          content: "是否删除该历史记录",
          confirmColor: "#6236ff",
          success: (res) => {
            if (res.confirm) {
              const params = {
                topic_id: history.topic_id,
                session_id: history.session_id
              };
              topicRequest.deleteTopicHistory(params).then(() => {
                uni.showToast({
                  title: "删除成功",
                  icon: "none"
                });
                initData(topicId.value);
              });
            } else if (res.cancel)
              ;
          }
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createVNode(CommonHeader, {
            leftIcon: true,
            "back-fn": handleBackPage,
            backgroundColor: "#F5F5FE"
          }, {
            content: vue.withCtx(() => [
              vue.createElementVNode("text", null, "课程历史记录")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "content" }, [
            vue.createElementVNode("view", { class: "history-list" }, [
              historyArray.value.length > 0 ? (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                vue.renderList(historyArray.value, (history) => {
                  return vue.openBlock(), vue.createElementBlock("view", { class: "history-item" }, [
                    vue.createElementVNode("view", { class: "history-content" }, [
                      vue.createElementVNode("view", {
                        class: "image-box",
                        onClick: ($event) => goDetail(history)
                      }, [
                        vue.createElementVNode("image", {
                          class: "topic-image",
                          src: history.topic.image_url,
                          mode: "aspectFill"
                        }, null, 8, ["src"])
                      ], 8, ["onClick"]),
                      vue.createElementVNode("view", {
                        class: "intro-box",
                        onClick: ($event) => goDetail(history)
                      }, [
                        vue.createElementVNode(
                          "view",
                          { class: "topic-name" },
                          vue.toDisplayString(history.topic.topic),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "view",
                          { class: "topic-time" },
                          vue.toDisplayString(history.create_time),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("view", { class: "completed-box" }, [
                          vue.createElementVNode(
                            "view",
                            {
                              class: vue.normalizeClass(["completed-text-box", { "active": history.completed === "1" }])
                            },
                            [
                              history.completed === "1" ? (vue.openBlock(), vue.createElementBlock("view", {
                                key: 0,
                                class: "completed-text"
                              }, " 已完成 ")) : (vue.openBlock(), vue.createElementBlock("view", {
                                key: 1,
                                class: "completed-text"
                              }, " 未完成 "))
                            ],
                            2
                            /* CLASS */
                          ),
                          vue.createElementVNode("view", { class: "completed-text-space" })
                        ])
                      ], 8, ["onClick"]),
                      vue.createElementVNode("view", {
                        onClick: ($event) => handleDelete(history),
                        class: "delete-btn-box"
                      }, [
                        vue.createElementVNode("image", {
                          class: "delete-btn",
                          src: "/static/deleted.png",
                          mode: "heightFix"
                        })
                      ], 8, ["onClick"])
                    ]),
                    vue.createElementVNode("view", { class: "line" })
                  ]);
                }),
                256
                /* UNKEYED_FRAGMENT */
              )) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, " 暂时没有任何历史记录 "))
            ])
          ])
        ]);
      };
    }
  });
  const PagesTopicHistory = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-d220bb64"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/topic/history.vue"]]);
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "phrase",
    setup(__props) {
      const topicId = vue.ref("");
      const topicPhraseLoading = vue.ref(false);
      const myPhraseLoading = vue.ref(false);
      const topicPhrase = vue.ref([]);
      vue.ref([]);
      const mySentenceList = vue.ref([]);
      const topicSentenceList = vue.ref([]);
      onLoad((props) => {
        uni.setNavigationBarTitle({
          title: "Talkie"
        });
        topicId.value = props.topicId;
        initData(props.topicId);
      });
      const initData = (topicId2) => {
        getTopicPhrases({ topic_id: topicId2 });
        getSen();
      };
      const getTopicPhrases = (params) => {
        if (topicPhraseLoading.value)
          return;
        topicPhraseLoading.value = true;
        topicRequest.getPhrase(params).then((data) => {
          topicPhraseLoading.value = false;
          topicPhrase.value = data.data;
          topicPhrase.value.forEach((item) => {
            topicSentenceList.value.push({
              content: item.phrase,
              translation: item.phrase_translation,
              message_id: null,
              type: "SENTENCE"
            });
          });
        });
      };
      const getSen = () => {
        if (myPhraseLoading.value)
          return;
        myPhraseLoading.value = true;
        let params = {
          page: 1,
          type: "SENTENCE"
        };
        accountRequest.collectsGet(params).then((data) => {
          mySentenceList.value = mySentenceList.value.concat(data.data.list);
        });
        myPhraseLoading.value = false;
      };
      const handleDeleteCollect = () => {
        getSen();
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createVNode(CommonHeader, {
            leftIcon: true,
            "back-fn": _ctx.handleBackPage,
            backgroundColor: "#F5F5FE"
          }, {
            content: vue.withCtx(() => [
              vue.createElementVNode("text", null, "短语手册")
            ]),
            _: 1
            /* STABLE */
          }, 8, ["back-fn"]),
          vue.createElementVNode("view", { class: "content" }, [
            vue.createElementVNode("view", { class: "my-phrase-box phrase-box" }, [
              vue.createElementVNode("view", { class: "phrase-title" }, " 我保存的短语 "),
              vue.createElementVNode("view", { class: "phrase-box" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(mySentenceList.value, (sentence) => {
                    return vue.openBlock(), vue.createBlock(Statement, {
                      onDeleteCollect: handleDeleteCollect,
                      collect: sentence
                    }, null, 8, ["collect"]);
                  }),
                  256
                  /* UNKEYED_FRAGMENT */
                ))
              ])
            ]),
            vue.createElementVNode("view", { class: "topic-phrase-box phrase-box" }, [
              vue.createElementVNode("view", { class: "phrase-title" }, " 场景短语 "),
              vue.createElementVNode("view", { class: "phrase-box" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(topicSentenceList.value, (sentence) => {
                    return vue.openBlock(), vue.createBlock(Statement, {
                      collect: sentence,
                      cannotCancel: true
                    }, null, 8, ["collect"]);
                  }),
                  256
                  /* UNKEYED_FRAGMENT */
                ))
              ])
            ])
          ])
        ]);
      };
    }
  });
  const PagesTopicPhrase = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-bb47d206"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/topic/phrase.vue"]]);
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "completion",
    setup(__props) {
      const loading = vue.ref(false);
      const messageLoading = vue.ref(false);
      const topicHistory = vue.ref(null);
      const redirectType = vue.ref(null);
      const messageSession = vue.ref({
        id: void 0,
        speech_role_name: "",
        avatar: "",
        messages: { total: 0, list: [] },
        topic_id: ""
      });
      const messages = vue.ref([]);
      onLoad((props) => {
        uni.setNavigationBarTitle({
          title: "Talkie"
        });
        if (props.redirectType) {
          redirectType.value = props.redirectType;
        }
        initData(props.topicId, props.sessionId);
      });
      const initData = (topicId, sessionId) => {
        loading.value = true;
        topicRequest.getTopicCompletation({ topic_id: topicId, session_id: sessionId }).then((res) => {
          loading.value = false;
          topicHistory.value = res.data;
        });
        messageLoading.value = true;
        chatRequest.sessionDetailsGet({ sessionId }).then((res) => {
          messageLoading.value = false;
          messageSession.value = res.data;
          messageSession.value.messages.list.forEach((item) => {
            messages.value.push({
              id: item.id,
              session_id: item.session_id,
              content: item.content,
              role: item.role,
              owner: item.role === "USER",
              file_name: item.file_name,
              auto_hint: false,
              auto_play: false,
              auto_pronunciation: false,
              pronunciation: item.pronunciation
            });
          });
        });
      };
      const handleBackFn = () => {
        if (redirectType.value === "index") {
          uni.switchTab({
            url: "/pages/index/index"
          });
        } else {
          uni.navigateBack();
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createVNode(CommonHeader, {
            leftIcon: true,
            backFn: handleBackFn,
            backgroundColor: "#F5F5FE"
          }, {
            content: vue.withCtx(() => [
              vue.createElementVNode("text", null, "完成情况")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "content" }, [
            topicHistory.value ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              [
                vue.createElementVNode("view", { class: "completion-title-box" }, [
                  vue.createElementVNode("image", {
                    class: "completion-icon",
                    src: "/static/topic-result-pass.png",
                    mode: "heightFix"
                  }),
                  vue.createElementVNode("view", { class: "completion-title" }, "已完成")
                ]),
                vue.createElementVNode("view", { class: "completion-container" }, [
                  vue.createElementVNode("view", { class: "complete-item" }, [
                    vue.createElementVNode(
                      "view",
                      { class: "item-data" },
                      vue.toDisplayString(topicHistory.value.main_target_completed_count + topicHistory.value.trial_target_completed_count) + "/" + vue.toDisplayString(topicHistory.value.main_target_count + topicHistory.value.trial_target_count),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "item-title" }, "已达成目标")
                  ]),
                  vue.createElementVNode("view", { class: "complete-item" }, [
                    vue.createElementVNode(
                      "view",
                      { class: "item-data" },
                      vue.toDisplayString(topicHistory.value.content_score) + "%",
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "item-title" }, "分数")
                  ]),
                  vue.createElementVNode("view", { class: "complete-item" }, [
                    vue.createElementVNode(
                      "view",
                      { class: "item-data" },
                      vue.toDisplayString(topicHistory.value.word_count),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "item-title" }, "已用单词数")
                  ])
                ])
              ],
              64
              /* STABLE_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true),
            topicHistory.value ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 1,
                class: "completion-suggestion-box"
              },
              vue.toDisplayString(topicHistory.value.suggestion),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" 聊天内容 "),
            messageSession.value ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 2,
              class: "chat-container"
            }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(messages.value, (message, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: message.id,
                    class: "message-content-item"
                  }, [
                    vue.createVNode(MessageContent, {
                      "auto-hint": false,
                      "auto-play": false,
                      "auto-pronunciation": false,
                      message,
                      "message-session": messageSession.value,
                      ref_for: true,
                      ref: "messageListRef"
                    }, null, 8, ["message", "message-session"])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(' <view class="chat-bottom-container">\r\n                <view @click="handleDownlodImage">\r\n                    下载聊天记录\r\n                </view>\r\n                <view @click="handleInitVoice">\r\n                    语音合成下载\r\n                </view>\r\n            </view> ')
          ])
        ]);
      };
    }
  });
  const PagesTopicCompletion = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-fec29e2e"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/topic/completion.vue"]]);
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "topicCreate",
    setup(__props) {
      const randomInput = vue.ref({
        my_role: "",
        ai_role: "",
        topic: ""
      });
      vue.ref([]);
      onLoad(() => {
        uni.setNavigationBarTitle({
          title: "Talkie"
        });
        initMyTopics();
      });
      const initMyTopics = () => {
        topicRequest.getMyTopics().then((res) => {
          formatAppLog("log", "at pages/topic/topicCreate.vue:96", res.data);
        });
      };
      const handleRandomTopic = () => {
        topicRequest.getTopicExample().then((res) => {
          randomInput.value = res.data;
        });
      };
      const createTopic = () => {
        const { my_role, ai_role, topic } = randomInput.value;
        if (!my_role || !ai_role || !topic) {
          uni.showToast({
            title: "请填写完整",
            icon: "none"
          });
          return;
        }
        topicRequest.createTopic({ my_role, ai_role, topic }).then((res) => {
          res.data;
          uni.navigateTo({
            url: `/pages/chat/index?accountTopicId=account_topic_id`
          });
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createVNode(CommonHeader, {
            leftIcon: true,
            backgroundColor: "#F5F5FE"
          }, {
            content: vue.withCtx(() => [
              vue.createElementVNode("text")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "content" }, [
            vue.createElementVNode("view", { class: "create-topic-container" }, [
              vue.createElementVNode("view", { class: "title" }, " 您想谈些什么？ "),
              vue.createElementVNode("view", { class: "random-btn-box" }, [
                vue.createElementVNode("view", {
                  onClick: handleRandomTopic,
                  class: "random-btn"
                }, " 随机话题 ")
              ]),
              vue.createElementVNode("view", { class: "input-box" }, [
                vue.createElementVNode("view", { class: "input-item" }, [
                  vue.createElementVNode("view", { class: "item-title" }, " 我的角色 "),
                  vue.createElementVNode("input", {
                    class: "item-input",
                    placeholder: randomInput.value.my_role
                  }, null, 8, ["placeholder"])
                ])
              ]),
              vue.createElementVNode("view", { class: "input-box" }, [
                vue.createElementVNode("view", { class: "input-item" }, [
                  vue.createElementVNode("view", { class: "item-title" }, " AI的角色 "),
                  vue.createElementVNode("input", {
                    class: "item-input",
                    placeholder: randomInput.value.ai_role
                  }, null, 8, ["placeholder"])
                ])
              ]),
              vue.createElementVNode("view", { class: "input-box" }, [
                vue.createElementVNode("view", { class: "input-item" }, [
                  vue.createElementVNode("view", { class: "item-title" }, " 情境 "),
                  vue.createElementVNode("input", {
                    class: "item-input",
                    placeholder: randomInput.value.topic
                  }, null, 8, ["placeholder"])
                ])
              ]),
              vue.createElementVNode("view", { class: "btn-box" }, [
                vue.createElementVNode("view", {
                  class: "btn",
                  onClick: createTopic
                }, " 创建话题 ")
              ])
            ]),
            vue.createElementVNode("view", { class: "my-topic-container" })
          ])
        ]);
      };
    }
  });
  const PagesTopicTopicCreate = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-fa88a425"], ["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/pages/topic/topicCreate.vue"]]);
  __definePage("pages/login/index", PagesLoginIndex);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/index/switchRole", PagesIndexSwitchRole);
  __definePage("pages/chat/index", PagesChatIndex);
  __definePage("pages/chat/settings", PagesChatSettings);
  __definePage("pages/practice/index", PagesPracticeIndex);
  __definePage("pages/my/index", PagesMyIndex);
  __definePage("pages/my/learnLanguage", PagesMyLearnLanguage);
  __definePage("pages/contact/index", PagesContactIndex);
  __definePage("pages/feedback/index", PagesFeedbackIndex);
  __definePage("pages/topic/index", PagesTopicIndex);
  __definePage("pages/topic/history", PagesTopicHistory);
  __definePage("pages/topic/phrase", PagesTopicPhrase);
  __definePage("pages/topic/completion", PagesTopicCompletion);
  __definePage("pages/topic/topicCreate", PagesTopicTopicCreate);
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props) {
      vue.ref(null);
      vue.ref(0);
      vue.ref(0);
      vue.ref(null);
      onLaunch(() => {
      });
      onShow(() => {
      });
      onHide(() => {
      });
      return () => {
      };
    }
  });
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "H:/HSKuniapp/AAAGPT/2024年4月24日-详细注释版本/chatgpt-talkieai/talkieai-uniapp/src/App.vue"]]);
  class EventBus {
    constructor() {
      this.events = {};
    }
    emit(eventName, data) {
      if (this.events[eventName]) {
        this.events[eventName].forEach(function(fn) {
          fn(data);
        });
      }
    }
    on(eventName, fn) {
      this.events[eventName] = this.events[eventName] || [];
      this.events[eventName].push(fn);
    }
    off(eventName, fn) {
      if (this.events[eventName]) {
        for (let i = 0; i < this.events[eventName].length; i++) {
          if (this.events[eventName][i] === fn) {
            this.events[eventName].splice(i, 1);
            break;
          }
        }
      }
    }
  }
  const getHeight = (global2) => {
    uni.getSystemInfo({
      success: (e) => {
        global2.StatusBar = e.statusBarHeight || 0;
        if (e.platform === "android") {
          global2.CustomBar = global2.StatusBar + 50;
        } else {
          global2.CustomBar = global2.StatusBar + 45;
        }
      }
    });
  };
  function createApp() {
    const $bus = new EventBus();
    const app = vue.createVueApp(App);
    app.provide("$bus", $bus);
    app.config.globalProperties.$bus = $bus;
    getHeight(app.config.globalProperties);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
