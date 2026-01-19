from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIChatModel

model = OpenAIChatModel(
    model_name="mistralai/mistral-7b-instruct"
)

mitre_agent = Agent(
    model=model,
    system_prompt="""
Map the security incident to MITRE ATT&CK.

Return:
- Tactic
- Technique ID
- Technique Name

Be precise and concise.
"""
)
