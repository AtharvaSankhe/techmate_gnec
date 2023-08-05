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
exports.logout = exports.signinUser = exports.createUser = exports.checkUserName = exports.checkServer = void 0;
const firebaseconfig_1 = require("../config/firebaseconfig");
const auth_1 = require("firebase/auth");
const addData_1 = require("../utils/addData");
const auth_2 = require("firebase/auth");
const db = firebaseconfig_1.admin.firestore();
const auth = (0, auth_1.getAuth)(firebaseconfig_1.app);
const auth_admin = firebaseconfig_1.admin.auth();
const checkServer = (req, res) => {
    return res.status(200).send("Techmate server running");
};
exports.checkServer = checkServer;
const checkUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.userName; // Access the userName from req.body
    console.log(username);
    try {
        let query = db.collection("usernames").where("username", "==", username);
        const querySnapshot = yield query.get();
        // Check if the querySnapshot is empty
        if (querySnapshot.empty) {
            console.log("No documents found with username === 'trial'");
            return res.send("Username available");
        }
        else {
            querySnapshot.forEach((documentSnapshot) => {
                console.log(`Found document at ${documentSnapshot.ref.path}`);
                return res.send("Username unavailable");
            });
        }
    }
    catch (error) {
        console.error("Error querying the user collection:", error);
        return res.status(500).send(error);
    }
});
exports.checkUserName = checkUserName;
const createUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const country = req.body.userlocation.country;
    console.log(req.body);
    (0, auth_2.createUserWithEmailAndPassword)(auth, email, password)
        .then((userCredential) => __awaiter(void 0, void 0, void 0, function* () {
        // User account created successfully
        const user = userCredential.user;
        const uid = user.uid; // Retrieve the UID
        console.log("User created:", uid);
        // // Send email verification
        try {
            yield (0, auth_2.sendEmailVerification)(user);
            try {
                yield (0, addData_1.addData)(uid, req, res); // Call addData here
            }
            catch (error) {
                console.log("error adding data to firebase");
                res.send("error adding data to firebase");
            }
            console.log("Verification email sent.");
            return res.status(200).send("User Created");
        }
        catch (error) {
            console.error("Error sending verification email:", error);
            return res.status(500).send("Error sending verification email");
        }
    }))
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error creating user:", errorCode, errorMessage);
        return res.status(500).send("Error creating user");
    });
};
exports.createUser = createUser;
const signinUser = (req, res) => {
    console.log("Selected photo:");
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    //  var userId: string;
    (0, auth_2.signInWithEmailAndPassword)(auth, email, password)
        .then((userCredential) => {
        const user = userCredential.user;
        // Check if email is verified
        if (user.emailVerified) {
            user.getIdToken(true).then((id) => {
                res.cookie(`token`, id, {
                    // expires works the same as the maxAge
                    secure: true,
                    httpOnly: true,
                    sameSite: 'none'
                });
                res.send({ message: "User signed in successfully" });
                return res;
                // return res.status(200).json({ message: "User signed in successfully","token":id});
            });
        }
        else {
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
exports.signinUser = signinUser;
const logout = (req, res) => {
    // Check if the "access_token" cookie is present
    if (req.cookies.token) {
        res.clearCookie("token");
        res.status(200).send("Cookie cleared successfully");
    }
    else {
        res.status(200).send("Cookie already cleared");
    }
};
exports.logout = logout;
