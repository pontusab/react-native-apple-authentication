"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.projectConfig = exports.dependencyConfig = void 0;

function _joi() {
  const data = _interopRequireDefault(require("@hapi/joi"));

  _joi = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const map = (key, value) => _joi().default.object().unknown(true).pattern(key, value);
/**
 * Schema for CommandT
 */


const command = _joi().default.object({
  name: _joi().default.string().required(),
  description: _joi().default.string(),
  usage: _joi().default.string(),
  func: _joi().default.func().required(),
  options: _joi().default.array().items(_joi().default.object({
    name: _joi().default.string().required(),
    description: _joi().default.string(),
    parse: _joi().default.func(),
    default: _joi().default.alternatives().try([_joi().default.bool(), _joi().default.number(), _joi().default.string().allow(''), _joi().default.func()])
  }).rename('command', 'name', {
    ignoreUndefined: true
  })),
  examples: _joi().default.array().items(_joi().default.object({
    desc: _joi().default.string().required(),
    cmd: _joi().default.string().required()
  }))
});
/**
 * Schema for UserDependencyConfigT
 */


const dependencyConfig = _joi().default.object({
  dependency: _joi().default.object({
    platforms: map(_joi().default.string(), _joi().default.any()).keys({
      ios: _joi().default.object({
        project: _joi().default.string(),
        podspecPath: _joi().default.string(),
        sharedLibraries: _joi().default.array().items(_joi().default.string()),
        libraryFolder: _joi().default.string(),
        scriptPhases: _joi().default.array().items(_joi().default.object())
      }).default({}),
      android: _joi().default.object({
        sourceDir: _joi().default.string(),
        manifestPath: _joi().default.string(),
        packageImportPath: _joi().default.string(),
        packageInstance: _joi().default.string()
      }).default({})
    }).default(),
    assets: _joi().default.array().items(_joi().default.string()).default([]),
    hooks: map(_joi().default.string(), _joi().default.string()).default({}),
    params: _joi().default.array().items(_joi().default.object({
      name: _joi().default.string(),
      type: _joi().default.string(),
      message: _joi().default.string()
    })).default([])
  }).default(),
  platforms: map(_joi().default.string(), _joi().default.object({
    dependencyConfig: _joi().default.func(),
    projectConfig: _joi().default.func(),
    linkConfig: _joi().default.func()
  })).default({}),
  commands: _joi().default.array().items(command).default([])
}).unknown(true).default();
/**
 * Schema for ProjectConfigT
 */


exports.dependencyConfig = dependencyConfig;

const projectConfig = _joi().default.object({
  dependencies: map(_joi().default.string(), _joi().default.object({
    root: _joi().default.string(),
    platforms: map(_joi().default.string(), _joi().default.any()).keys({
      ios: _joi().default.object({
        sourceDir: _joi().default.string(),
        folder: _joi().default.string(),
        pbxprojPath: _joi().default.string(),
        podfile: _joi().default.string(),
        podspecPath: _joi().default.string(),
        projectPath: _joi().default.string(),
        projectName: _joi().default.string(),
        libraryFolder: _joi().default.string(),
        sharedLibraries: _joi().default.array().items(_joi().default.string())
      }).allow(null),
      android: _joi().default.object({
        sourceDir: _joi().default.string(),
        folder: _joi().default.string(),
        packageImportPath: _joi().default.string(),
        packageInstance: _joi().default.string()
      }).allow(null)
    }),
    assets: _joi().default.array().items(_joi().default.string()),
    hooks: map(_joi().default.string(), _joi().default.string()),
    params: _joi().default.array().items(_joi().default.object({
      name: _joi().default.string(),
      type: _joi().default.string(),
      message: _joi().default.string()
    }))
  }).allow(null)).default({}),
  reactNativePath: _joi().default.string(),
  project: map(_joi().default.string(), _joi().default.any()).keys({
    ios: _joi().default.object({
      project: _joi().default.string(),
      sharedLibraries: _joi().default.array().items(_joi().default.string()),
      libraryFolder: _joi().default.string()
    }).default({}),
    android: _joi().default.object({
      sourceDir: _joi().default.string(),
      manifestPath: _joi().default.string(),
      packageName: _joi().default.string(),
      packageFolder: _joi().default.string(),
      mainFilePath: _joi().default.string(),
      stringsPath: _joi().default.string(),
      settingsGradlePath: _joi().default.string(),
      assetsPath: _joi().default.string(),
      buildGradlePath: _joi().default.string()
    }).default({})
  }).default(),
  assets: _joi().default.array().items(_joi().default.string()).default([]),
  commands: _joi().default.array().items(command).default([]),
  platforms: map(_joi().default.string(), _joi().default.object({
    dependencyConfig: _joi().default.func(),
    projectConfig: _joi().default.func(),
    linkConfig: _joi().default.func()
  })).default({})
}).unknown(true).default();

exports.projectConfig = projectConfig;