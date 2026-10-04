import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas
import pypdf

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            super().showPage()
        super().save()

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 7.0)
        self.setFillColor(colors.HexColor("#8a8a8a"))
        
        y_pos = 812
        self.drawString(54, y_pos, "Muhammad Farhan  |  farhan43509@gmail.com")
        page_text = f"Page {self._pageNumber}"
        self.drawRightString(541, y_pos, page_text)
        self.restoreState()

def build_pdf(filename="public/Muhammad-Farhan-CV.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=48,
        rightMargin=48,
        topMargin=42,
        bottomMargin=36,
    )

    styles = getSampleStyleSheet()

    c_primary = colors.HexColor("#141414")
    c_section = colors.HexColor("#2f4858")
    c_sub = colors.HexColor("#4a4a4a")

    name_style = ParagraphStyle(
        'Name',
        fontName='Helvetica-Bold',
        fontSize=19,
        leading=22,
        textColor=c_primary,
        spaceAfter=3,
    )

    subtitle_style = ParagraphStyle(
        'Subtitle',
        fontName='Helvetica',
        fontSize=9.8,
        leading=12.5,
        textColor=c_primary,
        spaceAfter=4,
    )

    contact_style = ParagraphStyle(
        'Contact',
        fontName='Helvetica',
        fontSize=8.1,
        leading=11,
        textColor=c_sub,
        spaceAfter=6,
    )

    section_style = ParagraphStyle(
        'SectionHeading',
        fontName='Helvetica-Bold',
        fontSize=9.2,
        leading=11.5,
        textColor=c_section,
        spaceBefore=7,
        spaceAfter=4,
        keepWithNext=True,
    )

    body_style = ParagraphStyle(
        'Body',
        fontName='Helvetica',
        fontSize=8.3,
        leading=11.2,
        textColor=c_primary,
        spaceAfter=4,
    )

    project_title_style = ParagraphStyle(
        'ProjectTitle',
        fontName='Helvetica-Bold',
        fontSize=9.0,
        leading=11.5,
        textColor=c_primary,
        keepWithNext=True,
    )

    project_meta_style = ParagraphStyle(
        'ProjectMeta',
        fontName='Helvetica-Oblique',
        fontSize=7.8,
        leading=10.2,
        textColor=c_sub,
        keepWithNext=True,
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        fontName='Helvetica',
        fontSize=8.1,
        leading=10.8,
        textColor=c_primary,
        leftIndent=12,
        firstLineIndent=-12,
        spaceAfter=2,
    )

    skill_label_style = ParagraphStyle(
        'SkillLabel',
        fontName='Helvetica-Bold',
        fontSize=8.0,
        leading=10.5,
        textColor=c_primary,
    )

    skill_val_style = ParagraphStyle(
        'SkillVal',
        fontName='Helvetica',
        fontSize=8.0,
        leading=10.5,
        textColor=c_primary,
    )

    story = []

    # --- Header ---
    story.append(Paragraph("Muhammad Farhan", name_style))
    story.append(Paragraph(
        "AI Engineer &mdash; LLMs &amp; Agentic Systems &middot; Generative AI &middot; Python &middot; FastAPI",
        subtitle_style
    ))
    story.append(Paragraph(
        'Peshawar, Pakistan &nbsp;|&nbsp; +92 334 9184114 &nbsp;|&nbsp; '
        '<a href="mailto:farhan43509@gmail.com" color="#0969da">farhan43509@gmail.com</a> &nbsp;|&nbsp; '
        '<a href="https://farhan-hash404.github.io/" color="#0969da">Portfolio</a> &nbsp;|&nbsp; '
        '<a href="https://github.com/farhan-hash404" color="#0969da">GitHub</a> &nbsp;|&nbsp; '
        '<a href="https://www.linkedin.com/in/muhammad-farhan-5164a227a/" color="#0969da">LinkedIn</a>',
        contact_style
    ))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#2f4858"), spaceAfter=5, spaceBefore=1))

    # --- Professional Summary ---
    story.append(Paragraph("PROFESSIONAL SUMMARY", section_style))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#2f4858"), spaceAfter=5, spaceBefore=1))
    story.append(Paragraph(
        "AI Engineer specialising in LLMs and Agentic AI systems, with 1+ year of hands-on experience and 10+ projects built &mdash; designing multi-agent architectures (LangChain, LangGraph) with real orchestration and state handoff, and serving them behind production-style FastAPI backends with Postgres, Redis, and Celery. IBM-certified in Generative AI Engineering and Top 5 of 35 at the GIKI Capstone Competition. Grounded in classical ML, deep learning, and reinforcement learning beneath the agentic work.",
        body_style
    ))

    # --- Technical Skills ---
    story.append(Paragraph("TECHNICAL SKILLS", section_style))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#2f4858"), spaceAfter=5, spaceBefore=1))
    skills_data = [
        [Paragraph("Generative AI / Agentic", skill_label_style),
         Paragraph("LLM Integration &middot; Multi-Agent Systems (LangChain, LangGraph) &middot; Prompt Engineering &middot; RAG &amp; Hybrid Search &middot; Model Context Protocol (MCP) &middot; Orchestration &amp; State Handoff &middot; Human-in-the-Loop &middot; Evaluation / Guardrail Design", skill_val_style)],
        [Paragraph("LLM Providers &amp; Infra", skill_label_style),
         Paragraph("OpenAI &middot; Google Gemini &middot; Anthropic Claude &middot; FastAPI", skill_val_style)],
        [Paragraph("Data &amp; Backend", skill_label_style),
         Paragraph("PostgreSQL (SQLAlchemy 2.0, Alembic) &middot; ChromaDB &middot; REST API Design &middot; Streamlit &middot; Flask", skill_val_style)],
        [Paragraph("Deep Learning &amp; ML", skill_label_style),
         Paragraph("CNNs &middot; NLP &middot; Reinforcement Learning (PPO) &middot; PyTorch &middot; TensorFlow / Keras &middot; Scikit-learn &middot; Feature Engineering &middot; Model Evaluation &middot; Pandas &middot; NumPy &middot; Matplotlib &middot; Seaborn", skill_val_style)],
        [Paragraph("Web Development", skill_label_style),
         Paragraph("Next.js &middot; React &middot; TypeScript &middot; JavaScript &middot; Tailwind CSS", skill_val_style)],
        [Paragraph("Tools &amp; Infra", skill_label_style),
         Paragraph("Python (Advanced) &middot; Git &amp; GitHub &middot; Docker / Docker Compose &middot; pytest &middot; MLflow &middot; Jupyter", skill_val_style)],
        [Paragraph("Languages", skill_label_style),
         Paragraph("English (Professional) &middot; Urdu (Native) &middot; Pashto (Native)", skill_val_style)],
    ]
    t = Table(skills_data, colWidths=[120, 379])
    t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 0.8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.8),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t)
    story.append(Spacer(1, 3))

    # --- Professional Experience ---
    story.append(Paragraph("PROFESSIONAL EXPERIENCE", section_style))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#2f4858"), spaceAfter=5, spaceBefore=1))
    
    story.append(Table([[Paragraph("<b>AI Engineer &middot; Capstone Programme, GIKI</b>", project_title_style), Paragraph("2026 &ndash; Present", ParagraphStyle('RightText', parent=project_title_style, alignment=2))]], colWidths=[350, 149]))
    story.append(Paragraph("<i>Ghulam Ishaq Khan Institute of Engineering Sciences &amp; Technology, Pakistan &middot; Hybrid</i>", project_meta_style))
    story.append(Paragraph("&bull; Building MootCourtSimulator, an AI-powered moot court platform where law students argue cases in real time against an opposing-counsel LLM agent.", bullet_style))
    story.append(Paragraph("&bull; Developing an autonomous AI judge agent that scores argument quality, legal reasoning, and rebuttal strength with structured feedback.", bullet_style))
    story.append(Paragraph("&bull; Architecting the multi-agent conversation flow and evaluation rubric that keep debate turns contextual and consistently graded &mdash; project selected among the Top 5 of 35 (Honorable Mention).", bullet_style))
    story.append(Spacer(1, 3))

    # --- Featured Projects ---
    story.append(Paragraph("FEATURED PROJECTS &mdash; LLM &amp; AGENTIC SYSTEMS", section_style))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#2f4858"), spaceAfter=5, spaceBefore=1))

    story.append(Paragraph("<b>MootCourtSimulator &mdash; AI Moot Court Platform &mdash; Capstone, GIKI</b>", project_title_style))
    story.append(Paragraph('<a href="https://github.com/farhan-hash404/MootCourtSimulator" color="#0969da">GitHub</a>', project_meta_style))
    story.append(Paragraph("<i>Stack: Python &middot; TypeScript &middot; React/Vite &middot; LangGraph &middot; FastAPI &middot; Express/Drizzle ORM &middot; PostgreSQL &middot; OpenAI (Whisper, GPT-4o, TTS) &middot; Docker</i>", project_meta_style))
    story.append(Paragraph("&bull; Building an AI courtroom where a law student argues a live case against an AI Opposing Counsel while an AI Judge scores the reasoning against a fixed rubric (legal reasoning, argument strength, evidence use, rebuttal handling), returning a performance score with detailed feedback.", bullet_style))
    story.append(Paragraph("&bull; Covers the full moot court cycle &mdash; case briefing, oral arguments, judicial questioning, rebuttals, and final judgment &mdash; via real-time voice streaming (Whisper transcription &rarr; GPT-4o reasoning &rarr; multi-voice TTS) on a 3-tier system (React/Vite client, Express/Drizzle API gateway, FastAPI/LangGraph AI service).", bullet_style))
    story.append(Paragraph("&bull; Designed a Hybrid RAG pipeline over a verified 53-provision Pakistani statutory corpus (Constitution 1973, PPC 1860, CrPC 1898, QSO 1984) &mdash; dense vector search fused with BM25 via Reciprocal Rank Fusion and LLM reranking, reaching 1.00 Hit@1 on legal query benchmarks &mdash; plus deterministic citation auditing that flags fabricated provisions in real time.", bullet_style))
    story.append(Paragraph("&bull; Built a reproducible LLMOps evaluation suite (MLflow-tracked) &mdash; 1.00 objection-decision recall, a 0/9 witness-fabrication rate, and 0/36 successful red-team prompt-injection attacks; containerised the full stack with Docker Compose.", bullet_style))
    story.append(Spacer(1, 3))

    story.append(Paragraph("<b>AI Content Factory &mdash; Multi-Agent Content Generation &amp; Evaluation System &mdash; FYP (Team of 2)</b>", project_title_style))
    story.append(Paragraph('<a href="https://github.com/farhan-hash404/AI-Content-Factory" color="#0969da">GitHub</a>', project_meta_style))
    story.append(Paragraph("<i>Stack: Python &middot; LangGraph &middot; LangChain &middot; FastAPI &middot; Next.js &middot; GPT-5-mini &middot; Gemini 2.5 Flash &middot; ChromaDB &middot; Tavily &middot; DeepEval</i>", project_meta_style))
    story.append(Paragraph("&bull; Built an orchestrator agent that researches a single topic from authoritative web sources and produces a structured outline; a blog agent then drafts the full article grounded in that research, not free-generated from the prompt.", bullet_style))
    
    story.append(PageBreak())

    story.append(Paragraph("&bull; Gated every draft behind an evaluation agent scoring factual accuracy, source reliability, structure, readability, originality, and hallucination &mdash; failing drafts loop back for regeneration until they clear the threshold (G-Eval + DeepEval, with a non-LLM citation verifier).", bullet_style))
    story.append(Paragraph("&bull; Implemented LangGraph state handoff with SQLite/Postgres checkpointing (crashed runs resume without repeating LLM calls), a Human-in-the-Loop outline editor, and parallel section writing via Send() fan-out &mdash; verified with a reproducible ablation experiment on repetition rates.", bullet_style))
    story.append(Paragraph("&bull; Attached generated imagery to approved articles and repurposed each into a YouTube Short, podcast, video script, X post, and LinkedIn post.", bullet_style))
    story.append(Spacer(1, 3))

    story.append(Paragraph("<b>Dev Signal &mdash; AI-Powered SaaS Market-Research &amp; PRD Generator &mdash; Full-Stack AI Platform</b>", project_title_style))
    story.append(Paragraph('<a href="https://github.com/farhan-hash404/Dev-Signal-" color="#0969da">GitHub</a>', project_meta_style))
    story.append(Paragraph("<i>Stack: Next.js 16 &middot; TypeScript &middot; FastAPI &middot; Gemini (2-pass) &middot; PostgreSQL (SQLAlchemy 2.0, Alembic) &middot; Celery &middot; Redis &middot; Docker Compose</i>", project_meta_style))
    story.append(Paragraph("&bull; Built an automated discovery pipeline &mdash; async HTTPX scrapers pull top discussions across r/webdev, r/SaaS, r/programming, and the Stack Overflow API.", bullet_style))
    story.append(Paragraph("&bull; Designed a two-pass Gemini pipeline &mdash; Pass 1 extracts concrete pain points with severity, sentiment, and frequency; Pass 2 turns validated ones into 3&ndash;5 targeted SaaS product ideas per run, each with a full PRD (overview, problem statement, success metrics, tiered features, tech architecture, user stories, competitor analysis).", bullet_style))
    story.append(Paragraph("&bull; Modelled the domain in SQLAlchemy 2.0 with UUID keys and Alembic migrations; served it behind FastAPI with Celery and Redis for long scrape jobs, and a Next.js 16 dashboard with client-side fallbacks so the UI stays up when the backend is unreachable.", bullet_style))
    story.append(Spacer(1, 3))

    story.append(Paragraph("DEEP LEARNING &amp; REINFORCEMENT LEARNING", section_style))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#2f4858"), spaceAfter=5, spaceBefore=1))

    story.append(Paragraph("<b>Stick Fighter &mdash; Live In-Browser Reinforcement Learning Game</b>", project_title_style))
    story.append(Paragraph('<a href="https://farhan-hash404.github.io/Stick-Fighter" color="#0969da">Live Demo</a>', project_meta_style))
    story.append(Paragraph("<i>Stack: TypeScript &middot; HTML5 Canvas &middot; Vite &middot; PPO &middot; PyTorch &middot; Gymnasium</i>", project_meta_style))
    story.append(Paragraph("&bull; Built a 2D fighting game whose opponent isn't scripted or pre-trained &mdash; it runs PPO live in the browser, learning from the player mid-fight; hand-rolled the network (manual backprop, Adam) with no TensorFlow.js, ONNX, or WASM, in a 51 KB bundle (17 KB gzipped).", bullet_style))
    story.append(Paragraph("&bull; Implemented real PPO on an actor-critic MLP (46-dim observation &rarr; 2&times;64 tanh trunk &rarr; 15-action policy head + value head) with GAE(&lambda;), clipped surrogate objective, entropy bonus, grad-norm clipping, and target-KL early stopping, updating every 128 frames, with a decaying scripted prior to solve cold start.", bullet_style))
    story.append(Paragraph("&bull; Debugged a PPO correctness bug where entropy stayed pinned at the uniform ceiling (ln 15) &mdash; the fix moved value loss 287 &rarr; 0.45 and approx-KL 0.46 &rarr; 0.003; also found and fixed a frame-data exploit in the fight engine.", bullet_style))
    story.append(Paragraph("&bull; With the scripted prior stripped, the learned agent won 12/12 rounds (vs. 11/12) in 258 frames (vs. 619) with 91 HP remaining (vs. 43), verified by a 43-check headless test suite.", bullet_style))
    story.append(Spacer(1, 3))

    story.append(Paragraph("OTHER ML PROJECTS", section_style))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#2f4858"), spaceAfter=5, spaceBefore=1))
    story.append(Paragraph("&bull; Customer Churn Prediction (Scikit-learn) &middot; URL Phishing Detection &middot; House Price Regression &mdash; models with full evaluation pipelines covering feature engineering, preprocessing, and metrics (accuracy, precision, recall, ROC-AUC, RMSE/R&sup2;).", bullet_style))
    story.append(Spacer(1, 3))

    story.append(Paragraph("EDUCATION", section_style))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#2f4858"), spaceAfter=5, spaceBefore=1))
    story.append(Table([[Paragraph("<b>BS Computer Science &middot; University of Peshawar, Pakistan</b>", project_title_style), Paragraph("2022 &ndash; 2026", ParagraphStyle('RightText', parent=project_title_style, alignment=2))]], colWidths=[400, 99]))
    story.append(Paragraph("&bull; All 8 semesters completed; degree awaiting official conferral. Available for full-time roles immediately.", bullet_style))
    story.append(Paragraph("&bull; Relevant coursework: Machine Learning &middot; Deep Learning &middot; Data Structures &amp; Algorithms &middot; Databases &middot; Software Engineering.", bullet_style))
    story.append(Paragraph("&bull; Final Year Project: AI Content Factory &mdash; multi-agent blog generation system using LLM agent orchestration (LangGraph).", bullet_style))
    story.append(Spacer(1, 3))

    story.append(Paragraph("CERTIFICATIONS &amp; TRAINING", section_style))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#2f4858"), spaceAfter=5, spaceBefore=1))
    
    cert_items = [
        'IBM Generative AI Engineering Professional Certificate (16 courses) &mdash; IBM &middot; Coursera &middot; Sep 2026 &nbsp;<a href="https://coursera.org/verify/professional-cert/S0S7Y8N3L4E2" color="#0969da">Verify Certificate</a>',
        'IBM Introduction to Computer Vision and Image Processing &mdash; IBM &middot; Coursera &middot; Sep 2026 &nbsp;<a href="https://coursera.org/verify/I5ZRELZMVZYV" color="#0969da">Verify Certificate</a>',
        'Top 5 Honorable Mention &mdash; GIKI Capstone Competition (MootCourtSimulator), Asher Aziz Foundation &middot; Aug 2026 &nbsp;<a href="https://raw.githubusercontent.com/farhan-hash404/Final_PortFolio/master/public/certificates/certificate-of-honorable-mention.jpg" color="#0969da">View Certificate</a>',
        'Advanced AI Bootcamp (Grade B+) &mdash; GIK Institute &amp; Asher Aziz Foundation &middot; Aug 2026 &nbsp;<a href="https://raw.githubusercontent.com/farhan-hash404/Final_PortFolio/master/public/certificates/gik-advanced-ai-bootcamp-completion.jpg" color="#0969da">View Certificate</a>',
        'MERN Stack Development (Grade A+) &mdash; NAVTTC &middot; Prime Minister\'s Youth Skills Development Program &nbsp;<a href="https://raw.githubusercontent.com/farhan-hash404/Final_PortFolio/master/public/certificates/navttc-mern-stack-development.jpg" color="#0969da">View Certificate</a>',
        'Web and App Development &mdash; Saylani Mass IT Training (SMIT) &nbsp;<a href="https://raw.githubusercontent.com/farhan-hash404/Final_PortFolio/master/public/certificates/saylani-web-and-mobile-app-development.jpg" color="#0969da">View Certificate</a>',
        'Fundamentals of Deep Learning &middot; Fundamentals of Machine Learning &mdash; NVIDIA (Coursera)',
    ]
    for c_item in cert_items:
        story.append(Paragraph(f"&bull; {c_item}", bullet_style))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Built {filename} successfully.")

if __name__ == "__main__":
    build_pdf()
    doc = pypdf.PdfReader("public/Muhammad-Farhan-CV.pdf")
    print("Generated PDF page count:", len(doc.pages))
