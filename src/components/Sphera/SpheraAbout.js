"use client";

import ScrollReveal from "@/components/Effects/ScrollReveal";
import styles from "./SpheraAbout.module.css";

export default function SpheraAbout({ onOpenSiteViewing }) {
  return (
    <section className={styles.section} id="about">
      <div className={styles.ambientGlow} />

      <div className="container">
        <ScrollReveal>
          {/* Top Header & Ethos Statement */}
          <div className={styles.headerBlock}>
            <div className={styles.ethosTag}>
              <span className={styles.tagDot} />
              <span>THE PEAK HOUSING STANDARD</span>
            </div>

            <h2 className={styles.heading}>
              What you see <span className={styles.headingHighlight}>is what you get</span>
              <br />
              in every property.
            </h2>

            <p className={styles.subheading}>
              Zero deceptive wide-angle trickery. Zero unverified land titles.
              At Peak Housing, what you view online matches the exact physical reality
              on the ground in Lavington, Westlands, and Karen.
            </p>
          </div>

          {/* 3 Prominent Architectural Verification Pillars */}
          <div className={styles.pillarsGrid}>
            {/* Pillar 1 */}
            <div className={styles.pillarCard}>
              <div className={styles.iconCircle}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </div>
              <div className={styles.pillarBadge}>Zero Distortion</div>
              <h3 className={styles.pillarTitle}>100% Real Photography</h3>
              <p className={styles.pillarDesc}>
                Every photograph and video walkthrough reflects the exact physical property as it stands today. Zero misleading 3D renders or recycled stock photos.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className={styles.pillarCard}>
              <div className={styles.iconCircle}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
              </div>
              <div className={styles.pillarBadge}>Verified Titles</div>
              <h3 className={styles.pillarTitle}>Registry &amp; Beacon Audits</h3>
              <p className={styles.pillarDesc}>
                Every land parcel and residence undergoes formal land registry searches, beacon confirmation, and deed audits before being presented to clients.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className={styles.pillarCard}>
              <div className={styles.iconCircle}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className={styles.pillarBadge}>Direct In-Person</div>
              <h3 className={styles.pillarTitle}>Private Guided Tours</h3>
              <p className={styles.pillarDesc}>
                Walk the perimeter and inspect finishes in person with Client Director Joseph Simiyu Kefa to ensure complete peace of mind.
              </p>
            </div>
          </div>

          {/* Bottom Action Strip */}
          <div className={styles.actionStrip}>
            <div className={styles.actionText}>
              Ready to verify a villa, apartment, or land parcel with your own eyes?
            </div>
            <div className={styles.actionButtons}>
              <button
                type="button"
                className={styles.primaryActionBtn}
                onClick={onOpenSiteViewing}
              >
                <span>Schedule Site Viewing</span>
                <span>→</span>
              </button>
              <a
                href="https://wa.me/254722705898?text=Hello%20Joseph%20Simiyu%20Kefa%2C%20I%20would%20like%20to%20schedule%20a%20private%20site%20viewing."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryActionBtn}
              >
                <span>WhatsApp Joseph Directly</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
