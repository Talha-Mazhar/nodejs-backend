const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose') //here login is used so mongoose
const bcrypt = require('bcryptjs') //to hash password to decrypt password

//Local User Modal
const User = require('../modals/User')
module.exports = function (passport) {
    passport.use(
        new LocalStrategy(
            { usernameField: 'email' },
            (email, password, done) => {
                //Match User
                User.findOne({ email: email })
                    .then(user => {
                        if (!user) {
                            return done(null, false, {
                                message: 'That email is not registered',
                            })
                        }
                        //Match Password
                        bcrypt.compare(
                            password,
                            user.password,
                            (err, isMatch) => {
                                if (err) throw err
                                if (isMatch) {
                                    return done(null, user)
                                } else {
                                    return done(null, false, {
                                        message: 'Password Incorrect',
                                    })
                                }
                            }
                        )
                    })
                    .catch(err => console.log(err))
            }
        )
    )
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => {
                done(null, user)
            })
            .catch(err => {
                done(err, null)
            })
    })
}
