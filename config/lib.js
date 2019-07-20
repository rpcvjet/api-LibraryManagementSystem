'use strict';
const path = require('path');
const {Storage} = require('@google-cloud/storage');

const GOOGLE_CLOUD_PROJECT_ID = process.env.PROJECT_ID;
const GOOGLE_CLOUD_KEYFILE = path.join(__dirname, "../config/librarystorage-2211a-firebase-adminsdk-tkpi1-68a48de734.json");

const gc = new Storage({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: GOOGLE_CLOUD_KEYFILE,
})

exports.pictureBucket = gc.bucket(process.env.STORAGE);

exports.getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;
