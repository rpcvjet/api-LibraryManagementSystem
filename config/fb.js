const firebase = require('firebase');
const admin = require('firebase-admin');
const mogran = require('morgan');



 const fb = admin.initializeApp({
    credential: admin.credential.cert({
        databaseURL: `${process.env.DATABASEURL}`,
        apiKey: process.env.FIREBASE_WEB_API_KEY,
        authDomain: `${process.env.AUTHDOMAIN}`,
        storageBucket: `${process.env.STORAGE}`,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email:process.env.EMAIL
    }),
  });




module.exports = fb;