'use strict';

var express = require('express');
var multer = require('multer');
var FileService = require('../service/file.service');
var api = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    console.log(file);
    const randomPart = Math.random().toString(36).substr(2, 5); // use whatever random you want.
    const extension = file.mimetype.split('/')[1];
    cb(null, 'file-' + randomPart + `.${extension}`);
  },
});
var upload = multer({
  storage: storage,
});

api.post('/file/upload', upload.single('file'), FileService.UploadSingleFile);
api.post('/file/upload/base64', FileService.UploadSingleFile);
api.get('/file/:file', FileService.UploadFileBase64);

module.exports = api;
