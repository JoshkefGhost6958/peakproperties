"use client";

import Link from "next/link";
import { useAdminData } from "@/context/AdminDataContext";
import styles from "./admin.module.css";

export default function AdminOverviewPage() {
  const { siteData, loading } = useAdminData();

  const totalProperties =
    (siteData.villas?.length || 0) +
    (siteData.land?.length || 0) +
    (siteData.apartments?.length || 0) +
    (siteData.bnbs?.length || 0);

  const pendingViewings = (siteData.viewings || []).filter((v) => v.status === "Pending").length;
  const openTickets = (siteData.tickets || []).filter((t) => t.status === "Open").length;
  const activeEngineers = (siteData.engineers || []).filter((e) => e.status === "Active").length;
  const activeIncentives = (siteData.contractorIncentives || []).filter((i) => i.status === "Active").length;

  return (
    <div className={styles.dashboardBody}>
      {/* Top Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(255, 216, 168, 0.08) 0%, rgba(20, 22, 28, 0.95) 100%)",
          border: "1px solid rgba(255, 216, 168, 0.2)",
          borderRadius: "20px",
          padding: "28px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          marginBottom: "28px",
        }}
      >
        <div>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: "#ffd8a8", textTransform: "uppercase", marginBottom: "6px" }}>
            Peak Housing · CMS Management Portal
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#ffffff", marginBottom: "6px" }}>
            Welcome, Joseph Simiyu Kefa
          </h1>
          <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.7)", maxWidth: "600px", lineHeight: "1.5" }}>
            Manage properties, vetted structural engineers, construction timelines, and hero showcase houses across Westlands and Lavington. All listings uphold the &ldquo;What you see is what you get&rdquo; guarantee.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Link
            href="/admin/site-management"
            style={{
              padding: "10px 20px",
              borderRadius: "var(--radius-pill)",
              backgroundColor: "#ffd8a8",
              color: "#121316",
              fontSize: "13px",
              fontWeight: 800,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 14px rgba(255, 216, 168, 0.25)",
            }}
          >
            <span>✨ Edit Homepage Hero Slides</span>
          </Link>
        </div>
      </div>

      {/* Stats Summary Cards Row */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Active Properties</span>
          <span className={styles.statCount}>{totalProperties}</span>
          <span className={styles.statMeta}>Villas, Land, Apartments, BnBs</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Vetted Contractors &amp; Engineers</span>
          <span className={styles.statCount} style={{ color: "#ffd8a8" }}>
            {(siteData.construction?.length || 0) + (siteData.engineers?.length || 0)}
          </span>
          <span className={styles.statMeta}>{activeIncentives} Performance Incentive Schemes</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Site Viewing Inquiries</span>
          <span className={styles.statCount} style={{ color: pendingViewings > 0 ? "#ffd8a8" : "#25d366" }}>
            {siteData.viewings?.length || 0}
          </span>
          <span className={styles.statMeta}>
            {pendingViewings > 0 ? `${pendingViewings} awaiting confirmation` : "All confirmed"}
          </span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Client Inquiry Tickets</span>
          <span className={styles.statCount} style={{ color: openTickets > 0 ? "#ffd8a8" : "#25d366" }}>
            {siteData.tickets?.length || 0}
          </span>
          <span className={styles.statMeta}>
            {openTickets > 0 ? `${openTickets} open inquiries to email` : "All tickets resolved"}
          </span>
        </div>
      </div>

      {/* Navigation Quick Cards */}
      <div style={{ marginTop: "16px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "16px" }}>
          Administrative Modules
        </h2>

        <div className={styles.overviewGrid}>
          {/* Villas */}
          <Link href="/admin/villas" className={styles.overviewNavCard}>
            <div className={styles.overviewCardTop}>
              <div className={styles.overviewCardIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className={styles.overviewCardBadge}>{siteData.villas?.length || 0} Listed</span>
            </div>
            <div>
              <div className={styles.overviewCardTitle}>Luxury Villas</div>
              <div className={styles.overviewCardDesc}>
                Manage signature 4-5 bedroom residences, private compounds, pools, and verify listing guarantees.
              </div>
            </div>
            <div className={styles.overviewCardFooter}>
              <span>Manage Villas</span>
              <span>→</span>
            </div>
          </Link>

          {/* Land */}
          <Link href="/admin/land" className={styles.overviewNavCard}>
            <div className={styles.overviewCardTop}>
              <div className={styles.overviewCardIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                  <line x1="8" y1="2" x2="8" y2="18" />
                  <line x1="16" y1="6" x2="16" y2="22" />
                </svg>
              </div>
              <span className={styles.overviewCardBadge}>{siteData.land?.length || 0} Plots</span>
            </div>
            <div>
              <div className={styles.overviewCardTitle}>Land &amp; Plots</div>
              <div className={styles.overviewCardDesc}>
                Update title deed verifications, acreages, soil profiles, and zoning for residential and commercial redevelopment.
              </div>
            </div>
            <div className={styles.overviewCardFooter}>
              <span>Manage Land</span>
              <span>→</span>
            </div>
          </Link>

          {/* Apartments */}
          <Link href="/admin/apartments" className={styles.overviewNavCard}>
            <div className={styles.overviewCardTop}>
              <div className={styles.overviewCardIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                  <line x1="9" y1="22" x2="9" y2="22.01" />
                  <line x1="15" y1="22" x2="15" y2="22.01" />
                  <line x1="9" y1="6" x2="9" y2="6.01" />
                  <line x1="15" y1="6" x2="15" y2="6.01" />
                </svg>
              </div>
              <span className={styles.overviewCardBadge}>{siteData.apartments?.length || 0} Suites</span>
            </div>
            <div>
              <div className={styles.overviewCardTitle}>Executive Apartments</div>
              <div className={styles.overviewCardDesc}>
                Manage penthouses, 2-3 bed suites, rooftop pools, and executive residences in Westlands and Lavington.
              </div>
            </div>
            <div className={styles.overviewCardFooter}>
              <span>Manage Apartments</span>
              <span>→</span>
            </div>
          </Link>

          {/* BnBs */}
          <Link href="/admin/bnbs" className={styles.overviewNavCard}>
            <div className={styles.overviewCardTop}>
              <div className={styles.overviewCardIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
                </svg>
              </div>
              <span className={styles.overviewCardBadge}>{siteData.bnbs?.length || 0} Stays</span>
            </div>
            <div>
              <div className={styles.overviewCardTitle}>Boutique BnBs</div>
              <div className={styles.overviewCardDesc}>
                Update nightly rates, amenities, fiber speeds, and guest capacities for short-stay architectural suites.
              </div>
            </div>
            <div className={styles.overviewCardFooter}>
              <span>Manage BnBs</span>
              <span>→</span>
            </div>
          </Link>

          {/* Contractors & Engineers */}
          <Link href="/admin/contractors" className={styles.overviewNavCard}>
            <div className={styles.overviewCardTop}>
              <div className={styles.overviewCardIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <span className={styles.overviewCardBadge}>
                {(siteData.construction?.length || 0) + (siteData.engineers?.length || 0)} Total
              </span>
            </div>
            <div>
              <div className={styles.overviewCardTitle}>Contractors &amp; Incentives</div>
              <div className={styles.overviewCardDesc}>
                Manage vetted structural engineers, turnkey builds, project access permissions, and award performance bonus incentives.
              </div>
            </div>
            <div className={styles.overviewCardFooter}>
              <span>Manage Contractors &amp; Incentives</span>
              <span>→</span>
            </div>
          </Link>

          {/* Site Viewings */}
          <Link href="/admin/viewings" className={styles.overviewNavCard}>
            <div className={styles.overviewCardTop}>
              <div className={styles.overviewCardIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <span className={pendingViewings > 0 ? styles.alertBadge : styles.overviewCardBadge}>
                {pendingViewings > 0 ? `${pendingViewings} Pending` : `${siteData.viewings?.length || 0} Total`}
              </span>
            </div>
            <div>
              <div className={styles.overviewCardTitle}>Site Viewing Bookings</div>
              <div className={styles.overviewCardDesc}>
                Review client requests, dates, time slots, and connect with clients via WhatsApp directly from Joseph Simiyu Kefa.
              </div>
            </div>
            <div className={styles.overviewCardFooter}>
              <span>Review Bookings</span>
              <span>→</span>
            </div>
          </Link>

          {/* Inquiry Tickets */}
          <Link href="/admin/tickets" className={styles.overviewNavCard}>
            <div className={styles.overviewCardTop}>
              <div className={styles.overviewCardIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <span className={openTickets > 0 ? styles.alertBadge : styles.overviewCardBadge}>
                {openTickets > 0 ? `${openTickets} Open` : `${siteData.tickets?.length || 0} Total`}
              </span>
            </div>
            <div>
              <div className={styles.overviewCardTitle}>Client Inquiry Tickets</div>
              <div className={styles.overviewCardDesc}>
                Inquiries from Contact Us. Directly email clients with pre-filled context, launch WhatsApp chats, or make phone calls.
              </div>
            </div>
            <div className={styles.overviewCardFooter}>
              <span>Respond to Tickets</span>
              <span>→</span>
            </div>
          </Link>

          {/* Homepage & Hero Showcase */}
          <Link href="/admin/site-management" className={styles.overviewNavCard} style={{ borderColor: "rgba(255, 216, 168, 0.25)" }}>
            <div className={styles.overviewCardTop}>
              <div className={styles.overviewCardIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <span className={styles.overviewCardBadge} style={{ color: "#ffd8a8" }}>Hero Slides</span>
            </div>
            <div>
              <div className={styles.overviewCardTitle}>Homepage &amp; Hero Showcase</div>
              <div className={styles.overviewCardDesc}>
                Update hero houses &amp; slideshow text, select which properties are rendered on public pages, and customize showcase features.
              </div>
            </div>
            <div className={styles.overviewCardFooter}>
              <span>Edit Hero Slideshow</span>
              <span>→</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
