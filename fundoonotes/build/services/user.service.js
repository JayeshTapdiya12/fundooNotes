"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sign = exports.resetPassword = exports.login = exports.getData = exports.forgetPassword = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _user = _interopRequireDefault(require("../models/user.model"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _emailhelper = require("../utils/emailhelper");
var _producer = require("../utils/producer");
var getData = exports.getData = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _user["default"].find();
        case 2:
          data = _context.sent;
          return _context.abrupt("return", data);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getData() {
    return _ref.apply(this, arguments);
  };
}();

//create new user
var sign = exports.sign = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var exist, saltRounds, hash_password, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _user["default"].findOne({
            email: body.email
          });
        case 2:
          exist = _context2.sent;
          if (!exist) {
            _context2.next = 7;
            break;
          }
          throw new Error("User already exist ");
        case 7:
          // using bcrypt
          saltRounds = 10;
          _context2.next = 10;
          return _bcrypt["default"].hash(body.password, saltRounds);
        case 10:
          hash_password = _context2.sent;
          body.password = hash_password;
          // creatng a new user
          _context2.next = 14;
          return _user["default"].create(body);
        case 14:
          data = _context2.sent;
          _context2.next = 17;
          return (0, _producer.sendMessage)(data);
        case 17:
          return _context2.abrupt("return", data);
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function sign(_x) {
    return _ref2.apply(this, arguments);
  };
}();
var login = exports.login = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(body) {
    var data, isPasswordValid, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _user["default"].findOne({
            email: body.email
          });
        case 2:
          data = _context3.sent;
          if (!(data == null)) {
            _context3.next = 7;
            break;
          }
          throw new Error("Invalid email id");
        case 7:
          _context3.next = 9;
          return _bcrypt["default"].compare(body.password, data.password);
        case 9:
          isPasswordValid = _context3.sent;
          if (!isPasswordValid) {
            _context3.next = 15;
            break;
          }
          token = _jsonwebtoken["default"].sign({
            Username: data.name,
            Email: data.email,
            userId: data._id
          }, process.env.hidden_key); // console.log("the token is =========================>", token);
          return _context3.abrupt("return", token);
        case 15:
          throw new Error("Invalid  password");
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function login(_x2) {
    return _ref3.apply(this, arguments);
  };
}();
var forgetPassword = exports.forgetPassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(body) {
    var data, token;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          console.log(body.email);
          _context4.next = 3;
          return _user["default"].findOne({
            email: body.email
          });
        case 3:
          data = _context4.sent;
          console.log("outside function");
          if (!(data != null)) {
            _context4.next = 14;
            break;
          }
          console.log("inside function");
          token = _jsonwebtoken["default"].sign({
            Username: data.name,
            Email: data.email,
            userId: data._id
          }, process.env.hidden_key);
          _context4.next = 10;
          return (0, _emailhelper.mailSender)(data.email, token);
        case 10:
          console.log(token);
          return _context4.abrupt("return", token);
        case 14:
          throw new Error("id NOte find");
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function forgetPassword(_x3) {
    return _ref4.apply(this, arguments);
  };
}();
var resetPassword = exports.resetPassword = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(body) {
    var data, saltRounds, hash_password;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _user["default"].findOne({
            email: body.Email
          });
        case 2:
          data = _context5.sent;
          saltRounds = 10;
          _context5.next = 6;
          return _bcrypt["default"].hash(body.password, saltRounds);
        case 6:
          hash_password = _context5.sent;
          data.password = hash_password;
          _context5.next = 10;
          return data.save();
        case 10:
          return _context5.abrupt("return", data);
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function resetPassword(_x4) {
    return _ref5.apply(this, arguments);
  };
}();