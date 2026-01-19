from pathlib import Path
from dotenv import load_dotenv
import os

# --- ENV LOADING (PROVEN WORKING METHOD) ---
env_file = Path(__file__).parent / ".env"
load_dotenv(env_file)

if not os.getenv("OPENAI_API_KEY"):
    raise RuntimeError("OPENROUTER_API_KEY not loaded")

if not os.getenv("OPENAI_BASE_URL"):
    raise RuntimeError("OPENAI_BASE_URL not loaded")

# --- FASTAPI ---
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas.incident import IncidentInput

# --- AGENTS ---
from agents.classifier import classifier_agent
from agents.mitre import mitre_agent
from agents.severity import severity_agent
from agents.reporter import report_agent
from agents.responder import respond_agent
from agents.auto_response import auto_response_agent

# --- UTILS ---
from utils.wazuh import push_to_wazuh
from utils.pdf_report import generate_pdf

import asyncio

app = FastAPI(title="SOC AI Incident Response API")

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

    results = await asyncio.gather(
        classifier_agent.run(description),
        mitre_agent.run(description),
        severity_agent.run(description),
        report_agent.run(description),
        respond_agent.run(description),
        auto_response_agent.run(description),
    )

    classification, mitre, severity, report, response, auto_actions = [
        r.output for r in results
    ]

    result = {
        "classification": classification,
        "mitre": mitre,
        "severity": severity,
        "report": report,
        "response": response,
        "auto_response": auto_actions,
    }

    try:
        generate_pdf(result)
    except Exception as e:
        print("PDF generation failed:", e)

    try:
        push_to_wazuh(result)
    except Exception as e:
        print("Wazuh push failed:", e)

    return result
