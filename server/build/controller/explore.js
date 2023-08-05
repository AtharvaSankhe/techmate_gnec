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
exports.addConnection = exports.firstBatch = void 0;
const firebaseconfig_1 = require("../config/firebaseconfig");
const auth_1 = require("firebase/auth");
const db = firebaseconfig_1.admin.firestore();
const auth = (0, auth_1.getAuth)(firebaseconfig_1.app);
const auth_admin = firebaseconfig_1.admin.auth();
const bucket = firebaseconfig_1.admin.storage().bucket();
const firstBatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid; // Use 'as any' to bypass TypeScript error
    console.log("hii");
    const usersCollectionRef = db.collection('user');
    usersCollectionRef.get()
        .then((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
            // Include the document ID as part of the data
            console.log(doc.data());
            users.push(Object.assign({ id: doc.id }, doc.data()));
        });
        // Send the response with the data
        res.json(users);
    })
        .catch((error) => {
        console.error('Error getting documents: ', error);
        res.status(500).json({ error: 'Something went wrong' });
    });
});
exports.firstBatch = firstBatch;
const addConnection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid; // Use 'as any' to bypass TypeScript error
    const follower_id = req.body.follower_id;
    const follower_username = req.body.follower_username;
    const usersCollectionRef = db.collection('user');
    const userDocRef = usersCollectionRef.doc(follower_id);
    try {
        // Check if the document already exists
        const userDocSnapshot = yield userDocRef.get();
        if (!userDocSnapshot.exists) {
            console.log("userdocument does not exist");
        }
        else {
            // If the document exists, update the "followers" field by appending the new follower detail
            yield userDocRef.update({
                followers: firebaseconfig_1.admin.firestore.FieldValue.arrayUnion({
                    id: uid,
                    username: follower_username,
                })
            });
        }
        res.status(200).json({ message: "Follower added successfully!" });
        console.log("Follower added successfully!");
    }
    catch (error) {
        console.error('Error adding follower: ', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});
exports.addConnection = addConnection;
