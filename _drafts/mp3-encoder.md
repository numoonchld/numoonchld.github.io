---
layout: mathpost
title: mp3 encoder
artist: 
artistLink: 
track: 
trackLink: 
tags: [dsp, notes, mp3 ]
---

## mp3

- **MP3**: 
    - stands for **MP**EG - Layer **3**
    - **MPEG**: **M**otion **P**icture **E**xpert **G**roup
- in the 90's a bunch of experts agreed on a set of standards for digital video and audio compression and encoding

- MP3 format of audio compression and encoding turned out to be the popular digital audio format for 
    - streaming
    - storage 
    - playback
- a portable music device cna store up to 30000 mp3 files

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/mp3-splash.png" alt="mp3-splash">

*fig: \\(mp^3\\) digital audio encoding*
{: style="font-size: 80%; text-align: center;"}

- various dsp tools come together to make this encoding possible

#### origins

- mp3 based on compression algorithms developed in the fraunhofer institutes in germany
- mp3 standard was quickly embraced in the industry
    - strong PR

#### lossy compression scheme

- start with a discrete-time sound signal \\(x[n]\\)
- goal: 
    - reduce number of bits to represent original 
    - reduce memory requirements to store sound signal

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/mp3-00.png" alt="mp3-00">

*fig: digital signal flow - encoding and decoding*
{: style="font-size: 80%; text-align: center;"}

- \\(x[n]\\) is fed to an encoder, that converts this into a binary string
    - goal here is to reduce the memory required to store the waveform 
- a decoder is designed to convert it back to a sound signal \\(y[n]\\)

#### encoding 

- mp3 encoding reduces the number of bits needed for a digital sound signal by a large amount   
    - the tradeoff is sound quality 
    - the lesser size it is encoded to, more the sound degradation
    - so, mp3 encoding is a lossy compression scheme

###### storage size comparison

- consider a DVD standard audio file
    - this is uncompressed digital audio 
    - sampling rate: 48 khz
    - digital bit depth: 16-bit per sample 
    - takes 12 MB of storage for 1 min of stereo audio

- a high quality mp3 encoded takes 
    - about 1.5 MB for the same 1 min stereo audio
    - this is about 10 times lesses than DVD quality
    - lossly digital audio file 
    - sound quality degradation occurs, but usable 
    

###### human ears and mp3

- key ingredient of mp3 encoding framework:
    - modelled around the human auditory system

- encoding doesn't attempt to preserve the original structure of the input audio file
    - it focusses on encoding the most important parts of the input audio waveform 
    - that are key to human ears listening to music and hearing sounds
    - the loss of the information form the original signal is placed in the spectrum that the human ear cannot hear

<hr>

## mp3 encoding - block diagram

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/mp3-01.png" alt="mp3-01">

*fig: mp3 encoding block diagram*
{: style="font-size: 80%; text-align: center;"}

- *sub-band filtering*: splits spectral range of input into 32 independent channels
- *sub-band sample quantization*: each channel is quantized independently 
    - number of bits each allocated to each sub-band is dependent on the perceptual importance 
    - sub-bands that are of not important and difficult to be perceived by the human ear are assigned very few bits or none at all
    - more perceptually relevant it is, the more of the bulk of the bit budget is allocated to that sub-band
    - this possible because of the masking effect of the human auditory system
- *bit-stream formatting*: quantized samples are formatted and encoded in a continuous bit stream

#### masking effect 

- example of the masking effect:
    - in a quiet room, possibly at night, the human ear can even hear the ticking of a watch
    - in an environment with a lot of ambient noise, possibly in the day, the ear cannot hear the ticking of a watch 
        - it is drowned out in the ambient noise of higher amplitudes
    - but an audio recording will contain the ticking watch information in both the quiet and the noisy environments 
        - this can be seen in the audio recording spectrum

- for a given environment of sounds, there is a unique masking threshold 
    - the shape of this masking threshold is determined experimentally
    - by running a lot of listening tests with human subjects

###### relative amplitudes 

- consider a sound like below with a pronounced peak
    - the blue curve is the spectrum of the sound
    - the red dot is the strongest component 
    - the red dotted line is a masking threshold

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/mp3-02.png" alt="mp3-02">

*fig: masking effect of human auditory system*
{: style="font-size: 80%; text-align: center;"}

- a masking effect takes place in the the human ear for a sound like this
- the frequency components in the vicinity of the peak strength are not heard unless they are louder than a giving masking threshold
- anything below the red dotted line will not be heard by the ear
    - this can be removed without any perceived quality loss

###### frequency resolution

- masking in human ear takes place within critical bands
    - these critical bands are treated by human ear as a single unit
    - two different frequencies within a single band are perceived as one single tone
        - everything within a band can NOT be resolved further in the ear
    - there are around 24 bands critical bands for the human ear

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/mp3-03.png" alt="mp3-03 - critical bands">

*fig: frequency distribution of critical bands of human hearing*
{: style="font-size: 80%; text-align: center;"}

- the critical bands are not linearly distributed, it is logarithmic
    - the resolution power of the ear is higher at low frequencies 
    - as the frequencies get higher, the resolution in the ear is less discriminant

- since the human ear is less discriminant in the higher frequencies 
    - more noise is tolerated in the higher frequencies than in the lower frequencies
    - noise in the higher frequencies cannot be resolved by the human ear

- so, more masking in higher frequencies because of the logarithmic distribution of the critical bands



#### psycho-acoustic model 

- this is the bit allocation procedure that assigns the number of bits to each of the 32 sub-bands

- auditory perception based bit allocation procedure
    - NOT uniform bit allocation

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/mp3-04.png" alt="mp3-04">

*fig: psycho-acoustic vs. uniform bit allocation*
{: style="font-size: 80%; text-align: center;"}

- purpose of psycho-acoustic model
    - compute minimum number of bits for each of the 32 sub-bands in the mp3 encoding
    - such that perceptual distortion is minimized

- a non-uniform bit allocation is obtained which allocates fewer bits to bands with strong masking

- the psycho-acoustic model is not a part of the mp3 specification
    - it is continuously improved by tests and research

- the number of bits user of each sub-band is sent along with the quantized data 
    - quantization is agnostic to the method of bit allocation

- this procedure is technically involved and has several steps, here is an outline 


###### step 1 
- use FFT to estimate the energy in each sub-band

###### step 2
- distinguish tonal (sine like) and non-tonal (noise like) components

###### step 3 
- determine masking effect of tonal and non-tonal components in each critical band

###### step 4
- determine total masking effect by summing the individual contributions
    - obtain global masking curve

###### step 5
- map this total effect to the 32 sub-bands

###### step 6
- determine bit allocation by allocating polarity bits to aub-bands with lowest signal-to-mask ratio

#### sub-band filtering 

- the input signal is fed to a filter bank
- filter bank has 32 filters, each extract one sub-band from input
    - isolates different parts of the spectrum

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/mp3-05.png" alt="mp3-05">

*fig: sub-band filtering*
{: style="font-size: 80%; text-align: center;"}

- filters are 512-tap FIRs (Finite Impulse Response)
- each filter is followed by a 32X down-sampler 
    - provides independence of band samples