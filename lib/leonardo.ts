import { Leonardo } from "@leonardo-ai/sdk";
import {
  GetGenerationById200ApplicationJSONGenerations,
  CreateGeneration200ApplicationJSONSDGenerationOutput,
} from "@leonardo-ai/sdk/dist/sdk/models/operations";

const sdk = new Leonardo({
  security: {
    bearerAuth: process.env.LEONARDO_API_KEY as string,
  },
});

export async function createGeneration(
  prompt: string,
  modelId = "6bef9f1b-29cb-40c7-b9df-32b51c1f67d3",
  width = 512,
  height = 512
): Promise<CreateGeneration200ApplicationJSONSDGenerationOutput | null> {
  try {
    const generationResponse = await sdk.generation.createGeneration({
      prompt,
      modelId,
      width,
      height,
    });

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
