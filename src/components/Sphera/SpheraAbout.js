"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/Effects/ScrollReveal";
import styles from "./SpheraAbout.module.css";

/* -------------------------------------------------------------
   3D Bespoke Isometric Vector Icons
   Crafted with multi-layered lighting, dimensional facets & depth
   ------------------------------------------------------------- */

function ThreeDVillaIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 48 48" fill="none" className={styles.iconSvg3d}>
      <defs>
        {/* Cantilever Roof Gold Gradients */}
        <linearGradient id="vRoofTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff6df" />
          <stop offset="45%" stopColor="#ffd8a8" />
          <stop offset="100%" stopColor="#d4af37" />
        </linearGradient>
        <linearGradient id="vRoofEdge" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c59f2d" />
          <stop offset="100%" stopColor="#7a5c10" />
        </linearGradient>

        {/* Facade Wall Gradients with Light & Shadow */}
        <linearGradient id="vWallLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#586072" />
          <stop offset="100%" stopColor="#2b303c" />
        </linearGradient>
        <linearGradient id="vWallDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2b303c" />
          <stop offset="100%" stopColor="#141720" />
        </linearGradient>

        {/* Illuminated 3D Glass Windows */}
        <linearGradient id="vGlassGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#ffd8a8" />
          <stop offset="100%" stopColor="#e59819" />
        </linearGradient>
      </defs>

      {/* 3D Ground Shadow */}
      <ellipse cx="24" cy="43" rx="17" ry="3.5" fill="rgba(0,0,0,0.45)" />

      {/* Ground Terrace Slab */}
      <polygon points="24,35 40,26 24,19 8,26" fill="url(#vWallDark)" />
      <polygon points="8,26 24,35 24,37 8,28" fill="#12141a" />
      <polygon points="24,35 40,26 40,28 24,37" fill="#0d0f14" />

      {/* Main Ground Villa Volume */}
      <polygon points="12,23 24,29 24,38 12,32" fill="url(#vWallLight)" />
      <polygon points="24,29 36,23 36,32 24,38" fill="url(#vWallDark)" />

      {/* Illuminated Ground Windows */}
      <polygon points="14,26 21,29.5 21,34.5 14,31" fill="url(#vGlassGold)" />
      <line x1="17.5" y1="27.8" x2="17.5" y2="32.8" stroke="#2c303c" strokeWidth="0.8" />
      <polygon points="26,29.5 33,26 33,31 26,34.5" fill="url(#vGlassGold)" opacity="0.85" />
      <line x1="29.5" y1="27.8" x2="29.5" y2="32.8" stroke="#141720" strokeWidth="0.8" />

      {/* 3D Cantilevered 2nd Floor Slab */}
      <polygon points="24,14 38,21 24,28 10,21" fill="url(#vRoofTop)" />
      <polygon points="10,21 24,28 24,30 10,23" fill="url(#vRoofEdge)" />
      <polygon points="24,28 38,21 38,23 24,30" fill="url(#vRoofEdge)" />

      {/* Upper Floor Volume */}
      <polygon points="15,13 24,17.5 24,24 15,19.5" fill="url(#vWallLight)" />
      <polygon points="24,17.5 33,13 33,19.5 24,24" fill="url(#vWallDark)" />

      {/* Upper Glowing Glass Corner Suite */}
      <polygon points="17,15.5 22,18 22,22 17,19.5" fill="url(#vGlassGold)" />
      <polygon points="25,18 30,15.5 30,19.5 25,22" fill="url(#vGlassGold)" opacity="0.85" />

      {/* Top Cantilever Roof Canopy */}
      <polygon points="24,6 36,12 24,18 12,12" fill="url(#vRoofTop)" />
      <polygon points="12,12 24,18 24,19.5 12,13.5" fill="url(#vRoofEdge)" />
      <polygon points="24,18 36,12 36,13.5 24,19.5" fill="url(#vRoofEdge)" />

      {/* Specular Roof Crest Line */}
      <line x1="12" y1="12" x2="24" y2="18" stroke="#ffffff" strokeWidth="1.1" opacity="0.9" strokeLinecap="round" />
    </svg>
  );
}

function ThreeDShieldIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 48 48" fill="none" className={styles.iconSvg3d}>
      <defs>
        {/* Metallic Gold Outer Bevel */}
        <linearGradient id="shGoldLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff8e7" />
          <stop offset="45%" stopColor="#ffd8a8" />
          <stop offset="100%" stopColor="#c59f2d" />
        </linearGradient>
        <linearGradient id="shGoldDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="60%" stopColor="#8c6d1f" />
          <stop offset="100%" stopColor="#4e3b0b" />
        </linearGradient>

        {/* Emerald Core Facets */}
        <linearGradient id="shEmeraldLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#25d366" />
          <stop offset="70%" stopColor="#15824b" />
          <stop offset="100%" stopColor="#0d4a2d" />
        </linearGradient>
        <linearGradient id="shEmeraldDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#15824b" />
          <stop offset="70%" stopColor="#0d4a2d" />
          <stop offset="100%" stopColor="#072b19" />
        </linearGradient>

        {/* 3D Check Gold Gradient */}
        <linearGradient id="shCheckGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#ffd8a8" />
          <stop offset="100%" stopColor="#e5a823" />
        </linearGradient>

        <filter id="checkGlow3d" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.7" />
        </filter>
      </defs>

      {/* 3D Base Shadow */}
      <ellipse cx="24" cy="44" rx="15" ry="3.5" fill="rgba(0,0,0,0.5)" />

      {/* 3D Shield Outer Bevel - Left & Right Facets */}
      <path d="M24,4 L9,10 C9,10 9,27 24,42 L24,4 Z" fill="url(#shGoldLight)" />
      <path d="M24,4 L39,10 C39,10 39,27 24,42 L24,4 Z" fill="url(#shGoldDark)" />

      {/* Inner Recessed Facets (Emerald Core) */}
      <path d="M24,7.5 L12,12.5 C12,12.5 12,25.5 24,38 L24,7.5 Z" fill="url(#shEmeraldLight)" />
      <path d="M24,7.5 L36,12.5 C36,12.5 36,25.5 24,38 L24,7.5 Z" fill="url(#shEmeraldDark)" />

      {/* Specular Center Ridge */}
      <line x1="24" y1="4" x2="24" y2="42" stroke="#ffffff" strokeWidth="1.2" opacity="0.9" />

      {/* Specular Left Shoulder Highlight */}
      <path d="M9.5,10.2 L23.5,4.6" stroke="#ffffff" strokeWidth="1" opacity="0.8" strokeLinecap="round" />

      {/* 3D Embossed Floating Checkmark */}
      <path
        d="M17,23 L22,28.5 L32,17"
        fill="none"
        stroke="url(#shCheckGold)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#checkGlow3d)"
      />

      {/* 3D Beacon Star at Top */}
      <polygon points="24,10 26,13 24,16 22,13" fill="#ffffff" filter="drop-shadow(0 0 3px #ffd8a8)" />
    </svg>
  );
}

function ThreeDTourIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 48 48" fill="none" className={styles.iconSvg3d}>
      <defs>
        {/* 3D Gold Metallic Gradients */}
        <linearGradient id="tourGoldHead" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff8e7" />
          <stop offset="40%" stopColor="#ffd8a8" />
          <stop offset="100%" stopColor="#c59f2d" />
        </linearGradient>
        <linearGradient id="tourGoldShaft" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffd8a8" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#7a5c10" />
        </linearGradient>
        <linearGradient id="tourEmeraldRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#25d366" />
          <stop offset="100%" stopColor="#0d4a2d" />
        </linearGradient>
      </defs>

      {/* 3D Base Shadow */}
      <ellipse cx="24" cy="43" rx="16" ry="3.5" fill="rgba(0,0,0,0.45)" />

      {/* 3D Compass / Viewing Portal Ring in Background */}
      <circle cx="24" cy="24" r="17" stroke="url(#tourEmeraldRing)" strokeWidth="2.4" strokeDasharray="5 3" opacity="0.65" />
      <polygon points="24,4 26,8 22,8" fill="#25d366" />
      <polygon points="44,24 40,26 40,22" fill="#ffd8a8" />

      {/* 3D Luxury Master Concierge Key Angled Across Center */}
      <g transform="rotate(-32 24 24)">
        {/* 3D Key Bow / Head */}
        <circle cx="15" cy="24" r="9" fill="url(#tourGoldHead)" />
        <circle cx="15" cy="24" r="4.5" fill="#141720" />
        {/* Specular Rim */}
        <path d="M9.5,19.5 A7.5,7.5 0 0,1 20.5,19.5" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
        {/* Center Emerald Gem in Key Bow */}
        <polygon points="15,21.5 16.5,24 15,26.5 13.5,24" fill="#25d366" />

        {/* 3D Key Cylindrical Shaft */}
        <rect x="23" y="21.8" width="16" height="4.4" rx="2.2" fill="url(#tourGoldShaft)" />
        <line x1="24" y1="22.5" x2="38" y2="22.5" stroke="#ffffff" strokeWidth="0.8" opacity="0.75" />

        {/* 3D Key Bits / Wards */}
        <rect x="32" y="26" width="3" height="4" rx="1" fill="url(#tourGoldShaft)" />
        <rect x="36" y="26" width="3" height="6" rx="1" fill="url(#tourGoldShaft)" />
      </g>

      {/* 3D VIP Crown / Star Accent */}
      <polygon points="24,10 25.5,13.5 29,14 26.5,16.5 27,20 24,18 21,20 21.5,16.5 19,14 22.5,13.5" fill="url(#tourGoldHead)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />
    </svg>
  );
}

