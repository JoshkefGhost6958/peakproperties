"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/Effects/ScrollReveal";
import styles from "./SpheraCatalog.module.css";

const CATEGORIES = [
  { id: "apartments", label: "Apartments" },
  { id: "villas", label: "Villas" },
  { id: "houses", label: "Houses" },
  { id: "bnbs", label: "BnBs (Short Stay)" },
];

export const CATALOG_PROJECTS = {
  apartments: [
    {
      id: "skyline-apart",
      type: "Apartment",
      title: "The Skyline Executive Apartment",
      area: "2 Beds · 112 m² · Floor 14",
      image: "/images/twobed.jpg",
      images: [
        "/images/twobed.jpg",
        "/images/onebed.jpg",
        "/images/studio.jpg",
      ],
      description:
        "Verified executive two-bedroom apartment with panoramic floor-to-ceiling glass, master en-suite, custom Italian cabinetry, and designated underground parking. What you see is what you get.",
      price: "KES 18,500,000 / $142,000",
      bedrooms: 2,
      bathrooms: 2,
      badge: "Master En-Suite · Panoramic Glass",
      viewingAvailable: "Available Daily for Site Viewing",
    },
    {
      id: "parkside-apart",
      type: "Apartment",
      title: "Parkside Garden Residence",
      area: "3 Beds · 165 m² · Ground Terrace",
      image: "/images/onebed.jpg",
      images: [
        "/images/onebed.jpg",
        "/images/apartment-2bed.jpg",
        "/images/apartment-1bed.jpg",
      ],
      description:
        "Spacious three-bedroom apartment with private garden patio, open-plan chef's kitchen, and high-efficiency backup power. Fully verified on-site inspection.",
      price: "KES 24,000,000 / $185,000",
      bedrooms: 3,
      bathrooms: 3,
      badge: "Ground Terrace · Private Patio",
      viewingAvailable: "Available Daily for Site Viewing",
    },
    {
      id: "rhapta-penthouse",
      type: "Apartment",
      title: "Rhapta Sky Penthouse Duplex",
      area: "4 Beds · 240 m² · Rooftop Terrace",
      image: "/images/apartment-studio.jpg",
      images: [
        "/images/apartment-studio.jpg",
        "/images/twobed.jpg",
        "/images/onebed.jpg",
      ],
      description:
        "Exclusive duplex penthouse along Rhapta Road featuring a private heated plunge pool, double-volume ceilings, and 360-degree sunset skyline views.",
      price: "KES 36,000,000 / $275,000",
      bedrooms: 4,
      bathrooms: 4.5,
      badge: "Duplex Penthouse · Rooftop Plunge Pool",
      viewingAvailable: "Dedicated Suite Viewing on Appointment",
    },
  ],
  villas: [
    {
      id: "lavilla",
      type: "Villa",
      title: "Eden Forest Villa \"LaVilla\"",
      area: "4 Beds · 380 m² · 0.5 Acre Compound",
      image: "/images/sphera-villa1.jpg",
      images: [
        "/images/sphera-villa1.jpg",
        "/images/courtyard.jpg",
        "/images/sphera-hero.jpg",
      ],
      description:
        "Architectural luxury villa framed by old-growth trees. Features a heated lap pool, expansive floor-to-ceiling glass pavilions, smart climate control, and separate staff quarters.",
      price: "KES 65,000,000 / $500,000",
      bedrooms: 4,
      bathrooms: 5,
      badge: "0.5 Acre · Heated Lap Pool",
      viewingAvailable: "Private Site Viewing on Appointment",
    },
    {
      id: "erigold",
      type: "Villa",
      title: "Cubist Modern Villa \"Erigold\"",
      area: "5 Beds · 450 m² · Private Grounds",
      image: "/images/sphera-villa2.jpg",
      images: [
        "/images/sphera-villa2.jpg",
        "/images/sphera-hero.jpg",
        "/images/sphera-villa1.jpg",
      ],
      description:
        "Contemporary standing-seam black metal and stone villa with cantilevered master wing, rooftop entertaining deck, infinity patio, and solar battery storage.",
      price: "KES 78,000,000 / $600,000",
      bedrooms: 5,
      bathrooms: 5,
      badge: "Cantilevered Wing · Solar Battery",
      viewingAvailable: "Private Site Viewing on Appointment",
    },
    {
      id: "karen-stone-sanctuary",
      type: "Villa",
      title: "The Karen Sanctuary Villa",
      area: "5 Beds · 510 m² · Mature Forest Grounds",
      image: "/images/sphera-hero.jpg",
      images: [
        "/images/sphera-hero.jpg",
        "/images/sphera-villa1.jpg",
        "/images/courtyard.jpg",
      ],
      description:
        "Secluded signature villa in prime Karen with private driveway, double-volume living salon, separate gym pavilion, and borehole water filtration.",
      price: "KES 92,000,000 / $710,000",
      bedrooms: 5,
      bathrooms: 6,
      badge: "Private Forest Drive · Gym Pavilion",
      viewingAvailable: "Private Site Viewing on Appointment",
    },
  ],
  houses: [
    {
      id: "suburban-home",
      type: "House",
      title: "The Palmview Family Estate",
      area: "4 Beds · 280 m² · Gated Community",
      image: "/images/sphera-villa1.jpg",
      images: [
        "/images/sphera-villa1.jpg",
        "/images/courtyard.jpg",
        "/images/about-complex.jpg",
      ],
      description:
        "Well-proportioned modern family home with mature landscaping, solar water heating, perimeter security, and children's play lawn. What you see is what you get.",
      price: "KES 34,500,000 / $265,000",
      bedrooms: 4,
      bathrooms: 4,
      badge: "Gated Enclave · Solar Water",
      viewingAvailable: "Available for Immediate Site Viewing",
    },
    {
      id: "heritage-townhouse",
      type: "House",
      title: "Heritage Stone Townhouse",
      area: "3 Beds · 220 m² · End-Unit",
      image: "/images/sphera-villa2.jpg",
      images: [
        "/images/sphera-villa2.jpg",
        "/images/about_river.jpg",
        "/images/courtyard.jpg",
      ],
      description:
        "Charming natural stone and timber townhouse with private double carport, rooftop terrace, and reliable high-pressure borehole water.",
      price: "KES 28,000,000 / $215,000",
      bedrooms: 3,
      bathrooms: 3.5,
      badge: "End-Unit · Rooftop Terrace",
      viewingAvailable: "Available for Immediate Site Viewing",
    },
  ],
  bnbs: [
    {
      id: "bnb-ridge",
      type: "BnB (Short Stay)",
      title: "The Ridge Valley BnB Suite",
      area: "Panoramic Hillside Suite · King Bed",
      image: "/images/peak-bnb.jpg",
      images: [
        "/images/peak-bnb.jpg",
        "/images/studio.jpg",
        "/images/apartment-studio.jpg",
      ],
      description:
        "Handpicked boutique short-stay BnB overlooking green ridgelines. Superhost managed, ultra-fast 100Mbps fiber internet, hotel-grade linens, fully stocked kitchen, and private sunset balcony. 100% verified real photos.",
      price: "KES 8,500 / $65 per night",
      bedrooms: 1,
      bathrooms: 1,
      badge: "Superhost · 100Mbps Dedicated Fiber",
      viewingAvailable: "Instant Online & WhatsApp Booking",
    },
    {
      id: "bnb-urban",
      type: "BnB (Short Stay)",
      title: "Urban Loft Studio BnB",
      area: "Designer Studio · Central Location",
      image: "/images/studio.jpg",
      images: [
        "/images/studio.jpg",
        "/images/peak-bnb.jpg",
        "/images/apartment-1bed.jpg",
      ],
      description:
        "Chic modern loft with acoustic wooden slats, smart TV, espresso bar, and 24/7 security concierge. Perfect for business travelers and weekend stays.",
      price: "KES 6,000 / $45 per night",
      bedrooms: "Studio",
      bathrooms: 1,
      badge: "Acoustic Slats · Smart Concierge",
      viewingAvailable: "Instant Online & WhatsApp Booking",
    },
  ],
};

