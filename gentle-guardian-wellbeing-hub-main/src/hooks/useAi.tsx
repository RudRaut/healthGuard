// hook/useAi.ts
import { useState } from "react";

type SuggestionResponse = {
  badSign: string;
  goodSign: string;
  improvementSuggestion: string;
};

export const useAi = () => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestionResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const getSuggestion = async (heartRate: string, temperature: string) => {
    setLoading(true);
    setError(null);


    

    try {
      const response = await fetch(import.meta.env.VITE_AI_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heartRate, temperature })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }

      const data: SuggestionResponse = await response.json();
      setSuggestions(data);
      console.log("Dataaa: ", data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { getSuggestion, loading, suggestions, error };
};
