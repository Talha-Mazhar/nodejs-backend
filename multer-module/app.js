const express = require('express')
const multer = require('multer')
const ejs = require('ejs')
const path = require('path')

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        )
    },
})

//init upload
//for multuple file upload u need to do .array
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
}).single('myImage')

function checkFileType(file, cb) {
    //Allowed extensions
    const fileTypes = /jpeg|jpg|png|gif/
    const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
    )
    //Check mime-type
    const mimetype = fileTypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        return cb('Error: Images Only!')
    }
}

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('./public'))

app.get('/', (req, res) => res.render('index'))
app.post('/upload', (req, res) => {
    upload(req, res, err => {
        if (err) {
            res.render('index', {
                msg: err,
            })
        } else {
            if (req.file === undefined) {
                res.render('index', {
                    msg: 'Error: No file Selected',
                })
            } else {
                res.render('index', {
                    msg: 'File uploaded',
                    file: `uploads/${req.file.filename}`,
                })
            }
        }
    })
})
const port = 3000
app.listen(port, () => console.log(`Server started on ${port}`))
