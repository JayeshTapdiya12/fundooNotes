"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPasswordValidator = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
var resetPasswordValidator = exports.resetPasswordValidator = function resetPasswordValidator(req, res, next) {
  var schema = _joi["default"].object({
    password: _joi["default"].string().min(8).pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required()
  });
  var _schema$validate = schema.validate(req.body),
    error = _schema$validate.error,
    value = _schema$validate.value;
  if (error) {
    next(error);
  } else {
    req.validateBody = value;
    next();
  }
  ;
};