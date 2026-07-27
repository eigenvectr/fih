"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Waves, NotebookPen, Map } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();
  const [water, setWater] = useState({ slug: "st-lawrence-river", name: "St. Lawrence" });

  useEffect(() => {
    try {
      const t = JSON.parse(localStorage.getItem("fih:lastWater") ?? "null");
      if (t?.slug && t?.name) setWater(t);
    } catch {}
  }, [pathname]);

  const tabs = [
    { href: "/", label: "Waters", icon: Waves, match: /^\/$/ },
    { href: `/water/${water.slug}`, label: water.name, icon: Map, match: /^\/water/ },
    { href: "/log", label: "Log", icon: NotebookPen, match: /^\/log/ },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="mx-auto flex max-w-3xl items-stretch pb-[env(safe-area-inset-bottom)]">
        {tabs.map(({ href, label, icon: Icon, match }) => {
          const active = match.test(pathname);
          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors ${
                active ? "text-accent" : "text-ink-faint hover:text-ink-muted"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.2 : 1.8} />
              <span className="max-w-24 truncate">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
