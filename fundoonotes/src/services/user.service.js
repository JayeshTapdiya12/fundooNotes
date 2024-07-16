import User from '../models/user.model';
import bcrypt from "bcrypt";


export const getData = async () => {
  const data = await User.find();
  return data
}

//create new user
export const newUser = async (body) => {

  const { name, lname, email, password } = body
  const exist = await User.findOne({ email: body.email })

  if (exist) {
    throw new Error("User already exist ")
  } else {

    // using bcrypt
    const saltRounds = 10;
    const hash_password = await bcrypt.hash(password, saltRounds)

    // creatng a new user
    const data = await User.create({ name, lname, email, password: hash_password });

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
      return data
    } else {
      // return "Check your pass and email"
      throw new Error("Invalid  password")
    }
  } else {
    throw new Error("Invalid email id")
  }

}
