import { Model, Optional } from "sequelize";

export interface IIdeaAttributes {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVoteAttributes {
  id: number;
  idea_id: number;
  ip_address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IIdeaCreationAttributes
  extends Optional<IIdeaAttributes, "id" | "createdAt" | "updatedAt"> {}
export interface IVoteCreationAttributes
  extends Optional<IVoteAttributes, "id" | "createdAt" | "updatedAt"> {}

export declare class Idea
  extends Model<IIdeaAttributes, IIdeaCreationAttributes>
  implements IIdeaAttributes
{
  public id: number;
  public title: string;
  public description: string;
  public createdAt: Date;
  public updatedAt: Date;

  public votes?: Vote[];
}

export declare class Vote
  extends Model<IVoteAttributes, IVoteCreationAttributes>
  implements IVoteAttributes
{
  public id: number;
  public idea_id: number;
  public ip_address: string;
  public createdAt: Date;
  public updatedAt: Date;


  public idea?: Idea;
}

export declare const sequelize: Sequelize;

declare module "../../db/models" {
  export const Idea: typeof Idea;
  export const Vote: typeof Vote;
  export const sequelize: Sequelize;
}
