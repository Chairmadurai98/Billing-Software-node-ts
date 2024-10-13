import mongoose from "mongoose";
import { Constants } from "./constants";

const { MONGOURI } = Constants

export default async()=> {
 try {
    await mongoose.connect(MONGOURI)
    console.log("DB connected")
 } catch (error) {
    console.log("DB error",error)
 }
}