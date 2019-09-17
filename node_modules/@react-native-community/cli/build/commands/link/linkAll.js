"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _lodash() {
  const data = require("lodash");

  _lodash = function () {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
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

function _cliTools() {
  const data = require("@react-native-community/cli-tools");

  _cliTools = function () {
    return data;
  };

  return data;
}

var _linkAssets = _interopRequireDefault(require("./linkAssets"));

var _linkDependency = _interopRequireDefault(require("./linkDependency"));

var _makeHook = _interopRequireDefault(require("./makeHook"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dedupeAssets = assets => (0, _lodash().uniqBy)(assets, asset => _path().default.basename(asset));

async function linkAll(config, options) {
  if (options.linkDeps) {
    _cliTools().logger.debug('Linking all dependencies');

    _cliTools().logger.info(`Linking dependencies using "${_chalk().default.bold('link')}" command is now legacy and likely unnecessary. We encourage you to try ${_chalk().default.bold('autolinking')} that comes with React Native v0.60 default template. Autolinking happens at build time – during CocoaPods install or Gradle install phase. More information: ${_chalk().default.dim.underline('https://github.com/react-native-community/cli/blob/master/docs/autolinking.md')}`);

    for (let key in config.dependencies) {
      const dependency = config.dependencies[key];

      try {
        if (dependency.hooks.prelink) {
          await (0, _makeHook.default)(dependency.hooks.prelink)();
        }

        await (0, _linkDependency.default)(config.platforms, config.project, dependency);

        if (dependency.hooks.postlink) {
          await (0, _makeHook.default)(dependency.hooks.postlink)();
        }
      } catch (error) {
        throw new (_cliTools().CLIError)(`Linking "${_chalk().default.bold(dependency.name)}" failed.`, error);
      }
    }
  }

  if (options.linkAssets) {
    _cliTools().logger.debug('Linking all assets');

    const projectAssets = config.assets;
    const assets = dedupeAssets(Object.keys(config.dependencies).reduce((acc, dependency) => acc.concat(config.dependencies[dependency].assets), projectAssets));

    try {
      await (0, _linkAssets.default)(config.platforms, config.project, assets);
    } catch (error) {
      throw new (_cliTools().CLIError)('Linking assets failed.', error);
    }
  }
}

var _default = linkAll;
exports.default = _default;