const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const app = express()

//Passport Config
require('./config/passport')(passport)

//db config
const db = require('./config/keys').MongoURI

//connect to db
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

//MiddleWare For Express Session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
)

//MiddleWare Passport
app.use(passport.initialize())
app.use(passport.session())

//MiddleWare for connect flash
app.use(flash())

//Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

//MiddleWare Ejs
app.use(expressLayouts)
app.set('view engine', 'ejs')

//Body parser
app.use(express.urlencoded({ extended: false }))

//Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on Port ${PORT}`))
