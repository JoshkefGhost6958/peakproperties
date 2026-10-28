"use client";

import styles from "./Modals.module.css";

export default function FloorPlanModal({ apartment, onClose, onBookUnit }) {
  if (!apartment) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={`${styles.modalWindow} ${styles.modalWindowWide}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
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
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className={styles.modalHeader}>
          <span className={styles.modalTag}>FLOOR PLAN & SPECIFICATIONS</span>
          <h3 className={styles.modalTitle}>
            {apartment.title} — {apartment.exactArea}
          </h3>
          <p className={styles.modalSubtitle}>
            Business-class layout with panoramic glazing and soundproofed perimeter.
          </p>
        </div>

        <div className={styles.floorPlanGrid}>
          {/* Architectural Blueprint SVG */}
          <div className={styles.blueprintBox}>
            <svg
              className={styles.blueprintSvg}
              viewBox="0 0 400 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer walls */}
              <rect
                x="20"
                y="20"
                width="360"
                height="280"
                rx="6"
                stroke="#17181a"
                strokeWidth="6"
                fill="#ffffff"
              />
              {/* Internal dividing walls */}
              <line x1="180" y1="20" x2="180" y2="200" stroke="#17181a" strokeWidth="4" />
              <line x1="20" y1="200" x2="280" y2="200" stroke="#17181a" strokeWidth="4" />
              <line x1="280" y1="120" x2="380" y2="120" stroke="#17181a" strokeWidth="4" />

              {/* Balcony / Loggia */}
              <rect
                x="300"
                y="200"
                width="80"
                height="100"
                stroke="#17181a"
                strokeWidth="2"
                strokeDasharray="4 4"
                fill="#f1f5f9"
              />
              <text x="320" y="255" fill="#64748b" fontSize="11" fontWeight="600">
                Loggia
              </text>

              {/* Room 1: Living & Kitchen */}
              <rect x="30" y="30" width="140" height="160" fill="#f8fafc" rx="4" />
              <text x="50" y="80" fill="#0f172a" fontSize="13" fontWeight="700">
                Living / Kitchen
              </text>
              <text x="50" y="100" fill="#64748b" fontSize="11">
                18.2 m² (196 sq ft)
              </text>

              {/* Room 2: Bedroom */}
              <rect x="190" y="30" width="180" height="80" fill="#f8fafc" rx="4" />
              <text x="210" y="70" fill="#0f172a" fontSize="13" fontWeight="700">
                Master Bedroom
              </text>
              <text x="210" y="90" fill="#64748b" fontSize="11">
                16.4 m² (176 sq ft)
              </text>

              {/* Room 3: Bathroom */}
              <rect x="30" y="210" width="110" height="80" fill="#e2e8f0" rx="4" />
              <text x="50" y="250" fill="#0f172a" fontSize="12" fontWeight="700">
                Bathroom
              </text>
              <text x="50" y="268" fill="#64748b" fontSize="11">
                4.6 m²
              </text>

              {/* Entrance Door */}
              <path
                d="M150 300 Q170 300 170 280"
                stroke="#c89d6e"
                strokeWidth="2.5"
                fill="none"
              />
              <text x="180" y="270" fill="#c89d6e" fontSize="11" fontWeight="600">
                Entrance
              </text>
            </svg>
          </div>

          {/* Details & Specs */}
          <div className={styles.specsCol}>
            <div>
              <span className={styles.modalTag}>STARTING PRICE</span>
              <div className={styles.specsPrice}>{apartment.price}</div>
              <div style={{ fontSize: "13px", color: "#c89d6e", fontWeight: "600" }}>
                {apartment.priceRub} · {apartment.monthly}
              </div>
            </div>

            <div className={styles.specsTable}>
              <div className={styles.specsRow}>
                <span className={styles.specsKey}>Floor Levels:</span>
                <span className={styles.specsVal}>{apartment.floor}</span>
              </div>
              <div className={styles.specsRow}>
                <span className={styles.specsKey}>Ceiling Height:</span>
                <span className={styles.specsVal}>{apartment.ceiling}</span>
              </div>
              <div className={styles.specsRow}>
                <span className={styles.specsKey}>Finishing:</span>
                <span className={styles.specsVal}>White Box Pre-finish</span>
              </div>
              <div className={styles.specsRow}>
                <span className={styles.specsKey}>Estimated Handover:</span>
                <span className={styles.specsVal}>Q4 2027</span>
              </div>
            </div>

            <div className={styles.featuresList}>
              {apartment.features.map((feat, i) => (
                <div key={i} className={styles.featureBullet}>
                  <svg
                    width="14"
                    height="14"
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
              className={styles.submitBtn}
              onClick={() => {
                onClose();
                onBookUnit(apartment);
              }}
            >
              Reserve This Floor Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
