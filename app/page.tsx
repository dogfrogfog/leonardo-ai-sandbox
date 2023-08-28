import PromptForm from "@/components/PromptForm";
import ImagesGalery from "../components/ImagesGalery";

import {
  createGenerationAndSaveToRedis,
  getGenerationAndUpdateRedis,
} from "@/actions/generation";

export default function Home() {
  return (
    <section className="flex flex-grow flex-col md:flex-row gap-16">
      <div className="w-full md:w-1/4">
        <PromptForm
          createGeneration={createGenerationAndSaveToRedis}
          getGeneration={getGenerationAndUpdateRedis}
        />
      </div>
      <div className="w-full md:w-3/4">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Generated images
        </h2>
        <ImagesGalery />
      </div>
    </section>
  );
}
