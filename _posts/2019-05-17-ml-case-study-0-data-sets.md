---
layout: post
title: ml case studies 0 - data sets
artist: Megadeth
artistLink: https://megadeth.com/
track: Paranoid
trackLink: https://youtu.be/5MTcEcNYL50
tags: [notes, data science, machine learning, ai, deep learning]
updated: 2019-06-01
---

- UC Irvine Machine Learning Repository
    - [Automobile DataSet](https://archive.ics.uci.edu/ml/machine-learning-databases/autos/imports-85.data){: target="_blank"}
     
    - to explore Regression algorithms:
        - simple linear regression
        - multiple linear regression
        - neural net regression 

<hr>
<br>

- MNIST database of handwritten digits
    - [Handwritten Digits](http://yann.lecun.com/exdb/mnist/){: target="_blank"} - images with handwritten digits
    
    - to explore classification algorithms:
        - linear classifiers
        - k-nearest neighbors
        - non-linear classifiers
        - SVMs
        - convolutional neural nets

- CIFAR: labeled subsets of the 80 million tiny images dataset
    - [Dataset Homepage](https://www.cs.toronto.edu/~kriz/cifar.html){: target="_blank"} - images of animals, planes and ground vehicles

    - to explore Object Classification algorithms:
        - convolutional neural nets
    
    - CIFAR-10: 
        - 60000 32x32 color images  
        - 10 classes, with 6000 images per class
        - 50000 training images and 10000 test images

    - CIFAR-100:
        - 60000 32x32 color images 
        - 100 classes containing 600 images each
        - 500 training images and 100 testing images per class

        - 100 classes are grouped into 20 superclasses 
        - each image comes with a "fine" label (the class to which it belongs) and 
        - a "coarse" label (the superclass to which it belongs)
