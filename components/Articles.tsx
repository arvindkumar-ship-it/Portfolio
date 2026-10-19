import { articles, mediumProfile } from "@/lib/articles";

export default function Articles() {
  return (
    <section id="articles" className="section articles-section">
      <div className="section-head">
        <div>
          <p className="work-eyebrow">WRITING ON MEDIUM</p>
          <h2 className="section-title">Articles</h2>
        </div>
        {mediumProfile && <a className="articles-profile" href={mediumProfile} target="_blank" rel="noopener noreferrer">All articles ↗</a>}
      </div>
      {articles.length > 0 ? <div className="article-list">
        {articles.map((article) => <a className="article-row" key={article.url} href={article.url} target="_blank" rel="noopener noreferrer">
          <div><h3>{article.title}</h3>{article.summary && <p>{article.summary}</p>}<span>{[article.date, article.readTime].filter(Boolean).join(" · ")}</span></div>
          <span className="article-arrow" aria-hidden="true">↗</span>
        </a>)}
      </div> : <div className="articles-space" aria-hidden="true" />}
    </section>
  );
}
