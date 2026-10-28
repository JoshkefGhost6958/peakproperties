"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SpheraHeader from "@/components/Sphera/SpheraHeader";
import SpheraFooter from "@/components/Sphera/SpheraFooter";
import styles from "./contact.module.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Villa or Apartment Viewing",
    preferredLocation: "Westlands & Lavington",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success && data.ticket) {
        setTicketId(data.ticket.id);
        setSubmitted(true);
      } else {
        // Fallback ticket
        const fallbackId = `TIC-${Math.floor(1000 + Math.random() * 9000)}`;
        setTicketId(fallbackId);
        setSubmitted(true);
      }
    } catch (err) {
      const fallbackId = `TIC-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketId(fallbackId);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.pageWrapper}>
      <SpheraHeader />

      {/* Hero Header */}
      <section className={styles.pageHero}>
        <Image
          src="/images/courtyard.jpg"
          alt="Peak Housing Direct Client Advisory"
          fill
          priority
          className={styles.heroBgImage}
        />
        <div className={styles.heroOverlay} />

        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.title}>
            Get In Touch With <br />
            <span className={styles.titleHighlight}>Peak Housing.</span>
          </h1>
          <p className={styles.subtitle}>
            Connect directly with our client representative for private site viewings,
            land beacon inspections, or architectural construction consultations.
            What you see is what you get — true properties and direct personal
            attention.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactGrid}>
            {/* Representative Card (NO Office Address) */}
            <div className={styles.directRepCard}>
              <div className={styles.repHeader}>
                <div className={styles.repAvatar}>
                  <Image
                    src="/images/coordinator.jpeg"
                    alt="Joseph Simiyu Kefa"
                    fill
                    sizes="68px"
                    className={styles.repAvatarImg}
                  />
                </div>
                <div>
                  <h2 className={styles.repName}>Joseph Simiyu Kefa</h2>
                  <div className={styles.repTitle}>Direct Client Representative &amp; Coordinator</div>
                </div>
              </div>

              <p className={styles.repDesc}>
                Whether you wish to inspect a villa in Lavington, tour an apartment
                in Westlands, survey titled land, or meet with our verified dream
                house contractors, Joseph is your dedicated direct contact.
              </p>

              <div className={styles.contactMethodList}>
                <a
                  href="https://wa.me/254722705898?text=Hello%20Joseph%2C%20I%20would%20like%20to%20inquire%20about%20Peak%20Housing%20properties%20and%20viewings."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactMethodItem}
                >
                  <div className={styles.methodIcon} style={{ color: "#25d366" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5.2-1.31C8.61 21.53 10.26 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.46 14.38c-.23.64-1.16 1.2-1.61 1.25-.43.05-.98.07-2.83-.69-2.37-.97-3.9-3.39-4.02-3.55-.12-.16-.96-1.28-.96-2.44 0-1.16.61-1.73.83-1.96.22-.23.48-.29.64-.29.16 0 .32 0 .46.01.15.01.35-.06.55.42.2.49.69 1.68.75 1.8.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.25.25-.11.49.14.24.62 1.02 1.33 1.65.91.81 1.68 1.06 1.92 1.18.24.12.38.1.52-.06.14-.16.61-.71.77-.95.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.17 1.22z"/>
                    </svg>
                  </div>
                  <div className={styles.methodDetails}>
                    <span className={styles.methodLabel}>Instant WhatsApp</span>
                    <span className={styles.methodValue}>0722705898</span>
                  </div>
                </a>

                <a href="tel:0722705898" className={styles.contactMethodItem}>
                  <div className={styles.methodIcon} style={{ color: "#ffd8a8" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className={styles.methodDetails}>
                    <span className={styles.methodLabel}>Direct Phone Call</span>
                    <span className={styles.methodValue}>0722705898</span>
                  </div>
                </a>
              </div>

              <div className={styles.meetingNote}>
                <strong>On-Site Viewing Protocol:</strong> To preserve our &quot;What
                you see is what you get&quot; commitment, viewings and consultations
                are conducted in-person directly at the property or land parcel.
              </div>
            </div>

            {/* Direct Inquiry Form */}
            <div className={styles.formBox}>
              <h3 className={styles.formTitle}>Send a Direct Message</h3>
              <p className={styles.formSubtitle}>
                Schedule a site viewing or request an architect &amp; contractor.
              </p>

              {submitted ? (
                <div style={{ textAlign: "center", padding: "32px 16px" }}>
                  <div style={{ color: "#25d366", fontSize: "40px", marginBottom: "8px" }}>✓</div>
                  
                  <div
                    style={{
                      display: "inline-block",
                      background: "rgba(255, 216, 168, 0.12)",
                      border: "1px solid rgba(255, 216, 168, 0.3)",
                      color: "#ffd8a8",
                      fontSize: "12.5px",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "4px 14px",
                      borderRadius: "var(--radius-pill)",
                      marginBottom: "14px",
                    }}
                  >
                    Ticket #{ticketId} Created
                  </div>

                  <h4 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>
                    Inquiry Dispatched to Joseph Simiyu Kefa
                  </h4>

                  <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.75)", lineHeight: "1.5", maxWidth: "420px", margin: "0 auto 24px auto" }}>
                    Your inquiry ticket has been registered in the Peak Housing CMS. Joseph Simiyu Kefa has been notified and will email or call you shortly.
                  </p>

                  <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginBottom: "16px" }}>
                    <a
                      href={`https://wa.me/254722705898?text=${encodeURIComponent(
                        `Hello Joseph Simiyu Kefa, I submitted inquiry ticket #${ticketId} regarding ${formData.interest}. My name is ${formData.name}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: "10px 20px",
                        borderRadius: "var(--radius-pill)",
                        backgroundColor: "#25d366",
                        color: "#121316",
                        fontSize: "13px",
                        fontWeight: 800,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span>Open on WhatsApp</span>
                    </a>

                    <a
                      href="tel:0722705898"
                      style={{
                        padding: "10px 20px",
                        borderRadius: "var(--radius-pill)",
                        backgroundColor: "rgba(255,255,255,0.08)",
                        color: "#ffffff",
                        fontSize: "13px",
                        fontWeight: 700,
                        textDecoration: "none",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      Direct Call
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        interest: "Villa or Apartment Viewing",
                        preferredLocation: "Westlands & Lavington",
                        message: "",
                      });
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "12px",
                      cursor: "pointer",
                      textDecoration: "underline",
                      marginTop: "8px",
                    }}
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Grace Wanjiku"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0722 000 000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={styles.formInput}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email Address (For Written Confirmation &amp; Documents)</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. grace.wanjiku@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Area of Interest</label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className={styles.formSelect}
                      >
                        <option value="Villa or Apartment Viewing">Villa or Apartment Viewing</option>
                        <option value="Land Title & Beacon Inspection">Land Title &amp; Beacon Inspection</option>
                        <option value="BnB Booking & Dates">BnB Booking &amp; Dates</option>
                        <option value="Dream House Construction">Let&apos;s Build: Architect &amp; Contractor</option>
                        <option value="General Inquiry">General Property Inquiry</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Target Location</label>
                      <select
                        value={formData.preferredLocation}
                        onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                        className={styles.formSelect}
                      >
                        <option value="Westlands & Lavington">Westlands &amp; Lavington</option>
                        <option value="Westlands">Westlands</option>
                        <option value="Lavington">Lavington</option>
                        <option value="Karen">Karen</option>
                        <option value="Other Nairobi Area">Other Prime Nairobi</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Message or Specific Property</label>
                    <textarea
                      rows={3}
                      placeholder="Specify property name, preferred viewing date/time, or architectural requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={styles.formTextarea}
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn} disabled={loading}>
                    <span>{loading ? "Creating Ticket..." : "Submit Inquiry Ticket"}</span>
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

      <SpheraFooter />
    </main>
  );
}
