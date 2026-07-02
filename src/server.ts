import express from "express"
import {db} from "./config/firebase.js"
import authRoutes from "./routes/authRoutes.js"
import driverRoutes from "./routes/driverRoutes.js"
import rideRouter from "./routes/rideRoutes.js"
async function testFirebase() {
    const collection =await db.listCollections()
    console.log("firebase conected");
    // console.log(collection)
}
testFirebase();
const app=express();
app.use(express.json())

app.use("/auth",authRoutes)
app.use("/driver",driverRoutes)
app.use("/ride",rideRouter)






const PORT=5000;

app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`)
})