---
layout: post
title: performance optimization for web apps
date: 2022-04-17
updated: 
artist: 
artistLink: 
track: 
trackLink: 
tags: [frontend performance, network performance, performance optimization]
---

- several performance pinch points exist in web application systems
- optimizations for such performance pinch points are of three categories
  1. network transfer
  2. frontend 
  3. backend  


## techniques for optimization

- network transfer optimization 
  - minimize files, and file size (of text based and image files going between client and server)
  - minimize delivery

- frontend optimization 
  - critical render path
  - optimized code
  - progressive web app

- backend optimization 
  - CDNs
  - caching
  - load balancing
  - DB Scaling
  - GZIP
 

# network performance optimizations

## honey I shrunk the files
- minimize the size of all files that need to be transfered over the network
  - **minimize text files's size**
    - JS, HTML and CSS are the ubiquitous web app text file types for first considerations
    - [JS files minification](https://www.cloudflare.com/en-in/learning/performance/why-minify-javascript-code/)
      - machines dont care about whitespace, comments, and semicolons
      - variable names and sometimes indentations are specifically for developer code readability and wont make a difference in code functionality
  - **minimize image files' size**
    - use the appropriate image file format to minimize transfer time over network
    - image files fall under two categories: *raster* and *vector* categories 
      - commonly used image file formats 
        - **JPG** (raster): color heavy photos and images, where vivid color display is important - but no transparency allowed
        - **GIF** (raster): lightweight - only 2 to 256 colors allowed, good for small animations - not good for vivid displays
        - **PNG** (raster): limits number of colors, allows tranparency within the image, used for logos and icons and such as the number of colors are limited for this use case, and file size is minimized
        - **SVG** (vector): when SVG is zoomed into, with the same file size, the vector graphics scale for clarity; good for high-res displays such as 4K; but they dont support complex color structures 

### image size minimization for network transfer optimization

#### choosing the right image type
- PNG: to get transparency in images
- GIF: for animations
- JPG: vivid colorful images
- SVG: for simple icons, logos and illustrations

#### image optimizations
- PNG size reduction: use TinyPNG or something similar
- JPG size reduction: use JPEG-optimizer or something similar
- avoid highly detailed photographs unless a use case presents itself
  - opt for simple SVG illustrations where possible
- JPG image quality: 30% - 60% (image compression)
- larger the image resolution, larger the image file size, so set image resolution for its intended display!
  - if the image is sitting in a `div` with `width` CSS set to `300px`, 
  - use an image that is actually 300px wide
  - do not use images with witdh `4000px` and place them in `div`s which support only `300px`
- use `@media` CSS media queries to customize which image file to transmit over the network for that specfic client display
  - however, take care to ensure there are multiple copies of the same image in various files sizes so that the right one can be sent to the client
- remove image metadata; metadata adds to the network transfer time, while also being a privacy hazard!
- uses CDNs like `imigx` or something similiar

## the travelling deliveryman

- reduce the frequency of network requests between the client and the server
- doesn't mean omitting content, structure the content to be more efficient for network requests instead
- however, there is also a max limit for concerrent file transfers in a browser over the network to the server that comes with HTTP 
  - so limit both the frequency and the number of files
- consolidate stylesheet files 


# daily dose of culture 

- [Honey, I Shrunk the Kids](https://en.wikipedia.org/wiki/Honey,_I_Shrunk_the_Kids)

