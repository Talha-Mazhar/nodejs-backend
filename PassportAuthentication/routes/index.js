const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')
const { ensureToken } = require('../config/accessTokens')
const jwt = require('jsonwebtoken')
//Welcome Page
router.get('/', (req, res) => res.render('welcome'))

//Dashboard
router.get('/dashboard', ensureToken, ensureAuthenticated, (req, res) => {
    jwt.verify(req.access_token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.render('dashboard', {
                name: req.user.name,
            })
            res.json({
                authData,
            })
        }
    })
})

module.exports = router
