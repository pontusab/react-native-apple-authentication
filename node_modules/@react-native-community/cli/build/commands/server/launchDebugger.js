"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _open() {
  const data = _interopRequireDefault(require("open"));

  _open = function () {
    return data;
  };

  return data;
}

function _child_process() {
  const data = require("child_process");

  _child_process = function () {
    return data;
  };

  return data;
}

function _cliTools() {
  const data = require("@react-native-community/cli-tools");

  _cliTools = function () {
    return data;
  };

  return data;
}

var _launchDefaultBrowser = _interopRequireDefault(require("./launchDefaultBrowser"));

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * 
 */
function commandExistsUnixSync(commandName) {
  try {
    const stdout = (0, _child_process().execSync)(`command -v ${commandName} 2>/dev/null` + ` && { echo >&1 '${commandName} found'; exit 0; }`);
    return !!stdout;
  } catch (error) {
    return false;
  }
}

function commandExistsWindowsSync(commandName) {
  try {
    const stdout = (0, _child_process().execSync)('where ' + commandName, {
      stdio: []
    });
    return !!stdout;
  } catch (error) {
    return false;
  }
}

function commandExists(commandName) {
  switch (process.platform) {
    case 'win32':
      return commandExistsWindowsSync(commandName);

    case 'linux':
    case 'darwin':
      return commandExistsUnixSync(commandName);

    default:
      // assume it doesn't exist, just to be safe.
      return false;
  }
}

function getChromeAppName() {
  switch (process.platform) {
    case 'darwin':
      return 'google chrome';

    case 'win32':
      return 'chrome';

    case 'linux':
      if (commandExistsUnixSync('google-chrome')) {
        return 'google-chrome';
      }

      if (commandExistsUnixSync('chromium-browser')) {
        return 'chromium-browser';
      }

      return 'chromium';

    default:
      return 'google-chrome';
  }
}

function launchChrome(url) {
  (0, _open().default)(url, {
    app: [getChromeAppName()]
  }, err => {
    if (err) {
      _cliTools().logger.error('Google Chrome exited with error:', err);
    }
  });
}

function launchDebugger(url) {
  if (!commandExists(getChromeAppName())) {
    _cliTools().logger.info(`For a better debugging experience please install Google Chrome from: ${_chalk().default.underline.dim('https://www.google.com/chrome/')}`);

    (0, _launchDefaultBrowser.default)(url);
    return;
  }

  launchChrome(url);
}

var _default = launchDebugger;
exports.default = _default;