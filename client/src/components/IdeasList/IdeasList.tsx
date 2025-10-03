import React from "react";
import { IIdea } from "../../types";
import { IdeaCard } from "../IdeaCard";
import { LoadingSpinner, ErrorMessage } from "../common";
import { APP_CONFIG } from "../../constants/constants";
import "./IdeasList.css";

interface IdeasListProps {
  ideas: IIdea[];
  loading: boolean;
  error: string | null;
  onVote: (ideaId: number) => void;
  votingId?: number | null;
  votedIdeas: Set<number>;
  onRetry?: () => void;
}

const IdeasList: React.FC<IdeasListProps> = ({
  ideas,
  loading,
  error,
  onVote,
  votingId,
  votedIdeas,
  onRetry,
}) => {
  
  if (loading && ideas.length === 0) {
    return <LoadingSpinner />;
  }

  
  if (error && ideas.length === 0) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (!loading && ideas.length === 0) {
    return (
      <div className="no-ideas">
        <h3>Идей пока нет</h3>
        <p>Будьте первым, кто предложит идею!</p>
      </div>
    );
  }

  return (
    <div className="ideas-list">
      <div className="ideas-header">
        <h2>Идеи для развития продукта</h2>
        <div className="ideas-stats">
          Всего идей: <strong>{ideas.length}</strong>
        </div>
      </div>

      {loading && <LoadingSpinner />}

      {error && <ErrorMessage message={error} onRetry={onRetry} />}

      <div className="ideas-grid">
        {ideas.map((idea) => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            onVote={onVote}
            voting={votingId === idea.id}
            canVote={!votedIdeas.has(idea.id)}
            votesUsed={votedIdeas.size}
            maxVotes={APP_CONFIG.MAX_VOTES_PER_IP}
          />
        ))}
      </div>
    </div>
  );
};

export default IdeasList;
