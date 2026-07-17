import Image from "next/image";
import Link from "next/link";
import { NAVIGATION_ITEMS } from "@/app/lib/constants";

interface HeaderProps {
  /** When true, all nav links point to the homepage (e.g. /#home) instead of same-page anchors */
  homeBase?: boolean;
}

export default function Header({ homeBase = false }: HeaderProps) {
  const resolve = (href: string) =>
    homeBase && href.startsWith("#") ? `/${href}` : href;

  return (
    <header className="fixed inset-x-0 top-0 z-[100] flex h-[98px] items-center justify-between bg-black/50 px-6 backdrop-blur-[2px] lg:px-16">
      <Link href={resolve("#top")} className="relative h-[66px] w-[129px] shrink-0">
        <Image
          src="/images/matchpoint_logo.png"
          alt="MatchPoint"
          fill
          className="object-contain"
          priority
        />
      </Link>
      <div className="flex items-center gap-7">
        <nav className="hidden items-center gap-7 text-base text-white/80 md:flex">
          {NAVIGATION_ITEMS.map((link) => (
            <Link
              key={link.label}
              href={resolve(link.href)}
              className="transition-colors hover:text-primary-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href={resolve("#apply")}
          className="rounded-xl bg-primary-500 px-6 py-4 text-base font-bold text-white transition-colors hover:bg-amber-accent"
        >
          Start Your Journey
        </Link>
      </div>
    </header>
  );
}
