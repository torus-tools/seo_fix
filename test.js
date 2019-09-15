// here we import all of the necessary libraries
import { fstat } from "fs";

// Below we declare our javascript components as key value pairs
var myComponents = {
    "<NAV>":
        `<nav id="mainNav" class="navbar navbar-expand-lg navbar-light navbar-shrink fixed-top px-5">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="fa fa-2x fa-bars"></span>
                    </button>

                    <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                        <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="index.html">Inicio</a>
                </li>
                            <li class="nav-item">
                                <a class="nav-link" href="about.html">Quienes Somos</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="collections.html">Colecciones</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="gem_guides.html">Gemas</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="events.html">Eventos</a>
                </li>
                <li class="nav-item">
                                <a class="nav-link active" href="#page-top">Contáctanos</a>
                            </li>
                        </ul>
                    </div>
                </div>
                </nav>`,
    "<FOOTER>":
        `<footer class="small text-center">
            <div class="container">
            <div class="row">
                <div class="col-sm-6">
                <p class="text-lg-left">Copyright &copy; Brilat 2019</p>
                </div>
                <div class="col-sm-6">
                <p class="text-lg-right">powered by <a href="http://torus-digital.com">Torus</a></p>
                </div>
            </div>
            </div>
        </footer>`
}

//a function that uses the fs.copyfunction  
function copyFile(file) {
    fs.copyFile(`input/${file}`, `output/${file}`, (err) => {
        if (err) throw err;
        console.log(`${file} was copied to output`);
    });
}

//this is a function i created called recurseFolder that takes in two parameters, the current folder and a callback function
function recurseFolder(currentDirPath, callback) {
    // below we execute a function from our fs package called readdirsync and for each file in our current directory we execute the follwoung lines of code
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
    let fileName = filePath.substring(dirPath.length+1);
    let fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
    if(fileExtension =='html'){
        //use fs to read the contents of the file, edit and copy the file into the output folder
        fs.readFile(fileName, function (err, html) {
            if (err) throw err;
            //map your html components and for each item check if the key exists and replace it with the value
            Object.keys(myComponents).map(function(key, index) {
                //if the key exists in the document
                if (html.find(key)){
                    //replace key with walue
                    html = html.replace(key, myComponents[key]);
                }
            });
            res.end(html);
            return html;
        }).then((result)=> {
            fs.writeFile(`/output/${fileName}`, result, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The modified html file was saved to output");
            });
        });
    }
    //if its not an html file just copy it as is by calling the copyFunctionn we created
    else {
        copyFile(fileName)
    }

    /*
    else if(fileExtension =='svg'){
        //compress svg image
    }
    else if(fileExtension =='jpg' || fileExtension =='jpeg'){
        //compress jpeg image
    }
    else if(fileExtension =='png'){
        //compress png image
    }
    else if(fileExtension =='css'){
        //compress css file
    }
    else if(fileExtension =='js'){
        //compress js file
    }
    */

    //log the stat of our upload in the console
    console.log(stat);        
});