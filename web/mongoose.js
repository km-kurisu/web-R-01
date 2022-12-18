import { Schema, model } from "mongoose";

export default model("user", new Schema({
    _id: String,
    email: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    password: {
        type: String,
        required: true
    },
    dob: String,
    mobile: String,
    gender: String,
    address: String,
    qualification: String,
    degree: String
}))