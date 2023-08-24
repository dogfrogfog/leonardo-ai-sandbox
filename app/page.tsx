import PromptForm from "./PromptForm";
import { redis } from "@/lib/redis";
import { getGenerationByPrompt } from "@/lib/leonardo";

import ImagesGalery from "./ImagesGalery";

export default function Home() {
  async function generateImages(prompt: string) {
    "use server";
    const data = await getGenerationByPrompt(prompt);

    await redis.set(data.id, JSON.stringify(data));

    return data;
  }

  return (
    <section>
      <PromptForm generateImages={generateImages} />
      <ImagesGalery />
    </section>
  );
}
