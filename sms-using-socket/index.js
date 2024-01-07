const bodyParser = require('body-parser')
const express = require('express')
const ejs = require('ejs')
const { Vonage } = require('@vonage/server-sdk')
const socketio = require('socket.io')

//init nexmo
const vonage = new Vonage(
    {
        apiKey: '9a867917',
        apiSecret: 'WcB2RfCakl2Ze01i',
    },
    { debug: true }
)

//init app
const app = express()

//middleware for ejs
app.set('view engine', 'html')
app.engine('html', ejs.renderFile)

//public folder
app.use(express.static(__dirname + '/public'))

//Middleware for body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//index route
app.get('/', (req, res) => {
    res.render('index')
})

//Catch form submit
app.post('/', (req, res) => {
    // res.send(req.body)
    // console.log(req.body)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on Port ${PORT}`))
