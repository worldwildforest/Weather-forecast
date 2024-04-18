const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./database/db");
const router = require("./routes/userRouter");
const cors = require("cors");
const port = process.env.PORT;

connectDB();

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
