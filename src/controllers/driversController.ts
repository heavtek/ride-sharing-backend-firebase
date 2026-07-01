import { Request,Response } from "express";
import {driverProfile} from "../services/driversService"

export const becomeADriver=async(req:any,res:Response)=>{

    const uid=req.user.uid;

    try {
          const driver=await driverProfile(uid,req.body)
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