import { useState } from "react";
import { generateStory } from "../api";
import type { CharacterModel } from "../models/user-model";

interface StoryGeneratorProps {
    characters: CharacterModel[];
}

export default function StoryGenerator({characters}: StoryGeneratorProps) {
  const [name, setName] = useState("");
  const [story, setStory] = useState("");
  const [message, setMessage] = useState("");
  

  const handleGenerate = async () => {
    try {
      if(!name) {
         setStory("");
        setMessage("Please select a character");
        return;
      };
      setStory("⌛ Generating story...");
      const { data: res } = await generateStory(name);
      setStory(res?.story || "❌ Error generating story.");
    } catch {
      setStory("❌ Error generating story.");
    }
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold text-gray-700">Generate Story</h2>
      {/* <input
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter character name"
      /> */}

      <select
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={name}
        onChange={(e) => setName(e.target.value)}
      >
        <option value="">Select a character</option>
        {
            characters.map((character) => (
                <option key={character.name} value={character.name}>
                    {character.name}
                </option>
            ))
        }

      </select>

      <button
        onClick={handleGenerate}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Generate Story
      </button>

       {message && <p className="text-sm text-gray-600">{message}</p>}
      {story && (
        <div className="mt-4 bg-gray-100 p-4 rounded text-left">
          <strong>Generated Story:</strong>
          <p className="mt-2 text-gray-800 whitespace-pre-line">{story}</p>
        </div>
      )}
    </div>
  );
}
