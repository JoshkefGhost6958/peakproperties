"use client";

import { useState, useEffect } from "react";
import styles from "./Header.module.css";

export default function Header({ onOpenConsultation }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <div className={styles.container}>
        <a href="#" className={styles.brand} onClick={closeMobile}>
          <span className={styles.logoText}>FORMA</span>
          <span className={styles.logoDivider} />
          <span className={styles.logoSubtitle}>
            Residential Quarter in Kazan
          </span>
        </a>

        <nav className={styles.nav}>
          <a href="#about" className={styles.navLink}>
            About
          </a>
          <a href="#apartments" className={styles.navLink}>
            Apartments
          </a>
          <a href="#mortgage" className={styles.navLink}>
            Mortgage
          </a>
          <a href="#infrastructure" className={styles.navLink}>
            Infrastructure
          </a>
          <a href="#construction" className={styles.navLink}>
            Construction
          </a>
          <a href="#contacts" className={styles.navLink}>
            Contacts
          </a>
        </nav>

        <button
          type="button"
          className={styles.consultBtn}
          onClick={onOpenConsultation}
        >
          Request Consultation
        </button>

        <button
          type="button"
          className={`${styles.mobileToggle} ${
            mobileMenuOpen ? styles.mobileToggleActive : ""
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={`${styles.mobileDrawer} ${
          mobileMenuOpen ? styles.mobileDrawerOpen : ""
        }`}
      >
        <a href="#about" className={styles.mobileNavLink} onClick={closeMobile}>
          About
        </a>
        <a
          href="#apartments"
          className={styles.mobileNavLink}
          onClick={closeMobile}
        >
          Apartments
        </a>
        <a
          href="#mortgage"
          className={styles.mobileNavLink}
          onClick={closeMobile}
        >
          Mortgage
        </a>
        <a
          href="#infrastructure"
          className={styles.mobileNavLink}
          onClick={closeMobile}
        >
          Infrastructure
        </a>
        <a
          href="#construction"
          className={styles.mobileNavLink}
          onClick={closeMobile}
        >
          Construction
        </a>
        <a
          href="#contacts"
          className={styles.mobileNavLink}
          onClick={closeMobile}
        >
          Contacts
        </a>
        <button
          type="button"
          className={styles.mobileConsultBtn}
          onClick={() => {
            closeMobile();
            onOpenConsultation();
          }}
        >
          Request Consultation
        </button>
      </div>
    </header>
  );
}
