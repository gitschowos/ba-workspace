# BaWorkspace

This is the Angular workspace for the bachelor-thesis of Josef Rothballer, Universität Bayreuth.

The overall topic is creating configurable dynamic forms with angular.
The form is predefined in a JSON file. A UML-Diagram of the structure for the JSON can be found here: https://lucid.app/publicSegments/view/59397d68-5ffa-4007-b446-b7e00aa1f827/image.pdf


The following projects are parts of the workspace:

## runtime-approach

Angular Library, which has a component that generates a form during runtime from a predefined JSON model.

## compiletime-approach

Angular Library, which holds an angular-cli schematics command, that generates angular components describing a form from a predefined JSON model.

## test-app

Angular application, to display and test the implementations in different showcases


#

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
