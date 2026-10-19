export interface Metric {
  value: string; // the "after" number, or the single measured number
  label: string;
  from?: string; // the "before" number; renders as from -> value
}

export interface Project {
  id: string;
  category: string; // drives the filter chips; a new string creates a new category
  title: string;
  cardHook: string;
  usage: string;
  hook: string; // THE strongest claim, one sentence. Shown biggest.
  why: string; // one line: the mechanism that makes the hook true
  gap: string; // one line: the problem or gap this project fills
  built: string[]; // max 4, "Keyword: detail", engineering decisions a senior engineer would ask about
  metrics: Metric[]; // only measured or countable facts; use `from` for before -> after
  scope?: string; // one honest line: what is NOT claimed
  stack: string[];
  image: string; // screenshot at /public/projects/<id>.png
  codeUrl: string;
  demoUrl?: string;
  color: string; // CSS var, e.g. "--p1"
}

// To add a project: copy one entry, change the fields, drop public/projects/<id>.png.
export const projects: Project[] = [
  {
    id: "tracelore",
    cardHook: "Trace incidents back to evidence you can trust.",
    usage: "Record application events, investigate evidence-linked causes, then simulate timeout, cache or latency changes against recorded traces.",
    category: "Observability",
    title: "Tracelore",
    hook: "Every root-cause claim links to recorded evidence, on a history nobody can quietly edit.",
    why: "Postgres itself rejects UPDATE, DELETE and TRUNCATE on events; the app role can only insert.",
    gap: "Incident tools show dashboards. They cannot prove what happened, or whether a fix would have helped.",
    built: [
      "Integrity: per-stream hash chain with gap and break findings; Python and TS SDKs share hash vectors, diff-gated in CI",
      "Ingest: event and outbox row in one transaction, dedup by event id, late events invalidate snapshots",
      "RCA: BOCPD + n-gram sequence detection, Granger-ranked causes; LLM output rejected unless it cites known evidence",
      "What-if: simulate timeout, cache or latency changes on recorded traces; each result carries a digest",
    ],
    metrics: [
      { value: "10.9 ms", label: "replay of 10k events" },
      { value: "142 ms", label: "simulate a 10k-event trace" },
      { value: "~11x", label: "smaller as Parquet than on the wire" },
    ],
    scope: "Local CPU measurements. Detection accuracy is not benchmarked.",
    stack: ["FastAPI", "PostgreSQL", "Redpanda", "Redis", "Next.js", "Parquet"],
    image: "/projects/tracelore.png",
    codeUrl: "https://github.com/arvindkumar-ship-it/Tracelore",
    color: "--p3",
  },
  {
    id: "agentsec",
    cardHook: "Find the weak spots in your AI agent.",
    usage: "Run attack payloads against an allowed agent endpoint, inspect the combined verifier signals, and review unsafe or split verdicts before shipping.",
    category: "AI Security",
    title: "AgentSec",
    hook: "No security verdict rests on one LLM's guess.",
    why: "Two judge passes and a deterministic heuristic vote; a split counts as unsafe and is flagged for review.",
    gap: "A single LLM judge proved unreliable in Anvesh, and a scanner that under-reports is worse than none.",
    built: [
      "Shield: matches decoded base64, URL-encoded and zero-width-obfuscated arguments; an invalid decision is BLOCK",
      "Scanner: SSRF guard with HTTPS origin allowlist, public-IP-only DNS, pinned IP, redirects off",
      "Billing: Razorpay server-issued orders, HMAC check, payment re-fetched and bound to org and plan, single use",
      "Limits: Postgres row-lock quota reservation with refund on failure, 5/min rate limit on scan and eval",
    ],
    metrics: [
      { value: "57", label: "attack payloads, 9 categories" },
      { value: "3", label: "verifier signals" },
      { value: "16", label: "security regression tests" },
      { value: "5 / 50 / 500", label: "scans per day, free / pro / enterprise" },
    ],
    scope: "Payment webhooks and SSO are not implemented; Shield state is per process.",
    stack: ["FastAPI", "PostgreSQL", "MongoDB", "Next.js", "Razorpay", "Groq"],
    image: "/projects/agentsec.png",
    codeUrl: "https://github.com/arvindkumar-ship-it/AgentSec",
    demoUrl: "https://agent-sec-teal.vercel.app/",
    color: "--p1",
  },
  {
    id: "atlas",
    cardHook: "Coding agents with independently verified results.",
    usage: "Run a coding task in an isolated runtime, inspect its proposed patch, and approve the exact run after independent tests verify completion.",
    category: "Agent Infrastructure",
    title: "Atlas Agent Runtime",
    hook: "The agent cannot mark its own work as done.",
    why: "Success needs an independent test re-run; approval is bound to the exact patch and run.",
    gap: "Coding agents lose work on crashes and report success on their own say-so.",
    built: [
      "Durability: hash-linked event log, fenced leases, heartbeats, crash recovery, idempotent effects",
      "Sandbox: Docker with no network, dropped capabilities, read-only workspace, no shell tool, bounded ZIP import",
      "Patching: exact-hunk patches with a crash journal; test runner config cannot be edited by the agent",
      "Context: compiler with source-linked memory; NumPy and PyTorch reference decoder with int8 and paged KV",
    ],
    metrics: [
      { value: "84 / 84", label: "fixture runs matching an independent oracle" },
      { value: "78", label: "tests" },
    ],
    scope: "A deterministic driver proves runtime and recovery, not LLM quality.",
    stack: ["FastAPI", "SQLite / Postgres", "Docker", "React", "PyTorch", "Prometheus"],
    image: "/projects/atlas.png",
    codeUrl: "https://github.com/arvindkumar-ship-it/Atlas-agent-runtime",
    color: "--p4",
  },
  {
    id: "consensusdb",
    cardHook: "A database built to keep going through failure.",
    usage: "Route reads and writes through a replicated cluster. Inspect failover behavior and use validated index suggestions to improve query performance.",
    category: "Distributed Systems",
    title: "ConsensusDB",
    hook: "Found that a 7.6 s outage was a 2 s closed-port connect, not the election timeout.",
    why: "Measured before tuning: the router waited on a dead leader. A 0.3 s connect timeout fixed it.",
    gap: "One database server means downtime on failure, a one-machine ceiling, and guessed indexes.",
    built: [
      "Raft: election, replication, persistence; seeded chaos test checks one leader per term and immutable committed entries under crashes and partitions",
      "Cluster: 2 groups x 3 replicas, consistent-hash ring, group commit, rebalancing with MOVED tombstones",
      "Liveness: cached peer flag with background ping instead of a ping inside the global lock",
      "Optimizer: query log to LLM or rules, validated before CREATE INDEX through the Raft log, Welch t-test on impact",
    ],
    metrics: [
      { value: "0.65 s", label: "leader-loss outage", from: "7.6 s" },
      { value: "1-3 ms", label: "write with a dead follower", from: "1000 ms" },
      { value: "2233/s", label: "SET throughput, group commit", from: "1172/s" },
      { value: "1272 ops/s", label: "scan throughput after index", from: "661 ops/s" },
      { value: "51", label: "tests passing" },
    ],
    scope: "Laptop localhost, historical runs. Reads are leader-local; no snapshots.",
    stack: ["Python", "Raft", "C++ engine", "Consistent hashing"],
    image: "/projects/consensusdb.png",
    codeUrl: "https://github.com/arvindkumar-ship-it/consensusdb",
    color: "--p2",
  },
  {
    id: "kestrel",
    cardHook: "Spot unusual access before it blends into the logs.",
    usage: "Ingest access events, build per-actor baselines, and review risk alerts for unusual resources, travel, replay or tool-call behavior.",
    category: "Cyber Defense",
    title: "Kestrel",
    hook: "Per-actor baselines instead of fixed thresholds: it flags the first touch of a rare resource.",
    why: "Graph novelty and an EWMA/MAD robust z-score feed one risk score; alerts fire above 0.8.",
    gap: "Raw access logs hide who suddenly reaches resources nobody else uses.",
    built: [
      "Pipeline: transactional outbox to a Redis Streams consumer group, so no event is lost between database and stream",
      "Batch: hourly IsolationForest over 7 per-actor graph features, run off the event loop",
      "Abuse: rate z-score, impossible travel above 900 km/h, token replay, runaway tool-call loops",
      "Safety: production config rejects debug and non-HTTPS; session revoke is dry-run by default and audited",
    ],
    metrics: [
      { value: "5", label: "abuse signals" },
      { value: "7", label: "batch features" },
      { value: "22", label: "tests" },
    ],
    scope: "Alert and review only: automated response and route auth are not wired yet.",
    stack: ["FastAPI", "PostgreSQL", "Redis Streams", "scikit-learn", "Docker"],
    image: "/projects/kestrel.png",
    codeUrl: "https://github.com/arvindkumar-ship-it/Kestrel",
    color: "--p1",
  },
  {
    id: "anvesh",
    cardHook: "From incomplete API docs to a more resilient client.",
    usage: "Submit API documentation, follow schema extraction and client generation, then inspect the documentation gaps and hardening report.",
    category: "Developer Tooling",
    title: "Anvesh",
    hook: "Tells you what the API docs leave unclear before it writes a line of client code.",
    why: "8 documentation checks run on the extracted schema; the generated client is then reviewed against 7 failure patterns.",
    gap: "Poorly documented APIs break clients on 429s, expired tokens, empty bodies, pagination and timeouts.",
    built: [
      "Pipeline: 10 steps from ingestion and RAG to schema, dependency order, generation, hardening and report",
      "Hardening: template fix per failure pattern, LLM fix where no template exists",
      "Routing: 4-model LiteLLM fallback, bounded attempts, retries only on 429 and 5xx",
      "Retrieval: docs in ChromaDB, each step gets only the relevant sections; live Socket.IO step view",
    ],
    metrics: [
      { value: "10", label: "pipeline steps" },
      { value: "8", label: "documentation checks" },
      { value: "7", label: "failure patterns" },
    ],
    scope: "Hardening is LLM code review, not execution against a mock server. Prototype, not for public hosting.",
    stack: ["LiteLLM", "LangChain", "ChromaDB", "FastAPI", "Socket.IO", "Next.js"],
    image: "/projects/anvesh.png",
    codeUrl: "https://github.com/arvindkumar-ship-it/Anvesh",
    color: "--p4",
  },
  {
    id: "safe-exam",
    cardHook: "Online exams that preserve answers and evidence.",
    usage: "Deliver an exam, queue answers locally through network loss, run coding submissions, and give human reviewers a traceable proctoring record.",
    category: "EdTech Platform",
    title: "SafeExam Portal",
    hook: "Proctoring that produces evidence for a human reviewer, never a verdict.",
    why: "Hash-chained events with gap detection; network loss and accessibility mode carry zero penalty.",
    gap: "Exam platforms either over-trust cheating signals or lose answers when the network drops.",
    built: [
      "Judge: rlimits, uid drop, NO_NEW_PRIVS, seccomp denylist; Postgres SKIP LOCKED queue with LISTEN/NOTIFY and lease reaper",
      "Offline: AES-GCM encrypted IndexedDB answer queue; student bundle checked to contain no answer-key fields",
      "Scale: telemetry micro-batches, 64-shard revision counters instead of TTL caches, bounded Argon2 concurrency",
      "Native: WPF lockdown client bound to the same event chain",
    ],
    metrics: [
      { value: "50 / 50", label: "coding-round users completed" },
      { value: "5.8 s", label: "judge wait p50 at 50 users" },
      { value: "266", label: "frontend tests" },
    ],
    scope: "Synthetic a+b load on a free tier; not a capacity claim. Native client not run on Windows here.",
    stack: ["FastAPI", "PostgreSQL", "React", "Vite", ".NET WPF", "Docker"],
    image: "/projects/safe-exam.png",
    codeUrl: "https://github.com/arvindkumar-ship-it/safe-exam-portal",
    color: "--p2",
  },
  {
    id: "wavesafe",
    cardHook: "Coastal SOS, routed with accountable escalation.",
    usage: "Create an incident, match nearby authorities and capable hospitals, then track acknowledgement and timed escalation through an audited dispatch flow.",
    category: "Safety Systems",
    title: "WaveSafe",
    hook: "An SOS never silently stalls: every incident escalates on a timer.",
    why: "Ack at 90 s, escalate at 120 s, 112 fallback at 180 s, then manual ops, all through one validated state machine.",
    gap: "Coastal emergency help is a chain of phone calls with no coordinated routing to the right authority.",
    built: [
      "Dispatch: 16-state machine is the only status writer; each transition is validated, audited and atomic",
      "Routing: PostGIS 20 km jurisdiction match, capability-filtered hospitals, parallel dispatch",
      "Risk: robust z-score features, interaction terms, hard override for tsunami or surge; every score is explained",
      "Ingestion: dedup marks a record seen only after it is saved; this fixed alerts lost for good on a failed write",
    ],
    metrics: [
      { value: "16", label: "dispatch states" },
      { value: "11", label: "SQL migrations" },
      { value: "6", label: "Celery workers" },
    ],
    scope: "Risk weights are uncalibrated and there is no live 112 integration. Team project (3).",
    stack: ["FastAPI", "PostGIS", "Redis", "Celery", "Next.js"],
    image: "/projects/wavesafe.png",
    codeUrl: "https://github.com/arvindkumar-ship-it/WaveSafe",
    color: "--p3",
  },
  {
    id: "hackathon-platform",
    cardHook: "Fair judging. Frozen scores. Clear results.",
    usage: "Configure an event and weighted rubric, collect submissions, score transactionally, then freeze and publish the leaderboard snapshot.",
    category: "Platform Backend",
    title: "Hackathon Platform",
    hook: "Results are published from a frozen snapshot, never recomputed live.",
    why: "Leaderboards move through snapshot, freeze and publish; event status follows an explicit transition map.",
    gap: "Hackathon scores that shift after judging cause disputes.",
    built: [
      "Auth: argon2id, refresh-token rotation; a reused or reset token revokes every session",
      "Judging: weighted rubrics that must total 100, transactional scoring",
      "Uploads: policy checks, and a placeholder scanner that rejects files until a real one is configured",
      "Frontend: UI-Verse, React with in-memory access token and httpOnly refresh cookie",
    ],
    metrics: [
      { value: "25", label: "data models" },
      { value: "47", label: "passing unit tests" },
    ],
    scope: "Live Postgres, Redis and S3 paths are untested.",
    stack: ["NestJS", "Prisma", "PostgreSQL", "React", "Vite"],
    image: "/projects/hackathon-platform.png",
    codeUrl: "https://github.com/arvindkumar-ship-it/hackathon-platform",
    color: "--p1",
  },
  {
    id: "aiaa",
    cardHook: "An assistant that knows when to ask.",
    usage: "Evaluate a proposed assistant action through the confidence gate. Uncertain decisions fall back to rules or human review and are logged for later training.",
    category: "Agent Research",
    title: "AIAA",
    hook: "Fails toward asking: missing model weights mean human review, never a guess.",
    why: "The model decides; a rule is the safety net when it is unsure; every decision is logged for retraining.",
    gap: "Assistants either act without consent or ask about everything.",
    built: [
      "Gating: model primary, rule fallback inside a confidence band around a tuned 0.65 threshold",
      "Selection: RandomForest replaced an LSTM that was misapplied to non-sequential features",
      "Calibration: only from supplied held-out labels, never random",
      "Modules: memory, planning, style classifier, autonomy optimizer, calendar integration",
    ],
    metrics: [
      { value: "0.73", label: "F1, RandomForest (synthetic)", from: "0.39" },
      { value: "6", label: "offline tests" },
    ],
    scope: "Synthetic data measures fit to its generator, not real user behaviour.",
    stack: ["Python", "scikit-learn", "PyTorch", "FastAPI", "React"],
    image: "/projects/aiaa.png",
    codeUrl: "https://github.com/arvindkumar-ship-it/AIAA",
    color: "--p4",
  },
  {
    id: "raahgir",
    cardHook: "Travel plans that survive an API going down.",
    usage: "Request an itinerary, combine weather, places, currency and search data, and generate a day-by-day plan with independent provider fallbacks.",
    category: "Multi-Agent Systems",
    title: "Raahgir AI",
    hook: "One failing API degrades one part of the plan, never the whole request.",
    why: "Each of 4 external APIs has its own fallback to realistic defaults.",
    gap: "Multi-API travel planners crash when any single provider fails.",
    built: [
      "Pipeline: LangGraph multi-agent flow on FastAPI",
      "Data: live weather, places, currency and web search merged into one itinerary",
      "Output: day-by-day plan generated from fetched data, served to Next.js",
    ],
    metrics: [
      { value: "4", label: "APIs, independent fallback" },
    ],
    stack: ["FastAPI", "LangGraph", "Groq", "Next.js", "Tavily"],
    image: "/projects/raahgir.png",
    codeUrl: "https://github.com/arvindkumar-ship-it/Raahgir",
    color: "--p2",
  },
  {
    id: "careflow",
    cardHook: "Turn clinical notes into structured orders.",
    usage: "Submit a doctor’s note and review extracted medication, test and vital-sign orders in the dashboard; missing details remain unfilled.",
    category: "Healthcare AI",
    title: "CareFlow",
    hook: "Missing information stays missing: it never invents an order.",
    why: "The extraction prompt forbids any detail that is not in the doctor's note.",
    gap: "Clinics re-type free-text notes into medication, test and vital-sign orders.",
    built: [
      "Extraction: structured orders from free text, with no added detail",
      "Bug fix: multi-order truncation solved with a higher token budget and a no-summarising instruction",
      "Stack: FastAPI + MongoDB backend, Next.js + shadcn/ui dashboard",
    ],
    metrics: [
      { value: "3", label: "order types" },
    ],
    stack: ["FastAPI", "MongoDB", "Groq", "Next.js", "shadcn/ui"],
    image: "/projects/careflow.png",
    codeUrl: "https://github.com/arvindkumar-ship-it/Careflow",
    demoUrl: "https://frontend-8lrz98nrr-arvindkumar197g-4537s-projects.vercel.app/",
    color: "--p3",
  },
];

