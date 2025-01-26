import mongoose from "mongoose";
import { Constants } from "./constants";

const {  MONGOURIV2 } = Constants

export default async()=> {
 try {
    await mongoose.connect(MONGOURIV2)
    console.log("DB connected")
 } catch (error) {
    console.log("DB error",error)
 }
}