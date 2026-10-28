"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Apartments.module.css";

export const APARTMENTS_DATA = [
  {
    id: "studio",
    category: "studio",
    title: "Studios",
    area: "from 25 to 32 m²",
    areaImperial: "270–345 sq ft",
    exactArea: "28.4 m² (305 sq ft)",
    price: "from $110,000",
    priceRub: "9.8M ₽",
    priceNum: 110000,
    monthly: "from $450/mo",
    image: "/images/studio.jpg",
    floor: "Floors 3–14",
    ceiling: "3.1 m (10.2 ft)",
    rooms: [
      { name: "Living & Kitchenette", area: "18.2 m²" },
      { name: "Entrance Foyer", area: "4.1 m²" },
      { name: "Bathroom", area: "3.8 m²" },
      { name: "Private Loggia", area: "2.3 m²" },
    ],
    features: [
      "Floor-to-ceiling panoramic windows",
      "Integrated Smart Home climate control",
      "Concealed in-floor trench radiators",
      "Designer White Box pre-finishing",
    ],
  },
  {
    id: "1bed",
    category: "1bed",
    title: "1-Bedroom",
    area: "from 36 to 48 m²",
    areaImperial: "388–516 sq ft",
    exactArea: "42.6 m² (458 sq ft)",
    price: "from $140,000",
    priceRub: "12.6M ₽",
    priceNum: 140000,
    monthly: "from $580/mo",
    image: "/images/onebed.jpg",
    floor: "Floors 2–16",
    ceiling: "3.1 m (10.2 ft)",
    rooms: [
      { name: "Kitchen & Dining", area: "14.8 m²" },
      { name: "Master Bedroom", area: "16.4 m²" },
      { name: "Walk-in Wardrobe", area: "3.6 m²" },
      { name: "Bathroom", area: "4.6 m²" },
      { name: "Glazed Balcony", area: "3.2 m²" },
    ],
    features: [
      "Direct views of Kazanka River & Kremlin",
      "Master bedroom with private walk-in closet",
      "Multi-stage air filtration & ventilation",
      "Enhanced acoustic wall and subfloor insulation",
    ],
  },
  {
    id: "2bed",
    category: "2bed",
    title: "2-Bedroom",
    area: "from 52 to 72 m²",
    areaImperial: "560–775 sq ft",
    exactArea: "64.8 m² (697 sq ft)",
    price: "from $198,000",
    priceRub: "17.9M ₽",
    priceNum: 198000,
    monthly: "from $820/mo",
    image: "/images/twobed.jpg",
    floor: "Floors 4–18",
    ceiling: "3.15 m (10.3 ft)",
    rooms: [
      { name: "Expansive Living Salon", area: "22.5 m²" },
      { name: "Master Suite", area: "15.8 m²" },
      { name: "Second Bedroom / Office", area: "13.2 m²" },
      { name: "Primary Bath", area: "5.4 m²" },
      { name: "Guest Powder Room", area: "2.4 m²" },
      { name: "Outdoor Loggia", area: "5.5 m²" },
    ],
    features: [
      "Dual-aspect corner windows with sunrise & sunset light",
      "Two complete designer bathrooms",
      "Dedicated laundry & utility niche",
      "2.4 m architectural tall doors",
    ],
  },
  {
    id: "3bed",
    category: "3bed",
    title: "3-Bedroom",
    area: "from 78 to 104 m²",
    areaImperial: "840–1,120 sq ft",
    exactArea: "89.2 m² (960 sq ft)",
    price: "from $270,000",
    priceRub: "24.5M ₽",
    priceNum: 270000,
    monthly: "from $1,120/mo",
    image: "/images/about_river.jpg",
    floor: "Floors 8–18",
    ceiling: "3.3 m (10.8 ft)",
    rooms: [
      { name: "Great Room & Chef's Kitchen", area: "32.0 m²" },
      { name: "Primary Suite with En-Suite", area: "20.4 m²" },
      { name: "Bedroom Two", area: "14.5 m²" },
      { name: "Bedroom Three", area: "12.8 m²" },
      { name: "Family Bathroom", area: "5.5 m²" },
      { name: "Foyer & Dressing Gallery", area: "8.2 m²" },
      { name: "Sunset Terrace", area: "6.8 m²" },
    ],
    features: [
      "Panoramic vistas over the historical Kazan skyline",
      "Smart fresh air recuperation system",
      "Biometric keyless access system",
      "Eco-fireplace installation capability",
    ],
  },
];

export default function Apartments({ onSelectApartment, onOpenCatalog }) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredApartments =
    activeTab === "all"
      ? APARTMENTS_DATA
      : APARTMENTS_DATA.filter((apt) => apt.category === activeTab);

  return (
    <section className={styles.section} id="apartments">
      <div className="container">
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div className={styles.titleArea}>
            <span className={styles.tag}>APARTMENTS</span>
            <h2 className={styles.heading}>
              Floor plans designed for different life stories
            </h2>
          </div>

          <button
            type="button"
            className={styles.viewAllLink}
            onClick={onOpenCatalog}
          >
            <span>View all floor plans</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className={styles.tabsBar}>
          <button
            type="button"
            className={`${styles.tabBtn} ${
              activeTab === "all" ? styles.tabBtnActive : ""
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Types
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${
              activeTab === "studio" ? styles.tabBtnActive : ""
            }`}
            onClick={() => setActiveTab("studio")}
          >
            Studios
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${
              activeTab === "1bed" ? styles.tabBtnActive : ""
            }`}
            onClick={() => setActiveTab("1bed")}
          >
            1-Bedroom
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${
              activeTab === "2bed" ? styles.tabBtnActive : ""
            }`}
            onClick={() => setActiveTab("2bed")}
          >
            2-Bedroom
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${
              activeTab === "3bed" ? styles.tabBtnActive : ""
            }`}
            onClick={() => setActiveTab("3bed")}
          >
            3-Bedroom
          </button>
        </div>

        {/* Cards Grid */}
        <div className={styles.cardsGrid}>
          {filteredApartments.slice(0, 3).map((apt) => (
            <div
              key={apt.id}
              className={styles.card}
              onClick={() => onSelectApartment(apt)}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={apt.image}
                  alt={`${apt.title} layout at FORMA Residences Kazan`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.cardImage}
                />
                <span className={styles.cardBadge}>Business Class</span>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardTitle}>{apt.title}</h3>
                  <span className={styles.cardArea}>{apt.area}</span>
                  <span className={styles.cardPrice}>{apt.price}</span>
                  <span className={styles.cardMonthly}>{apt.monthly}</span>
                </div>

                <div
                  className={styles.cardActionBtn}
                  aria-label={`View details for ${apt.title}`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
