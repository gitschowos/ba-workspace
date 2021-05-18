import { Rule, Tree } from '@angular-devkit/schematics';


import { Schema } from './schema';

export function form(_options: Schema): Rule {
    return (tree: Tree) => {
        return tree;
    }
}
