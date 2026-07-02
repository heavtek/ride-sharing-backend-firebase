import admin from "firebase-admin"
import {db} from "../config/firebase"
import { readdirSync } from "node:fs";
import { z } from "zod";
import { driverSchema } from "../validators/driverValidator.js";

type DriverInput = z.infer<typeof driverSchema>;
export const driverProfile=async(uid:string,data:any)=>{

const driverReff=await db.collection("drivers").doc(uid);

const driverDoc=await driverReff.get();

if(driverDoc.exists){

        throw new Error("driver alrady existed")
   
}

await driverReff.set({
    uid,
    vehicle:{
       model: data.vehicle.model,
    licenseNumber: data.vehicle.licenseNumber,
    },
    location:{
        lat:0,
        long:0
    },
    isOnline:false,
    isAvailable:false,
    curentRideId:null,
    totalTrips:0,
    rating:0,
    createdAt:admin.firestore.FieldValue.serverTimestamp()
    
})
await db.collection("users").doc(uid).update({role:"DRIVER"}
    
)

return {message:"driver succefuly registered"}

}

export const toggleDriverStatusService=async(uid:string,isOnline:boolean)=>{

const driver=await db.collection("drivers").doc(uid).update({
isOnline,
    isAvailable: isOnline,
})

return {message:"driver status chnaged"}
}
export const updateDriverLocationService=async(uid:string,lat:number,long:number)=>{

const driverLoc=await db.collection("drivers").doc(uid).update({
    location:{lat,long}
})

return{message:"Driver location Updated"}
}
