"use client";

import { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import styles from "../admin.module.css";

export default function AdminViewingsPage() {
  const { siteData, showToast, fetchContent } = useAdminData();
  const [statusFilter, setStatusFilter] = useState("all"); // "all" | "Pending" | "Confirmed" | "Completed"
  const [searchQuery, setSearchQuery] = useState("");

  const viewingsList = siteData.viewings || [];

  const filteredViewings = viewingsList.filter((v) => {
    if (statusFilter !== "all" && v.status !== statusFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (v.clientName && v.clientName.toLowerCase().includes(q)) ||
      (v.phone && v.phone.toLowerCase().includes(q)) ||
      (v.propertyType && v.propertyType.toLowerCase().includes(q)) ||
      (v.notes && v.notes.toLowerCase().includes(q))
    );
  });

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await fetch("/api/viewings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Viewing marked as ${newStatus}`);
        fetchContent();
      }
    } catch (err) {
      showToast("Error updating status");
    }
  };

  const getCleanPhone = (phone) => {
    if (!phone) return "";
    let clean = phone.replace(/\D/g, "");
    if (clean.startsWith("0")) clean = "254" + clean.slice(1);
    return clean;
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return styles.statusPending;
      case "Confirmed":
        return styles.statusConfirmed;
      case "Completed":
        return styles.statusCompleted;
      default:
        return styles.statusCancelled;
    }
  };

  return (
    <div className={styles.dashboardBody}>
      {/* Header */}
      <div className={styles.panelHeader} style={{ marginBottom: "20px" }}>
        <div className={styles.panelTitleGroup}>
          <h2>Site Viewing Inquiries &amp; Bookings</h2>
          <p>
            Client inspection bookings for Villas, Land, Apartments, and BnBs. Reply instantly via WhatsApp as Joseph Simiyu Kefa.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div className={styles.searchBox} style={{ display: "block" }}>
            <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by client or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className={styles.subTabBar}>
        <button
          type="button"
          className={`${styles.subTabBtn} ${statusFilter === "all" ? styles.subTabBtnActive : ""}`}
          onClick={() => setStatusFilter("all")}
        >
          <span>All Bookings</span>
          <span className={styles.countBadge}>{viewingsList.length}</span>
        </button>

        <button
          type="button"
          className={`${styles.subTabBtn} ${statusFilter === "Pending" ? styles.subTabBtnActive : ""}`}
          onClick={() => setStatusFilter("Pending")}
        >
          <span>Awaiting Confirmation</span>
          <span className={styles.alertBadge}>
            {viewingsList.filter((v) => v.status === "Pending").length}
          </span>
        </button>

        <button
          type="button"
          className={`${styles.subTabBtn} ${statusFilter === "Confirmed" ? styles.subTabBtnActive : ""}`}
          onClick={() => setStatusFilter("Confirmed")}
        >
          <span>Confirmed Site Tours</span>
          <span className={styles.countBadge}>
            {viewingsList.filter((v) => v.status === "Confirmed").length}
          </span>
        </button>

        <button
          type="button"
          className={`${styles.subTabBtn} ${statusFilter === "Completed" ? styles.subTabBtnActive : ""}`}
          onClick={() => setStatusFilter("Completed")}
        >
          <span>Completed</span>
          <span className={styles.countBadge}>
            {viewingsList.filter((v) => v.status === "Completed").length}
          </span>
        </button>
      </div>

      {/* Main Table */}
      <div className={styles.panelCard}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Phone Contact</th>
                <th>Property Interest</th>
                <th>Preferred Schedule</th>
                <th>Client Notes</th>
                <th>Current Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredViewings.length === 0 ? (
                <tr>
                  <td colSpan="7" className={styles.emptyTableState}>
                    No viewing bookings matching this filter.
                  </td>
                </tr>
              ) : (
                filteredViewings.map((viewing) => {
                  const cleanPhone = getCleanPhone(viewing.phone);
                  const whatsappMsg = encodeURIComponent(
                    `Hello ${viewing.clientName}, this is Joseph Simiyu Kefa from Peak Housing regarding your site viewing request for ${viewing.propertyType} on ${viewing.preferredDate || "upcoming date"} (${viewing.timeSlot || "convenient time"}). Is this time still good for you?`
                  );

                  return (
                    <tr key={viewing.id}>
                      <td>
                        <div className={styles.clientName}>{viewing.clientName}</div>
                        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", marginTop: "2px" }}>
                          Booked: {viewing.createdAt ? new Date(viewing.createdAt).toLocaleDateString() : "Recent"}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: "#ffffff", fontSize: "13px" }}>
                          {viewing.phone}
                        </div>
                      </td>
                      <td>
                        <span className={styles.tableLocationPill}>{viewing.propertyType}</span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: "#ffd8a8", fontSize: "13px" }}>
                          {viewing.preferredDate || "Flexible Date"}
                        </div>
                        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>
                          {viewing.timeSlot || "Anytime"}
                        </div>
                      </td>
                      <td>
                        <div style={{ maxWidth: "220px", fontSize: "12px", color: "rgba(255,255,255,0.75)", lineHeight: "1.4" }}>
                          {viewing.notes || "No additional notes provided."}
                        </div>
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${getStatusBadgeClass(viewing.status)}`}>
                          {viewing.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          {/* Direct WhatsApp button */}
                          <a
                            href={`https://wa.me/${cleanPhone}?text=${whatsappMsg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: "6px 12px",
                              borderRadius: "8px",
                              backgroundColor: "#25d366",
                              color: "#121316",
                              fontSize: "12px",
                              fontWeight: 800,
                              textDecoration: "none",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              width: "fit-content",
                            }}
                          >
                            <span>WhatsApp Client</span>
                          </a>

                          {/* Quick Status Changers */}
                          <div style={{ display: "flex", gap: "4px" }}>
                            {viewing.status !== "Confirmed" && (
                              <button
                                type="button"
                                onClick={() => handleUpdateStatus(viewing.id, "Confirmed")}
                                style={{
                                  padding: "4px 8px",
                                  fontSize: "11px",
                                  borderRadius: "6px",
                                  background: "rgba(37, 211, 102, 0.15)",
                                  color: "#86efac",
                                  border: "1px solid rgba(37, 211, 102, 0.3)",
                                  cursor: "pointer",
                                }}
                              >
                                Confirm
                              </button>
                            )}

                            {viewing.status !== "Completed" && (
                              <button
                                type="button"
                                onClick={() => handleUpdateStatus(viewing.id, "Completed")}
                                style={{
                                  padding: "4px 8px",
                                  fontSize: "11px",
                                  borderRadius: "6px",
                                  background: "rgba(255, 255, 255, 0.08)",
                                  color: "#ffffff",
                                  border: "1px solid rgba(255, 255, 255, 0.15)",
                                  cursor: "pointer",
                                }}
                              >
                                Mark Done
                              </button>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
