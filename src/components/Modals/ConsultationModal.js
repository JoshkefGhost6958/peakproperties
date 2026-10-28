"use client";

import { useState } from "react";
import styles from "./Modals.module.css";

export default function ConsultationModal({ isOpen, onClose, initialInterest }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState(initialInterest || "1bed");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
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

        {!submitted ? (
          <>
            <div className={styles.modalHeader}>
              <span className={styles.modalTag}>CONSULTATION</span>
              <h3 className={styles.modalTitle}>Request a Presentation</h3>
              <p className={styles.modalSubtitle}>
                Leave your contact details and our personal broker will provide
                the latest pricing, availability catalogs, and installment plans.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alexander Smith"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000 or +7..."
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Residence Interest</label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className={styles.formSelect}
                >
                  <option value="studio">Studio (from 25 m² / $110,000)</option>
                  <option value="1bed">1-Bedroom (from 36 m² / $140,000)</option>
                  <option value="2bed">2-Bedroom (from 52 m² / $198,000)</option>
                  <option value="3bed">3-Bedroom (from 78 m² / $270,000)</option>
                  <option value="commercial">Commercial Ground Floor Space</option>
                  <option value="mortgage">Mortgage & Financing Consultation</option>
                </select>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Get Consultation & Price Catalog
              </button>

              <p className={styles.disclaimer}>
                By submitting, you agree to our Privacy Policy and consent to receive personal assistance from our dedicated sales office.
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className={styles.modalTitle}>Request Received!</h3>
            <p className={styles.modalSubtitle}>
              Thank you, {name}. Our personal concierge broker will contact you shortly at {phone} with full floor plans and private viewing options.
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
