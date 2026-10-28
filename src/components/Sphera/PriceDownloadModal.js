"use client";

import { useState } from "react";
import styles from "./SpheraModals.module.css";

export default function PriceDownloadModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("cottages");
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setDownloaded(true);
  };

  const handleReset = () => {
    setDownloaded(false);
    setEmail("");
    setPhone("");
    onClose();
  };

  return (
    <div className={styles.backdrop} onClick={handleReset}>
      <div
        className={styles.modalWindow}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className={styles.closeBtn}
          onClick={handleReset}
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {!downloaded ? (
          <>
            <div className={styles.modalHeader}>
              <span className={styles.modalTag}>PRICE &amp; SPECIFICATIONS</span>
              <h3 className={styles.modalTitle}>Download Peak Housing Price Catalog</h3>
              <p className={styles.modalSubtitle}>
                Receive the complete 2026 architectural lookbook with unit cost breakdowns,
                structural specifications, and turnkey construction timelines.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Typology Interest</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={styles.formSelect}
                >
                  <option value="cottages">Modern Minimalist Cottages (200–450 m²)</option>
                  <option value="townhouses">Urban Townhouses (160–260 m²)</option>
                  <option value="settlements">Private Gated Settlements &amp; Master Plans</option>
                  <option value="investing">Commercial &amp; Investing Spaces</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Your Email Address</label>
                <input
                  type="email"
                  placeholder="client@peakhousing.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Phone Number (Optional)</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles.formInput}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Download PDF Price Book (18 MB) ↓
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successBox}>
            <div className={styles.successIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className={styles.modalTitle}>Catalog Dispatched</h3>
            <p className={styles.modalSubtitle}>
              The digital price lookbook has been delivered to {email}. A direct download link has also been activated.
            </p>
            <button
              type="button"
              className={styles.submitBtn}
              onClick={handleReset}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
