import express from "express"
import path from "path"

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
    // This link does not exist
    if (req.url === "/non") {
        return res.send("This page does not exist")
    }

    res.send("serving some shit for you")
})

export default router;