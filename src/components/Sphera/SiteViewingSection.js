"use client";

import { useState } from "react";
import ScrollReveal from "@/components/Effects/ScrollReveal";
import styles from "./SiteViewingSection.module.css";

export default function SiteViewingSection() {
  const [propertyType, setPropertyType] = useState("villa");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("morning");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setSubmitted(true);

    try {
      await fetch("/api/viewings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: fullName,
          phone,
          propertyType: propertyType.toUpperCase(),
          preferredDate: date || "Next Available",
          timeSlot,
        }),
      });
    } catch (err) {
      console.error("Error saving viewing:", err);
    }
  };

  const getWhatsAppMessage = () => {
    const text = `Hello Joseph Simiyu Kefa, I would like to book a Site Viewing for a ${propertyType.toUpperCase()} on ${date || "the earliest available date"} (${timeSlot}). My name is ${fullName || "Client"}, Phone: ${phone || "0722705898"}. Please confirm availability.`;
    return `https://wa.me/254722705898?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className={styles.section} id="site-viewing">
      <div className={styles.ambientGlow} />
      <div className="container">
        <ScrollReveal>
          <div className={styles.grid}>
          {/* Left Column */}
          <div className={styles.infoCol}>
            <h2 className={styles.heading}>
              <span className={styles.headingMuted}>See it with </span>
              your own eyes.
              <br />
              Book a site viewing.
            </h2>
            <p className={styles.description}>
              What you see is what you get. We believe in total transparency.
              Walk the perimeter, inspect structural construction quality, test
              the natural lighting, and verify neighborhood amenities in person.
            </p>

            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Accompanied on-site tour with licensed broker</span>
              </div>
              <div className={styles.benefitItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Access to architectural floor plans and title deeds</span>
              </div>
              <div className={styles.benefitItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Zero viewing charges or hidden commitments</span>
              </div>
              <div className={styles.benefitItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Direct coordination via WhatsApp or Phone</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className={styles.formCard}>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <h3 className={styles.formTitle}>Schedule an Inspection Tour</h3>
                <p className={styles.formSubtitle}>
                  Choose your preferred typology and time. Joseph Simiyu Kefa will confirm your booking immediately.
                </p>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Property Category</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className={styles.select}
                    >
                      <option value="apartment">Apartments</option>
                      <option value="villa">Villas</option>
                      <option value="house">Houses &amp; Townhouses</option>
                      <option value="bnb">BnB / Vacation Stay</option>
                      <option value="construction">Active Construction Site Visit</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Preferred Time</label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className={styles.select}
                    >
                      <option value="morning">Morning (9:00 AM – 12:00 PM)</option>
                      <option value="afternoon">Afternoon (1:00 PM – 4:00 PM)</option>
                      <option value="evening">Late Afternoon (4:00 PM – 6:00 PM)</option>
                      <option value="weekend">Saturday / Sunday Special</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Your Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. John K."
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="0722 000 000"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Preferred Inspection Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={styles.input}
                  />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Confirm Viewing Request
                </button>

                <a
                  href={getWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappDirectBtn}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5.2-1.31C8.61 21.53 10.26 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.46 14.38c-.23.64-1.16 1.2-1.61 1.25-.43.05-.98.07-2.83-.69-2.37-.97-3.9-3.39-4.02-3.55-.12-.16-.96-1.28-.96-2.44 0-1.16.61-1.73.83-1.96.22-.23.48-.29.64-.29.16 0 .32 0 .46.01.15.01.35-.06.55.42.2.49.69 1.68.75 1.8.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.25.25-.11.49.14.24.62 1.02 1.33 1.65.91.81 1.68 1.06 1.92 1.18.24.12.38.1.52-.06.14-.16.61-.71.77-.95.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.17 1.22z"/>
                  </svg>
                  <span>Fast Track on WhatsApp (0722705898)</span>
                </a>
              </form>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(37, 211, 102, 0.2)",
                    color: "#25d366",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px auto",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className={styles.formTitle}>Viewing Request Received!</h3>
                <p className={styles.formSubtitle}>
                  Thank you, {fullName}. Joseph Simiyu Kefa has been notified and will contact you directly at {phone} to confirm the access pass and exact meetup pin.
                </p>
                <a
                  href={getWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappDirectBtn}
                  style={{ marginTop: "16px" }}
                >
                  <span>Message Joseph on WhatsApp Now</span>
                </a>
              </div>
            )}
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
