"use client";

interface NavbarProps {
  onContactClick: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

const links = [
  { href: "#hero", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#articles", label: "Articles" },
  { href: "#skills", label: "Skills" },
];

export default function Navbar({ onContactClick, theme, onToggleTheme }: NavbarProps) {
  return (
    <nav className="navbar" style={styles.nav}>
      <a href="#hero" className="brutal" style={styles.logo}>AK</a>
      <div className="nav-right" style={styles.right}>
        <div className="nav-links" style={styles.links}>
          {links.map((l) => (
            <a key={l.href} href={l.href} style={styles.link}>
              {l.label}
            </a>
          ))}
          <button onClick={onContactClick} style={{ ...styles.link, ...styles.linkBtn }}>
            Contact
          </button>
        </div>
        <button
          onClick={onToggleTheme}
          aria-label="Toggle dark mode"
          style={styles.themeBtn}
        >
          {theme === "dark" ? "☾" : "☀"}
        </button>
      </div>
    </nav>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 30,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 32px",
    borderBottom: "3px solid var(--ink)",
    background: "var(--bg)",
  },
  logo: {
    fontFamily: "var(--font-display)",
    fontSize: 20,
    letterSpacing: 1.5,
    color: "var(--ink)",
    textDecoration: "none",
    padding: "4px 10px",
    display: "inline-block",
    lineHeight: 1,
    marginRight: 24,
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: 28,
  },
  links: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    color: "var(--ink)",
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    textDecoration: "none",
    background: "none",
    border: "none",
    padding: 0,
    fontFamily: "var(--font-body)",
    cursor: "pointer",
  },
  linkBtn: {},
  themeBtn: {
    border: "2px solid var(--ink)",
    background: "var(--surface)",
    color: "var(--ink)",
    width: 32,
    height: 32,
    cursor: "pointer",
    fontSize: 14,
  },
};
