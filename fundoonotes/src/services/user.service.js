import User from '../models/user.model';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { mailSender } from '../utils/emailhelper';

export const getData = async () => {
  const data = await User.find();
  return data
}

//create new user
export const sign = async (body) => {

  const exist = await User.findOne({ email: body.email })

  if (exist) {
    throw new Error("User already exist ");
  } else {

    // using bcrypt
    const saltRounds = 10;
    const hash_password = await bcrypt.hash(body.password, saltRounds);

    body.password = hash_password
    // creatng a new user
    const data = await User.create(body);

    // console.log(data)
    return data;
  }
};



export const login = async (body) => {

  const data = await User.findOne({ email: body.email });

  if (data == null) {
    throw new Error("Invalid email id")
  } else {
    const isPasswordValid = await bcrypt.compare(body.password, data.password);
    if (isPasswordValid) {
      const token = jwt.sign({ Username: data.name, Email: data.email, userId: data._id }, process.env.hidden_key);
      // console.log("the token is =========================>", token);
      return token;
    } else {
      throw new Error("Invalid  password")
    }

  }

}

export const forgetPassword = async (body) => {
  console.log(body.email)
  const data = await User.findOne({ email: body.email })
  console.log("outside function")
  if (data != null) {
    console.log("inside function")
    const token = jwt.sign({ Username: data.name, Email: data.email, userId: data._id }, process.env.hidden_key);
    await mailSender(data.email, token)
    console.log(token)
    return token;
  } else {
    throw new Error("id NOte find")
  }

}

export const resetPassword = async (body) => {

  const data = await User.findOne({ email: body.Email });
  const saltRounds = 10;
  const hash_password = await bcrypt.hash(body.password, saltRounds);

  data.password = hash_password;
  await data.save()
  return data
}


