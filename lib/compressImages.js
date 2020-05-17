const sharp = require('sharp');
var fs = require('fs');
SVGO = require('../lib/svgo');

svgo = new SVGO({
  plugins: [{
    cleanupAttrs: true,
  }, {
    removeDoctype: true,
  },{
    removeXMLProcInst: true,
  },{
    removeComments: true,
  },{
    removeMetadata: true,
  },{
    removeTitle: true,
  },{
    removeDesc: true,
  },{
    removeUselessDefs: true,
  },{
    removeEditorsNSData: true,
  },{
    removeEmptyAttrs: true,
  },{
    removeHiddenElems: true,
  },{
    removeEmptyText: true,
  },{
    removeEmptyContainers: true,
  },{
    removeViewBox: false,
  },{
    cleanupEnableBackground: true,
  },{
    convertStyleToAttrs: true,
  },{
    convertColors: true,
  },{
    convertPathData: true,
  },{
    convertTransform: true,
  },{
    removeUnknownsAndDefaults: true,
  },{
    removeNonInheritableGroupAttrs: true,
  },{
    removeUselessStrokeAndFill: true,
  },{
    removeUnusedNS: true,
  },{
    cleanupIDs: true,
  },{
    cleanupNumericValues: true,
  },{
    moveElemsAttrsToGroup: true,
  },{
    moveGroupAttrsToElems: true,
  },{
    collapseGroups: true,
  },{
    removeRasterImages: false,
  },{
    mergePaths: true,
  },{
    convertShapeToPath: true,
  },{
    sortAttrs: true,
  }]
});

module.exports = function compressImage(file, imageArr){
  return new Promise(async (resolve, reject) => {
    let fileExtension = file.split(".")[1]
    let filePath = file.split('input/', 2)[1];
    let fileSubPath = filePath.split(".")[0];
    let imgInfo = null;
    imageArr.push(filePath)
    if(fileExtension ==='svg'){
      console.log(`Compressing Scalable Vector Graphics ${file}`)
      let file = await fs.promises.readFile(filePath, 'utf8')
      let response = await svgo.optimize(file, {path: filePath}).catch((err) => reject(err))
      fs.promises.writeFile(`output/${fileSubPath}.svg`, response.data).then(console.log(`compressed your SVG`))
      imgInfo = response.info
    }
    else {
      imgInfo = await sharp(file)
        .toFile(`output/${filePath}`)
        .then(data => {
          console.log(`compressed your ${fileExtension}`)
          console.log(data)
        })
        .catch(err => reject(err));
    }
    resolve(imgInfo)
  })
} 






/* else if(fileExtension ==='jpg' || fileExtension ==='jpeg' || fileExtension ==='jfif' || fileExtension ==='pjpeg' || fileExtension ==='pjp'){
        console.log(`Compressing Joint Photographic Expert Group image ${file}`)
        sharp(file)
        .toFile(`output/${filePath}`)
        .then( data => { console.log(`compressed your ${fileExtension}`) })
        .catch( err => { throw new Error(err) });
    }
    else if(fileExtension ==='png'){
        console.log(`Compressing Portable Network Graphics ${file}`)
        sharp(file)
        .toFile(`output/${filePath}`)
        .then( data => { console.log(`compressed your ${fileExtension}`) })
        .catch( err => { throw new Error(err) });
    }
    else if(fileExtension ==='tif' || fileExtension === 'tiff'){
      console.log(`Compressing Tagged Image File Format ${file}`)
        sharp(file)
        .toFile(`output/${filePath}`)
        .then( data => { console.log(`compressed your ${fileExtension} image and saved as webp`) })
        .catch( err => { throw new Error(err) });
    }
    else if(fileExtension ==='gif'){
      console.log(`Compressing Graphics Interchange Format ${file}`)
      sharp(file)
        .toFile(`output/${filePath}`)
        .then( data => { console.log(`compressed your ${fileExtension} image and saved as webp`) })
        .catch( err => { throw new Error(err) });
    }
    else if(fileExtension ==='ico' || fileExtension ==='cur'){
      console.log(`Compressing Microsoft Icon ${file}`)
      sharp(file)
        .toFile(`output/${filePath}`)
        .then( data => { console.log(`compressed your ${fileExtension} image and saved as webp`) })
        .catch( err => { throw new Error(err) });
    }
    else if(fileExtension ==='bmp'){
      console.log(`Compressing 	Bitmap file ${file}`)
      sharp(file)
        .toFile(`output/${filePath}`)
        .then( data => { console.log(`compressed your ${fileExtension} image and saved as webp`) })
        .catch( err => { throw new Error(err) });
    }
    else if(fileExtension ==='apng'){
      console.log(`Compressing Animated Portable Network Graphics ${file}`)
      sharp(file)
        .toFile(`output/${filePath}`)
        .then( data => { console.log(`compressed your ${fileExtension} image and saved as webp`) })
        .catch( err => { throw new Error(err) });
    }
    else if(fileExtension ==='webp'){
      console.log(`Compressing Web Picture format ${file}`)
      sharp(file)
        .toFile(`output/${filePath}`)
        .then( data => { console.log(`compressed your ${fileExtension} image and saved as webp`) })
        .catch( err => { throw new Error(err) });
    } */