"use client";

import Image from "next/image";
import styles from "./Construction.module.css";

const PROGRESS_STAGES = [
  { name: "Monolithic Frame & Structures (Buildings 1–3)", percent: 85 },
  { name: "Panoramic Architectural Glazing", percent: 65 },
  { name: "Brick Facade & Insulation Systems", percent: 45 },
  { name: "Internal MEP & Engineering Networks", percent: 35 },
  { name: "Courtyard Landscape & Park Boulevard", percent: 20 },
];

export default function Construction({ onOpenReport }) {
  return (
    <section className={styles.section} id="construction">
      <div className="container">
        <div className={styles.headerRow}>
          <div>
            <span className={styles.tag}>CONSTRUCTION UPDATE</span>
            <h2 className={styles.heading}>
              Follow the creation of FORMA
            </h2>
          </div>

          <div className={styles.liveBadge}>
            <span className={styles.liveDot} />
            <span>Live Site Camera Online</span>
          </div>
        </div>

        <div className={styles.progressGrid}>
          {/* Photo & Stream Preview */}
          <div className={styles.previewCard}>
            <Image
              src="/images/about-complex.jpg"
              alt="Construction progress of FORMA Residences"
              fill
              sizes="(max-width: 940px) 100vw, 45vw"
              className={styles.previewImage}
            />
            <div className={styles.previewOverlay}>
              <div>
                <div className={styles.previewTitle}>Building 1 & 2 Facades</div>
                <div className={styles.previewDate}>October 2026 Monthly Report</div>
              </div>
            </div>
          </div>

          {/* Metrics Column */}
          <div className={styles.metricsCol}>
            {PROGRESS_STAGES.map((stage, idx) => (
              <div key={idx} className={styles.metricItem}>
                <div className={styles.metricHeader}>
                  <span>{stage.name}</span>
                  <span className={styles.metricPercent}>{stage.percent}%</span>
                </div>
                <div className={styles.progressBarBg}>
                  <div
                    className={styles.progressBarFill}
                    style={{ width: `${stage.percent}%` }}
                  />
                </div>
              </div>
            ))}

            <div className={styles.deliveryInfo}>
              <span className={styles.deliveryTitle}>
                Planned Completion & Key Handover:
              </span>
              <span className={styles.deliveryDate}>Q4 2027 (On Schedule)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
