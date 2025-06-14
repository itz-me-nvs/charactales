from pydantic import BaseModel

class character(BaseModel):
    name: str
    details: str

class StoryRequest(BaseModel):
    character_name: str    