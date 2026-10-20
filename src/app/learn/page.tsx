import BackHome from "@/components/BackHome";
import WordCard from "@/components/WordCard";
import { words } from "@/data/words";

export default function Learn() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <BackHome />
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-black text-indigo-600">📖 Learn Words</h1>
        <p className="mt-3 text-xl text-slate-600">
          Tap a card to hear the word and learn what it means!
        </p>
      </header>
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {words.map((w) => (
          <WordCard key={w.word} word={w} />
        ))}
      </section>
    </main>
  );
}
