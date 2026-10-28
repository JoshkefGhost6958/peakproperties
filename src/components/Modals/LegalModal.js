"use client";

import styles from "./Modals.module.css";

export default function LegalModal({ type, onClose }) {
  if (!type) return null;

  const isPrivacy = type === "privacy";

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
          <span className={styles.modalTag}>LEGAL INFORMATION</span>
          <h3 className={styles.modalTitle}>
            {isPrivacy ? "Privacy Policy" : "Equity Construction Agreement (DDU)"}
          </h3>
          <p className={styles.modalSubtitle}>
            Developer: Specialized Developer LLC &quot;FORMA-DEVELOPMENT&quot;.
          </p>
        </div>

        <div style={{ fontSize: "14px", color: "#4b5563", lineHeight: 1.6, display: "flex", flexDirection: "column", gap: "12px" }}>
          {isPrivacy ? (
            <>
              <p>
                This Privacy Policy establishes the procedure for processing and protecting personal data collected through the official website of the residential complex FORMA.
              </p>
              <p>
                We handle personal information in strict accordance with the Federal Law on Personal Data. All phone numbers, names, and contact inquiries are utilized exclusively to provide requested real estate consultations, mortgage calculations, and purchase contracts.
              </p>
              <p>
                We do not sell, license, or transfer your contact information to unauthorized third-party commercial entities.
              </p>
            </>
          ) : (
            <>
              <p>
                All residential units in FORMA are sold strictly in compliance with Federal Law No. 214-FZ through Escrow accounts opened in major state-licensed banks (Sberbank, VTB).
              </p>
              <p>
                Buyer funds remain safely secured on the escrow account until the facility is officially commissioned and approved by the State Construction Inspectorate.
              </p>
              <p>
                Project declaration and state permits are registered in the Unified Information System for Housing Construction (наш.дом.рф).
              </p>
            </>
          )}
        </div>

        <button
          type="button"
          className={styles.submitBtn}
          onClick={onClose}
          style={{ marginTop: "24px" }}
        >
          Understood
        </button>
      </div>
    </div>
  );
}
