---
layout: post
title: chexpert notes 2
artist: Myon and Shane 54
artistLink: https://www.discogs.com/artist/1239503-Myon-Shane-54
track: The Beach
trackLink: https://youtu.be/mPUsAABgqyk
tags: [notes, data science, machine learning, ai, supervised learning, neural network]
---

### keras cifar-10 

```
import keras
from keras.datasets import cifar10
from keras.preprocessing.image import ImageDataGenerator
from keras.models import Sequential
from keras.layers import Dense, Dropout, Activation, Flatten
from keras.layers import Conv2D, MaxPooling2D
import os

batch_size = 32
num_classes = 10
epochs = 20 # 100 is too many for my zwake laptop

data_augmentation = False 
# more aobut data-augmentation: https://www.oreilly.com/library/view/deep-learning-with/9781787128422/1c0ae7dd-bea7-4af8-a08e-82b5eac072f2.xhtml

# num_predictions = 20
save_dir = os.path.join(os.getcwd(), 'saved_models')
model_name = 'keras_cifar10_trained_model.h5'

# The data, split between train and test sets:
(x_train, y_train), (x_test, y_test) = cifar10.load_data()
print('x_train shape:', x_train.shape)
print(x_train.shape[0], 'train samples')
print(x_test.shape[0], 'test samples')

# Convert class vectors to binary class matrices.
y_train = keras.utils.to_categorical(y_train, num_classes)
y_test = keras.utils.to_categorical(y_test, num_classes)

# Initialize model.
model = Sequential()
model.add(Conv2D(32, (3, 3), padding='same',
                 input_shape=x_train.shape[1:]))
model.add(Activation('relu'))
model.add(Conv2D(32, (3, 3)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))

model.add(Conv2D(64, (3, 3), padding='same'))
model.add(Activation('relu'))
model.add(Conv2D(64, (3, 3)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))

model.add(Flatten())
model.add(Dense(512))
model.add(Activation('relu'))
model.add(Dropout(0.5))
model.add(Dense(num_classes))
model.add(Activation('softmax'))

# initiate RMSprop optimizer
opt = keras.optimizers.rmsprop(lr=0.0001, decay=1e-6)

# Let's train the model using RMSprop
model.compile(loss='categorical_crossentropy',
              optimizer=opt,
              metrics=['accuracy'])

# Normalizing RGB values: 
x_train = x_train.astype('float32')
x_test = x_test.astype('float32')
x_train /= 255
x_test /= 255

if not data_augmentation:
    print('Not using data augmentation.')
    model.fit(x_train, y_train,
              batch_size=batch_size,
              epochs=epochs,
              validation_data=(x_test, y_test),
              shuffle=True)
else:
    print('Using real-time data augmentation.')
    # This will do preprocessing and realtime data augmentation:
    datagen = ImageDataGenerator(
        featurewise_center=False,  # set input mean to 0 over the dataset
        samplewise_center=False,  # set each sample mean to 0
        featurewise_std_normalization=False,  # divide inputs by std of the dataset
        samplewise_std_normalization=False,  # divide each input by its std
        zca_whitening=False,  # apply ZCA whitening
        zca_epsilon=1e-06,  # epsilon for ZCA whitening
        rotation_range=0,  # randomly rotate images in the range (degrees, 0 to 180)
        # randomly shift images horizontally (fraction of total width)
        width_shift_range=0.1,
        # randomly shift images vertically (fraction of total height)
        height_shift_range=0.1,
        shear_range=0.,  # set range for random shear
        zoom_range=0.,  # set range for random zoom
        channel_shift_range=0.,  # set range for random channel shifts
        # set mode for filling points outside the input boundaries
        fill_mode='nearest',
        cval=0.,  # value used for fill_mode = "constant"
        horizontal_flip=True,  # randomly flip images
        vertical_flip=False,  # randomly flip images
        # set rescaling factor (applied before any other transformation)
        rescale=None,
        # set function that will be applied on each input
        preprocessing_function=None,
        # image data format, either "channels_first" or "channels_last"
        data_format=None,
        # fraction of images reserved for validation (strictly between 0 and 1)
        validation_split=0.0)

    # Compute quantities required for feature-wise normalization
    # (std, mean, and principal components if ZCA whitening is applied).
    datagen.fit(x_train)

    # Fit the model on the batches generated by datagen.flow().
    model.fit_generator(datagen.flow(x_train, y_train,
                                     batch_size=batch_size),
                        epochs=epochs,
                        validation_data=(x_test, y_test),
                        workers=4)

# Save model and weights
if not os.path.isdir(save_dir):
    os.makedirs(save_dir)
model_path = os.path.join(save_dir, model_name)
model.save(model_path)
print('Saved trained model at %s ' % model_path)

# Score trained model.
scores = model.evaluate(x_test, y_test, verbose=1)
print('Test loss:', scores[0])
print('Test accuracy:', scores[1])
```

