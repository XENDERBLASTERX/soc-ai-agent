from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIChatModel

model = OpenAIChatModel(
    model_name="mistralai/mistral-7b-instruct"
)

respond_agent = Agent(
    model=model,
    system_prompt=(
        "You are a SOC response automation engine.\n"
        "Provide clear remediation and response steps.\n"
        "Include:\n"
        "- Immediate actions\n"
        "- Containment steps\n"
        "- Long-term prevention\n"
        "Return actionable steps only."
    )
)
