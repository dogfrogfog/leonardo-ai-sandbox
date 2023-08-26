"use client";
import { ChangeEvent, useState, useContext } from "react";
import { GenerationContext } from "./GenerationContext";

type Props = {
  createGeneration: (prompt: string, model: string) => Promise<any>;
  getGeneration: (generationId: string) => Promise<any>;
};

let RETRIES_COUNT = 0;
const MAX_RETRIES = 5;
const RETRY_DELAY = 7000;

const MODELS = {
  "Leonardo Creative": "6bef9f1b-29cb-40c7-b9df-32b51c1f67d3",
  "Leonardo Select": "cd2b2a15-9760-4174-a5ff-4d2925057376",
  "Leonardo Signature": "291be633-cb24-434f-898f-e662799936ad",
  "3D Animation Style": "d69c8273-6b17-4a30-a13e-d6637ae1c644",
  "Vintage Style Photography": "17e4edbf-690b-425d-a466-53c816f0de8a",
};

export default function PromptForm({ createGeneration, getGeneration }: Props) {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState(MODELS["3D Animation Style"]);
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

  const handleModelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setModel(e.target.value);
  };

  const handleClearClick = () => {
    setPrompt("");
  };

  const handleGenerateClick = async () => {
    setIsLoading(true);

    try {
      const data = await createGeneration(prompt, model);

      if (data) checkStatusAndRetry(data.generationId);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-16">
      <div className="w-full md:w-1/2">
        <textarea
          value={prompt}
          onChange={handlePromptChange}
          placeholder="An oil painting of a cat"
          className="p-2 w-full h-[100px] rounded disabled:cursor-not-allowed disabled:bg-amber-100"
          disabled={isLoading}
        ></textarea>
        <label>
          model:
          {/* todo: cloud tags style select */}
          <select
            onChange={handleModelChange}
            disabled={isLoading}
            className="transition-all w-full mb-4 p-2 rounded bg-slate-100 font-semibold disabled:cursor-not-allowed disabled:opacity-70"
          >
            {Object.entries(MODELS).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </select>
        </label>
      </div>
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
