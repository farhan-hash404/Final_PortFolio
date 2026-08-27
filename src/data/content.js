/**
 * Single source of truth for every word on the site.
 * All of it comes from Muhammad Farhan's CV — edit here, not in components.
 */

export const profile = {
  name: 'Muhammad Farhan',
  firstName: 'Farhan',
  role: 'AI Engineer — LLMs & Agentic Systems',
  shortRole: 'AI Engineer',
  location: 'Peshawar, Pakistan',
  available: true,
  availabilityNote: 'Available for full-time roles immediately',
  email: 'farhan43509@gmail.com',
  phone: '+92 334 9184114',
  phoneHref: 'tel:+923349184114',
  github: 'https://github.com/farhan-hash404',
  githubHandle: 'farhan-hash404',
  linkedin: 'https://www.linkedin.com/in/muhammad-farhan-5164a227a/',
  linkedinHandle: 'muhammad-farhan',
  // Served straight from /public — swap the file to update the download.
  cv: '/Muhammad-Farhan-CV.pdf',
}

export const sections = [
  { id: 'intro', num: '01', label: 'Intro' },
  { id: 'projects', num: '02', label: 'Projects' },
  { id: 'experience', num: '03', label: 'Experience' },
  { id: 'stack', num: '04', label: 'Stack' },
  { id: 'credentials', num: '05', label: 'Credentials' },
  { id: 'contact', num: '06', label: 'Contact' },
]

export const hero = {
  badge: {
    icon: 'trophy',
    text: 'Adalat AI —',
    highlight: 'Top 5, GIKI Capstone Competition',
    tail: '· Advanced AI / Agentic Bootcamp',
    action: { label: 'View', href: '#projects' },
  },
  // The name is the headline now; the tagline sits under it as support.
  tagline: ['I design and deploy', 'multi-agent AI systems', '— from prototype to production.'],
  subline:
    'LangChain and LangGraph orchestration served behind production-style FastAPI endpoints, grounded in deep learning and classical ML.',
  points: [
    {
      lead: 'Beyond the prompt',
      body: 'multi-agent architectures with real orchestration and state handoff, not prompt chaining dressed up as a pipeline.',
    },
    {
      lead: 'Grounded in fundamentals',
      body: 'CNNs, reinforcement learning, and classical ML underneath the agentic work — depth, not surface familiarity.',
    },
  ],
  stats: [
    { value: '1+', label: 'Years hands-on' },
    { value: '6', label: 'Projects built' },
  ],
  proof: [
    { icon: 'spark', text: 'Multi-agent systems' },
    { icon: 'medal', text: 'NVIDIA certified' },
    { icon: 'rocket', text: '6 projects built' },
    { icon: 'trophy', text: 'Top 5 · GIKI Capstone' },
  ],
  focusCard: {
    title: 'Where I go deep',
    hint: 'Live snapshot',
    bars: [
      { label: 'Agentic AI · LangGraph', value: 92 },
      { label: 'Python · FastAPI', value: 88 },
      { label: 'Deep Learning · TensorFlow', value: 78 },
    ],
  },
}

export const summary =
  'Computer Science graduate and self-driven AI Engineer specialising in LLMs and Agentic AI systems, with 1+ year of hands-on experience designing and deploying multi-agent architectures using LangChain and LangGraph. Experienced in orchestrating collaborative agent workflows — from autonomous content-generation pipelines to real-time conversational agents that evaluate and respond to human input — and serving them behind production-style FastAPI endpoints.'

/* Marquee ticker above the project showcase */
export const marqueeTags = [
  'LANGGRAPH',
  'LANGCHAIN',
  'FASTAPI',
  'LLMS',
  'MULTI-AGENT',
  'TENSORFLOW',
  'PYTHON',
  'SCIKIT-LEARN',
  'NEXT.JS',
  'DOCKER',
]

