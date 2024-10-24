const express = require('express')
const bodyParser = require('body-parser')
// const crypto = require('crypto')
const path = require('path')
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

var gfs
async function connectDB() {
    try {
        await mongoose.connect(db)
        console.log('MongoDB connected.')
        Grid.mongo = mongoose.mongo
        gfs = Grid(mongoose.connection.db) // Create gfs after connection is established
    } catch (err) {
        console.error(err)
    }
}

connectDB()

// set up connection to db for file storage
const storage = GridFsStorage({
    db: mongoose.connection.db,
    file: (req, file) => {
        return {
            filename: file.originalname,
        }
    },
})

// sets file input to single file
const upload = multer({ storage: storage })

// const upload = multer({ storage })
// Use multer as a middleware to upload the file
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file }) // Send the fileId in the response
})

app.get('/', (req, res) => res.render('index'))

const port = 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
