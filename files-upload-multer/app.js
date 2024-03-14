const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const path = require('path')
const Crypto = require('crypto')
const mongoose = require('mongoose')
const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const methodOverride = require('method-override')

const app = express()

//db config
const db = require('./config/keys').MongoURI

//Middleware
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')

mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected.'))
    .catch(err => console.log(err))

// Create mongo connection
const conn = mongoose.connection
// Init gfs
let gfs
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('uploads')
})

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.get('/', (req, res) => res.render('index'))

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file })
})

const port = 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
