import { Rule, Tree, SchematicsException, apply, url, template, move, chain, mergeWith, MergeStrategy } from '@angular-devkit/schematics';
import { strings, workspaces, virtualFs, normalize } from '@angular-devkit/core'

import { Schema } from './schema';
import { FormElement, FormElementType, GroupOptions, Specification } from './base-model';
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
    basePath: string, currPath: string) {
    const templatePath = './files/form-element-templates/';
    for (const element of elements) {
        //element.options = element.options as CheckboxOptions;

        const templateSource = apply(url(templatePath + element.type), [
            template({
                classify: strings.classify,
                dasherize: strings.dasherize,
                camelize: strings.camelize,
                element,
                id: element.id  //for filenames
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
            basePath, currPath + `/${strings.dasherize(element.id)}-group`);
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

        createFormElementComponents(specification.content, myChain, componentNames, componentImports, (options.destinationPath as string) + '/ct-form', '');


        const templateSource = apply(url('./files/root-files'), [
            template({
                classify: strings.classify,
                dasherize: strings.dasherize,
                camelize: strings.camelize,
                specification,
                helpers,
                componentNames,
                componentImports
            }),
            move(normalize((options.destinationPath as string) + '/ct-form'))
        ]);
        myChain.push(mergeWith(templateSource, MergeStrategy.Overwrite));


        return chain(myChain);
    }
}
