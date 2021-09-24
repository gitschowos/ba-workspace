# BaWorkspace

This is the Angular workspace for the Bachelor thesis of Josef Rothballer, Universität Bayreuth. The version which was submitted with the thesis can be found on the branch `thesis-submission`.

The overall topic is creating configurable dynamic forms with angular.
The form is predefined in a JSON file. A UML-Diagram of the structure for the JSON can be found here: https://lucid.app/publicSegments/view/59397d68-5ffa-4007-b446-b7e00aa1f827/image.pdf. This workspace provides an interpreter as well as a generator to create an Angular form from a JSON specification.

The following projects are part of the workspace:

## ngx-model-driven-form

Angular Library, which has a component that interpretes the form during runtime (initial page loading) from a predefined JSON model as well as a anglular-cli schematics command that generates Angular components describing a form from the predefined JSON model. In both approaches the Angular Material library is used for styling.

## test-app

Angular application, to display and test the library implementation in different showcases
#

## Setup
Follow these steps after cloning this Repository to run the library. Steps 1-3 are covered in `setup.sh`.
### 1. Install dependencies
    npm ci
### 2. Build the library ngx-model-driven-form
    cd projects/ngx-model-driven-form
    npm run build
>⚠️ Don't use `ng build ngx-model-driven-form`! It does not include the build for the schematics-generator files.

The build artifacts will be stored in the `dist/ngx-model-driven-form` directory.

### 3. Prepare the generator
Link the build output with the own workspace for the schematics-generator to work:

Go back to the root directory of the workspace:

    cd ../..

Link the build output:

    npm link ./dist/ngx-model-driven-form

### 4. Start the generator
After the library is built, an Angular Schematics command which starts the generator will be availible:

    ng generate ngx-model-driven-form:form

The generator needs a json file as `--json-file` Parameter. Example json models can be found at `json/`.

>Note that the generator only accepts JSON-files inside the own workspace.

A valid generator command would be:

    ng generate ngx-model-driven-form:form --json-file json/test-all.json

The standard location for the generator is the `app/`-Directory of the standard project of the current Angular workspace. For further information how to modify the generator type `ng generate ngx-model-driven-form:form --help`.

### 5. Start the test application
With one generated form in the `app/`-Directory of `test-app` it will build successfully.

    ng serve

Or build it with:

    ng build

#
## Use the library in a different Angular workspace
>The angular workspace must be at least at Angular version 12

To use the library with its interpreter and generator in a different workspace, follow these steps:
1. build the library (see above)
2. make sure the Angular Material library is added to your workspace (https://material.angular.io/guide/getting-started)
3. Add the following property to the `angular.json` of your workspace:
    
        "projects"."PROJECT-NAME"."architect"."build"."options"."preserveSymlinks": true

    This enables the Angular compiler to work with linked libraries.

4. Set up a link to the `dist/ngx-model-driven-form`-Directory (the build output):
   
        npm link PATH-TO-BUILD-OUTPUT 
    or

        npm install PATH-TO-BUILD-OUTPUT

Now you can use the generator (see above) or import the module and use the interpreter component:

    import { ModelDrivenFormModule } from 'ngx-model-driven-form';
    //...

    @NgModule({
    declarations: [
        ...
    ],
    imports: [
        ...,
        ModelDrivenFormModule,
    ],
    ...
    })

Use the component:

    <lib-model-driven-form [inputSpec$]="specification" (submission)="onSubmit($event)"></lib-model-driven-form>

component.ts file (example):

    specification = of(JSON.parse(`
    {
        "title": "My form",
        "content": [
            {
                "type":"input",
                "id":"basic-input",
                "label":"Basic Input",
                "options":{
                    "placeholder":"Type something here...",
                    "required":true
                }
            }
        ]
    }
    `));

    onSubmit(submission: any) {
        console.log(submission);
    }

#
## Write JSON Form models

There is a JSON schema at `json/schema.json`. Put it in your model to get autocomplete suggestions:

    {
        "$schema": "https://raw.githubusercontent.com/gitschowos/ba-workspace/master/json/schema.json",
        "title": ...,
        "content": [
            ...
        ],
        ...
    }

A typescript Parser of the model is located in `projects/ngx-model-driven-form/src/lib/model/base-model.ts` or `projects/ngx-model-driven-form/form/base-model.ts`.

As mentioned above, the "meta-model" specified with UML can be found here: https://lucid.app/publicSegments/view/59397d68-5ffa-4007-b446-b7e00aa1f827/image.pdf
#

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.4. The Angular project and CLI were updated to version 12.0.0 later.