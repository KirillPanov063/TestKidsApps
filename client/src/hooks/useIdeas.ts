import { useState, useEffect, useCallback } from "react";
import { IIdea } from "../types";
import { ideasService } from "../services";

export const useIdeas = () => {
  const [ideas, setIdeas] = useState<IIdea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIdeas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const ideasData = await ideasService.getAllIdeas();

      
      const normalizedIdeas = ideasData.map((idea) => ({
        ...idea,
        votesCount: Number(idea.votesCount),
      }));

      setIdeas(normalizedIdeas);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Неизвестная ошибка";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  
  const updateIdeaVotes = useCallback(
    (ideaId: number, newVotesCount: number) => {
      setIdeas((prevIdeas) =>
        prevIdeas.map((idea) =>
          idea.id === ideaId ? { ...idea, votesCount: newVotesCount } : idea
        )
      );
    },
    []
  );

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  return {
    ideas,
    loading,
    error,
    refetch: fetchIdeas,
    updateIdeaVotes,
  };
};
