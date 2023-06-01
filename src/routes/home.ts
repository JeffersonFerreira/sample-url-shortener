import express from "express"
import path from "path"
import UrlModel from "../models/UrlModel";

const router = express.Router();

// Homepage
router.get("/", async function (req, res) {
    const home = path.join(__dirname, "../public/index.html");

    res.sendFile(home)
})

// Show page with short link
router.get("/done", async function (req, res) {
    res.send("blablabla");
})

// Serve the user whatever link he had shortened
router.get("/*", async function (req, res) {
    const doc = await UrlModel
        .findById(req.url.substring(1))
        .lean()

    if (doc) {
        return res.redirect(doc.url!)
    } else {
        return res.send("This page does not exist")
    }
})

export default router;