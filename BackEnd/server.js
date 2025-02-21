require("dotenv").config();
const express = require("express");
const cors = require("cors");
const aiRoutes = require("./src/routes/ai.routes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/ai", aiRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
