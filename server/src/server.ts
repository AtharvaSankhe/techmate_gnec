import express from "express";
import logger from "./utils/logger";
import routes from "./routes";

const cors = require('cors');
const cookieParser =require("cookie-parser");

require('dotenv').config()

// import { initializeApp } from "firebase/app";

const app = express();
// app.use(cors());
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:5173", "https://techmate.vercel.app"],
  credentials: true,
}));


routes(app);

app.listen(PORT, () => {
  logger.info(`server is up on port ${PORT}`);
});

export default app;
