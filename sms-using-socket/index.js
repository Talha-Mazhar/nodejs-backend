const bodyParser = require('body-parser')
const express = require('express')
const ejs = require('ejs')
const { Vonage } = require('@vonage/server-sdk')
const socketio = require('socket.io')
const cors = require('cors')

//init nexmo
const vonage = new Vonage(
    {
        apiKey: '9a867917',
        apiSecret: 'WcB2RfCakl2Ze01i',
    }
    // { debug: true }
)

//init app
const app = express()

// Use CORS middleware
app.use(cors())

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
    const { number, text } = req.body

    vonage.messages.send(
        'Vonage APIs',
        number,
        text,
        { type: 'unicode' },
        (err, responseData) => {
            if (err) {
                // console.log(err)
            } else {
                // console.log(responseData)
                console.dir(responseData)
                const data = {
                    id: responseData.messages[0]['message-id'],
                    number: responseData.messages[0]['to'],
                }
                io.emit('smsStatus', data)
            }
        }
    )
})

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server started on Port ${PORT}`))

//connect to socket

const io = socketio(server)
io.on('connection', socket => {
    console.log('connected')
    io.on('disconnect', () => {
        console.log('disconnect')
    })
})
