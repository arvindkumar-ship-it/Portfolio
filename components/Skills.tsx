import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <h2 className="section-title">Stack</h2>
      <dl className="skills">
        {skillGroups.map((g) => (
          <div key={g.title}>
            <dt>{g.title}</dt>
            <dd>{g.items.join(" · ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
