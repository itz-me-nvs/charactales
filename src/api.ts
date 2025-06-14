import axios from "axios";
import type { createCharacterType, getCharactersType } from "./models/user-model";

const BASE_URL = "http://localhost:8000/api";

export const createCharacter = (data: { name: string; details: string }) =>
  axios.post<createCharacterType>(`${BASE_URL}/create_character`, data);

export const generateStory = (character_name: string) =>
  axios.post(`${BASE_URL}/generate_story`, { character_name });

export const getCharacters = () => axios.get<getCharactersType>(`${BASE_URL}/characters`);
