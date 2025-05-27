export interface DataObject {
    type: string,
    name: string,
    size: string,
    label: string,
    hint: string,
    id: string,
    value: any,
    options: string[],
    collapse: string,
    apiid: string,
    mode: string,
    maxselect: string,
    searchstring: string,
    selectprojection: string,
    ignoredprojections: string | string[],
    savenameseparate: string,
    dependencies: string[],
    allowedextensions: string,
    extract: string,
    maxsize: string,
    allowdownload: string,
    selectfields: string[]
    mandatory: any,
    copytoreopen: boolean,
    displayinhistory: boolean,
    elementsjson: string,
    customreporting: boolean
}

export function createDataObject(element: any, iter?: number): DataObject {
    if(iter == null){
        return{
            type: element.type,
            name: element.name ?? "",
            size: element.size ?? "",
            label: element.label ?? "",
            hint: element.hint ?? "",
            id: element.id ?? "",
            value: element.value ?? "",
            options: element.options ?? ["Yes","No"],
            collapse: element.collapse ?? "true",
            mode: element.mode ?? "",
            maxselect: element.maxselect ?? "",
            apiid: element.apiid ?? "",
            searchstring: element.searchstring ?? "",
            selectprojection: element.selectprojection ?? "",
            ignoredprojections: element.ignoredprojections ?? "",
            savenameseparate: element.savenameseparate ?? "no",
            dependencies: element.dependencies ?? [],
            allowedextensions: element.allowedextensions ?? "",
            extract: element.extract ?? "",
            maxsize: element.maxsize ?? "",
            allowdownload: element.allowdownload ?? "",
            selectfields: element.selectfields ?? [],
            mandatory: element.mandatory ?? null,
            copytoreopen: (element.copytoreopen ?? "") == "yes",
            displayinhistory: (element.displayinhistory ?? "") == "yes",
            elementsjson: element.elementsjson ?? "",
            customreporting: (element.customreporting ?? "") == "yes"
        }
    }else{
        return{
            type: element.type,
            name: (element.name ?? "").replace(/{iter}/g,iter + ""),
            size: element.size ?? "",
            label: (element.label ?? "").replace(/{iter}/g,iter + ""),
            hint: (element.hint ?? "").replace(/{iter}/g,iter + ""),
            id: (element.id ?? "").replace(/{iter}/g,"-" + iter + ""),
            options: element.options ?? ["Yes","No"],
            value: element.value ?? "",
            collapse: element.collapse ?? "true",
            mode: element.mode ?? "",
            maxselect: element.maxselect ?? "",
            apiid: element.apiid ?? "",
            searchstring: element.searchstring ?? "",
            selectprojection: element.selectprojection ?? "",
            ignoredprojections: element.ignoredprojections ?? "",
            savenameseparate: element.savenameseparate ?? "no",
            dependencies: element.dependencies ?? [],
            allowedextensions: element.allowedextensions ?? "",
            extract: element.extract ?? "",
            maxsize: element.maxsize ?? "",
            allowdownload: element.allowdownload ?? "",
            selectfields: element.selectfields ?? [],
            mandatory: element.mandatory ?? null,
            copytoreopen: (element.copytoreopen ?? "") == "yes",
            displayinhistory: (element.displayinhistory ?? "") == "yes",
            elementsjson: element.elementsjson ?? "",
            customreporting: (element.customreporting ?? "") == "yes"
        }
    }
}

export interface AddButtonObject {
    id: string,
    label: string,
    schema: string,
    direction: string,
    children: DataObject[][]
}

export function createAddButtonObject(element: any): AddButtonObject {
    return{
        id: element.id,
        label: element.label,
        schema: element.schema,
        direction: element.direction ?? "column",
        children: []
    }
}

export function isAddButtonObject(element: any): element is AddButtonObject {
    return 'schema' in element;
}

