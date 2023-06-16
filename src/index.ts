import dotenv from "dotenv"
import express from "express"
import api from "./routes/api"
import home from "./routes/home"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path"

dotenv.config();

mongoose.connect(process.env.DATABASE_URI!);

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use("/static", express.static(path.join(__dirname, "../public/assets/")))
app.use("/api", api);
app.use("/", home);

app.listen(process.env.PORT);