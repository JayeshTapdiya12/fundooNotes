import User from '../models/user.model';


export const getData = async () => {
  const data = await User.find();
  return data
}

//create new user
export const newUser = async (body) => {
  const exist = await User.findOne({ email: body.email })
  if (exist) {
    throw new Error("User already exist ")
  } else {
    const data = await User.create(body);
    console.log(data)
    return data;
  }
};

export const login = async (body) => {

  const data = await User.findOne({ email: body.email });
  if (data != null) {
    if (body.password == data.password) {
      return data
    } else {
      // return "Check your pass and email"
      throw new Error("Invalid  password")
    }
  } else {
    throw new Error("Invalid email id")
  }

}
