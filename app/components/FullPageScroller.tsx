"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// ─── Timing constants ────────────────────────────────────────────────────────
const GATHER_MS   = 360;  // how long items travel toward center
const SCATTER_MS  = 560;  // how long items scatter to natural positions
const ITEM_STAGGER = 30;  // ms between each item's start
const THROTTLE_MS = 1000; // min ms between transitions

// ─── Gather animation engine ──────────────────────────────────────────────────
function gatherItems(
  items: HTMLElement[],
  vCX: number,
  vCY: number,
  onDone: () => void
) {
  items.forEach((el, i) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    const dx = vCX - (r.left + r.width / 2);
    const dy = vCY - (r.top + r.height / 2);
    const delay = i * ITEM_STAGGER;
    el.style.transition = `transform ${GATHER_MS}ms cubic-bezier(0.55,0,1,0.7) ${delay}ms,
                           opacity ${GATHER_MS - 80}ms ease ${delay}ms`;
    el.style.transform = `translate(${dx}px,${dy}px) scale(0.15)`;
    el.style.opacity = "0";
  });
  setTimeout(onDone, GATHER_MS + items.length * ITEM_STAGGER + 20);
}

function scatterItems(
  el: HTMLElement,
  vCX: number,
  vCY: number,
  onDone: () => void
) {
  // el is the section; read positions of all .gi children
  const items = Array.from(el.querySelectorAll<HTMLElement>(".gi"));

  // Force layout (section is visible with opacity:1 now)
  void el.offsetHeight;

  // Teleport items to center (instant, no transition)
  items.forEach((item) => {
    const r = item.getBoundingClientRect();
    const dx = vCX - (r.left + r.width / 2);
    const dy = vCY - (r.top + r.height / 2);
    item.style.transition = "none";
    item.style.transform = `translate(${dx}px,${dy}px) scale(0.15)`;
    item.style.opacity = "0";
  });

  // Force reflow so browser commits above state
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      items.forEach((item, i) => {
        const delay = i * ITEM_STAGGER;
        item.style.transition = `transform ${SCATTER_MS}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                                 opacity ${SCATTER_MS - 120}ms ease ${delay}ms`;
        item.style.transform = "";
        item.style.opacity = "";
      });

      const cleanup = SCATTER_MS + items.length * ITEM_STAGGER + 60;
      setTimeout(() => {
        items.forEach((item) => { item.style.transition = ""; });
        onDone();
      }, cleanup);
    });
  });
}

// ─── FullPageScroller component ───────────────────────────────────────────────
export interface FullPageScrollerProps {
  sections: React.ReactNode[];
  labels?: string[];
}

export default function FullPageScroller({
  sections,
  labels = [],
}: FullPageScrollerProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeRef   = useRef(0);
  const busyRef     = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastWheelRef = useRef(0);

  // ─── Core transition ───────────────────────────────────────────────────────
  const goTo = useCallback(
    (next: number) => {
      if (busyRef.current) return;
      const current = activeRef.current;
      if (next === current || next < 0 || next >= sections.length) return;

      busyRef.current = true;

      const container = containerRef.current;
      if (!container) { busyRef.current = false; return; }

      const allSections = container.querySelectorAll<HTMLElement>(".fp-section");
      const fromEl = allSections[current];
      const toEl   = allSections[next];
      if (!fromEl || !toEl) { busyRef.current = false; return; }

      const vCX = window.innerWidth  / 2;
      const vCY = window.innerHeight / 2;

      // Phase 1 — gather items from current section
      const fromItems = Array.from(fromEl.querySelectorAll<HTMLElement>(".gi"));

      gatherItems(fromItems, vCX, vCY, () => {
        // Hide from-section
        fromEl.style.opacity       = "0";
        fromEl.style.pointerEvents = "none";
        fromEl.style.zIndex        = "0";

        // Reset from-items (hidden, so no flash)
        fromItems.forEach((el) => {
          el.style.transition = "none";
          el.style.transform  = "";
          el.style.opacity    = "";
        });

        // Show to-section
        toEl.style.opacity       = "1";
        toEl.style.pointerEvents = "auto";
        toEl.style.zIndex        = "1";

        // Phase 2 — scatter items of next section
        scatterItems(toEl, vCX, vCY, () => {
          activeRef.current = next;
          setActiveIdx(next);
          busyRef.current = false;
        });

        // Update state early so dots feel responsive
        setActiveIdx(next);
        activeRef.current = next;
      });
    },
    [sections.length]
  );

  // ─── Wheel ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelRef.current < THROTTLE_MS) return;
      lastWheelRef.current = now;
      if (e.deltaY > 20)       goTo(activeRef.current + 1);
      else if (e.deltaY < -20) goTo(activeRef.current - 1);
    };
    window.addEventListener("wheel", handler, { passive: false });
    return () => window.removeEventListener("wheel", handler);
  }, [goTo]);

  // ─── Touch ────────────────────────────────────────────────────────────────
  useEffect(() => {
    let startY = 0;
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onEnd   = (e: TouchEvent) => {
      const dy = startY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 50) return;
      if (dy > 0) goTo(activeRef.current + 1);
      else        goTo(activeRef.current - 1);
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend",   onEnd,   { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend",   onEnd);
    };
  }, [goTo]);

  // ─── Keyboard ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown"].includes(e.key)) { e.preventDefault(); goTo(activeRef.current + 1); }
      if (["ArrowUp",   "PageUp"  ].includes(e.key)) { e.preventDefault(); goTo(activeRef.current - 1); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goTo]);

  return (
    <div ref={containerRef} className="fp-container">
      {sections.map((section, i) => (
        <div
          key={i}
          className="fp-section"
          role="region"
          aria-label={labels[i] ?? `Section ${i + 1}`}
          aria-hidden={i !== activeIdx}
          style={{
            opacity:       i === 0 ? 1 : 0,
            pointerEvents: i === 0 ? "auto" : "none",
            zIndex:        i === 0 ? 1 : 0,
          }}
        >
          {section}
        </div>
      ))}

      {/* ── Dot navigation ── */}
      <nav className="fp-nav" aria-label="Section navigation">
        {sections.map((_, i) => (
          <button
            key={i}
            className={`fp-dot${i === activeIdx ? " fp-dot-active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={labels[i] ?? `Section ${i + 1}`}
            aria-current={i === activeIdx ? "page" : undefined}
          />
        ))}
      </nav>

      {/* ── Section counter (bottom-left) ── */}
      <div className="fp-counter" aria-hidden="true">
        <span className="fp-counter-num">{String(activeIdx + 1).padStart(2, "0")}</span>
        <span className="fp-counter-line" />
        <span className="fp-counter-total">{String(sections.length).padStart(2, "0")}</span>
      </div>
    </div>
  );
}
