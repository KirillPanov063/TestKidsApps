import { api, ApiError } from "./api";
import { IIdea, VoteResponse, VoteStats } from "../types";


export const ideasService = {
  
  async getAllIdeas(): Promise<IIdea[]> {
    try {
      const ideas = await api.get<IIdea[]>("/ideas");
      
      return ideas.map((idea) => ({
        ...idea,
        votesCount: Number(idea.votesCount),
      }));
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error("Не удалось загрузить список идей");
      }
      throw error;
    }
  },
  
  async getIdeaById(id: number): Promise<IIdea> {
    try {
      return await api.get<IIdea>(`/ideas/${id}`);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 404) {
          throw new Error("Идея не найдена");
        }
        throw new Error("Не удалось загрузить информацию об идее");
      }
      throw error;
    }
  },

  
  async voteForIdea(ideaId: number): Promise<VoteResponse["vote"]> {
    try {
      const result = await api.post<VoteResponse["vote"]>(`/votes/${ideaId}`);
      return result;
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 409) {
          throw new Error(error.message); 
        }
        throw new Error("Не удалось проголосовать");
      }
      throw error;
    }
  },

  
  async getVoteStats(): Promise<VoteStats> {
    try {
      return await api.get<VoteStats>("/votes/stats");
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error("Не удалось получить статистику голосов");
      }
      throw error;
    }
  },

};


export type IdeasService = typeof ideasService;
