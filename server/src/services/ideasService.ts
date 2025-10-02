import { IIdea } from "../types";
import { Sequelize } from "sequelize";

const { Idea, Vote } = require("../../db/models");


interface IdeaInstance {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  toJSON(): IIdea;
}

interface VoteInstance {
  id: number;
  ip_address: string;
  createdAt: Date;
}

export class IdeasService {
  static async getAllIdeas(): Promise<IIdea[]> {
    try {
      const ideas: IdeaInstance[] = await Idea.findAll({
        attributes: {
          include: [
            [
              Sequelize.literal(`(
                SELECT COUNT(*) 
                FROM "Votes" 
                WHERE "Votes"."idea_id" = "Idea"."id"
              )`),
              "votesCount",
            ],
          ],
        },
        order: [
          [Sequelize.literal('"votesCount"'), "DESC"],
          ["createdAt", "DESC"],
        ],
      });

      return ideas.map((idea: IdeaInstance) => idea.toJSON() as IIdea);
    } catch (error) {
      console.error("Ошибка в IdeasService.getAllIdeas:", error);
      throw new Error("Не удалось загрузить список идей");
    }
  }

  static async getIdeaById(id: number): Promise<IIdea | null> {
    try {
      const idea: IdeaInstance | null = await Idea.findByPk(id, {
        include: [
          {
            model: Vote,
            as: "votes",
            attributes: ["id", "ip_address", "createdAt"],
          },
        ],
        attributes: {
          include: [
            [
              Sequelize.literal(`(
                SELECT COUNT(*) 
                FROM "Votes" 
                WHERE "Votes"."idea_id" = "Idea"."id"
              )`),
              "votesCount",
            ],
          ],
        },
      });

      return idea ? (idea.toJSON() as IIdea) : null;
    } catch (error) {
      console.error("Ошибка в IdeasService.getIdeaById:", error);
      throw new Error("Не удалось загрузить информацию об идее");
    }
  }
}
