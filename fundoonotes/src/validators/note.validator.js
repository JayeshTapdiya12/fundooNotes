import Joi from "@hapi/joi";
import HttpStatus from 'http-status-codes';

export const noteValidator = (req, res, next) => {

    const schema = Joi.object({
        title: Joi.string().min(0).max(100).optional(),
        description: Joi.string().min(0).max(100).optional(),
        color: Joi.string().optional()

    });
    const { error, value } = schema.validate(req.body)
    if (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_GATEWAY,
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