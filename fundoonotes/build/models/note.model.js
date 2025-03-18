"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = require("@hapi/joi");
var _mongoose = require("mongoose");
var userSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  color: {
    type: String
    // optional
  },
  isArchived: {
    type: Boolean,
    "default": false
  },
  isDeleted: {
    type: Boolean,
    "default": false
  },
  createdBy: {
    type: String
  }
}, {
  timestamps: true
});
var _default = exports["default"] = (0, _mongoose.model)("Note", userSchema);