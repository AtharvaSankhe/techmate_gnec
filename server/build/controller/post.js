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
exports.addPost = void 0;
const firebaseconfig_1 = require("../config/firebaseconfig");
const auth_1 = require("firebase/auth");
const db = firebaseconfig_1.admin.firestore();
const auth = (0, auth_1.getAuth)(firebaseconfig_1.app);
const auth_admin = firebaseconfig_1.admin.auth();
const bucket = firebaseconfig_1.admin.storage().bucket();
// interface CustomRequest extends Request {
//     uid: string; // Add the 'uid' property to the request
//     file: Express.Multer.File;
//   }
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const uid=req.body.uid;
    const uid = req.uid; // Use 'as any' to bypass TypeScript error
    const newpost = req.body.newpost;
    const newsubject = req.body.newsubject;
    console.log(uid);
    const docRef = db.collection('user').doc(uid);
    // const res = await docRef.update({post: true});
    docRef
        .get()
        .then((doc) => {
        if (doc.exists) {
            const currentPosts = doc.data().post || []; // If "post" doesn't exist, initialize as an empty array
            // Step 2: Add the new post and post subject to the array
            const newPostData = {
                postContent: newpost,
                postSubject: newsubject,
            };
            currentPosts.push(newPostData);
            // Step 3: Update the "post" field with the modified array
            return docRef.update({ post: currentPosts });
        }
        else {
            console.log('Document does not exist!');
        }
    })
        .then(() => {
        console.log('Document updated successfully!');
        res.send("document updated");
    })
        .catch((error) => {
        console.error('Error updating document:', error);
        res.send("document not updated");
    });
});
exports.addPost = addPost;
