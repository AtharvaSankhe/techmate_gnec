import { Request, Response, NextFunction } from "express";
import { admin, app } from "../config/firebaseconfig";
import { getAuth } from "firebase/auth";
import { addData } from "../utils/addData";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { QueryDocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore"; // Import the types

const db = admin.firestore();
const auth = getAuth(app);
const auth_admin = admin.auth();

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("valid hu");

  const accessToken = req.cookies.token;
  if (!accessToken) {
    console.log("hii")
    return res.status(401).json({ error: "Unauthorized: Missing JWT" });
  }
  auth_admin
  .verifyIdToken(accessToken)
  .then((decodedToken: { uid: any }) => {
      const uid = decodedToken.uid;
      console.log("uid found");
      console.log(uid);
      // Store the uid in the request object for use in the route handler
      (req as Request & { uid: string }).uid = uid;

      next();
      // return res.send(uid);
    })
    .catch((error: any) => {
      // Handle error
      console.log(error)
      return res.status(401).json({ error: "Unauthorized: Invalid JWT" });
    });
};
