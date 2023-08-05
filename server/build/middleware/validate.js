"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const firebaseconfig_1 = require("../config/firebaseconfig");
const auth_1 = require("firebase/auth");
const db = firebaseconfig_1.admin.firestore();
const auth = (0, auth_1.getAuth)(firebaseconfig_1.app);
const auth_admin = firebaseconfig_1.admin.auth();
const validateToken = (req, res, next) => {
    console.log("valid hu");
    const accessToken = req.cookies.token;
    if (!accessToken) {
        console.log("hii");
        return res.status(401).json({ error: "Unauthorized: Missing JWT" });
    }
    auth_admin
        .verifyIdToken(accessToken)
        .then((decodedToken) => {
        const uid = decodedToken.uid;
        console.log("uid found");
        console.log(uid);
        // Store the uid in the request object for use in the route handler
        req.uid = uid;
        next();
        // return res.send(uid);
    })
        .catch((error) => {
        // Handle error
        console.log(error);
        return res.status(401).json({ error: "Unauthorized: Invalid JWT" });
    });
};
exports.validateToken = validateToken;
