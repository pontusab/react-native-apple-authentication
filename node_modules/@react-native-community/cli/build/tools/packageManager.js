"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setProjectDir = setProjectDir;
exports.install = install;
exports.installDev = installDev;
exports.uninstall = uninstall;
exports.installAll = installAll;

function _execa() {
  const data = _interopRequireDefault(require("execa"));

  _execa = function () {
    return data;
  };

  return data;
}

var _logger = _interopRequireDefault(require("./logger"));

var _yarn = require("./yarn");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let projectDir;
const packageManagers = {
  yarn: {
    install: ['add'],
    installDev: ['add', '-D'],
    uninstall: ['remove'],
    installAll: ['install']
  },
  npm: {
    install: ['install', '--save', '--save-exact'],
    installDev: ['install', '--save-dev', '--save-exact'],
    uninstall: ['uninstall', '--save'],
    installAll: ['install']
  }
};

function configurePackageManager(packageNames, options, action) {
  const pm = shouldUseYarn(options) ? 'yarn' : 'npm';
  const [executable, ...flags] = packageManagers[pm][action];
  const args = [executable, ...flags, ...packageNames];
  return executeCommand(pm, args, options);
}

function executeCommand(command, args, options) {
  return (0, _execa().default)(command, args, {
    stdio: options && options.silent && !_logger.default.isVerbose() ? 'pipe' : 'inherit',
    cwd: options && options.cwd
  });
}

function shouldUseYarn(options) {
  if (options && options.preferYarn !== undefined) {
    return options.preferYarn && (0, _yarn.getYarnVersionIfAvailable)();
  }

  return (0, _yarn.isProjectUsingYarn)(projectDir) && (0, _yarn.getYarnVersionIfAvailable)();
}

function setProjectDir(dir) {
  projectDir = dir;
}

function install(packageNames, options) {
  return configurePackageManager(packageNames, options, 'install');
}

function installDev(packageNames, options) {
  return configurePackageManager(packageNames, options, 'installDev');
}

function uninstall(packageNames, options) {
  return configurePackageManager(packageNames, options, 'uninstall');
}

function installAll(options) {
  return configurePackageManager([], options, 'installAll');
}