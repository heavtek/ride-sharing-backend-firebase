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