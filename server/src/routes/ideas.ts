import { Router } from "express";
import { IdeasController } from "../controllers/ideasController";

const router = Router();

router.get("/", IdeasController.getAllIdeas);
router.get("/:id", IdeasController.getIdeaById);

export default router;
