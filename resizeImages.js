var fs = require('fs')
const sharp = require('sharp');
//first optimize the html.

function resizeThumbnails(htmlFile){
  //check if document contains arjan-thumbnail
  if(htmlFile.includes("arjan-thumbnail")){
    //split into image tags
    let images = htmlFile.split("<img")
    for(let i=1; i<images.length; i++){
      let image = i.split(">")[0]
      if(image.includes("class=")){
        let imgClass = image.split("class=")[1].split("")[0]
        let imgSrc = image.split("src=")[1].split("")[0]
        if(imgClass.includes("arjan-thumbnail-")){
          let size = imgClass.split("arjan-thumbnail-")[1].substr(0,2)
          let img = fs.readFileSync(imgSrc)
          if(!imgSrc.includes("https")){
            //resize the image according to size
            switch(size) {
              case 'sm':
                //create small thumbnaill
                break;
              case 'md':
                //create a medium thumbnail
                break;
              case 'lg':
                //create large thumbnail
                break;
              default:
                throw new Error("invalid thumbnail class. only use the following classes: \narjan-thumbnail-sm \narjan-thumbnail-md \narjan-thumbnail-lg")
            }
          }
        }
      }
    }
  }
}