"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SpheraHeader from "@/components/Sphera/SpheraHeader";
import SpheraFooter from "@/components/Sphera/SpheraFooter";
import SiteViewingSection from "@/components/Sphera/SiteViewingSection";
import CaseStudyModal from "@/components/Sphera/CaseStudyModal";
import styles from "@/components/Properties/PropertyPage.module.css";

const LAND_DATA = [
  {
    id: "lavington-half-acre-prime",
    title: "0.5 Acre Prime Residential Plot · Lavington",
    location: "Lavington",
    neighborhood: "Off Mbaazi Avenue / James Gichuru, Lavington",
    area: "0.50 Acre (Approx. 2,023 m²)",
    price: "KES 78,000,000",
    zoning: "Low Density Residential (Ideal for Luxury Single Villa or 2 Townhouses)",
    soil: "Rich Red Soil, Gentle Slope",
    titleType: "Freehold Ready Title Deed",
    image: "/images/land-lavington.jpg",
    description:
      "Exceptionally rare 0.5-acre parcel in secluded, prestigious Lavington cul-de-sac. Surrounded by mature indigenous trees, completely beaconed with stone perimeter wall, water and electricity connected. What you see is what you get.",
    features: [
      "Ready Clean Title Deed",
      "Perimeter Stone Wall in place",
      "Electricity & Water connected",
      "Serene High-End Enclave",
    ],
  },
  {
    id: "westlands-commercial-residential-plot",
    title: "0.75 Acre Redevelopment Land · Westlands",
    location: "Westlands",
    neighborhood: "Rhapta Road, Westlands",
    area: "0.75 Acre (Approx. 3,035 m²)",
    price: "KES 145,000,000",
    zoning: "High-Density Residential / Mixed-Use Approved",
    soil: "Firm Red Soil, Flat Gradient",
    titleType: "Clean Leasehold 99 Years",
    image: "/images/land-westlands.jpg",
    description:
      "Strategic corner land parcel fronting Rhapta Road in Westlands. Perfectly primed for high-end boutique apartments, modern executive townhouses, or luxury town villas. Full architectural feasibility report available.",
    features: [
      "Direct Tarmac Frontage",
      "High Density Zoning Permission",
      "Clean Title, Official Search Ready",
      "Dual Road Access",
    ],
  },
  {
    id: "lavington-quarter-acre-villa-plot",
    title: "0.25 Acre Gated Estate Plot · Lavington",
    location: "Lavington",
    neighborhood: "Gitanga Road Enclave, Lavington",
    area: "0.25 Acre (Approx. 1,012 m²)",
    price: "KES 42,000,000",
    zoning: "Single Family Villa / Modern Cottage",
    soil: "Well-Drained Red Soil",
    titleType: "Clean Title Deed",
    image: "/images/land-lavington.jpg",
    description:
      "Pristine quarter-acre residential plot inside an ultra-secure 24/7 guarded private gated community. Ready for immediate dream house construction with verified architectural guidelines.",
    features: [
      "Guard House & 24/7 Security",
      "Paved Cabro Access Road",
      "Ready Foundation Borehole",
      "Street Lighting Installed",
    ],
  },
  {
    id: "westlands-spring-valley-one-acre",
    title: "1.0 Acre Forest View Plot · Westlands / Spring Valley",
    location: "Westlands",
    neighborhood: "Spring Valley Border, Westlands",
    area: "1.00 Acre (Approx. 4,047 m²)",
    price: "KES 185,000,000",
    zoning: "Multi-Unit Luxury Townhouse / Embassies",
    soil: "Red Loam Soil with Mature Canopy",
    titleType: "Clean Title Deed Verified",
    image: "/images/land-westlands.jpg",
    description:
      "Spectacular ridge-view 1-acre acreage offering unparalleled privacy and tranquil forest canopy views while just 5 minutes from Sarit Centre and Westgate Mall.",
    features: [
      "Panoramic Tree-Canopy Views",
      "Subdivision Approved for 4 Units",
      "Private Guard Access",
      "Unmatched Privacy",
    ],
  },
  {
    id: "karen-one-acre-residential",
    title: "1.0 Acre Country Haven Plot · Karen",
    location: "Karen",
    neighborhood: "Miotoni Road, Karen",
    area: "1.00 Acre (Approx. 4,047 m²)",
    price: "KES 65,000,000",
    zoning: "Single Family Residential",
    soil: "Deep Red Volcanic Soil",
    titleType: "Freehold Clean Title",
    image: "/images/land-lavington.jpg",
    description:
      "Corner wooded 1-acre plot with ancient indigenous trees, level terrain, and a gentle tranquil stream along the southern perimeter. Ideal for building a bespoke country villa.",
    features: [
      "100% Freehold Title",
      "Fully Fenced & Surveyed",
      "High Security Zone",
      "Ideal for Solar & Borehole",
    ],
  },
];

