"use client";

import { Fragment } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";

/** Renders text where [[...]] marks a detail still to be confirmed by the founder. */
export const Rich = ({ text, dark = false }) =>
  String(text)
    .split(/(\[\[.*?\]\])/g)
    .map((part, i) =>
      part.startsWith("[[") ? (
        <span key={i} className={cn("tbc", dark && "tbc-dark")} title="Placeholder: confirm with the founder">
          {part.slice(2, -2)}
        </span>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      )
    );

const VARIANTS = {
  lime: "bg-lime text-forest border-lime hover:bg-forest hover:text-lime",
  dark: "bg-forest text-white border-forest hover:border-lime hover:text-lime",
  ghostLight: "border-lime/70 text-white hover:bg-lime hover:text-forest",
  ghostDark: "border-forest/25 text-forest hover:border-forest hover:bg-forest hover:text-white",
};

export const Btn = ({ to, href, variant = "lime", children, className, icon = true, testId, ...rest }) => {
  const cls = cn(
    "group inline-flex items-center gap-2 rounded-full border px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300",
    VARIANTS[variant],
    className
  );
  const inner = (
    <>
      <span>{children}</span>
      {icon && <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
    </>
  );
  const target = href || to;
  if (target && target.startsWith("http")) {
    return (
      <a href={target} className={cls} data-testid={testId} target="_blank" rel="noopener noreferrer" {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={target || "#"} className={cls} data-testid={testId} {...rest}>
      {inner}
    </Link>
  );
};

export const Reveal = ({ children, delay = 0, className, y = 28, as = "div" }) => {
  const M = motion[as] || motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
};

export const Label = ({ children, dark = false, className }) => (
  <span className={cn("label", dark && "label-dark", className)}>{children}</span>
);

export const BhlMark = ({ className, variant = "color" }) => (
  <img
    src={variant === "white" ? "/img/logo-white.png" : "/img/logo-color.png"}
    alt="Blue Heaven Landscape (BHL) logo"
    width="150"
    height="38"
    className={cn("h-8 w-auto sm:h-9", className)}
  />
);
