---
layout: post
title: blender 2.8 - troubleshooting notes 
date: 2019-08-12
artist: wrong city
artistLink: https://ja.wikipedia.org/wiki/Wrong_city
track: -Love Goes Over-
trackLink: https://youtu.be/eMryGIcp0A0
tags: [notes, blender, blender 2.8]
---


 

## eevee transparent shader 

#### issue:

- cloud layer doesn't turn transparent to show earth through non-cloudy areas 
    - issue only in eevee
    - works fine in cycles

#### solution:

In Blender 2.8 ('s latest beta), I succeeded in getting Eevee transparency to work in the following way:
 
(1) In the Material, "Use Nodes." Switch to the "Shading" layout so you can see the material nodes easily. Add a Transparent BSDF shader and a Mix node. Link the existing Principled Shader and the Transparent BSDF to the input side of the  Mix node, and the output of the Mix node to the Surface input of the output-node.
 
(2) Adjust the Fac setting of the Mix node to determine the amount of transparency.

(3) However, notice that you see transparency in Cycles, but not in Eevee, until you do this: in the "Settings" of the material, switch Blend Mode to Alpha Blend or one of the other Alpha options. (While it remains in its default setting, Opaque, the material will not be transparent.)

- [SO ref](https://blender.stackexchange.com/a/129787){: target="_blank"}


<hr>


## texture only in dark spots

#### issue:

- night light cover appers even in regions lit by the sun
- have the light map texture layer zero itself out in regions lit by sun


#### solution:

Because the planet is a sphere, with no irregular self-shadowing, you can use a simple mask, in another object's space.

In this example, the planet is at the global origin, rotating about Z. Its diameter is 2 units. The sun is down positive X.

Add an Empty at the center of the planet. (Its local positive X points toward the sun). It will not rotate, while the planet does, and the mask between emissive and invisible lights will be in the empty's Object Space, not moving.

The lights texture is in the planet's Object Space, and turns with the planet.

A simple Black/White transition is made by a Color Ramp, down the X of the empty, and centered on it, to make the mask. Dimensions may have to be changed, depending on your model.

So the tree is something like this:

<img class="img-fluid d-block rounded mx-auto" src="https://i.stack.imgur.com/DuZtk.jpg" alt="node-setup">

(You will obviously be using your own textures, not procedural lights, as shown here, so those nodes don't matter)

With this sort of result:

<img class="img-fluid d-block rounded mx-auto" src="https://i.stack.imgur.com/HqQyx.gif" alt="result-demo">

If you're animating the planet going round the sun, you could parent the Empty to the sun, and the mask will stay pointing in the right direction..

or, in other circumstances, you could constrain the Empty to point its X at the sun in another way.

- [SO ref](https://blender.stackexchange.com/questions/116394/how-to-make-texture-appear-only-in-dark-spots){: target="_blank"}


<hr>

## grid artifact in overlapping layers

#### issue:

- cloud layer and atmosphere layer spheres get a grid like artifact while rendering
- not visible during preview render, only in final render in cycles only 
    - not in eevee


#### solution:

- make sure the atmosphere is bigger than the cloud layer sphere
- one of the mesh has to be manually scaled such that 
    - there is no overlap between the two 

<hr>

## stuck in node group

#### issue:

- `Ctrl+G` creates a group of nodes
    - this isolates the nodes of the new group from the rest of the nodes 
    - with a green mesh to disable editing the other nodes


#### solution:

- use 'Tab' key to collapse node group to a single node 
- gets focus out to the entire node 

- [SO ref](https://blender.stackexchange.com/questions/23832/how-do-i-exit-a-node-group){: target="_blank"}

<hr>

## layers in compostiing 

#### issue:

- object index doesn't load object only layer while using ID mask node editor

#### solution:

- use cryptomatte object pass
- then render 
- load the cryptomatte node and connect the renderlayer output to this node input
- use the pick output to isolate objects
- then, the matter output to apply other processing nodes to the selected object

- [SO ref](https://blenderartists.org/t/cryptomatte-is-here-amazing/1132013/2)