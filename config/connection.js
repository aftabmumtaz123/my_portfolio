import mongoose from "mongoose";
import 'dotenv/config';

mongoose.connect(process.env.MONGO_DB).then(
    console.log(`Your Website is connected with Database successfully`)
).catch((err) => {
    console.log(`There some issue while connecting to Database: ${err}`)
});