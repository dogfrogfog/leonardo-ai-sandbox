import { formSchema } from "@/components/PromptForm/schema";
import { Leonardo } from "@leonardo-ai/sdk";
import {
  CreateGeneration200ApplicationJSONSDGenerationOutput,
  GetGenerationById200ApplicationJSONGenerations,
} from "@leonardo-ai/sdk/dist/sdk/models/operations";
import * as z from "zod";

const sdk = new Leonardo({
  security: {
    bearerAuth: process.env.LEONARDO_API_KEY as string,
  },
});

export async function createGeneration(
  params: z.infer<typeof formSchema>
): Promise<CreateGeneration200ApplicationJSONSDGenerationOutput | null> {
  try {
    const generationResponse = await sdk.generation.createGeneration(params);

    const generationId =
      generationResponse.createGeneration200ApplicationJSONObject
        ?.sdGenerationJob || null;

    return generationId;
  } catch (e) {
    console.error(e);
  }

  return null;
}

export async function getGeneration(
  generationId: string
): Promise<GetGenerationById200ApplicationJSONGenerations | null> {
  try {
    const generationImagesResponse = await sdk.generation.getGenerationById(
      generationId
    );

    const generation =
      generationImagesResponse.getGenerationById200ApplicationJSONObject
        ?.generationsByPk || null;

    return generation;
  } catch (e) {
    console.error(e);
  }

  return null;
}
