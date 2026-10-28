"use client";

import Image from "next/image";
import styles from "./About.module.css";

export default function About({ onOpenBrochure }) {
  return (
    <section className={styles.section} id="about">
      <div className="container">
        {/* Top 2-Column Row */}
        <div className={styles.topRow}>
          <div className={styles.leftCol}>
            <span className={styles.tag}>ABOUT PROJECT</span>
            <h2 className={styles.heading}>
              A modern urban quarter for mindful living
            </h2>
            <p className={styles.description}>
              FORMA embodies thoughtful European architecture, an inspiring
              pedestrian environment, and a prestigious riverfront address in
              Kazan. We have created a sanctuary where vibrant city life
              effortlessly meets tranquility and nature.
            </p>
            <button
              type="button"
              className={styles.moreLink}
              onClick={onOpenBrochure}
            >
              <span>Learn more about the project</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className={styles.imageCard}>
            <Image
              src="/images/about_river.jpg"
              alt="FORMA Quarter on the Kazanka riverfront with Kremlin view"
              fill
              sizes="(max-width: 960px) 100vw, 50vw"
              className={styles.image}
              priority
            />
            <div className={styles.badge}>HARMONY OF CITY & NATURE</div>
          </div>
        </div>

        {/* 4 Feature Items Grid */}
        <div className={styles.featuresGrid}>
          {/* Item 1 */}
          <div className={styles.featureItem}>
            <div className={styles.featureBigNum}>4</div>
            <div className={styles.featureTitle}>buildings</div>
            <div className={styles.featureSubtitle}>within the quarter</div>
          </div>

          {/* Item 2 */}
          <div className={styles.featureItem}>
            <div className={styles.featureBigNum}>7 min</div>
            <div className={styles.featureTitle}>to city center</div>
            <div className={styles.featureSubtitle}>by car via Millennium Bridge</div>
          </div>

          {/* Item 3 */}
          <div className={styles.featureItem}>
            <div className={styles.featureHeader}>
              <svg
                className={styles.featureIcon}
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
              <div className={styles.featureTitle}>Car-free courtyard</div>
            </div>
            <div className={styles.featureSubtitle}>
              lush landscaped gardens for leisure and peaceful walks
            </div>
          </div>

          {/* Item 4 */}
          <div className={styles.featureItem}>
            <div className={styles.featureHeader}>
              <svg
                className={styles.featureIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="8" rx="2" />
                <path d="M5 11l2-5h10l2 5" />
                <circle cx="7.5" cy="15.5" r="1.5" />
                <circle cx="16.5" cy="15.5" r="1.5" />
              </svg>
              <div className={styles.featureTitle}>Underground parking</div>
            </div>
            <div className={styles.featureSubtitle}>direct elevator access to every floor</div>
          </div>
        </div>
      </div>
    </section>
  );
}
