export interface DataObject {
    type: string;
    name: string;
    size: string;
    label: string;
    selectlabel: string;
    subselectlabel: string;
    hint: string;
    id: string;
    value: any;
    options: string[];
    collapse: string;
    apiid: string;
    apiidselect: string;
    apiidsubselect: string;
    mode: string;
    maxselect: string;
    searchstring: string | string[];
    selectprojection: string;
    ignoredprojections: string | string[];
    savenameseparate: string;
    dependencies: string[];
    allowedextensions: string;
    extract: string;
    maxsize: string;
    allowdownload: string;
    selectfields: string[];
    mandatory: any;
    copytoreopen: boolean;
    displayinhistory: boolean;
    hideinadmin: boolean;
    elementsjson: string;
    customreporting: boolean;
}
export declare function createDataObject(element: any, iter?: number): DataObject;
export interface AddButtonObject {
    id: string;
    type: string;
    label: string;
    schema: string;
    direction: string;
    customreporting: boolean;
    children: DataObject[][];
}
export declare function createAddButtonObject(element: any): AddButtonObject;
export declare function isAddButtonObject(element: any): element is AddButtonObject;
//# sourceMappingURL=dataObjects.d.ts.map