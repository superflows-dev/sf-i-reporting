export function createDataObject(element, iter) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37;
    if (iter == null) {
        return {
            type: element.type,
            name: (_a = element.name) !== null && _a !== void 0 ? _a : "",
            size: (_b = element.size) !== null && _b !== void 0 ? _b : "",
            label: (_c = element.label) !== null && _c !== void 0 ? _c : "",
            selectlabel: (_d = element.selectlabel) !== null && _d !== void 0 ? _d : "",
            subselectlabel: (_e = element.subselectlabel) !== null && _e !== void 0 ? _e : "",
            hint: (_f = element.hint) !== null && _f !== void 0 ? _f : "",
            id: (_g = element.id) !== null && _g !== void 0 ? _g : "",
            value: (_h = element.value) !== null && _h !== void 0 ? _h : "",
            options: (_j = element.options) !== null && _j !== void 0 ? _j : ["Yes", "No"],
            collapse: (_k = element.collapse) !== null && _k !== void 0 ? _k : "true",
            mode: (_l = element.mode) !== null && _l !== void 0 ? _l : "",
            maxselect: (_m = element.maxselect) !== null && _m !== void 0 ? _m : "",
            apiid: (_o = element.apiid) !== null && _o !== void 0 ? _o : "",
            apiidselect: (_p = element.apiidselect) !== null && _p !== void 0 ? _p : "",
            apiidsubselect: (_q = element.apiidsubselect) !== null && _q !== void 0 ? _q : "",
            searchstring: (_r = element.searchstring) !== null && _r !== void 0 ? _r : "",
            selectprojection: (_s = element.selectprojection) !== null && _s !== void 0 ? _s : "",
            ignoredprojections: (_t = element.ignoredprojections) !== null && _t !== void 0 ? _t : "",
            savenameseparate: (_u = element.savenameseparate) !== null && _u !== void 0 ? _u : "no",
            dependencies: (_v = element.dependencies) !== null && _v !== void 0 ? _v : [],
            allowedextensions: (_w = element.allowedextensions) !== null && _w !== void 0 ? _w : "",
            extract: (_x = element.extract) !== null && _x !== void 0 ? _x : "",
            maxsize: (_y = element.maxsize) !== null && _y !== void 0 ? _y : "",
            allowdownload: (_z = element.allowdownload) !== null && _z !== void 0 ? _z : "",
            selectfields: (_0 = element.selectfields) !== null && _0 !== void 0 ? _0 : [],
            mandatory: (_1 = element.mandatory) !== null && _1 !== void 0 ? _1 : null,
            copytoreopen: ((_2 = element.copytoreopen) !== null && _2 !== void 0 ? _2 : "") == "yes",
            displayinhistory: ((_3 = element.displayinhistory) !== null && _3 !== void 0 ? _3 : "") == "yes",
            hideinadmin: ((_4 = element.hideinadmin) !== null && _4 !== void 0 ? _4 : "") == "yes",
            elementsjson: (_5 = element.elementsjson) !== null && _5 !== void 0 ? _5 : "",
            customreporting: ((_6 = element.customreporting) !== null && _6 !== void 0 ? _6 : "") == "yes"
        };
    }
    else {
        let dependencies = (_7 = element.dependencies) !== null && _7 !== void 0 ? _7 : [];
        for (let [i, dependency] of dependencies.entries()) {
            dependencies[i] = dependency.replace(/{iter}/g, "-" + iter + "");
        }
        return {
            type: element.type,
            name: ((_8 = element.name) !== null && _8 !== void 0 ? _8 : "").replace(/{iter}/g, iter + ""),
            size: (_9 = element.size) !== null && _9 !== void 0 ? _9 : "",
            label: ((_10 = element.label) !== null && _10 !== void 0 ? _10 : "").replace(/{iter}/g, iter + ""),
            selectlabel: ((_11 = element.selectlabel) !== null && _11 !== void 0 ? _11 : "").replace(/{iter}/g, iter + ""),
            subselectlabel: ((_12 = element.subselectlabel) !== null && _12 !== void 0 ? _12 : "").replace(/{iter}/g, iter + ""),
            hint: ((_13 = element.hint) !== null && _13 !== void 0 ? _13 : "").replace(/{iter}/g, iter + ""),
            id: ((_14 = element.id) !== null && _14 !== void 0 ? _14 : "").replace(/{iter}/g, "-" + iter + ""),
            options: (_15 = element.options) !== null && _15 !== void 0 ? _15 : ["Yes", "No"],
            value: (_16 = element.value) !== null && _16 !== void 0 ? _16 : "",
            collapse: (_17 = element.collapse) !== null && _17 !== void 0 ? _17 : "true",
            mode: (_18 = element.mode) !== null && _18 !== void 0 ? _18 : "",
            maxselect: (_19 = element.maxselect) !== null && _19 !== void 0 ? _19 : "",
            apiid: (_20 = element.apiid) !== null && _20 !== void 0 ? _20 : "",
            apiidselect: (_21 = element.apiidselect) !== null && _21 !== void 0 ? _21 : "",
            apiidsubselect: (_22 = element.apiidsubselect) !== null && _22 !== void 0 ? _22 : "",
            searchstring: (_23 = element.searchstring) !== null && _23 !== void 0 ? _23 : "",
            selectprojection: (_24 = element.selectprojection) !== null && _24 !== void 0 ? _24 : "",
            ignoredprojections: (_25 = element.ignoredprojections) !== null && _25 !== void 0 ? _25 : "",
            savenameseparate: (_26 = element.savenameseparate) !== null && _26 !== void 0 ? _26 : "no",
            dependencies: dependencies,
            allowedextensions: (_27 = element.allowedextensions) !== null && _27 !== void 0 ? _27 : "",
            extract: (_28 = element.extract) !== null && _28 !== void 0 ? _28 : "",
            maxsize: (_29 = element.maxsize) !== null && _29 !== void 0 ? _29 : "",
            allowdownload: (_30 = element.allowdownload) !== null && _30 !== void 0 ? _30 : "",
            selectfields: (_31 = element.selectfields) !== null && _31 !== void 0 ? _31 : [],
            mandatory: (_32 = element.mandatory) !== null && _32 !== void 0 ? _32 : null,
            copytoreopen: ((_33 = element.copytoreopen) !== null && _33 !== void 0 ? _33 : "") == "yes",
            displayinhistory: ((_34 = element.displayinhistory) !== null && _34 !== void 0 ? _34 : "") == "yes",
            hideinadmin: ((_35 = element.hideinadmin) !== null && _35 !== void 0 ? _35 : "") == "yes",
            elementsjson: (_36 = element.elementsjson) !== null && _36 !== void 0 ? _36 : "",
            customreporting: ((_37 = element.customreporting) !== null && _37 !== void 0 ? _37 : "") == "yes"
        };
    }
}
export function createAddButtonObject(element) {
    var _a, _b;
    return {
        id: element.id,
        type: "",
        label: element.label,
        schema: element.schema,
        direction: (_a = element.direction) !== null && _a !== void 0 ? _a : "column",
        customreporting: ((_b = element.customreporting) !== null && _b !== void 0 ? _b : "") == "yes",
        children: []
    };
}
export function isAddButtonObject(element) {
    return 'schema' in element;
}
//# sourceMappingURL=dataObjects.js.map