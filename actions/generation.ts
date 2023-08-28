import { formSchema } from "@/components/PromptForm/schema";
import { createGeneration, getGeneration } from "@/lib/leonardo";
import { redis } from "@/lib/redis";
import * as z from "zod";

export async function createGenerationAndSaveToRedis(
	params: z.infer<typeof formSchema>,
) {
	"use server";
	try {
		const data = await createGeneration(params);

		if (data) {
			await redis.set(data.generationId as string, JSON.stringify(data));

			return data;
		}
	} catch (e) {
		console.error(e);
	}

	return null;
}

export async function getGenerationAndUpdateRedis(generationId: string) {
	"use server";
	try {
		const data = await getGeneration(generationId);

		if (data) {
			await redis.set(data.id as string, JSON.stringify(data));

			return data;
		}

		return data;
	} catch (e) {
		console.error(e);
	}

	return null;
}
