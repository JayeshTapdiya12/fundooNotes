"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUserValidator = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
var newUserValidator = exports.newUserValidator = function newUserValidator(req, res, next) {
  // const regex_pattern = "(?=^.{ 8, }$)((?=.*\d)| (?=.*\W +)) (? ![.\n])(?=.* [A - Z])(?=.* [a - z]).* $";

  var schema = _joi["default"].object({
    name: _joi["default"].string().min(4).required(),
    lname: _joi["default"].string().min(4).required(),
    email: _joi["default"].string().email().required(),
    password: _joi["default"].string().min(8).pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required()
  });
  var _schema$validate = schema.validate(req.body),
    error = _schema$validate.error,
    value = _schema$validate.value;
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};