import { socials } from "@/lib/data";

export default function Footer({ onContactClick }: { onContactClick?: () => void }) {
  return (
    <footer className="site-footer">
      <span>© 2026 Arvind Kumar</span>
      <div className="footer-links">
        {socials.map((s) => (
          <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
            {s.label}
          </a>
        ))}
        {onContactClick && (
          <button className="btn footer-contact-btn" onClick={onContactClick}>
            Contact
          </button>
        )}
      </div>
    </footer>
  );
}
