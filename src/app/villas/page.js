"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SpheraHeader from "@/components/Sphera/SpheraHeader";
import SpheraFooter from "@/components/Sphera/SpheraFooter";
import SiteViewingSection from "@/components/Sphera/SiteViewingSection";
import CaseStudyModal from "@/components/Sphera/CaseStudyModal";
import styles from "@/components/Properties/PropertyPage.module.css";

const VILLAS_DATA = [
  {
    id: "lavington-eden-villa",
    title: "Eden Forest Villa · Lavington",
    location: "Lavington",
    neighborhood: "Mbaazi Avenue, Lavington",
    area: "4 Beds · 450 m² · 0.5 Acre Compound",
    price: "KES 68,000,000",
    bedrooms: 4,
    bathrooms: 5,
    image: "/images/sphera-villa1.jpg",
    description:
      "Exclusive modern villa nestled in prime Lavington with a heated swimming pool, double-height living salon, mature trees, and high-security gated cul-de-sac. What you see is what you get.",
    features: ["0.5 Acre Private Compound", "Heated Pool", "Solar Power System", "DSQ for 2"],
  },
  {
    id: "westlands-cubist-villa",
    title: "The Glass House Villa · Westlands",
    location: "Westlands",
    neighborhood: "Rhapta Road, Westlands",
    area: "5 Beds · 520 m² · Private Courtyard",
    price: "KES 82,000,000",
    bedrooms: 5,
    bathrooms: 6,
    image: "/images/sphera-villa2.jpg",
    description:
      "Striking contemporary architectural residence in quiet Westlands suburb. Cantilevered master suite, rooftop terrace, elevator provision, and European minimalist finishes.",
    features: ["Rooftop Sunset Lounge", "Floor-to-ceiling glass", "Smart Security", "4 Car Garage"],
  },
  {
    id: "lavington-stone-villa",
    title: "James Gichuru Contemporary Villa",
    location: "Lavington",
    neighborhood: "Off James Gichuru, Lavington",
    area: "4 Beds · 390 m² · Private Lawn",
    price: "KES 59,000,000",
    bedrooms: 4,
    bathrooms: 4.5,
    image: "/images/sphera-hero.jpg",
    description:
      "Sophisticated single-family villa with natural stone cladding, manicured front lawn, chef's kitchen, and serene quiet environment. Available for immediate site inspection.",
    features: ["Perimeter Electric Fence", "Borehole Water Backup", "Family TV Room", "Private Office"],
  },
  {
    id: "westlands-modern-residence",
    title: "General Mathenge Architectural Villa",
    location: "Westlands",
    neighborhood: "General Mathenge, Westlands",
    area: "5 Beds · 580 m² · Gated Estate",
    price: "KES 95,000,000",
    bedrooms: 5,
    bathrooms: 6,
    image: "/images/sphera-villa2.jpg",
    description:
      "Ultra-luxury executive villa located in high-demand General Mathenge enclave. Private plunge pool, landscaped courtyard garden, and 24/7 security patrol.",
    features: ["Private Plunge Pool", "Italian Fitted Kitchen", "Full Generator", "Intercom System"],
  },
  {
    id: "karen-colonial-contemporary",
    title: "The Ridgeview Country Villa",
    location: "Karen",
    neighborhood: "Miotoni, Karen",
    area: "5 Beds · 500 m² · 1.0 Acre Garden",
    price: "KES 75,000,000",
    bedrooms: 5,
    bathrooms: 5,
    image: "/images/sphera-villa1.jpg",
    description:
      "Seamless blend of modern architecture and lush indigenous forest setting in Karen. 1 acre titled land, outdoor barbecue pavilion, and firepit.",
    features: ["1 Acre Forest Lot", "Covered Verandah", "Hardwood Floors", "Solar Backup"],
  },
];

