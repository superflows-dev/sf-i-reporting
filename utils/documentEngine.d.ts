export interface DocRow {
    label: string;
    value: string;
}
export interface DocSection {
    title: string;
    rows: DocRow[];
}
export interface DocModel {
    title: string;
    sections: DocSection[];
}
export declare function convertJsonToDocModel(json: any): DocModel;
//# sourceMappingURL=documentEngine.d.ts.map