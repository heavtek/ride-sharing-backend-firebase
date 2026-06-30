import { Request,Response } from "express";
import { createProfile } from "../services/authService.js";
import { authMiddleware, AuthRequest } from "../middleware/authMiddleware.js";

export const syncProfie=async(req:AuthRequest,res:Response)=>{
const {phone,name,gender}=req.body
try {

    const users =await createProfile( req.user!.uid,phone,name,gender)

    res.status(201).json({
        success:true,
        data:users
    })
    
} catch (error:any) {
    res.status(500).json({
        success:false,
        error:error.message
    })
}

}