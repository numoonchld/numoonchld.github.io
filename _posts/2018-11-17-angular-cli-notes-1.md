---
layout: post
title: angular CLI notes 1
artist: Nora En Pure
artistLink: https://www.noraenpure.com
track: Diving with Whales (Club Dub)
trackLink: https://www.youtube.com/watch?v=dYtfUiLRx-E
tags: [angular-6, notes]
---

['Ng' is the contraction of A*ng*ular. The framework itself is named after the angular parenthesis of HTML elements. Angular components are used like HTML elements.](https://docs.angularjs.org/misc/faq#why-is-this-project-called-angularjs-why-is-the-namespace-called-ng-){: target="_blank"}   

![Typical Web Page](/media/blogAssets/angular/rootBlockDiagram-typical web page.svg)
{: style="text-align: center;"}

*fig: rudimentary structure of a typical web page*
{: style="font-size: 80%; text-align: center;"}

An Angular App is a collection of Modules, called *NgModules*. 
- A *root module* exists to handle the app launch
- Other supporting *feature modules* may exist 

When a new app is generated in the CLI using `ng new`, a *root module* is created through the file `app.module.ts`, which makes the class *AppModule* available to the app. 

-----

*AppModule* tells Angular how to assemble components:
- All *Components* (including the base *AppComponent*) and *feature modules* which are to be part of the app should be imported in the `app.module.ts` file 
- It could be from the [angular core library](https://angular.io/api/core){: target="_blank"}, [other libraries](https://blog.bitsrc.io/11-angular-component-libraries-you-should-know-in-2018-e9f9c9d544ff){: target="_blank"}, or app's local folders
- `app.module.ts` has an `@NgModule` function. In the input JSON of this function:
    - All app *Components* are declared in `“declarations”`  
    - *feature modules* imports are declared in `“imports”` 


![Angular App](/media/blogAssets/angular/rootBlockDiagram-ng app.svg)
{: style="text-align: center;"}

*fig: rudimentary structure of an Ng app* 
{: style="font-size: 80%; text-align: center;"}

-----


*Components* are the fundamental building blocks of Angular applications. They: 
- render app visuals to screen, 
- listen for user input, and 
- respond to that input

Application Shell is the visual render of the app:
- *AppComponent*: the root Angular component renders this Shell 
- *AppComponent* is implemented across 3 files:
    - `app.component.ts` — the component behavior script, written in TypeScript
    - `app.component.html` — the component's HTML template
    - `app.component.css` — the component's private CSS styles

- `app.component.ts` has a decorator function that sets the root HTML and CSS file 
    >    ```
    >    @Component({
    >        selector: 'app-root', // css-selector of root component
    >        templateUrl: './app.component.html', // shell html layout
    >        styleUrls: ['./app.component.css'] // global css file 
    >    })
    >    ```

Creating a new *Component* in the CLI:
- `ng generate component “component-name”`
- Creates new folder in `./src/app/` named “component-name”, which houses the *Component*'s `.ts`, `.html` and `.css` files

![Angular Component](/media/blogAssets/angular/rootBlockDiagram-ngComponent.svg)
{: style="text-align: center;"}

*structure of a typical Ng Component* 
{: style="font-size: 80%; text-align: center;"}

- The `.ts` file has a *decorator function*:

    ```
    @Component({
        selector: 'app-“component-name”', 
        templateUrl: './“component-name”.component.html', 
        styleUrls: ['./“component-name”.component.css'] 
    })
    ```
    where: 
    - `selector:` css-selector of this new *Component*
    - `templateUrl:` new *Component*'s html layout
    - `styleUrls:` array of its css files  <br>

- This *decorator function* makes a *Component* unique among other components
- A *Component* is loaded in the Shell like HTML elements by placing `<"cssSelector"></"cssSelector">` in the *AppComponent*'s `.html` file 


#### *Components* Properties: 
- *Component* properties are defined in the class exported by the *Component*
- `{{  "{{property-name"}}}}` is used in HTML to call the property value

#### Life Cycle Hooks: 
- `NgOnInit() { }`: function that runs when *Component* is initialized
    - Created automatically in a CLI generated *Component* 
    

-----

### Pipes: <br>
- A text-formatting tool to quickly apply text styles
- Similar to CSS classes, but specifically for formatting text rendering 
- Example: `<h2> {{"{{property.name | uppercase"}}}} Details </h2>`
    - `|` is the pipe operator
    - to make property.name part of `<h2>` element uppercase
   

-----

### Directives: <br>
- Similar to attributes of HTML elements
- Appends additional functionality to HTML elements
- Core *Directives*:
    - `*ngFor`: Repeater Directive (similar to for loops)
    - `*ngIf`: Conditional Directive (if else conditional)
    - `[class: some-css-class]=“some condition”`: conditionally apply CSS
    - `(click)="save()”`: event triggers function
- Additional *Directives* are made available across app *Components* by importing relevant External Modules 

#### One-way property binding:
- *Directives* for *Component*s 
- Similar to assigning values to attributes in HTML elements
- Example: `<app-component [property]="input-value"></app-component>`
    - `[component-property]="input-value"`: 
        - Is the one-way property binding of the `input-value` property of the parent *Component* to a `property` of the child *Component* 

-----

### Reading: <br>

* [Project File Structure](https://angular.io/guide/file-structure){: target="_blank"}
* [Architecture Overview](https://angular.io/guide/architecture){: target="_blank"}