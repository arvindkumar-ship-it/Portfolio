import Link from "next/link";
import { projects } from "@/lib/data";
import ProjectImage from "@/components/ProjectImage";

export default function Projects() {
  return (
    <section id="projects" className="section work-section">
      <div className="section-head">
        <div><p className="work-eyebrow">SELECTED WORK</p><h2 className="section-title">Built to solve something.</h2></div>
        <span className="work-count">{String(projects.length).padStart(2, "0")} projects</span>
      </div>
      <div className="project-list">
        {projects.map((p) => (
          <Link key={p.id} href={`/projects/${p.id}`} className="project-card">
            <ProjectImage src={p.image} title={p.title} />
            <div className="project-copy">
              <div className="project-heading"><h3>{p.title}</h3><span aria-hidden="true" className="project-arrow">↗</span></div>
              <p className="project-hook">{p.cardHook}</p>
              <div className="project-stack">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
