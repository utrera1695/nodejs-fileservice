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

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = Buffer.from(matches[2], 'base64');

  return response;
}
async function UploadFileBase64(req, res) {
  try {
    let base64 = req.body.base;
    var imageBuffer = decodeBase64Image(base64);
    let imageTypeDetected = imageBuffer.type.match(/\/(.*?)$/);
    let randomPart = Math.random().toString(36).substr(2, 5);
    let filename = 'file-' + randomPart + '.' + imageTypeDetected[1]
    fs.writeFile(
      filename,
      imageBuffer.data,
      function () {
        res.status(200).send({
          url: req.protocol +
            '://' +
            req.get('host') +
            '/fileapi/file/' +
            filename,
        });
      }
    );
  } catch (error) {
    console.log(error)
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