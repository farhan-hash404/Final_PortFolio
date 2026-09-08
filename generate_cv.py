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
        
        # Header / running top line
        # Only on page 2 and beyond, or on all pages like the original:
        # Original has: (53.9, 806.0): "Muhammad Farhan | farhan43509@gmail.com", right aligned "Page X"
        # Note: A4 height is ~841.89 pt. 806 pt is ~35pt from top.
        y_pos = 812
        self.drawString(54, y_pos, "Muhammad Farhan  |  farhan43509@gmail.com")
        page_text = f"Page {self._pageNumber}"
        self.drawRightString(541, y_pos, page_text)
        self.restoreState()

def build_pdf(filename="public/Muhammad-Farhan-CV.pdf"):
    # Target 2 pages cleanly
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=48,
        rightMargin=48,
        topMargin=42,
        bottomMargin=36,
    )

    styles = getSampleStyleSheet()

    # Base colors matching original
    c_primary = colors.HexColor("#141414")
    c_section = colors.HexColor("#2f4858")
    c_sub = colors.HexColor("#4a4a4a")
    c_link = colors.HexColor("#0d6efd") # sleek clean blue for clickable links
    c_accent_link = colors.HexColor("#1d638f")

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

    proof_link_style = 'color="#0969da"; text-decoration: underline;'

    story = []

    # --- Header ---
    story.append(Paragraph("Muhammad Farhan", name_style))
    story.append(Paragraph(
        "AI Engineer — LLMs &amp; Agentic Systems &nbsp;|&nbsp; Generative AI &nbsp;|&nbsp; Python &nbsp;|&nbsp; FastAPI",
        subtitle_style
    ))
    story.append(Paragraph(
        'Peshawar, Pakistan &nbsp;&nbsp;&nbsp;+92 334 9184114 &nbsp;&nbsp;&nbsp;'
        '<a href="mailto:farhan43509@gmail.com" color="#2f4858">farhan43509@gmail.com</a> &nbsp;&nbsp;&nbsp;'
        '<a href="https://github.com/farhan-hash404" color="#2f4858">github.com/farhan-hash404</a> &nbsp;&nbsp;&nbsp;'
        '<a href="https://www.linkedin.com/in/muhammad-farhan-5164a227a/" color="#2f4858">linkedin.com/in/muhammad-farhan-5164a227a</a>',
        contact_style
    ))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#dcdcdc"), spaceAfter=5, spaceBefore=1))

    # --- Professional Summary ---
    story.append(Paragraph("PROFESSIONAL SUMMARY", section_style))
    story.append(Paragraph(
        "Computer Science graduate and self-driven AI Engineer specialising in LLMs and Agentic AI systems, with 1+ year of "
        "hands-on experience designing and deploying multi-agent architectures using LangChain and LangGraph. Built agentic "
        "workflows end to end — autonomous content-generation pipelines with evaluation gates, real-time conversational agents "
        "that assess human argument, and LLM pipelines that mine community discussion into validated product specifications — "
        "served behind production-style FastAPI endpoints. Placed <b>Top 5 in the GIKI Capstone Competition</b> (Advanced AI / "
        "Agentic AI Bootcamp) with <b>MootCourtSimulator</b>. Grounded in classical ML and deep learning (CNNs, reinforcement learning, "
        "predictive modelling), giving depth beneath the agentic work rather than prompt-level familiarity alone.",
        body_style
    ))

    # --- Technical Skills ---
    story.append(Paragraph("TECHNICAL SKILLS", section_style))
    skills_data = [
        [Paragraph("Generative AI", skill_label_style),
         Paragraph("LLM Integration &bull; Multi-Agent Systems &bull; Agent Orchestration &bull; Prompt Engineering &bull; LangChain &bull; LangGraph &bull; Google Gemini &bull; RAG", skill_val_style)],
        [Paragraph("AI / ML", skill_label_style),
         Paragraph("Predictive Modelling &bull; Classification &amp; Regression &bull; Feature Engineering &bull; Model Evaluation (Accuracy, Precision, Recall, F1, ROC-AUC) &bull; Scikit-learn &bull; Pandas &bull; NumPy &bull; Matplotlib", skill_val_style)],
        [Paragraph("Deep Learning", skill_label_style),
         Paragraph("CNNs &bull; NLP &bull; Neural Networks &bull; Reinforcement Learning (PPO) &bull; TensorFlow / Keras &bull; PyTorch", skill_val_style)],
        [Paragraph("Backend &amp; APIs", skill_label_style),
         Paragraph("FastAPI &bull; REST API Design &bull; Celery &bull; Redis &bull; Streamlit &bull; Flask", skill_val_style)],
        [Paragraph("Web", skill_label_style),
         Paragraph("Next.js &bull; React &bull; TypeScript &bull; Node.js &bull; Express.js &bull; JavaScript &bull; Tailwind CSS", skill_val_style)],
        [Paragraph("Data", skill_label_style),
         Paragraph("PostgreSQL &bull; SQLAlchemy &bull; MongoDB &bull; SQLite &bull; Qdrant", skill_val_style)],
        [Paragraph("Tools &amp; Infra", skill_label_style),
         Paragraph("Python (Advanced) &bull; Git &amp; GitHub &bull; Docker &bull; Jupyter &bull; Vite &bull; n8n", skill_val_style)],
        [Paragraph("Languages", skill_label_style),
         Paragraph("English (Professional) &bull; Urdu (Native) &bull; Pashto (Native)", skill_val_style)],
    ]
    t = Table(skills_data, colWidths=[90, 409])
    t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 0.8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.8),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t)
    story.append(Spacer(1, 3))

    # --- Featured Projects ---
    story.append(Paragraph("FEATURED PROJECTS", section_style))

    # Project 1: AI Content Factory
    story.append(Paragraph("<b>AI Content Factory</b>", project_title_style))
    story.append(Paragraph("Final Year Project (Team of 2) &nbsp;|&nbsp; 2025 – 2026 &nbsp;|&nbsp; Python, LangGraph, LangChain, LLMs, FastAPI, Next.js", project_meta_style))
    story.append(Paragraph("&bull; Built an orchestrator agent that takes a single topic, searches the web for authoritative sources, synthesises the research and produces a structured content outline for downstream agents.", bullet_style))
    story.append(Paragraph("&bull; Added a blog generation agent that drafts the full article against that research and outline, keeping output factually consistent with the sources rather than free-generating from the prompt.", bullet_style))
    story.append(Paragraph("&bull; Gated every draft behind an evaluation agent scoring factual accuracy, source reliability, structure, readability, originality and hallucination; failing drafts loop back for regeneration until they clear the threshold.", bullet_style))
    story.append(Paragraph("&bull; Attached generated imagery to approved articles, then wired a repurposing pipeline producing a YouTube Short, podcast, video script, X post and LinkedIn post from each one.", bullet_style))
    story.append(Spacer(1, 3))

    # Project 2: MootCourtSimulator
    honorable_mention_url = "https://raw.githubusercontent.com/farhan-hash404/Final_PortFolio/master/public/certificates/certificate-of-honorable-mention.jpg"
    gik_completion_url = "https://raw.githubusercontent.com/farhan-hash404/Final_PortFolio/master/public/certificates/gik-advanced-ai-bootcamp-completion.jpg"
    nv_dl_url = "https://coursera.org/verify/XHB4QTIBGXXX"
    nv_ml_url = "https://coursera.org/verify/I5ZRELZMVZYV"

    story.append(Paragraph("<b>MootCourtSimulator — AI Moot Court Simulator</b>", project_title_style))
    story.append(Paragraph(
        'Capstone Project, GIKI &nbsp;|&nbsp; 2026 – Present &nbsp;|&nbsp; Python, LLMs, Multi-Agent Architecture, FastAPI<br/>'
        f'<b>Achievement:</b> Top 5 — GIKI Capstone Competition, Advanced AI / Agentic AI Bootcamp &nbsp;'
        f'<a href="{honorable_mention_url}" color="#0969da"><b>[View Certificate &rarr;]</b></a><br/>'
        '<a href="https://github.com/farhan-hash404/MootCourtSimulator" color="#2f4858">github.com/farhan-hash404/MootCourtSimulator</a>',
        project_meta_style
    ))
    story.append(Paragraph("&bull; Built a courtroom simulation where a lawyer or law student takes the advocate role, presenting arguments, handling counterarguments and defending a position against an AI opposing counsel.", bullet_style))
    story.append(Paragraph("&bull; Developed the opposing-counsel agent to argue the other side properly — raising relevant legal issues, challenging weak reasoning and responding in context rather than replying like a chatbot.", bullet_style))
    story.append(Paragraph("&bull; Added an AI judge scoring legal reasoning, argument strength, evidence use and rebuttal handling against a defined rubric, returning a performance score with detailed feedback.", bullet_style))
    story.append(Paragraph("&bull; Covered the full moot court cycle: case briefing, oral arguments, judicial questioning, rebuttals and final judgment, making practice repeatable without a human opponent.", bullet_style))

    story.append(PageBreak())

    # --- Page 2 ---

    # Project 3: Dev Signal
    story.append(Paragraph("<b>Dev Signal — Pain-Point Discovery &amp; PRD Platform</b>", project_title_style))
    story.append(Paragraph(
        'Full-Stack AI Platform &nbsp;|&nbsp; 2026 &nbsp;|&nbsp; Next.js, TypeScript, FastAPI, Google Gemini, PostgreSQL, Celery, Redis<br/>'
        '<a href="https://github.com/farhan-hash404/Dev-Signal-" color="#2f4858">github.com/farhan-hash404/Dev-Signal-</a>',
        project_meta_style
    ))
    story.append(Paragraph("&bull; Built an automated discovery pipeline replacing manual forum research: async HTTPX scrapers pull top discussions across targeted subreddits (r/webdev, r/SaaS, r/programming) and the Stack Overflow API.", bullet_style))
    story.append(Paragraph("&bull; Designed a two-pass Gemini pipeline — pass one extracts concrete pain points with severity, sentiment and frequency; pass two turns validated pain points into targeted SaaS product ideas.", bullet_style))
    story.append(Paragraph("&bull; Generated full Product Requirement Documents per idea covering overview, problem statement, success metrics, tiered features, tech architecture, user stories and competitor analysis.", bullet_style))
    story.append(Paragraph("&bull; Modelled the domain in SQLAlchemy 2.0 with UUID keys across analyses, pain points, ideas, PRDs, trends and competitors, backed by PostgreSQL with Alembic migrations.", bullet_style))
    story.append(Paragraph("&bull; Served it behind FastAPI with Celery and Redis handling long-running scrape jobs, and a Next.js dashboard with client-side fallbacks so the UI stays available when the backend is unreachable.", bullet_style))
    story.append(Spacer(1, 3))

    # Project 4: Stick Fighter
    story.append(Paragraph("<b>Stick Fighter — In-Browser Reinforcement Learning</b>", project_title_style))
    story.append(Paragraph(
        'Personal Project &nbsp;|&nbsp; 2025 &nbsp;|&nbsp; TypeScript, HTML5 Canvas, Vite, PyTorch, Gymnasium<br/>'
        '<a href="https://github.com/farhan-hash404/Stick-Fighter" color="#2f4858">github.com/farhan-hash404/Stick-Fighter</a>',
        project_meta_style
    ))
    story.append(Paragraph("&bull; Hand-rolled the entire neural network (Linear layers, manual backpropagation, Adam) with no TensorFlow.js, ONNX or WASM, shipping the game and agent in 51 KB with zero runtime dependencies.", bullet_style))
    story.append(Paragraph("&bull; Implemented real PPO on an actor-critic MLP (46-dim observation, 2x64 tanh trunk, 15-action policy head plus value head) with GAE advantages, clipped surrogate objective, entropy bonus, gradient-norm clipping and target-KL early stopping, updating every 128 frames so learning is visible mid-fight.", bullet_style))
    story.append(Paragraph("&bull; Solved cold start with a scripted aggression prior injected as a decaying additive logit bias that never enters the gradient, persisting learned weights to localStorage across sessions.", bullet_style))
    story.append(Paragraph("&bull; Debugged a PPO correctness bug where behaviour and optimised policies diverged, pinning entropy at the uniform ceiling so nothing was learned despite healthy-looking metrics; the fix moved value loss 287 to 0.45 and approximate KL 0.46 to 0.003.", bullet_style))
    story.append(Paragraph("&bull; Validated by a 42-check headless suite running the shipped code: with the scripted prior stripped, rounds won improved 11/12 to 12/12 and frames-to-win 619 to 258.", bullet_style))
    story.append(Spacer(1, 3))

    # Project 5: Kidney Disease Classification
    story.append(Paragraph("<b>Kidney Disease Classification</b>", project_title_style))
    story.append(Paragraph(
        'Deep Learning / Computer Vision &nbsp;|&nbsp; 2025 &nbsp;|&nbsp; Python, TensorFlow / Keras, CNN, NumPy, Matplotlib<br/>'
        '<a href="https://github.com/farhan-hash404/Kidney-Disease-Classification" color="#2f4858">github.com/farhan-hash404/Kidney-Disease-Classification</a>',
        project_meta_style
    ))
    story.append(Paragraph("&bull; Trained a Convolutional Neural Network to classify kidney disease from medical scan images, covering the full pipeline from image preprocessing and augmentation through training and evaluation.", bullet_style))
    story.append(Paragraph("&bull; Tuned architecture and hyperparameters, benchmarking with accuracy, precision, recall and confusion-matrix analysis to reduce false negatives on clinical-style data.", bullet_style))
    story.append(Spacer(1, 3))

    # Project 6: Wine Quality Analysis
    story.append(Paragraph("<b>Wine Quality Analysis</b>", project_title_style))
    story.append(Paragraph(
        'Machine Learning / Data Analysis &nbsp;|&nbsp; Python, Pandas, Scikit-learn, Matplotlib<br/>'
        '<a href="https://github.com/farhan-hash404/Wine-Quality-Analysis" color="#2f4858">github.com/farhan-hash404/Wine-Quality-Analysis</a>',
        project_meta_style
    ))
    story.append(Paragraph("&bull; Performed exploratory analysis over physicochemical wine measurements, covering feature correlation, distribution analysis and outlier handling.", bullet_style))
    story.append(Paragraph("&bull; Built and compared classification models for quality scoring, evaluating with accuracy, precision, recall and confusion-matrix analysis.", bullet_style))
    story.append(Spacer(1, 3))

    # --- Education ---
    story.append(Paragraph("EDUCATION", section_style))
    story.append(Paragraph("<b>BS Computer Science</b>", project_title_style))
    story.append(Paragraph("University of Peshawar, Pakistan &nbsp;|&nbsp; 2022 – 2026", project_meta_style))
    story.append(Paragraph("&bull; All 8 semesters completed; degree awaiting official conferral. Available for full-time roles immediately.", bullet_style))
    story.append(Paragraph("&bull; Relevant coursework: Machine Learning, Deep Learning, Data Structures &amp; Algorithms, Databases, Software Engineering.", bullet_style))
    story.append(Paragraph("&bull; Final Year Project: AI Content Factory — multi-agent content generation with an evaluation gate.", bullet_style))
    story.append(Spacer(1, 3))

    # --- Certifications & Training ---
    story.append(Paragraph("CERTIFICATIONS &amp; TRAINING", section_style))

    cert_items = [
        f'<b>Certificate of Honorable Mention — Top 5</b> (Project: "MootCourtSimulator", out of 35 projects) &bull; GIK Institute &amp; Asher Aziz Foundation (Aug 2026) &nbsp;<a href="{honorable_mention_url}" color="#0969da"><b>[View Proof &rarr;]</b></a>',
        f'<b>Certificate of Completion — Advanced AI Bootcamp</b> (Grade B+) &bull; GIK Institute &amp; Asher Aziz Foundation (Aug 2026) &nbsp;<a href="{gik_completion_url}" color="#0969da"><b>[View Proof &rarr;]</b></a>',
        f'<b>Fundamentals of Deep Learning</b> &bull; NVIDIA / Whizlabs (Offered via Coursera, Jun 2026) &nbsp;<a href="{nv_dl_url}" color="#0969da"><b>[Verify Coursera &rarr;]</b></a>',
        f'<b>Fundamentals of Machine Learning</b> &bull; NVIDIA / Whizlabs (Offered via Coursera, Jun 2026) &nbsp;<a href="{nv_ml_url}" color="#0969da"><b>[Verify Coursera &rarr;]</b></a>',
        '<b>MERN Stack Development</b> &bull; NAVTTC (National Vocational &amp; Technical Training Commission)',
        '<b>Web and App Development</b> &bull; Saylani Mass IT Training (SMIT)',
    ]
    for c_item in cert_items:
        story.append(Paragraph(f"&bull; {c_item}", bullet_style))

    story.append(Spacer(1, 3))

    # --- Career Focus ---
    story.append(Paragraph("CAREER FOCUS", section_style))
    story.append(Paragraph(
        "Actively pursuing AI/ML Engineer roles with a focus on Generative AI and Agentic AI systems. "
        "Planning postgraduate specialisation in GenAI and Agentic AI.",
        body_style
    ))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Built {filename} successfully.")

if __name__ == "__main__":
    build_pdf()
    doc = pypdf.PdfReader("public/Muhammad-Farhan-CV.pdf")
    print("Generated PDF page count:", len(doc.pages))
