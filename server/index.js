import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

const port = 8080;

const url = process.env.MONGODB_URL.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const startServer = async () => {
  try {
    connectDB(url);
    app.listen(port, () => console.log(`Server has started on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
