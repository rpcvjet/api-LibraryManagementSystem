'use strict';

const jwtSecret = require('./jwtconfig');
const bcrypt = require('bcrypt');
const jsonParser = require('body-parser').json();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const localStrategy = require('passport-local');


const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('JWT'),
    secretOrKey: jwtSecret.secret
};

//used on protected routes
passport.use('jwt',new JWTstrategy(opts, (jwt_payload, done) => {
      try {
        TODO: //fix this
        Employee.findOne({
          where: {
            email: jwt_payload.id,
          },
        }).then(employee => {
          if (employee) {
            console.log('employee found in db in passport');
            // note the return removed with passport JWT - add this return for passport local
            done(null, employee);
          } else {
            console.log('employee not found in db');
            done(null, false);
          }
        });
      } catch (err) {
        done(err);
      }
    }),
  );

  //log in strategy
passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
      },
      (email, password, done) => {
          console.log('passwprd submitted', password)
        try {
          Employee.findOne({
            where: {
              email: email,
            },
          }).then(emp => {
            if (!emp) {
              return done(null, false, { message: 'bad email' });
            } else {
              bcrypt.compare(password, emp.password).then(response => {
                if (response !== true) {
                //   console.log('passwords do not match');
                  return done(null, false, { message: 'passwords do not match' });
                }
                console.log('user found & authenticated');
                // note the return needed with passport local - remove this return for passport JWT
                 done(null, emp);
              });
            }
          });
        } catch (err) {
          done(err);
        }
      },
    ),
  );
