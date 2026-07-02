import express from "express"
import { authMiddleware } from "../middleware/authMiddleware";
import { requestRide,findNearByDriver,acceptRide,startRide,finishRide } from "../controllers/rideController";
const router=express.Router();

router.use(authMiddleware)

router.post("/requestRide",requestRide);
router.post("/requestRide",requestRide);
router.get("/findDriver",findNearByDriver);
router.post("/acceptRide", acceptRide);
router.patch("/startRide",startRide);
router.patch("/finishRide",finishRide)
export default router