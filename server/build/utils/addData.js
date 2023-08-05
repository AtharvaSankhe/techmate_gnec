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
exports.addData = void 0;
const firebaseconfig_1 = require("../config/firebaseconfig");
const db = firebaseconfig_1.admin.firestore();
const bucket = firebaseconfig_1.admin.storage().bucket();
const addData = (uid, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.userName;
    const email = req.body.email;
    const gender = req.body.usergender;
    const profession = req.body.userProfession;
    const userlocation = JSON.parse(req.body.userlocation); // Convert JSON string to an object
    const { town, suburb, state, country } = userlocation; // Destructure the properties
    const selectedPhoto = req.file;
    if (!selectedPhoto) {
        return res.status(400).send("No photo selected.");
    }
    try {
        const locationData = {};
        if (town)
            locationData["town"] = town;
        if (suburb)
            locationData["suburb"] = suburb;
        if (state)
            locationData["state"] = state;
        if (country)
            locationData["country"] = country;
        const userData = Object.assign({ username,
            email,
            gender,
            profession }, (Object.keys(locationData).length > 0 && { location: locationData }));
        const userres = yield db
            .collection("user")
            .doc(uid)
            .set(userData, { merge: true });
        const usernameres = yield db.collection("usernames").doc(uid).set({
            username,
        });
        console.log("User Added document with ID: ", userres.id);
        console.log("Username added with ID: ", usernameres.id);
        // File upload to Firebase Storage
        // const bucketFileName = `user_photos/${selectedPhoto.originalname}`;
        const bucketFileName = `${uid}`;
        const bucketFile = bucket.file(bucketFileName);
        yield bucketFile.save(selectedPhoto.buffer, {
            metadata: {
                contentType: selectedPhoto.mimetype,
            },
        });
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
exports.addData = addData;
