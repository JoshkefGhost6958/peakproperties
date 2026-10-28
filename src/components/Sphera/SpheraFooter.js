"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./SpheraFooter.module.css";

export default function SpheraFooter({ onOpenLegal, onOpenSiteViewing }) {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.topRow}>
          {/* Brand Col */}
          <div className={styles.brandCol}>
            <div className={styles.logoRow}>
              <Image
                src="/images/peak-housing-logo.jpg"
                alt="Peak Housing Logo"
                width={40}
                height={40}
                className={styles.logoImg}
              />
              <span className={styles.logoText}>Peak Housing</span>
            </div>
            <p className={styles.brandDesc}>
              Connecting clients with verified apartments, luxury villas, prime
              building land, boutique BnBs, and certified construction
              contractors. What you see is what you get.
            </p>
          </div>

          {/* Properties Col */}
          <div className={styles.navCol}>
            <span className={styles.colTitle}>Verified Properties</span>
            <Link href="/villas" className={styles.footerLink}>Luxury Villas</Link>
            <Link href="/land" className={styles.footerLink}>Prime Land &amp; Plots</Link>
            <Link href="/apartments" className={styles.footerLink}>Executive Apartments</Link>
            <Link href="/bnbs" className={styles.footerLink}>Boutique BnBs</Link>
          </div>

          {/* Construction & Services */}
          <div className={styles.navCol}>
            <span className={styles.colTitle}>Dream House Construction</span>
            <Link href="/construction" className={styles.footerLink}>Let&apos;s Build Your Dream House</Link>
            <Link href="/construction" className={styles.footerLink}>Request an Architect</Link>
            <Link href="/construction" className={styles.footerLink}>Vetted Contractors</Link>
            <Link href="/construction" className={styles.footerLink}>Completed Projects</Link>
          </div>

          {/* Direct Representative */}
          <div className={styles.contactCol}>
            <span className={styles.colTitle}>Direct Representative</span>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "2px", marginBottom: "6px" }}>
              <div style={{ position: "relative", width: "32px", height: "32px", borderRadius: "50%", overflow: "hidden", border: "1.5px solid #ffd8a8", flexShrink: 0 }}>
                <Image
                  src="/images/coordinator.jpeg"
                  alt="Joseph Simiyu Kefa"
                  fill
                  sizes="32px"
                  style={{ objectFit: "cover", objectPosition: "center 10%" }}
                />
              </div>
              <div style={{ fontSize: "15px", fontWeight: "700", color: "#ffffff" }}>
                Joseph Simiyu Kefa
              </div>
            </div>
            <a href="tel:0722705898" className={styles.contactItem}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Phone: 0722705898</span>
            </a>
            <a
              href="https://wa.me/254722705898?text=Hello%20Joseph%2C%20I%20am%20interested%20in%20properties%20and%20site%20viewing%20with%20Peak%20Housing."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
              style={{ color: "#25d366", fontWeight: "600" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5.2-1.31C8.61 21.53 10.26 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.46 14.38c-.23.64-1.16 1.2-1.61 1.25-.43.05-.98.07-2.83-.69-2.37-.97-3.9-3.39-4.02-3.55-.12-.16-.96-1.28-.96-2.44 0-1.16.61-1.73.83-1.96.22-.23.48-.29.64-.29.16 0 .32 0 .46.01.15.01.35-.06.55.42.2.49.69 1.68.75 1.8.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.25.25-.11.49.14.24.62 1.02 1.33 1.65.91.81 1.68 1.06 1.92 1.18.24.12.38.1.52-.06.14-.16.61-.71.77-.95.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.17 1.22z"/>
              </svg>
              <span>WhatsApp: 0722705898</span>
            </a>
          </div>
        </div>

        {/* Bottom Row */}
        <div className={styles.bottomRow}>
          <div>
            © 2026 Peak Housing. What you see is what you get. All rights reserved.
          </div>

          <div className={styles.legalLinks}>
            <Link href="/about" className={styles.legalLink}>About Us</Link>
            <Link href="/contact" className={styles.legalLink}>Contact Us</Link>
            <Link href="/admin/login" className={styles.legalLink}>Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
