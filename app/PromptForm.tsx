"use client";
import { ChangeEvent, useState, useContext } from "react";
import { GenerationContext } from "./GenerationContext";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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

  const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleModelChange = (value: string) => {
    setModel(value);
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
    <div className="flex flex-col md:flex-row gap-8 mb-16">
      <div className="w-full md:w-4/5">
        <Textarea
          value={prompt}
          onChange={handlePromptChange}
          placeholder="An oil painting of a cat"
          className="mb-4 w-full h-[100px] disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isLoading}
        />
        <Select onValueChange={handleModelChange}>
          <SelectTrigger className="w-full md:w-[300px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Models</SelectLabel>
              {Object.entries(MODELS).map(([key, value]) => (
                <SelectItem key={value} value={value}>
                  {key}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full flex flex-col gap-4 md:w-1/5">
        <Button
          className="w-full"
          onClick={handleClearClick}
          disabled={isLoading}
          variant="outline"
        >
          clear
        </Button>
        <Button
          className="w-full"
          disabled={isLoading}
          onClick={handleGenerateClick}
        >
          generate
        </Button>
      </div>
    </div>
  );
}
