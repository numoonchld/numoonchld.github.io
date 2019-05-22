---
layout: post
title: ml case studies 1 - uci auto data
artist: Ellie Goulding
artistLink: https://www.elliegoulding.com/
track: Lights (Bassnectar Remix)
trackLink: https://youtu.be/Imixg3jrJS8
tags: [notes, data science, machine learning, ai, supervised learning, linear regression, k-folds, residual plot]
---

### Contents

<br>

1. [Dataset Details](#dataset-details)
2. [Goal](#goal)
3. [Python ML Packages](#python-ml-packages)
4. [Machine Learning Pipeline](#machine-learning-pipeline)
5. [Data Pre-processing](#data-pre-processing)
6. [Exploratory Data Analysis](#exploratory-data-analysis)
7. [Test-Train Split](#test-train-split)
8. [Algorithm Setup](#algorithm-setup)
9. [Model Fitting](#model-fitting)
10. [Evaluation](#evaluation)
11. [Model Re-train](#model-re-train)
12. [Conclusions](#conclusions)
13. [References](#references)

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

- the third factor is the relative average loss payment per insured vehicle year.  
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

- train linear regression models with supervised learning methods to predict price of a used car taking in the car's details as input

- [code repo for this write-up](https://github.com/numoonchld/uci-auto-data){: target="_blank"}
    
<hr>

### Python ML Packages:

<br> 
        
        # for data import and data wrangling:
        import numpy as np
        import pandas as pd
        
        # for exploratory data analysis:
        import seaborn as sns
        from matplotlib import pyplot as plt

        # for test-train split:
        from sklearn.model_selection import train_test_split

        # for linear regression:
        from sklearn.linear_model import LinearRegression

        # for K-Folds cross validaton and prediction:
        from sklearn.model_selection import cross_val_predict
        from sklearn.model_selection import cross_val_score

        # for mean-squared-error:
        from sklearn.metrics import mean_squared_error

        # for saving trained models to disk:
        import pickle

<br>

<hr>

### Machine Learning Pipeline:

<br> 

![Model Input and Output](/media/blogAssets/uci-auto-data/pipeline.svg)
{: style="text-align: center;"}

<hr>

### Data Pre-processing:

<br>

1. set path for data file and load data

        data_path = 'imports-85.data'
        df = pd.read_csv(data_path)

2. inspect loaded data

        print(df.head(5))
        print(df.tail(5))
        print(df.info)

3. check if headers are clean, if not assign the right headers

    - in this dataset, the headers are provided in a separate file, so they need to be added to the dataframe

            header = ['symboling','normalized-losses','make','fuel-type','aspiration','num-of-doors','body-style','drive-wheels','engine-location','wheel-base','length','width','height','curb-weight','engine-type','num-of-cylinders','engine-size','fuel-system','bore','stroke','compression-ratio','horsepower','peak-rpm','city-mpg','highway-mpg','price']

            df.columns = header

4. missing value clean-up:

    - missing values in this dataset are denoted by '?', replace them with `numpy` `NaN` values and drop the corresponding observations

            df.replace('?',np.nan, inplace=True)
            df.dropna(inplace=True)

5. data-type cleanup: 

    - inspect datatypes of each column 

            print(df.head(5))
            print(df.dtypes)

    - `numpy` datatypes can be applied
    - `pandas`' `Object` is equivalent to `python`'s `str` datatype 
    - following datatype correction are applied in this write-up

            df['normalized-losses'] = df['normalized-losses'].astype('int')
            df['bore'] = df['bore'].astype('float')
            df['stroke'] = df['stroke'].astype('float')
            df['horsepower'] = df['horsepower'].astype('float')
            df['peak-rpm'] = df['peak-rpm'].astype('int')
            df['price'] = df['price'].astype('int')

    - review datatype of each column to confirm datatype conversion

            print(df.dtypes)

6. short statistical summary as a common-sense test for dataset values

            print(df.describe(include="all"))

<hr>

###  Exploratory Data Analysis:

<br>

- explore data to understand which *predictor* variables ('engine-size', 'horsepower', 'highway-mpg', etc) have a significant bearing on the *target* variable ('price')
    
- check correlation co-efficient between all variables with each other (of `int64` and `float64` datatype)
    
        df.corr()

- the influence of individual *predictors* (of `int64` and `float64` datatype) on the *target* variable (price) can be studies with **Regression Plots**

- *predictor* variables are of two kinds:
    - continuous numerical variables 
    - categorical variables

##### continuous numerical variables:

- correlation plots for some continuous *predictor* variables

    - engine-size:price - strong positive correlation

    ![engine-size](/media/blogAssets/uci-auto-data/01-a-reg-plot-engine-size.svg)
    {: style="text-align: center;"}

    - horsepower:price - strong positive correlation
    
    ![horsepower](/media/blogAssets/uci-auto-data/01-a-reg-plot-hp.svg)
    {: style="text-align: center;"}

    - highway-mpg:price - strong negative correlation

    ![highway-mpg](/media/blogAssets/uci-auto-data/01-a-reg-plot-hw-mpg.svg)
    {: style="text-align: center;"}
    
    above regression line only shows the trend/correlation of the predictor-target variable and not the actual relationship (avoid mis-interpreting the regression line going below price=0 for best results)

    - symboling:price - weak negative correlation
    
    ![symboling](/media/blogAssets/uci-auto-data/01-a-reg-plot-symboling.svg)
    {: style="text-align: center;"}

    - normalized-losses:price - weak positive correlation
    
    ![normalized-losses](/media/blogAssets/uci-auto-data/01-a-reg-plot-nl.svg)
    {: style="text-align: center;"}

##### categorical variables:

- price distribution and preliminary statistics visualization for categorical variables

    - body-style:price

    ![body-style](/media/blogAssets/uci-auto-data/01-b-box-plot-body.svg)
    {: style="text-align: center;"}

    - aspiration:price

    ![aspiration](/media/blogAssets/uci-auto-data/01-b-box-plot-aspiration.svg)
    {: style="text-align: center;"}

    - fuel-system:price

    ![fuel-system](/media/blogAssets/uci-auto-data/01-b-box-plot-fuel-system.svg)
    {: style="text-align: center;"}

    - drive-wheels:price

    ![drive-wheels](/media/blogAssets/uci-auto-data/01-b-box-plot-drive-wheels.svg)
    {: style="text-align: center;"}

##### insights:

some insights gained from exploratory data analysis: 

- from above continuous predictor regression charts, it may be gathered that 
    - more engine-size and horsepower in a used car costs more; cars more efficient on the highway cost less; there is strong correlation between those qualities of a used car with it's price

    - higher the risk of the car, lesser the price; similarly, higher the normalized-losses, higher the price; these two ratings, however, have a weaker correlation to the price of the used car compared to engine-size, horsepower and highway fuel efficiency

    - the symboling variable has a categorial nature to it, so it will not be analyzed as a continuous variable and not be used to train a model

- above categorical predictor box charts indicate the following
    - convertibles are a lot more expensive than other body styles 
    
    - turbo-aspirated used cars generally cost more than standard aspiration cars, rear-wheel-drive cars cost more than front-wheel-drive and 4-wheel-drive

    - mpfi and idi fuel-injection systems generally cost more than other types 


#### python code
    
    # continuous variables correlation co-efficients:

        print(df[["engine-size", "price"]].corr())
        sns.regplot(x="engine-size", y="price", data=df)

        print(df[["horsepower", "price"]].corr())
        sns.regplot(x="horsepower", y="price", data=df)

        print(df[["highway-mpg", "price"]].corr())
        sns.regplot(x="highway-mpg", y="price", data=df)

        print(df[["curb-weight", "price"]].corr())
        sns.regplot(x="curb-weight", y="price", data=df)

        print(df[["symboling", "price"]].corr())
        sns.regplot(x="symboling", y="price", data=df)

        print(df[["normalized-losses", "price"]].corr())
        sns.regplot(x="normalized-losses", y="price", data=df)



    # categorical variables

        print(df["body-style"].value_counts())
        sns.boxplot(x="body-style", y="price", data=df)

        print(df["aspiration"].value_counts())
        sns.boxplot(x="aspiration", y="price", data=df)

        print(df["fuel-system"].value_counts())
        sns.boxplot(x="fuel-system", y="price", data=df)

        print(df["drive-wheels"].value_counts())
        sns.boxplot(x="drive-wheels", y="price", data=df)

        print(df["make"].value_counts())
        sns.boxplot(x="make", y="price", data=df)

<br>

<hr>

### Test-Train Split:

<br>

- convert categorical data to quantitative data
    - "one-hot encoding" is a popular technique 
    - identify all categorical predictor variables and one-hot encode them 

            df = pd.get_dummies(df)

- create test-train split 
    - 80%: training data 
    - 20%: test data 

- this split is for model without regularization hyper-parameters; with regularization, the split would be 
    - 60%: train data
    - 20%: hyper-parameter/regularization validation data
    - 20%: test data

<hr>

### Algorithm Setup:

<br>

- two types of linear regression models will be explored in this write-up:
    - simple linear regression
    - multiple linear regression

##### Simple Linear Regression

- simple linear regression is one-predictor-one-target model 
    - it is trained with known predictor-target pair values 
    - it tries to predict the target for a previously unseen predictor value after training 

- this write-up will set up five such models:
    - engine-size:price
        
            lm_engine_size = LinearRegression()

    - horsepower:price

            lm_horsepower = LinearRegression()

    - highway-mpg:price

            lm_highway_mpg = LinearRegression()

    - normalized-losses:price

            lm_norm_loss = LinearRegression()

##### Multiple Linear Regression

- multiple linear regression is multiple-predictor-one-target model
    - known sets of multiple predictor variables with corresponding target values are used to train the model
    - for an unseen set of the same predictor variables, the trained model predicts the target price 

- two such models, one for build dimensions and car specifications explored here:
    - (length,width,height,curb-weight):price

            lm_build_dim = LinearRegression()

    - (engine-size,horsepower,city-mpg,highway-mpg):price

            lm_car_chars = LinearRegression()
<hr>

### Model Fitting:

<br>

- fit models initialized previously with their data series:

        ## simple linear regression

        lm_engine_size.fit(x_train[['engine-size']], y_train)
        lm_horsepower.fit(x_train[['horsepower']], y_train)
        lm_highway_mpg.fit(x_train[['highway-mpg']], y_train)
        lm_norm_loss.fit(x_train[['normalized-losses']], y_train)

        ## multiple linear regression

        lm_build_dim.fit(x_train[['length','width','height','curb-weight']], y_train) 
        lm_car_specs.fit(x_train[['engine-size','horsepower','city-mpg','highway-mpg']], y_train)

- the following are the linear regression intercept-coefficient pairs generated from training the model:

        ## Engine-Size:Price Linear Regression Model:
        print(lm_engine_size.intercept_, lm_engine_size.coef_) 
        ## [-7992.74991339] [[162.92166497]]
        
        ## Horsepower:Price Linear Regression Model: 
        print(lm_horsepower.intercept_, lm_horsepower.coef_)
        ## [-2306.79714958] [[143.97806991]]
        
        ## Highway-MPG:Price Linear Regression Model: 
        print(lm_highway_mpg.intercept_, lm_highway_mpg.coef_)
        ## [33820.38434914] [[-694.88845889]]
        
        ## Normalized-Losses:Price Linear Regression Model: 
        print(lm_norm_loss.intercept_, lm_norm_loss.coef_)
        ## [7414.32607766] [[34.81225022]]
        
        ## Build Dimensions:Price Linear Regression Model: 
        print(lm_build_dim.intercept_, lm_build_dim.coef_)
        ## [-52378.43476732] [[ -64.92258503 931.64836436 -164.25220771 9.23624461]]
        
        ## Car Specs:Price Linear Regression Model: 
        print(lm_car_specs.intercept_, lm_car_specs.coef_)
        ## [1531.96721594] [[ 126.16415762 14.17026447 355.30831826 -495.97047484]]


<hr>

### Evaluation:

<br>

- evaluation of the model is done for in-sample performance (training data) and out-of-sample performance (test data)

#### evaluation metrics:

- visual evaluations:

    - residual plot:
        - a test for simple linear regression: "If the points in a residual plot are randomly spread out around the x-axis, then a linear model is appropriate for the data. Randomly spread out residuals means that the variance is constant, and thus the linear model is a good fit for this data."
        - if there is a general curve in the residual scatter plot, a polynomial fit is more appropriate; if the variance in the plot changes along the x-axis, then a linear model is not appropriate
        

    - distribution plots:
        - plot the known target values and predictions from the trained model in a distribution plot to get a visual understand of performance 


- R<sup>2</sup>: 
    - measure of closeness of fit to curve
    - should be greater than 0.1 (Falk and Miller - 1990)
    - closer the value of R<sup>2</sup> to 1, closer the fit to the data

- MSE:
    - lesser the MSE value, better the performance 

<br>

#### visual evaluation:

**Residual Plots** (in-sample evaluation)

- engine-size:price
    
![engine-size](/media/blogAssets/uci-auto-data/04-a-resid-plot-engine-size.svg)
{: style="text-align: center;"}

- horsepower:price

![horsepower](/media/blogAssets/uci-auto-data/04-a-resid-plot-horsepower.svg)
{: style="text-align: center;"}

- highway-mpg:price

![highway-mpg](/media/blogAssets/uci-auto-data/04-a-resid-plot-highway-mpg.svg)
{: style="text-align: center;"}

- normalized-losses:price

![normalized-losses](/media/blogAssets/uci-auto-data/04-a-resid-plot-norm-loss.svg)
{: style="text-align: center;"}

- build-dim:price

![build-dim](/media/blogAssets/uci-auto-data/04-a-resid-plot-body.svg)
{: style="text-align: center;"}

- car-specs:price

![car-specs](/media/blogAssets/uci-auto-data/04-a-resid-plot-car-specs.svg)
{: style="text-align: center;"}

<br>

*residual plot insights*

- simple linear regression

    - engine-size:price scatter plot distribution is spread evenly along the x-axis, so the linear model is appropriate
    - horsepower:price model residual shows a curve is the distribution and the variance isn't constant, higher order fit might work better
    - highway-mpg:price scatter plot distribution also shows a curve across x-axis, different fit needs to be explored
    - normalized-losses:price variance isn't constant across the plot, no curve seen either, a more nuanced non-linear model might be better-suited

- multi linear regression

    - build-dim:price scatter plot shows no curve, but the variance isn't constant across the board
    - car-specs:price scatter plot variance is not constant throughout 

- only engine-size:price model will be further analyzed as the other models need a separate study to find out which models work 

#### engine-size:price - model evaluation

**Distribution Plots**

- below are distribution plots of true vs. predicted values of in-sample engine-size:price pairs 
        
    ![engine-size](/media/blogAssets/uci-auto-data/04-b-dist-plot-engine-size.svg)
    {: style="text-align: center;"}


- below are distribution plots of true vs. predicated values of out-of-sample engine-size:price pairs 

        
    ![engine-size](/media/blogAssets/uci-auto-data/04-c-dist-plot-engine-size.svg)
    {: style="text-align: center;"}


##### R<sup>2</sup> evaluation:

- in-sample R<sup>2</sup> values for engine-size:price:

        engine-size:price
        print(lm_engine_size.score(x_train[['engine-size']], y_train))
        0.7310050422003973


- out-of-sample R<sup>2</sup> values for engine-size:price: 

        engine-size:price
        print(lm_engine_size.score(x_test[['engine-size']], y_test))
        0.5637996565118054


##### MSE evaluation:

- in-sample:

        engine-size:price
        mean_squared_error(y_train,lm_engine_size.predict(x_train[['engine-size']]))
        9848498.42266501

- out-of-sample:

        engine-size:price
        mean_squared_error(y_test,lm_engine_size.predict(x_test[['engine-size']]))
        10707791.23428005

##### R<sup>2</sup> and MSE insights:

- R<sup>2</sup> value is lower for the test data
- MSE is higher for out-of-sample prediction
- Both of these indicate that *engine-size:price* prediction model does worse of predicting price for unseen values of engine-size
    - this might be due to over-fitting to training data
    - this model's prediction will not generalize well to new data
- K-folds cross-validation can be used to train the best simple linear model with 

### Model Re-train:

##### K-fold Cross-Validation

- K-folds cross validation is used to retrain the model with K in-sample *train-test* splits and get the R<sup>2</sup> values for respective splits


    - 2-Folds:
            
            # train-test splits - R^2 error:        
            cross_val_score(lm_engine_size, x_train[['engine-size']], y_train, cv=2)
            # [0.72605172 0.57164608]

            # R^2 average:
            np.mean(cross_val_score(lm_engine_size, x_train[['engine-size']], y_train, cv=2))
            # 0.6488488999289039


    - 3-Folds:
            
            # train-test splits - R^2 error:
            cross_val_score(lm_engine_size, df[['engine-size']], df[['price']], cv=3) 
            # [0.73736009 0.80002091 0.50708333]

            # R^2 average:
            np.mean(cross_val_score(lm_engine_size, df[['engine-size']], df[['price']], cv=3))
            # 0.6814881082982801


    - 4-Folds:
    
            # train-test splits - R^2 error:        
            cross_val_score(lm_engine_size, x_train[['engine-size']], y_train, cv=4)
            # [0.75718247 0.75754086 0.72910826 0.38780982]


            # R^2 average:
            np.mean(cross_val_score(lm_engine_size, x_train[['engine-size']], y_train, cv=4))
            # 0.6579103522174403


    - 5-Folds:
            
            # train-test splits - R^2 error:         
            cross_val_score(lm_engine_size, x_train[['engine-size']], y_train, cv=5)
            # [0.79241442 0.70705579 0.80316644 0.65735852 0.41465915]


            # R^2 average:        
            np.mean(cross_val_score(lm_engine_size, x_train[['engine-size']], y_train, cv=5))
            # 0.6749308645401664


![k-fold](/media/blogAssets/uci-auto-data/grid_search_cross_validation.svg)
{: style="text-align: center;"}

<br>

##### K-fold Prediction

- Distribution plot of K-folds predictons for out-of-sample test data 

![dist-plot - k-folds](/media/blogAssets/uci-auto-data/05-a-dist-plot-engine-size.svg)
{: style="text-align: center;"}

<hr>

### Conclusions

<br> 

- the trained linear model has the required residual plot behavior, so the linear estimator is good

- the estimator suffers from poor accuracy, however, for out-of-sample data as seen in the above distribution plot
 
- training with more data samples or a more complex model like a neural network might provide better performance 

<hr>

### References:

<br>

- [residual plots](https://stattrek.com/statistics/dictionary.aspx?definition=residual%20plot){: target="_blank"}

- [cross-validation - k-folds](https://scikit-learn.org/stable/modules/cross_validation.html){: target="_blank"}

- [pickle for model dumps](https://machinelearningmastery.com/save-load-machine-learning-models-python-scikit-learn/){: target="_blank"}
    - [python pickle](https://docs.python.org/3.6/library/pickle.html){: target="_blank"}

- [ibm course](https://cognitiveclass.ai/courses/python-for-data-science/){: target="_blank"}
