"use client";

import { useState } from "react";
import styles from "./Modals.module.css";

export default function BrochureModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = (e) => {
    e.preventDefault();
    if (!email) return;
    setDownloaded(true);
  };

  const handleReset = () => {
    setDownloaded(false);
    setEmail("");
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

        {!downloaded ? (
          <>
            <div className={styles.modalHeader}>
              <span className={styles.modalTag}>PROJECT BROCHURE</span>
              <h3 className={styles.modalTitle}>Download FORMA Lookbook</h3>
              <p className={styles.modalSubtitle}>
                Get our comprehensive 48-page architectural catalog featuring
                detailed master plans, engineering specifications, landscape
                designs, and finishing standards.
              </p>
            </div>

            <form onSubmit={handleDownload}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Your Email Address</label>
                <input
                  type="email"
                  placeholder="alexander@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.formInput}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Download PDF Presentation (24 MB)
              </button>

              <p className={styles.disclaimer}>
                We will send the instant PDF link to your inbox. No spam.
              </p>
            </form>
          </>
        ) : (
          <div className={styles.successBox}>
            <div className={styles.successIcon}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <h3 className={styles.modalTitle}>Brochure Ready!</h3>
            <p className={styles.modalSubtitle}>
              The digital PDF lookbook has been dispatched to {email}. Check your inbox!
            </p>
            <button
              type="button"
              className={styles.submitBtn}
              onClick={handleReset}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
