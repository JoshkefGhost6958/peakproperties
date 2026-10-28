"use client";

import { useState } from "react";
import Image from "next/image";
import { useAdminData } from "@/context/AdminDataContext";
import styles from "../admin.module.css";

export default function AdminContractorsPage() {
  const { siteData, createItem, updateItem, deleteItem, showToast } = useAdminData();
  const [activeTab, setActiveTab] = useState("engineers"); // "engineers" | "projects"
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State for Engineer
  const [engineerModalOpen, setEngineerModalOpen] = useState(false);
  const [editingEngineer, setEditingEngineer] = useState(null);
  const [engineerForm, setEngineerForm] = useState({
    id: "",
    name: "",
    role: "Lead Structural Engineer",
    company: "",
    license: "EBK / NCA-1 #",
    phone: "+254 7",
    email: "",
    status: "Active",
    projectAccess: true,
    completedProjects: 10,
    rating: "4.9 ★",
    assignedProjects: [],
  });

  // Modal State for Project
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    id: "",
    title: "",
    type: "Turnkey Luxury Villa Construction",
    location: "Lavington",
    duration: "12 Months Handover",
    area: "480 m² · 4 Bedrooms En-suite",
    image: "/images/sphera-villa1.jpg",
    contractor: "Apex Structural Engineers & Master Builders",
    leadEngineer: "Eng. Patrick Kamau",
    projectAccess: true,
    status: "Active Build",
    isPublished: true,
    description: "Architectural isometric plans followed by verified ground-up construction.",
  });

  const engineersList = siteData.engineers || [];
  const projectsList = siteData.construction || [];
  const incentivesList = siteData.contractorIncentives || [];

  // Modal State for Incentive
  const [incentiveModalOpen, setIncentiveModalOpen] = useState(false);
  const [editingIncentive, setEditingIncentive] = useState(null);
  const [incentiveForm, setIncentiveForm] = useState({
    id: "",
    title: "",
    category: "Timeline & Schedule Delivery",
    tier: "Tier 1 Priority",
    criteria: "",
    reward: "",
    bonusAmount: "KES 1,000,000",
    contractor: "Apex Structural Engineers & Master Builders",
    project: "The Lavington Glass Sanctuary",
    status: "Active Target",
    awardedDate: null,
  });

  // Filtered Incentives
  const filteredIncentives = incentivesList.filter((inc) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (inc.title && inc.title.toLowerCase().includes(q)) ||
      (inc.category && inc.category.toLowerCase().includes(q)) ||
      (inc.contractor && inc.contractor.toLowerCase().includes(q)) ||
      (inc.project && inc.project.toLowerCase().includes(q)) ||
      (inc.status && inc.status.toLowerCase().includes(q))
    );
  });

  // Filtered Engineers
  const filteredEngineers = engineersList.filter((eng) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (eng.name && eng.name.toLowerCase().includes(q)) ||
      (eng.company && eng.company.toLowerCase().includes(q)) ||
      (eng.role && eng.role.toLowerCase().includes(q)) ||
      (eng.license && eng.license.toLowerCase().includes(q))
    );
  });

  // Filtered Projects
  const filteredProjects = projectsList.filter((proj) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (proj.title && proj.title.toLowerCase().includes(q)) ||
      (proj.location && proj.location.toLowerCase().includes(q)) ||
      (proj.contractor && proj.contractor.toLowerCase().includes(q)) ||
      (proj.leadEngineer && proj.leadEngineer.toLowerCase().includes(q))
    );
  });

  // -------------------------------------------------------------------------
  // Engineer Handlers
  // -------------------------------------------------------------------------
  const handleOpenAddEngineer = () => {
    setEditingEngineer(null);
    setEngineerForm({
      id: "",
      name: "",
      role: "Lead Structural & Civil Engineer",
      company: "Peak Verified Master Builders",
      license: "EBK / NCA-1 #" + Math.floor(10000 + Math.random() * 90000),
      phone: "+254 722 000 000",
      email: "engineer@peakhousing.co.ke",
      status: "Active",
      projectAccess: true,
      completedProjects: 8,
      rating: "5.0 ★",
      assignedProjects: [],
    });
    setEngineerModalOpen(true);
  };

  const handleOpenEditEngineer = (engineer) => {
    setEditingEngineer(engineer);
    setEngineerForm({ ...engineer });
    setEngineerModalOpen(true);
  };

  const handleSaveEngineer = async (e) => {
    e.preventDefault();
    if (editingEngineer) {
      await updateItem("engineers", engineerForm);
    } else {
      await createItem("engineers", engineerForm);
    }
    setEngineerModalOpen(false);
  };

  const handleDeleteEngineer = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name}? This will revoke their access completely.`)) {
      await deleteItem("engineers", id);
    }
  };

  // 1-Click Toggle Project Access for Engineer
  const handleToggleEngineerAccess = async (engineer) => {
    const updatedAccess = !engineer.projectAccess;
    const updated = {
      ...engineer,
      projectAccess: updatedAccess,
      status: updatedAccess ? "Active" : "Disabled",
    };
    await updateItem("engineers", updated);
    showToast(
      updatedAccess
        ? `Project access GRANTED to ${engineer.name}`
        : `Project access DISABLED for ${engineer.name}`
    );
  };

  // -------------------------------------------------------------------------
  // Project Handlers
  // -------------------------------------------------------------------------
  const handleOpenAddProject = () => {
    setEditingProject(null);
    setProjectForm({
      id: "",
      title: "",
      type: "Turnkey Luxury Villa Construction",
      location: "Lavington",
      duration: "11 Months Handover",
      area: "500 m² · 5 Bedrooms En-suite",
      image: "/images/sphera-villa2.jpg",
      contractor: engineersList[0]?.company || "Apex Structural Engineers & Master Builders",
      leadEngineer: engineersList[0]?.name || "Eng. Patrick Kamau",
      projectAccess: true,
      status: "Active Build",
      isPublished: true,
      description: "Custom cantilevered residence with certified materials and handover milestones.",
    });
    setProjectModalOpen(true);
  };

  const handleOpenEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({ ...project });
    setProjectModalOpen(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (editingProject) {
      await updateItem("construction", projectForm);
    } else {
      await createItem("construction", projectForm);
    }
    setProjectModalOpen(false);
  };

  const handleDeleteProject = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete project: "${title}"?`)) {
      await deleteItem("construction", id);
    }
  };

  const handleToggleProjectAccess = async (project) => {
    const updated = {
      ...project,
      projectAccess: !project.projectAccess,
    };
    await updateItem("construction", updated);
    showToast(`Access status updated for project "${project.title}"`);
  };

  // -------------------------------------------------------------------------
  // Management Incentives Handlers
  // -------------------------------------------------------------------------
  const handleOpenAddIncentive = () => {
    setEditingIncentive(null);
    setIncentiveForm({
      id: "",
      title: "",
      category: "Timeline & Schedule Delivery",
      tier: "Tier 1 Priority",
      criteria: "On-time completion and snag-free handover.",
      reward: "+3.5% Milestone Cash Bonus + Priority Project Tender",
      bonusAmount: "KES 1,200,000",
      contractor: engineersList[0]?.company || "Apex Structural Engineers & Master Builders",
      project: projectsList[0]?.title || "The Lavington Glass Sanctuary",
      status: "Active Target",
      awardedDate: null,
    });
    setIncentiveModalOpen(true);
  };

  const handleOpenEditIncentive = (inc) => {
    setEditingIncentive(inc);
    setIncentiveForm({ ...inc });
    setIncentiveModalOpen(true);
  };

  const handleSaveIncentive = async (e) => {
    e.preventDefault();
    if (editingIncentive) {
      await updateItem("contractorIncentives", incentiveForm);
    } else {
      await createItem("contractorIncentives", incentiveForm);
    }
    setIncentiveModalOpen(false);
  };

  const handleDeleteIncentive = async (id, title) => {
    if (window.confirm(`Delete incentive program "${title}"?`)) {
      await deleteItem("contractorIncentives", id);
    }
  };

  const handleToggleAwardIncentive = async (inc) => {
    const isAwarded = inc.status === "Awarded";
    const updated = {
      ...inc,
      status: isAwarded ? "Active Target" : "Awarded",
      awardedDate: isAwarded ? null : new Date().toISOString().split("T")[0],
    };
    await updateItem("contractorIncentives", updated);
    showToast(
      isAwarded
        ? `Incentive "${inc.title}" set back to Active Target`
        : `🎉 Bonus Awarded & Disbursed to ${inc.contractor}!`
    );
  };


  return (
    <div className={styles.dashboardBody}>
      {/* Header */}
      <div className={styles.panelHeader} style={{ marginBottom: "20px" }}>
        <div className={styles.panelTitleGroup}>
          <h2>Manage Contractors, Engineers &amp; Projects</h2>
          <p>
            Vetted structural engineers, architectural designers, and NCA contractors. Add, edit, remove, and manage project access permissions.
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
              placeholder={
                activeTab === "engineers"
                  ? "Search engineers & license..."
                  : activeTab === "projects"
                  ? "Search projects..."
                  : "Search incentives..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {activeTab === "engineers" ? (
            <button type="button" className={styles.primaryCreateBtn} onClick={handleOpenAddEngineer}>
              <span>+</span>
              <span>Add Engineer / Contractor</span>
            </button>
          ) : activeTab === "projects" ? (
            <button type="button" className={styles.primaryCreateBtn} onClick={handleOpenAddProject}>
              <span>+</span>
              <span>Add Construction Project</span>
            </button>
          ) : (
            <button type="button" className={styles.primaryCreateBtn} onClick={handleOpenAddIncentive}>
              <span>+</span>
              <span>Create Incentive Scheme</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className={styles.subTabBar}>
        <button
          type="button"
          className={`${styles.subTabBtn} ${activeTab === "engineers" ? styles.subTabBtnActive : ""}`}
          onClick={() => setActiveTab("engineers")}
        >
          <span>👷 Engineers &amp; Contractors Directory</span>
          <span className={styles.countBadge}>{engineersList.length}</span>
        </button>

        <button
          type="button"
          className={`${styles.subTabBtn} ${activeTab === "projects" ? styles.subTabBtnActive : ""}`}
          onClick={() => setActiveTab("projects")}
        >
          <span>🏗️ Construction Projects &amp; Builds</span>
          <span className={styles.countBadge}>{projectsList.length}</span>
        </button>

        <button
          type="button"
          className={`${styles.subTabBtn} ${activeTab === "incentives" ? styles.subTabBtnActive : ""}`}
          onClick={() => setActiveTab("incentives")}
        >
          <span>🏆 Management Incentives &amp; Rewards</span>
          <span className={styles.countBadge}>{incentivesList.length}</span>
        </button>
      </div>

      {/* =====================================================================
          TAB 1: ENGINEERS & CONTRACTORS DIRECTORY
          ===================================================================== */}
      {activeTab === "engineers" && (
        <div>
          {/* Summary Stats Row */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "12px 20px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>Total Vetted:</span>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#ffffff" }}>{engineersList.length}</span>
            </div>

            <div style={{ background: "rgba(37,211,102,0.08)", padding: "12px 20px", borderRadius: "14px", border: "1px solid rgba(37,211,102,0.2)", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "12px", color: "#86efac" }}>Active Project Access:</span>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#25d366" }}>
                {engineersList.filter((e) => e.projectAccess !== false).length}
              </span>
            </div>

            <div style={{ background: "rgba(239,68,68,0.08)", padding: "12px 20px", borderRadius: "14px", border: "1px solid rgba(239,68,68,0.2)", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "12px", color: "#fca5a5" }}>Access Disabled:</span>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#ef4444" }}>
                {engineersList.filter((e) => e.projectAccess === false).length}
              </span>
            </div>
          </div>

          {filteredEngineers.length === 0 ? (
            <div className={styles.panelCard} style={{ padding: "40px", textAlign: "center", color: "rgba(255,255,255,0.6)" }}>
              No engineers found matching &ldquo;{searchQuery}&rdquo;. Click &ldquo;+ Add Engineer&rdquo; to register one.
            </div>
          ) : (
            <div className={styles.engineersGrid}>
              {filteredEngineers.map((engineer) => {
                const initials = engineer.name
                  .split(" ")
                  .map((n) => n[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join("");

                const hasAccess = engineer.projectAccess !== false;

                return (
                  <div
                    key={engineer.id}
                    className={`${styles.engineerCard} ${!hasAccess ? styles.engineerCardDisabled : ""}`}
                  >
                    <div>
                      <div className={styles.engineerHeader}>
                        <div className={styles.engineerAvatarGroup}>
                          <div className={styles.engineerAvatar}>{initials || "EN"}</div>
                          <div>
                            <div className={styles.engineerName}>{engineer.name}</div>
                            <div className={styles.engineerCompany}>{engineer.company}</div>
                          </div>
                        </div>

                        <span className={hasAccess ? styles.accessBadgeActive : styles.accessBadgeDisabled}>
                          {hasAccess ? "✓ Access Active" : "✕ Disabled"}
                        </span>
                      </div>

                      <div style={{ marginTop: "14px" }}>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#ffd8a8", marginBottom: "6px" }}>
                          {engineer.role}
                        </div>
                      </div>

                      <div className={styles.engineerDetails} style={{ marginTop: "12px" }}>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>License / Reg</span>
                          <span className={styles.detailValue}>{engineer.license}</span>
                        </div>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Direct Phone</span>
                          <span className={styles.detailValue}>{engineer.phone}</span>
                        </div>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Email</span>
                          <span className={styles.detailValue} style={{ fontSize: "11.5px" }}>{engineer.email}</span>
                        </div>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Track Record</span>
                          <span className={styles.detailValue}>
                            {engineer.completedProjects || 10}+ Builds ({engineer.rating || "5.0 ★"})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.engineerFooter}>
                      {/* Disable / Enable Access Button */}
                      <button
                        type="button"
                        onClick={() => handleToggleEngineerAccess(engineer)}
                        className={`${styles.toggleAccessBtn} ${hasAccess ? styles.toggleAccessDisable : styles.toggleAccessEnable}`}
                      >
                        {hasAccess ? "Disable Project Access" : "Grant Project Access"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenEditEngineer(engineer)}
                        className={styles.iconBtn}
                        title="Edit Engineer Details"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteEngineer(engineer.id, engineer.name)}
                        className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                        title="Remove Engineer"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          TAB 2: CONSTRUCTION PROJECTS & BUILDS
          ===================================================================== */}
      {activeTab === "projects" && (
        <div className={styles.panelCard}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Project Title &amp; Type</th>
                  <th>Location</th>
                  <th>Contractor &amp; Lead</th>
                  <th>Timeline &amp; Area</th>
                  <th>Project Access</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan="7" className={styles.emptyTableState}>
                      No construction projects found matching &ldquo;{searchQuery}&rdquo;.
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className={styles.listingThumb}>
                          <Image
                            src={item.image || "/images/sphera-villa1.jpg"}
                            alt={item.title}
                            fill
                            sizes="60px"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </td>
                      <td>
                        <div className={styles.tableTitle}>{item.title}</div>
                        <div className={styles.tableSubtitle}>{item.type}</div>
                      </td>
                      <td>
                        <span className={styles.tableLocationPill}>{item.location}</span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: "#ffffff", fontSize: "13px" }}>
                          {item.contractor}
                        </div>
                        <div style={{ fontSize: "11px", color: "#ffd8a8", marginTop: "2px" }}>
                          {item.leadEngineer || "Lead Engineer"}
                        </div>
                      </td>
                      <td>
                        <div className={styles.tableSpecs}>{item.duration}</div>
                        <div style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
                          {item.area}
                        </div>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleToggleProjectAccess(item)}
                          className={item.projectAccess !== false ? styles.verifiedBadge : styles.unverifiedBadge}
                          title="Toggle client and contractor access to project portal"
                        >
                          {item.projectAccess !== false ? "✓ Access Enabled" : "✕ Access Disabled"}
                        </button>
                      </td>
                      <td>
                        <div className={styles.actionGroup}>
                          <button
                            type="button"
                            className={styles.editBtn}
                            onClick={() => handleOpenEditProject(item)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className={styles.deleteBtn}
                            onClick={() => handleDeleteProject(item.id, item.title)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 3: CONTRACTOR & PROJECT MANAGEMENT INCENTIVES
          ===================================================================== */}
      {activeTab === "incentives" && (
        <div>
          {/* Summary KPI Strip */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "12px 20px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>Incentive Programs:</span>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#ffffff" }}>{incentivesList.length}</span>
            </div>

            <div style={{ background: "rgba(37,211,102,0.08)", padding: "12px 20px", borderRadius: "14px", border: "1px solid rgba(37,211,102,0.2)", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "12px", color: "#86efac" }}>Awarded Bonuses:</span>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#25d366" }}>
                {incentivesList.filter((i) => i.status === "Awarded").length} Disbursed
              </span>
            </div>

            <div style={{ background: "rgba(255,216,168,0.08)", padding: "12px 20px", borderRadius: "14px", border: "1px solid rgba(255,216,168,0.2)", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "12px", color: "#ffd8a8" }}>Active Targets:</span>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#ffd8a8" }}>
                {incentivesList.filter((i) => i.status === "Active Target").length} In Progress
              </span>
            </div>
          </div>

          {filteredIncentives.length === 0 ? (
            <div className={styles.panelCard} style={{ padding: "40px", textAlign: "center", color: "rgba(255,255,255,0.6)" }}>
              No incentive schemes found matching &ldquo;{searchQuery}&rdquo;. Click &ldquo;+ Create Incentive Scheme&rdquo; to launch one.
            </div>
          ) : (
            <div className={styles.engineersGrid}>
              {filteredIncentives.map((inc) => {
                const isAwarded = inc.status === "Awarded";
                const isReview = inc.status === "Under Review";

                return (
                  <div
                    key={inc.id}
                    className={styles.engineerCard}
                    style={{
                      borderColor: isAwarded
                        ? "rgba(37, 211, 102, 0.3)"
                        : isReview
                        ? "rgba(96, 165, 250, 0.3)"
                        : "rgba(255, 216, 168, 0.2)",
                    }}
                  >
                    <div>
                      <div className={styles.engineerHeader}>
                        <div>
                          <span
                            style={{
                              fontSize: "10.5px",
                              fontWeight: 800,
                              color: "#ffd8a8",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              display: "block",
                              marginBottom: "4px",
                            }}
                          >
                            {inc.category} · {inc.tier}
                          </span>
                          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", lineHeight: "1.2" }}>
                            {inc.title}
                          </h3>
                        </div>

                        <span
                          className={
                            isAwarded
                              ? styles.accessBadgeActive
                              : isReview
                              ? styles.verifiedBadge
                              : styles.countBadge
                          }
                          style={{
                            background: isAwarded
                              ? "rgba(37,211,102,0.15)"
                              : isReview
                              ? "rgba(59,130,246,0.15)"
                              : "rgba(255,216,168,0.12)",
                            color: isAwarded ? "#25d366" : isReview ? "#60a5fa" : "#ffd8a8",
                            borderColor: isAwarded
                              ? "rgba(37,211,102,0.35)"
                              : isReview
                              ? "rgba(59,130,246,0.35)"
                              : "rgba(255,216,168,0.3)",
                          }}
                        >
                          {isAwarded
                            ? "✓ Awarded & Disbursed"
                            : isReview
                            ? "⏳ Under Evaluation"
                            : "🎯 Active Target"}
                        </span>
                      </div>

                      <div style={{ marginTop: "12px", background: "rgba(0,0,0,0.25)", padding: "12px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <span style={{ fontSize: "11px", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", fontWeight: 700 }}>
                          Qualifying Milestone Criteria:
                        </span>
                        <p style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.8)", margin: "4px 0 0 0", lineHeight: "1.4" }}>
                          {inc.criteria}
                        </p>
                      </div>

                      <div className={styles.engineerDetails} style={{ marginTop: "12px" }}>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Reward &amp; Bonus</span>
                          <span className={styles.detailValue} style={{ color: "#ffd8a8", fontWeight: 800 }}>
                            {inc.bonusAmount}
                          </span>
                        </div>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Assigned Firm</span>
                          <span className={styles.detailValue} style={{ fontSize: "12px" }}>{inc.contractor}</span>
                        </div>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Target Project</span>
                          <span className={styles.detailValue} style={{ fontSize: "12px" }}>{inc.project}</span>
                        </div>
                        {inc.awardedDate && (
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Awarded Date</span>
                            <span className={styles.detailValue} style={{ color: "#86efac" }}>{inc.awardedDate}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={styles.engineerFooter}>
                      <button
                        type="button"
                        onClick={() => handleToggleAwardIncentive(inc)}
                        className={`${styles.toggleAccessBtn} ${isAwarded ? styles.toggleAccessDisable : styles.toggleAccessEnable}`}
                      >
                        {isAwarded ? "Revert to Active Target" : "🎉 Award & Disburse Bonus"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenEditIncentive(inc)}
                        className={styles.iconBtn}
                        title="Edit Incentive Details"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteIncentive(inc.id, inc.title)}
                        className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                        title="Remove Incentive Program"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          ADD / EDIT ENGINEER MODAL
          ===================================================================== */}
      {engineerModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setEngineerModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{editingEngineer ? "Edit Engineer / Contractor" : "Add Vetted Engineer"}</h3>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setEngineerModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEngineer}>
              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Full Name &amp; Title</label>
                  <input
                    type="text"
                    required
                    value={engineerForm.name}
                    onChange={(e) => setEngineerForm({ ...engineerForm, name: e.target.value })}
                    placeholder="e.g. Eng. Patrick Kamau"
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Role / Specialization</label>
                  <select
                    value={engineerForm.role}
                    onChange={(e) => setEngineerForm({ ...engineerForm, role: e.target.value })}
                    className={styles.fieldSelect}
                  >
                    <option value="Lead Structural & Civil Engineer">Lead Structural &amp; Civil Engineer</option>
                    <option value="Principal Architectural Designer">Principal Architectural Designer</option>
                    <option value="Senior MEP & Geotechnical Consultant">Senior MEP &amp; Geotechnical Consultant</option>
                    <option value="NCA-1 General Contractor">NCA-1 General Contractor</option>
                    <option value="Project Quantity Surveyor">Project Quantity Surveyor</option>
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Company / Firm Name</label>
                  <input
                    type="text"
                    required
                    value={engineerForm.company}
                    onChange={(e) => setEngineerForm({ ...engineerForm, company: e.target.value })}
                    placeholder="e.g. Apex Structural Builders"
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Registration / License No.</label>
                  <input
                    type="text"
                    required
                    value={engineerForm.license}
                    onChange={(e) => setEngineerForm({ ...engineerForm, license: e.target.value })}
                    placeholder="e.g. EBK / NCA-1 #48921"
                    className={styles.fieldInput}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Direct Phone Number</label>
                  <input
                    type="text"
                    required
                    value={engineerForm.phone}
                    onChange={(e) => setEngineerForm({ ...engineerForm, phone: e.target.value })}
                    placeholder="+254 722 000 000"
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Official Email Address</label>
                  <input
                    type="email"
                    required
                    value={engineerForm.email}
                    onChange={(e) => setEngineerForm({ ...engineerForm, email: e.target.value })}
                    placeholder="engineer@company.co.ke"
                    className={styles.fieldInput}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Completed Projects Count</label>
                  <input
                    type="number"
                    value={engineerForm.completedProjects}
                    onChange={(e) => setEngineerForm({ ...engineerForm, completedProjects: parseInt(e.target.value) || 0 })}
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Client Satisfaction Rating</label>
                  <input
                    type="text"
                    value={engineerForm.rating}
                    onChange={(e) => setEngineerForm({ ...engineerForm, rating: e.target.value })}
                    placeholder="5.0 ★"
                    className={styles.fieldInput}
                  />
                </div>
              </div>

              <div className={styles.formCheckboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={engineerForm.projectAccess}
                    onChange={(e) => setEngineerForm({ ...engineerForm, projectAccess: e.target.checked })}
                  />
                  <span>Project Access Enabled (Allows assignment to new builds and client correspondence)</span>
                </label>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setEngineerModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn}>
                  {editingEngineer ? "Save Changes" : "Register Engineer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          ADD / EDIT PROJECT MODAL
          ===================================================================== */}
      {projectModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setProjectModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{editingProject ? "Edit Construction Project" : "Add Construction Project"}</h3>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setProjectModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProject}>
              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Project Title</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="e.g. The Lavington Glass Sanctuary"
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Build Type</label>
                  <select
                    value={projectForm.type}
                    onChange={(e) => setProjectForm({ ...projectForm, type: e.target.value })}
                    className={styles.fieldSelect}
                  >
                    <option value="Turnkey Luxury Villa Construction">Turnkey Luxury Villa Construction</option>
                    <option value="Architectural Design & Ground-Up Build">Architectural Design &amp; Ground-Up Build</option>
                    <option value="Modernist Cantilever Villa Build">Modernist Cantilever Villa Build</option>
                    <option value="Executive Gated Estate Development">Executive Gated Estate Development</option>
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Location</label>
                  <input
                    type="text"
                    required
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    placeholder="e.g. Mbaazi Avenue, Lavington"
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Handover Timeline</label>
                  <input
                    type="text"
                    required
                    value={projectForm.duration}
                    onChange={(e) => setProjectForm({ ...projectForm, duration: e.target.value })}
                    placeholder="e.g. 11 Months Handover"
                    className={styles.fieldInput}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Contractor / Firm</label>
                  <input
                    type="text"
                    required
                    value={projectForm.contractor}
                    onChange={(e) => setProjectForm({ ...projectForm, contractor: e.target.value })}
                    placeholder="Apex Structural Builders"
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Lead Certified Engineer</label>
                  <input
                    type="text"
                    required
                    value={projectForm.leadEngineer}
                    onChange={(e) => setProjectForm({ ...projectForm, leadEngineer: e.target.value })}
                    placeholder="Eng. Patrick Kamau"
                    className={styles.fieldInput}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Specs &amp; Floor Area</label>
                  <input
                    type="text"
                    required
                    value={projectForm.area}
                    onChange={(e) => setProjectForm({ ...projectForm, area: e.target.value })}
                    placeholder="480 m² · 4 Bedrooms En-suite"
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Image Path</label>
                  <input
                    type="text"
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    placeholder="/images/sphera-villa1.jpg"
                    className={styles.fieldInput}
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Project Milestone Description</label>
                <textarea
                  rows="3"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className={styles.fieldTextarea}
                  placeholder="Detail architectural scope, foundation progress, roofing, and finishes..."
                />
              </div>

              <div className={styles.formCheckboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={projectForm.projectAccess}
                    onChange={(e) => setProjectForm({ ...projectForm, projectAccess: e.target.checked })}
                  />
                  <span>Project Portal Access Active</span>
                </label>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setProjectModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn}>
                  {editingProject ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          ADD / EDIT INCENTIVE MODAL
          ===================================================================== */}
      {incentiveModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIncentiveModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{editingIncentive ? "Edit Management Incentive" : "Create Management Incentive Scheme"}</h3>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setIncentiveModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveIncentive}>
              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Scheme Title</label>
                  <input
                    type="text"
                    required
                    value={incentiveForm.title}
                    onChange={(e) => setIncentiveForm({ ...incentiveForm, title: e.target.value })}
                    placeholder="e.g. On-Time Handover Speed Bonus"
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Incentive Category</label>
                  <select
                    value={incentiveForm.category}
                    onChange={(e) => setIncentiveForm({ ...incentiveForm, category: e.target.value })}
                    className={styles.fieldSelect}
                  >
                    <option value="Timeline & Schedule Delivery">Timeline &amp; Schedule Delivery</option>
                    <option value="Quality Assurance & Engineering">Quality Assurance &amp; Engineering</option>
                    <option value="Safety & Regulatory Standards">Safety &amp; Regulatory Standards</option>
                    <option value="Client Satisfaction Guarantee">Client Satisfaction Guarantee</option>
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Incentive Tier</label>
                  <select
                    value={incentiveForm.tier}
                    onChange={(e) => setIncentiveForm({ ...incentiveForm, tier: e.target.value })}
                    className={styles.fieldSelect}
                  >
                    <option value="Tier 1 Priority">Tier 1 Priority</option>
                    <option value="Gold Quality Standard">Gold Quality Standard</option>
                    <option value="Safety Excellence">Safety Excellence</option>
                    <option value="Client Delight">Client Delight</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Bonus Cash Amount</label>
                  <input
                    type="text"
                    required
                    value={incentiveForm.bonusAmount}
                    onChange={(e) => setIncentiveForm({ ...incentiveForm, bonusAmount: e.target.value })}
                    placeholder="e.g. KES 1,500,000"
                    className={styles.fieldInput}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Assigned Firm / Contractor</label>
                  <input
                    type="text"
                    required
                    value={incentiveForm.contractor}
                    onChange={(e) => setIncentiveForm({ ...incentiveForm, contractor: e.target.value })}
                    placeholder="Apex Structural Builders"
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Assigned Project</label>
                  <input
                    type="text"
                    required
                    value={incentiveForm.project}
                    onChange={(e) => setIncentiveForm({ ...incentiveForm, project: e.target.value })}
                    placeholder="The Lavington Glass Sanctuary"
                    className={styles.fieldInput}
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Qualifying Milestone Criteria</label>
                <textarea
                  rows="2"
                  required
                  value={incentiveForm.criteria}
                  onChange={(e) => setIncentiveForm({ ...incentiveForm, criteria: e.target.value })}
                  className={styles.fieldTextarea}
                  placeholder="Detail exact milestone conditions to unlock this bonus..."
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Reward &amp; Benefits Description</label>
                <input
                  type="text"
                  required
                  value={incentiveForm.reward}
                  onChange={(e) => setIncentiveForm({ ...incentiveForm, reward: e.target.value })}
                  placeholder="+4.0% Milestone Cash Bonus + Priority Tender Allocation"
                  className={styles.fieldInput}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Incentive Status</label>
                <select
                  value={incentiveForm.status}
                  onChange={(e) => setIncentiveForm({ ...incentiveForm, status: e.target.value })}
                  className={styles.fieldSelect}
                >
                  <option value="Active Target">Active Target (In Progress)</option>
                  <option value="Under Review">Under Evaluation (Inspecting)</option>
                  <option value="Awarded">Awarded &amp; Disbursed</option>
                </select>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setIncentiveModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn}>
                  {editingIncentive ? "Save Changes" : "Launch Incentive Program"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
