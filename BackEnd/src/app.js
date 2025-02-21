const express = require("express");
const app = express();
const aiRoutes = require("./routes/ai.routes")
const cors = require("cors")

app.use(express.json()) // used for req.body
app.use(cors());

app.get("/", (req, res)=>{
    res.send("Hello World")
})

app.use('/ai', aiRoutes)

module.exports = app;