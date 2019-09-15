// here we import all of the necessary libraries
const path = require("path");
const fs = require('fs');

// Below we declare our javascript components as key value pairs
var myComponents = {
    "<HEAD>":
        `<head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <meta name="description" content="">
            <meta name="author" content="">
            <title> Title </title>
            <!-- Google Fonts -->
            <link href="https://fonts.googleapis.com/css?family=EB+Garamond&display=swap" rel="stylesheet">
            <!-- Bootstrap 4 -->
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <!-- Font Awesome Icons -->
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
            <!-- Custom styles for this template -->
            <link rel="stylesheet" href="index.css">
        </head>`,
    "<NAV>":
        `<nav id="mainNav" class="navbar navbar-expand-lg navbar-light navbar-shrink fixed-top px-5">
            <div class="container-fluid">
                <button class="navbar-toggler text-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="fa fa-2x fa-bars"></span>
                </button>
            
                <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                    <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="index.html">Inicio</a>
            </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="about.html">Quienes Somos</a>
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
                            <a class="nav-link" href="contact.html">Contáctanos</a>
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
        </footer>`,
    "<SCRIPTS>":
        `<script>
            ScrollReveal().reveal('.brilat-logo', { easing: 'ease-in' });
            ScrollReveal().reveal('.carousel-caption', { delay: 300 });
            ScrollReveal().reveal('.reveal', { easing: 'ease-in', duration: 1200 });
            ScrollReveal().reveal('.reveal-right', {duration: 1700, origin:'right', distance:'300px', viewFactor: 0.2});
            ScrollReveal().reveal('.reveal-left', {duration: 1500, origin:'left', distance:'300px', viewFactor: 0.2});
            ScrollReveal().reveal('.reveal-top', {duration: 1500, origin:'top', distance:'300px', viewFactor: 0.2});
            ScrollReveal().reveal('.reveal-bottom', {duration: 1500, origin:'bottom', distance:'300px', viewFactor: 0.2});
        </script>
        <!-- Bootstrap core JavaScript -->
        <script
        src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
        crossorigin="anonymous">
        </script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" integrity="sha384-xrRywqdh3PHs8keKZN+8zzc5TX0GRTLCcmivcbNJWm2rs5C8PRhcEn3czEjhAO9o" crossorigin="anonymous"></script>
        <!-- Custom scripts for this template -->
        <script src="js/index.js"></script>`   
}


//a function that uses the fs.copyfunction  
function copyFile(fileName) {
    fs.copyFile(`input/${fileName}`, `output/${fileName}`, (err) => {
        if (err) throw err;
        console.log(`${fileName} was copied to output`);
    });
}

//this is a function i created called recurseFolder that takes in two parameters, the current folder and a callback function
function recurseFolder(currentDirPath, callback) {
    // below we execute a function from our fs package called readdirsync and for each file in our current directory we execute the follwoung lines of code
    fs.readdirSync(currentDirPath).forEach(function (name) {
            // we create a new variable called file path that will eaqual the path of the parent directory plus the name of the current file or directory
            var filePath = path.join(currentDirPath, name);
            //console.log(name)
            // we create a variable called stat that has the stat of the upload of the file
            var stat = fs.statSync(filePath);
            //if the current directory is actually a file we execute the callback function with two parameters the file and the stat
            if (stat.isFile()) {
                    callback(filePath, name, stat);
            }
            //if the current directory is indeed a directory then we will execute the same function recurseFolder. This is what we call recursion as we call the function within itself. recursion is like the movie inception and it is sometimes a complicated process to grasp  but think about a website with many folders and files, folders contain files and other folders and you have many layers of folders and files within folders. Recursion sometimes requires more processing power than other solutions and isnt always the best but in this case we would need sevceral morelines of code to write a solution for this that woud work without recursion.
            else if (stat.isDirectory()) {
                    recurseFolder(filePath, callback);
            }
    });
}

// now we call our recurseFolder function supplying a directory path and a callback function
recurseFolder("input/", function(filePath, name, stat) {
    //inside our callback function 
    console.log(filePath)
    let fileSubPath = filePath.split('input/', 2)[1];
    console.log(fileSubPath)
    //console.log(fileSubPath);
    let fileExtension = filePath.substring(filePath.lastIndexOf('.') + 1);
    
    if(fileExtension =='html'){
        //use fs to read the contents of the file, edit and copy the file into the output folder
        fs.readFile(filePath, 'utf8', function (err, html) {
            if (err) {
              return console.log(err);
            }
            var result = Object.keys(myComponents).map(function(key, index) {
                //if the key exists in the document
                console.log(key)
                html.replace(key, myComponents[key])
            });
          
            fs.writeFile(`output/${fileSubPath}`, result, 'utf8', function (err) {
               if (err) return console.log(err);
            });
            console.log("The html file was saved to output");
        });

        /*
        fs.readFile(filePath, function (err, html) {
            if (err) throw err;
            console.log(html)
            //map your html components and for each item check if the key exists and replace it with the value
            Object.keys(myComponents).map(function(key, index) {
                //if the key exists in the document
                if (html.find(key)){
                    //replace key with walue
                    html = html.replace(key, myComponents[key]);
                }
            });
            res.end(html);
            fs.writeFile(`/output/${fileSubPath}`, html, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The html file was saved to output");
            });
        });
        */
    }
    //if its not an html file just copy it as is by calling the copyFunctionn we created
    else {
        copyFile(fileSubPath)
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
    //console.log(stat);        
});