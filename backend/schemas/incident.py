from pydantic import BaseModel

class IncidentInput(BaseModel):
    description: str

class IncidentResponse(BaseModel):
    classification: str
    report: str
    response: str
