---
layout: post
title: rxjs for angular notes 0
artist:  Myon & Shane 54 ft. Aruna 
artistLink: https://twitter.com/ARUNA_official
track: Helpless (Ian Flux & Thomas Blofeld Mix)
trackLink: https://www.youtube.com/watch?v=oGEqWNrcItA
tags: [rxjs, angular, notes]
---

### Software Design Patterns:

general, reusable solutions to commonly occurring problems within given context of software design

<br>
#### Observer Pattern:

mainly used in *event handing systems* and in *event driven* scenarios

- a __subject__ keeps a *list of dependents*
- each *dependent* is an *observer*
- __subject__ notifies *dependents* of state changes

(key part of model-view-controller architectural pattern)

<br>
#### Iterator Pattern:

(in) object-oriented-programming - pattern to go through a container object 

<br>
#### Lazy Evaluations:

- strategy which delays the evaluation of an expression until its value is needed and avoids repeated evaluations
- typically combined with the utilization of a lookup table to store already evaluated values and return those for the same input parameters

- order of operations can become indeterminate 
- can introduce memory leaks

- opposite of eager evaluation, which is the commonly used evaluation strategy in programming languages 


<br>
#### Pull systems vs. Push systems:

*pull systems:* The data Consumer determines when it receives data from Producer. Producer is unaware of when the data is delivered.
*eg:* A JavaScript function

*push systems:* The data Producer determines when to send data to the Consumer. Consumer is unaware of when it will receive data.
*eg:* A JavaScript Promise 

<br>

popular JavaScript data delivery systems:

- *Function*: a lazily evaluated computation that synchronously returns a single value on invocation
- *Generator*: is a lazily evaluated computation that synchronously returns zero to (potentially) infinite values on iteration
- *Promise*: a computation that may (or may not) eventually return a single value

<br>
#### Multicasting:

data from *single Producer* to *multiple Consumers*


<hr>

### RxJS:

in the context of angular, this is a *TypeScript* library for *asynchronous* and *event-based* code

combines observer pattern and iterator pattern, and functional programming with collections to fill the need for an ideal way of managing sequences of events

*RxJS* provided *angular*:

- __*Observable*__: the core *type*
    - an **invokable collection** of future events/values
    - a lazily evaluated JavaScript Push system that can *synchronously* or *asynchronously* return zero to (potentially) infinite values from the time it's invoked onwards
    - not like *Promise*s, may act like *EventEmitters* when used as *Subject* type


- satellite *types*: to support core *Observable*
    - __*Observer*__
    >>> listens to *Observable*, collection of callbacks

    - __*Subscription*__
    >>> represents the execution of the *Observable*, and allows cancellation

    - __*Subject*__
    >>> is the equivalent of an *EventEmitter*, and the only way of multicasting a value or event to multiple observers

    - __*Scheduler*__ 
    >>> centralized dispatchers to control concurrency, allows coordination of computation



- operators:
    >>> JavaScript array functional programming style functions for *Observables*:

    >>> - __*map*__: simlar to `Array.prototype.map`

    >>> - __*filter*__: simlar to `Array.prototype.filter`

    >>> - __*reduce*__: simlar to `Array.prototype.reduce`

    >>> - __*every*__: simlar to `Array.prototype.every`

##### Observable

- subscribing to an observer is analogous to writing a function with zero arguments;

        // consider Function:
        
        function foo() {
            console.log('Hello');
            return 42;
        }

        const x = foo.call(); // same as foo()
        console.log(x); 
        // "Hello"
        // 42
        
        const y = foo.call(); // same as foo()
        console.log(y);
        // "Hello"
        // 42

        // as an Observable:

        import { Observable } from 'rxjs';

        const foo = new Observable(function(subscriber) {
            console.log('Hello');
            subscriber.next(42);
        });

        foo.subscribe(function(x) {
            console.log(x);
        });
        // "Hello"
        // 42

        foo.subscribe(function(y) {
            console.log(y);
        });
        // "Hello"
        // 42

