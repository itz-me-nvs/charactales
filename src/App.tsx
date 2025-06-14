import { useEffect, useState } from "react";
import CharacterForm from "./components/CharacterForm";
import StoryGenerator from "./components/StoryGenerator";
import type { CharacterModel } from "./models/user-model";
import { getCharacters } from "./api";

function App() {

  const [characters, setCharacters] = useState<CharacterModel[]>([]);
  
    useEffect(() => {
      const fetchCharacters = async () => {
        try {
          const {data: res} = await getCharacters();        
          setCharacters(res?.data as CharacterModel[] || []);
        } catch {
          setCharacters([]);
        }
      };
      fetchCharacters();
    }, []);


    const addCharacter = (character: CharacterModel) => {
      setCharacters([...characters, character]);
    };
    
  return (
    <div className="min-h-screen bg-gray-100 p-6 text-center">
      <h1 className="text-3xl font-bold text-indigo-600 mb-8">🧙‍♂️ Character Story Generator</h1>
      <div className="max-w-xl mx-auto space-y-10">
        <CharacterForm addCharacter={addCharacter}/>
        <hr className="border-gray-300" />
        <StoryGenerator characters={characters}/>
      </div>
    </div>
  );
}

export default App;
