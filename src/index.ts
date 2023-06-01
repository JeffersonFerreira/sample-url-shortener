import dotenv from "dotenv"
import express from "express"
import api from "./routes/api"
import home from "./routes/home"
import bodyParser from "body-parser";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.DATABASE_URI!);

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use("/", home);
app.use("/api", api);

app.listen(process.env.PORT);