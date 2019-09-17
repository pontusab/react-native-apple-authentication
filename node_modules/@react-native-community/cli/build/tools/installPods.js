"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function () {
    return data;
  };

  return data;
}

function _execa() {
  const data = _interopRequireDefault(require("execa"));

  _execa = function () {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _ora() {
  const data = _interopRequireDefault(require("ora"));

  _ora = function () {
    return data;
  };

  return data;
}

function _inquirer() {
  const data = _interopRequireDefault(require("inquirer"));

  _inquirer = function () {
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

var _loader = require("./loader");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function updatePods(loader) {
  try {
    loader.start(`Updating CocoaPods repositories ${_chalk().default.dim('(this may take a few minutes)')}`);
    await (0, _execa().default)('pod', ['repo', 'update']);
  } catch (error) {
    // "pod" command outputs errors to stdout (at least some of them)
    _cliTools().logger.log(error.stderr || error.stdout);

    loader.fail();
    throw new Error(`Failed to update CocoaPods repositories for iOS project.\nPlease try again manually: "pod repo update".\nCocoaPods documentation: ${_chalk().default.dim.underline('https://cocoapods.org/')}`);
  }
}

async function installPods({
  projectName,
  loader,
  shouldUpdatePods
}) {
  loader = loader || new _loader.NoopLoader();

  try {
    if (!_fs().default.existsSync('ios')) {
      return;
    }

    process.chdir('ios');

    const hasPods = _fs().default.existsSync('Podfile');

    if (!hasPods) {
      return;
    }

    try {
      // Check if "pod" is available and usable. It happens that there are
      // multiple versions of "pod" command and even though it's there, it exits
      // with a failure
      await (0, _execa().default)('pod', ['--version']);
    } catch (e) {
      loader.info();
      const {
        shouldInstallCocoaPods
      } = await _inquirer().default.prompt([{
        type: 'confirm',
        name: 'shouldInstallCocoaPods',
        message: `CocoaPods ${_chalk().default.dim.underline('(https://cocoapods.org/)')} ${_chalk().default.reset.bold("is not installed. It's necessary for iOS project to run correctly. Do you want to install it?")}`,
        default: true
      }]);

      if (shouldInstallCocoaPods) {
        loader.start('Installing CocoaPods');

        try {
          // First attempt to install `cocoapods`
          await (0, _execa().default)('gem', ['install', 'cocoapods', '--no-document']);
          loader.succeed();
        } catch (_error) {
          try {
            // If that doesn't work then try with sudo
            await (0, _execa().default)('sudo', ['gem', 'install', 'cocoapods', '--no-document']);
          } catch (error) {
            loader.fail();

            _cliTools().logger.log(error.stderr);

            throw new Error(`Error occured while trying to install CocoaPods, which is required by this template.\nPlease try again manually: "sudo gem install cocoapods".\nCocoaPods documentation: ${_chalk().default.dim.underline('https://cocoapods.org/')}`);
          }
        }

        await updatePods(loader);
      }
    }

    if (shouldUpdatePods) {
      await updatePods(loader);
    }

    try {
      loader.succeed();
      loader.start(`Installing CocoaPods dependencies ${_chalk().default.dim('(this may take a few minutes)')}`);
      await (0, _execa().default)('pod', ['install']);
    } catch (error) {
      // "pod" command outputs errors to stdout (at least some of them)
      _cliTools().logger.log(error.stderr || error.stdout);

      throw new Error(`Failed to install CocoaPods dependencies for iOS project, which is required by this template.\nPlease try again manually: "cd ./${projectName}/ios && pod install".\nCocoaPods documentation: ${_chalk().default.dim.underline('https://cocoapods.org/')}`);
    }
  } catch (error) {
    throw error;
  } finally {
    process.chdir('..');
  }
}

var _default = installPods;
exports.default = _default;