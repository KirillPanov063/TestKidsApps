
export interface IIdea {
  id: number;
  title: string;
  description: string;
  votesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface IVote {
  id: number;
  idea_id: number;
  ip_address: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface VoteResponse {
  message: string;
  vote: {
    id: number;
    idea_id: number;
    ip_address: string;
    createdAt: string;
  };
}

export interface VoteStats {
  ip: string;
  totalVotes: number;
  votes: IVote[];
}

export type LoadingState = "idle" | "loading" | "succeeded" | "failed";

export interface VotingContextType {
  votedIdeas: Set<number>; // 
  voteForIdea: (ideaId: number) => Promise<void>;
  canVote: (ideaId: number) => boolean;
}