/* -------------------------------------------------------------
   Main SpheraAbout Component
   ------------------------------------------------------------- */

export default function SpheraAbout({ onOpenSiteViewing }) {
  return (
    <section className={styles.section} id="about">
      <div className="container" style={{ position: "relative", zIndex: 4 }}>
        <ScrollReveal>
          {/* Top Header & Ethos Statement */}
          <div className={styles.headerBlock}>
            <h2 className={styles.heading}>
              What you see <span className={styles.headingHighlight}>is what you get</span>
              <br />
              across Nairobi&rsquo;s finest residences.
            </h2>

            <p className={styles.subheading}>
              We do not deal in mass inventory or deceptive wide-angle renders.
              Peak Housing serves as an exclusive, physically audited gateway to Nairobi&rsquo;s most prestigious properties —
              spanning bespoke single-family villas in Karen &amp; Lavington, executive master en-suite penthouses,
              and titled red-soil development parcels.
            </p>
          </div>

          {/* 3 Prominent Architectural Verification Pillars with 3D Icons */}
          <div className={styles.pillarsGrid}>
            {/* Pillar 1: Curated Luxury Architecture */}
            <div className={styles.pillarCard}>
              <div className={styles.iconCircle}>
                <ThreeDVillaIcon />
              </div>
              <div className={styles.pillarBadge}>Curated Architecture</div>
              <h3 className={styles.pillarTitle}>Villas to Penthouses</h3>
              <p className={styles.pillarDesc}>
                Every residence in our catalog is physically vetted for exceptional structural finishes, high ceilings, heated pools, and genuine privacy. Zero misleading 3D mockups.
              </p>
            </div>

            {/* Pillar 2: Title Deeds & Beacon Audits */}
            <div className={styles.pillarCard}>
              <div className={styles.iconCircle}>
                <ThreeDShieldIcon />
              </div>
              <div className={styles.pillarBadge}>Zero Encumbrance</div>
              <h3 className={styles.pillarTitle}>Registry &amp; Beacon Audits</h3>
              <p className={styles.pillarDesc}>
                Every land parcel and residential compound undergoes formal land registry searches, surveyor beacon confirmation, and clean deed verification before client presentation.
              </p>
            </div>

            {/* Pillar 3: Private Guided Tours & Viewing Fee */}
            <div className={styles.pillarCard}>
              <div className={styles.iconCircle}>
                <ThreeDTourIcon />
              </div>
              <div className={styles.tourFeeBadge}>Dedicated Concierge · Viewing Fee Applies</div>
              <h3 className={styles.pillarTitle}>Private Guided Tours</h3>
              <p className={styles.pillarDesc}>
                Walk the perimeter and inspect finishes with Client Director Joseph Simiyu Kefa. A standard KES 2,500 dedicated suite viewing fee applies to ensure serious buyers — 100% credited toward acquisition.
              </p>
            </div>
          </div>

          {/* Bottom Action Strip */}
          <div className={styles.actionStrip}>
            <div>
              <div className={styles.actionText}>
                Ready to inspect a signature villa, penthouse, or prime land parcel?
              </div>
              <div style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.55)", marginTop: "4px" }}>
                Dedicated viewing fee is fully credited upon lease reservation or sale closing.
              </div>
            </div>
            <div className={styles.actionButtons}>
              <button
                type="button"
                className={styles.primaryActionBtn}
                onClick={onOpenSiteViewing}
              >
                <span>Schedule Suite Viewing</span>
                <span>→</span>
              </button>
              <a
                href="https://wa.me/254722705898?text=Hello%20Joseph%20Simiyu%20Kefa%2C%20I%20would%20like%20to%20schedule%20a%20private%20suite%20viewing%20for%20a%20luxury%20property."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryActionBtn}
              >
                <Image
                  src="/images/coordinator.jpeg"
                  alt="Joseph Simiyu Kefa"
                  width={20}
                  height={20}
                  style={{ borderRadius: "50%", objectFit: "cover", border: "1.5px solid #ffd8a8" }}
                />
                <span>WhatsApp Joseph Directly</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
