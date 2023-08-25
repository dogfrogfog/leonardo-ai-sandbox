import PromptForm from "./PromptForm";
import { redis } from "@/lib/redis";
import { createGeneration, getGeneration } from "@/lib/leonardo";

import ImagesGalery from "./ImagesGalery";

async function createGenerationAndSaveToRedis(prompt: string, model: string) {
  "use server";
  try {
    const data = await createGeneration(prompt, model);

    if (data) {
      await redis.set(data.generationId as string, JSON.stringify(data));

      return data;
    }
  } catch (e) {
    console.error(e);
  }

  return null;
}

async function getGenerationAndUpdateRedis(generationId: string) {
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

export default function Home() {
  return (
    <section>
      <PromptForm
        createGeneration={createGenerationAndSaveToRedis}
        getGeneration={getGenerationAndUpdateRedis}
      />
      <ImagesGalery />
    </section>
  );
}
