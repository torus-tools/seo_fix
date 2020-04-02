
//finds used classes in the html files and adds them to a class list
function createClassList(htmlFile, classes){
  if(htmlFile.includes("class=")){
    let htmlArr = htmlFile.split("class=")
    for(let i=1; i<htmlArr.length; i++){
      let delim = `"`
      if(htmlArr[i].startsWith(`'`)) delim = `'`
      if(htmlArr[i].substr(1,1) !== htmlArr[i].substr(0,1)){
        let classesStr = htmlArr[i].split(delim)[1]
        if(!classesStr) console.log('Error. invalid class ' + htmlArr[i])
        let classesArr = classesStr.split(" ")
        for(let c of classesArr){
          if(!classes[c]) classes[c] = ""
        }
      }
      
    }
  }
}

//for all of the stylesheets it will parse classes and see if the class is present in the html. if not it will dlete the class from the stylesheet
function deleteCss(stylesheets, classes){
  for(let sheet of stylesheets){
    let stylesheet = fs.readFileSync(sheet, 'utf8')
    let styles = stylesheet.split("}")
    for(let i =0; i<styles.length; i++){
      let classLine = styles[i].split("{")[0]
      let classInstance = stylesheets[i]+'}'
      if(classLine.includes(",")){
        let newsheet = stylesheet
        let classLineItems = classLine.split(",")
        let items = 0;
        let toDel = 0;
        for(let item of classLineItems) {
          findClasses(item, classes, (err, data) => {
            if(err) throw new Error(err)
            else{
              items+=1
              if(data) {
                newsheet = stylesheet.replace(item, "")
                toDel += 1
              }
            }
          })
        }
        if(items === toDel) stylesheet = stylesheet.replace(classInstance, "")
        else stylesheet = newsheet
      }
      else {
        findClasses(classLine, classes, (err, data) => {
          if(err) throw new Error(err)
          else{
            if(data) stylesheet = stylesheet.replace(classInstance, "")
          }
        })
      }
    }
  }
}

//splits a class line item into classes sepparated by dots
function findClasses(classLine, classes, callback){
  let classArr = classLine.split(" ")
  for( let c of classArr){
      if(c.includes(".")){
          multiclass = c.split(".")
          for(let inst of multiclass){
            if(!classes[inst]) callback(null, inst)
          }
      }
      callback(null, null)
  }
}


module.exports = {
  createClassList,
  deleteCss,
  findClasses
}