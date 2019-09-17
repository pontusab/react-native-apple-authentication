"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;

function _deepmerge() {
  const data = _interopRequireDefault(require("deepmerge"));

  _deepmerge = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * `deepmerge` concatenates arrays by default instead of overwriting them.
 * We define custom merging function for arrays to change that behaviour
 */
function merge(...objs) {
  return (0, _deepmerge().default)(...objs, {
    arrayMerge: (destinationArray, sourceArray, options) => sourceArray
  });
}