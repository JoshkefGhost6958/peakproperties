"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/Effects/ScrollReveal";
import styles from "./SpheraSteps.module.css";

const CONTRACTOR_STAGES = {
  contractors: {
    name: "Vetted Contractors",
    description:
      "We pair clients exclusively with licensed, insured general contractors with proven track records. Every builder undergoes technical audits, background checks, and milestone-linked payment agreements.",
    badge1: "Apex Structural Builders (12 Yrs Exp)",
    badge2: "Heritage Craft Ltd (NCA-1 Certified)",
  },
  process: {
    name: "Turnkey Process",
    description:
      "From architectural approvals and bill of quantities (BOQ) to civil foundation works, MEP installation, and premium finishes. Transparent milestones ensure no hidden budget inflation.",
    badge1: "Fixed-Price BOQ Contracts",
    badge2: "Strict Milestone Escrow",
  },
  projects: {
    name: "Completed Projects",
    description:
      "Explore real residential villas, apartments, and houses completed by our verified contractor network. What you see is what you get — visit finished sites in person to inspect build quality.",
    badge1: "Kitisuru Contemporary Villa (450 m²)",
    badge2: "Ridgeview Minimalist Pavilion (320 m²)",
  },
  quality: {
    name: "Site Supervision",
    description:
      "Independent clerk of works and certified structural engineers conduct mandatory on-site inspection rounds at every concrete pour, steel reinforcement, and waterproofing stage.",
    badge1: "Concrete Lab Core Tests",
    badge2: "Weekly Progress Video Reports",
  },
};

const STAGE_KEYS = ["contractors", "process", "projects", "quality"];

export default function SpheraSteps({ onOpenContractorInquiry }) {
  const [activeStage, setActiveStage] = useState("projects");

  const currentData = CONTRACTOR_STAGES[activeStage];

  return (
    <section className={styles.section} id="construction">
      <div className={styles.ambientGlow} />
      <div className="container">
        <ScrollReveal>
          {/* Header Row */}
          <div className={styles.headerRow}>
          <h2 className={styles.heading}>
            <span className={styles.headingLight}>Verified </span>contractors
            <br />
            &amp; proven <span className={styles.headingLight}>projects</span>
          </h2>
        </div>

        {/* Step Pipeline Pills */}
        <div className={styles.pipelineRow}>
          {STAGE_KEYS.map((key, idx) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                type="button"
                className={`${styles.stepPill} ${
                  activeStage === key ? styles.stepPillActive : ""
                }`}
                onClick={() => setActiveStage(key)}
              >
                {CONTRACTOR_STAGES[key].name}
              </button>
              {idx < STAGE_KEYS.length - 1 && (
                <span className={styles.stepDivider}>&gt;</span>
              )}
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className={styles.stepsGrid}>
          {/* Left Description Column */}
          <div className={styles.descCol}>
            <p className={styles.stepDescription}>
              {currentData.description}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link
                href="/construction"
                className={styles.startProjectBtn}
                style={{ textDecoration: "none", textAlign: "center" }}
              >
                <span>Let&apos;s Build Your Dream House</span>
                <span>→</span>
              </Link>

              <button
                type="button"
                className={styles.startProjectBtn}
                onClick={onOpenContractorInquiry}
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff" }}
              >
                <span>Fast Contractor Inquiry</span>
                <span>+</span>
              </button>
            </div>
          </div>

          {/* Model 1: Dark Cubist Villa by Apex Structural */}
          <div
            className={styles.modelCard}
            onClick={onOpenContractorInquiry}
          >
            <div className={styles.modelImageWrapper}>
              <Image
                src="/images/sphera-iso-dark.jpg"
                alt="Kitisuru Modernist Villa completed project"
                fill
                sizes="(max-width: 768px) 100vw, 35vw"
                className={styles.modelImage}
              />
            </div>
            <div className={styles.modelFooter}>
              <span className={styles.modelTitle}>Apex Structural Builders</span>
              <span className={styles.modelTag}>{currentData.badge1}</span>
            </div>
          </div>

          {/* Model 2: White Minimalist Pavilion by Heritage Craft */}
          <div
            className={styles.modelCard}
            onClick={onOpenContractorInquiry}
          >
            <div className={styles.modelImageWrapper}>
              <Image
                src="/images/sphera-iso-white.jpg"
                alt="Ridgeview Pavilion completed project"
                fill
                sizes="(max-width: 768px) 100vw, 35vw"
                className={styles.modelImage}
              />
            </div>
            <div className={styles.modelFooter}>
              <span className={styles.modelTitle}>Heritage Craft Ltd</span>
              <span className={styles.modelTag}>{currentData.badge2}</span>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
