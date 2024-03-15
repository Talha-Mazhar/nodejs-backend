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

// connection
const conn = mongoose.createConnection(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// init gfs
let gfs
conn.once('open', () => {
    // init stream
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads',
    })
})

// Set up GridFS storage engine
const storage = new GridFsStorage({
    url: db,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err)
                }
                const filename =
                    buf.toString('hex') + path.extname(file.originalname)
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads',
                }
                resolve(fileInfo)
            })
        })
    },
})

const upload = multer({ storage })
// Use multer as a middleware to upload the file
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file }) // Send the fileId in the response
})

app.get('/', (req, res) => res.render('index'))

const port = 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
