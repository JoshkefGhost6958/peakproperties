"use client";

import styles from "./Infrastructure.module.css";

export default function Infrastructure({ onOpenInfrastructureModal }) {
  return (
    <section className={styles.section} id="infrastructure">
      <div className="container">
        {/* Banner with dark glass text overlay */}
        <div className={styles.bannerCard}>
          <div className={styles.glassPanel}>
            <span className={styles.tag}>INFRASTRUCTURE</span>
            <h2 className={styles.heading}>Comfort in every detail</h2>
            <p className={styles.description}>
              Thoughtfully planned private grounds, dedicated resident
              amenities, and everyday essentials right at your doorstep —
              crafted for effortless, refined living every single day.
            </p>
            <button
              type="button"
              className={styles.learnMoreBtn}
              onClick={onOpenInfrastructureModal}
            >
              <span>Learn more</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        {/* 4 Amenities row below */}
        <div className={styles.amenitiesGrid}>
          {/* 1 */}
          <div className={styles.amenityItem}>
            <div className={styles.iconWrapper}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <div className={styles.amenityText}>
              Kindergartens and top schools nearby
            </div>
          </div>

          {/* 2 */}
          <div className={styles.amenityItem}>
            <div className={styles.iconWrapper}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <div className={styles.amenityText}>
              Boutique shops and services on ground floors
            </div>
          </div>

          {/* 3 */}
          <div className={styles.amenityItem}>
            <div className={styles.iconWrapper}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22v-7" />
                <path d="M12 15a7 7 0 0 1-7-7c0-2.5 1.5-4.5 4-5.5 1-1.5 3-2.5 5-2.5s4 1 5 2.5c2.5 1 4 3 4 5.5a7 7 0 0 1-7 7z" />
              </svg>
            </div>
            <div className={styles.amenityText}>
              Landscaped park courtyards and promenade
            </div>
          </div>

          {/* 4 */}
          <div className={styles.amenityItem}>
            <div className={styles.iconWrapper}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6.5 6.5h11M6.5 17.5h11M12 2v20M4 10h16M4 14h16" />
              </svg>
            </div>
            <div className={styles.amenityText}>
              Sports facilities and eco-playgrounds
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
