import { Request, Response } from "express";
import { VotesService } from "../services/votesService";
import { VoteResponse } from "../types";
import { FormatResponse } from "../utils/formatResponse";
import { CustomError } from "../errors/customErrors";

export class VotesController {
  static async createVote(req: Request, res: Response): Promise<void> {
    try {
      const { ideaId } = req.params;

      if (!ideaId) {
        const response = FormatResponse.badRequest("ID  обязателен");
        res.status(400).json(response);
        return;
      }

      const clientIp = (req as any).clientIp;
      const ideaIdNum = parseInt(ideaId);

      if (isNaN(ideaIdNum)) {
        const response = FormatResponse.badRequest("Неверный ID ");
        res.status(400).json(response);
        return;
      }

      const result: VoteResponse = await VotesService.createVote(
        ideaIdNum,
        clientIp
      );
      const response = FormatResponse.created(result.vote, result.message);
      res.status(201).json(response);
    } catch (error) {
      console.error("Ошибка в VotesController.createVote:", error);

      
      if (error instanceof CustomError) {
        const response = FormatResponse.error(error.message, error.statusCode);
        res.status(error.statusCode).json(response);
        return;
      }

      const errorMessage =
        error instanceof Error ? error.message : "Не удалось создать голос";

      const response = FormatResponse.internalError(errorMessage);
      res.status(500).json(response);
    }
  }

  static async getVoteStats(req: Request, res: Response): Promise<void> {
    try {
      const clientIp = (req as any).clientIp;
      const stats = await VotesService.getVoteStats(clientIp);
      const response = FormatResponse.success(
        stats,
        "Статистика голосов загружена"
      );
      res.json(response);
    } catch (error) {
      console.error("Ошибка в VotesController.getVoteStats:", error);
      const response = FormatResponse.internalError(
        "Не удалось получить статистику голосов"
      );
      res.status(500).json(response);
    }
  }
}
