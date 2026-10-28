"use client";

import Image from "next/image";
import Link from "next/link";
import SpheraHeader from "@/components/Sphera/SpheraHeader";
import SpheraFooter from "@/components/Sphera/SpheraFooter";
import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <main className={styles.pageWrapper}>
      <SpheraHeader />

      {/* Hero */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <span>About Us</span>
          </div>

          <div className={styles.heroTag}>OUR ETHOS &amp; PROMISE</div>
          <h1 className={styles.title}>
            What You See <br />
            <span className={styles.titleHighlight}>Is What You Get.</span>
          </h1>
          <p className={styles.subtitle}>
            Peak Housing was founded to restore absolute trust, architectural
            clarity, and verified authenticity to Nairobi&apos;s luxury property
            market and custom residential construction.
          </p>
        </div>
      </section>

      {/* Origin & Story Section */}
      <section className={styles.storySection}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <div className={styles.heroTag}>THE PROBLEM WE SOLVE</div>
              <h2>Ending False Advertising in Real Estate &amp; Construction</h2>
              <p>
                For years, finding a home or building a private residence in Nairobi
                has been marred by misleading wide-angle photography, unverified
                land beacons, bait-and-switch listings, and contractors who disappear
                halfway through a project.
              </p>
              <p>
                <strong>Peak Housing operates on a simple, non-negotiable rule:</strong>{" "}
                If we haven&apos;t physically stood in the property, verified the
                registry deed search with the Ministry of Lands, and inspected the
                finishes with our own eyes, it does not get published.
              </p>
              <p>
                From private villas in Lavington and executive apartments in
                Westlands to ground-up architectural construction, our clients
                enjoy total transparency and complete peace of mind.
              </p>
            </div>

            <div className={styles.storyImageWrapper}>
              <Image
                src="/images/about_river.jpg"
                alt="Peak Housing Architectural Standard"
                fill
                sizes="(max-width: 960px) 100vw, 50vw"
                className={styles.storyImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3 Guarantee Pillars */}
      <section className={styles.guaranteeSection}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
            <div className={styles.heroTag}>THE THREE PILLARS</div>
            <h2 style={{ fontSize: "36px", fontWeight: "800", letterSpacing: "-0.02em" }}>
              How We Protect Every Client
            </h2>
          </div>

          <div className={styles.guaranteeCards}>
            <div className={styles.guaranteeCard}>
              <div className={styles.guaranteeNumber}>01</div>
              <h3 className={styles.guaranteeTitle}>Physical In-Person Audit</h3>
              <p className={styles.guaranteeText}>
                No stock images. Every photo, drone video, and floor plan shown
                on Peak Housing represents the genuine, present condition of the
                property.
              </p>
            </div>

            <div className={styles.guaranteeCard}>
              <div className={styles.guaranteeNumber}>02</div>
              <h3 className={styles.guaranteeTitle}>Title &amp; Beacon Verification</h3>
              <p className={styles.guaranteeText}>
                Every land plot and villa undergoes rigorous land registry title
                search verification and physical boundary beacon confirmation
                before a client visits.
              </p>
            </div>

            <div className={styles.guaranteeCard}>
              <div className={styles.guaranteeNumber}>03</div>
              <h3 className={styles.guaranteeTitle}>Vetted Construction Escrow</h3>
              <p className={styles.guaranteeText}>
                For dream house construction, we only connect you with licensed
                NCA contractors and architects who adhere strictly to itemized
                BOQs and verified milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Profile */}
      <section className={styles.leadSection}>
        <div className="container">
          <div className={styles.leadBox}>
            <div className={styles.leadAvatarWrapper}>
              <Image
                src="/images/coordinator.jpeg"
                alt="Joseph Simiyu Kefa"
                fill
                sizes="96px"
                className={styles.leadAvatarImg}
                priority
              />
            </div>

            <div className={styles.leadInfo}>
              <h3>Joseph Simiyu Kefa</h3>
              <div className={styles.leadRole}>Direct Representative &amp; Client Director</div>
              <p className={styles.leadBio}>
                Joseph manages all on-site property viewings, land beacon inspections,
                and contractor consultations personally to guarantee our standard:
                What you see is what you get. Get in touch directly for immediate
                private viewings or dream house build advisory.
              </p>
            </div>

            <div className={styles.leadAction}>
              <a href="tel:0722705898" className={styles.leadPhoneBtn}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call 0722705898</span>
              </a>

              <a
                href="https://wa.me/254722705898?text=Hello%20Joseph%2C%20I%20would%20like%20to%20learn%20more%20about%20Peak%20Housing%20and%20its%20verified%20properties."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.leadWhatsAppBtn}
              >
                <span>WhatsApp Joseph</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <SpheraFooter />
    </main>
  );
}
