---
layout: mathpost
title: digital signal processing - notes 0 - basics 
artist: 
artistLink:
track: 
trackLink: 
tags: [dsp, notes, signal ]
---

- obligatory dead person quote:
    - "\[...\] space and time are mere thought entities and creatures of the imagination \[...\] They precede the existence of objects of the senses \[...\]"

- number sets:
    - N: natural numbers (1 to ♾)
        - whole numbers (0 to ♾ )
    - Z: integers 
    - Q: rational numbers (non-recurring decimals)
    - P: irrational numbers (non-repeating and non-recurring mantissa)
        - π value
        - sqrt(2)
    - R: real numbers (everything on the number line)
        - includes rational and irrational numbers

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/numbersets.svg" alt="number-sets">

*fig: number sets*
{: style="font-size: 80%; text-align: center;"}

# digital signal processing 

- signal: description of a physical phenomenon's evolution over time

- signal processing:
    - analysis: understanding the information carried by the signal
    - synthesis: creating a signal to contain the given information 

- digital paradigm for signal processing:
    - discrete digitized time
    - discrete digitized amplitude

- each 'sample' is subjected to both:
    - time discretization: time component 'n'
    - amplitude discretization: amplitude component 'x'

- a sample is denoted by `x[n]`

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
- notation: \( x[n] \) 
    - `[n]`: integer
- two-sided sequences: \( *x:* **Z ➞ C** \)
    - n goes from -∞ to +∞
- n is *adimensional* "time"
    - no physical units, just sets a numerical id to the sample 
- analysis eg.: periodic temperature 
    - synthesis for this: stream of generates samples

#### fundamental discrete signals

- delta signal: \( x[n] = 𝛿[n] \)
    - when n == 0, x == 1; else x == 0
    - signifies a physical phenomenon that lasts a very short duration of time
    - eg. a clapper for syncing video and audio for a movie recording 
        - when audio and video recording happens separately

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/delta.png" alt="delta">

*fig: discrete delta*
{: style="font-size: 80%; text-align: center;"}

- unit step: \( x[n] = *u*[n] \)
    - when \( n < 0, x == 0; else x == 1 \)
    - synonymous to flipping a switch

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/unitstep.png" alt="unit step">

*fig: discrete unit step*
{: style="font-size: 80%; text-align: center;"}

- exponential decay: $x[n] = |a|<sup>n</sup> *u*[n], |a| < 1$
    - when n < 0, x == 0; else x decays exponentially, starting from 1 @ n == 0
    - x reaches 0 @ ∞
    - newton's law of cooling
        - cooling of a coffee cup
    - rate of capacitor discharge

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/expdecay.png" alt="exponential decay">

*fig: discrete exponential decay*
{: style="font-size: 80%; text-align: center;"}
    
- sinosoid: $x[n] = sin(ω<sub>0</sub>*n* + 𝜃)$
    - ω<sub>0</sub>: angular frequency (rad)
    - 𝜃: initial phase (rad)

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/sinusoid.png" alt="sinusoid">

*fig: discrete sinusoid*
{: style="font-size: 80%; text-align: center;"}

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
    - sequence: $x[n], n = 0,1,...,N-1$
    - vector: $x = [x_0, x_1,..., x_{N-1} ]^T$
- practical entities
    - good for numerical packages 

#### infinite length signals

- can have infinite number of samples
- it is an abstraction
- useful for theorems that do not depend on the length of the data

#### periodic signals

- data repeats every N samples
- N-periodic signals: <tilde>x</tilde>[n] = <tilde>x</tilde>[n + kN], n, k, N ∈ Z
    - same information as finite-length of length *N*
    - natural bridge between finite and infinite lengths

#### finite-support signals

- infinite length sequence
    - but only a finite number of non-zero sample
- notation: <bar>x</bar>
- <bar>x</bar> = x[n] if 0 ≤ n ≤ N, else 0 ; n ∈ Z
- same information as finite-length 
- another bridge between finite and infinite length lengths

## elementary signal operations

- scaling:
    - y[n] = α.x[n]
- sum:
    - y[n] = x[n] + z[n]
- product:
    - y[n] = x[n].z[n]
- delay:
    - y[n] = x[n-k], x ∈ Z 
    - output of operation is shifted by k samples
    - care must be taken to append and prepend zeros to accommodate the shift 
    - usually done by turning finite signal into a finite-support signal, then applying the shift
    - a shift can also be applied by making the finite signal periodic  
        - the samples then circle around in the given range of time 

- energy:
    - E<sub>x</sub> = 

# references

- [number sets and operation symbols](http://ksacg.faculty.ku.edu/ksacg/145/2016_Fall/Math_symbols%20.pdf){: target="_blank"}
- 