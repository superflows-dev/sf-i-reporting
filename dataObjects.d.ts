export interface DataObject {
    type: string;
    name: string;
    size: string;
    label: string;
    hint: string;
    id: string;
    value: string | string[];
    options: string[];
    collapse: string;
    apiid: string;
    mode: string;
    maxselect: string;
    searchstring: string;
    selectprojection: string;
    ignoredprojections: string | string[];
    mandatory: any;
}
export declare function createDataObject(element: any, iter?: number): DataObject;
export interface AddButtonObject {
    id: string;
    label: string;
    schema: string;
    direction: string;
    children: DataObject[][];
}
export declare function createAddButtonObject(element: any): AddButtonObject;
export declare function isAddButtonObject(element: any): element is AddButtonObject;
//# sourceMappingURL=dataObjects.d.ts.map