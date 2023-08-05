import { Request, Response } from "express";
import { admin, app } from "../config/firebaseconfig";
import { getAuth } from "firebase/auth";
import { addData } from "../utils/addData";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { QueryDocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore"; // Import the types
import multer, { Multer } from "multer";

const db = admin.firestore();
const auth = getAuth(app);
const auth_admin = admin.auth();

const bucket = admin.storage().bucket();

// interface CustomRequest extends Request {
//     uid: string; // Add the 'uid' property to the request
//     file: Express.Multer.File;
//   }
export const addPost = async (req: Request, res: Response) => {
    // const uid=req.body.uid;
    const uid = (req as any).uid; // Use 'as any' to bypass TypeScript error
    const newpost=req.body.newpost
    const newsubject=req.body.newsubject
    console.log(uid)
    const docRef = db.collection('user').doc(uid);
    // const res = await docRef.update({post: true});
    docRef
  .get()
  .then((doc:any) => {
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
    } else {
      console.log('Document does not exist!');
    }
  })
  .then(() => {
    console.log('Document updated successfully!');
    res.send("document updated")
})
.catch((error:any) => {
    console.error('Error updating document:', error);
    res.send("document not updated")
  });
  };