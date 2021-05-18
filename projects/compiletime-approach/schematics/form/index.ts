import { Rule, Tree, SchematicsException, apply, url, applyTemplates, move, chain, mergeWith } from '@angular-devkit/schematics';
import { workspaces, virtualFs, strings, normalize } from '@angular-devkit/core'

import { Schema } from './schema';

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

        if (options.path === undefined) {
            options.path = `${project.sourceRoot}/${projectType}`;
        }

        //parse the json to the data model here
        const elements = {};

        const templateSource = apply(url('./files'), [
            applyTemplates({
                classify: strings.classify,
                dasherize: strings.dasherize,
                elements: elements
            }),
            move(normalize(options.path as string))
        ]);

        return chain([
            mergeWith(templateSource)
        ])
    }
}