- but observables can return multiple values over time, __*synchronously*__ or __*asynchronously*__

        // consider Function:

        function foo() {
            console.log('Hello');
            return 42;
            return 100; // dead code. will never happen
        }

        // consider Observable (synchronous):

        import { Observable } from 'rxjs';

        const foo = new Observable(function(subscriber) {

            console.log('Hello');

            subscriber.next(42);
            subscriber.next(100); // "return" another value
            subscriber.next(200); // "return" yet another
            
        });

        console.log('before');
        foo.subscribe(function(x) {
            console.log(x);
        });
        console.log('after');
        // "before"
        // "Hello"
        // 42
        // 100
        // 200
        // "after"

        // consider Observable (asynchronous):

        import { Observable } from 'rxjs';

        const foo = new Observable(function(subscriber) {

            console.log('Hello');

            subscriber.next(42);
            subscriber.next(100);
            subscriber.next(200);

            setTimeout(() => {
                subscriber.next(300); // happens asynchronously
            }, 1000);

        });

        console.log('before');
        foo.subscribe(function(x) {
            console.log(x);
        });
        console.log('after');

        // "before"
        // "Hello"
        // 42
        // 100
        // 200
        // "after"
        // 300

<br>
*__initializing an Observable:__*

        import { Observable } from 'rxjs';

        const observable = new Observable(function subscribe(subscriber) {
            const id = setInterval(() => {
                subscriber.next('hi')
            }, 1000);
        });


also, can be initialized using `of`, `from`, `interval`, etc; example:

        const source = from([1, 2, 3]);
        
`source` has type *Observable*

<br>
*__subscribing to an Observable:__*

        observable.subscribe(function (x) {
            console.log(x)
        });

this is essentially the *Observer*

<br>
*__executing Observable:__*

the code within the `subscribe` function of the *Observable* -- 'Observable Execution'
- `subscriber.next()`: returns values such as `Number`, `String`, and `Object`
- `subscriber.complete()`: nothing returned
- `subscriber.error()`:  sends a JavaScript Error 

        import { Observable } from 'rxjs';

        const observable = new Observable(function subscribe(subscriber) {

            try {
                subscriber.next(1);
                subscriber.next(2);
                subscriber.next(3);
                subscriber.complete();

                subscriber.next(4); // value not delivered 

            } catch (err) {
                subscriber.error(err); // delivers an error if it caught one

            }

        });

<br>
*__disposing an Observable:__*

*Observable* executions are allowed to be infinite, so an *abort* option is made available by RxJS:

        import { from } from 'rxjs';

        const observable = from([10, 20, 30]);
        const subscription = observable.subscribe(function(x) {
            console.log(x)
        });

        // Later:
        subscription.unsubscribe();

        // explicitly define the method of stopping the Observable:
        const observable = new Observable(function subscribe(subscriber) {

            // Keep track of the interval resource
            const intervalId = setInterval(() => {
                subscriber.next('hi');
            }, 1000);

            // Provide a way of canceling and 
            // disposing the interval resource
            return function unsubscribe() {
                clearInterval(intervalId);
            };
            
        });

<br>
##### Subscription

*__single subscription__*:

it is the object that represents a disposable resource, such as the execution of the *Observable*. a subscription has an `unsubscribe()` method to stop the resource execution


        import { interval } from 'rxjs';

        const observable = interval(1000);
        const subscription = observable.subscribe(function(x) {
            console.log(x);
        });

        // Later:
        // This cancels the ongoing Observable execution which
        // was started by calling subscribe with an Observer.

        subscription.unsubscribe();


*__multiple subscriptions__*:

multiple child subscriptions can be added using `parentSubscription.add(childSubscription)` to enable unsubscribing from many of them at the same time

        import { interval } from 'rxjs';

        const observable1 = interval(400);
        const observable2 = interval(300);

        const subscription = observable1.subscribe(function(x) {
            console.log('first: ' + x);
        });

        const childSubscription = observable2.subscribe(function(x) {
            console.log('second: ' + x);
        });

        subscription.add(childSubscription);

        setTimeout(() => {

            // Unsubscribes BOTH subscription and childSubscription
            subscription.unsubscribe();

        }, 1000);

        // second: 0
        // first: 0
        // second: 1
        // first: 1
        // second: 2

