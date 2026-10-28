"use client";

import { useState } from "react";
import Image from "next/image";
import { useAdminData } from "@/context/AdminDataContext";
import styles from "../admin.module.css";

export default function AdminSiteManagementPage() {
  const { siteData, updateItem, replaceCollection, setKey, showToast } = useAdminData();
  const [activeTab, setActiveTab] = useState("hero"); // "hero" | "staging"
  const [propertyCategory, setPropertyCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Hero Slides from state or default fallback
  const heroSlides = siteData.heroSlides || [];

  // Edit Slide Modal
  const [slideModalOpen, setSlideModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [slideForm, setSlideForm] = useState({
    id: "",
    category: "Villas",
    navLabel: "Villas",
    tag: "VERIFIED LUXURY VILLAS",
    headline: "Luxury Contemporary Villas",
    subtitle: "Hand-curated private villas with heated swimming pools and mature gardens in Lavington & Karen.",
    image: "/images/sphera-villa1.jpg",
    href: "/villas",
    ctaText: "Explore Villas Collection",
    active: true,
    card1: {
      category: "Lavington Villa",
      title: "Eden Forest Villa",
      specs: "4 Beds · 450 m² · Pool",
      price: "KES 68,000,000",
      image: "/images/sphera-villa1.jpg",
    },
    card2: {
      category: "Westlands Villa",
      title: "The Glass House Villa",
      specs: "5 Beds · 520 m² · Terrace",
      price: "KES 82,000,000",
      image: "/images/sphera-villa2.jpg",
    },
  });

  // -------------------------------------------------------------------------
  // Hero Slide Handlers
  // -------------------------------------------------------------------------
  const handleOpenEditSlide = (slide) => {
    setEditingSlide(slide);
    setSlideForm({
      ...slide,
      card1: slide.card1 || {
        category: "Showcase Property 1",
        title: "",
        specs: "",
        price: "",
        image: "/images/sphera-villa1.jpg",
      },
      card2: slide.card2 || {
        category: "Showcase Property 2",
        title: "",
        specs: "",
        price: "",
        image: "/images/sphera-villa2.jpg",
      },
    });
    setSlideModalOpen(true);
  };

  const handleSaveSlide = async (e) => {
    e.preventDefault();
    const updatedList = heroSlides.map((s) => (s.id === slideForm.id ? slideForm : s));
    await setKey("heroSlides", updatedList);
    showToast(`Hero slide "${slideForm.navLabel}" updated successfully!`);
    setSlideModalOpen(false);
  };

  const handleToggleSlideActive = async (slide) => {
    const updated = { ...slide, active: slide.active === false ? true : false };
    const updatedList = heroSlides.map((s) => (s.id === slide.id ? updated : s));
    await setKey("heroSlides", updatedList);
    showToast(`Slide "${slide.navLabel}" ${updated.active ? "enabled" : "disabled"}`);
  };

  // -------------------------------------------------------------------------
  // Rendered Properties Selection
  // -------------------------------------------------------------------------
  // Consolidate all property collections into a single manageable master catalog
  const allProperties = [
    ...(siteData.villas || []).map((p) => ({ ...p, collection: "villas", categoryName: "Villa" })),
    ...(siteData.land || []).map((p) => ({ ...p, collection: "land", categoryName: "Land Plot" })),
    ...(siteData.apartments || []).map((p) => ({ ...p, collection: "apartments", categoryName: "Apartment" })),
    ...(siteData.bnbs || []).map((p) => ({ ...p, collection: "bnbs", categoryName: "Boutique BnB" })),
  ];

  const filteredProperties = allProperties.filter((item) => {
    if (propertyCategory !== "all" && item.collection !== propertyCategory) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.location && item.location.toLowerCase().includes(q)) ||
      (item.neighborhood && item.neighborhood.toLowerCase().includes(q))
    );
  });

  const handleTogglePropertyPublished = async (item) => {
    const updated = {
      ...item,
      isPublished: item.isPublished === false ? true : false,
    };
    await updateItem(item.collection, updated);
    showToast(
      `"${item.title}" is now ${updated.isPublished ? "RENDERED publicly on website" : "HIDDEN from website"}`
    );
  };

  const handleTogglePropertyFeatured = async (item) => {
    const updated = {
      ...item,
      featured: !item.featured,
    };
    await updateItem(item.collection, updated);
    showToast(
      `"${item.title}" ${updated.featured ? "added to Homepage Featured" : "removed from Homepage Featured"}`
    );
  };

  const handleTogglePropertyVerified = async (item) => {
    const updated = {
      ...item,
      verified: !item.verified,
    };
    await updateItem(item.collection, updated);
    showToast(
      `"${item.title}" guarantee marked as ${updated.verified ? "Verified" : "Unverified"}`
    );
  };

  return (
    <div className={styles.dashboardBody}>
      {/* Header */}
      <div className={styles.panelHeader} style={{ marginBottom: "20px" }}>
        <div className={styles.panelTitleGroup}>
          <h2>Site Management &amp; Hero Showcase</h2>
          <p>
            Configure homepage hero showcase slides, customize preview house cards, and select which properties are rendered on public pages.
          </p>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className={styles.subTabBar}>
        <button
          type="button"
          className={`${styles.subTabBtn} ${activeTab === "hero" ? styles.subTabBtnActive : ""}`}
          onClick={() => setActiveTab("hero")}
        >
          <span>✨ Homepage Hero Slides &amp; Houses</span>
          <span className={styles.countBadge}>{heroSlides.length}</span>
        </button>

        <button
          type="button"
          className={`${styles.subTabBtn} ${activeTab === "staging" ? styles.subTabBtnActive : ""}`}
          onClick={() => setActiveTab("staging")}
        >
          <span>🎯 Selection of Rendered Properties</span>
          <span className={styles.countBadge}>{allProperties.length}</span>
        </button>
      </div>

      {/* =====================================================================
          TAB 1: HERO HOUSES & SLIDESHOW MANAGEMENT
          ===================================================================== */}
      {activeTab === "hero" && (
        <div>
          <div style={{ background: "rgba(255,216,168,0.06)", border: "1px solid rgba(255,216,168,0.2)", borderRadius: "16px", padding: "18px 24px", marginBottom: "20px" }}>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "#ffd8a8", marginBottom: "4px" }}>
              Dynamic Hero Background &amp; House Showcase
            </div>
            <p style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: "1.5" }}>
              These 5 slides power the interactive slideshow at the top of the homepage. You can change their headlines, background photos, and the two floating showcase property cards on the right.
            </p>
          </div>

          <div className={styles.heroSlidesList}>
            {heroSlides.map((slide, index) => {
              const isActive = slide.active !== false;

              return (
                <div key={slide.id || index} className={styles.heroSlideCard}>
                  {/* Thumbnail */}
                  <div className={styles.slidePreviewThumb}>
                    <Image
                      src={slide.image || "/images/sphera-villa1.jpg"}
                      alt={slide.headline}
                      fill
                      sizes="200px"
                      style={{ objectFit: "cover" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "8px",
                        left: "8px",
                        background: "rgba(0,0,0,0.7)",
                        padding: "2px 8px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#ffd8a8",
                      }}
                    >
                      Slide #{index + 1}
                    </div>
                  </div>

                  {/* Info */}
                  <div className={styles.slideInfo}>
                    <span className={styles.slideTag}>{slide.tag}</span>
                    <h3 className={styles.slideHeadline}>{slide.headline}</h3>
                    <p className={styles.slideSubtitle}>{slide.subtitle}</p>

                    {/* Showcase House Cards Preview */}
                    <div className={styles.slideCardsPreview}>
                      {slide.card1 && (
                        <div className={styles.miniPropertyPill}>
                          <span style={{ color: "#ffd8a8" }}>Card 1:</span>
                          <strong>{slide.card1.title}</strong>
                          <span style={{ opacity: 0.6 }}>({slide.card1.price})</span>
                        </div>
                      )}
                      {slide.card2 && (
                        <div className={styles.miniPropertyPill}>
                          <span style={{ color: "#ffd8a8" }}>Card 2:</span>
                          <strong>{slide.card2.title}</strong>
                          <span style={{ opacity: 0.6 }}>({slide.card2.price})</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className={styles.slideActions}>
                    <button
                      type="button"
                      onClick={() => handleToggleSlideActive(slide)}
                      className={isActive ? styles.verifiedBadge : styles.unverifiedBadge}
                    >
                      {isActive ? "✓ Slide Active" : "○ Inactive"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenEditSlide(slide)}
                      className={styles.primaryCreateBtn}
                      style={{ padding: "8px 16px", fontSize: "12px" }}
                    >
                      Edit Slide &amp; Houses
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 2: SELECTION OF RENDERED PROPERTIES
          ===================================================================== */}
      {activeTab === "staging" && (
        <div>
          {/* Summary KPI Strip */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
            <div style={{ background: "rgba(255,255,255,0.03)", padding: "12px 20px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>Total Properties:</span>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#ffffff" }}>{allProperties.length}</span>
            </div>

            <div style={{ background: "rgba(37,211,102,0.08)", padding: "12px 20px", borderRadius: "14px", border: "1px solid rgba(37,211,102,0.2)", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "12px", color: "#86efac" }}>Rendered on Public Site:</span>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#25d366" }}>
                {allProperties.filter((p) => p.isPublished !== false).length}
              </span>
            </div>

            <div style={{ background: "rgba(255,216,168,0.08)", padding: "12px 20px", borderRadius: "14px", border: "1px solid rgba(255,216,168,0.2)", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "12px", color: "#ffd8a8" }}>Featured on Homepage:</span>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#ffd8a8" }}>
                {allProperties.filter((p) => p.featured === true).length}
              </span>
            </div>
          </div>

          {/* Filters Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", gap: "16px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              {[
                { key: "all", label: "All Types" },
                { key: "villas", label: "Villas" },
                { key: "land", label: "Land Plots" },
                { key: "apartments", label: "Apartments" },
                { key: "bnbs", label: "BnBs" },
              ].map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setPropertyCategory(cat.key)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "var(--radius-pill)",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    background: propertyCategory === cat.key ? "#ffd8a8" : "rgba(255,255,255,0.05)",
                    color: propertyCategory === cat.key ? "#121316" : "rgba(255,255,255,0.7)",
                    border: "1px solid",
                    borderColor: propertyCategory === cat.key ? "#ffd8a8" : "rgba(255,255,255,0.1)",
                    transition: "all var(--transition-fast)",
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className={styles.searchBox} style={{ display: "block" }}>
              <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Filter properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          {/* Properties Staging Table */}
          <div className={styles.panelCard}>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Property Title &amp; Category</th>
                    <th>Location</th>
                    <th>Asking Price</th>
                    <th>Render on Website</th>
                    <th>Featured on Home</th>
                    <th>Guarantee Verified</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProperties.length === 0 ? (
                    <tr>
                      <td colSpan="7" className={styles.emptyTableState}>
                        No properties found matching your selection.
                      </td>
                    </tr>
                  ) : (
                    filteredProperties.map((prop) => {
                      const isRendered = prop.isPublished !== false;
                      const isFeatured = prop.featured === true;
                      const isVerified = prop.verified !== false;

                      return (
                        <tr key={`${prop.collection}-${prop.id}`}>
                          <td>
                            <div className={styles.listingThumb}>
                              <Image
                                src={prop.image || "/images/sphera-villa1.jpg"}
                                alt={prop.title}
                                fill
                                sizes="60px"
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                          </td>
                          <td>
                            <div className={styles.tableTitle}>{prop.title}</div>
                            <span style={{ fontSize: "11px", fontWeight: 700, color: "#ffd8a8", textTransform: "uppercase" }}>
                              {prop.categoryName}
                            </span>
                          </td>
                          <td>
                            <span className={styles.tableLocationPill}>{prop.location}</span>
                          </td>
                          <td>
                            <span className={styles.tablePrice}>{prop.price}</span>
                          </td>

                          {/* Render on Website Switch */}
                          <td>
                            <label className={styles.switchToggle}>
                              <input
                                type="checkbox"
                                checked={isRendered}
                                onChange={() => handleTogglePropertyPublished(prop)}
                              />
                              <span className={styles.switchSlider} />
                            </label>
                            <span style={{ fontSize: "11.5px", marginLeft: "10px", color: isRendered ? "#86efac" : "rgba(255,255,255,0.4)" }}>
                              {isRendered ? "Live (Public)" : "Hidden"}
                            </span>
                          </td>

                          {/* Featured on Home Switch */}
                          <td>
                            <label className={`${styles.switchToggle} ${styles.switchToggleGold}`}>
                              <input
                                type="checkbox"
                                checked={isFeatured}
                                onChange={() => handleTogglePropertyFeatured(prop)}
                              />
                              <span className={styles.switchSlider} />
                            </label>
                            <span style={{ fontSize: "11.5px", marginLeft: "10px", color: isFeatured ? "#ffd8a8" : "rgba(255,255,255,0.4)" }}>
                              {isFeatured ? "Featured" : "Standard"}
                            </span>
                          </td>

                          {/* Verified Guarantee Toggle */}
                          <td>
                            <button
                              type="button"
                              onClick={() => handleTogglePropertyVerified(prop)}
                              className={isVerified ? styles.verifiedBadge : styles.unverifiedBadge}
                              title="Toggle 'What you see is what you get' guarantee"
                            >
                              {isVerified ? "✓ Verified" : "○ Pending"}
                            </button>
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
      )}

      {/* =====================================================================
          EDIT HERO SLIDE & SHOWCASE HOUSES MODAL
          ===================================================================== */}
      {slideModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setSlideModalOpen(false)}>
          <div className={styles.modalContent} style={{ maxWidth: "760px" }} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Edit Hero Slide &amp; Showcase Houses ({slideForm.navLabel})</h3>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setSlideModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSlide}>
              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Slide Tagline</label>
                  <input
                    type="text"
                    required
                    value={slideForm.tag}
                    onChange={(e) => setSlideForm({ ...slideForm, tag: e.target.value })}
                    placeholder="e.g. VERIFIED LUXURY VILLAS"
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Main Headline</label>
                  <input
                    type="text"
                    required
                    value={slideForm.headline}
                    onChange={(e) => setSlideForm({ ...slideForm, headline: e.target.value })}
                    placeholder="e.g. Luxury Contemporary Villas"
                    className={styles.fieldInput}
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Hero Subtitle</label>
                <textarea
                  rows="2"
                  required
                  value={slideForm.subtitle}
                  onChange={(e) => setSlideForm({ ...slideForm, subtitle: e.target.value })}
                  className={styles.fieldTextarea}
                  placeholder="Compelling description of what this category offers..."
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Background Image URL</label>
                  <input
                    type="text"
                    required
                    value={slideForm.image}
                    onChange={(e) => setSlideForm({ ...slideForm, image: e.target.value })}
                    placeholder="/images/sphera-villa1.jpg"
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Call To Action Text</label>
                  <input
                    type="text"
                    required
                    value={slideForm.ctaText}
                    onChange={(e) => setSlideForm({ ...slideForm, ctaText: e.target.value })}
                    placeholder="Explore Villas Collection"
                    className={styles.fieldInput}
                  />
                </div>
              </div>

              {/* Showcase Card 1 */}
              <div style={{ background: "rgba(0,0,0,0.3)", padding: "16px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.08)", marginTop: "12px", marginBottom: "16px" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#ffd8a8", marginBottom: "12px" }}>
                  Showcase House 1 (Right Floating Preview Card)
                </div>

                <div className={styles.formRow}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>House Title</label>
                    <input
                      type="text"
                      required
                      value={slideForm.card1?.title || ""}
                      onChange={(e) =>
                        setSlideForm({
                          ...slideForm,
                          card1: { ...slideForm.card1, title: e.target.value },
                        })
                      }
                      placeholder="Eden Forest Villa"
                      className={styles.fieldInput}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Specs &amp; Area</label>
                    <input
                      type="text"
                      required
                      value={slideForm.card1?.specs || ""}
                      onChange={(e) =>
                        setSlideForm({
                          ...slideForm,
                          card1: { ...slideForm.card1, specs: e.target.value },
                        })
                      }
                      placeholder="4 Beds · 450 m² · Pool"
                      className={styles.fieldInput}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Asking Price</label>
                    <input
                      type="text"
                      required
                      value={slideForm.card1?.price || ""}
                      onChange={(e) =>
                        setSlideForm({
                          ...slideForm,
                          card1: { ...slideForm.card1, price: e.target.value },
                        })
                      }
                      placeholder="KES 68,000,000"
                      className={styles.fieldInput}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>House Image URL</label>
                    <input
                      type="text"
                      value={slideForm.card1?.image || ""}
                      onChange={(e) =>
                        setSlideForm({
                          ...slideForm,
                          card1: { ...slideForm.card1, image: e.target.value },
                        })
                      }
                      placeholder="/images/sphera-villa1.jpg"
                      className={styles.fieldInput}
                    />
                  </div>
                </div>
              </div>

              {/* Showcase Card 2 */}
              <div style={{ background: "rgba(0,0,0,0.3)", padding: "16px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "16px" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#ffd8a8", marginBottom: "12px" }}>
                  Showcase House 2 (Right Secondary Preview Card)
                </div>

                <div className={styles.formRow}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>House Title</label>
                    <input
                      type="text"
                      required
                      value={slideForm.card2?.title || ""}
                      onChange={(e) =>
                        setSlideForm({
                          ...slideForm,
                          card2: { ...slideForm.card2, title: e.target.value },
                        })
                      }
                      placeholder="The Glass House Villa"
                      className={styles.fieldInput}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Specs &amp; Area</label>
                    <input
                      type="text"
                      required
                      value={slideForm.card2?.specs || ""}
                      onChange={(e) =>
                        setSlideForm({
                          ...slideForm,
                          card2: { ...slideForm.card2, specs: e.target.value },
                        })
                      }
                      placeholder="5 Beds · 520 m² · Terrace"
                      className={styles.fieldInput}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Asking Price</label>
                    <input
                      type="text"
                      required
                      value={slideForm.card2?.price || ""}
                      onChange={(e) =>
                        setSlideForm({
                          ...slideForm,
                          card2: { ...slideForm.card2, price: e.target.value },
                        })
                      }
                      placeholder="KES 82,000,000"
                      className={styles.fieldInput}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>House Image URL</label>
                    <input
                      type="text"
                      value={slideForm.card2?.image || ""}
                      onChange={(e) =>
                        setSlideForm({
                          ...slideForm,
                          card2: { ...slideForm.card2, image: e.target.value },
                        })
                      }
                      placeholder="/images/sphera-villa2.jpg"
                      className={styles.fieldInput}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formCheckboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={slideForm.active !== false}
                    onChange={(e) => setSlideForm({ ...slideForm, active: e.target.checked })}
                  />
                  <span>Active in Homepage Hero Carousel</span>
                </label>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setSlideModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn}>
                  Save Hero Slide &amp; Houses
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
