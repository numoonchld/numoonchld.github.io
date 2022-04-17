---
layout: post
title: performance optimization for web apps
date: 2022-04-17
updated: 
artist: 
artistLink: 
track: 
trackLink: 
tags: [frontend performance, network performance, performance optimization, crtical render path]
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


# critical render path (CRP)

>>> The Critical Rendering Path is the sequence of steps the browser goes through to convert the HTML, CSS, and JavaScript into pixels on the screen
>>> Optimizing the critical render path improves render performance

- once a script tag is found in the HTML file, the browser...
  - pauses DOM construction 
  - waits until the JS file is obtained from the server 
  - it may be executed before all the CSS is fetched 

- JS files can alter both HTML-DOM and CSS-OM
  - only after that is complete, the page's render tree is built out by the browser

## strategies to optimize CRP

#### HTML file 

- load CSS files ASAP in the HTML (typically in the `head` element) and load JS files as late as possible (end of `body` element) 
  - since JS actions need HTML and CSS to already be parsed 
  - early JS loading blocks other page resources
  - however, `script` tags for analytics like Google analytics should be placed in the `head` element

#### CSS file 

- only load what's needed 
  - dont add unnecessary lines of CSS, it increases file size


- use above the fold loading if possible
  - show only what is above the 'fold' - fold is the bottom edge of the broswer window
  - to see the content hidden behind the fold, the page has to be scrolled down
  - page loading optimization may be applied by adding delayed loading to the content hidden below the fold 

- use media attributes for links to CSS in HTML files

- less specificity in CSS is better

- more local the CSS, faster the CSS parsing
  - i.e. inline CSS (fastest) > `style` block CSS in `head` > CSS file outside HTML file (slowest)

#### JS file

- load scripts asynchronously: `<script async>`
  - this allows the HTML-DOM construction to continue when the script file is being fetched from the server
  - a different thread fetches the JS file
  - however, while the JS is being executed, HTML parsing is blocked

  - if core functionality depends on JS, then use `async` in script tag

- to avoid HTML paring pause during JS execution, use `<script defer>` 
  - this not only loads the JS file asynchronously, but also defers the script's JS execution till after the entire HTML has been parsed
  - if core functionality does not depend on JS, use this `defer` tag


- do not use `async` or `defer` for page's critical script tags!


# references

- [Web Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)



# daily dose of culture 

- [Honey, I Shrunk the Kids](https://en.wikipedia.org/wiki/Honey,_I_Shrunk_the_Kids)

