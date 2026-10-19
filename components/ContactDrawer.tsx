"use client";

import { useState } from "react";
import { socials } from "@/lib/data";

interface ContactDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactDrawer({ open, onClose }: ContactDrawerProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      if (sent) setSent(false);
      if (error) setError(false);
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    try {
      const res = await fetch("https://formspree.io/f/maqrrdll", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });

      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <div onClick={onClose} style={styles.overlay} />

      <div style={styles.drawer}>
        <div style={styles.header}>
          <span style={styles.title}>Contact me</span>
          <button onClick={onClose} aria-label="Close" style={styles.closeBtn}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>[ Name ]</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange("name")}
            placeholder="Your name"
            className="brutal-field"
            style={styles.input}
          />

          <label style={styles.label}>[ Email ]</label>
          <input
            name="email"
            required
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            placeholder="you@example.com"
            className="brutal-field"
            style={styles.input}
          />

          <label style={styles.label}>[ Message ]</label>
          <textarea
            name="message"
            required
            rows={4}
            value={form.message}
            onChange={handleChange("message")}
            placeholder="Say something..."
            className="brutal-field"
            style={styles.textarea}
          />

          <button type="submit" className="brutal" style={styles.submitBtn} disabled={sending}>
            {sent ? "Sent ✓" : sending ? "Sending..." : "Send message"}
          </button>

          {error && (
            <div style={{ ...styles.note, color: "crimson", opacity: 0.9 }}>
              Something went wrong — try again or email directly.
            </div>
          )}
        </form>

        <div style={styles.socials}>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="brutal"
              style={styles.socialBtn}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    zIndex: 45,
  },
  drawer: {
    position: "fixed",
    top: 0,
    right: 0,
    height: "100%",
    width: 380,
    maxWidth: "90vw",
    background: "var(--bg)",
    borderLeft: "3px solid var(--ink)",
    padding: "28px 24px",
    boxSizing: "border-box",
    zIndex: 50,
    overflowY: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontFamily: "var(--font-display)",
    fontSize: 22,
    letterSpacing: 1,
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "var(--ink)",
    fontSize: 24,
    cursor: "pointer",
    lineHeight: 1,
  },
  form: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 10, letterSpacing: 1.5, opacity: 0.7, marginTop: 10 },
  input: { padding: 11, fontSize: 13 },
  textarea: { padding: 11, fontSize: 13, resize: "vertical" },
  submitBtn: {
    marginTop: 16,
    padding: 14,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1.5,
    textAlign: "center",
    background: "var(--ink)",
    color: "var(--bg)",
  },
  note: { fontSize: 9.5, opacity: 0.45, marginTop: 10, lineHeight: 1.5 },
  socials: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginTop: 28,
    paddingTop: 20,
    borderTop: "2px solid var(--line)",
  },
  socialBtn: {
    padding: "10px 0",
    textAlign: "center",
    fontSize: 11,
    fontWeight: 700,
    color: "var(--ink)",
    textDecoration: "none",
  },
};
