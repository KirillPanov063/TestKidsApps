import express from "express";
import { serverConfig, startServer } from "./config/serverConfig";
import { FormatResponse } from "./utils/formatResponse";


import ideasRouter from "./routes/ideas";
import votesRouter from "./routes/votes";

const app = express();


serverConfig(app);


app.use("/api/ideas", ideasRouter);
app.use("/api/votes", votesRouter);


app.get("/health", (req, res) => {
  const response = FormatResponse.success(
    {
      environment: process.env.NODE_ENV || "development",
      timestamp: new Date().toISOString(),
    },
    "Сервер работает корректно"
  );
  res.status(200).json(response);
});


app.use((req, res) => {
  const response = FormatResponse.notFound(
    `Маршрут ${req.originalUrl} не найден 404`
  );
  res.status(404).json(response);
});


app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Глобальная Ошибка:", err.stack);

    const response = FormatResponse.internalError(
      process.env.NODE_ENV === "development"
        ? err.message
        : "Внутренняя ошибка сервера"
    );
    res.status(500).json(response);
  }
);


const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
startServer(app, PORT);

export default app;
