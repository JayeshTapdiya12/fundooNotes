import User from '../models/user.model';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    console.log(data)
    return data;
  }
};



export const login = async (body) => {

  const data = await User.findOne({ email: body.email });

  if (data != null) {
    if
      // (body.password == data.password)
      (bcrypt.compare(body.password, data.password)) {
      const token = jwt.sign({ Username: data.name, Email: data.email, userId: data._id }, process.env.hidden_key);
      console.log("the token is =========================>", token);
      return token;
    } else {
      // return "Check your pass and email"
      throw new Error("Invalid  password")
    }
  } else {
    throw new Error("Invalid email id")
  }

}
