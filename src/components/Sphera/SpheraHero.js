"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./SpheraHero.module.css";

const HERO_SLIDES = [
  {
    id: "villas",
    navLabel: "Villas",
    tag: "VERIFIED LUXURY VILLAS",
    headline: "Luxury Contemporary Villas",
    subtitle:
      "Hand-curated private villas with heated swimming pools and mature gardens in Lavington & Karen. What you see is what you get.",
    image: "/images/sphera-villa1.jpg",
    href: "/villas",
    ctaText: "Explore Villas Collection",
  },
  {
    id: "land",
    navLabel: "Land",
    tag: "PRIME RESIDENTIAL LAND",
    headline: "Prime Land & Building Plots",
    subtitle:
      "Title-verified red-soil parcels ready for luxury single-family villas or development in Westlands & Lavington.",
    image: "/images/land-lavington.jpg",
    href: "/land",
    ctaText: "Explore Land & Plots",
  },
  {
    id: "apartments",
    navLabel: "Apartments",
    tag: "EXECUTIVE MODERN APARTMENTS",
    headline: "Luxury & Executive Apartments",
    subtitle:
      "Modern master en-suite residences and penthouses with rooftop infinity pools along Rhapta Road & General Mathenge.",
    image: "/images/twobed.jpg",
    href: "/apartments",
    ctaText: "Explore All Apartments",
  },
  {
    id: "bnbs",
    navLabel: "BnBs",
    tag: "VERIFIED BOUTIQUE BNBS",
    headline: "Luxury BnBs & Short Stays",
    subtitle:
      "Modernist glass suites and serviced residences with 100Mbps dedicated fiber WiFi, Smart TVs, and concierge service.",
    image: "/images/peak-bnb.jpg",
    href: "/bnbs",
    ctaText: "Explore Boutique BnBs",
  },
  {
    id: "construction",
    navLabel: "Construction",
    tag: "LET'S BUILD YOUR DREAM HOUSE",
    headline: "Let's Build You Your Dream House",
    subtitle:
      "From custom 3D isometric blueprints and county approvals to vetted NCA professional contractors on-site.",
    image: "/images/sphera-hero.jpg",
    href: "/construction",
    ctaText: "Let's Build Your Dream House",
  },
];

export default function SpheraHero({ onSelectProject, onOpenSiteViewing }) {
  const [slides, setSlides] = useState(HERO_SLIDES);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const slideTimerRef = useRef(null);
  const videoRef = useRef(null);

  // Auto-hide scroll indicator when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Background video plays strictly muted by default (ensures universal autoplay across all devices)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // Fetch dynamic hero slides from API if configured
  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        const res = await fetch("/api/content?collection=heroSlides");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const activeOnly = json.data.filter((s) => s.active !== false);
          if (activeOnly.length > 0) {
            setSlides(activeOnly);
          }
        }
      } catch (err) {
        // Fallback silently to static HERO_SLIDES
      }
    };
    fetchHeroSlides();
  }, []);

  // Auto-advance slideshow smoothly every 6 seconds
  useEffect(() => {
    if (isPaused || slides.length === 0) return;

    slideTimerRef.current = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(slideTimerRef.current);
  }, [isPaused, slides.length]);

  const activeSlide = slides[currentSlideIndex] || slides[0] || HERO_SLIDES[0];

  const handleSelectSlide = (index) => {
    setCurrentSlideIndex(index);
  };

  const scrollToExplore = () => {
    const el = document.getElementById("about");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className={styles.heroWrapper}
      id="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Media Layers (Video + Smooth Jitter-Free Cross-fading Category Images) */}
      <div className={styles.mediaContainer}>
        {/* Cinematic Video Layer - Plays first upon landing (Slide 0 - Villas) */}
        <div
          className={`${styles.videoLayer} ${
            currentSlideIndex === 0 ? styles.layerActive : styles.layerInactive
          }`}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className={styles.heroVideo}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* High-Resolution Category Image Layers - Mounted permanently for zero-jitter cross-fading */}
        {slides.map((slide, index) => {
          const isActive = currentSlideIndex === index && index !== 0;
          return (
            <div
              key={slide.id || index}
              className={`${styles.imageLayer} ${
                isActive ? styles.layerActive : styles.layerInactive
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.headline || slide.navLabel || "Peak Housing"}
                fill
                priority={index <= 1}
                sizes="100vw"
                className={styles.slideImage}
              />
            </div>
          );
        })}
      </div>

      <div className={styles.overlayGradient} />
      <div className={styles.heroGlowOrb} />

      <div className={`container ${styles.container}`}>
        <div className={styles.contentRow}>
          {/* Bottom Left Title & Navigation Area */}
          <div className={styles.titleArea}>
            {/* Navlink Category Showcase Selector */}
            <div className={styles.navlinkSelector}>
              {slides.map((slide, index) => (
                <button
                  key={slide.id || index}
                  type="button"
                  className={`${styles.navlinkPill} ${
                    index === currentSlideIndex ? styles.navlinkPillActive : ""
                  }`}
                  onClick={() => handleSelectSlide(index)}
                  aria-label={`Switch to ${slide.navLabel}`}
                >
                  <span>{slide.navLabel}</span>
                </button>
              ))}
            </div>

            {/* Verification Tag */}
            <div className={styles.mottoBadge}>
              <svg
                className={styles.mottoCheck}
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{activeSlide.tag}</span>
            </div>

            <h1 className={styles.brandTitle}>{activeSlide.headline}</h1>
            <p className={styles.tagline}>{activeSlide.subtitle}</p>

            <div className={styles.heroCtaRow}>
              <Link href={activeSlide.href} className={styles.primaryHeroBtn}>
                <span>{activeSlide.ctaText}</span>
                <span>→</span>
              </Link>

              <a
                href={`https://wa.me/254722705898?text=${encodeURIComponent(
                  `Hello Joseph Simiyu Kefa, I am viewing Peak Housing's ${activeSlide.navLabel} collection and would like more details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappHeroBtn}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5.2-1.31C8.61 21.53 10.26 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.46 14.38c-.23.64-1.16 1.2-1.61 1.25-.43.05-.98.07-2.83-.69-2.37-.97-3.9-3.39-4.02-3.55-.12-.16-.96-1.28-.96-2.44 0-1.16.61-1.73.83-1.96.22-.23.48-.29.64-.29.16 0 .32 0 .46.01.15.01.35-.06.55.42.2.49.69 1.68.75 1.8.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.25.25-.11.49.14.24.62 1.02 1.33 1.65.91.81 1.68 1.06 1.92 1.18.24.12.38.1.52-.06.14-.16.61-.71.77-.95.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.17 1.22z" />
                </svg>
                <span>WhatsApp 0722705898</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Redesigned Floating Scroll Down Indicator (Auto-hides on scroll) */}
      <button
        type="button"
        className={`${styles.scrollIndicator} ${
          hasScrolled ? styles.scrollHidden : ""
        }`}
        onClick={scrollToExplore}
        aria-label="Scroll to explore properties"
      >
        <span className={styles.scrollText}>Scroll to explore</span>
        <span className={styles.scrollIconWrapper}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 10l5 5 5-5" />
          </svg>
        </span>
      </button>
    </section>
  );
}
