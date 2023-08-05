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

export const firstBatch= async (req: Request, res: Response) => {

    const uid = (req as any).uid; // Use 'as any' to bypass TypeScript error
    console.log("hii")
    const usersCollectionRef = db.collection('user');
    usersCollectionRef.get()
    .then((querySnapshot:any) => {
      const users :any= [];
      querySnapshot.forEach((doc:any) => {
        // Include the document ID as part of the data
        console.log(doc.data())
        users.push({ id: doc.id, ...doc.data() });
      });

      // Send the response with the data
      res.json(users);
    })
    .catch((error:any) => {
      console.error('Error getting documents: ', error);
      res.status(500).json({ error: 'Something went wrong' });
    });
}

export const addConnection = async (req: Request, res: Response) => {
  const uid = (req as any).uid; // Use 'as any' to bypass TypeScript error
  const follower_id = req.body.follower_id;
  const follower_username = req.body.follower_username;

  const usersCollectionRef = db.collection('user');
  const userDocRef = usersCollectionRef.doc(follower_id);

  try {
    // Check if the document already exists
    const userDocSnapshot = await userDocRef.get();
    if (!userDocSnapshot.exists) {
      console.log("userdocument does not exist")
    } else {
      // If the document exists, update the "followers" field by appending the new follower detail
      await userDocRef.update({
        followers: admin.firestore.FieldValue.arrayUnion({
          id: uid,
          username: follower_username,
        })
      });
    }

    res.status(200).json({ message: "Follower added successfully!" });
    console.log("Follower added successfully!");
  } catch (error:any) {
    console.error('Error adding follower: ', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
