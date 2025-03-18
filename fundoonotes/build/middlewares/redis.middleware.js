"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redisMiddleware = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _redis = require("../config/redis");
var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));
var redisMiddleware = exports.redisMiddleware = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var cacheKey, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // const { id } = req.body.userId;
          cacheKey = req.body.createdBy;
          console.log("message===>in redis middle ware", cacheKey);

          // client.get(cacheKey, (err, data) => {
          //     if (err) {
          //         console.error('Redis error:', err);
          //         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          //             code: HttpStatus.INTERNAL_SERVER_ERROR,
          //             message: 'Internal Server Error'
          //         });
          //     }

          //     if (data) {
          //         console.log('Redis data found:', data);
          //         return res.status(HttpStatus.OK).json({
          //             code: HttpStatus.OK,
          //             data: JSON.parse(data),
          //             message: "Data retrieved from Redis"
          //         });
          //     } else {
          //         next();
          //     }

          // }
          // )
          _context.prev = 2;
          _context.next = 5;
          return _redis.client.get(cacheKey);
        case 5:
          data = _context.sent;
          if (!(data != null)) {
            _context.next = 11;
            break;
          }
          console.log('Redis data found:', data);
          return _context.abrupt("return", res.status(_httpStatusCodes["default"].OK).json({
            code: _httpStatusCodes["default"].OK,
            data: JSON.parse(data),
            message: "Data retrieved from Redis"
          }));
        case 11:
          console.log("No data found in Redis, proceeding to next middleware...");
          next();
        case 13:
          _context.next = 20;
          break;
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](2);
          console.error('Redis error:', _context.t0);
          console.log("hello form errero");
          return _context.abrupt("return", res.status(_httpStatusCodes["default"].INTERNAL_SERVER_ERROR).json({
            code: _httpStatusCodes["default"].INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error'
          }));
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 15]]);
  }));
  return function redisMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();