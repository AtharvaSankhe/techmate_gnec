import { error } from "console";
import { admin, app } from "../config/firebaseconfig";
import { Request, Response } from "express";

const db = admin.firestore();
const bucket = admin.storage().bucket();

interface LocationData {
  [key: string]: string;
}

export const addData = async (uid: string, req: Request, res: Response) => {
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
    const locationData: LocationData = {};
    if (town) locationData["town"] = town;
    if (suburb) locationData["suburb"] = suburb;
    if (state) locationData["state"] = state;
    if (country) locationData["country"] = country;

    const userData = {
      username,
      email,
      gender,
      profession,
      ...(Object.keys(locationData).length > 0 && { location: locationData }),
    };

    const userres = await db
      .collection("user")
      .doc(uid)
      .set(userData, { merge: true });

    const usernameres = await db.collection("usernames").doc(uid).set({
      username,
    });
    console.log("User Added document with ID: ", userres.id);
    console.log("Username added with ID: ", usernameres.id);
    // File upload to Firebase Storage
    // const bucketFileName = `user_photos/${selectedPhoto.originalname}`;
    const bucketFileName = `${uid}`;
    const bucketFile = bucket.file(bucketFileName);
    await bucketFile.save(selectedPhoto.buffer, {
      metadata: {
        contentType: selectedPhoto.mimetype,
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};
