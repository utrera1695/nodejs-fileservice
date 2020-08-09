'use strict';
var path = require('path');
var fs = require('fs-extra');

async function UploadSingleFile(req, res) {
  try {
    res.status(200).send({
      url: req.protocol +
        '://' +
        req.get('host') +
        '/fileapi/file/' +
        req.file.filename,
    });
  } catch (error) {
    res.status(500).send({
      error: error,
    });
  }
}

async function GetFile(req, res) {
  try {
    res.sendFile(path.resolve('uploads/' + req.params.file));
  } catch (error) {
    res.status(500).send({
      error: error,
    });
  }
}
async function UploadFileBase64(req, res) {
  try {
    let base64 = req.body.base;
    let imageTypeDetected = imageBuffer.type.match(/\/(.*?)$/);
    let base64Image = base64.split(';base64,').pop();
    let randomPart = Math.random().toString(36).substr(2, 5);
    fs.writeFile(
      'file-' + randomPart + imageTypeDetected[1],
      base64Image, {
        encoding: 'base64'
      },
      function () {
        res.status(200).send({
          url: req.protocol +
            '://' +
            req.get('host') +
            '/fileapi/file/file-' +
            randomPart +
            imageTypeDetected[1],
        });
      }
    );
  } catch (error) {
    res.status(500).send({
      error: error,
    });
  }
}
module.exports = {
  UploadSingleFile,
  GetFile,
  UploadFileBase64,
};