"use client";

import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { cn } from "../../lib/utils";

/** Drag (mouse/touch) or arrow-key slider comparing a before and after photo of the same space. */
export default function BeforeAfter({ before, after, alt = "", className, testId = "before-after", aspect = "aspect-[16/9]" }) {
  const ref = useRef(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const move = useCallback((clientX) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onDown = (e) => {
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    move(e.clientX);
  };

  return (
    <div
      ref={ref}
      data-testid={testId}
      className={cn("group relative select-none overflow-hidden rounded-[28px] bg-forest touch-pan-y", aspect, dragging ? "cursor-grabbing" : "cursor-ew-resize", className)}
      onPointerDown={onDown}
      onPointerMove={(e) => dragging && move(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <img src={after} alt={`After: ${alt}`} draggable="false" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <img
        src={before}
        alt={`Before: ${alt}`}
        draggable="false"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        loading="lazy"
      />
      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-forest/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur">Before</span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-lime px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-forest">After</span>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-lime" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-lime bg-forest text-lime shadow-xl transition-transform duration-300 group-hover:scale-110">
          <MoveHorizontal className="h-5 w-5" />
        </span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Compare before and after: ${alt}`}
        data-testid={`${testId}-range`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        onPointerDown={(e) => e.stopPropagation()}
        tabIndex={0}
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}

export const sampleBA = (id) => ({ before: `/img/ba/${id}-before.webp`, after: `/img/ba/${id}-after.webp` });
