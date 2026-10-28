"use client";

import { useState } from "react";
import styles from "./SpheraModals.module.css";

export default function CustomHouseModal({ isOpen, onClose }) {
  const [style, setStyle] = useState("cubist");
  const [area, setArea] = useState(280);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {!submitted ? (
          <>
            <div className={styles.modalHeader}>
              <span className={styles.modalTag}>BESPOKE ARCHITECTURE</span>
              <h3 className={styles.modalTitle}>Design Your Custom Villa</h3>
              <p className={styles.modalSubtitle}>
                Tell us about your land plot and family lifestyle scenario to receive
                an initial volumetric architectural sketch from our lead architect.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Architectural Language</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className={styles.formSelect}
                >
                  <option value="cubist">Modernist Cubist (Standing seam &amp; glass)</option>
                  <option value="organic">Organic Wood &amp; Basalt Stone (Cedar &amp; stone)</option>
                  <option value="scandi">Nordic White Pavilion (Triple-glazed minimalist)</option>
                  <option value="cantilever">Hillside Cantilever &amp; Terraces</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <label className={styles.formLabel}>Desired Total Area</label>
                  <span style={{ fontSize: "14px", fontWeight: "700", color: "#ffffff" }}>
                    {area} m² ({Math.round(area * 10.764)} sq ft)
                  </span>
                </div>
                <input
                  type="range"
                  min="160"
                  max="650"
                  step="10"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  style={{
                    width: "100%",
                    accentColor: "#ffffff",
                    cursor: "pointer",
                    height: "6px",
                  }}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Full Name</label>
                <input
                  type="text"
                  placeholder="Alexander Wright"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Phone or WhatsApp</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles.formInput}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Schedule Lead Architect Consultation
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
            <h3 className={styles.modalTitle}>Request Registered</h3>
            <p className={styles.modalSubtitle}>
              Thank you, {name}. Our principal architect will contact you directly at {phone} to discuss your {area} m² bespoke residence concept.
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
