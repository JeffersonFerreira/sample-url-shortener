import express from "express"
import {body, validationResult, matchedData, checkSchema} from "express-validator"
import {nanoid} from "nanoid"

import UrlModel from "../models/UrlModel"

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
 * - Add support for custom expiration time
 * - What are the potential exploits I don't know yet?
 */

router.post("/",
    body("url")
        .trim()
        .notEmpty()
        .isURL({
            host_blacklist: [
                process.env.PUBLIC_ADDRESS!,
                "127.0.0.1",
                "localhost",
                "0.0.0.0",
            ]
        }),
    async function (req, res) {
        const validation = validationResult(req);

        if (!validation.isEmpty()) {
            return res
                .status(400)
                .json({
                    errors: validation.array({onlyFirstError: true})
                })
        }

        const {url} = matchedData(req)

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