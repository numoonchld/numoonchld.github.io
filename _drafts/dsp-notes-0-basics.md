---
layout: post
title: digital signal processing - notes 0 - basics 
artist: 
artistLink:
track: 
trackLink: 
tags: [dsp, notes, signal ]
---

- obligatory dead person quote:
    - "[...] space and time are mere thought entities and creatures of the imagination [...] They precede the existence of objects of the senses [...]"

- signal: description of a physical phenomenon's evolution over time

- signal processing:
    - analysis: understanding the information carried by the signal
    - synthesis: creating a signal to contain the given information 

- digital paradigm for signal processing:
    - discrete time
    - discrete amplitude

- each 'sample' is subjected to both:
    - time discretization
    - amplitude discretization

#### discrete-time

- discrete-time model: 
    - more practical model of reality
    - a paradigm that moves away from the idealistic analog paradigm
        - makes computation more intuitive 
        - finding solutions are easier with computational methods

- Sampling Theorem:
    - mathematically, analog and discrete models are equivalent
        - provided sufficient sampling is available for discrete models

- samples replace idealized models
- simple math replaces calculus

#### discrete-amplitude

- each amplitude can only take on a value from a predetermined set
    - the number of levels in countable
    - so the amplitude is mapped to a set of integers

- this ability to integer mapping provides benefits for
    - storage
    - processing
    - transmission

- analog signals suffer from noise and attenuation in way that causes loss of information during signal transmission
    - digital signal transmission mechanisms are more robust 
    - information is significantly low

- general-purpose storage can be used
- general-purpose processing can be applied
- noise can be controlled during signal transmission


## discrete-time signals

- 'lollipop' notation
- discrete-time signals sampled sufficiently densely look continuous in a plot

#### formally

- a sequence of complex numbers
- one dimensional
- notation: `x[n]` [n]: integer
- two-sided sequences: *x:* **Z ➞ C**
    - n goes from -∞ to +∞
- n is *adimensional* "time"
    - no physical units, just sets a numerical id to the sample 
- analysis eg.: periodic temperature 
    - synthesis for this: stream of generates samples

#### fundamental discrete signals

- delta signal: x[n] = 𝛿[n]
    - when n == 0, x == 1; else x == 0
    - signifies a physical phenomenon that lasts a very short duration of time
    - eg. a clapper for syncing video and audio for a movie recording 
        - when audio and video recording happens separately

- unit step: x[n] = **u*[n]
    - when n < 0, x == 0; else x == 1
    - synonymous to flipping a switch

- exponential decay: x[n] = |a|<sup>n</sup> *u*[n], |a| < 1
    - when n < 0, x == 0; else x decays exponentially, starting from 1 @ n == 0
    - x reaches 0 @ ∞
    - newton's law of cooling
        - cooling of a coffee cup
    - rate of capacitor discharge
    
- sinosoid: x[n] = sin(ω<sub>0</sub>*n* + 𝜃)
    - ω<sub>0</sub>: angular frequency (rad)
    - 𝜃: initial phase (rad)

## signal classes

- finite-length
- infinite length
- periodic 
- finite-support

#### finite length signals

- can only have N samples 
    - N: range of signal
    - N is limited
- notations: 
    - sequence: x[n], n = 0,1,...,N-1
    - vector: x = [x<sub>0</sub>, x<sub>1</sub>,..., x<sub>N-1</sub> ]<sup>T</sup>
- practical entities
    - good for numerical packages 

#### infinite length signals

- can have infinite number of samples
- it is an abstraction
- useful for theorems that do not depend on the length of the data

#### periodic signals

- data repeats every N samples
- N-periodic signals: <bar>x</bar>[n]




