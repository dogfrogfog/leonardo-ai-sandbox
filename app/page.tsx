import Image from "next/image";
import PromptForm from "./PromptForm";

const testLeonardoRes = {
  generations_by_pk: {
    generated_images: [
      {
        url: "https://cdn.leonardo.ai/users/eaedaca1-ddc9-4ba8-8e04-54f5efbd2cc3/generations/df5f5301-f773-4da1-9d79-8546efa071f4/Leonardo_Creative_An_oil_painting_of_a_cat_0.jpg",
        nsfw: false,
        id: "f2f28ac0-0130-435e-a267-2e7307dfdcb0",
        likeCount: 0,
        generated_image_variation_generics: [],
      },
      {
        url: "https://cdn.leonardo.ai/users/eaedaca1-ddc9-4ba8-8e04-54f5efbd2cc3/generations/df5f5301-f773-4da1-9d79-8546efa071f4/Leonardo_Creative_An_oil_painting_of_a_cat_1.jpg",
        nsfw: false,
        id: "0e81e6ad-e89f-4037-9cf2-8ee418fc4398",
        likeCount: 0,
        generated_image_variation_generics: [],
      },
      {
        url: "https://cdn.leonardo.ai/users/eaedaca1-ddc9-4ba8-8e04-54f5efbd2cc3/generations/df5f5301-f773-4da1-9d79-8546efa071f4/Leonardo_Creative_An_oil_painting_of_a_cat_2.jpg",
        nsfw: false,
        id: "ee81c2cf-3606-4eca-8187-55d33dbcdeb4",
        likeCount: 0,
        generated_image_variation_generics: [],
      },
      {
        url: "https://cdn.leonardo.ai/users/eaedaca1-ddc9-4ba8-8e04-54f5efbd2cc3/generations/df5f5301-f773-4da1-9d79-8546efa071f4/Leonardo_Creative_An_oil_painting_of_a_cat_3.jpg",
        nsfw: false,
        id: "6082acf4-ce7c-4494-8453-d791933c6e68",
        likeCount: 0,
        generated_image_variation_generics: [],
      },
    ],
    modelId: "6bef9f1b-29cb-40c7-b9df-32b51c1f67d3",
    prompt: "An oil painting of a cat",
    negativePrompt: "",
    imageHeight: 450,
    imageWidth: 450,
    inferenceSteps: 30,
    seed: 205503488,
    public: false,
    scheduler: "EULER_DISCRETE",
    sdVersion: "v2",
    status: "COMPLETE",
    presetStyle: null,
    initStrength: null,
    guidanceScale: 7,
    id: "df5f5301-f773-4da1-9d79-8546efa071f4",
    createdAt: "2023-08-20T13:05:35.011",
  },
};

export default function Home() {
  const { generated_images, imageHeight, imageWidth } =
    testLeonardoRes?.generations_by_pk;

  return (
    <section>
      <PromptForm />
      <div className="flex flex-col flex-wrap sm:flex-row gap-4 md:gap-8">
        {generated_images.map((v) => (
          <div className="w-full md:w-[45%] flex justify-center" key={v.id}>
            <Image
              alt={v.id}
              src={v.url}
              height={imageHeight}
              width={imageWidth}
              className="rounded-2xl shadow-2xl"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
