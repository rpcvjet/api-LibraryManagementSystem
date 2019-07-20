'use strict';
const db = require('../config/db')
const helpers = require('../config/lib');
const path = require('path');
const Router = require('express').Router;
const Multer = require('multer');
const MemberRouter = module.exports = new Router();
const bodyParser = require('body-parser').json();
const { createWriteStream } = require("fs");
//const upload = multer()
const {gc} = helpers

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
  });

//add a new member to the library
MemberRouter.post('/api/member/add', bodyParser, multer.single('image'), (req, res, next) => {
    console.log(req.file)
    let fileUpload = () => {
        return new Promise((resolve, reject) => {
            const bucketName = process.env.STORAGE;
            const bucket = helpers.pictureBucket;
            const gcsFileName = `${Date.now()}-${req.file.originalname}`;
            const fileName =  helpers.pictureBucket.file(gcsFileName);

            const stream = fileName.createWriteStream({
                resumable: false,
                gzip: true,
                metadata: {
                  contentType: req.file.mimetype,
                },
              });
            
              stream.on('error', (err) => {         
                req.file.cloudStorageError = err;
                reject(err)
                console.log('upload error-->', err)
                return res.status(500).send('Unable to upload');

              });

              stream.on('finish', () => {           
                req.file.cloudStorageObject = gcsFileName;    
                return fileName.makePublic()
                .then(() => {
                    req.file.gcsUrl = helpers.getPublicUrl = (bucketName, fileName);
                    const results = `https://storage.googleapis.com/${bucketName}/${gcsFileName}`
                    resolve(results)
                    next();
                 });
              });
            
              stream.end(req.file.buffer);
        })
    }


    // if (req.file && req.file.gcsUrl) {
    //     return res.send(req.file.gcsUrl);
    //   }
  
 
    let request = (link) => {
        return new Promise((resolve, reject) => {

            const today = new Date().toISOString().slice(0,10)
            let post = {
                memberNumber: req.body.memberNumber,
                member_name: req.body.member_name,
                email: req.body.email,
                phone: req.body.phone,
                dateAdded: today,
                image: link,
            }
            const sql = "INSERT INTO Members SET ?"
            db.query(sql, post, (err, result) => {
                console.log('post', post)
                if (err) (
                    reject(err)
                )
                resolve(result)
            })
        })
    }

    fileUpload()
        .then((link) => {
            return request(link)
        .then(content => {
            res.status(200);
        })
    }).catch(next)

})




//get all members
MemberRouter.get('/api/member/all', (req, res, next) => {
    let request = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * from Members"
            db.query(sql, (err, result) => {
                if (err) (
                    reject(err)
                )
                resolve(result)
            })
        })
    }
    request().then(content => {
        res.json(content)
    }).catch(next)

})

//get member by name
TODO: //separate first and last name for easier search
MemberRouter.get('/api/member/name/:name', (req, res, next) => {
    let request = () => {
        return new Promise((resolve, reject) => {
            const name = req.params.name
            const sql = "SELECT * FROM Members WHERE member_name = ?"
            db.query(sql, name, (err, result) => {
                if (err) (
                    reject(err)
                )
                resolve(result)
            })
        })
    }
    request().then(content => {
        res.json(content)
    }).catch(next)

})

//get member data by id
MemberRouter.get('/api/member/:id', (req, res, next) => {
    let request = () => {
        return new Promise((resolve, reject) => {
            const id = req.params.id
            const sql = "SELECT * FROM Members WHERE id = ?"
            db.query(sql, id, (err, result) => {
                if (err) (
                    reject(err)
                )
                resolve(result)
            })
        })
    }
    request().then(content => {
        res.json(content)
    }).catch(next)

})

//get books checked out to member
MemberRouter.get('/api/booksout/:id', (req,res,next) => {
    
    let request = () => {
        return new Promise((resolve, reject) => {
            const id = req.params.id
            const sql = "SELECT * from Members_has_Books INNER JOIN Members ON Members_id = Members.id INNER JOIN Books ON Books_id = Books.id INNER JOIN Author ON Author_id = Author.id WHERE Members_id = ? "
            db.query(sql, id,(err, result) => {
                if (err) (
                    reject(err)
                )
                resolve(result)
            })
        })
    }
    request().then(content => {
        res.json(content)
    }).catch(next)
})

//update member data
MemberRouter.put('/api/member/update', bodyParser, (req,res,next) => {
    let request = () => {
        return new Promise((resolve, reject) => {
            //Updates must be arrays
            const Update = [
                req.body.email,
                req.body.phone,
                req.body.id
            ]
            const sql = "UPDATE Members SET email =?, phone = ? WHERE id =?"
            db.query(sql, Update,(err, result) => {
                console.log('update', Update)
                if (err) (
                    reject(err)
                )
                resolve(result)
            })
        })
    }
    request().then(content => {
        res.json(content)
    }).catch(next)
})







