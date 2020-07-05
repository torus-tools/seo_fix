<img src="https://github.com/arjan-tools/site/blob/master/img/arjan_optimize_logo.svg" alt="Arjan Localize" width="200" style="max-width:100%;">

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://gkpty.mit-license.org)
[![Build Status](https://travis-ci.com/arjan-tools/optimize.svg?branch=master)](https://travis-ci.com/arjan-tools/optimize)

# Arjan Optimize


## Intro

Arjan Optimize is an API that extends the arjan CLI optimize command that uses webpack to optimize html multipage sites. For now the API only features a method for converting images to webP but more methods are comming soon!
                                                          |
## Webp Images

The webp option in Arjan Optimize does 2 things:

1. converts all your images to webp using sharp and saves them (without overwritting images in original format)
2. In the HTML files, it replaces each img tag with a picture tag that holds both its original compressed version and its webp version.

 Because webp is a relatively new format, it [is not supported by all browsers](https://caniuse.com/#feat=webp). The picture tag is a solution that allows unsupported browsers to fall back to the original version of the image. [This article](https://web.dev/serve-images-webp/) goes more in depth on webp and the picture tag. 
 
 suppose we have the following image tag:

    <img src="img/arjan-logo.png" class="img-fluid">

this will be replaced by:

    <picture>
      <source type="image/webp" srcset="img/arjan-logo.png">
      <source type="image/png" srcset="img/arjan-logo.png">
      <img src="img/arjan-logo.png" class="img-fluid">
    </picture>
      
## CLI command

arjan optimize SITENAME [FILENAME] --img --webp --responsive --html --css --rcss --js



    USAGE
      $ arjan optimize [FILENAME]
    
    ARGUMENTS
      FILENAME  name of the file i.e. index.html
    
    OPTIONS
      -c, --css     minifiy css using cssnano
      -h, --html    compress html using html-minifier
      -i, --images  compress images and if possible maintain the format, otherwise its converted to png.
      -j, --js      minify js using uglify js
    
      -w, --webp    saves a webp version of each image, then replaces each image instance in the html files with a picture tag.
      
  
 ## Programmatic usage

### For more info read the [docs](https://arjan.tools/docs) 
