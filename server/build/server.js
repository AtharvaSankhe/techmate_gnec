"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./utils/logger"));
const routes_1 = __importDefault(require("./routes"));
const cors = require('cors');
const cookieParser = require("cookie-parser");
require('dotenv').config();
// import { initializeApp } from "firebase/app";
const app = (0, express_1.default)();
// app.use(cors());
app.use(express_1.default.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8080;
app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:5173", "https://techmate.vercel.app"],
    credentials: true,
}));
(0, routes_1.default)(app);
app.listen(PORT, () => {
    logger_1.default.info(`server is up on port ${PORT}`);
});
exports.default = app;
