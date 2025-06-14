from groq import Groq
import os
from dotenv import load_dotenv
from fastapi import HTTPException


load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_story(name: str, details: str) -> str:
    try:
        prompt = f"Create a short 4-5 sentence story about {name}, who is described as: {details}."

        chat_completion = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        max_tokens=150, 
        )

        print("chat_completion", chat_completion)

        return chat_completion.choices[0].message.content.strip()

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))