"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userAuth = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
// import { Http } from 'winston/lib/winston/transports';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
// export const userAuth = async (req, res, next) => {
//   try {
//     let bearerToken = req.header('Authorization');
//     if (!bearerToken)
//       throw {
//         code: HttpStatus.BAD_REQUEST,
//         message: 'Authorization token is required'
//       };
//     // console.log("bereaer toekn befroe split ========>", bearerToken)

//     bearerToken = bearerToken.split(' ')[1];
//     // console.log("bereaer toekn after split ========>", bearerToken)

//     const user = await jwt.verify(bearerToken, process.env.hidden_key);
//     req.body.createdBy = user.userId
//     req.body.Email = user.Email
//     console.log(user.userId)

//     next();
//   } catch (error) {

//     res.status(HttpStatus.UNAUTHORIZED).json({
//       code: HttpStatus.UNAUTHORIZED,
//       message: `${error}`
//     })
//   }
// };

var userAuth = exports.userAuth = function userAuth(secretKey) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var bearerToken, userDetails;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            bearerToken = req.header('Authorization');
            console.log('bearerToken before splitting----->', bearerToken);
            if (bearerToken) {
              _context.next = 5;
              break;
            }
            throw {
              code: _httpStatusCodes["default"].BAD_REQUEST,
              message: 'Authorization token is required'
            };
          case 5:
            bearerToken = bearerToken.split(' ')[1];
            console.log('bearerToken after splitting---->', bearerToken);
            userDetails = _jsonwebtoken["default"].verify(bearerToken, secretKey);
            req.body.createdBy = userDetails.userId;
            // req.body.userId = userDetails.userId

            console.log("message in authmiddle=====>", req.body.createdBy);
            req.body.Email = userDetails.Email;
            console.log("email", req.body.Email);
            next();
            _context.next = 18;
            break;
          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            next(_context.t0);
          case 18:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 15]]);
    }));
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
};