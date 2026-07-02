import { Request,Response } from "express";
import {requestRideService,findNearByDriverService,acceptRideService,startRideService,finishRideService} from "../services/rideService"
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
export const findNearByDriver=async(_req:any,res:Response)=>{

    const drivers=await findNearByDriverService()
res.json(drivers);
}
export const acceptRide =async(req:any,res:Response)=>{
    const{driverId,rideId}=req.body
    const rideAccepted= await acceptRideService(req.user.uid,rideId)
    res.json(rideAccepted)
} 
export const startRide=async(req:any,res:Response)=>{

const driverId=req.user.uid;

const {rideId}=req.body;

const result=await startRideService(driverId,rideId);

res.json(result);

}
export const finishRide=async(req:any,res:Response)=>{

const driverId=req.user.uid;

const {rideId,fare}=req.body;

const result=await finishRideService(driverId,rideId,fare);

res.json(result);

}