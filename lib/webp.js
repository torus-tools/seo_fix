const sharp = require('sharp');
var fs = require('fs')

function compress(file, callback){
  let fileExtension = file.split(".")[1]
  let filePath = file.split('input/', 2)[1];
  let fileSubPath = filePath.split(".")[0];
  console.log(`Compressing ${fileExtension} file`)
    sharp(file)
    .webp({nearLossless: true, force: true})
    .toFile(`output/${fileSubPath}.webp`)
    .then( data => { 
      console.log(`compressed your ${fileExtension} image and saved as webp`)
      callback(null, true) 
    })
    .catch( err => { throw new Error(err) });
}

function replace(img, html){
  //scan the html file and find all instances of the image
  if(html.includes(img)){
    let splife = html.split(img);
    let img_tag_bgn = splife[0].substr(splife[0].lastIndexOf('<'));
    let img_tag_end = splife[1].substr(0, splife[1].indexOf('>'));
    let img_tag = img_tag_bgn + img + img_tag_end;
    let subPath = img.spit('.')[0]
    let ext = img.split('.')[1]
    let classes = ""
    let alt = ""
    let webp_img = subPath + '.webp';
    let webp_tag = 
    `<picture class="${classes}">
      <source type="image/webp" srcset="${webp_img}">
      <source type="image/${ext}" srcset="${img}">
      <img src="${img}" alt="${alt}">
    </picture>`
    html.replace(img_tag, webp_tag)
  }
  else throw new Error(`image isnt used in the file ${filePath}`)
}

module.exports = {
  compress,
  replace
}
