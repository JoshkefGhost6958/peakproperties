"use client";

import { useState } from "react";
import Image from "next/image";
import { useAdminData } from "@/context/AdminDataContext";
import styles from "../admin.module.css";

export default function AdminBnBsPage() {
  const { siteData, createItem, updateItem, deleteItem } = useAdminData();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formValues, setFormValues] = useState({
    id: "",
    title: "",
    location: "Lavington",
    neighborhood: "",
    area: "Entire Suite · 2 Guests · King Bed",
    price: "KES 11,500 / night",
    type: "suite",
    image: "/images/peak-bnb.jpg",
    verified: true,
    isPublished: true,
    featured: true,
    description: "Modernist retreat with floor-to-ceiling glass, 100Mbps dedicated WiFi, rainfall shower, and daily housekeeping.",
  });

  const bnbsList = siteData.bnbs || [];
  const filteredList = bnbsList.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.location && item.location.toLowerCase().includes(q)) ||
      (item.neighborhood && item.neighborhood.toLowerCase().includes(q))
    );
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormValues({
      id: "",
      title: "",
      location: "Westlands",
      neighborhood: "Rhapta Road, Westlands",
      area: "Studio Loft · 2 Guests · Queen Bed",
      price: "KES 9,000 / night",
      type: "studio",
      image: "/images/studio.jpg",
      verified: true,
      isPublished: true,
      featured: true,
      description: "Chic urban sanctuary moments from Westlands business centers. Rooftop heated pool, gym, high-speed WiFi.",
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
      await updateItem("bnbs", formValues);
    } else {
      await createItem("bnbs", formValues);
    }
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this boutique BnB listing?")) {
      await deleteItem("bnbs", id);
    }
  };

  const handleToggleVerified = async (item) => {
    await updateItem("bnbs", {
      ...item,
      verified: !item.verified,
    });
  };

  return (
    <div className={styles.dashboardBody}>
      {/* Header */}
      <div className={styles.panelHeader} style={{ marginBottom: "20px" }}>
        <div className={styles.panelTitleGroup}>
          <h2>Manage Boutique BnBs &amp; Short Stays</h2>
          <p>
            Curate hotel-grade serviced apartments and architectural guest suites with fiber internet and pool amenities.
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
              placeholder="Search BnBs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <button type="button" className={styles.primaryCreateBtn} onClick={handleOpenCreate}>
            <span>+</span>
            <span>Add New BnB</span>
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
                <th>Nightly Rate</th>
                <th>Guest Capacity</th>
                <th>Guarantee</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan="7" className={styles.emptyTableState}>
                    No BnB stays matching &ldquo;{searchQuery}&rdquo;.
                  </td>
                </tr>
              ) : (
                filteredList.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.listingThumb}>
                        <Image
                          src={item.image || "/images/peak-bnb.jpg"}
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
                      <span className={styles.tableSpecs}>{item.area}</span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleToggleVerified(item)}
                        className={item.verified ? styles.verifiedBadge : styles.unverifiedBadge}
                        title="Toggle verification"
                      >
                        {item.verified ? "✓ Verified Stay" : "○ Pending"}
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
              <h3>{editingItem ? "Edit Boutique BnB" : "Add Boutique BnB"}</h3>
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
                  <label className={styles.fieldLabel}>Suite Title</label>
                  <input
                    type="text"
                    required
                    value={formValues.title}
                    onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                    placeholder="e.g. Hillside Glass Sanctuary Suite"
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
                    <option value="Riverside">Riverside</option>
                    <option value="Kilimani">Kilimani</option>
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Address / Landmark</label>
                  <input
                    type="text"
                    required
                    value={formValues.neighborhood}
                    onChange={(e) => setFormValues({ ...formValues, neighborhood: e.target.value })}
                    placeholder="e.g. Mbaazi Avenue, Lavington"
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Nightly Rate (KES)</label>
                  <input
                    type="text"
                    required
                    value={formValues.price}
                    onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
                    placeholder="e.g. KES 12,000 / night"
                    className={styles.fieldInput}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Guest Capacity &amp; Bed Type</label>
                  <input
                    type="text"
                    required
                    value={formValues.area}
                    onChange={(e) => setFormValues({ ...formValues, area: e.target.value })}
                    placeholder="e.g. Entire Suite · 2 Guests · King Bed"
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Photo Image Path</label>
                  <input
                    type="text"
                    value={formValues.image}
                    onChange={(e) => setFormValues({ ...formValues, image: e.target.value })}
                    placeholder="/images/peak-bnb.jpg"
                    className={styles.fieldInput}
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Description &amp; Amenities</label>
                <textarea
                  rows="3"
                  value={formValues.description}
                  onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                  className={styles.fieldTextarea}
                  placeholder="Detail high-speed WiFi, smart TV, Netflix, housekeeping, balcony..."
                />
              </div>

              <div className={styles.formCheckboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formValues.verified}
                    onChange={(e) => setFormValues({ ...formValues, verified: e.target.checked })}
                  />
                  <span>Physical Inspection Verified (&ldquo;What you see is what you get&rdquo;)</span>
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
                  {editingItem ? "Save Changes" : "Create BnB Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
