"use client";

export default function PromptForm() {
  return (
    <div className="flex gap-4 mb-24">
      <textarea
        placeholder="An oil painting of a cat"
        className="p-2 w-1/2 h-[100px]"
      ></textarea>
      <div className="w-1/2">
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
