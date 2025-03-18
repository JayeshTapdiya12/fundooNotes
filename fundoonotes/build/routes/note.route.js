"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var NoteController = _interopRequireWildcard(require("../controllers/note.controllers"));
var _note2 = require("../validators/note.validator");
var _auth = require("../middlewares/auth.middleware");
var _redis = require("../middlewares/redis.middleware");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var router = _express["default"].Router();

// getting all note
router.get('', (0, _auth.userAuth)(process.env.hidden_key), _redis.redisMiddleware, NoteController.getAllNote);

//adding note
router.post('', _note2.noteValidator, (0, _auth.userAuth)(process.env.hidden_key), NoteController.addNote);

//making for archived note
router.post('/:_id/archived', (0, _auth.userAuth)(process.env.hidden_key), NoteController.noteArchive);

// making for trash
router.post('/:_id/trash', (0, _auth.userAuth)(process.env.hidden_key), NoteController.trash);

//get note by id
router.get('/:_id', (0, _auth.userAuth)(process.env.hidden_key), NoteController.noteFind);

//update data
router.put('/:_id', (0, _auth.userAuth)(process.env.hidden_key), NoteController.noteUpdate);

// updateding color
router.patch('/:_id/color', _note2.noteValidator, (0, _auth.userAuth)(process.env.hidden_key), NoteController.noteColor);

//delete data
router["delete"]('/:_id', (0, _auth.userAuth)(process.env.hidden_key), NoteController.deleteNote);
var _default = exports["default"] = router;