export function createDataObject(element, iter) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
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
            mandatory: element.mandatory
        };
    }
    else {
        return {
            type: element.type,
            name: ((_q = element.name) !== null && _q !== void 0 ? _q : "").replace(/{iter}/g, iter + ""),
            size: (_r = element.size) !== null && _r !== void 0 ? _r : "",
            label: ((_s = element.label) !== null && _s !== void 0 ? _s : "").replace(/{iter}/g, iter + ""),
            hint: ((_t = element.hint) !== null && _t !== void 0 ? _t : "").replace(/{iter}/g, iter + ""),
            id: ((_u = element.id) !== null && _u !== void 0 ? _u : "").replace(/{iter}/g, "-" + iter + ""),
            options: (_v = element.options) !== null && _v !== void 0 ? _v : ["Yes", "No"],
            value: (_w = element.value) !== null && _w !== void 0 ? _w : "",
            collapse: (_x = element.collapse) !== null && _x !== void 0 ? _x : "true",
            mode: (_y = element.mode) !== null && _y !== void 0 ? _y : "",
            maxselect: (_z = element.maxselect) !== null && _z !== void 0 ? _z : "",
            apiid: (_0 = element.apiid) !== null && _0 !== void 0 ? _0 : "",
            searchstring: (_1 = element.searchstring) !== null && _1 !== void 0 ? _1 : "",
            selectprojection: (_2 = element.selectprojection) !== null && _2 !== void 0 ? _2 : "",
            ignoredprojections: (_3 = element.ignoredprojections) !== null && _3 !== void 0 ? _3 : "",
            mandatory: element.mandatory
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