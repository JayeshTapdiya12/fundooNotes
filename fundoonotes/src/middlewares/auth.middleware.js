import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
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



export const userAuth = (secretKey) => {
  return async (req, res, next) => {
    try {
      let bearerToken = req.header('Authorization');
      console.log('bearerToken before splitting----->', bearerToken);

      if (!bearerToken) {
        throw {
          code: HttpStatus.BAD_REQUEST,
          message: 'Authorization token is required'
        };
      }

      bearerToken = bearerToken.split(' ')[1];
      console.log('bearerToken after splitting---->', bearerToken);

      let userDetails = jwt.verify(bearerToken, secretKey);
      req.body.createdBy = userDetails.userId;
      // req.body.userId = userDetails.userId

      console.log("message in authmiddle=====>", req.body.createdBy)
      req.body.Email = userDetails.Email;
      console.log("email", req.body.Email)
      next();
    } catch (error) {
      next(error);
    }
  };
};



