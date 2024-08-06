import { Router } from "express";
import { createAlert } from "../controllers/alert.controller";

const router = Router();

router.post("/alerts", createAlert);

export default router;
