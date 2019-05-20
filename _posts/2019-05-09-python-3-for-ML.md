---
layout: post
title: python 3 for ML 
artist: Myon & Shane 54 feat. Labworks
artistLink: https://edm.fandom.com/wiki/Myon_%26_Shane_54
track: Ibiza Sunrize (Dub remix)
trackLink: https://youtu.be/SWmnZwA_TQA
tags: [chexpert, notes, machine learning, summer projects]
updated: 2019-05-18
---


### Python 3 Installation:

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

see `cython` post [here](https://numoonchld.github.io/2019/05/07/cython-notes-0.html){: target="_blank"} on how to compile '`.pyx`' 


### Computational Packages Installation:

- install `pandas`

        pip3 install pandas

- install `numpy`

        pip3 install numpy

- install `scipy`

        pip3 install scipy

- install `matplotlib`
 
        pip3 install matplotlib

- install `seaborn`

        pip3 install seaborn

- install `scikit-learn`

        pip3 install scikit-learn

- install `tensorflow` for deep learning

        pip3 install tensorflow

- install `keras` for `tensorflow` frontend

        pip3 install keras 

use a [search engine](https://startpage.com){: target="_blank"} for respective package documentation 


### Check installations:

- enter `IPython` console in CLI and check installation versions 
        
        python3 -m IPython

        # check pandas
        import pandas
        pandas.__version__  

        # check numpy
        import numpy
        numpy.__version__

        # check scipy
        import scipy
        scipy.__version__ 

        # check matplotlib
        import matplotlib
        matplotlib.__version__ 

        # check seaborn
        import seaborn
        seaborn.__version__ 

        # check scikit-learn
        import sklearn  
        sklearn.__version__

        # check tensorflow
        import tensorflow
        tensorflow.__version__

        # check keras
        import keras  
        keras.__version__

Next Up: [data-preprocessing](#){: target="_blank"}

<hr>

## References:

- [dealing with multiple python versions and pip](https://stackoverflow.com/a/4910393){: target='_blank'}
- [python - site package](https://docs.python.org/3/library/site.html#module-site){: target='_blank'}
- ['Pip Installs Packages' (pip) - The Python Package Manager](https://pip.pypa.io/en/stable/){: target='_blank'}
- [tensorflow import error fix](https://stackoverflow.com/questions/49084934/illegal-instruction-4-when-importing-tensorflow-in-python-3-6){: target="_blank"}