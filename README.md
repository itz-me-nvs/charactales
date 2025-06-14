# 🧙‍♂️ CharacTales — Character Story Generator API

CharacTales is a backend service that allows users to create fictional characters and generate creative short stories using LLMs. It is built with **FastAPI**, uses **Supabase** as a cloud-hosted PostgreSQL database, and leverages **Groq**'s API (LLaMA 3 or other supported models) to generate stories.

---

## 🛠 Tech Stack

- **Backend**: FastAPI (Python)
- **Database**: Supabase (PostgreSQL)
- **AI Model**: Groq API (LLaMA 3 / Mixtral)
- **Environment Management**: `venv` + `.env`

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/itz-me-nvs/charactales.git
cd charactales/backend

```

### 2. Create a Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate

```

### 3. Install Dependencies

```bash
pip install -r requirements.txt

```

### 4. Setup Supabase Table

Ensure the characters table exists with:
create table if not exists characters (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  details text not null
);

also Enable RLS and add policy for INSERT


### 5. Configure Environment Variables

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key
GROQ_API_KEY=your-groq-api-key


### 6. Run the Development Server

uvicorn main:app --reload



📦 API Endpoints

POST /api/create_character
Creates a new character.

```
{
  "name": "Arya Stark",
  "details": "A brave girl from Winterfell who learned to fight"
}
```

Response:
```
{
  hasError: false,
  message: "Item created successfully",
  data: {
    id: "your-character-id",
    name: "Arya Stark",
    details: "A brave girl from Winterfell who learned to fight",
    created_at: "2023-07-28T10:00:00.000Z"
  },
}
```

POST /api/generate_story
Generates a short story using Groq LLM.

```
{
  "character_name": "Arya Stark"
}
```

Response:
```
{
  hasError: false,
  message: "Story generated successfully",
  data: {
    story: "Once upon a time, a brave girl from Winterfell learned to fight..."
  },
}
```


## Curl commands examples

Create Character

```bash
curl -X POST http://localhost:8000/api/create_character \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Arya Stark",
    "details": "A brave girl from Winterfell who learned to fight"
}'
```

Expected Response:

{
  "hasError": false,
  "message": "Item created successfully",
  "data": {
    "id": "your-character-id",
    "name": "Arya Stark",
    "details": "A brave girl from Winterfell who learned to fight",
    "created_at": "2023-07-28T10:00:00.000Z"
  }
}

```

Generate Story

```bash
curl -X POST http://localhost:8000/api/generate_story \
  -H "Content-Type: application/json" \
  -d '{
    "character_name": "Arya Stark"
  }'
```

Expected Response:

{
  "hasError": false,
  "message": "Story generated successfully",
  "data": {
    "story": "Once upon a time, a brave girl from Winterfell learned to fight..."
  }

}
