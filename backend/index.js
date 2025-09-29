const express = require("express")
const cors = require("cors")
const { connection } = require("./db")
const { userRouter } = require("./routes/user_routes")
const { noteRouter } = require("./routes/note_routes")
require("dotenv").config()
const port = process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())
app.use("/user", userRouter)
app.use("/note", noteRouter)
// Forgot password route
const { UserModel } = require("./models/UserModel");
app.post("/api/forgot-password", async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.json({ status: 0, message: "Email is required" });
    }
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            // Simulate sending email (in real app, send actual email)
            return res.json({ status: 1, message: "Password reset link sent to your email." });
        } else {
            return res.json({ status: 0, message: "Email not found" });
        }
    } catch (err) {
        return res.json({ status: 0, message: "Server error" });
    }
});

app.get("/", (req, res)=>{
    res.send({
        message: "API is working now"
    })
})

app.listen(port, async()=>{
    try
    {
        await connection
        console.log("DB connected")
    }
    catch(error)
    {
        console.log(error)
    }
    console.log(`Server is running on port ${port}`)
})