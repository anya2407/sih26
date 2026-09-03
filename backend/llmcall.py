from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()  
api_key = os.getenv("OPENAI_API_KEY")   

client = OpenAI()

def get_heritage_guide(area: str,description:str) -> str:

    prompt = f"""
You are an intelligent and engaging AI heritage guide for a project
showcasing India's rich cultural heritage.

The visitor is currently standing in or exploring this particular area:
{area}

This is a brief description of the area:
{description}

Explain this area as a knowledgeable local heritage guide.

Your explanation should:
- Describe what this place/area is.
- Explain its historical and cultural significance.
- Mention important events, people, architecture, traditions, or stories
  associated with it when relevant.
- Make the explanation interesting and easy for a tourist to understand.
- Give the visitor a sense of what they are seeing around them.
- Avoid making up facts. If something is uncertain, do not present it as fact.
- Do not bold or decorate any word in your response, just give a plain text response.
- Keep the response concise enough to be spoken aloud by a voice assistant.

Return ONLY the explanation that should be spoken to the visitor.
"""

    response = client.responses.create(
        model="gpt-5.6",
        input=prompt
    )

    return response.output_text

def answer_heritage_question(area: str, description: str, question: str) -> str:
    prompt = f"""
You are an intelligent AI heritage guide for an Indian cultural heritage project.

The visitor is currently exploring:
{area}

This is a brief description of the area:
{description}

The visitor has asked:
{question}

Answer the visitor's question using the provided location context.

Rules:
- Answer specifically about the current heritage location.
- Use historical and cultural information when relevant.
- Be clear and engaging, like a knowledgeable tourist guide.
- Do not make up facts.
- If the question cannot be answered reliably from the available context, say so rather than inventing information.
- Keep the answer concise enough to be spoken aloud.
- Do not bold or decorate any word in your response, just give a plain text response.
- Remember you're talking directly to the end user, don't say things like "the provided information..".

Return ONLY the answer to the visitor's question.
"""

    response = client.responses.create(
        model="gpt-5.6",
        input=prompt
    )

    return response.output_text