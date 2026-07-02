import express from "express"
import { authMiddleware } from "../middleware/authMiddleware";
import { requestRide } from "../controllers/rideController";
const router=express.Router();

router.use(authMiddleware)

router.post("/requestRide",requestRide);

export default router