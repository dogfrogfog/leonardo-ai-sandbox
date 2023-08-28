"use client";
import Image from "next/image";
import { useContext } from "react";
import { GenerationContext } from "./GenerationContext";

export default function ImagesGalery() {
  const { generation, isLoading } = useContext(GenerationContext);

  return (
    <div className="flex flex-col justify-center  gap-4 overflow-hidden md:flex-row md:flex-wrap">
      {isLoading ? (
        <p className="text-xl font-semibold">
          Generating images ... please wait
        </p>
      ) : (
        <div className="flex gap-4 flex-col md:flex-row flex-wrap items-center justify-center">
          {generation?.generatedImages?.map((v: any) => (
            <div className="md:w-[45%]" key={v.id}>
              <Image
                alt={v.id}
                src={v.url}
                height={generation.imageHeight}
                width={generation.imageWidth}
                className="mx-auto rounded shadow-2xl"
              />
            </div>
          ))}
        </div>
      )}
      {!isLoading && generation && (
        <div className="text-white mt-16 col-span-2 overflow-hidden">
          <p className="text-xl mb-4 font-semibold">Generation JSON</p>
          <p className="text-sm">{JSON.stringify(generation)}</p>
        </div>
      )}
    </div>
  );
}
