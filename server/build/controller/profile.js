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
exports.getProfile = void 0;
const firebaseconfig_1 = require("../config/firebaseconfig");
const auth_1 = require("firebase/auth");
const db = firebaseconfig_1.admin.firestore();
const auth = (0, auth_1.getAuth)(firebaseconfig_1.app);
const auth_admin = firebaseconfig_1.admin.auth();
const bucket = firebaseconfig_1.admin.storage().bucket();
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid; // Use 'as any' to bypass TypeScript error
    const docRef = db.collection('user').doc(uid);
    docRef.get()
        .then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/techmate-ts.appspot.com/o/${encodeURIComponent(uid)}?alt=media`;
            res.send({ "user_data": data, "imageurl": imageUrl });
        }
        else {
            console.log('Document does not exist');
        }
    })
        .catch((error) => {
        console.log('Error getting document:', error);
    });
    //  res.send("profile data found")
});
exports.getProfile = getProfile;
