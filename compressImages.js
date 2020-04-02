module.exports = function compressImage(file, callback){
  let fileExtension = file.split(".")[1]
  if(fileExtension ==='svg'){
    console.log(`Compressing Scalable Vector Graphics ${file}`)
  }
  else if(fileExtension ==='jpg' || fileExtension ==='jpeg' || fileExtension ==='jfif' || fileExtension ==='pjpeg' || fileExtension ==='pjp'){
      console.log(`Compressing Joint Photographic Expert Group image ${file}`)
  }
  else if(fileExtension ==='png'){
      console.log(`Compressing Portable Network Graphics ${file}`)
  }
  else if(fileExtension ==='gif'){
    console.log(`Compressing Graphics Interchange Format ${file}`)
  }
  else if(fileExtension ==='tif' || fileExtension === 'tiff'){
    console.log(`Compressing Tagged Image File Format ${file}`)
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
