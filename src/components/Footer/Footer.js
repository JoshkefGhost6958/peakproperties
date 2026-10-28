"use client";

import styles from "./Footer.module.css";

export default function Footer({ onOpenLegal }) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        {/* Left */}
        <div className={styles.brand}>
          <span className={styles.logoText}>FORMA</span>
          <span className={styles.brandSubtitle}>
            Residential Quarter in Kazan
          </span>
        </div>

        {/* Middle */}
        <div className={styles.legalLinks}>
          <a
            href="#legal"
            className={styles.legalLink}
            onClick={(e) => {
              e.preventDefault();
              onOpenLegal("privacy");
            }}
          >
            Privacy Policy
          </a>
          <a
            href="#legal"
            className={styles.legalLink}
            onClick={(e) => {
              e.preventDefault();
              onOpenLegal("terms");
            }}
          >
            Equity Construction Agreement (DDU)
          </a>
        </div>

        {/* Right */}
        <div className={styles.rightArea}>
          <div className={styles.socialIcons}>
            {/* Telegram */}
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Telegram"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
            </a>

            {/* VK / Social */}
            <a
              href="https://vk.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="VK"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.07 2H8.93C4.33 2 2 4.33 2 8.93v6.14C2 19.67 4.33 22 8.93 22h6.14c4.6 0 6.93-2.33 6.93-6.93V8.93C22 4.33 19.67 2 15.07 2zm3.38 13.91c-.48.6-1.38 1.15-2.02 1.15h-1.28c-.54 0-.7-.27-1.63-1.2-.82-.8-1.18-.9-1.38-.9-.29 0-.37.08-.37.49v1.07c0 .35-.11.54-1.03.54-1.53 0-3.23-.93-4.43-2.66-1.81-2.57-2.31-4.51-2.31-4.9 0-.22.08-.43.51-.43h1.28c.38 0 .53.18.68.58.74 2.15 1.98 4.04 2.49 4.04.19 0 .28-.09.28-.58V10.2c-.06-1.03-.6-1.12-.6-1.49 0-.17.15-.35.39-.35h2.01c.33 0 .44.17.44.57v3.08c0 .33.15.44.25.44.19 0 .36-.11.72-.48 1.12-1.26 1.92-3.19 1.92-3.19.11-.22.28-.42.66-.42h1.28c.43 0 .53.22.43.54-.16.73-1.74 3.03-1.74 3.03-.17.27-.24.39 0 .7.17.22.73.71 1.1 1.14.68.79 1.2 1.45 1.34 1.91.13.43-.09.64-.47.64z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="YouTube"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.26 5 12 5 12 5s-6.26 0-7.82.42c-.86.23-1.54.91-1.76 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.22.86.9 1.54 1.76 1.77C5.74 19 12 19 12 19s6.26 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z" />
              </svg>
            </a>
          </div>

          <div className={styles.copyright}>
            © 2026 FORMA. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
