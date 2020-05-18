var fs = require('fs');
var {copyFile, scanFolder} = require('./recurse');
var unusedCss = require('./unusedCss');
var compressImage =  require('./compressImages');
var UglifyJS = require("uglify-js");
var {minify} = require('html-minifier');

module.exports = async function index(){
  await main().catch((err) => {console.log(err)})
  .then((res)=> {
    console.log("optimizing css . . .")
    unusedCss.deleteUnusedCss(res.stylesheets, res.classes)
  })
  .then(() => {console.log("compressing css . . .")})
  .then(() => {console.log('All Done!')})
}

async function main(){
  let classes = {}
  let stylesheets = []
  return new Promise((resolve, reject) => {
    scanFolder("input/", async (filePath, stat) => {
      //inside our callback function 
      let fileSubPath = filePath.split('input/', 2)[1];
      let fileExtension = filePath.substring(filePath.lastIndexOf('.') + 1);
      //let fileName = filePath.substring(filePath.lastIndexOf('/') + 1)
      if(fileExtension =='html'){
          //use fs to read the contents of the file, edit and copy the file into the output folder
          var html = fs.readFileSync(filePath, 'utf8');
          //add classes to the classes object
          console.log('saving classes used in '+fileSubPath)
          await unusedCss.createClassList(html, classes)
          //resizeTumbnails
          //run arjanSeo
          //minify/compress
          var result = minify(html, {
            removeAttributeQuotes: false,
            removeComments: false,
            html5: true,
            minifyJS: true,
            collapseWhitespace: true,
            removeEmptyAttributes: true,
            removeEmptyElements: true
          });
          fs.writeFileSync(`output/${fileSubPath}`, result)
          //save to output
      }
      else if(fileExtension =='css'){
          //save the css file in stylesheets array
          stylesheets.push(filePath)
      }
      else if(fileExtension =='js'){
          console.log(`compressing ${fileSubPath} . . .`)
          var code = fs.readFileSync(filePath, 'utf8')
          var result = UglifyJS.minify(code);
          if (result.error) reject(result.error);
          else fs.writeFileSync(`output/${fileSubPath}`, result.code)
          console.log('compressed the js file')
          //if the filsize is greater than x console.log(error)
          //compresss js file
          //save to output
      }
      else {
        await compressImage(filePath, (err, data) => {
          if(err) throw new Error(err)
          else{
            if(data) console.log('image compressed')
            else {
              console.log(`file format ${fileExtension} not recognized. Copying file as is.`)
              copyFile(fileSubPath)
            }
          }
        })     
      }    
    })
    resolve({stylesheets:stylesheets, classes:classes})
  })
}