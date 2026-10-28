"use client";

import { useEffect, useRef } from "react";

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.15,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("revealVisible");
            observer.unobserve(el);
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  const delayClass =
    delay === 1
      ? "revealDelay1"
      : delay === 2
      ? "revealDelay2"
      : delay === 3
      ? "revealDelay3"
      : delay === 4
      ? "revealDelay4"
      : "";

  return (
    <div ref={ref} className={`revealOnScroll ${delayClass} ${className}`}>
      {children}
    </div>
  );
}
