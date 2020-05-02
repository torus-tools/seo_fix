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

module.exports = function compressImage(file, callback){
  let fileExtension = file.split(".")[1]
  let filePath = file.split('input/', 2)[1];
  let fileSubPath = filePath.split(".")[0];

  if(fileExtension ==='svg'){
    console.log(`Compressing Scalable Vector Graphics ${file}`)
    console.log(`Compressing Portable Network Graphics ${file}`)
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) throw err;
      svgo.optimize(data, {path: filePath}).then(function(result) {
        console.log(result);
        fs.writeFileSync(`output/${fileSubPath}.svg`)
      });
    });
  }
  else if(fileExtension ==='jpg' || fileExtension ==='jpeg' || fileExtension ==='jfif' || fileExtension ==='pjpeg' || fileExtension ==='pjp'){
      console.log(`Compressing Joint Photographic Expert Group image ${file}`)
      sharp(file)
      .toFile(`output/${filePath}`)
      .then( data => { console.log(`compressed your ${fileExtension} image and saved as jpeg`) })
      .catch( err => { throw new Error(err) });
  }
  else if(fileExtension ==='png'){
      console.log(`Compressing Portable Network Graphics ${file}`)
      sharp(file)
      .toFile(`output/${filePath}`)
      .then( data => { console.log(`compressed your ${fileExtension} image and saved as png`) })
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
  }
  else callback(null, null)
} 
