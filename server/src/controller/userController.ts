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

const db = admin.firestore();
const auth = getAuth(app);
const auth_admin = admin.auth();

// Define a custom Request type that includes the file property from Multer
import multer, { Multer } from "multer";

interface CustomRequest extends Request {
  file: Express.Multer.File;
}

export const checkServer = (req: Request, res: Response) => {
  return res.status(200).send("Techmate server running");
};

export const checkUserName = async (req: Request, res: Response) => {
  const username = req.body.userName; // Access the userName from req.body
  console.log(username);
  try {
    let query = db.collection("usernames").where("username", "==", username);
    const querySnapshot = await query.get();
    // Check if the querySnapshot is empty
    if (querySnapshot.empty) {
      console.log("No documents found with username === 'trial'");
      return res.send("Username available");
    } else {
      querySnapshot.forEach((documentSnapshot: QueryDocumentSnapshot) => {
        console.log(`Found document at ${documentSnapshot.ref.path}`);
        return res.send("Username unavailable");
      });
    }
  } catch (error) {
    console.error("Error querying the user collection:", error);
    return res.status(500).send(error);
  }
};

export const createUser = (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const country = req.body.userlocation.country;
  console.log(req.body);
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // User account created successfully
      const user = userCredential.user;
      const uid = user.uid; // Retrieve the UID
      console.log("User created:", uid);
      // // Send email verification
      try {
        await sendEmailVerification(user);
        try {
          await addData(uid, req, res); // Call addData here
        } catch (error) {
          console.log("error adding data to firebase");
          res.send("error adding data to firebase");
        }
        console.log("Verification email sent.");
        return res.status(200).send("User Created");
      } catch (error) {
        console.error("Error sending verification email:", error);
        return res.status(500).send("Error sending verification email");
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error creating user:", errorCode, errorMessage);
      return res.status(500).send("Error creating user");
    });
};

export const signinUser = (req: Request, res: Response) => {
  console.log("Selected photo:");
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  //  var userId: string;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Check if email is verified
      if (user.emailVerified) {
        user.getIdToken(true).then((id) => {
          res.cookie(`token`,id,{
            // expires works the same as the maxAge
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        });          
        res.send({ message: "User signed in successfully"})
          return res
          // return res.status(200).json({ message: "User signed in successfully","token":id});
        });
      } else {
        return res
          .status(200)
          .json({ message: "Please verify your email before proceeding." });
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing in user:", errorCode, errorMessage);
      return res.status(500).json({ error: "Please check your credentials" });
    });
};

export const logout = (req: Request, res: Response) => {
  // Check if the "access_token" cookie is present
  if(req.cookies.token){
    res.clearCookie("token");
  res.status(200).send("Cookie cleared successfully");
  }
  else{
    res.status(200).send("Cookie already cleared")
  }
};
