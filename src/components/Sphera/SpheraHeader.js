"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SpheraHeader.module.css";

export default function SpheraHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => setMobileMenuOpen(false);

  const navItems = [
    { label: "Villas", href: "/villas" },
    { label: "Land", href: "/land" },
    { label: "Apartments", href: "/apartments" },
    { label: "BnBs", href: "/bnbs" },
    { label: "Construction", href: "/construction" },
    { label: "About", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <div className={styles.container}>
        {/* Brand Logo - Clean, no text beneath logo */}
        <Link href="/" className={styles.brand} onClick={closeMobile}>
          <Image
            src="/images/peak-housing-logo.jpg"
            alt="Peak Housing Logo"
            width={38}
            height={38}
            className={styles.brandLogoImg}
          />
          <span className={styles.brandTitle}>PEAK HOUSING</span>
        </Link>

        {/* Dedicated Navbar Elements */}
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${
                pathname === item.href ? styles.navLinkActive : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Group */}
        <div className={styles.actionGroup}>
          <a
            href="https://wa.me/254722705898?text=Hello%20Joseph%2C%20I%20would%20like%20to%20inquire%20about%20Peak%20Housing%20properties%20and%20construction%20services."
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappHeaderBtn}
            aria-label="WhatsApp Joseph Simiyu Kefa"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5.2-1.31C8.61 21.53 10.26 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.46 14.38c-.23.64-1.16 1.2-1.61 1.25-.43.05-.98.07-2.83-.69-2.37-.97-3.9-3.39-4.02-3.55-.12-.16-.96-1.28-.96-2.44 0-1.16.61-1.73.83-1.96.22-.23.48-.29.64-.29.16 0 .32 0 .46.01.15.01.35-.06.55.42.2.49.69 1.68.75 1.8.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.25.25-.11.49.14.24.62 1.02 1.33 1.65.91.81 1.68 1.06 1.92 1.18.24.12.38.1.52-.06.14-.16.61-.71.77-.95.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.17 1.22z"/>
            </svg>
            <span>0722705898</span>
          </a>

          <button
            type="button"
            className={styles.mobileToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`${styles.mobileDrawer} ${
          mobileMenuOpen ? styles.mobileDrawerOpen : ""
        }`}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={styles.mobileLink}
            onClick={closeMobile}
          >
            {item.label}
          </Link>
        ))}

        <a
          href="https://wa.me/254722705898?text=Hello%20Joseph%2C%20I%20would%20like%20to%20inquire%20about%20Peak%20Housing%20properties."
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappHeaderBtn}
          style={{ justifyContent: "center", marginTop: "12px", padding: "14px" }}
        >
          <span>Chat on WhatsApp: 0722705898</span>
        </a>
      </div>
    </header>
  );
}
