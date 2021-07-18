let express = require('express');
const userRouter = express.Router();
const userController = require('../controller/user')
let fs = require('fs')
const path = require('path');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `./public/${req.params.id}/`);
    },
    
    filename: function(req, file, cb) {
        console.log("working",file)
        cb(null, file.fieldname + '-' + Date.now().toString() + path.extname(file.originalname) );
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 4 * 1024 * 1024 }
})


userRouter.post('/step1/:id', userController.step1);
userRouter.post('/step2/:id',upload.array('resume'), userController.step2);
userRouter.post('/step3/:id',upload.array('ssn'), (req, res) => {res.status(200).send({message: "document submitted successfully"})});
userRouter.post('/step4/:id',upload.array('id'), (req, res) => {res.status(200).send({message: "document submitted successfully"})});
userRouter.post('/step5/:id',upload.array('selfie'), (req, res) => {res.status(200).send({message: "document submitted successfully"})});

  

module.exports = userRouter;