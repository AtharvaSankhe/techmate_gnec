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

export const eventsPage= async (req: Request, res: Response) => {
    const uid = (req as any).uid; // Use 'as any' to bypass TypeScript error
    try {
        const snapshot: QuerySnapshot = await db.collection("user").get();
        const usersData: any[] = [];
        let userData:any;
        snapshot.forEach((doc: QueryDocumentSnapshot) => {
            // console.log(doc.data())
           userData= {
            username: doc.data().username,
            chat: doc.data().post,
          };
          usersData.push(userData)
        });
        console.log(usersData)
        res.json(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
      }
}