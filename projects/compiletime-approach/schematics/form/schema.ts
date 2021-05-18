export interface Schema {
    //path to the json specification
    pathToJson: string;

    //path where the files should be generated
    path?: string;

    //the name of the angular project
    project?: string;
}