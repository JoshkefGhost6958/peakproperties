"use client";

import { useState } from "react";
import Image from "next/image";
import { useAdminData } from "@/context/AdminDataContext";
import styles from "../admin.module.css";

export default function AdminLandPage() {
  const { siteData, createItem, updateItem, deleteItem } = useAdminData();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formValues, setFormValues] = useState({
    id: "",
    title: "",
    location: "Lavington",
    neighborhood: "",
    area: "0.50 Acre (Approx. 2,023 m²)",
    price: "KES 75,000,000",
    zoning: "Low Density Residential",
    soil: "Rich Red Soil, Gentle Slope",
    titleType: "Freehold Ready Title Deed",
    image: "/images/land-lavington.jpg",
    verified: true,
    isPublished: true,
    featured: true,
    description: "Verified plot with clean official search, beacons in place, and perimeter wall.",
  });

  const landList = siteData.land || [];
  const filteredList = landList.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.location && item.location.toLowerCase().includes(q)) ||
      (item.neighborhood && item.neighborhood.toLowerCase().includes(q)) ||
      (item.zoning && item.zoning.toLowerCase().includes(q))
    );
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormValues({
      id: "",
      title: "",
      location: "Westlands",
      neighborhood: "Rhapta Road, Westlands",
      area: "0.75 Acre (Approx. 3,035 m²)",
      price: "KES 140,000,000",
      zoning: "Commercial / Residential Mixed-Use",
      soil: "Firm Red Soil, Flat Gradient",
      titleType: "Clean Leasehold 99 Years",
      image: "/images/land-westlands.jpg",
      verified: true,
      isPublished: true,
      featured: true,
      description: "Strategic parcel suitable for high-end boutique apartments or private gated residences.",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormValues({ ...item });
    setModalOpen(true);
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await updateItem("land", formValues);
    } else {
      await createItem("land", formValues);
    }
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this land parcel?")) {
      await deleteItem("land", id);
    }
  };

  const handleToggleVerified = async (item) => {
    await updateItem("land", {
      ...item,
      verified: !item.verified,
    });
  };

  return (
    <div className={styles.dashboardBody}>
      {/* Header */}
      <div className={styles.panelHeader} style={{ marginBottom: "20px" }}>
        <div className={styles.panelTitleGroup}>
          <h2>Manage Prime Land &amp; Plots</h2>
          <p>
            Oversee residential plots and commercial redevelopment parcels in Lavington and Westlands with verified title deeds.
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
              placeholder="Search plots..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <button type="button" className={styles.primaryCreateBtn} onClick={handleOpenCreate}>
            <span>+</span>
            <span>Add New Plot</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className={styles.panelCard}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Title &amp; Address</th>
                <th>Location</th>
                <th>Price</th>
                <th>Acreage &amp; Zoning</th>
                <th>Guarantee</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan="7" className={styles.emptyTableState}>
                    No plots found matching &ldquo;{searchQuery}&rdquo;.
                  </td>
                </tr>
              ) : (
                filteredList.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.listingThumb}>
                        <Image
                          src={item.image || "/images/land-lavington.jpg"}
                          alt={item.title}
                          fill
                          sizes="60px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </td>
                    <td>
                      <div className={styles.tableTitle}>{item.title}</div>
                      <div className={styles.tableSubtitle}>{item.neighborhood || item.location}</div>
                    </td>
                    <td>
                      <span className={styles.tableLocationPill}>{item.location}</span>
                    </td>
                    <td>
                      <span className={styles.tablePrice}>{item.price}</span>
                    </td>
                    <td>
                      <div className={styles.tableSpecs}>{item.area}</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
                        {item.zoning || "Residential"} · {item.titleType || "Freehold"}
                      </div>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleToggleVerified(item)}
                        className={item.verified ? styles.verifiedBadge : styles.unverifiedBadge}
                        title="Toggle verification"
                      >
                        {item.verified ? "✓ Title Verified" : "○ Pending Search"}
                      </button>
                    </td>
                    <td>
                      <div className={styles.actionGroup}>
                        <button
                          type="button"
                          className={styles.editBtn}
                          onClick={() => handleOpenEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className={styles.deleteBtn}
                          onClick={() => handleDelete(item.id)}
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

      {/* ADD / EDIT MODAL */}
      {modalOpen && (
        <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{editingItem ? "Edit Land Parcel" : "Add Prime Land Plot"}</h3>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveItem}>
              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Plot Listing Title</label>
                  <input
                    type="text"
                    required
                    value={formValues.title}
                    onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                    placeholder="e.g. 0.5 Acre Prime Residential Plot · Lavington"
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Location</label>
                  <select
                    value={formValues.location}
                    onChange={(e) => setFormValues({ ...formValues, location: e.target.value })}
                    className={styles.fieldSelect}
                  >
                    <option value="Lavington">Lavington</option>
                    <option value="Westlands">Westlands</option>
                    <option value="Karen">Karen</option>
                    <option value="Kileleshwa">Kileleshwa</option>
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Street / Access Road</label>
                  <input
                    type="text"
                    required
                    value={formValues.neighborhood}
                    onChange={(e) => setFormValues({ ...formValues, neighborhood: e.target.value })}
                    placeholder="e.g. Off James Gichuru / Mbaazi Ave"
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Asking Price (KES)</label>
                  <input
                    type="text"
                    required
                    value={formValues.price}
                    onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
                    placeholder="e.g. KES 78,000,000"
                    className={styles.fieldInput}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Acreage &amp; Dimensions</label>
                  <input
                    type="text"
                    required
                    value={formValues.area}
                    onChange={(e) => setFormValues({ ...formValues, area: e.target.value })}
                    placeholder="e.g. 0.50 Acre (Approx. 2,023 m²)"
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Zoning Status</label>
                  <input
                    type="text"
                    value={formValues.zoning}
                    onChange={(e) => setFormValues({ ...formValues, zoning: e.target.value })}
                    placeholder="Low Density Residential / Commercial"
                    className={styles.fieldInput}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Title Deed Status</label>
                  <input
                    type="text"
                    value={formValues.titleType}
                    onChange={(e) => setFormValues({ ...formValues, titleType: e.target.value })}
                    placeholder="Freehold Ready Title Deed"
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Photo Image Path</label>
                  <input
                    type="text"
                    value={formValues.image}
                    onChange={(e) => setFormValues({ ...formValues, image: e.target.value })}
                    placeholder="/images/land-lavington.jpg"
                    className={styles.fieldInput}
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Description &amp; Soil Profile</label>
                <textarea
                  rows="3"
                  value={formValues.description}
                  onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                  className={styles.fieldTextarea}
                  placeholder="Detail gradient, red soil profile, stone walling, water and power connectivity..."
                />
              </div>

              <div className={styles.formCheckboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formValues.verified}
                    onChange={(e) => setFormValues({ ...formValues, verified: e.target.checked })}
                  />
                  <span>Physical Beacon &amp; Official Registry Search Verified</span>
                </label>
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
                  {editingItem ? "Save Changes" : "Create Land Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