export default function LandPage() {
  const [landPlots, setLandPlots] = useState(LAND_DATA);
  const [selectedLocation, setSelectedLocation] = useState("Westlands & Lavington");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [selectedLand, setSelectedLand] = useState(null);

  // Load live land from CMS API
  useEffect(() => {
    const fetchLand = async () => {
      try {
        const res = await fetch("/api/content?collection=land");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const liveOnly = json.data.filter((item) => item.isPublished !== false);
          if (liveOnly.length > 0) {
            setLandPlots(liveOnly);
          }
        }
      } catch (e) {
        // Fallback silently
      }
    };
    fetchLand();
  }, []);

  const filteredLand = landPlots.filter((plot) => {
    const matchLocation =
      selectedLocation === "All"
        ? true
        : selectedLocation === "Westlands & Lavington"
        ? plot.location === "Westlands" || plot.location === "Lavington"
        : plot.location.toLowerCase() === selectedLocation.toLowerCase();

    const matchSize =
      sizeFilter === "all"
        ? true
        : sizeFilter === "0.25"
        ? plot.area.includes("0.25")
        : sizeFilter === "0.5"
        ? plot.area.includes("0.50")
        : sizeFilter === "1.0"
        ? plot.area.includes("1.00") || plot.area.includes("0.75")
        : true;

    return matchLocation && matchSize;
  });

  const getWhatsAppLink = (plot) => {
    const text = `Hello Joseph Simiyu Kefa, I would like to schedule a beacon and title inspection site viewing for the land: ${plot.title} (${plot.price}).`;
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
            <span>Land</span>
          </div>

          <div className={styles.heroTag}>VERIFIED PRIME LAND PLOTS</div>
          <h1 className={styles.title}>Prime Land &amp; Building Plots</h1>
          <p className={styles.subtitle}>
            Authentic, title-verified parcels ready for luxury home construction
            and development. Search results default to prime Westlands &amp;
            Lavington. What you see is what you get — accurate GPS coordinates,
            physical beacon verification, and clean deed titles.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className={styles.filterSection}>
        <div className="container">
          <div className={styles.filterGrid}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Location Filter</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="Westlands & Lavington">
                  Westlands &amp; Lavington (Default Prime)
                </option>
                <option value="Westlands">Westlands Only</option>
                <option value="Lavington">Lavington Only</option>
                <option value="Karen">Karen</option>
                <option value="All">All Nairobi Locations</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Plot Acreage</label>
              <select
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">Any Acreage</option>
                <option value="0.25">0.25 Acre (Quarter)</option>
                <option value="0.5">0.50 Acre (Half)</option>
                <option value="1.0">0.75 - 1.0+ Acre</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Direct Representative</label>
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
              <label className={styles.filterLabel}>Title Status</label>
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
                Deed &amp; Beacon Verified
              </div>
            </div>
          </div>

          {/* Quick Location Pills */}
          <div className={styles.locationPills}>
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Quick Selection:</span>
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
              Showing {filteredLand.length} verified land parcels in {selectedLocation}
            </span>
          </div>

          <div className={styles.cardsGrid}>
            {filteredLand.map((plot) => (
              <div key={plot.id} className={styles.propertyCard}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={plot.image}
                    alt={plot.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.cardImg}
                  />
                  <span className={styles.verifiedBadge}>Clean Title Verified</span>
                  <div className={styles.locationBadge}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{plot.neighborhood}</span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{plot.title}</h3>
                  <p className={styles.cardDescription}>{plot.description}</p>

                  <div className={styles.specsRow}>
                    <span className={styles.specItem}>
                      <strong>{plot.area}</strong>
                    </span>
                    <span>·</span>
                    <span className={styles.specItem}>
                      {plot.soil}
                    </span>
                  </div>

                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)" }}>
                    <strong>Zoning:</strong> {plot.zoning}
                  </div>

                  <div className={styles.priceTag}>{plot.price}</div>

                  <div className={styles.cardActions}>
                    <button
                      type="button"
                      className={styles.viewingBtn}
                      onClick={() => setSelectedLand(plot)}
                    >
                      Book Beacon Inspection
                    </button>

                    <a
                      href={getWhatsAppLink(plot)}
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
        project={selectedLand}
        onClose={() => setSelectedLand(null)}
        onBookViewing={() => {
          const el = document.getElementById("site-viewing");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </main>
  );
}