here, [interval](https://rxjs-dev.firebaseapp.com/api/index/function/interval){: target='_blank' } is a built-in *Observable* that emits sequential numbers per specified period

child subscriptions are removed by `parentSubscription.remove(childSubscription)`

<br>
##### Subject

- a special type of *Observable* that sends values to many *Observer*s

- a *Subject* is an *Observable*...
    - an *Observer* (`.subscribe()`) cannot tell a regular *Observable* and a *Subject* apart
    - internally, *Subject* adds *Observer* to it's list of destination *Observer*s (similar to `addListener`)
    
- ... and also an *Observer*
    - it has the methods `.next()`, `.error()`, and `complete()`
    - `.next(new-value)` sends a new value to the *Subject* and this will be sent to all it's registered listeners 


            import { Subject, from } from 'rxjs';

            const subject = new Subject<number>();

            subject.subscribe({
                next: (v) => console.log(`observerA: ${v}`)
            });
            subject.subscribe({
                next: (v) => console.log(`observerB: ${v}`)
            });

            const observable = from([1, 2, 3]);

            // subscribe to Observable with a Subject
            observable.subscribe(subject); 

            // Logs:
            // observerA: 1
            // observerB: 1
            // observerA: 2
            // observerB: 2
            // observerA: 3
            // observerB: 3

- so a unicast *Observable* can be made multicasting through a *Subject*
- [*multicast*](https://rxjs-dev.firebaseapp.com/guide/subject#multicasted-observables){: target='_blank'} is a dedicated operator to send data from an *Objective* through a *Subject* to many *Observer*s simultaneously


additional *Subject* variants:

- *BehaviorSubject*: stores latest values emitted to registered *Observer*s, sends this stored value when new *Observer* subscribes

        import { BehaviorSubject } from 'rxjs';
        
        const subject = new BehaviorSubject(0); 

        subject.subscribe({
            next: (v) => console.log(`observerA: ${v}`)
        });

        subject.next(1);
        subject.next(2);

        subject.subscribe({
            next: (v) => console.log(`observerB: ${v}`)
        });

        subject.next(3);

        // Logs
        // observerA: 0
        // observerA: 1
        // observerA: 2
        // observerB: 2
        // observerA: 3
        // observerB: 3

- *ReplaySubject*: replays previous values for new *Observers* as per set values' buffer size or buffer time (in *ms*) when initialized

        import { BehaviorSubject } from 'rxjs';

        const subject = new BehaviorSubject(0); 
        // 0 is the initial value

        subject.subscribe({
            next: (v) => console.log(`observerA: ${v}`)
        });

        subject.next(1);
        subject.next(2);

        subject.subscribe({
            next: (v) => console.log(`observerB: ${v}`)
        });

        subject.next(3);

        // Logs
        // observerA: 0
        // observerA: 1
        // observerA: 2
        // observerB: 2
        // observerA: 3
        // observerB: 3

- *AsyncSubject*: it waits for the all *Subject* execution to finish i.e. until when `.complete()` runs. then, only the most recent value is the delivered

        import { AsyncSubject } from 'rxjs';
        const subject = new AsyncSubject();

        subject.subscribe({
            next: (v) => console.log(`observerA: ${v}`)
        });

        subject.next(1);
        subject.next(2);
        subject.next(3);
        subject.next(4);

        subject.subscribe({
            next: (v) => console.log(`observerB: ${v}`)
        });

        subject.next(5);
        subject.complete();

        // Logs:
        // observerA: 5
        // observerB: 5

<br>
##### Scheduler

sets conditions for *Observable* to *Observer* delivery; it  has three components:
- storing and queuing tasks
- where and when
- local clock

example of a *Scheduler*:

        import { Observable, asyncScheduler } from 'rxjs';
        import { observeOn } from 'rxjs/operators';

        const observable = new Observable( function(observer) {
            observer.next(1);
            observer.next(2);
            observer.next(3);
            observer.complete();
        }).pipe(
            observeOn(asyncScheduler);
        );
        console.log('just before subscribe');

        observable.subscribe({
            next(x) {
                console.log('got value ' + x)
            },
            error(err) {
                console.error('something wrong occurred: ' + err);
            },
            complete() {
                console.log('done');
            }
        });
        console.log('just after subscribe');

        // just before subscribe
        // just after subscribe
        // got value 1
        // got value 2
        // got value 3
        // done

`observeOn(asyncScheduler)` introduces a proxy Observer between `new Observable` and the final Observer


<hr>

### Reading:

- [Software Design Patterns](https://en.wikipedia.org/wiki/Software_design_pattern){: target='_blank'}
    - [Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern){: target='_blank'}
    - [Iterator Pattern](https://en.wikipedia.org/wiki/Iterator_pattern){: target='_blank'}
- [Push-Pull Systems](https://rxjs-dev.firebaseapp.com/guide/observable#pull-versus-push){: target='_blank'}
- [Lazy Evaluation](https://en.wikipedia.org/wiki/Lazy_evaluation){: target='_blank'}

- [RxJS](https://rxjs-dev.firebaseapp.com/guide/overview){: target='_blank'}
