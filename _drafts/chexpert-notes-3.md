---
layout: post
title: chexpert notes 3
artist: 
artistLink: 
track: 
trackLink: 
tags: [notes, data science, machine learning, ai, supervised learning, neural network]
---

Thus we used DenseNet121 for all our experiments. Images are fed into the network with size 320 × 320 pixels. We use the Adam optimizer with de- fault β-parameters of β1 = 0.9, β2 = 0.999 and learning rate 1 × 10−4 which is fixed for the duration of the training. Batches are sampled using a fixed batch size of 16 images. We train for 3 epochs, saving checkpoints every 4800 iterations.