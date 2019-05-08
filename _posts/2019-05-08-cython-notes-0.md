---
layout: post
title: cython notes 0
artist: Miroslav Vrlik
artistLink: https://www.discogs.com/artist/1990315-Miroslav-Vrlik
track: Beautiful Moments
trackLink: https://youtu.be/PLFVTQZZGy8
tags: [cython, notes, python]
---

repository of my complied code to go with notes:
- [cython basics work-bench](https://github.com/numoonchld/cython-basics){: target='_blank'}


## cython

`cython` is `python` with statically typed `python`/`C` data types, so essentially a mash-up of performance benefits of `C` and high-level ease-of-programming of `python`

- `cython` is `python` -- almost any piece of `python` code is also valid `cython` code

- `cython` is not a `python` to `C` translator, it is an alternative complier for `python`
    - more specifically, an optimizing static compiler

- the code runs within the `python` runtime environment; but rather than compiling to interpreted `python` code, it compiles to native machine code


## cython benefits

- because parameters and variables can be declared to have `C` data types and explicitly declared `python` variable types (statically typed), code which manipulates `python` variable types and `C` variable types can be freely intermixed, with conversions occurring automatically wherever possible
- reference count maintenance and error checking of `python` operations is automatic
- `python`’s exception handling facilities, including the 
    - `try`-`except` and 
    - `try`-`finally` statements, is available to in the midst of manipulating `C` data


### compiling code with cython

- one of the hardest part of getting started with `cython`: figuring out how to compile the code file
    - `cython` uses '`.pyx`' file extension instead of the typical `python`'s '`.py`' extension 

- to compile with `cython` to '.c` files, save `python` code to a '`.pyx`' extensioned file (`fileToComplie.pyx` for example)

- then, create a `setup.py` in the same directory with following code: 
    
        from distutils.core import setup
        from Cython.Build import cythonize

        setup(
            ext_modules = cythonize("fileToComplie.pyx")
        )

- then, run this `setup.py` file to build the '`.pyx'` file to `C`:

        $ python setup.py build_ext --inplace

    this will create a '`.c`' and a '`.so`' (shared object) in the working directory along with a `build` directory

- then, in the `python` CLI, do: 

        import fileToCompile

    this will import the complied '`.so`' into `python` as a package, and immediately run the script (displaying any `print` statement outputs)
    
- the functions defined within this `import` can be used like using functions from any other imported `python` package 

### cython data types

- `cython` data types have to be defined explicitly in the '`.pyx`' file code to utilize the statically typed performance benefits
    - using `cdef` or `cpdef` along with explicitly setting variable type enables compilation to machine level code
    - statically typed `python`-style `cython` variables:

            cdef int x,y,z
            cdef char *s
            cdef float x = 5.2 (single precision)
            cdef double x = 40.5 (double precision)
            cdef list languages
            cdef dict abc_dict
            cdef object thing

- function definition prefixes
    - `def`: regular `python` function interpretation, returns `python` object
    - `cdef`: `cython` only functions, can't access these from `python`-only code (`.py` files), must access within `cython`, since there will be no `C` translation to `python` for these
    - `cpdef`: for `cython` and `python` compilation , will create a `cython` function and a wrapper for `python`
        - in some cases when there is a `C` only pointer like a `C` array, then `cpdef` will throw errors
    - `C` arrays (in lieu of `numpy` array) can be used through `cython` by using

            from cython.view cimport array as cvarray

## learnings

- `cython` is a compiler which compiles `python`-like code files to `C` code

- `cython` is not a `python` to `C` translator, the code runs within the `python` runtime environment; but rather than compiling to interpreted `python` code, it compiles to native machine code

- `cython` data types have to be defined explicitly in the '`.pyx`' file code to utilize the statically typed performance benefits

- having compared a mean-squared-error function performance in `cython` and `python`, the `cython` function is 5 times faster on an average 

![performance boost](/media/blogAssets/cython/cython-basics.svg)
{: style="text-align: center;"}

- run `runtest.py` in `performance-tests` folder in the work-bench repository to see performance results on your machine

<hr> 

# References:

#### basics
- [cython - Basic Tutorial](http://docs.cython.org/en/latest/src/tutorial/cython_tutorial.html){: target='_blank'}
- [cython type declarations](https://pythonprogramming.net/introduction-and-basics-cython-tutorial/#cdef-declarations:){: target="_blank"}
- [cython for numpy users](http://docs.cython.org/en/latest/src/userguide/numpy_tutorial.html){: target="_blank"}

#### performance comparisons 
- [performance gain from cython](https://youtu.be/mXuEoqK4bEc){: target="_blank"}
- [performance comparison of python, cython and numpy](https://notes-on-cython.readthedocs.io/en/latest/std_dev.html){: target="_blank"}

#### limitatons
- [cython - Limitations](http://docs.cython.org/en/latest/src/userguide/limitations.html#cython-limitations){: target='_blank'}
