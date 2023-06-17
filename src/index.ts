import dotenv from "dotenv"
import express from "express"
import api from "./routes/api"
import home from "./routes/home"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path"

dotenv.config();

console.log("Connecting to mongoDB at: ", process.env.DATABASE_URI)
mongoose.connect(process.env.DATABASE_URI!)
    .then(mo => {
       console.log("Database connected")
    })
    .catch(err => {
        console.error(err);
    });

const app = express();

app.get("/ping", (req, res) => {
    return res.send("pong")
})

app.use(bodyParser.urlencoded({extended: false}));
app.use("/static", express.static(path.join(__dirname, "../public/assets/")))
app.use("/api", api);
app.use("/", home);

app.listen(process.env.PORT!);