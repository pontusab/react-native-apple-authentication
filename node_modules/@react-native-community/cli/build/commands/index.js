"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _server = _interopRequireDefault(require("./server/server"));

var _bundle = _interopRequireDefault(require("./bundle/bundle"));

var _ramBundle = _interopRequireDefault(require("./bundle/ramBundle"));

var _link = _interopRequireDefault(require("./link/link"));

var _unlink = _interopRequireDefault(require("./link/unlink"));

var _install = _interopRequireDefault(require("./install/install"));

var _uninstall = _interopRequireDefault(require("./install/uninstall"));

var _upgrade = _interopRequireDefault(require("./upgrade/upgrade"));

var _info = _interopRequireDefault(require("./info/info"));

var _config = _interopRequireDefault(require("./config/config"));

var _init = _interopRequireDefault(require("./init"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = [_server.default, _bundle.default, _ramBundle.default, _link.default, _unlink.default, _install.default, _uninstall.default, _upgrade.default, _info.default, _config.default, _init.default];
exports.default = _default;