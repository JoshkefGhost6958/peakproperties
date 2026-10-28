"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SpheraHeader from "@/components/Sphera/SpheraHeader";
import SpheraFooter from "@/components/Sphera/SpheraFooter";
import styles from "./construction.module.css";

const COMPLETED_PROJECTS = [
  {
    id: "lavington-glass-residence",
    title: "The Lavington Glass Sanctuary",
    type: "Turnkey Luxury Villa Construction",
    location: "Mbaazi Avenue, Lavington",
    duration: "11 Months Handover",
    area: "480 m² · 4 Bedrooms En-suite",
    image: "/images/sphera-villa1.jpg",
    blueprint: "/images/sphera-iso-dark.jpg",
    contractor: "Apex Structural Engineers & Master Builders",
    description:
      "Commissioned by a client on a 0.5-acre raw plot. Peak Housing matched the client with a registered architect for custom 3D isometric plans, followed by an NCA-1 verified contractor. Delivered exactly to budget and on schedule.",
  },
  {
    id: "westlands-cubist-villa-project",
    title: "Rhapta Contemporary Cantilever Villa",
    type: "Architectural Design & Ground-Up Build",
    location: "Rhapta Road, Westlands",
    duration: "13 Months Handover",
    area: "560 m² · 5 Bedrooms En-suite",
    image: "/images/sphera-villa2.jpg",
    blueprint: "/images/sphera-iso-white.jpg",
    contractor: "Vanguard Urban Contractors Ltd",
    description:
      "A bold cubist private residence with 7-meter cantilevered master suites, heated pool, and bespoke acoustic insulation. What you see in the original 3D render is exactly what was built in physical reality.",
  },
  {
    id: "spring-valley-modernist-residence",
    title: "Spring Valley Eco-Modernist Estate",
    type: "Turnkey Sustainable Construction",
    location: "Spring Valley / Westlands",
    duration: "10 Months Handover",
    area: "420 m² · 4 Bedrooms",
    image: "/images/sphera-hero.jpg",
    blueprint: "/images/sphera-iso-dark.jpg",
    contractor: "Heritage Craft Builders Group",
    description:
      "Constructed using locally-sourced blue stone masonry, solar microgrid backup, rainwater harvesting cisterns, and high-spec Italian porcelain finishes.",
  },
  {
    id: "karen-timber-stone-haven",
    title: "Karen Miotoni Country Villa",
    type: "Country Home Architectural Build",
    location: "Miotoni, Karen",
    duration: "12 Months Handover",
    area: "510 m² · 5 Bedrooms",
    image: "/images/courtyard.jpg",
    blueprint: "/images/sphera-iso-white.jpg",
    contractor: "Apex Structural Engineers",
    description:
      "Blends warm timber pergolas with heavy dressed stone walls, featuring double-height cathedral ceilings and an outdoor barbecue terrace pavilion.",
  },
];

