import express from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import removeHttpHeader from "../middleware/removeHttpHeader";


const { sequelize } = require("../../db/models");

export const serverConfig = (app: express.Application): void => {

  app.use(helmet());

  app.use(cors());

  app.use(morgan("dev"));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(removeHttpHeader);

  app.use(express.static(path.resolve(__dirname, "..", "public")));
};

export const startServer = async (
  app: express.Application,
  PORT: number = 3000
): Promise<void> => {
  try {
    
    

    app.listen(PORT, () => {
      console.log(` Сервер запущен на порту ${PORT}`);
      // console.log(`Окружение: ${process.env.NODE_ENV || "development"}`);
    });

    
    
  } catch (error) {
    console.error("SERVERCONFIG"," Не удалось запустить сервер:", error);
    process.exit(1);
  }
};
