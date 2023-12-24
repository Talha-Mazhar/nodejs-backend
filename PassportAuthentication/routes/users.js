const express = require('express')

const router = express.Router()

//Login
router.get('/login', (req, res) => res.render('login'))

//Register

router.get('/register', (req, res) => res.render('register'))

//Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body
    //validation
})

module.exports = router
