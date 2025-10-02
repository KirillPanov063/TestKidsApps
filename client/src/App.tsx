import React, { useState, useCallback } from "react";
import { IdeasList, ThemeToggle } from "./components";
import { useIdeas, useVoting, useTheme } from "./hooks";
import { APP_CONFIG } from "./utils/constants";
import "./App.css";

const App: React.FC = () => {
  const [votingId, setVotingId] = useState<number | null>(null);

  
  const { ideas, loading, error, refetch, updateIdeaVotes } = useIdeas();
  const { voteError, votedIdeas, voteForIdea, clearVoteError } = useVoting();
  const { theme, toggleTheme, isDark } = useTheme();

  const handleVote = useCallback(
    async (ideaId: number) => {
      try {
        setVotingId(ideaId);
        clearVoteError();

        await voteForIdea(ideaId);

        const idea = ideas.find((i) => i.id === ideaId);
        if (idea) {
          const currentVotes = Number(idea.votesCount);
          updateIdeaVotes(ideaId, currentVotes + 1);
        }
      } catch (err) {
        console.error("Ошибка при голосовании:", err);
      } finally {
        setVotingId(null);
      }
    },
    [ideas, voteForIdea, updateIdeaVotes, clearVoteError]
  );

  const handleRetry = useCallback(() => {
    refetch();
    clearVoteError();
  }, [refetch, clearVoteError]);

  const displayError = error || voteError;

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <div className="header-top">
            <h1>💡 {APP_CONFIG.APP_NAME}</h1>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
          <div className="votes-info">
            Проголосовано: {votedIdeas.size} из {APP_CONFIG.MAX_VOTES_PER_IP}{" "}
            возможных
            {isDark && " 🌙"}
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <IdeasList
            ideas={ideas}
            loading={loading}
            error={displayError}
            onVote={handleVote}
            votingId={votingId}
            votedIdeas={votedIdeas}
            onRetry={handleRetry}
          />
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>
            {APP_CONFIG.APP_NAME}. Максимум {APP_CONFIG.MAX_VOTES_PER_IP}{" "}
            голосов с одного IP-адреса.
            {isDark && " Тёмная тема активна."}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