export const skillGroups = [
  { title: "Backend", items: ["Python", "FastAPI", "SQLAlchemy + Alembic", "Motor", "JWT + bcrypt", "Socket.IO"] },
  { title: "AI & Agents", items: ["LangGraph", "LangChain", "LiteLLM", "Groq", "ChromaDB", "HuggingFace", "Tavily"] },
  { title: "Data", items: ["MongoDB", "PostgreSQL", "XGBoost", "NetworkX"] },
  { title: "Frontend & Deploy", items: ["Next.js", "shadcn/ui", "Docker", "Render", "Vercel"] },
];

// Ordered by weight
export const achievements = [
  { badge: "GOLD LEVEL", title: "WorldQuant BRAIN", detail: "Research Consultant: designing and testing alphas" },
  { badge: "TOP 20%", title: "Intl Quant Championship 2025", detail: "Global quantitative research competition" },
  { badge: "FINALIST", title: "Strategy Storm, IIT Guwahati", detail: "Global finalist, case competition" },
  { badge: "FINALIST", title: "Investomania, IIT Hyderabad", detail: "Case competition finalist" },
  { badge: "TOP 10", title: "Case Crackers, Delhi University", detail: "Top 10 nationally" },
  { badge: "RUNNER-UP", title: "Hackwarts, RKGIT", detail: "2nd position, team LazyCoders" },
  { badge: "COMPLETED", title: "Summer Analytics", detail: "Applied data science program" },
];

export const socials = [
  { label: "GitHub", url: "https://github.com/arvindkumar-ship-it" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/arvindkumar7977" },
  {
    label: "Resume",
    url: "https://drive.google.com/file/d/1OMO-qRosjFVFrsxISYBTKGp1TBcY9Su5/view?usp=sharing",
  },
  { label: "Email", url: "mailto:arvindkumar.acad@gmail.com" },
];