---
layout: post
title: chexpert notes 1
artist: Alexandra Stan
artistLink: https://en.wikipedia.org/wiki/Alexandra_Stan
track: Lemonade
trackLink: https://youtu.be/HrbHjsQC2zA
tags: [chexpert, notes, machine learning, summer projects]
---

## Machine Learning Pipeline

<br> 

![Model Input and Output](/media/blogAssets/chexpert/chexpert-notes-1-images-ML-pipeline.svg)
{: style="text-align: center;"}

<br> 
 

## Data Pre-processing

<br>

#### Data Inspect and Exploration
    
upon inspecting dataset:
- each case has one or multiple studies associated with them
    - each study has a front view x-ray
    - sometimes, a side view x-ray

- each x-ray has 14 observations, with a category label for each observation; the category is of the following:
    - blank for unmentioned
    - 0 for negative 
    - -1 for uncertain, and 
    - 1 for positive
- see list of observations in reference section below 

- use `pandas` dataframes to import observation labels for all x-rays:

        df = pd.read_csv('csv-path/train.csv')

some useful `pandas` tools for exploring data:

        # extract column headers
        headers = df.columns
        
        # see the categories and their respective counts in each column
        for title in headers:
            print(df[title].value_counts())

<br>

#### Problem Statement for Predictive Model:

- input: 
    - x-ray image
- output:
    - observation probabilities (3 for each observation)

- this is a case of supervised learning
    - during model training, the x-rays are fed to the model and 
    - the expected output is set with the labels provided for each x-ray

- the training label can be a 'blank', but the model, when making predictions, must output for only three classifications
    - positive
    - uncertain
    - negative

- after training, the (chosen and trained) model will output the *probability* of each of the three classifications for each observation, not a label of 0, -1 or 1
    - so 3 classifications * 14 observations = 42 probabilities per input x-ray image

#### To do:
- explore deep learning with neural networks for image processing
    - [deep learning fundamentals](https://cognitiveclass.ai/courses/introduction-deep-learning){: target="_blank"}

<hr>
## References

<br>
#### 14 observations:
- No finding
- Enlarged Cardiomegaly
- Cardiomegaly
- Lung Lesion
- Lung Opacity
- Edema
- Consolidation
- Pneumonia
- Atelectasis
- Pneumothorax
- Pleural Effusion
- Pleural Other
- Fracture
- Support Devices

<br>

[chexpert](https://stanfordmlgroup.github.io/competitions/chexpert/){: target="_blank"}


