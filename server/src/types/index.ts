export interface IIdea {
  id: number;
  title: string;
  description: string;
  votesCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVote {
  id: number;
  idea_id: number;
  ip_address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VoteRequest {
  ideaId: number;
}

export interface VoteResponse {
  message: string;
  vote: {
    id: number;
    idea_id: number;
    ip_address: string;
    createdAt: Date;
  };
}

export interface ErrorResponse {
  error: string;
  details?: string;
}
