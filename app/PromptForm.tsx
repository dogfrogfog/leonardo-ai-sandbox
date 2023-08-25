"use client";
import { ChangeEvent, useState, useContext } from "react";
import { GenerationContext } from "./GenerationContext";

type Props = {
  createGeneration: (prompt: string) => Promise<any>;
  getGeneration: (generationId: string) => Promise<any>;
};

let RETRIES_COUNT = 0;
const MAX_RETRIES = 5;
const RETRY_DELAY = 7000;

export default function PromptForm({ createGeneration, getGeneration }: Props) {
  const [prompt, setPrompt] = useState("");
  const { isLoading, setGeneration, setIsLoading } =
    useContext(GenerationContext);

  async function checkStatusAndRetry(generationId: string) {
    console.log("generationId: ", generationId);
    if (RETRIES_COUNT < MAX_RETRIES) {
      const result = await getGeneration(generationId);

      if (result.status === "COMPLETE") {
        console.log("Status is COMPLETE:", result);
        setGeneration(result);
        RETRIES_COUNT = 0;
        setIsLoading(false);
      } else {
        console.log("Status is PENDING:", result);
        setTimeout(() => checkStatusAndRetry(generationId), RETRY_DELAY);

        RETRIES_COUNT++;
      }
    } else {
      console.log("RETRIES_COUNT reached");

      RETRIES_COUNT = 0;
      setIsLoading(false);
    }
  }

  const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setPrompt(e.target.value);

  const handleClearClick = () => {
    setPrompt("");
  };

  const handleGenerateClick = async () => {
    setIsLoading(true);

    try {
      const data = await createGeneration(prompt);

      if (data) checkStatusAndRetry(data.generationId);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-16">
      <textarea
        value={prompt}
        onChange={handlePromptChange}
        placeholder="An oil painting of a cat"
        className="p-2 w-full md:w-1/2 h-[100px] rounded disabled:cursor-not-allowed disabled:bg-amber-100"
        disabled={isLoading}
      ></textarea>
      <div className="w-full md:w-1/2">
        <button
          onClick={handleClearClick}
          disabled={isLoading}
          className="transition-all w-full mb-4 p-2 rounded bg-slate-300 font-semibold hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-70"
        >
          clear
        </button>
        <button
          disabled={isLoading}
          onClick={handleGenerateClick}
          className="disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-70 transition-all w-full p-2 rounded bg-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 font-semibold text-white"
        >
          generate
        </button>
      </div>
    </div>
  );
}
