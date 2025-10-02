import { Router } from "express";
import ideasRouter from "./ideas";
import votesRouter from "./votes";

const router = Router();

router.use("/ideas", ideasRouter);
router.use("/votes", votesRouter);

export default router;