- output:

```
Using TensorFlow backend.
x_train shape: (50000, 32, 32, 3)
50000 train samples
10000 test samples
Not using data augmentation.
Train on 50000 samples, validate on 10000 samples
Epoch 1/20
50000/50000 [==============================] - 989s 20ms/step - loss: 1.7970 - acc: 0.3386 - val_loss: 1.5090 - val_acc: 0.4571
Epoch 2/20
50000/50000 [==============================] - 948s 19ms/step - loss: 1.4653 - acc: 0.4697 - val_loss: 1.3239 - val_acc: 0.5285
Epoch 3/20
50000/50000 [==============================] - 967s 19ms/step - loss: 1.3429 - acc: 0.5217 - val_loss: 1.2500 - val_acc: 0.5625
Epoch 4/20
50000/50000 [==============================] - 962s 19ms/step - loss: 1.2491 - acc: 0.5565 - val_loss: 1.1463 - val_acc: 0.5934
Epoch 5/20
50000/50000 [==============================] - 961s 19ms/step - loss: 1.1738 - acc: 0.5866 - val_loss: 1.0743 - val_acc: 0.6191
Epoch 6/20
50000/50000 [==============================] - 991s 20ms/step - loss: 1.1154 - acc: 0.6086 - val_loss: 1.0881 - val_acc: 0.6176
Epoch 7/20
50000/50000 [==============================] - 957s 19ms/step - loss: 1.0632 - acc: 0.6263 - val_loss: 1.0518 - val_acc: 0.6296
Epoch 8/20
50000/50000 [==============================] - 995s 20ms/step - loss: 1.0224 - acc: 0.6414 - val_loss: 0.9581 - val_acc: 0.6637
Epoch 9/20
50000/50000 [==============================] - 1002s 20ms/step - loss: 0.9844 - acc: 0.6558 - val_loss: 0.9368 - val_acc: 0.6661
Epoch 10/20
50000/50000 [==============================] - 999s 20ms/step - loss: 0.9529 - acc: 0.6646 - val_loss: 0.9105 - val_acc: 0.6769
Epoch 11/20
50000/50000 [==============================] - 994s 20ms/step - loss: 0.9266 - acc: 0.6774 - val_loss: 0.8895 - val_acc: 0.6905
Epoch 12/20
50000/50000 [==============================] - 1002s 20ms/step - loss: 0.9019 - acc: 0.6850 - val_loss: 0.8499 - val_acc: 0.7051
Epoch 13/20
50000/50000 [==============================] - 994s 20ms/step - loss: 0.8876 - acc: 0.6918 - val_loss: 0.8981 - val_acc: 0.6851
Epoch 14/20
50000/50000 [==============================] - 998s 20ms/step - loss: 0.8646 - acc: 0.6997 - val_loss: 0.8231 - val_acc: 0.7114
Epoch 15/20
50000/50000 [==============================] - 993s 20ms/step - loss: 0.8519 - acc: 0.7041 - val_loss: 0.8135 - val_acc: 0.7200
Epoch 16/20
50000/50000 [==============================] - 990s 20ms/step - loss: 0.8360 - acc: 0.7110 - val_loss: 0.8485 - val_acc: 0.7100
Epoch 17/20
50000/50000 [==============================] - 990s 20ms/step - loss: 0.8269 - acc: 0.7147 - val_loss: 0.8050 - val_acc: 0.7229
Epoch 18/20
50000/50000 [==============================] - 931s 19ms/step - loss: 0.8208 - acc: 0.7196 - val_loss: 0.7697 - val_acc: 0.7367
Epoch 19/20
50000/50000 [==============================] - 952s 19ms/step - loss: 0.8059 - acc: 0.7245 - val_loss: 0.7794 - val_acc: 0.7340
Epoch 20/20
50000/50000 [==============================] - 950s 19ms/step - loss: 0.8032 - acc: 0.7284 - val_loss: 0.7625 - val_acc: 0.7413
Saved trained model at /Users/mac/machine learning case studies/cifar-10/saved_models/keras_cifar10_trained_model.h5 
10000/10000 [==============================] - 48s 5ms/step
Test loss: 0.7625440240859985
Test accuracy: 0.7413
```