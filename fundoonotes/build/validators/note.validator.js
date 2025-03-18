"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noteValidator = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));
var noteValidator = exports.noteValidator = function noteValidator(req, res, next) {
  console.log("res==================>in validator+++++", res.body);
  var schema = _joi["default"].object({
    title: _joi["default"].string().min(0).max(100).allow('').optional(),
    description: _joi["default"].string().min(0).max(100).allow('').optional(),
    color: _joi["default"].string().allow('').optional()
  });
  var _schema$validate = schema.validate(req.body),
    error = _schema$validate.error,
    value = _schema$validate.value;
  if (error) {
    res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
      code: _httpStatusCodes["default"].BAD_REQUEST,
      message: "".concat(error)
    });
  } else {
    // console.log("heloo from note validator else ===========>", value)

    // res.status(HttpStatus.OK).json({
    //     code: HttpStatus.OK
    // })

    next();
  }
};