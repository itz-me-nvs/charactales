import { useState } from "react";
import { createCharacter } from "../api";
import type { CharacterModel } from "../models/user-model";

interface characterFormProps {
    addCharacter: (data: CharacterModel) => void
}

export default function CharacterForm({addCharacter}: characterFormProps) {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setMessage("⌛ Adding character...");
      const { data: res } = await createCharacter({ name, details });

      const { hasError, data, message } = res;

      if (hasError) {
        setMessage(message);
        return;
      }
      setMessage(`✅ Character "${data?.name}" added.`);

      addCharacter(data!);
      setName("");
      setDetails("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error adding character.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-semibold text-gray-700">Add New Character</h2>
      <input
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <textarea
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Details"
        required
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Add Character
      </button>
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </form>
  );
}
