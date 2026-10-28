"use client";

import { useState } from "react";
import Image from "next/image";
import { useAdminData } from "@/context/AdminDataContext";
import styles from "../admin.module.css";

export default function AdminPersonnelPage() {
  const { siteData, createItem, updateItem, deleteItem, showToast, fetchContent } = useAdminData();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState(null);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedPersonnelForAssign, setSelectedPersonnelForAssign] = useState(null);
  const [selectedViewingId, setSelectedViewingId] = useState("");

  const [formValues, setFormValues] = useState({
    id: "",
    name: "",
    role: "Site Viewing Officer",
    title: "Lead Luxury Residence Viewing Officer",
    phone: "+254 7",
    email: "",
    status: "Available", // "Available" | "On Site Tour" | "Off Duty"
    avatar: "SO",
    specialties: "Karen Villas, Lavington Compound Inspections",
  });

  const personnelList = siteData.personnel || [];
  const viewingsList = siteData.viewings || [];

  const filteredPersonnel = personnelList.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const specs = Array.isArray(p.specialties) ? p.specialties.join(" ") : p.specialties || "";
    return (
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.role && p.role.toLowerCase().includes(q)) ||
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.phone && p.phone.toLowerCase().includes(q)) ||
      specs.toLowerCase().includes(q)
    );
  });

  const handleOpenAdd = () => {
    setEditingPerson(null);
    setFormValues({
      id: "",
      name: "",
      role: "Site Viewing Officer",
      title: "Lead Luxury Residence Viewing Officer",
      phone: "+254 7",
      email: "",
      status: "Available",
      avatar: "VO",
      specialties: "Karen Villas, Lavington Compound Inspections",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (person) => {
    setEditingPerson(person);
    setFormValues({
      ...person,
      specialties: Array.isArray(person.specialties)
        ? person.specialties.join(", ")
        : person.specialties || "",
    });
    setModalOpen(true);
  };

  const handleSavePerson = async (e) => {
    e.preventDefault();
    const specsArray = formValues.specialties
      ? formValues.specialties.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const initials =
      formValues.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 3) || "VO";

    const payload = {
      ...formValues,
      avatar: initials,
      specialties: specsArray,
    };

    if (editingPerson) {
      await updateItem("personnel", payload);
    } else {
      await createItem("personnel", payload);
    }
    setModalOpen(false);
  };

  const handleDeletePerson = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove staff member "${name}"?`)) {
      await deleteItem("personnel", id);
    }
  };

  const handleToggleStatus = async (person) => {
    const nextStatus =
      person.status === "Available"
        ? "On Site Tour"
        : person.status === "On Site Tour"
        ? "Off Duty"
        : "Available";
    await updateItem("personnel", {
      ...person,
      status: nextStatus,
    });
  };

  const handleOpenAssignModal = (person) => {
    setSelectedPersonnelForAssign(person);
    setSelectedViewingId(viewingsList[0]?.id || "");
    setAssignModalOpen(true);
  };

  const handleAssignViewing = async (e) => {
    e.preventDefault();
    if (!selectedViewingId || !selectedPersonnelForAssign) return;

    try {
      const res = await fetch("/api/viewings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedViewingId,
          assignedTo: selectedPersonnelForAssign.name,
          assignedPersonnel: selectedPersonnelForAssign.name,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(
          `Designated site viewing to ${selectedPersonnelForAssign.name} successfully!`
        );
        setAssignModalOpen(false);
        fetchContent();
      } else {
        showToast(data.error || "Failed to designate viewing");
      }
    } catch (err) {
      showToast("Network error while assigning viewing");
    }
  };

  // Compute stats
  const totalStaff = personnelList.length;
  const availableCount = personnelList.filter((p) => p.status === "Available").length;
  const onTourCount = personnelList.filter((p) => p.status === "On Site Tour").length;
  const assignedViewings = viewingsList.filter((v) => v.assignedTo || v.assignedPersonnel);

  return (
    <div className={styles.dashboardBody}>
      {/* Header */}
      <div className={styles.panelHeader} style={{ marginBottom: "20px" }}>
        <div className={styles.panelTitleGroup}>
          <h2>Personnel &amp; Site Viewing Officers</h2>
          <p>
            Manage representatives, structural inspectors, and client concierges. Designate scheduled site visits and client attendings.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div className={styles.searchBox} style={{ display: "block" }}>
            <svg
              className={styles.searchIcon}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search personnel or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <button
            type="button"
            className={styles.primaryCreateBtn}
            onClick={handleOpenAdd}
          >
            <span>+</span>
            <span>Add Personnel</span>
          </button>
        </div>
      </div>

      {/* Top Overview Cards */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Staff Members</span>
          <span className={styles.statCount}>{totalStaff}</span>
          <span className={styles.statMeta}>Verified Officers &amp; Concierges</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Available For Viewings</span>
          <span className={styles.statCount} style={{ color: "#25d366" }}>
            {availableCount}
          </span>
          <span className={styles.statMeta}>Ready for Dispatch Today</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Currently On-Site</span>
          <span className={styles.statCount} style={{ color: "#ffd8a8" }}>
            {onTourCount}
          </span>
          <span className={styles.statMeta}>Conducting Private Tours</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Designated Client Tours</span>
          <span className={styles.statCount}>{assignedViewings.length}</span>
          <span className={styles.statMeta}>Assigned Attendings</span>
        </div>
      </div>

      {/* Staff Directory Grid */}
      <div className={styles.panelCard}>
        <div className={styles.panelHeader} style={{ marginBottom: "16px" }}>
          <div className={styles.panelTitleGroup}>
            <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#ffffff" }}>
              Active Personnel Directory &amp; Viewing Delegations
            </h3>
            <p style={{ fontSize: "12.5px" }}>
              Designate viewings to specific staff so clients always meet a dedicated professional.
            </p>
          </div>
        </div>

        <div className={styles.engineersGrid}>
          {filteredPersonnel.length === 0 ? (
            <div style={{ color: "rgba(255,255,255,0.5)", padding: "24px" }}>
              No personnel matching &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            filteredPersonnel.map((person) => {
              const assignedToThisPerson = viewingsList.filter(
                (v) => v.assignedTo === person.name || v.assignedPersonnel === person.name
              );

              return (
                <div key={person.id} className={styles.engineerCard}>
                  <div>
                    <div className={styles.engineerHeader}>
                      <div className={styles.engineerAvatarGroup}>
                        <div className={styles.engineerAvatar} style={{ position: "relative", overflow: "hidden" }}>
                          {person.image ? (
                            <Image
                              src={person.image}
                              alt={person.name}
                              fill
                              sizes="46px"
                              style={{ objectFit: "cover", objectPosition: "center 10%", borderRadius: "50%" }}
                            />
                          ) : (
                            person.avatar || person.name.slice(0, 2).toUpperCase()
                          )}
                        </div>
                        <div>
                          <div className={styles.engineerName}>{person.name}</div>
                          <div className={styles.engineerCompany}>{person.role}</div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleStatus(person)}
                        style={{ cursor: "pointer", border: "none", background: "transparent" }}
                        title="Click to toggle availability status"
                      >
                        <span
                          className={
                            person.status === "Available"
                              ? styles.accessBadgeActive
                              : person.status === "On Site Tour"
                              ? styles.tableLocationPill
                              : styles.accessBadgeDisabled
                          }
                          style={{
                            borderColor:
                              person.status === "On Site Tour"
                                ? "rgba(255,216,168,0.4)"
                                : undefined,
                            color:
                              person.status === "On Site Tour" ? "#ffd8a8" : undefined,
                          }}
                        >
                          ● {person.status}
                        </span>
                      </button>
                    </div>

                    <div style={{ marginTop: "14px", fontSize: "12.5px", color: "#ffd8a8" }}>
                      {person.title}
                    </div>

                    <div className={styles.engineerDetails} style={{ marginTop: "10px" }}>
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Direct Phone</span>
                        <a
                          href={`tel:${person.phone}`}
                          style={{ color: "#ffffff", textDecoration: "none" }}
                        >
                          {person.phone}
                        </a>
                      </div>
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Official Email</span>
                        <span style={{ color: "rgba(255,255,255,0.8)" }}>{person.email || "staff@peakhousing.co.ke"}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Assigned Tours</span>
                        <span style={{ fontWeight: 800, color: "#25d366" }}>
                          {assignedToThisPerson.length} active
                        </span>
                      </div>
                    </div>

                    {/* Specialties / Areas */}
                    {person.specialties && (
                      <div style={{ marginTop: "12px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {(Array.isArray(person.specialties)
                          ? person.specialties
                          : [person.specialties]
                        ).map((spec, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: "11px",
                              padding: "2px 8px",
                              borderRadius: "6px",
                              background: "rgba(255,255,255,0.06)",
                              color: "rgba(255,255,255,0.75)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }}
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={styles.engineerFooter}>
                    <button
                      type="button"
                      className={styles.toggleAccessBtn}
                      style={{
                        background: "#25d366",
                        color: "#121316",
                        border: "1px solid #25d366",
                        fontWeight: "800",
                        boxShadow: "0 2px 8px rgba(37,211,102,0.3)",
                      }}
                      onClick={() => handleOpenAssignModal(person)}
                    >
                      + Designate Viewing
                    </button>

                    <button
                      type="button"
                      className={styles.editBtn}
                      onClick={() => handleOpenEdit(person)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={() => handleDeletePerson(person.id, person.name)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Delegated Attendings Table */}
      <div className={styles.panelCard}>
        <div className={styles.panelHeader}>
          <div className={styles.panelTitleGroup}>
            <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#ffffff" }}>
              Currently Designated Site Visits &amp; Attendings
            </h3>
            <p style={{ fontSize: "12.5px" }}>
              Overview of all customer inspection bookings mapped to specific attendants.
            </p>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Phone Contact</th>
                <th>Property Interest</th>
                <th>Preferred Date</th>
                <th>Designated Attendant</th>
                <th>Status</th>
                <th>Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              {viewingsList.length === 0 ? (
                <tr>
                  <td colSpan="7" className={styles.emptyTableState}>
                    No site viewings recorded yet.
                  </td>
                </tr>
              ) : (
                viewingsList.map((viewing) => {
                  const assignedStaff = viewing.assignedTo || viewing.assignedPersonnel || "Unassigned";

                  return (
                    <tr key={viewing.id}>
                      <td>
                        <div className={styles.tableTitle}>{viewing.clientName}</div>
                      </td>
                      <td>
                        <a
                          href={`https://wa.me/${viewing.phone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#25d366", textDecoration: "none", fontWeight: 600 }}
                        >
                          {viewing.phone} ↗
                        </a>
                      </td>
                      <td>
                        <span className={styles.tableLocationPill}>{viewing.propertyType}</span>
                      </td>
                      <td>
                        <span style={{ fontSize: "12.5px", color: "#ffffff" }}>
                          {viewing.preferredDate} ({viewing.timeSlot || "Morning"})
                        </span>
                      </td>
                      <td>
                        <span
                          style={{
                            padding: "4px 10px",
                            borderRadius: "var(--radius-pill)",
                            fontSize: "12px",
                            fontWeight: 700,
                            background:
                              assignedStaff !== "Unassigned"
                                ? "rgba(255,216,168,0.15)"
                                : "rgba(239,68,68,0.12)",
                            color:
                              assignedStaff !== "Unassigned" ? "#ffd8a8" : "#fca5a5",
                            border: `1px solid ${
                              assignedStaff !== "Unassigned"
                                ? "rgba(255,216,168,0.3)"
                                : "rgba(239,68,68,0.25)"
                            }`,
                          }}
                        >
                          {assignedStaff !== "Unassigned" ? `👤 ${assignedStaff}` : "⚠ Unassigned"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={
                            viewing.status === "Confirmed"
                              ? styles.verifiedBadge
                              : styles.unverifiedBadge
                          }
                        >
                          {viewing.status}
                        </span>
                      </td>
                      <td>
                        <div className={styles.actionGroup}>
                          <select
                            value={viewing.assignedTo || viewing.assignedPersonnel || ""}
                            onChange={async (e) => {
                              const newAssignee = e.target.value;
                              await fetch("/api/viewings", {
                                method: "PATCH",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  id: viewing.id,
                                  assignedTo: newAssignee,
                                  assignedPersonnel: newAssignee,
                                }),
                              });
                              showToast(`Assigned viewing to ${newAssignee || "Unassigned"}`);
                              fetchContent();
                            }}
                            className={styles.fieldSelect}
                            style={{ padding: "4px 8px", fontSize: "12px", width: "auto" }}
                          >
                            <option value="">-- Reassign Staff --</option>
                            {personnelList.map((p) => (
                              <option key={p.id} value={p.name}>
                                {p.name} ({p.role.split(" ")[0]})
                              </option>
                            ))}
                          </select>
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

      {/* ADD / EDIT PERSONNEL MODAL */}
      {modalOpen && (
        <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{editingPerson ? "Edit Personnel Member" : "Add New Personnel"}</h3>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePerson}>
              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Full Name</label>
                  <input
                    type="text"
                    required
                    value={formValues.name}
                    onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                    placeholder="e.g. Sarah Mwangi"
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Primary Role</label>
                  <select
                    value={formValues.role}
                    onChange={(e) => setFormValues({ ...formValues, role: e.target.value })}
                    className={styles.fieldSelect}
                  >
                    <option value="Client Director & Super Admin">Client Director &amp; Super Admin</option>
                    <option value="Site Viewing Officer">Site Viewing Officer</option>
                    <option value="Lead Structural Engineer">Lead Structural Engineer</option>
                    <option value="Senior Client Concierge">Senior Client Concierge</option>
                    <option value="Registered Land Surveyor">Registered Land Surveyor</option>
                    <option value="Legal & Conveyancing Associate">Legal &amp; Conveyancing Associate</option>
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Official Title / Headline</label>
                  <input
                    type="text"
                    required
                    value={formValues.title}
                    onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                    placeholder="e.g. Executive Suites & Villa Host"
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Direct Phone (WhatsApp)</label>
                  <input
                    type="text"
                    required
                    value={formValues.phone}
                    onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
                    placeholder="+254 722 000000"
                    className={styles.fieldInput}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Official Email</label>
                  <input
                    type="email"
                    required
                    value={formValues.email}
                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                    placeholder="staff@peakhousing.co.ke"
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Availability Status</label>
                  <select
                    value={formValues.status}
                    onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
                    className={styles.fieldSelect}
                  >
                    <option value="Available">Available</option>
                    <option value="On Site Tour">On Site Tour</option>
                    <option value="Off Duty">Off Duty</option>
                  </select>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Specialties (comma separated)</label>
                <input
                  type="text"
                  value={formValues.specialties}
                  onChange={(e) => setFormValues({ ...formValues, specialties: e.target.value })}
                  placeholder="e.g. Karen Villas, Westlands Penthouses, Beacon Verification"
                  className={styles.fieldInput}
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn}>
                  {editingPerson ? "Save Personnel" : "Create Personnel Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DESIGNATE VIEWING MODAL */}
      {assignModalOpen && selectedPersonnelForAssign && (
        <div className={styles.modalOverlay} onClick={() => setAssignModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Designate Viewing to {selectedPersonnelForAssign.name}</h3>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setAssignModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAssignViewing}>
              <div style={{ marginBottom: "16px", fontSize: "13.5px", color: "rgba(255,255,255,0.8)" }}>
                Select a client viewing visit to assign to <strong>{selectedPersonnelForAssign.name}</strong> ({selectedPersonnelForAssign.role}):
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Select Scheduled Client Viewing</label>
                <select
                  required
                  value={selectedViewingId}
                  onChange={(e) => setSelectedViewingId(e.target.value)}
                  className={styles.fieldSelect}
                >
                  {viewingsList.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.clientName} · {v.propertyType} · {v.preferredDate} ({v.status})
                      {v.assignedTo ? ` [Currently: ${v.assignedTo}]` : " [Unassigned]"}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setAssignModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn}>
                  Confirm Delegation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
