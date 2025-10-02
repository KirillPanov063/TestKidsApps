import React from "react";
import { IIdea } from "../../types";
import { Button } from "../common";
import "./IdeaCard.css";

interface IdeaCardProps {
  idea: IIdea;
  onVote: (ideaId: number) => void;
  voting?: boolean;
  canVote?: boolean;
  votesUsed?: number;
  maxVotes?: number;
}

const IdeaCard: React.FC<IdeaCardProps> = ({
  idea,
  onVote,
  voting = false,
  canVote = true,
  votesUsed = 0,
  maxVotes = 10,
}) => {
  const handleVote = () => {
    if (canVote && !voting) {
      onVote(idea.id);
    }
  };

  const getButtonText = () => {
    if (voting) return "Голосую...";
    if (!canVote) return "Уже голосовали";
    if (votesUsed >= maxVotes) return "Лимит голосов";
    return "Проголосовать";
  };

  const isButtonDisabled = !canVote || voting || votesUsed >= maxVotes;

  return (
    <div className="idea-card">
      <div className="idea-header">
        <h3 className="idea-title">{idea.title}</h3>
        <div className="idea-votes">
          <span className="votes-count">{idea.votesCount}</span>
          <span className="votes-label">голосов</span>
        </div>
      </div>

      <p className="idea-description">{idea.description}</p>

      <div className="idea-footer">
        <div className="idea-date">
          Добавлено: {new Date(idea.createdAt).toLocaleDateString("ru-RU")}
        </div>

        <Button
          onClick={handleVote}
          disabled={isButtonDisabled}
          loading={voting}
          variant="primary"
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
};

export default IdeaCard;