export const featuredProjects = [
  {
    id: 'content-factory',
    index: '01',
    title: 'AI Content Factory',
    kicker: 'GENERATIVE AI · MULTI-AGENT · FYP',
    meta: 'Final Year Project · Team of 2',
    period: '2025 – 2026',
    tagline:
      'A multi-agent content system: one topic in, researched and fact-checked long-form out — then repurposed into five publishing formats.',
    stack: ['Python', 'LangGraph', 'LangChain', 'LLMs', 'FastAPI', 'Next.js'],
    visual: 'factory',
    /* Condensed for narrow screens — the full `highlights` below are far
       too much to scroll past on a phone. */
    short: [
      'An orchestrator agent researches the topic from trusted sources and builds the outline before anything is written.',
      'A blog agent drafts it, an evaluation gate scores and regenerates until it passes, then it fans out into five publishing formats.',
    ],
    highlights: [
      'Built an orchestrator agent that takes a single topic, searches the web for authoritative sources, synthesises the research, and produces a structured content outline for the next agent to work from.',
      'Added a blog generation agent that drafts the full article against that research and outline, keeping the output factually consistent with the sources rather than free-generating from the prompt.',
      'Gated every draft behind an evaluation agent scoring factual accuracy, source reliability, structure, readability, originality and hallucination — failing drafts loop back for regeneration until they clear the threshold.',
      'Attached generated imagery to approved articles, then wired a repurposing pipeline turning each one into a YouTube Short, podcast, video script, X post, and LinkedIn post.',
    ],
  },
  {
    id: 'adalat',
    index: '02',
    title: 'Adalat AI',
    kicker: 'LEGAL AI · MOOT COURT SIM · CAPSTONE',
    meta: 'Capstone Project · GIKI',
    period: '2026 – Present',
    tagline:
      'An AI courtroom where lawyers argue a live case against opposing counsel, and an AI judge scores the reasoning against a fixed rubric.',
    stack: ['Python', 'LLMs', 'Multi-Agent', 'FastAPI'],
    visual: 'court',
    live: true,
    repo: 'https://github.com/farhan-hash404/MootCourtSimulator',
    award: 'Top 5 — GIKI Capstone Competition',
    short: [
      'Argue a live case against an AI opposing counsel that raises real legal issues and challenges weak reasoning.',
      'An AI judge scores legal reasoning, evidence use and rebuttal handling against a fixed rubric, returning a score with feedback.',
    ],
    highlights: [
      'Building a courtroom simulation where a lawyer or law student takes the advocate role — presenting arguments, handling counterarguments, and defending a position against an AI opposing counsel.',
      'Developing the opposing-counsel agent to argue the other side properly: raising relevant legal issues, challenging weak reasoning, and responding in context rather than replying like a chatbot.',
      'Adding an AI judge that scores legal reasoning, argument strength, evidence use, and rebuttal handling against a defined rubric, returning a performance score with detailed feedback.',
      'Covering the full moot court cycle — case briefing, oral arguments, judicial questioning, rebuttals, and final judgment — so the practice is repeatable without a human opponent.',
    ],
  },
  {
    id: 'dev-signal',
    index: '03',
    title: 'Dev Signal',
    kicker: 'LLM PIPELINE · SAAS · MARKET RESEARCH',
    meta: 'Full-Stack AI Platform',
    period: '2026',
    repo: 'https://github.com/farhan-hash404/Dev-Signal-',
    tagline:
      'Mines developer forums for real complaints, then turns the recurring ones into scored pain points, product ideas, and full PRDs.',
    stack: ['Next.js', 'TypeScript', 'FastAPI', 'Gemini', 'PostgreSQL', 'Celery', 'Redis'],
    visual: 'signal',
    short: [
      'Async scrapers pull discussions from developer subreddits and Stack Overflow, then a two-pass Gemini pipeline turns them into scored pain points.',
      'A second pass generates SaaS product ideas and writes full PRDs — features, metrics, tech stack and competitors.',
    ],
    highlights: [
      'Built an automated discovery pipeline that replaces manual forum trawling: async HTTPX scrapers pull top discussions across targeted subreddits (r/webdev, r/SaaS, r/programming) and the Stack Overflow API.',
      'Designed a two-pass Gemini pipeline — pass one extracts concrete pain points with severity, sentiment and frequency; pass two turns the validated ones into targeted SaaS product ideas.',
      'Generated full Product Requirement Documents per idea, covering overview, problem statement, success metrics, tiered features, tech architecture, user stories and competitor analysis.',
      'Modelled the domain in SQLAlchemy 2.0 with UUID keys across analyses, pain points, ideas, PRDs, trends and competitors, backed by Postgres with Alembic migrations.',
      'Served it behind FastAPI with Celery and Redis handling long scrape jobs, and a Next.js 16 dashboard with client-side fallbacks so the UI stays up even when the backend is unreachable.',
    ],
  },
  {
    id: 'stick-fighter',
    index: '04',
    title: 'Stick Fighter',
    kicker: 'REINFORCEMENT LEARNING · PPO · TYPESCRIPT',
    meta: 'Personal Project',
    period: '2025',
    tagline:
      "A 2D fighting game whose opponent isn't scripted and isn't a pre-trained checkpoint — it runs PPO live in the browser, learning from you mid-fight.",
    stack: ['TypeScript', 'HTML5 Canvas', 'Vite', 'PPO', 'PyTorch', 'Gymnasium'],
    visual: 'ppo',
    live: true,
    actions: [
      { label: 'Visit site', href: 'https://stickfighterio.netlify.app/', icon: 'external' },
      { label: 'Live demo', href: 'https://stickfighterio.netlify.app/', icon: 'external' },
      { label: 'GitHub', href: 'https://github.com/farhan-hash404/Stick-Fighter', icon: 'github' },
    ],
    short: [
      'The opponent runs real PPO live in the browser — network, backprop and Adam all hand-rolled, 51 KB, no ML libraries.',
      'It learns from you mid-fight: 12/12 rounds won in 258 frames, up from 11/12 in 619 with the scripted prior stripped off.',
    ],
    highlights: [
      'Hand-rolled the entire neural network — Linear layers, manual backprop, Adam — with no TensorFlow.js, ONNX or WASM, shipping the whole game and agent in 51 KB (17 KB gzipped) with zero runtime dependencies.',
      'Implemented real PPO on an actor-critic MLP (46-dim observation → 2×64 tanh trunk → 15-action policy head + value head): GAE(λ) advantages, clipped surrogate objective, entropy bonus, grad-norm clipping and target-KL early stopping, updating every 128 frames so learning is visible mid-fight.',
      'Solved cold start with a scripted aggression prior injected as a decaying additive logit bias — dangerous from round one, and never entering the gradient — with learned weights persisted to localStorage so the opponent remembers you.',
      'Debugged a PPO correctness bug where the behaviour and optimised policies diverged, silently pinning entropy at the uniform ceiling (ln 15) so nothing was learned despite healthy-looking metrics; the fix moved value loss 287 → 0.45 and approx-KL 0.46 → 0.003.',
      'Found a frame-data exploit in the fight engine — heavy attacks commit for 16 frames but only activate a hitbox at frame 8, so 7-frame jabs cancel them via hitstun — and rewrote the AI move priority around it, alongside fixes to shield immunity and order-dependent simultaneous-attack resolution.',
    ],
  },
]

