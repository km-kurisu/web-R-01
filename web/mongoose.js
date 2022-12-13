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
    city: String,
    pinCode: Number,
    state: String,
    country: {
        type: String,
        default: "India"
    },
    hobbies: [String],
    qualification: [{
        name: String,
        board: String,
        percentage: Number,
        year: Number
    }],
    courses: [String]
}))