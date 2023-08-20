"use client";

export default function PromptForm() {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-16">
      <textarea
        placeholder="An oil painting of a cat"
        className="p-2 w-full md:w-1/2 h-[100px] rounded"
      ></textarea>
      <div className="w-full md:w-1/2">
        <button className="transition-all w-full mb-4 p-2 rounded bg-slate-300 font-semibold hover:scale-105">
          clear
        </button>
        <button className="transition-all w-full p-2 rounded bg-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 font-semibold text-white">
          generate
        </button>
      </div>
    </div>
  );
}
