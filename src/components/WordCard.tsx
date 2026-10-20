"use client";

import type { Word } from "@/data/words";

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

export default function WordCard({ word }: { word: Word }) {
  return (
    <article className="flex flex-col items-center gap-3 rounded-3xl bg-white p-6 text-center shadow-md ring-4 ring-amber-200 transition hover:-translate-y-1 hover:shadow-xl">
      <span className="text-7xl" aria-hidden>
        {word.emoji}
      </span>
      <h2 className="text-3xl font-extrabold text-indigo-700">{word.word}</h2>
      <p className="text-lg text-slate-700">{word.meaning}</p>
      <p className="text-base italic text-slate-500">“{word.example}”</p>
      <button
        onClick={() => speak(`${word.word}. ${word.example}`)}
        className="mt-auto rounded-full bg-pink-500 px-5 py-2 text-lg font-bold text-white hover:bg-pink-600 active:scale-95"
      >
        🔊 Hear it
      </button>
    </article>
  );
}
