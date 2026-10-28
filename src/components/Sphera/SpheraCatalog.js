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
      description:
        "Verified executive two-bedroom apartment with panoramic floor-to-ceiling glass, master en-suite, custom Italian cabinetry, and designated underground parking. What you see is what you get.",
      price: "KES 18,500,000 / $142,000",
      bedrooms: 2,
      bathrooms: 2,
      viewingAvailable: "Available Daily for Site Viewing",
    },
    {
      id: "parkside-apart",
      type: "Apartment",
      title: "Parkside Garden Residence",
      area: "3 Beds · 165 m² · Ground Terrace",
      image: "/images/onebed.jpg",
      description:
        "Spacious three-bedroom apartment with private garden patio, open-plan chef's kitchen, and high-efficiency backup power. Fully verified on-site inspection.",
      price: "KES 24,000,000 / $185,000",
      bedrooms: 3,
      bathrooms: 3,
      viewingAvailable: "Available Daily for Site Viewing",
    },
  ],
  villas: [
    {
      id: "lavilla",
      type: "Villa",
      title: "Eden Forest Villa \"LaVilla\"",
      area: "4 Beds · 380 m² · 0.5 Acre Compound",
      image: "/images/sphera-villa1.jpg",
      description:
        "Architectural luxury villa framed by old-growth trees. Features a heated lap pool, expansive floor-to-ceiling glass pavilions, smart climate control, and separate staff quarters.",
      price: "KES 65,000,000 / $500,000",
      bedrooms: 4,
      bathrooms: 5,
      viewingAvailable: "Private Site Viewing on Appointment",
    },
    {
      id: "erigold",
      type: "Villa",
      title: "Cubist Modern Villa \"Erigold\"",
      area: "5 Beds · 450 m² · Private Grounds",
      image: "/images/sphera-villa2.jpg",
      description:
        "Contemporary standing-seam black metal and stone villa with cantilevered master wing, rooftop entertaining deck, infinity patio, and solar battery storage.",
      price: "KES 78,000,000 / $600,000",
      bedrooms: 5,
      bathrooms: 5,
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
      description:
        "Well-proportioned modern family home with mature landscaping, solar water heating, perimeter security, and children's play lawn. What you see is what you get.",
      price: "KES 34,500,000 / $265,000",
      bedrooms: 4,
      bathrooms: 4,
      viewingAvailable: "Available for Immediate Site Viewing",
    },
    {
      id: "heritage-townhouse",
      type: "House",
      title: "Heritage Stone Townhouse",
      area: "3 Beds · 220 m² · End-Unit",
      image: "/images/sphera-villa2.jpg",
      description:
        "Charming natural stone and timber townhouse with private double carport, rooftop terrace, and reliable high-pressure borehole water.",
      price: "KES 28,000,000 / $215,000",
      bedrooms: 3,
      bathrooms: 3.5,
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
      description:
        "Handpicked boutique short-stay BnB overlooking green ridgelines. Superhost managed, ultra-fast 100Mbps fiber internet, hotel-grade linens, fully stocked kitchen, and private sunset balcony. 100% verified real photos.",
      price: "KES 8,500 / $65 per night",
      bedrooms: 1,
      bathrooms: 1,
      viewingAvailable: "Instant Online & WhatsApp Booking",
    },
    {
      id: "bnb-urban",
      type: "BnB (Short Stay)",
      title: "Urban Loft Studio BnB",
      area: "Designer Studio · Central Location",
      image: "/images/studio.jpg",
      description:
        "Chic modern loft with acoustic wooden slats, smart TV, espresso bar, and 24/7 security concierge. Perfect for business travelers and weekend stays.",
      price: "KES 6,000 / $45 per night",
      bedrooms: "Studio",
      bathrooms: 1,
      viewingAvailable: "Instant Online & WhatsApp Booking",
    },
  ],
};

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
            {/* Left Info Column */}
            <div className={styles.infoCol}>
              <p className={styles.subDescription}>
                Every listing is physically verified by our team. What you see is
                what you get — real photography, confirmed legal ownership, and
                readiness for site viewings or immediate check-in.
              </p>

              <div className={styles.navArrows}>
                <button
                  type="button"
                  className={styles.arrowBtn}
                  onClick={handlePrev}
                  aria-label="Previous listing"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
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
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Showcase Projects Cards */}
            {projects.map((proj) => (
              <div
                key={proj.id}
                className={styles.projectCard}
                onClick={() => onSelectProject(proj)}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    className={styles.projectImage}
                  />
                </div>
                <div className={styles.cardFooter}>
                  <div>
                    <div className={styles.projectTitle}>{proj.title}</div>
                    <div className={styles.projectArea}>{proj.area}</div>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "#16171a", marginTop: "4px" }}>
                      {proj.price}
                    </div>
                  </div>
                  <div className={styles.viewIcon} title="View details and book site viewing">
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
            ))}
          </div>

          {/* Quick link to dedicated property & land pages */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "24px", flexWrap: "wrap" }}>
            <Link href="/villas" className={styles.categoryBtn} style={{ textDecoration: "none" }}>
              Explore All Villas →
            </Link>
            <Link href="/land" className={styles.categoryBtn} style={{ textDecoration: "none" }}>
              Explore Prime Land &amp; Plots →
            </Link>
            <Link href="/apartments" className={styles.categoryBtn} style={{ textDecoration: "none" }}>
              Explore All Apartments →
            </Link>
            <Link href="/bnbs" className={styles.categoryBtn} style={{ textDecoration: "none" }}>
              Explore Luxury BnBs →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
