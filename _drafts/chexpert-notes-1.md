---
layout: post
title: chexpert notes 1
artist: Myon & Shane 54 feat. Labworks
artistLink: https://edm.fandom.com/wiki/Myon_%26_Shane_54
track: Ibiza Sunrize (Dub remix)
trackLink: https://youtu.be/SWmnZwA_TQA
tags: [chexpert, notes, machine learning, summer projects]
---


### Python Installation and Setup:

- [download and install](https://www.python.org/downloads/){: target='_blank'} `python3` 

- locate `python3` packages site:
   
        # Print the path to the user site-packages directory
        $ python3 -m site --user-site 

- installing `python3` makes `pip3` available (at least on my machine - check on yours)
        
        # check pip3 version
        pip3 --version

        # force upgrade pip3
        pip3 install --upgrade pip

- install `ipython` to setup OS shell interaction in `python3` CLI:

        pip3 install ipython

- install `cython` for performance benefits: 

        pip3 install cython

see `cython` post [here](){: target="_blank"} on how to compile '`.pyx`' 


### Computational Packages Installation:

- install `pandas`

        pip3 install pandas

- install `numpy`

        pip3 install numpy

- install `scipy`

        pip3 install scipy
 

### Check installations:

- install 

<hr>

## References:

- [Dealing with multiple Python versions and PIP](https://stackoverflow.com/a/4910393){: target='_blank'}
- [python - site package](https://docs.python.org/3/library/site.html#module-site){: target='_blank'}
- ['Pip Installs Packages' (pip) - The Python Package Manager](https://pip.pypa.io/en/stable/){: target='_blank'}