import Image from "next/image";
import { socials } from "@/lib/data";

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div>
        <h1 className="hero-h1">AI & Backend Engineer</h1>
        <p className="hero-intro">
          I build backend systems around LLMs: multi-agent pipelines, agent security
          scanning, and structured data extraction. Python, FastAPI, LangGraph, Next.js.
        </p>
        <ul className="hero-facts">
          <li>B.Tech IT, RKGIT · BS Data Science, IIT Madras</li>
          <li>Research Consultant, WorldQuant BRAIN (Gold level)</li>
          <li>Open to internships and hackathons</li>
        </ul>
        <div className="links">
          {socials.map((s) => (
            <a key={s.label} className="btn" href={s.url} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="hero-photo-frame">
        <Image src="/arvind_portfolio.png" alt="Arvind Kumar" fill priority style={{ objectFit: "cover" }} />
      </div>
    </section>
  );
}
