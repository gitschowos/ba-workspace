import { Rule, Tree, SchematicsException, apply, url, template, move, chain, mergeWith, MergeStrategy } from '@angular-devkit/schematics';
import { strings, workspaces, virtualFs, normalize } from '@angular-devkit/core'

import { Schema } from './schema';
import { DropdownOptions, FormElement, FormElementType, GroupOptions, InputFieldOptions, RadioOptions, Specification, Suggestions, TableOptions } from './base-model';
import * as helpers from './helpers';

function createHost(tree: Tree): workspaces.WorkspaceHost {
    return {
        async readFile(path: string): Promise<string> {
            const data = tree.read(path);
            if (!data) {
                throw new SchematicsException('File not found.');
            }
            return virtualFs.fileBufferToString(data);
        },
        async writeFile(path: string, data: string): Promise<void> {
            return tree.overwrite(path, data);
        },
        async isDirectory(path: string): Promise<boolean> {
            return !tree.exists(path) && tree.getDir(path).subfiles.length > 0;
        },
        async isFile(path: string): Promise<boolean> {
            return tree.exists(path);
        },
    };
}

function createFormElementComponents(elements: FormElement[], myChain: Rule[], componentNames: string[], componentImports: string[],
    basePath: string, currPath: string, pathToRoot: string, prefix: string) {
    const templatePath = './files/form-element-templates/';
    for (const element of elements) {
        const templateSource = apply(url(templatePath + element.type), [
            template({
                classify: strings.classify,
                dasherize: strings.dasherize,
                camelize: strings.camelize,
                helpers,
                element,
                id: element.id,  //for filenames
                pathToRoot,
                prefix
            }),
            move(normalize(basePath + currPath))
        ]);
        myChain.push(mergeWith(templateSource, MergeStrategy.Overwrite));

        const componentName = strings.classify(element.id) + 'Component';
        componentNames.push(componentName);
        componentImports.push(
            `import { ${componentName} } from '.${currPath}/${strings.dasherize(element.id)}-${element.type}/${strings.dasherize(element.id)}.component';`
        );

        if (element.type === FormElementType.group) {
            createFormElementComponents((element.options as GroupOptions).childs, myChain, componentNames, componentImports,
                basePath, currPath + `/${strings.dasherize(element.id)}-group`, pathToRoot + '../', prefix);
        }
        else if (element.type === FormElementType.table) {
            createFormElementComponents((element.options as TableOptions).columns, myChain, componentNames, componentImports,
                basePath, currPath + `/${strings.dasherize(element.id)}-table`, pathToRoot + '../', prefix);
        }
    }
}

function collectApiUrls(elements: FormElement[], apiUrls: string[]) {
    for (const element of elements) {
        let values: Suggestions;
        switch (element.type) {
            case FormElementType.group:
                collectApiUrls((element.options as GroupOptions).childs, apiUrls);
                continue;
            case FormElementType.input:
                const autocomplete = (element.options as InputFieldOptions).autocomplete;
                if (autocomplete === undefined) {
                    continue;
                } else {
                    values = autocomplete;
                    break;
                }
            case FormElementType.radio:
                values = (element.options as RadioOptions).pickingOptions;
                break;
            case FormElementType.dropdown:
                values = (element.options as DropdownOptions).values;
                break;
            default:
                continue;
        }
        if (!values.isHardcoded()) {
            const url = values.content as string;
            if (!apiUrls.includes(url)) {
                apiUrls.push(url);
            }
        }
    }
}

export function form(options: Schema): Rule {
    return async (tree: Tree) => {
        const host = createHost(tree);
        const { workspace } = await workspaces.readWorkspace('/', host);

        if (!options.project) {
            options.project = workspace.extensions.defaultProject as string;
        }

        const project = workspace.projects.get(options.project);
        if (!project) {
            throw new SchematicsException(`Invalid project name: ${options.project}`);
        }

        const projectType = project.extensions.projectType === 'application' ? 'app' : 'lib';

        if (options.destinationPath === undefined) {
            options.destinationPath = `${project.sourceRoot}/${projectType}`;
        }


        let pathToJson = '';
        if (options.currPath) {
            pathToJson += options.currPath;
        }
        pathToJson += options.jsonFile;
        const jsonFileString = tree.read(pathToJson)?.toString();
        if (!jsonFileString) {
            throw new SchematicsException(`No json found here: ${pathToJson}`);
        }

        const data = JSON.parse(jsonFileString);

        //parse the json to the data model here
        const specification = new Specification(data);

        let myChain: Rule[] = [];
        let componentNames: string[] = [];
        let componentImports: string[] = [];

        createFormElementComponents(specification.content, myChain, componentNames, componentImports, (options.destinationPath as string) + `/${options.prefix}-form`, '', '../', options.prefix);


        if (specification.showExampleFiller) {
            let apiUrls: string[] = [];
            collectApiUrls(specification.content, apiUrls); // for example generator

            const templateSource = apply(url('./files/form-filler-files'), [
                template({
                    classify: strings.classify,
                    dasherize: strings.dasherize,
                    camelize: strings.camelize,
                    specification,
                    helpers,
                    apiUrls,
                    prefix: options.prefix
                }),
                move(normalize((options.destinationPath as string) + `/${options.prefix}-form`))
            ]);
            myChain.push(mergeWith(templateSource, MergeStrategy.Overwrite));

            componentNames.push('FormFillerComponent');
            componentImports.push("import { FormFillerComponent } from './form-filler/form-filler.component';");
        }


        const templateSource = apply(url('./files/root-files'), [
            template({
                classify: strings.classify,
                dasherize: strings.dasherize,
                camelize: strings.camelize,
                specification,
                helpers,
                componentNames,
                componentImports,
                prefix: options.prefix
            }),
            move(normalize((options.destinationPath as string) + `/${options.prefix}-form`))
        ]);
        myChain.push(mergeWith(templateSource, MergeStrategy.Overwrite));


        return chain(myChain);
    }
}