export default function VillasPage() {
  const [villas, setVillas] = useState(VILLAS_DATA);
  const [selectedLocation, setSelectedLocation] = useState("All"); // Default filter options: Westlands & Lavington prominent
  const [bedroomFilter, setBedroomFilter] = useState("all");
  const [selectedVilla, setSelectedVilla] = useState(null);

  // Load live data from CMS API
  useEffect(() => {
    const fetchVillas = async () => {
      try {
        const res = await fetch("/api/content?collection=villas");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const liveOnly = json.data.filter((item) => item.isPublished !== false);
          if (liveOnly.length > 0) {
            setVillas(liveOnly);
          }
        }
      } catch (e) {
        // Fallback silently to static data
      }
    };
    fetchVillas();
  }, []);

  const filteredVillas = villas.filter((v) => {
    const matchLocation =
      selectedLocation === "All"
        ? true
        : selectedLocation === "Westlands & Lavington"
        ? v.location === "Westlands" || v.location === "Lavington"
        : v.location.toLowerCase() === selectedLocation.toLowerCase();

    const matchBeds =
      bedroomFilter === "all"
        ? true
        : v.bedrooms >= Number(bedroomFilter);

    return matchLocation && matchBeds;
  });

  const getWhatsAppLink = (villa) => {
    const text = `Hello Joseph Simiyu Kefa, I am interested in viewing the villa: ${villa.title} (${villa.price}). Please arrange an on-site viewing.`;
    return `https://wa.me/254722705898?text=${encodeURIComponent(text)}`;
  };

  return (
    <main className={styles.pageWrapper}>
      <SpheraHeader />

      {/* Hero Header */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Villas</span>
          </div>

          <div className={styles.heroTag}>VERIFIED LUXURY VILLAS</div>
          <h1 className={styles.title}>Luxury Contemporary Villas</h1>
          <p className={styles.subtitle}>
            Explore our curated collection of verified private villas in prime
            neighborhoods. What you see is what you get — true photography,
            confirmed clean titles, and verified physical condition.
          </p>
        </div>
      </section>

      {/* Filter Bar with Westlands & Lavington Defaults */}
      <section className={styles.filterSection}>
        <div className="container">
          <div className={styles.filterGrid}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="Westlands & Lavington">
                  Westlands &amp; Lavington (Default Prime)
                </option>
                <option value="Westlands">Westlands</option>
                <option value="Lavington">Lavington</option>
                <option value="Karen">Karen</option>
                <option value="All">All Nairobi Locations</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Bedrooms</label>
              <select
                value={bedroomFilter}
                onChange={(e) => setBedroomFilter(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">Any Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Direct Broker</label>
              <div
                style={{
                  padding: "11px 14px",
                  backgroundColor: "#1f2127",
                  borderRadius: "12px",
                  fontSize: "13px",
                  color: "#ffd8a8",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                Joseph S. Kefa (0722705898)
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Guarantee</label>
              <div
                style={{
                  padding: "11px 14px",
                  backgroundColor: "#1f2127",
                  borderRadius: "12px",
                  fontSize: "13px",
                  color: "#25d366",
                  fontWeight: "600",
                  border: "1px solid rgba(37,211,102,0.2)",
                }}
              >
                100% Real Verification
              </div>
            </div>
          </div>

          {/* Quick Location Pills */}
          <div className={styles.locationPills}>
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Quick Filter:</span>
            <button
              type="button"
              className={`${styles.locationPill} ${
                selectedLocation === "Westlands & Lavington" ? styles.locationPillActive : ""
              }`}
              onClick={() => setSelectedLocation("Westlands & Lavington")}
            >
              Westlands &amp; Lavington (Featured)
            </button>
            <button
              type="button"
              className={`${styles.locationPill} ${
                selectedLocation === "Westlands" ? styles.locationPillActive : ""
              }`}
              onClick={() => setSelectedLocation("Westlands")}
            >
              Westlands
            </button>
            <button
              type="button"
              className={`${styles.locationPill} ${
                selectedLocation === "Lavington" ? styles.locationPillActive : ""
              }`}
              onClick={() => setSelectedLocation("Lavington")}
            >
              Lavington
            </button>
            <button
              type="button"
              className={`${styles.locationPill} ${
                selectedLocation === "All" ? styles.locationPillActive : ""
              }`}
              onClick={() => setSelectedLocation("All")}
            >
              Show All
            </button>
          </div>
        </div>
      </section>

      {/* Results Listings */}
      <section className={styles.resultsSection}>
        <div className="container">
          <div className={styles.resultsHeader}>
            <span className={styles.resultsCount}>
              Showing {filteredVillas.length} verified luxury villas in{" "}
              {selectedLocation}
            </span>
          </div>

          <div className={styles.cardsGrid}>
            {filteredVillas.map((villa) => (
              <div key={villa.id} className={styles.propertyCard}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={villa.image}
                    alt={villa.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.cardImg}
                  />
                  <span className={styles.verifiedBadge}>Verified Listing</span>
                  <div className={styles.locationBadge}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{villa.neighborhood}</span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{villa.title}</h3>
                  <p className={styles.cardDescription}>{villa.description}</p>

                  <div className={styles.specsRow}>
                    <span className={styles.specItem}>
                      <strong>{villa.bedrooms}</strong> Beds
                    </span>
                    <span>·</span>
                    <span className={styles.specItem}>
                      <strong>{villa.bathrooms}</strong> Baths
                    </span>
                    <span>·</span>
                    <span>Site Viewing Ready</span>
                  </div>

                  <div className={styles.priceTag}>{villa.price}</div>

                  <div className={styles.cardActions}>
                    <button
                      type="button"
                      className={styles.viewingBtn}
                      onClick={() => setSelectedVilla(villa)}
                    >
                      Book Site Viewing
                    </button>

                    <a
                      href={getWhatsAppLink(villa)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.whatsappBtn}
                    >
                      <span>WhatsApp Joseph</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* On-site viewing booking section */}
      <SiteViewingSection />

      <SpheraFooter />

      <CaseStudyModal
        project={selectedVilla}
        onClose={() => setSelectedVilla(null)}
        onBookViewing={() => {
          const el = document.getElementById("site-viewing");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </main>
  );
}
