---
layout: post
title: chexpert notes 0
artist: Nalin and Kane
artistLink: https://edm.fandom.com/wiki/Myon_%26_Shane_54
track: Beachball (Myon and Shane 54 Dub Mix)
trackLink: https://youtu.be/NTZpmq0fu3Q
tags: [chexpert, notes, machine learning, summer projects]
---


# CheXpert Project Review

<hr>

#### Goal:

- automate chest radiograph (x-ray) interpretation

- using large public dataset to train deep learning models to achieve expert-level performance for chest radiograph interpretation
    - consisting of 224,316 chest radiographs (images) of 65,240 patients

- each patient's report: chest radiographic examinations (chest x-rays image) + their associated radiology reports 

#### Motivation for Automation:

- automated chest radiograph interpretation at the level of practicing radiologists could provide substantial benefit in many medical settings: 
    - improved workflow prioritization 
    - clinical decision support
    - large-scale screening  
    - global population health initiatives

#### X-Ray Reports:  

- each imaging study can pertain to one or more images, but most often are associated with two images: 
    - a frontal view, and 
    - a lateral view
    
- images are provided with 14 labels derived from a natural language processing (NLP) tool applied to the corresponding free-text radiology reports

#### Keywords extracted from radiology reports:

The following keywords are the 'observations' (medical diagnosis of) sought after in each radiology report:

1. No finding 
2. Enlarged Cardiomegaly
3. Cardiomegaly
4. Lung Lesion
5. Lung Opacity
6. Edema
7. Consolidation
8. Pneumonia 
9. Atelectasis
10. Pneumothorax
11. Pleural Effusion
12. Pleural Other 
13. Fracture
14. Support Devices

#### Report NLP to provide labels to associated X-Ray images:

- Each report was processed by an NLP labeler, and the associated x-rays were given the above listed 14 observations with an assigned weight:
    - positive (observation exists in x-ray image), 
    - negative (observation does not exist in x-ray image), or 
    - uncertain

- An automated rule-based labeler (Natural Language Processor) extracted observations from the radiology reports to be used as structured labels for the chest radiographs (x-ray images)

- The NLP labeler is set up in three distinct stages: 

    - mention extraction:
        - the labeler extracts mentions of above listed observations from the impression section of radiology reports
        - summarizes the key findings in the radiographic study 

    - mention classification:
        - mentions of observations are classified as negative, uncertain, or positive

    - mention aggregation:
        - we use the classification for each mention of observations to arrive at a final label for the 14 observations 
            - blank for unmentioned, 0 (negative), 1 (positive), or u (uncertain).

![NLP process-flow](/media/blogAssets/chexpert/chexpert-notes-images-report-nlp-labeler.svg)
{: style="text-align: center;"}

#### Model Training: 

![Model Input and Output](/media/blogAssets/chexpert/model-input-output.svg)
{: style="text-align: center;"}

- Input: single-view chest radiograph 
- Output: probability of each of the 14 observations

- When more than one view is available, the models output the maximum probability of the observations across the views

- The training labels in the dataset for each observation are either 0 (negative), 1 (positive), or u (uncertain)

- For the uncertain labels, different approaches are explored during the model training:

    - *U-Ignore*: We ignore the uncertain labels during training
    - *U-Zeroes*: We map all instances of the uncertain label to 0
    - *U-Ones*: We map all instances of the uncertain label to 1
    - *U-SelfTrained*: We first train a model using the U-Ignore approach to convergence, and then use the model to make predictions that re-label each of the uncertainty labels with the probability prediction outputted by the model
    - *U-MultiClass*: We treat the uncertainty label as its own class

- Baseline model has been selected based on the best performing approach on each competition tasks on the validation set: 
    - *U-Ones* for Atelectasis and Edema, 
    - *U-MultiClass* for Cardiomegaly and Pleural Effusion, and 
    - *U-SelfTrained* for Consolidation

- The model output looks like the following table:

![NLP process-flow](/media/blogAssets/chexpert/chexpert-notes-images-deep-learning-model-output.svg)
{: style="text-align: center;"}

<hr>

# Submission Goals:

- competition for automated chest x-ray interpretation:
    - features uncertainty labels and 
    - radiologist-labeled evaluation sets as standard reference

- uses a hidden test set for official evaluation of models (see codalab submission tutorials)

- focus on the evaluation of 5 observations which are the competition tasks, selected based of clinical importance and prevalence: 
    1. Atelectasis, 
    2. Cardiomegaly, 
    3. Consolidation, 
    4. Edema, and 
    5. Pleural Effusion

- 64740 reports for training and the rest for validation

<hr>

## Glossary:

- pathology: The anatomic or functional manifestations of a disease: *the pathology of cancer*

<hr>

## References:

* [CheXpert Project Page](https://stanfordmlgroup.github.io/competitions/chexpert/){: target="_blank"}
* [CodaLab Submission Tutorial](https://worksheets.codalab.org/worksheets/0x693b0063ee504702b21f94ffb2d99c6d/){: target="_blank"}
