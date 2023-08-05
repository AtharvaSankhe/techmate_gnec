"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsPage = void 0;
const firebaseconfig_1 = require("../config/firebaseconfig");
const auth_1 = require("firebase/auth");
const db = firebaseconfig_1.admin.firestore();
const auth = (0, auth_1.getAuth)(firebaseconfig_1.app);
const auth_admin = firebaseconfig_1.admin.auth();
const bucket = firebaseconfig_1.admin.storage().bucket();
const eventsPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid; // Use 'as any' to bypass TypeScript error
    try {
        const snapshot = yield db.collection("user").get();
        const usersData = [];
        let userData;
        snapshot.forEach((doc) => {
            // console.log(doc.data())
            userData = {
                username: doc.data().username,
                chat: doc.data().post,
            };
            usersData.push(userData);
        });
        console.log(usersData);
        res.json(usersData);
    }
    catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});
exports.eventsPage = eventsPage;
