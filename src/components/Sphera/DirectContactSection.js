"use client";

import ScrollReveal from "@/components/Effects/ScrollReveal";
import styles from "./DirectContactSection.module.css";

export default function DirectContactSection() {
  const whatsappUrl =
    "https://wa.me/254722705898?text=Hello%20Joseph%20Simiyu%20Kefa%2C%20I%20am%20reaching%20out%20via%20Peak%20Housing%20regarding%20property%20listings%2C%20BnBs%2C%20and%20construction%20services.";

  return (
    <section className={styles.section} id="contact">
      <div className={styles.ambientGlow} />
      <div className="container">
        <ScrollReveal>
          <div className={styles.card}>
          {/* Left Contact Information */}
          <div className={styles.infoCol}>
            <h2 className={styles.heading}>
              Ready to find your property or start building?
            </h2>

            <div>
              <div className={styles.personName}>Joseph Simiyu Kefa</div>
              <div className={styles.personRole}>
                Peak Housing Senior Representative &amp; Property Coordinator
              </div>
            </div>

            <p className={styles.description}>
              Whether you are looking to purchase an executive apartment, acquire
              a luxury villa, reserve a verified BnB stay, or hire certified
              contractors for a new residential development, reach out directly.
            </p>

            <div className={styles.mottoBox}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffd8a8" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span className={styles.mottoText}>
                Our Guarantee: What you see is what you get.
              </span>
            </div>
          </div>

          {/* Right Action Callouts */}
          <div className={styles.actionsCol}>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Direct Phone &amp; WhatsApp Line
            </div>

            <div className={styles.directPhone}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>0722705898</span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5.2-1.31C8.61 21.53 10.26 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.46 14.38c-.23.64-1.16 1.2-1.61 1.25-.43.05-.98.07-2.83-.69-2.37-.97-3.9-3.39-4.02-3.55-.12-.16-.96-1.28-.96-2.44 0-1.16.61-1.73.83-1.96.22-.23.48-.29.64-.29.16 0 .32 0 .46.01.15.01.35-.06.55.42.2.49.69 1.68.75 1.8.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.25.25-.11.49.14.24.62 1.02 1.33 1.65.91.81 1.68 1.06 1.92 1.18.24.12.38.1.52-.06.14-.16.61-.71.77-.95.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.17 1.22z"/>
              </svg>
              <span>Chat on WhatsApp</span>
            </a>

            <a href="tel:0722705898" className={styles.callBtn}>
              <span>Call 0722705898 Directly</span>
            </a>

            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", textAlign: "center", marginTop: "4px" }}>
              Available 7 days a week · Quick response guaranteed
            </div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
