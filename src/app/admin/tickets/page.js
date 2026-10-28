"use client";

import { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import styles from "../admin.module.css";

export default function AdminTicketsPage() {
  const { siteData, showToast, fetchContent } = useAdminData();
  const [statusFilter, setStatusFilter] = useState("all"); // "all" | "Open" | "In Progress" | "Resolved"
  const [searchQuery, setSearchQuery] = useState("");

  // Respond / Edit Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [newStatus, setNewStatus] = useState("Open");
  const [newPriority, setNewPriority] = useState("High");

  const ticketsList = siteData.tickets || [];

  const filteredTickets = ticketsList.filter((ticket) => {
    if (statusFilter !== "all" && ticket.status !== statusFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (ticket.id && ticket.id.toLowerCase().includes(q)) ||
      (ticket.clientName && ticket.clientName.toLowerCase().includes(q)) ||
      (ticket.email && ticket.email.toLowerCase().includes(q)) ||
      (ticket.phone && ticket.phone.toLowerCase().includes(q)) ||
      (ticket.subject && ticket.subject.toLowerCase().includes(q)) ||
      (ticket.message && ticket.message.toLowerCase().includes(q))
    );
  });

  const openTicketsCount = ticketsList.filter((t) => t.status === "Open").length;
  const inProgressCount = ticketsList.filter((t) => t.status === "In Progress").length;
  const resolvedCount = ticketsList.filter((t) => t.status === "Resolved").length;

  const handleOpenManageModal = (ticket) => {
    setSelectedTicket(ticket);
    setReplyText("");
    setNewStatus(ticket.status || "Open");
    setNewPriority(ticket.priority || "High");
    setModalOpen(true);
  };

  const handleSaveTicketUpdate = async (e) => {
    e.preventDefault();
    if (!selectedTicket) return;

    try {
      const res = await fetch("/api/tickets", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedTicket.id,
          status: newStatus,
          priority: newPriority,
          reply: replyText.trim()
            ? {
                sender: "Joseph Simiyu Kefa",
                text: replyText.trim(),
              }
            : null,
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast(`Ticket #${selectedTicket.id} updated successfully!`);
        fetchContent();
        setModalOpen(false);
      }
    } catch (err) {
      showToast("Error updating ticket");
    }
  };

  const handleDeleteTicket = async (id) => {
    if (window.confirm(`Are you sure you want to delete Ticket #${id}?`)) {
      try {
        const res = await fetch(`/api/tickets?id=${id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) {
          showToast(`Ticket #${id} deleted`);
          fetchContent();
          setModalOpen(false);
        }
      } catch (err) {
        showToast("Error deleting ticket");
      }
    }
  };

  const getCleanPhone = (phone) => {
    if (!phone) return "";
    let clean = phone.replace(/\D/g, "");
    if (clean.startsWith("0")) clean = "254" + clean.slice(1);
    return clean;
  };

  return (
    <div className={styles.dashboardBody}>
      {/* Header */}
      <div className={styles.panelHeader} style={{ marginBottom: "20px" }}>
        <div className={styles.panelTitleGroup}>
          <h2>Client Inquiry Tickets &amp; Support</h2>
          <p>
            Inquiries submitted via the Contact Us form. Directly email responses, open client WhatsApp chats, or record internal status notes.
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
              placeholder="Search by ID, client, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ background: "rgba(255,255,255,0.03)", padding: "12px 20px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>Total Tickets:</span>
          <span style={{ fontSize: "16px", fontWeight: 800, color: "#ffffff" }}>{ticketsList.length}</span>
        </div>

        <div style={{ background: "rgba(37,211,102,0.08)", padding: "12px 20px", borderRadius: "14px", border: "1px solid rgba(37,211,102,0.2)", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "12px", color: "#86efac" }}>Open (Awaiting Reply):</span>
          <span style={{ fontSize: "16px", fontWeight: 800, color: "#25d366" }}>{openTicketsCount}</span>
        </div>

        <div style={{ background: "rgba(255,216,168,0.08)", padding: "12px 20px", borderRadius: "14px", border: "1px solid rgba(255,216,168,0.2)", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "12px", color: "#ffd8a8" }}>In Progress:</span>
          <span style={{ fontSize: "16px", fontWeight: 800, color: "#ffd8a8" }}>{inProgressCount}</span>
        </div>

        <div style={{ background: "rgba(255,255,255,0.03)", padding: "12px 20px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>Resolved:</span>
          <span style={{ fontSize: "16px", fontWeight: 800, color: "#ffffff" }}>{resolvedCount}</span>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className={styles.subTabBar}>
        <button
          type="button"
          className={`${styles.subTabBtn} ${statusFilter === "all" ? styles.subTabBtnActive : ""}`}
          onClick={() => setStatusFilter("all")}
        >
          <span>All Tickets</span>
          <span className={styles.countBadge}>{ticketsList.length}</span>
        </button>

        <button
          type="button"
          className={`${styles.subTabBtn} ${statusFilter === "Open" ? styles.subTabBtnActive : ""}`}
          onClick={() => setStatusFilter("Open")}
        >
          <span>Open Inquiries</span>
          <span className={styles.alertBadge}>{openTicketsCount}</span>
        </button>

        <button
          type="button"
          className={`${styles.subTabBtn} ${statusFilter === "In Progress" ? styles.subTabBtnActive : ""}`}
          onClick={() => setStatusFilter("In Progress")}
        >
          <span>In Progress</span>
          <span className={styles.countBadge}>{inProgressCount}</span>
        </button>

        <button
          type="button"
          className={`${styles.subTabBtn} ${statusFilter === "Resolved" ? styles.subTabBtnActive : ""}`}
          onClick={() => setStatusFilter("Resolved")}
        >
          <span>Resolved</span>
          <span className={styles.countBadge}>{resolvedCount}</span>
        </button>
      </div>

      {/* Main Table */}
      <div className={styles.panelCard}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Client Name &amp; Contact</th>
                <th>Subject / Area</th>
                <th>Message Content</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan="7" className={styles.emptyTableState}>
                    No tickets found matching this filter.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => {
                  const cleanPhone = getCleanPhone(ticket.phone);
                  const emailSubject = encodeURIComponent(`Peak Housing: Response to Ticket #${ticket.id} (${ticket.subject})`);
                  const emailBody = encodeURIComponent(
                    `Hello ${ticket.clientName},\n\nThank you for reaching out to Peak Housing. This is Joseph Simiyu Kefa responding to your inquiry regarding ${ticket.interest || "our listings"}.\n\nIn response to your message:\n"${ticket.message}"\n\n[Please enter your response here]\n\nWarm regards,\nJoseph Simiyu Kefa\nPeak Housing Kenya\nDirect: 0722705898`
                  );
                  const mailtoUrl = `mailto:${ticket.email}?subject=${emailSubject}&body=${emailBody}`;

                  const waText = encodeURIComponent(
                    `Hello ${ticket.clientName}, this is Joseph Simiyu Kefa from Peak Housing following up on inquiry Ticket #${ticket.id} (${ticket.subject}). How may I best assist you today?`
                  );
                  const waUrl = `https://wa.me/${cleanPhone}?text=${waText}`;

                  const isOpen = ticket.status === "Open";

                  return (
                    <tr key={ticket.id}>
                      <td>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "12px",
                            fontWeight: 800,
                            color: "#ffd8a8",
                            background: "rgba(255,216,168,0.1)",
                            padding: "3px 8px",
                            borderRadius: "6px",
                            border: "1px solid rgba(255,216,168,0.25)",
                            display: "inline-block",
                          }}
                        >
                          #{ticket.id}
                        </span>
                        <div style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.45)", marginTop: "4px" }}>
                          {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : "Today"}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontWeight: 700, color: "#ffffff", fontSize: "13.5px" }}>
                          {ticket.clientName}
                        </div>
                        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginTop: "2px" }}>
                          {ticket.email || "No email"}
                        </div>
                        <div style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
                          {ticket.phone}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontWeight: 600, color: "#ffffff", fontSize: "13px" }}>
                          {ticket.subject}
                        </div>
                        <div style={{ fontSize: "11px", color: "#ffd8a8", marginTop: "2px" }}>
                          {ticket.interest} · {ticket.preferredLocation}
                        </div>
                      </td>

                      <td>
                        <div style={{ maxWidth: "240px", fontSize: "12.5px", color: "rgba(255,255,255,0.75)", lineHeight: "1.4" }}>
                          {ticket.message || "No detailed message."}
                        </div>
                        {ticket.replies && ticket.replies.length > 0 && (
                          <div style={{ fontSize: "11px", color: "#86efac", marginTop: "4px" }}>
                            ↳ {ticket.replies.length} response recorded
                          </div>
                        )}
                      </td>

                      <td>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 800,
                            padding: "3px 8px",
                            borderRadius: "var(--radius-pill)",
                            background:
                              ticket.priority === "Urgent"
                                ? "rgba(239, 68, 68, 0.2)"
                                : ticket.priority === "High"
                                ? "rgba(255, 216, 168, 0.2)"
                                : "rgba(255, 255, 255, 0.08)",
                            color:
                              ticket.priority === "Urgent"
                                ? "#f87171"
                                : ticket.priority === "High"
                                ? "#ffd8a8"
                                : "#ffffff",
                            border: "1px solid",
                            borderColor:
                              ticket.priority === "Urgent"
                                ? "rgba(239, 68, 68, 0.35)"
                                : ticket.priority === "High"
                                ? "rgba(255, 216, 168, 0.35)"
                                : "rgba(255, 255, 255, 0.15)",
                          }}
                        >
                          {ticket.priority || "Normal"}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`${styles.statusBadge} ${
                            ticket.status === "Open"
                              ? styles.statusPending
                              : ticket.status === "In Progress"
                              ? styles.statusConfirmed
                              : styles.statusCompleted
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </td>

                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          {/* Direct Email Client Button */}
                          {ticket.email && (
                            <a
                              href={mailtoUrl}
                              style={{
                                padding: "5px 10px",
                                borderRadius: "6px",
                                backgroundColor: "rgba(255,255,255,0.08)",
                                border: "1px solid rgba(255,255,255,0.18)",
                                color: "#ffffff",
                                fontSize: "11.5px",
                                fontWeight: 700,
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "5px",
                                width: "fit-content",
                              }}
                            >
                              <span>✉ Email Client</span>
                            </a>
                          )}

                          {/* WhatsApp Client Button */}
                          {cleanPhone && (
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                padding: "5px 10px",
                                borderRadius: "6px",
                                backgroundColor: "rgba(37, 211, 102, 0.15)",
                                border: "1px solid rgba(37, 211, 102, 0.35)",
                                color: "#25d366",
                                fontSize: "11.5px",
                                fontWeight: 700,
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "5px",
                                width: "fit-content",
                              }}
                            >
                              <span>WhatsApp</span>
                            </a>
                          )}

                          {/* Manage / Respond Modal Button */}
                          <button
                            type="button"
                            onClick={() => handleOpenManageModal(ticket)}
                            style={{
                              padding: "4px 8px",
                              borderRadius: "6px",
                              background: "#ffd8a8",
                              color: "#121316",
                              fontSize: "11px",
                              fontWeight: 800,
                              cursor: "pointer",
                              border: "none",
                              width: "fit-content",
                            }}
                          >
                            Manage Status
                          </button>
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

      {/* MANAGE TICKET MODAL */}
      {modalOpen && selectedTicket && (
        <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
          <div className={styles.modalContent} style={{ maxWidth: "620px" }} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3>Manage Ticket #{selectedTicket.id}</h3>
                <div style={{ fontSize: "12px", color: "#ffd8a8", marginTop: "2px" }}>
                  Client: {selectedTicket.clientName} ({selectedTicket.email || selectedTicket.phone})
                </div>
              </div>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTicketUpdate}>
              <div style={{ background: "rgba(0,0,0,0.3)", padding: "14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "16px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>
                  Client Inquiry
                </span>
                <div style={{ fontSize: "13.5px", color: "#ffffff", marginTop: "4px", lineHeight: "1.5" }}>
                  &ldquo;{selectedTicket.message}&rdquo;
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Ticket Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className={styles.fieldSelect}
                  >
                    <option value="Open">Open (Pending Follow-up)</option>
                    <option value="In Progress">In Progress (Contacted Client)</option>
                    <option value="Resolved">Resolved (Completed)</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Priority Level</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className={styles.fieldSelect}
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Record Response Note (Internal History)</label>
                <textarea
                  rows="3"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className={styles.fieldTextarea}
                  placeholder="Record what was discussed with the client (e.g. Sent brochure via email, confirmed viewing for Friday 2pm)..."
                />
              </div>

              <div className={styles.modalActions} style={{ justifyContent: "space-between" }}>
                <button
                  type="button"
                  onClick={() => handleDeleteTicket(selectedTicket.id)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "var(--radius-pill)",
                    background: "rgba(239, 68, 68, 0.15)",
                    color: "#f87171",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Delete Ticket
                </button>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.saveBtn}>
                    Save Ticket Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
