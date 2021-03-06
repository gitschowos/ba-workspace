export interface Schema {
    //path to the json specification
    jsonFile: string;

    currPath: string;

    //path where the files should be generated
    destinationPath?: string;

    //the name of the angular project
    project?: string;

    //Prefix of the form components root folder and of all the components selectors
    prefix: string;
}