import mongoose from "mongoose"

const schema = new mongoose.Schema(
    {
        _id: String,
        url: String,
        expiredAt: Date,
    }, {
        timestamps: true,
    }
);
schema.index(
    {createdAt: 1},
    {expireAfterSeconds: 60 * 60 * 24 * 30}
);

const UrlModel = mongoose.model("Url", schema);

export default UrlModel