"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Redirection to admin dashboard
        router.push("/admin");
      } else {
        setError(data.error || "Invalid username or password.");
      }
    } catch (err) {
      setError("Unable to authenticate. Please verify your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setUsername("admin@peakhousing.co.ke");
    setPassword("admin123");
    setError("");
  };

  return (
    <main className={styles.loginWrapper}>
      <div className={styles.ambientGlowGold} />
      <div className={styles.ambientGlowEmerald} />

      <div className={styles.loginCard}>
        {/* Brand Header */}
        <div className={styles.brandHeader}>
          <Image
            src="/images/peak-housing-logo.jpg"
            alt="Peak Housing Logo"
            width={52}
            height={52}
            className={styles.logoImage}
          />
          <h1 className={styles.brandTitle}>PEAK HOUSING</h1>
          <span className={styles.portalTag}>ADMINISTRATIVE PORTAL</span>
        </div>

        {error && (
          <div className={styles.errorBanner}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Admin Username / Email</label>
            <input
              type="text"
              required
              autoFocus
              placeholder="e.g. admin@peakhousing.co.ke"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
              <button
                type="button"
                className={styles.togglePassBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.submitBtn}
          >
            {loading ? "Authenticating..." : "Access Admin Dashboard →"}
          </button>
        </form>

        {/* Demo Quick-Fill */}
        <div className={styles.demoFillBox}>
          <button
            type="button"
            className={styles.demoBtn}
            onClick={handleFillDemo}
          >
            Quick Fill Demo Credentials
          </button>

          <Link href="/" className={styles.returnHomeLink}>
            ← Return to Peak Housing Main Site
          </Link>
        </div>
      </div>
    </main>
  );
}
