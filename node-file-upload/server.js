const express = require('express');
const multer = require('multer');
const app = express();
const path = require("path");
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
})


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Only .jpg, .jpeg, and .png file types are allowed'), false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: fileFilter
}).single('imageUp');

app.post('/uploadImage', function (req,res,next){
    upload(req,res,function (err){
        if(err){
            res.send(err);
        }else {
            res.send('Image uploaded successfully');
        }
    });
})

app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page', message: 'Welcome to my website!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

