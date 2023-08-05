import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import dotenv from "dotenv";
dotenv.config();

export const admin = require('firebase-admin')
import serviceAccount from "./serviceAccountkey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "YOUR DATABASE URL"
  storageBucket: "gs://techmate-ts.appspot.com"
});

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.API_AUTHDOMAIN,
  projectId: process.env.API_PROJECTID,
  storageBucket: process.env.API_STORAGEBUCKET,
  messagingSenderId: process.env.API_MESSAGINGSENDERID,
  appId: process.env.API_APPID,
  measurementId: process.env.API_MESSUREMENTID
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const auth = getAuth(app);
module.exports= {admin,app};
