const sharp = require('sharp');
var fs = require('fs')

function compress(file){
  return new Promise((resolve, reject) => {
    let fileExtension = file.split(".")[1]
    let filePath = file.split('input/', 2)[1];
    let fileSubPath = filePath.split(".")[0];
    console.log(`Compressing ${fileExtension} file`)
      sharp(file)
      .webp({nearLossless: true, force: true})
      .toFile(`output/${fileSubPath}.webp`)
      .then( data => { 
        console.log(`compressed your ${fileExtension} image and saved as webp`)
        console.log(data)
        resolve(file) 
      })
      .catch(err => reject(err));
  })
}

function replace(img, html, filePath){
  //scan the html file and find all instances of the image
  return new Promise((resolve, reject) => {
    if(html.includes(img)){
      let splife = html.split(img);
      let img_tag_bgn = splife[0].substr(splife[0].lastIndexOf('<'));
      let img_tag_end = splife[1].substr(0, splife[1].indexOf('>')+1);
      let img_tag = img_tag_bgn + img + img_tag_end;
      let subPath = img.split('.')[0];
      let ext = img.split('.')[1];
      let classes = "";
      let alt = "";
      let webp_img = subPath + '.webp';
      let webp_tag = 
      `<picture>
        <source type="image/webp" srcset="${webp_img}">
        <source type="image/${ext}" srcset="${img}">
        ${img_tag}
      </picture>`
      html = html.replace(img_tag, webp_tag)
      resolve(html)
    }
    else {
      console.log(`image ${img} isnt used in the file ${filePath}`)
      resolve(html)
    }
  })
}

module.exports = {
  compress,
  replace
}
