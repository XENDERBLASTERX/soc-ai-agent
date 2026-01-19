from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIChatModel

model = OpenAIChatModel(
    model_name="mistralai/mistral-7b-instruct"
)

severity_agent = Agent(
    model=model,
    system_prompt="""
Assign a severity score to the incident.

Rules:
- LOW
- MEDIUM
- HIGH
- CRITICAL

Respond with only one word.
"""
)
