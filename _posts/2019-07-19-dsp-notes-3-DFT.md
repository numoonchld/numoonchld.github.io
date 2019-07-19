---
layout: mathpost
title: digital signal processing - notes 3 - DFT
artist: Koka
artistLink: https://vimeo.com/user22916064
track: Beat Machine No. 5
trackLink: https://vimeo.com/312694108
tags: [dsp, notes, DFT, DFT plot, basis change, spectrogram, wideband, narrowband ]
---

## contents

- [fourier basis](#fourier-basis)
- [basis expansion](#basis-expansion)
- [DFT calculations](#DFT-calculations)
- [interpreting a dft plot](#interpreting-a-dft-plot)
- [dft in practice](#dft-in-practice)

<hr>

## fourier basis 

- for \\(\mathbb{C}^N\\)

- in signal notation:
    - \\(w_k[n] = e^{j\frac{2\pi}{N}nk}\\), for \\( n,k = 0,1,\ldots,N-1 \\)

- in vector notation
    - \\( \\{ \textbf{w}^{(k)}\\}_{k = 0,1,\ldots,N-1} \\)
    - with \\( w_n^{(k)} = e^{j\frac{2\pi}{N}nk}\\)

- Fourier Basis are a set of N orthogonal vectors
    - hence are a basis for \\(\mathbb{C}^N\\)

- they are not orthonormal, normalization factor is \\( \frac{1}{\sqrt{N}} \\)
- will keep normalization factor explicit in DFT formulas 

<hr>

## basis expansion
<br>

#### analysis formula

- \\( X_k = \langle \textbf{w}^{(k)}, x \rangle \\)

#### synthesis formula

- \\( x = \frac{1}{N}\sum_{k=0}^{N-1}X_k\textbf{w}^{(k)} \\)

#### change of basis in matrix form

- analysis formula: 
    - \\( \textbf{X} = \textbf{W}\textbf{x} \\)
- synthesis formula:
    - \\( x = \frac{1}{N}\textbf{W}^H\textbf{X} \\)

#### signal notation

- analysis formula:
    - \\( X[k] = \sum_{n=0}^{N-1}x[n]e^{-j\frac{2\pi}{N}nk} \\)
        - \\( k = 0,1,\ldots,N-1 \\)
        - N point signal in the frequency domain

- synthesis formula:
    - \\( x[n] = \frac{1}{N} \sum_{k=0}^{N-1} X[k] e^{j\frac{2\pi}{N}nk}  \\)
        - \\( n = 0,1,\ldots, N-1 \\)
        - N point signal in time-index domain for discrete time

<hr>

## DFT calculations
<br>

#### dft is linear 
- \\( DFT \\{ \alpha x[n] + \beta y[n] \\} = \alpha DFT \\{ x[n] \\} + \beta DFT \\{ y[n] \\} \\) 

<br>

#### dft of \\( \delta[n] \\)

- here: \\(x[n] == \delta[n] \\)
- \\( X[k] = \sum_{n=0}^{N-1}x[n]e^{-j\frac{2\pi}{N}nk} \\)
    - \\( \sum_{n=0}^{N-1}\delta[n]e^{-j\frac{2\pi}{N}nk} = 1\\)

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/dsp-unit-dft.png" alt="dsp-dft">

*fig: fourier transform of discrete-time delta*
{: style="font-size: 80%; text-align: center;"}


<br>

#### dft of \\( x[n] = 1 \\)
- for \\( x[n] \in \mathbb{C}^N\\)

- \\( X[k] = \sum_{n=0}^{N-1}x[n]e^{-j\frac{2\pi}{N}nk} \\)
    - \\( \sum_{n=0}^{N-1}e^{-j\frac{2\pi}{N}nk}\\)
    - \\( N\delta[k] \\)

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/dsp-dft-2.png" alt="dsp-dft-2">

*fig: fourier transform of function 1*
{: style="font-size: 80%; text-align: center;"}

<br>

#### dft of \\( x[n] = 3 \cos{\frac{2\pi n}{16}} \\)
- for \\( x[n] \in \mathbb{C}^{64}\\)

- in \\( \mathbb{C}^{64} \\), the fundamental frequency of the fourier transform is \\( \omega = \frac{2\pi}{64} \\)

- \\( x[n] = 3 \cos{\frac{2\pi n}{16}} \\)
    - \\( = 3 \cos{\frac{4 (2\pi) n}{64}} \\)
    - use expansion: \\( \cos \omega = \frac{ e^{j\omega} + e^{-j\omega} }{2} \\)
    - \\( = \frac{3}{2}\Big\[ e^{j\frac{2\pi}{64} (4n)} + e^{-j \frac{2\pi}{64} (4n)} \Big\] = \frac{3}{2}\Big\[ e^{j\frac{2\pi}{64} (4n)} + e^{j \frac{2\pi}{64} (60n)} \Big\] \\)
    - \\( = \frac{3}{2}\Big\( w_4[n] + w_{60}[n] \Big\) \\)

- so \\( X[k] = \langle w_k[n],x[n] \rangle \\)
    - \\( = \langle w_k[n], \frac{3}{2}(w_4[n] + w_{60}[n]) \rangle \\)
    - \\( = \frac{3}{2} \langle w_k[n], w_4[n] \rangle +  \frac{3}{2} \langle w_k[n] + w_{60}[n]) \rangle \\)
    - \\( = \bigg \\{ \begin{matrix} 96 & for \text{ } k = 4,60 \\\\ 0 & otherwise  \end{matrix} \\)

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/dsp-dft-3.png" alt="dsp-dft-3">

*fig: [Re] and [Im] of DFT of \\( x[n] = 3 \cos{\frac{2\pi n}{16}} \\)*
{: style="font-size: 80%; text-align: center;"}


<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/dsp-dft-4.png" alt="dsp-dft-4">

*fig: similarly, [Re] and [Im] of DFT of \\( x[n] = 3 \cos{\frac{2\pi n}{16} + \frac{\pi}{3}} \\)*
{: style="font-size: 80%; text-align: center;"}

<hr>

## interpreting a dft plot

<br>

#### rotation direction

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/dsp-dft-8.png" alt="dsp-dft-8">

*fig: dft chart frequency rotation*
{: style="font-size: 80%; text-align: center;"}

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/dsp-dft-9.png" alt="dsp-dft-9">

*fig: dft chart frequency rotation*
{: style="font-size: 80%; text-align: center;"}



#### speed distribution

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/dsp-dft-5.png" alt="dsp-dft-5">

*fig: dft chart frequency distribution*
{: style="font-size: 80%; text-align: center;"}


<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/dsp-dft-6.png" alt="dsp-dft-6">

*fig: stationary frequency (k=0)*
{: style="font-size: 80%; text-align: center;"}

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/dsp-dft-7.png" alt="dsp-dft-7">

*fig: fastest frequency (k=32)*
{: style="font-size: 80%; text-align: center;"}

#### energy distribution

- Conservation of Energy across domains:
    - underlying energy of a signal doesn't change with change of basis

- Square magnitude of k-th DFT coefficient proportional to signal's energy at frequency \\( \omega = \frac{2\pi}{N}k\\)

#### dft of real signals

- dft of real signals are symmetric in magnitude 

<hr>


## dft in practice 
<br>

- the highest frequency of a digital system is half of the inherent sampling rate
    - \\(f_{max} = \frac{F_s}{2}\\)

- in the DFT window, this corresponds to the mid-point of the window
    - i.e. \\( k = \frac{N}{2} \\)

- so first find \\( k = \frac{N}{2} \\), and set that equal to half the sampling frequency 
- then, use linear interpolation to find that smaller components' frequencies
    - \\( f_s = \frac{\frac{F_s}{2}k}{\frac{N}{2}}  \\)


#### fourier analysis of musical instruments

- the played note is the first peak: 220Hz for example
    - this is the pitch of the instrument
- the other peaks are called harmonics, they define the typical sound of the instrument 


#### short-time fourier transform (STFT)

- dual-tone multi frequency (dtmf dial phone)

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/dsp-dft-10.png" alt="dsp-dft-10">

*fig: dtmf dial-pad*
{: style="font-size: 80%; text-align: center;"}

- when say key 4 is pressed, 
    - two sinusoids are generated, one specified at the row and another by the column  
    - 770 Hz and 1209 Hz 

- the frequencies are chosen such that they are co-prime
- no sum or differences in frequencies are the same as the any of the chosen frequencies 
- goal is to minimized errors while decoding pressed numbers at the exchange

- fundamental trade-off in signals
    - time representation obfuscates frequency information
    - frequency representation obfuscates time 

- so, the signal at the exchange is subjected to DFT in small chucks of window
    - each window is applied to the burst of sound corresponding to a key press

- so, in that way STFT is just standard DFT applied to a restricted portion of a signal
- it is useful to obtain simultaneously obtain time and frequency information 

#### the spectrogram

- color-code the magnitude 
    - dark is small
    - white is large

- use \\( 10 \text{ } log_{10}(\vert X[m;k]\vert) \\) to see better (power in dBs)
    - plot spectral slices one after another

- spectrogram can be applied to visualize the numbers dialled using a DTMF dialpad
- spectrogram can be wide-band or narrow-band, based on the number of points samples

- in a long window, more frequency resolution cna be had
    - but since it is sensitive to a lot of things happening over time, it is not precise in time   

- in a short window, many time slices - precise location of transitions
    - short window, fewer DFT points - poor frequency resolution

- to better localize the position of a start and end of a key press, the length of the DFT has to be reduced

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/dtmf-wideband.png" alt="wideband">

*fig: dtmf dial-pad wideband spectrogram*
{: style="font-size: 80%; text-align: center;"}

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/dtmf-medband.png" alt="medium band">

*fig: dtmf dial-pad medium band spectrogram*
{: style="font-size: 80%; text-align: center;"}

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/dtmf-narrowband.png" alt="narrow band">

*fig: dtmf dial-pad super narrow band spectrogram*
{: style="font-size: 80%; text-align: center;"}

<hr>

## references 
<br>

- [coursera dsp](https://www.coursera.org/learn/dsp/home/welcome){: target="_blank"}