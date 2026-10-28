"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SpheraHeader from "@/components/Sphera/SpheraHeader";
import SpheraFooter from "@/components/Sphera/SpheraFooter";
import SiteViewingSection from "@/components/Sphera/SiteViewingSection";
import CaseStudyModal from "@/components/Sphera/CaseStudyModal";
import styles from "@/components/Properties/PropertyPage.module.css";

const BNBS_DATA = [
  {
    id: "lavington-hillside-suite",
    title: "Hillside Glass Sanctuary Suite · Lavington",
    location: "Lavington",
    neighborhood: "Mbaazi Avenue, Lavington",
    area: "Entire Suite · 2 Guests · King Bed",
    price: "KES 11,500 / night",
    type: "suite",
    bedrooms: 1,
    bathrooms: 1,
    image: "/images/peak-bnb.jpg",
    description:
      "Modernist luxury retreat with panoramic floor-to-ceiling glass, private balcony overlooking lush greenery, rainfall shower, 100Mbps dedicated fiber WiFi, and bespoke kitchenette. What you see is what you get.",
    features: ["High-Speed 100Mbps WiFi", "Smart 4K TV & Netflix", "Daily Housekeeping", "Private Balcony"],
  },
  {
    id: "westlands-skyline-executive-loft",
    title: "Rhapta Skyline Executive Studio · Westlands",
    location: "Westlands",
    neighborhood: "Rhapta Road, Westlands",
    area: "Studio Loft · 2 Guests · Queen Bed",
    price: "KES 8,500 / night",
    type: "studio",
    bedrooms: 0,
    bathrooms: 1,
    image: "/images/studio.jpg",
    description:
      "Chic urban oasis moments from Westlands nightlife and business hubs. Heated rooftop pool access, gym, secure biometric entry, and silent workspace.",
    features: ["Rooftop Heated Pool", "24/7 Concierge & Security", "Fully Equipped Kitchen", "Washer/Dryer"],
  },
  {
    id: "westlands-mathenge-two-bed-residence",
    title: "The Mathenge Two-Bedroom Haven · Westlands",
    location: "Westlands",
    neighborhood: "General Mathenge, Westlands",
    area: "Entire 2-Bed Flat · 4 Guests · 2 En-suites",
    price: "KES 16,000 / night",
    type: "residence",
    bedrooms: 2,
    bathrooms: 2,
    image: "/images/twobed.jpg",
    description:
      "Spacious designer apartment catering to discerning business travelers and families. Wrap-around balcony, king plush mattresses, espresso machine, and 2 designated parking slots.",
    features: ["Dedicated Workstations", "Nespresso Machine", "Full Power Backup", "Karura Forest Proximity"],
  },
  {
    id: "lavington-contemporary-garden-cottage",
    title: "Private Courtyard Villa Cottage · Lavington",
    location: "Lavington",
    neighborhood: "Off James Gichuru, Lavington",
    area: "Entire Cottage · 3 Guests · 1.5 Beds",
    price: "KES 14,000 / night",
    type: "cottage",
    bedrooms: 1,
    bathrooms: 1.5,
    image: "/images/onebed.jpg",
    description:
      "Secluded private garden guest house surrounded by mature botanical gardens. Outdoor fire pit, gas barbecue grill, sun loungers, and 24-hour manned guardhouse.",
    features: ["Private Garden Courtyard", "Outdoor Firepit & BBQ", "Borehole Water", "Silent Peaceful Enclave"],
  },
];

