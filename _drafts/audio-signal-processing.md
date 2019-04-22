---
layout: post
title: audio signal processing - notes
tags: [notes, audio, music, signal processing]
---



# Week 1 material:

- analog and digital audio signals exist

### applications of audio signal processing

##### storage
- they are processed and stored differently 

##### data compression
- between different formats 
- .wav to .mp3 for example

##### transformation 
- post processing of audio
- reverb, delay, EQ, flanger, phaser, - the tools for mixing audio

##### audio synths:
- subtrative synth: remove from rich sounds of one osciallator 
- additive synth: adding together oscialltor for creating composite sounds
- FM synth: modulate one oscillator with another one
- many other: granular, physical modelling, wave shapoing, sampling, spectral synth

##### description of audio:

train machine learning for information retrieval about music

- low-level: loudness, timbre, pitch
- mid-level: rhythm, harmony, melody
- high-level: genre, emotions, similarity

extracting audio features


### Course Outline

course content github: https://github.com/MTG/sms-tools


- wk1: intro
- wk2: discrete fourier transform
- wk3: fourier transform theorems and properties 
- wk4: short-time fourier transform
- wk5: sinusoidal model
- wk6: harmonic model
- wk7: sinudoidal plus residual modeling
- wk8: sound transformations
- wk9: sound/music description
- wk10: concluding topics

### Mathematics (more in handwritten notes and lectures)

- no calculus required for this course material
- sinusoidal functions
- complex numbers
- euler's formula
- complex sinusoids
- scalar product of sequences
- even and odd functions
- convolution 

### Course Reference - Stanford:

https://ccrma.stanford.edu/~jos/mdft/

MATHEMATICS OF THE DISCRETE FOURIER TRANSFORM (DFT) 
WITH AUDIO APPLICATIONS 
SECOND EDITION
JULIUS O. SMITH III 
Center for Computer Research in Music and Acoustics (CCRMA)

<hr>

#### Tools for Course:

- Audacity
- SonicVisualizer
- Python:
    - Spectral Modelling Synthesis Tools ([sms-tools](https://github.com/MTG/sms-tools){: target="_blank"})
    - numpy
    - matplotlib
    - scipy
    - cython
    - ipython

