import { useState, useCallback } from "react";
import { ideasService } from "../services";

export const useVoting = (onVoteSuccess?: (ideaId: number) => void) => {
  const [voting, setVoting] = useState<boolean>(false);
  const [voteError, setVoteError] = useState<string | null>(null);
  const [votedIdeas, setVotedIdeas] = useState<Set<number>>(new Set());

  
  const voteForIdea = useCallback(
    async (ideaId: number) => {
      try {
        setVoting(true);
        setVoteError(null);

        await ideasService.voteForIdea(ideaId);
        
        setVotedIdeas((prev) => new Set(prev).add(ideaId));
        
        if (onVoteSuccess) {
          onVoteSuccess(ideaId);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Неизвестная ошибка при голосовании";
        setVoteError(errorMessage);
        throw err; 
      } finally {
        setVoting(false);
      }
    },
    [onVoteSuccess]
  );
  
  const canVote = useCallback(
    (ideaId: number): boolean => {
      return !votedIdeas.has(ideaId);
    },
    [votedIdeas]
  );

  
  const clearVoteError = useCallback(() => {
    setVoteError(null);
  }, []);

  return {
    voting,
    voteError,
    votedIdeas,
    voteForIdea,
    canVote,
    clearVoteError,
  };
};
