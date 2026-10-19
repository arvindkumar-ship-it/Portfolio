import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/lib/data";
import ProjectImage from "@/components/ProjectImage";

export function generateStaticParams() { return projects.map(({ id }) => ({ id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = projects.find((p) => p.id === id);
  return { title: p ? `${p.title} — Arvind Kumar` : "Project not found", description: p?.cardHook };
}
export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = projects.find((p) => p.id === id);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return <main className="case-study">
    <nav className="case-nav" aria-label="Project navigation"><Link href="/#projects">← All projects</Link><Link href="/">Arvind Kumar</Link></nav>
    <header className="case-header"><p className="work-eyebrow">{p.category}</p><h1>{p.title}</h1><p className="case-lead">{p.cardHook}</p><div className="case-actions"><a href={p.codeUrl} target="_blank" rel="noopener noreferrer">View source ↗</a>{p.demoUrl && <a href={p.demoUrl} target="_blank" rel="noopener noreferrer">Open live project ↗</a>}</div></header>
    <ProjectImage src={p.image} title={p.title} />
    <div className="case-overview"><section><p className="work-eyebrow">01 / THE PROBLEM</p><h2>What needed to change</h2><p>{p.gap}</p></section><section><p className="work-eyebrow">02 / THE SOLUTION</p><h2>What I built</h2><p>{p.hook}</p><p>{p.why}</p></section></div>
    <section className="case-block"><p className="work-eyebrow">03 / IN PRACTICE</p><h2>How it’s used</h2><p>{p.usage}</p></section>
    <section className="case-block"><p className="work-eyebrow">04 / UNDER THE HOOD</p><h2>The decisions that matter</h2><div className="decision-grid">{p.built.map((item) => { const split = item.indexOf(": "); return <div key={item}><h3>{item.slice(0, split)}</h3><p>{item.slice(split + 2)}</p></div>; })}</div></section>
    <section className="case-block"><p className="work-eyebrow">05 / RESULTS & SCOPE</p><h2>What the work demonstrates</h2><div className="case-metrics">{p.metrics.map((m) => <div key={m.label}>{m.from && <span className="case-before">{m.from} →</span>}<strong>{m.value}</strong><span>{m.label}</span></div>)}</div>{p.scope && <p className="case-scope">{p.scope}</p>}</section>
    <section className="case-block"><p className="work-eyebrow">TECH STACK</p><div className="project-stack">{p.stack.map((s) => <span key={s}>{s}</span>)}</div></section>
    <Link className="case-next" href={`/projects/${next.id}`}><span>Next project</span><strong>{next.title} ↗</strong></Link>
  </main>;
}
