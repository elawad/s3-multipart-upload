(function () {
 'use strict';

  var Busboy = require('busboy');
  var stream = require('stream');
  var S3 = require('aws-sdk/clients/s3');
  var config = require('../config').aws;
  var s3Util = require('../lib/s3');

  var s3Client = new S3({
    region: config.region
  });

  var s3 = {
    bucket: process.env.S3_BUCKET,
    folder: process.env.S3_FOLDER,
    partSize: config.s3.partSize,
    queueSize: config.s3.queueSize,
  };

  module.exports.upload = function (request, reply) {
    var headers = request.raw.req.headers;
    var payload = request.payload; // to pipe, set parse to false in route
    var keyPrefix = '';

    var busboy = new Busboy({ headers });
    console.log();

    busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
      console.log('on Field: [' + fieldname + '] Value: [' + val + ']');

      if (fieldname === 'keyPrefix') {
        if (val) keyPrefix = val + '_';
      }
    });

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      console.log('on File: [' + fieldname + '] Name: [' + filename + ']');

      var tStart = new Date().getTime();

      // file.on('data', function(data) {
      //   console.log('on Data: File [' + fieldname + '] got ' + data.length + ' bytes');
      // });

      file.on('end', function() {
        console.log('on File End: [' + fieldname + ']');
      });

      var pass = new stream.PassThrough();
      var keyName = keyPrefix + filename;
      var folderName = s3.folder || '';
      var fullPath = s3Util.buildPath([folderName, keyName]);

      const params = {
        Bucket: s3.bucket,
        Key: fullPath,
        Body: pass
      };

      const options = {
        partSize: s3.partSize,
        queueSize: s3.queueSize
      };

      if (filename) {
        s3Client.upload(params, options, (err, data) => {
          if (err) throw err;
          var tEnd = new Date().getTime();

          console.log('S3 Multi Uploaded:', data.Location);
          console.log('Time:', (tEnd - tStart) / 1000 % 60);
        });
      }

      file.pipe(pass);
    });

    busboy.on('finish', () => {
      console.log('on Finish');

      reply('Finished !');
    });

    busboy.on('error', error => { throw error; });

    // Pipe hapi payload to busboy
    payload.pipe(busboy);
  };

})();
