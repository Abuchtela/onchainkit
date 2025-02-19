"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/hmac-drbg";
exports.ids = ["vendor-chunks/hmac-drbg"];
exports.modules = {

/***/ "(ssr)/./node_modules/hmac-drbg/lib/hmac-drbg.js":
/*!*************************************************!*\
  !*** ./node_modules/hmac-drbg/lib/hmac-drbg.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar hash = __webpack_require__(/*! hash.js */ \"(ssr)/./node_modules/hash.js/lib/hash.js\");\nvar utils = __webpack_require__(/*! minimalistic-crypto-utils */ \"(ssr)/./node_modules/minimalistic-crypto-utils/lib/utils.js\");\nvar assert = __webpack_require__(/*! minimalistic-assert */ \"(ssr)/./node_modules/minimalistic-assert/index.js\");\n\nfunction HmacDRBG(options) {\n  if (!(this instanceof HmacDRBG))\n    return new HmacDRBG(options);\n  this.hash = options.hash;\n  this.predResist = !!options.predResist;\n\n  this.outLen = this.hash.outSize;\n  this.minEntropy = options.minEntropy || this.hash.hmacStrength;\n\n  this._reseed = null;\n  this.reseedInterval = null;\n  this.K = null;\n  this.V = null;\n\n  var entropy = utils.toArray(options.entropy, options.entropyEnc || 'hex');\n  var nonce = utils.toArray(options.nonce, options.nonceEnc || 'hex');\n  var pers = utils.toArray(options.pers, options.persEnc || 'hex');\n  assert(entropy.length >= (this.minEntropy / 8),\n         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');\n  this._init(entropy, nonce, pers);\n}\nmodule.exports = HmacDRBG;\n\nHmacDRBG.prototype._init = function init(entropy, nonce, pers) {\n  var seed = entropy.concat(nonce).concat(pers);\n\n  this.K = new Array(this.outLen / 8);\n  this.V = new Array(this.outLen / 8);\n  for (var i = 0; i < this.V.length; i++) {\n    this.K[i] = 0x00;\n    this.V[i] = 0x01;\n  }\n\n  this._update(seed);\n  this._reseed = 1;\n  this.reseedInterval = 0x1000000000000;  // 2^48\n};\n\nHmacDRBG.prototype._hmac = function hmac() {\n  return new hash.hmac(this.hash, this.K);\n};\n\nHmacDRBG.prototype._update = function update(seed) {\n  var kmac = this._hmac()\n                 .update(this.V)\n                 .update([ 0x00 ]);\n  if (seed)\n    kmac = kmac.update(seed);\n  this.K = kmac.digest();\n  this.V = this._hmac().update(this.V).digest();\n  if (!seed)\n    return;\n\n  this.K = this._hmac()\n               .update(this.V)\n               .update([ 0x01 ])\n               .update(seed)\n               .digest();\n  this.V = this._hmac().update(this.V).digest();\n};\n\nHmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {\n  // Optional entropy enc\n  if (typeof entropyEnc !== 'string') {\n    addEnc = add;\n    add = entropyEnc;\n    entropyEnc = null;\n  }\n\n  entropy = utils.toArray(entropy, entropyEnc);\n  add = utils.toArray(add, addEnc);\n\n  assert(entropy.length >= (this.minEntropy / 8),\n         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');\n\n  this._update(entropy.concat(add || []));\n  this._reseed = 1;\n};\n\nHmacDRBG.prototype.generate = function generate(len, enc, add, addEnc) {\n  if (this._reseed > this.reseedInterval)\n    throw new Error('Reseed is required');\n\n  // Optional encoding\n  if (typeof enc !== 'string') {\n    addEnc = add;\n    add = enc;\n    enc = null;\n  }\n\n  // Optional additional data\n  if (add) {\n    add = utils.toArray(add, addEnc || 'hex');\n    this._update(add);\n  }\n\n  var temp = [];\n  while (temp.length < len) {\n    this.V = this._hmac().update(this.V).digest();\n    temp = temp.concat(this.V);\n  }\n\n  var res = temp.slice(0, len);\n  this._update(add);\n  this._reseed++;\n  return utils.encode(res, enc);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaG1hYy1kcmJnL2xpYi9obWFjLWRyYmcuanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWIsV0FBVyxtQkFBTyxDQUFDLHlEQUFTO0FBQzVCLFlBQVksbUJBQU8sQ0FBQyw4RkFBMkI7QUFDL0MsYUFBYSxtQkFBTyxDQUFDLDhFQUFxQjs7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLG1CQUFtQjtBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBDQUEwQztBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dC8uL25vZGVfbW9kdWxlcy9obWFjLWRyYmcvbGliL2htYWMtZHJiZy5qcz8wMzhhIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGhhc2ggPSByZXF1aXJlKCdoYXNoLmpzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCdtaW5pbWFsaXN0aWMtY3J5cHRvLXV0aWxzJyk7XG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnbWluaW1hbGlzdGljLWFzc2VydCcpO1xuXG5mdW5jdGlvbiBIbWFjRFJCRyhvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBIbWFjRFJCRykpXG4gICAgcmV0dXJuIG5ldyBIbWFjRFJCRyhvcHRpb25zKTtcbiAgdGhpcy5oYXNoID0gb3B0aW9ucy5oYXNoO1xuICB0aGlzLnByZWRSZXNpc3QgPSAhIW9wdGlvbnMucHJlZFJlc2lzdDtcblxuICB0aGlzLm91dExlbiA9IHRoaXMuaGFzaC5vdXRTaXplO1xuICB0aGlzLm1pbkVudHJvcHkgPSBvcHRpb25zLm1pbkVudHJvcHkgfHwgdGhpcy5oYXNoLmhtYWNTdHJlbmd0aDtcblxuICB0aGlzLl9yZXNlZWQgPSBudWxsO1xuICB0aGlzLnJlc2VlZEludGVydmFsID0gbnVsbDtcbiAgdGhpcy5LID0gbnVsbDtcbiAgdGhpcy5WID0gbnVsbDtcblxuICB2YXIgZW50cm9weSA9IHV0aWxzLnRvQXJyYXkob3B0aW9ucy5lbnRyb3B5LCBvcHRpb25zLmVudHJvcHlFbmMgfHwgJ2hleCcpO1xuICB2YXIgbm9uY2UgPSB1dGlscy50b0FycmF5KG9wdGlvbnMubm9uY2UsIG9wdGlvbnMubm9uY2VFbmMgfHwgJ2hleCcpO1xuICB2YXIgcGVycyA9IHV0aWxzLnRvQXJyYXkob3B0aW9ucy5wZXJzLCBvcHRpb25zLnBlcnNFbmMgfHwgJ2hleCcpO1xuICBhc3NlcnQoZW50cm9weS5sZW5ndGggPj0gKHRoaXMubWluRW50cm9weSAvIDgpLFxuICAgICAgICAgJ05vdCBlbm91Z2ggZW50cm9weS4gTWluaW11bSBpczogJyArIHRoaXMubWluRW50cm9weSArICcgYml0cycpO1xuICB0aGlzLl9pbml0KGVudHJvcHksIG5vbmNlLCBwZXJzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gSG1hY0RSQkc7XG5cbkhtYWNEUkJHLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uIGluaXQoZW50cm9weSwgbm9uY2UsIHBlcnMpIHtcbiAgdmFyIHNlZWQgPSBlbnRyb3B5LmNvbmNhdChub25jZSkuY29uY2F0KHBlcnMpO1xuXG4gIHRoaXMuSyA9IG5ldyBBcnJheSh0aGlzLm91dExlbiAvIDgpO1xuICB0aGlzLlYgPSBuZXcgQXJyYXkodGhpcy5vdXRMZW4gLyA4KTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLlYubGVuZ3RoOyBpKyspIHtcbiAgICB0aGlzLktbaV0gPSAweDAwO1xuICAgIHRoaXMuVltpXSA9IDB4MDE7XG4gIH1cblxuICB0aGlzLl91cGRhdGUoc2VlZCk7XG4gIHRoaXMuX3Jlc2VlZCA9IDE7XG4gIHRoaXMucmVzZWVkSW50ZXJ2YWwgPSAweDEwMDAwMDAwMDAwMDA7ICAvLyAyXjQ4XG59O1xuXG5IbWFjRFJCRy5wcm90b3R5cGUuX2htYWMgPSBmdW5jdGlvbiBobWFjKCkge1xuICByZXR1cm4gbmV3IGhhc2guaG1hYyh0aGlzLmhhc2gsIHRoaXMuSyk7XG59O1xuXG5IbWFjRFJCRy5wcm90b3R5cGUuX3VwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZShzZWVkKSB7XG4gIHZhciBrbWFjID0gdGhpcy5faG1hYygpXG4gICAgICAgICAgICAgICAgIC51cGRhdGUodGhpcy5WKVxuICAgICAgICAgICAgICAgICAudXBkYXRlKFsgMHgwMCBdKTtcbiAgaWYgKHNlZWQpXG4gICAga21hYyA9IGttYWMudXBkYXRlKHNlZWQpO1xuICB0aGlzLksgPSBrbWFjLmRpZ2VzdCgpO1xuICB0aGlzLlYgPSB0aGlzLl9obWFjKCkudXBkYXRlKHRoaXMuVikuZGlnZXN0KCk7XG4gIGlmICghc2VlZClcbiAgICByZXR1cm47XG5cbiAgdGhpcy5LID0gdGhpcy5faG1hYygpXG4gICAgICAgICAgICAgICAudXBkYXRlKHRoaXMuVilcbiAgICAgICAgICAgICAgIC51cGRhdGUoWyAweDAxIF0pXG4gICAgICAgICAgICAgICAudXBkYXRlKHNlZWQpXG4gICAgICAgICAgICAgICAuZGlnZXN0KCk7XG4gIHRoaXMuViA9IHRoaXMuX2htYWMoKS51cGRhdGUodGhpcy5WKS5kaWdlc3QoKTtcbn07XG5cbkhtYWNEUkJHLnByb3RvdHlwZS5yZXNlZWQgPSBmdW5jdGlvbiByZXNlZWQoZW50cm9weSwgZW50cm9weUVuYywgYWRkLCBhZGRFbmMpIHtcbiAgLy8gT3B0aW9uYWwgZW50cm9weSBlbmNcbiAgaWYgKHR5cGVvZiBlbnRyb3B5RW5jICE9PSAnc3RyaW5nJykge1xuICAgIGFkZEVuYyA9IGFkZDtcbiAgICBhZGQgPSBlbnRyb3B5RW5jO1xuICAgIGVudHJvcHlFbmMgPSBudWxsO1xuICB9XG5cbiAgZW50cm9weSA9IHV0aWxzLnRvQXJyYXkoZW50cm9weSwgZW50cm9weUVuYyk7XG4gIGFkZCA9IHV0aWxzLnRvQXJyYXkoYWRkLCBhZGRFbmMpO1xuXG4gIGFzc2VydChlbnRyb3B5Lmxlbmd0aCA+PSAodGhpcy5taW5FbnRyb3B5IC8gOCksXG4gICAgICAgICAnTm90IGVub3VnaCBlbnRyb3B5LiBNaW5pbXVtIGlzOiAnICsgdGhpcy5taW5FbnRyb3B5ICsgJyBiaXRzJyk7XG5cbiAgdGhpcy5fdXBkYXRlKGVudHJvcHkuY29uY2F0KGFkZCB8fCBbXSkpO1xuICB0aGlzLl9yZXNlZWQgPSAxO1xufTtcblxuSG1hY0RSQkcucHJvdG90eXBlLmdlbmVyYXRlID0gZnVuY3Rpb24gZ2VuZXJhdGUobGVuLCBlbmMsIGFkZCwgYWRkRW5jKSB7XG4gIGlmICh0aGlzLl9yZXNlZWQgPiB0aGlzLnJlc2VlZEludGVydmFsKVxuICAgIHRocm93IG5ldyBFcnJvcignUmVzZWVkIGlzIHJlcXVpcmVkJyk7XG5cbiAgLy8gT3B0aW9uYWwgZW5jb2RpbmdcbiAgaWYgKHR5cGVvZiBlbmMgIT09ICdzdHJpbmcnKSB7XG4gICAgYWRkRW5jID0gYWRkO1xuICAgIGFkZCA9IGVuYztcbiAgICBlbmMgPSBudWxsO1xuICB9XG5cbiAgLy8gT3B0aW9uYWwgYWRkaXRpb25hbCBkYXRhXG4gIGlmIChhZGQpIHtcbiAgICBhZGQgPSB1dGlscy50b0FycmF5KGFkZCwgYWRkRW5jIHx8ICdoZXgnKTtcbiAgICB0aGlzLl91cGRhdGUoYWRkKTtcbiAgfVxuXG4gIHZhciB0ZW1wID0gW107XG4gIHdoaWxlICh0ZW1wLmxlbmd0aCA8IGxlbikge1xuICAgIHRoaXMuViA9IHRoaXMuX2htYWMoKS51cGRhdGUodGhpcy5WKS5kaWdlc3QoKTtcbiAgICB0ZW1wID0gdGVtcC5jb25jYXQodGhpcy5WKTtcbiAgfVxuXG4gIHZhciByZXMgPSB0ZW1wLnNsaWNlKDAsIGxlbik7XG4gIHRoaXMuX3VwZGF0ZShhZGQpO1xuICB0aGlzLl9yZXNlZWQrKztcbiAgcmV0dXJuIHV0aWxzLmVuY29kZShyZXMsIGVuYyk7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/hmac-drbg/lib/hmac-drbg.js\n");

/***/ })

};
;