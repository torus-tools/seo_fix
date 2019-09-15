


//UPLOAD THE WEBSITE TEMPLATE TO THE S3 BUCKET
const uploadDir = function(dirPath, bucketName) {		
    function walkSync(currentDirPath, callback) {
        fs.readdirSync(currentDirPath).forEach(function (name) {
                var filePath = path.join(currentDirPath, name);
                var stat = fs.statSync(filePath);
                if (stat.isFile()) {
                        callback(filePath, stat);
                } 
                else if (stat.isDirectory()) {
                        walkSync(filePath, callback);
                }
        });
    }			
    walkSync(dirPath, function(filePath, stat) {
        let fileDestination = filePath.substring(dirPath.length+1);
        let fext = fileDestination.substring(fileDestination.lastIndexOf('.') + 1);
        let content_type = '';
        if(fext =='html'){
            content_type = 'text/html'
            //map function and for each key scan document to check if it contains <key>
        }
        if(fext =='svg'){
            //compress svg images
        }
        else if(fext =='jpg' || fext =='jpeg'){
            //compress jpeg images
        }
        else if(fext =='png'){
            //compress png images
        }
        else if(fext =='css'){
                content_type = 'text/css'
        }
        else if(fext =='js'){
                content_type = 'application/javascript'
        }
        else if(fext =='txt'){
                content_type = 'text/plain'
        }
        else if(fext =='xml'){
                content_type = 'text/xml'
        }
        else if(fext =='mp4'){
                content_type = 'video/mp4'
        }
        // else do nothing
        console.log(stat);        
        let fileParams = {Bucket: bucketName, Key: fileDestination, Body: fs.readFileSync(filePath), ContentType: content_type};
        s3.putObject(fileParams, function(err, data) {
            if (err) {
                console.log(err)
            } 
            else {
                console.log(`Successfully uploaded ${fileDestination} to ${bucketName}`);
            }
        });
    });
};			
uploadDir("input/");