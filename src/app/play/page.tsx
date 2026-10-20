import Link from "next/link";
import BackHome from "@/components/BackHome";

const games = [
  {
    href: "/play/whack-a-word",
    emoji: "🔨",
    title: "Whack-a-Word",
    blurb: "Whack the mole holding the word that matches the picture!",
  },
];

export default function Play() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <BackHome />
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-black text-pink-500">🎮 Play Games</h1>
        <p className="mt-3 text-xl text-slate-600">Pick a game to play!</p>
      </header>
      <section className="grid gap-6 sm:grid-cols-2">
        {games.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            className="flex flex-col items-center gap-2 rounded-3xl bg-white p-8 text-center shadow-md ring-4 ring-pink-200 transition hover:-translate-y-1 hover:shadow-xl active:scale-95"
          >
            <span className="text-7xl" aria-hidden>
              {g.emoji}
            </span>
            <span className="text-3xl font-extrabold text-pink-600">{g.title}</span>
            <span className="text-lg text-slate-600">{g.blurb}</span>
          </Link>
        ))}
        <div className="flex flex-col items-center justify-center gap-2 rounded-3xl border-4 border-dashed border-slate-300 p-8 text-center text-slate-400">
          <span className="text-6xl" aria-hidden>
            🧩
          </span>
          <span className="text-2xl font-bold">More games coming soon!</span>
        </div>
      </section>
    </main>
  );
}
