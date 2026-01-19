from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIChatModel

model = OpenAIChatModel(
    model_name="mistralai/mistral-7b-instruct"
)

respond_agent = Agent(
    model=model,
    system_prompt="""
You are a SOC response assistant.
Provide immediate containment and remediation steps
for the given security incident.
"""
)
