import { achievements } from "@/lib/data";

export default function Achievements() {
  return (
    <section id="achievements" className="section">
      <h2 className="section-title">Recognition</h2>
      <div className="ach-grid">
        {achievements.map((a) => (
          <div key={a.title} className="card ach">
            <span className="badge">{a.badge}</span>
            <strong>{a.title}</strong>
            <span>{a.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
