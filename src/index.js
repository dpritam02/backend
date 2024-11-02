import mongoose from "mongoose";
import { DB_NAME } from "./constants";



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
