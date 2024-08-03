import { createClient } from 'redis';
import { logger } from './logger';

export const client = createClient();

export const clientRedis = async () => {
    try {
        await client.connect();
        logger.info("redis data base connectd")
    } catch (error) {
        logger.info("coudnt connect to redis database", error)
    }
} 