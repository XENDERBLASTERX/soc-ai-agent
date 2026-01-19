# SOC AI Incident Triage & Response Assistant

This project is a full-stack **AI-powered SOC (Security Operations Center) assistant** designed to help analysts quickly triage, analyze, and respond to cybersecurity incidents.

The system takes a natural language incident description and produces:

* Incident classification
* MITRE ATT&CK mapping
* Severity assessment
* Detailed incident report
* Recommended response actions
* Automated response suggestions

The goal of this project is to **reduce analyst workload**, improve **response time**, and demonstrate how **agent-based generative AI systems** can be used in real-world cybersecurity workflows.

---

## Key Features

* 🧠 **Multi-agent AI pipeline** (Classifier, MITRE mapper, Severity scorer, Reporter, Responder)
* ⚡ **End-to-end incident analysis** from a single description
* 📊 **Clear SOC-style dashboard UI**
* 🧾 **Exportable incident report**
* 🔄 **Auto-response recommendations**
* 🛡️ Optional integrations:

  * PDF report generation
  * Wazuh SIEM integration

---

## Tech Stack

### Backend

* **FastAPI** – REST API
* **Pydantic AI** – Agent orchestration and validation
* **Python 3.10+**
* Modular AI agents for each SOC task

### Frontend

* **React + TypeScript**
* **Vite**
* **TailwindCSS + shadcn/ui**
* Clean SOC-style UX with loading and error states

---

## Project Structure

```
soc-ai-agent/
│
├── backend/
│   ├── app.py
│   ├── agents/
│   │   ├── classifier.py
│   │   ├── mitre.py
│   │   ├── severity.py
│   │   ├── reporter.py
│   │   ├── responder.py
│   │   └── auto_response.py
│   ├── schemas/
│   │   └── incident.py
│   └── utils/
│       ├── pdf_report.py
│       └── wazuh.py
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── config/
│   └── index.html
│
└── README.md
```

---

## How the System Works

1. User enters an incident description in the UI
2. Frontend sends the description to the backend `/analyze` endpoint
3. Backend runs multiple AI agents:

   * Classification agent
   * MITRE ATT&CK mapping agent
   * Severity scoring agent
   * Report generation agent
   * Response & auto-response agent
4. Backend returns a structured JSON response
5. Frontend renders the results in a SOC-style dashboard

---

## Setup Instructions (Local)

### Prerequisites

* Python **3.10 or higher**
* Node.js **18+**
* Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/XENDERBLASTERX/soc-ai-agent.git
cd soc-ai-agent
```

---

### 2. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
```

Start the backend:

```bash
python -m uvicorn app:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

Swagger docs:

```
http://127.0.0.1:8000/docs
```

---

### 3. Frontend Setup

Open a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:8080
```

---

## Usage

1. Open the frontend in your browser
2. Enter a cybersecurity incident description

   * Example:

     ```
     Multiple failed SSH login attempts detected from a single IP
     ```
3. Click **Analyze Incident**
4. View:

   * Classification
   * MITRE technique
   * Severity
   * Report
   * Recommended and automated responses

---

## Evaluation Alignment

This project satisfies the assignment requirements:

* ✅ Live full-stack application
* ✅ Clear real-world problem (SOC incident triage)
* ✅ Pydantic AI-based agent system
* ✅ Clean APIs and modular backend
* ✅ Polished frontend UX
* ✅ Proper validation and error handling
* ✅ End-to-end working demo

---

## Future Enhancements

* Authentication & role-based access
* Incident history persistence
* Streaming agent responses
* SOAR execution hooks
* Cloud deployment (Vercel + Render)

---

## Author

**Hemanth Vijayaraj**
Cybersecurity & AI Enthusiast
GitHub: [https://github.com/XENDERBLASTERX](https://github.com/XENDERBLASTERX)
