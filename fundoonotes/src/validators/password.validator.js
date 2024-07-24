import Joi from "@hapi/joi";

export const resetPasswordValidator = (req, res, next) => {
    const schema = Joi.object({
        password: Joi.string().min(8).pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required()
    })
    const { error, value } = schema.validate(req.body);
    if (error) {
        next(error);
    } else {
        req.validateBody = value;
        next();
    };
}