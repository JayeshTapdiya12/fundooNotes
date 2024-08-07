import { createClient } from 'redis';
import logger from './logger';

export const client = createClient();

export const clientRedis = async () => {
    try {
        await client.connect();
        logger.info("redis data base connectd")
    } catch (error) {
        logger.info("coudnt connect to redis database", error)
    }
}
export default clientRedis;

// const getValue = async (key) => {
//     try {
//         const value = await client.get(key);
//         return value;
//     } catch (err) {
//         console.error('Error getting value from Redis:', err);
//     }
// };

// // Function to set a value in Redis
// const setValue = async (key, value) => {
//     try {
//         await client.set(key, value);
//     } catch (err) {
//         console.error('Error setting value in Redis:', err);
//     }
// };