import User from '../models/user.model';



//create new user
export const newUser = async (body) => {
  const data = await User.create(body);
  console.log(data)
  return data;
};

