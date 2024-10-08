import Joi from "@hapi/joi";
import HttpStatus from 'http-status-codes';

export const noteValidator = (req, res, next) => {
    console.log("res==================>in validator+++++", res.body)
    const schema = Joi.object({
        title: Joi.string().min(0).max(100).allow('').optional(),
        description: Joi.string().min(0).max(100).allow('').optional(),
        color: Joi.string().allow('').optional()

    });
    const { error, value } = schema.validate(req.body)
    if (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    } else {
        // console.log("heloo from note validator else ===========>", value)

        // res.status(HttpStatus.OK).json({
        //     code: HttpStatus.OK
        // })

        next();

    }

}