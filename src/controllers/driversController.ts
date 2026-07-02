import { Request,Response } from "express";
import {driverProfile,toggleDriverStatusService,updateDriverLocationService} from "../services/driversService"
import { driverSchema } from "../validators/driverValidator.js";
export const becomeADriver=async(req:any,res:Response)=>{

    const uid=req.user.uid;
  console.log(req.body);
    try {
            const data = driverSchema.parse(req.body);
          const driver=await driverProfile(uid,data)
            res.status(201).json({
        success:true,
        data:driver
    })

    } catch (error:any) {
        
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
  

  
}
export const toggleDriverStatus=async(req:any,res:Response)=>{
const uid=req.user.uid
const {isOnline}=req.body
    try {
        
const driverStatus=await toggleDriverStatusService(uid,isOnline)
  res.json(driverStatus);

    } catch (error:any) {
       res.status(500).json({
            success:false,
            error:error.message
        })
    }
}
export const updateDriverLocation=async(req:any,res:Response)=>{
const {lat,long}=req.body
const uid=req.user.uid
try {
    const updatedLocation=await updateDriverLocationService(uid,lat,long)
      res.json(updatedLocation);
} catch (error:any) {
     res.status(500).json({
            success:false,
            error:error.message
        })
}

}
