"use client";
import { useGenerationContext } from "@/components/GenerationContext";
import { MAX_RETRIES, MODELS_MAP, RETRY_DELAY } from "@/consts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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

import { formSchema } from "./schema";

let RETRIES_COUNT = 0;

type Props = {
  createGeneration: (values: z.infer<typeof formSchema>) => Promise<any>;
  getGeneration: (generationId: string) => Promise<any>;
};

export default function PromptForm({ createGeneration, getGeneration }: Props) {
  const { isLoading, setGeneration, setIsLoading } = useGenerationContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      prompt: "",
      modelId: MODELS_MAP["3D Animation Style"],
      guidanceScale: 7,
      height: 512,
      width: 512,
      negativePrompt: "",
      promptMagic: false,
    },
  });

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const data = await createGeneration(values);
      if (data) checkStatusAndRetry(data.generationId);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prompt</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoading}
                  placeholder="Type a prompt ..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="negativePrompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Negative Prompt</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoading}
                  placeholder="Type what you don’t want to see in the image (a negative prompt)..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="modelId"
          render={({ field, ...rest }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <Select
                disabled={isLoading}
                {...field}
                onValueChange={(v) => field.onChange(v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Models</SelectLabel>
                    {Object.entries(MODELS_MAP).map(([key, value]) => (
                      <SelectItem key={value} value={value}>
                        {key}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <div className="flex flex-grow gap-4">
          <FormField
            control={form.control}
            name="width"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Width</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    min={32}
                    max={1024}
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Must be between a multiple of 8.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    min={32}
                    max={1024}
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Must be between a multiple of 8.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="guidanceScale"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guidance Scale</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  min={1}
                  max={20}
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                How strongly the generation should reflect the prompt.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="promptMagic"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-4 items-center">
                <FormLabel>Use Prompt Magic</FormLabel>
                <FormControl>
                  <Checkbox
                    id="promptMagic"
                    className="!mt-0"
                    disabled={isLoading}
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </FormControl>
              </div>
              <FormMessage />
              <FormDescription>
                At the moment API param has type "boolean" and it is not
                customizable unlike leonardo.ai app, where there are multiple
                options to customize.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit" className="w-full">
          Generate
        </Button>
        <Button
          disabled={isLoading}
          variant="outline"
          type="submit"
          className="w-full"
          onClick={() => form.reset()}
        >
          Reset to default
        </Button>
      </form>
    </Form>
  );
}
