export function createDataObject(element, iter) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27;
    if (iter == null) {
        return {
            type: element.type,
            name: (_a = element.name) !== null && _a !== void 0 ? _a : "",
            size: (_b = element.size) !== null && _b !== void 0 ? _b : "",
            label: (_c = element.label) !== null && _c !== void 0 ? _c : "",
            hint: (_d = element.hint) !== null && _d !== void 0 ? _d : "",
            id: (_e = element.id) !== null && _e !== void 0 ? _e : "",
            value: (_f = element.value) !== null && _f !== void 0 ? _f : "",
            options: (_g = element.options) !== null && _g !== void 0 ? _g : ["Yes", "No"],
            collapse: (_h = element.collapse) !== null && _h !== void 0 ? _h : "true",
            mode: (_j = element.mode) !== null && _j !== void 0 ? _j : "",
            maxselect: (_k = element.maxselect) !== null && _k !== void 0 ? _k : "",
            apiid: (_l = element.apiid) !== null && _l !== void 0 ? _l : "",
            searchstring: (_m = element.searchstring) !== null && _m !== void 0 ? _m : "",
            selectprojection: (_o = element.selectprojection) !== null && _o !== void 0 ? _o : "",
            ignoredprojections: (_p = element.ignoredprojections) !== null && _p !== void 0 ? _p : "",
            savenameseparate: (_q = element.savenameseparate) !== null && _q !== void 0 ? _q : "no",
            dependencies: (_r = element.dependencies) !== null && _r !== void 0 ? _r : [],
            allowedextensions: (_s = element.allowedextensions) !== null && _s !== void 0 ? _s : "",
            extract: (_t = element.extract) !== null && _t !== void 0 ? _t : "",
            maxsize: (_u = element.maxsize) !== null && _u !== void 0 ? _u : "",
            allowdownload: (_v = element.allowdownload) !== null && _v !== void 0 ? _v : "",
            selectfields: (_w = element.selectfields) !== null && _w !== void 0 ? _w : [],
            mandatory: (_x = element.mandatory) !== null && _x !== void 0 ? _x : null,
            copytoreopen: ((_y = element.copytoreopen) !== null && _y !== void 0 ? _y : "") == "yes",
            displayinhistory: ((_z = element.displayinhistory) !== null && _z !== void 0 ? _z : "") == "yes",
            elementsjson: (_0 = element.elementsjson) !== null && _0 !== void 0 ? _0 : "",
            customreporting: ((_1 = element.customreporting) !== null && _1 !== void 0 ? _1 : "") == "yes"
        };
    }
    else {
        return {
            type: element.type,
            name: ((_2 = element.name) !== null && _2 !== void 0 ? _2 : "").replace(/{iter}/g, iter + ""),
            size: (_3 = element.size) !== null && _3 !== void 0 ? _3 : "",
            label: ((_4 = element.label) !== null && _4 !== void 0 ? _4 : "").replace(/{iter}/g, iter + ""),
            hint: ((_5 = element.hint) !== null && _5 !== void 0 ? _5 : "").replace(/{iter}/g, iter + ""),
            id: ((_6 = element.id) !== null && _6 !== void 0 ? _6 : "").replace(/{iter}/g, "-" + iter + ""),
            options: (_7 = element.options) !== null && _7 !== void 0 ? _7 : ["Yes", "No"],
            value: (_8 = element.value) !== null && _8 !== void 0 ? _8 : "",
            collapse: (_9 = element.collapse) !== null && _9 !== void 0 ? _9 : "true",
            mode: (_10 = element.mode) !== null && _10 !== void 0 ? _10 : "",
            maxselect: (_11 = element.maxselect) !== null && _11 !== void 0 ? _11 : "",
            apiid: (_12 = element.apiid) !== null && _12 !== void 0 ? _12 : "",
            searchstring: (_13 = element.searchstring) !== null && _13 !== void 0 ? _13 : "",
            selectprojection: (_14 = element.selectprojection) !== null && _14 !== void 0 ? _14 : "",
            ignoredprojections: (_15 = element.ignoredprojections) !== null && _15 !== void 0 ? _15 : "",
            savenameseparate: (_16 = element.savenameseparate) !== null && _16 !== void 0 ? _16 : "no",
            dependencies: (_17 = element.dependencies) !== null && _17 !== void 0 ? _17 : [],
            allowedextensions: (_18 = element.allowedextensions) !== null && _18 !== void 0 ? _18 : "",
            extract: (_19 = element.extract) !== null && _19 !== void 0 ? _19 : "",
            maxsize: (_20 = element.maxsize) !== null && _20 !== void 0 ? _20 : "",
            allowdownload: (_21 = element.allowdownload) !== null && _21 !== void 0 ? _21 : "",
            selectfields: (_22 = element.selectfields) !== null && _22 !== void 0 ? _22 : [],
            mandatory: (_23 = element.mandatory) !== null && _23 !== void 0 ? _23 : null,
            copytoreopen: ((_24 = element.copytoreopen) !== null && _24 !== void 0 ? _24 : "") == "yes",
            displayinhistory: ((_25 = element.displayinhistory) !== null && _25 !== void 0 ? _25 : "") == "yes",
            elementsjson: (_26 = element.elementsjson) !== null && _26 !== void 0 ? _26 : "",
            customreporting: ((_27 = element.customreporting) !== null && _27 !== void 0 ? _27 : "") == "yes"
        };
    }
}
export function createAddButtonObject(element) {
    var _a;
    return {
        id: element.id,
        label: element.label,
        schema: element.schema,
        direction: (_a = element.direction) !== null && _a !== void 0 ? _a : "column",
        children: []
    };
}
export function isAddButtonObject(element) {
    return 'schema' in element;
}
//# sourceMappingURL=dataObjects.js.map