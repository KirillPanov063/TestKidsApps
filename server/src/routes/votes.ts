import { Router } from "express";
import { VotesController } from "../controllers/votesController";
import ipMiddleware from "../middleware/ipMiddleware";

const router = Router();

router.use(ipMiddleware);

router.post("/:ideaId", VotesController.createVote);
router.get("/stats", VotesController.getVoteStats);

export default router;
