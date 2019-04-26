'use strict';
const db = require('../config/db')
const Router = require('express').Router;
const MemberRouter = module.exports = new Router();
const bodyParser = require('body-parser').json();


//add a new member to the library
MemberRouter.post('/api/member/add', bodyParser, (req, res, next) => {
    console.log('req', req.body)
    let request = () => {
        return new Promise((resolve, reject) => {

            const today = new Date().toISOString().slice(0,10)
            let post = {
                memberNumber: req.body.memberNumber,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                dateAdded: today,
                image: req.body.image,
            }
            const sql = "INSERT INTO Member SET ?"
            db.query(sql, post, (err, result) => {
                if (err) (
                    reject(err)
                )
                resolve(result)
            })
        })
    }
    request().then(content => {
        res.json('Success')
    }).catch(next)

})
//get all members
MemberRouter.get('/api/member/all', (req, res, next) => {
    let request = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Member"
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

//get member by memberNumber
MemberRouter.get('/api/member/:memberNumber', (req, res, next) => {
    let request = () => {
        return new Promise((resolve, reject) => {
            const id = req.params.memberNumber
            const sql = "SELECT * FROM Member WHERE memberNumber = ?"
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

//get member by name
TODO: //separate first and last name for easier search
MemberRouter.get('/api/member/name/:name', (req, res, next) => {
    let request = () => {
        return new Promise((resolve, reject) => {
            const name = req.params.name
            const sql = "SELECT * FROM Member WHERE name = ?"
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

//get all checked out books by user

MemberRouter.get('/api/member/userId/:id', (req, res, next) => {
    let request = () => {
        return new Promise((resolve, reject) => {
            const id = req.params.id
            const sql = "SELECT ISBN, genre, volume, edition, publicationYear, title from Book WHERE Member_id =?"
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





