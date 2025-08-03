"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trash = exports.noteUpdate = exports.noteFind = exports.noteColor = exports.noteArchive = exports.getAllNote = exports.deleteNote = exports.addNote = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _note = _interopRequireDefault(require("../models/note.model"));
var _redis = require("../config/redis");
// getting all the notes
var getAllNote = exports.getAllNote = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
    var data, cacheKey;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log("object");
          _context.next = 3;
          return _note["default"].find({
            createdBy: id
          });
        case 3:
          data = _context.sent;
          cacheKey = "user:".concat(id);
          if (!(data != null)) {
            _context.next = 11;
            break;
          }
          _context.next = 8;
          return _redis.client.set(cacheKey, JSON.stringify(data));
        case 8:
          return _context.abrupt("return", data);
        case 11:
          throw new Error("No Noted been Created till date");
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getAllNote(_x) {
    return _ref.apply(this, arguments);
  };
}();

//  creating new Note

var addNote = exports.addNote = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _note["default"].create(body);
        case 2:
          data = _context2.sent;
          console.log(data);
          return _context2.abrupt("return", data);
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function addNote(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

// get the note only by using id

var noteFind = exports.noteFind = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(creId, id) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          console.log(creId);
          _context3.next = 3;
          return _note["default"].findOne({
            createdBy: creId,
            _id: id
          });
        case 3:
          data = _context3.sent;
          if (!(data != null)) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", data);
        case 8:
          throw new Error("Id is Not Correct or Note not exist");
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function noteFind(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

// update the note by id

var noteUpdate = exports.noteUpdate = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(id, body) {
    var data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _note["default"].findOneAndUpdate({
            createdBy: body.createdBy,
            _id: id
          }, body, {
            "new": true
          });
        case 2:
          data = _context4.sent;
          return _context4.abrupt("return", data);
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function noteUpdate(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

//  delete the note by id

var deleteNote = exports.deleteNote = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(creId, id) {
    var data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _note["default"].findOneAndDelete({
            createdBy: creId,
            _id: id
          });
        case 2:
          data = _context5.sent;
          return _context5.abrupt("return", " ");
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function deleteNote(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

// archive

var noteArchive = exports.noteArchive = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(body, id) {
    var data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _note["default"].findOne({
            createdBy: body.createdBy,
            _id: id
          });
        case 3:
          data = _context6.sent;
          if (data) {
            _context6.next = 6;
            break;
          }
          throw new Error('Note not found');
        case 6:
          data.isArchived = !data.isArchived;
          _context6.next = 9;
          return data.save();
        case 9:
          return _context6.abrupt("return", data);
        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](0);
          throw new Error(_context6.t0);
        case 15:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 12]]);
  }));
  return function noteArchive(_x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

//  trash
var trash = exports.trash = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(body, id) {
    var data;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _note["default"].findOne({
            createdBy: body.createdBy,
            _id: id
          });
        case 3:
          data = _context7.sent;
          if (data) {
            _context7.next = 6;
            break;
          }
          throw new Error('Note not found');
        case 6:
          data.isDeleted = !data.isDeleted;
          _context7.next = 9;
          return data.save();
        case 9:
          return _context7.abrupt("return", data);
        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](0);
          throw new Error(_context7.t0);
        case 15:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 12]]);
  }));
  return function trash(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();
var noteColor = exports.noteColor = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(body, id) {
    var data;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _note["default"].findOneAndUpdate({
            createdBy: body.createdBy,
            _id: id
          }, body, {
            "new": true
          });
        case 3:
          data = _context8.sent;
          return _context8.abrupt("return", data);
        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          throw new Error(_context8.t0);
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return function noteColor(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();