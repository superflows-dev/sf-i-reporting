declare function readCookie(key: string): string;
declare function callApi(url: string, data: string, authorization: any): Promise<unknown>;
declare function callApiPresignedDelete(url: string): Promise<unknown>;
declare function callApiPresignedGet(url: string): Promise<unknown>;
declare const exportFunctions: {
    callApi: typeof callApi;
    callApiPresignedDelete: typeof callApiPresignedDelete;
    callApiPresignedGet: typeof callApiPresignedGet;
    validateName: (name: string) => boolean;
    readCookie: typeof readCookie;
};
export default exportFunctions;
//# sourceMappingURL=util.d.ts.map