function ProjectCardWithSlideshow({ proj, onSelectProject }) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const images = proj.images && proj.images.length > 0 ? proj.images : [proj.image];

  const handleNextImg = (e) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrevImg = (e) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleSelectDot = (e, idx) => {
    e.stopPropagation();
    setActiveImageIdx(idx);
  };

  return (
    <div className={styles.projectCard} onClick={() => onSelectProject(proj)}>
      <div className={styles.imageWrapper}>
        <Image
          src={images[activeImageIdx]}
          alt={proj.title}
          fill
          sizes="(max-width: 768px) 100vw, 35vw"
          className={styles.projectImage}
        />

        {/* Feature badge overlay */}
        {proj.badge && (
          <div className={styles.cardBadgeOverlay}>
            <span>{proj.badge}</span>
          </div>
        )}

        {/* Slideshow Arrows inside Image */}
        {images.length > 1 && (
          <div className={styles.slideshowControls}>
            <button
              type="button"
              className={styles.miniSlideBtn}
              onClick={handlePrevImg}
              aria-label="Previous image"
              title="Previous photo"
            >
              ‹
            </button>
            <button
              type="button"
              className={styles.miniSlideBtn}
              onClick={handleNextImg}
              aria-label="Next image"
              title="Next photo"
            >
              ›
            </button>
          </div>
        )}

        {/* Slideshow Dots Indicator */}
        {images.length > 1 && (
          <div className={styles.slideDotsRow}>
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.slideDot} ${
                  idx === activeImageIdx ? styles.slideDotActive : ""
                }`}
                onClick={(e) => handleSelectDot(e, idx)}
                aria-label={`Show photo ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className={styles.cardFooter}>
        <div>
          <div className={styles.projectTitle}>{proj.title}</div>
          <div className={styles.projectArea}>{proj.area}</div>
          <div
            style={{
              fontSize: "13.5px",
              fontWeight: "800",
              color: "#ffd8a8",
              marginTop: "4px",
            }}
          >
            {proj.price}
          </div>
        </div>
        <div
          className={styles.viewIcon}
          title="View details and book suite viewing"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function SpheraCatalog({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState("apartments");
  const [carouselIndex, setCarouselIndex] = useState(0);

  const projects = CATALOG_PROJECTS[activeCategory] || CATALOG_PROJECTS.apartments;

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  };

  // Compute the current visible window for the carousel (shows 2 items, rotating around carouselIndex)
  const visibleProjects = [];
  if (projects.length <= 2) {
    visibleProjects.push(...projects);
  } else {
    for (let i = 0; i < 2; i++) {
      const idx = (carouselIndex + i) % projects.length;
      visibleProjects.push(projects[idx]);
    }
  }

  return (
    <section className={styles.section} id="properties">
      <div className="container">
        <ScrollReveal>
          {/* Header Row */}
          <div className={styles.headerRow}>
            <div className={styles.titleArea}>
              <h2 className={styles.heading}>
                Apartments, Villas,
                <br />
                <span className={styles.headingMuted}>Houses &amp; </span>BnBs
              </h2>
            </div>

            {/* Top Right Category List */}
            <div className={styles.categoryMenu}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`${styles.categoryBtn} ${
                    activeCategory === cat.id ? styles.categoryBtnActive : ""
                  }`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setCarouselIndex(0);
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Showcase Layout */}
          <div className={styles.mainShowcase}>
            {/* Left Info Column with Working Carousel Controls */}
            <div className={styles.infoCol}>
              <p className={styles.subDescription}>
                Every listing is physically verified by our team. What you see is
                what you get — real photography, confirmed legal ownership, and
                readiness for site viewings or immediate check-in.
              </p>

              {/* Working Carousel Navigation & Indicator */}
              <div className={styles.carouselControlGroup}>
                <div className={styles.navArrows}>
                  <button
                    type="button"
                    className={styles.arrowBtn}
                    onClick={handlePrev}
                    aria-label="Previous listing"
                    title="Slide to previous listing"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className={styles.arrowBtn}
                    onClick={handleNext}
                    aria-label="Next listing"
                    title="Slide to next listing"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>

                <div className={styles.carouselCounter}>
                  <span className={styles.counterCurrent}>
                    {String(carouselIndex + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.counterDivider}>/</span>
                  <span className={styles.counterTotal}>
                    {String(projects.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            {/* Showcase Projects Cards with Slideshow Functionality */}
            {visibleProjects.map((proj) => (
              <ProjectCardWithSlideshow
                key={proj.id}
                proj={proj}
                onSelectProject={onSelectProject}
              />
            ))}
          </div>

          {/* Quick link to dedicated property & land pages */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end",
              marginTop: "28px",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/villas"
              className={styles.categoryBtn}
              style={{ textDecoration: "none" }}
            >
              Explore All Villas →
            </Link>
            <Link
              href="/land"
              className={styles.categoryBtn}
              style={{ textDecoration: "none" }}
            >
              Explore Prime Land &amp; Plots →
            </Link>
            <Link
              href="/apartments"
              className={styles.categoryBtn}
              style={{ textDecoration: "none" }}
            >
              Explore All Apartments →
            </Link>
            <Link
              href="/bnbs"
              className={styles.categoryBtn}
              style={{ textDecoration: "none" }}
            >
              Explore Luxury BnBs →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