export default function BnBsPage() {
  const [bnbs, setBnbs] = useState(BNBS_DATA);
  const [selectedLocation, setSelectedLocation] = useState("Westlands & Lavington");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedBnb, setSelectedBnb] = useState(null);

  // Load live BnBs from CMS API
  useEffect(() => {
    const fetchBnBs = async () => {
      try {
        const res = await fetch("/api/content?collection=bnbs");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const liveOnly = json.data.filter((item) => item.isPublished !== false);
          if (liveOnly.length > 0) {
            setBnbs(liveOnly);
          }
        }
      } catch (e) {
        // Fallback silently
      }
    };
    fetchBnBs();
  }, []);

  const filteredBnBs = bnbs
    .filter((bnb) => {
      const matchSearch =
        searchQuery.trim() === ""
          ? true
          : (bnb.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (bnb.location || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (bnb.neighborhood || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (bnb.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (bnb.area || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (bnb.features || []).some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchLocation =
        selectedLocation === "All"
          ? true
          : selectedLocation === "Westlands & Lavington"
          ? bnb.location === "Westlands" || bnb.location === "Lavington"
          : bnb.location.toLowerCase() === selectedLocation.toLowerCase();

      const matchType =
        typeFilter === "all" ? true : bnb.type === typeFilter;

      return matchSearch && matchLocation && matchType;
    })
    .sort((a, b) => {
      if (sortOrder === "price-asc") {
        const pA = parseInt((a.price || "").replace(/[^0-9]/g, "")) || 0;
        const pB = parseInt((b.price || "").replace(/[^0-9]/g, "")) || 0;
        return pA - pB;
      }
      if (sortOrder === "price-desc") {
        const pA = parseInt((a.price || "").replace(/[^0-9]/g, "")) || 0;
        const pB = parseInt((b.price || "").replace(/[^0-9]/g, "")) || 0;
        return pB - pA;
      }
      return 0;
    });

  const getWhatsAppBookingLink = (bnb) => {
    const text = `Hello Joseph Simiyu Kefa, I would like to reserve / inquire about booking dates for the verified BnB: ${bnb.title} (${bnb.price}).`;
    return `https://wa.me/254722705898?text=${encodeURIComponent(text)}`;
  };

  return (
    <main className={styles.pageWrapper}>
      <SpheraHeader />

      {/* Hero Header with seamless image extending through navbar & filters */}
      <section className={styles.pageHero}>
        <Image
          src="/images/peak-bnb.jpg"
          alt="Luxury BnBs and Short Stays Nairobi"
          fill
          priority
          className={styles.heroBgImage}
        />
        <div className={styles.heroOverlay} />

        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.title}>Luxury BnBs &amp; Short Stays</h1>
          <p className={styles.subtitle}>
            Experience hand-verified furnished apartments and private boutique
            villas. Default search displays prime Westlands and Lavington stays.
            What you see is what you get — identical to photos, ultra-clean, and
            professionally managed.
          </p>

          {/* Unified Glassmorphism Filter & Search Card */}
          <div className={styles.filterCard}>
            <div className={styles.filterMainRow}>
              {/* Actual Search Filter */}
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <span>Search Location &amp; Keywords</span>
                </label>
                <div className={styles.searchBoxWrapper}>
                  <div className={styles.searchIcon}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by neighborhood, street, or format..."
                    className={styles.searchInput}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className={styles.clearSearchBtn}
                      title="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Location Dropdown */}
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Prime Neighborhood</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="Westlands & Lavington">
                    Westlands &amp; Lavington (Featured)
                  </option>
                  <option value="Westlands">Westlands Only</option>
                  <option value="Lavington">Lavington Only</option>
                  <option value="All">All Locations</option>
                </select>
              </div>

              {/* Stay Format Filter */}
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Stay Format</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">Any Format</option>
                  <option value="suite">Glass Sanctuary Suite</option>
                  <option value="studio">Executive Studio Loft</option>
                  <option value="residence">2-Bedroom Residence</option>
                  <option value="cottage">Garden Cottage</option>
                </select>
              </div>

              {/* Sort Order */}
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Sort By Rate</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="default">Featured Selection</option>
                  <option value="price-asc">Nightly Rate: Low to High</option>
                  <option value="price-desc">Nightly Rate: High to Low</option>
                </select>
              </div>
            </div>

            {/* Quick Location Pills */}
            <div className={styles.locationPills}>
              <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Quick Selection:</span>
              <button
                type="button"
                className={`${styles.locationPill} ${
                  selectedLocation === "Westlands & Lavington" && !searchQuery ? styles.locationPillActive : ""
                }`}
                onClick={() => {
                  setSelectedLocation("Westlands & Lavington");
                  setSearchQuery("");
                }}
              >
                Westlands &amp; Lavington (Featured)
              </button>
              <button
                type="button"
                className={`${styles.locationPill} ${
                  selectedLocation === "Westlands" ? styles.locationPillActive : ""
                }`}
                onClick={() => {
                  setSelectedLocation("Westlands");
                  setSearchQuery("");
                }}
              >
                Westlands
              </button>
              <button
                type="button"
                className={`${styles.locationPill} ${
                  selectedLocation === "Lavington" ? styles.locationPillActive : ""
                }`}
                onClick={() => {
                  setSelectedLocation("Lavington");
                  setSearchQuery("");
                }}
              >
                Lavington
              </button>
              <button
                type="button"
                className={`${styles.locationPill} ${
                  selectedLocation === "All" && !searchQuery ? styles.locationPillActive : ""
                }`}
                onClick={() => {
                  setSelectedLocation("All");
                  setSearchQuery("");
                }}
              >
                Show All
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Listings */}
      <section className={styles.resultsSection}>
        <div className="container">
          <div className={styles.resultsHeader}>
            <span className={styles.resultsCount}>
              Showing {filteredBnBs.length} verified stays in {selectedLocation}
            </span>
          </div>

          <div className={styles.cardsGrid}>
            {filteredBnBs.map((bnb) => (
              <div key={bnb.id} className={styles.propertyCard}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={bnb.image}
                    alt={bnb.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.cardImg}
                  />
                  <span className={styles.verifiedBadge}>Verified BnB</span>
                  <div className={styles.locationBadge}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{bnb.neighborhood}</span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{bnb.title}</h3>
                  <p className={styles.cardDescription}>{bnb.description}</p>

                  <div className={styles.specsRow}>
                    <span className={styles.specItem}>
                      <strong>{bnb.area.split("·")[1]?.trim() || "Guests Welcome"}</strong>
                    </span>
                    <span>·</span>
                    <span className={styles.specItem}>
                      Fast WiFi &amp; Streaming
                    </span>
                  </div>

                  <div className={styles.priceTag}>{bnb.price}</div>

                  <div className={styles.cardActions}>
                    <button
                      type="button"
                      className={styles.viewingBtn}
                      onClick={() => setSelectedBnb(bnb)}
                    >
                      View Details
                    </button>

                    <a
                      href={getWhatsAppBookingLink(bnb)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.whatsappBtn}
                    >
                      <span>Book on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Site Inspection or Booking Section */}
      <SiteViewingSection />

      <SpheraFooter />

      <CaseStudyModal
        project={selectedBnb}
        onClose={() => setSelectedBnb(null)}
        onBookViewing={() => {
          const el = document.getElementById("site-viewing");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </main>
  );
}
