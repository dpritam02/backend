// require('dotenv').config({path : './env'})

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

import connectDB from "./db/index.js";
import dotenv from "dotenv";
import {app} from './app.js'

dotenv.config({ path: "./env" });
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, (err) => {
      if(err) console.error("SERVER FAILED TO START !!!", err);
      else console.log(`server is running on port: ${process.env.PORT}`);
    });
    console.log("Connected to MongoDB")
  })
  .catch((err) => {
    console.log("MONGODB CONNECTION FAILED !!!", err);
  })











/* ONE WAY TO CONNECT TO DATABASE
import express from "express";
const app = express();
//IFFE fucntion
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERROR: Couldn't connect to Mongo", error);
      throw error;
    });
    app.listen(process.env.PORT, (err) => {
      console.log(`listening on ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("ERROR: ", error);
    throw error;
  }
})();
*/
