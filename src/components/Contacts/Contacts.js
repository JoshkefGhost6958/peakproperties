"use client";

import styles from "./Contacts.module.css";

export default function Contacts({ onOpenConsultation, onOpenDirections }) {
  return (
    <section className={styles.section} id="contacts">
      <div className="container">
        <div className={styles.contactsCard}>
          {/* Left Column */}
          <div className={styles.leftCol}>
            <span className={styles.tag}>CONTACTS</span>
            <h2 className={styles.heading}>Sales Office in Kazan</h2>
            <div className={styles.addressRow}>
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
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>
                86 Chistopolskaya St. (Stolitsa Business Center), 1st floor
              </span>
            </div>
          </div>

          {/* Middle Column */}
          <div className={styles.midCol}>
            <div className={styles.phoneArea}>
              <a href="tel:+78432050000" className={styles.phoneLink}>
                <svg
                  className={styles.phoneIcon}
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+7 (843) 205-00-00</span>
              </a>
              <span className={styles.hours}>Daily from 9:00 AM to 9:00 PM</span>
            </div>

            <div className={styles.btnGroup}>
              <button
                type="button"
                className={styles.consultBtn}
                onClick={onOpenConsultation}
              >
                <span>Book a Consultation</span>
                <span aria-hidden="true">→</span>
              </button>

              <button
                type="button"
                className={styles.routeBtn}
                onClick={onOpenDirections}
              >
                <span>Get Directions</span>
              </button>
            </div>
          </div>

          {/* Right Column: Handwritten cursive flourish */}
          <div className={styles.rightCol}>
            <span className={styles.cursiveText}>Good shapes of living</span>
            <svg
              className={styles.cursiveFlourish}
              viewBox="0 0 150 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 14C35 5 95 18 146 8"
                stroke="#ffd8a8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
