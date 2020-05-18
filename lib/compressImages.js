const sharp = require('sharp');
var fs = require('fs');
SVGO = require('svgo');

const img_formats = [
  'jpg',
  'jpeg',
  'jfif',
  'pjpeg',
  'pjp',
  'png',
  'tif',
  'tiff',
  'gif',
  'ico',
  'cur',
  'bmp',
  'apng',
  'webp'
]

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

module.exports = function compressImage(file){
  return new Promise(async (resolve, reject) => {
    let fileExtension = file.split(".")[1]
    let filePath = file.split('input/', 2)[1];
    let fileSubPath = filePath.split(".")[0];
    console.log('EXTENSION ', fileExtension)
    if(fileExtension == 'svg'){
      console.log(`Compressing Scalable Vector Graphics ${filePath}`)
      let content = await fs.promises.readFile(file, 'utf8')
      let response = await svgo.optimize(content, {path: filePath}).catch((err) => reject(err))
      fs.promises.writeFile(`output/${fileSubPath}.svg`, response.data)
      .then(()=> {
        console.log(`compressed your SVG`)
        resolve(response.info)
      }).catch(err => reject(err));
    }
    else if(img_formats.includes(fileExtension)){
      await sharp(file)
        .toFile(`output/${filePath}`)
        .then(data => {
          console.log(`compressed your ${fileExtension}`)
          console.log(data)
          resolve(data)
        }).catch(err => reject(err));
    }
    else resolve(null);
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