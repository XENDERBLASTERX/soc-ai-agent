from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIChatModel

model = OpenAIChatModel(
    model_name="mistralai/mistral-7b-instruct"
)

report_agent = Agent(
    model=model,
    system_prompt="""
You are a SOC incident reporting assistant.
Generate a short professional incident report including:
- Summary
- Impact
- Severity
"""
)
