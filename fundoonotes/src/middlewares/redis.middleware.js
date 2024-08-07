import { redisClient, client } from '../config/redis';
import HttpStatus from 'http-status-codes';

export const redisMiddleware = async (req, res, next) => {
    // const { id } = req.body.userId;
    const cacheKey = req.body.createdBy;

    console.log("message===>in redis middle ware", cacheKey)

    // client.get(cacheKey, (err, data) => {
    //     if (err) {
    //         console.error('Redis error:', err);
    //         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //             code: HttpStatus.INTERNAL_SERVER_ERROR,
    //             message: 'Internal Server Error'
    //         });
    //     }

    //     if (data) {
    //         console.log('Redis data found:', data);
    //         return res.status(HttpStatus.OK).json({
    //             code: HttpStatus.OK,
    //             data: JSON.parse(data),
    //             message: "Data retrieved from Redis"
    //         });
    //     } else {
    //         next();
    //     }


    // }
    // )

    try {
        const data = await client.get(cacheKey);

        if (data != null) {
            console.log('Redis data found:', data);
            return res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: JSON.parse(data),
                message: "Data retrieved from Redis"
            });
        } else {
            console.log("No data found in Redis, proceeding to next middleware...");
            next();
        }
    } catch (err) {
        console.error('Redis error:', err);
        console.log("hello form errero")
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error'
        });
    }

}