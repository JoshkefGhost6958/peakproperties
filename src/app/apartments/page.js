"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SpheraHeader from "@/components/Sphera/SpheraHeader";
import SpheraFooter from "@/components/Sphera/SpheraFooter";
import SiteViewingSection from "@/components/Sphera/SiteViewingSection";
import CaseStudyModal from "@/components/Sphera/CaseStudyModal";
import styles from "@/components/Properties/PropertyPage.module.css";

const APARTMENTS_DATA = [
  {
    id: "rhapta-luxury-two-bed",
    title: "The Horizon 2-Bedroom Suite · Westlands",
    location: "Westlands",
    neighborhood: "Rhapta Road, Westlands",
    area: "2 Beds · 128 m² · High Floor",
    price: "KES 18,500,000",
    bedrooms: 2,
    bathrooms: 2.5,
    image: "/images/twobed.jpg",
    description:
      "Contemporary two-bedroom master en-suite apartment featuring German kitchen fittings, floor-to-ceiling soundproof double glazing, solar water heating, and wrap-around sunset balcony. What you see is what you get.",
    features: ["Heated Rooftop Pool", "High Speed Lifts", "Full Backup Generator", "Borehole Water"],
  },
  {
    id: "lavington-penthouse-three-bed",
    title: "Terrace Skyline 3-Bed Penthouse · Lavington",
    location: "Lavington",
    neighborhood: "Off James Gichuru, Lavington",
    area: "3 Beds · 210 m² · Rooftop Terrace",
    price: "KES 32,000,000",
    bedrooms: 3,
    bathrooms: 3.5,
    image: "/images/onebed.jpg",
    description:
      "Expansive top-floor penthouse with private cedar sundeck, custom hardwood cabinetry, self-contained staff quarters, and dedicated twin parking bays. Physical inspection ready.",
    features: ["Private Sky Terrace", "DSQ with Separate Access", "Clubhouse & Gym", "Biometric Access"],
  },
  {
    id: "westlands-designer-studio",
    title: "Executive Modern Studio · Westlands",
    location: "Westlands",
    neighborhood: "General Mathenge, Westlands",
    area: "Studio · 48 m² · Fully Serviced",
    price: "KES 7,200,000",
    bedrooms: 0,
    bathrooms: 1,
    image: "/images/studio.jpg",
    description:
      "High-yield executive studio in high demand location. High return on investment for short-stay BnB or corporate expatriate rental. Complete with built-in European kitchenette.",
    features: ["Projected 12% ROI", "24/7 Concierge Desk", "Infinity Pool", "Coffee Bar on Ground Floor"],
  },
  {
    id: "lavington-one-bed-sanctuary",
    title: "Garden View 1-Bedroom · Lavington",
    location: "Lavington",
    neighborhood: "Mbaazi Avenue, Lavington",
    area: "1 Bed · 65 m² · Garden Facing",
    price: "KES 11,800,000",
    bedrooms: 1,
    bathrooms: 1.5,
    image: "/images/onebed.jpg",
    description:
      "Tranquil one-bedroom residence overlooking serene green canopy. Featuring open-concept quartz kitchen, guest powder room, and high-efficiency induction cooking.",
    features: ["Garden Balcony", "Intercom System", "Ample Visitor Parking", "Perimeter Electric Fence"],
  },
  {
    id: "westlands-executive-three-bed",
    title: "The Mathenge Collection 3-Bed · Westlands",
    location: "Westlands",
    neighborhood: "General Mathenge Drive, Westlands",
    area: "3 Beds · 190 m² · All En-suite",
    price: "KES 26,500,000",
    bedrooms: 3,
    bathrooms: 3.5,
    image: "/images/twobed.jpg",
    description:
      "Premium family apartment with direct lift foyer access, expansive living lounge, Italian granite countertops, and panoramic views across Karura Forest. Zero discrepancies between listing and reality.",
    features: ["Direct Foyer Lift Access", "Karura Forest Views", "Children Play Lawn", "Smart Lighting"],
  },
];

