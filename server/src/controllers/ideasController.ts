import { Request, Response } from "express";
import { IdeasService } from "../services/ideasService";
import { IIdea } from "../types";
import { FormatResponse } from "../utils/formatResponse";

export class IdeasController {
  static async getAllIdeas(req: Request, res: Response): Promise<void> {
    try {
      const ideas: IIdea[] = await IdeasService.getAllIdeas();
      const response = FormatResponse.success(
        ideas,
        "Список идей успешно загружен"
      );
      res.json(response);
    } catch (error) {
      console.error("Ошибка в IdeasController.getAllIdeas:", error);
      const response = FormatResponse.internalError(
        "Не удалось загрузить список идей"
      );
      res.status(500).json(response);
    }
  }

  static async getIdeaById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        const response = FormatResponse.badRequest("ID идеи обязателен");
        res.status(400).json(response);
        return;
      }

      const ideaId = parseInt(id);

      if (isNaN(ideaId)) {
        const response = FormatResponse.badRequest("Неверный ID идеи");
        res.status(400).json(response);
        return;
      }

      const idea: IIdea | null = await IdeasService.getIdeaById(ideaId);

      if (!idea) {
        const response = FormatResponse.notFound("Идея не найдена");
        res.status(404).json(response);
        return;
      }

      const response = FormatResponse.success(
        idea,
        "Информация об идее загружена"
      );
      res.json(response);
    } catch (error) {
      console.error("Ошибка в IdeasController.getIdeaById:", error);
      const response = FormatResponse.internalError(
        "Не удалось загрузить информацию об идее"
      );
      res.status(500).json(response);
    }
  }
}
