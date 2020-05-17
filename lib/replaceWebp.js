var fs = require('fs')

module.exports = function replaceWebp(img, filePath){
  //scan the html file and find all instances of the image
  let file = fs.readFileSync(filePath, 'utf8')
  if(file.includes(img)){
    let splife = file.split(img);
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
      <source type="image/webp" srcset="${webp_tag}">
      <source type="image/${ext}" srcset="${img}">
      <img src="${img}" alt="${alt}">
    </picture>`
    file.replace(img_tag, webp_tag)
  }
  else throw new Error(`image isnt used in the file ${filePath}`)
}