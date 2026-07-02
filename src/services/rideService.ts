import admin from "firebase-admin"
import {db} from "../config/firebase"
import { readdirSync } from "node:fs";
export const requestRideService=async(uid:string,data:any)=>{

const riderRef= db.collection("rides").doc()

const ride={
    rideId:riderRef.id,
    passangerId:uid,
    pickup:data.pickup,
    destination:data.destination,
    driverId:null,
    status:"REQUESTED",
    createdAt:admin.firestore.FieldValue.serverTimestamp()
}

await riderRef.set(ride)

return ride


}
export const findNearByDriverService=async()=>{


    const driver=await db.collection("drivers").where("isOnline","==" ,true)
    .where("isAvailable","==",true).get();
  const drivers: any[] = [];//array
  driver.forEach((doc)=>{
    drivers.push(doc.data())
  })
  return drivers

}
export const acceptRideService=async(driverId:string,rideId:string)=>{
const rideRef=db.collection("rides").doc(rideId)

const rideDoc=await rideRef.get();

if(!rideDoc.exists){
throw new Error("ride not found")
}

const ride=rideDoc.data();

if(ride?.status !== "REQUESTED"){
    throw new Error ("ride already taken")
}

await rideRef.update({
driverId,
    status:"ACCEPTED",
    updatedAt:admin.firestore.FieldValue.serverTimestamp()
})
const driveupdate=await db.collection("drivers").doc(driverId).update({
  isAvailable:false,
    curentRideId:rideId
   
})

return {message:"ride Accepted"}
}

export const startRideService=async(driverId:string,rideId:string)=>{

const rideRef=db.collection("rides").doc(rideId)

const rideDoc=await rideRef.get();

if(!rideDoc.exists){
throw new Error("ride not found")
}
const ride=rideDoc.data();

if(ride?.driverId !==  driverId){
        throw new Error ("Unauthorized")
}
if(ride?.status !== "ACCEPTED"){
    throw new Error ("Ride cannot be started")
}
await rideRef.update({
 status:"ONGOING",
    startedAt:admin.firestore.FieldValue.serverTimestamp()
})
await db.collection("drivers").doc(driverId)
.update({
      
       curentRideId:rideId,
        
})
return {message:"trip has started"}
}
export const finishRideService= async(driverId:string,rideId:string,
fare:number
)=>{
const rideRef=db.collection("rides").doc(rideId)

const rideDoc=await rideRef.get();

if(!rideDoc.exists){
throw new Error("ride not found")
}
const ride=rideDoc.data();

if(ride?.driverId !==  driverId){
        throw new Error ("Unauthorized")
}
if(ride?.status !== "ONGOING"){
    throw new Error ("Ride cannot be Completed")
}
await rideRef.update({
 status:"COMPLETED",
   fare,

completedAt:admin.firestore.FieldValue.serverTimestamp()
})
await db.collection("drivers").doc(driverId)
.update({
       isAvailable:true,
       curentRideId:null,
         totalTrips:admin.firestore.FieldValue.increment(1)
})
return{

message:"Ride Completed"

};
}

