import type { Metadata } from "next";
import BackHome from "@/components/BackHome";
import WhackAWord from "@/components/WhackAWord";

export const metadata: Metadata = { title: "Whack-a-Word · Word Buddies" };

export default function WhackAWordPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <BackHome href="/play" label="Games" />
      <WhackAWord />
    </main>
  );
}
