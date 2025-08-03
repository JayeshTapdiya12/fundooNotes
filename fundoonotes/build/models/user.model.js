"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
// import { required } from '@hapi/joi';

var userSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var _default = exports["default"] = (0, _mongoose.model)('User', userSchema);