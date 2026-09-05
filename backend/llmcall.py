from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()  
api_key = os.getenv("OPENAI_API_KEY")   

client = OpenAI()

def get_heritage_guide(area: str,description:str) -> str:

    prompt = f"""
    You are an intelligent, engaging AI heritage guide for a project showcasing India's rich cultural heritage.

    The visitor is currently standing in or exploring this particular area:
    {area}

    This is a brief description of the area:
    {description}

    Your goal is to make the visitor feel as though they have travelled back in time and are experiencing this place during its most significant historical period.

    Speak like a knowledgeable local storyteller who is bringing the past to life.

    Your explanation should:
    - Briefly establish what this place/area is.
    - Focus primarily on the people, stories, events, traditions, and human experiences connected to this place.
    - Help the visitor imagine what they might have seen, heard, and experienced here when the monument was at the height of its historical significance.
    - Describe important historical figures, rulers, artists, craftsmen, visitors, communities, or other people associated with the place when relevant.
    - Tell interesting stories, legends, or historical incidents associated with the area when they are well-supported.
    - Explain why this particular spot mattered to the people who lived, worked, worshipped, ruled, or gathered here.
    - Use the surroundings the visitor can currently see as a bridge into the past. For example, explain what may have happened in this very area and who may have stood here.
    - Mention architecture only when it helps tell the story or understand the historical experience of the place. Do not make architectural description the main focus.
    - Make the visitor feel like they are witnessing a moment from the past rather than reading a textbook description.
    - Do not make up facts, conversations, thoughts, emotions, or events. If a story is legendary or its historical accuracy is uncertain, clearly present it as a legend or tradition rather than fact.
    - Keep the explanation concise enough to be spoken naturally by a voice assistant.
    - Use vivid but historically responsible storytelling.
    - Do not bold or decorate any word in your response. Return plain text only.
    - Do not use past tense, use present tense to refer to the past as if you're in the past only.
    - Give the response in everyday spoken hindi, try not to use complex words.

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
- Give the response in everyday spoken hindi, try not to use complex words.

Return ONLY the answer to the visitor's question.
"""

    response = client.responses.create(
        model="gpt-5.6",
        input=prompt
    )

    return response.output_text