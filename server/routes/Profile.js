const express = require('express')
const profileRouter = express.Router()
const controller = require('../controllers/profileController')
const multer = require("multer");

const upload = multer({dest: "../client/public/resources/uploads/"});

profileRouter.post('/save',  upload.single('avatar_file'), controller.updateUserInf)

module.exports = profileRouter