// here we import all of the necessary libraries
const path = require("path");
const fs = require('fs');

// Below we declare our javascript components as key value pairs
var myComponents = {
    "<HEAD>":"",
    "<OTHER>":""
}


//below we create a function that uses the fs.copyFile to copy a file  
function copyFile(fileName) {
    fs.copyFile(`input/${fileName}`, `output/${fileName}`, (err, data) => {
        if (err) throw err;
        else console.log(`${fileName} was copied to output`);
    });
}

//below we create a function called recurseFolder that takes in two parameters, the current folder and a callback function
function recurseFolder(currentDirPath, callback) {
    // below we execute a function from our fs package called readdirsync and for each file in our current directory we execute the follwoing lines of code
    fs.readdirSync(currentDirPath).forEach(function (name) {
            // we create a new variable called file path that will eaqual the path of the parent directory plus the name of the current file or directory
            var filePath = path.join(currentDirPath, name);
            // we create a variable called stat that has the stat of the upload of the file
            var stat = fs.statSync(filePath);
            //if the current directory is actually a file we execute the callback function with two parameters the file and the stat
            if (stat.isFile()) {
                    callback(filePath, stat);
            }
            //if the current directory is indeed a directory then we will execute the same function recurseFolder. This is what we call recursion as we call the function within itself. recursion is like the movie inception and it is sometimes a complicated process to grasp  but think about a website with many folders and files, folders contain files and other folders and you have many layers of folders and files within folders. Recursion sometimes requires more processing power than other solutions and isnt always the best but in this case we would need sevceral morelines of code to write a solution for this that woud work without recursion.
            else if (stat.isDirectory()) {
                    recurseFolder(filePath, callback);
            }
    });
}

// now we call our recurseFolder function supplying a directory path and a callback function
recurseFolder("input/", function(filePath, stat) {
    //inside our callback function 
    let fileSubPath = filePath.split('input/', 2)[1];
    let fileExtension = filePath.substring(filePath.lastIndexOf('.') + 1);
    let stylesheets = []
    if(fileExtension =='html'){
        //use fs to read the contents of the file, edit and copy the file into the output folder
        var html = fs.readFileSync(filePath, 'utf8');
        //resizeTumbnails
        //run arjanSeo
        //minify/compress
    }
    else if(fileExtension =='css'){
        //save the css file in stylesheets array
        stylesheets.push(filePath)
    }
    else if(fileExtension =='js'){
        //if the filsize is greater than x console.log(error)
        //compresss js file
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
});


DeleteCss(stylesheets, classes){
    for(let sheet of stylesheets){
        //read the stylsheet
        let stylesheet = fs.readFileSync(sheet, 'utf8')
        let styles = stylesheet.split("}")
        for(let i =0; i<stylesheets.length; i++){
            let classLine = stylesheets[i].split("{")[0]
            let classInstance = stylesheets[i]+'}'
            if(classLine.includes(",")){
                let classLineItems = classLine.split(",")
                //if classes array doesnt contain any of the clasess in the line delete the class instance
                //if it doesnt contain a couple then delete the class from the class line but not the class instance
                let toDel = 0;
                let dots = 0;
                for(let cl of classLineItems) {
                    if(!classes[cl]) toDel +=1
                    if(cl.startsWith(".")) dots +=1
                }

            }
            else {
                let classArr = classLine.split(" ")
                for( let c of classArr){
                    if(c.includes(".")){
                        multiclass = c.split(".")
                        for(let inst of multiclass){
                            if(!classes[inst]) stylesheet = stylesheet.replace(classInstance, "")
                        }
                    }
                }
            }



        }

    }
}


compressCss(stylesheets){
    for(let sheet of stylesheets){
        //use cssnano to compress
    }
}