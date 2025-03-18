"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMessage = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var amqp = require('amqplib');
var sendMessage = exports.sendMessage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(userData) {
    var connection, channel, exchange, msg;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return amqp.connect('amqp://localhost');
        case 3:
          connection = _context2.sent;
          _context2.next = 6;
          return connection.createChannel();
        case 6:
          channel = _context2.sent;
          exchange = 'logs';
          msg = JSON.stringify(userData);
          _context2.next = 11;
          return channel.assertExchange(exchange, 'fanout', {
            durable: false
          });
        case 11:
          channel.publish(exchange, '', Buffer.from(msg));
          console.log(" the user register id:", msg);
          setTimeout(/*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return channel.close();
                case 2:
                  _context.next = 4;
                  return connection.close();
                case 4:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          })), 500);
          _context2.next = 19;
          break;
        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.error("Error:", _context2.t0);
        case 19:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 16]]);
  }));
  return function sendMessage(_x) {
    return _ref.apply(this, arguments);
  };
}();
sendMessage();