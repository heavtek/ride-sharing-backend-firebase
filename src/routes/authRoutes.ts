import express from "express"
import {syncProfie} from "../controllers/authController"
import { authMiddleware } from "../middleware/authMiddleware"
const router=express.Router();
router.use(authMiddleware)
router.post("/syncProfile",syncProfie);

export default router;