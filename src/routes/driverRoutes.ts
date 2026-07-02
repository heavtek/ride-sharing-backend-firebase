import express from "express"

const router=express.Router();
import { authMiddleware } from "../middleware/authMiddleware";
import { becomeADriver,toggleDriverStatus,updateDriverLocation } from "../controllers/driversController";
router.use(authMiddleware)

router.post("/becomeDriver",becomeADriver);
router.patch("/toggleStatus",toggleDriverStatus);
router.patch("/updateLocation",updateDriverLocation);
export default router