import { Rule, Tree, SchematicsException, apply, url, template, move, chain, mergeWith, MergeStrategy } from '@angular-devkit/schematics';
import { workspaces, virtualFs, strings, normalize } from '@angular-devkit/core'

import { Schema } from './schema';
import * as Model from './base-model';
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
        const specification = new Model.Specification(data);

        const templateSource = apply(url('./files'), [
            template({
                classify: strings.classify,
                dasherize: strings.dasherize,
                specification,
                Model,
                helpers
            }),
            move(normalize(options.destinationPath as string))
        ]);

        return chain([
            mergeWith(templateSource, MergeStrategy.Overwrite)
        ])
    }
}
