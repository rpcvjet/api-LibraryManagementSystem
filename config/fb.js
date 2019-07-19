//const firebase = require('firebase-admin');
const gcsHelpers = require('./lib');
const path = require('path');


// const fb =  firebase.initializeApp({
//     credential: firebase.credential.cert({
//       apiKey: process.env.FIREBASE_WEB_API_KEY,
//       authDomain: process.env.AUTHDOMAIN,
//       storageBucket: process.env.STORAGE,
//       private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//       client_email:process.env.EMAIL,
//       databaseURL: process.env.DATABASEURL
//     }),
//   });

const { storage } = gcsHelpers;


// exports.sendUploadToGCS = (req, res, next) => {
//   console.log('req in fb.js', req.body)
//     if (!req.file) {
//       return next();
//     }
  
//     const bucketName = req.body.bucketName || DEFAULT_BUCKET_NAME;
//     const bucket = storage.bucket(bucketName);
//     const gcsFileName = `${Date.now()}-${req.file.originalname}`;
//     const file = bucket.file(gcsFileName);
  
//     const stream = file.createWriteStream({
//       metadata: {
//         contentType: req.file.mimetype,
//       },
//     });
  
//     stream.on('error', (err) => {
//       req.file.cloudStorageError = err;
//       next(err);
//     });
  
//     stream.on('finish', () => {
//       req.file.cloudStorageObject = gcsFileName;
  
//       return file.makePublic()
//         .then(() => {
//           req.file.gcsUrl = gcsHelpers.getPublicUrl(bucketName, gcsFileName);
//           next();
//         });
//     });
  
//     stream.end(req.file.buffer);

// }


//module.exports = fb;