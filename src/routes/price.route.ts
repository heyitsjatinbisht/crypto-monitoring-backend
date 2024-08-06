import { Router } from "express";
import {
  getPrices,
  getCachedPriceController,
} from "../controllers/price.controller";

const router = Router();

router.get("/prices", getPrices);
router.get("/prices/:symbol", getCachedPriceController);

export default router;
