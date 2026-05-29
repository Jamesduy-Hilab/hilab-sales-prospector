# HILAB Sales Prospector (B2B Lead Intelligence & Outreach Squad)

An automated, highly optimized agentic B2B Sales Development Representative (SDR) pipeline. It researches companies, qualifications leads using BANT & MEDDIC, maps key stakeholders, and drafts hyper-personalized outreach sequences. 

Designed specifically for B2B software engineering agencies, E-commerce platforms, and digital marketing consultancies.

---

## 🚀 Key Features

1. **Zero-Dependency Web Scraper (`analyze_prospect.py`):** Fast, lightweight HTML parser using only core Python libraries (no BeautifulSoup, requests, or playwright). Detects tech stacks (Next.js, React, WordPress, HubSpot, Stripe), active hiring pipelines, corporate emails, phone numbers, and social links.
2. **Buying Committee Stakeholder Mapper (`contact_finder.py`):** Automatically parses team grids, employee cards, and standard JSON-LD Schema (`Person` / `Organization`) to map decision makers. Predicts buying roles (`Economic Buyer`, `Champion`, `Technical Evaluator`, `End User`, `Blocker`) and provides Google Index LinkedIn search queries.
3. **Calibrated Lead Scorer (`lead_scorer.py`):** Pure python scoring engine running standard BANT (Budget, Authority, Need, Timeline) and MEDDIC completeness metrics. Calibrated to prioritize agency/outsourcing fit (e.g., scoring higher on active developer recruitment bottlenecks).
4. **Branded DOCX Report Compiler (`generate_docx_report.js`):** A custom Node.js Markdown-to-DOCX compiler. Converts your raw markdown analyses into high-fidelity, styled Word documents (.docx) following HILAB Technology's official brand guidelines (colors, fonts, header wide logos, footer page numbering, and branded tables).
5. **Outreach Copier & Templates:** Blueprint outreach sequences (cold, warm, referral emails, meeting prep briefs, objection handlers) that draft copy-paste ready copy under 100 words.
6. **Agentic Skill Packaging (`SKILL.md`):** Packaged to be instantly dropped into modern AI agent environments (like Antigravity or Claude Code) as a custom system capability.

---

## 📁 Repository Structure

```
hilab-sales-prospector/
├── SKILL.md                 # System prompt & orchestration guide for AI Agents
├── README.md                # General usage documentation
├── .gitignore               # Ignored build & system files
├── resources/               # Branded HILAB assets
│   └── logo/                # Wide black and square red HILAB logo files
├── scripts/                 # Core execution scripts
│   ├── analyze_prospect.py  # Zero-dependency website crawler (Python)
│   ├── contact_finder.py    # Non-backtracking team & leadership parser (Python)
│   ├── lead_scorer.py       # Pure-python BANT & MEDDIC scoring logic (Python)
│   └── generate_docx_report.js # Branded HILAB DOCX report compiler (Node.js)
└── templates/               # Standardized outreach and proposal blueprints
    ├── meeting-prep.md
    ├── objection-playbook.md
    ├── outreach-cold.md
    ├── outreach-referral.md
    ├── outreach-warm.md
    └── proposal-template.md
```

---

## ⚙️ Standard CLI Installation & Usage

You can run these scripts directly in any terminal environment using python 3.x and Node.js.

### Clone the Repository
```bash
git clone https://github.com/Jamesduy-Hilab/hilab-sales-prospector.git
cd hilab-sales-prospector
```

### Step 1: Website Scraping & Firmographics Detection
Analyze a company website to extract tech stacks, emails, and job postings:
```bash
python3 scripts/analyze_prospect.py --url https://example.com > prospect.json
```

### Step 2: Stakeholder & Buying Committee Identification
Scan About/Team pages to map employee names, job titles, and LinkedIn profiles:
```bash
python3 scripts/contact_finder.py --url https://example.com > contacts.json
```

### Step 3: BANT + MEDDIC Lead Qualification
Pipe your extracted prospect data into the scoring engine to calculate the deal grade:
```bash
python3 scripts/lead_scorer.py prospect.json
```

### Step 4: Export to Branded HILAB Word Document (.docx)
Convert your prospect analysis Markdown report into a beautiful, styled, and branded HILAB Word document (.docx):
```bash
# Install the docx library dependency
npm install docx

# Run the compiler to convert Markdown to a branded HILAB Word Doc
node scripts/generate_docx_report.js --input PROSPECT-ANALYSIS.md --output HILAB_Report.docx
```

---

## 🤖 AI Agent Skill Integration (Antigravity & Claude Code)

This repository is formatted as a custom agentic **Skill**. If you are using an AI coding assistant:

1. Drop the `hilab-sales-prospector/` directory into your agent's custom skills folder (usually `~/.gemini/config/skills/` or `~/.claude/skills/`).
2. The agent will read `SKILL.md` on startup, automatically acquiring these B2B prospecting capabilities.
3. You can trigger it in natural language:
   * *"Analyze the website https://example.com to see if they are a good lead"*
   * *"Find decision makers and draft a LinkedIn pitch for https://example.com"*
   * *"Qualify this prospect and write a custom Next.js engineering email to their CTO"*

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
