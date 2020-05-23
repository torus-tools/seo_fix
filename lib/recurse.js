const path = require("path");
const fs = require('fs');
const ignorePaths = {
    "node_modules":true,
    "forms":true,
}

//below we create a function that uses the fs.copyFile to copy a file  
function copyFile(fileName, output) {
    return fs.copyFileSync(`${fileName}`, `${output}/${fileName}`)
}

//below we create a function called recurseFolder that takes in two parameters, the current folder and a callback function
function scanFolder(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) callback(filePath, stat);
        else if (stat.isDirectory()) {
            let fileSubPath = filePath.split("input/", 2)[1]
            if(ignorePaths[fileSubPath]) console.log("ignoring ", fileSubPath)
            else {
                if(!fs.existsSync(`output/${fileSubPath}`)){
                    fs.mkdirSync(`output/${fileSubPath}`)
                }
                scanFolder(filePath, callback);
            }
        }
    });
}

module.exports = {
    copyFile,
    scanFolder
}