/* Revealed by the "See more" toggle under the featured showcase. */
export const sideProjects = [
  {
    id: 'kidney-cnn',
    index: '05',
    title: 'Kidney Disease Classification',
    kicker: 'DEEP LEARNING · COMPUTER VISION',
    repo: 'https://github.com/farhan-hash404/Kidney-Disease-Classification',
    body: 'A CNN trained to classify kidney disease from medical scan images — the full pipeline from preprocessing and augmentation through to evaluation, tuned to reduce false negatives on clinical-style data.',
    stack: ['Python', 'TensorFlow', 'Keras', 'CNN'],
  },
  {
    id: 'wine-quality',
    index: '06',
    title: 'Wine Quality Analysis',
    kicker: 'MACHINE LEARNING · DATA ANALYSIS',
    repo: 'https://github.com/farhan-hash404/Wine-Quality-Analysis',
    body: 'Exploratory analysis and predictive modelling over physicochemical wine measurements — feature correlation, distribution analysis, and classification of quality scores with comparative model evaluation.',
    stack: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib'],
  },
]

export const experienceIntro =
  'Capstone AI training, final-year research, and self-driven builds — the path from classical ML into production agent systems.'

export const highlightCards = [
  {
    label: 'Programme',
    title: 'AI / Agentic AI Capstone',
    meta: 'GIKI — Ghulam Ishaq Khan Institute · 2026',
    accent: true,
  },
  {
    label: 'Education',
    title: 'BS Computer Science',
    meta: 'University of Peshawar · 2022 – 2026',
  },
]

