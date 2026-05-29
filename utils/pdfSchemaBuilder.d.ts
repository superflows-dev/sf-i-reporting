import { DocModel } from "./documentEngine";
export declare function buildPdfTemplate(doc: DocModel): {
    template: {
        basePdf: {
            width: number;
            height: number;
            padding: [number, number, number, number];
        };
        schemas: any[][];
    };
    inputs: any[];
};
//# sourceMappingURL=pdfSchemaBuilder.d.ts.map