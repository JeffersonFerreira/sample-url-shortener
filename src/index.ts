import express from "express"
import api from "./api"
import home from "./home"

const app = express();

app.use("/api", api);
app.use("/", home);
app.listen(3000);