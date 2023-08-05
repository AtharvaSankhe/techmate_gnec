"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.admin = void 0;
const app_1 = require("firebase/app");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.admin = require('firebase-admin');
const serviceAccountkey_json_1 = __importDefault(require("./serviceAccountkey.json"));
exports.admin.initializeApp({
    credential: exports.admin.credential.cert(serviceAccountkey_json_1.default),
    // databaseURL: "YOUR DATABASE URL"
    storageBucket: "gs://techmate-ts.appspot.com"
});
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.API_AUTHDOMAIN,
    projectId: process.env.API_PROJECTID,
    storageBucket: process.env.API_STORAGEBUCKET,
    messagingSenderId: process.env.API_MESSAGINGSENDERID,
    appId: process.env.API_APPID,
    measurementId: process.env.API_MESSUREMENTID
};
// Initialize Firebase
exports.app = (0, app_1.initializeApp)(firebaseConfig);
// export const db = getFirestore(app);
// export const auth = getAuth(app);
module.exports = { admin: exports.admin, app: exports.app };
