import { Redis } from "ioredis";

const getRedisUrl = () => {
	if (process.env.REDIS_URL) return process.env.REDIS_URL;

	return new Error("Redis URL not found");
};

export const redis = new Redis(getRedisUrl() as string);
