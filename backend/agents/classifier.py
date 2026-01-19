from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIChatModel

# Uses OPENAI_API_KEY + OPENAI_BASE_URL from env
model = OpenAIChatModel(
    model_name="mistralai/mistral-7b-instruct"
)

classifier_agent = Agent(
    model=model,
    system_prompt=(
        "You are a SOC analyst.\n"
        "Classify the incident into ONE short category.\n"
        "Examples: Brute Force, Malware, Phishing, Insider Threat, DDoS.\n"
        "Respond with ONLY the classification name."
    )
)
