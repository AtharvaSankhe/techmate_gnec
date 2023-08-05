"use strict";
// import { auth ,admin} from './../config/firebaseconfig';
// import { Request, Response,NextFunction } from "express";
// export const verifyToken = (req:Request, res:Response, next:NextFunction) => {
//     const token = req.header('Authorization').replace('Bearer', '').trim()
//     var user = firebase.auth().currentUser;
//     if (user) {
//        admin.auth().verifyIdToken(token)
//       .then(function (decodedToken) {
//           if(decodedToken.uid === user.uid)
//           {
//              req.user = user.uid
//              return next()
//           }
//        }).catch(function (error) {
//          //Handle error
//        });
//     } else {
//        console.log("There is no current user.");
//     }
//     };
