import Link from "next/link";

const choices = [
  {
    href: "/learn",
    emoji: "📖",
    title: "Learn Words",
    blurb: "Look, listen and learn new words.",
    color: "bg-sky-400 hover:bg-sky-500 ring-sky-200",
  },
  {
    href: "/play",
    emoji: "🎮",
    title: "Play Games",
    blurb: "Have fun with the words you know!",
    color: "bg-pink-400 hover:bg-pink-500 ring-pink-200",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 py-10">
      <h1 className="text-center text-5xl font-black text-indigo-600 sm:text-6xl">📚 Word Buddies</h1>
      <p className="mt-3 text-center text-2xl text-slate-600">What do you want to do today?</p>
      <div className="mt-10 grid w-full gap-6 sm:grid-cols-2">
        {choices.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className={`${c.color} flex flex-col items-center gap-2 rounded-[2rem] p-10 text-center text-white shadow-lg ring-8 transition hover:-translate-y-1 hover:shadow-2xl active:scale-95`}
          >
            <span className="text-8xl" aria-hidden>
              {c.emoji}
            </span>
            <span className="text-4xl font-black">{c.title}</span>
            <span className="text-xl font-semibold opacity-90">{c.blurb}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