export const timeline = [
  {
    id: 'giki',
    role: 'AI Engineer — Capstone Programme',
    org: 'GIKI · Ghulam Ishaq Khan Institute',
    location: 'Pakistan · Hybrid',
    period: '2026 — Present',
    current: true,
    bullets: [
      'Building an AI-powered moot court platform where law students argue cases in real time against an opposing-counsel LLM agent.',
      'Developing an autonomous AI judge agent that scores argument quality, legal reasoning, and rebuttal strength with structured feedback.',
      'Architecting the multi-agent conversation flow and evaluation rubric to keep debate turns contextual and consistently graded.',
    ],
  },
  {
    id: 'fyp',
    role: 'Final Year Project — Multi-Agent Systems',
    org: 'University of Peshawar',
    location: 'Peshawar · Team of 2',
    period: '2025 — 2026',
    bullets: [
      'Designed a multi-agent Generative AI system where specialised agents research, outline, draft, and refine long-form content.',
      'Implemented LangGraph orchestration and state handoff between agents for coherent, structured output from one prompt.',
      'Served the pipeline behind a FastAPI backend with a Next.js interface for non-technical users.',
    ],
  },
  {
    id: 'ml-practice',
    role: 'Deep Learning & Machine Learning Practice',
    org: 'Self-directed',
    location: 'Remote',
    period: '2025',
    bullets: [
      'Trained a CNN for kidney disease classification, tuning architecture and hyperparameters to reduce false negatives.',
      'Built an RL agent for a stick-fighter game — reward design, action space, and win-rate tracking across episodes.',
      'Shipped churn prediction, URL phishing detection, and house price regression models with full evaluation pipelines.',
    ],
  },
  {
    id: 'navttc',
    role: 'MERN Stack Development',
    org: 'NAVTTC · National Vocational & Technical Training Commission',
    location: 'Pakistan',
    period: 'Training',
    bullets: [
      'Full-stack web development across MongoDB, Express.js, React, and Node.js.',
      'REST API design and integration, plus modern JavaScript and Next.js fundamentals.',
    ],
  },
  {
    id: 'smit',
    role: 'Web and App Development',
    org: 'Saylani Mass IT Training (SMIT)',
    location: 'Pakistan',
    period: 'Training',
    bullets: [
      'Foundations in web and application development, covering front-end and back-end delivery.',
    ],
  },
]

export const stack = [
  {
    group: 'Generative AI',
    items: [
      'LangChain',
      'LangGraph',
      'LLM Integration',
      'Multi-Agent Systems',
      'Prompt Engineering',
      'RAG',
    ],
  },
  {
    group: 'Deep Learning',
    items: ['TensorFlow', 'Keras', 'CNNs', 'NLP', 'Neural Networks', 'Reinforcement Learning'],
  },
  {
    group: 'AI / ML',
    items: [
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Feature Engineering',
      'Model Evaluation',
    ],
  },
  {
    group: 'Backend & APIs',
    items: ['FastAPI', 'Flask', 'Streamlit', 'REST API Design'],
  },
  {
    group: 'Web',
    items: ['React', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript'],
  },
  {
    group: 'Tools & Infra',
    items: ['Python', 'Git & GitHub', 'Docker', 'Jupyter', 'Redis', 'PostgreSQL', 'n8n'],
  },
]

export const certifications = [
  {
    title: 'Fundamentals of Deep Learning',
    issuer: 'NVIDIA · Coursera',
    tag: 'Deep Learning',
  },
  {
    title: 'Fundamentals of Machine Learning',
    issuer: 'NVIDIA · Coursera',
    tag: 'Machine Learning',
  },
  {
    title: 'AI / Agentic AI Capstone Program',
    issuer: 'GIKI — Ghulam Ishaq Khan Institute · 2026',
    tag: 'Agentic AI',
    accent: true,
  },
  {
    title: 'MERN Stack Development',
    issuer: 'NAVTTC · National Vocational & Technical Training Commission',
    tag: 'Full Stack',
  },
  {
    title: 'Web and App Development',
    issuer: 'Saylani Mass IT Training (SMIT)',
    tag: 'Web',
  },
]

export const education = {
  degree: 'BS Computer Science',
  school: 'University of Peshawar, Pakistan',
  period: '2022 – 2026',
  notes: [
    'All 8 semesters completed; degree awaiting official conferral. Available for full-time roles immediately.',
    'Relevant coursework: Machine Learning · Deep Learning · Data Structures & Algorithms · Databases · Software Engineering.',
    'Final Year Project: Multi-Agent Blog Generation System using LLM agent orchestration.',
  ],
}

export const languages = [
  { name: 'English', level: 'Professional' },
  { name: 'Urdu', level: 'Native' },
  { name: 'Pashto', level: 'Native' },
]

export const careerFocus =
  'Actively pursuing AI/ML Engineer roles with a focus on Generative AI and Agentic AI systems. Planning postgraduate specialisation in GenAI and Agentic AI.'

export const contactLinks = [
  {
    id: 'email',
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: 'mail',
    primary: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: '/in/muhammad-farhan',
    href: profile.linkedin,
    icon: 'linkedin',
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: `@${profile.githubHandle}`,
    href: profile.github,
    icon: 'github',
    external: true,
  },
  {
    id: 'phone',
    label: 'Phone',
    value: profile.phone,
    href: profile.phoneHref,
    icon: 'phone',
  },
]
