"use client";

import Link from "next/link";

export default function Nav() {
  return (
    <header className="nav-bar">
      <nav className="nav-inner" aria-label="Primary navigation">
        <Link
          href="/"
          className="link-underline text-sm font-medium uppercase tracking-widest text-[var(--color-ink)]"
        >
          Ayasha Zafasha
        </Link>
        
        <div className="flex items-center gap-8">
          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {["About", "Work", "Contact"].map((label, idx) => (
              <button
                key={label}
                onClick={() => {
                  const dots = document.querySelectorAll<HTMLButtonElement>('.fp-dot');
                  if (dots[idx + 1]) dots[idx + 1].click();
                }}
                className="link-underline text-[10px] font-medium uppercase tracking-widest text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Let's Talk Button */}
          <a
            href="mailto:hello@ayashazafasha.com"
            className="rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-[10px] font-medium uppercase tracking-widest text-[var(--color-bg)] transition-all duration-300 ease-out hover:scale-105 hover:bg-[var(--color-muted)]"
          >
            Let&rsquo;s Talk
          </a>
        </div>
      </nav>
    </header>
  );
}
