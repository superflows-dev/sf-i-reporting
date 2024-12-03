export function createDataObject(element, iter) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    if (iter == null) {
        return {
            type: element.type,
            name: (_a = element.name) !== null && _a !== void 0 ? _a : "",
            size: (_b = element.size) !== null && _b !== void 0 ? _b : "",
            label: (_c = element.label) !== null && _c !== void 0 ? _c : "",
            hint: (_d = element.hint) !== null && _d !== void 0 ? _d : "",
            id: (_e = element.id) !== null && _e !== void 0 ? _e : "",
            value: (_f = element.value) !== null && _f !== void 0 ? _f : ""
        };
    }
    else {
        return {
            type: element.type,
            name: ((_g = element.name) !== null && _g !== void 0 ? _g : "").replace(/{iter}/g, iter + ""),
            size: (_h = element.size) !== null && _h !== void 0 ? _h : "",
            label: ((_j = element.label) !== null && _j !== void 0 ? _j : "").replace(/{iter}/g, iter + ""),
            hint: ((_k = element.hint) !== null && _k !== void 0 ? _k : "").replace(/{iter}/g, iter + ""),
            id: ((_l = element.id) !== null && _l !== void 0 ? _l : "").replace(/{iter}/g, iter + ""),
            value: (_m = element.value) !== null && _m !== void 0 ? _m : ""
        };
    }
}
//# sourceMappingURL=DataObject.js.map