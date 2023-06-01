import express from "express"

const router = express.Router();

router.all("/", async (req, res) => {
    res.json({
        message: "hello user :)"
    })
})

export default router;