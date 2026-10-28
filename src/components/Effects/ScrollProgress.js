"use client";

import { useState, useEffect } from "react";
import styles from "./ScrollProgress.module.css";

export default function ScrollProgress() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      setShowBackToTop(totalScroll > 380);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Back to Top Floating Glass Button */}
      <button
        type="button"
        className={`${styles.backToTopBtn} ${
          showBackToTop ? styles.backToTopVisible : ""
        }`}
        onClick={scrollToTop}
        aria-label="Scroll back to top"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </>
  );
}
