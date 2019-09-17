"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = run;
Object.defineProperty(exports, "init", {
  enumerable: true,
  get: function () {
    return _initCompat.default;
  }
});
Object.defineProperty(exports, "loadConfig", {
  enumerable: true,
  get: function () {
    return _config.default;
  }
});
exports.default = void 0;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _child_process() {
  const data = _interopRequireDefault(require("child_process"));

  _child_process = function () {
    return data;
  };

  return data;
}

function _commander() {
  const data = _interopRequireDefault(require("commander"));

  _commander = function () {
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

var _commands = _interopRequireDefault(require("./commands"));

var _initCompat = _interopRequireDefault(require("./commands/init/initCompat"));

var _assertRequiredOptions = _interopRequireDefault(require("./tools/assertRequiredOptions"));

function _cliTools() {
  const data = require("@react-native-community/cli-tools");

  _cliTools = function () {
    return data;
  };

  return data;
}

var _packageManager = require("./tools/packageManager");

var _package = _interopRequireDefault(require("../package.json"));

var _config = _interopRequireDefault(require("./tools/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
_commander().default.option('--version', 'Print CLI version').option('--verbose', 'Increase logging verbosity');

_commander().default.on('command:*', () => {
  printUnknownCommand(_commander().default.args.join(' '));
  process.exit(1);
});

const defaultOptParser = val => val;

const handleError = err => {
  if (_commander().default.verbose) {
    _cliTools().logger.error(err.message);
  } else {
    // Some error messages (esp. custom ones) might have `.` at the end already.
    const message = err.message.replace(/\.$/, '');

    _cliTools().logger.error(`${message}. ${_chalk().default.dim(`Run CLI with ${_chalk().default.reset('--verbose')} ${_chalk().default.dim('flag for more details.')}`)}`);
  }

  if (err.stack) {
    _cliTools().logger.log(_chalk().default.dim(err.stack));
  }

  process.exit(1);
}; // Custom printHelpInformation command inspired by internal Commander.js
// one modified to suit our needs


function printHelpInformation(examples, pkg) {
  let cmdName = this._name;

  const argsList = this._args.map(arg => arg.required ? `<${arg.name}>` : `[${arg.name}]`).join(' ');

  if (this._alias) {
    cmdName = `${cmdName}|${this._alias}`;
  }

  const sourceInformation = pkg ? [`${_chalk().default.bold('Source:')} ${pkg.name}@${pkg.version}`, ''] : [];
  let output = [_chalk().default.bold(`react-native ${cmdName} ${argsList}`), this._description ? `\n${this._description}\n` : '', ...sourceInformation, `${_chalk().default.bold('Options:')}`, this.optionHelp().replace(/^/gm, '  ')];

  if (examples && examples.length > 0) {
    const formattedUsage = examples.map(example => `  ${example.desc}: \n  ${_chalk().default.cyan(example.cmd)}`).join('\n\n');
    output = output.concat([_chalk().default.bold('\nExample usage:'), formattedUsage]);
  }

  return output.join('\n').concat('\n');
}

function printUnknownCommand(cmdName) {
  if (cmdName) {
    _cliTools().logger.error(`Unrecognized command "${_chalk().default.bold(cmdName)}".`);

    _cliTools().logger.info(`Run ${_chalk().default.bold('"react-native --help"')} to see a list of all available commands.`);
  } else {
    _commander().default.outputHelp();
  }
}

const addCommand = (command, ctx) => {
  const options = command.options || [];

  const cmd = _commander().default.command(command.name).description(command.description).action(async function handleAction(...args) {
    const passedOptions = this.opts();
    const argv = Array.from(args).slice(0, -1);

    try {
      (0, _assertRequiredOptions.default)(options, passedOptions);
      await command.func(argv, ctx, passedOptions);
    } catch (error) {
      handleError(error);
    }
  });

  cmd.helpInformation = printHelpInformation.bind(cmd, command.examples, // $FlowFixMe - we know pkg may be missing...
  command.pkg);
  options.forEach(opt => cmd.option(opt.name, opt.description, opt.parse || defaultOptParser, typeof opt.default === 'function' ? opt.default(ctx) : opt.default));
};

async function run() {
  try {
    await setupAndRun();
  } catch (e) {
    handleError(e);
  }
}

async function setupAndRun() {
  // We only have a setup script for UNIX envs currently
  if (process.platform !== 'win32') {
    const scriptName = 'setup_env.sh';

    const absolutePath = _path().default.join(__dirname, '..', scriptName);

    try {
      _child_process().default.execFileSync(absolutePath, {
        stdio: 'pipe'
      });
    } catch (error) {
      _cliTools().logger.warn(`Failed to run environment setup script "${scriptName}"\n\n${_chalk().default.red(error)}`);

      _cliTools().logger.info(`React Native CLI will continue to run if your local environment matches what React Native expects. If it does fail, check out "${absolutePath}" and adjust your environment to match it.`);
    }
  } // when we run `config`, we don't want to output anything to the console. We
  // expect it to return valid JSON


  if (process.argv.includes('config')) {
    _cliTools().logger.disable();
  }

  const ctx = (0, _config.default)();

  _cliTools().logger.enable();

  (0, _packageManager.setProjectDir)(ctx.root);
  [..._commands.default, ...ctx.commands].forEach(command => addCommand(command, ctx));

  _commander().default.parse(process.argv);

  if (_commander().default.rawArgs.length === 2) {
    _commander().default.outputHelp();
  } // We handle --version as a special case like this because both `commander`
  // and `yargs` append it to every command and we don't want to do that.
  // E.g. outside command `init` has --version flag and we want to preserve it.


  if (_commander().default.args.length === 0 && _commander().default.version === true) {
    console.log(_package.default.version);
  }

  _cliTools().logger.setVerbose(_commander().default.verbose);
}

var _default = {
  run,
  init: _initCompat.default,
  loadConfig: _config.default
};
exports.default = _default;