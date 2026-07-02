import { Request,Response } from "express";
import {requestRideService} from "../services/rideService"
export const requestRide=async(req:any, res:Response)=>{
    

    try {
        const ride=await requestRideService(req.user.id,req.body)
            res.json(ride);
    } catch (error:any) {
          res.status(500).json({
            success:false,
            error:error.message
        })
    }

}