export default function ConstructionPage() {
  const [projects, setProjects] = useState(COMPLETED_PROJECTS);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    serviceType: "Architectural Design & Full Build",
    location: "Westlands",
    budgetRange: "KES 25M - 50M",
    landStatus: "I already own land",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Load live projects from CMS API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/content?collection=construction");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const liveOnly = json.data.filter((item) => item.isPublished !== false);
          if (liveOnly.length > 0) {
            setProjects(liveOnly);
          }
        }
      } catch (e) {
        // Fallback silently
      }
    };
    fetchProjects();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const message = `*DREAM HOUSE INQUIRY - PEAK HOUSING*
Name: ${formData.name}
Phone: ${formData.phone}
Service: ${formData.serviceType}
Location: ${formData.location}
Budget: ${formData.budgetRange}
Land Status: ${formData.landStatus}
Details: ${formData.notes || "None provided"}`;

    const waUrl = `https://wa.me/254722705898?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <main className={styles.pageWrapper}>
      <SpheraHeader />

      {/* Hero Header */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Construction</span>
          </div>

          <div className={styles.heroTag}>VERIFIED CONTRACTORS &amp; ARCHITECTS</div>
          <h1 className={styles.title}>
            Let&apos;s Build You Your <br />
            <span className={styles.titleHighlight}>Dream House.</span>
          </h1>
          <p className={styles.subtitle}>
            From conceptual architectural sketches and 3D isometric blueprints to
            flawless ground-up construction. We connect you directly with
            pre-vetted, NCA-certified professional contractors and experienced
            architects in Nairobi. What you see is what you get — strictly
            adhered Bills of Quantities, milestone escrow, and zero compromises.
          </p>

          <div className={styles.heroActions}>
            <a href="#inquiry-form" className={styles.primaryBtn}>
              <span>Request an Architect &amp; Contractor</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href="https://wa.me/254722705898?text=Hello%20Joseph%2C%20I%20would%20like%20to%20discuss%20building%20my%20dream%20house%20with%20verified%20contractors."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryBtn}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5.2-1.31C8.61 21.53 10.26 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.46 14.38c-.23.64-1.16 1.2-1.61 1.25-.43.05-.98.07-2.83-.69-2.37-.97-3.9-3.39-4.02-3.55-.12-.16-.96-1.28-.96-2.44 0-1.16.61-1.73.83-1.96.22-.23.48-.29.64-.29.16 0 .32 0 .46.01.15.01.35-.06.55.42.2.49.69 1.68.75 1.8.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.25.25-.11.49.14.24.62 1.02 1.33 1.65.91.81 1.68 1.06 1.92 1.18.24.12.38.1.52-.06.14-.16.61-.71.77-.95.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.17 1.22z"/>
              </svg>
              <span>Consult Joseph (0722705898)</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3 Pillars Section */}
      <section className={styles.pillarsSection}>
        <div className="container">
          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className={styles.pillarTitle}>1. Certified Architect Requests</h3>
              <p className={styles.pillarText}>
                We link you with registered architects who translate your
                lifestyle desires into 3D isometric blueprints, structural
                engineering calculations, and expedited county approval filings.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <h3 className={styles.pillarTitle}>2. Vetted Professional Contractors</h3>
              <p className={styles.pillarText}>
                Every contractor in our network is NCA-licensed, insured, and
                physically audited on past residential builds across Westlands,
                Lavington, and Karen.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className={styles.pillarTitle}>3. What You See Is What You Get</h3>
              <p className={styles.pillarText}>
                Guaranteed match between approved 3D renders and the completed
                home. Transparent Bills of Quantities (BOQ), milestone
                verifications, and zero unexpected cost inflations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry-form" className={styles.inquirySection}>
        <div className="container">
          <div className={styles.inquiryGrid}>
            <div className={styles.inquiryContent}>
              <div className={styles.heroTag}>GET STARTED TODAY</div>
              <h2>Tell Us About Your Dream House Project</h2>
              <p>
                Whether you already have a plot in Westlands, Lavington, or Karen,
                or need help acquiring land alongside an architect and master
                builder, Joseph Simiyu Kefa and our team are here to guide you
                every step of the way.
              </p>

              <div className={styles.processList}>
                <div className={styles.processItem}>
                  <svg className={styles.processCheck} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Free Initial Concept &amp; Feasibility Consultation</span>
                </div>
                <div className={styles.processItem}>
                  <svg className={styles.processCheck} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Direct Match with Top Vetted Architects &amp; Structural Engineers</span>
                </div>
                <div className={styles.processItem}>
                  <svg className={styles.processCheck} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Transparent Fixed-Price Contractor Tendering &amp; BOQ</span>
                </div>
                <div className={styles.processItem}>
                  <svg className={styles.processCheck} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Milestone Site Inspections by Independent Engineers</span>
                </div>
              </div>

              <div style={{ padding: "16px", background: "rgba(255,255,255,0.04)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Direct Project Lead
                </span>
                <div style={{ fontSize: "16px", fontWeight: "700", marginTop: "4px" }}>
                  Joseph Simiyu Kefa
                </div>
                <div style={{ fontSize: "14px", color: "#ffd8a8", marginTop: "2px" }}>
                  Call / WhatsApp: 0722705898
                </div>
              </div>
            </div>

            {/* Interactive Form */}
            <div className={styles.formBox}>
              <h3 className={styles.formTitle}>Request Architect &amp; Contractor</h3>
              <p className={styles.formSubtitle}>
                Fill in your project outline to receive a personalized briefing.
              </p>

              {submitted ? (
                <div style={{ textAlign: "center", padding: "32px 16px" }}>
                  <div style={{ color: "#25d366", fontSize: "36px", marginBottom: "12px" }}>✓</div>
                  <h4 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px" }}>
                    Inquiry Transmitted to Joseph Simiyu Kefa
                  </h4>
                  <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.75)", marginBottom: "20px" }}>
                    We have redirected your details to WhatsApp (0722705898). You can also call directly anytime.
                  </p>
                  <button
                    type="button"
                    className={styles.primaryBtn}
                    onClick={() => setSubmitted(false)}
                    style={{ margin: "0 auto" }}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Mwangi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0722 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Service Desired</label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className={styles.formSelect}
                    >
                      <option value="Architectural Design & Full Build">
                        Full Dream House: Architect + Verified Contractor
                      </option>
                      <option value="Architect Request Only">
                        Architect Request Only (3D Blueprints &amp; County Approval)
                      </option>
                      <option value="Contractor For Ground-Up Build">
                        Contractor For Ground-Up Build (I have approved plans)
                      </option>
                      <option value="Renovation & Modernization">
                        Luxury Renovation &amp; Modernization
                      </option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Target Location</label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className={styles.formSelect}
                    >
                      <option value="Westlands">Westlands</option>
                      <option value="Lavington">Lavington</option>
                      <option value="Karen">Karen</option>
                      <option value="Spring Valley / Nyari">Spring Valley / Nyari</option>
                      <option value="Other Nairobi Location">Other Prime Nairobi</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Target Project Budget</label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className={styles.formSelect}
                    >
                      <option value="KES 15M - 30M">KES 15,000,000 - 30,000,000</option>
                      <option value="KES 30M - 60M">KES 30,000,000 - 60,000,000</option>
                      <option value="KES 60M - 100M+">KES 60,000,000 - 100,000,000+</option>
                      <option value="Custom Project Scope">Custom Scope / Inquire</option>
                    </select>
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    <span>Send Request to Joseph (0722705898)</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Completed Dream House Showcase */}
      <section className={styles.showcaseSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTag}>PORTFOLIO OF EXCELLENCE</div>
            <h2 className={styles.sectionTitle}>Completed Dream Houses</h2>
            <p className={styles.sectionDesc}>
              Real examples of architectural renderings brought to physical
              reality by our vetted contractors and architects. What you see is
              what you get.
            </p>
          </div>

          <div className={styles.projectCardsGrid}>
            {projects.map((proj) => (
              <div key={proj.id} className={styles.projectCard}>
                <div className={styles.projectImageWrapper}>
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 860px) 100vw, 50vw"
                    className={styles.projectImg}
                  />
                </div>

                <div className={styles.projectContent}>
                  <div className={styles.projectBadge}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{proj.type}</span>
                  </div>

                  <h3 className={styles.projectTitle}>{proj.title}</h3>

                  <div className={styles.projectSpecs}>
                    <span><strong>Location:</strong> {proj.location}</span>
                    <span>·</span>
                    <span><strong>Timeline:</strong> {proj.duration}</span>
                  </div>

                  <p className={styles.projectDesc}>{proj.description}</p>

                  <div className={styles.contractorTag}>
                    Lead Contractor: {proj.contractor}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SpheraFooter />
    </main>
  );
}
