from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas.incident import IncidentInput

from agents.classifier import classifier_agent
from agents.mitre import mitre_agent
from agents.severity import severity_agent
from agents.reporter import report_agent
from agents.responder import respond_agent
from agents.auto_response import auto_response_agent

from utils.wazuh import push_to_wazuh
from utils.pdf_report import generate_pdf

app = FastAPI(title="SOC AI Incident Response API")

# 🔥 CORS FIX (THIS IS THE KEY)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://127.0.0.1:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_incident(incident: IncidentInput):
    description = incident.description

    classification = (await classifier_agent.run(description)).output
    mitre = (await mitre_agent.run(description)).output
    severity = (await severity_agent.run(description)).output
    report = (await report_agent.run(description)).output
    response = (await respond_agent.run(description)).output
    auto_actions = (await auto_response_agent.run(description)).output

    result = {
        "classification": classification,
        "mitre": mitre,
        "severity": severity,
        "report": report,
        "response": response,
        "auto_response": auto_actions,
    }

    # Optional integrations
    generate_pdf(result)
    push_to_wazuh(result)

    return result
