"use client";

import { useState } from "react";
import Image from "next/image";
import { useAdminData } from "@/context/AdminDataContext";
import styles from "../admin.module.css";

export default function AdminVillasPage() {
  const { siteData, createItem, updateItem, deleteItem, showToast } = useAdminData();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formValues, setFormValues] = useState({
    id: "",
    title: "",
    location: "Westlands",
    neighborhood: "",
    area: "4 Beds · 450 m² · 0.5 Acre Compound",
    price: "KES 65,000,000",
    bedrooms: 4,
    bathrooms: 4,
    image: "/images/sphera-villa1.jpg",
    verified: true,
    isPublished: true,
    featured: true,
    description: "Verified luxury villa with private lawn, heated pool, and bespoke contemporary architecture.",
  });

  const villasList = siteData.villas || [];
  const filteredList = villasList.filter((item) => {
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
      location: "Lavington",
      neighborhood: "Mbaazi Avenue, Lavington",
      area: "4 Beds · 450 m² · 0.5 Acre Compound",
      price: "KES 65,000,000",
      bedrooms: 4,
      bathrooms: 4,
      image: "/images/sphera-villa1.jpg",
      verified: true,
      isPublished: true,
      featured: true,
      description: "Exclusive modern villa in secluded Nairobi neighborhood. Physical site verification completed.",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormValues({
      ...item,
      bedrooms: item.bedrooms || 4,
      bathrooms: item.bathrooms || 4,
    });
    setModalOpen(true);
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await updateItem("villas", formValues);
    } else {
      await createItem("villas", formValues);
    }
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this villa listing?")) {
      await deleteItem("villas", id);
    }
  };

  const handleToggleVerified = async (item) => {
    await updateItem("villas", {
      ...item,
      verified: !item.verified,
    });
  };

  return (
    <div className={styles.dashboardBody}>
      {/* Module Header */}
      <div className={styles.panelHeader} style={{ marginBottom: "20px" }}>
        <div className={styles.panelTitleGroup}>
          <h2>Manage Luxury Villas</h2>
          <p>
            Curate signature single-family residences and glass villas. All listings display the &ldquo;What you see is what you get&rdquo; guarantee.
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
              placeholder="Search villas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <button type="button" className={styles.primaryCreateBtn} onClick={handleOpenCreate}>
            <span>+</span>
            <span>Add New Villa</span>
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
                <th>Specs / Area</th>
                <th>Guarantee Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan="7" className={styles.emptyTableState}>
                    No villas matching &ldquo;{searchQuery}&rdquo;.
                  </td>
                </tr>
              ) : (
                filteredList.map((item) => (
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
                        title="Click to toggle 'What you see is what you get' guarantee"
                      >
                        {item.verified ? "✓ Verified" : "○ Pending"}
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
              <h3>{editingItem ? "Edit Luxury Villa" : "Add New Luxury Villa"}</h3>
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
                  <label className={styles.fieldLabel}>Villa Title</label>
                  <input
                    type="text"
                    required
                    value={formValues.title}
                    onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                    placeholder="e.g. The Glass House Villa"
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
                    <option value="Westlands">Westlands</option>
                    <option value="Lavington">Lavington</option>
                    <option value="Karen">Karen</option>
                    <option value="Riverside">Riverside</option>
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Specific Street / Address</label>
                  <input
                    type="text"
                    required
                    value={formValues.neighborhood}
                    onChange={(e) => setFormValues({ ...formValues, neighborhood: e.target.value })}
                    placeholder="e.g. Rhapta Road, Westlands"
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Price (KES)</label>
                  <input
                    type="text"
                    required
                    value={formValues.price}
                    onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
                    placeholder="e.g. KES 85,000,000"
                    className={styles.fieldInput}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Specs &amp; Area</label>
                  <input
                    type="text"
                    required
                    value={formValues.area}
                    onChange={(e) => setFormValues({ ...formValues, area: e.target.value })}
                    placeholder="e.g. 5 Beds · 520 m² · Private Courtyard"
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Photo Image Path</label>
                  <input
                    type="text"
                    value={formValues.image}
                    onChange={(e) => setFormValues({ ...formValues, image: e.target.value })}
                    placeholder="/images/sphera-villa1.jpg"
                    className={styles.fieldInput}
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Description &amp; Guarantees</label>
                <textarea
                  rows="3"
                  value={formValues.description}
                  onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                  className={styles.fieldTextarea}
                  placeholder="Detail architectural design, amenities, pool, finishes..."
                />
              </div>

              <div className={styles.formCheckboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formValues.verified}
                    onChange={(e) => setFormValues({ ...formValues, verified: e.target.checked })}
                  />
                  <span>Verified Listing (&ldquo;What you see is what you get&rdquo; physical inspection)</span>
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
                  {editingItem ? "Save Changes" : "Create Villa Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
