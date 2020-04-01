function compressImage(file, callback){
  let fileExtension = file.split(".")[1]
  if(fileExtension ==='svg'){
    //Compressing Scalable Vector Graphics
  }
  else if(fileExtension ==='jpg' || fileExtension ==='jpeg' || fileExtension ==='jfif' || fileExtension ==='pjpeg' || fileExtension ==='pjp'){
      //Compressing Joint Photographic Expert Group image
  }
  else if(fileExtension ==='png'){
      //Compressing Portable Network Graphics
  }
  else if(fileExtension ==='gif'){
    //Compressing Graphics Interchange Format
  }
  else if(fileExtension ==='tif' || fileExtension === 'tiff'){
    //Compressing Tagged Image File Format
  }
  else if(fileExtension ==='ico' || fileExtension ==='cur'){
    //Compressing Microsoft Icon
  }
  else if(fileExtension ==='bmp'){
    //Compressing 	Bitmap file
  }
  else if(fileExtension ==='apng'){
    //Compressing Animated Portable Network Graphics
  }
  else if(fileExtension ==='webp'){
    //Compressing Web Picture format
  }
  else callback(null, null)
}
