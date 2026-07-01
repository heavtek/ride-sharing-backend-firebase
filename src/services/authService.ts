import admin from 'firebase-admin'
import { db } from '../config/firebase'
export const createProfile=async(
    uid:string,
    phone:string,
    name:string,
    gender:string
)=>{

    const userRef=await db.collection("users").doc(uid);
    const userDocs=await userRef.get();

    if(userDocs.exists){
        userDocs.data
    }
    const user={
        uid,
        name,
        phone,
        gender,
      role: "PASSENGER",
        walletBlance:0,
        createdAt:admin.firestore.FieldValue.serverTimestamp()
    }
    await userRef.set(user);
const newUser = await userRef.get();

return newUser.data();
}