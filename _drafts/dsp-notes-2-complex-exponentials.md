---
layout: mathpost
title: digital signal processing - notes 2 - vector spaces
artist: 
artistLink: 
track: 
trackLink: 
tags: [dsp, notes, vectors, vector spaces, linear algebra ]
---

## contents
<br>

- [discrete signal vectors](#discrete-signal-vectors)
    - [vector space framework](#vector-space-framework)
- [vector spaces](#vector-spaces)
    - [vector space axioms](#vector-space-axioms)
    - [inner product](#inner-product)
    - [norm and distance](#norm-and-distance)
- [signal spaces](#signal-spaces)
    - [completeness](#completeness)
    - [common signal spaces](#common-signal-spaces)
- [bases](#bases)
    - [vector families](#vector-families)
    - [change of basis](#change-of-basis)
- [subspaces]
    - []

<hr>

## discrete signal vectors
<br>

- a generic discrete signal:
    - \\( x[n] = ...,1.23, -0.73, 0.89, 0.17, -1.15, -0.26,... \\)
    - set of ordered number sequence

- four classes of signals
    - finite length
    - infinite length
    - periodic
    - finite support

- digital signal processing:
    - signal analysis
    - signal synthesis

- number sets:
    - \\( \mathbb{N} \\): natural numbers \\( [1,\infty) \\)
        - whole numbers \\( [0,\infty) \\) 
    - \\( \mathbb{Z} \\): integers 
    - \\( \mathbb{Q} \\): rational numbers 
        - inclusive of recurring mantissa
    - \\( \mathbb{P} \\): irrational numbers 
        - non-repeating and non-recurring mantissa
        - \\( \pi \\) value, \\( \sqrt{2} \\)
    - \\( \mathbb{R} \\): real numbers (everything on the number line)
        - includes rational and irrational numbers
    - \\( \mathbb{C} \\): complex numbers
        - includes real and imaginary numbers

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/numsets.png" alt="number-sets">

*fig: number sets*
{: style="font-size: 80%; text-align: center;"}

<hr>

#### vector space framework:
<br>

- justification for dsp application:
    - is the common framework for different classes of signals
    - same framework for continuous-time signals
    - easy explanation of Fourier Transform
    - easy explanation of sampling and interpolation
    - useful in approximation and compression
    - fundamental in communication system design

- paradigms for application to discrete signals
    - object oriented programming
        - the instantiated object can have unique property values
        - but for a given object class, the properties and methods are the same 
    - lego 
        - the unit blocks are the same (different pieces that look and function the same)
        - these units can be used to build a complex structure by assembling them together in different ways
        - similarly, for analysis a complex signal is broken down into a combination of basis vectors

- key takeaways
    - vector spaces are very general objects
    - vector spaces are defined by their properties
    - once signal properties satisfy vector space conditions
        - vector space tools can be used 

<hr>

## vector spaces
<br>

- some vector spaces
    - \\(\mathbb{R}^2\\): 2D space
    - \\(\mathbb{R}^3\\): 3D space
    - \\(\mathbb{R}^N\\): N real numbers
    - \\(\mathbb{C}^N\\): N complex numbers


    - \\(\ell_2(\mathbb{Z}) \\): 
        - square-summable infinite sequences
    - \\(L_2([a,b]) \\):
        - square-integrable functions over interval \\([a,b] \\)

- vector spaces can be diverse

- some vector spaces can be represented graphically
    - helps visualize the signal in a vector space for analysis insights
    - \\(\mathbb{R}^2\\): \\(\textbf{x} = [x_0, x_1]^T\\)
    - \\(\mathbb{R}^3\\): \\(\textbf{x} = [x_0, x_1, x_2]^T\\)
    - both can be visualized in a cartesian system
        <img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/dsp-2D-vector-space.jpg" alt="2D-space">

        *fig: vector in 2D space*
        {: style="font-size: 80%; text-align: center;"}

    - \\(L_2([a,b]) \\): \\( \textbf{x} = x(t), t \in [-1,1] \\)
        - function vector space
        - can be represented as sine wave along time

        <img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/dsp-L2-vector-space.jpg" alt="L2-space">

        *fig: L2 function vector*
        {: style="font-size: 80%; text-align: center;"}


- others cannot be represented graphically:
    - \\(\mathbb{R}^N\\) for \\( N > 3\\)
    - \\(\mathbb{C}^N\\) for \\( N > 1\\)

<hr>

#### vector space axioms
<br>

- informally, a vector space:
    - has vectors in it 
        - *(courtesy: captain obvious)*
    - has scalars in it, like \\( \mathbb{C} \\)
    - scalers must be able to scale vectors 
        - *(courtesy: captain obvious)*
    - vectors summation must work

- formally, \\( \forall \text{ } \textbf{x,y,z} \in V, \text{ } and \text{ }  \alpha, \beta \in \mathbb{C} \\)
    - \\(\textbf{x} + \textbf{y} = \textbf{y} + \textbf{x}\\) 
        - commutative addition
    - \\( (\textbf{x} + \textbf{y}) + \textbf{z}  = \textbf{x} + (\textbf{y} + \textbf{z})\\) 
        - distributive addition
    - \\( \alpha(\textbf{x} + \textbf{y}) = \alpha \textbf{y} + \alpha \textbf{x}\\) 
        - distributive scalar multiplication over vectors
    - \\( (\alpha + \beta)\textbf{x} = \alpha \textbf{x} + \beta \textbf{x} \\) 
        - distributive vector multiplication over scalers
    - \\( \alpha(\beta \textbf{x}) = \alpha(\beta \textbf{x})\\)
        - associative scalar multiplication
    - \\( \exists \text{ }  0 \in V  \text{ } \|  \text{ } \textbf{x} + 0 = 0 + \textbf{x} = \textbf{x} \\)
        - null vector exists 
        - addition of null and another vector \\(\textbf{x}\\) returns \\(\textbf{x}\\)
        - summation with null vector is commutative
    - \\( \forall  \text{ } \textbf{x} \in V  \text{ } \exists  \text{ } (-\textbf{x})  \text{ } \| \text{ }  \textbf{x} + (-x) = 0 \\)
        - an inverse vector exists in vector space such that adding the vector with it's inverse yields the null vector

- examples of a vector space that fits this framework:
    - \\( \mathbb{R}^N \\): vector of N real numbers
        - two vectors from this space look like:
            - \\(\textbf{x} = [x_0, x_1, x_2, ... x_N]^T \\)
            - \\(\textbf{y} = [x_0, x_1, x_2, ... x_N]^T \\)
        - the above mentioned rules apply to these vectors and can be verified
    - \\( L_2[-1,1] \\)


<hr>

#### inner product 
<br>

- aka dot product: measure of similarity of two vectors
    - \\( \langle \cdot, \cdot \rangle: V \times V \rightarrow \mathbb{C} \\)
- takes two vectors and outputs a scaler which indicates how similar the two vectors are
    - if this inner product is zero, we say they are maximally different (they are orthogonal to each other)_0

- inner product axioms
    - \\( \langle x+y, z \rangle = \langle x, z \rangle + \langle y, z \rangle\\)
        - distributive over vector addition
    - \\( \langle x,y \rangle = \langle y,x \rangle^* \\)
        - commutative with conjugation
    - \\( \langle x, \alpha y \rangle = \alpha \langle x,y \rangle \\)
        - distributive with scalar multiplication
        - when scalar scales the second vector in the operation
    - \\( \langle \alpha x,y \rangle = \alpha^* \langle x,y \rangle \\)
        - distributive with scalar multiplication
        - conjugate scaler if it scaling the first vector of the inner product
    - \\( \langle x,x \rangle \geq 0 \\)
        - self inner product \\( \in \mathbb{R}\\)
    - \\( \langle x,x \rangle = 0 \Leftrightarrow x = 0 \\)
        - if self inner product is 0, then the vector is the null vector 
    - if \\( \langle x,y \rangle = 0 \text{ } and \text{ } x,y \neq 0 \\), then \\( x \\) and \\( y \\) are orthogonal
    
- norm of a vector:
    - inner product of a vector with itself
        - length of the vector
    - \\( \langle x,x \rangle = x_0^2 + x_1^2 = \Vert x \Vert ^ 2 \\)

- inner product of two vectors:
    - inner product are computed differently for different vector spaces
    - in \\( \mathbb{R}^2 \\) vector space:
        - \\( \langle x,y \rangle = x_0y_0 + x_1y_1 = \Vert x \Vert \Vert y \Vert \cos \alpha\\) 
            - where \\( \alpha\\): angle between \\(x\\) and \\(y\\)
        - when two vectors are orthogonal to each other
            - \\( \alpha = 90^{\circ}\\), so \\( \cos 90^{\circ} = 0 \\), so \\( \langle x,y\rangle = 0\\)
    - in \\( L_2\[-1,1\]\\) vector space:
        - \\( \langle x,y \rangle = \int_{-1}^1 x(t) y(t) dt\\)
            - norm: \\( \langle x,x \rangle = \Vert x \Vert^2 = \int_{-1}^1 \sin^2(\pi t)dt \\)

- the inner product of a symmetric and an anti-symmetric function is 0 
    - i.e. they are orthogonal to each other and cannot be expressed as a factor of the other in any way
    - example 1: 
        - \\( x = \sin(\pi t) \\) - anti-symmetric
        - \\( y = 1 - \vert t \vert\\) - symmetric
        - \\( \langle x,y \rangle = \int_{-1}^1 (\sin(\pi t))(1 - \vert t \vert) dt = 0 \\)

    <img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/dsp-sym-antisym.png" alt="L2-space">

    *fig: inner product of a symmetric and an anti-symmetric function*
    {: style="font-size: 80%; text-align: center;"}

    - example 2:
        - \\( x = \sin( 4 \pi t)\\) 
        - \\( y = \sin( 5 \pi t)\\)
        - \\( \langle x,y \rangle = \int_{-1}^1 (\sin(4 \pi t))(\sin(5 \pi t)) dt = 0 \\)

<hr>

#### norm and distance
<br>

- the norm of the difference between two vectors is the distance between the two
- the distance between orthogonal vectors is not zero

- in \\( \mathbb{R}^2 \\), norm is the distance between the vector end points 
    - \\( \Vert x - y \Vert \\) is the difference vector 
    - \\( \Vert x - y \Vert = \sqrt{(x_0 - y_0)^2 + (x_1 - y_1)^2} \\)
        - connects the end points of the vectors \\(x \\) and \\(y \\)
        - see rule of triangle vector addition

- in \\( L_2[-1,1] \\), the norm is the mean-squared error:
    - \\( \int_{-1}^1 \vert x(t) - y(t) \vert^2 dt \\)
    
<hr>

## signal spaces
<br>

#### completeness 
<br>

- consider an infinite sequence of vectors in a vector space 
    - if it converges to a limit, and this limit is within the vector space
    - then this vector space is said to be complete

- a vector space closed under limiting operations is termed a complete vector space
    - limiting operation is ambiguous, definition varies from on space to the other
    - so some limiting operation may fail and point outside the vector space

- Hilbert Space: a vector space that satisfies the completeness condition

<hr>

#### common signal spaces
<br>

- \\( \mathbb{C}^N \\): vector space of N complex tuples
    - valid signal space for finite length signals 
        - vector notation: \\(\textbf{x} = [x_0, x_1, ... x_N]^T\\)
        - where \\( x_0, x_1 ... x_N \\) are complex tuples
    - also valid for periodic signals
        - vector notation: \\( \tilde{\textbf{x}}\\)
    - all operations are well defined and intuitive
    - inner product: \\( \langle \textbf{x,y} \rangle = \sum_{n=0}^{N-1} x^*[n]y[n]  \\) 
        - well defined for all finite-length vectors in \\( \mathbb{C}^N\\)

- the inner product for infinite length signals explode in \\( \mathbb{C}^N\\)

- \\( \ell_2(\mathbb{Z}) \\): vector space of *square-summable sequences*
    - requirement for sequences to be square-summable: 
        - \\( \sum \vert x[n] \vert^2 < \infty\\)
        - sum of squares of elements of the sequence is less than infinity
        - all sequences that live in this space must have finite energy
    - "well-behaved" infinite-length signals live in \\( \ell_2(\mathbb{Z}) \\)
        - vector notation: \\(\textbf{x} = [..., x_{-2}, x_{-1}, x_0, x_1, ... ]^T\\)
    - a lot of other interesting infinite length signals do not live in \\( \ell_2 \\)
        - examples:
            - \\(x[n] = 1 \\)
            - \\(x[n] = \cos(\omega n) \\)
        - these have to be dealt with case-by-case



<hr>

## bases

- a basis is a building block of a vector space
    - a vector space usually has a few basis vectors called bases
    - like the lego unit blocks 

- any element in a vector space can be 
    - built with a combination of these bases
    - decomposed into a linear combination of these bases 

- popular fourier transform is simply a change of basis

<hr>

#### vector families 
<br>

- \\( \\{ \textbf{w}^{(k)} \\} \\): family of vectors
    - \\( k \\): index of the basis in the family

- canonical \\(\mathbb{R}^2\\) basis:
    - \\( \textbf{e}^{(0)} = \begin{bmatrix} 1\\\\ 0 \end{bmatrix} \text{; } \textbf{e}^{(1)} = \begin{bmatrix} 0\\\\ 1 \end{bmatrix} \\)
        - this family of basis vectors is denoted by \\( \textbf{e}^k\\)
    - any vector can be expressed as a linear combination of \\( \textbf{e}^k\\) in \\( \mathbb{R}^2 \\) 
        - \\( \begin{bmatrix} x_0 \\\\ x_1 \end{bmatrix} = x_0\begin{bmatrix} 1 \\\\ 0 \end{bmatrix} + x_1\begin{bmatrix} 0 \\\\ 1 \end{bmatrix} \\)
        - \\( \textbf{x} = x_0 \textbf{e}^{(0)} + x_1 \textbf{e}^{(1)}\\)

    - graphical example:
        - \\( \begin{bmatrix} 2 \\\\ 1 \end{bmatrix} = 2\begin{bmatrix} 1 \\\\ 0 \end{bmatrix} + 1\begin{bmatrix} 0 \\\\ 1 \end{bmatrix} \\)
        - \\( \textbf{x} = 2 \textbf{e}^{(0)} + 1 \textbf{e}^{(1)}\\)

    <img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/dsp-R2-basis.png" alt="R2-basis">

    *fig: linear combination of canonical \\( \textbf{e}^k\\) in \\(\mathbb{R}^2\\)*
    {: style="font-size: 80%; text-align: center;"}

- non-canonical \\(\mathbb{R}^2\\) basis example:
    - \\( \textbf{v}^{(0)} = \begin{bmatrix} 1\\\\ 0 \end{bmatrix} \text{; } \textbf{v}^{(1)} = \begin{bmatrix} 1\\\\ 1 \end{bmatrix} \\)
    - any vector can be expressed as a linear combination of these vectors in \\(\mathbb{R}^2\\) 
        - the coefficients of the bases will be different compared to the canonical bases

    - graphical example:
        - \\( \begin{bmatrix} 2 \\\\ 1 \end{bmatrix} = \alpha \textbf{v}^{(0)} + \beta \textbf{v}^{(1)} \\)
        - \\( \begin{bmatrix} 2 \\\\ 1 \end{bmatrix} = \alpha \begin{bmatrix} 1\\\\ 0 \end{bmatrix} + \beta \begin{bmatrix} 1\\\\ 1 \end{bmatrix} \\)
            - by rule of parallelogram vector addition
        - \\( \alpha = 1 \text{;  } \beta = 1\\)
    

   <img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/dsp-R2-basis-nc.png" alt="R2-basis">

    *fig: linear combination of non-canonical \\( \textbf{v}^k\\) in \\(\mathbb{R}^2\\)*
    {: style="font-size: 80%; text-align: center;"}

- only vectors which are linearly independent can be the basis vectors of a space

- infinite dimensional spaces bases:
    - some limitations have to be applied to obtain basis vectors of infinite dimension
    - \\( \textbf{x} = \sum_{k=0}^{\infty} \alpha_k \textbf{w}^{(k)}  \\)

- a canonical basis of \\(\ell_2(\mathbb{Z})\\)
    - \\( \textbf{e}^{k} = \begin{bmatrix} .\\\\.\\\\.\\\\ 0\\\\ 0\\\\ 1\\\\ 0\\\\ 0\\\\ 0\\\\ .\\\\.\\\\.\\\\ \end{bmatrix} \\), \\(k\\) -th position, \\( k \in \mathbb{Z} \\)
        
- function vector spaces:
    - basis vector for functions: \\( f(t) = \sum_{k}\alpha_{k}\textbf{h}^{(k)}(t) \\)
- the fourier basis for functions over an interval \\([-1,1]\\):
    - \\( \frac{1}{\sqrt{2}}, \cos\pi t, \sin\pi t, \cos2\pi t, \sin2\pi t,\cos3\pi t, \sin3\pi t, \ldots \\)
    - any square-integrable function in \\([-1,1]\\) can be represented as a linear combination of fourier bases
    - a square wave can be expressed as a sum of sines

- formally, in a vector space \\( H \\), 
- a set of \\( K \\) vectors from \\(H\\), \\(W = \\{ \textbf{w}^{(k)}\\}_{k=0,1,\ldots,K-1} \\) is a basis for \\( H \\) if:

    1. \\(\forall \in H \\): \\( \textbf{x} = \sum_{k=0}^{K-1}\alpha_k\textbf{w}^{(k)} \\), \\( \alpha_k \in \mathbb{C} \\)
    2. the coefficients \\( \alpha_k\\) are unique
        - this implies linear independence in the vector basis
        - \\( \sum_{k=0}^{K-1} \alpha_k\textbf{w}^{(k)} = 0 \Leftrightarrow \alpha_k = 0, k=0,1,\ldots,K-1 \\)
        
- of all possible bases for a vector space
    - the orthogonal bases are the most important
    - orthogonal basis: \\( \\langle \textbf{w}^{(k)},\textbf{w}^{(n)} \rangle = 0 \\) for \\( k \neq n\\)
        - the basis vectors in an orthogonal bases are mutually orthogonal
        - the bases of a space is a family of vectors which are least like each other 
            - but they all belong to the same space
            - these are the building blocks of the space
    - in some spaces, the orthogonal bases are also orthonormal
        -  i.e. they are unit norm
        - \\( \langle \textbf{w}^{(k)}, \textbf{w}^{(n)} \rangle = \delta[n-k]\\)
        - the inner product of any two vectors in the orthonormal bases is the difference between their indices

- gran-schmidt algorithm can be used to orthonormalize any orthogonal bases

- obtaining the bases coefficients \\( \alpha_k \\) for bases can be involved and challenging
    - \\( \textbf{x} = \sum_{k=0}^{K-1} \alpha_k\textbf{w}^{(k)} \\)
        - \\( \textbf{x}\\): a vector as the linear combination of \\(K\\) basis vectors \\( \textbf{w}^{(k)} \\), 
        - with corresponding coefficients \\( \alpha_k \\)
    - however, they are easy to obtain with an orthonormal basis
        - \\( \alpha_k = \langle \textbf{w}^{(k)},\textbf{x} \rangle\\)

<hr>

#### change of basis
<br>

- \\( \textbf{x} = \sum_{k=0}^{K-1} \alpha_k\textbf{w}^{(k)} = \sum_{k=0}^{K-1} \beta_k\textbf{v}^{(k)}\\)
    - \\( \textbf{v}^{(k )}\\) is the target basis,  \\(\textbf{w}^{(k )}\\) is the original basis
- if \\( \\{ \textbf{v}^{(k )} \\} \\) is orthonormal:
    - \\( \beta_h = \langle v^{(h)}, \textbf{x} \rangle \\)
    - \\( = \langle \textbf{v}^{(h)}, \sum_{k=0}^{K-1} \alpha_k\textbf{w}^{(k)} \rangle \\)
    - \\( = \sum_{k=0}^{K-1} \alpha_k \langle \textbf{v}^{(h)},  \textbf{w}^{(k)} \rangle \\)
    - \\( = \sum_{k=0}^{K-1} \alpha_k c_{hk} \\)
    - \\( = \begin{bmatrix}  c_{00} & c_{01} & \ldots & c_{0(K-1)}\\\\ & & \vdots & \\\\  c_{(K-1)0} & c_{(K-1)1} & \ldots & c_{(K-1)(K-1)} \end{bmatrix} \begin{bmatrix} \alpha_0\\\\ \vdots\\\\ \alpha_{K-1}  \end{bmatrix}\\)
- this forms the core of the discrete fourier transform algorithm for finite length signals

- can be applied to elementary rotations of basis vectors in the euclidean plane
    - the same vector has different coefficients in the original and the rotates bases
    - the rotation matrix is obtained by the matrix multiplication of the original and the target bases 
    - the rotation matrix applied to a vector in the original bases yields the coefficients of the same vector in the rotated bases
    - the matrix multiplication of the rotation matrix with its inverse yields the identity matrix

<hr>

## subspaces

- basis vectors can be applied to signal approximation and compression 


<hr>

## references 
<br>
