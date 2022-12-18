import express from "express";
import { config } from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connect } from "mongoose";
import User from "./mongoose.js";

config();

const DB_URL = process.env.DB_URL || ""

try {
    connect(DB_URL)
}
catch(e) {
    console.log(e)
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 6969
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(join(__dirname, "static")))

app.get("/login", (_, res) => res.sendFile(join(__dirname, "static", "login.html")))
app.get("/register", (_, res) => res.sendFile(join(__dirname, "static", "register.html")))
app.get("/home", (_, res) => res.sendFile(join(__dirname, "static", "home.html")))

app.get("/findAll", async (_, res) => {
    res.send(await User.find())
})

app.get("/find", async (req, res) => {
    const body = req.query
    console.log(body)
    if(body.username) {
        body._id = body.username
    }
    if(await User.findOne(body)) {
        res.redirect("./home")
    }
    else {
        res.redirect("/login")
    }
})

app.post("/create", async (req, res) => {
    const body = Object.keys(req.body)?req.body:req.params
    if(!body) {
        res.redirect("/register")
    }
    if(!body._id && body.username) {
        body._id = body.username
    }
    console.log(body)
    if(await User.findById(body._id)) {
        req.redirect("/register")
        return
    }
    const user = await new User(body).save()
    if(user._doc) {
        res.redirect("./login")
    }
    else {
        res.redirect("./register")
    }
})

app.get("/", (_, res) => res.sendFile(join(__dirname, "static", "login.html")))


app.listen(PORT, () => console.log("LISTENING ON PORT: ", PORT))