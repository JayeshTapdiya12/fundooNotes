import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';


export const getData = async (req, res, next) => {
  try {
    const data = await UserService.getData()
    res.json({
      data: data
    })
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,

      message: ` ${error}`
    });
  }
}

export const sign = async (req, res, next) => {
  try {
    const data = await UserService.sign(req.body);
    // console.log("database details", data)
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,

      message: ` ${error}`
    });
  }
};


export const login = async (req, res, next) => {
  try {
    const data = await UserService.login(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Login successfully'
    });
    console.log(data)
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,

      message: ` ${error}`
    });
  }
}
