import { Router } from "express";
import { createAlert, getAlerts } from "../controllers/alert.controller";

const router = Router();

router.post("/alerts", createAlert);
router.get("/alerts", getAlerts);

export default router;
