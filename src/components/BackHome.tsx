import Link from "next/link";

export default function BackHome({ href = "/", label = "Home" }: { href?: string; label?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-lg font-bold text-indigo-600 shadow ring-2 ring-indigo-200 hover:bg-indigo-50"
    >
      ⬅ {label}
    </Link>
  );
}
