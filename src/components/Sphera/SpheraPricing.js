"use client";

import styles from "./SpheraPricing.module.css";

const PACKAGES = [
  {
    id: "concept",
    name: "Architectural Concept",
    price: "$45",
    subprice: "per m²",
    featured: false,
    features: [
      "Site zoning & sun orientation study",
      "Floor plans & interior volume layouts",
      "3D volumetric massing models",
      "Exterior material selection board",
      "Preliminary budget calculation",
    ],
  },
  {
    id: "blueprints",
    name: "Full Architectural BIM",
    price: "$95",
    subprice: "per m²",
    featured: true,
    features: [
      "All Architectural Concept deliverables",
      "Structural engineering & foundation calculations",
      "MEP engineering (HVAC, electrical, plumbing)",
      "High-resolution 8K photorealistic visualizations",
      "Official building permit filing package",
    ],
  },
  {
    id: "turnkey",
    name: "Turnkey Development",
    price: "Custom",
    subprice: "full execution",
    featured: false,
    features: [
      "Complete architectural & structural package",
      "General contractor management & scheduling",
      "Direct procurement of imported materials",
      "Weekly authorial on-site field supervision",
      "5-Year comprehensive structural warranty",
    ],
  },
];

export default function SpheraPricing({ onSelectPackage, onOpenDownloadPrice }) {
  return (
    <section className={styles.section} id="pricing">
      <div className="container">
        <div className={styles.headerRow}>
          <div>
            <h2 className={styles.heading}>Architectural Design Packages</h2>
          </div>

          <button
            type="button"
            className={styles.selectPkgBtn}
            style={{ width: "auto", padding: "12px 24px" }}
            onClick={onOpenDownloadPrice}
          >
            Download Price Catalog (PDF) ↓
          </button>
        </div>

        <div className={styles.packagesGrid}>
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`${styles.packageCard} ${
                pkg.featured ? styles.packageFeatured : ""
              }`}
            >
              {pkg.featured && (
                <div className={styles.featureBadge}>Most Popular</div>
              )}

              <div>
                <h3 className={styles.packageName}>{pkg.name}</h3>
                <div className={styles.packagePrice}>
                  {pkg.price}{" "}
                  <span className={styles.packagePeriod}>/ {pkg.subprice}</span>
                </div>
              </div>

              <div className={styles.featuresList}>
                {pkg.features.map((feat, i) => (
                  <div key={i} className={styles.featureItem}>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className={styles.selectPkgBtn}
                onClick={() => onSelectPackage(pkg)}
              >
                Choose {pkg.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
