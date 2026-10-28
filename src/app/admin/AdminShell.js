"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminData } from "@/context/AdminDataContext";
import styles from "./admin.module.css";

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const { siteData, adminUser, authChecked, toastMessage, handleLogout } = useAdminData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("peak_admin_sidebar_collapsed");
      if (saved !== null) {
        setIsCollapsed(saved === "true");
      }
    } catch {
      // Ignore localStorage read errors in SSR or restricted contexts
    }
  }, []);

  const toggleCollapse = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    try {
      localStorage.setItem("peak_admin_sidebar_collapsed", String(next));
    } catch {
      // Ignore storage errors
    }
  };

  // If on login route, bypass shell and render directly
  if (pathname.startsWith("/admin/login")) {
    return <>{children}</>;
  }

  if (!authChecked) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0d11",
          color: "#ffffff",
          gap: "16px",
          fontFamily: "var(--font-main)",
        }}
      >
        <Image
          src="/images/peak-housing-logo.jpg"
          alt="Peak Housing"
          width={48}
          height={48}
          style={{ borderRadius: "10px" }}
        />
        <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>
          Authenticating Peak Housing Admin...
        </div>
      </div>
    );
  }

  const getPendingViewingsCount = () => {
    return (siteData.viewings || []).filter((v) => v.status === "Pending").length;
  };

  const getOpenTicketsCount = () => {
    return (siteData.tickets || []).filter((t) => t.status === "Open").length;
  };

  const getBreadcrumbTitle = () => {
    if (pathname === "/admin") return "Dashboard Overview";
    if (pathname.startsWith("/admin/villas")) return "Luxury Villas";
    if (pathname.startsWith("/admin/land")) return "Prime Land & Plots";
    if (pathname.startsWith("/admin/apartments")) return "Executive Apartments";
    if (pathname.startsWith("/admin/bnbs")) return "Boutique BnBs & Stays";
    if (pathname.startsWith("/admin/contractors")) return "Contractors, Engineers & Incentives";
    if (pathname.startsWith("/admin/viewings")) return "Site Viewing Inquiries";
    if (pathname.startsWith("/admin/tickets")) return "Client Inquiry Tickets";
    if (pathname.startsWith("/admin/site-management")) return "Homepage & Hero Showcase";
    return "Admin Control Center";
  };

  const isActive = (route) => {
    if (route === "/admin") return pathname === "/admin";
    return pathname.startsWith(route);
  };

  return (
    <div className={styles.adminLayout}>
      {/* =====================================================================
          SIDEBAR NAVIGATION (INDEPENDENT ROUTES)
          ===================================================================== */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""} ${isCollapsed ? styles.sidebarCollapsed : ""}`}>
        {/* Brand Header & Collapse Toggle */}
        <div className={styles.sidebarHeader}>
          <Link href="/admin" className={styles.brandLink} title="Peak Housing Control Center">
            <Image
              src="/images/peak-housing-logo.jpg"
              alt="Peak Housing Logo"
              width={38}
              height={38}
              className={styles.brandLogoImg}
            />
            <div className={styles.brandTextGroup}>
              <span className={styles.brandTitle}>PEAK HOUSING</span>
              <span className={styles.brandSubtitle}>Admin Control Center</span>
            </div>
          </Link>
          <button
            type="button"
            className={styles.collapseToggleBtn}
            onClick={toggleCollapse}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{
                transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.25s ease",
              }}
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>

        {/* Navigation Groups */}
        <div className={styles.sidebarNav}>
          {/* Group 0: Overview */}
          <div className={styles.navGroup}>
            <span className={styles.groupLabel}>Dashboard</span>
            <Link
              href="/admin"
              className={`${styles.navItem} ${isActive("/admin") ? styles.navItemActive : ""}`}
              onClick={() => setSidebarOpen(false)}
              title="Dashboard Overview"
            >
              <div className={styles.navItemLeft}>
                <span className={styles.navIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </span>
                <span className={styles.navItemText}>Overview</span>
              </div>
            </Link>
          </div>

          {/* Group 1: Properties & Real Estate */}
          <div className={styles.navGroup}>
            <span className={styles.groupLabel}>Properties &amp; Land</span>

            {/* Villas */}
            <Link
              href="/admin/villas"
              className={`${styles.navItem} ${isActive("/admin/villas") ? styles.navItemActive : ""}`}
              onClick={() => setSidebarOpen(false)}
              title="Luxury Villas Management"
            >
              <div className={styles.navItemLeft}>
                <span className={styles.navIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </span>
                <span className={styles.navItemText}>Villas</span>
              </div>
              <span className={`${styles.countBadge} ${isActive("/admin/villas") ? styles.countBadgeActive : ""}`}>
                {siteData.villas?.length || 0}
              </span>
            </Link>

            {/* Land */}
            <Link
              href="/admin/land"
              className={`${styles.navItem} ${isActive("/admin/land") ? styles.navItemActive : ""}`}
              onClick={() => setSidebarOpen(false)}
              title="Prime Land & Plots Management"
            >
              <div className={styles.navItemLeft}>
                <span className={styles.navIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                    <line x1="8" y1="2" x2="8" y2="8" />
                    <line x1="16" y1="6" x2="16" y2="22" />
                  </svg>
                </span>
                <span className={styles.navItemText}>Land &amp; Plots</span>
              </div>
              <span className={`${styles.countBadge} ${isActive("/admin/land") ? styles.countBadgeActive : ""}`}>
                {siteData.land?.length || 0}
              </span>
            </Link>

            {/* Apartments */}
            <Link
              href="/admin/apartments"
              className={`${styles.navItem} ${isActive("/admin/apartments") ? styles.navItemActive : ""}`}
              onClick={() => setSidebarOpen(false)}
              title="Executive Apartments Management"
            >
              <div className={styles.navItemLeft}>
                <span className={styles.navIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                    <line x1="9" y1="22" x2="9" y2="22.01" />
                    <line x1="15" y1="22" x2="15" y2="22.01" />
                    <line x1="9" y1="6" x2="9" y2="6.01" />
                    <line x1="15" y1="6" x2="15" y2="6.01" />
                    <line x1="9" y1="10" x2="9" y2="10.01" />
                    <line x1="15" y1="10" x2="15" y2="10.01" />
                  </svg>
                </span>
                <span className={styles.navItemText}>Apartments</span>
              </div>
              <span className={`${styles.countBadge} ${isActive("/admin/apartments") ? styles.countBadgeActive : ""}`}>
                {siteData.apartments?.length || 0}
              </span>
            </Link>

            {/* BnBs */}
            <Link
              href="/admin/bnbs"
              className={`${styles.navItem} ${isActive("/admin/bnbs") ? styles.navItemActive : ""}`}
              onClick={() => setSidebarOpen(false)}
              title="Boutique BnBs Management"
            >
              <div className={styles.navItemLeft}>
                <span className={styles.navIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
                  </svg>
                </span>
                <span className={styles.navItemText}>Boutique BnBs</span>
              </div>
              <span className={`${styles.countBadge} ${isActive("/admin/bnbs") ? styles.countBadgeActive : ""}`}>
                {siteData.bnbs?.length || 0}
              </span>
            </Link>
          </div>

          {/* Group 2: Construction */}
          <div className={styles.navGroup}>
            <span className={styles.groupLabel}>Construction &amp; Builds</span>

            {/* Contractors & Projects */}
            <Link
              href="/admin/contractors"
              className={`${styles.navItem} ${isActive("/admin/contractors") ? styles.navItemActive : ""}`}
              onClick={() => setSidebarOpen(false)}
              title="Contractors, Engineers & Performance Incentives"
            >
              <div className={styles.navItemLeft}>
                <span className={styles.navIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </span>
                <span className={styles.navItemText}>Contractors &amp; Projects</span>
              </div>
              <span className={`${styles.countBadge} ${isActive("/admin/contractors") ? styles.countBadgeActive : ""}`}>
                {(siteData.construction?.length || 0) + (siteData.engineers?.length || 0)}
              </span>
            </Link>
          </div>

          {/* Group 3: Operations & Client Care */}
          <div className={styles.navGroup}>
            <span className={styles.groupLabel}>Client Operations</span>

            {/* Site Viewings */}
            <Link
              href="/admin/viewings"
              className={`${styles.navItem} ${isActive("/admin/viewings") ? styles.navItemActive : ""}`}
              onClick={() => setSidebarOpen(false)}
              title="Client Site Viewing Bookings"
            >
              <div className={styles.navItemLeft}>
                <span className={styles.navIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </span>
                <span className={styles.navItemText}>Site Viewings</span>
              </div>
              {getPendingViewingsCount() > 0 ? (
                <span className={styles.alertBadge}>
                  {getPendingViewingsCount()} new
                </span>
              ) : (
                <span className={styles.countBadge}>
                  {siteData.viewings?.length || 0}
                </span>
              )}
            </Link>

            {/* Inquiry Tickets */}
            <Link
              href="/admin/tickets"
              className={`${styles.navItem} ${isActive("/admin/tickets") ? styles.navItemActive : ""}`}
              onClick={() => setSidebarOpen(false)}
              title="Client Inquiry & Support Tickets"
            >
              <div className={styles.navItemLeft}>
                <span className={styles.navIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <span className={styles.navItemText}>Inquiry Tickets</span>
              </div>
              {getOpenTicketsCount() > 0 ? (
                <span className={styles.alertBadge}>
                  {getOpenTicketsCount()} new
                </span>
              ) : (
                <span className={styles.countBadge}>
                  {siteData.tickets?.length || 0}
                </span>
              )}
            </Link>
          </div>

          {/* Group 4: Site Management & Hero Houses */}
          <div className={styles.navGroup}>
            <span className={styles.groupLabel}>Site Configuration</span>

            {/* Site Management & Hero Showcase */}
            <Link
              href="/admin/site-management"
              className={`${styles.navItem} ${isActive("/admin/site-management") ? styles.navItemActive : ""}`}
              onClick={() => setSidebarOpen(false)}
              title="Homepage & Hero Showcase Management"
            >
              <div className={styles.navItemLeft}>
                <span className={styles.navIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </span>
                <span className={styles.navItemText}>Homepage &amp; Hero Showcase</span>
              </div>
              <span className={`${styles.countBadge} ${isActive("/admin/site-management") ? styles.countBadgeActive : ""}`}>
                Hero Slides
              </span>
            </Link>
          </div>
        </div>

        {/* Sidebar Footer Profile */}
        <div className={styles.sidebarFooter}>
          <div className={styles.profileCard}>
            <div className={styles.profileAvatar}>JSK</div>
            <div className={styles.profileInfo}>
              <span className={styles.profileName}>
                {adminUser?.name || "Joseph Simiyu Kefa"}
              </span>
              <span className={styles.profileRole}>Super Admin · Verified</span>
            </div>
          </div>

          <div className={styles.footerActions}>
            <Link href="/" target="_blank" className={styles.siteLinkBtn}>
              Live Site ↗
            </Link>

            <button type="button" onClick={handleLogout} className={styles.logoutBtn}>
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* =====================================================================
          MAIN CONTENT AREA & REDESIGNED TOPBAR
          ===================================================================== */}
      <div className={styles.mainContent}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button
              type="button"
              className={styles.mobileMenuBtn}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle Navigation Sidebar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <div className={styles.breadcrumb}>
              <span>Peak Housing</span>
              <span>/</span>
              <span className={styles.breadcrumbActive}>{getBreadcrumbTitle()}</span>
            </div>
          </div>

          <div className={styles.topbarRight}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#25d366",
                  display: "inline-block",
                  boxShadow: "0 0 8px #25d366",
                }}
              />
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>
                Live System
              </span>
            </div>

            {/* Quick Hero Slides CTA in Navbar */}
            <Link
              href="/admin/site-management"
              className={styles.heroTopbarBtn}
              title="Edit Homepage Hero Slides and Staged Real Estate"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>Edit Hero Slides</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#ffd8a8",
                textDecoration: "none",
                background: "rgba(255,216,168,0.1)",
                border: "1px solid rgba(255,216,168,0.25)",
                padding: "6px 14px",
                borderRadius: "var(--radius-pill)",
                transition: "all var(--transition-fast)",
              }}
            >
              View Public Website ↗
            </Link>
          </div>
        </header>

        {/* Route Page Content */}
        {children}
      </div>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className={styles.toast}>
          <span className={styles.toastCheck}>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
