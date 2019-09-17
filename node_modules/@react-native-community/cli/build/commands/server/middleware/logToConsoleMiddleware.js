'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let cache = [];
let timer;

const log = ({
  level,
  data,
  id
}) => {
  const logFunction = level !== 'trace' && console[level] ? level : 'log';
  const color = level === 'error' ? 'red' : level === 'warn' ? 'yellow' : 'white';
  console[logFunction].apply(console, [_chalk().default.inverse[color].bold(` ${level.toUpperCase()} `), ...data]);
}; // Hold messages and flush them to reduce the amount of out-of-order logs


const flush = () => {
  timer = null;
  cache.sort((a, b) => a.id - b.id).forEach(log);
  cache = [];
};

var _default = (req, res, next) => {
  if (req.url === '/log-to-console') {
    cache.push(JSON.parse(req.rawBody));

    if (!timer) {
      timer = setTimeout(flush, 200);
    }

    res.end('OK');
  } else {
    next();
  }
};

exports.default = _default;