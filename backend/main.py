from models import character, StoryRequest
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase_client import supabase
from story_generator import generate_story

app = FastAPI()

# Allow local frontend dev server (e.g., Vite/React)
origins = [
    "http://localhost:5173",  # Vite
    "http://127.0.0.1:5173",
    "http://localhost:3000",  # if using CRA
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/create_character", status_code=201)
async def create_character(character: character):
    try:
        existing = supabase.table("characters").select("*").eq("name", character.name).execute()

        if existing.data:
            return {"hasError": True, "message": "Character already exists", "data": None}

        response = supabase.table("characters").insert(character.dict()).execute()
        return {"hasError": False, "message": "Item created successfully", "data": response.data[0], "count": response.count}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/generate_story")
def generate_character_story(request: StoryRequest):
    try:
       query = supabase.table('characters').select('*').eq('name', request.character_name).execute()
       print("query123", query)
       character = query.data[0]
       story = generate_story(character['name'], character['details'])
       print("story_err", story)
       return {"story": story}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/characters")
async def get_characters():
    try:
        response = supabase.table("characters").select("*").execute()
        print("get_characters", response)
        return {"data": response.data, "count": len(response.data)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))