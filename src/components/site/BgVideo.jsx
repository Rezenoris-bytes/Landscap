"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

const reduceMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Silent looping background video. Loads only when near the viewport and pauses when off-screen. */
export default function BgVideo({ name, className, eager = false, label = "" }) {
  const ref = useRef(null);
  const [load, setLoad] = useState(eager);
  const still = reduceMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || still) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true);
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [still]);

  const poster = `/video/${name}.jpg`;
  if (still) return <img src={poster} alt={label} className={cn("object-cover", className)} />;
  return (
    <video
      ref={ref}
      className={cn("object-cover", className)}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload={eager ? "auto" : "none"}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : "true"}
      data-testid={`video-${name}`}
    >
      {load && <source src={`/video/${name}.mp4`} type="video/mp4" />}
    </video>
  );
}
