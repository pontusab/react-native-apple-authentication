"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLoader = getLoader;
exports.NoopLoader = void 0;

function _ora() {
  const data = _interopRequireDefault(require("ora"));

  _ora = function () {
    return data;
  };

  return data;
}

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OraNoop {
  succeed() {}

  fail() {}

  start(message) {}

  info(message) {}

}

function getLoader() {
  return _logger.default.isVerbose() ? OraNoop : _ora().default;
}

const NoopLoader = OraNoop;
exports.NoopLoader = NoopLoader;