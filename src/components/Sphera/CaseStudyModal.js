"use client";

import Image from "next/image";
import styles from "./SpheraModals.module.css";

export default function CaseStudyModal({ project, onClose, onBookViewing }) {
  if (!project) return null;

  const whatsappUrl = `https://wa.me/254722705898?text=Hello%20Joseph%20Simiyu%20Kefa%2C%20I%20am%20interested%20in%20booking%20a%20site%20viewing%20for%20${encodeURIComponent(
    project.title
  )}%20(${encodeURIComponent(project.price)}).`;

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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className={styles.modalHeader}>
          <span className={styles.modalTag}>
            {project.type || "VERIFIED PROPERTY"} · WHAT YOU SEE IS WHAT YOU GET
          </span>
          <h3 className={styles.modalTitle}>{project.title}</h3>
          <p className={styles.modalSubtitle}>{project.area}</p>
        </div>

        <div className={styles.caseGrid}>
          <div className={styles.caseMedia}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
              className={styles.caseImg}
            />
          </div>

          <div>
            <p style={{ fontSize: "14.5px", lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>
              {project.description}
            </p>

            <div className={styles.caseSpecsTable}>
              <div className={styles.caseSpecRow}>
                <span className={styles.specLabel}>Price / Rate:</span>
                <span className={styles.specVal} style={{ color: "#ffd8a8" }}>
                  {project.price}
                </span>
              </div>
              <div className={styles.caseSpecRow}>
                <span className={styles.specLabel}>Bedrooms:</span>
                <span className={styles.specVal}>{project.bedrooms}</span>
              </div>
              <div className={styles.caseSpecRow}>
                <span className={styles.specLabel}>Bathrooms:</span>
                <span className={styles.specVal}>{project.bathrooms || "En-suite"}</span>
              </div>
              <div className={styles.caseSpecRow}>
                <span className={styles.specLabel}>Inspection Status:</span>
                <span className={styles.specVal} style={{ color: "#25d366" }}>
                  {project.viewingAvailable || "Ready for Site Viewing"}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                type="button"
                className={styles.submitBtn}
                onClick={() => {
                  onClose();
                  onBookViewing(project);
                }}
              >
                Book On-Site Viewing Now
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "11px 18px",
                  backgroundColor: "#25d366",
                  color: "#ffffff",
                  borderRadius: "9999px",
                  fontSize: "14px",
                  fontWeight: "700",
                  textDecoration: "none",
                }}
              >
                <span>WhatsApp Joseph Kefa (0722705898)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
