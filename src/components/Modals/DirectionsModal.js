"use client";

import styles from "./Modals.module.css";

export default function DirectionsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modalWindow}
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
          <span className={styles.modalTag}>LOCATION & TRANSPORT</span>
          <h3 className={styles.modalTitle}>How to Reach FORMA</h3>
          <p className={styles.modalSubtitle}>
            Situated in Kazan&apos;s Novo-Savinovsky district on Chistopolskaya Street,
            right beside the Kazanka River promenade.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              padding: "18px 20px",
              backgroundColor: "#f7f8fa",
              borderRadius: "16px",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontWeight: "700", color: "#17181a", marginBottom: "4px" }}>
              Sales Gallery Address
            </div>
            <div style={{ fontSize: "14px", color: "#4b5563" }}>
              86 Chistopolskaya Street, Business Center &quot;Stolitsa&quot;, 1st Floor, Kazan, Russia
            </div>
            <div style={{ fontSize: "13px", color: "#c89d6e", marginTop: "6px", fontWeight: "600" }}>
              Daily 9:00 AM – 9:00 PM · Dedicated Guest Valet Parking Available
            </div>
          </div>

          <div className={styles.specsTable}>
            <div className={styles.specsRow}>
              <span className={styles.specsKey}>Millennium Bridge:</span>
              <span className={styles.specsVal}>3 minutes by car</span>
            </div>
            <div className={styles.specsRow}>
              <span className={styles.specsKey}>Kazan Kremlin & Center:</span>
              <span className={styles.specsVal}>7 minutes</span>
            </div>
            <div className={styles.specsRow}>
              <span className={styles.specsKey}>Riviera Resort & Beach:</span>
              <span className={styles.specsVal}>4 minutes walk</span>
            </div>
            <div className={styles.specsRow}>
              <span className={styles.specsKey}>Ak Bars Arena:</span>
              <span className={styles.specsVal}>5 minutes</span>
            </div>
            <div className={styles.specsRow}>
              <span className={styles.specsKey}>Kozya Sloboda Metro:</span>
              <span className={styles.specsVal}>6 minutes</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <a
              href="https://yandex.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.submitBtn}
              style={{
                textDecoration: "none",
                display: "inline-block",
                backgroundColor: "#fc3f1d",
              }}
            >
              Open in Yandex Maps
            </a>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.submitBtn}
              style={{
                textDecoration: "none",
                display: "inline-block",
                backgroundColor: "#17181a",
              }}
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
