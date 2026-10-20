"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { words, type Word } from "@/data/words";
import { speak } from "@/lib/speak";

const HOLES = 9;
const ROUND_SECONDS = 45;
const MAX_MOLES_UP = 3;
const SPAWN_GAP_MS = 650;
const BEST_KEY = "word-buddies:whack-best";

type Mole = {
  id: number;
  word: Word;
  until: number;
  status: "up" | "hit" | "miss";
};

type Phase = "ready" | "playing" | "over";

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function pickTarget(current?: Word): Word {
  return randomItem(words.filter((w) => w !== current));
}

function readBest(): number {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveBest(score: number) {
  try {
    localStorage.setItem(BEST_KEY, String(score));
  } catch {}
}

export default function WhackAWord() {
  const [phase, setPhase] = useState<Phase>("ready");
  const [holes, setHoles] = useState<(Mole | null)[]>(() => Array(HOLES).fill(null));
  const [target, setTarget] = useState<Word>(words[0]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [best, setBest] = useState(0);
  const [feedback, setFeedback] = useState("");

  // Refs hold the live game state so the timers never read stale values.
  const holesRef = useRef(holes);
  const targetRef = useRef(target);
  const scoreRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const nextIdRef = useRef(1);

  const updateHoles = useCallback((next: (Mole | null)[]) => {
    holesRef.current = next;
    setHoles(next);
  }, []);

  useEffect(() => setBest(readBest()), []);

  const start = () => {
    const first = pickTarget();
    targetRef.current = first;
    setTarget(first);
    scoreRef.current = 0;
    setScore(0);
    setTimeLeft(ROUND_SECONDS);
    setFeedback("");
    lastSpawnRef.current = 0;
    updateHoles(Array(HOLES).fill(null));
    setPhase("playing");
  };

  // Game loop: hide moles whose time is up and pop new ones out of empty holes.
  useEffect(() => {
    if (phase !== "playing") return;
    const tick = setInterval(() => {
      const now = Date.now();
      const next = holesRef.current.map((m) => (m && m.until > now ? m : null));
      const upCount = next.filter((m) => m?.status === "up").length;
      const empty = next.flatMap((m, i) => (m ? [] : [i]));

      if (upCount < MAX_MOLES_UP && empty.length && now - lastSpawnRef.current > SPAWN_GAP_MS) {
        const onBoard = new Set(next.map((m) => m?.word));
        const target = targetRef.current;
        const word =
          !onBoard.has(target) && Math.random() < 0.7
            ? target
            : randomItem(words.filter((w) => w !== target && !onBoard.has(w)));
        // Moles get a little quicker as the score climbs.
        const upTime = Math.max(1100, 1800 - scoreRef.current * 8);
        next[randomItem(empty)] = { id: nextIdRef.current++, word, until: now + upTime, status: "up" };
        lastSpawnRef.current = now;
      }
      updateHoles(next);
    }, 150);
    return () => clearInterval(tick);
  }, [phase, updateHoles]);

  // Round countdown.
  useEffect(() => {
    if (phase !== "playing") return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t > 1) return t - 1;
        setPhase("over");
        return 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "over") return;
    updateHoles(Array(HOLES).fill(null));
    if (scoreRef.current > readBest()) {
      saveBest(scoreRef.current);
      setBest(scoreRef.current);
    }
  }, [phase, updateHoles]);

  const whack = (index: number) => {
    const mole = holesRef.current[index];
    if (phase !== "playing" || !mole || mole.status !== "up") return;
    const now = Date.now();
    const next = [...holesRef.current];

    if (mole.word === targetRef.current) {
      next[index] = { ...mole, status: "hit", until: now + 450 };
      scoreRef.current += 10;
      setScore(scoreRef.current);
      setFeedback(randomItem(["Great job! 🎉", "You got it! ⭐", "Super! 🌟", "Awesome! 🥳"]));
      const newTarget = pickTarget(mole.word);
      targetRef.current = newTarget;
      setTarget(newTarget);
    } else {
      next[index] = { ...mole, status: "miss", until: now + 450 };
      setFeedback(`Oops! That one says “${mole.word.word}” ${mole.word.emoji}`);
    }
    updateHoles(next);
  };

  return (
    <section className="mt-4 flex flex-col items-center text-center">
      <h1 className="text-4xl font-black text-pink-500 sm:text-5xl">🔨 Whack-a-Word</h1>

      {phase === "ready" && (
        <div className="mt-8 flex flex-col items-center gap-4 rounded-3xl bg-white p-8 shadow-md ring-4 ring-pink-200">
          <span className="text-7xl" aria-hidden>🐹</span>
          <p className="max-w-md text-xl text-slate-700">
            Look at the picture at the top. Whack the mole holding the <b>word</b> that matches it!
          </p>
          <p className="text-lg text-slate-500">You have {ROUND_SECONDS} seconds.</p>
          {best > 0 && <p className="text-lg font-bold text-amber-600">🏆 Best score: {best}</p>}
          <button onClick={start} className="rounded-full bg-pink-500 px-8 py-3 text-2xl font-black text-white shadow hover:bg-pink-600 active:scale-95">
            ▶ Start!
          </button>
        </div>
      )}

      {phase === "playing" && (
        <>
          <div className="mt-4 flex w-full items-center justify-between gap-2 text-xl font-bold sm:text-2xl">
            <span className="rounded-full bg-white px-4 py-1 shadow">⭐ {score}</span>
            <span className={`rounded-full bg-white px-4 py-1 shadow ${timeLeft <= 10 ? "text-red-500" : ""}`}>
              ⏰ {timeLeft}s
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-3xl bg-white px-6 py-3 shadow-md ring-4 ring-amber-200">
            <span className="text-lg font-bold text-slate-600 sm:text-xl">Find:</span>
            <span className="text-6xl" aria-label={target.word}>{target.emoji}</span>
            <button
              onClick={() => speak(target.word)}
              className="rounded-full bg-sky-100 px-3 py-1 text-2xl hover:bg-sky-200"
              aria-label="Hear the word"
            >
              🔊
            </button>
          </div>
          <p className="mt-2 h-8 text-xl font-bold text-indigo-600" aria-live="polite">{feedback}</p>

          <div className="whack-board mt-2 grid w-full grid-cols-3 gap-2 rounded-[2rem] bg-green-300 p-3 shadow-inner sm:gap-4 sm:p-5">
            {holes.map((mole, i) => (
              <button
                key={i}
                onPointerDown={() => whack(i)}
                className="relative h-36 overflow-hidden sm:h-44"
                aria-label={mole ? `Mole holding ${mole.word.word}` : "Empty hole"}
              >
                <div className="absolute bottom-3 left-1/2 h-8 w-[85%] -translate-x-1/2 rounded-[50%] bg-amber-900/80" />
                {mole && (
                  <div key={mole.id} className={`mole mole-${mole.status}`}>
                    <span className="text-5xl sm:text-6xl">
                      {mole.status === "hit" ? "😵" : mole.status === "miss" ? "😜" : "🐹"}
                    </span>
                    <span className="-mt-2 rounded-xl border-4 border-amber-700 bg-amber-50 px-1.5 py-0.5 text-base font-extrabold whitespace-nowrap text-slate-800 sm:px-2 sm:text-xl">
                      {mole.word.word}
                    </span>
                    {mole.status === "hit" && <span className="absolute -top-2 text-4xl">💥</span>}
                  </div>
                )}
                <div className="absolute bottom-0 left-0 h-6 w-full rounded-b-2xl bg-green-500" />
              </button>
            ))}
          </div>
        </>
      )}

      {phase === "over" && (
        <div className="mt-8 flex flex-col items-center gap-4 rounded-3xl bg-white p-8 shadow-md ring-4 ring-pink-200">
          <span className="text-7xl" aria-hidden>{score > 0 && score >= best ? "🏆" : "🎉"}</span>
          <p className="text-3xl font-black text-indigo-600">Time&apos;s up!</p>
          <p className="text-2xl text-slate-700">You scored <b>{score}</b> points!</p>
          {score > 0 && score >= best ? (
            <p className="text-xl font-bold text-amber-600">New best score! 🌟</p>
          ) : (
            <p className="text-lg text-slate-500">Best score: {best}</p>
          )}
          <button onClick={start} className="rounded-full bg-pink-500 px-8 py-3 text-2xl font-black text-white shadow hover:bg-pink-600 active:scale-95">
            🔁 Play again
          </button>
        </div>
      )}
    </section>
  );
}