export default function ApartmentsPage() {
  const [apartments, setApartments] = useState(APARTMENTS_DATA);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [bedroomFilter, setBedroomFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedApartment, setSelectedApartment] = useState(null);

  // Load live apartments from CMS API
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const res = await fetch("/api/content?collection=apartments");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const liveOnly = json.data.filter((item) => item.isPublished !== false);
          if (liveOnly.length > 0) {
            setApartments(liveOnly);
          }
        }
      } catch (e) {
        // Fallback silently
      }
    };
    fetchApartments();
  }, []);

  const filteredApartments = apartments
    .filter((apt) => {
      const matchLocation =
        selectedLocation === "All"
          ? true
          : selectedLocation === "Westlands & Lavington"
          ? apt.location === "Westlands" || apt.location === "Lavington"
          : apt.location.toLowerCase() === selectedLocation.toLowerCase();

      const matchBeds =
        bedroomFilter === "all"
          ? true
          : bedroomFilter === "studio"
          ? apt.bedrooms === 0
          : apt.bedrooms === Number(bedroomFilter);

      const matchSearch = searchQuery.trim()
        ? [apt.title, apt.location, apt.neighborhood, apt.description, ...(apt.features || [])]
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase().trim())
        : true;

      return matchLocation && matchBeds && matchSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "price-asc") return (a.priceNum || 0) - (b.priceNum || 0);
      if (sortOrder === "price-desc") return (b.priceNum || 0) - (a.priceNum || 0);
      return 0;
    });

  const getWhatsAppLink = (apt) => {
    const text = `Hello Joseph Simiyu Kefa, I am inquiring about the apartment: ${apt.title} (${apt.price}). Please schedule a site viewing session.`;
    return `https://wa.me/254722705898?text=${encodeURIComponent(text)}`;
  };

  return (
    <main className={styles.pageWrapper}>
      <SpheraHeader />

      {/* Hero Header with continuous background extending behind navbar and filters */}
      <section className={styles.pageHero}>
        <Image
          src="/images/twobed.jpg"
          alt="Luxury & Executive Apartments Nairobi"
          fill
          priority
          className={styles.heroBgImage}
        />
        <div className={styles.heroOverlay} />

        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.title}>Luxury &amp; Executive Apartments</h1>
          <p className={styles.subtitle}>
            Hand-curated executive apartments and penthouses. Search filters default
            to prime Westlands and Lavington addresses. What you see is what you
            get — all units are physically inspected with confirmed titles and
            occupancy certificates.
          </p>

          {/* Unified Glassmorphism Filter & Search Card */}
          <div className={styles.filterCard}>
            <div className={styles.filterMainRow}>
              {/* Actual Location Search Input */}
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <span>Search Location &amp; Unit</span>
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
                    placeholder="Search road, area, or street (e.g. Westlands, Rhapta Road)..."
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

              {/* Location Select */}
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Location Zone</label>
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
                  <option value="All">All Nairobi Locations</option>
                </select>
              </div>

              {/* Bedrooms Select */}
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Bedrooms / Layout</label>
                <select
                  value={bedroomFilter}
                  onChange={(e) => setBedroomFilter(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">Any Layout</option>
                  <option value="studio">Studio</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms &amp; Penthouses</option>
                </select>
              </div>

              {/* Sort Order */}
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Sort Order</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="default">Featured Selection</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Location Quick Filter Pills */}
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
                  setSearchQuery("Westlands");
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
                  setSearchQuery("Lavington");
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
              Showing {filteredApartments.length} verified apartments in {selectedLocation}
            </span>
          </div>

          <div className={styles.cardsGrid}>
            {filteredApartments.map((apt) => (
              <div key={apt.id} className={styles.propertyCard}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={apt.image}
                    alt={apt.title}
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
                    <span>{apt.neighborhood}</span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{apt.title}</h3>
                  <p className={styles.cardDescription}>{apt.description}</p>

                  <div className={styles.specsRow}>
                    <span className={styles.specItem}>
                      <strong>{apt.bedrooms === 0 ? "Studio" : `${apt.bedrooms} Bed`}</strong>
                    </span>
                    <span>·</span>
                    <span className={styles.specItem}>
                      <strong>{apt.bathrooms}</strong> Baths
                    </span>
                    <span>·</span>
                    <span>{apt.area.split("·")[1]?.trim() || "Spacious Layout"}</span>
                  </div>

                  <div className={styles.priceTag}>{apt.price}</div>

                  <div className={styles.cardActions}>
                    <button
                      type="button"
                      className={styles.viewingBtn}
                      onClick={() => setSelectedApartment(apt)}
                    >
                      Book Site Viewing
                    </button>

                    <a
                      href={getWhatsAppLink(apt)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.whatsappBtn}
                    >
                      <Image
                        src="/images/coordinator.jpeg"
                        alt="Joseph Simiyu Kefa"
                        width={18}
                        height={18}
                        style={{ borderRadius: "50%", objectFit: "cover", border: "1px solid #ffd8a8" }}
                      />
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
        project={selectedApartment}
        onClose={() => setSelectedApartment(null)}
        onBookViewing={() => {
          const el = document.getElementById("site-viewing");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </main>
  );
}
