import { IVote, VoteResponse } from "../types";

const { Vote, Idea } = require("../../db/models");

interface VoteInstance {
  id: number;
  idea_id: number;
  ip_address: string;
  createdAt: Date;
  toJSON(): IVote;
}

interface IdeaInstance {
  id: number;
  title: string;
  description: string;
}

export class VotesService {
  static async createVote(
    ideaId: number,
    ipAddress: string
  ): Promise<VoteResponse> {
    try {
      const idea: IdeaInstance | null = await Idea.findByPk(ideaId);
      if (!idea) {
        throw new Error("Идея не найдена");
      }

      const existingVote: VoteInstance | null = await Vote.findOne({
        where: {
          idea_id: ideaId,
          ip_address: ipAddress,
        },
      });

      if (existingVote) {
        throw new Error("Вы уже голосовали за эту идею");
      }

      const voteCount: number = await Vote.count({
        where: { ip_address: ipAddress },
      });

      if (voteCount >= 10) {
        throw new Error(
          "Лимит голосов превышен (максимум 10 голосов с одного IP)"
        );
      }

      const vote: VoteInstance = await Vote.create({
        idea_id: ideaId,
        ip_address: ipAddress,
      });

      return {
        message: "Голос успешно засчитан",
        vote: {
          id: vote.id,
          idea_id: vote.idea_id,
          ip_address: vote.ip_address,
          createdAt: vote.createdAt,
        },
      };
    } catch (error) {
      console.error("Ошибка в VotesService.createVote:", error);
      throw error;
    }
  }

  static async getVoteStats(ipAddress: string): Promise<{
    ip: string;
    totalVotes: number;
    votes: IVote[];
  }> {
    try {
      const votes: VoteInstance[] = await Vote.findAll({
        where: { ip_address: ipAddress },
        include: [
          {
            model: Idea,
            as: "idea",
            attributes: ["id", "title"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      return {
        ip: ipAddress,
        totalVotes: votes.length,
        votes: votes.map((vote: VoteInstance) => vote.toJSON() as IVote),
      };
    } catch (error) {
      console.error("Ошибка в VotesService.getVoteStats:", error);
      throw new Error("Не удалось получить статистику голосов");
    }
  }
}
