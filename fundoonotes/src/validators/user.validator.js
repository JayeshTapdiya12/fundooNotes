import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {

  // const regex_pattern = "(?=^.{ 8, }$)((?=.*\d)| (?=.*\W +)) (? ![.\n])(?=.* [A - Z])(?=.* [a - z]).* $";

  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    lname: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
