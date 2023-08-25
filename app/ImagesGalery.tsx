"use client";
import Image from "next/image";
import { useContext } from "react";
import { GenerationContext } from "./GenerationContext";

export default function ImagesGalery() {
  const { generation, isLoading } = useContext(GenerationContext);

  return (
    <div className="flex flex-col flex-wrap justify-center sm:flex-row gap-4 md:gap-8">
      {isLoading ? (
        <p className="text-xl mb-4 font-semibold">
          Generating images ... please wait
        </p>
      ) : (
        generation?.generatedImages?.map((v: any) => (
          <div className="w-full md:w-[45%] flex justify-center" key={v.id}>
            <Image
              alt={v.id}
              src={v.url}
              height={512}
              width={512}
              className="rounded-2xl shadow-2xl"
            />
          </div>
        ))
      )}
      {!isLoading && generation && (
        <div className="mt-10 text-slate-500 text-sm">
          <p className="text-xl mb-4 font-semibold">Generation JSON</p>
          {JSON.stringify(generation)}
        </div>
      )}
    </div>
  );
}
