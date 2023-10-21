import dotenv from "dotenv";
import { connect } from "mongoose";
import express from "express";
import router from "./src/Routers/index.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json());

connect(process.env.URI_DB)
.then((res) => {
  console.log('Connect to MonggoDB!');
})
.catch((err) => {
  console.log( 'Error connetcting MongoDB!', err);
});

app.use("/", cors({origin: "*"}), router)

app.listen(PORT, () => {
  console.log('Listen', PORT);
})

