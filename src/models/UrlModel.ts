import mongoose from "mongoose"

const schema = new mongoose.Schema({
    _id: String,
    url: String,
});

const UrlModel = mongoose.model("Url", schema);

export default UrlModel