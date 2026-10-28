"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const AdminDataContext = createContext(null);

export function AdminDataProvider({ children }) {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  const [siteData, setSiteData] = useState({
    villas: [],
    land: [],
    apartments: [],
    bnbs: [],
    construction: [],
    engineers: [],
    contractorIncentives: [],
    heroSlides: [],
    viewings: [],
    tickets: [],
    personnel: [],
  });

  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  }, []);

  // Check auth
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch("/api/auth/check");
        const data = await res.json();
        if (data.authenticated) {
          setAdminUser(data.user);
          setAuthChecked(true);
          fetchContent();
        } else {
          router.push("/admin/login");
        }
      } catch (err) {
        router.push("/admin/login");
      }
    };
    verifyAuth();
  }, [router]);

  // Fetch all site content
  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/content");
      const json = await res.json();
      if (json.success && json.data) {
        setSiteData((prev) => ({
          ...prev,
          ...json.data,
        }));
      }
    } catch (err) {
      console.error("Failed to load content:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create item in collection
  const createItem = async (collection, item) => {
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection, item }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`New item added to ${collection}!`);
        await fetchContent();
        return { success: true, item: data.item };
      } else {
        showToast(data.error || "Failed to create item");
        return { success: false, error: data.error };
      }
    } catch (err) {
      showToast(err.message || "Network error");
      return { success: false, error: err.message };
    }
  };

  // Update item in collection
  const updateItem = async (collection, item) => {
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection, item }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Updated successfully!`);
        await fetchContent();
        return { success: true, item: data.item };
      } else {
        showToast(data.error || "Failed to update item");
        return { success: false, error: data.error };
      }
    } catch (err) {
      showToast(err.message || "Network error");
      return { success: false, error: err.message };
    }
  };

  // Delete item from collection
  const deleteItem = async (collection, id) => {
    try {
      const res = await fetch(`/api/content?collection=${collection}&id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Item removed from ${collection}`);
        await fetchContent();
        return { success: true };
      } else {
        showToast(data.error || "Failed to delete");
        return { success: false, error: data.error };
      }
    } catch (err) {
      showToast(err.message || "Network error");
      return { success: false, error: err.message };
    }
  };

  // Replace whole collection
  const replaceCollection = async (collection, items) => {
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "replaceCollection", collection, items }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Saved changes to ${collection}!`);
        await fetchContent();
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Set single key in siteData
  const setKey = async (key, value) => {
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "setKey", key, value }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchContent();
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Logout
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <AdminDataContext.Provider
      value={{
        siteData,
        loading,
        fetchContent,
        adminUser,
        authChecked,
        toastMessage,
        showToast,
        createItem,
        updateItem,
        deleteItem,
        replaceCollection,
        setKey,
        handleLogout,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
}
