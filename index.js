var {copyFile, scanFolder} = require('./recurse')

async function main(){
  //recurse folders
  await scanFolder("input/", function(filePath, stat) {
    //inside our callback function 
    let fileSubPath = filePath.split('input/', 2)[1];
    let fileExtension = filePath.substring(filePath.lastIndexOf('.') + 1);
    let stylesheets = []
    if(fileExtension =='html'){
        //use fs to read the contents of the file, edit and copy the file into the output folder
        var html = fs.readFileSync(filePath, 'utf8');
        //add classes to the classes object
        //resizeTumbnails
        //run arjanSeo
        //minify/compress
        //save to output
    }
    else if(fileExtension =='css'){
        //save the css file in stylesheets array
        stylesheets.push(filePath)
    }
    else if(fileExtension =='js'){
        //if the filsize is greater than x console.log(error)
        //compresss js file
        //save to output
    }
    else {
      compressImage(filePath, (err, data) => {
        if(err) throw new Error(err)
        else{
          if(data) console.log('image compressed')
          else copyFile(fileSubPath)
        }
      })     
    }    
  })
  .then(() => {
    //optimize css (delete unused classes)
  })
  .then(() => {
    //compress & minify css
  })
  .then(console.log('All Done!'))
}