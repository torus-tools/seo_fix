const sharp = require('sharp');
var fs = require('fs')

module.exports = function compressWebp(file, callback){
  let fileExtension = file.split(".")[1]
  let filePath = file.split('input/', 2)[1];
  let fileSubPath = filePath.split(".")[0];

  console.log(`Compressing ${fileExtension} file`)
    sharp(file)
    .webp({nearLossless: true, force: true})
    .toFile(`output/${fileSubPath}.webp`)
    .then( data => { 
      console.log(`compressed your ${fileExtension} image and saved as webp`)
      callback(null, true) 
    })
    .catch( err => { throw new Error(err) });
} 
