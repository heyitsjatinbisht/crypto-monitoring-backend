// src/routes/price.routes.ts

import { Router } from "express";
import {
  getPrices,
  getCachedPriceController,
  getSymbols,
} from "../controllers/price.controller";

const router = Router();

router.get("/prices", getPrices);
router.get("/prices/:symbol", getCachedPriceController);
router.get("/symbols", getSymbols);

export default router;
