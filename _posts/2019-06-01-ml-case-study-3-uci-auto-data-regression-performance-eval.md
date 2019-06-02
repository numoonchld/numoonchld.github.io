---
layout: post
title: ml case studies 3 - uci auto data regression performance evaluation
artist: Boom Jinx & Sound Prank feat. Katrine Stenbekk
artistLink: https://www.discogs.com/artist/368508-Boom-Jinx
track: We Know (Vintage & Morelli Remix)
trackLink: https://youtu.be/TkAD8QzEhrU
tags: [notes, data science, machine learning, ai, supervised learning, neural network, mlp, cython, regression]
---

### Pre-requisite Reading

- [linear regression with uci-auto-data](https://numoonchld.github.io/2019/05/29/ml-case-study-2-uci-auto-data.html){: target="_blank"}
- [neural net regression with uci-auto-data](https://numoonchld.github.io/2019/05/21/ml-case-study-1-uci-auto-data.html){: target="_blank"}


<br>
<hr>


### Goal

- the performance of *multi-linear regression* and *neural network regression* will be compared to predict used car price based on a few features

- [code repo for comparative study](https://github.com/numoonchld/uci-auto-data/tree/master/lin-nn-reg-compare){: target="_blank"}

<br>
<hr>


### Python Libraries

```
### IMPORT ML LIBRARIES: 
import numpy as np
import pandas as pd

import seaborn as sns
from matplotlib import pyplot as plt

from sklearn.linear_model import LinearRegression
import keras

from sklearn.metrics import r2_score
from sklearn.metrics import mean_squared_error
```

<br>
<hr>

### Data Pre-Processing

- the observations with `NaN` have been removed and the data type coherency has been ensured in the previous studies, the same cleaned-up raw data will be used for this study

```
### IMPORTS: 

data_path = '../csv/00-cleaned-up-data.csv'
df = pd.read_csv(data_path)
```

<br>
<hr>

### Feature Selection

- both algorithms will use the same set of features:
    - *'engine-size'*, 
    - *'horsepower'*, 
    - *'city-mpg'*, 
    - *'highway-mpg'* and 
    - *'body-style'*

- *'body-style'* is a categorical variable, one-hot-encoding will be applied to turn it into a quantitative numerical variable

```
### FEATURE SELECTION: 

group = np.array([
    'engine-size', 'horsepower', 'city-mpg', 'highway-mpg', 'body-style',
    'price'
])

df = df[group]
```

<br>
<hr>

### One-Hot-Encoding and Normalization

```
### ONE-HOT-ENCODING: 

ohe = pd.get_dummies(df)
print(ohe.shape)

### NORMALIZE DATA: 

train_target = train_data.pop('price')
test_target = test_data.pop('price')

train_stats = train_data.describe().transpose()
# print(train_stats)

normed_train_data = (train_data - train_stats['mean']) / train_stats['std']
normed_test_data = (test_data - train_stats['mean']) / train_stats['std']

# print(normed_train_data.dtypes)
# print(normed_test_data)

```

<br>
<hr>

### Model Initialization and Training


<br>

##### linear regression model

- this multi-variate linear regression model has 5 dependent variables (9 after one-hot), visualization is complex and beyond the scope of this post

```
## MULTI-LINEAR REGRESSION: 

# init model:
lm = LinearRegression()

# train model:
lm.fit(normed_train_data, train_target)
```

<br>

##### neural net regression model

- the same 3 layered model with 2 sandwiched dropout layers used in the previous study is used here 


```
## NEURAL NET REGRESSION: 

# setup MLP model generating function
def build_mlp_model():

    model = keras.Sequential([
        keras.layers.Dense(
            32,
            activation='sigmoid',
            kernel_initializer=keras.initializers.glorot_normal(seed=3),
            input_dim=len(normed_train_data.keys())),
        keras.layers.Dropout(rate=0.25, noise_shape=None, seed=7),
        keras.layers.Dense(8, activation='relu'),
        keras.layers.Dropout(rate=0.001, noise_shape=None, seed=3),
        keras.layers.Dense(1)
    ])

    model.compile(loss='mse',
                  optimizer=keras.optimizers.Adam(lr=0.09,
                                                  beta_1=0.9,
                                                  beta_2=0.999,
                                                  epsilon=None,
                                                  decay=0.03,
                                                  amsgrad=True),
                  metrics=['mae', 'mse'])

    return model


# initialize model and view details

nn = build_mlp_model() # keras only model
nn.summary()

# nn model verification: 

example_batch = normed_train_data[:10]
example_result = nn.predict(example_batch)
print(example_result)
```

<br>
<hr>


### In-Sample Accuracy

<br>

##### linear model residual

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/uci-auto-data-lin-nn-compare/resid-lin.svg">

<!-- ![resid-plot-lin-reg](/media/blogAssets/uci-auto-data-lin-nn-compare/resid-lin.svg)
{: style="text-align: center;"} -->

*fig: residual plot for linear regression model*
{: style="font-size: 80%; text-align: center;"}

<br>

##### neural net residual

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/uci-auto-data-lin-nn-compare/resid-nn.svg">

*fig: residual plot for neural net model*
{: style="font-size: 80%; text-align: center;"}

<br>


##### insights

- both models have an uneven amount of scatter around x-axis
- however, there is no obvious curve to the scatter points 
- both models are not great according to the residual scatter plot as an even distribution of points would indicate a good trained model

<br>

```
### RESIDUALS (in-sample accuracy): 

## MULTI-LINEAR REGRESSION: 
plt.figure(0, figsize=(12, 10))
sns.residplot(lm.predict(normed_train_data), train_target)
plt.savefig('plots/a-resid-plot-multi-lin.png')

## NEURAL NET REGRESSION: 
plt.figure(1, figsize=(12, 10))
sns.residplot(nn.predict(normed_train_data).flatten(), train_target)
plt.savefig('plots/a-resid-plot-nn.png')
```

<br>
<hr>

### Out-of-Sample Accuracy

<br>

##### linear model

- Multi-variate Linear Regression Accuracy Metrics

    - out-of-sample R^2: 0.7513950523452133
    - out-of-sample MSE: 9924168.147390723

<br>

##### neural net

- Neural Net Regression Accuracy Metrics

    - out-of-sample R^2: 0.6746316888174696
    - out-of-sample MSE: 12988517.969850667

<br>

##### comparison

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/uci-auto-data-lin-nn-compare/dist-lin-nn.svg">

*fig: distribution plot for true (black), linear model (cyan) and neural net predictions (yellow)*
{: style="font-size: 80%; text-align: center;"}

<br>

##### insights

- the out-of-sample R<sup>2</sup> is higher for the linear regression model, so the neural network is slightly better fit for the test data 

- the MSE, however is worse for the neural net, so it isn't as accurate as the linear model 

- as seen in the residual plot, neither model is very good and the MSE values are pretty high as well
    - this can be attributed to the data size of just 159 observations, the dataset to perform this training is small to obtain high accuracies

<br>
```
### ACCURACY (out-of-sample test): 

## MULTI-LINEAR REGRESSION: 

print('\nMulti-variate Linear Regression Accuracy Metrics')

# R^2 score:
print('out-of-sample R^2')
print(r2_score(test_target, lm.predict(normed_test_data)))

# MSE score:
print('out-of-sample MSE')
print(mean_squared_error(test_target, lm.predict(normed_test_data)))

## NEURAL NET REGRESSION: 

print('\nNeural Net Regression Accuracy Metrics')

# R^2 score:
print('out-of-sample R^2')
print(r2_score(test_target, nn.predict(normed_test_data).flatten()))

# MSE score:
print('out-of-sample MSE')
print(mean_squared_error(test_target, nn.predict(normed_test_data).flatten()))

## DISTRIBUTION PLOTS: 

plt.figure(2, figsize=(12, 10))

ax1 = sns.distplot(test_target, hist=False, color="k", label='True Values')

ax2 = sns.distplot(lm.predict(normed_test_data),
                   hist=False,
                   color="c",
                   label='Linear Model Prediction',
                   ax=ax1)

ax3 = sns.distplot(nn.predict(normed_test_data).flatten(),
                   hist=False,
                   color="y",
                   label='Neural Net Prediction',
                   ax=ax1)

plt.title(
    "['engine-size', 'horsepower', 'city-mpg', 'highway-mpg', 'body-style']:Price"
)
plt.xlabel('Price (in dollars)')
plt.ylabel('Proportion of Cars')
plt.savefig('plots/b-dist-lin-nn-compare.png')
```
<br>
<hr>

### References

- [sklearn metrics: R<sup>2</sup>](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.r2_score.html){: target="_blank"}
- [sklearn metrics: MSE](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.mean_squared_error.html){: target="_blank"}