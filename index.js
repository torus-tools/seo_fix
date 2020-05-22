const unusedCss = require('./lib/unusedCss');
const compressImages =  require('./lib/compressImages');
const resizeImages = require('./lib/resizeImages')
const webP =  require('./lib/webp');
const {scanFolder, copyFile} =  require('./lib/recurse');

module.exports.createClassList = unusedCss.createClassList;
//module.exports.findClasses = unusedCss.findClasses

module.exports.scanFolder = scanFolder;
module.exports.copyFile = copyFile;