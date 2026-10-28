"use client";

import styles from "./Hero.module.css";

export default function Hero({ onOpenApartments, onOpenConsultation }) {
  return (
    <section className={styles.heroWrapper} id="hero">
      <div className={styles.heroCard}>
        {/* Ambient video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.bgVideo}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className={styles.bgOverlay} />

        {/* Monumental architectural wordmark */}
        <div className={styles.monolithWordmark} aria-hidden="true">
          FORMA
        </div>

        <div className={styles.heroTop} />

        {/* Cursive handwritten accent text on the right */}
        <div className={styles.scriptAccent}>
          <span>Kazan in your form</span>
          <svg
            className={styles.scriptFlourish}
            viewBox="0 0 160 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 14C35 4 90 20 157 8"
              stroke="#ffd8a8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Main Content Area */}
        <div className={styles.heroBottom}>
          <div className={styles.titleArea}>
            <h1 className={styles.heading}>
              More than,
              <br />
              just an apartment
            </h1>
            <p className={styles.subheading}>
              Business-class residential quarter in the heart of Kazan
            </p>
          </div>

          {/* Stats Bar */}
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>from $110,000</span>
              <span className={styles.statLabel}>property price (9.8M ₽)</span>
            </div>

            <div className={styles.statDivider} />

            <div className={styles.statItem}>
              <span className={styles.statValue}>Q4 2027</span>
              <span className={styles.statLabel}>handover date</span>
            </div>

            <div className={styles.statDivider} />

            <div className={styles.statItem}>
              <span className={styles.statValue}>Family Mortgage</span>
              <span className={styles.statLabel}>from 6% APR</span>
            </div>
          </div>

          {/* CTAs and Location Badge */}
          <div className={styles.controlsRow}>
            <div className={styles.buttonsGroup}>
              <a href="#apartments" className={styles.primaryBtn}>
                <span>Select Apartment</span>
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
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>

              <a href="#about" className={styles.secondaryBtn}>
                About Project
              </a>
            </div>

            <div className={styles.locationBadge}>
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
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Novo-Savinovsky District, Kazan</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
