const sharp = require('sharp');
var fs = require('fs')

module.exports = function compressImage(file, callback){
  let fileExtension = file.split(".")[1]
  let filePath = file.split('input/', 2)[1];
  let fileSubPath = filePath.split(".")[0];

  if(fileExtension ==='svg'){
    console.log(`Compressing Scalable Vector Graphics ${file}`)
    console.log(`Compressing Portable Network Graphics ${file}`)
      sharp(file)
      .webp({nearLossless: true})
      .toFile(`output/${fileSubPath}.webp`)
      .then( data => { console.log(`compressed your ${fileExtension} image and saved as webp`) })
      .catch( err => { throw new Error(err) });
  }
  else if(fileExtension ==='jpg' || fileExtension ==='jpeg' || fileExtension ==='jfif' || fileExtension ==='pjpeg' || fileExtension ==='pjp'){
      console.log(`Compressing Joint Photographic Expert Group image ${file}`)
      sharp(file)
      .webp({nearLossless: true})
      .toFile(`output/${fileSubPath}.webp`)
      .then( data => { console.log(`compressed your ${fileExtension} image and saved as webp`) })
      .catch( err => { throw new Error(err) });
  }
  else if(fileExtension ==='png'){
      console.log(`Compressing Portable Network Graphics ${file}`)
      sharp(file)
      .webp({nearLossless: true})
      .toFile(`output/${fileSubPath}.webp`)
      .then( data => { console.log(`compressed your ${fileExtension} image and saved as webp`) })
      .catch( err => { throw new Error(err) });
  }
  else if(fileExtension ==='gif'){
    console.log(`Compressing Graphics Interchange Format ${file}`)
  }
  else if(fileExtension ==='tif' || fileExtension === 'tiff'){
    console.log(`Compressing Tagged Image File Format ${file}`)
    console.log(`Compressing Portable Network Graphics ${file}`)
      sharp(file)
      .webp({nearLossless: true})
      .toFile(`output/${fileSubPath}.webp`)
      .then( data => { console.log(`compressed your ${fileExtension} image and saved as webp`) })
      .catch( err => { throw new Error(err) });
  }
  else if(fileExtension ==='ico' || fileExtension ==='cur'){
    console.log(`Compressing Microsoft Icon ${file}`)
  }
  else if(fileExtension ==='bmp'){
    console.log(`Compressing 	Bitmap file ${file}`)
  }
  else if(fileExtension ==='apng'){
    console.log(`Compressing Animated Portable Network Graphics ${file}`)
  }
  else if(fileExtension ==='webp'){
    console.log(`Compressing Web Picture format ${file}`)
  }
  else callback(null, null)
} 
