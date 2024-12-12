export interface DataObject {
    type: string,
    name: string,
    size: string,
    label: string,
    hint: string,
    id: string,
    value: string | string[],
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
    mandatory: any
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
            mandatory: element.mandatory
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
            mandatory: element.mandatory
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

