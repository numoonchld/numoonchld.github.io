---
layout: post
title: ml case studies 2 - uci auto data (neural nets)
artist: Del-30
artistLink: https://www.beatport.com/artist/del-30/527768
track: Rumble Tumble
trackLink: https://youtu.be/tdy62XmMazg
tags: [notes, data science, machine learning, ai, supervised learning, neural network, mlp, cython, regression]
---

### Contents

<br>

1. [Dataset Details](#dataset-details)
2. [Goal](#goal)
3. [Neural Net Pipeline](#neural-net-pipeline)
4. [Data Pre-processing](#data-pre-processing)
5. [Exploratory Data Analysis](#exploratory-data-analysis)
6. [Feature Selection](#feature-selection)
7. [Test-Train Split](#test-train-split)
8. [Neural Net Setup](#neural-net-setup)
9. [Output Verification](#output-verification)
10. [Neural Net Training](#neural-net-training)
11. [Evaluation](#evaluation)
12. [References](#references)

<hr>

### Dataset Details:

<br>

- this data set consists of three types of entities: 
    - the specification of an auto in terms of various characteristics
    - its assigned insurance risk rating
    - its normalized losses in use as compared to other cars

- the insurance risk rating corresponds to the degree to which the auto is more risky than its price indicates. 
    - cars are initially assigned a risk factor symbol associated with its price. Then, if it is more risky (or less), this symbol is adjusted by moving it up (or down) the scale. 
    - actuarians call this process "symboling".  A value of +3 indicates that the auto is risky, -3 that it is probably pretty safe

- the third factor is the relative average loss payment per insured vehicle year
    - this value is normalized for all autos within a particular size classification (two-door small, station wagons, sports/speciality, etc...), and represents the average loss per car per year

- dataset year: 19 May 1987

- [dataset webpage](https://archive.ics.uci.edu/ml/machine-learning-databases/autos/){: target="_blank"}

##### dataset headers

1. symboling:                -3, -2, -1, 0, 1, 2, 3
2. normalized-losses:        continuous from 65 to 256
3. make:                     alfa-romero, audi, bmw, chevrolet, dodge, honda,
                               isuzu, jaguar, mazda, mercedes-benz, mercury,
                               mitsubishi, nissan, peugot, plymouth, porsche,
                               renault, saab, subaru, toyota, volkswagen, volvo
4. fuel-type:                diesel, gas
5. aspiration:               std, turbo
6. num-of-doors:             four, two
7. body-style:               hardtop, wagon, sedan, hatchback, convertible
8. drive-wheels:             4wd, fwd, rwd
9. engine-location:          front, rear
10. wheel-base:              continuous from 86.6 120.9
11. length:                  continuous from 141.1 to 208.1
12. width:                   continuous from 60.3 to 72.3
13. height:                  continuous from 47.8 to 59.8
14. curb-weight:             continuous from 1488 to 4066
15. engine-type:             dohc, dohcv, l, ohc, ohcf, ohcv, rotor
16. num-of-cylinders:        eight, five, four, six, three, twelve, two
17. engine-size:             continuous from 61 to 326
18. fuel-system:             1bbl, 2bbl, 4bbl, idi, mfi, mpfi, spdi, spfi
19. bore:                    continuous from 2.54 to 3.94
20. stroke:                  continuous from 2.07 to 4.17
21. compression-ratio:       continuous from 7 to 23
22. horsepower:              continuous from 48 to 288
23. peak-rpm:                continuous from 4150 to 6600
24. city-mpg:                continuous from 13 to 49
25. highway-mpg:             continuous from 16 to 54
26. price:                   continuous from 5118 to 45400

<hr>

### Goal:

<br>

- train neural networks regression models with supervised learning to predict price of a used car using the car's details as input
    - a neural net is trained to grasp the non-linearity of using multiple predictors simultaneously to estimate price

- [code repo for this write-up](https://github.com/numoonchld/uci-auto-data){: target="_blank"}
    

<hr>

### Neural Net Pipeline:

<br>

![Pipeline](/media/blogAssets/uci-auto-data-nn/nn-pipeline.svg)
{: style="text-align: center;"}

<br>


##### python libraries
 
        
        # for data import and data wrangling:
        import numpy as np
        import pandas as pd
        
        # for exploratory data analysis:
        import seaborn as sns
        from matplotlib import pyplot as plt

        # for neural networks
        import keras

        # for read/write trained models to disk:
        import pickle

<br>

<hr>

### Data Pre-processing:

<br>

- '`NaN`' and missing values: 
    - observations with any `NaN` and equivalent values are removed 

- data-type consistency:
    - data-type correction to applied to ensure coherent data types for each feature

- this same dataset was used for linear regression model training in a [previous study](https://numoonchld.github.io/2019/05/21/ml-case-study-1-uci-auto-data.html){: target="_blank"}
    - so, it was cleaned up then - the same cleaned-up data is used here 
    - for a more detailed clean-up write up, go [here](https://numoonchld.github.io/2019/05/21/ml-case-study-1-uci-auto-data.html#data-pre-processing){: target="_blank"}

<hr>

### Exploratory Data Analysis:

<br>

- the given dataset has 205 observations which, after clean-up, yields 159 data points

- there are 26 features to begin with
    - 11 are categorical features 

- price is the target variable, and is continuous 
    - for this, a regression model is needed

##### continuous numerical variables:

- regression plots are used to evaluate the correlation between each continuous predictor in the dataset and price
- price is the y-axis as it is the dependent variable

<br>

![engine-size](/media/blogAssets/uci-auto-data-nn/ea-engine-size.svg)
{: style="text-align: center;"}

*fig: engine-size vs. price*
{: style="font-size: 80%; text-align: center;"}

<br>

![horsepower](/media/blogAssets/uci-auto-data-nn/ea-horsepower.svg)
{: style="text-align: center;"}

*fig: horsepower vs. price*
{: style="font-size: 80%; text-align: center;"}

<br>

![city-mpg](/media/blogAssets/uci-auto-data-nn/ea-city-mpg.svg)
{: style="text-align: center;"}

*fig: city-mpg vs. price*
{: style="font-size: 80%; text-align: center;"}

<br>

![highway-mpg](/media/blogAssets/uci-auto-data-nn/ea-highway-mpg.svg)
{: style="text-align: center;"}

*fig: highway-mpg vs. price*
{: style="font-size: 80%; text-align: center;"}

<br>

![wheel-base](/media/blogAssets/uci-auto-data-nn/ea-wheel-base.svg)
{: style="text-align: center;"}

*fig: wheel-base vs. price*
{: style="font-size: 80%; text-align: center;"}

<br>

![length](/media/blogAssets/uci-auto-data-nn/ea-length.svg)
{: style="text-align: center;"}

*fig: length vs. price*
{: style="font-size: 80%; text-align: center;"}

<br>

![width](/media/blogAssets/uci-auto-data-nn/ea-width.svg)
{: style="text-align: center;"}

*fig: width vs. price*
{: style="font-size: 80%; text-align: center;"}

<br>

![height](/media/blogAssets/uci-auto-data-nn/ea-height.svg)
{: style="text-align: center;"}

*fig: height vs. price*
{: style="font-size: 80%; text-align: center;"}


<br>

![curb-weight](/media/blogAssets/uci-auto-data-nn/ea-curb-weight.svg)
{: style="text-align: center;"}

*fig: curb-weight vs. price*
{: style="font-size: 80%; text-align: center;"}

<br>

![peak-rpm](/media/blogAssets/uci-auto-data-nn/ea-peak-rpm.svg)
{: style="text-align: center;"}

*fig: peak-rpm vs. price*
{: style="font-size: 80%; text-align: center;"}

<br>

![bore](/media/blogAssets/uci-auto-data-nn/ea-bore.svg)
{: style="text-align: center;"}

*fig: bore vs. price*
{: style="font-size: 80%; text-align: center;"}

<br>

![stroke](/media/blogAssets/uci-auto-data-nn/ea-stroke.svg)
{: style="text-align: center;"}

*fig: stroke vs. price*
{: style="font-size: 80%; text-align: center;"}

<br>

![compression-ratio](/media/blogAssets/uci-auto-data-nn/ea-compression-ratio.svg)
{: style="text-align: center;"}

*fig: compression-ratio vs. price*
{: style="font-size: 80%; text-align: center;"}

<!-- ![symboling](/media/blogAssets/uci-auto-data-nn/ea-symboling.svg)
{: style="text-align: center;"}

*fig: symboling vs. price*
{: style="font-size: 80%; text-align: center;"} -->

<br>

![norm-loss](/media/blogAssets/uci-auto-data-nn/ea-norm-loss.svg)
{: style="text-align: center;"}

*fig: norm-loss vs. price*
{: style="font-size: 80%; text-align: center;"}

<br>

##### categorical variables:

- box plots are used to study the distribution of categorical predictors across different price points
- price is the y-axis as it is the dependent variable

<br>

![body-style](/media/blogAssets/uci-auto-data-nn/ea-body-style-CAT.svg)
{: style="text-align: center;"}

*fig: body-style vs. price*
{: style="font-size: 80%; text-align: center;"}

<br>

![drive-wheels](/media/blogAssets/uci-auto-data-nn/ea-drive-wheels-CAT.svg)
{: style="text-align: center;"}

*fig: drive-wheels vs. price*
{: style="font-size: 80%; text-align: center;"}

<br>

![aspiration](/media/blogAssets/uci-auto-data-nn/ea-aspiration-CAT.svg)
{: style="text-align: center;"}

*fig: aspiration vs. price*
{: style="font-size: 80%; text-align: center;"}

<br>

![fuel-system](/media/blogAssets/uci-auto-data-nn/ea-fuel-system-CAT.svg)
{: style="text-align: center;"}

*fig: fuel-system vs. price*
{: style="font-size: 80%; text-align: center;"}

<br>

![make](/media/blogAssets/uci-auto-data-nn/ea-make-CAT.svg)
{: style="text-align: center;"}

*fig: make vs. price*
{: style="font-size: 80%; text-align: center;"}

<br>

![fuel-type](/media/blogAssets/uci-auto-data-nn/ea-fuel-type-CAT.svg)
{: style="text-align: center;"}

*fig: fuel-type vs. price*
{: style="font-size: 80%; text-align: center;"}

<br>

![num-of-doors](/media/blogAssets/uci-auto-data-nn/ea-num-of-doors-CAT.svg)
{: style="text-align: center;"}

*fig: number of doors vs. price*
{: style="font-size: 80%; text-align: center;"}

<br>

![num-of-cylinders](/media/blogAssets/uci-auto-data-nn/ea-num-of-cylinders-CAT.svg)
{: style="text-align: center;"}

*fig: number of cylinders vs. price*
{: style="font-size: 80%; text-align: center;"}

<br>

![symboling](/media/blogAssets/uci-auto-data-nn/ea-symboling-CAT.svg)
{: style="text-align: center;"}

*fig: symboling vs. price*
{: style="font-size: 80%; text-align: center;"}

<br>

![engine-location](/media/blogAssets/uci-auto-data-nn/ea-engine-location-CAT.svg)
{: style="text-align: center;"}

*fig: engine-location vs. price*
{: style="font-size: 80%; text-align: center;"}

<br>

![engine-type](/media/blogAssets/uci-auto-data-nn/ea-engine-type-CAT.svg)
{: style="text-align: center;"}

*fig: engine-type vs. price*
{: style="font-size: 80%; text-align: center;"}

##### insights:

- there are a total of 25 predictor variables 

- given only 159 usable observations to train this neural net, 25 predictors might be a bit too many features to use  

- this calls for feature selection, as is explored next 
    - usually done by domain knowledge experts


##### plots generation code:


- import cleaned-up data

        ## unsplit data:
        data_path = 'csv/00-cleaned-up-data.csv'
        df = pd.read_csv(data_path)
        print('number of observations in dataset: ', df.shape)


- regression plots

        #--- engine location value count shows only 1 category; so it is dropped
        print(df['engine-location'].value_counts()) 
        df = df.drop(columns=['engine-location'])

        #--- correlation plots and regression line equations:
        for key in df.keys():

            if key != 'price' and key != 'symboling' and df[key].dtype != 'O':
                
                print(key)
                # print(ohe[key].shape, ohe['price'].shape)
                slope, intercept, r_value, p_value, std_err = sp.stats.linregress(df[key], df['price'])
                
                # save plot for visual inspection
                fig = plt.figure()
                sns.regplot(x=key, y="price", data=df)
                plt.title('Slope: ' + str(slope) + '; Intercept: ' + str(intercept))
                plt.savefig('plots/feature-influence/06-a-reg-plot-'+ key +'.png')
                plt.close(fig)


- box plots

        ## categorical correlation: 
        print('value-counts table ------')
        # body-style:price
        plt.figure(6)
        print(df["body-style"].value_counts())
        sns.boxplot(x="body-style", y="price", data=df)
        plt.savefig('plots/01-b-box-plot-body-style.png')

        # aspiration:price
        plt.figure(7)
        print(df["aspiration"].value_counts())
        sns.boxplot(x="aspiration", y="price", data=df)
        plt.savefig('plots/01-b-box-plot-aspiration.png')

        # fuel-system:price
        plt.figure(8)
        print(df["fuel-system"].value_counts())
        sns.boxplot(x="fuel-system", y="price", data=df)
        plt.savefig('plots/01-b-box-plot-fuel-system.png')

        # drive-wheels:price
        plt.figure(9)
        print(df["drive-wheels"].value_counts())
        sns.boxplot(x="drive-wheels", y="price", data=df)
        plt.savefig('plots/01-b-box-plot-drive-wheels.png')

        # make:price
        plt.figure(9)
        print(df["make"].value_counts())
        sns.boxplot(x="make", y="price", data=df)
        plt.savefig('plots/01-b-box-plot-make.png')

        # num-of-doors:price
        plt.figure(10)
        print(df["num-of-doors"].value_counts())
        sns.boxplot(x="num-of-doors", y="price", data=df)
        plt.savefig('plots/01-b-box-plot-num-of-doors.png')

        # symboling:price
        plt.figure(11)
        print(df["symboling"].value_counts())
        sns.boxplot(x="symboling", y="price", data=df)
        plt.savefig('plots/01-b-box-plot-symboling.png')

        # num-of-cylinders:price
        plt.figure(12)
        print(df["num-of-cylinders"].value_counts())
        sns.boxplot(x="num-of-cylinders", y="price", data=df)
        plt.savefig('plots/01-b-box-plot-num-of-cylinders.png')

        # engine-type:price
        plt.figure(13)
        print(df["engine-type"].value_counts())
        sns.boxplot(x="engine-type", y="price", data=df)
        plt.savefig('plots/01-b-box-plot-engine-type.png')

        # fuel-system:price
        plt.figure(14)
        print(df["fuel-type"].value_counts())
        sns.boxplot(x="fuel-type", y="price", data=df)
        plt.savefig('plots/01-b-box-plot-fuel-type.png')

        # :price
        plt.figure(15)
        print(df["engine-location"].value_counts())
        sns.boxplot(x="engine-location", y="price", data=df)
        plt.savefig('plots/01-b-box-plot-engine-location.png')


<hr>

### Feature Selection:

<br>

- leaving out price, one-hot-encoded categroical variables along with the rest of the continuous predctor variables yield a total of 69 features

- training a neural net model that accepts 69 input features with only 159 valid observation results in gradient issues and the network outputs `NaN` 
    - in this study's case, 159 data points are not enough to train a 69-featured neural network
    - so only a few features are used to train the neural network

- *'engine-size'*, *'horsepower'*, *'city-mpg'*, *'highway-mpg'* and *'body-style'* are the choosen features as these parameters are prioritized when a person goes used-car shopping
    - *'body-style'* is a categorical predictor, so one-hot-encoding this yields four additional features 
    - so a total of 9 features will be used to train a regression neural network to estimate price

- the features are narrowed down in the `pandas` dataframe by selecting only the choosen ones

        ## extract only choosen features along with price
        group1 = np.array(['engine-size','horsepower','city-mpg','highway-mpg','body-style','price'])

        df = df[group1]
        print(df.keys())
 
<hr>

### Test-Train Split:

<br>

##### one-hot-encoding 

- categorical variables are converted to quantitative numerical variables with one-hot-encoding to enable feeding them to the neural network as inputs
- a couple of steps are saved if one-hot-encoding is done before the test-train split

        # apply 'one-hot-encoding": 

        ohe = pd.get_dummies(df)
        # print(ohe.keys())
        # print(ohe.shape)


<br>

##### test-train split

- test-train split is done after one-hot-encoding categorical predictors 
    - 80%: training data
    - 20%: test data

    ```
    ### TEST-TRAIN SPLIT:

    train_data = ohe.sample(frac=0.8,random_state=0)
    test_data = ohe.drop(train_data.index)
    ```
<br>

##### feature normalization

- all predictor variables have to be normalized using some method to avoid pseudo-weigthing by the neural network
    - larger values of variables get weighted more, simply because of the large value 
    - the inherent patterns fail to be captured by the model during training 

- even one-hot-encoded variables are normalized

- here, the mean and standard-deviation of each series is used to normalize itself

    ```
    ### NORMALIZE DATA: 

    train_target = train_data.pop('price')
    test_target = test_data.pop('price')

    train_stats = train_data.describe().transpose()

    normed_train_data = (train_data - train_stats['mean']) / train_stats['std']
    normed_test_data = (test_data - train_stats['mean']) / train_stats['std']
    ```

<hr>

### Neural Net Setup:

<br>

- a Multi-Layered-Perceptron (MLP) is created to accept the normalized predictor variables
    - since the usable number of observations is small (159), a simple three layered MLP is setup and trained

- a `keras` sequential model is initialized with three `Dense` layers and two `Dropout` layers
    - `Dense` layers are basic building blocks of a neural layer
    - `Dropout` layers help to avoid over-fitting, these are sandwiched between the `Dense` layers
    - both `Dense` and `Dropout` are types of core `keras` layers
    - the input `Dense` layer has 64 nodes each with a sigmoid activation function, the central hidden `Dense` layer has 8 nodes, each with rectified liner unit (ReLU) activation function, and the output `Dense` layer has just one node to output the continuous value of price, so no activation function is supplied


<br>

![keras-model-graph](/media/blogAssets/uci-auto-data-nn/model-mlp-3-layered-adam-optimizer.svg)
{: style="text-align: center;"}

*fig: graph of the generated sequential keras neural net model*
{: style="font-size: 80%; text-align: center;"}

<br>

- after setting up the layers, the sequential model has to be complied with the loss function, optimizer and metrics functions set
    - mean-squared-error is set to be the loss function for this model
    - an adam optimizer yielded the best results during initial model experimentation, so that is used in the compiler
    - mean-squared-error and mean-absolute-error are used as the metrics 


```
### KERAS MODEL:

# setup MLP model generating function
def build_mlp_model():

    model = keras.Sequential([
        keras.layers.Dense(64, activation = 'sigmoid', kernel_initializer=keras.initializers.glorot_normal(seed=3), input_dim = len(normed_train_data.keys())),
        keras.layers.Dropout(rate=0.25, noise_shape=None, seed=7),
        keras.layers.Dense(8, activation = 'relu'),
        keras.layers.Dropout(rate=0.001, noise_shape=None, seed=3),
        keras.layers.Dense(1)
    ])

    model.compile(loss = 'mse',
                  optimizer=keras.optimizers.Adam(lr=0.09, beta_1=0.9, beta_2=0.999, epsilon=None, decay=0.03, amsgrad=True),
                  metrics=['mae', 'mse'])

    return model

# initialize model and view details
model = build_mlp_model()
model.summary()

# CLI output of model.summary() 
______________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
dense_1 (Dense)              (None, 64)                640       
_________________________________________________________________
dropout_1 (Dropout)          (None, 64)                0         
_________________________________________________________________
dense_2 (Dense)              (None, 8)                 520       
_________________________________________________________________
dropout_2 (Dropout)          (None, 8)                 0         
_________________________________________________________________
dense_3 (Dense)              (None, 1)                 9         
=================================================================
Total params: 1,169
Trainable params: 1,169
Non-trainable params: 0
_________________________________________________________________
```


<hr>

### Output Verification

<br>

- a few observations are supplied to the initialized but untranined neural net to ensure expected data type and shape of output is obtained 
    - helpful to check if setup model can handle all features at once
    - although the shape of the output would be as expected, using 69 features will result in `NaN` output here; so, the number of features to train models is prioritized to a few important ones

```
## model verification: 

example_batch = normed_train_data[:10]
example_result = model.predict(example_batch)
print(example_result)

# CLI output of above print statement
[[ 0.1648832 ]
 [ 0.03176637]
 [ 0.10069194]
 [ 0.18034486]
 [-0.02307046]
 [-0.00585764]
 [ 0.03640913]
 [-0.10891403]
 [-0.01421728]
 [ 0.15022787]]
```

<hr>

### Neural Net Training

<br>

- each pass over the entire training dataset is an *epoch*; 
    - one pass = forward propogation + back propogation
- the idea is that each epoch increases the accuracy of the predictions of the neural net, and this verifiable by observing the history of error over several training epochs
- however, after a certain number of epochs, there is no gain in accuracy by training the model with more passes
- so for a given number of observations and learning rate of the optimizer, only so many epochs are needed to reach maximum accuracy obtainable


```
### TRAIN MODEL:

# function to display training progress in console
class PrintDot(keras.callbacks.Callback):
  def on_epoch_end(self, epoch, logs):
    print('.', end = '')
    if epoch % 100 == 0: print('\nEPOCH: ', epoch, '\n')

EPOCHS = 1000

history = model.fit(
  normed_train_data, train_target,
  epochs=EPOCHS, validation_split = 0.2, verbose=0,
  callbacks=[PrintDot()])

## visualize learning

# plot the learning steps: 
hist = pd.DataFrame(history.history)
hist['epoch'] = history.epoch

plt.figure(0)
plt.xlabel('Epoch')
plt.ylabel('Mean Abs Error [USD]')
plt.plot(hist['epoch'], hist['mean_absolute_error'],
          label='Train Error')
plt.plot(hist['epoch'], hist['val_mean_absolute_error'],
          label = 'Val Error')
plt.legend()
plt.savefig('nn-plots/mae-epoch-history.png')


plt.figure(1)
plt.xlabel('Epoch')
plt.ylabel('Mean Square Error [$USD^2$]')
plt.plot(hist['epoch'], hist['mean_squared_error'],
          label='Train Error')
plt.plot(hist['epoch'], hist['val_mean_squared_error'],
          label = 'Val Error')
plt.legend()
plt.savefig('nn-plots/mse-epoch-history.png')

```

- following are the training history plots across the 1000 epochs
    - error is the difference between the true (known price) values and those estimated by the neural network 
    - *mae* and *mse* are two different quantifiers of this error 
 
<br>

![mae-vs-epoch](/media/blogAssets/uci-auto-data-nn/metrics-mae-history.svg)
{: style="text-align: center;"}

*fig: mean-absolute-error vs. epoch*
{: style="font-size: 80%; text-align: center;"}

<br>

![mse-vs-epoch](/media/blogAssets/uci-auto-data-nn/metrics-mse-history.svg)
{: style="text-align: center;"}

*fig: mean-absolute-error vs. epoch*
{: style="font-size: 80%; text-align: center;"}


- until the 200<sup>th</sup> epoch, huge drops in error seen
- after that, the error drop, though consistent, is not significant enough to improve accuracy greatly 
- while this dataset is small (only 159 observations), for large dataset with more complex MLPs, each epoch consumes a lot of time and computing power
    - it becomes essential to monitor the accuracy gain obtained after every epoch to assess if more training passes make sense

- `cython` is used to compile this entire neural network pipeline written in `python` to speed up the training passes
    - see directions to compile `python` code to `cython` [here](https://numoonchld.github.io/2019/05/08/cython-notes-0.html){: target="_blank"}
    - see [`cython` folder](https://github.com/numoonchld/uci-auto-data/tree/master/cython-tensorflow){: target="_blank"} in code repo


<hr>

### Evaluation:

<br>
##### test set MAE

- when script is run multple times, the MAE hovers between 2000 USD - 2250 USD
    - so predictions are, on an average, 2100 USD off from the labels
    - this is expect behavior for a small dataset 

```
### TEST SET EVALUATION: 

loss, mae, mse = model.evaluate(normed_test_data, test_target, verbose=0)
print("\n\nTesting set Mean Abs Error: {:5.2f} USD".format(mae))

# CLI output of print statement above
Testing set Mean-Abs-Error (MAE): 2156.20 USD
```

<br>

##### test set predictions and error

- the error scatter plot below shows a linear trend,

![scatter-test-error](/media/blogAssets/uci-auto-data-nn/metrics-scatter-test-true-vs-predicted.svg)
{: style="text-align: center;"}

*fig: scatter plot of error for test dataset*
{: style="font-size: 80%; text-align: center;"}

- an error histogram with 25 unit bins shows an almost normal distribution

![histogram-test-set-error](/media/blogAssets/uci-auto-data-nn/metrics-hist-test-vs-predicted-error.svg)
{: style="text-align: center;"}

*fig: histogram of errors for test dataset*
{: style="font-size: 80%; text-align: center;"}

- so, obtaining more observations to train this particular neural net is a promising step towards improving accuracy

```
### PREDICTIONS: 

test_predictions = model.predict(normed_test_data).flatten()

# plot scatter plot for test data -----------------------

plt.figure(2)
plt.scatter(test_target, test_predictions)
plt.xlabel('True Values [USD]')
plt.ylabel('Predictions [USD]')
plt.axis('equal')
plt.axis('square')
# plt.xlim([0,plt.xlim()[1]])
# plt.ylim([0,plt.ylim()[1]])
# _ = plt.plot([-100, 100], [-100, 100])
plt.savefig('nn-plots/scatter-test-true-vs-predicted.png')


# error distribution plot: ------------------------------
plt.figure(3)
error = test_predictions - test_target
plt.hist(error, bins = 25)
plt.xlabel("Prediction Error [USD]")
_ = plt.ylabel("Count")
plt.savefig('nn-plots/hist-test-vs-predicted-error-distribution.png')
plt.show()
```

<hr>

### References:

<br>

- [neural net for regression](https://www.tensorflow.org/tutorials/keras/basic_regression){: target="_blank"}
- [pandas sampling](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.sample.html){: target="_blank"}
- [pandas one-hot-encoding](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.get_dummies.html){: target="_blank"}
- [keras sequential model](https://keras.io/getting-started/sequential-model-guide/){: target = "_blank"}
- [keras core layers](https://keras.io/layers/core/){: target="_blank"}
- [keras optimizers](https://keras.io/optimizers/){: target="_blank"}
- [graphviz homebrew](http://fpl.cs.depaul.edu/jriely/ds1/lectures/class-01-019.html){: target="_blank"}
