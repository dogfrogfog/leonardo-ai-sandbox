import { Leonardo } from "@leonardo-ai/sdk";

const sdk = new Leonardo({
  security: {
    bearerAuth: process.env.LEONARDO_API_KEY as string,
  },
});

export async function getGenerationByPrompt(prompt: string): Promise<any> {
  try {
    const generationResponse = await sdk.generation.createGeneration({
      prompt,
      modelId: "6bef9f1b-29cb-40c7-b9df-32b51c1f67d3",
      width: 512,
      height: 512,
    });

    const generationId =
      generationResponse.createGeneration200ApplicationJSONObject
        ?.sdGenerationJob?.generationId || null;

    if (generationId) {
      return await new Promise(function (resolve, reject) {
        setTimeout(async () => {
          const generationImagesResponse =
            await sdk.generation.getGenerationById(generationId);

          const generation =
            generationImagesResponse.getGenerationById200ApplicationJSONObject
              ?.generationsByPk;

          resolve(generation);
        }, 10000);
      });
    }
  } catch (e) {
    console.log(e);
  }
}
