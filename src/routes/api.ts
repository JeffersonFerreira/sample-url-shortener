import express from "express"
import UrlModel from "../models/UrlModel"
import {nanoid} from "nanoid"

const router = express.Router();

router.all("/", async (req, res, next) => {
    if (req.method === "POST") {
        next();
    } else {
        res.json({
            message: "hello user :)"
        })
    }
})

/** Possible issues:
 * - What if user adds our own url?
 * - What if the input is not an url?
 * - What if the body has wrong format?
 * - Add support for custom expiration time
 * - What are the potential exploits I don't know yet?
 */
router.post("/", async function (req, res) {
    const url = req.body.url;

    try {
        const record = await UrlModel.create({
            _id: nanoid(),
            url
        });

        return res.json({
            short: process.env.PUBLIC_ADDRESS + record._id,
            original: url
        })
    } catch (err) {
        console.error(err);

        return res.sendStatus(400)
    }
})

export default router;